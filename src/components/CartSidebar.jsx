import React from 'react';
import { XMarkIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, formatPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl z-50">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-medium">Your cart</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items - with padding bottom for footer */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] pb-[200px]">
          <div className="px-4 py-2">
            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>PRODUCT</span>
              <span>TOTAL</span>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 border-b">
                <div className="w-20 h-20">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium mb-1">{item.name}</h3>
                  {item.color && (
                    <p className="text-sm text-gray-500 mb-2">
                      Color: {item.color}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-50"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="px-2 py-1 min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-50"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:text-red-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-pink-500">£{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - fixed at bottom of sidebar */}
        <div className="absolute bottom-0 right-0 w-[400px] bg-white border-t p-4">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Estimated total</span>
            <span className="font-medium">£{getTotalPrice()}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Tax included. Shipping and discounts calculated at checkout.
          </p>
          <Link
            to="/checkout"
            className="block w-full bg-black text-white text-center py-3 rounded font-medium hover:bg-gray-800 transition-colors"
            onClick={onClose}
          >
            PROCEED TO CHECKOUT
            <span className="block text-sm font-normal">
              Get Extra 5% Off on Pre-Paid
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartSidebar; 