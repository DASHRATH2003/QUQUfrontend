import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/orderContextUtils';
import toast from 'react-hot-toast';

// Status helper function
const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case 'processing':
      return {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        label: 'Processing',
        icon: '⚙️'
      };
    case 'shipped':
      return {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        label: 'Shipped',
        icon: '🚚'
      };
    case 'delivered':
      return {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Delivered',
        icon: '✅'
      };
    case 'cancelled':
      return {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Cancelled',
        icon: '❌'
      };
    default:
      return {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label: 'Processing',
        icon: '⚙️'
      };
  }
};

const OrderHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const { orders, loading: ordersLoading, error, getMyOrders } = useOrder();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!authLoading && user) {
        try {
          await getMyOrders();
        } catch (err) {
          console.error('Failed to fetch orders:', err);
          toast.error('Failed to load orders. Please try again.');
        }
      }
    };
    fetchOrders();
  }, [authLoading, user, getMyOrders]);

  // Show loading state while checking auth or fetching orders
  if (authLoading || ordersLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg">
          <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Unable to Load Orders</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => getMyOrders()}
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't placed any orders yet. Start shopping to create your first order!
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order placed</p>
                  <p className="font-medium">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order number</p>
                  <p className="font-medium">#{order._id.slice(-8).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total amount</p>
                  <p className="font-medium">£{order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium gap-1.5
                    ${getStatusStyle(order.orderStatus).bg} 
                    ${getStatusStyle(order.orderStatus).text}`}
                  >
                    <span>{getStatusStyle(order.orderStatus).icon}</span>
                    {getStatusStyle(order.orderStatus).label}
                    {order.orderStatus === 'processing' && (
                      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-gray-100">
              {order.products.map((item, index) => (
                <div key={index} className="p-6 flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="font-medium text-gray-800">
                      £{(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            {order.shippingAddress && (
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-800 mb-1">Shipping Address:</p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 