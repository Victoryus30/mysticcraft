import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Cliente server-side (con service key para API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

// Cliente client-side (con anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
