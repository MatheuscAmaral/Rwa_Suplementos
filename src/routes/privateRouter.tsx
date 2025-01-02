import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const PrivateRoute = ({children}: any) => {
    const {user, authUser} = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        const verifyStoredUser =  () => {
            const storedUser = localStorage.getItem("@userEcommerce");

            localStorage.setItem("@lastVisitedRoute", JSON.stringify(location.pathname));
        
            if (storedUser != null) {
                const user = JSON.parse(storedUser);
                authUser(user);

                const lastVisitedRoute = localStorage.getItem("@lastVisitedRoute");

                if (lastVisitedRoute) {
                    const cleanedRoute = lastVisitedRoute.replace(/['"]+/g, '');
                    navigate(cleanedRoute);  

                    return;
                }
            } else {
                localStorage.removeItem("@lastVisitedRoute");
            }
        }

        verifyStoredUser();
    }, [location.pathname])

    return user.length > 0 ? children : <Navigate to={"/login"}/>;
}