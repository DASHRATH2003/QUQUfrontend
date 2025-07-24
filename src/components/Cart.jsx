import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Helper function to format price
const formatPrice = (price) => {
  return `£${price.toFixed(2)}`;
};

const Cart = ({ onClose }) => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      onClose();
      navigate('/login');
      return;
    }
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-2xl"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Shopping Cart</h2>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500">{cartItems.length} items</p>
            </div>
            <button 
              onClick={onClose}
              className="rounded-full p-1.5 sm:p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-all"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-gray-900">Your cart is empty</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500">Start shopping to add items to your cart</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id} 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-3 sm:space-x-4 bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-gray-100"
                  >
                    <div className="flex-shrink-0 bg-gray-50 rounded-md p-1.5 sm:p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{item.name}</h3>
                      <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">{item.description}</p>
                      <div className="mt-2 flex items-center space-x-3 sm:space-x-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-l-lg transition-colors"
                          >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="w-8 sm:w-12 text-center text-sm sm:text-base text-gray-900 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-r-lg transition-colors"
                          >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm sm:text-base font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex-shrink-0 p-1.5 sm:p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <span className="sr-only">Remove</span>
                      <svg className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
              <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>{formatPrice(getTotalPrice())}</p>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-medium text-gray-900 pt-1.5 sm:pt-2 border-t">
                  <p>Total</p>
                  <p>{formatPrice(getTotalPrice())}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  Tax included. Shipping and discounts calculated at checkout.
                </p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-gray-900 transition-colors duration-200 relative overflow-hidden group"
              >
                <div className="absolute inset-0 w-3 bg-white bg-opacity-20 skew-x-[45deg] group-hover:transition-all group-hover:duration-500 group-hover:-translate-x-full" />
                <span className="text-base sm:text-lg font-medium">Proceed to Checkout</span>
                <p className="text-xs sm:text-sm font-normal text-gray-300">Get Extra 5% Off on Pre-Paid</p>
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Cart; 