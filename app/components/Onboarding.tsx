"use client";

import { useState, useEffect } from "react";

const SLIDES = [
  {
    emoji: "\u2728",
    title: "Tu portal espiritual",
    description:
      "Tarot con inteligencia artificial, rituales guiados, calendario lunar y compatibilidad astral. Todo en un solo lugar.",
  },
  {
    emoji: "\ud83c\udccf",
    title: "Tarot personalizado",
    description:
      "Lecturas de 1, 3 o 10 cartas interpretadas por IA. Cada tirada es unica y personalizada para ti en este momento.",
  },
  {
    emoji: "\ud83c\udf19",
    title: "Verificado por World ID",
    description:
      "Solo humanos reales. Tu World ID garantiza una experiencia autentica y un perfil espiritual que evoluciona contigo.",
  },
];

export default function Onboarding() {
  const [visible, setVisible] = useState(false);
  const [slide, setSlide] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem("mystic_onboarding_done");
      if (!seen) setVisible(true);
    } catch {
      // SSR or storage blocked
    }
  }, []);

  const finish = () => {
    setExiting(true);
    try {
      localStorage.setItem("mystic_onboarding_done", "1");
    } catch {}
    setTimeout(() => setVisible(false), 400);
  };

  const next = () => {
    if (slide < SLIDES.length - 1) {
      setSlide((s) => s + 1);
    } else {
      finish();
    }
  };

  if (!visible) return null;

  const current = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-surface-base flex flex-col items-center justify-center transition-opacity duration-400 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-brand-500/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[200px] h-[200px] rounded-full bg-mystic-500/8 blur-[80px]" />
      </div>

      {/* Skip button */}
      {!isLast && (
        <button
          onClick={finish}
          className="absolute top-14 right-6 text-content-muted/40 text-xs font-medium z-10 active:scale-95 transition-transform"
        >
          Saltar
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-8 max-w-sm w-full">
        <div
          key={slide}
          className="w-24 h-24 rounded-full glass-elevated flex items-center justify-center mb-8 animate-fade-in-scale"
        >
          <span className="text-5xl">{current.emoji}</span>
        </div>

        <div key={`text-${slide}`} className="text-center animate-fade-in-up">
          <h1 className="text-2xl font-black text-content-primary mb-3">
            {current.title}
          </h1>
          <p className="text-content-muted text-sm leading-relaxed">
            {current.description}
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-16 left-0 right-0 px-8 flex flex-col items-center gap-6">
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === slide
                  ? "w-6 bg-brand-500"
                  : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-full max-w-sm py-4 rounded-2xl text-sm font-bold tracking-wide bg-gradient-to-r from-brand-600 to-brand-500 text-white active:scale-[0.98] transition-transform shadow-lg shadow-brand-500/20"
        >
          {isLast ? "COMENZAR" : "SIGUIENTE"}
        </button>
      </div>
    </div>
  );
}
