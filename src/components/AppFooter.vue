<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-3xl">🌿</span>
            <h3 class="text-2xl font-bold text-white font-[var(--font-display)]">
              শাকডাল<span class="text-primary-400">.com</span>
            </h3>
          </div>
          <p class="text-gray-400 max-w-md leading-relaxed">
            সরাসরি কৃষকের কাছ থেকে আপনার ঘরে তাজা শাকসবজি ও ফলমূল। মধ্যস্বত্বভোগী নেই, 
            ন্যায্য দাম এবং সতেজ পণ্য — শুধুমাত্র শাকডাল ডট কম-এ।
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-white font-semibold mb-4">দ্রুত লিংক</h4>
          <ul class="space-y-2">
            <li><router-link to="/" class="hover:text-primary-400 transition-colors">হোম</router-link></li>
            <li><router-link to="/marketplace" class="hover:text-primary-400 transition-colors">বাজার</router-link></li>
            <li><router-link to="/register" class="hover:text-primary-400 transition-colors">রেজিস্ট্রেশন</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-white font-semibold mb-4">যোগাযোগ</h4>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center gap-2">📍 রাজশাহী, বাংলাদেশ</li>
            <li class="flex items-center gap-2">📞 +880 1700-000000</li>
            <li class="flex items-center gap-2">✉️ info@shakdal.com</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-500">&copy; {{ new Date().getFullYear() }} শাকডাল.com — সকল স্বত্ব সংরক্ষিত。</p>
        <p class="text-sm text-gray-500">কৃষকের পাশে, আপনার পাশে 🌾</p>
      </div>
    </div>
  </footer>
</template>
