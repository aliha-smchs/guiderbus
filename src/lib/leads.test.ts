import { describe, expect, it, vi } from "vitest";
import { handleLeadSubmission, leadSchema, type EmailClient } from "./leads";

const validContact = {
  type: "contact",
  name: "Aisha Khan",
  email: "aisha@example.com",
  company: "Northstar Clinic",
  phone: "+971500000000",
  service: "WhatsApp Automation & Bots",
  budget: "$2,500 - $7,500",
  timeline: "This month",
  message: "We want to automate appointment reminders and common questions.",
  turnstileToken: "token",
};

const env = {
  NODE_ENV: "production",
  TURNSTILE_SECRET_KEY: "secret",
  RESEND_API_KEY: "resend",
  LEAD_TO_EMAIL: "contact@guiderbus.com",
  LEAD_FROM_EMAIL: "Guiderbus <contact@guiderbus.com>",
} as const;

function okTurnstile() {
  return vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }),
  ) as unknown as typeof fetch;
}

function emailClient(result: { data?: unknown; error?: unknown } = { data: { id: "email" } }) {
  return {
    emails: {
      send: vi.fn().mockResolvedValue(result),
    },
  } satisfies EmailClient;
}

describe("leadSchema", () => {
  it("accepts a complete contact request", () => {
    expect(leadSchema.safeParse(validContact).success).toBe(true);
  });

  it("accepts a waitlist request without a message", () => {
    expect(
      leadSchema.safeParse({
        type: "waitlist",
        name: "Omar Saleh",
        email: "omar@example.com",
        company: "Atlas Ops",
      }).success,
    ).toBe(true);
  });

  it("rejects invalid email, missing contact message, and invalid lead type", () => {
    expect(
      leadSchema.safeParse({
        ...validContact,
        email: "not-an-email",
      }).success,
    ).toBe(false);

    expect(
      leadSchema.safeParse({
        ...validContact,
        message: "",
      }).success,
    ).toBe(false);

    expect(
      leadSchema.safeParse({
        ...validContact,
        type: "newsletter",
      }).success,
    ).toBe(false);
  });
});

describe("handleLeadSubmission", () => {
  it("sends a valid lead email after Turnstile verification", async () => {
    const mailer = emailClient();
    const result = await handleLeadSubmission(validContact, {
      env,
      fetcher: okTurnstile(),
      emailClient: mailer,
    });

    expect(result.ok).toBe(true);
    expect(result.status).toBe(200);
    expect(mailer.emails.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "contact@guiderbus.com",
        replyTo: "aisha@example.com",
      }),
    );
  });

  it("returns a safe error when Turnstile verification fails", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: false }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ) as unknown as typeof fetch;

    const result = await handleLeadSubmission(validContact, {
      env,
      fetcher,
      emailClient: emailClient(),
    });

    expect(result).toMatchObject({
      ok: false,
      status: 400,
      message: "Spam protection check failed.",
    });
  });

  it("returns a safe error when Resend delivery fails", async () => {
    const result = await handleLeadSubmission(validContact, {
      env,
      fetcher: okTurnstile(),
      emailClient: emailClient({ error: { message: "Nope" } }),
    });

    expect(result.ok).toBe(false);
    expect(result.status).toBe(502);
    expect(result.message).toContain("Email contact@guiderbus.com directly");
  });
});
