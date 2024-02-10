import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { IoClose } from "react-icons/io5";
import { FaBarsStaggered, FaCartShopping, FaUser } from "react-icons/fa6";
import logo from "../../assets/rwalogo2.png";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { useContext } from 'react'; 
import { CartContext } from '@/contexts/CartContext';

import { Input } from "@/components/ui/input"

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [input, setInput] = useState<string>("");
  const { cartAmount } = useContext(CartContext);
  console.log(cartAmount, "cart");

  return (
    <header className="bg-white shadow-sm mb-2">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-24" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to={"/"}>
            <span className="sr-only">Your Company</span>
            <img className="h-16" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBarsStaggered className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 w-full max-w-2xl relative">
          <Input type="text" placeholder="Procure por um produto..." value={input} onChange={(e) => setInput(e.target.value)}/>
          <Link to={`/catalogo/${input}`} className='absolute right-3 top-3 p'>
            <IoSearch fontSize={16}/>
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex gap-2 items-center  lg:flex-1 lg:justify-end">
          <Link to={"/login"} >
            <FaUser fontSize={22}/>
          </Link>

          <button className='relative'>
            <FaCartShopping fontSize={24}/>
            {cartAmount > 0 && (
              <span className='px-1.5 flex items-center justify-center rounded-full bg-blue-700 absolute bottom-3.5 left-3 text-xs text-white'>{cartAmount}</span>
            )}
          </button> 


        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
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
