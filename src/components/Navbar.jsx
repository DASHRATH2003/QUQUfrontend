import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
  Bars3Icon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import logo from "../assets/removebg.png";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartSidebar from "./CartSidebar";
import Cart from "./Cart";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const { searchQuery, setSearchQuery, isSearchOpen, setIsSearchOpen } =
    useSearch();
  const { getCartCount } = useCart();
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const userDropdownRef = useRef(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fragranceDropdownItems = [
    { name: "Men's Collection", href: "/shop?category=mens" },
    { name: "Women's Collection", href: "/shop?category=womens" },
    { name: "Sugar Collection", href: "/shop?category=sugar" },
    { name: "Perfume Guide", href: "/perfume-guide", highlight: true },
  ];

  const beautyDropdownItems = [
    { name: "Skincare (Coming Soon)", href: "#", disabled: true },
    { name: "Makeup (Coming Soon)", href: "#", disabled: true },
    { name: "Hair Care (Coming Soon)", href: "#", disabled: true },
    { name: "Body Care (Coming Soon)", href: "#", disabled: true },
  ];

  const fashionDropdownItems = [
    { name: "Jewelry (Coming Soon)", href: "#", disabled: true },
    { name: "Bags & Purses (Coming Soon)", href: "#", disabled: true },
    { name: "Watches (Coming Soon)", href: "#", disabled: true },
    { name: "Hair Accessories (Coming Soon)", href: "#", disabled: true },
  ];

  const bestsellerDropdownItems = [
    { name: "Top Rated Fragrances", href: "/bestsellers?sort=rating" },
    { name: "Most Popular", href: "/bestsellers?sort=reviews" },
    { name: "New Arrivals", href: "/bestsellers?sort=new" },
    { name: "Staff Picks", href: "/bestsellers?sort=staff" },
  ];

  const giftSetDropdownItems = [
    { name: "Luxury Collection", href: "/gift-sets?type=luxury" },
    { name: "Discovery Sets", href: "/gift-sets?type=discovery" },
    { name: "Special Occasions", href: "/gift-sets?type=occasions" },
    { name: "Custom Gift Sets", href: "/gift-sets/custom" },
  ];

  const creatorZoneItems = [
    { name: "Join Our Affiliate Program", href: "/creator/affiliate" },
  ];

  const contactDropdownItems = [
    { name: "CONTACT SUPPORT", href: "/contact-support" },
    { name: "Meet The Team", href: "/meet-team" },
    { name: "Our Clean Ingredients", href: "/clean-ingredients" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate("/shop");
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Navigate to shop page when user starts typing
    if (value.trim() && window.location.pathname !== "/shop") {
      navigate("/shop");
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close any open dropdowns when search is opened
    if (!isSearchOpen) {
      setOpenDropdown(null);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  // Don't render until auth is loaded
  if (loading) {
    return null;
  }

  return (
    <header className="w-full bg-white">
      {/* Announcement Bar */}
      <div className="w-full bg-pink-100 px-4 py-2.5 text-center">
        <Link
          to="/shop"
          className="text-gray-700 hover:text-gray-800 text-sm sm:text-base inline-block"
        >
          Whiff of Warmth™ – Solid Perfume That Feels Like a Hug →
        </Link>
      </div>

      <nav className="bg-white shadow-sm">
        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 h-16">
            <button
              className="text-gray-800 hover:text-pink-500 transition-colors duration-200 p-2 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Blur Logo"
                className="h-12 w-auto object-contain max-w-[120px]"
              />
            </Link>

            <div className="flex items-center space-x-1 -mr-2">
              <button
                className="text-gray-800 hover:text-pink-500 transition-colors duration-200 p-2"
                onClick={handleSearchClick}
              >
                {isSearchOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <MagnifyingGlassIcon className="h-6 w-6" />
                )}
              </button>
              {user ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="text-gray-800 hover:text-pink-500 transition-colors duration-200 p-2"
                  >
                    <UserIcon className="h-6 w-6" />
                  </button>

                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>

                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserDropdownOpen(false)}
                      >
                        <div className="flex items-center">
                          <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                          My Orders
                        </div>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                          Logout
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-pink-500 transition-colors duration-200 p-2"
                >
                  <UserIcon className="h-6 w-6" />
                </Link>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="text-gray-800 hover:text-pink-500 transition-colors duration-200 relative p-2"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {getCartCount() > 0 && (
                  <span className="absolute top-1 right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Panel */}
          {isSearchOpen && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-lg px-4 pb-4 z-40 w-full">
              <form onSubmit={handleSearchSubmit} className="pt-4 w-full">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search fragrances..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-base"
                    autoFocus
                  />
                  <MagnifyingGlassIcon className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
          )}

          {/* Mobile Menu Panel */}
          {isMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
              <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 bg-white">
                <button
                  className="text-gray-800 hover:text-pink-500 transition-colors duration-200 p-2 -ml-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <img
                  src={logo}
                  alt="Blur Logo"
                  className="h-12 w-auto object-contain"
                />
                <div className="w-10" /> {/* Spacer for alignment */}
              </div>
              <div className="py-2 bg-white">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                >
                  Home
                </Link>

                {/* Shop Fragrance Section */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "mobile-shop" ? null : "mobile-shop"
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base bg-white"
                  >
                    <span>Shop Fragrance</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openDropdown === "mobile-shop" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openDropdown === "mobile-shop" && (
                    <div className="bg-gray-50">
                      {fragranceDropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-8 py-2 text-sm ${
                            item.highlight ? "text-pink-600" : "text-gray-600"
                          } hover:text-pink-500`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Beauty Products Section */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "mobile-beauty"
                          ? null
                          : "mobile-beauty"
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                  >
                    <span>Beauty Products</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openDropdown === "mobile-beauty" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openDropdown === "mobile-beauty" && (
                    <div className="bg-gray-50 py-2">
                      {beautyDropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!item.disabled) setIsMenuOpen(false);
                          }}
                          className={`block px-8 py-2 text-sm ${
                            item.disabled
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-600 hover:text-pink-500"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fashion Accessories Section */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "mobile-fashion"
                          ? null
                          : "mobile-fashion"
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                  >
                    <span>Fashion Accessories</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openDropdown === "mobile-fashion" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openDropdown === "mobile-fashion" && (
                    <div className="bg-gray-50 py-2">
                      {fashionDropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            if (!item.disabled) setIsMenuOpen(false);
                          }}
                          className={`block px-8 py-2 text-sm ${
                            item.disabled
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-gray-600 hover:text-pink-500"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bestsellers Section */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "mobile-bestsellers"
                          ? null
                          : "mobile-bestsellers"
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                  >
                    <span>Bestsellers</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openDropdown === "mobile-bestsellers"
                          ? "rotate-180"
                          : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openDropdown === "mobile-bestsellers" && (
                    <div className="bg-gray-50 py-2">
                      {bestsellerDropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-pink-500"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Gift Sets Section */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "mobile-gift-sets"
                          ? null
                          : "mobile-gift-sets"
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                  >
                    <span>Gift Sets</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openDropdown === "mobile-gift-sets" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openDropdown === "mobile-gift-sets" && (
                    <div className="bg-gray-50 py-2">
                      {giftSetDropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-pink-500"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Creator Zone Section */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "mobile-creator"
                          ? null
                          : "mobile-creator"
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                  >
                    <span>Creator Zone</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openDropdown === "mobile-creator" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openDropdown === "mobile-creator" && (
                    <div className="bg-gray-50 py-2">
                      {creatorZoneItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-pink-500"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact Section */}
                <div>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "mobile-contact"
                          ? null
                          : "mobile-contact"
                      )
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                  >
                    <span>CONTACT US</span>
                    <span
                      className={`transform transition-transform duration-200 ${
                        openDropdown === "mobile-contact" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openDropdown === "mobile-contact" && (
                    <div className="bg-gray-50 py-2">
                      {contactDropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block px-8 py-2 text-sm text-gray-600 hover:text-pink-500"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2.5 text-gray-800 hover:text-pink-500 text-base"
                >
                  About
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Desktop View - Keep Existing Content */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top Bar with Logo, Search, and Icons */}
            <div className="flex justify-between items-center h-16">
              {/* Search Icon and Input */}
              <div className="flex-shrink-0 flex items-center justify-start relative">
                <button
                  className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                  onClick={handleSearchClick}
                >
                  {isSearchOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <MagnifyingGlassIcon className="h-6 w-6" />
                  )}
                </button>
                {isSearchOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-lg shadow-lg z-50 p-4">
                    <form onSubmit={handleSearchSubmit}>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search fragrances..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          autoFocus
                        />
                        <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Logo */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <Link to="/" className="flex items-center">
                  <img
                    src={logo}
                    alt="Blur Logo"
                    className="h-24 w-auto object-contain"
                  />
                </Link>
              </div>

              {/* User and Cart */}
              <div className="flex-shrink-0 flex items-center justify-end space-x-4">
                {/* User Dropdown */}
                {user ? (
                  <div className="relative" ref={userDropdownRef}>
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="text-gray-600 hover:text-pink-500 transition-colors duration-200"
                    >
                      <UserIcon className="h-6 w-6" />
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500"></p>
                          <p className="text-sm font-medium text-gray-900">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-600">{user?.email}</p>
                        </div>

                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserDropdownOpen(false)}
                        >
                          <div className="flex items-center">
                            <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
                            My Orders
                          </div>
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <div className="flex items-center">
                            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                            Logout
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-gray-600 hover:text-pink-500 transition-colors duration-200 relative"
                  >
                    <UserIcon className="h-6 w-6" />
                  </Link>
                )}

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="text-gray-600 hover:text-pink-500 transition-colors duration-200 relative"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex justify-center space-x-2 py-2 border-t border-gray-100">
              <div className="flex items-center space-x-2 flex-nowrap">
                {/* Regular Home Link */}
                <Link
                  to="/"
                  className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium whitespace-nowrap"
                >
                  Home
                </Link>

                {/* Shop Fragrance with Dropdown */}
                <div className="relative group">
                  <Link
                    to="/shop"
                    className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500 flex items-center"
                    onMouseEnter={() => setOpenDropdown("shop-fragrance")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Shop Fragrance
                    <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </Link>

                  {openDropdown === "shop-fragrance" && (
                    <div
                      className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={() => setOpenDropdown("shop-fragrance")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {fragranceDropdownItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-6 py-3 text-sm hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150
                              ${index !== 0 ? "border-t border-gray-50" : ""}
                              ${
                                item.highlight
                                  ? "bg-pink-50 text-pink-600 font-medium"
                                  : "text-gray-700"
                              }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Beauty Products with Dropdown */}
                <div className="relative group">
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500 flex items-center"
                    onMouseEnter={() => setOpenDropdown("beauty")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Beauty Products
                    <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </Link>

                  {openDropdown === "beauty" && (
                    <div
                      className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={() => setOpenDropdown("beauty")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {beautyDropdownItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-6 py-3 text-sm ${
                              item.disabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                            } transition-colors duration-150
                              ${index !== 0 ? "border-t border-gray-50" : ""}`}
                            onClick={(e) => item.disabled && e.preventDefault()}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              {!item.disabled && (
                                <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  →
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Fashion Accessories with Dropdown */}
                <div className="relative group">
                  <Link
                    to="#"
                    className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500 flex items-center"
                    onMouseEnter={() => setOpenDropdown("fashion")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Fashion Accessories
                    <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </Link>

                  {openDropdown === "fashion" && (
                    <div
                      className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={() => setOpenDropdown("fashion")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {fashionDropdownItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-6 py-3 text-sm ${
                              item.disabled
                                ? "text-gray-400 cursor-not-allowed"
                                : "text-gray-700 hover:bg-pink-50 hover:text-pink-600"
                            } transition-colors duration-150
                              ${index !== 0 ? "border-t border-gray-50" : ""}`}
                            onClick={(e) => item.disabled && e.preventDefault()}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              {!item.disabled && (
                                <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  →
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bestsellers with Dropdown */}
                <div className="relative group">
                  <Link
                    to="/bestsellers"
                    className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500 flex items-center"
                    onMouseEnter={() => setOpenDropdown("bestsellers")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Bestsellers
                    <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </Link>

                  {openDropdown === "bestsellers" && (
                    <div
                      className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={() => setOpenDropdown("bestsellers")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {bestsellerDropdownItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-6 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150
                              ${index !== 0 ? "border-t border-gray-50" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Gift Sets with Dropdown */}
                <div className="relative group">
                  <Link
                    to="/gift-sets"
                    className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500 flex items-center"
                    onMouseEnter={() => setOpenDropdown("gift-sets")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Gift Sets
                    <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </Link>

                  {openDropdown === "gift-sets" && (
                    <div
                      className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={() => setOpenDropdown("gift-sets")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {giftSetDropdownItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-6 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150
                              ${index !== 0 ? "border-t border-gray-50" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Creator Zone with Dropdown */}
                <div className="relative group">
                  <Link
                    to="/creator"
                    className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500 flex items-center"
                    onMouseEnter={() => setOpenDropdown("creator")}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    Creator Zone
                    <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </Link>

                  {openDropdown === "creator" && (
                    <div
                      className="absolute left-0 mt-2 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={() => setOpenDropdown("creator")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {creatorZoneItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-6 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150
                              ${index !== 0 ? "border-t border-gray-50" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Contact Support with Dropdown */}
                <div className="relative group">
                  <button
                    className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium transition-colors duration-200 group-hover:text-pink-500 flex items-center"
                    onMouseEnter={() => setOpenDropdown("contact")}
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "contact" ? null : "contact"
                      )
                    }
                  >
                    CONTACT US
                    <span className="ml-1 inline-block transform group-hover:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </button>

                  {openDropdown === "contact" && (
                    <div
                      className="absolute right-0 mt-0 w-72 bg-white border border-gray-100 rounded-lg shadow-lg z-50"
                      onMouseEnter={() => setOpenDropdown("contact")}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <div className="py-2">
                        {contactDropdownItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`block px-6 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150
                              ${index !== 0 ? "border-t border-gray-50" : ""}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{item.name}</span>
                              <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* About Link */}
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-pink-500 px-2 py-2 text-sm font-medium whitespace-nowrap"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Cart Modal */}
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Navbar;
