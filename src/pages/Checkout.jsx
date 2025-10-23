import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PayPalButton from '../components/PayPalButton';
import { ShoppingBagIcon, TruckIcon, CreditCardIcon, CheckCircleIcon, PlusIcon, MinusIcon, TrashIcon } from '@heroicons/react/24/outline';
import api from '../utils/axios';
import toast from 'react-hot-toast';

// Countries list
const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", 
  "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic",
  "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
  "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau",
  "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia",
  "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
  "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
  "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden",
  "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
  "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
  "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
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
    state: '',
    country: 'United Kingdom',
    postcode: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address || 
        !formData.city || !formData.country || !formData.postcode) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Show order summary
    setShowOrderSummary(true);
    setCurrentStep(2);
  };

  const createInitialOrder = async () => {
    try {
      // Create order data
      const orderData = {
        items: cartItems.map(item => ({
          name: item.name,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
          image: item.image || item.imageUrl
        })),
        totalAmount: parseFloat(getTotalPrice()),
        shippingAddress: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          street: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country
        },
        paymentMethod: 'Pending',
        paymentStatus: 'pending',
        deliveryOption: deliveryOption
      };

      // Save initial order
      const response = await api.post('/api/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating initial order:', error);
      return null;
    }
  };

  const getShippingCost = () => {
    return deliveryOption === 'express' ? 4.99 : 0;
  };

  const getTotalWithShipping = () => { // Add this function
    return (parseFloat(getTotalPrice()) + getShippingCost()).toFixed(2);
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Checkout Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="max-w-2xl mx-auto">
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
                    <div className="hidden sm:block w-16 mx-4 h-0.5 bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-3">
            {currentStep === 1 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                {/* Delivery Information */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-pink-50 p-2 rounded-lg">
                      <TruckIcon className="w-5 h-5 text-pink-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Delivery Information</h2>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Personal Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                          required
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                        required
                        placeholder="Enter your phone number"
                      />
                    </div>

                    {/* Address Information */}
                    <div className="pt-5 border-t border-gray-100">
                      <h3 className="text-base font-medium text-gray-900 mb-4">Delivery Address</h3>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                            required
                            placeholder="Enter your street address"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                              required
                              placeholder="Enter city"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Postcode</label>
                            <input
                              type="text"
                              name="postcode"
                              value={formData.postcode}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                              required
                              placeholder="Enter postcode"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 bg-white"
                              required
                            >
                              {COUNTRIES.map(country => (
                                <option key={country} value={country}>{country}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">State/Province</label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200"
                              placeholder="Enter state/province"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Delivery Options */}
                <div className="border-t border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="bg-pink-50 p-2 rounded-lg">
                        <TruckIcon className="w-5 h-5 text-pink-500" />
                      </div>
                      <h2 className="text-base font-semibold text-gray-900">Delivery Options</h2>
                    </div>

                    <div className="space-y-3">
                      <label className="block p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:border-pink-500 hover:bg-pink-50
                        ${deliveryOption === 'standard' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}">
                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          checked={deliveryOption === 'standard'}
                          onChange={() => handleDeliveryOptionChange('standard')}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Standard Delivery</p>
                            <p className="text-xs text-gray-500 mt-0.5">3-5 working days</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-green-600">Free</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              deliveryOption === 'standard' ? 'border-pink-500 bg-pink-500' : 'border-gray-300'
                            }`}>
                              <div className={`w-2 h-2 rounded-full bg-white ${
                                deliveryOption === 'standard' ? 'opacity-100' : 'opacity-0'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </label>

                      <label className="block p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:border-pink-500 hover:bg-pink-50
                        ${deliveryOption === 'express' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'}">
                        <input
                          type="radio"
                          name="delivery"
                          value="express"
                          checked={deliveryOption === 'express'}
                          onChange={() => handleDeliveryOptionChange('express')}
                          className="sr-only"
                        />
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Express Delivery</p>
                            <p className="text-xs text-gray-500 mt-0.5">Next working day</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-900">£4.99</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              deliveryOption === 'express' ? 'border-pink-500 bg-pink-500' : 'border-gray-300'
                            }`}>
                              <div className={`w-2 h-2 rounded-full bg-white ${
                                deliveryOption === 'express' ? 'opacity-100' : 'opacity-0'
                              }`} />
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-6 border-t border-gray-100">
                  <button
                    type="submit"
                    onClick={handleFormSubmit}
                    className="w-full bg-pink-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-200 flex items-center justify-center"
                  >
                    Continue to Payment
                    <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Payment Section */}
            {currentStep === 2 && showOrderSummary && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-pink-50 p-2 rounded-lg">
                      <CreditCardIcon className="w-5 h-5 text-pink-500" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Address</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{formData.name}</p>
                        <p>{formData.email}</p>
                        <p>{formData.phone}</p>
                        <p>{formData.address}</p>
                        <p>{formData.city}, {formData.state}</p>
                        <p>{formData.postcode}</p>
                        <p>{formData.country}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Delivery Method</h3>
                      <div className="text-sm text-gray-600">
                        <p>{deliveryOption === 'express' ? 'Express Delivery (Next working day)' : 'Standard Delivery (3-5 working days)'}</p>
                        <p className="mt-1 font-medium">{deliveryOption === 'express' ? '£4.99' : 'Free'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-2">
            {showOrderSummary && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-4">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-pink-50 p-2 rounded-lg">
                      <ShoppingBagIcon className="w-5 h-5 text-pink-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>
                  </div>

                  {/* Order Summary Content */}
                  <div className="mt-4 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
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
                              className="text-xs text-red-500 hover:text-red-600 flex items-center"
                            >
                              <TrashIcon className="w-4 h-4 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty Cart Message */}
                  {cartItems.length === 0 && (
                    <div className="text-center py-6">
                      <ShoppingBagIcon className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                      <p className="mt-1 text-xs text-gray-500">Start adding some items to your cart</p>
                      <div className="mt-4">
                        <button
                          onClick={() => navigate('/shop')}
                          className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Order Summary Totals */}
                  {cartItems.length > 0 && (
                    <>
                      <div className="mt-4 border-t border-gray-200 pt-4 space-y-3">
                        <div className="flex justify-between text-sm">
                          <p className="text-gray-600">Subtotal</p>
                          <p className="font-medium text-gray-900">£{getTotalPrice()}</p>
                        </div>
                        <div className="flex justify-between text-sm">
                          <p className="text-gray-600">Shipping</p>
                          <p className="font-medium text-gray-900">
                            {getShippingCost() === 0 ? 'Free' : `£${getShippingCost().toFixed(2)}`}
                          </p>
                        </div>
                        <div className="flex justify-between text-base font-medium">
                          <p className="text-gray-900">Total</p>
                          <p className="text-gray-900">£{getTotalWithShipping()}</p>
                        </div>
                      </div>

                      {/* Payment Methods */}
                      <div className="mt-6 space-y-4">
                        <PayPalButton formData={{...formData, deliveryOption}} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;