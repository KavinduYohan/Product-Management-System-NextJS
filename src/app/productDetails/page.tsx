'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail = () => {
  const [products, setProducts] = useState<{ id: number; image_url: string; name: string; description: string; quantity: number }[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        toast.error('Failed to load products');
      }
    } catch (error) {
      toast.error('Error fetching products');
    }
  };

  return (
    <div className="min-h-screen bg-white p-10">
      <h1 className="text-3xl font-bold text-black text-center mb-6">Product Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold text-black mt-3">{product.name}</h2>
            <p className="text-gray-700 text-sm">{product.description}</p>
            <p className="text-black font-bold mt-2">Quantity: {product.quantity}</p>
          </div>
        ))}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProductDetail;
