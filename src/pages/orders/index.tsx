import { api } from "@/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { IOrders } from "@/interfaces/IOrders";
import { IoIosSearch } from "react-icons/io";
import { LuPackageSearch } from "react-icons/lu";
import { formatData } from "@/format/formatData";
import { formatPrice } from "@/format/formatPrice";
import { AuthContext } from "@/contexts/AuthContext";
import { useEffect, useState, useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Container from "@/components/container";
import toast from "react-hot-toast";
import Menu from "@/components/menu";
  

export const Orders = () => {
    const [pedidos, setPedidos] = useState<IOrders[]>([]);
    const {user} = useContext(AuthContext);
    const [ordersFilter, setOrdersFilter] = useState("0");
    const [load, setLoad] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getPedidos = async () => {
            try {
                setLoad(true);
                const response = await api.get(`/orders/${user[0].id}/${ordersFilter}`);
            
                setPedidos(response.data);
            }

            catch {
                toast.error("Ocorreu um erro ao buscar os pedidos do usuário!");
            }

            finally {
                setLoad(false);
            }
        }
        
        localStorage.setItem("@lastVisitedRoute", JSON.stringify(location.pathname));
        getPedidos();
    }, [ordersFilter]);

    return (
        <main className="w-full sm:max-w-full mx-auto select-none h-screen overflow-hidden">
            <Container>
                <div className="flex flex-col xl:flex-row w-full justify-center gap-3 xl:mt-10" >
                    <Menu/>
                    <div className={`border  border-gray-100 p-6 rounded-lg ${load ? "pb-52" : "pb-16"} w-full `}>
                        <h1 className="text-2xl font-semibold text-gray-700 flex items-center gap-1">Pedidos <span className="text-xs mt-1">({pedidos.length})</span></h1>

                        <div className="flex justify-between gap-5 mb-10 mt-6">
                                <div className="flex w-full">
                                    <input type="text" placeholder="Pesquise pelo número do pedido..." className="border-2 px-1 py-1.5 w-full max-w-80 border-gray-200 rounded-l-md pl-2 text-black text-sm"/>
                                    <button className="bg-blue-700 px-3 text-white rounded-r-md">
                                        <IoIosSearch fontSize={21}/>
                                    </button>
                                </div>
                                <Select defaultValue={ordersFilter} onValueChange={(e) => setOrdersFilter(e)}>
                                    <SelectTrigger className="w-full max-w-60">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="0">Todos os pedidos</SelectItem>
                                        <SelectItem value="1">Em análise</SelectItem>
                                        <SelectItem value="2">Bloqueado</SelectItem>
                                        <SelectItem value="3">Cancelado</SelectItem>
                                        <SelectItem value="4">Faturado</SelectItem>
                                    </SelectContent>
                                </Select>
                        </div> 

                        <div className={`flex flex-col gap-3 max-h-96 ${load ? "" : "overflow-y-auto"}`}>
                                {
                                    load ? (
                                        <div className="flex justify-center mt-10">
                                            <AiOutlineLoading3Quarters fontSize={27} className="animate-spin"/>
                                        </div>
                                    ) : (
                                        pedidos.length > 0 ? (
                                            pedidos.map(p => {
                                                return (
                                                    <Accordion key={p.order_id} type="single" collapsible>
                                                        <AccordionItem className="border-2 rounded-lg px-5 border-gray-100 text-xs md:text-sm" value="item-1">
                                                            <AccordionTrigger className="select-none">
                                                                <p className="flex flex-col gap-1 items-start">
                                                                    Pedido
                                                                    <span className="text-xs font-medium text-gray-600">#{p.order_id}</span>
                                                                </p>
                
                                                                <p className="flex flex-col gap-1 items-start">
                                                                    Situação
                                                                    <span className="text-xs font-medium text-gray-600">
                                                                        {
                                                                            p.status == 1 && (
                                                                                "Em análise"
                                                                            )
                                                                        }
                
                                                                        {
                                                                            p.status == 2 && (
                                                                                "Bloqueado"
                                                                            )
                                                                        }
                
                                                                        {
                                                                            p.status == 3 && (
                                                                                "Cancelado"
                                                                            )
                                                                        }
                
                                                                        {
                                                                            p.status == 4 && (
                                                                                "Faturado"
                                                                            )
                                                                        }
                                                                    </span>
                                                                </p>
                
                                                                <p className="flex flex-col gap-1 items-start">
                                                                    Data
                                                                    <span className="text-xs font-medium text-gray-600">{
                                                                        formatData(p.createdAt)
                                                                    }</span>
                                                                </p>
                
                                                                <p className="hidden md:flex flex-col gap-1 items-start">
                                                                    Pagamento
                                                                    <span className="text-xs font-medium text-gray-600">
                                                                        {
                                                                            p.payment_method == 1 && (
                                                                                "Boleto"
                                                                            )
                                                                        }
                
                                                                        {
                                                                            p.payment_method == 2 && (
                                                                                "Cartão de crédito"
                                                                            )
                                                                        }
                
                                                                        {
                                                                            p.payment_method == 3 && (
                                                                                "Pix"
                                                                            )
                                                                        }
                                                                    </span>
                                                                </p>
                
                                                                <p className="hidden md:flex flex-col gap-1 items-start">
                                                                    Total
                                                                    <span className="text-xs font-medium text-gray-600">
                                                                        {
                                                                            formatPrice(p.total)
                                                                        }
                                                                    </span>
                                                                </p>
                                                            </AccordionTrigger>
                                                            <AccordionContent className="mt-1">
                                                                <hr className="mb-2"/>
                                                                <p>
                                                                    Pedido  
                                                                    {
                                                                        p.status == 1 && (
                                                                            " em análise"
                                                                        )
                                                                    }
            
                                                                    {
                                                                        p.status == 2 && (
                                                                            " bloqueado"
                                                                        )
                                                                    }
            
                                                                    {
                                                                        p.status == 3 && (
                                                                            " cancelado"
                                                                        )
                                                                    }
            
                                                                    {
                                                                        p.status == 4 && (
                                                                            " faturado"
                                                                        )
                                                                    }
                                                                </p>
                
                                                                <div className="mt-5 flex justify-center gap-2">
                                                                    <button onClick={() => navigate(`/pedidos/detalhes/${p.order_id}`)} className="p-3 text-md font-medium text-white bg-blue-700 rounded-md">Detalhes do pedido</button>
                                                                    <button className="p-3 text-md font-medium text-black border-2 border-blue-700 hover:bg-blue-700 hover:text-white transition-all rounded-md">Preciso de ajuda</button>
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>          
                                                )
                                            })
                                        ) : (
                                            <div className="mt-20 flex flex-col justify-center items-center gap-3">
                                                <LuPackageSearch fontSize={40}/>
                                                <p className="text-lg font-medium">Nenhum pedido encontrado.</p>
                                            </div>
                                        )
                                    )
                                }  
                        </div>
                    </div>
                </div>
            </Container>
        </main>
    )
}