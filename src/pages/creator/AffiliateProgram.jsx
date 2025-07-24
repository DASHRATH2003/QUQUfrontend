import React from 'react';
import { Link } from 'react-router-dom';

const AffiliateProgram = () => {
  const benefits = [
    {
      title: "High Commission Rates",
      description: "Earn up to 20% commission on every successful referral sale",
      icon: "💰"
    },
    {
      title: "30-Day Cookie Duration",
      description: "Get credited for sales made within 30 days of customer's first visit",
      icon: "🍪"
    },
    {
      title: "Real-Time Analytics",
      description: "Track your performance with detailed analytics and reporting",
      icon: "📊"
    },
    {
      title: "Monthly Payments",
      description: "Reliable monthly payments directly to your account",
      icon: "💳"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Complete our simple registration form to join the program"
    },
    {
      number: 2,
      title: "Get Approved",
      description: "Quick review process, usually within 24-48 hours"
    },
    {
      number: 3,
      title: "Share & Earn",
      description: "Start sharing your unique links and earn commissions"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join Our Affiliate Program
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Partner with us and earn competitive commissions by promoting our premium fragrances
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors duration-300">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Program?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold text-xl mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Commission Structure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Commission Structure</h2>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-lg font-medium">Sales Volume (Monthly)</span>
              <span className="text-lg font-medium">Commission Rate</span>
            </div>
            <div className="flex justify-between items-center">
              <span>£0 - £1,000</span>
              <span className="font-semibold">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>£1,001 - £5,000</span>
              <span className="font-semibold">17%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>£5,001+</span>
              <span className="font-semibold">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">How do I get paid?</h3>
              <p className="text-gray-600">We process payments monthly via bank transfer for all earnings above £50.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">When do I get paid?</h3>
              <p className="text-gray-600">Payments are processed on the 1st of each month for the previous month's earnings.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">What promotional materials do you provide?</h3>
              <p className="text-gray-600">We provide banners, product images, text links, and exclusive promotional codes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our affiliate program today and start earning competitive commissions while promoting premium fragrances.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors duration-300">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AffiliateProgram; 