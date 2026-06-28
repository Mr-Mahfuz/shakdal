<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useOrderStore } from '../../stores/order'

const authStore = useAuthStore()
const orderStore = useOrderStore()

onMounted(async () => {
  if (!orderStore.isLoaded) await orderStore.fetchFarmerOrders(authStore.user!.id)
})

const myOrders = computed(() => orderStore.getOrdersByFarmer(authStore.user!.id))

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('bn-BD', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const statusMap: Record<string, { label: string; class: string }> = {
  pending: { label: 'অপেক্ষমাণ', class: 'badge-orange' },
  confirmed: { label: 'নিশ্চিত', class: 'badge-blue' },
  delivered: { label: 'ডেলিভারি সম্পন্ন', class: 'badge-green' },
  cancelled: { label: 'বাতিল', class: 'badge-red' }
}

function markDelivered(orderId: string) {
  orderStore.updateOrderStatus(orderId, 'delivered')
}
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="section-title">📦 প্রাপ্ত অর্ডার সমূহ</h1>
        <p class="section-subtitle mb-0">আপনার পণ্যের জন্য যেসব অর্ডার এসেছে</p>
      </div>
      <router-link to="/farmer/dashboard" class="btn-secondary">← ড্যাশবোর্ড</router-link>
    </div>

    <div v-if="myOrders.length > 0" class="space-y-4">
      <div v-for="order in myOrders" :key="order.id" class="card p-5 md:p-6">
        <div class="flex flex-col sm:flex-row justify-between gap-4 mb-4">
          <div>
            <div class="flex items-center gap-3 mb-1">
              <span class="font-bold text-primary-600 text-lg">{{ order.id }}</span>
              <span :class="statusMap[order.status]?.class">
                {{ statusMap[order.status]?.label }}
              </span>
            </div>
            <p class="text-sm text-gray-400">{{ formatDate(order.createdAt) }}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-primary-600">৳{{ order.totalAmount }}</p>
          </div>
        </div>

        <!-- Customer Info -->
        <div class="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
          <p class="text-sm font-semibold text-gray-700 mb-1">👤 ক্রেতা: {{ order.customerName }}</p>
          <p class="text-sm text-gray-500">📱 {{ order.customerPhone }}</p>
          <p class="text-sm text-gray-500">📍 {{ order.deliveryAddress }}</p>
          <p class="text-sm text-gray-500">💰 {{ order.paymentMethod }}</p>
        </div>

        <!-- Order Items -->
        <div class="space-y-2 mb-4">
          <div v-for="item in order.items.filter(i => i.product.farmerId === authStore.user!.id)" :key="item.product.id"
            class="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
            <img :src="item.product.imageUrl" :alt="item.product.name"
              class="w-12 h-12 rounded-lg object-cover" />
            <div class="flex-grow">
              <p class="font-medium text-gray-700 text-sm">{{ item.product.name }}</p>
              <p class="text-xs text-gray-400">{{ item.quantity }} × ৳{{ item.product.pricePerKg }}</p>
            </div>
            <span class="font-bold text-gray-700 text-sm">৳{{ item.product.pricePerKg * item.quantity }}</span>
          </div>
        </div>

        <!-- Actions -->
        <div v-if="order.status === 'confirmed'" class="flex gap-2">
          <button @click="markDelivered(order.id)" class="btn-sm btn-primary cursor-pointer">
            ✓ ডেলিভারি সম্পন্ন
          </button>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20 card">
      <span class="text-7xl block mb-4">📭</span>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">এখনো কোনো অর্ডার আসেনি</h2>
      <p class="text-gray-400">ক্রেতারা অর্ডার করলে এখানে দেখা যাবে</p>
    </div>
  </div>
</template>
