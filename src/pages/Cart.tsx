import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

interface CartItem {
    id: number;
    name: string;
    price: string;
    quantity: number;
}

const Cart: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Fetch cart items from your API or local storage
        // This is a mock implementation
        setCartItems([
            { id: 1, name: "Product 1", price: "10.00", quantity: 2 },
            { id: 2, name: "Product 2", price: "15.00", quantity: 1 },
        ]);
    }, []);

    const removeItem = (id: number) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="flex justify-between items-center border-b py-4"
                        >
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">Quantity: {item.quantity}</p>
                                <p className="text-blue-600 font-bold">${item.price}</p>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-red-500">
                                <Trash2 />
                            </button>
                        </motion.div>
                    ))}
                    <div className="mt-6">
                        <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
                        <Link to="/checkout">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
                            >
                                Proceed to Checkout
                            </motion.button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;