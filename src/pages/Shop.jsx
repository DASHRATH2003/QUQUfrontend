import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import api from '../utils/axios';
import { fragranceCollections } from '../data/fragrances';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loadingStates, setLoadingStates] = useState({});
  const [dbProducts, setDbProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchQuery } = useSearch();
  const { addToCart } = useCart();

  // Convert static products to match DB format
  const staticProducts = [
    ...fragranceCollections.mens.map(p => ({
      ...p,
      _id: p.id,
      category: 'mens',
      createdAt: new Date().toISOString()
    })),
    ...fragranceCollections.womens.map(p => ({
      ...p,
      _id: p.id,
      category: 'womens',
      createdAt: new Date().toISOString()
    })),
    ...fragranceCollections.sugar.map(p => ({
      ...p,
      _id: p.id,
      category: 'sugar',
      createdAt: new Date().toISOString()
    }))
  ];

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/products');
      setDbProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update category when URL parameter changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && ['mens', 'womens', 'sugar'].includes(categoryFromUrl)) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  // Get filtered products based on category and search query
  const getFilteredProducts = () => {
    // Merge static and DB products
    let allProducts = [...staticProducts, ...dbProducts];

    // Remove duplicates based on _id
    allProducts = allProducts.filter((product, index, self) =>
      index === self.findIndex((p) => p._id === product._id)
    );

    // Filter by category
    if (selectedCategory !== 'all') {
      allProducts = allProducts.filter(product => product.category === selectedCategory);
    }

    // If there's a search query, filter the products
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      allProducts = allProducts.filter(product => {
        const searchFields = [
          product.name,
          product.description,
          product.category
        ];
        
        return searchFields.some(field => 
          field && field.toLowerCase().includes(query)
        );
      });
    }

    // Sort products
    return allProducts.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  };

  const filteredProducts = getFilteredProducts();

  const categories = [
    { id: 'all', name: 'All Collections' },
    { id: 'mens', name: "Men's Collection" },
    { id: 'womens', name: "Women's Collection" },
    { id: 'sugar', name: 'Sugar Collection' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' }
  ];

  const handleAddToCart = async (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    setLoadingStates(prev => ({ ...prev, [product._id]: true }));

    try {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        description: product.description
      });

      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [product._id]: false }));
      }, 300);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setLoadingStates(prev => ({ ...prev, [product._id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {categories.find(cat => cat.id === selectedCategory)?.name || 'All Collections'}
        </h1>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 py-2 px-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-md border-gray-300 py-2 px-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results Count when searching */}
      {searchQuery.trim() && (
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Product List with Horizontal Scroll */}
      <div className="relative">
        <div className="overflow-x-auto hide-scrollbar">
          <div className="inline-flex space-x-8 pb-4">
            {filteredProducts.map((product) => (
              <div key={product._id} className="w-[300px] flex-shrink-0">
                <div className="group">
                  <Link
                    to={`/product/${product._id}`}
                    className="block"
                  >
                    <div className="relative">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-pink-500 transition-colors duration-200">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        <div className="mt-2">
                          <span className="text-lg font-medium text-gray-900">£{product.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <button 
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={loadingStates[product._id]}
                    className={`mt-4 w-full py-2 px-4 text-sm font-medium rounded transition-all duration-200 ${
                      loadingStates[product._id]
                        ? 'bg-pink-500 text-white cursor-not-allowed opacity-75'
                        : 'bg-black text-white hover:bg-pink-500'
                    }`}
                  >
                    {loadingStates[product._id] ? 'ADDING...' : 'ADD TO CART'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery.trim() 
              ? `No products match your search "${searchQuery}". Try different keywords or clear your search.`
              : 'Try changing your filters or check back later for new products.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop; 