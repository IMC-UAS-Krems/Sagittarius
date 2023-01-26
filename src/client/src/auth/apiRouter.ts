import { AppRouter } from "sagittarius-server/src/trpc";
import { createTRPCClient } from "@trpc/client";

export const client = createTRPCClient<AppRouter>({
  url: process.env.VUE_APP_SERVER_URL ?? "ENV VARIABLE NOT FOUND",
});
