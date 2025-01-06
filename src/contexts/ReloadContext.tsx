import { useState, createContext, ReactNode } from "react";

export interface ReloadDataProps {
    [x: string]: any;
    id: number,
    name: string,
    cpf: string, 
    email: string,
    cep: string,
    rua: string,
    bairro: string,
    numero: string,
    cidade: string,
    uf: string,
    status: number,
}

interface ReloadProps {
    data: boolean;
    reloadContent: () => void;
}

interface ReloadProvider {
    children: ReactNode
}

export const ReloadContext = createContext({} as ReloadProps);

const ReloadProvider = ({children}: ReloadProvider) => {
    const [data, setData] = useState(false);

    const reloadContent = () => {
      setData(!data);
    }
    
    return ( 
        <ReloadContext.Provider value={{ data, reloadContent }}>
            {children}
        </ReloadContext.Provider>
    )
}

export default ReloadProvider;