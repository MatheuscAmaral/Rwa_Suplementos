import { Header } from "../header"
import { Footer } from "../footer"
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="grid grid-rows-[auto,1fr,auto] min-h-screen">
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}