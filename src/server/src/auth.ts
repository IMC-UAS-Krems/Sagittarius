import { supabaseInstance, Supabase } from "./supabase";
import { prismaInstance, User, Prisma } from "./prisma";
import { Result, AsyncResult, Ok, Err } from "./utils/result";
import { CredentialsError } from "./utils/credentialsError";

export async function logIn(
  credentials: {
    email: string;
    password: string;
  },
  supabase: Result<Supabase> = supabaseInstance,
  prisma: Prisma = prismaInstance
): AsyncResult<User> {
  if (supabase.isErr) return Err(supabase.error);

  const db = supabase.value;
  const { email, password } = credentials;

  const { user, session, error } = await db.auth.signIn({
    email,
    password,
  });

  if (error) return Err(new CredentialsError(error.message));
  if (!user) return Err(new CredentialsError("No user found"));

  const prismaUser = await prisma.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!prismaUser) return Err(new CredentialsError("No user found"));

  return Ok(prismaUser);
}

export async function register(
  credentials: {
    email: string;
    password: string;
  },
  supabase: Result<Supabase> = supabaseInstance,
  prisma: Prisma = prismaInstance
): AsyncResult<User> {
  if (supabase.isErr) return Err(supabase.error);

  const db = supabase.value;
  const { email, password } = credentials;

  const { user, session, error } = await db.auth.signUp({
    email,
    password,
  });

  if (error) return Err(new CredentialsError(error.message));

  if (!user) return Err(new CredentialsError("No user found"));

  if (await isDuplicate(email))
    return Err(
      new CredentialsError(`User with email: ${email} already exists`)
    );

  const prismaUser = await prisma.user.create({
    data: {
      id: user.id,
      email: email,
      name: email.split("@")[0] ?? email,
    },
  });

  return Ok(prismaUser);
}

export async function logOut(
  supabase: Result<Supabase> = supabaseInstance
): AsyncResult<void> {
  if (supabase.isErr) {
    return Err(supabase.error);
  }

  const db = supabase.value;

  const { error } = await db.auth.signOut();

  if (error) {
    return Err(new Error(error.message));
  }

  return Ok(undefined);
}

export async function isDuplicate(email: string) {
  const prismaUser = await prismaInstance.user.findFirst({
    where: {
      email: email,
    },
  });

  return prismaUser ? true : false;
}
