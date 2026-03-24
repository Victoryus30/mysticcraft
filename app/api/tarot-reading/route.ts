import { NextRequest, NextResponse } from "next/server";

interface CardInput {
  position: string;
  card_name: string;
  reversed: boolean;
  meaning: string;
  keywords: string[];
}

export async function POST(req: NextRequest) {
  try {
    const { spread_type, cards, nullifier_hash } = await req.json() as {
      spread_type: string;
      cards: CardInput[];
      nullifier_hash: string | null;
    };

    // Construir prompt para IA
    const cardsDescription = cards
      .map(
        (c: CardInput) =>
          `- Posicion "${c.position}": ${c.card_name}${c.reversed ? " (INVERTIDA)" : ""} — ${c.meaning}`
      )
      .join("\n");

    const spreadLabel = spread_type === "three" ? "Tirada de 3 Cartas" : "Cruz Celta";

    const prompt = `Eres una tarotista mistica y sabia. Interpreta esta ${spreadLabel} de tarot de forma personalizada, profunda y empatica. Habla en espanol, tutea al consultante, usa un tono calido pero mistico.

Cartas:
${cardsDescription}

Instrucciones:
- Conecta las cartas entre si, no las interpretes aisladas
- Si hay cartas invertidas, mencionalo con tacto
- Da un consejo final accionable
- Usa maximo 250 palabras
- No uses formato markdown, escribe en prosa fluida
- Incluye al final una frase mistica como cierre (ej: "Los astros iluminan tu camino")`;

    // Llamar a OpenAI (o el proveedor que se configure)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback: interpretacion estatica si no hay API key
      const fallback = generateFallbackInterpretation(cards, spreadLabel);
      return NextResponse.json({ interpretation: fallback });
    }

    const aiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.8,
      }),
    });

    if (!aiRes.ok) {
      const fallback = generateFallbackInterpretation(cards, spreadLabel);
      return NextResponse.json({ interpretation: fallback });
    }

    const aiData = await aiRes.json();
    const interpretation = aiData.choices?.[0]?.message?.content || generateFallbackInterpretation(cards, spreadLabel);

    // TODO: Guardar en Supabase (tarot_readings table)

    return NextResponse.json({ interpretation });
  } catch (error) {
    console.error("Tarot reading error:", error);
    return NextResponse.json(
      { error: "Error generando la interpretacion" },
      { status: 500 }
    );
  }
}

/** Genera interpretacion basica sin IA */
function generateFallbackInterpretation(cards: CardInput[], spreadLabel: string): string {
  const lines = cards.map((c) => {
    const direction = c.reversed ? "invertida" : "al derecho";
    return `En la posicion "${c.position}" aparece ${c.card_name} (${direction}). ${c.meaning}`;
  });

  return `${spreadLabel}\n\n${lines.join("\n\n")}\n\nRecuerda que el tarot es una guia, no un destino fijo. Las cartas iluminan posibilidades, pero tu libre albedrio es el que traza el camino. Que la sabiduria de los arcanos te acompane.`;
}
