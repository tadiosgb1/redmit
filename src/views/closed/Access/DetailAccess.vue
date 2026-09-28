<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">
    <Loading :visible="loading" message="Loading Access..." />
    <div class="mx-auto max-w-[1400px] p-4 sm:p-5">
      <div class="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-center gap-3">
          <button @click="goBack" class="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"><i class="fas fa-arrow-left text-[10px]"></i></button>
          <div><p class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Access Details</p><h1 class="mt-0.5 text-base font-bold text-slate-800">{{ access?.name || "Access" }}</h1></div>
        </div>
        <button @click="openEdit" class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-3.5 text-xs font-semibold text-white shadow-sm hover:opacity-90"><i class="fas fa-edit text-[10px]"></i>Edit Access</button>
      </div>

      <div v-if="access">
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="border border-slate-200 bg-white shadow-sm">
            <div class="aspect-square bg-slate-100"><img v-if="thumbnailUrl" :src="thumbnailUrl" :alt="access.name" class="h-full w-full object-cover"><div v-else class="flex h-full w-full items-center justify-center text-slate-300"><i class="fas fa-key text-5xl"></i></div></div>
            <div class="border-t border-slate-100 px-4 py-4"><p class="text-[9px] font-bold uppercase tracking-wider text-slate-400">Price</p><div class="mt-1"><span class="text-2xl font-bold text-slate-800">{{ formatPrice(access.price) }}</span><span class="ml-1 text-xs font-bold uppercase text-primary">{{ access.currency || "USD" }}</span></div></div>
          </div>

          <div class="border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div class="border-b border-slate-100 px-5 py-4">
              <div class="flex flex-wrap items-center gap-2">
                <span v-if="access.type" class="bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">{{ access.type }}</span>
                <span v-if="access.slug" class="bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500">{{ access.slug }}</span>
              </div>
              <h2 class="mt-3 text-lg font-bold text-slate-800">{{ access.name }}</h2>
              <p v-if="access.description" class="mt-1.5 text-xs leading-5 text-slate-500">{{ access.description }}</p>
            </div>
            <div class="grid grid-cols-1 gap-3 p-5 sm:grid-cols-3">
              <div class="bg-slate-50 px-3 py-3"><p class="text-[9px] uppercase tracking-wide text-slate-400">Type</p><p class="mt-1 text-xs font-semibold text-slate-700">{{ access.type || "—" }}</p></div>
              <div class="bg-slate-50 px-3 py-3"><p class="text-[9px] uppercase tracking-wide text-slate-400">Currency</p><p class="mt-1 text-xs font-semibold text-slate-700">{{ access.currency || "—" }}</p></div>
              <div class="bg-slate-50 px-3 py-3"><p class="text-[9px] uppercase tracking-wide text-slate-400">Files</p><p class="mt-1 text-xs font-semibold text-slate-700">{{ files.length }}</p></div>
            </div>
          </div>
        </div>

        <div class="mt-4 border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 px-5 py-3"><h2 class="text-sm font-bold text-slate-800">Details</h2><p class="mt-0.5 text-[10px] text-slate-400">Structured information for this access item.</p></div>
          <div v-if="details.length" class="grid grid-cols-1 gap-px bg-slate-100 sm:grid-cols-2">
            <div v-for="(detail,index) in details" :key="index" class="bg-white px-4 py-3">
              <p class="text-[9px] font-bold uppercase tracking-wide text-slate-400">{{ detail.key || "Detail" }}</p>
              <p class="mt-1 whitespace-pre-line break-words text-xs font-medium text-slate-700">{{ detail.value || "—" }}</p>
            </div>
          </div>
          <div v-else class="px-5 py-10 text-center"><div class="mx-auto flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-400"><i class="fas fa-list text-sm"></i></div><p class="mt-2 text-xs font-medium text-slate-500">No details available</p></div>
        </div>

        <div class="mt-4 border border-slate-200 bg-white shadow-sm">
          <div class="flex items-center justify-between border-b border-slate-100 px-5 py-3"><div><h2 class="text-sm font-bold text-slate-800">Access Files</h2><p class="mt-0.5 text-[10px] text-slate-400">Images and videos associated with this access.</p></div><span class="bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary">{{ files.length }} file{{ files.length === 1 ? "" : "s" }}</span></div>
          <div v-if="files.length" class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div v-for="(file,index) in files" :key="getFileKey(file,index)" class="overflow-hidden border border-slate-200 bg-slate-50">
              <div class="aspect-video bg-slate-900">
                <img v-if="!isVideo(file)" :src="getFileUrl(file)" :alt="getFileName(file)" class="h-full w-full object-contain">
                <video v-else :src="getFileUrl(file)" controls preload="metadata" class="h-full w-full object-contain"></video>
              </div>
              <div class="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2.5"><div class="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-primary/10 text-primary"><i :class="isVideo(file) ? 'fas fa-video' : 'fas fa-image'" class="text-[10px]"></i></div><p class="min-w-0 truncate text-[10px] font-medium text-slate-600">{{ getFileName(file) }}</p></div>
            </div>
          </div>
          <div v-else class="px-5 py-10 text-center text-xs text-slate-400">No files available.</div>
        </div>
      </div>

      <div v-else-if="!loading" class="border border-slate-200 bg-white px-5 py-14 text-center"><i class="fas fa-key text-2xl text-slate-300"></i><p class="mt-3 text-xs font-semibold text-slate-500">Access not found</p></div>
    </div>

    <EditAccess v-if="showEdit && access" :data="access" @close="showEdit = false" @saved="handleSaved" />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import EditAccess from "./EditAccess.vue";

export default {
  name: "DetailAccess",
  components: { Loading, EditAccess },
  data() { return { access: null, loading: false, showEdit: false }; },
  computed: {
    thumbnailUrl() { return this.getMediaUrl(this.access?.thumbnail); },
    files() { return this.normalizeFiles(this.access?.files); },
    details() { return this.normalizeDetails(this.access?.details); },
  },
  methods: {
    async fetchAccess() {
      const id = this.$route.params.id;
      if (!id) return;
      this.loading = true;
      try {
        const response = await this.$apiGetById("/access", id);
        this.access = response?.data || response;
      } catch (e) {
        console.error("Error loading Access:", e);
        this.access = null;
        this.showToast(e?.response?.data?.message || "Failed to load Access", "error");
      } finally { this.loading = false; }
    },
    getMediaUrl(media) {
      if (!media) return null;
      if (typeof media === "string") return media;
      return media.url || media.path || media.src || media.location || media.fileUrl || null;
    },
    normalizeFiles(files) {
      if (!files) return [];
      if (Array.isArray(files)) return files;
      if (typeof files === "string") { try { const parsed = JSON.parse(files); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
      return [];
    },
    normalizeDetails(details) {
      if (!details) return [];
      if (Array.isArray(details)) return details.map(item => typeof item === "object" ? { key: item.key || item.name || "Detail", value: item.value ?? "" } : { key: "Detail", value: String(item) });
      if (typeof details === "string") { try { return this.normalizeDetails(JSON.parse(details)); } catch { return [{ key: "Details", value: details }]; } }
      if (typeof details === "object") return Object.keys(details).map(key => ({ key, value: typeof details[key] === "object" ? JSON.stringify(details[key]) : String(details[key] ?? "") }));
      return [];
    },
    getFileUrl(file) { return this.getMediaUrl(file); },
    getFileName(file) {
      if (!file) return "Access file";
      if (typeof file === "string") return file.split("?")[0].split("/").pop() || "Access file";
      return file.name || file.filename || file.originalName || file.originalname || "Access file";
    },
    getFileKey(file,index) { return file?.id || file?.url || file?.path || `${index}-${this.getFileName(file)}`; },
    isVideo(file) {
      const type = String(file?.type || file?.mimeType || file?.mimetype || "").toLowerCase();
      if (type.startsWith("video/")) return true;
      return /\.(mp4|webm|ogg|mov|avi|mkv|m4v)(\?.*)?$/i.test(this.getFileUrl(file) || "");
    },
    formatPrice(value) { const number = Number(value); return Number.isNaN(number) ? "0.00" : number.toFixed(2); },
    openEdit() { this.showEdit = true; },
    async handleSaved() { this.showEdit = false; await this.fetchAccess(); },
    goBack() { this.$router.back(); },
    showToast(message,type) { if (this.$root.$refs.toast) this.$root.$refs.toast.showToast(message,type); },
  },
  mounted() { this.fetchAccess(); },
};
</script>