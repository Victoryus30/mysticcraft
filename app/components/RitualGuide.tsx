"use client";

import { useState, useEffect, useRef } from "react";
import { Ritual } from "@/lib/types";
import { useUser } from "./UserContext";

interface RitualGuideProps {
  ritual: Ritual;
}

type RitualPhase = "intro" | "active" | "complete";

export default function RitualGuide({ ritual }: RitualGuideProps) {
  const { walletAddress } = useUser();
  const [phase, setPhase] = useState<RitualPhase>("intro");
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = ritual.steps[currentStep];
  const totalSteps = ritual.steps.length;
  const progress = phase === "active" ? ((currentStep + 1) / totalSteps) * 100 : 0;

  // Timer
  useEffect(() => {
    if (phase !== "active" || isPaused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-avanzar al siguiente paso
          if (currentStep < totalSteps - 1) {
            setCurrentStep((s) => s + 1);
            return ritual.steps[currentStep + 1]?.durationSeconds || 30;
          } else {
            completeRitual();
            return 0;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isPaused, currentStep, totalSteps, ritual.steps]);

  const startRitual = () => {
    setPhase("active");
    setCurrentStep(0);
    setTimeLeft(ritual.steps[0].durationSeconds);
    // Haptic
    try {
      const mk = require("@worldcoin/minikit-js");
      if (mk.MiniKit.isInstalled()) {
        mk.MiniKit.commands.sendHapticFeedback({ hapticsType: "impact", style: "medium" } as any);
      }
    } catch {}
  };

  // Guardar ritual completado en Supabase
  const saveRitualCompletion = async () => {
    if (!walletAddress) return;
    try {
      await fetch("/api/save-ritual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet_address: walletAddress,
          ritual_slug: ritual.slug,
        }),
      });
    } catch (err) {
      console.error("Failed to save ritual:", err);
    }
  };

  const completeRitual = () => {
    setPhase("complete");
    saveRitualCompletion();
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
      setTimeLeft(ritual.steps[currentStep + 1].durationSeconds);
    } else {
      completeRitual();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      setTimeLeft(ritual.steps[currentStep - 1].durationSeconds);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  // ===== INTRO =====
  if (phase === "intro") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-sm w-full text-center animate-fade-in-scale">
          <span className="text-5xl block mb-4 animate-float">{ritual.emoji}</span>
          <h1 className="text-2xl font-black text-content-primary mb-2">{ritual.name}</h1>
          <p className="text-content-muted text-sm mb-4">{ritual.description}</p>
          <p className="text-content-muted/50 text-xs mb-6">
            {totalSteps} pasos &middot; ~{ritual.durationMinutes} min
          </p>

          {/* Materiales */}
          {ritual.materials.length > 0 && (
            <div className="glass-card rounded-xl p-4 mb-6 text-left">
              <p className="text-brand-400 text-[10px] font-bold tracking-widest uppercase mb-2">Materiales</p>
              {ritual.materials.map((mat, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500/50" />
                  <p className="text-content-primary text-xs">{mat}</p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={startRitual}
            className="w-full py-4 rounded-2xl text-sm font-bold tracking-wide bg-gradient-to-r from-brand-600 to-brand-500 text-white active:scale-[0.98] transition-transform shadow-lg shadow-brand-500/20"
          >
            COMENZAR RITUAL
          </button>
          <a href="/" className="block text-content-muted/50 text-xs mt-6">← Volver</a>
        </div>
      </div>
    );
  }

  // ===== ACTIVE =====
  if (phase === "active") {
    return (
      <div className="min-h-screen flex flex-col p-6">
        {/* Progress bar */}
        <div className="w-full h-1 bg-content-muted/15 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-mystic-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Step counter */}
        <div className="text-center mb-4">
          <p className="text-content-muted text-[10px] font-semibold tracking-widest uppercase">
            Paso {currentStep + 1} de {totalSteps}
          </p>
        </div>

        {/* Step content */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
          <div key={currentStep} className="text-center animate-fade-in-scale">
            <span className="text-5xl block mb-6">{step.icon}</span>
            <p className="text-content-primary text-sm leading-relaxed mb-8 px-2">
              {step.instruction}
            </p>
          </div>

          {/* Timer */}
          <div className="mb-8">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                isPaused ? "glass-card" : "glass-elevated animate-pulse-glow"
              }`}
            >
              <span className="text-2xl font-black text-content-primary">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-3 max-w-sm mx-auto w-full pb-8">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-3 rounded-xl text-xs font-semibold glass-card text-content-muted disabled:opacity-30 active:scale-95 transition-all"
          >
            Anterior
          </button>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-6 py-3 rounded-xl text-xs font-bold glass-elevated text-brand-400 active:scale-95 transition-all"
          >
            {isPaused ? "Reanudar" : "Pausar"}
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-3 rounded-xl text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/20 active:scale-95 transition-all"
          >
            {currentStep === totalSteps - 1 ? "Finalizar" : "Siguiente"}
          </button>
        </div>
      </div>
    );
  }

  // ===== COMPLETE =====
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-sm w-full text-center animate-fade-in-scale">
        <div className="w-20 h-20 rounded-full glass-elevated flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <span className="text-4xl">{ritual.emoji}</span>
        </div>
        <h1 className="text-2xl font-black text-content-primary mb-2 animate-mystic-glow">
          Ritual Completado
        </h1>
        <p className="text-content-muted text-sm mb-2">{ritual.name}</p>
        <p className="text-content-muted/50 text-xs mb-8">
          Que la energia de este ritual te acompane
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => { setPhase("intro"); setCurrentStep(0); }}
            className="w-full py-3 rounded-xl text-sm font-bold glass-card text-content-primary active:scale-[0.98] transition-transform"
          >
            Repetir Ritual
          </button>
          <a
            href="/"
            className="block text-center py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-brand-600 to-brand-500 text-white active:scale-[0.98] transition-transform shadow-lg shadow-brand-500/20"
          >
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}
