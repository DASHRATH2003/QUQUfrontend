import React from 'react';
import { Link } from 'react-router-dom';

const CreatorZone = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Creator Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Analytics Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Analytics</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Sales</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Products Listed</span>
                <span className="font-medium">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Orders</span>
                <span className="font-medium">0</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <Link 
                to="/creator/add-product" 
                className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add New Product
              </Link>
              <Link 
                to="/creator/orders" 
                className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
              >
                Manage Orders
              </Link>
              <Link 
                to="/creator/inventory" 
                className="block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Update Inventory
              </Link>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <p className="text-gray-500 text-center">No recent activity</p>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm text-gray-500">Revenue (This Month)</h3>
              <p className="text-2xl font-bold text-gray-800">$0.00</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm text-gray-500">Orders (This Month)</h3>
              <p className="text-2xl font-bold text-gray-800">0</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm text-gray-500">Average Order Value</h3>
              <p className="text-2xl font-bold text-gray-800">$0.00</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="text-sm text-gray-500">Customer Satisfaction</h3>
              <p className="text-2xl font-bold text-gray-800">N/A</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorZone; 