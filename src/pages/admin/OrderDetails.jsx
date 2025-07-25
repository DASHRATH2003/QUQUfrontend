import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrder(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md">
          <p className="font-semibold">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-6 py-4 rounded-lg shadow-md">
          <p>Order not found.</p>
        </div>
      </div>
    );
  }

  // Add function to calculate order total
  const calculateOrderTotal = (products) => {
    return products?.reduce((total, item) => total + (item.quantity * item.price), 0) || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Status Update */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Order Details</h1>
                <p className="text-pink-100 mt-1">Order #{order?.id}</p>
              </div>
            </div>
          </div>

          {/* Order Timeline - Updated Design */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                <div>
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-medium">
                    {order?.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                  </p>
                </div>
              </div>
              {order?.paidAt && (
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <div>
                    <p className="text-xs text-gray-500">Paid</p>
                    <p className="text-sm font-medium">{new Date(order.paidAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {order?.shippedAt && (
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                  <div>
                    <p className="text-xs text-gray-500">Shipped</p>
                    <p className="text-sm font-medium">{new Date(order.shippedAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
              {order?.deliveredAt && (
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                  <div>
                    <p className="text-xs text-gray-500">Delivered</p>
                    <p className="text-sm font-medium">{new Date(order.deliveredAt).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information - Updated Design */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Customer Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-100">
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-base font-semibold text-gray-900">{order.shippingAddress?.name || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="text-base font-semibold text-gray-900 break-all">{order.shippingAddress?.email || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="text-base font-semibold text-gray-900">{order.shippingAddress?.phone || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Order Items</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {order.products?.map((item) => (
                  <div key={item._id || item.name} className="p-6 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>Quantity: {item.quantity}</span>
                        <span className="mx-2">•</span>
                        <span>£{item.price.toFixed(2)} each</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-medium text-gray-900">
                        £{(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Replace Google Maps with simple address display */}
            {order?.shippingAddress && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h2 className="text-lg font-semibold text-gray-800">Delivery Address</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                          <svg className="h-4 w-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-2">Shipping Details</p>
                        <div className="text-sm text-gray-700 space-y-1">
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}</p>
                          <p>{order.shippingAddress.postcode}</p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Order Summary - Updated Design */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                </div>
              </div>
              <div className="p-6">
                {/* Items Summary */}
                <div className="space-y-4 mb-6">
                  {order.products?.map((item) => (
                    <div key={item._id || item.name} className="flex justify-between text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-600">{item.name}</span>
                        <span className="text-gray-400 mx-2">×</span>
                        <span className="text-gray-600">{item.quantity}</span>
                      </div>
                      <span className="text-gray-900 font-medium">£{(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Calculations */}
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">£{calculateOrderTotal(order.products).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          £{calculateOrderTotal(order.products).toFixed(2)}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">Including VAT</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Status */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        order.paymentInfo?.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm font-medium text-gray-600">Payment Status</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      order.paymentInfo?.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {order.paymentInfo?.status === 'completed' ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Payment Information</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p className="mt-1 text-base text-gray-900">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Status</p>
                  <span className={`mt-1 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    order.paymentInfo?.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.paymentInfo?.status?.charAt(0).toUpperCase() + order.paymentInfo?.status?.slice(1) || 'Pending'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment ID</p>
                  <p className="mt-1 text-base font-mono text-gray-900">{order.paymentInfo?.paymentId || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h2 className="text-lg font-semibold text-gray-800">Shipping Address</h2>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">Delivery Location</p>
                      <div className="text-sm text-gray-700 space-y-1">
                        <p>{order.shippingAddress?.street}</p>
                        <p>{order.shippingAddress?.city}</p>
                        <p>{order.shippingAddress?.postcode}</p>
                        <p>{order.shippingAddress?.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
