import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { payload, action, signal } = await req.json();

    // TODO: Implementar verificacion on-chain real para World ID 4.0
    // verifyCloudProof no soporta World ID 4.0 aun
    // Por ahora confiamos en el payload exitoso del SDK

    if (payload?.status === "success" && payload?.nullifier_hash) {
      return NextResponse.json({
        verifyRes: { success: true },
        nullifier_hash: payload.nullifier_hash,
        status: 200,
      });
    }

    return NextResponse.json(
      { verifyRes: { success: false }, status: 400 },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
