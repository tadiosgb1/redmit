<template>
  <div id="top" class="min-h-screen bg-white font-sans text-gray-800 antialiased landing-page">
    <Header />

    <HeroSection class="landing-section" />
    <DigitalProductsSection
      class="landing-section"
      :products="products"
      :categories="categories"
      :selected-category-id="selectedCategoryId"
      :loading="productsLoading || categoriesLoading"
      @select-category="handleCategoryChange"
    />
    <DigitalAssetsSection class="landing-section" :assets="assets" :loading="assetsLoading" />

    <section class="landing-section bg-white py-20">
      <div class="mx-auto max-w-7xl px-6">
        <div class="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <span class="inline-flex items-center gap-2 border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700"><i class="fas fa-wallet"></i> Pay For Me</span>
            <h2 class="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Need us to pay for a digital service?</h2>
            <p class="mt-3 max-w-xl text-sm leading-7 text-slate-600">Browse software subscriptions, online courses and other digital services we can help pay for. If your platform isn’t listed, sign in and submit a custom request for our team to review.</p>
            <div class="mt-6 flex flex-wrap gap-3"><router-link to="/pay-for-me" class="inline-flex items-center gap-2 border border-emerald-600 bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Explore Pay For Me <i class="fas fa-arrow-right text-xs"></i></router-link><button type="button" @click="startCustomPayRequest" class="inline-flex items-center gap-2 border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700">Request another service</button></div>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <article v-for="service in accessServices.slice(0, 2)" :key="service.id" class="flex flex-col border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-white hover:shadow-md">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700"><i :class="[accessIcon(service.type), 'text-base']"></i></div>
              <h3 class="mt-4 text-base font-bold text-slate-900">{{ service.name }}</h3>
              <p class="mt-2 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">{{ service.description }}</p>
              <div class="mt-4 border-t border-slate-200 pt-3"><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Listed price</p><p class="mt-1 text-xl font-bold text-slate-950">{{ formatAccessPrice(service.price, service.currency) }}</p></div>
            </article>
            <div v-if="!accessLoading && !accessServices.length" class="border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600 sm:col-span-2">Our listed services will appear here when available. You can still submit a custom request after signing in.</div>
            <div v-if="accessLoading" class="h-40 animate-pulse border border-slate-200 bg-slate-50 sm:col-span-2"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="landing-section bg-slate-50 py-20">
      <div class="max-w-7xl mx-auto px-6">
        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 border border-blue-100 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-700"><i class="fas fa-chart-line"></i> Social Media Growth</span>
            <h2 class="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Grow your audience. Build your brand.</h2>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">From monetization setup to targeted promotion and content support, explore services that help your social channels move forward.</p>
          </div>
          <router-link to="/growth" class="inline-flex items-center gap-2 self-start border border-primary bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white sm:self-auto">View All Growth Services <i class="fas fa-arrow-right text-xs"></i></router-link>
        </div>
        <div v-if="growthLoading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"><div v-for="n in 3" :key="n" class="h-48 animate-pulse border border-slate-200 bg-white"></div></div>
        <div v-else-if="growthServices.length" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="service in growthServices.slice(0, 3)" :key="service.id" class="flex flex-col border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-lg">
            <div class="flex items-center gap-3"><div class="flex h-10 w-10 items-center justify-center rounded-lg" :class="growthIconStyle(service.type)"><i :class="[growthIcon(service.type), 'text-base']"></i></div><span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">{{ growthTypeLabel(service.type) }}</span></div>
            <h3 class="mt-4 text-base font-bold text-slate-900">{{ service.name }}</h3>
            <p class="mt-2 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">{{ service.description }}</p>
            <div class="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4"><div><p class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Listed price</p><p class="mt-1 text-xl font-bold text-slate-950">{{ formatGrowthPrice(service.price, service.currency) }}</p></div><button type="button" @click="startGrowthService(service)" class="border border-primary px-3 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white">{{ localIsAuthenticated ? 'Contact us' : 'Sign in' }} <i class="fas fa-arrow-right ml-1 text-[9px]"></i></button></div>
          </article>
        </div>
        <div v-else class="border border-slate-200 bg-white p-6 text-sm text-slate-500">Growth services will be listed here as they become available. <router-link to="/growth" class="font-semibold text-primary hover:underline">Explore the growth page</router-link></div>
      </div>
    </section>

    <section class="landing-section bg-slate-50 py-20">
      <div class="max-w-5xl mx-auto px-6">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-12 text-white shadow-xl shadow-blue-200/40">
          <div class="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-white/10 blur-2xl"></div>
          <div class="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div class="max-w-2xl">
              <span class="text-[10px] font-black uppercase tracking-[0.18em] text-blue-100">More ways to grow</span>
              <h2 class="mt-3 text-3xl sm:text-4xl font-black tracking-tight">Discover opportunities made for you.</h2>
              <p class="mt-3 text-blue-100 leading-relaxed">Find scholarships, internships, fellowships, grants, remote work, competitions, events and more.</p>
            </div>
            <router-link to="/opportunities" class="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-sm font-black transition-colors shrink-0">
              Explore Opportunities <i class="fas fa-arrow-right text-xs"></i>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
import HeroSection from './sections/HeroSection.vue';
import DigitalProductsSection from './sections/DigitalProductsSection.vue';
import DigitalAssetsSection from './sections/DigitalAssetsSection.vue';

export default {
  name: 'HomePage',
  components: { Header, Footer, HeroSection, DigitalProductsSection, DigitalAssetsSection },
  data() {
    return {
      products: [],
      assets: [],
      growthServices: [],
      growthLoading: false,
      accessServices: [],
      accessLoading: false,
      localIsAuthenticated: !!localStorage.getItem('token'),
      categories: [],
      selectedCategoryId: null,
      productsLoading: false,
      assetsLoading: false,
      categoriesLoading: false,
      sectionObserver: null,
    };
  },
  async mounted() {
    await Promise.all([this.fetchCategories(), this.fetchProducts(), this.fetchAssets(), this.fetchGrowthServices(), this.fetchAccessServices()]);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.landing-section').forEach((section) => section.classList.add('is-visible'));
      return;
    }
    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.sectionObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.landing-section').forEach((section) => this.sectionObserver.observe(section));
  },
  beforeUnmount() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
      this.sectionObserver = null;
    }
  },
  methods: {
    async fetchCategories() {
      this.categoriesLoading = true;
      try {
        const response = await this.$apiGet('/categories');
        this.categories = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load landing page product categories:', error);
        this.categories = [];
      } finally {
        this.categoriesLoading = false;
      }
    },
    async fetchProducts() {
      this.productsLoading = true;
      try {
        const response = await this.$apiGet('/products');
        this.products = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load landing page products:', error);
        this.products = [];
      } finally {
        this.productsLoading = false;
      }
    },
    async handleCategoryChange(categoryId) {
      this.selectedCategoryId = categoryId || null;
      this.productsLoading = true;
      try {
        const response = this.selectedCategoryId
          ? await this.$apiGet('/products', { category_id: this.selectedCategoryId })
          : await this.$apiGet('/products');
        this.products = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load products for selected category:', error);
        this.products = [];
      } finally {
        this.productsLoading = false;
      }
    },
    async fetchAssets() {
      this.assetsLoading = true;
      try {
        const response = await this.$apiGet('/assets');
        this.assets = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load landing page assets:', error);
        this.assets = [];
      } finally {
        this.assetsLoading = false;
      }
    },
    async fetchAccessServices() {
      this.accessLoading = true;
      try {
        const response = await this.$apiGet('/access?page=1&limit=2');
        this.accessServices = Array.isArray(response?.data) ? response.data.filter(service => service.isActive !== false) : [];
      } catch (error) {
        console.error('Failed to load Pay For Me services:', error);
        this.accessServices = [];
      } finally {
        this.accessLoading = false;
      }
    },
    startCustomPayRequest() {
      if (localStorage.getItem('token')) {
        this.$router.push('/dashboard/pay-for-me?new=1');
        return;
      }
      this.$router.push({ path: '/login', query: { redirect: '/dashboard/pay-for-me?new=1' } });
    },
    accessIcon(type) {
      const value = String(type || '').toUpperCase();
      if (value.includes('SOFTWARE')) return 'fas fa-laptop-code';
      if (value.includes('COURSE') || value.includes('EDUCATION')) return 'fas fa-graduation-cap';
      if (value.includes('AI')) return 'fas fa-robot';
      if (value.includes('SUBSCRIPTION')) return 'fas fa-credit-card';
      return 'fas fa-wallet';
    },
    formatAccessPrice(price, currency) {
      const amount = Number(price);
      if (!Number.isFinite(amount)) return 'Ask for price';
      try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(amount); }
      catch (_error) { return `${currency || 'USD'} ${amount.toFixed(2)}`; }
    },
    async fetchGrowthServices() {
      this.growthLoading = true;
      try {
        const response = await this.$apiGet('/growth?page=1&limit=3');
        this.growthServices = Array.isArray(response?.data) ? response.data.filter(service => service.isActive !== false) : [];
      } catch (error) {
        console.error('Failed to load landing page growth services:', error);
        this.growthServices = [];
      } finally {
        this.growthLoading = false;
      }
    },
    startGrowthService(service) {
      const serviceKey = service.slug || service.id;
      if (localStorage.getItem('token')) {
        this.$router.push({ path: '/contact-us', query: { service: serviceKey } });
        return;
      }
      this.$router.push({ path: '/login', query: { redirect: `/contact-us?service=${serviceKey}` } });
    },
    growthTypeLabel(type) {
      return String(type || 'Growth service').replace(/_/g, ' ').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    growthIcon(type) {
      const value = String(type || '').toUpperCase();
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
    growthIconStyle(type) {
      const value = String(type || '').toUpperCase();
      if (value.includes('TIKTOK')) return 'bg-slate-100 text-slate-900';
      if (value.includes('INSTAGRAM')) return 'bg-pink-50 text-pink-600';
      if (value.includes('YOUTUBE')) return 'bg-red-50 text-red-600';
      if (value.includes('FACEBOOK')) return 'bg-blue-50 text-blue-700';
      if (value.includes('TELEGRAM')) return 'bg-sky-50 text-sky-600';
      if (value.includes('MONETIZATION')) return 'bg-emerald-50 text-emerald-700';
      return 'bg-indigo-50 text-indigo-600';
    },
    formatGrowthPrice(price, currency) {
      const amount = Number(price);
      if (!Number.isFinite(amount)) return 'Contact us';
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(amount);
    },
  },
};
</script>

<style>
.landing-page .landing-section { opacity: 0; transform: translate3d(0, 48px, 0); transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1); will-change: opacity, transform; }
.landing-page .landing-section.is-visible { opacity: 1; transform: translate3d(0, 0, 0); }
.landing-page .landing-section.is-visible > * { animation: landing-item-in 650ms cubic-bezier(0.22, 1, 0.36, 1) both; }
.landing-page .landing-section.is-visible > *:nth-child(1) { animation-delay: 80ms; }
.landing-page .landing-section.is-visible > *:nth-child(2) { animation-delay: 160ms; }
.landing-page .landing-section.is-visible > *:nth-child(3) { animation-delay: 240ms; }
.landing-page .landing-section.is-visible > *:nth-child(4) { animation-delay: 320ms; }
.landing-page .landing-section.is-visible > *:nth-child(5) { animation-delay: 400ms; }
.landing-page .landing-section.is-visible > *:nth-child(6) { animation-delay: 480ms; }
.landing-page .landing-section.is-visible > *:nth-child(n+7) { animation-delay: 560ms; }
@keyframes landing-item-in { from { opacity: 0; transform: translate3d(0, 24px, 0); } to { opacity: 1; transform: translate3d(0, 0, 0); } }
@media (prefers-reduced-motion: reduce) {
  .landing-page .landing-section, .landing-page .landing-section.is-visible > * { opacity: 1; transform: none; animation: none; transition: none; }
}
</style>
