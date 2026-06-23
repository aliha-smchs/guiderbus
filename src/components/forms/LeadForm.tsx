"use client";

import { useId, useState } from "react";
import Script from "next/script";
import { services } from "@/lib/services";
import type { LeadType } from "@/lib/leads";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    turnstile?: {
      reset: () => void;
    };
  }
}

type FormState = "idle" | "submitting" | "success" | "error";

interface LeadFormProps {
  type: LeadType;
  submitLabel: string;
  successLabel: string;
  className?: string;
}

const field =
  "w-full rounded-xl border border-white/10 bg-[#0c0c12] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-fuchsia-400/50 focus:ring-2 focus:ring-fuchsia-400/15";

const label = "text-sm font-medium text-zinc-300";
const help = "text-xs leading-relaxed text-zinc-500";

export function LeadForm({
  type,
  submitLabel,
  successLabel,
  className,
}: LeadFormProps) {
  const formId = useId();
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isWaitlist = type === "waitlist";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("submitting");
    setMessage("");

    const payload = {
      type,
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company"),
      phone: data.get("phone"),
      service: data.get("service"),
      budget: data.get("budget"),
      timeline: data.get("timeline"),
      message: data.get("message"),
      turnstileToken: data.get("cf-turnstile-response"),
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(result.message || "Check the form and try again.");
        window.turnstile?.reset();
        return;
      }

      setState("success");
      setMessage(result.message || successLabel);
      form.reset();
      window.turnstile?.reset();
    } catch {
      setState("error");
      setMessage("We could not send this right now. Please try again.");
      window.turnstile?.reset();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("grid gap-5", className)}
      aria-describedby={`${formId}-status`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${formId}-name`} labelText="Name">
          <input id={`${formId}-name`} name="name" required minLength={2} className={field} />
        </Field>
        <Field id={`${formId}-email`} labelText="Work email">
          <input id={`${formId}-email`} name="email" required type="email" className={field} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={`${formId}-company`} labelText="Company">
          <input id={`${formId}-company`} name="company" className={field} />
        </Field>
        <Field id={`${formId}-phone`} labelText="Phone">
          <input id={`${formId}-phone`} name="phone" type="tel" className={field} />
        </Field>
      </div>

      {!isWaitlist && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={`${formId}-service`} labelText="What should we automate?">
              <select id={`${formId}-service`} name="service" className={field} defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                {services.map((service) => (
                  <option key={service.slug} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </Field>
            <Field id={`${formId}-timeline`} labelText="Ideal timeline">
              <select id={`${formId}-timeline`} name="timeline" className={field} defaultValue="">
                <option value="">No fixed timeline</option>
                <option value="ASAP">ASAP</option>
                <option value="This month">This month</option>
                <option value="This quarter">This quarter</option>
                <option value="Exploring">Just exploring</option>
              </select>
            </Field>
          </div>

          <Field id={`${formId}-budget`} labelText="Budget range">
            <select id={`${formId}-budget`} name="budget" className={field} defaultValue="">
              <option value="">Prefer to discuss</option>
              <option value="Under $2,500">Under $2,500</option>
              <option value="$2,500 - $7,500">$2,500 - $7,500</option>
              <option value="$7,500 - $20,000">$7,500 - $20,000</option>
              <option value="$20,000+">$20,000+</option>
            </select>
          </Field>
        </>
      )}

      <Field
        id={`${formId}-message`}
        labelText={isWaitlist ? "What would you want the platform to automate?" : "Project details"}
      >
        <textarea
          id={`${formId}-message`}
          name="message"
          required={!isWaitlist}
          minLength={isWaitlist ? undefined : 10}
          rows={isWaitlist ? 4 : 6}
          className={cn(field, "resize-y")}
          placeholder={
            isWaitlist
              ? "Lead routing, WhatsApp replies, invoices, CRM updates..."
              : "Tell us about the workflow, tools, bottleneck, or customer process you want to improve."
          }
        />
      </Field>

      {turnstileSiteKey && (
        <div>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} />
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={state === "submitting"}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-gradient px-7 py-3 text-sm font-medium text-white shadow-lg shadow-purple-900/30 transition-all duration-200 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {state === "submitting" ? "Sending..." : submitLabel}
        </button>
        <p className={help}>
          We reply from contact@guiderbus.com. No mailing list unless you ask for it.
        </p>
      </div>

      <p
        id={`${formId}-status`}
        role="status"
        className={cn(
          "min-h-5 text-sm",
          state === "success" && "text-emerald-300",
          state === "error" && "text-red-300",
          state === "idle" && "text-zinc-500",
        )}
      >
        {message}
      </p>
    </form>
  );
}

function Field({
  id,
  labelText,
  children,
}: {
  id: string;
  labelText: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className={label}>
        {labelText}
      </label>
      {children}
    </div>
  );
}
