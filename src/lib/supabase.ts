import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Contact {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInsert {
  name: string;
  email: string;
  service: string;
  message: string;
}