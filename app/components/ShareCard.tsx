"use client";

import { useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

interface ShareCardProps {
  title: string;
  subtitle: string;
  emoji: string;
  /** Lineas de texto para la tarjeta */
  lines: string[];
}

export default function ShareCard({ title, subtitle, emoji, lines }: ShareCardProps) {
  const [sharing, setSharing] = useState(false);

  const handleShare = async () => {
    if (!MiniKit.isInstalled()) return;
    setSharing(true);
    try {
      // Construir texto para compartir
      const text = [
        `${emoji} ${title}`,
        subtitle,
        "",
        ...lines,
        "",
        "Descubre tu destino en MysticCraft",
      ].join("\n");

      await MiniKit.commandsAsync.share({
        text,
      } as any);

      // Haptic feedback
      try {
        MiniKit.commands.sendHapticFeedback({ hapticsType: "notification", style: "success" } as any);
      } catch {}
    } catch (err) {
      console.error("Share error:", err);
    } finally {
      setSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="w-full py-3 rounded-xl text-sm font-bold glass-card text-brand-400 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {sharing ? "Compartiendo..." : "Compartir"}
    </button>
  );
}
