// Seeds the single CMS admin. Run with: npx prisma db seed
// Credentials come from ADMIN_EMAIL / ADMIN_PASSWORD in .env.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { seedContent } from "./seed-content";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME ?? "Administrator";

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
  }
  if (password.length < 8) {
    throw new Error("ADMIN_PASSWORD must be at least 8 characters");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  // Upsert so re-running the seed resets the password instead of failing.
  const admin = await prisma.admin.upsert({
    where: { email: email.toLowerCase() },
    update: { name, passwordHash },
    create: { email: email.toLowerCase(), name, passwordHash },
  });

  console.log(`Admin ready: ${admin.email}`);

  await seedContent(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
