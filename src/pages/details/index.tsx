import { api } from "@/api"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"

import { ProductsProps } from "../home"
import { CartContext } from "@/contexts/CartContext"

import { FaCartPlus } from "react-icons/fa6"
import { FaWeightHanging } from "react-icons/fa";
import { MdFlatware } from "react-icons/md";
import { PiPackageBold } from "react-icons/pi";

interface ProductsProp {
    id: number
    image: string 
    title: string
    price: any
    size: string
    flavor: string
    typePack: string
    category: string
    product: ProductsProps
}


export const Details = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<ProductsProp>();
    const { addItemCart } = useContext(CartContext);

   useEffect(() => {
        async function getProductDetails () {
            const response = await api.get(`/products/${id}`);

            setProduct(response.data);
        }

        getProductDetails();
   }, []);

   const addProductCart = (product: ProductsProp) => {
        addItemCart(product);
   }

    return (
        <>
             {
                product && (
                    <div className="flex flex-col sm:flex-row justify-center gap-28 px-5 py-20 mb-20 items-center rounded-lg bg-gray-50 w-full max-w-7xl mx-auto mt-10">
                        <img className="w-72 hover:scale-105 transition-all" src={product.image}/>

                        <div className="flex flex-col gap-2 w-full max-w-sm">
                            <h1 className="text-3xl font-semibold">{product.title}</h1>
                            <span className="font-semibold text-gray-600 pb-5 text-sm">Código: {product.id}</span>
                            <p className="text-3xl font-semibold flex items-center gap-2">{product.price.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL'
                            })} <span  className="text-lg">no Pix</span></p>
                            <span className="pb-5">ou até 12x no cartão</span>

                            <ul className="flex flex-col gap-2">
                                <li className="text-gray-600 flex gap-3 items-center">
                                    <FaWeightHanging fontSize={28}/>
                                    <span className="text-lg font-medium text-gray-500 pt-1">{product.size}</span>
                                </li>

                                <li className="text-gray-600 flex gap-3 items-center">
                                    <MdFlatware fontSize={30}/>
                                    <span className="text-lg font-medium text-gray-500 pt-1">{product.flavor}</span>
                                </li>

                                <li className="text-gray-600 flex gap-3 items-center">
                                    <PiPackageBold fontSize={30}/>
                                    <span className="text-lg font-medium text-gray-500 pt-1">{product.typePack}</span>
                                </li>
                            </ul>

                            <div className="flex items-center rounded-lg shadow-sm mt-8 w-36">  
                                <Link to={"/checkout"} className=" shadow-md p-3 rounded-s-lg">
                                    Comprar
                                </Link>

                                <button onClick={() => addProductCart(product)} className=" shadow-md p-3 rounded-e-lg ">
                                    <FaCartPlus className="hover:scale-105 transition-all" fontSize={24}  />
                                </button>
                            </div>

                        </div>

                    </div>
                )
            }
        </>

    )
    
}