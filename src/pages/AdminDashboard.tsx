import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingBag, AlertTriangle, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Products', value: '150', icon: Package },
    { label: 'Low Stock Items', value: '12', icon: ShoppingBag },
    { label: 'Expiring Soon', value: '8', icon: AlertTriangle }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/products/new"
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className="h-8 w-8 text-green-600" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-md">
              <div>
                <h3 className="font-medium">Organic Spinach</h3>
                <p className="text-sm text-gray-600">Only 5 units remaining</p>
              </div>
              <Link
                to="/admin/inventory"
                className="text-red-600 hover:text-red-800"
              >
                Update Stock
              </Link>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-md">
              <div>
                <h3 className="font-medium">Fresh Apples</h3>
                <p className="text-sm text-gray-600">Only 15 units remaining</p>
              </div>
              <Link
                to="/admin/inventory"
                className="text-yellow-600 hover:text-yellow-800"
              >
                Update Stock
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expiring Products</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-md">
              <div>
                <h3 className="font-medium">Artisan Cheese</h3>
                <p className="text-sm text-gray-600">Expires in 3 days</p>
              </div>
              <button className="text-orange-600 hover:text-orange-800">
                Mark as Sold
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-md">
              <div>
                <h3 className="font-medium">Fresh Milk</h3>
                <p className="text-sm text-gray-600">Expires tomorrow</p>
              </div>
              <button className="text-red-600 hover:text-red-800">
                Mark as Sold
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}