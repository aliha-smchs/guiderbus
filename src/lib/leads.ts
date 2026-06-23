import { z } from "zod";

export const leadTypes = ["contact", "waitlist"] as const;
export type LeadType = (typeof leadTypes)[number];

const optionalText = (max: number) =>
  z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    z.string().trim().max(max).optional(),
  );

export const leadSchema = z
  .object({
    type: z.enum(leadTypes),
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(180),
    company: optionalText(120),
    phone: optionalText(60),
    service: optionalText(120),
    budget: optionalText(80),
    timeline: optionalText(80),
    message: optionalText(2000),
    turnstileToken: z.preprocess(
      (value) => (value === null || value === "" ? undefined : value),
      z.string().trim().optional(),
    ),
  })
  .superRefine((data, ctx) => {
    if (data.type === "contact" && (!data.message || data.message.length < 10)) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "Tell us what you want to automate.",
      });
    }
  });

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

type Env = {
  NODE_ENV?: "development" | "production" | "test";
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  LEAD_TO_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
};

type Fetcher = typeof fetch;

export interface EmailClient {
  emails: {
    send: (payload: {
      from: string;
      to: string | string[];
      subject: string;
      text: string;
      replyTo?: string;
    }) => Promise<{ data?: unknown; error?: unknown }>;
  };
}

export interface LeadSubmissionOptions {
  env?: Env;
  fetcher?: Fetcher;
  emailClient?: EmailClient;
  ip?: string | null;
}

export interface LeadSubmissionResult {
  ok: boolean;
  status: number;
  message: string;
  fieldErrors?: Record<string, string[]>;
}

function getEnv(options?: LeadSubmissionOptions): Env {
  return options?.env ?? process.env;
}

export async function verifyTurnstile(
  token: string | undefined,
  options?: LeadSubmissionOptions,
) {
  const env = getEnv(options);
  const secret = env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return env.NODE_ENV === "production"
      ? { ok: false, message: "Spam protection is not configured." }
      : { ok: true, message: "Spam protection bypassed outside production." };
  }

  if (!token) {
    return { ok: false, message: "Complete the spam protection check." };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (options?.ip) body.set("remoteip", options.ip);

  const fetcher = options?.fetcher ?? fetch;
  const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });

  if (!response.ok) {
    return { ok: false, message: "Spam protection could not be verified." };
  }

  const data = (await response.json()) as { success?: boolean };
  return data.success
    ? { ok: true, message: "Verified." }
    : { ok: false, message: "Spam protection check failed." };
}

export function formatLeadEmail(lead: Lead) {
  const subject =
    lead.type === "waitlist"
      ? `New Guiderbus platform waitlist signup: ${lead.name}`
      : `New Guiderbus consultation request: ${lead.name}`;

  const rows = [
    ["Type", lead.type],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Phone", lead.phone],
    ["Service", lead.service],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Message", lead.message],
  ];

  const text = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return { subject, text };
}

export async function sendLeadEmail(
  lead: Lead,
  options?: LeadSubmissionOptions,
) {
  const env = getEnv(options);
  const to = env.LEAD_TO_EMAIL || "contact@guiderbus.com";
  const from = env.LEAD_FROM_EMAIL;

  if (!from) {
    return {
      ok: false,
      message: "Lead email sender is not configured.",
    };
  }

  if (!options?.emailClient) {
    return {
      ok: false,
      message: "Email delivery is not configured.",
    };
  }

  const { subject, text } = formatLeadEmail(lead);
  const result = await options.emailClient.emails.send({
    from,
    to,
    subject,
    text,
    replyTo: lead.email,
  });

  if (result.error) {
    return {
      ok: false,
      message: "Lead email could not be sent.",
    };
  }

  return { ok: true, message: "Lead email sent." };
}

export async function handleLeadSubmission(
  input: unknown,
  options?: LeadSubmissionOptions,
): Promise<LeadSubmissionResult> {
  const parsed = leadSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      message: "Check the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const turnstile = await verifyTurnstile(parsed.data.turnstileToken, options);
  if (!turnstile.ok) {
    return {
      ok: false,
      status: 400,
      message: turnstile.message,
    };
  }

  const email = await sendLeadEmail(parsed.data, options);
  if (!email.ok) {
    return {
      ok: false,
      status: 502,
      message: "We could not send your request right now. Email contact@guiderbus.com directly.",
    };
  }

  return {
    ok: true,
    status: 200,
    message:
      parsed.data.type === "waitlist"
        ? "You're on the platform waitlist. We'll be in touch."
        : "Your request has been sent. We'll reply shortly.",
  };
}
