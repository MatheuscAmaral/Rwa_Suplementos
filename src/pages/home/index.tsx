import { api } from "../../api";
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";

export interface ProductsProps {
    id: number, 
    title: string,
    price: number,
    poster: string,
}

export const Home = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const cartContext = useContext(CartContext);
    const { addItemCart } = cartContext;


    useEffect(() => {
        async function getProducts () {
            const response = await api.get("/products");

            setProducts(response.data);
        }

        getProducts();
    }, [])

    const addProductCart = (product: ProductsProps) => {
        addItemCart(product);
    }

    return (  
        products.map(p => {
            return (
                <div className="flex flex-col gap-1">
                    <button onClick={() => addProductCart(p)}>{p.title}</button>
                </div>
            )
        })
        
    )   
}
