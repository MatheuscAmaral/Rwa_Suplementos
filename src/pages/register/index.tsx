import wallpaper from '../../assets/wallpaper.png'
import logo from "../../assets/rwalogo2.png";
import { Link, useNavigate} from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from 'react';



export const Register = () =>  { 
    const [loading, setLoading] = useState(false);
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    function verifyRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

       navigate(`/cadastro/detalhes/${1}`);
    }

    return (
        <div className='relative flex justify-between gap-5'>
            <div className='flex flex-col justify-center py-44 items-center gap-5 border-black p-16 my-auto mx-auto w-full max-w-lg'>

                <h1 className='text-4xl flex items-center font-semibold mb-10 text-black'>Cadastre- <span className='text-blue-800'>se</span></h1>
                
                <form onSubmit={(e) => verifyRegister(e)} action="" className='w-full flex flex-col gap-5'>
                    <div className='w-full text-sm text-gray-600'>
                        <label htmlFor="cpf" className='ml-1'>CPF *</label>
                        <Input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder='Digite seu cpf ' type='number' id='cpf' className='text-xs mt-2' required/>
                    </div>

                    <div className='w-full text-sm text-gray-600'>
                        <label htmlFor="email" className='ml-1'>E-mail *</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu e-mail' id='email' type='email' className='text-xs mt-2' required/>
                    </div>


                    <button id='button' className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-blue-800 text-white flex items-center justify-center py-3 w-full rounded-lg border-0`}>
                        {
                            loading ? (
                                <AiOutlineLoading3Quarters fontSize={22} className=' transition-all animate-spin'/>
                                ) : (
                                    <p style={{paddingBottom: 2}} className='transition-all'>Criar conta</p>      
                                )
                        }
                    </button>

                </form>

                <p className='text-sm flex gap-1'>Já possui cadastro? 
                    <Link to={"/login"} className='text-blue-800'>
                        Entrar
                    </Link>
                </p>
            </div>

            <div className='relative justify-center hidden md:flex'>
                <Link to={"/"}  className='absolute inset-0 overflow-hidden flex justify-center items-center' style={{ backdropFilter: 'blur(10px)',  backgroundColor: 'rgba(81, 81, 245, 0.397)' }}>
                    <img src={logo} className='w-20'/>                
                </Link>
                
                <img src={wallpaper} style={{"height": "920px"}} className='w-full max-w-5xl' />
            </div>
   </div>
    )
  }
