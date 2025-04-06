
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://esbozzikrfkikcyvgfvp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzYm96emlrcmZraWtjeXZnZnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzMjU2MzQsImV4cCI6MjA1NzkwMTYzNH0.KDeEAuQ1g62ewot81G12Z7ec0SnKoB48LPj25kTReR0'

export const supabase = createClient(supabaseUrl, supabaseKey)