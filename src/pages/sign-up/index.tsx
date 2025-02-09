import { Link, useNavigate} from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Md123, MdAlternateEmail } from "react-icons/md";
import { useState } from 'react';
import { api } from '@/api';
import wallpaper from '../../assets/wallpaper.png'
import logo from "../../assets/rwalogo2.png";
import toast from 'react-hot-toast';
import MaskedInput from '@/components/InputMask';

export const SignUp = () =>  { 
    const [loading, setLoading] = useState(false);
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleCpfChange = (value: string) => {
        setCpf(value);
    };

    async function verifyRegister(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        
        const data = {
            cpf: cpf,
            email: email
        }

        try {
            const response = await api.post(`/users/verify`, data);
            
            const userData = response.data;
            
            if(userData == false) {
                navigate(`/cadastro/detalhes/${cpf}/${email}`);
            } 
        }
        
        catch (error: any) {
            const errors = error.response.data.error;
            
            if(!errors) {
                return toast.error("Ocorreu um erro ao verificar o cadastro!");
            } 

            toast.error(errors);
        }

        finally {
            setLoading(false);
        }

    }

    return (
        <div className='relative flex justify-between gap-5'>
            <div className='flex flex-col justify-center py-44 items-center gap-5 border-black p-16 my-auto mx-auto w-full max-w-xl'>
                <h1 className='text-4xl flex items-center font-semibold mb-10 text-black'>Cadastre- <span className='text-secondaryColor'>se</span></h1>
                
                <form onSubmit={(e) => verifyRegister(e)} action="" className='w-full flex flex-col gap-5'>
                    <div className='w-full text-sm text-gray-600 relative'>
                        <label htmlFor="cpf" className='ml-1'>CPF *</label>

                        <MaskedInput 
                            value={cpf}
                            onChange={handleCpfChange}
                        />

                        <Md123  fontSize={32} className="absolute top-6 right-1.5 transition-all "/>
                    </div>

                    <div className='w-full text-sm text-gray-600 relative'>
                        <label htmlFor="email" className='ml-1'>E-mail *</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Digite seu e-mail' id='email' type='email' className='text-xs mt-2' required/>
                        <MdAlternateEmail  fontSize={22} className="absolute top-9 right-2 pt-0.5 transition-all "/>
                    </div>


                    <button id='button' className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-primaryColor hover:bg-secondaryColor transition-all text-white flex items-center justify-center py-3 w-full rounded-lg border-0`}>
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
                    <Link to={"/login"} className='text-primaryColor hover:text-secondaryColor transition-all'>
                        Entrar
                    </Link>
                </p>
            </div>

            <div className='relative justify-center hidden md:flex'>
                <Link to={"/"}  className='absolute inset-0 overflow-hidden flex justify-center items-center' style={{ backdropFilter: 'blur(10px)',  backgroundColor: 'rgba(81, 81, 245, 0.397)' }}>
                    <img src={logo} className='w-20'/>                
                </Link>
                
                <img src={wallpaper} className='w-full max-w-4xl  h-svh' />
            </div>
   </div>
    )
  }
