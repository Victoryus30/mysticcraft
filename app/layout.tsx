import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import MiniKitProvider from "./components/MiniKitProvider";
import { UserProvider } from "./components/UserContext";
import BottomNav from "./components/BottomNav";
import Onboarding from "./components/Onboarding";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MysticCraft - Tarot, Rituales y Astrologia",
  description: "Tu portal de bienestar espiritual: tarot con IA, rituales guiados, calendario lunar y compatibilidad astral.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#120B2E",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={dmSans.variable}>
      <MiniKitProvider>
        <UserProvider>
          <body className="bg-surface-base text-content-primary font-sans antialiased h-screen overflow-y-auto overflow-x-hidden">
            <Onboarding />
            {children}
            <BottomNav />
          </body>
        </UserProvider>
      </MiniKitProvider>
    </html>
  );
}
