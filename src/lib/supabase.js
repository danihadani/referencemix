import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gftyzgibqfuvmdvslftu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmdHl6Z2licWZ1dm1kdnNsZnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NDY5NTksImV4cCI6MjA5ODAyMjk1OX0.EVLiB2nPBrFuDE4u0q-Xk4QQxpdvdAnN6Gc9avjKMfM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);