"use client";

import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  // Ocultar nav en paginas de tarot y ritual (tienen sus propios controles)
  if (pathname.startsWith("/tarot/") || pathname.startsWith("/ritual/")) return null;
  // Ocultar en paginas legales
  if (pathname === "/terms" || pathname === "/privacy") return null;

  const tabs = [
    {
      href: "/",
      label: "Inicio",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#B8A878" : "#706890"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      active: pathname === "/",
    },
    {
      href: "/moon",
      label: "Luna",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#B8A878" : "#706890"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
      active: pathname === "/moon",
    },
    {
      href: "/compatibility",
      label: "Astral",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#B8A878" : "#706890"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      ),
      active: pathname === "/compatibility",
    },
    {
      href: "/profile",
      label: "Perfil",
      icon: (active: boolean) => (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#B8A878" : "#706890"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
        </svg>
      ),
      active: pathname === "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div
        className="flex items-center justify-around px-4 py-2.5 mx-4 mb-3 rounded-2xl"
        style={{
          background: "rgba(14, 17, 24, 0.92)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(152, 144, 200, 0.06)",
          boxShadow: "0 -4px 30px rgba(0,0,0,0.3)",
        }}
      >
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-all active:scale-95"
          >
            {tab.icon(tab.active)}
            <span
              className={`text-[10px] font-semibold tracking-wide ${
                tab.active ? "text-brand-400" : "text-content-muted/50"
              }`}
            >
              {tab.label}
            </span>
            {tab.active && (
              <div className="w-1 h-1 rounded-full bg-brand-400 -mt-0.5" />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
