"use client";

import { useState, useEffect } from "react";
import { SpreadType, DrawnCard } from "@/lib/types";
import { drawCards } from "@/lib/tarot-deck";
import { getSpread } from "@/lib/tarot-spreads";
import TarotCard from "./TarotCard";
import { useUser } from "./UserContext";

interface TarotReadingProps {
  spreadType: SpreadType;
}

type ReadingPhase = "intro" | "drawing" | "revealing" | "interpreting" | "result";

export default function TarotReading({ spreadType }: TarotReadingProps) {
  const spread = getSpread(spreadType);
  const { walletAddress } = useUser();

  const [phase, setPhase] = useState<ReadingPhase>("intro");
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dibujar cartas
  const startDrawing = () => {
    const drawn = drawCards(spread.cardCount);
    const cards: DrawnCard[] = drawn.map((d, i) => ({
      position: i,
      positionLabel: spread.positions[i],
      card: d.card,
      reversed: d.reversed,
    }));
    setDrawnCards(cards);
    setPhase("revealing");
  };

  // Revelar una carta
  const revealCard = () => {
    const newCount = revealedCount + 1;
    setRevealedCount(newCount);

    // Si todas reveladas y es tirada de pago, pedir interpretacion IA
    if (newCount === spread.cardCount) {
      if (spreadType === "single") {
        setPhase("result");
        // Guardar carta del dia en Supabase
        saveReading(null);
      } else {
        requestInterpretation();
      }
    }
  };

  // Pedir interpretacion IA
  const requestInterpretation = async () => {
    setPhase("interpreting");
    setLoadingAI(true);
    setError(null);

    try {
      const res = await fetch("/api/tarot-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spread_type: spreadType,
          cards: drawnCards.map((dc) => ({
            position: dc.positionLabel,
            card_name: dc.card.nameEs,
            reversed: dc.reversed,
            meaning: dc.reversed ? dc.card.meaningReversed : dc.card.meaningUpright,
            keywords: dc.card.keywords,
          })),
          wallet_address: walletAddress,
        }),
      });

      if (!res.ok) throw new Error("Error en la interpretacion");

      const data = await res.json();
      setInterpretation(data.interpretation);
      setPhase("result");
      // Guardar lectura en Supabase
      saveReading(data.interpretation);
    } catch (err) {
      console.error(err);
      setError("No se pudo generar la interpretacion. Mostrando significados individuales.");
      setPhase("result");
      saveReading(null);
    } finally {
      setLoadingAI(false);
    }
  };

  // Guardar lectura en Supabase
  const saveReading = async (interp: string | null) => {
    if (!walletAddress) return;
    try {
      await fetch("/api/save-reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: walletAddress,
          spread_type: spreadType,
          cards: drawnCards.map((dc) => ({
            position: dc.positionLabel,
            card_id: dc.card.id,
            reversed: dc.reversed,
          })),
          interpretation: interp,
        }),
      });
    } catch (err) {
      console.error("Failed to save reading:", err);
    }
  };

  // ===== RENDER: INTRO =====
  if (phase === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full text-center animate-fade-in-scale">
          <span className="text-5xl block mb-4 animate-float">
            {spreadType === "single" ? "\ud83c\udccf" : spreadType === "three" ? "\u2728" : "\ud83d\udd2e"}
          </span>
          <h1 className="text-2xl font-black text-content-primary mb-2">{spread.nameEs}</h1>
          <p className="text-content-muted text-sm mb-2">{spread.description}</p>
          <p className="text-content-muted/50 text-xs mb-8">
            {spread.cardCount} carta{spread.cardCount > 1 ? "s" : ""}
          </p>

          <button
            onClick={startDrawing}
            className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide bg-gradient-to-r from-brand-600 to-brand-500 text-white active:scale-[0.98] transition-transform shadow-lg shadow-brand-500/20"
          >
            BARAJAR Y TIRAR
          </button>

          <a href="/" className="block text-content-muted/50 text-xs mt-6 hover:text-content-muted transition-colors">
            ← Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  // ===== RENDER: REVEALING =====
  if (phase === "revealing") {
    return (
      <div className="min-h-screen px-4 pt-8 pb-28">
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-bold text-content-primary text-center mb-1">{spread.nameEs}</h2>
          <p className="text-content-muted text-xs text-center mb-6">
            Toca cada carta para revelarla ({revealedCount}/{spread.cardCount})
          </p>

          {/* Grid de cartas */}
          <div className={`flex flex-wrap justify-center gap-4 ${
            spread.cardCount <= 3 ? "gap-6" : "gap-3"
          }`}>
            {drawnCards.map((dc, i) => (
              <TarotCard
                key={dc.card.id}
                card={dc.card}
                reversed={dc.reversed}
                positionLabel={dc.positionLabel}
                index={i}
                revealed={i < revealedCount}
                onReveal={revealCard}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===== RENDER: INTERPRETING (loading IA) =====
  if (phase === "interpreting") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full text-center animate-fade-in-scale">
          <div className="w-16 h-16 rounded-full glass-elevated flex items-center justify-center mx-auto mb-6 animate-spin-slow">
            <span className="text-3xl">{"\ud83d\udd2e"}</span>
          </div>
          <h2 className="text-lg font-bold text-content-primary mb-2">Consultando los astros...</h2>
          <p className="text-content-muted text-sm">La IA esta interpretando tu tirada</p>
          <div className="mt-6 w-48 h-1 mx-auto rounded-full bg-brand-500/20 overflow-hidden">
            <div className="h-full bg-brand-500 rounded-full animate-shimmer" style={{ width: "60%" }} />
          </div>
        </div>
      </div>
    );
  }

  // ===== RENDER: RESULT =====
  return (
    <div className="min-h-screen px-4 pt-8 pb-28">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-black text-content-primary text-center mb-1 animate-mystic-glow">
          Tu Lectura
        </h2>
        <p className="text-content-muted text-xs text-center mb-6">{spread.nameEs}</p>

        {/* Resumen de cartas */}
        <div className="space-y-3 mb-8">
          {drawnCards.map((dc, i) => (
            <div
              key={dc.card.id}
              className={`glass-card rounded-xl p-4 animate-fade-in-up stagger-${Math.min(i + 1, 10)}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                  <span className={`text-lg ${dc.reversed ? "rotate-180" : ""}`}>
                    {spreadType === "single" ? "\ud83c\udccf" : "\u2728"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-brand-400 font-semibold tracking-widest uppercase">
                    {dc.positionLabel}
                  </p>
                  <p className="text-sm font-bold text-content-primary mt-0.5">
                    {dc.card.nameEs}
                    {dc.reversed && <span className="text-red-400 text-xs ml-1">(Invertida)</span>}
                  </p>
                  <p className="text-content-muted text-xs mt-1 leading-relaxed">
                    {dc.reversed ? dc.card.meaningReversed : dc.card.meaningUpright}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dc.card.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-[9px] px-1.5 py-0.5 rounded-full bg-mystic-500/10 text-mystic-300 border border-mystic-500/15"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interpretacion IA */}
        {interpretation && (
          <div className="glass-elevated rounded-2xl p-5 mb-6 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{"\ud83d\udd2e"}</span>
              <h3 className="text-sm font-bold text-brand-400">Interpretacion Mistica</h3>
            </div>
            <div className="text-content-primary text-sm leading-relaxed whitespace-pre-line">
              {interpretation}
            </div>
          </div>
        )}

        {/* Error fallback */}
        {error && !interpretation && (
          <div className="glass-card rounded-xl p-4 mb-6 border-amber-500/20">
            <p className="text-amber-400 text-xs">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setPhase("intro");
              setDrawnCards([]);
              setRevealedCount(0);
              setInterpretation(null);
              setError(null);
            }}
            className="w-full py-3 rounded-xl text-sm font-bold tracking-wide glass-card text-content-primary active:scale-[0.98] transition-transform"
          >
            Otra Tirada
          </button>
          <a
            href="/"
            className="block text-center text-content-muted/50 text-xs hover:text-content-muted transition-colors"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
