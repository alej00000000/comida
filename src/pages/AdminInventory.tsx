import React, { useState } from 'react';
import { format } from 'date-fns';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  expiryDate: string;
  price: number;
}

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Apples',
      category: 'Fruits',
      stock: 15,
      expiryDate: '2024-03-20',
      price: 2.99
    },
    {
      id: '2',
      name: 'Organic Spinach',
      category: 'Vegetables',
      stock: 5,
      expiryDate: '2024-03-15',
      price: 3.49
    },
    {
      id: '3',
      name: 'Artisan Cheese',
      category: 'Dairy',
      stock: 20,
      expiryDate: '2024-03-18',
      price: 6.99
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const handleUpdateStock = (id: string, newStock: number) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, stock: newStock } : p
    ));
  };

  const handleUpdateExpiry = (id: string, newDate: string) => {
    setProducts(products.map(p =>
      p.id === id ? { ...p, expiryDate: newDate } : p
    ));
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'low-stock') return product.stock < 10;
    if (filter === 'expiring-soon') {
      const daysUntilExpiry = Math.ceil(
        (new Date(product.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilExpiry <= 7;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="all">All Products</option>
            <option value="low-stock">Low Stock</option>
            <option value="expiring-soon">Expiring Soon</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => handleUpdateStock(product.id, parseInt(e.target.value))}
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">{product.stock} units</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === product.id ? (
                    <input
                      type="date"
                      value={product.expiryDate}
                      onChange={(e) => handleUpdateExpiry(product.id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  ) : (
                    <div className="text-sm text-gray-900">
                      {format(new Date(product.expiryDate), 'MMM dd, yyyy')}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {editingId === product.id ? (
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingId(product.id)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}