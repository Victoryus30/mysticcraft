import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { nullifier_hash, ritual_slug } = await req.json();
    if (!nullifier_hash || !ritual_slug) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("ritual_completions")
      .insert({ nullifier_hash, ritual_slug });

    if (error) {
      console.error("Save ritual error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save ritual error:", error);
    return NextResponse.json({ error: "Failed to save ritual" }, { status: 500 });
  }
}
