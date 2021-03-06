import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { EMAIL_DOMAIN } from "../config";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

interface AuthContextType {
  user: User | null;
  login(): Promise<void>;
  logout(): Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const value = {
    user,
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
