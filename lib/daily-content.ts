import { getMoonPhase } from "./moon-phases";
import { MoonPhase } from "./types";

/**
 * Generador de contenido diario determinista.
 * Usa la fecha como seed para que el contenido sea el mismo todo el dia
 * pero cambie al dia siguiente.
 */

interface DailyContent {
  title: string;
  emoji: string;
  category: string;
  content: string;
  affirmation: string;
  moonPhase: MoonPhase;
}

const SPELLS = [
  { title: "Proteccion matutina", emoji: "\ud83d\udee1\ufe0f", category: "proteccion", content: "Al despertar, antes de tocar tu telefono, coloca tu mano derecha sobre tu pecho y di: 'Hoy estoy protegido/a. Nada ni nadie puede afectar mi energia.' Visualiza un escudo dorado a tu alrededor.", affirmation: "Mi energia es inquebrantable." },
  { title: "Iman de abundancia", emoji: "\ud83d\udcb0", category: "prosperidad", content: "Lleva una moneda en tu bolsillo izquierdo todo el dia. Cada vez que la toques, repite mentalmente: 'El dinero fluye hacia mi con facilidad.' La moneda se carga con tu intencion.", affirmation: "Soy un iman para la prosperidad." },
  { title: "Limpieza con sal", emoji: "\ud83e\uddff", category: "limpieza", content: "Coloca un vaso con agua y sal gruesa detras de tu puerta principal. Dejalo 24 horas y luego desecha el agua en el bano. La sal absorbe las energias negativas que intentan entrar.", affirmation: "Mi espacio esta limpio y protegido." },
  { title: "Conexion con la tierra", emoji: "\ud83c\udf3f", category: "equilibrio", content: "Si puedes, camina descalzo sobre pasto o tierra durante 5 minutos. Si no, visualiza raices creciendo de tus pies al centro de la tierra. Esto te conecta y estabiliza tu energia.", affirmation: "Estoy enraizado/a y en equilibrio." },
  { title: "Espejo de amor propio", emoji: "\ud83d\udc96", category: "amor", content: "Mirate al espejo y di 3 cosas que amas de ti (fisicas, emocionales o espirituales). Hazlo con conviccion, no con verguenza. El amor propio es la base de todo.", affirmation: "Me amo profunda e incondicionalmente." },
  { title: "Vela de intencion", emoji: "\ud83d\udd6f\ufe0f", category: "manifestacion", content: "Enciende una vela (del color que sientas) y mientras la miras, declara en voz alta tu intencion mas importante para esta semana. La llama amplifica tu voluntad.", affirmation: "Mi intencion es clara y poderosa." },
  { title: "Bano de luna", emoji: "\ud83c\udf19", category: "renovacion", content: "Esta noche, si puedes ver la luna, parate bajo su luz 3 minutos. Respira profundo y siente como su energia plateada limpia y recarga tu aura.", affirmation: "La luna renueva mi espiritu." },
  { title: "Gratitud triple", emoji: "\ud83d\ude4f", category: "abundancia", content: "Escribe 3 cosas por las que estas agradecido/a hoy. No las pienses, sientelas. La gratitud abre los canales para recibir mas abundancia.", affirmation: "Agradezco todo lo que tengo y lo que viene." },
  { title: "Respiracion de fuego", emoji: "\ud83d\udd25", category: "energia", content: "Haz 10 respiraciones rapidas por la nariz (inhala y exhala fuerte). Esto activa tu energia vital y despeja la mente. Hazlo en un lugar donde puedas estar en paz.", affirmation: "Mi energia vital esta encendida." },
  { title: "Mantra de la manana", emoji: "\ud83d\udcab", category: "poder", content: "Repite 21 veces (usa los dedos para contar): 'Om Gam Ganapataye Namaha'. Este mantra remueve obstaculos y abre caminos. No importa si no lo pronuncias perfecto.", affirmation: "Los obstaculos se disuelven ante mi." },
  { title: "Agua solar", emoji: "\u2600\ufe0f", category: "vitalidad", content: "Deja un vaso de agua bajo el sol de la manana por 30 minutos. Bebela despacio, sintiendo la energia solar nutriendo cada celula. El agua se carga con vitalidad.", affirmation: "Estoy lleno/a de vitalidad y luz." },
  { title: "Cordon de proteccion", emoji: "\ud83e\uddf5", category: "proteccion", content: "Amarra un hilo rojo en tu muneca izquierda con 7 nudos. En cada nudo, pide proteccion contra algo especifico: envidia, malas energias, accidentes, etc.", affirmation: "Estoy blindado/a contra toda negatividad." },
  { title: "Decretos de poder", emoji: "\u26a1", category: "manifestacion", content: "Parate frente al espejo con postura de poder (hombros atras, pecho arriba). Di en voz alta: 'Yo decreto que hoy es un dia de exito, abundancia y proteccion para mi.'", affirmation: "Mis palabras crean mi realidad." },
  { title: "Piedra de anclaje", emoji: "\ud83e\udea8", category: "equilibrio", content: "Busca una piedra pequena y llevala contigo todo el dia. Cuando sientas ansiedad, aprieta la piedra y transfiere tu preocupacion a ella. Al llegar a casa, lavala con agua.", affirmation: "Tengo un ancla de paz siempre conmigo." },
  { title: "Cierre energetico nocturno", emoji: "\ud83c\udf03", category: "limpieza", content: "Antes de dormir, imagina que cierras una puerta dorada detras de ti, sellando tu dia. Di: 'Lo que paso hoy se queda en hoy. Manana es un lienzo limpio.'", affirmation: "Duermo en paz, manana renazco." },
  { title: "Visualizacion de futuro", emoji: "\ud83d\udd2e", category: "manifestacion", content: "Cierra los ojos 5 minutos y visualiza tu vida ideal dentro de 1 ano. Siente las emociones como si ya fuera real. La visualizacion programa tu subconsciente.", affirmation: "Mi futuro ideal ya se esta manifestando." },
  { title: "Perdon liberador", emoji: "\ud83d\udc9a", category: "sanacion", content: "Piensa en alguien que te haya herido. Di mentalmente: 'Te perdono y me libero. Tu dolor ya no vive en mi.' El perdon no es para ellos, es para tu paz.", affirmation: "Perdono y me libero de todo rencor." },
  { title: "Musica sanadora", emoji: "\ud83c\udfb6", category: "armonia", content: "Escucha musica a 432Hz o 528Hz durante 10 minutos con los ojos cerrados. Estas frecuencias armonizan tu campo energetico y reducen el estres.", affirmation: "Mi cuerpo y mente vibran en armonia." },
  { title: "Ofrenda al universo", emoji: "\ud83c\udf3a", category: "gratitud", content: "Ofrece algo al universo: puede ser una flor en tu ventana, unas gotas de miel en la tierra, o simplemente una sonrisa genuina a un extrano.", affirmation: "Doy con el corazon y recibo multiplicado." },
  { title: "Sellado de chakras", emoji: "\ud83d\udd34", category: "proteccion", content: "Toca con tu mano cada punto energetico: coronilla, frente, garganta, corazon, ombligo, vientre bajo y base de columna. En cada punto di: 'Sellado y protegido.'", affirmation: "Mis centros de energia estan equilibrados." },
  { title: "Carta al universo", emoji: "\u2709\ufe0f", category: "manifestacion", content: "Escribe una carta al universo como si fuera tu amigo mas poderoso. Cuentale que necesitas, agradecele lo que ya te dio, y confiale tus suenos.", affirmation: "El universo me escucha y responde." },
];

/** Genera contenido diario determinista basado en la fecha */
export function getDailySpell(date: Date = new Date()): DailyContent {
  // Seed basado en fecha (dia del ano)
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = dayOfYear % SPELLS.length;
  const spell = SPELLS[index];

  return {
    ...spell,
    moonPhase: getMoonPhase(date),
  };
}
