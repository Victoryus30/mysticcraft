import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { nullifier_hash } = await req.json();
    if (!nullifier_hash) {
      return NextResponse.json({ error: "Missing nullifier" }, { status: 400 });
    }

    // Consultas en paralelo
    const [readingsRes, ritualsRes, nicknameRes, paymentsRes] = await Promise.all([
      getSupabaseAdmin()
        .from("tarot_readings")
        .select("spread_type, created_at")
        .eq("nullifier_hash", nullifier_hash)
        .order("created_at", { ascending: true }),

      getSupabaseAdmin()
        .from("ritual_completions")
        .select("ritual_slug, completed_at")
        .eq("nullifier_hash", nullifier_hash)
        .order("completed_at", { ascending: true }),

      getSupabaseAdmin()
        .from("mystic_nicknames")
        .select("nickname")
        .eq("nullifier_hash", nullifier_hash)
        .single(),

      getSupabaseAdmin()
        .from("mystic_payments")
        .select("product_type")
        .eq("nullifier_hash", nullifier_hash)
        .eq("status", "confirmed"),
    ]);

    const readings = readingsRes.data || [];
    const rituals = ritualsRes.data || [];
    const nickname = nicknameRes.data?.nickname || null;
    const payments = paymentsRes.data || [];

    // Fechas de actividad (lecturas + rituales) para calcular racha
    const activityDates = [
      ...readings.map((r) => r.created_at),
      ...rituals.map((r) => r.completed_at),
    ];

    // Tipos de tirada unicos
    const spreadTypes = Array.from(new Set(readings.map((r) => r.spread_type)));

    // Categorias de rituales unicos
    const ritualSlugs = Array.from(new Set(rituals.map((r) => r.ritual_slug)));

    // Pagos: tiene premium o deep
    const hasPremium = payments.some((p) =>
      p.product_type.includes("three") || p.product_type.includes("premium")
    );
    const hasDeep = payments.some((p) =>
      p.product_type.includes("celtic") || p.product_type.includes("deep")
    );

    return NextResponse.json({
      nickname,
      readingsCount: readings.length,
      ritualsCount: rituals.length,
      activityDates,
      spreadTypes,
      ritualSlugs,
      hasPremium,
      hasDeep,
    });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }
}
