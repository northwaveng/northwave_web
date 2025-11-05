import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// config
const sunshineConfig = {
    apiKey: process.env.NEXT_PUBLIC_SUNSHINE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_SUNSHINE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_SUNSHINE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_SUNSHINE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_SUNSHINE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_SUNSHINE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_SUNSHINE_MEASUREMENT_ID
};

// setting app
let app = getApps()[0];

// app init
if (!getApps.length) app = initializeApp(sunshineConfig);

// export auth, firestore and app services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };