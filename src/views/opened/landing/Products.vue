<template>
  <div class="min-h-screen bg-white font-sans text-slate-800 antialiased">
    <Header />
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-100">
      <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-6 py-14 sm:py-16 lg:py-20">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm"><i class="fas fa-box-open text-[10px]"></i> Digital Products</span>
          <h1 class="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 leading-tight tracking-tight">Discover digital products <span class="text-blue-600">made to be useful.</span></h1>
          <p class="mt-4 text-base text-slate-600 leading-7 max-w-2xl">Browse the full collection of downloadable digital products available on Redmit.</p>
        </div>
      </div>
    </section>

    <section class="py-14 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="mb-5 max-w-xl">
          <label for="products-search" class="mb-2 block text-xs font-medium text-slate-600">Search digital products</label>
          <div class="flex items-center gap-3 border border-slate-200 bg-white px-4 py-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
            <i class="fas fa-search text-sm text-primary"></i>
            <input id="products-search" v-model.trim="searchQuery" type="search" placeholder="Search templates, e-books, presets…" class="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" aria-label="Search digital products" />
            <button v-if="searchQuery" type="button" @click="searchQuery = ''" class="text-xs text-slate-500 hover:text-primary">Clear</button>
          </div>
        </div>
        <div v-if="categories.length" class="flex flex-wrap gap-2 justify-start mb-8">
          <button type="button" @click="selectCategory(null)" class="px-3.5 py-2 rounded-md text-xs font-semibold border transition-colors" :class="selectedCategoryId === null ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'">All</button>
          <button v-for="category in categories" :key="category.id" type="button" @click="selectCategory(category.id)" class="px-3.5 py-2 rounded-md text-xs font-semibold border transition-colors" :class="selectedCategoryId === category.id ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'">{{ category.name }}</button>
        </div>
        <div v-if="loading" class="py-20 text-center text-slate-400">Loading products...</div>
        <div v-else-if="!visibleProducts.length" class="py-16 text-left text-sm text-slate-500">{{ searchQuery ? 'No products match your search.' : 'No products available right now.' }}</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <article v-for="product in visibleProducts" :key="product.id" class="group bg-white border border-slate-200 rounded-md overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
            <div class="relative h-40 flex items-center justify-center overflow-hidden bg-blue-50"><i class="fas fa-box-open text-5xl text-blue-400/50"></i><span class="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">{{ product.category?.name || 'Digital Product' }}</span><span v-if="product.isActive" class="absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-green-100 text-green-700">Available</span></div>
            <div class="p-4"><h2 class="font-semibold text-slate-800 text-[13px] leading-5 mb-1 line-clamp-2">{{ product.name }}</h2><p class="text-[11px] text-slate-500 mb-3 line-clamp-2 leading-5">{{ product.shortDescription || product.description }}</p><div class="flex items-end justify-between gap-3"><div><p class="text-base font-semibold text-slate-900">{{ formatPrice(product.price, product.currency) }}</p><p class="text-[10px] text-slate-400 mt-1">{{ product.seller?.fullName || product.seller?.username || 'Redmit seller' }}</p></div><button @click="requireLogin" class="px-3.5 py-2 bg-white border border-primary text-primary hover:bg-primary hover:text-white text-xs font-semibold rounded-md transition-colors">Buy</button></div></div>
          </article>
        </div>
        <div class="mt-12 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap"><router-link to="/register" class="inline-flex items-center gap-2 px-5 py-3 bg-white border border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-sm rounded-md transition-colors"><i class="fas fa-store text-xs"></i> Start Selling on Redmit</router-link></div>
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
  data() { return { products: [], categories: [], selectedCategoryId: null, searchQuery: '', loading: false }; },
  async mounted() { await Promise.all([this.fetchCategories(), this.fetchProducts()]); },
  computed: {
    visibleProducts() {
      const query = this.searchQuery.toLowerCase();
      return this.products.filter((product) => {
        const categoryMatches = this.selectedCategoryId === null || this.selectedCategoryId === undefined || product.category?.id === this.selectedCategoryId;
        const text = [product.name, product.shortDescription, product.description, product.category?.name, product.seller?.fullName, product.seller?.username].filter(Boolean).join(' ').toLowerCase();
        return categoryMatches && (!query || text.includes(query));
      });
    },
  },
  methods: {
    async fetchCategories() { try { const response = await this.$apiGet('/categories'); this.categories = Array.isArray(response?.data) ? response.data : []; } catch (error) { this.categories = []; } },
    async fetchProducts() { this.loading = true; try { const response = this.selectedCategoryId ? await this.$apiGet('/products', { category_id: this.selectedCategoryId }) : await this.$apiGet('/products'); this.products = Array.isArray(response?.data) ? response.data : []; } catch (error) { this.products = []; } finally { this.loading = false; } },
    async selectCategory(categoryId) { this.selectedCategoryId = categoryId || null; await this.fetchProducts(); },
    formatPrice(price, currency) { return `${currency || 'USD'} ${Number(price || 0).toFixed(2)}`; },
    requireLogin() { this.$router.push('/login'); },
  },
};
</script>
