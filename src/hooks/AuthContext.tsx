import { useState, createContext, ReactNode } from "react";

export interface UserDataProps {
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

    console.log(user);

    const authUser = (user: UserDataProps[]) => {
        setUser([...user]);

        if (user.length > 0) {
            localStorage.setItem("@userEcommerce", JSON.stringify([...user]));
        } else {
            localStorage.removeItem("@userEcommerce");
            localStorage.removeItem("@lastVisitedRoute");
        }
    }
    
    return ( 
        <AuthContext.Provider value={{ user, authUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;