<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore, type Role } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const form = reactive({
  name: '',
  phone: '',
  password: '',
  location: '',
  role: 'customer' as Role
})
const errorMsg = ref('')
const loading = ref(false)

async function handleRegister() {
  errorMsg.value = ''

  if (!form.name.trim()) { errorMsg.value = 'আপনার নাম লিখুন'; return }
  if (!form.phone.trim()) { errorMsg.value = 'ফোন নম্বর দিন'; return }
  if (!form.location.trim()) { errorMsg.value = 'আপনার এলাকা লিখুন'; return }

  loading.value = true
  await new Promise(r => setTimeout(r, 800))

  const result = await authStore.register(form.name, form.phone, form.role, form.location, form.password)
  loading.value = false

  if (result.success) {
    if (authStore.isFarmer) {
      router.push('/farmer/dashboard')
    } else {
      router.push('/marketplace')
    }
  } else {
    errorMsg.value = result.message
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 via-white to-primary-50">
    <div class="w-full max-w-md">
      <div class="card p-8 md:p-10 shadow-xl border-0">
        <div class="text-center mb-8">
          <span class="text-5xl block mb-3">📝</span>
          <h1 class="text-2xl font-bold text-gray-800 font-[var(--font-display)]">নতুন একাউন্ট তৈরি করুন</h1>
          <p class="text-gray-400 mt-1">শাকডাল পরিবারে যোগ দিন</p>
        </div>

        <!-- Role Selector -->
        <div class="grid grid-cols-2 gap-3 mb-6">
          <button @click="form.role = 'customer'"
            :class="[
              'py-4 rounded-xl font-semibold text-base transition-all cursor-pointer border-2',
              form.role === 'customer'
                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-md'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
            ]">
            <span class="text-2xl block mb-1">🛒</span>
            ক্রেতা
          </button>
          <button @click="form.role = 'farmer'"
            :class="[
              'py-4 rounded-xl font-semibold text-base transition-all cursor-pointer border-2',
              form.role === 'farmer'
                ? 'bg-primary-50 border-primary-300 text-primary-700 shadow-md'
                : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
            ]">
            <span class="text-2xl block mb-1">👨‍🌾</span>
            কৃষক
          </button>
        </div>

        <!-- Error -->
        <div v-if="errorMsg" class="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-xl mb-6 flex items-center gap-2">
          <span>⚠️</span> {{ errorMsg }}
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="label">👤 আপনার নাম</label>
            <input v-model="form.name" type="text" :placeholder="form.role === 'farmer' ? 'যেমন: রহিম উদ্দিন' : 'যেমন: তানভীর হোসেন'" class="input-field" />
          </div>
          <div>
            <label class="label">📱 ফোন নম্বর</label>
            <input v-model="form.phone" type="tel" placeholder="01XXXXXXXXX" class="input-field" />
          </div>
          <div>
            <label class="label">📍 এলাকা</label>
            <input v-model="form.location" type="text" :placeholder="form.role === 'farmer' ? 'যেমন: গোদাগাড়ি, রাজশাহী' : 'যেমন: সাহেব বাজার, রাজশাহী'" class="input-field" />
          </div>
          <div>
            <label class="label">🔒 পাসওয়ার্ড</label>
            <input v-model="form.password" type="password" placeholder="কমপক্ষে ৬ অক্ষর" class="input-field" />
          </div>
          <button type="submit" :disabled="loading" class="btn-primary w-full text-lg py-4 mt-2 disabled:opacity-60">
            <span v-if="loading" class="animate-spin mr-2">⏳</span>
            {{ loading ? 'তৈরি হচ্ছে...' : 'একাউন্ট তৈরি করুন' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-500">
            আগে থেকে একাউন্ট আছে?
            <router-link to="/login" class="text-primary-600 font-semibold hover:underline">লগইন করুন</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
