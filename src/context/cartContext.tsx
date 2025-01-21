// "use client";

// import {StripeProductData} from "@/types/types";
// import {getProductPrice} from "@/utils/stripeHelpers";
// import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";



// interface CartItem {
//     stripeData: StripeProductData;
//     quantity: number;
// }

// interface CartContextType {
//     cart: CartItem[];
//     addItemToCart: (item: CartItem) => void;
//     removeItemFromCart: (id: string) => void;
//     clearCart: () => void;
//     cartTotal: number; // Total number of items
//     // cartValue: number; // Total cart value
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// interface CartProviderProps {
//     children: ReactNode;
// }

// export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
//     const [cart, setCart] = useState<CartItem[]>([]);



//     useEffect(() => {
//         const savedCart = localStorage.getItem("cart");
//         if (savedCart) {
//             setCart(JSON.parse(savedCart));
//         }
//     }, []);

//     // Save cart to local storage whenever it changes
//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }, [cart]);

//     const addItemToCart = (item: CartItem) => {
//         setCart((prevCart) => {
//             const existingItem = prevCart.find(
//                 (cartItem) => cartItem.stripeData.id === item.stripeData.id
//             );
//             if (existingItem) {
//                 return prevCart.map((cartItem) =>
//                     cartItem.stripeData.id === item.stripeData.id
//                         ? {...cartItem, quantity: cartItem.quantity + item.quantity}
//                         : cartItem
//                 );
//             }
//             return [...prevCart, item];
//         });
//     };

//     const removeItemFromCart = (id: string) => {
//         setCart((prevCart) =>
//             prevCart.filter((item) => item.stripeData.id !== id)
//         );
//     };

//     const clearCart = () => {
//         setCart([]);
//     };

//     const cartTotal = cart.reduce((total, item) => total + item.quantity, 0);

//     // const cartValue = cart.reduce(
//     //     (total, item) => total + item.quantity * getProductPrice(item.stripeData),
//     //     0
//     // );

//     return (
//         <CartContext.Provider
//             value={{cart, addItemToCart, removeItemFromCart, clearCart, cartTotal}}
//         >
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = (): CartContextType => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error("useCart must be used within a CartProvider");
//     }
//     return context;
// };


"use client";

import {LineItem, StripeProductData} from "@/types/types";
import {getProductPrice} from "@/utils/stripeHelpers";
import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";

interface CartItem {
    stripeData: StripeProductData;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addItemToCart: (item: CartItem) => void;
    removeItemFromCart: (id: string) => void;
    clearCart: () => void;
    cartTotal: number;
    isLoading: boolean;
    updateItemQuantity: (id: string, newQuantity: number) => void
    getCartPrice: () => number;
    getLineItems(): LineItem[];

}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'shopping-cart';

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
            return parsedData;
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

    const addItemToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(
                (cartItem) => cartItem.stripeData.id === item.stripeData.id
            );

            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.stripeData.id === item.stripeData.id
                        ? {
                            ...cartItem,
                            quantity: Math.max(0, cartItem.quantity + item.quantity)
                        }
                        : cartItem
                );
            }

            return [...prevCart, {...item, quantity: Math.max(0, item.quantity)}];
        });
    };

    const updateItemQuantity = (id: string, newQuantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.stripeData.id === id
                    ? {...item, quantity: Math.max(0, newQuantity)}
                    : item
            )
        );
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

        console.log("items: ", items);
            

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
                updateItemQuantity,
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