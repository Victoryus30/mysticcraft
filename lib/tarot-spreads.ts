import { TarotSpread, SpreadType } from "./types";

export const SPREADS: Record<SpreadType, TarotSpread> = {
  single: {
    type: "single",
    name: "Daily Card",
    nameEs: "Carta del Dia",
    description: "Una carta revela el mensaje del universo para ti hoy.",
    cardCount: 1,
    positions: ["El Mensaje"],
    price: 0,
    tier: "free",
  },
  three: {
    type: "three",
    name: "Three Card Spread",
    nameEs: "Tirada de 3 Cartas",
    description: "Pasado, presente y futuro. Interpretacion personalizada con IA.",
    cardCount: 3,
    positions: ["Pasado", "Presente", "Futuro"],
    price: 0.5,
    tier: "premium",
  },
  celtic: {
    type: "celtic",
    name: "Celtic Cross",
    nameEs: "Cruz Celta",
    description: "La tirada mas completa del tarot. 10 cartas con analisis profundo de IA.",
    cardCount: 10,
    positions: [
      "Situacion actual",
      "Desafio inmediato",
      "Fundamento / raiz",
      "Pasado reciente",
      "Corona / mejor resultado",
      "Futuro cercano",
      "Tu actitud",
      "Influencias externas",
      "Esperanzas y miedos",
      "Resultado final",
    ],
    price: 1.0,
    tier: "deep",
  },
};

export function getSpread(type: SpreadType): TarotSpread {
  return SPREADS[type];
}

export function isValidSpread(type: string): type is SpreadType {
  return type === "single" || type === "three" || type === "celtic";
}
