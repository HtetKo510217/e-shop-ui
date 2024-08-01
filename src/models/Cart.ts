export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    photo: string;
}

export interface CartState {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
}