import '@/styles/globals.css'
import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }) {
  useEffect(() => { require("bootstrap/dist/js/bootstrap.bundle.min.js"); }, []);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
