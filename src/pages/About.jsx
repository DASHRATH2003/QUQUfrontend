import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 to-purple-100/30" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About QuQu London
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 font-light">
              Beyond Ordinary – A New Era in Fragrance & Beauty
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-12"
        >
          {/* Foundation */}
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2025, QuQu London is a UK-based luxury beauty brand redefining elegance with purpose and innovation. 
              Rooted in the vibrant heart of London, we exist to go beyond the ordinary—crafting beauty experiences that awaken 
              the senses and speak to individuality.
            </p>
          </div>

          {/* Signature Line */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Our Signature Collection</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Our signature line of solid perfumes blends timeless sophistication with modern simplicity, offering a refined 
              alternative to traditional fragrance. Portable, powerful, and deeply personal, each scent is designed to 
              accompany you effortlessly through life's moments.
            </p>
          </div>

          {/* Beyond Perfume */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Beyond Perfume</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              But we're more than perfume. QuQu London is a growing universe of curated beauty products—each one thoughtfully 
              formulated and exquisitely designed to elevate your everyday rituals into experiences of pure luxury.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Our Vision</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              At QuQu London, we believe beauty should feel intimate, enduring, and extraordinary. Join us on our journey 
              as we continue to craft products that embody modern elegance, conscious luxury, and a bold new vision of 
              self-expression.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Elegance */}
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Modern Elegance</h3>
              <p className="text-gray-600">Timeless sophistication meets contemporary design</p>
            </div>

            {/* Innovation */}
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Pushing boundaries in beauty and fragrance</p>
            </div>

            {/* Luxury */}
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Conscious Luxury</h3>
              <p className="text-gray-600">Beauty that cares for you and the world</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 