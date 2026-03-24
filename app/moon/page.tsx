"use client";

import { useState, useEffect } from "react";
import { getCurrentMoonInfo, getNextFullMoon, getMoonPhase, MOON_PHASES } from "@/lib/moon-phases";
import { MoonPhase } from "@/lib/types";

export default function MoonPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const now = new Date();
  const moonInfo = getCurrentMoonInfo(now);
  const nextFull = getNextFullMoon(now);
  const daysToFull = Math.ceil((nextFull.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Mini calendario: 7 dias atras + hoy + 7 dias adelante
  const calendarDays: Array<{ date: Date; phase: MoonPhase; isToday: boolean }> = [];
  for (let i = -7; i <= 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    calendarDays.push({ date: d, phase: getMoonPhase(d), isToday: i === 0 });
  }

  return (
    <main className="min-h-screen px-4 pt-8 pb-28">
      <div className="max-w-md mx-auto">
        <a href="/" className="text-content-muted/50 text-xs mb-6 block">← Volver</a>

        {/* Fase actual */}
        <div className="text-center mb-8 animate-fade-in-scale">
          <span className="text-7xl block mb-4 animate-float">{moonInfo.emoji}</span>
          <h1 className="text-2xl font-black text-content-primary animate-mystic-glow">
            {moonInfo.nameEs}
          </h1>
          <p className="text-content-muted text-xs mt-2">
            Iluminacion: {moonInfo.illumination}% &middot; Dia {moonInfo.age} del ciclo
          </p>
        </div>

        {/* Energia */}
        <div className="glass-elevated rounded-2xl p-5 mb-6 animate-fade-in-up stagger-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{"\u2728"}</span>
            <h2 className="text-sm font-bold text-brand-400">Energia Lunar</h2>
          </div>
          <p className="text-content-primary text-sm leading-relaxed">{moonInfo.energy}</p>
        </div>

        {/* Recomendacion */}
        <div className="glass-card rounded-2xl p-5 mb-6 animate-fade-in-up stagger-2">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{"\ud83d\udcab"}</span>
            <h2 className="text-sm font-bold text-mystic-300">Recomendacion</h2>
          </div>
          <p className="text-content-primary text-sm leading-relaxed">{moonInfo.recommendation}</p>
        </div>

        {/* Proxima luna llena */}
        <div className="glass-card rounded-xl p-4 mb-6 animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{"\ud83c\udf15"}</span>
              <span className="text-sm font-semibold text-content-primary">Proxima Luna Llena</span>
            </div>
            <div className="text-right">
              <p className="text-brand-400 text-sm font-bold">{daysToFull === 0 ? "Hoy!" : `${daysToFull} dias`}</p>
              <p className="text-content-muted text-[10px]">
                {nextFull.toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
              </p>
            </div>
          </div>
        </div>

        {/* Mini calendario lunar */}
        <div className="animate-fade-in-up stagger-4">
          <h2 className="text-sm font-bold text-content-muted uppercase tracking-widest mb-3 px-1">
            Calendario Lunar
          </h2>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {calendarDays.map((day, i) => {
              const phaseInfo = MOON_PHASES[day.phase];
              return (
                <div
                  key={i}
                  className={`flex-shrink-0 w-12 rounded-xl p-2 text-center ${
                    day.isToday ? "glass-elevated border-brand-500/30" : "glass-card"
                  }`}
                >
                  <p className="text-[9px] text-content-muted">
                    {day.date.toLocaleDateString("es-MX", { weekday: "narrow" })}
                  </p>
                  <p className={`text-[10px] font-bold ${day.isToday ? "text-brand-400" : "text-content-primary"}`}>
                    {day.date.getDate()}
                  </p>
                  <span className="text-base block mt-0.5">{phaseInfo.emoji}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Todas las fases */}
        <div className="mt-8 animate-fade-in-up stagger-5">
          <h2 className="text-sm font-bold text-content-muted uppercase tracking-widest mb-3 px-1">
            Fases del Ciclo
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {(Object.values(MOON_PHASES) as Array<{ phase: MoonPhase; nameEs: string; emoji: string; energy: string }>).map((p) => (
              <div
                key={p.phase}
                className={`glass-card rounded-xl p-3 ${
                  p.phase === moonInfo.phase ? "border-brand-500/30 glow-premium" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{p.emoji}</span>
                  <p className="text-[11px] font-bold text-content-primary">{p.nameEs}</p>
                </div>
                {p.phase === moonInfo.phase && (
                  <span className="text-[8px] text-brand-400 font-bold tracking-wider">FASE ACTUAL</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
