import wallpaper from '../../assets/wallpaper.png'
import logo from "../../assets/rwalogo2.png";
import { Input } from '@/components/ui/input';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useState, useContext , useEffect} from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Md123 } from "react-icons/md";
import { api } from '@/api';
import toast from 'react-hot-toast';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import MaskedInput from '@/components/InputMask';


export const SignIn = () => {
    const [loading, setLoading] = useState(false);
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { authUser, } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleCpfChange = (value: string) => {
        setCpf(value);
    };

    async function verifyLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                cpf: cpf,
                password: password
            }

            const response = await api.post("/users/sign-in", data);

            if(response.data.error) {
                return toast.error(response.data.error);
            }

            if (response.data) {
                toast.success("Login efetuado com sucesso!")
                authUser([response.data]);
                navigate("/");
            } 
        } catch (error: any) {
            toast.error(`${error.response.data.error}`);  
        } finally {
            setLoading(false);
        }
    }


    return (
       <div className='relative flex justify-between gap-5'>
            <div className='flex flex-col justify-center py-44 items-center gap-5 border-black p-16 my-auto mx-auto w-full max-w-xl'>

                <h1 className='text-4xl font-semibold mb-10 text-black'>Entrar <span className='text-secondaryColor'>com</span></h1>

                <form onSubmit={(e) => verifyLogin(e)} className='w-full flex flex-col gap-5'>
                    <div className='w-full text-sm text-gray-600 relative'>
                        <label htmlFor="user" className='ml-1'>CPF *</label>
                        <MaskedInput
                            value={cpf}
                            onChange={handleCpfChange}
                        />
                        <Md123  fontSize={32} className="absolute top-6 right-1.5 transition-all "/>
                    </div>

                    <div className='w-full text-sm text-gray-600 relative'>
                        <label htmlFor="password" className='ml-1'>Senha *</label>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='Digite sua senha' type={showPassword ? 'text': 'password'} id='password' className={`text-xs mt-2 transition-all`} required/>
                        {
                            password.length <= 0 ? (
                                <TbPasswordFingerprint fontSize={20} className="absolute top-9 right-3 pt-0.5 transition-all "/>
                            ) : (
                                showPassword ? (
                                    <FaEye onClick={() => setShowPassword(false)} fontSize={20} className="absolute top-9 pt-1 right-3 transition-all "/>
                                ) : (
                                    <FaEyeSlash onClick={() => setShowPassword(true)} fontSize={20} className="absolute top-9 pt-1 right-3 transition-all "/>
                                )
                            )
                        }
                    </div>

                    <button id='button' className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-secondaryColor text-white flex items-center justify-center py-3 w-full rounded-lg border-0`}>
                        {
                            loading ? (
                                <AiOutlineLoading3Quarters fontSize={22} className=' transition-all animate-spin'/>
                                ) : (
                                    <p style={{paddingBottom: 2}} className='transition-all'>Entrar</p>      
                                )
                        }
                    </button>


                </form>

                <p className='text-xs md:text-sm flex gap-1'>Não possui usuário? 
                    <Link to={"/cadastro"} className='text-secondaryColor'>
                        Cadastre-se
                    </Link>
                </p>
            </div>

            <div className='relative hidden md:flex justify-center'>
                <Link to={"/"}  className='absolute inset-0 overflow-hidden flex justify-center items-center' style={{ backdropFilter: 'blur(10px)',  backgroundColor: 'rgba(81, 81, 245, 0.397)' }}>
                    <img src={logo} className='w-20'/>                
                </Link>
                
                <img src={wallpaper} className='w-full max-w-4xl h-svh' />
            </div>
       </div>
    )
}