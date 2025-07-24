import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-pink-900 opacity-95"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        {/* Main Footer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex flex-col items-start">
                <h3 className="text-2xl font-bold text-white mb-2">QUQU LONDON</h3>
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Experience luxury perfumes crafted with the finest ingredients. 
                Your signature scent awaits in our exclusive collection of premium fragrances.
              </p>
              <div className="flex space-x-6">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-pink-500 transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold text-white mb-2">Quick Links</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              </div>
              <ul className="space-y-4">
                <li>
                  <Link to="/shop" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">Shop</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">About Us</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">Contact</Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">Blog</Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold text-white mb-2">Categories</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              </div>
              <ul className="space-y-4">
                <li>
                  <Link to="/category/mens" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">Men's Collection</Link>
                </li>
                <li>
                  <Link to="/category/womens" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">Women's Collection</Link>
                </li>
                <li>
                  <Link to="/category/unisex" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">Unisex Fragrances</Link>
                </li>
                <li>
                  <Link to="/category/gift-sets" className="text-gray-300 hover:text-pink-400 transition-colors duration-300">Gift Sets</Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              </div>
              <p className="text-gray-300 text-sm">
                Subscribe to our newsletter for exclusive offers and updates.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="relative border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="md:flex md:items-center md:justify-between">
              <div className="text-sm text-gray-400">
                © {new Date().getFullYear()} QUQU LONDON. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0">
                <ul className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm text-gray-400">
                  <li>
                    <Link to="/privacy-policy" className="hover:text-pink-400 transition-colors duration-300">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms" className="hover:text-pink-400 transition-colors duration-300">Terms of Service</Link>
                  </li>
                  <li>
                    <Link to="/shipping" className="hover:text-pink-400 transition-colors duration-300">Shipping Info</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 