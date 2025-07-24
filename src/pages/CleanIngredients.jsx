import React from 'react';
import { Link } from 'react-router-dom';

const CleanIngredients = () => {
  const ingredients = [
    {
      name: 'Essential Oils',
      description: 'Pure, natural oils extracted from plants and flowers',
      benefits: ['100% Natural', 'Sustainably Sourced', 'Long-lasting Fragrance'],
      icon: '🌺'
    },
    {
      name: 'Organic Alcohol',
              description: "Plant-based alcohol that's gentle on skin",
      benefits: ['Organic', 'Non-irritating', 'Quick-drying'],
      icon: '🌱'
    },
    {
      name: 'Natural Fixatives',
      description: 'Plant-derived ingredients that help scents last longer',
      benefits: ['Cruelty-free', 'Biodegradable', 'Environmentally friendly'],
      icon: '🍃'
    },
    {
      name: 'Pure Water',
      description: 'Triple-filtered water for perfect dilution',
      benefits: ['Pure', 'Clean', 'pH Balanced'],
      icon: '💧'
    }
  ];

  const certifications = [
    {
      name: 'Cruelty Free',
      description: 'Never tested on animals',
      icon: '🐰'
    },
    {
      name: 'Vegan Friendly',
      description: 'No animal-derived ingredients',
      icon: '🌱'
    },
    {
      name: 'Eco-Certified',
      description: 'Environmentally sustainable practices',
      icon: '🌍'
    },
    {
      name: 'Natural Origin',
      description: '95%+ natural ingredients',
      icon: '🌿'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Our Clean Ingredients
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            We believe in transparency. Every ingredient we use is carefully selected for its purity, sustainability, and effectiveness.
          </p>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Ingredients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ingredients.map((ingredient) => (
            <div key={ingredient.name} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">{ingredient.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{ingredient.name}</h3>
              <p className="text-gray-600 mb-4">{ingredient.description}</p>
              <div className="space-y-2">
                {ingredient.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-pink-500 mr-2">✓</span>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Commitment Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Commitment to Clean Beauty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert) => (
              <div key={cert.name} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl mb-4">{cert.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{cert.name}</h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ingredient Policy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-pink-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Our "Never List"</h2>
          <p className="text-gray-600 mb-8">
            We are committed to creating clean, safe fragrances. Here are some ingredients you'll never find in our products:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">✕</span>
              <span>Parabens</span>
            </div>
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">✕</span>
              <span>Phthalates</span>
            </div>
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">✕</span>
              <span>Synthetic Colors</span>
            </div>
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">✕</span>
              <span>Formaldehyde</span>
            </div>
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">✕</span>
              <span>Sulfates</span>
            </div>
            <div className="flex items-center">
              <span className="text-pink-500 mr-2">✕</span>
              <span>Mineral Oil</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience Clean Fragrance</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our collection of clean, natural fragrances made with ingredients you can trust.
          </p>
          <Link 
            to="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CleanIngredients; 