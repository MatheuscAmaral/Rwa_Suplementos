import React, { useContext, useState } from "react";
import { CartContext } from "@/hooks/CartContext";
import { AuthContext } from "@/hooks/AuthContext";
import { CiLocationArrow1 } from "react-icons/ci";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoBarcodeOutline, IoClose, IoBagCheckOutline } from "react-icons/io5";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdPayment, MdPix } from "react-icons/md";
import { FaCheckCircle, FaShippingFast } from "react-icons/fa";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { api } from "@/api";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "@/format/formatPrice";
import { IOrders } from "@/interfaces/IOrders";
import toast from "react-hot-toast";
import cepApi from "@/api/cep";
import CreditCardMaskedInput from "@/components/CreditCardMask";
import CVCMaskedInput from "@/components/CvcMaskInput";

type CardProps = React.ComponentProps<typeof Card>;

interface FormaProps {
  id: number;
  description: string;
  type: number;
  status: number;
}

export const Checkout = ({ className, ...props }: CardProps) => {
  const navigate = useNavigate();
  const { cart, total, addItemCart, removeItemCart, descontos, clearAll } =
    useContext(CartContext);
  const { user, authUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1");
  const [formas, setFormas] = useState<FormaProps[]>([]);
  const [formaPag, setFormaPag] = useState<string>("");
  const [load, setLoad] = useState(false);
  const [tipo, setTipo] = useState("");
  const [address, setEditAddress] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [street, setStreet] = useState(user[0].street);
  const [neighborhood, setNeighborhood] = useState(user[0].neighborhood);
  const [number, setNumber] = useState(user[0].number);
  const [city, setCity] = useState(user[0].city);
  const [state, setState] = useState(user[0].uf);
  const [cep, setCep] = useState(user[0].zip_code);
  const [totalValue, setTotalValue] = useState(total + descontos);
  const [pedidoMessage, setPedidoMessage] = useState("");
  const maxParceils = [1, 2, 3, 4, 5, 6];
  const [parcelas, setParcelas] = useState("");
  const [cvc, setCVC] = useState("");
  const [numberCart, setNumberCart] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [shippingCost, setShippingCost] = useState([{
    enterprise: '',
    value: 0
  }]);

  const [rua, setRua] = useState(user[0].street);
  const [bairro, setBairro] = useState(user[0].neighborhood);
  const [numero, setNumero] = useState(user[0].number);
  const [cidade, setCidade] = useState(user[0].city);
  const [uf, setUf] = useState(user[0].uf);

  const getFormasPagamento = async () => {
    setOpenModal(true);
    setEditAddress(false);
    setSelectedOption(formaPag);
    const response = await api.get("/payments");

    setFormas(response.data);
  };

  const getShippingCostEnterprises = async () => {
    setShipping(true);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setEditAddress(false);
    setShipping(false);
    cleanModal();
  };

  const handleFormaPag = (f: FormaProps) => {
    setSelectedOption(String(f.type));

    setTipo(String(f.type));
  };

  const saveFormaPag = () => {
    try {
      setLoad(true);
      setFormaPag(tipo);
    } catch {
      toast.error("Ocorreu um erro ao salvar forma de pagamento!");
    } finally {
      setLoad(false);
      setOpenModal(false);
    }
  };

  const editAddress = () => {
    setEditAddress(true);
    setOpenModal(true);
  };

  const cancelInvoice = async (order?: IOrders) => {
    try {
        const invoiceString = localStorage.getItem('@invoiceEcommerce');

        if (invoiceString) {
          const invoiceLocal = JSON.parse(invoiceString);
          const invoice = await api.delete(`/invoices/${invoiceLocal.id}`);

          if (invoice.status === 200) {
            if (order) {
              await api.delete(`/orders/${order.order_id}`);
            }
          }
        }
    } catch (error) {
      toast.error("Ocorreu um erro ao cancelar o pedido!");
    }
  }

  const getCep = async (cep: string) => {
    setCep(cep);

    if (cep.length != 8) {
      return;
    }

    try {
      const response = await cepApi.get(`/${cep}`);

      setStreet(response.data.logradouro);
      setNeighborhood(response.data.bairro);
      setCity(response.data.localidade);
      setState(response.data.uf);
    } catch {
      toast.error("Cep inexistente!");
    }
  };

  const cleanModal = () => {
    setStreet("");
    setNeighborhood("");
    setCity("");
    setState("");
    setCep("");
    setNumber("");
  };

  const saveEndereco = () => {
    setRua(street);
    setNumero(number);
    setBairro(neighborhood);
    setCidade(city);
    setUf(state);

    cleanModal();

    setOpenModal(false);
  };

  const getTotal = (value: number) => {
    return formatPrice(value);
  };

  const clearCart = () => {
    setCidade("");
    setCep("");
    setBairro("");
    setUf("");
    setNumero("");
    setTotalValue(0);
    clearAll();
  };

  const finalizarPedido = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!formaPag) {
        toast('Nenhuma forma de pagamento selecionada!', {
            icon: '⚠️',
          });
        return;
    }

    setLoading(true);
    let response;
    
    const data = {
        user_id: user[0].id,
        name: user[0].name,
        cpfCnpj: user[0].cpf,
        email: user[0].email,
        address: `${street}, ${neighborhood}, ${city}, ${state}`,
        addressNumber: String(number),
        postalCode: String(cep),
        customer_id: user[0].customer_id != null ? user[0].customer_id : null,
        paymentMethod: formaPag,
        total: totalValue - descontos,
        discounts: descontos,
        shippingCost: 23,
        productId: cart.map((p) => p.product_id),
        zipCode: cep != "" ? cep : user[0].cep,
        clientId:  user[0].id,
        street: rua != "" ? rua : user[0].rua,
        city: cidade != "" ? cidade : user[0].cidade,
        number: numero != "" ? numero : user[0].numero,
        neighborhood: bairro != "" ? bairro : user[0].bairro,
        uf: uf != "" ? uf : user[0].uf,
        status: formaPag == "2" ? 2 : 1,
        quantityOrdered: cart.map((p) => p.amount),
        quantityServed: cart.map((p) => {
          if (p.stock <= 0 || p.status == 0) {
            return 0;
          }
    
          if (p.amount >= p.stock) {
            return p.stock;
          }
    
          return p.amount;
        }),
        discountType: cart.map((p) => p.discount_type),
        discountValue: cart.map((p) => p.discount_value),
        installmentValue: (total / Number(parcelas)).toFixed(2),
        creditCard: {
          holderName: name,
          number: numberCart,
          expiryMonth: month,
          expiryYear: year,
          ccv: cvc,
        },
        creditCardHolderInfo: {
          name: user[0].name,
          email: user[0].email,
          cpfCnpj: user[0].cpf,
          postalCode: cep,
          addressNumber: user[0].number,
          phone: '31992661386',
        },
      };
    
    try {
      response = await api.post('/orders/prepare', data);
      const userString = localStorage.getItem('@userEcommerce');

      if (response.data.errors) {
        toast.error(response.data.errors);
        return;
      }
      
      if (userString) {
        const user = JSON.parse(userString);
        
        if (user && user["0"]) {
          user["0"].customer_id = response.data.client.id;
        } 
        
        authUser(user);
        localStorage.setItem('@userEcommerce', JSON.stringify(user));
      }

      if (response.data.invoice) {
        const invoice = response.data.invoice;
        localStorage.setItem("@invoiceEcommerce", JSON.stringify(invoice));
        response = await api.post("/orders", data);

        await api.put(`/orders/invoice/${response.data.order_id}`, {
          invoice_id: invoice.id,
        });

       if (invoice && invoice.creditCard && !invoice.creditCard.errors) {
         clearCart();
         setPedidoMessage(`#${response.data.order_id}`);
       } else {
        cancelInvoice(response.data);
        toast.error("Ocorreu um erro ao enviar o seu pedido, tente novamente mais tarde!");
        return;
       }

       if (formaPag != "2") {
        navigate(`/pagamentos/${invoice.id}`);
       }
      }
    } catch {
      toast.error(
        "Ocorreu um erro ao enviar o seu pedido, tente novamente mais tarde!"
      );

      cancelInvoice();
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mb-20">
      {
          pedidoMessage != "" ? (
            <div className="flex flex-col gap-5 h-svh items-center mt-20 lg:mt-52">
              <FaCheckCircle fontSize={40} className="text-green-500" />
              <h1 className=" text-xl font-medium ">Pedido enviado com sucesso!</h1>
              <p className="text-md font-medium">Número do pedido: <span className="font-bold">{pedidoMessage}</span></p>
              <Link
                to={"/pedidos"}
                className="bg-primaryColor text-white p-3 rounded-md"
              >
                Ver pedidos
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-5 md:flex-row justify-center w-full max-w-7xl mx-auto h-full pb-48 mt-2 md:mt-10 pt-4 px-5 md:mb-30">
              <section className="border py-5 px-5 pb-10 w-full md:max-w-3xl rounded-lg">
                <h5 className="font-semibold text-sm ml-2">Revisar e finalizar</h5>
    
                <div className="flex justify-between items-center text-xs mx-4">
                  <div className="flex gap-3 items-center mt-5 text-xs">
                    <CiLocationArrow1 fontSize={22} className="text-gray-800" />
                    {user.map((u) => {
                      return (
                        <div key={u.id} className="text-gray-500 font-medium">
                          <p className="font-bold">Endereço</p>
                          <p className="max-w-40 lg:max-w-full">
                            {" "}
                            {rua}, {numero}, {bairro} - {uf}
                          </p>
                        </div>
                      );
                    })}
                  </div>
    
                  <span
                    onClick={() => editAddress()}
                    className="text-gray-500 font-medium cursor-pointer mt-5"
                  >
                    Alterar
                  </span>
                </div>
    
                <div className="flex justify-between items-center mt-5 text-xs mx-4">
                  <div className="flex gap-3 items-center text-xs ">
                    {formaPag == "2" && (
                      <MdPayment className="text-gray-700" fontSize={23} />
                    )}
    
                    {formaPag == "1" && <IoBarcodeOutline fontSize={23} />}
    
                    {formaPag == "3" && (
                      <MdPix className="text-gray-700" fontSize={23} />
                    )}
    
                    {formaPag == "" && <RiSecurePaymentLine className="text-gray-500" fontSize={23} />}
    
                    <div className="text-gray-500 font-medium">
                      <p className="font-bold">
                        {
                            formaPag != "" ? (
                                formaPag == "2" ? `${parcelas}x sem juros` : "À vista"
                            ): (
                                "Forma de pagamento"
                            )
                        }
                      </p>
                      <p>
                        {formaPag != "" ? (
                          <span>
                            {formaPag == "2" && "Cartão de crédito"}
                            {formaPag == "1" && "Boleto"}
                            {formaPag == "3" && "Pix"}
                          </span>
                        ) : (
                            <span className="text-red-600"> Nada selecionado</span>
                        )}
                      </p>
                    </div>
                  </div>
    
                  <span
                    onClick={() => getFormasPagamento()}
                    className="text-gray-500 font-medium cursor-pointer"
                  >
                   {
                        formaPag != "" ? "Alterar" : "Adicionar"
                   }
                  </span>
                </div>

                <div className="flex justify-between items-center mt-5 text-xs mx-4">
                  <div className="flex gap-3 items-center text-xs ">
                    <FaShippingFast className="text-gray-500" fontSize={23} />
    
                    <div className="text-gray-500 font-medium">
                      <p className="font-bold">Frete</p>
                      <p>
                        {shippingCost.length > 0 && shippingCost[0].enterprise  ? (
                          <span>
                            {shippingCost[0].enterprise}
                          </span>
                        ) : (
                            <span className="text-red-600"> Nada selecionado</span>
                        )}
                      </p>
                    </div>
                  </div>
    
                  <span
                    onClick={() => getShippingCostEnterprises()}
                    className="text-gray-500 font-medium cursor-pointer"
                  >
                   {
                        shippingCost && shippingCost[0].enterprise ? "Alterar" : "Adicionar"
                   }
                  </span>
                </div>
    
                <div className="flex flex-col gap-1 mt-10 h-full max-h-80 overflow-auto scrollbar-none">
                  {cart && cart.map((p) => {
                    return (
                      <div
                        className="flex gap-2 justify-between border border-l-0 border-r-0 border-b-0 border-gray-100 py-2 items-center"
                        key={p.product_id}
                      >
                        <div className="flex gap-3 items-center">
                          <img src={p.image} className="w-16" alt="img_prod" />
    
                          <div className="flex flex-col gap-1">
                            <p className="text-xs font-semibold text-gray-500">
                              {p.title}
                            </p>
                            <span className="text-xs font-semibold text-gray-500">
                              Código: {p.product_id}
                            </span>
    
                            {p.promotion_id >= 1 ? (
                              <div className="flex flex-col">
                                <div className="flex flex-col">
                                  <span
                                    style={{ fontSize: "11px" }}
                                    className=" line-through"
                                  >
                                    {formatPrice(p.amount * p.price)}
                                  </span>
    
                                  <span
                                    style={{ fontSize: "13px" }}
                                    className=" text-green-600 font-semibold"
                                  >
                                    {formatPrice(p.total)}
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <span className="mb-2 text-sm font-semibold text-gray-700">
                                {formatPrice(p.total)}
                              </span>
                            )}
                          </div>
                        </div>
    
                        <div className="flex items-center gap-2 text-sm border px-1.5 rounded-full mr-2">
                          <button onClick={() => removeItemCart(p)}>-</button>
    
                          <span>{p.amount}</span>
    
                          <button onClick={() => addItemCart(p)}>+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
    
              </section>
    
              <form onSubmit={(e) => finalizarPedido(e)} className="w-full md:max-w-96 rounded-lg px-5 py-4 pb-5 border">
                <h5 className="font-semibold text-sm mb-5">Resumo do pedido</h5>
                <p className="font-medium text-xs mb-2 text-gray-500">
                  Pedido: <span className="font-bold">#1</span>
                </p>
                <hr />
    
                <p className="mt-3 text-xs flex justify-between font-medium text-gray-500">
                  SubTotal
                  <span>
                    {total <= 0
                      ? getTotal(cart[0].price)
                      : getTotal(total + descontos)}
                  </span>
                </p>
                <p className="mt-2 text-xs flex justify-between mb-3 font-medium text-gray-500">
                  Descontos{" "}
                  <span className="text-green-600 font-medium">
                    {" "}
                    - {formatPrice(descontos)}
                  </span>
                </p>
                <p className="mt-2 text-xs flex justify-between mb-3 font-medium text-gray-500">
                  Frete{" "}
                  <span className=" font-medium">
                    {formatPrice(0)}
                  </span>
                </p>
                <hr />
    
                <p className="mt-2 text-sm flex justify-between font-semibold">
                  Total
                  <span>
                    {total <= 0
                      ? getTotal(
                          cart[0].priceWithDiscount > 0
                            ? cart[0].priceWithDiscount
                            : cart[0].price
                        )
                      : getTotal(total)}
                  </span>
                </p>
    
                <div className="mt-5">
                  {cart.length > 0 ? (
                    <button
                      id="button"
                      type="submit"
                      className={`${
                        loading ? "disabled cursor-not-allowed opacity-70" : ""
                      } text-sm bg-primaryColor text-white flex items-center justify-center py-3 w-full rounded-lg border-0 hover:bg-secondaryColor transition-all  mb-3`}
                    >
                      {loading ? (
                        <AiOutlineLoading3Quarters
                          fontSize={22}
                          className=" transition-all animate-spin"
                        />
                      ) : (
                        <p
                          style={{ paddingBottom: 2 }}
                          className="transition-all flex items-center gap-2"
                        >
                          <IoBagCheckOutline fontSize={20} />
                          Finalizar compra
                        </p>
                      )}
                    </button>
                  ) : (
                    <div className=" w-72">
                      <button
                        id="button"
                        className={`${
                          loading ? "disabled cursor-not-allowed opacity-70" : ""
                        } text-sm bg-secondaryColor text-white flex items-center justify-center py-3 w-full rounded-lg border-0 mb-3 hover:bg-primaryColor transition-all`}
                      >
                        {loading ? (
                          <AiOutlineLoading3Quarters
                            fontSize={22}
                            className=" transition-all animate-spin"
                          />
                        ) : (
                          <p
                            style={{ paddingBottom: 2 }}
                            className="transition-all flex items-center gap-2"
                          >
                            <IoBagCheckOutline fontSize={20} />
                            Visualizar catálogo
                          </p>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </form>
    
              <div
                className={` fixed top-0 left-0 right-0 bottom-0`}
                style={{
                  backgroundColor: "#222121b3",
                  height: "100vh",
                  display: openModal ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card
                  className={`${cn("w-full", className)} ${
                    openModal && !shipping ? "block" : "hidden"
                  } ${address && "hidden"} relative md:mx-auto max-w-xl mx-5`}
                  style={{ height: selectedOption === "2" ? 680 : 300 }}
                  {...props}
                >
                  <CardHeader className="relative ">
                    <CardTitle className="text-lg xl:text-2xl">Forma de pagamento</CardTitle>
                    <IoClose
                      onClick={() => closeModal()}
                      fontSize={25}
                      className="absolute top-4 right-5 cursor-pointer"
                    />
                  </CardHeader>
    
                  <CardContent className="flex flex-col gap-5">
                    <RadioGroup
                      id="radio"
                      defaultValue={selectedOption}
                      className={`grid ${
                        formas.length <= 0 ? "grid-cols-1" : "grid-cols-3"
                      } gap-2 mt-3 justify-center ${
                        selectedOption != "2" && "mb-0 sm:mb-10"
                      }`}
                    >
    
                      {formas.length > 0 ? (
                        formas.map((f) => {
                          return (
                            <div
                              key={f.id}
                              className={`flex flex-col items-center gap-2 ${
                                selectedOption == String(f.type) &&
                                "bg-primaryColor text-white"
                              } rounded-md border p-3 hover:border-primaryColor transition-all select-none relative`}
                            >
                              {f.type == 2 && <MdPayment fontSize={30} />}
    
                              {f.type == 3 && <MdPix fontSize={30} />}
    
                              {f.type == 1 && <IoBarcodeOutline fontSize={30} />}
    
                              <span className="text-xs font-semibold text-center">
                                {f.description}
                              </span>
    
                              <RadioGroupItem
                                onClick={() => handleFormaPag(f)}
                                value={String(f.type)}
                                id={f.description}
                                className="absolute w-full h-full top-0 rounded opacity-0"
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className={`text-center mt-1 ${
                          loading ? "hidden" : "flex justify-center"
                        }`}>
                          <h1>Nenhuma forma de pagamento disponível!</h1>
                        </div>
                      )}
                    </RadioGroup>
    
                    <section
                      className={`grid grid-rows-3 gap-7 ${
                        selectedOption != "2" && "hidden"
                      }`}
                    >
                      <div className="flex flex-col gap-2 text-sm">
                        <label htmlFor="name">Nome do títular:</label>
                        <Input
                          id="name"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Digite o nome escrito no cartão..."
                        />
                      </div>
    
                      <div className="flex flex-col gap-2 text-sm">
                        <label htmlFor="number">Número do cartão:</label>
                        <CreditCardMaskedInput
                          value={numberCart}
                          onChange={(e) => setNumberCart(e)}
                        />
                      </div>
    
                      <div className=" grid grid-cols-3 gap-2 text-sm">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="date"> Mês de vencimento:</label>
    
                          <Select onValueChange={(e) => setMonth(e)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Janeiro" />
                            </SelectTrigger>
    
                            <SelectContent>
                              <SelectItem value="01">Janeiro</SelectItem>
                              <SelectItem value="02">Fevereiro</SelectItem>
                              <SelectItem value="03">Março</SelectItem>
                              <SelectItem value="04">Abril</SelectItem>
                              <SelectItem value="05">Maio</SelectItem>
                              <SelectItem value="06">Junho</SelectItem>
                              <SelectItem value="07">Julho</SelectItem>
                              <SelectItem value="08">Agosto</SelectItem>
                              <SelectItem value="09">Setembro</SelectItem>
                              <SelectItem value="10">Outubro</SelectItem>
                              <SelectItem value="11">Novembro</SelectItem>
                              <SelectItem value="12">Dezembro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
    
                        <div className="flex flex-col gap-2">
                          <label htmlFor="date"> Ano de vencimento:</label>
    
                          <Select onValueChange={(e) => setYear(e)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Ano" />
                            </SelectTrigger>
    
                            <SelectContent>
                              <SelectItem value="2024">2024</SelectItem>
                              <SelectItem value="2025">2025</SelectItem>
                              <SelectItem value="2026">2026</SelectItem>
                              <SelectItem value="2027">2027</SelectItem>
                              <SelectItem value="2028">2028</SelectItem>
                              <SelectItem value="2029">2029</SelectItem>
                              <SelectItem value="2030">2030</SelectItem>
                              <SelectItem value="2031">2031</SelectItem>
                              <SelectItem value="2032">2032</SelectItem>
                              <SelectItem value="2033">2033</SelectItem>
                              <SelectItem value="2034">2034</SelectItem>
                              <SelectItem value="2035">2035</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
    
                        <div className="flex flex-col gap-2">
                          <label htmlFor="cvc">CVC:</label>
                          <CVCMaskedInput onChange={(e) => setCVC(e)} value={cvc} />
                        </div>
                      </div>
    
                      <div className="flex flex-col gap-2">
                        <label htmlFor="date"> Parcelas:</label>
    
                        <Select onValueChange={(e) => setParcelas(e)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o número de parcelas" />
                          </SelectTrigger>
    
                          <SelectContent>
                            {
                              maxParceils.map((p) => {
                                return (
                                  <SelectItem value={String(p)}>
                                    {p == 1 ? "À vista" : `${p} vezes sem juros`} - {formatPrice(total / p)}
                                  </SelectItem>
                                )
                              })
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </section>
                  </CardContent>
    
                  <CardFooter>
                    <Button
                      onClick={() => saveFormaPag()}
                      className={`w-full h-11 bg-primaryColor ${formas.length <= 0 && "mt-12"}`}
                      disabled={formas.length <= 0 || (Number(selectedOption) == 2 && (!name || !cvc || !numberCart || !year || !month || !parcelas)) }
                    >
                      {load ? (
                        <AiOutlineLoading3Quarters />
                      ) : (
                        <span className={`flex items-center`}>
                          <Check className="mr-2 h-4 w-4" /> Salvar{" "}
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card
                  className={`${cn("w-full", className)} ${
                    openModal && shipping ? "block" : "hidden"
                  } ${address && "hidden"} relative md:mx-auto max-w-xl mx-5`}
                  style={{ height: selectedOption === "2" ? 680 : 300 }}
                  {...props}
                >
                  <CardHeader className="relative ">
                    <CardTitle className="text-lg xl:text-2xl">Frete</CardTitle>
                    <IoClose
                      onClick={() => closeModal()}
                      fontSize={25}
                      className="absolute top-4 right-5 cursor-pointer"
                    />
                  </CardHeader>
    
                  <CardContent className="flex flex-col gap-5">
    
                    <section
                      className={`grid grid-rows-3 gap-7`}
                    >
                      <div className="">

                      </div>
                    </section>
                  </CardContent>
    
                  <CardFooter>
                    <Button
                      className={`w-full h-11 bg-primaryColor ${formas.length <= 0 && "mt-12"}`}
                    >
                      {load ? (
                        <AiOutlineLoading3Quarters />
                      ) : (
                        <span className={`flex items-center`}>
                          <Check className="mr-2 h-4 w-4" /> Salvar{" "}
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
    
                <Card
                  className={`${cn("w-full", className)} ${
                    openModal && address ? "block" : "hidden"
                  } relative mx-auto max-w-lg`}
                  style={{ height: 530 }}
                  {...props}
                >
                  <CardHeader className="relative">
                    <CardTitle>Endereço</CardTitle>
                    <IoClose
                      onClick={() => closeModal()}
                      fontSize={25}
                      className="absolute top-4 right-5 cursor-pointer"
                    />
                  </CardHeader>
    
                  <CardContent className="flex flex-col">
                    <section className={`grid grid-rows-2 gap-5 mt-2 `}>
                      <div className="flex flex-col gap-2 text-sm text-gray-700">
                        <label htmlFor="cep">Cep:</label>
                        <Input
                          id="cep"
                          value={cep}
                          onChange={(e) => getCep(e.target.value)}
                          required
                          type="number"
                          placeholder="Digite o seu cep..."
                        />
                      </div>
    
                      <div className="flex flex-col gap-2 text-sm text-gray-700">
                        <label htmlFor="rua">Rua:</label>
                        <Input
                          id="rua"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          type="text"
                          placeholder="Digite a sua rua..."
                        />
                      </div>
    
                      <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                          <label htmlFor="numero">Número:</label>
                          <Input
                            id="numero"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            type="text"
                            placeholder="Digite o número..."
                          />
                        </div>
    
                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                          <label htmlFor="bairro">Bairro:</label>
                          <Input
                            id="bairro"
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                            type="string"
                            placeholder="Digite o seu bairro..."
                          />
                        </div>
    
                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                          <label htmlFor="cidade">Cidade:</label>
                          <Input
                            id="cidade"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="Digite a sua cidade..."
                          />
                        </div>
    
                        <div className="flex flex-col gap-2 text-sm text-gray-700">
                          <label htmlFor="uf">UF:</label>
                          <Input
                            id="uf"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            type="string"
                            placeholder="Digite a uf..."
                          />
                        </div>
                      </div>
                    </section>
                  </CardContent>
    
                  <CardFooter>
                    <Button
                      type="submit"
                      disabled={!cep || !rua || !numero || !cidade || !bairro || !uf}
                      onClick={() => saveEndereco()}
                      className={`w-full h-11 bg-primaryColor`}
                    >
                      {load ? (
                        <AiOutlineLoading3Quarters />
                      ) : (
                        <span className={`flex items-center`}>
                          <Check className="mr-2 h-4 w-4" /> Salvar endereço
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )
      }
    </main>
  );
};
