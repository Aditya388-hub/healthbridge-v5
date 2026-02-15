import { createClient } from '@supabase/supabase-js';

// Fallback for build time or if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (supabaseUrl.includes('placeholder')) {
    console.warn('⚠️ Supabase URL is missing! Check your Vercel Environment Variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
