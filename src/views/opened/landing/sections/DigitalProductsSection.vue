<template>
  <section id="products" class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-14">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest mb-4"><i class="fas fa-box-open text-[10px]"></i> Digital Products Marketplace</span>
        <h2 class="text-4xl font-black text-slate-900 mb-4">Buy Downloadable Digital Goods</h2>
        <p class="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">Browse digital products available on Redmit. Sign in to purchase and get instant access.</p>
      </div>

      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button v-for="cat in categories" :key="cat.value" @click="activeCategory = cat.value" class="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all" :class="activeCategory === cat.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'">
          <i :class="cat.icon" class="text-xs"></i>{{ cat.label }}
        </button>
      </div>

      <div v-if="loading" class="py-16 text-center text-slate-400">Loading products...</div>
      <div v-else-if="!filteredProducts.length" class="py-16 text-center text-slate-400">No products available right now.</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.id" class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">
          <div class="relative h-40 flex items-center justify-center overflow-hidden bg-blue-50">
            <i class="fas fa-box-open text-5xl text-blue-400 opacity-20"></i>
            <div class="absolute inset-0 flex items-center justify-center"><i class="fas fa-box-open text-4xl text-blue-400"></i></div>
            <span class="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">{{ product.category?.name || 'Digital Product' }}</span>
            <span v-if="product.isActive" class="absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-green-100 text-green-700">Available</span>
          </div>
          <div class="p-4">
            <h4 class="font-black text-slate-800 text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">{{ product.name }}</h4>
            <p class="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{{ product.shortDescription || product.description }}</p>
            <div class="flex items-center justify-between">
              <div><p class="text-lg font-black text-slate-900">{{ formatPrice(product.price, product.currency) }}</p><p class="text-[10px] text-slate-400">{{ product.seller?.fullName || product.seller?.username || 'Redmit seller' }}</p></div>
              <button @click="requireLogin" class="flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all"><i class="fas fa-lock text-[10px]"></i> Buy</button>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center"><p class="text-slate-500 text-sm mb-4">Have a digital product to sell?</p><router-link to="/register" class="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary/20"><i class="fas fa-store text-xs"></i>Start Selling on Redmit</router-link></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DigitalProductsSection',
  props: { products: { type: Array, default: () => [] }, loading: { type: Boolean, default: false } },
  data() {
    return {
      activeCategory: 'all',
      categories: [
        { value: 'all', label: 'All', icon: 'fas fa-th-large' },
        { value: 'design-templates', label: 'Design & Templates', icon: 'fas fa-paint-brush' },
        { value: 'software-tools', label: 'Software & Tools', icon: 'fas fa-code' },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.activeCategory === 'all') return this.products;
      return this.products.filter(p => p.category?.slug === this.activeCategory);
    },
  },
  methods: {
    formatPrice(price, currency) { return `${currency || 'USD'} ${Number(price || 0).toFixed(2)}`; },
    requireLogin() { this.$router.push('/login'); },
  },
};
</script>
