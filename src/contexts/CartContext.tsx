import { ProductsProps } from "@/pages/home";
import { useState, createContext, ReactNode } from "react";
import toast from "react-hot-toast";

interface CartDataProps {
    cart: CartProps[];
    cartAmount: number;
    addItemCart: (newItem: ProductsProps) => void;
    removeItemCart: (product: ProductsProps) => void;
    descontos: number,
    total: number;
}

export interface CartProps {
    produto_id: number, 
    title: string,
    price: number,
    image: string,
    category: string,
    size: string,
    flavor: string,
    type_pack: string,
    amount: number,
    total: number,
    status: number,
    promocao_id: number,
    tipo_desconto: number,
    valor_desconto: number,
    priceWithDiscount: number
}

interface CartProviderProps {
    children: ReactNode,
}

export const CartContext = createContext({} as CartDataProps);

const CartProvider = ({children}: CartProviderProps) => {
    const [cart, setCart] = useState<CartProps[]>([]);
    const [total, setTotal] = useState(0);
    const [descontos, setDescontos] = useState(0);
  
    const [oldQtd, setOldQtd] = useState(0);

    const applyPromotion = (newItem: ProductsProps) => {
        let price = 0;
        
        if(newItem.tipo_desconto = 1) {
            let discount = newItem.price * (newItem.valor_desconto / 100);
            setDescontos(desc => desc + discount);
            price = newItem.price - discount;
        } 

        return price;
    }

    const addItemCart = (newItem: ProductsProps) => {
        const existItemCart = cart.filter(c => c.produto_id === newItem.produto_id);
        const index = cart.findIndex(c => c.produto_id === newItem.produto_id);

        let priceWithDiscount = 0;

         if(newItem.promocao_id > 0 && newItem.status == 1) {
            priceWithDiscount = applyPromotion(newItem);
         }

        let cartList = cart;
        
        if (existItemCart.length > 0) {
            cartList[index].amount += 1;
            cartList[index].total = (cartList[index].priceWithDiscount > 0 ?  cartList[index].priceWithDiscount :  cartList[index].price) * cartList[index].amount;
            
            setCart([...cartList]);
            totalCart(cart);
            setOldQtd(cartList[index].amount);
            
            toast.success('Produto atualizado com sucesso!');
            return;
        }
        
        let data = {
            ...newItem, 
            amount: 1,
            priceWithDiscount: priceWithDiscount,
            total: priceWithDiscount > 0 ? priceWithDiscount : newItem.price
        }

        
        setOldQtd(1);
        setCart((prevCart) => [...prevCart, data]);
        totalCart(cart);
    }
    
    const removeItemCart = (product: ProductsProps) => {
        const index = cart.findIndex(c => c.produto_id === product.produto_id);
        
        if (index != -1) {
            let discount = product.price * (product.valor_desconto / 100);

            if (cart[index].amount > 1) {
                cart[index].amount--;
                cart[index].total -= (cart[index].priceWithDiscount > 0 ?  cart[index].priceWithDiscount :  cart[index].price);
                setCart([...cart]);
                
                totalCart(cart);
                
                toast.success('Produto atualizado com sucesso!');
                
                if(cart[index].promocao_id > 0) {
                    if(descontos == 0) {
                        setDescontos(0);
                        return;
                    }

                    console.log(discount, "cas2")
                    
                    setDescontos(desc => desc - discount);
                }
                
                return;
            }
            
            if(cart[index].promocao_id > 0) {
                if(descontos == 0) {
                    setDescontos(0);
                    return;
                }

                setDescontos(desc => desc - (discount * oldQtd));
            }
            
            cart.splice(index, 1)
            setCart([...cart])
            totalCart(cart);
            toast.success('Produto removido do carrinho!');

            if(cart.length <= 0 ) {
                setDescontos(0);
            }
        }   
    }
    
    const totalCart = (items: CartProps[]) => {
        let myCart = items;
        
        let result = myCart.reduce((acc, obj) => {
            return acc + obj.total
        }, 0);

        console.log(result, "resu")
        
        setTotal(result);
    }

    return ( 
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart, removeItemCart, total, descontos}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider;
