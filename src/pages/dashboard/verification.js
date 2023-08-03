import Head from 'next/head'
import Verification from '@/components/dashboard/verification'
import { getWSSchema, getWPSchema, getLBSchema } from '@/components/schema';
import { useAuth } from '@/firebase/fire_auth_context';
import { db } from '@/firebase/fire_config';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import NeedAuth from '@/components/restrictions/need_auth';
import NeedAccess from '@/components/restrictions/need_access';
import Loader from '@/components/loader/loader';
import { toast } from 'react-toastify';

export default function VerificationPage() {
    const { authUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState(null);
    const [hasVerified, setHasVerified] = useState(null);

    // page default data
    const pageName = "NorthWave - Verification";
    const pageDesc = "NorthWave is an indigenous financial institution that focuses on empowering people to attain financial freedom with a community of friends, family and colleagues.";
    const baseURL = "https://northwaveng.com/";
    const pageURL = "https://northwaveng.com/dashboard/verification";

    // web site schema
    const wSSchema = getWSSchema(pageURL);

    // web page schema
    const wPSchema = getWPSchema(
        pageName,
        pageDesc,
        pageURL,
        [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": baseURL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": pageName,
                "item": pageURL
            }
        ]
    );

    // local business schema
    const lBSchema = getLBSchema(
        pageName,
        {
            streetAddress: "Barracks road Jimeta Yola",
            addressLocality: "Jimeta",
            addressRegion: "Yola",
            postalCode: "640211",
            addressCountry: "NG"
        },
        "+234-703-318-0897",
        "northwave.ng@gmail.com",
        baseURL,
        `${baseURL}/logo/logo_text_dark_trans.png`,
        "Cash, Credit Card, Transfer",
        "NGN, USD, EURO",
        "Mo-Fr 09:00-17:00",
        {
            latitude: "9.2034924",
            longitude: "12.3888667"
        }
    );

    // listening to user
    useEffect(() => {
        if (authUser) {
            const userRef = doc(db, "users", authUser.email);

            const unsubscribe = onSnapshot(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.data();
                    setIsAdmin(data.isAdmin);
                    setHasVerified(data.kyc != null);
                } else {
                    toast.error("User data not found");
                }
            });

            return () => { unsubscribe(); };
        }
    }, [authUser]);

    if (!authUser && !loading) return <NeedAuth fullHeight={true} />

    if (!authUser && loading || isAdmin === null) return <Loader fullHeight={true} />

    if (!isAdmin || hasVerified) return <NeedAccess fullHeight={true} />

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="description" content={pageDesc} />
                <meta name="keywords" content="northwave, contribution, collection, bank, savings, groups, finance, fintech, software, freedom, community" />
                <meta name="theme-color" content="#ffffff" />
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

                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wSSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(wPSchema) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(lBSchema) }} />
            </Head>


            {/* page content */}
            <Verification />
        </>
    )
}