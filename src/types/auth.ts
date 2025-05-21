
import { Session, User } from '@supabase/supabase-js';

// Define the Profile type based on our database schema
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: 'investor' | 'admin';
  investor_type: string | null;
  created_at: string;
  updated_at: string;
};

// Define the AuthContext type
export type AuthContextType = {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: { full_name: string; investor_type: string }) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
};
