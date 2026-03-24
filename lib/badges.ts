/**
 * Sistema de logros/badges para MysticCraft.
 */

export interface Badge {
  id: string;
  emoji: string;
  name: string;
  description: string;
  unlocked: boolean;
}

interface BadgeInput {
  readingsCount: number;
  ritualsCount: number;
  hasPremium: boolean;
  hasDeep: boolean;
  streakCurrent: number;
  streakLongest: number;
  spreadTypes: Set<string>;
  ritualCategories: Set<string>;
}

const BADGE_DEFS: {
  id: string;
  emoji: string;
  name: string;
  description: string;
  check: (input: BadgeInput) => boolean;
}[] = [
  {
    id: "first_reading",
    emoji: "\ud83c\udccf",
    name: "Primera Lectura",
    description: "Completaste tu primera lectura de tarot",
    check: (i) => i.readingsCount >= 1,
  },
  {
    id: "five_readings",
    emoji: "\u2728",
    name: "Buscador Mistico",
    description: "5 lecturas de tarot completadas",
    check: (i) => i.readingsCount >= 5,
  },
  {
    id: "ten_readings",
    emoji: "\ud83d\udd2e",
    name: "Vidente",
    description: "10 lecturas de tarot completadas",
    check: (i) => i.readingsCount >= 10,
  },
  {
    id: "first_ritual",
    emoji: "\ud83d\udd6f\ufe0f",
    name: "Iniciado",
    description: "Completaste tu primer ritual",
    check: (i) => i.ritualsCount >= 1,
  },
  {
    id: "five_rituals",
    emoji: "\ud83c\udf1f",
    name: "Practicante",
    description: "5 rituales completados",
    check: (i) => i.ritualsCount >= 5,
  },
  {
    id: "premium_seeker",
    emoji: "\u2b50",
    name: "Buscador Premium",
    description: "Desbloqueaste contenido Premium",
    check: (i) => i.hasPremium,
  },
  {
    id: "deep_mystic",
    emoji: "\ud83c\udf0c",
    name: "Mistico Profundo",
    description: "Desbloqueaste contenido Deep",
    check: (i) => i.hasDeep,
  },
  {
    id: "streak_3",
    emoji: "\ud83d\udd25",
    name: "Llama Interior",
    description: "3 dias seguidos de practica espiritual",
    check: (i) => i.streakLongest >= 3,
  },
  {
    id: "streak_7",
    emoji: "\ud83d\udc8e",
    name: "Ciclo Sagrado",
    description: "7 dias seguidos de racha mistica",
    check: (i) => i.streakLongest >= 7,
  },
  {
    id: "all_spreads",
    emoji: "\ud83d\udc51",
    name: "Maestro del Tarot",
    description: "Probaste los 3 tipos de tirada",
    check: (i) => i.spreadTypes.size >= 3,
  },
  {
    id: "ritual_explorer",
    emoji: "\ud83e\udded",
    name: "Explorador Espiritual",
    description: "Rituales de 3+ categorias distintas",
    check: (i) => i.ritualCategories.size >= 3,
  },
];

export function calculateBadges(input: BadgeInput): Badge[] {
  return BADGE_DEFS.map((def) => ({
    id: def.id,
    emoji: def.emoji,
    name: def.name,
    description: def.description,
    unlocked: def.check(input),
  }));
}
