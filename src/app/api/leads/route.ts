import { NextResponse } from "next/server";
import { Resend } from "resend";
import { handleLeadSubmission } from "@/lib/leads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : undefined;

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || null;

  const result = await handleLeadSubmission(payload, {
    emailClient: resend,
    ip,
  });

  return NextResponse.json(result, { status: result.status });
}
