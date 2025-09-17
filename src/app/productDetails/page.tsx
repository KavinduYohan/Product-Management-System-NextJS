'use client';

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  PhotoIcon,
  CubeIcon,
  EyeIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';
import Button from '@/components/Button';
import Input from '@/components/Input';

interface Product {
  id: number;
  image_url: string;
  name: string;
  description: string;
  quantity: number;
}

const ProductDetail = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'quantity'>('name');
  const [filterBy, setFilterBy] = useState<'all' | 'inStock' | 'lowStock'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Check if user is authenticated
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }
  }, [router]);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply stock filter
    if (filterBy === 'inStock') {
      filtered = filtered.filter(product => product.quantity > 5);
    } else if (filterBy === 'lowStock') {
      filtered = filtered.filter(product => product.quantity <= 5);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        return b.quantity - a.quantity;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, sortBy, filterBy]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        toast.error('Failed to load products');
      }
    } catch {
      toast.error('Error fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { status: 'Out of Stock', color: 'bg-red-100 text-red-800 border-red-200' };
    } else if (quantity <= 5) {
      return { status: 'Low Stock', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    } else {
      return { status: 'In Stock', color: 'bg-green-100 text-green-800 border-green-200' };
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" leftIcon={<ArrowLeftIcon className="h-4 w-4" />}>
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
                  <ShoppingBagIcon className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Product Catalog</h1>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Squares2X2Icon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <ListBulletIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters and Sorting */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as 'all' | 'inStock' | 'lowStock')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Products</option>
                <option value="inStock">In Stock ({'>'}5)</option>
                <option value="lowStock">Low Stock (≤5)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'quantity')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="quantity">Stock Level</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <CubeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <Link href="/dashboard">
              <Button>Add Your First Product</Button>
            </Link>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const stockInfo = getStockStatus(product.quantity);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-lg hover:border-purple-200 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-w-16 aspect-h-12 bg-gray-100">
                    {product.image_url ? (
                      <img 
                        src={product.image_url.startsWith('/uploads') ? product.image_url : `/uploads/${product.image_url}`} 
                        alt={product.name} 
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <PhotoIcon className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Stock Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${stockInfo.color}`}>
                        {stockInfo.status}
                      </span>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors">
                        <EyeIcon className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Stock</p>
                        <p className="text-lg font-bold text-gray-900">{product.quantity}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">ID: {product.id}</span>
                      <div className="flex items-center space-x-2">
                        <Link href="/dashboard">
                          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                            Edit
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredProducts.map((product) => {
                const stockInfo = getStockStatus(product.quantity);
                return (
                  <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-6">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        {product.image_url ? (
                          <img 
                            src={product.image_url.startsWith('/uploads') ? product.image_url : `/uploads/${product.image_url}`} 
                            alt={product.name} 
                            className="w-20 h-20 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
                            <PhotoIcon className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-2">{product.description}</p>
                            <div className="flex items-center space-x-4">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${stockInfo.color}`}>
                                {stockInfo.status}
                              </span>
                              <span className="text-xs text-gray-500">ID: {product.id}</span>
                            </div>
                          </div>
                          
                          <div className="text-right ml-6">
                            <p className="text-sm text-gray-500 mb-1">Stock Quantity</p>
                            <p className="text-2xl font-bold text-gray-900">{product.quantity}</p>
                            <Link href="/dashboard">
                              <button className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                                Edit Product
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {filteredProducts.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-xl">
                  <CubeIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredProducts.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <CubeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Stock</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredProducts.reduce((sum, product) => sum + product.quantity, 0)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-xl">
                  <CubeIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Low Stock Items</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredProducts.filter(product => product.quantity <= 5).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ProductDetail;