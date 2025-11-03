import { Database } from './database.types'
import { supabase } from './supabase'

// Database helper functions
export const db = {
  // Profile operations
  profiles: {
    async get(userId: string) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    },

    async update(userId: string, updates: Database['public']['Tables']['profiles']['Update']) {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async create(profile: Database['public']['Tables']['profiles']['Insert']) {
      const { data, error } = await (supabase as any)
        .from('profiles')
        .insert(profile)
        .select()
        .single()

      if (error) throw error
      return data
    }
  },

  // Projects operations
  projects: {
    async getAll(userId: string) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },

    async create(project: Database['public']['Tables']['projects']['Insert']) {
      const { data, error } = await (supabase as any)
        .from('projects')
        .insert(project)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async update(id: string, updates: Database['public']['Tables']['projects']['Update']) {
      const { data, error } = await (supabase as any)
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
    }
  },

  // Subscription plans operations
  subscriptionPlans: {
    async getAll() {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('is_active', true)
        .order('price_monthly', { ascending: true })

      if (error) throw error
      return data
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    }
  },

  // Notifications operations
  notifications: {
    async getAll(userId: string, limit = 50) {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error
      return data
    },

    async getUnreadCount(userId: string) {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('is_read', false)

      if (error) throw error
      return count || 0
    },

    async markAsRead(id: string) {
      const { data, error } = await (supabase as any)
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async markAllAsRead(userId: string) {
      const { data, error } = await (supabase as any)
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', userId)
        .eq('is_read', false)
        .select()

      if (error) throw error
      return data
    },

    async create(notification: Database['public']['Tables']['notifications']['Insert']) {
      const { data, error } = await (supabase as any)
        .from('notifications')
        .insert(notification)
        .select()
        .single()

      if (error) throw error
      return data
    }
  },

  // Organizations operations
  organizations: {
    async getAll(userId: string) {
      const { data, error } = await (supabase as any)
        .from('organization_members')
        .select(`
          organizations (*)
        `)
        .eq('user_id', userId)

      if (error) throw error
      return data?.map((item: any) => item.organizations) || []
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    },

    async create(organization: Database['public']['Tables']['organizations']['Insert']) {
      const { data, error } = await (supabase as any)
        .from('organizations')
        .insert(organization)
        .select()
        .single()

      if (error) throw error
      return data
    }
  }
}

// Type helpers
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type SubscriptionPlan = Database['public']['Tables']['subscription_plans']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type Organization = Database['public']['Tables']['organizations']['Row']
