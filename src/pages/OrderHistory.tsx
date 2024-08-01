import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Order } from '../models/Order';

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<Order[]>(`${import.meta.env.VITE_API_URL}/orders`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b last:border-b-0"
              >
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="h-6 w-6 text-gray-500 mr-4" />
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                      <p className="text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className={`text-gray-500 mr-4 ${order.status === 'Delivered' ? 'text-green-500' : 'text-red-500'}`}>{order.status}</p>
                    <ChevronRight className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-6 text-center">No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
