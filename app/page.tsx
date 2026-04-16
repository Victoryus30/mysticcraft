"use client";

import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useUser } from "./components/UserContext";
import DailySpell from "./components/DailySpell";

/* ===== Secciones del Home ===== */

function DailyCardCTA() {
  return (
    <a href="/tarot/single" className="block">
      <div className="glass-elevated rounded-2xl p-5 animate-fade-in-up stagger-1 active:scale-[0.98] transition-transform">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-brand-500/15 flex items-center justify-center">
            <span className="text-3xl animate-float">{"\ud83c\udccf"}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-content-primary">Carta del Dia</h2>
            <p className="text-content-muted text-xs mt-0.5">Descubre el mensaje del universo para ti hoy</p>
          </div>
          <div className="text-brand-400 text-xs font-semibold px-2 py-1 rounded-full bg-brand-500/10 border border-brand-500/15">
            GRATIS
          </div>
        </div>
      </div>
    </a>
  );
}

function TarotSection() {
  const spreads = [
    {
      href: "/tarot/three",
      emoji: "\u2728",
      name: "Tirada de 3",
      desc: "Pasado, presente y futuro",
      price: "$0.50",
      tier: "premium" as const,
    },
    {
      href: "/tarot/celtic",
      emoji: "\ud83d\udd2e",
      name: "Cruz Celta",
      desc: "Analisis profundo de 10 cartas",
      price: "$1.00",
      tier: "deep" as const,
    },
  ];

  return (
    <section className="animate-fade-in-up stagger-2">
      <h2 className="text-sm font-bold text-content-muted uppercase tracking-widest mb-3 px-1">Tarot</h2>
      <div className="grid grid-cols-2 gap-3">
        {spreads.map((s) => (
          <a key={s.href} href={s.href} className="block">
            <div className={`glass-card rounded-2xl p-4 h-full active:scale-[0.97] transition-transform ${
              s.tier === "deep" ? "glow-deep" : "glow-premium"
            }`}>
              <span className="text-2xl block mb-2">{s.emoji}</span>
              <h3 className="text-sm font-bold text-content-primary">{s.name}</h3>
              <p className="text-content-muted text-[11px] mt-1 mb-3">{s.desc}</p>
              <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full ${
                s.tier === "deep"
                  ? "bg-mystic-500/15 text-mystic-300 border border-mystic-500/20"
                  : "bg-brand-500/15 text-brand-300 border border-brand-500/20"
              }`}>
                {s.price} USDC
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function RitualsSection() {
  const rituals = [
    { emoji: "\ud83e\uddf9", name: "Limpieza energetica", tag: "GRATIS", href: "/ritual/limpieza" },
    { emoji: "\ud83d\udcb0", name: "Abundancia", tag: "GRATIS", href: "/ritual/abundancia" },
    { emoji: "\ud83d\udee1\ufe0f", name: "Proteccion", tag: "$0.50", href: "/ritual/proteccion" },
    { emoji: "\u2764\ufe0f", name: "Atraccion de amor", tag: "$0.50", href: "/ritual/amor" },
    { emoji: "\u2702\ufe0f", name: "Corte de lazos", tag: "$1.00", href: "/ritual/corte-lazos" },
    { emoji: "\ud83c\udf15", name: "Luna llena", tag: "$1.00", href: "/ritual/luna-llena" },
  ];

  return (
    <section className="animate-fade-in-up stagger-3">
      <h2 className="text-sm font-bold text-content-muted uppercase tracking-widest mb-3 px-1">Rituales Guiados</h2>
      <div className="grid grid-cols-3 gap-2">
        {rituals.map((r) => (
          <a key={r.href} href={r.href} className="block">
            <div className="glass-card rounded-xl p-3 text-center active:scale-[0.95] transition-transform">
              <span className="text-xl block mb-1">{r.emoji}</span>
              <p className="text-[11px] font-semibold text-content-primary leading-tight">{r.name}</p>
              <span className="text-[9px] text-content-muted mt-1 block">{r.tag}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function MoonWidget() {
  return (
    <a href="/moon" className="block">
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up stagger-4 active:scale-[0.98] transition-transform">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{"\ud83c\udf19"}</span>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-content-primary">Calendario Lunar</h3>
            <p className="text-content-muted text-[11px] mt-0.5">Descubre la fase lunar y su energia</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </a>
  );
}

function CompatibilityWidget() {
  return (
    <a href="/compatibility" className="block">
      <div className="glass-card rounded-2xl p-4 animate-fade-in-up stagger-5 active:scale-[0.98] transition-transform">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{"\u2648"}</span>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-content-primary">Compatibilidad Astral</h3>
            <p className="text-content-muted text-[11px] mt-0.5">Compara dos signos zodiacales</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    </a>
  );
}

/* ===== PAGE ===== */

export default function HomePage() {
  const { isIdentified } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen pb-28 px-4 pt-6">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-black text-content-primary animate-mystic-glow">
          MysticCraft
        </h1>
        <p className="text-content-muted text-xs mt-1 tracking-wide">
          Tu portal de bienestar espiritual
        </p>
      </div>

      {/* Wallet badge */}
      {isIdentified && (
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">CONECTADO</span>
          </div>
        </div>
      )}

      {/* Secciones */}
      <div className="flex flex-col gap-5 max-w-md mx-auto">
        <DailyCardCTA />
        <DailySpell />
        <TarotSection />
        <RitualsSection />
        <MoonWidget />
        <CompatibilityWidget />
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-content-muted/30 text-[10px] space-x-4">
        <a href="/terms" className="hover:text-content-muted transition-colors">Terminos</a>
        <a href="/privacy" className="hover:text-content-muted transition-colors">Privacidad</a>
      </footer>
    </main>
  );
}
