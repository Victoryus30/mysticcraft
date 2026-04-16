"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { isValidSpread } from "@/lib/tarot-spreads";
import { getSpread } from "@/lib/tarot-spreads";
import { SpreadType } from "@/lib/types";
import { useUser } from "@/app/components/UserContext";
import PayGate from "@/app/components/PayGate";
import TarotReading from "@/app/components/TarotReading";

export default function TarotSpreadPage() {
  const params = useParams();
  const spreadParam = params.spread as string;
  const { isIdentified } = useUser();
  const [paid, setPaid] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Validar spread type
  if (!isValidSpread(spreadParam)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-content-muted text-sm mb-4">Tipo de tirada no valido.</p>
        <a href="/" className="text-brand-400 text-sm">← Volver al inicio</a>
      </div>
    );
  }

  const spreadType = spreadParam as SpreadType;
  const spread = getSpread(spreadType);

  // Si es de pago y no ha pagado, mostrar PayGate
  if (spread.price > 0 && !paid) {
    return (
      <PayGate
        productId={`tarot_${spreadType}`}
        productName={spread.nameEs}
        productEmoji={spreadType === "three" ? "\u2728" : "\ud83d\udd2e"}
        productDescription={spread.description}
        priceUSDC={spread.price}
        tier={spread.tier === "deep" ? "deep" : "premium"}
        onPaymentSuccess={() => setPaid(true)}
      />
    );
  }

  // Mostrar lectura directamente (sin verify gate)
  return <TarotReading spreadType={spreadType} />;
}
