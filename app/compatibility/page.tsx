"use client";

import { useState, useEffect } from "react";
import { ZodiacSign } from "@/lib/types";
import { ZODIAC_LIST, calculateCompatibility } from "@/lib/zodiac";

export default function CompatibilityPage() {
  const [sign1, setSign1] = useState<ZodiacSign | null>(null);
  const [sign2, setSign2] = useState<ZodiacSign | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const result = sign1 && sign2 ? calculateCompatibility(sign1, sign2) : null;

  const handleCalculate = () => {
    if (sign1 && sign2) setShowResult(true);
  };

  const ScoreBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-content-muted text-[11px]">{label}</span>
        <span className="text-content-primary text-[11px] font-bold">{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen px-4 pt-8 pb-28">
      <div className="max-w-md mx-auto">
        <a href="/" className="text-content-muted/50 text-xs mb-6 block">← Volver</a>

        <div className="text-center mb-8 animate-fade-in">
          <span className="text-4xl block mb-2">{"\u2648\u2764\ufe0f\u264e"}</span>
          <h1 className="text-2xl font-black text-content-primary">Compatibilidad Astral</h1>
          <p className="text-content-muted text-xs mt-1">Compara dos signos zodiacales</p>
        </div>

        {/* Selector de signos */}
        <div className="flex items-center gap-3 mb-6">
          {/* Signo 1 */}
          <div className="flex-1">
            <p className="text-content-muted text-[10px] font-semibold tracking-widest uppercase mb-2 text-center">Tu signo</p>
            <div className="grid grid-cols-4 gap-1.5">
              {ZODIAC_LIST.map((z) => (
                <button
                  key={z.sign}
                  onClick={() => { setSign1(z.sign); setShowResult(false); }}
                  className={`rounded-lg p-1.5 text-center active:scale-90 transition-all ${
                    sign1 === z.sign ? "glass-elevated border-brand-500/40" : "glass-card"
                  }`}
                >
                  <span className="text-base block">{z.emoji}</span>
                  <p className="text-[8px] text-content-muted mt-0.5">{z.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 mb-6">
          <p className="text-content-muted text-[10px] font-semibold tracking-widest uppercase mb-2 text-center">Su signo</p>
          <div className="grid grid-cols-4 gap-1.5">
            {ZODIAC_LIST.map((z) => (
              <button
                key={z.sign}
                onClick={() => { setSign2(z.sign); setShowResult(false); }}
                className={`rounded-lg p-1.5 text-center active:scale-90 transition-all ${
                  sign2 === z.sign ? "glass-elevated border-mystic-500/40" : "glass-card"
                }`}
              >
                <span className="text-base block">{z.emoji}</span>
                <p className="text-[8px] text-content-muted mt-0.5">{z.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Boton calcular */}
        {sign1 && sign2 && !showResult && (
          <button
            onClick={handleCalculate}
            className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide bg-gradient-to-r from-brand-600 to-brand-500 text-white active:scale-[0.98] transition-transform shadow-lg shadow-brand-500/20 mb-6 animate-fade-in"
          >
            CALCULAR COMPATIBILIDAD
          </button>
        )}

        {/* Resultado */}
        {showResult && result && sign1 && sign2 && (
          <div className="animate-fade-in-scale">
            {/* Score principal */}
            <div className="glass-elevated rounded-2xl p-6 text-center mb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-4xl">{ZODIAC_LIST.find((z) => z.sign === sign1)?.emoji}</span>
                <span className="text-brand-400 text-lg">{"\u2764\ufe0f"}</span>
                <span className="text-4xl">{ZODIAC_LIST.find((z) => z.sign === sign2)?.emoji}</span>
              </div>
              <p className="text-5xl font-black text-brand-400 animate-mystic-glow">{result.score}%</p>
              <p className="text-content-muted text-xs mt-1">Compatibilidad General</p>
            </div>

            {/* Barras por area */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <ScoreBar label="Amor" value={result.loveScore} color="bg-gradient-to-r from-pink-500 to-red-500" />
              <ScoreBar label="Amistad" value={result.friendScore} color="bg-gradient-to-r from-brand-500 to-brand-400" />
              <ScoreBar label="Trabajo" value={result.workScore} color="bg-gradient-to-r from-mystic-500 to-mystic-400" />
            </div>

            {/* Resumen */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{"\ud83d\udd2e"}</span>
                <h3 className="text-sm font-bold text-brand-400">Analisis</h3>
              </div>
              <p className="text-content-primary text-sm leading-relaxed">{result.summary}</p>
            </div>

            {/* Reset */}
            <button
              onClick={() => { setSign1(null); setSign2(null); setShowResult(false); }}
              className="w-full py-3 rounded-xl text-sm font-bold glass-card text-content-primary active:scale-[0.98] transition-transform"
            >
              Comparar Otros Signos
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
