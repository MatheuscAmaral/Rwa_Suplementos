import { api } from "@/api"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { CartContext } from "@/contexts/CartContext"
import { Skeleton } from "@/components/ui/skeleton"
import { FaCartPlus } from "react-icons/fa6"
import { FaWeightHanging } from "react-icons/fa";
import { MdFlatware } from "react-icons/md";
import { PiPackageBold } from "react-icons/pi";
import { IProducts } from "@/interfaces/IProducts"
import toast from "react-hot-toast"

export const Details = () => {
    const { id } = useParams();
    const { addItemCart } = useContext(CartContext);
    const [product, setProduct] = useState<IProducts>();
    const [loadPage, setLoadPage] = useState(false);

   useEffect(() => {
        async function getProductDetails () {
            try {
                const response = await api.get(`/products/${id}`);
                setLoadPage(true);
                
                setProduct(response.data);
            }
            
            catch {
                setLoadPage(true);
                toast.error("Opss, ocorreu um erro, tente novamente mais tarde!")
            }
        }

        localStorage.setItem("@lastVisitedRoute", JSON.stringify(location.pathname));
        getProductDetails();
   }, []);

   const addProductCart = (product: IProducts) => {
        addItemCart(product);
   }

    return (
        <div className="mx-5 md:mx-5">
             {
                product ? (
                    loadPage && (
                        <div className="flex flex-col md:flex-row justify-center gap-5 md:gap-32 xl:px-5 py-3 px-7 pb-10 md:py-20 my-5 xl:my-24 items-center rounded-lg border-gray-200 border w-full max-w-7xl mx-auto">
                            <img className="w-64 hover:scale-105 transition-all" src={product.image}/>

                            <div className="flex flex-col gap-2 w-full max-w-sm">
                                <div className="flex flex-col pb-6">
                                    <h1 className="text-2xl md:text-3xl font-semibold">{product.title}</h1>
                                    <span className="font-semibold text-gray-600 text-sm">Código: {product.product_id}</span>
                                </div>

                                {
                                    product.stock > 0 && (
                                        <div className="flex flex-col">
                                            <p className="text-2xl md:text-3xl font-semibold flex items-center gap-2">
                                                {(Number(product.price) || 0).toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL'
                                                })}

                                                <span className="text-sm mt-1">no Pix</span></p>
                                            <span className="pb-5 text-sm md:text-md">ou até 12x no cartão</span>
                                        </div>
                                    )    
                                }

                                <ul className="flex flex-col gap-2">
                                    <li className="text-gray-600 flex gap-3 items-center">
                                        <FaWeightHanging fontSize={26}/>
                                        <span className="text-md md:text-lg font-medium text-gray-500 pt-1">{
                                            product.size <= "3" ? (
                                                <p>{product.size}Kg</p>
                                            ) : (
                                                <p>{product.size}g</p>
                                            )
                                        }</span>
                                    </li>

                                    <li className="text-gray-600 flex gap-3 items-center">
                                        <MdFlatware fontSize={30}/>
                                        <span className="text-md md:text-lg  font-medium text-gray-500 pt-1">
                                            {
                                                product.flavor 
                                            }
                                        </span>
                                    </li>

                                    <li className="text-gray-600 flex gap-3 items-center">
                                        <PiPackageBold fontSize={30}/>
                                        <span className="text-md md:text-lg  font-medium text-gray-500 pt-1">
                                            {
                                                product.type_pack
                                            }
                                        </span>
                                    </li>
                                </ul>

                               {
                                 product.stock > 0 ? (
                                    <div className="flex items-center rounded-lg shadow-sm mt-8 w-36">  
                                        <Link to={"/checkout"} className=" shadow-md p-3 rounded-s-lg">
                                            Comprar
                                        </Link>
    
                                        <button onClick={() => addProductCart(product)} className=" shadow-md p-3 rounded-e-lg ">
                                            <FaCartPlus className="hover:scale-105 transition-all" fontSize={24}  />
                                        </button>
                                    </div>
                                 ) : (
                                    <span className="bg-red-50 w-40 mt-5 text-center p-2 rounded-lg text-sm">
                                        Produto indisponível
                                    </span>
                                 )
                               }

                            </div>
                        </div>
                    ) 
                ) : (
                    <div className="flex items-center space-x-4 max-w-5xl mx-auto mt-20 mb-80">
                        <Skeleton className="h-96 w-full" />
                    </div>       
                )
            }
        </div>

    )
    
}
