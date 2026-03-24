"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { getRitual } from "@/lib/rituals-registry";
import { useUser } from "@/app/components/UserContext";
import PayGate from "@/app/components/PayGate";
import RitualGuide from "@/app/components/RitualGuide";

export default function RitualPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { isVerified, setVerified } = useUser();
  const [verifying, setVerifying] = useState(false);
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

  // Verificacion
  if (!isVerified) {
    const handleVerify = async () => {
      if (!MiniKit.isInstalled()) return;
      setVerifying(true);
      try {
        const { finalPayload } = await MiniKit.commandsAsync.verify({
          action: process.env.NEXT_PUBLIC_VERIFY_ACTION!,
          verification_level: "orb" as any,
        });
        if (finalPayload.status === "success") {
          const res = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payload: finalPayload, action: process.env.NEXT_PUBLIC_VERIFY_ACTION, signal: "" }),
          });
          const data = await res.json();
          if (data.verifyRes?.success) setVerified(data.nullifier_hash);
        }
      } catch (err) { console.error(err); }
      finally { setVerifying(false); }
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full text-center animate-fade-in-scale">
          <span className="text-5xl block mb-4">{"\ud83c\udf10"}</span>
          <h1 className="text-xl font-black text-content-primary mb-2">Verificacion Requerida</h1>
          <p className="text-content-muted text-sm mb-6">Verificate con World ID para acceder a los rituales.</p>
          <button onClick={handleVerify} disabled={verifying} className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide bg-gradient-to-r from-brand-600 to-brand-500 text-white active:scale-[0.98] transition-transform shadow-lg shadow-brand-500/20">
            {verifying ? "Verificando..." : "VERIFICAR CON WORLD ID"}
          </button>
          <a href="/" className="block text-content-muted/50 text-xs mt-6">← Volver</a>
        </div>
      </div>
    );
  }

  // Pago
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
