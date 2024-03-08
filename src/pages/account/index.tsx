import { useState } from "react";
import Container from "@/components/container";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { FaLocationArrow } from "react-icons/fa6";

export const Account = () => {
    const {user} = useContext(AuthContext);
    const [active, setActive] = useState(1);
    
    return (
        <main className="h-svh select-none">
            <Container>
                <h1 className="text-2xl font-semibold text-gray-700">Minha conta</h1>   

                <div className="border-b border-gray-200 dark:border-gray-700 mt-10">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                        <li className="me-2">
                            <a onClick={() => setActive(1)} className={`cursor-pointer inline-flex items-center justify-center p-4 rounded-t-lg  group ${active == 1 ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}>
                                <svg className="w-4 h-4 me-2 text-gray-400 gro  xup-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                </svg>Dados do usuário
                            </a>
                        </li>
                        <li className="me-2">
                            <a onClick={() => setActive(2)} className={`cursor-pointer inline-flex items-center justify-center p-4 rounded-t-lg gap-2 group ${active == 2 ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`} aria-current="page">
                                <FaLocationArrow fontSize={18}/>
                                Endereço
                            </a>
                        </li>
                        <li className="me-2">
                            <a onClick={() => setActive(3)} className={`cursor-pointer inline-flex items-center justify-center p-4 rounded-t-lg  group ${active == 3 ? "text-blue-600 border-b-2 border-blue-600" : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}>
                                <svg className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M5 11.424V1a1 1 0 1 0-2 0v10.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.228 3.228 0 0 0 0-6.152ZM19.25 14.5A3.243 3.243 0 0 0 17 11.424V1a1 1 0 0 0-2 0v10.424a3.227 3.227 0 0 0 0 6.152V19a1 1 0 1 0 2 0v-1.424a3.243 3.243 0 0 0 2.25-3.076Zm-6-9A3.243 3.243 0 0 0 11 2.424V1a1 1 0 0 0-2 0v1.424a3.228 3.228 0 0 0 0 6.152V19a1 1 0 1 0 2 0V8.576A3.243 3.243 0 0 0 13.25 5.5Z"/>
                                </svg>Configurações
                            </a>
                        </li>
                    </ul>
                </div>

                <section className="flex flex-col gap-2">
                    <label className="mt-4">Nome do cliente:</label>

                </section>

            </Container>
        </main>
    )
}