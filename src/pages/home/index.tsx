import { api } from "../../api";
import { useEffect, useState } from 'react';
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { FaCartPlus } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ResponsiveCarousel  } from 'react-responsive-carousel';
import carousel1 from '../../assets/carousel1.png'
import carousel2 from '../../assets/carousel2.jpg'
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
  

export interface ProductsProps {
    [x: string]: ReactNode;
    id: number, 
    title: string,
    price: number,
    image: string,
    category: string,
    size: string,
    flavor: string,
    amount: number,
}

export const Home = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const { addItemCart } = useContext(CartContext);


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
    
    // const removeProductCart = (products: ProductsProps) => {
    //     removeItemCart(products)
    // }


    return (  
        <main className="w-full mx-auto select-none">       
            <ResponsiveCarousel className="mb-5" autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false}>
                <div>
                    <img src={carousel1} style={{ maxHeight: '700px'}} alt="carousel1" />
                </div>
                <div>
                    <img src={carousel2} style={{ maxHeight: '700px'}} alt="carousel2" />
                </div>
            </ResponsiveCarousel>


            <section className="flex flex-col gap-1 w-full max-w-7xl justify-center mx-auto p-4 pb-20">
                <Carousel className="w-full max-w-3xl mx-auto">
                    <h1 className=" text-xl font-bold text-center"> Whey Protein</h1>
                    <hr className="mb-8 w-44 h-1 bg-blue-800 mx-auto" />
                    <CarouselContent className="-ml-1">
                        {
                            products.map(p => {
                                if(p.category != "whey" ) {
                                    return;
                                }
                                
                                return (
                                    <CarouselItem key={p.id} className="pl-1 basis-2/3 sm:basis-2/3 md:basis-1/3 lg:basis-1/3">
                                        <div className="p-1">
                                        <Card className="w-full max-w-96 h-72">
                                            <CardContent className="flex flex-col  justify-center gap-3 h-full ">
                                                <div className="flex justify-center">
                                                    <Link to={`/detalhes/${p.id}`}>
                                                        <img src={p.image} className="w-32 hover:scale-105 transition-all cursor-pointer" alt="img_prod_" />
                                                    </Link>
                                                </div>

                                                <h2 className="text-md font-bold ">{p.title}</h2>
                                                <div className="flex justify-between">
                                                    <span className="text-xl font-bold">{p.price.toLocaleString('pt-br', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}</span>

                                                    <button className="bg-blue-700 p-1.5 w-8 rounded-full flex items-center justify-center" onClick={() => addProductCart(p)}>
                                                        <FaCartPlus fontSize={18} color="white" />
                                                    </button>
                                                </div>

                                                {/*
                                                    <button onClick={() => removeProductCart(p)}>
                                                        x
                                                    </button>
                                                */}
                                            </CardContent>
                                        </Card>
                                        </div>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>

            <section className="flex flex-col gap-1 w-full max-w-7xl justify-center mx-auto p-4 pb-20">
                <Carousel className="w-full max-w-3xl mx-auto">
                    <h1 className=" text-xl font-bold text-center"> Creatina</h1>
                    <hr className="mb-8 w-32 h-1 bg-blue-800 mx-auto" />
                    <CarouselContent className="-ml-1">
                        {
                            products.map(p => {

                                if(p.category != "creatina" ) {
                                    return;
                                }
                                

                                return (
                                    <CarouselItem key={p.id} className="pl-1 basis-2/3 sm:basis-2/3 md:basis-1/3 lg:basis-1/3">
                                        <div className="p-1">
                                        <Card className="w-full max-w-96 h-72">
                                            <CardContent className="flex flex-col  justify-center gap-3 h-full ">
                                                <div className="flex justify-center">
                                                    <Link to={`/detalhes/${p.id}`}>
                                                        <img src={p.image} className="w-32 hover:scale-105 transition-all cursor-pointer" alt="img_prod_" />
                                                    </Link>
                                                </div>

                                                <h2 className="text-md font-bold ">{p.title}</h2>
                                                <div className="flex justify-between">
                                                    <span className="text-xl font-bold">{p.price.toLocaleString('pt-br', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}</span>

                                                    <button className="bg-blue-700 p-1.5 w-8 rounded-full flex items-center justify-center" onClick={() => addProductCart(p)}>
                                                        <FaCartPlus fontSize={18} color="white" />
                                                    </button>
                                                </div>

                                                {/*
                                                    <button onClick={() => removeProductCart(p)}>
                                                        x
                                                    </button>
                                                */}
                                            </CardContent>
                                        </Card>
                                        </div>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>

            <section className="flex flex-col gap-1 w-full max-w-7xl justify-center mx-auto p-4 ">
                <Carousel className="w-full max-w-3xl mx-auto">
                    <h1 className=" text-xl font-bold text-center">Outros</h1>
                    <hr className="mb-8 w-24 h-1 bg-blue-800 mx-auto" />
                    <CarouselContent className="-ml-1">
                        {
                            products.map(p => {

                                if(p.category != "outros" ) {
                                    return;
                                }
                                
                                
                                return (
                                    <CarouselItem key={p.id} className="pl-1 basis-2/3 sm:basis-2/3 md:basis-1/3 lg:basis-1/3 mb-10">
                                        <div className="p-1">
                                        <Card className="w-full max-w-96 h-72">
                                            <CardContent className="flex flex-col justify-center gap-3 h-full ">
                                                <div className="flex justify-center">
                                                    <Link to={`/detalhes/${p.id}`}>
                                                        <img src={p.image} className="w-32 hover:scale-105 transition-all cursor-pointer" alt="img_prod_" />
                                                    </Link>
                                                </div>

                                                <h2 className="text-md font-bold ">{p.title}</h2>

                                                <div className="flex justify-between">
                                                    <span className="text-xl font-bold">{p.price.toLocaleString('pt-br', {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    })}</span>

                                                    <button className="bg-blue-700 p-1.5 w-8 rounded-full flex items-center justify-center" onClick={() => addProductCart(p)}>
                                                        <FaCartPlus fontSize={18} color="white" />
                                                    </button>
                                                </div>

                                                {/*
                                                    <button onClick={() => removeProductCart(p)}>
                                                        x
                                                    </button>
                                                */}
                                            </CardContent>
                                        </Card>
                                        </div>
                                    </CarouselItem>
                                )
                            })
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </section>
        </main>
    )   
}
