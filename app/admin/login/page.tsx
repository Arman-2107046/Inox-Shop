import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata = { title: "Admin Login" };

export default async function AdminLoginPage() {
  // Already signed in — skip the form.
  if (await getCurrentAdmin()) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Admin sign in</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Inox Shop content management</p>
        <LoginForm />
      </div>
    </div>
  );
}
