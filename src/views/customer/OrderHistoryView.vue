<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useOrderStore } from '../../stores/order'
import { useAuthStore } from '../../stores/auth'

const orderStore = useOrderStore()
const authStore = useAuthStore()

onMounted(async () => {
  if (!orderStore.isLoaded) await orderStore.fetchCustomerOrders(authStore.user!.id)
})

const myOrders = computed(() =>
  orderStore.getOrdersByCustomer(authStore.user!.id)
)

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('bn-BD', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

const statusMap: Record<string, { label: string; class: string }> = {
  pending: { label: 'অপেক্ষমাণ', class: 'badge-orange' },
  confirmed: { label: 'নিশ্চিত', class: 'badge-blue' },
  delivered: { label: 'ডেলিভারি সম্পন্ন', class: 'badge-green' },
  cancelled: { label: 'বাতিল', class: 'badge-red' }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="section-title mb-8">📦 আমার অর্ডার সমূহ</h1>

    <div v-if="myOrders.length > 0" class="space-y-4">
      <router-link v-for="order in myOrders" :key="order.id"
        :to="`/order-confirmation/${order.id}`"
        class="card p-5 md:p-6 block hover:shadow-lg transition-shadow">
        <div class="flex flex-col sm:flex-row justify-between gap-4">
          <div class="flex-grow">
            <div class="flex items-center gap-3 mb-3">
              <span class="font-bold text-primary-600">{{ order.id }}</span>
              <span :class="statusMap[order.status]?.class">
                {{ statusMap[order.status]?.label }}
              </span>
            </div>
            <div class="flex flex-wrap gap-2 mb-3">
              <img v-for="item in order.items.slice(0, 4)" :key="item.product.id"
                :src="item.product.imageUrl" :alt="item.product.name"
                class="w-12 h-12 rounded-lg object-cover" />
              <div v-if="order.items.length > 4"
                class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-500 font-medium">
                +{{ order.items.length - 4 }}
              </div>
            </div>
            <p class="text-sm text-gray-400">{{ order.items.length }} টি পণ্য • {{ formatDate(order.createdAt) }}</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-primary-600">৳{{ order.totalAmount }}</p>
            <p class="text-sm text-gray-400">{{ order.paymentMethod }}</p>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20">
      <span class="text-7xl block mb-4">📭</span>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">এখনো কোনো অর্ডার নেই</h2>
      <p class="text-gray-400 mb-6">বাজার থেকে পণ্য কিনুন, অর্ডার এখানে দেখা যাবে</p>
      <router-link to="/marketplace" class="btn-primary inline-block">🏪 বাজারে যান</router-link>
    </div>
  </div>
</template>
