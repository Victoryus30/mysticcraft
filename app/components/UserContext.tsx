"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { MiniKit } from "@worldcoin/minikit-js";

const SESSION_KEY = "mystic_wallet";

interface UserState {
  walletAddress: string | null;
  isIdentified: boolean;
  triggerWalletAuth: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserState>({
  walletAddress: null,
  isIdentified: false,
  triggerWalletAuth: async () => {},
  logout: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const saveWallet = useCallback((address: string) => {
    setWalletAddress(address);
    try {
      sessionStorage.setItem(SESSION_KEY, address);
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setWalletAddress(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
  }, []);

  // Attempt walletAuth (SIWE sign-in — NOT verify)
  const triggerWalletAuth = useCallback(async () => {
    if (walletAddress) return;
    if (!MiniKit.isInstalled()) return;

    try {
      const nonce = crypto.randomUUID().replace(/-/g, "");
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        statement: "Inicia sesion en MysticCraft",
      });

      if (finalPayload.status === "success" && "address" in finalPayload) {
        saveWallet(finalPayload.address);
      }
    } catch (err) {
      console.error("WalletAuth error:", err);
    }
  }, [walletAddress, saveWallet]);

  // On mount: recover session or try auto-detect
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        setWalletAddress(stored);
        return;
      }
    } catch {}

    const tryAutoDetect = () => {
      try {
        if (MiniKit.isInstalled() && MiniKit.user?.walletAddress) {
          saveWallet(MiniKit.user.walletAddress);
          return true;
        }
      } catch {}
      return false;
    };

    if (!tryAutoDetect()) {
      const t1 = setTimeout(() => {
        if (!tryAutoDetect()) {
          if (MiniKit.isInstalled()) {
            triggerWalletAuth();
          }
        }
      }, 800);
      return () => clearTimeout(t1);
    }
  }, [saveWallet, triggerWalletAuth]);

  return (
    <UserContext.Provider
      value={{
        walletAddress,
        isIdentified: !!walletAddress,
        triggerWalletAuth,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
