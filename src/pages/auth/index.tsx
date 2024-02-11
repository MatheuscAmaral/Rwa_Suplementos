import wallpaper from '../../assets/wallpaper.png'
import logo from "../../assets/rwalogo2.png";
import { Input } from '@/components/ui/input';

export const Auth = () => {
    return (
       <div className='relative flex justify-between gap-5'>
            <div className='flex flex-col justify-center items-center gap-3 border-black p-20 my-auto mx-auto'>
                <img src={logo} className='w-16'/>

                <Input/>
                <Input/>
            </div>

            <img src={wallpaper} style={{"height": "1000px"}} className='w-full max-w-5xl' />
       </div>
    )
}