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
    prod_id: number, 
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
    prod_status: number,
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

    const [qtd, setQtd] = useState(0);


    const applyPromotion = (newItem: ProductsProps) => {
        let price = 0;
        
        if(newItem.tipo_desconto == 1) {
            let discount = newItem.price * (newItem.valor_desconto / 100);
            setDescontos(desc => desc + discount);
            price = newItem.price - discount;
        } else if (newItem.tipo_desconto == 0) {
            setDescontos(desc => desc + newItem.valor_desconto);
            price = newItem.price - newItem.valor_desconto;
        }

        return price;
    }

    const addItemCart = (newItem: ProductsProps) => {
        const existItemCart = cart.filter(c => c.prod_id === newItem.prod_id);
        const index = cart.findIndex(c => c.prod_id === newItem.prod_id);
    
        let priceWithDiscount = 0;
    
        if (newItem.promocao_id > 0 && newItem.status == 1) {
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
            totalCart(cartList); 
    
            toast.success('Produto atualizado com sucesso!');
            return;
        }
    
        let data = {
            ...newItem,
            amount: 1,
            priceWithDiscount: priceWithDiscount,
            total: priceWithDiscount,
        };
    
        setCart([...cartList, data]);
        totalCart([...cartList, data]);
        toast.success('Produto adicionado ao carrinho com sucesso!');
    };
    
    
    const removeItemCart = (product: ProductsProps) => {
        const index = cart.findIndex(c => c.prod_id === product.prod_id);
        
        if (index != -1) {
            let discount = product.tipo_desconto == 0 ? product.valor_desconto : product.price * (product.valor_desconto / 100);

            if (product.amount > 1) {
                cart[index].amount--;
                cart[index].total -= cart[index].priceWithDiscount;
                setCart([...cart]);

                setQtd(cart[index].amount);
                
                totalCart(cart);
                
                toast.success('Produto atualizado com sucesso!');
                
                if(cart[index].promocao_id > 0) {
                    if(descontos == 0) {
                        setDescontos(0);
                        return;
                    }

                    setDescontos(desc => desc - discount);
                }
                
                return;
            }
    

            if(cart[index].promocao_id > 0) {
                if(descontos == 0) {
                    setDescontos(0);
                    return;
                }

                console.log(discount, "dasd")
                
                setDescontos(desc => product.amount != -99 ? desc - (discount * product.amount) : desc - (discount * qtd));
                console.log(discount, "dasd")
            }

            console.log(product.amount, "das")
            
            cart.splice(index, 1)
            setCart([...cart])
            totalCart([...cart]);
            toast.success('Produto removido do carrinho!');

            if(cart.length <= 0 ) {
                setDescontos(0);
            }
        }   
    }
    
    const totalCart = (items: CartProps[]) => {
        console.log(items)
        let myCart = items;
        
        let result = myCart.reduce((acc, obj) => {
            return acc + obj.total
        }, 0);
        
        setTotal(result);
    }

    return ( 
        <CartContext.Provider value={{cart, cartAmount: cart.length, addItemCart, removeItemCart, total, descontos}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartProvider;
