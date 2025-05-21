
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { cleanupAuthState } from '@/utils/authUtils';
import { useProfileFetch } from '@/hooks/useProfileFetch';

export const useAuthOperations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { fetchProfile } = useProfileFetch();

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      // Clean up existing auth state first
      cleanupAuthState();
      
      // Attempt global sign out (just in case)
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      if (data.user) {
        const profileData = await fetchProfile(data.user.id);
        if (profileData) {
          // Redirect based on role
          if (profileData.role === 'admin') {
            navigate('/admin/users');
          } else {
            navigate('/dashboard');
          }
        }
      }
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      throw error;
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, metadata: { full_name: string; investor_type: string }) => {
    try {
      // Clean up existing auth state first
      cleanupAuthState();
      
      // Attempt global sign out (just in case)
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.full_name,
            investor_type: metadata.investor_type,
            role: 'investor' // Default role for sign up
          }
        }
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email for the confirmation link.",
      });
      
      // Return void to match the function signature
      return;
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      throw error;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      // Navigate to home page
      navigate('/');
    } catch (error: any) {
      console.error('Error signing out:', error.message);
      throw error;
    }
  };

  return { signIn, signUp, signOut };
};
