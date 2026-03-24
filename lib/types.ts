// =============================================
// TIPOS DEL SISTEMA MYSTICCRAFT
// =============================================

// --- TAROT ---

export type Arcana = "major" | "minor";
export type Suit = "wands" | "cups" | "swords" | "pentacles" | null;
export type Element = "fire" | "water" | "air" | "earth" | null;

export interface TarotCard {
  id: number;
  name: string;
  nameEs: string;
  arcana: Arcana;
  suit: Suit;
  element: Element;
  number: number;
  keywords: string[];
  meaningUpright: string;
  meaningReversed: string;
  imageSlug: string;
}

export interface DrawnCard {
  position: number;
  positionLabel: string;
  card: TarotCard;
  reversed: boolean;
}

export type SpreadType = "single" | "three" | "celtic";

export interface TarotSpread {
  type: SpreadType;
  name: string;
  nameEs: string;
  description: string;
  cardCount: number;
  positions: string[];
  price: number;       // 0 = gratis
  tier: "free" | "premium" | "deep";
}

export interface TarotReading {
  id: string;
  spread: SpreadType;
  cards: DrawnCard[];
  interpretation: string | null;
  createdAt: string;
}

// --- RITUALES ---

export type RitualCategory = "proteccion" | "prosperidad" | "amor" | "sanacion" | "manifestacion";

export interface RitualStep {
  order: number;
  instruction: string;
  durationSeconds: number;
  icon: string;
}

export interface Ritual {
  slug: string;
  name: string;
  emoji: string;
  category: RitualCategory;
  description: string;
  durationMinutes: number;
  price: number;
  tier: "free" | "premium" | "deep";
  materials: string[];
  steps: RitualStep[];
}

// --- ZODIACO ---

export type ZodiacSign =
  | "aries" | "tauro" | "geminis" | "cancer"
  | "leo" | "virgo" | "libra" | "escorpio"
  | "sagitario" | "capricornio" | "acuario" | "piscis";

export interface ZodiacInfo {
  sign: ZodiacSign;
  name: string;
  emoji: string;
  element: "fuego" | "tierra" | "aire" | "agua";
  dateRange: string;
  ruling: string;
}

export interface CompatibilityResult {
  sign1: ZodiacSign;
  sign2: ZodiacSign;
  score: number;        // 0-100
  loveScore: number;
  friendScore: number;
  workScore: number;
  summary: string;
}

// --- LUNA ---

export type MoonPhase =
  | "new" | "waxing_crescent" | "first_quarter" | "waxing_gibbous"
  | "full" | "waning_gibbous" | "last_quarter" | "waning_crescent";

export interface MoonPhaseInfo {
  phase: MoonPhase;
  nameEs: string;
  emoji: string;
  energy: string;
  recommendation: string;
}

// --- CONTENIDO DIARIO ---

export interface DailySpell {
  id: string;
  title: string;
  emoji: string;
  category: string;
  content: string;
  affirmation: string;
  moonPhase: MoonPhase;
}

// --- PAGOS / USUARIO ---

export interface PaymentRecord {
  id: string;
  nullifierHash: string;
  productType: string;
  amount: number;
  txHash: string | null;
  status: "pending" | "confirmed" | "failed";
  createdAt: string;
}

export interface UserProfile {
  nullifierHash: string;
  nickname: string | null;
  zodiacSign: ZodiacSign | null;
  totalReadings: number;
  totalRituals: number;
  streak: number;
  badges: string[];
}
