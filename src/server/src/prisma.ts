import { PrismaClient } from "@prisma/client";
export {
  User,
  UserRole,
  Organisation,
  Project,
  Document,
} from "@prisma/client";

export const prismaInstance = new PrismaClient();
// { log: ['query'] }

export type Prisma = typeof prismaInstance;
