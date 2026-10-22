import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
  created_at: string;
};

export type Phrase = {
  id: string;
  category_id: string;
  kannada: string;
  kannada_script: string;
  english: string;
  transliteration: string;
  context: string | null;
  sort_order: number;
  created_at: string;
};

export type Favorite = {
  id: string;
  device_id: string;
  phrase_id: string;
  created_at: string;
};
