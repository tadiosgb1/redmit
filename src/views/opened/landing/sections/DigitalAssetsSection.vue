<template>
  <section id="assets" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-widest mb-4">
          <i class="fas fa-exchange-alt text-[10px]"></i> Digital Assets Marketplace
        </span>
        <h2 class="text-4xl font-black text-slate-900 mb-4">Buy & Sell Social Media Accounts</h2>
        <p class="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          Browse verified TikTok, Instagram, YouTube, Facebook, Telegram accounts, websites, and domains. Click to buy — or list your own.
        </p>
      </div>

      <!-- Platform filter tabs -->
      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button v-for="tab in tabs" :key="tab.value"
          @click="activeTab = tab.value"
          class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border"
          :class="activeTab === tab.value
            ? 'bg-slate-900 text-white border-slate-900'
            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'">
          <i :class="tab.icon" class="text-sm"></i>
          {{ tab.label }}
        </button>
      </div>

      <!-- Asset cards grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div v-for="asset in filteredAssets" :key="asset.id"
          class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">

          <!-- Platform header -->
          <div class="px-5 py-4 flex items-center justify-between border-b border-slate-100"
               :class="asset.headerBg">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="asset.iconBg">
                <i :class="[asset.platformIcon, asset.iconColor, 'text-lg']"></i>
              </div>
              <div>
                <p class="text-xs font-black text-slate-800">{{ asset.platform }}</p>
                <p class="text-[10px] text-slate-400">{{ asset.niche }}</p>
              </div>
            </div>
            <span class="text-[10px] font-black px-2 py-0.5 rounded-full"
              :class="asset.verified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'">
              {{ asset.verified ? '✓ Verified' : 'Unverified' }}
            </span>
          </div>

          <!-- Stats -->
          <div class="px-5 py-4 space-y-3">
            <div class="grid grid-cols-3 gap-2 text-center">
              <div v-for="stat in asset.stats" :key="stat.label">
                <p class="text-sm font-black text-slate-900">{{ stat.value }}</p>
                <p class="text-[10px] text-slate-400 uppercase tracking-wider">{{ stat.label }}</p>
              </div>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span v-for="tag in asset.tags" :key="tag"
                class="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-semibold">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Price & action -->
          <div class="px-5 pb-5">
            <div class="flex items-center justify-between mb-3">
              <div>
                <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Price</p>
                <p class="text-xl font-black text-slate-900">{{ asset.price }}</p>
                <p class="text-[10px] text-slate-400">{{ asset.priceUSD }}</p>
              </div>
              <div class="text-right">
                <p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Age</p>
                <p class="text-sm font-bold text-slate-700">{{ asset.age }}</p>
              </div>
            </div>
            <button @click="requireLogin"
              class="w-full py-2.5 bg-slate-900 hover:bg-primary text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
              <i class="fas fa-lock text-[10px]"></i>
              View & Buy — Sign In Required
            </button>
          </div>
        </div>
      </div>

      <!-- Sell your own CTA -->
      <div class="mt-14 bg-gradient-to-r from-slate-900 to-primary rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-xl font-black text-white mb-2">Sell Your Social Media Account</h3>
          <p class="text-slate-300 text-sm max-w-lg">
            List your TikTok, Instagram, YouTube, Facebook, Telegram, website or domain. Reach thousands of buyers on Redmit.
          </p>
          <div class="flex flex-wrap gap-4 mt-4">
            <div v-for="p in sellPlatforms" :key="p.name"
              class="flex items-center gap-1.5 text-xs text-white/70">
              <i :class="[p.icon, p.color]"></i>
              {{ p.name }}
            </div>
          </div>
        </div>
        <router-link to="/register"
          class="shrink-0 px-8 py-3.5 bg-secondary hover:bg-secondary-dark text-white font-black text-sm rounded-xl transition-all whitespace-nowrap flex items-center gap-2">
          <i class="fas fa-plus-circle text-xs"></i>
          List Your Asset
        </router-link>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'DigitalAssetsSection',
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { value: 'all',       label: 'All',       icon: 'fas fa-th-large' },
        { value: 'tiktok',    label: 'TikTok',    icon: 'fab fa-tiktok' },
        { value: 'instagram', label: 'Instagram', icon: 'fab fa-instagram' },
        { value: 'youtube',   label: 'YouTube',   icon: 'fab fa-youtube' },
        { value: 'facebook',  label: 'Facebook',  icon: 'fab fa-facebook' },
        { value: 'telegram',  label: 'Telegram',  icon: 'fab fa-telegram' },
        { value: 'website',   label: 'Websites',  icon: 'fas fa-globe' },
      ],
      assets: [
        {
          id: 1, platform: 'TikTok', type: 'tiktok', niche: 'Entertainment / Comedy',
          platformIcon: 'fab fa-tiktok', iconBg: 'bg-black', iconColor: 'text-white',
          headerBg: 'bg-slate-50',
          verified: true,
          stats: [
            { value: '128K', label: 'Followers' },
            { value: '4.2%', label: 'Eng. Rate' },
            { value: '2.1M', label: 'Avg Views' },
          ],
          tags: ['Monetized', 'Ethiopia', '2 yrs'],
          price: '85,000 ETB', priceUSD: '≈ $700 USD', age: '2 years',
        },
        {
          id: 2, platform: 'Instagram', type: 'instagram', niche: 'Fashion & Lifestyle',
          platformIcon: 'fab fa-instagram', iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500', iconColor: 'text-white',
          headerBg: 'bg-pink-50/30',
          verified: true,
          stats: [
            { value: '54K',  label: 'Followers' },
            { value: '3.8%', label: 'Eng. Rate' },
            { value: '98%',  label: 'Organic' },
          ],
          tags: ['High Engagement', 'Fashion', 'Ethiopia'],
          price: '45,000 ETB', priceUSD: '≈ $370 USD', age: '3 years',
        },
        {
          id: 3, platform: 'YouTube', type: 'youtube', niche: 'Tech & Reviews',
          platformIcon: 'fab fa-youtube', iconBg: 'bg-red-600', iconColor: 'text-white',
          headerBg: 'bg-red-50/30',
          verified: true,
          stats: [
            { value: '32K',  label: 'Subscribers' },
            { value: '480',  label: 'Videos' },
            { value: '5.2M', label: 'Total Views' },
          ],
          tags: ['Monetized', 'Tech', 'Amharic'],
          price: '120,000 ETB', priceUSD: '≈ $980 USD', age: '4 years',
        },
        {
          id: 4, platform: 'Facebook', type: 'facebook', niche: 'News & Media',
          platformIcon: 'fab fa-facebook', iconBg: 'bg-blue-600', iconColor: 'text-white',
          headerBg: 'bg-blue-50/30',
          verified: false,
          stats: [
            { value: '210K', label: 'Followers' },
            { value: '2.1%', label: 'Eng. Rate' },
            { value: '15K',  label: 'Avg Reach' },
          ],
          tags: ['Page', 'Ethiopia', 'News'],
          price: '60,000 ETB', priceUSD: '≈ $490 USD', age: '5 years',
        },
        {
          id: 5, platform: 'Telegram', type: 'telegram', niche: 'Business & Finance',
          platformIcon: 'fab fa-telegram', iconBg: 'bg-sky-500', iconColor: 'text-white',
          headerBg: 'bg-sky-50/30',
          verified: true,
          stats: [
            { value: '18K',  label: 'Members' },
            { value: '42%',  label: 'View Rate' },
            { value: 'Daily', label: 'Posts' },
          ],
          tags: ['Active', 'Finance', 'Business'],
          price: '28,000 ETB', priceUSD: '≈ $230 USD', age: '1.5 years',
        },
        {
          id: 6, platform: 'Website', type: 'website', niche: 'E-commerce Store',
          platformIcon: 'fas fa-globe', iconBg: 'bg-emerald-600', iconColor: 'text-white',
          headerBg: 'bg-emerald-50/30',
          verified: true,
          stats: [
            { value: '8K',   label: 'Monthly Visits' },
            { value: '3.2K', label: 'Subscribers' },
            { value: '420', label: 'Products' },
          ],
          tags: ['WordPress', 'Revenue', 'eCommerce'],
          price: '150,000 ETB', priceUSD: '≈ $1,230 USD', age: '2 years',
        },
        {
          id: 7, platform: 'TikTok', type: 'tiktok', niche: 'Music & Dance',
          platformIcon: 'fab fa-tiktok', iconBg: 'bg-black', iconColor: 'text-white',
          headerBg: 'bg-slate-50',
          verified: false,
          stats: [
            { value: '75K',  label: 'Followers' },
            { value: '6.1%', label: 'Eng. Rate' },
            { value: '1.4M', label: 'Avg Views' },
          ],
          tags: ['Music', 'Ethiopia', '1.5 yrs'],
          price: '55,000 ETB', priceUSD: '≈ $450 USD', age: '1.5 years',
        },
        {
          id: 8, platform: 'Instagram', type: 'instagram', niche: 'Food & Cooking',
          platformIcon: 'fab fa-instagram', iconBg: 'bg-gradient-to-br from-purple-500 to-pink-500', iconColor: 'text-white',
          headerBg: 'bg-pink-50/30',
          verified: true,
          stats: [
            { value: '22K',  label: 'Followers' },
            { value: '5.3%', label: 'Eng. Rate' },
            { value: '100%', label: 'Organic' },
          ],
          tags: ['Food', 'High Reach', 'Ethiopia'],
          price: '32,000 ETB', priceUSD: '≈ $260 USD', age: '2 years',
        },
      ],
      sellPlatforms: [
        { name: 'TikTok',    icon: 'fab fa-tiktok',    color: 'text-white' },
        { name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-300' },
        { name: 'YouTube',   icon: 'fab fa-youtube',   color: 'text-red-400' },
        { name: 'Facebook',  icon: 'fab fa-facebook',  color: 'text-blue-300' },
        { name: 'Telegram',  icon: 'fab fa-telegram',  color: 'text-sky-300' },
        { name: 'Website',   icon: 'fas fa-globe',     color: 'text-emerald-300' },
      ],
    };
  },
  computed: {
    filteredAssets() {
      if (this.activeTab === 'all') return this.assets;
      return this.assets.filter(a => a.type === this.activeTab);
    },
  },
  methods: {
    requireLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
