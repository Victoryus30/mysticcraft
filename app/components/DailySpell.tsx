"use client";

import { useState, useEffect } from "react";
import { getDailySpell } from "@/lib/daily-content";
import { MOON_PHASES } from "@/lib/moon-phases";

export default function DailySpell() {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const spell = getDailySpell();
  const moonInfo = MOON_PHASES[spell.moonPhase];

  return (
    <div className="glass-elevated rounded-2xl p-5 animate-fade-in-up">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{spell.emoji}</span>
        <h3 className="text-sm font-bold text-brand-400">Hechizo del Dia</h3>
        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-300 ml-auto">
          {moonInfo.emoji} {moonInfo.nameEs}
        </span>
      </div>

      <h4 className="text-content-primary text-sm font-bold mb-2">{spell.title}</h4>

      {!expanded ? (
        <div>
          <p className="text-content-muted text-xs leading-relaxed line-clamp-2">{spell.content}</p>
          <button
            onClick={() => setExpanded(true)}
            className="text-brand-400 text-xs font-semibold mt-2 active:scale-95 transition-transform"
          >
            Leer mas →
          </button>
        </div>
      ) : (
        <div className="animate-fade-in">
          <p className="text-content-primary text-xs leading-relaxed mb-4">{spell.content}</p>

          {/* Afirmacion */}
          <div className="glass-mystic rounded-xl p-3 text-center">
            <p className="text-[10px] text-mystic-300 font-semibold tracking-widest uppercase mb-1">
              Afirmacion
            </p>
            <p className="text-content-primary text-sm font-bold italic">
              &ldquo;{spell.affirmation}&rdquo;
            </p>
          </div>

          <button
            onClick={() => setExpanded(false)}
            className="text-content-muted/50 text-xs mt-3 block mx-auto"
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
}
