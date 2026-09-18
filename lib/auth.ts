import "server-only";
import { randomBytes } from "node:crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;

// Pre-computed hash used when the email doesn't exist, so a login attempt
// takes the same time whether or not the account is real.
const DUMMY_HASH = "$2b$12$Y/tlgar8UsKyMyF3joC2ie4dUgrN3d/M1MhqXFsbOeePt5ayU9q5G";

export type AdminUser = { id: string; email: string; name: string };

/** Verifies credentials and opens a session. Returns null on bad credentials. */
export async function login(email: string, password: string): Promise<AdminUser | null> {
  const admin = await prisma.admin.findUnique({ where: { email: email.toLowerCase().trim() } });
  const ok = await bcrypt.compare(password, admin?.passwordHash ?? DUMMY_HASH);
  if (!admin || !ok) return null;

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await prisma.session.create({ data: { token, adminId: admin.id, expiresAt } });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return { id: admin.id, email: admin.email, name: admin.name };
}

/** Deletes the current session (if any) and clears the cookie. */
export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
  }
  cookieStore.delete(SESSION_COOKIE);
}

/** Returns the logged-in admin or null. Cached per request. */
export const getCurrentAdmin = cache(async (): Promise<AdminUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { admin: { select: { id: true, email: true, name: true } } },
  });
  if (!session) return null;
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  return session.admin;
});

/** Use at the top of every protected page, layout and server action. */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export { SESSION_COOKIE };
