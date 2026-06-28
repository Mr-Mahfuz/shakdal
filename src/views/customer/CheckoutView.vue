<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart'
import { useAuthStore } from '../../stores/auth'
import { useOrderStore } from '../../stores/order'

const cartStore = useCartStore()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const router = useRouter()

const loading = ref(false)

const form = reactive({
  address: authStore.user?.location || '',
  phone: authStore.user?.phone || '',
  notes: '',
  paymentMethod: 'cash'
})

async function placeOrder() {
  if (!form.address.trim() || !form.phone.trim()) return

  loading.value = true
  await new Promise(r => setTimeout(r, 1200))

  const order = await orderStore.placeOrder({
    customerId: authStore.user!.id,
    customerName: authStore.user!.name,
    customerPhone: form.phone,
    deliveryAddress: form.address,
    items: [...cartStore.items],
    totalAmount: cartStore.totalPrice,
    paymentMethod: form.paymentMethod === 'cash' ? 'ক্যাশ অন ডেলিভারি' : 'বিকাশ'
  })

  cartStore.clearCart()
  loading.value = false
  if (order) {
    router.push(`/order-confirmation/${order.id}`)
  } else {
    alert('অর্ডার করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।')
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="section-title mb-8">📋 চেকআউট</h1>

    <div v-if="!cartStore.isEmpty" class="grid md:grid-cols-5 gap-8">
      <!-- Form -->
      <div class="md:col-span-3">
        <div class="card p-6 md:p-8">
          <h2 class="text-lg font-bold text-gray-800 mb-6">ডেলিভারির তথ্য</h2>

          <form @submit.prevent="placeOrder" class="space-y-5">
            <div>
              <label class="label">👤 আপনার নাম</label>
              <input :value="authStore.user?.name" disabled class="input-field bg-gray-50 text-gray-500" />
            </div>
            <div>
              <label class="label">📱 ফোন নম্বর</label>
              <input v-model="form.phone" type="tel" placeholder="01XXXXXXXXX" class="input-field" required />
            </div>
            <div>
              <label class="label">📍 ডেলিভারি ঠিকানা</label>
              <textarea v-model="form.address" rows="3" placeholder="সম্পূর্ণ ঠিকানা লিখুন..." class="input-field resize-none" required></textarea>
            </div>
            <div>
              <label class="label">📝 অতিরিক্ত নোট (ঐচ্ছিক)</label>
              <input v-model="form.notes" type="text" placeholder="যেমন: দুপুরের মধ্যে দিলে ভালো হয়" class="input-field" />
            </div>

            <!-- Payment Method -->
            <div>
              <label class="label mb-3">💰 পেমেন্ট পদ্ধতি</label>
              <div class="grid grid-cols-2 gap-3">
                <label
                  :class="[
                    'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                    form.paymentMethod === 'cash'
                      ? 'border-primary-300 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  ]">
                  <input v-model="form.paymentMethod" type="radio" value="cash" class="hidden" />
                  <span class="text-2xl">💵</span>
                  <div>
                    <p class="font-semibold text-gray-800 text-sm">ক্যাশ অন ডেলিভারি</p>
                    <p class="text-xs text-gray-400">হাতে হাতে টাকা</p>
                  </div>
                </label>
                <label
                  :class="[
                    'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                    form.paymentMethod === 'bkash'
                      ? 'border-pink-300 bg-pink-50'
                      : 'border-gray-200 hover:border-gray-300'
                  ]">
                  <input v-model="form.paymentMethod" type="radio" value="bkash" class="hidden" />
                  <span class="text-2xl">📲</span>
                  <div>
                    <p class="font-semibold text-gray-800 text-sm">বিকাশ</p>
                    <p class="text-xs text-gray-400">মোবাইল পেমেন্ট</p>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" :disabled="loading" class="btn-accent w-full text-lg py-4 mt-4 disabled:opacity-60">
              <span v-if="loading" class="animate-spin mr-2">⏳</span>
              {{ loading ? 'অর্ডার প্রক্রিয়াধীন...' : '✓ অর্ডার নিশ্চিত করুন' }}
            </button>
          </form>
        </div>
      </div>

      <!-- Order Summary Sidebar -->
      <div class="md:col-span-2">
        <div class="card p-6 sticky top-24">
          <h3 class="font-bold text-gray-800 mb-4">অর্ডার সারসংক্ষেপ</h3>
          <div class="space-y-3 mb-4">
            <div v-for="item in cartStore.items" :key="item.product.id"
              class="flex items-center gap-3">
              <img :src="item.product.imageUrl" :alt="item.product.name"
                class="w-12 h-12 rounded-lg object-cover" />
              <div class="flex-grow min-w-0">
                <p class="text-sm font-medium text-gray-700 truncate">{{ item.product.name }}</p>
                <p class="text-xs text-gray-400">{{ item.quantity }} × ৳{{ item.product.pricePerKg }}</p>
              </div>
              <span class="text-sm font-bold text-gray-700">৳{{ item.product.pricePerKg * item.quantity }}</span>
            </div>
          </div>
          <div class="border-t border-gray-100 pt-4 space-y-2">
            <div class="flex justify-between text-sm text-gray-500">
              <span>সাবটোটাল</span>
              <span>৳{{ cartStore.totalPrice }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-500">
              <span>ডেলিভারি</span>
              <span class="text-primary-600">ফ্রি</span>
            </div>
            <div class="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-100">
              <span>মোট</span>
              <span class="text-primary-600">৳{{ cartStore.totalPrice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty -->
    <div v-else class="text-center py-20">
      <span class="text-7xl block mb-4">🧺</span>
      <h2 class="text-2xl font-bold text-gray-600 mb-2">কার্ট খালি!</h2>
      <p class="text-gray-400 mb-6">চেকআউট করতে হলে প্রথমে কার্টে পণ্য যোগ করুন</p>
      <router-link to="/marketplace" class="btn-primary inline-block">🏪 বাজারে যান</router-link>
    </div>
  </div>
</template>
