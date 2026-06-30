<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()
const mobileMenuOpen = ref(false)

function handleLogout() {
  authStore.logout()
  router.push('/')
  mobileMenuOpen.value = false
}

function navigate(path: string) {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<template>
  <header class="glass sticky top-0 z-50 border-b border-gray-200/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 group">
          <span class="text-3xl">🌿</span>
          <h1 class="text-2xl font-bold text-primary-700 tracking-tight font-[var(--font-display)]">
            শাকডাল<span class="text-primary-400">.com</span>
          </h1>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <template v-if="!authStore.isFarmer">
            <router-link to="/"
              exact-active-class="bg-primary-50 text-primary-700"
              class="px-4 py-2 rounded-lg text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              {{ $t('nav.home') }}
            </router-link>
            <router-link to="/marketplace"
              active-class="bg-primary-50 text-primary-700"
              class="px-4 py-2 rounded-lg text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              {{ $t('nav.market') }}
            </router-link>
          </template>

          <template v-if="authStore.isFarmer">
            <router-link to="/farmer/dashboard"
              exact-active-class="bg-primary-50 text-primary-700"
              class="px-4 py-2 rounded-lg text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              {{ $t('nav.dashboard') }}
            </router-link>
            <router-link to="/farmer/orders"
              active-class="bg-primary-50 text-primary-700"
              class="px-4 py-2 rounded-lg text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              {{ $t('nav.orders') }}
            </router-link>
          </template>

          <template v-if="authStore.isCustomer">
            <router-link to="/orders"
              active-class="bg-primary-50 text-primary-700"
              class="px-4 py-2 rounded-lg text-gray-600 hover:text-primary-700 hover:bg-primary-50 transition-all font-medium">
              {{ $t('nav.my_orders') }}
            </router-link>
          </template>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Language Switcher -->
          <button @click="$i18n.locale = $i18n.locale === 'en' ? 'bn' : 'en'"
            class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 hover:bg-primary-100 text-sm font-bold text-primary-700 transition-colors cursor-pointer border border-primary-200">
            {{ $i18n.locale === 'en' ? 'বাং' : 'EN' }}
          </button>

          <!-- Cart Button (Customer) -->
          <button v-if="!authStore.isFarmer" @click="cartStore.toggleDrawer()"
            class="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <span v-if="cartStore.totalItems > 0"
              class="absolute -top-1 -right-1 bg-accent-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse-soft">
              {{ cartStore.totalItems }}
            </span>
          </button>

          <!-- User Menu -->
          <template v-if="authStore.isLoggedIn">
            <div class="hidden sm:flex items-center gap-2 pl-3 border-l border-gray-200">
              <img :src="authStore.user!.avatar" :alt="authStore.user!.name"
                class="w-8 h-8 rounded-full bg-primary-100" />
              <span class="text-sm font-medium text-gray-700 max-w-[120px] truncate">
                {{ authStore.user!.name }}
              </span>
            </div>
            <button @click="handleLogout"
              class="btn-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors cursor-pointer px-3 py-1.5 text-sm">
              {{ $t('nav.logout') }}
            </button>
          </template>
          <template v-else>
            <router-link to="/login" class="btn-sm btn-primary text-sm">{{ $t('nav.login') }}</router-link>
          </template>

          <!-- Mobile Menu Toggle -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <svg v-if="!mobileMenuOpen" class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen"
      class="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 animate-fade-in-up">
      <template v-if="!authStore.isFarmer">
        <router-link to="/" @click="mobileMenuOpen = false" exact-active-class="bg-primary-50 text-primary-700" class="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium cursor-pointer">🏠 {{ $t('nav.home') }}</router-link>
        <router-link to="/marketplace" @click="mobileMenuOpen = false" active-class="bg-primary-50 text-primary-700" class="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium cursor-pointer">🏪 {{ $t('nav.market') }}</router-link>
      </template>
      <template v-if="authStore.isFarmer">
        <router-link to="/farmer/dashboard" @click="mobileMenuOpen = false" exact-active-class="bg-primary-50 text-primary-700" class="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium cursor-pointer">📊 {{ $t('nav.dashboard') }}</router-link>
        <router-link to="/farmer/orders" @click="mobileMenuOpen = false" active-class="bg-primary-50 text-primary-700" class="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium cursor-pointer">📦 {{ $t('nav.orders') }}</router-link>
      </template>
      <template v-if="authStore.isCustomer">
        <router-link to="/orders" @click="mobileMenuOpen = false" active-class="bg-primary-50 text-primary-700" class="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 font-medium cursor-pointer">📦 {{ $t('nav.my_orders') }}</router-link>
      </template>
    </div>
  </header>
</template>
