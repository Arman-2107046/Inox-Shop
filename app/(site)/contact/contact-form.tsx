"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "./actions";

type Option = { slug: string; name: string };

const field =
  "mt-2 block w-full rounded-lg border border-cream-200 bg-cream-50 px-4 py-3 text-forest-900 outline-none transition placeholder:text-forest-700/40 focus:border-moss-500 focus:ring-2 focus:ring-sage-200";
const label = "text-xs font-medium uppercase tracking-[0.2em] text-moss-500";

export function ContactForm({ destinations, preselected }: { destinations: Option[]; preselected?: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(sendEnquiry, {});

  if (state.ok) {
    return (
      <div className="rounded-2xl bg-sage-100 p-10 text-center">
        <p className="font-display text-3xl text-forest-900">Thank you.</p>
        <p className="mt-3 text-forest-700/80">We read every message and will reply within two working days.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-6">
      {/* Honeypot — hidden from people, filled by bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>Name</label>
          <input id="name" name="name" required className={field} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className={label}>Email</label>
          <input id="email" name="email" type="email" required className={field} placeholder="you@example.com" />
        </div>
      </div>

      <div>
        <label htmlFor="destination" className={label}>Journey (optional)</label>
        <select id="destination" name="destination" defaultValue={preselected ?? ""} className={field}>
          <option value="">Not sure yet</option>
          {destinations.map((d) => (
            <option key={d.slug} value={d.slug}>{d.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={label}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={field}
          placeholder="When would you like to travel, who with, and what do you hope to feel?"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-forest-800 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 transition hover:bg-forest-700 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
