import { api } from "../../api";
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { Carousel } from 'flowbite-react';
import { FaCartPlus } from "react-icons/fa";

export interface ProductsProps {
    id: number, 
    title: string,
    price: number,
    poster: string,
    showFlavors: false,
    size: string,
    flavor: string
}

export const Home = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const { addItemCart, removeItemCart } = useContext(CartContext);


    useEffect(() => {
        async function getProducts () {
            const response = await api.get("/products");

            setProducts(response.data);
        }

        getProducts();
    }, [])

    const addProductCart = (item: ProductsProps) => {
        addItemCart(item);
    }

    const removeProductCart = (products: ProductsProps) => {
        removeItemCart(products)
    }

    return (  
        <main className="flex flex-col gap-1 w-full max-w-7xl justify-center mx-auto p-4">
            <section>
               <div className="grid grid-cols-4">
                { products.map(p => {
                        return (
                            <div className="flex flex-col gap-1">
                                <img src={p.poster} className="w-40" alt="img_prod_" />
                                <p className="text-xl font-bold">{p.title}</p>
                                <span className="text-2xl font-bold">{p.price.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL'
                                })}</span>

                                <button className="bg-blue-700 p-2 w-10 rounded-full flex items-center justify-center" onClick={() => addProductCart(p)}>
                                    <FaCartPlus fontSize={22} color="white" />
                                </button>
                                <button onClick={() => removeProductCart(p)}>
                                    x
                                </button>
                            </div>
                        )
                    })}
               </div>
            </section>
        </main>
    )   
}
