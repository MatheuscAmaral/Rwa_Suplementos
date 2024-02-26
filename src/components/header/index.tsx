import React, { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { IoClose } from "react-icons/io5";
import { FaBarsStaggered, FaCartShopping, FaUser } from "react-icons/fa6";
import logo from "../../assets/rwalogo2.png";
import { Link, useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { useContext } from 'react'; 
import { CartContext } from '@/contexts/CartContext'
import { AuthContext } from '@/contexts/AuthContext';
import { FaCartPlus } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoBagCheckOutline } from "react-icons/io5";

import { IoMdClose } from "react-icons/io";

import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';



import { Input } from "@/components/ui/input"
import { ProductsProps } from '@/pages/home';

type Anchor = 'right';


export const Header = () => {
  const [state, setState] = React.useState({
    right: false,
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  
  const { cart, cartAmount, addItemCart, removeItemCart, total, descontos} = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
  };

  const removeProductCartTrash = (product: ProductsProps) => {
      product.amount = 0;

      removeItemCart(product);
  }

  const removeProductCart = (product: ProductsProps) => {
    removeItemCart(product)
  }

  const addProductCart = (product: ProductsProps) => {
    addItemCart(product)
  }

  const goToCheckout = () => {
    setLoading(true)

    setTimeout(() => {
      navigate("/checkout");
      setLoading(false);

      
    }, 1000);
  }

  const goToCatalog = () => {
    setLoading(true)

    setTimeout(() => {
      navigate("/catalogo/todos");
      setLoading(false);

      
    }, 1000);
  }

  const formatPrice = (price: string | number) => {
    return price.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL"
    })
  }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 310 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='flex pt-3 justify-between px-3 shadow-sm pb-3'>
        <p className='text-md flex items-center gap-1'>Carrinho <span className='text-xs'>({cartAmount})</span></p>
        <IoMdClose onClick={toggleDrawer(anchor, false)} fontSize={20} className='cursor-pointer' />
      </div>

        {
          cartAmount <= 0 && (
              <div className=' flex items-center flex-col mt-60 gap-2'>
                <FaCartPlus fontSize={30} />
                <p>O carrinho está vazio!</p>
              </div>
          )
        }

        <div className=' flex flex-col gap-2 mt-5 mb-60'>
          {
            cart.map(c => {
              return (
                <section key={c.prod_id} className='flex gap-3 items-center border px-4 py-7 mx-3 rounded-sm relative'>
                  <img src={c.image} alt="img_produto" className='w-14'/>

                  <div className='flex flex-col gap-4 '>
                    <p className=' text-xs font-semibold text-gray-600 w-full max-w-32'>{c.title}</p>

                    <div className='flex border rounded-full w-14 py-0.5 justify-center gap-2 text-xs bg-white'>
                      <button onClick={() => removeProductCart(c)}>
                        -
                      </button>

                      <span>
                        {c.amount}
                      </span>

                      <button onClick={() => addProductCart(c)}>
                        +
                      </button>
                    </div>
                  </div>

                  <span className='text-sm font-semibold flex flex-col gap-0 text-gray-500 absolute right-2 bottom-5 pt-0.5 mr-1'>
                    {
                        c.promocao_id >= 1 ? (
                          <div className='flex flex-col items-end'>
                             <div className='flex flex-col'>
                                <span style={{"fontSize": "11.5px"}} className=' line-through'>
                                  {
                                    formatPrice((c.amount * c.price))
                                  }
                                </span>

                                <span style={{"fontSize": "14px"}} className=' text-green-600'>
                                  { 
                                    formatPrice(c.priceWithDiscount * c.amount) 
                                  }
                                </span>
                             </div>

                             <span style={{fontSize: 11}} className='text-green-600'>
                              {
                                c.tipo_desconto == 1 ? (
                                  <span>
                                    {c.valor_desconto}% de desconto
                                  </span>
                                ) : (
                                  <span>
                                    {formatPrice(c.valor_desconto)} de desconto
                                  </span>
                                )
                              }
                             </span>
                          </div>
                        ) : (
                          <span className='mb-2'>
                            {formatPrice(c.total)}
                          </span>
                        )
                    }
                  </span>


                  <FaRegTrashAlt onClick={() => removeProductCartTrash(c)} color='gray' fontSize={14} className='absolute top-3 right-3 cursor-pointer'/>
                </section>
              )
            })
          }

          <footer className={`fixed pt-5 bg-white bottom-0 flex flex-col gap-4 mx-auto w-full max-w-xs ${cart.length > 0 && "px-3"}`}>
              {
                cart.length > 0 && (
                   <>
                     <section>
                        <div className='flex justify-between items-center px-2 text-sm'>
                          <p>SubTotal</p> 
                            <p className='text-lg font-semibold'>
                                {
                                  total <= 0 ? (
                                    formatPrice((cart[0].price))
                                  ) : (
                                    formatPrice((total + descontos))
                                  )
                                }
                            </p> 
                        </div>

                        <div className='flex justify-between items-center px-2 text-sm'>
                          <p>Descontos</p> 
                          <span className='flex items-center text-lg font-semibold text-green-600'>
                            <span> - </span>
                             {
                                formatPrice(descontos)
                            }
                          </span> 
                        </div>

                        <hr className='my-2 mx-2'/>

                        <div className='flex justify-between items-center px-2 text-sm'>
                          <p>Total</p> 
                            <p className='text-lg font-semibold'>
                                {
                                  total <= 0 ? (
                                    formatPrice((cart[0].priceWithDiscount > 0 ? cart[0].priceWithDiscount : cart[0].price))
                                  ) : (
                                    formatPrice(total)
                                  )
                                }
                            </p> 
                        </div>
                    </section>
                    
                    <p className='text-xs text-gray-400 text-center'>Frete e impostos calculados no checkout</p>
                   </>
                )
              }
              

                <div className='p-2.5'>
                  {
                    cart.length > 0 ? (
                      <button onClick={() => goToCheckout()} id='button' className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-blue-800 text-white flex items-center justify-center py-3 w-full rounded-lg border-0 hover:bg-blue-700 transition-all  mb-3`}>
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
                            <button onClick={() => goToCatalog()} id='button' className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-blue-800 text-white flex items-center justify-center py-3 w-full rounded-lg border-0 mb-3 hover:bg-blue-700 transition-all`}>
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
          </footer>
        </div>
    </Box>
  );

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between pt-5 px-6 mb-5 lg:hidden" aria-label="Global">
        <div className="w-full flex items-center justify-between mx-auto lg:hidden">
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <FaBarsStaggered className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <Link to={"/"}>
            <span className="sr-only">Your Company</span>
            <img className="h-16" src={logo} alt="logo" />
          </Link>

          <Popover.Group className="hidden lg:flex lg:gap-x-12 w-full max-w-2xl relative">
            <Input type="text" placeholder="Procure por um produto..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <Link onClick={() => setInput("")} to={`/catalogo/${input != "" ? input : "todos"}`} className='absolute right-3 top-3 p'>
              <IoSearch fontSize={16}/>
            </Link>
          </Popover.Group>

          
          <div className={`${user.length > 0 ? "gap-5" : "gap-2"}lg:flex lg:gap-2 items-center lg:flex-1 lg:justify-end`}>
            {
              user.length > 0 ? (
                  user.map(u => {
                    return (
                    <div className='hidden lg:flex items-center gap-2'>
                      <Link to={"/conta"} >
                        <FaUser fontSize={19.5}/>
                      </Link>
                  
                      <p className='text-xs font-medium w-full max-w-md'>{u.nome}</p>
                    </div>
                  )
                })
              ) : (
                <Link className='hidden lg:flex  ' to={"/login"} >
                  <FaUser fontSize={20}/>
                </Link>
              )
            }

            <section className=' relative'>
                <button className='relative pt-1.5'>
                  <FaCartShopping fontSize={21}/>
                  {cartAmount > 0 && (
                    <span className='px-1.5 flex items-center justify-center rounded-full bg-blue-700 absolute bottom-3.5 left-3 text-xs text-white'>{cartAmount}</span>
                  )}
                </button> 

                <div className='absolute bottom-0 left-0 opacity-0'>
                  {(['right'] as const).map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                      <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                      >
                        {list(anchor)}
                      </SwipeableDrawer>
                    </React.Fragment>
                  ))}
                </div>
            </section>
          </div>
        </div>


      </nav>

      <nav className='hidden lg:flex mx-auto justify-between w-full max-w-7xl pt-5 px-30 md:px-16 items-center'>
          <Link to={"/"}>
            <span className="sr-only">Your Company</span>
            <img className="h-16" src={logo} alt="logo" />
          </Link>

          <Popover.Group className="hidden lg:flex lg:gap-x-12 w-full max-w-2xl relative">
            <Input type="text" placeholder="Procure por um produto..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <Link onClick={() => setInput("")} to={`/catalogo/${input != "" ? input : "todos"}`} className='absolute right-3 top-3 p'>
              <IoSearch fontSize={16}/>
            </Link>
          </Popover.Group>

          <div className={`flex ${user.length > 0 ? "gap-5" : "gap-2"} items-center gap-2`}>
            {
              user.length > 0 ? (
                  user.map(u => {
                    return (
                    <div className='hidden lg:flex items-center gap-2'>
                      <Link to={"/conta"} >
                        <FaUser fontSize={19.5}/>
                      </Link>
                  
                      <p className='text-xs font-medium w-full max-w-md'>{u.nome}</p>
                    </div>
                  )
                })
              ) : (
                <Link className='hidden lg:flex  ' to={"/login"} >
                  <FaUser fontSize={20}/>
                </Link>
              )
            }

            <section className=' relative'>
                <button className='relative pt-1.5'>
                  <FaCartShopping fontSize={21}/>
                  {cartAmount > 0 && (
                    <span className='px-1.5 flex items-center justify-center rounded-full bg-blue-700 absolute bottom-3.5 left-3 text-xs text-white'>{cartAmount}</span>
                  )}
                </button> 

                <div className='absolute bottom-0 left-0 opacity-0'>
                  {(['right'] as const).map((anchor) => (
                    <React.Fragment key={anchor}>
                      <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                      <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                      >
                        {list(anchor)}
                      </SwipeableDrawer>
                    </React.Fragment>
                  ))}
                </div>
            </section>
          </div>
      </nav>

      <div className='w-full max-w-7xl px-10 pb-5'>
        <Popover.Group className=" lg:hidden lg:gap-x-12 w-full max-w-7xl relative">
          <Input type="text" placeholder="Procure por um produto..." value={input} onChange={(e) => setInput(e.target.value)}/>
          <Link onClick={() => setInput("")} to={`/catalogo/${input != "" ? input : "todos"}`} className='absolute right-3 top-3 p'>
            <IoSearch fontSize={16}/>
          </Link>
        </Popover.Group>
      </div>



      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to={"/"} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-16 w-auto"
                src={logo}
                alt="logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <IoClose className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
              
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
