<template>
  <section id="assets" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-widest mb-4"><i class="fas fa-exchange-alt text-[10px]"></i> Digital Assets Marketplace</span>
        <h2 class="text-4xl font-black text-slate-900 mb-4">Buy & Sell Social Media Accounts</h2>
        <p class="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">Browse social media accounts currently available on Redmit. Click to buy — or list your own.</p>
      </div>

      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button v-for="tab in tabs" :key="tab.value" @click="activeTab = tab.value" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border" :class="activeTab === tab.value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'">
          <i :class="tab.icon" class="text-sm"></i>{{ tab.label }}
        </button>
      </div>

      <div v-if="loading" class="py-16 text-center text-slate-400">Loading digital assets...</div>
      <div v-else-if="!filteredAssets.length" class="py-16 text-center text-slate-400">No social media assets available right now.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div v-for="asset in filteredAssets" :key="asset.id" class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">
          <div class="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900"><i :class="[platformIcon(asset.socialMediaDetails?.platform), 'text-white text-lg']"></i></div>
              <div><p class="text-xs font-black text-slate-800">{{ platformName(asset.socialMediaDetails?.platform) }}</p><p class="text-[10px] text-slate-400">{{ asset.socialMediaDetails?.niche || 'Social Media' }}</p></div>
            </div>
            <span class="text-[10px] font-black px-2 py-0.5 rounded-full" :class="asset.isSold ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">{{ asset.isSold ? 'Sold' : 'Available' }}</span>
          </div>

          <div class="px-5 py-4 space-y-3">
            <h4 class="font-black text-slate-800 text-sm line-clamp-2">{{ asset.name }}</h4>
            <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">{{ asset.description }}</p>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div><p class="text-sm font-black text-slate-900">{{ formatNumber(asset.socialMediaDetails?.followers) }}</p><p class="text-[10px] text-slate-400 uppercase tracking-wider">Followers</p></div>
              <div><p class="text-sm font-black text-slate-900">{{ asset.socialMediaDetails?.engagementRate ? `${asset.socialMediaDetails.engagementRate}%` : '—' }}</p><p class="text-[10px] text-slate-400 uppercase tracking-wider">Eng. Rate</p></div>
              <div><p class="text-sm font-black text-slate-900">{{ formatNumber(asset.socialMediaDetails?.views || asset.socialMediaDetails?.posts) }}</p><p class="text-[10px] text-slate-400 uppercase tracking-wider">{{ asset.socialMediaDetails?.views ? 'Views' : 'Posts' }}</p></div>
            </div>
            <div class="flex flex-wrap gap-1.5 pt-1">
              <span v-if="asset.socialMediaDetails?.country" class="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-semibold">{{ asset.socialMediaDetails.country }}</span>
              <span v-if="asset.socialMediaDetails?.username" class="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-semibold">@{{ asset.socialMediaDetails.username }}</span>
            </div>
          </div>

          <div class="px-5 pb-5">
            <div class="flex items-center justify-between mb-3"><div><p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Price</p><p class="text-xl font-black text-slate-900">{{ formatPrice(asset.price, asset.currency) }}</p></div><div class="text-right"><p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Seller</p><p class="text-xs font-bold text-slate-700">{{ asset.seller?.fullName || asset.seller?.username || 'Redmit seller' }}</p></div></div>
            <button @click="requireLogin" :disabled="asset.isSold" class="w-full py-2.5 bg-slate-900 hover:bg-primary disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"><i class="fas fa-lock text-[10px]"></i>{{ asset.isSold ? 'Sold' : 'View & Buy — Sign In Required' }}</button>
          </div>
        </div>
      </div>

      <div class="mt-14 bg-gradient-to-r from-slate-900 to-primary rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6"><div><h3 class="text-xl font-black text-white mb-2">Sell Your Social Media Account</h3><p class="text-slate-300 text-sm max-w-lg">List your social media account and reach buyers on Redmit.</p></div><router-link to="/register" class="shrink-0 px-8 py-3.5 bg-secondary hover:bg-secondary-dark text-white font-black text-sm rounded-xl transition-all whitespace-nowrap flex items-center gap-2"><i class="fas fa-plus-circle text-xs"></i>List Your Asset</router-link></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DigitalAssetsSection',
  props: { assets: { type: Array, default: () => [] }, loading: { type: Boolean, default: false } },
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { value: 'all', label: 'All', icon: 'fas fa-th-large' },
        { value: 'TIKTOK', label: 'TikTok', icon: 'fab fa-tiktok' },
        { value: 'INSTAGRAM', label: 'Instagram', icon: 'fab fa-instagram' },
        { value: 'YOUTUBE', label: 'YouTube', icon: 'fab fa-youtube' },
        { value: 'FACEBOOK', label: 'Facebook', icon: 'fab fa-facebook' },
        { value: 'TELEGRAM', label: 'Telegram', icon: 'fab fa-telegram' },
      ],
    };
  },
  computed: { filteredAssets() { return this.activeTab === 'all' ? this.assets : this.assets.filter(a => a.socialMediaDetails?.platform === this.activeTab); } },
  methods: {
    formatPrice(price, currency) { return `${currency || 'USD'} ${Number(price || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`; },
    formatNumber(value) { if (value === null || value === undefined) return '—'; const n = Number(value); if (Number.isNaN(n)) return value; return n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : n.toLocaleString(); },
    platformName(platform) { return platform ? platform.charAt(0) + platform.slice(1).toLowerCase() : 'Social Media'; },
    platformIcon(platform) { return ({ TIKTOK: 'fab fa-tiktok', INSTAGRAM: 'fab fa-instagram', YOUTUBE: 'fab fa-youtube', FACEBOOK: 'fab fa-facebook', TELEGRAM: 'fab fa-telegram' })[platform] || 'fas fa-globe'; },
    requireLogin() { this.$router.push('/login'); },
  },
};
</script>
