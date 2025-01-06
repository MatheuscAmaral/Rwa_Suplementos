import { api } from "@/api";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { CartContext } from "@/contexts/CartContext";
import { formatPrice } from "@/format/formatPrice";
import { InvoiceProps } from "@/interfaces/InvoicePropst";
import { useContext, useEffect, useState } from "react";
import { IoBarcodeOutline, IoCopyOutline } from "react-icons/io5";
import Barcode from "react-barcode";
import QRCode from "react-qr-code";
import { Skeleton } from "@/components/ui/skeleton";

const Payment = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { total } = useContext(CartContext);
  const [invoice, setInvoice] = useState<InvoiceProps[]>([]);
  const [loading, setLoading] = useState(false);
  
  const getInvoice = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/invoices/${id}`);

      setInvoice([response.data]);
    } catch (error) {
      return error; 
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInvoice();
  }, []);

  return (
    <div className="flex flex-col gap-5 lg:flex-row w-full max-w-full lg:max-w-7xl mx-auto h-full pb-48 mt-2 md:mt-10 pt-4 px-5 md:mb-30">
      {
        loading ? (
          <div className={`grid lg:grid-cols-2 justify-center gap-2 h-80`}>
              <Skeleton className="h-[400px] lg:h-[700px] w-[600px] rounded-xl" />
              <Skeleton className="h-[400px] lg:h-[700px] w-[600px] rounded-xl" />
          </div>
        ) : (
          invoice && invoice.length > 0 && (
            <>
              <section className="border py-5 px-5 pb-10 w-full lg:max-w-lg rounded-lg">
                <h5 className="font-semibold text-sm ml-2">
                  Revise os dados de pagamento
                </h5>
    
                {invoice.map((i) => {
                  return (
                    <div className="grid md:grid-cols-2  gap-5 px-2 mt-7">
                      <div className="flex flex-col">
                        <label
                          htmlFor=""
                          className="text-sm text-gray-700 font-medium"
                        >
                          CLIENTE:
                        </label>
                        <p className="text-sm font-semibold">{user[0].name}</p>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor=""
                          className="text-sm text-gray-700 font-medium"
                        >
                          CPF:
                        </label>
                        <p className="text-sm font-semibold">{user[0].cpf}</p>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor=""
                          className="text-sm text-gray-700 font-medium"
                        >
                          FORMA DE PAGAMENTO:
                        </label>
                        <p className="text-sm font-semibold">{i.billingType}</p>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor=""
                          className="text-sm text-gray-700 font-medium"
                        >
                          VALOR:
                        </label>
                        <p className="text-sm font-semibold">
                          {formatPrice(total)}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor=""
                          className="text-sm text-gray-700 font-medium"
                        >
                          FRETE:
                        </label>
                        <p className="text-sm font-semibold">{formatPrice(23)}</p>
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor=""
                          className="text-sm text-gray-700 font-medium"
                        >
                          TOTAL:
                        </label>
                        <p className="text-sm font-semibold">
                          {formatPrice(i.value + 23)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </section>
    
              <section className="w-full lg:max-w-2xl rounded-lg px-5 py-4 pb-5 border">
                <h5 className="font-semibold text-sm mb-5">
                  Pagamento via {invoice[0].billingType}
                </h5>
    
                {invoice.map((i) => {
                  return (
                    <div className="flex flex-col gap-5 px-2 justify-center">
                      {i.billingType == "BOLETO" && (
                        <>
                          <p className="text-sm text-gray-600">
                            Leia o código de barras usando seu aplicativo de banco
                            ou conta digital, ou copie o código da linha digitável
                            abaixo e cole em seu aplicativo de banco ou conta
                            digital, para efetuar o pagamento.
                          </p>
                          <div className="px-5 flex flex-col gap-2 items-center">
                            <Barcode
                              value={i.ticketCode.identificationField}
                              width={1.3}
                              height={80}
                              displayValue={false}
                              format="CODE128"
                            />
                            <p className="text-sm text-gray-600 text-center">
                              {i.ticketCode.identificationField}
                            </p>
                          </div>
    
                          <div className="flex flex-col gap-3 mt-5">
                            <Button
                              onClick={() =>
                                navigator.clipboard.writeText(
                                  i.ticketCode.identificationField
                                )
                              }
                              className="flex gap-2 bg-primaryColor text-white p-3 text-sm rounded-md"
                            >
                              Copiar linha digitável <IoCopyOutline fontSize={22} />
                            </Button>
    
                            <Button
                              onClick={() => window.open(i.invoiceUrl, "_blank")}
                              className="flex gap-2 bg-primaryColor text-white p-3 rounded-md"
                            >
                              Visualizar boleto <IoBarcodeOutline fontSize={27} />
                            </Button>
                          </div>
                        </>
                      )
                      }

                      {
                        i.billingType == "PIX" && (
                          <>
                            <p className="text-sm text-gray-600">
                                Procure em seu aplicativo de banco ou conta digital a funcionalidade e escaneie o QR Code abaixo ou copie o código usando o Pix Copia e Cola para efetuar o pagamento.
                            </p>

                            <div className="px-5 max-w-22 mt-5 flex flex-col gap-2 items-center">
                              <div style={{ height: "auto", margin: "0 auto", maxWidth: 180, width: "100%" }}>
                                <QRCode
                                  size={400}
                                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                  value={i.qrCode.payload}
                                  viewBox={`0 0 400 400`}
                                />
                              </div>
                            </div>
      
                            <div className="flex flex-col gap-3 mt-10">
                              <Button
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    i.qrCode.payload
                                  )
                                }
                                className="flex gap-2 bg-primaryColor text-white p-3 text-sm rounded-md"
                              >
                                Copiar código copia e cola <IoCopyOutline fontSize={22} />
                              </Button>
                            </div>
                          </>
                        )
                      }
                    </div>
                  );
                })}
              </section>
            </>
          )
        )
      }
    </div>
  );
};

export default Payment;
