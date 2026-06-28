import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '../lib/supabase'

export type Role = 'farmer' | 'customer'

export interface User {
  id: string
  name: string
  role: Role
  phone: string
  location: string
  avatar: string
  createdAt: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isInitialized = ref(false)

  // Computed
  const isLoggedIn = computed(() => !!user.value)
  const isFarmer = computed(() => user.value?.role === 'farmer')
  const isCustomer = computed(() => user.value?.role === 'customer')

  let initPromise: Promise<void> | null = null

  // Initialize session from Supabase
  async function init() {
    if (isInitialized.value) return
    if (initPromise) return initPromise

    initPromise = (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchProfile(session.user.id)
      }
      isInitialized.value = true

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          user.value = null
        }
      })
    })()

    return initPromise
  }

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (data && !error) {
      user.value = {
        id: data.id,
        name: data.name,
        role: data.role as Role,
        phone: data.phone,
        location: data.location,
        avatar: data.avatar || `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(data.name)}`,
        createdAt: data.created_at
      }
    }
  }

  // Actions
  async function login(phone: string, password: string): Promise<{ success: boolean; message: string }> {
    // Supabase requires email for default auth, so we map phone to a dummy email behind the scenes
    const email = `${phone}@shakdal.com`
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { success: false, message: 'লগইন ব্যর্থ হয়েছে। ফোন নম্বর বা পাসওয়ার্ড ভুল।' }
    }

    if (data.session?.user) {
      await fetchProfile(data.session.user.id)
    }

    return { success: true, message: 'সফলভাবে লগইন হয়েছে!' }
  }

  async function register(name: string, phone: string, role: Role, location: string, password: string): Promise<{ success: boolean; message: string }> {
    const email = `${phone}@shakdal.com`

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError || !authData.user) {
      return { success: false, message: authError?.message || 'একাউন্ট তৈরি করতে সমস্যা হয়েছে।' }
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      name,
      role,
      phone,
      location,
      avatar: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(name)}`
    })

    if (profileError) {
      console.error(profileError)
      return { success: false, message: 'প্রোফাইল তৈরি করতে সমস্যা হয়েছে।' }
    }

    await fetchProfile(authData.user.id)
    return { success: true, message: 'একাউন্ট তৈরি হয়েছে! স্বাগতম!' }
  }

  async function logout() {
    await supabase.auth.signOut()
    user.value = null
  }

  // A helper function for finding users by ID (used by product/order stores)
  async function getFarmerById(id: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (data && !error) {
      return {
        id: data.id,
        name: data.name,
        role: data.role as Role,
        phone: data.phone,
        location: data.location,
        avatar: data.avatar,
        createdAt: data.created_at
      }
    }
    return undefined
  }

  return {
    user,
    isInitialized,
    isLoggedIn,
    isFarmer,
    isCustomer,
    init,
    login,
    register,
    logout,
    getFarmerById
  }
})
