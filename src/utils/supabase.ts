import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjkvaokwvsonbdbxymtj.supabase.co";
const supabasePublishableKey = "sb_publishable_PmkTpQfp5jS8JH8nl8sNYQ__MznBN8Y";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
