import Head from 'next/head';
import PaymentSuccessful from '@/components/home/payment_successful';

export default function PaymentSuccessfulPage() {
  // page default data
  const pageName = "NorthWave - Payment Successful";
  const pageDesc = "NorthWave is an indigenous financial institution that focuses on empowering people to attain financial freedom with a community of friends, family and colleagues.";
  const baseURL = "https://northwaveng.com/";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content={pageDesc} />
        <meta name="keywords" content="northwave, contribution, collection, bank, savings, groups, finance, fintech, software, freedom, community" />
        <meta name="theme-color" content="#346BC8" />
        <link rel="icon" type="image/x-icon" href="/logo/logo_trans.png" />
        <meta name="author" content="NorthWave" />
        <title>{pageName}</title>

        <meta property="og:title" content={pageName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo/logo_text.png" />
        <meta property="og:image:width" content="1277" />
        <meta property="og:image:height" content="473" />
        <meta property="og:url" content={baseURL} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:site_name" content={pageName} />
      </Head>

      <PaymentSuccessful />
    </>
  )
}