import wallpaper from '../../assets/wallpaper.png'
import logo from "../../assets/rwalogo2.png";
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

export const Auth = () => {
    return (
       <div className='relative flex justify-between gap-5'>
            <div className='flex flex-col justify-center items-center gap-5 border-black p-20 my-auto mx-auto w-full max-w-lg'>

                <h1 className='text-4xl font-semibold mb-10 text-black'>Entrar <span className='text-blue-800'>com</span></h1>

                <form className='w-full flex flex-col gap-5'>
                    <div className='w-full text-sm text-gray-600'>
                        <label htmlFor="user" className='ml-1'>CPF ou E-mail *</label>
                        <Input placeholder='Digite seu cpf ou e-mail' id='user' className='text-xs mt-2' required/>
                    </div>

                    <div className='w-full text-sm text-gray-600'>
                        <label htmlFor="user" className='ml-1'>Senha *</label>
                        <Input placeholder='Digite sua senha' type='password' id='password' className='text-xs mt-2' required/>

                        <a href="#">
                            {/* <p className='text-blue-800 mt-3 text-end mb-3'>Esqueci minha senha</p> */}
                        </a>
                    </div>

                    <button className='text-sm bg-blue-800 text-white py-3 w-full rounded-lg border-0'>
                        Entrar
                    </button>

                </form>

                <p className='text-sm flex gap-1'>Não possui usuário? 
                    <Link to={"/cadastro"} className='text-blue-800'>
                        Cadastre-se
                    </Link>
                </p>
            </div>

            <div className='relative flex justify-center'>
                <Link to={"/"}  className='absolute inset-0 overflow-hidden flex justify-center items-center' style={{ backdropFilter: 'blur(10px)',  backgroundColor: 'rgba(81, 81, 245, 0.397)' }}>
                    <img src={logo} className='w-20'/>                
                </Link>
                
                <img src={wallpaper} style={{"height": "920px"}} className='w-full max-w-5xl' />
            </div>
       </div>
    )
}