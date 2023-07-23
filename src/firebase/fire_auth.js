import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "@/firebase/fire_config";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

const formatAuthUser = (user) => ({ uid: user.uid, email: user.email });

export default function useFireAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setLoading(false)
      return;
    }

    setLoading(true)

    var formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);
  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = async (email, password) => await signInWithEmailAndPassword(auth, email, password);

  const signUp = async (email, password) => await createUserWithEmailAndPassword(auth, email, password);

  const logOut = async () => {
    await signOut(auth).then(clear);
    Cookies.remove("NWSignedIn");
    toast.success("User logged out.");
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return { authUser, loading, signIn, signUp, logOut };
}