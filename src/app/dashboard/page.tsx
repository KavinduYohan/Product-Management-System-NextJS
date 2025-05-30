'use client';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

export default function Dashboard() {
  const [products, setProducts] = useState<{ id: string | number; name: string; description: string; quantity: number; image_url: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [image, setImage] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<{ id: string | number; name: string; description: string; quantity: number; image_url: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = '') => {
    const url = query ? `/api/products/search?q=${query}` : '/api/products';
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  const handleDelete = async (id: string | number) => {
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    toast.success('Product deleted successfully');
    fetchProducts();
  };
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
  
      if (res.ok) {
        toast.success("Logged out successfully");
        window.location.href = "/login";
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred while logging out");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description || quantity < 1) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('quantity', quantity.toString());
    if (image) {
      formData.append('image', image);
    }

    if (editingProduct) {
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        body: formData,
      });
      toast.success('Product updated successfully');
      setEditingProduct(null);
    } else {
      await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });
      toast.success('Product added successfully');
    }

    setName('');
    setDescription('');
    setQuantity(1);
    setImage(null);
    setIsModalOpen(false);
    fetchProducts();
  };

  const handleEdit = (product: { id: string | number; name: string; description: string; quantity: number; image_url: string }) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
    setQuantity(product.quantity);
    setIsModalOpen(true);
  };

  // Pagination 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-bold mb-6 text-center">Product Dashboard</h1>

      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-1/2"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            fetchProducts(e.target.value);
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </button>


        <button
  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
  onClick={handleLogout}
>
  Logout
</button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} className="border">
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">{product.quantity}</td>
              <td className="border p-2">
  {product.image_url && (
    <img src={product.image_url.startsWith('/uploads') ? product.image_url : `/uploads/${product.image_url}`} alt={product.name} className="w-16 h-16 object-cover" />
  )}
</td>

              <td className="p-2 flex gap-2 items-center">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Product Name"
                className="border p-2 rounded w-full mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Product Description"
                className="border p-2 rounded w-full mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                className="border p-2 rounded w-full mb-2"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <input
                type="file"
                className="border p-2 rounded w-full mb-2"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  {editingProduct ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingProduct(null);
                    setName('');
                    setDescription('');
                    setQuantity(1);
                    setImage(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      <div className="mt-6 text-center">
        <Link href="/productDetails" className="text-blue-500 hover:underline text-lg">
          Product Detail Page
        </Link>
      </div>
    </div>
  );
}