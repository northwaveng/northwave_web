import { createContext, useContext } from 'react'
import useFireAuth from '@/firebase/fire_auth';

const FireAuthContext = createContext({
  authUser: null,
  loading: true,
  signIn: async () => { },
  signUp: async () => { },
  logOut: async () => { }
});

export function FireAuthProvider({ children }) {
  const auth = useFireAuth();
  return <FireAuthContext.Provider value={auth}>{children}</FireAuthContext.Provider>;
}

export const useAuth = () => useContext(FireAuthContext);