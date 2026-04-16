import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const wallet = req.nextUrl.searchParams.get("wallet");
    if (!wallet) {
      return NextResponse.json({ error: "Missing wallet" }, { status: 400 });
    }

    const { data } = await getSupabaseAdmin()
      .from("mystic_nicknames")
      .select("nickname")
      .eq("nullifier_hash", wallet)
      .single();

    return NextResponse.json({ nickname: data?.nickname || null });
  } catch (error) {
    console.error("Nickname GET error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { wallet_address, nickname } = await req.json();
    if (!wallet_address || !nickname) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const trimmed = nickname.trim().slice(0, 20);

    const { error } = await getSupabaseAdmin()
      .from("mystic_nicknames")
      .upsert(
        { nullifier_hash: wallet_address, nickname: trimmed, updated_at: new Date().toISOString() },
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
