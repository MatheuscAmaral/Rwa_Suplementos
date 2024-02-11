import { api } from "@/api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { ProductsProps } from "../home"

interface ProductsProp {
    image: string | undefined
    title: string
    price: any
    product: ProductsProps
}


export const Details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductsProp>();

   useEffect(() => {
        async function getProductDetails () {
            const response = await api.get(`/products/${id}`);

            setProduct(response.data);
        }

        getProductDetails();
   }, []);

    return (
        <div>
             {
                product && (
                    <div className="flex flex-col sm:flex-row justify-center gap-20 py-20  items-center rounded-lg bg-gray-50 w-full max-w-7xl mx-auto mt-10">
                    <img className="w-72" src={product.image}/>

                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-semibold">{product.title}</h1>
                        <p className="text-2xl font-bold">{product.price.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        })}</p>
                    </div>
                </div>
                )
            }
        </div>

    )
    
}