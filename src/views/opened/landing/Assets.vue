<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 antialiased">
    <Header />

    <main class="pt-16">
      <section class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-b border-slate-100">
        <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-blue-200/30 blur-3xl pointer-events-none"></div>
        <div class="relative max-w-7xl mx-auto px-6 py-12 sm:py-14 lg:py-16">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div class="max-w-3xl">
              <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm"><i class="fas fa-bullhorn text-[10px]"></i> Social Media Marketing</span>
              <h1 class="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight tracking-tight">Find social media accounts <span class="text-indigo-600">ready to grow.</span></h1>
              <p class="mt-4 text-base text-slate-600 leading-7 max-w-2xl">Browse available social media accounts on Redmit. Compare platforms, audiences, followers, engagement and pricing in one place.</p>
            </div>
            <div class="mx-auto w-full max-w-md lg:ml-auto" aria-label="Hand-drawn social media platform illustration">
              <svg viewBox="0 0 440 300" role="img" aria-labelledby="social-platforms-sketch-title" class="w-full h-auto">
                <title id="social-platforms-sketch-title">Brand-inspired sketches for TikTok, Instagram, YouTube, Facebook and Telegram</title>
                <g fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M50 145 Q110 95 172 140 T282 140 T390 145" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 7"/>
                  <path d="M43 47 Q45 36 58 39 L112 45 Q124 47 122 60 L116 105 Q115 117 102 114 L49 108 Q37 106 39 94 Z" fill="#fff" stroke="#E1306C" stroke-width="2.5"/>
                  <rect x="61" y="57" width="40" height="40" rx="11" stroke="#E1306C" stroke-width="2.5"/><circle cx="81" cy="77" r="9" stroke="#F77737" stroke-width="2.5"/><circle cx="94" cy="64" r="2.5" fill="#F77737" stroke="#F77737"/>
                  <path d="M157 25 Q170 16 182 27 L207 51 Q216 60 206 71 L180 96 Q170 106 160 96 L136 72 Q126 62 136 51 Z" fill="#fff" stroke="#111827" stroke-width="2.5"/>
                  <path d="M168 35 L181 40 L190 51 L184 60 L182 74 L172 71 L169 60 L160 53 Z" fill="#111827" stroke="#111827" stroke-width="1.5"/>
                  <path d="M296 42 Q294 30 308 30 L365 31 Q378 31 378 44 L377 88 Q377 100 364 100 L307 99 Q294 99 295 86 Z" fill="#fff" stroke="#FF0000" stroke-width="2.5"/>
                  <path d="M323 49 L323 80 L350 65 Z" fill="#FF0000" stroke="#FF0000" stroke-width="2"/>
                  <path d="M44 177 Q45 165 58 166 L112 170 Q124 171 124 184 L121 228 Q120 240 107 239 L53 234 Q41 233 42 220 Z" fill="#fff" stroke="#1877F2" stroke-width="2.5"/>
                  <path d="M88 228 L88 204 L99 204 L101 190 L88 190 L88 182 Q88 174 97 174 L103 174 L103 163 L92 163 Q73 163 73 182 L73 190 L64 190 L64 204 L73 204 L73 228" stroke="#1877F2" stroke-width="3"/>
                  <path d="M299 174 Q299 162 312 164 L368 170 Q381 172 379 185 L373 229 Q371 241 359 239 L303 233 Q291 231 293 219 Z" fill="#fff" stroke="#229ED9" stroke-width="2.5"/>
                  <path d="M312 198 L356 182 Q363 179 361 188 L350 218 Q348 225 342 220 L331 211 L322 219 L324 205 Z" fill="#229ED9" stroke="#229ED9" stroke-width="2"/>
                  <path d="M194 110 Q205 100 217 111 L231 126 Q238 135 228 145 L213 160 Q204 167 195 158 L181 143 Q175 134 184 124 Z" fill="#fff" stroke="#111827" stroke-width="2.5"/>
                  <path d="M204 117 L216 121 L224 132 L218 141 L216 153 L206 150 L203 139 L195 132 Z" fill="#111827" stroke="#111827" stroke-width="1.5"/>
                  <path d="M267 113 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 Z" stroke="#f59e0b" stroke-width="2"/>
                  <path d="M143 144 l3 7 l7 3 l-7 3 l-3 7 l-3 -7 l-7 -3 l7 -3 Z" stroke="#0d9488" stroke-width="2"/>
                  <path d="M127 265 Q165 282 198 264 M247 264 Q280 282 315 263" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 6"/>
                </g>
                <g font-family="ui-sans-serif,system-ui" font-size="10" font-weight="700" text-anchor="middle">
                  <text x="81" y="129" fill="#BE185D">INSTAGRAM</text><text x="171" y="112" fill="#334155">TIKTOK</text><text x="336" y="116" fill="#B91C1C">YOUTUBE</text><text x="83" y="255" fill="#1D4ED8">FACEBOOK</text><text x="337" y="255" fill="#0284C7">TELEGRAM</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section class="py-14 sm:py-16 bg-slate-50">
        <div class="max-w-7xl mx-auto px-6">
          <div class="mb-5 max-w-xl">
            <label for="assets-search" class="mb-2 block text-xs font-medium text-slate-600">Search social media accounts</label>
            <div class="flex items-center gap-3 border border-slate-200 bg-white px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
              <i class="fas fa-search text-sm text-primary"></i>
              <input id="assets-search" v-model.trim="searchQuery" type="search" placeholder="Search by name, platform, niche…" class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" aria-label="Search social media accounts" />
              <button v-if="searchQuery" type="button" @click="searchQuery = ''" class="text-xs text-slate-500 hover:text-primary">Clear</button>
            </div>
          </div>
          <div class="flex flex-wrap gap-2 justify-start mb-8">
            <button v-for="tab in tabs" :key="tab.value" type="button" @click="activeTab = tab.value" class="flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold transition-colors border" :class="activeTab === tab.value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'">
              <i :class="tab.icon" class="text-sm"></i>{{ tab.label }}
            </button>
          </div>

          <div v-if="loading" class="py-20 text-center text-slate-400">Loading social media accounts...</div>
          <div v-else-if="!filteredAssets.length" class="py-20 text-center text-slate-400">No social media accounts available right now.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <article v-for="asset in filteredAssets" :key="asset.id" class="group bg-white border border-slate-200 rounded-md overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
              <div class="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-slate-50">
                <div class="flex items-center gap-2.5">
                  <div class="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900"><i :class="[platformIcon(asset.socialMediaDetails?.platform), 'text-white text-lg']"></i></div>
                  <div><p class="text-xs font-black text-slate-800">{{ platformName(asset.socialMediaDetails?.platform) }}</p><p class="text-[10px] text-slate-400">{{ asset.socialMediaDetails?.niche || 'Social Media' }}</p></div>
                </div>
                <span class="text-[10px] font-black px-2 py-0.5 rounded-full" :class="asset.isSold ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'">{{ asset.isSold ? 'Sold' : 'Available' }}</span>
              </div>

              <div class="px-5 py-4 space-y-3">
                <h2 class="font-semibold text-slate-800 text-[13px] leading-5 line-clamp-2">{{ asset.name }}</h2>
                <p class="text-[11px] text-slate-500 line-clamp-2 leading-5">{{ asset.description }}</p>
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div><p class="text-sm font-semibold text-slate-900">{{ formatNumber(asset.socialMediaDetails?.followers) }}</p><p class="text-[10px] text-slate-400 uppercase tracking-wider">Followers</p></div>
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
                  <div><p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Price</p><p class="text-base font-semibold text-slate-900">{{ formatPrice(asset.price, asset.currency) }}</p></div>
                  <div class="text-right"><p class="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Seller</p><p class="text-[11px] font-medium text-slate-700">{{ asset.seller?.fullName || asset.seller?.username || 'Redmit seller' }}</p></div>
                </div>
                <button @click="requireLogin" :disabled="asset.isSold" class="w-full py-2.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs font-semibold rounded-md transition-colors duration-200 flex items-center justify-center gap-2">
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
      searchQuery: '',
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
      const query = this.searchQuery.toLowerCase();
      return this.assets.filter((asset) => {
        const platformMatches = this.activeTab === 'all' || asset.socialMediaDetails?.platform === this.activeTab;
        const text = [asset.name, asset.description, asset.socialMediaDetails?.platform, asset.socialMediaDetails?.niche, asset.socialMediaDetails?.username, asset.socialMediaDetails?.country, asset.seller?.fullName, asset.seller?.username].filter(Boolean).join(' ').toLowerCase();
        return platformMatches && (!query || text.includes(query));
      });
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
