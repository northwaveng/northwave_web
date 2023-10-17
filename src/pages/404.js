import Head from "next/head";
import { getWSSchema, getWPSchema, getLBSchema } from "@/components/schema";
import Link from "next/link";

export default function HomePage() {
  // page default data
  const pageName = "NorthWave | The contribution center";
  const pageDesc =
    "NorthWave is an indigenous financial institution that focuses on empowering people to attain financial freedom with a community of friends, family and colleagues.";
  const baseURL = "https://northwaveng.com/";

  // web site schema
  const wSSchema = getWSSchema(baseURL);

  // web page schema
  const wPSchema = getWPSchema(pageName, pageDesc, baseURL, [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseURL,
    },
  ]);

  // local business schema
  const lBSchema = getLBSchema(
    pageName,
    {
      streetAddress: "Barracks road Jimeta Yola",
      addressLocality: "Jimeta",
      addressRegion: "Yola",
      postalCode: "640211",
      addressCountry: "NG",
    },
    "+234-703-318-0897",
    "info@northwaveng.com",
    baseURL,
    `${baseURL}/logo/logo_text_dark_trans.png`,
    "Cash, Credit Card, Transfer",
    "NGN, USD, EURO",
    "Mo-Fr 09:00-17:00",
    {
      latitude: "9.2034924",
      longitude: "12.3888667",
    }
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="description" content={pageDesc} />
        <meta
          name="keywords"
          content="northwave, contribution, collection, bank, savings, groups, finance, fintech, software, freedom, community"
        />
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wSSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(wPSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lBSchema) }}
        />
      </Head>

      <div className="page-not-found pt-5">
        <div className="bg-light shadow">
          <h2 className="primary">404</h2>
          <h3 className="mt-4">Oops! Page Not Found</h3>

          <div className="mt-5">
            <Link
              href="/"
              className="btn btn-lg m-2 m-md-0 btn_primary bg_primary white"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
