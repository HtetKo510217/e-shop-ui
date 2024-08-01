import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../models/Product';

const ProductListPage: React.FC = () => {
    const [sortBy, setSortBy] = useState<string>('popularity');
    const [products, setProducts] = useState<Product[]>([]);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const categoryId = params.get('category');

        // Fetch products based on category
        axios.get(`${import.meta.env.VITE_API_URL}/products${categoryId ? `?category=${categoryId}` : ''}`).then(response => {
            setProducts(response.data.data);
        });
    }, [location.search]);

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Our Products</h1>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img src={product.photo} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-2">${product.price}</p>
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
