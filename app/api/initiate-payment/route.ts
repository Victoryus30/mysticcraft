import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { product_id, nullifier_hash } = await req.json();
    const id = uuidv4();
    // En produccion: guardar en Supabase con product_id, nullifier_hash, status: "pending"
    return NextResponse.json({ id });
  } catch (error: unknown) {
    console.error("Initiate payment error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
