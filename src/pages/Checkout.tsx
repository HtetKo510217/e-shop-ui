import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useNavigate } from 'react-router-dom';
const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const { cartItems, clearCart } = useCartStore((state) => ({
    cartItems: state.cartItems,
    clearCart: state.clearCart,
  }));

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  const handlePlaceOrder = () => {
    clearCart();
    setStep(3);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>1</div>
            <div className={`h-1 w-16 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>2</div>
            <div className={`h-1 w-16 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}>3</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Full Name</label>
                    <input type="text" id="name" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block mb-2">Address</label>
                    <input type="text" id="address" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="city" className="block mb-2">City</label>
                    <input type="text" id="city" className="w-full p-2 border rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="state" className="block mb-2">State</label>
                      <input type="text" id="state" className="w-full p-2 border rounded" />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block mb-2">ZIP Code</label>
                      <input type="text" id="zip" className="w-full p-2 border rounded" />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setStep(2)} 
                    className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
                  >
                    Continue to Payment
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="cardNumber" className="block mb-2">Card Number</label>
                    <input type="text" id="cardNumber" className="w-full p-2 border rounded" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="expDate" className="block mb-2">Expiration Date</label>
                      <input type="text" id="expDate" className="w-full p-2 border rounded" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block mb-2">CVV</label>
                      <input type="text" id="cvv" className="w-full p-2 border rounded" />
                    </div>
                  </div>
                  <button 
                    type="button" 
                    onClick={handlePlaceOrder} 
                    className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
                  >
                    Place Order
                  </button>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-lg shadow-md p-6 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
                <p className="mb-4">Your order has been placed and will be shipped soon.</p>
                <button 
                  type="button" 
                  onClick={() => {navigate('/order-history')}} 
                  className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300"
                >
                  Track Order
                </button>
              </motion.div>
            )}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg mt-4">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
