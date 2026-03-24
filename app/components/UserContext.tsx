"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const SESSION_KEY = "mystic_nullifier";

interface UserState {
  nullifierHash: string | null;
  isVerified: boolean;
  setVerified: (nullifier: string) => void;
}

const UserContext = createContext<UserState>({
  nullifierHash: null,
  isVerified: false,
  setVerified: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [nullifierHash, setNullifierHash] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        setNullifierHash(stored);
      }
    } catch {
      // sessionStorage no disponible
    }
  }, []);

  const setVerified = (nullifier: string) => {
    setNullifierHash(nullifier);
    try {
      sessionStorage.setItem(SESSION_KEY, nullifier);
    } catch {
      // silencioso
    }
  };

  return (
    <UserContext.Provider
      value={{
        nullifierHash,
        isVerified: !!nullifierHash,
        setVerified,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
