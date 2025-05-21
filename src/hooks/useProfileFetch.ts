
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '@/types/auth';

// Fetch user profile
export const useProfileFetch = () => {
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data as Profile;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  return { fetchProfile };
};
