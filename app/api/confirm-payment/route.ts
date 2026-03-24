import { NextRequest, NextResponse } from "next/server";
import { MiniAppPaymentPayload } from "@worldcoin/minikit-js";

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as MiniAppPaymentPayload;
    // En produccion: verificar transaccion on-chain y actualizar Supabase
    if (payload.status === "success") {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 400 });
  } catch (error: unknown) {
    console.error("Confirm payment error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
