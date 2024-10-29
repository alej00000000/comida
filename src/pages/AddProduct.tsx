import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft } from 'lucide-react';

interface NewProduct {
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  expiryDate: string;
  image: string;
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<NewProduct>({
    name: '',
    category: '',
    description: '',
    price: 0,
    stock: 0,
    expiryDate: '',
    image: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    // For demo, we'll store in localStorage
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => navigate('/admin')}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Dashboard
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                required
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                required
                value={product.category}
                onChange={(e) => setProduct({ ...product, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select category</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                required
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                required
                value={product.expiryDate}
                onChange={(e) => setProduct({ ...product, expiryDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <div className="flex">
                <input
                  type="url"
                  required
                  value={product.image}
                  onChange={(e) => setProduct({ ...product, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md hover:bg-gray-200"
                  onClick={() => window.open(product.image, '_blank')}
                >
                  <Upload className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {product.image && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
              <img
                src={product.image}
                alt="Product preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}