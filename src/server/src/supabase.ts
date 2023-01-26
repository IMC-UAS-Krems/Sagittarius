import { Ok, Err, Result } from "./utils/result";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const instance = (): Result<SupabaseClient> => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseKey || !supabaseUrl) {
    return Err(
      new Error("Value not found. You may be missing an environment variable.")
    );
  }

  return Ok(createClient(supabaseUrl, supabaseKey));
};

export const supabaseInstance = instance();
export type Supabase = SupabaseClient;
export type { User, Session, Provider, ApiError } from "@supabase/supabase-js";
