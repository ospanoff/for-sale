import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { EMAIL_DOMAIN } from "../firebase-config";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

interface AuthContextType {
  userEmail: string | null;
  login(): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
  }, []);

  const value = {
    userEmail,
    async login() {
      signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        const isDev =
          !process.env.NODE_ENV || process.env.NODE_ENV === "development";
        if (!isDev && user.email?.split("@").pop() !== EMAIL_DOMAIN) {
          signOut(auth);
        }
      });
    },
    async logout() {
      signOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
