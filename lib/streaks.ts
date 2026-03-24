/**
 * Calcula la racha (streak) de días consecutivos con tests completados.
 * Se basa en las fechas `created_at` de los resultados del usuario.
 */

export interface StreakInfo {
  current: number;     // días consecutivos actuales
  longest: number;     // racha más larga histórica
  isActiveToday: boolean; // ¿completó algo hoy?
}

export function calculateStreak(dates: string[]): StreakInfo {
  if (dates.length === 0) {
    return { current: 0, longest: 0, isActiveToday: false };
  }

  // Convertir a fechas únicas (solo día, en timezone local)
  const dayStrings = dates.map((d) => {
    const date = new Date(d);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  });
  const uniqueDays = Array.from(new Set(dayStrings)).sort();

  // Hoy como string
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  const isActiveToday = uniqueDays.includes(today);

  // Calcular rachas
  let current = 0;
  let longest = 0;
  let tempStreak = 1;

  // Recorrer días de más reciente a más antiguo
  const sorted = [...uniqueDays].sort().reverse();

  // La racha actual se calcula desde hoy/ayer hacia atrás
  const startDay = isActiveToday ? today : yesterdayStr();
  let checkDay = startDay;

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === checkDay) {
      current++;
      checkDay = prevDayStr(checkDay);
    } else if (sorted[i] < checkDay) {
      break;
    }
  }

  // Si no empezó hoy ni ayer, racha = 0
  if (!isActiveToday && !uniqueDays.includes(yesterdayStr())) {
    current = 0;
  }

  // Calcular racha más larga
  for (let i = 1; i < uniqueDays.length; i++) {
    const prev = new Date(uniqueDays[i - 1]);
    const curr = new Date(uniqueDays[i]);
    const diffMs = curr.getTime() - prev.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      tempStreak++;
    } else {
      tempStreak = 1;
    }
    if (tempStreak > longest) longest = tempStreak;
  }

  if (uniqueDays.length === 1) longest = 1;
  if (tempStreak > longest) longest = tempStreak;
  if (current > longest) longest = current;

  return { current, longest, isActiveToday };
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function prevDayStr(dayStr: string): string {
  const d = new Date(dayStr + "T12:00:00");
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
