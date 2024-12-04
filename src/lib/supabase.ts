import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://anddrqjahzwfvsshdzjx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFuZGRycWphaHp3ZnZzc2hkemp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMwNDEwMDIsImV4cCI6MjA0ODYxNzAwMn0.OYbC1Mlb4KB_B4kWLPiF__EK-9BZiWc6Z2YVCy3yoFg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);