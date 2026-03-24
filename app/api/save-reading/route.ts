import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { nullifier_hash, spread_type, cards, interpretation } = await req.json();
    if (!nullifier_hash || !spread_type || !cards) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { error } = await getSupabaseAdmin()
      .from("tarot_readings")
      .insert({
        nullifier_hash,
        spread_type,
        cards,
        interpretation: interpretation || null,
      });

    if (error) {
      console.error("Save reading error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save reading error:", error);
    return NextResponse.json({ error: "Failed to save reading" }, { status: 500 });
  }
}
