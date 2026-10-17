<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
    <Header />
    <main class="pt-16">
      <section class="relative overflow-hidden border-b border-slate-200 bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl"></div>
        <div class="relative mx-auto grid max-w-7xl items-center gap-8 px-6 py-14 sm:py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-20">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-700 shadow-sm"><i class="fas fa-hand-holding-usd"></i> Redmit Pay For Me</span>
            <h1 class="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Need a digital service paid for? <span class="text-emerald-600">We can help.</span></h1>
            <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">Explore services we can help pay for on your behalf, from software subscriptions to online courses. Don’t see what you need? Sign in and submit a custom payment request for our team to review.</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <a href="#access-list" class="inline-flex items-center gap-2 bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">Explore listed services <i class="fas fa-arrow-down text-xs"></i></a>
              <button type="button" @click="startCustomRequest" class="inline-flex items-center gap-2 border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"><i class="fas fa-plus text-xs"></i> Request another service</button>
            </div>
            <div class="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-xs font-medium text-slate-600"><span><i class="fas fa-check-circle mr-1.5 text-emerald-500"></i>Clear listed prices</span><span><i class="fas fa-globe mr-1.5 text-emerald-500"></i>Digital services worldwide</span><span><i class="fas fa-user-lock mr-1.5 text-emerald-500"></i>Sign in to request payment</span></div>
          </div>
          <div class="mx-auto w-full max-w-md lg:ml-auto">
            <div class="rounded-2xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/50">
              <div class="flex items-center gap-4 border-b border-slate-100 pb-5"><div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><i class="fas fa-wallet text-2xl"></i></div><div><p class="text-xs font-bold uppercase tracking-widest text-slate-400">Simple process</p><h2 class="mt-1 text-xl font-bold text-slate-900">Your request, reviewed</h2></div></div>
              <div class="mt-5 space-y-4"><div class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">1</span><div><p class="text-sm font-bold text-slate-800">Find a listed service</p><p class="mt-1 text-xs leading-5 text-slate-500">Browse the services and prices available on Redmit.</p></div></div><div class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">2</span><div><p class="text-sm font-bold text-slate-800">Sign in to request</p><p class="mt-1 text-xs leading-5 text-slate-500">Or submit a custom request if your service isn’t listed.</p></div></div><div class="flex gap-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">3</span><div><p class="text-sm font-bold text-slate-800">Wait for confirmation</p><p class="mt-1 text-xs leading-5 text-slate-500">Our team reviews the service, cost and payment details before proceeding.</p></div></div></div>
              <p class="mt-5 rounded-lg bg-slate-50 p-3 text-[11px] leading-5 text-slate-500">Listed prices are informational. Availability, final cost and payment arrangements must be confirmed by Redmit.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="access-list" class="mx-auto max-w-7xl px-6 py-14 sm:py-16">
        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p class="text-xs font-black uppercase tracking-[0.16em] text-emerald-600">Available through Redmit</p><h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Explore digital services</h2><p class="mt-3 max-w-2xl text-sm leading-6 text-slate-600">These are the services currently listed. For anything else, sign in to submit your own request.</p></div><p v-if="pagination.total" class="text-sm text-slate-500">{{ pagination.total }} listed service{{ pagination.total === 1 ? '' : 's' }}</p></div>
        <div class="mb-6 flex flex-col gap-3 sm:flex-row"><div class="flex min-w-0 flex-1 items-center gap-3 border border-slate-200 bg-white px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"><i class="fas fa-search text-sm text-primary"></i><input v-model.trim="searchQuery" type="search" placeholder="Search subscriptions, courses, software…" aria-label="Search pay for me services" class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" /><button v-if="searchQuery" type="button" @click="searchQuery = ''" class="text-xs text-slate-500 hover:text-primary">Clear</button></div><select v-model="activeType" aria-label="Filter by service type" class="border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-primary"><option value="all">All categories</option><option v-for="type in availableTypes" :key="type" :value="type">{{ typeLabel(type) }}</option></select></div>
        <div v-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"><div v-for="n in 6" :key="n" class="h-72 animate-pulse rounded-xl border border-slate-200 bg-white"></div></div>
        <div v-else-if="error" class="border border-amber-200 bg-amber-50 p-8"><h3 class="font-bold text-slate-900">Services couldn’t be loaded</h3><p class="mt-1 text-sm text-slate-600">Please check your connection and try again.</p><button type="button" @click="fetchAccessServices" class="mt-4 border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Try again</button></div>
        <div v-else-if="!filteredServices.length" class="border border-slate-200 bg-white px-6 py-16 text-left"><h3 class="font-bold text-slate-900">{{ searchQuery || activeType !== 'all' ? 'No matching services' : 'No listed services yet' }}</h3><p class="mt-1 text-sm text-slate-500">You can still sign in and tell us what you need paid for.</p><button type="button" @click="startCustomRequest" class="mt-4 border border-emerald-600 px-4 py-2.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">Submit a custom request <i class="fas fa-arrow-right ml-1 text-xs"></i></button></div>
        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="service in filteredServices" :key="service.id" class="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-slate-200/60">
            <div class="flex h-36 items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50"><img v-if="service.thumbnail?.url || service.thumbnail?.secureUrl" :src="service.thumbnail.url || service.thumbnail.secureUrl" :alt="service.name" class="h-full w-full object-cover" /><div v-else class="flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-100 bg-white text-emerald-600 shadow-sm"><i :class="[serviceIcon(service.type), 'text-3xl']"></i></div><span class="absolute sr-only">Listed service</span></div>
            <div class="flex flex-1 flex-col p-5"><span class="self-start border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">{{ typeLabel(service.type) }}</span><h3 class="mt-3 text-base font-bold leading-snug text-slate-900">{{ service.name }}</h3><p class="mt-2 flex-1 text-sm leading-6 text-slate-600">{{ service.description || 'Digital service available by request.' }}</p><div class="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4"><div><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Listed price</p><p class="mt-1 text-2xl font-bold tracking-tight text-slate-950">{{ formatPrice(service.price, service.currency) }}</p></div><div class="text-right"><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Provider</p><p class="mt-1 text-xs font-semibold text-slate-700">{{ service.provider?.fullName || service.provider?.username || 'Redmit team' }}</p></div></div><button type="button" @click="requestListedService(service)" class="mt-5 inline-flex w-full items-center justify-center gap-2 border border-emerald-600 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white"><i :class="localIsAuthenticated ? 'fas fa-arrow-right' : 'fas fa-lock'" class="text-xs"></i>{{ localIsAuthenticated ? 'Request this service' : 'Sign in to request' }}</button></div>
          </article>
        </div>
        <div v-if="!loading && !error && pagination.totalPages > 1" class="mt-10 flex items-center justify-center gap-3"><button type="button" :disabled="page <= 1" @click="changePage(page - 1)" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"><i class="fas fa-chevron-left text-xs"></i></button><span class="text-sm font-semibold text-slate-600">Page {{ page }} of {{ pagination.totalPages }}</span><button type="button" :disabled="page >= pagination.totalPages" @click="changePage(page + 1)" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"><i class="fas fa-chevron-right text-xs"></i></button></div>
        <div class="mt-10 flex flex-col gap-5 border border-emerald-100 bg-white p-6 sm:flex-row sm:items-center sm:justify-between"><div><p class="text-xs font-black uppercase tracking-widest text-emerald-600">Can’t find your service?</p><h3 class="mt-2 text-xl font-bold text-slate-950">Tell us what you need paid for.</h3><p class="mt-1 max-w-2xl text-sm leading-6 text-slate-600">Sign in to provide the platform name, link and estimated cost—even if it isn’t listed above.</p></div><button type="button" @click="startCustomRequest" class="shrink-0 border border-emerald-600 bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Request a different service <i class="fas fa-arrow-right ml-1 text-xs"></i></button></div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'PayForMeExplorePage',
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
    changePage(nextPage) { if (nextPage >= 1 && nextPage <= this.pagination.totalPages) this.$router.push({ path: '/pay-for-me', query: { page: String(nextPage) } }); },
    typeLabel(type) { return String(type || 'Digital service').replace(/_/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); },
    serviceIcon(type) {
      const value = String(type || '').toUpperCase();
      if (value.includes('SOFTWARE')) return 'fas fa-laptop-code';
      if (value.includes('COURSE') || value.includes('EDUCATION')) return 'fas fa-graduation-cap';
      if (value.includes('AI')) return 'fas fa-robot';
      if (value.includes('DOMAIN') || value.includes('HOST')) return 'fas fa-server';
      if (value.includes('SUBSCRIPTION')) return 'fas fa-credit-card';
      return 'fas fa-wallet';
    },
    formatPrice(price, currency) {
      const amount = Number(price);
      if (!Number.isFinite(amount)) return 'Ask for price';
      try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(amount); }
      catch (_error) { return `${currency || 'USD'} ${amount.toFixed(2)}`; }
    },
    requestListedService(service) {
      const serviceKey = service.slug || service.id;
      if (localStorage.getItem('token')) { this.$router.push({ path: '/dashboard/pay-for-me', query: { service: serviceKey } }); return; }
      this.$router.push({ path: '/login', query: { redirect: `/dashboard/pay-for-me?service=${encodeURIComponent(serviceKey)}` } });
    },
    startCustomRequest() {
      if (localStorage.getItem('token')) { this.$router.push('/dashboard/pay-for-me?new=1'); return; }
      this.$router.push({ path: '/login', query: { redirect: '/dashboard/pay-for-me?new=1' } });
    },
  },
};
</script>
