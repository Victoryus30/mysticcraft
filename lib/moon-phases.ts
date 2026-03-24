import { MoonPhase, MoonPhaseInfo } from "./types";

/**
 * Calculo de fase lunar basado en algoritmo astronomico simplificado.
 * Ciclo lunar = 29.53059 dias (sinodicol).
 * Referencia: Luna nueva conocida el 6 de enero 2000 a las 18:14 UTC.
 */

const LUNAR_CYCLE = 29.53059;
const KNOWN_NEW_MOON = new Date("2000-01-06T18:14:00Z").getTime();

/** Retorna la edad de la luna en dias (0 = luna nueva) */
export function getMoonAge(date: Date = new Date()): number {
  const diffMs = date.getTime() - KNOWN_NEW_MOON;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  const age = diffDays % LUNAR_CYCLE;
  return age < 0 ? age + LUNAR_CYCLE : age;
}

/** Retorna la fase lunar para una fecha */
export function getMoonPhase(date: Date = new Date()): MoonPhase {
  const age = getMoonAge(date);
  const fraction = age / LUNAR_CYCLE;

  if (fraction < 0.0625) return "new";
  if (fraction < 0.1875) return "waxing_crescent";
  if (fraction < 0.3125) return "first_quarter";
  if (fraction < 0.4375) return "waxing_gibbous";
  if (fraction < 0.5625) return "full";
  if (fraction < 0.6875) return "waning_gibbous";
  if (fraction < 0.8125) return "last_quarter";
  if (fraction < 0.9375) return "waning_crescent";
  return "new";
}

/** Porcentaje de iluminacion (0-100) */
export function getMoonIllumination(date: Date = new Date()): number {
  const age = getMoonAge(date);
  const fraction = age / LUNAR_CYCLE;
  // Funcion coseno para iluminacion
  return Math.round((1 - Math.cos(fraction * 2 * Math.PI)) / 2 * 100);
}

/** Info completa de cada fase */
export const MOON_PHASES: Record<MoonPhase, MoonPhaseInfo> = {
  new: {
    phase: "new",
    nameEs: "Luna Nueva",
    emoji: "\ud83c\udf11",
    energy: "Inicio y renovacion. Momento ideal para plantar semillas de intencion.",
    recommendation: "Escribe tus intenciones para este ciclo. Medita sobre nuevos comienzos. Evita tomar decisiones grandes — mejor planifica.",
  },
  waxing_crescent: {
    phase: "waxing_crescent",
    nameEs: "Creciente Inicial",
    emoji: "\ud83c\udf12",
    energy: "Crecimiento y esperanza. La energia comienza a expandirse.",
    recommendation: "Da los primeros pasos hacia tus metas. Establece habitos nuevos. La motivacion esta de tu lado.",
  },
  first_quarter: {
    phase: "first_quarter",
    nameEs: "Cuarto Creciente",
    emoji: "\ud83c\udf13",
    energy: "Accion y decision. Momento de comprometerte con tus objetivos.",
    recommendation: "Toma decisiones importantes. Enfrenta obstaculos con determinacion. Es momento de actuar, no de dudar.",
  },
  waxing_gibbous: {
    phase: "waxing_gibbous",
    nameEs: "Gibosa Creciente",
    emoji: "\ud83c\udf14",
    energy: "Refinamiento y ajuste. Casi llegas a la plenitud.",
    recommendation: "Afina los detalles de tus proyectos. Ajusta lo que no funciona. Prepara todo para la culminacion.",
  },
  full: {
    phase: "full",
    nameEs: "Luna Llena",
    emoji: "\ud83c\udf15",
    energy: "Plenitud y manifestacion. La energia esta en su punto maximo.",
    recommendation: "Celebra tus logros. Realiza rituales de manifestacion. Las emociones estan amplificadas — usa esa energia sabiamente.",
  },
  waning_gibbous: {
    phase: "waning_gibbous",
    nameEs: "Gibosa Menguante",
    emoji: "\ud83c\udf16",
    energy: "Gratitud y compartir. Momento de dar y agradecer.",
    recommendation: "Comparte tu conocimiento. Practica la gratitud. Reflexiona sobre lo que has logrado en este ciclo.",
  },
  last_quarter: {
    phase: "last_quarter",
    nameEs: "Cuarto Menguante",
    emoji: "\ud83c\udf17",
    energy: "Liberacion y soltar. Momento de dejar ir lo que no sirve.",
    recommendation: "Suelta relaciones, habitos o pensamientos que te frenan. Limpia tu espacio fisico y energetico.",
  },
  waning_crescent: {
    phase: "waning_crescent",
    nameEs: "Menguante Final",
    emoji: "\ud83c\udf18",
    energy: "Descanso y renovacion. El ciclo se cierra para comenzar de nuevo.",
    recommendation: "Descansa, medita, recarga energias. No inicies proyectos nuevos — mejor reflexiona y prepara el terreno.",
  },
};

/** Obtener info de la fase actual */
export function getCurrentMoonInfo(date: Date = new Date()): MoonPhaseInfo & { illumination: number; age: number } {
  const phase = getMoonPhase(date);
  return {
    ...MOON_PHASES[phase],
    illumination: getMoonIllumination(date),
    age: Math.round(getMoonAge(date) * 10) / 10,
  };
}

/** Calcular proxima luna llena */
export function getNextFullMoon(from: Date = new Date()): Date {
  const age = getMoonAge(from);
  const fullMoonAge = LUNAR_CYCLE * 0.5; // luna llena a la mitad del ciclo
  let daysUntilFull = fullMoonAge - age;
  if (daysUntilFull < 0) daysUntilFull += LUNAR_CYCLE;
  return new Date(from.getTime() + daysUntilFull * 24 * 60 * 60 * 1000);
}
