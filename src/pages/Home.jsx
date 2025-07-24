import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { fragranceCollections } from "../data/fragrances";
import { PlayIcon as SolidPlayIcon } from "@heroicons/react/24/solid";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoMessage, setVideoMessage] = useState("");
  const [showMoreImages, setShowMoreImages] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const scrollContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  const slides = [
    {
      title: "Discover Your Signature Scent",
      description:
        "Explore our collection of unique fragrances crafted to express your personality.",
      image: "/images/Discovery.jpg",
    },
    {
      title: "Luxury in Every Drop",
      description:
        "Experience the art of perfumery with our premium collection.",
      image: "/images/Laxury.jpeg",
    },
    {
      title: "For Every Moment",
      description:
        "From day to night, find the perfect scent for every occasion.",
      image: "/images/Forevery.jpg",
    },
    {
      title: "Crafted with Love",
      description: "Each fragrance tells a story, what will yours be?",
      image: "/images/love.webp",
    },
    {
      title: "Elegance Personified",
      description: "Discover the essence of sophistication in every bottle.",
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Pure Luxury Collection",
      description: "Indulge in the finest fragrances from around the world.",
      image:
        "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Timeless Beauty",
      description: "Classic scents that never go out of style.",
      image:
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000&auto=format&fit=crop",
    },
    {
      title: "Modern Sophistication",
      description: "Contemporary fragrances for the modern connoisseur.",
      image:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Changed from 2000 to 5000 for slower transitions

    return () => clearInterval(timer);
  }, [slides.length]);

  // Auto-scroll for homepage images
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth - container.clientWidth;
    const scrollInterval = setInterval(() => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 0.5; // Changed from 1 to 0.5 for slower scroll
        // Reset to start when reaching the end
        if (newPosition >= scrollWidth) {
          return 0;
        }
        return newPosition;
      });
    }, 50); // Keep this timing for smooth animation

    return () => clearInterval(scrollInterval);
  }, []);

  // Apply scroll position
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const FragranceCard = ({ fragrance }) => {
    const [isAdding, setIsAdding] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Prevent multiple clicks
        if (isAdding) return;

        // Set loading state
        setIsAdding(true);

        try {
          // Create cart item with all required data
          const cartItem = {
            id: fragrance.id,
            name: fragrance.name,
            price: fragrance.price,
            image: fragrance.image,
            quantity: 1,
            description: fragrance.description,
            collection: fragrance.collection, // Add collection info
          };

          // Add to cart and show feedback
          addToCart(cartItem);

          // Keep button disabled briefly for visual feedback
          setTimeout(() => {
            setIsAdding(false);
          }, 800);
        } catch (error) {
          console.error("Error adding to cart:", error);
          setIsAdding(false);
        }
      },
      [fragrance, addToCart, isAdding]
    );

    return (
      <div className="w-[240px] md:w-[280px] group">
        <div className="flex flex-col items-center">
          {/* Image Container */}
          <Link to={`/product/${fragrance.id}`} className="w-full block">
            <div className="w-full aspect-[1/1] bg-[#FFF5F7] rounded-lg overflow-hidden mb-2 md:mb-3">
              <img
                src={fragrance.image}
                alt={fragrance.name}
                className="w-full h-full object-contain transform transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="w-full text-center space-y-1 md:space-y-1.5">
            <Link to={`/product/${fragrance.id}`}>
              <h3 className="text-sm md:text-base font-medium text-gray-900 hover:text-pink-500">
                {fragrance.name}
              </h3>
            </Link>
            <p className="text-xs md:text-sm text-gray-500 line-clamp-2 px-1 md:px-2">
              {fragrance.description}
            </p>
            <div className="mt-1 md:mt-2">
              <span className="text-sm md:text-base font-semibold text-gray-900">
                £{fragrance.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          aria-label={isAdding ? "Added!" : "Add to cart"}
          className={`w-full py-1.5 md:py-2 px-3 md:px-4 text-xs font-medium rounded-md mt-2 transition-all duration-300 ${
            isAdding
              ? "bg-green-500 text-white cursor-not-allowed opacity-90 transform scale-95"
              : "bg-black text-white hover:bg-pink-500 hover:scale-[0.98] active:scale-95"
          }`}
        >
          {isAdding ? "✓ Added!" : "Add to Cart"}
        </button>
      </div>
    );
  };

  // Combine all fragrances into a single array
  const allFragrances = [
    ...fragranceCollections.mens.map((item) => ({
      ...item,
      collection: "Men's",
    })),
    ...fragranceCollections.womens.map((item) => ({
      ...item,
      collection: "Women's",
    })),
    ...fragranceCollections.sugar.map((item) => ({
      ...item,
      collection: "Sugar",
    })),
  ];

  // Homepage images array
  const homepageImages = [
    { image: "/images/perfume3.jpeg", alt: "Luxury Perfume 1" },
    { image: "/images/perfume4.jpg", alt: "Luxury Perfume 2" },
    { image: "/images/perfume5.webp", alt: "Luxury Perfume 3" },
    { image: "/images/perfumee2.jpg", alt: "Luxury Perfume 4" },
    { image: "/images/Luxuryperfume.jpeg", alt: "Luxury Perfume 5" },
  ];

  // Brand logos data
  const brands = [
    { name: "Chanel", text: "CHANEL" },
    { name: "Dior", text: "DIOR" },
    { name: "Gucci", text: "GUCCI" },
    { name: "Tom Ford", text: "TOM FORD" },
    { name: "Jo Malone", text: "JO MALONE" },
    { name: "Hermès", text: "HERMÈS" },
    { name: "Versace", text: "VERSACE" },
    { name: "YSL", text: "YVES SAINT LAURENT" },
  ];

  // Reviews data
  const reviews = [
    {
      name: "A A R T I",
      title: "LOVE THE FORMULA",
      image: "/images/perfume3.jpeg",
      quotes: [
        "Call me daddy has the perfect shades for day and night looks.",
        "Branding, formulas, colors everything is on POINT!",
      ],
    },
    {
      name: "SARAH M.",
      title: "AMAZING FRAGRANCE",
      image: "/images/perfume4.jpg",
      quotes: [
        "The scent is absolutely divine and long-lasting.",
        "The packaging is luxurious and elegant!",
      ],
    },
    {
      name: "JESSICA K.",
      title: "PERFECT CHOICE",
      image: "/images/perfume5.webp",
      quotes: [
        "This has become my signature scent.",
        "I get compliments everywhere I go!",
      ],
    },
  ];

  // Auto rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 5000); // Changed from 2000 to 5000 for slower transitions

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Log when component mounts
    console.log("Video component mounted");

    // Check if video file exists
    fetch("/videoperfume.mp4")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Video file exists and is accessible");
        setVideoMessage("Video file found successfully");
      })
      .catch((error) => {
        console.error("Error checking video file:", error);
        setVideoMessage(`Error finding video file: ${error.message}`);
        setVideoError(true);
      });
  }, []);

  // Video error handler with more detailed error reporting
  const handleVideoError = (e) => {
    console.error("Video error:", e);
    const video = videoRef.current;
    let errorMessage = "Error loading video. ";

    if (video) {
      errorMessage += `Network State: ${video.networkState}, `;
      errorMessage += `Ready State: ${video.readyState}, `;
      errorMessage += `Error Code: ${
        video.error ? video.error.code : "none"
      }, `;
      errorMessage += `Source: ${video.currentSrc || "none"}`;
    }

    setVideoMessage(errorMessage);
    setVideoError(true);
  };

  // Video loaded handler
  const handleVideoLoaded = () => {
    console.log("Video loaded successfully");
    setVideoError(false);
    setVideoMessage("Video loaded successfully!");

    // Try to play the video
    const playVideo = async () => {
      try {
        await videoRef.current.play();
        console.log("Video playing");
      } catch (err) {
        console.error("Error playing video:", err);
        setVideoMessage(`Error playing video: ${err.message}`);
      }
    };

    playVideo();
  };

  const handleVideoClick = () => {
    if (!showVideo) {
      setShowVideo(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
        }
      }, 100);
      return;
    }

    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const instagramImages = [
    { src: "/images/perfume3.jpeg", alt: "Signature Perfume 1" },
    { src: "/images/perfume4.jpg", alt: "Signature Perfume 2" },
    { src: "/images/perfume5.webp", alt: "Signature Perfume 3" },
    { src: "/images/perfumee2.jpg", alt: "Luxury Collection 1" },
    { src: "/images/Luxuryperfume.jpeg", alt: "Luxury Collection 2" },
    { src: "/images/Midashrush.jpeg", alt: "Premium Collection 1" },
    { src: "/images/midnight.jpeg", alt: "Midnight Collection" },
    { src: "/images/nacture.jpeg", alt: "Nature Collection" },
    { src: "/images/regent1.jpeg", alt: "Regent Collection" },
    { src: "/images/oxfordblue.jpeg", alt: "Oxford Collection" },
    { src: "/images/Laxury.jpeg", alt: "Luxury Collection 3" },
    { src: "/images/Discovery.jpg", alt: "Discovery Collection" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section with Carousel */}
      <div className="relative bg-white min-h-[300px] md:min-h-[500px] overflow-hidden">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.title}
              className="w-full h-full flex-shrink-0 flex flex-col md:grid md:grid-cols-2"
            >
              {/* Left Content Side */}
              <div className="flex flex-col justify-center items-start p-4 md:p-6 lg:px-28 pt-4 md:pt-8 pb-4 md:pb-32 bg-white order-2 md:order-1">
                <h1 className="text-lg md:text-2xl lg:text-3xl font-semibold tracking-tight text-gray-600 mb-2 md:mb-3 max-w-sm">
                  {slide.title}
                </h1>
                <h2 className="text-sm md:text-base lg:text-xl font-semibold tracking-tight text-gray-600 mb-3 md:mb-6 max-w-sm">
                  {slide.description}
                </h2>
                <Link
                  to="/shop"
                  className="inline-block bg-pink-100 hover:bg-pink-200 text-black py-2 md:py-2.5 px-4 md:px-8 lg:px-10 text-sm md:text-base lg:text-lg font-medium transition-colors duration-200"
                >
                  SHOP NOW
                </Link>
              </div>

              {/* Right Image Side */}
              <div className="relative h-[200px] md:h-[300px] lg:h-[350px] order-1 md:order-2">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
  {slides.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      className={`w-3 h-3 rounded-full ${
        currentSlide === index ? 'bg-pink-500' : 'bg-gray-300'
      }`}
    ></button>
  ))}
</div>
      </div>

      {/* Collection Section */}
      <div className="w-full bg-white mt-16 md:-mt-24 lg:-mt-28 relative z-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Title and See More Button */}
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 md:mb-12 space-y-4 md:space-y-0">
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-500">
          All Collections
        </h2>
        <p className="mt-2 text-base md:text-lg text-gray-600">
          Find your perfect fragrance
        </p>
      </div>
      <Link
        to="/shop"
        className="inline-flex items-center justify-center px-6 py-2 md:py-3 text-base font-medium text-black bg-pink-100 hover:bg-pink-200 rounded-md transition-colors duration-200"
      >
        See More
        <svg
          className="ml-2 w-4 h-4 md:w-5 md:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>

    {/* Product Cards Section */}
    <div className="relative">
      <div className="overflow-x-auto hide-scrollbar">
        <div className="inline-flex space-x-4 md:space-x-6 pb-4">
          {allFragrances
            .filter((product) => {
              if (selectedType !== "all" && product.type !== selectedType)
                return false;
              if (
                selectedCategory !== "all" &&
                product.category !== selectedCategory
              )
                return false;
              if (selectedPrice !== "all") {
                const price = parseFloat(product.price);
                switch (selectedPrice) {
                  case "under10":
                    return price < 10;
                  case "10-20":
                    return price >= 10 && price <= 20;
                  case "over20":
                    return price > 20;
                  default:
                    return true;
                }
              }
              return true;
            })
            .map((product) => (
              <div
                key={product.id}
                className="w-[200px] md:w-[260px] flex-shrink-0 transition-transform hover:scale-105 duration-300"
              >
                <FragranceCard fragrance={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
</div>


      {/* Instagram Style Gallery */}

      {/* Rotating Brands Section */}
      <div className="w-full bg-pink-50 py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* First row - moving right */}
            <div className="flex animate-marquee whitespace-nowrap">
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="mx-8 flex items-center justify-center"
                >
                  <span className="text-2xl font-serif text-gray-800 hover:text-pink-600 transition-colors duration-300">
                    {brand.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Second row - moving left */}
            <div className="flex animate-marquee2 whitespace-nowrap mt-8">
              {[...brands.reverse(), ...brands].map((brand, index) => (
                <div
                  key={index}
                  className="mx-8 flex items-center justify-center"
                >
                  <span className="text-2xl font-serif text-gray-800 hover:text-pink-600 transition-colors duration-300">
                    {brand.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Experience Our Latest Collection
          </h2>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-16 h-[2px] bg-pink-200"></div>
            <div className="w-16 h-[2px] bg-pink-300"></div>
            <div className="w-16 h-[2px] bg-pink-400"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the art of perfumery through our curated collection of
            exquisite fragrances
          </p>
        </div>

        <div
          className="relative rounded-lg overflow-hidden shadow-xl cursor-pointer transition-all duration-500"
          onClick={handleVideoClick}
        >
          {/* Cover Design (shown when video is hidden) */}
          {!showVideo && (
            <div className="relative">
              <div className="aspect-video bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('/images/Luxuryperfume.jpeg')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 text-center p-8">
                  <div className="mb-6">
                    <div className="w-20 h-20 rounded-full bg-white bg-opacity-90 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <SolidPlayIcon className="w-10 h-10 text-pink-500" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                    Watch Our Story
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Click to explore the artistry and passion behind our
                    exclusive fragrance collection
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Video (hidden initially) */}
          <div
            className={`transition-all duration-500 ${
              showVideo ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <video
              ref={videoRef}
              className="w-full h-auto"
              loop
              muted
              playsInline
              controls={isPlaying}
              preload="auto"
              onError={handleVideoError}
              onLoadedData={handleVideoLoaded}
            >
              <source src="videoperfume.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {videoMessage && (
              <div
                className={`text-center mt-2 p-2 ${
                  videoError ? "text-red-500" : "text-green-500"
                }`}
              >
                {videoMessage}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}

      {/* Bottom Products Showcase */}
      <div className="w-full bg-pink-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
          {/* Left Image Side */}
          <div className="w-full md:w-1/2 relative h-[300px] md:h-[400px] overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {[
                "/images/perfumee2.jpg",
                "/images/perfume3.jpeg",
                "/images/perfume4.jpg",
                "/images/perfume5.webp",
              ].map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0">
                  <img
                    src={image}
                    alt={`Perfume ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Content Side */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Featured Collection
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-8 max-w-md">
              Discover our handpicked selection of luxury fragrances, crafted
              for those who appreciate the art of perfumery.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-black hover:bg-pink-600 text-white py-3 md:py-4 px-8 md:px-12 text-base md:text-lg font-medium transition-colors duration-200 rounded uppercase tracking-wider"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-16 pt-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
              TESTIMONIAL
            </p>
            <h2 className="mt-2 text-4xl font-bold text-gray-900">
              Customer Reviews
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${currentReview * 100}%)` }}
            >
              <div className="flex">
                {reviews.map((review, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-pink-50 p-8 rounded-lg">
                      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <div className="w-32 h-32 flex-shrink-0">
                          <img
                            src={review.image}
                            alt={`Customer ${review.name}`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="text-center md:text-left max-w-xl">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {review.title}
                          </h3>
                          {review.quotes.map((quote, i) => (
                            <p key={i} className="text-xl text-gray-700 mb-4">
                              "{quote}"
                            </p>
                          ))}
                          <p className="font-medium text-gray-900 text-lg">
                            - {review.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentReview === index ? "w-6 bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 ">
        <div className="max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 lg:pt-8 lg:pb-16 lg:px-8">
          {/* Ingredients/Features Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Jojoba Oil */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-pink-50 rounded-full overflow-hidden p-4">
                  <img
                    src="/images/perfumee2.jpg"
                    alt="Jojoba Oil"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">JOJOBA OIL</h3>
                <p className="text-gray-600 text-sm">
                  Absorbs quickly into your lips to soften and smooth without
                  leaving a greasy film.
                </p>
              </div>

              {/* Avacado Oil */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-pink-50 rounded-full overflow-hidden p-4">
                  <img
                    src="/images/perfume3.jpeg"
                    alt="Avacado Oil"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">AVACADO OIL</h3>
                <p className="text-gray-600 text-sm">
                  Prevent chapping and dryness, its rich antioxidants promote
                  healthy-looking lips with a natural glow.
                </p>
              </div>

              {/* Ozokorite */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-pink-50 rounded-full overflow-hidden p-4">
                  <img
                    src="/images/perfume4.jpg"
                    alt="Ozokorite"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">OZOKORITE</h3>
                <p className="text-gray-600 text-sm">
                  Smooth and creamy texture provides effortless applications,
                  leaving lips with a velvety finish.
                </p>
              </div>

              {/* Shea Butter */}
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 bg-pink-50 rounded-full overflow-hidden p-4">
                  <img
                    src="/images/perfume5.webp"
                    alt="Shea Butter"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">SHEA BUTTER</h3>
                <p className="text-gray-600 text-sm">
                  Moisturizes and nourishes the lips, preventing dryness and
                  flakiness.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 italic">
                Psst...we also send love notes via emails ;)
              </p>
            </div>
          </div>

          {/* Email Signup Section */}
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              SECRET CODES, FREE GIFTS AND ALL THAT JAZZ FOR OUR PEOPLE IN OUR
              EMAIL LIST
            </h2>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="px-6 py-3 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="bg-pink-200 hover:bg-pink-300 text-black py-3 px-6 rounded-md font-medium transition-colors duration-200">
                  SUBMIT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Feed Section */}
      <div className="w-full bg-white pt-8 py-8 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900">
              Follow us on Instagram
            </h2>
            <p className="mt-2 text-sm md:text-lg text-gray-600">
              Trending products
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {instagramImages
              .slice(0, showMoreImages ? 12 : 6)
              .map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden aspect-square"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>
              ))}
          </div>

          <div className="text-center mt-4 md:mt-8">
            <button
              onClick={() => setShowMoreImages(!showMoreImages)}
              className="bg-pink-100 hover:bg-pink-200 text-black px-4 md:px-8 py-2 md:py-3 rounded-md text-sm md:text-base font-medium transition-colors duration-200"
            >
              {showMoreImages ? "Show Less" : "Load more"}
            </button>
          </div>
        </div>
      </div>

      {/* Add Footer at the end */}
      <Footer />
    </div>
  );
};

export default Home;


