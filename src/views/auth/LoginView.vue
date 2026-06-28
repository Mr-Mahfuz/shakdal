<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = reactive({
  phone: '',
  password: ''
})
const errorMsg = ref('')
const loading = ref(false)

async function handleLogin() {
  errorMsg.value = ''
  if (!form.phone.trim()) {
    errorMsg.value = 'ফোন নম্বর দিন'
    return
  }

  loading.value = true
  // Simulate network delay
  await new Promise(r => setTimeout(r, 600))

  const result = await authStore.login(form.phone, form.password)
  loading.value = false

  if (result.success) {
    const redirect = route.query.redirect as string
    if (redirect) {
      router.push(redirect)
    } else if (authStore.isFarmer) {
      router.push('/farmer/dashboard')
    } else {
      router.push('/marketplace')
    }
  } else {
    errorMsg.value = result.message
  }
}

// Quick login helpers for demo
function quickLogin(phone: string) {
  form.phone = phone
  form.password = '123456'
  handleLogin()
}
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-primary-50 via-white to-primary-50">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="card p-8 md:p-10 shadow-xl border-0">
        <div class="text-center mb-8">
          <span class="text-5xl block mb-3">🌿</span>
          <h1 class="text-2xl font-bold text-gray-800 font-[var(--font-display)]">{{ $t('auth.login_title') }}</h1>
          <p class="text-gray-400 mt-1">{{ $t('auth.login_desc') }}</p>
        </div>

        <!-- Error Message -->
        <div v-if="errorMsg" class="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-xl mb-6 flex items-center gap-2">
          <span>⚠️</span> {{ errorMsg }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="label">{{ $t('auth.phone_label') }}</label>
            <input v-model="form.phone" type="text" :placeholder="$t('auth.phone_placeholder')" class="input-field text-lg" />
          </div>
          <div>
            <label class="label">{{ $t('auth.password_label') }}</label>
            <input v-model="form.password" type="password" :placeholder="$t('auth.password_placeholder')" class="input-field text-lg" />
          </div>
          <button type="submit" :disabled="loading"
            class="btn-primary w-full text-lg py-4 disabled:opacity-60">
            <span v-if="loading" class="animate-spin mr-2">⏳</span>
            {{ loading ? '...' : $t('auth.btn_login') }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <p class="text-gray-500">
            {{ $t('auth.no_account') }}
            <router-link to="/register" class="text-primary-600 font-semibold hover:underline">{{ $t('auth.register_link') }}</router-link>
          </p>
        </div>

        <!-- Quick Login (For showcase) -->
        <div class="mt-8 border-t border-gray-100 pt-6">
          <p class="text-xs text-gray-400 text-center mb-3">{{ $t('auth.quick_login') }}</p>
          <div class="grid grid-cols-2 gap-3">
            <button @click="quickLogin('farmer')"
              class="bg-primary-50 text-primary-700 text-sm font-medium py-3 rounded-xl hover:bg-primary-100 transition-colors cursor-pointer border border-primary-100">
              {{ $t('auth.btn_farmer') }}
            </button>
            <button @click="quickLogin('customer')"
              class="bg-blue-50 text-blue-700 text-sm font-medium py-3 rounded-xl hover:bg-blue-100 transition-colors cursor-pointer border border-blue-100">
              {{ $t('auth.btn_customer') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
