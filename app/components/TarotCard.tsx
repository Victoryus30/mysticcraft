"use client";

import { useState } from "react";
import { TarotCard as TarotCardType } from "@/lib/types";

interface TarotCardProps {
  card: TarotCardType;
  reversed: boolean;
  positionLabel: string;
  index: number;
  revealed: boolean;
  onReveal: () => void;
}

/** Emoji representativo por palo/arcana */
function getCardEmoji(card: TarotCardType): string {
  if (card.arcana === "major") {
    const majorEmojis: Record<number, string> = {
      0: "\ud83c\udf1f", 1: "\u2728", 2: "\ud83c\udf19", 3: "\ud83c\udf3a",
      4: "\ud83d\udc51", 5: "\ud83d\udcdc", 6: "\u2764\ufe0f", 7: "\ud83d\ude80",
      8: "\ud83e\udd81", 9: "\ud83d\udd2d", 10: "\ud83c\udfb0", 11: "\u2696\ufe0f",
      12: "\ud83d\udd03", 13: "\ud83e\udeb6", 14: "\u2696\ufe0f", 15: "\ud83d\udd17",
      16: "\u26a1", 17: "\u2b50", 18: "\ud83c\udf1c", 19: "\u2600\ufe0f",
      20: "\ud83d\udcef", 21: "\ud83c\udf0d",
    };
    return majorEmojis[card.number] || "\ud83c\udccf";
  }
  const suitEmojis: Record<string, string> = {
    wands: "\ud83d\udd25", cups: "\ud83d\udca7", swords: "\u2694\ufe0f", pentacles: "\ud83d\udcb0",
  };
  return suitEmojis[card.suit || ""] || "\ud83c\udccf";
}

export default function TarotCard({
  card,
  reversed,
  positionLabel,
  index,
  revealed,
  onReveal,
}: TarotCardProps) {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = () => {
    if (revealed || isFlipping) return;
    setIsFlipping(true);
    // Haptic feedback si disponible
    try {
      const mk = require("@worldcoin/minikit-js");
      if (mk.MiniKit.isInstalled()) {
        mk.MiniKit.commands.sendHapticFeedback({ hapticsType: "impact", style: "medium" } as any);
      }
    } catch {}
    setTimeout(() => {
      onReveal();
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div
      className={`animate-fade-in-up stagger-${Math.min(index + 1, 10)}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Position label */}
      <p className="text-content-muted text-[10px] font-semibold tracking-widest uppercase text-center mb-2">
        {positionLabel}
      </p>

      {/* Card container */}
      <div
        className="card-3d mx-auto cursor-pointer active:scale-[0.97] transition-transform"
        style={{ width: "140px", height: "210px" }}
        onClick={handleClick}
      >
        <div className={`card-3d-inner ${revealed || isFlipping ? "flipped" : ""}`}>
          {/* BACK — cara oculta */}
          <div className="card-3d-front rounded-2xl overflow-hidden">
            <div
              className="w-full h-full flex flex-col items-center justify-center animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(124,58,237,0.1))",
                border: "1px solid rgba(212,175,55,0.2)",
                borderRadius: "16px",
              }}
            >
              <span className="text-4xl mb-2">{"\ud83c\udccf"}</span>
              <p className="text-brand-400 text-[10px] font-bold tracking-widest">TOCA</p>
            </div>
          </div>

          {/* FRONT — carta revelada */}
          <div className="card-3d-back rounded-2xl overflow-hidden">
            <div
              className={`w-full h-full flex flex-col items-center justify-center p-3 ${
                reversed ? "rotate-180" : ""
              }`}
              style={{
                background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(212,175,55,0.08))",
                border: reversed
                  ? "1px solid rgba(239,68,68,0.3)"
                  : "1px solid rgba(212,175,55,0.25)",
                borderRadius: "16px",
              }}
            >
              <span className="text-3xl mb-1">{getCardEmoji(card)}</span>
              <p className="text-content-primary text-[11px] font-bold text-center leading-tight mt-1">
                {card.nameEs}
              </p>
              {card.arcana === "major" && (
                <p className="text-brand-400 text-[9px] font-semibold mt-0.5">{card.number}</p>
              )}
              {reversed && (
                <div className="mt-1 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/20">
                  <p className="text-red-400 text-[8px] font-bold tracking-wider">INVERTIDA</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
