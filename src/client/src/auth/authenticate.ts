import { client } from "./apiRouter";
import { AsyncResult, Err, Ok } from "sagittarius-server/src/utils/result";
import { SHA3 } from "crypto-js";
import { User } from ".prisma/client";

export type Credentials = { email: string; password: string };

export async function login(credentials: Credentials): AsyncResult<User> {
  const { email, password } = credentials;

  const userResult = await client.query("login", {
    email,
    password: SHA3(password).toString().substring(10, 99),
  });

  return userResult;
}

export async function register(credentials: Credentials): AsyncResult<User> {
  const { email, password } = credentials;

  const emailExists = await client.query("isDuplicate", { email });

  if (emailExists) {
    return Err(new Error("Email already exists"));
  }

  const userResult = await client.mutation("register", {
    email,
    password: SHA3(password).toString().substring(10, 99),
  });

  return userResult;
}

export async function logout(): AsyncResult<void> {
  const _ignore = await client.query("logout");

  return _ignore;
}
