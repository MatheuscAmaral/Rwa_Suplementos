import { useContext, useState } from "react";
import { CartContext } from "@/contexts/CartContext";
import { AuthContext } from "@/contexts/AuthContext";

import { CiLocationArrow1 } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoBarcodeOutline } from "react-icons/io5";



export const Checkout = () => {

    const { cart, total, addItemCart, removeItemCart, descontos } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const formatPrice = (price: string | number) => {
        return price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL"
        })
    }


    return (
        <main className="flex flex-col gap-5 md:flex-row  justify-center w-full max-w-4xl mx-auto h-full pb-48 mt-10 md:mt-20 pt-4 px-5 md:mb-30">
            <section className="border py-5 px-5 pb-10 w-full max-w-xl rounded-lg">
                <h5 className="font-semibold text-sm ml-2">Revisar e finalizar</h5>

                <div className="flex gap-3 items-center mt-5 text-xs ml-4">
                    <CiLocationArrow1 fontSize={22} className="text-gray-800"/>
                    {
                        user.map(u => {
                            return (
                                <div key={u.id} className="text-gray-500 font-medium">
                                    <p className="font-bold">Endereço</p>
                                    <p> {u.address[0].rua}, {u.address[0].numero}, {u.address[0].bairro} -  {u.address[0].estado}</p>
                                </div>
                            )
                        })
                    }
                </div>

                <div className="flex gap-3 items-center mt-5 text-xs ml-4">
                    <IoBarcodeOutline fontSize={23} className="text-gray-700"/>
                    
                    <div className="text-gray-500 font-medium">
                        <p className="font-bold">A vista</p>
                        <p>Boleto</p>
                    </div>
                </div>

                <div className="flex flex-col gap-1 mt-10  h-full max-h-80 overflow-auto scrollbar-none">
                    {
                        cart.map(p => {
                            return (
                                <div className="flex gap-2 justify-between border border-l-0 border-r-0 border-b-0 border-gray-100 py-2 items-center" key={p.produto_id}> 
                                    <div className="flex gap-3 items-center">
                                        <img src={p.image} className="w-16" alt="img_prod"/>
                                        
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs font-semibold text-gray-500">{p.title}</p>
                                            <span className="text-xs font-semibold text-gray-500">Código: {p.produto_id}</span>

                                            <span className="text-xs font-bold text-gray-600">{formatPrice(p.price)}</span>
                                        </div>    
                                    </div>

                                    <div className="flex items-center gap-2 text-sm border px-1.5 rounded-full mr-2">
                                        <button onClick={() => removeItemCart(p)}>
                                            -
                                        </button>

                                        <span>
                                            {p.amount}
                                        </span>

                                        <button onClick={() => addItemCart(p)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <hr className="border-gray-100"/>
            </section>

            <section className="w-full md:max-w-80 rounded-lg px-5 py-4 pb-5 border">
                <h5 className="font-semibold text-sm mb-5">Resumo do pedido</h5>
                <p className="font-medium text-xs mb-2 text-gray-500">Pedido: <span className="font-bold">#1</span></p>
                <hr />

                <p className="mt-3 text-xs flex justify-between font-medium text-gray-500">SubTotal <span>{formatPrice((total + descontos))}</span></p>
                <p className="mt-2 text-xs flex justify-between mb-3 font-medium text-gray-500">Descontos <span className="text-green-600"> - {formatPrice(descontos)}</span></p>
                <hr />

                <p className="mt-2 text-sm flex justify-between font-semibold">Total <span>{formatPrice(total)}</span></p>

                <div className='mt-5'>
                  {
                    cart.length > 0 ? (
                      <button id='button' onClick={() => setLoading(true)} className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-blue-800 text-white flex items-center justify-center py-3 w-full rounded-lg border-0 hover:bg-blue-700 transition-all  mb-3`}>
                      {
                          loading ? (
                              <AiOutlineLoading3Quarters fontSize={22} className=' transition-all animate-spin'/>
                              ) : (
                                  <p style={{paddingBottom: 2}} className='transition-all flex items-center gap-2'>
                                    <IoBagCheckOutline fontSize={20}/>
                                    Finalizar compra
                                  </p>      
                              )
                      }
                      </button>
                    ) : (
                          <div className=' w-72'>
                            <button id='button' className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-blue-800 text-white flex items-center justify-center py-3 w-full rounded-lg border-0 mb-3 hover:bg-blue-700 transition-all`}>
                            { 
                            loading ? (
                              <AiOutlineLoading3Quarters fontSize={22} className=' transition-all animate-spin'/>
                              ) : (
                                  <p style={{paddingBottom: 2}} className='transition-all flex items-center gap-2'>
                                    <IoBagCheckOutline fontSize={20}/>
                                    Visualizar catálogo
                                  </p>      
                              )
                            }
                          </button>
                          </div>
                        )
                      }
                </div>
            </section>
        </main>
    )
}
