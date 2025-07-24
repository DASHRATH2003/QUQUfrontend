import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';
import CartSidebar from '../components/CartSidebar';

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Temporary product data (will be fetched from API later)
  const product = {
    id: 1,
    name: 'Smells Like... Solid Perfume',
    price: 299,
    description: 'A nostalgic fragrance that brings back memories of warm hugs and cozy moments. This solid perfume is perfect for on-the-go touch-ups and fits easily in your bag.',
    category: 'Fragrances',
    image: '/images/perfume.jpg',
    stock: 10,
    rating: 4.5,
    color: 'Bubblegum Pink',
    reviews: [
      {
        id: 1,
        user: 'Sarah M.',
        rating: 5,
        comment: 'Absolutely love this perfume! The scent is amazing and lasts all day.',
        date: '2024-03-15'
      },
      {
        id: 2,
        user: 'Priya R.',
        rating: 4,
        comment: 'Great product, very convenient to carry around.',
        date: '2024-03-10'
      }
    ]
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>
            
            {/* Price */}
            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">Rs. {product.price}.00</p>
            </div>

            {/* Rating */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                      } h-5 w-5 flex-shrink-0`}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-500">
                  {product.rating} out of 5 stars
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-900">{product.description}</p>
            </div>

            {/* Color */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <div className="flex items-center">
                <label htmlFor="quantity" className="mr-4 text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-black border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Add to Cart
              </button>
            </div>

            {/* Reviews */}
            <div className="mt-16">
              <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
              <div className="mt-6 space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-t border-gray-200 pt-6">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`${
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300'
                            } h-5 w-5 flex-shrink-0`}
                          />
                        ))}
                      </div>
                      <p className="ml-3 text-sm text-gray-500">{review.user}</p>
                    </div>
                    <div className="mt-4 space-y-6">
                      <p className="text-base text-gray-900">{review.comment}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default ProductDetails; 