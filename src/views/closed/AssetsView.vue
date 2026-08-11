<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Digital Assets</h1>
        <p class="text-slate-500 text-sm">Social media accounts, websites and domains for sale</p>
      </div>
      <router-link :to="{ name: 'Assets-add' }"
        class="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition shadow-sm">
        <i class="fas fa-plus text-xs"></i> Add Listing
      </router-link>
    </div>

    <!-- Platform tabs -->
    <div class="flex flex-wrap gap-2">
      <button v-for="tab in tabs" :key="tab.value"
        @click="activeTab = tab.value"
        class="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full border transition"
        :class="activeTab === tab.value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'">
        <i :class="tab.icon" class="text-sm"></i> {{ tab.label }}
      </button>
    </div>

    <!-- Assets table -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="border-b border-slate-100">
          <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <th class="px-5 py-3.5 text-left">Asset</th>
            <th class="px-4 py-3.5 text-left hidden sm:table-cell">Stats</th>
            <th class="px-4 py-3.5 text-left hidden md:table-cell">Niche</th>
            <th class="px-4 py-3.5 text-left">Price</th>
            <th class="px-4 py-3.5 text-left">Status</th>
            <th class="px-4 py-3.5 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-50">
          <tr v-for="asset in filteredAssets" :key="asset.id"
            class="hover:bg-slate-50/50 transition-colors">
            <td class="px-5 py-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="asset.iconBg">
                  <i :class="[asset.icon, asset.iconColor, 'text-lg']"></i>
                </div>
                <div>
                  <p class="font-bold text-slate-800 text-sm">{{ asset.title }}</p>
                  <p class="text-[10px] text-slate-400">{{ asset.platform }} · {{ asset.age }}</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 hidden sm:table-cell">
              <p class="text-xs font-bold text-slate-700">{{ asset.followers }}</p>
              <p class="text-[10px] text-slate-400">{{ asset.engagement }} eng.</p>
            </td>
            <td class="px-4 py-4 hidden md:table-cell text-xs text-slate-600">{{ asset.niche }}</td>
            <td class="px-4 py-4">
              <p class="font-black text-slate-900 text-sm">{{ asset.price }}</p>
              <p class="text-[10px] text-slate-400">{{ asset.priceUSD }}</p>
            </td>
            <td class="px-4 py-4">
              <span class="text-[10px] font-black px-2.5 py-1 rounded-full" :class="asset.statusCls">
                {{ asset.status }}
              </span>
            </td>
            <td class="px-4 py-4">
              <div class="flex gap-1.5">
                <button class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-500 flex items-center justify-center transition text-xs">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-500 flex items-center justify-center transition text-xs">
                  <i class="fas fa-pen"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AssetsView',
  data() {
    return {
      activeTab: 'all',
      tabs: [
        { value:'all',       label:'All',       icon:'fas fa-th-large' },
        { value:'tiktok',    label:'TikTok',    icon:'fab fa-tiktok' },
        { value:'instagram', label:'Instagram', icon:'fab fa-instagram' },
        { value:'youtube',   label:'YouTube',   icon:'fab fa-youtube' },
        { value:'facebook',  label:'Facebook',  icon:'fab fa-facebook' },
        { value:'website',   label:'Websites',  icon:'fas fa-globe' },
      ],
      assets: [
        { id:1, title:'Comedy TikTok Account',    platform:'TikTok',    type:'tiktok',    niche:'Entertainment', followers:'128K', engagement:'4.2%', price:'85,000 ETB', priceUSD:'≈$700', age:'2 yrs', icon:'fab fa-tiktok',    iconBg:'bg-slate-100', iconColor:'text-slate-800', status:'Listed',  statusCls:'bg-green-100 text-green-700' },
        { id:2, title:'Fashion Instagram Page',   platform:'Instagram', type:'instagram', niche:'Fashion',       followers:'54K',  engagement:'3.8%', price:'45,000 ETB', priceUSD:'≈$370', age:'3 yrs', icon:'fab fa-instagram', iconBg:'bg-pink-50',   iconColor:'text-pink-600',  status:'Listed',  statusCls:'bg-green-100 text-green-700' },
        { id:3, title:'Tech Review YouTube Ch.',  platform:'YouTube',   type:'youtube',   niche:'Technology',    followers:'32K',  engagement:'—',    price:'120,000 ETB',priceUSD:'≈$980', age:'4 yrs', icon:'fab fa-youtube',   iconBg:'bg-red-50',    iconColor:'text-red-600',   status:'Review',  statusCls:'bg-amber-100 text-amber-700' },
        { id:4, title:'Ethiopia News FB Page',    platform:'Facebook',  type:'facebook',  niche:'News & Media',  followers:'210K', engagement:'2.1%', price:'60,000 ETB', priceUSD:'≈$490', age:'5 yrs', icon:'fab fa-facebook',  iconBg:'bg-blue-50',   iconColor:'text-blue-600',  status:'Listed',  statusCls:'bg-green-100 text-green-700' },
        { id:5, title:'E-commerce Store Site',    platform:'Website',   type:'website',   niche:'E-commerce',    followers:'8K/mo',engagement:'—',    price:'150,000 ETB',priceUSD:'≈$1.2K',age:'2 yrs', icon:'fas fa-globe',     iconBg:'bg-emerald-50',iconColor:'text-emerald-600',status:'Sold',    statusCls:'bg-slate-100 text-slate-500' },
        { id:6, title:'Music Dance TikTok',       platform:'TikTok',    type:'tiktok',    niche:'Music',         followers:'75K',  engagement:'6.1%', price:'55,000 ETB', priceUSD:'≈$450', age:'1.5 yrs',icon:'fab fa-tiktok',   iconBg:'bg-slate-100', iconColor:'text-slate-800', status:'Listed',  statusCls:'bg-green-100 text-green-700' },
      ],
    };
  },
  computed: {
    filteredAssets() {
      if (this.activeTab === 'all') return this.assets;
      return this.assets.filter(a => a.type === this.activeTab);
    },
  },
};
</script>
