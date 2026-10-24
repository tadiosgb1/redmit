<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
    <Header />
    <main class="pt-16">
      <section class="border-b border-slate-200 bg-white">
        <div class="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p class="text-sm font-semibold text-blue-600">Redmit Pay For Me</p>
          <h1 class="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Pay for digital services, made simple.</h1>
          <p class="mt-3 max-w-xl text-sm leading-6 text-slate-600">Choose a listed service or request a custom payment.</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="#access-list" class="inline-flex items-center gap-2 bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Browse services <i class="fas fa-arrow-down text-xs"></i></a>
            <button type="button" @click="startCustomRequest" class="inline-flex items-center gap-2 border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">Request a service</button>
          </div>
        </div>
      </section>

      <section id="access-list" class="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 class="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Available services</h2><p v-if="pagination.total" class="text-sm text-slate-500">{{ pagination.total }} listed service{{ pagination.total === 1 ? '' : 's' }}</p></div></div>
        <div class="mb-6 flex flex-col gap-3 sm:flex-row"><div class="flex min-w-0 flex-1 items-center gap-3 border border-slate-200 bg-white px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"><i class="fas fa-search text-sm text-primary"></i><input v-model.trim="searchQuery" type="search" placeholder="Search subscriptions, courses, software…" aria-label="Search pay for me services" class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" /><button v-if="searchQuery" type="button" @click="searchQuery = ''" class="text-xs text-slate-500 hover:text-primary">Clear</button></div><select v-model="activeType" aria-label="Filter by service type" class="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-primary"><option value="all">All categories</option><option v-for="type in availableTypes" :key="type" :value="type">{{ typeLabel(type) }}</option></select></div>
        <div v-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"><div v-for="n in 6" :key="n" class="h-72 animate-pulse rounded-xl border border-slate-200 bg-white"></div></div>
        <div v-else-if="error" class="border border-amber-200 bg-amber-50 p-8"><h3 class="font-bold text-slate-900">Services couldn’t be loaded</h3><p class="mt-1 text-sm text-slate-600">Please check your connection and try again.</p><button type="button" @click="fetchAccessServices" class="mt-4 border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Try again</button></div>
        <div v-else-if="!filteredServices.length" class="border border-slate-200 bg-white px-6 py-16 text-left"><h3 class="font-bold text-slate-900">{{ searchQuery || activeType !== 'all' ? 'No matching services' : 'No listed services yet' }}</h3><p class="mt-1 text-sm text-slate-500">You can still sign in and tell us what you need paid for.</p><button type="button" @click="startCustomRequest" class="mt-4 border border-blue-600 px-4 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50">Submit a custom request <i class="fas fa-arrow-right ml-1 text-xs"></i></button></div>
        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="service in filteredServices" :key="service.id" class="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60">
            <div class="flex h-36 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50"><img v-if="service.thumbnail?.url || service.thumbnail?.secureUrl" :src="service.thumbnail.url || service.thumbnail.secureUrl" :alt="service.name" class="h-full w-full object-cover" /><div v-else class="flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm" :class="serviceIconStyle(service)"><i :class="[serviceIcon(service.type, service), 'text-3xl']"></i></div><span class="absolute sr-only">Listed service</span></div>
            <div class="flex flex-1 flex-col p-5"><span class="self-start border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{{ typeLabel(service.type) }}</span><h3 class="mt-3 text-base font-bold leading-snug text-slate-900">{{ service.name }}</h3><p class="mt-2 flex-1 text-sm leading-6 text-slate-600">{{ service.description || 'Digital service available by request.' }}</p><div class="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4"><div><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Listed price</p><p class="mt-1 text-2xl font-bold tracking-tight text-slate-950">{{ formatPrice(service.price, service.currency) }}</p></div><div class="text-right"><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Provider</p><p class="mt-1 text-xs font-semibold text-slate-700">{{ service.provider?.fullName || service.provider?.username || 'Redmit team' }}</p></div></div><button type="button" @click="requestListedService(service)" class="mt-5 inline-flex w-full items-center justify-center gap-2 bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"><i :class="localIsAuthenticated ? 'fas fa-arrow-right' : 'fas fa-lock'" class="text-xs"></i>{{ localIsAuthenticated ? 'Request this service' : 'Sign in to request' }}</button></div>
          </article>
        </div>
        <div v-if="!loading && !error && pagination.totalPages > 1" class="mt-10 flex items-center justify-center gap-3"><button type="button" :disabled="page <= 1" @click="changePage(page - 1)" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"><i class="fas fa-chevron-left text-xs"></i></button><span class="text-sm font-semibold text-slate-600">Page {{ page }} of {{ pagination.totalPages }}</span><button type="button" :disabled="page >= pagination.totalPages" @click="changePage(page + 1)" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"><i class="fas fa-chevron-right text-xs"></i></button></div>
        <div class="mt-10 flex flex-col gap-4 border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between"><h3 class="text-lg font-semibold text-slate-900">Need another service?</h3><button type="button" @click="startCustomRequest" class="shrink-0 bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">Make a custom request <i class="fas fa-arrow-right ml-1 text-xs"></i></button></div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'AccessExplorePage',
  components: { Header, Footer },
  data() {
    return {
      services: [], localIsAuthenticated: !!localStorage.getItem('token'), loading: false, error: false,
      searchQuery: '', activeType: 'all', page: Number(this.$route.query.page) || 1,
      pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
    };
  },
  computed: {
    availableTypes() { return [...new Set(this.services.map(service => service.type).filter(Boolean))].sort(); },
    filteredServices() {
      const query = this.searchQuery.toLowerCase();
      return this.services.filter(service => {
        const typeMatches = this.activeType === 'all' || service.type === this.activeType;
        const searchable = [service.name, service.slug, service.type, service.description, service.provider?.fullName, service.provider?.username].filter(Boolean).join(' ').toLowerCase();
        return typeMatches && (!query || searchable.includes(query));
      });
    },
  },
  mounted() { this.fetchAccessServices(); },
  watch: {
    '$route.query.page'(value) {
      const nextPage = Number(value) || 1;
      if (nextPage !== this.page) { this.page = nextPage; this.fetchAccessServices(); }
    },
  },
  methods: {
    async fetchAccessServices() {
      this.loading = true; this.error = false;
      try {
        const response = await this.$apiGet(`/access?page=${this.page}&limit=10`);
        this.services = Array.isArray(response?.data) ? response.data.filter(service => service.isActive !== false) : [];
        this.pagination = response?.pagination || { total: this.services.length, page: this.page, limit: 10, totalPages: 1 };
      } catch (error) {
        console.error('Failed to load Pay For Me services:', error); this.services = []; this.error = true;
      } finally { this.loading = false; }
    },
    changePage(nextPage) { if (nextPage >= 1 && nextPage <= this.pagination.totalPages) this.$router.push({ path: '/access', query: { page: String(nextPage) } }); },
    typeLabel(type) { return String(type || 'Digital service').replace(/_/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); },
    serviceIcon(type, service = {}) {
      const value = [type, service.platform, service.name, service.slug, service.description].filter(Boolean).join(' ').toUpperCase();
      if (value.includes('ADOBE')) return 'fab fa-adobe';
      if (value.includes('NODE.JS') || value.includes('NODEJS')) return 'fab fa-node-js';
      if (value.includes('YOUTUBE')) return 'fab fa-youtube';
      if (value.includes('INSTAGRAM')) return 'fab fa-instagram';
      if (value.includes('TIKTOK')) return 'fab fa-tiktok';
      if (value.includes('FACEBOOK')) return 'fab fa-facebook';
      if (value.includes('TELEGRAM')) return 'fab fa-telegram';
      if (value.includes('SOFTWARE')) return 'fas fa-laptop-code';
      if (value.includes('COURSE') || value.includes('EDUCATION')) return 'fas fa-graduation-cap';
      if (value.includes('AI')) return 'fas fa-robot';
      if (value.includes('DOMAIN') || value.includes('HOST')) return 'fas fa-server';
      if (value.includes('SUBSCRIPTION')) return 'fas fa-credit-card';
      return 'fas fa-wallet';
    },
    serviceIconStyle(service) {
      const value = [service.platform, service.name, service.slug, service.type, service.description].filter(Boolean).join(' ').toLowerCase();
      if (value.includes('adobe')) return 'text-red-600';
      if (value.includes('node.js') || value.includes('nodejs')) return 'text-blue-700';
      if (value.includes('youtube')) return 'text-red-600';
      if (value.includes('instagram')) return 'text-pink-600';
      if (value.includes('tiktok')) return 'text-slate-900';
      if (value.includes('facebook')) return 'text-blue-700';
      if (value.includes('telegram')) return 'text-sky-600';
      if (value.includes('course') || value.includes('education')) return 'text-violet-600';
      return 'text-blue-700';
    },
    formatPrice(price, currency) {
      const amount = Number(price);
      if (!Number.isFinite(amount)) return 'Ask for price';
      try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(amount); }
      catch (_error) { return `${currency || 'USD'} ${amount.toFixed(2)}`; }
    },
    requestListedService(service) {
      const serviceKey = service.slug || service.id;
      if (localStorage.getItem('token')) { this.$router.push({ path: '/dashboard/access', query: { service: serviceKey } }); return; }
      this.$router.push({ path: '/login', query: { redirect: `/dashboard/access?service=${encodeURIComponent(serviceKey)}` } });
    },
    startCustomRequest() {
      if (localStorage.getItem('token')) { this.$router.push('/dashboard/access?new=1'); return; }
      this.$router.push({ path: '/login', query: { redirect: '/dashboard/access?new=1' } });
    },
  },
};
</script>
