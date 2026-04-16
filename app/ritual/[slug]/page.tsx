"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { getRitual } from "@/lib/rituals-registry";
import { useUser } from "@/app/components/UserContext";
import PayGate from "@/app/components/PayGate";
import RitualGuide from "@/app/components/RitualGuide";

export default function RitualPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isIdentified } = useUser();
  const [paid, setPaid] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const ritual = getRitual(slug);
  if (!ritual) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <p className="text-content-muted text-sm mb-4">Ritual no encontrado.</p>
        <a href="/" className="text-brand-400 text-sm">← Volver al inicio</a>
      </div>
    );
  }

  // Pago (sin verify gate)
  if (ritual.price > 0 && !paid) {
    return (
      <PayGate
        productId={`ritual_${ritual.slug}`}
        productName={ritual.name}
        productEmoji={ritual.emoji}
        productDescription={ritual.description}
        priceUSDC={ritual.price}
        tier={ritual.tier === "deep" ? "deep" : "premium"}
        onPaymentSuccess={() => setPaid(true)}
      />
    );
  }

  return <RitualGuide ritual={ritual} />;
}
