import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { nullifier_hash, nickname } = await req.json();
    if (!nullifier_hash || !nickname) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const trimmed = nickname.trim().slice(0, 20);

    const { error } = await supabaseAdmin
      .from("mystic_nicknames")
      .upsert(
        { nullifier_hash, nickname: trimmed, updated_at: new Date().toISOString() },
        { onConflict: "nullifier_hash" }
      );

    if (error) {
      console.error("Nickname save error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true, nickname: trimmed });
  } catch (error) {
    console.error("Nickname error:", error);
    return NextResponse.json({ error: "Failed to save nickname" }, { status: 500 });
  }
}
