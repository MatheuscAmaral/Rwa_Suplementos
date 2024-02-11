import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from "../src/routes";
import CartProvider from './contexts/CartContext';
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <RouterProvider router={router}/>
  </CartProvider>
)
