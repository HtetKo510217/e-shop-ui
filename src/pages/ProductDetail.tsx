import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../models/Product';
import { useCartStore } from '../store/cartStore';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <motion.img
                src={product.photo && product.photo.startsWith("http") ? product.photo : `${import.meta.env.VITE_IMAGE_URL}/${product.photo}`}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex mt-4 space-x-4">
                <img
                  src={product.photo && product.photo.startsWith("http") ? product.photo : `${import.meta.env.VITE_IMAGE_URL}/${product.photo}`}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.price / 50) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {Math.floor(product.price / 50)} ({product.stock} in stock)
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-600 mb-4">${product.price}</p>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <h2 className="font-semibold mb-2">Key Features:</h2>
                <ul className="list-disc list-inside">
                  {['Feature 1', 'Feature 2', 'Feature 3'].map((feature, index) => (
                    <li key={index} className="text-gray-600">{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center mb-6">
                <label htmlFor="quantity" className="mr-4">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border rounded-md px-2 py-1 w-16 text-center"
                />
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addToCart({ ...product, quantity })}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full flex items-center"
                >
                  <ShoppingCart className="mr-2" />
                  Add to Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-purple-600 text-purple-600 px-6 py-3 rounded-full flex items-center"
                >
                  <Heart className="mr-2" />
                  Add to Wishlist
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

