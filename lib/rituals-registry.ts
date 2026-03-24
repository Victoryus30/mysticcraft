import { Ritual } from "./types";

export const RITUALS: Ritual[] = [
  {
    slug: "limpieza",
    name: "Limpieza Energetica",
    emoji: "\ud83e\uddf9",
    category: "proteccion",
    description: "Limpia tu campo energetico de vibraciones negativas y renueva tu aura con esta practica ancestral.",
    durationMinutes: 5,
    price: 0,
    tier: "free",
    materials: ["Una vela blanca", "Sal de mar (opcional)", "Incienso o sahumerio (opcional)"],
    steps: [
      { order: 1, instruction: "Encuentra un lugar tranquilo. Sientate comodo y cierra los ojos. Respira profundo 3 veces: inhala por la nariz en 4 tiempos, exhala por la boca en 6 tiempos.", durationSeconds: 45, icon: "\ud83e\uddd8" },
      { order: 2, instruction: "Visualiza una luz blanca brillante que desciende desde arriba y entra por tu coronilla. Siente como llena cada parte de tu cuerpo.", durationSeconds: 40, icon: "\u2728" },
      { order: 3, instruction: "Imagina que esa luz empuja toda energia oscura o pesada hacia abajo, saliendo por tus pies y siendo absorbida por la tierra.", durationSeconds: 45, icon: "\ud83c\udf1f" },
      { order: 4, instruction: "Repite en voz baja o mentalmente: 'Libero lo que no me pertenece. Me lleno de luz y proteccion. Mi energia es limpia y poderosa.'", durationSeconds: 40, icon: "\ud83d\udcac" },
      { order: 5, instruction: "Siente tu cuerpo ligero y renovado. Abre los ojos lentamente. Sacude tus manos 3 veces para sellar la limpieza.", durationSeconds: 30, icon: "\ud83d\ude4f" },
    ],
  },
  {
    slug: "abundancia",
    name: "Ritual de Abundancia",
    emoji: "\ud83d\udcb0",
    category: "prosperidad",
    description: "Activa la energia de la prosperidad y abre los canales para recibir abundancia en todas sus formas.",
    durationMinutes: 7,
    price: 0,
    tier: "free",
    materials: ["Una moneda dorada o amarilla", "Canela en polvo (opcional)", "Papel y lapiz"],
    steps: [
      { order: 1, instruction: "Escribe en el papel tu intencion de abundancia. Se especifico: que tipo de abundancia deseas? Dinero, oportunidades, salud, amor?", durationSeconds: 60, icon: "\u270d\ufe0f" },
      { order: 2, instruction: "Sostiene la moneda en tu mano dominante. Cierra los ojos y visualiza tu vida llena de esa abundancia. Siente la emocion como si ya la tuvieras.", durationSeconds: 50, icon: "\ud83d\udcb0" },
      { order: 3, instruction: "Repite 7 veces: 'Soy un iman para la abundancia. El universo conspira a mi favor. La prosperidad fluye hacia mi naturalmente.'", durationSeconds: 60, icon: "\ud83d\udcac" },
      { order: 4, instruction: "Si tienes canela, espolvorea un poco sobre el papel con tu intencion. La canela activa la energia del dinero y la suerte.", durationSeconds: 40, icon: "\u2728" },
      { order: 5, instruction: "Dobla el papel hacia ti (simboliza atraer) 3 veces. Guardalo en tu cartera o bajo tu almohada por 7 dias.", durationSeconds: 40, icon: "\ud83c\udf1f" },
      { order: 6, instruction: "Agradece al universo con las manos en el corazon: 'Gracias por la abundancia que ya esta en camino.' Respira profundo y abre los ojos.", durationSeconds: 45, icon: "\ud83d\ude4f" },
    ],
  },
  {
    slug: "proteccion",
    name: "Escudo de Proteccion",
    emoji: "\ud83d\udee1\ufe0f",
    category: "proteccion",
    description: "Crea un escudo energetico invisible que te protege de energias negativas, envidias y malas vibras.",
    durationMinutes: 10,
    price: 0.5,
    tier: "premium",
    materials: ["Una vela blanca o morada", "Sal de mar", "Agua en un vaso"],
    steps: [
      { order: 1, instruction: "Enciende la vela y coloca el vaso con agua y un poco de sal a tu lado. Estos elementos absorben las energias negativas.", durationSeconds: 30, icon: "\ud83d\udd6f\ufe0f" },
      { order: 2, instruction: "Sientate con la espalda recta. Cierra los ojos. Inhala profundo 5 veces, cada vez mas lento. Siente tu cuerpo pesado y enraizado.", durationSeconds: 60, icon: "\ud83e\uddd8" },
      { order: 3, instruction: "Visualiza raices creciendo desde tus pies hasta el centro de la tierra. Siente la fuerza y estabilidad de la tierra sosteniendote.", durationSeconds: 50, icon: "\ud83c\udf33" },
      { order: 4, instruction: "Ahora visualiza una esfera dorada que nace en tu pecho y crece hasta envolver todo tu cuerpo. Es tu escudo. Nada negativo puede atravesarlo.", durationSeconds: 60, icon: "\ud83d\udee1\ufe0f" },
      { order: 5, instruction: "Refuerza tu escudo con palabras de poder: 'Estoy protegido/a. Nada ni nadie puede dannar mi energia. Mi escudo es inquebrantable.'", durationSeconds: 50, icon: "\ud83d\udcac" },
      { order: 6, instruction: "Visualiza que tu escudo brilla con mas fuerza. Agrega un color: dorado para proteccion divina, morado para proteccion espiritual, blanco para pureza.", durationSeconds: 50, icon: "\u2728" },
      { order: 7, instruction: "Sella tu proteccion tocando tu frente, tu corazon y tu ombligo con tu mano dominante. Di: 'Sellado esta. Asi sea.'", durationSeconds: 40, icon: "\ud83c\udf1f" },
      { order: 8, instruction: "Abre los ojos. Desecha el agua con sal en el bano (absorbe lo negativo). Tu escudo estara activo por 24-48 horas.", durationSeconds: 45, icon: "\ud83d\ude4f" },
    ],
  },
  {
    slug: "amor",
    name: "Atraccion de Amor",
    emoji: "\u2764\ufe0f",
    category: "amor",
    description: "Abre tu corazon a nuevas conexiones romanticas y fortalece el amor propio como base de todo vinculo.",
    durationMinutes: 10,
    price: 0.5,
    tier: "premium",
    materials: ["Una vela rosa o roja", "Petalos de rosa o flor (opcionales)", "Miel (una cucharadita)"],
    steps: [
      { order: 1, instruction: "Enciende la vela rosa (amor tierno) o roja (pasion). Coloca los petalos a tu alrededor si los tienes.", durationSeconds: 30, icon: "\ud83d\udd6f\ufe0f" },
      { order: 2, instruction: "Pon tu mano sobre tu corazon. Siente tu pulso. Ese ritmo es la frecuencia del amor. Sincronizate con el.", durationSeconds: 50, icon: "\u2764\ufe0f" },
      { order: 3, instruction: "Repite: 'Me amo profundamente. Soy digno/a de un amor real, sano y reciproco. Mi corazon esta abierto para dar y recibir.'", durationSeconds: 50, icon: "\ud83d\udcac" },
      { order: 4, instruction: "Visualiza a tu yo ideal en una relacion. No visualices a una persona especifica — visualiza la ENERGIA del amor que deseas sentir.", durationSeconds: 60, icon: "\ud83e\udde1" },
      { order: 5, instruction: "Siente esa emocion en tu pecho: calidez, seguridad, alegria, conexion. Amplificala. El universo responde a la emocion, no a las palabras.", durationSeconds: 60, icon: "\u2728" },
      { order: 6, instruction: "Si tienes miel, pon una gota en tu dedo y tocala con la lengua. La miel endulza tus palabras y tu energia amorosa.", durationSeconds: 30, icon: "\ud83c\udf6f" },
      { order: 7, instruction: "Cierra con gratitud: 'Gracias universo por el amor que ya viene hacia mi. Confio en el timing divino.' Sopla la vela con suavidad.", durationSeconds: 45, icon: "\ud83d\ude4f" },
    ],
  },
  {
    slug: "corte-lazos",
    name: "Corte de Lazos Toxicos",
    emoji: "\u2702\ufe0f",
    category: "sanacion",
    description: "Liberate de vinculos energeticos daninos con personas, situaciones o patrones que ya no te sirven.",
    durationMinutes: 15,
    price: 1.0,
    tier: "deep",
    materials: ["Una vela negra o blanca", "Hilo o cordon", "Tijeras", "Papel"],
    steps: [
      { order: 1, instruction: "Escribe en el papel el nombre de la persona o situacion de la que deseas liberarte. Se honesto contigo mismo.", durationSeconds: 60, icon: "\u270d\ufe0f" },
      { order: 2, instruction: "Ata el hilo a tu muneca izquierda (mano receptiva) de forma floja. El otro extremo ponlo sobre el papel. Esto simboliza el lazo.", durationSeconds: 40, icon: "\ud83e\uddf5" },
      { order: 3, instruction: "Cierra los ojos. Respira profundo. Visualiza a esa persona o situacion frente a ti, conectada por un cordon de energia.", durationSeconds: 50, icon: "\ud83e\uddd8" },
      { order: 4, instruction: "Sin rencor ni odio, di: 'Reconozco lo que vivimos. Agradezco la leccion. Pero este lazo ya no me sirve y elijo soltarlo con amor.'", durationSeconds: 60, icon: "\ud83d\udcac" },
      { order: 5, instruction: "Visualiza unas tijeras doradas cortando el cordon de energia entre ustedes. Siente como la tension se libera de tu cuerpo.", durationSeconds: 60, icon: "\u2702\ufe0f" },
      { order: 6, instruction: "Toma las tijeras reales y corta el hilo de tu muneca. Siente la liberacion fisica. Respira profundo.", durationSeconds: 30, icon: "\u2728" },
      { order: 7, instruction: "Di: 'Te libero y me libero. Cada uno sigue su camino. No hay deuda ni atadura. Estoy libre.'", durationSeconds: 50, icon: "\ud83d\udcac" },
      { order: 8, instruction: "Visualiza una luz verde sanadora llenando el espacio donde estaba el lazo. Tu energia se repara y se fortalece.", durationSeconds: 60, icon: "\ud83d\udc9a" },
      { order: 9, instruction: "Arruga el papel y tiralo a la basura o quemalo de forma segura. Esto sella el corte.", durationSeconds: 40, icon: "\ud83d\udd25" },
      { order: 10, instruction: "Cierra con las manos en el corazon: 'Soy libre. Soy completo/a. Mi energia es solo mia.' Respira 3 veces y abre los ojos.", durationSeconds: 50, icon: "\ud83d\ude4f" },
    ],
  },
  {
    slug: "luna-llena",
    name: "Ritual de Luna Llena",
    emoji: "\ud83c\udf15",
    category: "manifestacion",
    description: "Aprovecha la poderosa energia de la luna llena para manifestar tus deseos y liberar lo que te frena.",
    durationMinutes: 15,
    price: 1.0,
    tier: "deep",
    materials: ["Una vela plateada o blanca", "Papel y lapiz", "Un espejo pequeno (opcional)", "Agua"],
    steps: [
      { order: 1, instruction: "Idealmente hazlo de noche cuando puedas ver la luna (o visualizala). Enciende la vela y coloca el espejo para reflejar su luz.", durationSeconds: 40, icon: "\ud83c\udf15" },
      { order: 2, instruction: "Carga tu vaso de agua a la luz de la luna (real o visualizada). El agua absorbe la energia lunar. La beberas al final.", durationSeconds: 40, icon: "\ud83d\udca7" },
      { order: 3, instruction: "Escribe en el papel dos listas: 1) Lo que deseo manifestar. 2) Lo que deseo soltar y liberar.", durationSeconds: 90, icon: "\u270d\ufe0f" },
      { order: 4, instruction: "Lee en voz alta tu lista de SOLTAR. Despues de cada punto, di: 'Lo suelto con amor. Ya no tiene poder sobre mi.'", durationSeconds: 70, icon: "\ud83d\udcac" },
      { order: 5, instruction: "Rompe o arruga la parte de la lista de soltar. Tirala o quemala de forma segura. Siente la liberacion.", durationSeconds: 40, icon: "\ud83d\udd25" },
      { order: 6, instruction: "Ahora lee tu lista de MANIFESTAR. Despues de cada punto, di: 'Esto o algo mejor ya esta en camino. Confio en el universo.'", durationSeconds: 70, icon: "\u2728" },
      { order: 7, instruction: "Mira la luna (o visualizala). Imagina que su luz plateada bana cada uno de tus deseos, cargandolos con poder cosmico.", durationSeconds: 60, icon: "\ud83c\udf19" },
      { order: 8, instruction: "Guarda la lista de manifestacion bajo tu almohada o en un lugar especial. Revisala en la proxima luna llena.", durationSeconds: 30, icon: "\ud83d\udcdc" },
      { order: 9, instruction: "Bebe el agua cargada con luna. Siente la energia lunar nutriendo cada celula de tu cuerpo.", durationSeconds: 40, icon: "\ud83d\udca7" },
      { order: 10, instruction: "Cierra: 'Gracias luna por tu luz y poder. Lo que solte ya se fue. Lo que pedi ya viene. Asi es, asi sera.' Sopla la vela.", durationSeconds: 50, icon: "\ud83d\ude4f" },
    ],
  },
];

export function getRitual(slug: string): Ritual | undefined {
  return RITUALS.find((r) => r.slug === slug);
}

export function getRitualsByCategory(category: string): Ritual[] {
  return RITUALS.filter((r) => r.category === category);
}

export function getFreeRituals(): Ritual[] {
  return RITUALS.filter((r) => r.price === 0);
}
