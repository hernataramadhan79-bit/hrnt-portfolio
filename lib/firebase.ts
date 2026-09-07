import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    User
} from "firebase/auth";

// Strip any wrapping quotes from env variables
const getAuthDomain = () => {
    const rawDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?.replace(/^['"]|['"]$/g, '').trim();
    const defaultDomain = `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'forum-portfolio'}.firebaseapp.com`;
    if (typeof window !== 'undefined') {
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return defaultDomain;
        }
    }
    return rawDomain || defaultDomain;
};

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: getAuthDomain(),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase App & Auth on demand
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth Providers
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});
const githubProvider = new GithubAuthProvider();

export {
    app,
    auth,
    googleProvider,
    githubProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
};
export type { User };
