<template>
  <div class="min-h-screen bg-white font-sans text-slate-800 antialiased">
    <Header />
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-100">
      <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm"><i class="fas fa-box-open text-[10px]"></i> Digital Products</span>
          <h1 class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight">Discover digital products <span class="text-blue-600">made to be useful.</span></h1>
          <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">Browse the full collection of downloadable digital products available on Redmit.</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <div v-if="categories.length" class="flex flex-wrap gap-2 justify-center mb-10">
          <button type="button" @click="selectCategory(null)" class="px-4 py-2 rounded-full text-xs font-bold border transition-all" :class="selectedCategoryId === null ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'">All</button>
          <button v-for="category in categories" :key="category.id" type="button" @click="selectCategory(category.id)" class="px-4 py-2 rounded-full text-xs font-bold border transition-all" :class="selectedCategoryId === category.id ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'">{{ category.name }}</button>
        </div>
        <div v-if="loading" class="py-20 text-center text-slate-400">Loading products...</div>
        <div v-else-if="!products.length" class="py-20 text-center text-slate-400">No products available right now.</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article v-for="product in products" :key="product.id" class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div class="relative h-44 flex items-center justify-center overflow-hidden bg-blue-50"><i class="fas fa-box-open text-5xl text-blue-400/50"></i><span class="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">{{ product.category?.name || 'Digital Product' }}</span><span v-if="product.isActive" class="absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-green-100 text-green-700">Available</span></div>
            <div class="p-5"><h2 class="font-black text-slate-800 text-sm mb-2 line-clamp-2">{{ product.name }}</h2><p class="text-xs text-slate-400 mb-5 line-clamp-3 leading-relaxed">{{ product.shortDescription || product.description }}</p><div class="flex items-end justify-between gap-3"><div><p class="text-lg font-black text-slate-900">{{ formatPrice(product.price, product.currency) }}</p><p class="text-[10px] text-slate-400 mt-1">{{ product.seller?.fullName || product.seller?.username || 'Redmit seller' }}</p></div><button @click="requireLogin" class="px-3.5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl">Buy</button></div></div>
          </article>
        </div>
        <div class="mt-12 text-center"><router-link to="/register" class="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary hover:bg-secondary-dark text-white font-bold text-sm rounded-xl shadow-lg shadow-secondary/20"><i class="fas fa-store text-xs"></i> Start Selling on Redmit</router-link></div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
export default {
  name: 'ProductsPage',
  components: { Header, Footer },
  data() { return { products: [], categories: [], selectedCategoryId: null, loading: false }; },
  async mounted() { await Promise.all([this.fetchCategories(), this.fetchProducts()]); },
  methods: {
    async fetchCategories() { try { const response = await this.$apiGet('/categories'); this.categories = Array.isArray(response?.data) ? response.data : []; } catch (error) { this.categories = []; } },
    async fetchProducts() { this.loading = true; try { const response = this.selectedCategoryId ? await this.$apiGet('/products', { category_id: this.selectedCategoryId }) : await this.$apiGet('/products'); this.products = Array.isArray(response?.data) ? response.data : []; } catch (error) { this.products = []; } finally { this.loading = false; } },
    async selectCategory(categoryId) { this.selectedCategoryId = categoryId || null; await this.fetchProducts(); },
    formatPrice(price, currency) { return `${currency || 'USD'} ${Number(price || 0).toFixed(2)}`; },
    requireLogin() { this.$router.push('/login'); },
  },
};
</script>
