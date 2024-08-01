import { create } from 'zustand';
import { CartState } from '../models/Cart';

export const useCartStore = create<CartState>((set) => ({
    cartItems: [],
    addToCart: (item) => set((state) => {
        const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
        if (existingItem) {
            return {
                cartItems: state.cartItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                ),
            };
        }
        return { cartItems: [...state.cartItems, item] };
    }),
    removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== id),
    })),
    updateQuantity: (id, quantity) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
    })),
    clearCart: () => set({ cartItems: [] }), 
    cartCount: 0,
}));
