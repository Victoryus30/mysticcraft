import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Deprecated. Use wallet-based identification instead." },
    { status: 410 }
  );
}
