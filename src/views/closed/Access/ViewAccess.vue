<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">
    <Loading :visible="loading" message="Loading Access..." />
    <div class="mx-auto max-w-[1500px] p-4 sm:p-5">
      <div class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Marketplace</p><h1 class="mt-0.5 text-lg font-bold text-slate-800">Access</h1><p class="mt-0.5 text-[11px] text-slate-400">Manage payment request products and digital resources.</p></div>
        <button @click="openAdd" class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-4 text-xs font-semibold text-white shadow-sm hover:opacity-90"><i class="fas fa-plus text-[10px]"></i>Add Access</button>
      </div>

      <div class="mb-4 border border-slate-200 bg-white p-3 shadow-sm">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div><label class="mb-1 block text-[10px] font-semibold text-slate-500">Search</label><div class="relative"><i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"></i><input v-model="search" type="text" placeholder="Search payment request..." class="h-9 w-full border border-slate-200 pl-8 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" @keyup.enter="fetchAccess(1)"></div></div>
          <div><label class="mb-1 block text-[10px] font-semibold text-slate-500">Type</label><select v-model="typeFilter" class="h-9 w-full border border-slate-200 px-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary/20" @change="fetchAccess(1)"><option value="">All Types</option><option v-for="type in availableTypes" :key="type" :value="type">{{ type }}</option></select></div>
          <div class="flex items-end"><button @click="resetFilters" class="h-9 border border-slate-200 bg-white px-4 text-[10px] font-semibold text-slate-500 hover:bg-slate-50"><i class="fas fa-sync-alt mr-1"></i>Reset</button></div>
        </div>
      </div>

      <div class="overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3"><div><h2 class="text-sm font-bold text-slate-800">Access Items</h2><p class="mt-0.5 text-[10px] text-slate-400">{{ count }} item{{ count === 1 ? "" : "s" }}</p></div></div>

        <div class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-[950px]">
            <thead><tr class="border-b border-slate-100 bg-slate-50">
              <th class="table-head">Access</th><th class="table-head">Platform</th><th class="table-head">Type</th><th class="table-head">Price</th><th class="table-head">Currency</th><th class="table-head">Files</th><th class="table-head text-right">Actions</th>
            </tr></thead>
            <tbody>
              <tr v-for="(item,index) in items" :key="item.id || index" class="border-b border-slate-100 hover:bg-slate-50/70">
                <td class="px-4 py-3"><div class="flex items-center gap-3"><div class="h-11 w-11 flex-shrink-0 overflow-hidden border border-slate-200 bg-slate-100"><img v-if="getThumbnailUrl(item)" :src="getThumbnailUrl(item)" :alt="item.name" class="h-full w-full object-cover"><div v-else class="flex h-full w-full items-center justify-center text-slate-300"><i class="fas fa-hand-holding-usd text-sm"></i></div></div><div class="min-w-0"><p class="truncate text-xs font-semibold text-slate-700">{{ item.name || "Unnamed Access" }}</p><p class="mt-0.5 max-w-[280px] truncate text-[9px] text-slate-400">{{ item.description || "No description" }}</p></div></div></td>
                <td class="px-4 py-3"><a v-if="item.platform_link" :href="item.platform_link" target="_blank" rel="noopener" class="text-[10px] font-semibold text-primary hover:underline">Open platform</a><span v-else class="text-[9px] text-slate-400">—</span></td>
                <td class="px-4 py-3"><span class="inline-flex bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary">{{ item.type || "—" }}</span></td>
                <td class="px-4 py-3"><span class="text-xs font-semibold text-slate-700">{{ formatPrice(item.price) }}</span></td>
                <td class="px-4 py-3"><span class="text-[10px] font-semibold uppercase text-slate-500">{{ item.currency || "—" }}</span></td>
                <td class="px-4 py-3"><span class="text-xs font-semibold text-slate-600">{{ getFiles(item).length }}</span></td>
                <td class="px-4 py-3"><div class="flex justify-end gap-1.5"><button @click="viewItem(item)" class="flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-50" title="View"><i class="fas fa-eye text-[10px]"></i></button><button @click="editItem(item)" class="flex h-7 w-7 items-center justify-center border border-slate-200 text-primary hover:bg-primary/5" title="Edit"><i class="fas fa-edit text-[10px]"></i></button></div></td>
              </tr>
              <tr v-if="!loading && items.length === 0"><td colspan="7" class="px-5 py-14 text-center"><div class="mx-auto flex h-11 w-11 items-center justify-center bg-slate-100 text-slate-400"><i class="fas fa-hand-holding-usd text-sm"></i></div><p class="mt-3 text-xs font-semibold text-slate-500">No payment request items found</p><p class="mt-1 text-[10px] text-slate-400">Try another search or create a new payment request item.</p></td></tr>
            </tbody>
          </table>
        </div>

        <div class="divide-y divide-slate-100 md:hidden">
          <div v-for="(item,index) in items" :key="item.id || index" class="p-4">
            <div class="flex gap-3"><div class="h-14 w-14 flex-shrink-0 overflow-hidden border border-slate-200 bg-slate-100"><img v-if="getThumbnailUrl(item)" :src="getThumbnailUrl(item)" :alt="item.name" class="h-full w-full object-cover"><div v-else class="flex h-full w-full items-center justify-center text-slate-300"><i class="fas fa-hand-holding-usd"></i></div></div><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><div class="min-w-0"><p class="truncate text-xs font-semibold text-slate-700">{{ item.name || "Unnamed Access" }}</p><p class="mt-1 font-mono text-[9px] text-slate-400">{{ item.slug || "No slug" }}</p></div><span class="flex-shrink-0 text-xs font-bold text-slate-800">{{ formatPrice(item.price) }} {{ item.currency || "" }}</span></div><p class="mt-2 line-clamp-2 text-[10px] text-slate-500">{{ item.description || "No description" }}</p><div class="mt-3 flex items-center justify-between"><span class="text-[9px] text-slate-400">{{ getFiles(item).length }} file{{ getFiles(item).length === 1 ? "" : "s" }}</span><div class="flex gap-1.5"><button @click="viewItem(item)" class="h-7 border border-slate-200 px-2.5 text-[9px] font-semibold text-slate-500">View</button><button @click="editItem(item)" class="h-7 bg-primary px-2.5 text-[9px] font-semibold text-white">Edit</button></div></div></div></div>
          </div>
          <div v-if="!loading && items.length === 0" class="px-4 py-10 text-center text-xs text-slate-500">No payment request items found.</div>
        </div>

        <div class="flex flex-col gap-2 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-[10px] text-slate-400">Showing page {{ currentPage }} of {{ totalPages }}</p>
          <div class="flex gap-2"><button @click="fetchAccess(currentPage - 1)" :disabled="currentPage <= 1 || loading" class="h-8 border border-slate-200 px-3 text-[10px] font-semibold text-slate-500 disabled:opacity-40">Previous</button><button @click="fetchAccess(currentPage + 1)" :disabled="currentPage >= totalPages || loading" class="h-8 border border-slate-200 px-3 text-[10px] font-semibold text-slate-500 disabled:opacity-40">Next</button></div>
        </div>
      </div>
    </div>

    <AddAccess v-if="showAdd" @close="closeModals" @saved="handleSaved" />
    <EditAccess v-if="showEdit" :data="selectedItem" @close="closeModals" @saved="handleSaved" />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import AddAccess from "./AddAccess.vue";
import EditAccess from "./EditAccess.vue";

export default {
  name: "ViewAccess",
  components: { Loading, AddAccess, EditAccess },
  data() {
    return { items: [], count: 0, currentPage: 1, pageSize: 10, totalPages: 1, search: "", typeFilter: "", showAdd: false, showEdit: false, selectedItem: null, loading: false };
  },
  computed: {
    availableTypes() { return [...new Set(this.items.map(item => item.type).filter(Boolean))]; },
  },
  methods: {
    async fetchAccess(page = 1) {
      if (page < 1) return;
      this.loading = true;
      try {
        const params = { page, limit: this.pageSize };
        if (this.search.trim()) params.search = this.search.trim();
        if (this.typeFilter) params.type = this.typeFilter;
        const response = await this.$apiGet("/access", params);
        const payload = response?.data || response;
        this.items = Array.isArray(payload) ? payload : payload?.items || payload?.data || payload?.results || [];
        this.count = payload?.pagination?.total || response?.pagination?.total || payload?.total || this.items.length;
        this.currentPage = payload?.pagination?.page || response?.pagination?.page || payload?.page || page;
        this.pageSize = payload?.pagination?.limit || response?.pagination?.limit || this.pageSize;
        this.totalPages = payload?.pagination?.totalPages || response?.pagination?.totalPages || Math.max(1, Math.ceil(this.count / this.pageSize));
      } catch (e) {
        console.error("Error loading Access:", e);
        this.items = []; this.count = 0; this.totalPages = 1;
        this.showToast(e?.response?.data?.message || "Failed to load Access", "error");
      } finally { this.loading = false; }
    },
    getThumbnailUrl(item) {
      const thumbnail = item?.thumbnail;
      if (!thumbnail) return null;
      if (typeof thumbnail === "string") return thumbnail;
      return thumbnail.url || thumbnail.path || thumbnail.src || thumbnail.location || thumbnail.fileUrl || null;
    },
    getFiles(item) {
      if (!item?.files) return [];
      if (Array.isArray(item.files)) return item.files;
      if (typeof item.files === "string") { try { const parsed = JSON.parse(item.files); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
      return [];
    },
    formatPrice(value) { const number = Number(value); return Number.isNaN(number) ? "0.00" : number.toFixed(2); },
    openAdd() { this.selectedItem = null; this.showAdd = true; },
    editItem(item) { this.selectedItem = item; this.showEdit = true; },
    viewItem(item) { if (item?.id) this.$router.push({ name: "Access-detail", params: { id: item.id } }); },
    closeModals() { this.showAdd = false; this.showEdit = false; this.selectedItem = null; },
    async handleSaved() { this.closeModals(); await this.fetchAccess(this.currentPage); },
    resetFilters() { this.search = ""; this.typeFilter = ""; this.fetchAccess(1); },
    showToast(message, type) { if (this.$root.$refs.toast) this.$root.$refs.toast.showToast(message, type); },
  },
  mounted() { this.fetchAccess(); },
};
</script>

<style scoped>
.table-head { @apply px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400; }
</style>