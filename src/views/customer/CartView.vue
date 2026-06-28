<script setup lang="ts">
import { useCartStore } from '../../stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="section-title mb-8">🛒 আপনার কার্ট</h1>

    <div v-if="!cartStore.isEmpty">
      <!-- Cart Items -->
      <div class="space-y-4 mb-8">
        <div v-for="item in cartStore.items" :key="item.product.id"
          class="card p-4 md:p-6 flex flex-col sm:flex-row gap-4 animate-fade-in-up">
          <img :src="item.product.imageUrl" :alt="item.product.name"
            class="w-full sm:w-28 h-28 object-cover rounded-xl" />
          <div class="flex-grow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-gray-800 text-lg">{{ item.product.name }}</h3>
                <p class="text-sm text-gray-400">{{ item.product.farmerName }} • ৳{{ item.product.pricePerKg }}/{{ item.product.unit }}</p>
              </div>
              <button @click="cartStore.removeFromCart(item.product.id)"
                class="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg cursor-pointer transition-all">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between mt-4">
              <div class="flex items-center gap-2 border-2 border-gray-200 rounded-xl overflow-hidden">
                <button @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                  class="px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer font-bold">−</button>
                <span class="px-4 py-2 font-bold text-gray-800 bg-gray-50">{{ item.quantity }}</span>
                <button @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                  class="px-3 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer font-bold">+</button>
              </div>
              <span class="text-xl font-bold text-primary-600">৳{{ item.product.pricePerKg * item.quantity }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="card p-6 md:p-8">
        <h3 class="font-bold text-gray-800 text-lg mb-4">অর্ডার সারসংক্ষেপ</h3>
        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-gray-600">
            <span>মোট পণ্য ({{ cartStore.totalItems }} টি)</span>
            <span>৳{{ cartStore.totalPrice }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>ডেলিভারি চার্জ</span>
            <span class="text-primary-600 font-medium">বিনামূল্যে</span>
          </div>
          <div class="border-t border-gray-100 pt-3 flex justify-between text-xl font-bold">
            <span>সর্বমোট</span>
            <span class="text-primary-600">৳{{ cartStore.totalPrice }}</span>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <router-link to="/marketplace" class="btn-secondary flex-1 text-center">
            ← কেনাকাটা চালিয়ে যান
          </router-link>
          <router-link to="/checkout" class="btn-primary flex-1 text-center">
            চেকআউট করুন →
          </router-link>
        </div>
      </div>
    </div>

    <!-- Empty Cart -->
    <div v-else class="text-center py-20">
      <span class="text-7xl block mb-4">🧺</span>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">আপনার কার্ট খালি!</h2>
      <p class="text-gray-400 mb-6">বাজার থেকে পছন্দের পণ্য কার্টে যোগ করুন</p>
      <router-link to="/marketplace" class="btn-primary inline-block">🏪 বাজারে যান</router-link>
    </div>
  </div>
</template>
