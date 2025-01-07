import { IProducts } from "@/interfaces/IProducts";
import { useState, createContext, ReactNode } from "react";
import toast from "react-hot-toast";

interface CartDataProps {
    cart: IProducts[];
    cartAmount: number;
    addItemCart: (newItem: IProducts) => void;
    removeItemCart: (product: IProducts) => void;
    fillCart: (cart: IProducts[]) => void;
    clearAll: () => void;
    descontos: number,
    total: number;
}

interface CartProviderProps {
    children: ReactNode,
}

export const CartContext = createContext({} as CartDataProps);

const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<IProducts[]>([]);
    const [total, setTotal] = useState(0);
    const [descontos, setDescontos] = useState(0);
    const [qtd, setQtd] = useState(0);
    console.log(cart)

    const applyPromotion = (newItem: IProducts) => {
        let price = 0;
        
        if(newItem.discount_type == 1) {
            let discount = newItem.price * (newItem.discount_value / 100);
            setDescontos(desc => desc + discount);
            localStorage.setItem("@descontosEcommerce", JSON.stringify(descontos + discount));
            price = newItem.price - discount;
        } else if (newItem.discount_type == 0) {
            setDescontos(desc => desc + newItem.discount_value);
            localStorage.setItem("@descontosEcommerce", JSON.stringify(descontos + newItem.discount_value));
            price = newItem.price - newItem.discount_value;
        }

        return price;
    }

    const clearAll = () => {
        setCart([]);
        setTotal(0);
        setDescontos(0);
        setQtd(0);
    }

    const fillCart = (cartt: IProducts[]) => {
        const storedTotal = localStorage.getItem("@totalEcommerce");
        const storedDescontos = localStorage.getItem("@descontosEcommerce");

        setCart([...cartt]);

        if (storedTotal !== null) {
            const total = JSON.parse(storedTotal);
            setTotal(total);
        }

        if (storedDescontos !== null) {
            const descontos  = JSON.parse(storedDescontos);
            setDescontos(descontos);
        }
    }

    const addItemCart = (newItem: IProducts) => {
        const existItemCart = cart.filter(c => c.product_id === newItem.product_id);
        const index = cart.findIndex(c => c.product_id === newItem.product_id);
    
        let priceWithDiscount = 0;
    
        if (newItem.promotion_id > 0 && newItem.status == 1) {
            priceWithDiscount = applyPromotion(newItem);
        } else {
            priceWithDiscount = newItem.price;
        }
    
        let cartList = [...cart];
    
        if (existItemCart.length > 0) {
            cartList[index].amount += 1;
           
            cartList[index].total = cartList[index].priceWithDiscount * cartList[index].amount;
            setQtd(cartList[index].amount);
    
            setCart(cartList);
            localStorage.setItem("@cartEcommerce", JSON.stringify(cartList));
            totalCart(cartList); 
            return;
        }
        
        let data = {
            ...newItem,
            amount: 1,            
            priceWithDiscount: !cartList ? priceWithDiscount : priceWithDiscount * 1,
            total: !cartList ? priceWithDiscount : priceWithDiscount * 1,
        };
        
        setCart([...cartList, data]);
        localStorage.setItem("@cartEcommerce", JSON.stringify([...cartList, data]));
        totalCart([...cartList, data]);
        toast.success('Produto adicionado ao carrinho com sucesso!');
    }
    
    
    const removeItemCart = (product: IProducts) => {
        const index = cart.findIndex(c => c.product_id === product.product_id);
        
        if (index != -1) {
            let discount = product.discount_type == 0 ? product.discount_value : product.price * (product.discount_value / 100);

            if (product.amount > 1) {
                cart[index].amount--;
                cart[index].total -= cart[index].priceWithDiscount;
                setCart([...cart]);
                localStorage.setItem("@cartEcommerce", JSON.stringify([...cart]));

                setQtd(cart[index].amount);
                
                totalCart(cart);
                
                if(cart[index].promotion_id > 0) {
                    if(descontos == 0) {
                        setDescontos(0);
                        localStorage.setItem("@descontosEcommerce", JSON.stringify(0));
                        return;
                    }

                    setDescontos(desc => desc - discount);
                    localStorage.setItem("@descontosEcommerce", JSON.stringify(descontos - discount));
                }
                
                return;
            }
    

            if(cart[index].promotion_id > 0) {
                if(descontos == 0) {
                    setDescontos(0);
                    localStorage.setItem("@descontosEcommerce", JSON.stringify(0));
                    return;
                }
                
                setDescontos(desc => product.amount != -99 ? desc - (discount * product.amount) : desc - (discount * qtd));
                localStorage.setItem("@descontosEcommerce", JSON.stringify(product.amount != -99 ? descontos - (discount * product.amount) : descontos - (discount * qtd)));
            }
            
            cart.splice(index, 1)
            setCart([...cart]);
            localStorage.setItem("@cartEcommerce", JSON.stringify([...cart]));
            totalCart([...cart]);
            
            toast.success('Produto removido do carrinho!');

            if(cart.length <= 0 ) {
                setDescontos(0);
            }
        }   
    }
    
    const totalCart = (items: IProducts[]) => {
        let myCart = items;
        
        let result = myCart.reduce((acc, obj) => {
            return acc + obj.total
        }, 0);
        
        setTotal(result);
        localStorage.setItem("@totalEcommerce", JSON.stringify(result));
    }

    return ( 
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart, removeItemCart, total, descontos, clearAll, fillCart}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider;
