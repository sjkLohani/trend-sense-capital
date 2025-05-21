
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://sgsamdpiutqubmczpvdq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNnc2FtZHBpdXRxdWJtY3pwdmRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4MzAxNDYsImV4cCI6MjA2MzQwNjE0Nn0.X-uGuz4M4wblgRvqy6xB5PAakSwrFD62nlh-026_KIY";

// Configure the Supabase client with proper auth settings
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY, 
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);
