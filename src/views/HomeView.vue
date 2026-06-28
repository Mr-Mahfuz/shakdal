<script setup lang="ts">
import { useProductStore } from '../stores/product'
import { useAuthStore } from '../stores/auth'
import ProductCard from '../components/ProductCard.vue'
import { computed, onMounted } from 'vue'

const productStore = useProductStore()
const authStore = useAuthStore()

onMounted(async () => {
  if (!productStore.isLoaded) {
    await productStore.fetchProducts()
  }
})

const featuredProducts = computed(() =>
  [...productStore.products]
    .sort((a, b) => b.soldCount - a.soldCount)
    .slice(0, 4)
)

const stats = computed(() => ({
  farmers: 150,
  products: productStore.products.length * 45,
  orders: 2800,
  locations: 12
}))
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 text-8xl">🌾</div>
        <div class="absolute bottom-10 right-10 text-8xl">🥬</div>
        <div class="absolute top-1/2 left-1/3 text-6xl">🥭</div>
        <div class="absolute bottom-1/3 right-1/4 text-6xl">🌶️</div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="animate-fade-in-up">
            <span class="inline-block bg-white/20 backdrop-blur-sm text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              {{ $t('home.hero_tag') }}
            </span>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 font-[var(--font-display)]">
              {{ $t('home.hero_title') }}<br />
              <span class="text-primary-200">{{ $t('home.hero_highlight') }}</span>
            </h1>
            <p class="text-lg md:text-xl text-primary-100 max-w-lg mb-8 leading-relaxed">
              {{ $t('home.hero_desc') }}
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link to="/marketplace" class="btn bg-white text-primary-700 hover:bg-primary-50 shadow-lg hover:shadow-xl active:scale-95 font-bold text-lg px-8 py-4 rounded-2xl transition-all">
                {{ $t('home.btn_shop') }}
              </router-link>
              <router-link v-if="!authStore.isLoggedIn" to="/register"
                class="btn bg-primary-500/30 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-4 rounded-2xl transition-all">
                {{ $t('home.btn_join') }}
              </router-link>
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
            <div class="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
              <p class="text-4xl font-bold mb-1">{{ stats.farmers }}+</p>
              <p class="text-primary-200 text-sm">{{ $t('home.stats_farmers') }}</p>
            </div>
            <div class="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
              <p class="text-4xl font-bold mb-1">{{ stats.products }}+</p>
              <p class="text-primary-200 text-sm">{{ $t('home.stats_products') }}</p>
            </div>
            <div class="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
              <p class="text-4xl font-bold mb-1">{{ stats.orders }}+</p>
              <p class="text-primary-200 text-sm">{{ $t('home.stats_orders') }}</p>
            </div>
            <div class="bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
              <p class="text-4xl font-bold mb-1">{{ stats.locations }}</p>
              <p class="text-primary-200 text-sm">{{ $t('home.stats_locations') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L48 74.7C96 69 192 59 288 48C384 37 480 27 576 32C672 37 768 59 864 64C960 69 1056 59 1152 48C1248 37 1344 27 1392 21.3L1440 16V80H0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-16 md:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">কিভাবে কাজ করে?</h2>
          <p class="section-subtitle">মাত্র তিনটি সহজ ধাপে তাজা পণ্য আপনার দোরগোড়ায়</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-8 card rounded-2xl group hover:border-primary-200 transition-all">
            <div class="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl group-hover:scale-110 transition-transform">
              👨‍🌾
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">কৃষক পণ্য তালিকায় রাখেন</h3>
            <p class="text-gray-500 leading-relaxed">কৃষক তার তাজা ফসলের ছবি, দাম এবং পরিমাণ সহজেই যোগ করেন</p>
          </div>
          <div class="text-center p-8 card rounded-2xl group hover:border-accent-200 transition-all">
            <div class="w-20 h-20 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl group-hover:scale-110 transition-transform">
              🛒
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">ক্রেতা পছন্দমতো কেনেন</h3>
            <p class="text-gray-500 leading-relaxed">ক্রেতা বিভিন্ন কৃষকের পণ্য ব্রাউজ করে কার্টে যোগ করেন</p>
          </div>
          <div class="text-center p-8 card rounded-2xl group hover:border-blue-200 transition-all">
            <div class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5 text-4xl group-hover:scale-110 transition-transform">
              🚚
            </div>
            <h3 class="text-xl font-bold text-gray-800 mb-3">সরাসরি ডেলিভারি</h3>
            <p class="text-gray-500 leading-relaxed">মধ্যস্বত্বভোগী ছাড়াই তাজা পণ্য সরাসরি আপনার ঠিকানায় পৌঁছে যায়</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-16 md:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h2 class="section-title">🔥 জনপ্রিয় পণ্যসমূহ</h2>
            <p class="section-subtitle mb-0">সবচেয়ে বেশি বিক্রি হওয়া তাজা পণ্য</p>
          </div>
          <router-link to="/marketplace" class="btn-secondary hidden sm:flex">
            সব পণ্য দেখুন →
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>

        <div class="text-center mt-8 sm:hidden">
          <router-link to="/marketplace" class="btn-primary">সব পণ্য দেখুন →</router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="py-16 md:py-24 bg-primary-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="section-title">কেন শাকডাল?</h2>
          <p class="section-subtitle">আমাদের প্ল্যাটফর্মের বিশেষত্ব</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-primary-100 hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-3">💰</div>
            <h3 class="font-bold text-gray-800 mb-2">ন্যায্য মূল্য</h3>
            <p class="text-sm text-gray-500">মধ্যস্বত্বভোগী নেই, তাই কৃষক ভালো দাম পায় এবং ক্রেতা কম দামে কেনে</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-primary-100 hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-3">🌿</div>
            <h3 class="font-bold text-gray-800 mb-2">১০০% তাজা</h3>
            <p class="text-sm text-gray-500">সরাসরি খেত থেকে আসে, তাই পণ্যের গুণগত মান সবচেয়ে ভালো থাকে</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-primary-100 hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-3">👨‍🌾</div>
            <h3 class="font-bold text-gray-800 mb-2">কৃষকের ক্ষমতায়ন</h3>
            <p class="text-sm text-gray-500">কৃষকরা নিজেই তাদের পণ্যের দাম নির্ধারণ করতে পারেন</p>
          </div>
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-primary-100 hover:shadow-lg transition-shadow">
            <div class="text-3xl mb-3">📱</div>
            <h3 class="font-bold text-gray-800 mb-2">সহজ ব্যবহার</h3>
            <p class="text-sm text-gray-500">অত্যন্ত সহজ ইন্টারফেস, যেকোনো কৃষক সহজেই ব্যবহার করতে পারবেন</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Testimonials -->
    <section class="py-16 md:py-24 bg-white relative overflow-hidden">
      <!-- Decor -->
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50"></div>
      <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-accent-50 rounded-full blur-3xl opacity-50"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12">
          <h2 class="section-title">{{ $t('home.testimonials_title') }}</h2>
          <p class="section-subtitle">{{ $t('home.testimonials_subtitle') }}</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="card p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
            <div class="text-6xl absolute top-2 right-4 text-primary-200/50 font-serif leading-none">"</div>
            <p class="text-gray-600 italic mb-6 relative z-10">
              {{ $t('home.testi_1_desc') }}
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700 text-lg">T</div>
              <div>
                <p class="font-bold text-gray-800">{{ $t('home.testi_1_name') }}</p>
                <p class="text-sm text-primary-600 font-medium">{{ $t('home.testi_role_customer') }}</p>
              </div>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div class="card p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
            <div class="text-6xl absolute top-2 right-4 text-primary-200/50 font-serif leading-none">"</div>
            <p class="text-gray-600 italic mb-6 relative z-10">
              {{ $t('home.testi_2_desc') }}
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center font-bold text-accent-700 text-lg">F</div>
              <div>
                <p class="font-bold text-gray-800">{{ $t('home.testi_2_name') }}</p>
                <p class="text-sm text-accent-600 font-medium">{{ $t('home.testi_role_customer') }}</p>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="card p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow">
            <div class="text-6xl absolute top-2 right-4 text-primary-200/50 font-serif leading-none">"</div>
            <p class="text-gray-600 italic mb-6 relative z-10">
              {{ $t('home.testi_3_desc') }}
            </p>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700 text-lg">R</div>
              <div>
                <p class="font-bold text-gray-800">{{ $t('home.testi_3_name') }}</p>
                <p class="text-sm text-blue-600 font-medium">{{ $t('home.testi_role_farmer') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 md:py-24 bg-gradient-to-r from-accent-500 to-accent-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-display)]">
          আজই শুরু করুন!
        </h2>
        <p class="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
          কৃষক হোন বা ক্রেতা — শাকডাল ডট কম আপনার জন্য। রেজিস্ট্রেশন সম্পূর্ণ বিনামূল্যে!
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link to="/register"
            class="btn bg-white text-accent-600 hover:bg-orange-50 font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all">
            ফ্রি রেজিস্ট্রেশন করুন
          </router-link>
          <router-link to="/marketplace"
            class="btn bg-accent-400/30 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-4 rounded-2xl transition-all">
            বাজার ঘুরে দেখুন
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
