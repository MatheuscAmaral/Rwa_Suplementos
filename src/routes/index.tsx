import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/home";
import { Layout } from "../components/layout";
import { Auth } from "../pages/auth";
import { Register } from "../pages/register";
import { Catalog } from "../pages/catalog";
import { Checkout } from "../pages/checkout";
import { Details } from "../pages/details";
import { Orders } from "../pages/orders";
import { DetailsOrders } from "../pages/detailsOrders";
import { Account } from "../pages/account";

const router = createBrowserRouter([
    {
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/catalogo/:search",
                element: <Catalog/>
            },
            {
                path: "/checkout",
                element: <Checkout/>
            },
            {
                path: "/detalhes/:id",
                element: <Details/>
            },
            {
                path: "/pedidos",
                element: <Orders/>
            },
            {
                path: "/pedidos/detalhes",
                element: <DetailsOrders/>
            },
            {
                path: "/conta",
                element: <Account/>
            },
        ]
    },
    {
        path: "/login",
        element: <Auth/>
    },

    {
        path: "/cadastro",
        element: <Register/>
    }
])


export default router;
