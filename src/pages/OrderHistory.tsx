import React from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';

const OrderHistoryPage: React.FC = () => {
  const orders = [
    { id: '1234', date: '2024-07-15', status: 'Delivered', total: 179.98 },
    { id: '1235', date: '2024-07-10', status: 'Shipped', total: 59.99 },
    { id: '1236', date: '2024-07-05', status: 'Processing', total: 99.99 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Order History</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {orders.map((order, index) => (
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
                    <p className="text-gray-500">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-500 mr-4">{order.status}</p>
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;