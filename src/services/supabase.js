import { createClient } from "@supabase/supabase-js";

export const VITE_SUPABASE_URL = "https://zxrjcorrfilefpdsoypv.supabase.co";
const VITE_SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_67zr880lgTe-gP7rPrKHTg_bNVknrBn";

const supabaseUrl = VITE_SUPABASE_URL;
const supabaseKey = VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
