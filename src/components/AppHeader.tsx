import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { Category } from '../models/Category';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const cartItems = useCartStore(state => state.cartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const clearAuth = useAuthStore(state => state.clearAuth);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const userData = localStorage.getItem('userData') || user;
  useEffect(() => {
    setIsLoggedIn(!!userData);
  }, [userData]);

  const handleCategorySelect = (category: string) => {
    setIsCategoryOpen(false);
    navigate(`/products?category=${category}&search=${searchQuery}`);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');  
    clearAuth();
    setIsLoggedIn(false);
    navigate('/signin');
    setShowLogoutConfirm(false);
  };

  const handleSearch = () => {
    navigate(`/products?search=${searchQuery}`);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-extrabold">E-Shop</Link>

          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="hover:text-gray-200 transition duration-300 flex items-center"
              >
                Categories <ChevronDown className="ml-1" />
              </button>
              <AnimatePresence>
                {isCategoryOpen && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="fixed inset-0 bg-black bg-opacity-50"
                      onClick={() => setIsCategoryOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-10"
                    >
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategorySelect(category.name)}
                          className="block px-4 py-2 w-full text-left hover:bg-gray-200 transition duration-200"
                        >
                          {category.name}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <Link to="/products" className="hover:text-gray-200 transition duration-300">Products</Link>
            <Link to="/order-history" className="hover:text-gray-200 transition duration-300">Order History</Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white bg-opacity-20 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch();
                }}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" onClick={handleSearch} />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative hover:text-gray-200 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="hover:text-gray-200 transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="hover:text-gray-200 transition duration-300"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                to="/signin"
                className="hover:text-gray-200 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-6 w-6" />
              </Link>
            )}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 space-y-2"
            >
              <div className="relative">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full px-2 py-2 text-left flex items-center justify-between bg-white text-black rounded-lg"
                >
                  Categories <ChevronDown className="ml-1" />
                </button>
                <AnimatePresence>
                  {isCategoryOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsCategoryOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-full bg-white text-black rounded-lg shadow-lg z-10"
                      >
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => handleCategorySelect(category.name)}
                            className="block px-4 py-2 w-full text-left hover:bg-gray-200 transition duration-200"
                          >
                            {category.name}
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/products" className="block py-2" onClick={handleMenuItemClick}>Products</Link>
              <Link to="/order-history" className="block py-2" onClick={handleMenuItemClick}>Order History</Link>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white bg-opacity-20 rounded-full py-2 px-4 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-white"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearch();
                  }}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" onClick={handleSearch} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full mx-4"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4">
                <h3 className="text-xl font-bold text-white">Confirm Logout</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-6">Are you sure you want to log out? You'll need to sign in again to access your account.</p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowLogoutConfirm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;