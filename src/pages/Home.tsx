import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch featured products
    axios.get(`${import.meta.env.VITE_API_URL}/products`).then((response) => {
      setFeaturedProducts(response.data.data);
    });

    // Fetch categories
    axios.get(`${import.meta.env.VITE_API_URL}/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to E-Shop</h1>
          <p className="text-xl mb-8">Discover amazing products at unbeatable prices!</p>
          <Link to="/products" className="bg-white text-purple-600 py-3 px-8 rounded-full font-bold hover:bg-gray-100 transition duration-300">
            Shop Now
          </Link>
        </div>
      </motion.section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer transition-transform duration-300"
                onClick={() => handleCategoryClick(category.name)}
              >
                <h3 className="text-xl font-semibold text-center">{category.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img src={product.photo} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                  <Link to={`/product/${product.id}`} className="text-purple-600 font-semibold hover:text-purple-700 transition duration-300">
                    View Details <ArrowRight className="inline-block ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Quality Products</h3>
              <p className="text-gray-600">We offer only the best products from trusted brands.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Fast Shipping</h3>
              <p className="text-gray-600">Get your orders delivered quickly and efficiently.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is always here to help you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
