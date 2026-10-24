<template>
  <div class="min-h-screen bg-white font-sans text-slate-800 antialiased">
    <Header />
    <main class="pt-16">
      <section class="border-b border-slate-200 bg-slate-50">
        <div class="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p class="text-xs font-bold uppercase tracking-widest text-blue-700">Redmit Growth Services</p>
          <h1 class="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">Practical support for your next stage of growth</h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">Explore services for creators, brands and businesses. Compare listed prices, find support that fits your goals, and sign in when you're ready to get started.</p>
          <a href="#growth-services" class="mt-6 inline-flex items-center gap-2 bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">Browse growth services <i class="fas fa-arrow-down text-xs"></i></a>
        </div>
      </section>

      <section id="growth-services" class="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <div class="mb-7">
          <h2 class="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Available services</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Review the service details and listed price to find the right fit for your needs.</p>
          <p v-if="pagination.total" class="mt-3 text-sm text-slate-500">{{ pagination.total }} service{{ pagination.total === 1 ? '' : 's' }} available</p>
        </div>

        <div class="mb-6 flex flex-col gap-3 sm:flex-row">
          <div class="flex min-w-0 flex-1 items-center gap-3 border border-slate-200 bg-white px-4 py-3 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
            <i class="fas fa-search text-sm text-slate-400"></i>
            <input v-model.trim="searchQuery" type="search" placeholder="Search services or platforms..." aria-label="Search growth services" class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
            <button v-if="searchQuery" type="button" @click="searchQuery = ''" class="text-xs text-slate-500 hover:text-blue-700">Clear</button>
          </div>
          <select v-model="activeType" aria-label="Filter by service type" class="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-600">
            <option value="all">All service types</option>
            <option v-for="type in availableTypes" :key="type" :value="type">{{ typeLabel(type) }}</option>
          </select>
        </div>

        <div v-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 6" :key="n" class="h-64 animate-pulse border border-slate-200 bg-slate-50"></div>
        </div>
        <div v-else-if="error" class="border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <div class="flex items-start gap-3">
            <i class="fas fa-exclamation-circle mt-1 text-amber-600"></i>
            <div><h3 class="font-bold text-slate-900">Services couldn't be loaded</h3><p class="mt-1 text-sm text-slate-600">Please try again in a moment.</p><button type="button" @click="fetchGrowthServices" class="mt-4 border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Try again</button></div>
          </div>
        </div>
        <div v-else-if="!filteredServices.length" class="border border-slate-200 bg-white px-6 py-14 text-center">
          <i class="fas fa-search text-xl text-slate-400"></i>
          <h3 class="mt-3 font-bold text-slate-900">No matching services</h3>
          <p class="mt-1 text-sm text-slate-500">{{ searchQuery || activeType !== 'all' ? 'Try a different search or service type.' : 'New growth services will appear here when available.' }}</p>
          <button v-if="searchQuery || activeType !== 'all'" type="button" @click="clearFilters" class="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900">Clear filters</button>
        </div>
        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="service in filteredServices" :key="service.id" class="flex flex-col border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-md">
            <div class="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" :class="serviceIconStyle(service.type, service)"><i :class="[serviceIcon(service.type, service), 'text-lg']"></i></div>
              <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ typeLabel(service.type) }}</span>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <h3 class="text-base font-bold leading-snug text-slate-900">{{ service.name }}</h3>
              <p class="mt-3 flex-1 text-sm leading-6 text-slate-600">{{ service.description || 'Professional support to help improve your social media presence.' }}</p>
              <div class="mt-5 border-t border-slate-100 pt-4">
                <p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Listed price</p>
                <p class="mt-1 text-2xl font-bold tracking-tight text-slate-950">{{ formatPrice(service.price, service.currency) }}</p>
                <p class="mt-1 text-xs text-slate-500">Service scope confirmed after sign-in</p>
                <p class="mt-3 text-xs text-slate-500">Provider: <span class="font-medium text-slate-700">{{ service.provider?.fullName || service.provider?.username || 'Redmit team' }}</span></p>
              </div>
              <button type="button" @click="startService(service)" class="mt-5 inline-flex w-full items-center justify-center gap-2 bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">
                <i :class="localIsAuthenticated ? 'fas fa-arrow-right' : 'fas fa-lock'" class="text-xs"></i>{{ localIsAuthenticated ? 'Contact us about this service' : 'Sign in to get started' }}
              </button>
            </div>
          </article>
        </div>

        <div v-if="!loading && !error && pagination.totalPages > 1" class="mt-9 flex items-center justify-center gap-3">
          <button type="button" :disabled="page <= 1" @click="changePage(page - 1)" aria-label="Previous page" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:border-blue-300 hover:text-blue-700"><i class="fas fa-chevron-left text-xs"></i></button>
          <span class="text-sm font-semibold text-slate-600">Page {{ page }} of {{ pagination.totalPages }}</span>
          <button type="button" :disabled="page >= pagination.totalPages" @click="changePage(page + 1)" aria-label="Next page" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:border-blue-300 hover:text-blue-700"><i class="fas fa-chevron-right text-xs"></i></button>
        </div>
      </section>

      <section class="border-t border-slate-200 bg-slate-50">
        <div class="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div><h2 class="text-xl font-bold text-slate-950 sm:text-2xl">Need help choosing a service?</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Sign in to get started or reach out to our team with your questions.</p></div>
          <router-link :to="localIsAuthenticated ? '/dashboard/growth' : { path: '/login', query: { redirect: '/dashboard/growth' } }" class="inline-flex shrink-0 items-center justify-center gap-2 self-start bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 sm:self-auto">{{ localIsAuthenticated ? 'Open Growth dashboard' : 'Sign in to get started' }} <i class="fas fa-arrow-right text-xs"></i></router-link>
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
  name: 'GrowthServicesPage',
  components: { Header, Footer },
  data() {
    return {
      services: [],
      localIsAuthenticated: !!localStorage.getItem('token'),
      loading: false,
      error: false,
      searchQuery: '',
      activeType: 'all',
      page: Number(this.$route.query.page) || 1,
      pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    };
  },
  computed: {
    availableTypes() {
      return [...new Set(this.services.map(service => service.type).filter(Boolean))].sort();
    },
    filteredServices() {
      const query = this.searchQuery.toLowerCase();
      return this.services.filter(service => {
        const typeMatches = this.activeType === 'all' || service.type === this.activeType;
        const searchable = [service.name, service.slug, service.type, service.description, service.provider?.fullName, service.provider?.username].filter(Boolean).join(' ').toLowerCase();
        return typeMatches && (!query || searchable.includes(query));
      });
    },
  },
  mounted() {
    this.fetchGrowthServices();
  },
  watch: {
    '$route.query.page'(value) {
      const nextPage = Number(value) || 1;
      if (nextPage !== this.page) {
        this.page = nextPage;
        this.fetchGrowthServices();
      }
    },
  },
  methods: {
    async fetchGrowthServices() {
      this.loading = true;
      this.error = false;
      try {
        const response = await this.$apiGet(`/growth?page=${this.page}&limit=10`);
        this.services = Array.isArray(response?.data) ? response.data.filter(service => service.isActive !== false) : [];
        this.pagination = response?.pagination || { total: this.services.length, page: this.page, limit: 10, totalPages: 1 };
      } catch (error) {
        console.error('Failed to load growth services:', error);
        this.services = [];
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
    changePage(nextPage) {
      if (nextPage < 1 || nextPage > this.pagination.totalPages) return;
      this.$router.push({ path: '/growth', query: { page: String(nextPage) } });
    },
    clearFilters() {
      this.searchQuery = '';
      this.activeType = 'all';
    },
    startService(service) {
      const target = '/dashboard/growth?service=' + encodeURIComponent(service.slug || service.id);
      if (localStorage.getItem('token')) { this.$router.push(target); return; }
      this.$router.push({ path: '/login', query: { redirect: target } });
    },
    typeLabel(type) {
      return String(type || 'Growth service').replace(/_/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    serviceIcon(type, service = {}) {
      const value = [type, service.platform, service.name, service.slug, service.description].filter(Boolean).join(' ').toUpperCase();
      if (value.includes('ADOBE')) return 'fab fa-adobe';
      if (value.includes('NODE.JS') || value.includes('NODEJS')) return 'fab fa-node-js';
      if (value.includes('TIKTOK')) return 'fab fa-tiktok';
      if (value.includes('INSTAGRAM')) return 'fab fa-instagram';
      if (value.includes('YOUTUBE')) return 'fab fa-youtube';
      if (value.includes('FACEBOOK')) return 'fab fa-facebook';
      if (value.includes('TELEGRAM')) return 'fab fa-telegram';
      if (value.includes('MONETIZATION')) return 'fas fa-coins';
      if (value.includes('POST') || value.includes('CONTENT')) return 'fas fa-calendar-check';
      if (value.includes('ADS') || value.includes('PROMOTION')) return 'fas fa-bullhorn';
      return 'fas fa-chart-line';
    },
    serviceIconStyle(type, service = {}) {
      const value = [type, service.platform, service.name, service.slug, service.description].filter(Boolean).join(' ').toUpperCase();
      if (value.includes('ADOBE')) return 'bg-red-50 text-red-600';
      if (value.includes('NODE.JS') || value.includes('NODEJS')) return 'bg-green-50 text-green-700';
      if (value.includes('TIKTOK')) return 'bg-slate-100 text-slate-900';
      if (value.includes('INSTAGRAM')) return 'bg-pink-50 text-pink-600';
      if (value.includes('YOUTUBE')) return 'bg-red-50 text-red-600';
      if (value.includes('FACEBOOK')) return 'bg-blue-50 text-blue-700';
      if (value.includes('TELEGRAM')) return 'bg-sky-50 text-sky-600';
      if (value.includes('MONETIZATION')) return 'bg-emerald-50 text-emerald-700';
      return 'bg-indigo-50 text-indigo-600';
    },
    formatPrice(price, currency) {
      const amount = Number(price);
      if (!Number.isFinite(amount)) return 'Contact us';
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(amount);
    },
  },
};
</script>
