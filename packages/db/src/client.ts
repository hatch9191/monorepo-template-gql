import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "./generated/client";

const connectionString = process.env.POSTGRES_DB_URL ?? "";

const adapter = new PrismaPg({ connectionString });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export type { PrismaClient };
