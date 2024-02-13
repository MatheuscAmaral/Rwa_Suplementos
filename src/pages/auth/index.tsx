import wallpaper from '../../assets/wallpaper.png'
import logo from "../../assets/rwalogo2.png";
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { api } from '@/api';
import toast from 'react-hot-toast';

interface UserProps {
    id: number,
    cpf: string, 
    email: string,
    password: string,
    cep: string,
    street: string,
    neighborhood: string,
    number: string,
    city: string,
    state: string
}

export const Auth = () => {
    const [loading, setLoading] = useState(false);
    const [cpf, setCpf] = useState("");
    const [user, setUser] = useState<UserProps[]>([]);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { authUser } = useContext(AuthContext);

    const saveAuthUser = (user: UserProps[]) => {
        authUser(user);
    }

    async function verifyLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.get("/user", {
                params: {
                    cpf: cpf,
                    password: password
                }
            });
        
            console.log(response);
        
            setUser(response.data);
        
            if (user.length > 0) {
                saveAuthUser(user);
                navigate("/");
            } else {
                toast.error("Opss, usuário não encontrado!");
            }
        } 
        
        catch (error) {
            console.error(error);
            toast.error("Opss, ocorreu um erro, favor contatar o suporte!");
        } 
        
        finally {
            setLoading(false);
        }
          
    }


    return (
       <div className='relative flex justify-between gap-5'>
            <div className='flex flex-col justify-center py-44 items-center gap-5 border-black p-16 my-auto mx-auto w-full max-w-lg'>

                <h1 className='text-4xl font-semibold mb-10 text-black'>Entrar <span className='text-blue-800'>com</span></h1>

                <form onSubmit={(e) => verifyLogin(e)} className='w-full flex flex-col gap-5'>
                    <div className='w-full text-sm text-gray-600'>
                        <label htmlFor="user" className='ml-1'>CPF *</label>
                        <Input value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder='Digite seu cpf' id='user' className='text-xs mt-2' required/>
                    </div>

                    <div className='w-full text-sm text-gray-600'>
                        <label htmlFor="password" className='ml-1'>Senha *</label>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Digite sua senha' type='password' id='password' className='text-xs mt-2' required/>

                        <a href="#">
                            {/* <p className='text-blue-800 mt-3 text-end mb-3'>Esqueci minha senha</p> */}
                        </a>
                    </div>

                    <button id='button' className={`${loading ? "disabled cursor-not-allowed opacity-70" : ""} text-sm bg-blue-800 text-white flex items-center justify-center py-3 w-full rounded-lg border-0`}>
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
                    <Link to={"/cadastro"} className='text-blue-800'>
                        Cadastre-se
                    </Link>
                </p>
            </div>

            <div className='relative hidden md:flex justify-center'>
                <Link to={"/"}  className='absolute inset-0 overflow-hidden flex justify-center items-center' style={{ backdropFilter: 'blur(10px)',  backgroundColor: 'rgba(81, 81, 245, 0.397)' }}>
                    <img src={logo} className='w-20'/>                
                </Link>
                
                <img src={wallpaper} style={{"height": "920px"}} className='w-full max-w-5xl' />
            </div>
       </div>
    )
}