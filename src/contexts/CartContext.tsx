import { ProductsProps } from "@/pages/home";
import { useState, createContext, ReactNode } from "react";

interface CartDataProps {
    cart: CartProps[],
    cartAmount: number,
    addItemCart: (newItem: ProductsProps) => void,
}

interface CartProps {
    id: number, 
    title: string,
    price: number,
    poster: string,
}

interface CartProviderProps {
    children: ReactNode,
}

export const CartContext = createContext({} as CartDataProps);

const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<CartProps[]>([]);

    console.log(cart.length);

    const addItemCart = (newItem: ProductsProps) => {
        setCart((prevCart) => [...prevCart, newItem]);
        console.log(cart);
    }

    return (
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider;
