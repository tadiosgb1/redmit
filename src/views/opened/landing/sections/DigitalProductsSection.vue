<template>
  <section id="products" class="py-24 bg-slate-50">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-14">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700 uppercase tracking-widest mb-4">
          <i class="fas fa-box-open text-[10px]"></i> Digital Products Marketplace
        </span>
        <h2 class="text-4xl font-black text-slate-900 mb-4">Buy Downloadable Digital Goods</h2>
        <p class="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          Browse e-books, design templates, music, software, courses and more. Sign in to purchase and get instant access.
        </p>
      </div>

      <!-- Category tabs -->
      <div class="flex flex-wrap gap-2 justify-center mb-10">
        <button v-for="cat in categories" :key="cat.value"
          @click="activeCategory = cat.value"
          class="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border transition-all"
          :class="activeCategory === cat.value
            ? 'bg-primary text-white border-primary'
            : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'">
          <i :class="cat.icon" class="text-xs"></i>
          {{ cat.label }}
        </button>
      </div>

      <!-- Product grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.id"
          class="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300">

          <!-- Thumbnail -->
          <div class="relative h-40 flex items-center justify-center overflow-hidden"
               :class="product.thumbBg">
            <i :class="[product.thumbIcon, 'text-5xl opacity-20']"></i>
            <div class="absolute inset-0 flex items-center justify-center">
              <i :class="[product.thumbIcon, product.thumbColor, 'text-4xl']"></i>
            </div>
            <span class="absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full"
              :class="product.categoryBadge">
              {{ product.category }}
            </span>
            <span v-if="product.bestseller"
              class="absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-400 text-amber-900">
              🔥 Popular
            </span>
          </div>

          <!-- Info -->
          <div class="p-4">
            <h4 class="font-black text-slate-800 text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {{ product.title }}
            </h4>
            <p class="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{{ product.desc }}</p>

            <div class="flex items-center gap-2 mb-3">
              <div class="flex text-amber-400 text-[10px] gap-0.5">
                <i v-for="n in 5" :key="n" :class="n <= product.stars ? 'fas fa-star' : 'far fa-star'"></i>
              </div>
              <span class="text-[10px] text-slate-400">({{ product.reviews }})</span>
            </div>

            <div class="flex items-center justify-between">
              <div>
                <p class="text-lg font-black text-slate-900">{{ product.price }}</p>
                <p class="text-[10px] text-slate-400">{{ product.priceUSD }}</p>
              </div>
              <button @click="requireLogin"
                class="flex items-center gap-1.5 px-3.5 py-2 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition-all">
                <i class="fas fa-lock text-[10px]"></i>
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Seller CTA -->
      <div class="mt-12 text-center">
        <p class="text-slate-500 text-sm mb-4">Have a digital product to sell?</p>
        <router-link to="/register"
          class="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-primary/20">
          <i class="fas fa-store text-xs"></i>
          Start Selling on Redmit
        </router-link>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'DigitalProductsSection',
  data() {
    return {
      activeCategory: 'all',
      categories: [
        { value: 'all',      label: 'All',           icon: 'fas fa-th-large' },
        { value: 'ebook',    label: 'E-books',        icon: 'fas fa-book' },
        { value: 'design',   label: 'Design',         icon: 'fas fa-paint-brush' },
        { value: 'music',    label: 'Music & Audio',  icon: 'fas fa-music' },
        { value: 'software', label: 'Software',       icon: 'fas fa-code' },
        { value: 'course',   label: 'Courses',        icon: 'fas fa-graduation-cap' },
      ],
      products: [
        {
          id: 1, category: 'E-book', type: 'ebook', title: 'The Ethiopian Entrepreneur\'s Complete Guide',
          desc: 'A practical roadmap for starting and scaling a business in Ethiopia\'s growing economy.',
          thumbBg: 'bg-blue-50', thumbIcon: 'fas fa-book-open', thumbColor: 'text-blue-400',
          categoryBadge: 'bg-blue-100 text-blue-700',
          price: '350 ETB', priceUSD: '≈ $3', stars: 5, reviews: 142, bestseller: true,
        },
        {
          id: 2, category: 'Design', type: 'design', title: 'Social Media Canva Template Pack — 100 Designs',
          desc: 'Professional Instagram, TikTok & Facebook templates for Ethiopian businesses.',
          thumbBg: 'bg-pink-50', thumbIcon: 'fas fa-palette', thumbColor: 'text-pink-400',
          categoryBadge: 'bg-pink-100 text-pink-700',
          price: '800 ETB', priceUSD: '≈ $7', stars: 5, reviews: 89, bestseller: true,
        },
        {
          id: 3, category: 'Music', type: 'music', title: 'Afrobeat & Ethiopian Hip-Hop Instrumental Pack',
          desc: '25 royalty-free beats ready for YouTube, TikTok and commercial use.',
          thumbBg: 'bg-amber-50', thumbIcon: 'fas fa-music', thumbColor: 'text-amber-500',
          categoryBadge: 'bg-amber-100 text-amber-700',
          price: '1,200 ETB', priceUSD: '≈ $10', stars: 4, reviews: 56, bestseller: false,
        },
        {
          id: 4, category: 'Software', type: 'software', title: 'Invoice & Accounting Tool for Small Business',
          desc: 'Lightweight desktop app for managing sales, expenses, and invoices in ETB.',
          thumbBg: 'bg-green-50', thumbIcon: 'fas fa-laptop-code', thumbColor: 'text-green-500',
          categoryBadge: 'bg-green-100 text-green-700',
          price: '2,500 ETB', priceUSD: '≈ $20', stars: 4, reviews: 37, bestseller: false,
        },
        {
          id: 5, category: 'Course', type: 'course', title: 'Digital Marketing Mastery — Full Video Course',
          desc: 'Learn Facebook Ads, Google SEO, and content marketing from scratch.',
          thumbBg: 'bg-purple-50', thumbIcon: 'fas fa-graduation-cap', thumbColor: 'text-purple-500',
          categoryBadge: 'bg-purple-100 text-purple-700',
          price: '1,500 ETB', priceUSD: '≈ $12', stars: 5, reviews: 204, bestseller: true,
        },
        {
          id: 6, category: 'E-book', type: 'ebook', title: 'Freelancing in Ethiopia — Get Your First Client',
          desc: 'Step-by-step guide to landing international freelance clients from Ethiopia.',
          thumbBg: 'bg-sky-50', thumbIcon: 'fas fa-laptop', thumbColor: 'text-sky-500',
          categoryBadge: 'bg-sky-100 text-sky-700',
          price: '290 ETB', priceUSD: '≈ $2.4', stars: 4, reviews: 78, bestseller: false,
        },
        {
          id: 7, category: 'Design', type: 'design', title: 'Logo Design Toolkit — 50 Vector Templates',
          desc: 'Editable AI/EPS logo files across 10 business categories.',
          thumbBg: 'bg-indigo-50', thumbIcon: 'fas fa-vector-square', thumbColor: 'text-indigo-500',
          categoryBadge: 'bg-indigo-100 text-indigo-700',
          price: '600 ETB', priceUSD: '≈ $5', stars: 5, reviews: 63, bestseller: false,
        },
        {
          id: 8, category: 'Course', type: 'course', title: 'YouTube Channel Growth Blueprint',
          desc: 'Grow from 0 to 1,000 subscribers with proven strategies for Ethiopian creators.',
          thumbBg: 'bg-red-50', thumbIcon: 'fab fa-youtube', thumbColor: 'text-red-500',
          categoryBadge: 'bg-red-100 text-red-700',
          price: '900 ETB', priceUSD: '≈ $7.5', stars: 4, reviews: 115, bestseller: true,
        },
      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.activeCategory === 'all') return this.products;
      return this.products.filter(p => p.type === this.activeCategory);
    },
  },
  methods: {
    requireLogin() {
      this.$router.push('/login');
    },
  },
};
</script>
