import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiftIcon, SparklesIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const GiftSets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get('type') || 'all';
  const { addToCart } = useCart();

  const [selectedSet, setSelectedSet] = useState(null);

  const giftSets = {
    luxury: [
      {
        id: 'luxury-1',
        name: 'The Royal Collection',
        price: 12999,
        description: 'Our most prestigious collection featuring three full-size signature fragrances.',
        image: '/images/Luxuryperfume.jpeg',
        includes: ['Midnight Mystique', 'Royal Oud', 'Golden Amber'],
        features: ['Premium Gift Box', 'Certificate of Authenticity', 'Luxury Gift Wrap']
      },
      {
        id: 'luxury-2',
        name: 'The Exclusive Edition',
        price: 15999,
        description: 'Limited edition set with rare and exclusive fragrances.',
        image: '/images/midnight.jpeg',
        includes: ['Rare Rose', 'Precious Oud', 'Imperial Saffron'],
        features: ['Numbered Edition', 'Wooden Display Box', 'VIP Card']
      }
    ],
    discovery: [
      {
        id: 'discovery-1',
        name: 'The Explorer Set',
        price: 4999,
        description: 'Perfect introduction to our bestselling fragrances.',
        image: '/src/assets/Discoversign.jpeg',
        includes: ['5 Travel-Size Fragrances', 'Fragrance Guide', 'Gift Pouch'],
        features: ['Perfect for Travel', 'Mix of Scents', 'Reusable Case']
      },
      {
        id: 'discovery-2',
        name: 'The Seasonal Collection',
        price: 5999,
        description: 'Curated selection of seasonal favorites.',
        image: '/src/assets/nacture.jpeg',
        includes: ['4 Season-Specific Scents', 'Season Guide', 'Travel Atomizer'],
        features: ['Seasonal Rotation', 'Travel-Friendly', 'Gift Ready']
      }
    ],
    occasions: [
      {
        id: 'occasion-1',
        name: 'The Celebration Set',
        price: 8999,
        description: 'Perfect for special moments and celebrations.',
        image: '/src/assets/Midashrush.jpeg',
        includes: ['2 Full-Size Fragrances', 'Matching Body Lotion', 'Scented Candle'],
        features: ['Celebration Box', 'Greeting Card', 'Gift Wrapping']
      },
      {
        id: 'occasion-2',
        name: 'The Wedding Collection',
        price: 9999,
        description: 'Specially curated for wedding celebrations.',
        image: '/src/assets/oxfordblue.jpeg',
        includes: ['His & Her Fragrances', 'Love Notes Collection', 'Mini Travel Sizes'],
        features: ['White Box Edition', 'Wedding Card', 'Special Packaging']
      }
    ]
  };

  const handleTypeChange = (type) => {
    navigate(`/gift-sets${type === 'all' ? '' : `?type=${type}`}`);
  };

  const handleAddToCart = (set) => {
    const cartItem = {
      id: set.id,
      name: set.name,
      price: set.price,
      image: set.image,
      quantity: 1,
      type: 'gift-set'
    };
    addToCart(cartItem);
  };

  const renderGiftSet = (set) => (
    <div 
      key={set.id}
      className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-square">
        <img
          src={set.image}
          alt={set.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-black text-white px-4 py-1 rounded-full text-sm">
          Premium
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{set.name}</h3>
        <p className="text-gray-600 mb-4">{set.description}</p>
        
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2">Includes:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {set.includes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Features:</h4>
          <ul className="list-disc list-inside text-gray-600">
            {set.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">£{(set.price * 0.0096).toFixed(2)}</span>
          <button 
            onClick={() => handleAddToCart(set)}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors duration-200 flex items-center space-x-2"
          >
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Luxury Gift Sets</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collection of premium gift sets, perfect for every occasion and celebration.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => handleTypeChange('all')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${currentType === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            All Sets
          </button>
          <button
            onClick={() => handleTypeChange('luxury')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${currentType === 'luxury' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Luxury Collection
          </button>
          <button
            onClick={() => handleTypeChange('discovery')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${currentType === 'discovery' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Discovery Sets
          </button>
          <button
            onClick={() => handleTypeChange('occasions')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 
              ${currentType === 'occasions' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            Special Occasions
          </button>
        </div>

        {/* Gift Sets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentType === 'all' ? (
            <>
              {Object.values(giftSets).flat().map(renderGiftSet)}
            </>
          ) : (
            <>
              {giftSets[currentType]?.map(renderGiftSet)}
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GiftIcon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Packaging</h3>
              <p className="text-gray-600">Luxurious presentation for every set</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authenticity</h3>
              <p className="text-gray-600">Guaranteed genuine products</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartIcon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalization</h3>
              <p className="text-gray-600">Custom options available</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Value Sets</h3>
              <p className="text-gray-600">Special bundle pricing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Gift Service */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Looking for Something Special?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our gift concierge service can help you create the perfect custom gift set.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-pink-600 transition-colors duration-200">
            Contact Gift Concierge
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftSets; 