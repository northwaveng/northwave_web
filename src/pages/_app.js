import '@/styles/globals.css'
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FireAuthProvider } from '@/firebase/fire_auth_context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  useEffect(() => { require("bootstrap/dist/js/bootstrap.bundle.min.js"); }, []);

  return (
    <FireAuthProvider>
      <Component {...pageProps} />
      <ToastContainer position="bottom-left" autoClose={3000} />
    </FireAuthProvider>
  );
}
