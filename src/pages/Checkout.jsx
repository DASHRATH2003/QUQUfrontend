import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';
import { ShoppingBagIcon, TruckIcon, CreditCardIcon } from '@heroicons/react/24/outline';

// UK Counties list
const UK_COUNTIES = [
  "Greater London",
  "Essex",
  "Kent",
  "Surrey",
  "Hampshire",
  "Hertfordshire",
  "West Midlands",
  "Greater Manchester",
  "West Yorkshire",
  "Merseyside",
  "South Yorkshire",
  "Lancashire",
  "Nottinghamshire",
  "Derbyshire",
  "Devon",
  "Staffordshire",
  "Norfolk",
  "Suffolk",
  "Cheshire",
  "Lincolnshire",
  "Durham",
  "Somerset",
  "Cornwall",
  "Dorset",
  "Gloucestershire",
  "Leicestershire",
  "Northamptonshire",
  "Oxfordshire",
  "Buckinghamshire",
  "Berkshire",
  "Cambridgeshire",
  "Wiltshire",
  "East Sussex",
  "West Sussex",
  "Northumberland",
  "Warwickshire",
  "Worcestershire",
  "Bedfordshire",
  "Cumbria",
  "North Yorkshire"
].sort();

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Greater London', // Default to Greater London
    postcode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md w-full">
          <ShoppingBagIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Delivery Form (spans 2 columns) */}
          <div className="lg:col-span-2">
            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <TruckIcon className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Delivery Information</h2>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-sm"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-sm"
                    required
                    placeholder="House number and street name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City/Town
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    County
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-sm bg-white"
                    required
                  >
                    {UK_COUNTIES.map(county => (
                      <option key={county} value={county}>
                        {county}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postcode
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-200 focus:ring-1 focus:ring-pink-500 focus:border-pink-500 transition-colors duration-200 text-sm"
                    required
                    placeholder="e.g. SW1A 1AA"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBagIcon className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4">
                <div className="flex justify-between items-center text-lg">
                  <p className="font-semibold text-gray-900">Total Amount</p>
                  <p className="font-bold text-gray-900">£{getTotalPrice().toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Payment Method (spans full width) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <CreditCardIcon className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl font-semibold text-gray-900">Payment Method</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600">
                  Please fill in all delivery information with valid details. UK postcode format required (e.g., SW1A 1AA).
                </p>
              </div>
              <PayPalButton formData={formData} />
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Safe and secure payments by PayPal
                </p>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.641.641 0 0 1 .634-.542h6.556c2.153 0 3.71.424 4.63 1.26.875.795 1.276 1.961 1.276 3.523 0 1.398-.376 2.617-1.125 3.627-.766 1.026-1.863 1.738-3.266 2.115-.656.175-1.4.262-2.228.262h-.804c-.655 0-1.214.477-1.317 1.124l-.099.58-.964 6.092a.64.64 0 0 1-.633.576z"/>
                  </svg>
                  <span className="text-sm font-medium text-gray-600">PayPal Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;