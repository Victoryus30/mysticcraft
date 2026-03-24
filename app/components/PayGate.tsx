"use client";

import { useState } from "react";
import { MiniKit, tokenToDecimals, Tokens } from "@worldcoin/minikit-js";
import { useUser } from "./UserContext";

interface PayGateProps {
  productId: string;
  productName: string;
  productEmoji: string;
  productDescription: string;
  priceUSDC: number;
  tier: "premium" | "deep";
  onPaymentSuccess: () => void;
}

export default function PayGate({
  productId,
  productName,
  productEmoji,
  productDescription,
  priceUSDC,
  tier,
  onPaymentSuccess,
}: PayGateProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { nullifierHash } = useUser();

  const tierEmoji = tier === "deep" ? "\ud83d\udd2e" : "\u2b50";
  const tierLabel = tier === "deep" ? "Deep" : "Premium";

  const handlePayment = async () => {
    if (!MiniKit.isInstalled()) {
      setError("Abre esta app dentro de World App");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          nullifier_hash: nullifierHash || null,
        }),
      });

      if (!res.ok) {
        setError("Error iniciando el pago. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      const { id } = await res.json();

      const { finalPayload } = await MiniKit.commandsAsync.pay({
        reference: id,
        to: process.env.NEXT_PUBLIC_PAYMENT_WALLET!,
        tokens: [
          {
            symbol: Tokens.USDC,
            token_amount: tokenToDecimals(priceUSDC, Tokens.USDC).toString(),
          },
        ],
        description: `MysticCraft: ${productName}`,
      });

      if (finalPayload.status === "success") {
        const confirmRes = await fetch("/api/confirm-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalPayload),
        });
        const result = await confirmRes.json();

        if (result.success) {
          onPaymentSuccess();
        } else {
          setError("Error verificando el pago. Intenta de nuevo.");
        }
      } else {
        setError("Pago cancelado.");
      }
    } catch (err) {
      setError("Error procesando el pago.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center animate-fade-in-scale">
        <span className="text-5xl block mb-4 animate-float">{productEmoji}</span>

        {/* Tier badge */}
        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-4 ${
          tier === "deep"
            ? "bg-mystic-500/10 border border-mystic-500/20"
            : "bg-brand-500/10 border border-brand-500/20"
        }`}>
          <span className="text-xs">{tierEmoji}</span>
          <span className={`text-[10px] font-bold tracking-wider ${
            tier === "deep" ? "text-mystic-300" : "text-brand-400"
          }`}>
            {tierLabel.toUpperCase()}
          </span>
        </div>

        <h1 className="text-xl font-black text-content-primary mb-2">{productName}</h1>
        <p className="text-content-muted text-sm mb-6">{productDescription}</p>

        {/* Info card */}
        <div className="glass-card rounded-2xl p-5 mb-6 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-content-muted text-sm">Precio</span>
            <span className="text-content-primary font-bold text-lg">${priceUSDC.toFixed(2)} USDC</span>
          </div>
          <div className="h-px bg-white/5 mb-3" />
          <div className="flex items-center justify-between">
            <span className="text-content-muted text-sm">Incluye</span>
            <span className="text-content-secondary text-sm font-semibold">
              {tier === "deep" ? "Analisis IA profundo" : "Interpretacion IA"}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-4 rounded-2xl text-sm font-bold tracking-wide transition-all ${
            loading
              ? "bg-brand-700/50 text-white/50"
              : tier === "deep"
              ? "bg-gradient-to-r from-mystic-600 to-mystic-500 text-white active:scale-[0.98] shadow-lg shadow-mystic-500/20"
              : "bg-gradient-to-r from-brand-600 to-brand-500 text-white active:scale-[0.98] shadow-lg shadow-brand-500/20"
          }`}
        >
          {loading ? "Procesando..." : `${tierEmoji} DESBLOQUEAR POR $${priceUSDC.toFixed(2)} USDC`}
        </button>

        {error && (
          <p className="text-red-400 text-xs mt-3 bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3">
            {error}
          </p>
        )}

        <a href="/" className="block text-content-muted/50 text-xs mt-6 hover:text-content-muted transition-colors">
          ← Volver al inicio
        </a>
      </div>
    </div>
  );
}
