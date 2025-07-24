import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getBestsellers } from '../data/fragrances';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

const Bestsellers = () => {
  const [searchParams] = useSearchParams();
  const [sortedProducts, setSortedProducts] = useState([]);
  const bestsellers = getBestsellers();
  const { addToCart } = useCart();

  useEffect(() => {
    const sort = searchParams.get('sort') || 'rating';
    const sortProducts = () => {
      const products = [...bestsellers];
      switch (sort) {
        case 'rating':
          return products.sort((a, b) => b.rating - a.rating);
        case 'reviews':
          return products.sort((a, b) => b.reviews - a.reviews);
        case 'new':
          // Assuming newer products have higher IDs
          return products.sort((a, b) => b.id.localeCompare(a.id));
        case 'staff':
          // You can add a staffPick boolean to products or use a different logic
          return products.filter(p => p.rating >= 4.8);
        default:
          return products;
      }
    };
    setSortedProducts(sortProducts());
  }, [searchParams, bestsellers]);

  const getSectionTitle = () => {
    const sort = searchParams.get('sort');
    switch (sort) {
      case 'rating':
        return 'Top Rated Fragrances';
      case 'reviews':
        return 'Most Popular Fragrances';
      case 'new':
        return 'New Arrivals';
      case 'staff':
        return 'Staff Picks';
      default:
        return 'Our Bestsellers';
    }
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault(); // Prevent navigation from Link
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{getSectionTitle()}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our most loved fragrances, carefully crafted and adored by thousands of customers worldwide.
        </p>
      </div>

      {/* Sort Options */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-md shadow-sm">
          {[
            { key: 'rating', label: 'Top Rated' },
            { key: 'reviews', label: 'Most Popular' },
            { key: 'new', label: 'New Arrivals' },
            { key: 'staff', label: 'Staff Picks' }
          ].map((option, idx) => (
            <Link
              key={option.key}
              to={`/bestsellers?sort=${option.key}`}
              className={`
                px-4 py-2 text-sm font-medium
                ${idx === 0 ? 'rounded-l-md' : ''}
                ${idx === 3 ? 'rounded-r-md' : ''}
                ${searchParams.get('sort') === option.key || (!searchParams.get('sort') && option.key === 'rating')
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'}
                border border-gray-200
                ${idx !== 0 ? 'border-l-0' : ''}
              `}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bestsellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((product) => (
          <div key={product.id} className="group">
            <Link to={`/product/${product.id}`}>
              <div className="relative">
                {/* Bestseller Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    Bestseller
                  </div>
                </div>

                {/* Product Image */}
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/perfume3.jpeg'; // Updated fallback image path
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-pink-500 transition-colors duration-200">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-500">{product.description}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.vibe && product.vibe.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-pink-50 text-xs text-pink-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold text-gray-900">
                      £{(product.price * 0.0096).toFixed(2)}
                    </span>
                    <button 
                      onClick={(e) => handleAddToCart(e, product)}
                      className="bg-black text-white px-4 py-2 text-sm font-medium hover:bg-pink-500 transition-colors duration-200 rounded-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Show message if no products */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-sm text-gray-500">
            Try a different sorting option or check back later for new products.
          </p>
        </div>
      )}

      {/* Featured Benefits */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
            <StarIcon className="h-6 w-6 text-pink-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Top Rated</h3>
          <p className="text-gray-600">Consistently rated 4.5+ stars by our customers</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">100% Authentic</h3>
          <p className="text-gray-600">Guaranteed authentic fragrances</p>
        </div>

        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
            <svg className="h-6 w-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders over £9.99</p>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers; 