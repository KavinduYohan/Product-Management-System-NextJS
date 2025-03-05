'use client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [products, setProducts] = useState<{ id: string | number; name: string; description: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingProduct, setEditingProduct] = useState<{ id: string | number; name: string; description: string } | null>(null); // Track the product being edited

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
    fetchProducts();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !description) return;

    if (editingProduct) {
      // Update existing product
      await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
      setEditingProduct(null);
    } else {
      // Add new product
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      });
    }

    setName('');
    setDescription('');
    fetchProducts();
  };

  const handleEdit = (product: { id: string | number; name: string; description: string }) => {
    setEditingProduct(product);
    setName(product.name);
    setDescription(product.description);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        className="border p-2 rounded w-full mb-4"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          fetchProducts(e.target.value);
        }}
      />

      {/* Add/Edit Product Form */}
      <form onSubmit={handleSubmit} className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-bold mb-4">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
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
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editingProduct && (
          <button
            type="button"
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => {
              setEditingProduct(null);
              setName('');
              setDescription('');
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Product List */}
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-black-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border">
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.description}</td>
              <td className="border p-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
