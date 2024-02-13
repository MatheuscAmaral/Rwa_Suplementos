import { useState, createContext, ReactNode } from "react";

export interface UserDataProps {
    id: number,
    cpf: string, 
    email: string,
    password: string,
    cep: string,
    street: string,
    neighborhood: string,
    number: string,
    city: string,
    state: string,
    nome: string
}

interface AuthProps {
    user: UserDataProps[];
    authUser: (user: UserDataProps[]) => void;
}

interface AuthProvider {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthProps);

const AuthProvider = ({children}: AuthProvider) => {
    const [user, setUser] = useState<UserDataProps[]>([]);

    const authUser = (user: UserDataProps[]) => {
        setUser([...user]);
    }
    
    return ( 
        <AuthContext.Provider value={{ user, authUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;