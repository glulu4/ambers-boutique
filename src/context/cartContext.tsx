"use client";

import {LineItem, StripeProductData} from "@/types/types";
import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";

interface CartItem {
    stripeData: StripeProductData;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    /** Adds the product and returns true, or returns false if it's already in the cart. */
    addItemToCart: (product: StripeProductData) => boolean;
    removeItemFromCart: (id: string) => void;
    clearCart: () => void;
    cartTotal: number;
    isLoading: boolean;
    getCartPrice: () => number;
    getLineItems(): LineItem[];

}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping-cart';

// Every piece is one of a kind, so the cart holds at most one of each product.
const QUANTITY_PER_ITEM = 1;

// Helper function to safely parse cart data
const parseStoredCart = (data: string | null): CartItem[] => {
    try {
        const parsedData = JSON.parse(data || '[]');
        // Validate that the parsed data is an array and has the expected structure
        if (Array.isArray(parsedData) && parsedData.every(item =>
            item?.stripeData?.id &&
            typeof item.quantity === 'number' &&
            item.quantity > 0
        )) {
            // Carts saved before the one-per-piece rule may hold larger quantities
            return parsedData.map((item: CartItem) => ({...item, quantity: QUANTITY_PER_ITEM}));
        }
        return [];
    } catch (error) {
        console.error('Error parsing cart data:', error);
        return [];
    }
};

// Helper function to safely store cart data
const saveCartToStorage = (cart: CartItem[]) => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize cart from localStorage
    useEffect(() => {
        const initializeCart = () => {
            try {
                const savedCart = localStorage.getItem(CART_STORAGE_KEY);
                setCart(parseStoredCart(savedCart));
            } catch (error) {
                console.error('Error initializing cart:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeCart();
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!isLoading) {
            saveCartToStorage(cart);
        }
    }, [cart, isLoading]);

    const addItemToCart = (product: StripeProductData): boolean => {
        if (cart.some((cartItem) => cartItem.stripeData.id === product.id)) {
            return false;
        }
        setCart((prevCart) => [...prevCart, {stripeData: product, quantity: QUANTITY_PER_ITEM}]);
        return true;
    };
    const getCartPrice = () => {
        return cart.reduce((total, item) => {
            const itemPrice = (item.stripeData.default_price?.unit_amount); 
            if (!itemPrice) throw new Error("One of the items has no StripePrice");
            
            return total + itemPrice * item.quantity;
        }, 0);
    };

    function getLineItems(): LineItem[] {
        const items = cart
            .map((item) => {
                // Check if `default_price` and its `id` exist
                // if (!item.stripeData.default_price?.id) {
                //     console.warn(`Missing price ID for product: ${item.stripeData.name}`);
                //     return null; // Return null for invalid items
                // }
                return {
                    price: item.stripeData.default_price?.id,
                    quantity: item.quantity,
                };
            })
            .filter((item): item is LineItem => item !== null); // Filter out null items

        return items;
    }



    const removeItemFromCart = (id: string) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.stripeData.id !== id)
        );
    };

    const clearCart = () => {
        setCart([]);
        try {
            localStorage.removeItem(CART_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing cart from localStorage:', error);
        }
    };

    const cartTotal = cart.reduce(
        (total, item) => total + Math.max(0, item.quantity),
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addItemToCart,
                removeItemFromCart,
                getLineItems,
                clearCart,
                cartTotal,
                getCartPrice,
                isLoading
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};