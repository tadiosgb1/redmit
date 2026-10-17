<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
    <Header />
    <main class="pt-16">
      <section class="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"></div>
        <div class="relative mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 sm:py-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-12 lg:py-20">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-blue-700 shadow-sm"><i class="fas fa-chart-line text-[10px]"></i> Redmit Growth Studio</span>
            <h1 class="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Turn your social presence into <span class="text-blue-600">real growth.</span></h1>
            <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">Practical services for creators, brands and businesses. Get help with platform monetization, audience reach, promotion and consistent content publishing—with clear service pricing.</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a href="#growth-services" class="inline-flex items-center gap-2 rounded-sm bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">Explore services <i class="fas fa-arrow-down text-xs"></i></a>
              <router-link :to="{ path: '/login', query: { redirect: '/contact-us' } }" class="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">Sign in to contact us</router-link>
            </div>
            <div class="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-xs font-medium text-slate-600">
              <span><i class="fas fa-check-circle mr-1.5 text-emerald-500"></i>Transparent listed prices</span>
              <span><i class="fas fa-check-circle mr-1.5 text-emerald-500"></i>Platform-focused support</span>
              <span><i class="fas fa-check-circle mr-1.5 text-emerald-500"></i>Login to get started</span>
            </div>
          </div>
          <div class="mx-auto w-full max-w-md lg:ml-auto">
            <div class="rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-xl shadow-blue-100/50">
              <div class="mb-6 flex items-center justify-between"><div><p class="text-xs font-bold uppercase tracking-widest text-slate-400">Growth snapshot</p><p class="mt-1 text-lg font-bold text-slate-900">Build your next milestone</p></div><div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><i class="fas fa-chart-line text-lg"></i></div></div>
              <div class="flex h-36 items-end gap-3 rounded-xl bg-gradient-to-b from-blue-50 to-white px-5 pb-4 pt-6">
                <div v-for="(bar, index) in [34,48,42,62,56,78,94]" :key="index" class="flex-1 rounded-t-md bg-blue-500/80" :style="{ height: bar + '%' }"></div>
              </div>
              <div class="mt-4 grid grid-cols-2 gap-3"><div class="rounded-lg border border-slate-100 p-3"><i class="fab fa-youtube text-red-500"></i><p class="mt-2 text-xs font-semibold text-slate-700">Monetization support</p></div><div class="rounded-lg border border-slate-100 p-3"><i class="fas fa-bullhorn text-indigo-500"></i><p class="mt-2 text-xs font-semibold text-slate-700">Targeted promotion</p></div></div>
              <p class="mt-4 text-[11px] leading-5 text-slate-400">Illustrative growth graphic, not a promise of results. Actual outcomes depend on platform rules, content and audience.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="growth-services" class="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p class="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Our services</p><h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Growth services built around your goals</h2><p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Explore available services, review the price and choose the support that fits your channel or business.</p></div>
          <p v-if="pagination.total" class="text-sm text-slate-500">{{ pagination.total }} service{{ pagination.total === 1 ? '' : 's' }} available</p>
        </div>

        <div class="mb-6 flex flex-col gap-3 sm:flex-row">
          <div class="flex min-w-0 flex-1 items-center gap-3 border border-slate-200 bg-white px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"><i class="fas fa-search text-sm text-primary"></i><input v-model.trim="searchQuery" type="search" placeholder="Search services or platforms…" aria-label="Search growth services" class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" /><button v-if="searchQuery" type="button" @click="searchQuery = ''" class="text-xs text-slate-500 hover:text-primary">Clear</button></div>
          <select v-model="activeType" aria-label="Filter by service type" class="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-primary"><option value="all">All service types</option><option v-for="type in availableTypes" :key="type" :value="type">{{ typeLabel(type) }}</option></select>
        </div>

        <div v-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"><div v-for="n in 6" :key="n" class="h-72 animate-pulse rounded-xl border border-slate-200 bg-white"></div></div>
        <div v-else-if="error" class="border border-amber-200 bg-amber-50 p-8"><div class="flex items-start gap-3"><i class="fas fa-exclamation-circle mt-1 text-amber-600"></i><div><h3 class="font-bold text-slate-900">Services couldn’t be loaded</h3><p class="mt-1 text-sm text-slate-600">Please try again in a moment.</p><button type="button" @click="fetchGrowthServices" class="mt-4 border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Try again</button></div></div></div>
        <div v-else-if="!filteredServices.length" class="border border-slate-200 bg-white px-6 py-16 text-center"><div class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><i class="fas fa-search"></i></div><h3 class="mt-4 font-bold text-slate-900">No matching services</h3><p class="mt-1 text-sm text-slate-500">{{ searchQuery || activeType !== 'all' ? 'Try a different search or service type.' : 'New growth services will appear here when available.' }}</p><button v-if="searchQuery || activeType !== 'all'" @click="clearFilters" class="mt-4 text-sm font-semibold text-blue-700 hover:text-blue-900">Clear filters</button></div>
        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="service in filteredServices" :key="service.id" class="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60">
            <div class="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-4"><div class="flex h-11 w-11 items-center justify-center rounded-xl" :class="serviceIconStyle(service.type, service)"><i :class="[serviceIcon(service.type, service), 'text-lg']"></i></div><span class="max-w-[65%] rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{{ typeLabel(service.type) }}</span></div>
            <div class="flex flex-1 flex-col p-5"><h3 class="text-base font-bold leading-snug text-slate-900 group-hover:text-blue-700">{{ service.name }}</h3><p class="mt-3 flex-1 text-sm leading-6 text-slate-600">{{ service.description || 'Professional support to help improve your social media presence.' }}</p><div class="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4"><div><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Listed price</p><p class="mt-1 text-2xl font-bold tracking-tight text-slate-950">{{ formatPrice(service.price, service.currency) }}</p><p class="mt-1 text-[10px] text-slate-400">Service scope confirmed after sign-in</p></div><div class="text-right"><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Provider</p><p class="mt-1 text-xs font-semibold text-slate-700">{{ service.provider?.fullName || service.provider?.username || 'Redmit team' }}</p></div></div><button type="button" @click="startService(service)" class="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"><i :class="localIsAuthenticated ? 'fas fa-arrow-right' : 'fas fa-lock'" class="text-xs"></i>{{ localIsAuthenticated ? 'Contact us about this service' : 'Sign in to get started' }}</button></div>
          </article>
        </div>

        <div v-if="!loading && !error && pagination.totalPages > 1" class="mt-10 flex items-center justify-center gap-3"><button type="button" :disabled="page <= 1" @click="changePage(page - 1)" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:border-blue-300 hover:text-blue-700"><i class="fas fa-chevron-left text-xs"></i></button><span class="text-sm font-semibold text-slate-600">Page {{ page }} of {{ pagination.totalPages }}</span><button type="button" :disabled="page >= pagination.totalPages" @click="changePage(page + 1)" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:border-blue-300 hover:text-blue-700"><i class="fas fa-chevron-right text-xs"></i></button></div>
      </section>

      <section class="border-t border-slate-200 bg-white"><div class="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between"><div><p class="text-xs font-black uppercase tracking-widest text-blue-600">Have a goal in mind?</p><h2 class="mt-2 text-2xl font-bold text-slate-950">Let’s plan your next step.</h2><p class="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Sign in to request a service or contact our team if you need help choosing the right approach.</p></div><div class="flex flex-wrap gap-3"><router-link to="/login" class="inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">Sign in <i class="fas fa-arrow-right text-xs"></i></router-link><router-link :to="{ path: '/login', query: { redirect: '/contact-us' } }" class="inline-flex items-center gap-2 border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-700">Sign in to contact us</router-link></div></div></section>
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
