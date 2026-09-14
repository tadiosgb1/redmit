<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 antialiased">
    <Header />

    <main class="pt-16">
      <section class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-b border-slate-100">
        <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl pointer-events-none"></div>
        <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm">
              <i class="fas fa-bullhorn text-[10px]"></i> Social Media Marketing
            </span>
            <h1 class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight">
              Find social media accounts <span class="text-indigo-600">ready to grow.</span>
            </h1>
            <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Browse available social media accounts on Redmit. Compare platforms, audiences, followers, engagement and pricing in one place.
            </p>
          </div>
        </div>
      </section>

      <section class="py-16 sm:py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-6">
          <div class="flex flex-wrap gap-2 justify-center mb-10">
            <button v-for="tab in tabs" :key="tab.value" type="button" @click="activeTab = tab.value" class="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border" :class="activeTab === tab.value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'">
              <i :class="tab.icon" class="text-sm"></i>{{ tab.label }}
            </button>
          </div>

          <div v-if="loading" class="py-20 text-center text-slate-400">Loading social media accounts...</div>
          <div v-else-if="!filteredAssets.length" class="py-20 text-center text-slate-400">No social media accounts available right now.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <article v-for="asset in filteredAssets" :key="asset.id" class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">
              <div class="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900"><i :class="[platformIcon(asset.socialMediaDetails?.platform), 'text-white text-lg']"></i></div>
                  <div><p class="text-xs font-black text-slate-800">{{ platformName(asset.socialMediaDetails?.platform) }}</p><p class="text-[10px] text-slate-400">{{ asset.socialMediaDetails?.niche || 'Social Media' }}</p></div>
                </div>
                <span class="text-[10px] font-black px-2 py-0.5 rounded-full" :class="asset.isSold ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">{{ asset.isSold ? 'Sold' : 'Available' }}</span>
              </div>

              <div class="px-5 py-4 space-y-3">
                <h2 class="font-black text-slate-800 text-sm line-clamp-2">{{ asset.name }}</h2>
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
                <div class="flex items-center justify-between mb-3">
                  <div><p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Price</p><p class="text-xl font-black text-slate-900">{{ formatPrice(asset.price, asset.currency) }}</p></div>
                  <div class="text-right"><p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Seller</p><p class="text-xs font-bold text-slate-700">{{ asset.seller?.fullName || asset.seller?.username || 'Redmit seller' }}</p></div>
                </div>
                <button @click="requireLogin" :disabled="asset.isSold" class="w-full py-2.5 bg-slate-900 hover:bg-primary disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <i class="fas fa-lock text-[10px]"></i>{{ asset.isSold ? 'Sold' : 'View & Buy — Sign In Required' }}
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'AssetsPage',
  components: { Header, Footer },
  data() {
    return {
      assets: [],
      loading: false,
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
  computed: {
    filteredAssets() {
      return this.activeTab === 'all' ? this.assets : this.assets.filter((asset) => asset.socialMediaDetails?.platform === this.activeTab);
    },
  },
  async mounted() {
    await this.fetchAssets();
  },
  methods: {
    async fetchAssets() {
      this.loading = true;
      try {
        const response = await this.$apiGet('/assets');
        this.assets = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load social media assets:', error);
        this.assets = [];
      } finally {
        this.loading = false;
      }
    },
    formatPrice(price, currency) {
      return `${currency || 'USD'} ${Number(price || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    },
    formatNumber(value) {
      if (value === null || value === undefined) return '—';
      const n = Number(value);
      if (Number.isNaN(n)) return value;
      return n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : n.toLocaleString();
    },
    platformName(platform) {
      return platform ? platform.charAt(0) + platform.slice(1).toLowerCase() : 'Social Media';
    },
    platformIcon(platform) {
      return ({ TIKTOK: 'fab fa-tiktok', INSTAGRAM: 'fab fa-instagram', YOUTUBE: 'fab fa-youtube', FACEBOOK: 'fab fa-facebook', TELEGRAM: 'fab fa-telegram' })[platform] || 'fas fa-globe';
    },
    requireLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
