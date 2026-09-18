"use client";

import { useActionState } from "react";
import { subscribe, type NewsletterState } from "@/app/(site)/newsletter-actions";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<NewsletterState, FormData>(subscribe, {});

  if (state.ok) {
    return <p className="font-display text-2xl italic text-gold-400">Welcome aboard. Field notes coming soon.</p>;
  }

  return (
    <form action={action} className="max-w-md">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="flex items-end gap-4 border-b border-cream-50/30 pb-3 focus-within:border-gold-400">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Your email address"
          className="flex-1 bg-transparent text-base text-cream-50 outline-none placeholder:text-cream-50/40"
        />
        <button
          type="submit"
          disabled={pending}
          className="eyebrow text-gold-400 transition hover:text-cream-50 disabled:opacity-50"
        >
          {pending ? "…" : "Subscribe"}
        </button>
      </div>
      {state.error && <p className="mt-2 text-xs text-red-300">{state.error}</p>}
    </form>
  );
}
