import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the backend
    fetch('http://127.0.0.1:8000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategorySelect = (category: string) => {
    setIsCategoryOpen(false);
    navigate(`/products?category=${category}`);
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
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg"
                >
                  {categories.map((category: { id: number, name: string }) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.name)}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                    >
                      {category.name}
                    </button>
                  ))}
                </motion.div>
              )}
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
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="hover:text-gray-200 transition duration-300">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link to="/signin" className="hover:text-gray-200 transition duration-300">
              <User className="h-6 w-6" />
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 space-y-2"
          >
            <Link to="/products" className="block py-2">Products</Link>
            <Link to="/order-history" className="block py-2">Order History</Link>
            <Link to="/cart" className="block py-2">Cart</Link>
            <Link to="/signin" className="block py-2">Sign In</Link>
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white bg-opacity-20 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-300" />
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
