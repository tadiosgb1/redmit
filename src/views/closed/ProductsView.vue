<template>
  <div class="p-6 space-y-5 bg-white min-h-full">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Digital Products</h1>
        <p class="text-slate-500 text-sm">Browse and manage all digital product listings</p>
      </div>
      <router-link :to="{ name: 'Products-add' }"
        class="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition shadow-sm">
        <i class="fas fa-plus text-xs"></i> Add Product
      </router-link>
    </div>

    <!-- Filter bar -->
    <div class="flex flex-wrap gap-2">
      <button v-for="cat in categories" :key="cat"
        @click="activeCategory = cat"
        class="px-4 py-1.5 text-xs font-bold rounded-full border transition"
        :class="activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'">
        {{ cat }}
      </button>
    </div>

    <!-- Products grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="p in products" :key="p.id"
        class="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div class="h-32 flex items-center justify-center" :class="p.thumbBg">
          <i :class="[p.icon, p.iconColor, 'text-4xl']"></i>
        </div>
        <div class="p-4">
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="p.catBadge">{{ p.category }}</span>
          <h4 class="font-black text-slate-800 text-sm mt-2 mb-1 line-clamp-2">{{ p.title }}</h4>
          <div class="flex items-center justify-between mt-3">
            <p class="font-black text-slate-900 text-base">{{ p.price }}</p>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="p.statusCls">{{ p.status }}</span>
          </div>
          <p class="text-[10px] text-slate-400 mt-1">{{ p.sales }} sales · {{ p.downloads }} downloads</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductsView',
  data() {
    return {
      activeCategory: 'All',
      categories: ['All', 'E-books', 'Design', 'Music', 'Software', 'Courses'],
      products: [
        { id:1, title:'Digital Marketing Mastery Course',   category:'Course',   price:'1,500 ETB', sales:'204', downloads:'204', status:'Active',  statusCls:'bg-green-100 text-green-700',   thumbBg:'bg-purple-50', icon:'fas fa-graduation-cap', iconColor:'text-purple-400', catBadge:'bg-purple-100 text-purple-700' },
        { id:2, title:'Canva Social Media Templates Pack',  category:'Design',   price:'800 ETB',   sales:'89',  downloads:'89',  status:'Active',  statusCls:'bg-green-100 text-green-700',   thumbBg:'bg-pink-50',   icon:'fas fa-palette',        iconColor:'text-pink-400',   catBadge:'bg-pink-100 text-pink-700' },
        { id:3, title:'Ethiopian Entrepreneur Guide',       category:'E-book',   price:'350 ETB',   sales:'142', downloads:'142', status:'Active',  statusCls:'bg-green-100 text-green-700',   thumbBg:'bg-blue-50',   icon:'fas fa-book-open',      iconColor:'text-blue-400',   catBadge:'bg-blue-100 text-blue-700' },
        { id:4, title:'Afrobeat Instrumental Pack — 25',   category:'Music',    price:'1,200 ETB', sales:'56',  downloads:'56',  status:'Active',  statusCls:'bg-green-100 text-green-700',   thumbBg:'bg-amber-50',  icon:'fas fa-music',          iconColor:'text-amber-400',  catBadge:'bg-amber-100 text-amber-700' },
        { id:5, title:'Invoice & Accounting Tool',         category:'Software', price:'2,500 ETB', sales:'37',  downloads:'37',  status:'Review',  statusCls:'bg-amber-100 text-amber-700',   thumbBg:'bg-green-50',  icon:'fas fa-laptop-code',    iconColor:'text-green-500',  catBadge:'bg-green-100 text-green-700' },
        { id:6, title:'YouTube Channel Growth Blueprint',  category:'Course',   price:'900 ETB',   sales:'115', downloads:'115', status:'Active',  statusCls:'bg-green-100 text-green-700',   thumbBg:'bg-red-50',    icon:'fab fa-youtube',        iconColor:'text-red-500',    catBadge:'bg-red-100 text-red-700' },
        { id:7, title:'Logo Design Vector Templates',      category:'Design',   price:'600 ETB',   sales:'63',  downloads:'63',  status:'Active',  statusCls:'bg-green-100 text-green-700',   thumbBg:'bg-indigo-50', icon:'fas fa-vector-square',  iconColor:'text-indigo-500', catBadge:'bg-indigo-100 text-indigo-700' },
        { id:8, title:'Freelancing in Ethiopia Guide',     category:'E-book',   price:'290 ETB',   sales:'78',  downloads:'78',  status:'Inactive',statusCls:'bg-slate-100 text-slate-500',   thumbBg:'bg-sky-50',    icon:'fas fa-laptop',         iconColor:'text-sky-500',    catBadge:'bg-sky-100 text-sky-700' },
      ],
    };
  },
};
</script>
