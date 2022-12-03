import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Can be found in Supabase dashboard -> Settings (Cogwheel) -> General
export const supabaseUrl = 'https://<project-reference-id>.supabase.co';
// Can be found in Supabase dashboard -> Settings (Cogwheel) -> API
const supabaseAnonKey = '<anon-key>';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
