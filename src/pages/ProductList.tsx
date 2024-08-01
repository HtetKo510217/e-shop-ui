import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    photo: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Fetch products from your Laravel API
        fetch('http://127.0.0.1:8000/api/products')
            .then(response => response.json())
            .then(data => setProducts(data.data));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                        <Link to={`/product/${product.id}`}>
                            <img src={product.photo} alt={product.name} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                                <p className="text-gray-600 mb-2">{product.description.substring(0, 100)}...</p>
                                <p className="text-lg font-bold text-blue-600">${product.price}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;