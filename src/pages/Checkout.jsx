import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';
import { ShoppingBagIcon, TruckIcon, CreditCardIcon, CheckCircleIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';

// UK Counties list
const UK_COUNTIES = [
  "Greater London", "Essex", "Kent", "Surrey", "Hampshire",
  "Hertfordshire", "West Midlands", "Greater Manchester", "West Yorkshire",
  "Merseyside", "South Yorkshire", "Lancashire", "Nottinghamshire",
  "Derbyshire", "Devon", "Staffordshire", "Norfolk", "Suffolk",
  "Cheshire", "Lincolnshire", "Durham", "Somerset", "Cornwall",
  "Dorset", "Gloucestershire", "Leicestershire", "Northamptonshire",
  "Oxfordshire", "Buckinghamshire", "Berkshire", "Cambridgeshire",
  "Wiltshire", "East Sussex", "West Sussex", "Northumberland",
  "Warwickshire", "Worcestershire", "Bedfordshire", "Cumbria",
  "North Yorkshire"
].sort();

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'Greater London',
    postcode: ''
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    } else {
      removeFromCart(itemId);
    }
  };

  const steps = [
    { number: 1, title: 'Delivery Details', icon: TruckIcon },
    { number: 2, title: 'Payment', icon: CreditCardIcon },
    { number: 3, title: 'Confirmation', icon: CheckCircleIcon }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Steps - Mobile Friendly */}
        <div className="mb-6 sm:mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between px-2">
              {steps.map((step, index) => (
                <div key={step.number} className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 
                    ${currentStep >= step.number ? 'border-pink-500 bg-pink-50' : 'border-gray-300 bg-white'}
                    ${currentStep === step.number ? 'ring-2 ring-pink-200' : ''}`}>
                    <step.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${currentStep >= step.number ? 'text-pink-500' : 'text-gray-400'}`} />
                  </div>
                  <div className="mt-2 sm:mt-0 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">Step {step.number}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden sm:block w-24 mx-4 h-0.5 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Delivery Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <TruckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Delivery Information</h2>
              </div>

              {/* Delivery Form - Mobile Optimized */}
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition duration-150 text-sm sm:text-base"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition duration-150 text-sm sm:text-base"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition duration-150 text-sm sm:text-base"
                    required
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition duration-150 text-sm sm:text-base"
                    required
                    placeholder="Enter your street address"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition duration-150 text-sm sm:text-base"
                      required
                      placeholder="Enter city"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">County</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition duration-150 bg-white text-sm sm:text-base"
                      required
                    >
                      {UK_COUNTIES.map(county => (
                        <option key={county} value={county}>{county}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Postcode</label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 transition duration-150 text-sm sm:text-base"
                      required
                      placeholder="Enter postcode"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Options - Mobile Friendly */}
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 border border-gray-100">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <TruckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Delivery Options</h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <label className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    defaultChecked
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Standard Delivery</p>
                    <p className="text-xs sm:text-sm text-gray-500">3-5 working days</p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900 text-sm sm:text-base">Free</div>
                </label>

                <label className="flex items-center p-3 sm:p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150">
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    className="h-4 w-4 text-pink-500 focus:ring-pink-500"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Express Delivery</p>
                    <p className="text-xs sm:text-sm text-gray-500">Next working day</p>
                  </div>
                  <div className="ml-auto font-medium text-gray-900 text-sm sm:text-base">£4.99</div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 border border-gray-100 sticky top-4">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="bg-pink-50 p-2 rounded-lg">
                  <ShoppingBagIcon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>

              {/* Order Summary Content - Mobile Optimized */}
              <div className="mt-4 sm:mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-3 sm:py-4 border-b border-gray-100 last:border-b-0">
                    <div className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm font-medium text-gray-900 ml-2">£{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <MinusIcon className="w-4 h-4 text-gray-500" />
                          </button>
                          <span className="text-gray-600 w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                          >
                            <PlusIcon className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs sm:text-sm text-red-500 hover:text-red-600 flex items-center"
                        >
                          <TrashIcon className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty Cart Message - Mobile Friendly */}
              {cartItems.length === 0 && (
                <div className="text-center py-6 sm:py-8">
                  <ShoppingBagIcon className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">Start adding some items to your cart</p>
                  <div className="mt-4 sm:mt-6">
                    <button
                      onClick={() => navigate('/shop')}
                      className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              )}

              {/* Order Summary Totals - Mobile Friendly */}
              {cartItems.length > 0 && (
                <>
                  <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Subtotal</p>
                      <p className="font-medium text-gray-900">£{getTotalPrice()}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-600">Shipping</p>
                      <p className="font-medium text-gray-900">Free</p>
                    </div>
                    <div className="flex justify-between text-base font-medium">
                      <p className="text-gray-900">Total</p>
                      <p className="text-gray-900">£{getTotalPrice()}</p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <PayPalButton formData={formData} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;