import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_authDomain,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_projectId,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_storageBucket,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId,
    appId: process.env.NEXT_PUBLIC_FIREBASE_appId,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_measurementId
};

// setting app
let app = getApps()[0];

// app init
if (!getApps.length) app = initializeApp(firebaseConfig);

// export auth, firestore and app services
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };