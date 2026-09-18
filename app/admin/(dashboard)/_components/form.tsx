"use client";

import Link from "next/link";
import { useActionState } from "react";

export type FormState = { error?: string; ok?: boolean };
export type FormAction = (prev: FormState, formData: FormData) => Promise<FormState>;

const inputClass =
  "mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:ring-zinc-800";
const labelClass = "block text-sm font-medium text-zinc-700 dark:text-zinc-300";
const hintClass = "mt-1 text-xs text-zinc-500 dark:text-zinc-400";

type BaseProps = { name: string; label: string; hint?: string; className?: string };

export function Input({
  name,
  label,
  hint,
  className,
  ...rest
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <input id={name} name={name} className={inputClass} {...rest} />
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}

export function Textarea({
  name,
  label,
  hint,
  className,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <textarea id={name} name={name} className={inputClass} {...rest} />
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}

export function Select({
  name,
  label,
  hint,
  className,
  options,
  ...rest
}: BaseProps & { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <select id={name} name={name} className={inputClass} {...rest}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}

export function Checkbox({ name, label, hint, defaultChecked }: BaseProps & { defaultChecked?: boolean }) {
  return (
    <label className="flex items-start gap-3">
      <input type="checkbox" name={name} value="on" defaultChecked={defaultChecked} className="mt-1 h-4 w-4 rounded border-zinc-300" />
      <span>
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
        {hint && <span className={hintClass}>{hint}</span>}
      </span>
    </label>
  );
}

/**
 * Wraps a set of fields in a form bound to a server action with useActionState.
 * Pages render fields (server-side) as children; this component only owns the
 * submit/pending/error plumbing.
 */
export function EntityForm({
  action,
  submitLabel,
  cancelHref,
  successMessage,
  children,
}: {
  action: FormAction;
  submitLabel: string;
  cancelHref?: string;
  successMessage?: string;
  children: React.ReactNode;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      {children}

      {state.error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {state.error}
        </p>
      )}
      {state.ok && successMessage && (
        <p role="status" className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {successMessage}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        {cancelHref && (
          <Link
            href={cancelHref}
            className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </Link>
        )}
      </div>
    </form>
  );
}
