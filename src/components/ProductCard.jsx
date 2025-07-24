import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = React.memo(({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Set loading state immediately
    setIsAdding(true);
    
    // Prepare cart item with all required data
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: typeof product.image === 'string' ? product.image : product.image.src || product.image,
      quantity: 1,
      description: product.description
    };
    
    // Add to cart
    addToCart(cartItem);
    
    // Reset button state after a shorter delay
    setTimeout(() => {
      setIsAdding(false);
    }, 150); // Faster feedback
  }, [product, addToCart]);

  const imageUrl = useMemo(() => 
    typeof product.image === 'string' ? product.image : product.image.src || product.image,
    [product.image]
  );

  return (
    <div className="w-[240px] md:w-[280px] group">
      <div className="flex flex-col items-center">
        {/* Image Container - Link only on the image */}
        <Link to={`/product/${product.id}`} className="w-full">
          <div className="w-full aspect-[1/1] bg-[#FFF5F7] rounded-lg overflow-hidden mb-2 md:mb-3">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain transform hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link> 

        {/* Product Info - Centered */}
        <div className="w-full text-center space-y-1 md:space-y-1.5">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm md:text-base font-medium text-gray-900 hover:text-pink-500">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs md:text-sm text-gray-500 line-clamp-2 px-1 md:px-2">
            {product.description}
          </p>
          <div className="mt-1 md:mt-2">
            <span className="text-sm md:text-base font-semibold text-gray-900">
              £{product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleAddToCart}
        disabled={isAdding}
        aria-label={isAdding ? 'Added!' : 'Add to cart'}
        className={`w-full py-1.5 md:py-2 px-3 md:px-4 text-xs font-medium rounded-md mt-2 transition-colors duration-150 ${
          isAdding 
            ? 'bg-green-500 text-white'
            : 'bg-black text-white hover:bg-pink-500'
        }`}
      >
        {isAdding ? '✓ Added!' : 'Add to Cart'}
      </button>
    </div>
  );
});

export default ProductCard; 