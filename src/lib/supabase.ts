import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found, using placeholder client')
}

// Create client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null as any // Placeholder for build time

// Auth helper functions - handle null supabase client
export const auth = {
  signUp: async (email: string, password: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase client not initialized' } }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  signIn: async (email: string, password: string) => {
    if (!supabase) return { data: null, error: { message: 'Supabase client not initialized' } }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    if (!supabase) return { error: { message: 'Supabase client not initialized' } }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  getUser: async () => {
    if (!supabase) return { user: null, error: { message: 'Supabase client not initialized' } }
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  getSession: async () => {
    if (!supabase) return { session: null, error: { message: 'Supabase client not initialized' } }
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } }
    return supabase.auth.onAuthStateChange(callback)
  }
}
