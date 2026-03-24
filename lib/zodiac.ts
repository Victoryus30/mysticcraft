import { ZodiacSign, ZodiacInfo, CompatibilityResult } from "./types";

export const ZODIAC_SIGNS: Record<ZodiacSign, ZodiacInfo> = {
  aries:       { sign: "aries",       name: "Aries",       emoji: "\u2648", element: "fuego",  dateRange: "21 Mar - 19 Abr", ruling: "Marte" },
  tauro:       { sign: "tauro",       name: "Tauro",       emoji: "\u2649", element: "tierra", dateRange: "20 Abr - 20 May", ruling: "Venus" },
  geminis:     { sign: "geminis",     name: "Geminis",     emoji: "\u264a", element: "aire",   dateRange: "21 May - 20 Jun", ruling: "Mercurio" },
  cancer:      { sign: "cancer",      name: "Cancer",      emoji: "\u264b", element: "agua",   dateRange: "21 Jun - 22 Jul", ruling: "Luna" },
  leo:         { sign: "leo",         name: "Leo",         emoji: "\u264c", element: "fuego",  dateRange: "23 Jul - 22 Ago", ruling: "Sol" },
  virgo:       { sign: "virgo",       name: "Virgo",       emoji: "\u264d", element: "tierra", dateRange: "23 Ago - 22 Sep", ruling: "Mercurio" },
  libra:       { sign: "libra",       name: "Libra",       emoji: "\u264e", element: "aire",   dateRange: "23 Sep - 22 Oct", ruling: "Venus" },
  escorpio:    { sign: "escorpio",    name: "Escorpio",    emoji: "\u264f", element: "agua",   dateRange: "23 Oct - 21 Nov", ruling: "Pluton" },
  sagitario:   { sign: "sagitario",   name: "Sagitario",   emoji: "\u2650", element: "fuego",  dateRange: "22 Nov - 21 Dic", ruling: "Jupiter" },
  capricornio: { sign: "capricornio", name: "Capricornio", emoji: "\u2651", element: "tierra", dateRange: "22 Dic - 19 Ene", ruling: "Saturno" },
  acuario:     { sign: "acuario",     name: "Acuario",     emoji: "\u2652", element: "aire",   dateRange: "20 Ene - 18 Feb", ruling: "Urano" },
  piscis:      { sign: "piscis",      name: "Piscis",      emoji: "\u2653", element: "agua",   dateRange: "19 Feb - 20 Mar", ruling: "Neptuno" },
};

export const ZODIAC_LIST = Object.values(ZODIAC_SIGNS);

// Matriz de compatibilidad simplificada (mismo elemento = alta, opuesto = baja)
const ELEMENT_COMPAT: Record<string, Record<string, number>> = {
  fuego:  { fuego: 80, tierra: 45, aire: 85, agua: 40 },
  tierra: { fuego: 45, tierra: 75, aire: 50, agua: 80 },
  aire:   { fuego: 85, tierra: 50, aire: 70, agua: 55 },
  agua:   { fuego: 40, tierra: 80, aire: 55, agua: 75 },
};

// Ajustes especificos entre signos (bonificaciones/penalizaciones)
const SPECIAL_PAIRS: Record<string, number> = {
  "aries-leo": 15, "aries-sagitario": 15, "tauro-cancer": 10, "tauro-virgo": 10,
  "geminis-libra": 15, "geminis-acuario": 15, "cancer-escorpio": 12, "cancer-piscis": 12,
  "leo-sagitario": 15, "virgo-capricornio": 10, "libra-acuario": 15, "escorpio-piscis": 12,
  "sagitario-aries": 15, "capricornio-tauro": 10, "acuario-geminis": 15, "piscis-cancer": 12,
  "aries-cancer": -10, "tauro-acuario": -10, "geminis-virgo": -5, "leo-escorpio": -10,
  "virgo-sagitario": -5, "libra-capricornio": -5, "escorpio-acuario": -10, "piscis-geminis": -5,
};

function getSpecialAdjust(s1: ZodiacSign, s2: ZodiacSign): number {
  return SPECIAL_PAIRS[`${s1}-${s2}`] || SPECIAL_PAIRS[`${s2}-${s1}`] || 0;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function calculateCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): CompatibilityResult {
  const info1 = ZODIAC_SIGNS[sign1];
  const info2 = ZODIAC_SIGNS[sign2];

  const baseScore = ELEMENT_COMPAT[info1.element][info2.element];
  const adjust = getSpecialAdjust(sign1, sign2);
  const score = clamp(baseScore + adjust, 15, 98);

  // Variaciones por area (love, friend, work) con algo de variedad
  const seed = (sign1 + sign2).length;
  const loveScore = clamp(score + ((seed % 3) - 1) * 8, 15, 98);
  const friendScore = clamp(score + ((seed % 5) - 2) * 5, 15, 98);
  const workScore = clamp(score + ((seed % 4) - 1) * 6, 15, 98);

  const summaries = getSummary(score, info1.name, info2.name, info1.element, info2.element);

  return {
    sign1, sign2,
    score, loveScore, friendScore, workScore,
    summary: summaries,
  };
}

function getSummary(score: number, name1: string, name2: string, el1: string, el2: string): string {
  if (score >= 85) return `${name1} y ${name2} tienen una conexion magnetica! La combinacion de ${el1} y ${el2} crea una energia poderosa. Se entienden casi sin palabras y juntos pueden lograr cosas extraordinarias.`;
  if (score >= 70) return `${name1} y ${name2} forman un duo armonioso. La energia de ${el1} complementa bien al ${el2}. Hay atraccion natural y potencial para una relacion solida y enriquecedora.`;
  if (score >= 55) return `${name1} y ${name2} tienen una compatibilidad moderada. ${el1} y ${el2} pueden chocar a veces, pero esas diferencias tambien generan chispa y crecimiento mutuo.`;
  if (score >= 40) return `${name1} y ${name2} necesitaran trabajo para conectar. La energia de ${el1} y ${el2} no fluye naturalmente, pero con comunicacion y paciencia pueden construir algo valioso.`;
  return `${name1} y ${name2} son muy diferentes. La combinacion de ${el1} y ${el2} presenta desafios significativos. Pero recuerda: las parejas mas improbables a veces son las mas transformadoras.`;
}
