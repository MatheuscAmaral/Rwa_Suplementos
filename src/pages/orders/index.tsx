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
import { AuthContext } from "@/hooks/AuthContext";
import { useEffect, useState, useContext, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Container from "@/components/container";
import toast from "react-hot-toast";
import Menu from "@/components/menu";
import { Button } from "@/components/ui/button";
import { ReloadContext } from "@/hooks/ReloadContext";
  

export const Orders = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { data, reloadContent } = useContext(ReloadContext);
    const pedidos = useRef<IOrders[]>([]);
    const [newOrders, setNewOrders] = useState<IOrders[]>([]);
    const [ordersFilter, setOrdersFilter] = useState("0");
    const [load, setLoad] = useState(false);

    useEffect(() => {
        const getPedidos = async () => {
            try {
                setLoad(true);
                const response = await api.get(`/orders/${user[0].id}/${ordersFilter}`);
            
                pedidos.current = response.data;
                setNewOrders(response.data);
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
    }, [ordersFilter, data]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value == "") {
            setNewOrders(pedidos.current);
            return;
        }

        const filteredOrders = pedidos.current.filter((order) => {
            return order.order_id.toString().includes(value);
        });

        setNewOrders(filteredOrders);
    }

    const cancelOrder = async (id: number, invoice_id: string) => {
        try {
            const response = await api.delete(`/invoices/${invoice_id}`);

            if (response.status == 200) {
                await api.put(`/orders/status/${id}`, {
                    status: 7
                });
            }

            toast.success("Pedido cancelado com sucesso!");
            reloadContent();
        } catch (error) {
            toast.error("Ocorreu um erro ao cancelar o pedido!");
        }
    }

    return (
        <main className="w-full sm:max-w-full mx-auto select-none h-screen overflow-hidden">
            <Container>
                <div className="flex flex-col xl:flex-row w-full justify-center gap-3 xl:mt-10" >
                    <Menu/>
                    <div className={`border  border-gray-100 p-6 rounded-md ${load ? "pb-52" : "pb-16"} w-full `}>
                        <h1 className="text-2xl font-semibold text-gray-700 flex items-center gap-1">Pedidos <span className="text-xs mt-1">({newOrders.length})</span></h1>

                        <div className="flex justify-between gap-5 mb-10 mt-6">
                                <div className="flex w-full relative max-w-96">
                                    <input type="text" onChange={(e) => handleSearch(e)} placeholder="Pesquise pelo número do pedido..." className="border-2 px-1 py-1 w-full max-w-80 border-gray-200 pl-2 pr-2 rounded-md text-black text-sm"/>
                                    <IoIosSearch className="absolute top-2 right-16 mr-2 bg-white" fontSize={21}/>
                                </div>
                                <Select defaultValue={ordersFilter} onValueChange={(e) => setOrdersFilter(e)}>
                                    <SelectTrigger className="w-full max-w-60">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="0">Todos os pedidos</SelectItem>
                                        <SelectItem value="1">Aguardando pagamento</SelectItem>
                                        <SelectItem value="2">Pagamento aprovado</SelectItem>
                                        <SelectItem value="3">Em separação</SelectItem>
                                        <SelectItem value="4">Em transito</SelectItem>
                                        <SelectItem value="5">Em rota de entrega</SelectItem>
                                        <SelectItem value="6">Faturado</SelectItem>
                                        <SelectItem value="7">Cancelado</SelectItem>
                                    </SelectContent>
                                </Select>
                        </div> 

                        <div className={`flex flex-col gap-3 max-h-[600px] ${load ? "" : "overflow-y-auto"}`}>
                                {
                                    load ? (
                                        <div className="flex justify-center mt-10">
                                            <AiOutlineLoading3Quarters fontSize={27} className="animate-spin"/>
                                        </div>
                                    ) : (
                                        newOrders.length > 0 ? (
                                            newOrders.map(p => {
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
                                                                            "Aguardando pagamento"
                                                                        )

                                                                    }

                                                                    {
                                                                        p.status == 2 && (
                                                                            "Pagamento aprovado"
                                                                        )
                                                                    }
                                                                    
                                                                    {
                                                                        p.status == 3 && (
                                                                            "Em separação"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 4 && (
                                                                            "Em transito"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 5 && (
                                                                            "Em rota de entrega"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 6 && (
                                                                            "Faturado"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 7 && (
                                                                            "Cancelado"
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
                                                                    {
                                                                        p.status == 1 && (
                                                                            "Aguardando pagamento"
                                                                        )

                                                                    }

                                                                    {
                                                                        p.status == 2 && (
                                                                            "Pagamento aprovado"
                                                                        )
                                                                    }
                                                                    
                                                                    {
                                                                        p.status == 3 && (
                                                                            "Em separação"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 4 && (
                                                                            "Em transito"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 5 && (
                                                                            "Em rota de entrega"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 6 && (
                                                                            "Faturado"
                                                                        )
                                                                    }

                                                                    {
                                                                        p.status == 7 && (
                                                                            "Cancelado"
                                                                        )
                                                                    }
                                                                   
                                                                </p>
                
                                                                <div className="mt-5 flex justify-center gap-2">
                                                                    <Button onClick={() => navigate(`/pedidos/detalhes/${p.order_id}`)} className="p-3 text-md font-medium text-white bg-primaryColor hover:bg-blue-900 rounded-md">Detalhes do pedido</Button>
                                                                    
                                                                    {
                                                                        p.status == 1 && (
                                                                            <>
                                                                                <Button onClick={() => navigate(`/pagamentos/${p.invoice_id}`)} className="p-3 text-md font-medium text-black border-2 bg-white border-primaryColor hover:bg-primaryColor hover:text-white transition-all rounded-md">Finalizar pagamento</Button>
                                                                                <Button onClick={() => cancelOrder(p.order_id, p.invoice_id)} className="p-3 text-md font-medium border-2 bg-red-700 border-red-500 hover:bg-red-600 text-white transition-all rounded-md">Cancelar</Button>
                                                                            </>
                                                                        )
                                                                    }
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