<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]"><div class="mx-auto max-w-[1500px] p-4 sm:p-5">
    <div class="mb-4 flex items-center justify-between border-b border-slate-200 pb-4"><div><p class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Services</p><h1 class="text-lg font-bold text-slate-800">Channel Growth</h1><p class="mt-1 text-xs text-slate-500">Manage channel growth and advertising requests.</p></div><button @click="openAdd" class="h-9 bg-primary px-4 text-xs font-semibold text-white"><i class="fas fa-plus mr-1"></i>Add Channel Growth</button></div>
    <div class="mb-4 border border-slate-200 bg-white p-3"><div class="flex gap-2"><input v-model="search" @keyup.enter="fetchGrowth(1)" class="h-9 flex-1 border border-slate-200 px-3 text-xs" placeholder="Search channel growth..." /><select v-model="typeFilter" @change="fetchGrowth(1)" class="h-9 border border-slate-200 px-3 text-xs"><option value="">All Types</option><option v-for="type in availableTypes" :key="type">{{type}}</option></select><button @click="resetFilters" class="h-9 border border-slate-200 px-3 text-xs">Reset</button></div></div>
    <div v-if="loading" class="border border-slate-200 bg-white py-12 text-center text-xs text-slate-400">Loading Channel Growth...</div>
    <div v-else-if="items.length" class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"><div v-for="item in items" :key="item.id" class="overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div class="h-40 bg-slate-100"><img v-if="getThumbnailUrl(item)" :src="getThumbnailUrl(item)" :alt="item.name" class="h-full w-full object-cover" /><div v-else class="flex h-full items-center justify-center text-slate-300"><i class="fas fa-chart-line text-3xl"></i></div></div>
      <div class="p-4"><div class="flex items-start justify-between gap-2"><h2 class="truncate text-sm font-bold text-slate-800">{{item.name||"Unnamed"}}</h2><span class="bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary">{{item.type||"Growth"}}</span></div><p class="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{{item.description||"No description available."}}</p><div class="mt-3 flex items-center justify-between border-t border-slate-100 pt-3"><span class="text-sm font-bold">{{formatPrice(item.price)}} {{item.currency||"USD"}}</span><div class="flex gap-1"><button @click="viewItem(item)" class="btn">View</button><button @click="editItem(item)" class="btn-primary">Edit</button></div></div></div>
    </div></div>
    <div v-else class="border border-slate-200 bg-white py-12 text-center"><i class="fas fa-chart-line text-2xl text-slate-300"></i><p class="mt-2 text-xs text-slate-500">No Channel Growth records found.</p></div>
    <div v-if="totalPages>1" class="mt-4 flex items-center justify-center gap-2"><button v-for="page in totalPages" :key="page" @click="fetchGrowth(page)" :class="page===currentPage?'page-active':'page'" class="h-8 min-w-8 px-2 text-xs">{{page}}</button></div>
    <AddGrowth v-if="showAdd" @close="closeModals" @saved="handleSaved"/><EditGrowth v-if="showEdit" :data="selectedItem" @close="closeModals" @saved="handleSaved"/>
  </div></div>
</template>
<script>
import AddGrowth from "./AddGrowth.vue"; import EditGrowth from "./EditGrowth.vue";
export default {
  name:"ViewGrowth",components:{AddGrowth,EditGrowth},
  data(){return{items:[],count:0,currentPage:1,pageSize:10,totalPages:1,search:"",typeFilter:"",loading:false,showAdd:false,showEdit:false,selectedItem:null};},
  computed:{availableTypes(){return [...new Set(this.items.map(i=>i.type).filter(Boolean))]}},
  methods:{
    async fetchGrowth(page=1){this.loading=true;try{const params={page,limit:this.pageSize};if(this.search.trim())params.search=this.search.trim();if(this.typeFilter)params.type=this.typeFilter;const response=await this.$apiGet("/growth",params);const payload=response?.data||response;this.items=Array.isArray(payload)?payload:(payload?.items||payload?.data||payload?.results||[]);this.count=payload?.pagination?.total||response?.pagination?.total||payload?.total||this.items.length;this.currentPage=payload?.pagination?.page||response?.pagination?.page||page;this.pageSize=payload?.pagination?.limit||response?.pagination?.limit||this.pageSize;this.totalPages=payload?.pagination?.totalPages||response?.pagination?.totalPages||Math.max(1,Math.ceil(this.count/this.pageSize));}catch(e){console.error(e);this.items=[];this.showToast(e?.response?.data?.message||"Failed to load Channel Growth","error")}finally{this.loading=false}},
    getThumbnailUrl(i){const m=i?.thumbnail;if(!m)return null;if(typeof m==="string")return m;return m.url||m.path||m.src||m.location||m.fileUrl||null},formatPrice(v){const n=Number(v);return Number.isNaN(n)?"0.00":n.toFixed(2)},openAdd(){this.showAdd=true},editItem(i){this.selectedItem=i;this.showEdit=true},viewItem(i){if(i?.id)this.$router.push({name:"Growth-detail",params:{id:i.id}})},closeModals(){this.showAdd=false;this.showEdit=false;this.selectedItem=null},handleSaved(){this.closeModals();this.fetchGrowth(this.currentPage)},resetFilters(){this.search="";this.typeFilter="";this.fetchGrowth(1)},showToast(m,t){if(this.$root?.$refs?.toast)this.$root.$refs.toast.showToast(m,t)}
  },
  mounted(){this.fetchGrowth()}
};
</script>
<style scoped>
.btn{@apply h-7 border border-slate-200 px-2.5 text-[10px] font-semibold text-slate-600}.btn-primary{@apply h-7 bg-primary px-2.5 text-[10px] font-semibold text-white}.page{@apply border border-slate-200 bg-white}.page-active{@apply bg-primary text-white}
</style>