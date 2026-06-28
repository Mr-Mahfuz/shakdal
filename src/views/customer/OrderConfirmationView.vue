<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../../stores/order'

const route = useRoute()
const orderStore = useOrderStore()

const order = computed(() => orderStore.getOrderById(route.params.id as string))

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="order" class="text-center animate-fade-in-up">
      <!-- Success Icon -->
      <div class="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="text-5xl">✅</span>
      </div>

      <h1 class="text-3xl font-bold text-gray-800 mb-2 font-[var(--font-display)]">অর্ডার সফল হয়েছে!</h1>
      <p class="text-gray-500 mb-8">আপনার অর্ডার নিশ্চিত করা হয়েছে। শীঘ্রই ডেলিভারি করা হবে।</p>

      <!-- Order Card -->
      <div class="card p-6 md:p-8 text-left">
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <div>
            <p class="text-sm text-gray-400">অর্ডার আইডি</p>
            <p class="font-bold text-primary-600 text-lg">{{ order.id }}</p>
          </div>
          <span class="badge-green text-sm">
            {{ order.status === 'confirmed' ? '✓ নিশ্চিত' : order.status }}
          </span>
        </div>

        <!-- Items -->
        <div class="space-y-3 mb-6">
          <div v-for="item in order.items" :key="item.product.id"
            class="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <img :src="item.product.imageUrl" :alt="item.product.name"
              class="w-14 h-14 rounded-lg object-cover" />
            <div class="flex-grow">
              <p class="font-medium text-gray-800">{{ item.product.name }}</p>
              <p class="text-xs text-gray-400">{{ item.quantity }} {{ item.product.unit }} × ৳{{ item.product.pricePerKg }}</p>
            </div>
            <span class="font-bold text-gray-700">৳{{ item.product.pricePerKg * item.quantity }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="border-t border-gray-100 pt-4 mb-6">
          <div class="flex justify-between text-sm text-gray-500 mb-2">
            <span>ডেলিভারি</span>
            <span class="text-primary-600">ফ্রি</span>
          </div>
          <div class="flex justify-between text-xl font-bold">
            <span>সর্বমোট</span>
            <span class="text-primary-600">৳{{ order.totalAmount }}</span>
          </div>
        </div>

        <!-- Delivery Info -->
        <div class="bg-blue-50 rounded-xl p-4 space-y-2 border border-blue-100">
          <div class="flex items-center gap-2 text-sm">
            <span>📍</span>
            <span class="text-gray-700">{{ order.deliveryAddress }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span>📱</span>
            <span class="text-gray-700">{{ order.customerPhone }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span>💰</span>
            <span class="text-gray-700">{{ order.paymentMethod }}</span>
          </div>
          <div class="flex items-center gap-2 text-sm">
            <span>🕐</span>
            <span class="text-gray-700">{{ formatDate(order.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 mt-8">
        <router-link to="/orders" class="btn-secondary flex-1 text-center">📦 আমার অর্ডার দেখুন</router-link>
        <router-link to="/marketplace" class="btn-primary flex-1 text-center">🏪 আরও কেনাকাটা করুন</router-link>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else class="text-center py-20">
      <span class="text-7xl block mb-4">😕</span>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">অর্ডার পাওয়া যায়নি</h2>
      <router-link to="/marketplace" class="btn-primary mt-4 inline-block">বাজারে ফিরুন</router-link>
    </div>
  </div>
</template>
