// utils/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mzzfbyxibvjzgpxvdbfm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16emZieXhpYnZqemdweHZkYmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg1NDkwMzksImV4cCI6MjAzNDEyNTAzOX0.T4Yqp4N5ew1dcDNLcRPNjmfnoGTxR-C4y0Rmv7I4fKo"; // Replace with your Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);
