import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bsdtihyqxvduwokarzwi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJzZHRpaHlxeHZkdXdva2FyendpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI0MzY4NzAsImV4cCI6MjAxODAxMjg3MH0.O8-Cj-5d6VZXDxXwQQN7LMEXvE8p6X0xh-Xt8ybGkZs'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})