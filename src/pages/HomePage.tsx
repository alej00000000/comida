import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const defaultProducts = [
  {
    id: '1',
    name: 'Fresh Apples',
    category: 'Fruits',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    description: 'Crisp and sweet apples fresh from local orchards'
  },
  {
    id: '2',
    name: 'Organic Spinach',
    category: 'Vegetables',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
    description: 'Fresh organic spinach leaves'
  },
  {
    id: '3',
    name: 'Artisan Cheese',
    category: 'Dairy',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d',
    description: 'Premium aged cheese from local dairies'
  }
];

export default function HomePage() {
  const { login } = useAuth();
  const { addItem } = useCart();
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState<Product[]>(defaultProducts);

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts([...defaultProducts, ...parsedProducts]);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    setShowLogin(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Fresh Foods Distribution</h1>
            <p className="text-xl mb-8">Premium Quality Fruits, Vegetables, and Dairy Products</p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white text-green-600 px-6 py-3 rounded-md font-semibold hover:bg-green-50"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{product.name}</h3>
                    <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    <button
                      onClick={() => addItem({ ...product, quantity: 1 })}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowLogin(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}