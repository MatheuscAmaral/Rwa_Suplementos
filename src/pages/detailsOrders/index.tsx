import { api } from "@/api";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PedidosProps } from "../orders";
import toast from "react-hot-toast";
import Container from "@/components/container";
import moment  from "moment";

import { IoCart, IoChevronBackCircle } from "react-icons/io5";
import { BsFillCartXFill } from "react-icons/bs";
import { CiBoxList } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AuthContext } from "@/contexts/AuthContext";

export const DetailsOrders = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [pedido, setPedido] = useState<PedidosProps>();
    const [items, setItems] = useState<PedidosProps[]>([]);
    const [active, setActive] = useState(1);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const getOrdersDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/orders/${id}`);

                setPedido(response.data);
            }

            catch {
                toast.error("Ocorreu um erro ao buscar os dados do pedido!");
            }

            finally {
                setLoading(false);
            }
        }

        const getItemsOrder = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/orders/items/${id}`);

                setItems(response.data);
            }

            catch {
                toast.error("Ocorreu um erro ao buscar os dados do pedido!");
            }

            finally {
                setLoading(false);
            }
        }

        getOrdersDetails();
        getItemsOrder();
    }, [])

    const formatData = (data: string) => {
        const createdAtMoment = moment(data);

       return createdAtMoment.format('DD/MM/YYYY');
    }

    const formatPrice = (price: number) => {
        return (Number(price) || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })
    }


    return (
        <main className="w-full sm:max-w-full mx-auto select-none h-screen overflow-hidden">
            <Container>
                <section className="xl:flex-row w-full justify-center gap-3 xl:mt-10" >
                    <div className="border border-gray-100 p-6 rounded-lg pb-52 w-full">
                        <div className="flex gap-2 items-center">
                            <button onClick={() => navigate("/pedidos")}><IoChevronBackCircle className="text-gray-600" fontSize={23}/></button>
                            <h1 className="text-2xl font-semibold text-gray-700 flex items-center gap-1">Pedido #{pedido && pedido.pedido_id}</h1>
                        </div>

                        <div className="border-b border-gray-200 dark:border-gray-700 mt-5">
                            <ul className="flex text-sm font-medium whitespace-nowrap w-full text-center overflow-x-auto text-gray-500 dark:text-gray-400">
                                <li className="me-2 text-xs md:text-sm">
                                    <a onClick={() => setActive(1)} className={`cursor-pointer inline-flex items-center justify-center p-4 rounded-t-lg gap-2 group ${active == 1 ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}>
                                        <CiBoxList fontSize={18}/>
                                        Dados do pedido
                                    </a>
                                </li>

                                <li className="me-2 text-xs md:text-sm">
                                    <a onClick={() => setActive(2)} className={`cursor-pointer inline-flex items-center justify-center p-4 rounded-t-lg gap-2 group ${active == 2 ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`} aria-current="page">
                                        <IoCart fontSize={18}/>
                                        Produtos
                                    </a>
                                </li>

                                <li className="me-2 text-xs md:text-sm">
                                    <a onClick={() => setActive(3)} className={`cursor-pointer inline-flex items-center justify-center p-4 rounded-t-lg gap-2 group ${active == 3 ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`} aria-current="page">
                                        <IoCart fontSize={18}/>
                                        Dados do cliente
                                    </a>
                                </li>
                            </ul>
                        </div>

                            {
                                <section className={`${active == 1 ? "flex flex-col gap-2" : "hidden"} text-xs md:text-sm`}>
                                    {
                                        loading ? (
                                            <div className="flex justify-center mt-32 ">
                                                <AiOutlineLoading3Quarters fontSize={27} className="animate-spin"/>
                                            </div>
                                        ) :
                                        pedido && (
                                                <>
                                                    <div key={pedido.pedido_id} className="grid grid-cols-2">
                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Número:</label>
                                                            <p className="text-md font-medium">#{pedido.pedido_id}</p>
                                                        </div>

                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Cliente:</label>
                                                            <p className="text-md font-medium">{user[0].name}</p>
                                                        </div>
                                                    
                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Data:</label>
                                                            <p className="text-md font-medium">{formatData(pedido.createdAt)}</p>
                                                        </div>

                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Status:</label>
                                                            <p className="text-md font-medium">
                                                                {
                                                                    pedido.status == 1 && (
                                                                        "Em análise"
                                                                    )
                                                                }
        
                                                                {
                                                                    pedido.status == 2 && (
                                                                        "Bloqueado"
                                                                    )
                                                                }
        
                                                                {
                                                                    pedido.status == 3 && (
                                                                        "Cancelado"
                                                                    )
                                                                }
        
                                                                {
                                                                    pedido.status == 4 && (
                                                                        "Faturado"
                                                                    )
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <hr className="mt-3 border-gray-200"/>

                                                    <div className="grid grid-cols-2 md:grid-cols-3">
                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Forma de pagamento:</label>
                                                            <p className="text-md font-medium">
                                                                {
                                                                    pedido.formapag_id == 1 && "Boleto"
                                                                }

                                                                {
                                                                    pedido.formapag_id == 2 && "Cartão de crédito"
                                                                }

                                                                {
                                                                    pedido.formapag_id == 3 && "Pix"
                                                                }
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Total:</label>
                                                            <p className="text-md font-medium">{formatPrice(pedido.total)}</p>
                                                        </div>

                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Descontos:</label>
                                                            <p className="text-md font-medium">{formatPrice(pedido.descontos)}</p>
                                                        </div>

                                                        <div className="flex flex-col gap-2 ml-2 mt-6">
                                                            <label className=" text-gray-400 text-xs md:text-sm font-medium">Frete:</label>
                                                            <p className="text-md font-medium">{formatPrice(pedido.valor_frete)}</p>
                                                        </div>

                                                    </div>
                                                </>
                                        )
                                    }
                                </section>
                            }

                            {
                                <section className={`${active == 2 ? "flex flex-col gap-3" : "hidden"} text-xs md:text-sm`}>
                                    <div className="grid grid-cols-1 gap-2 mt-5">
                                        {
                                             loading ? (
                                                <div className="flex justify-center mt-32 ">
                                                    <AiOutlineLoading3Quarters fontSize={27} className="animate-spin"/>
                                                </div>
                                            ) :
                                            items.length > 0 ? (
                                                items.map(i => {
                                                    return (
                                                        <div key={i.cliente_id} className="flex flex-col gap-1 h-full max-h-80 scrollbar-none overflow-y-auto">
                                                            <div className="flex gap-2 justify-between border rounded-md w-full border-gray-100 py-2 items-center"key={i.produto_id}>
                                                                <div className="flex gap-3 items-center w-full pl-5">
                                                                    <img src={i.image} className="w-14 mr-4" alt="img_prod" />
    
                                                                    <ul className="flex justify-between w-full pr-10">
                                                                        <li className="flex flex-col gap-1">
                                                                            <span className="text-sm font-medium text-gray-500">Descrição:</span>
                                                                            <p className="text-xs text-gray-700 font-medium">{i.title}</p>
                                                                        </li>
    
                                                                        <li className="hidden sm:flex flex-col gap-1">
                                                                            <span className="text-sm font-semibold text-gray-500">Código:</span>
                                                                            <p className="text-xs text-gray-700 font-medium">
                                                                                {i.produto_id}
                                                                            </p>
                                                                        </li>
     
                                                                        <li className="hidden sm:flex flex-col gap-1">
                                                                            <span className="text-sm font-semibold text-gray-500">Valor:</span>
                                                                            <p className="text-xs text-gray-700 font-medium">
                                                                                {formatPrice(i.price * i.qtd_atendida)}
                                                                            </p>        
                                                                        </li>
    
                                                                        <li className="flex flex-col gap-1">
                                                                            <span className="text-sm font-semibold text-gray-500">Quantidade:</span>
                                                                            <p className="text-xs text-gray-700 font-medium">
                                                                                {i.qtd_atendida}
                                                                            </p>       
                                                                        </li>
    
                                                                        <li className="hidden md:flex flex-col gap-1">
                                                                            <span className="text-sm font-semibold text-gray-500">Sabor:</span>
                                                                            <p className="text-xs text-gray-700 font-medium">
                                                                                {
                                                                                    i.flavor
                                                                                }
                                                                            </p>       
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div className="flex  items-center gap-2 justify-center text-md mt-5">
                                                    <BsFillCartXFill fontSize={22}/>
                                                    <p>Sem produtos.</p> 
                                                </div>
                                            )
                                        }
                                    </div>
                                </section>
                            }

                            {
                                <section className={`${active == 3 ? "flex flex-col gap-2" : "hidden"} text-xs md:text-sm`}>
                                    {
                                        loading ? (
                                            <div className="flex justify-center mt-32 ">
                                                <AiOutlineLoading3Quarters fontSize={27} className="animate-spin"/>
                                            </div>
                                        ) :
                                        pedido &&
                                            <>
                                                <div key={pedido.pedido_id} className="grid grid-cols-2">
                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Nome:</label>
                                                        <p className="text-md font-medium">{user[0].name}</p>
                                                    </div>

                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Código:</label>
                                                        <p className="text-md font-medium">{pedido.cliente_id}</p>
                                                    </div>

                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">CPF:</label>
                                                        <p className="text-md font-medium">{user[0].cpf}</p>
                                                    </div>

                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Status:</label>
                                                        <p className="text-md font-medium">
                                                            {
                                                                pedido.status == 0 ? "Inativo" : "Ativo"
                                                            }
                                                        </p>
                                                    </div>
                                                </div>

                                                <hr className="mt-3 border-gray-200"/>

                                                <p className="text-md text-gray-600 font-semibold mt-3 ml-2">Endereço de entrega:</p>

                                                <div className="grid grid-cols-2 md:grid-cols-3">
                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Cep:</label>
                                                        <p className="text-md font-medium">
                                                            {pedido.cep}
                                                        </p>
                                                    </div>
                                                    
                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Rua:</label>
                                                        <p className="text-md font-medium">{pedido.rua}</p>
                                                    </div>

                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Número:</label>
                                                        <p className="text-md font-medium">{pedido.numero}</p>
                                                    </div>

                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Bairro:</label>
                                                        <p className="text-md font-medium">{pedido.bairro}</p>
                                                    </div>
                                                    
                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">Cidade:</label>
                                                        <p className="text-md font-medium">{pedido.cidade}</p>
                                                    </div>

                                                    <div className="flex flex-col gap-2 ml-2 mt-6">
                                                        <label className=" text-gray-400 text-xs md:text-sm font-medium">UF:</label>
                                                        <p className="text-md font-medium">{pedido.uf}</p>
                                                    </div>

                                                </div>
                                            </>                                                                        
                                    }
                                </section>
                            }
                    </div>
                </section>
            </Container>
        </main>
    )
}