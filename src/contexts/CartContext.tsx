import { ProductsProps } from "@/pages/home";
import { useState, createContext, ReactNode } from "react";
import toast from "react-hot-toast";

interface CartDataProps {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (product: ProductsProps) => void;
    total: string;
}

export interface CartProps {
    id: number, 
    title: string,
    price: number,
    image: string,
    amount: number,
    total: number,
    flavor: string,
    category: string,
    size: string,
}

interface CartProviderProps {
    children: ReactNode,
}

export const CartContext = createContext({} as CartDataProps);

const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState("");

    const addItemCart = (newItem: ProductsProps) => {
        const existItemCart = cart.filter(c => c.id === newItem.id);
        const index = cart.findIndex(c => c.id === newItem.id);

        let cartList = cart;
        
        if (existItemCart.length > 0) {
            cartList[index].amount += 1;
            cartList[index].total = cartList[index].price * cartList[index].amount;

            setCart([...cartList]);
            totalCart(cart);

            toast.success('Produto atualizado com sucesso!');

            return;
        }
        
        let data = {
            ...newItem, 
            amount: 1,
            total: newItem.price
        }

        setCart((prevCart) => [...prevCart, data]);
        console.log(total)
        totalCart(cart);
    }

    const removeItemCart = (product: ProductsProps) => {
        const index = cart.findIndex(c => c.id === product.id);
        
        if (index != -1) {
            if (cart[index].amount > 1) {
                cart[index].amount--;
                cart[index].total -= cart[index].price;
                setCart([...cart]);

                totalCart(cart);

                toast.success('Produto atualizado com sucesso!');

                return;
            }


            cart.splice(index, 1)
            setCart([...cart])
            totalCart(cart);
            toast.success('Produto removido do carrinho!')
        }   
    }

    const totalCart = (items: CartProps[]) => {
        let myCart = items;

        console.log(myCart)
        
        let result = myCart.reduce((acc, obj) => {
            return acc + obj.total
        }, 0)

        const resultFormated = result.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })

        setTotal(resultFormated);
        console.log(total) 
    }

    return ( 
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart, removeItemCart, total}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider;
