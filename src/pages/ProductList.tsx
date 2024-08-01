import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Filter } from 'lucide-react';

const ProductListPage: React.FC = () => {
  const [sortBy, setSortBy] = useState('popularity');
  const [showFilters, setShowFilters] = useState(false);

  // Mock product data
  const products = [
    { id: 1, name: "Wireless Earbuds", price: 99.99, rating: 4.5, image: "https://via.placeholder.com/300x300" },
    { id: 2, name: "Smart Speaker", price: 79.99, rating: 4.2, image: "https://via.placeholder.com/300x300" },
    { id: 3, name: "Fitness Tracker", price: 49.99, rating: 4.0, image: "https://via.placeholder.com/300x300" },
    { id: 4, name: "4K Action Camera", price: 199.99, rating: 4.7, image: "https://via.placeholder.com/300x300" },
    { id: 5, name: "Bluetooth Keyboard", price: 59.99, rating: 4.3, image: "https://via.placeholder.com/300x300" },
    { id: 6, name: "Noise-Cancelling Headphones", price: 249.99, rating: 4.8, image: "https://via.placeholder.com/300x300" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>
        
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center bg-white px-4 py-2 rounded-lg shadow"
          >
            <Filter className="mr-2" /> Filters
          </button>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white px-4 py-2 rounded-lg shadow"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white p-4 rounded-lg shadow mb-6"
          >
            {/* Add filter options here */}
            <h2 className="font-semibold mb-2">Price Range</h2>
            <input type="range" min="0" max="500" className="w-full" />
            {/* Add more filter options as needed */}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1">{product.rating}</span>
                </div>
                <Link 
                  to={`/product/${product.id}`}
                  className="bg-purple-600 text-white px-4 py-2 rounded-full inline-block hover:bg-purple-700 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;