import { ProductsProps } from "@/pages/home";
import { useState, createContext, ReactNode } from "react";
import toast from "react-hot-toast";

interface CartDataProps {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (product: ProductsProps) => void;
}

interface CartProps {
    id: number, 
    title: string,
    price: number,
    image: string,
    amount: number
}

interface CartProviderProps {
    children: ReactNode,
}

export const CartContext = createContext({} as CartDataProps);

const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<CartProps[]>([]);

    const addItemCart = (newItem: ProductsProps) => {
        const existItemCart = cart.filter(c => c.id === newItem.id);
        const index = cart.findIndex(c => c.id === newItem.id);

        let cartList = cart;
        
        if (existItemCart.length > 0) {
            cartList[index].amount += 1;
            setCart([...cartList])
            toast.success('Produto atualizado com sucesso!')
            return;
        }
        
        let data = {
            ...newItem, 
            amount: 1
        }

        toast.success('Produto adicionado ao carrinho!');
        setCart((prevCart) => [...prevCart, data]);
    }

    const removeItemCart = (product: ProductsProps) => {
        const index = cart.findIndex(c => c.id === product.id);
        if (index != -1) {
            if (cart[index].amount > 1) {
                cart[index].amount--;
                toast.success('Produto atualizado com sucesso!')
                return;
            }


            cart.splice(index, 1)
            setCart([...cart])
            toast.success('Produto removido do carrinho!')
        }   
    }

    return ( 
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart, removeItemCart}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider;
