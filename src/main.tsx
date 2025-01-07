import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from "../src/routes";

import CartProvider from './hooks/CartContext';
import AuthProvider from './hooks/AuthContext';
import ReloadProvider from './hooks/ReloadContext';

import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <AuthProvider>
        <ReloadProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />
          <RouterProvider router={router}/>  
        </ReloadProvider>
    </AuthProvider>
  </CartProvider>
)
