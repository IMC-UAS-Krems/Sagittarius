import * as trpc from "@trpc/server";
import { z } from "zod";
import { logIn, register, logOut, isDuplicate } from "./auth";
import { compile } from "./compile/compile";
import { prismaInstance } from "./prisma";

const credentialsSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password must be at most 100 characters" }),
});

export const appRouter = trpc
  .router()
  .query("login", {
    input: credentialsSchema,
    async resolve({ input }) {
      const result = await logIn(input);
      // console.log(result);
      return result;
    },
  })
  .query("logout", {
    async resolve() {
      return await logOut();
    },
  })
  .query("isDuplicate", {
    input: z.object({ email: z.string().email({ message: "Invalid email" }) }),
    async resolve({ input }) {
      return await isDuplicate(input.email);
    },
  })
  .mutation("register", {
    input: credentialsSchema,
    async resolve({ input }) {
      const result = await register(input);
      // console.log(result);
      return result;
    },
  })
  .mutation("compile", {
    input: z.object({ code: z.string() }),
    async resolve({ input }) {
      const { code } = input;

      const result = await compile(code);

      return result;
    },
  });

export type AppRouter = typeof appRouter;
