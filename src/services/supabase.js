import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ssgxhskcmdkoalehdyms.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzZ3hoc2tjbWRrb2FsZWhkeW1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MDM2MTMsImV4cCI6MjA3MTE3OTYxM30.UctKodhns338myD-XWIxSt-DKu0rfv2rQ3GVCcQdBaQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
