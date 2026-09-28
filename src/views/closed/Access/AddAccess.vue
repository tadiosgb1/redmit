<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4">
    <div class="w-full max-w-4xl overflow-hidden border border-slate-200 bg-white shadow-2xl">
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"><i class="fas fa-key text-sm"></i></div>
          <div>
            <h2 class="text-sm font-bold text-slate-800">Add Access</h2>
            <p class="mt-0.5 text-[10px] text-slate-400">Create a new access item</p>
          </div>
        </div>
        <button @click="close" :disabled="saving" class="flex h-7 w-7 items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-40"><i class="fas fa-times text-xs"></i></button>
      </div>

      <form @submit.prevent="save" class="max-h-[78vh] overflow-y-auto px-5 py-4">
        <div class="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">
          <div>
            <label class="field-label">Name <span class="text-red-500">*</span></label>
            <input v-model="form.name" type="text" placeholder="Access name" class="field-input" :class="{ 'border-red-300': errors.name }">
            <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
          </div>
          <div>
            <label class="field-label">Slug</label>
            <input v-model="form.slug" type="text" placeholder="access-slug" class="field-input font-mono">
          </div>
          <div>
            <label class="field-label">Type</label>
            <input v-model="form.type" type="text" placeholder="account, subscription, service..." class="field-input">
          </div>
          <div>
            <label class="field-label">Description</label>
            <input v-model="form.description" type="text" placeholder="Short description" class="field-input">
          </div>
          <div>
            <label class="field-label">Price</label>
            <input v-model="form.price" type="number" min="0" step="0.01" placeholder="0.00" class="field-input">
          </div>
          <div>
            <label class="field-label">Currency</label>
            <input v-model="form.currency" type="text" maxlength="10" placeholder="USD" class="field-input uppercase">
          </div>
        </div>

        <div class="mt-4"><label class="field-label">Platform Link <span class="text-slate-400">(optional)</span></label><input v-model="form.platform_link" type="url" placeholder="https://coursera.org/..." class="field-input"></div>

        <div class="mt-4">
          <label class="field-label">Thumbnail</label>
          <div class="border border-dashed border-slate-300 bg-slate-50 p-3">
            <div v-if="thumbnailPreview" class="mb-3 flex items-center gap-3">
              <div class="h-16 w-16 overflow-hidden border border-slate-200 bg-white">
                <img :src="thumbnailPreview" alt="Thumbnail preview" class="h-full w-full object-cover">
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-[10px] font-semibold text-slate-700">{{ thumbnailFile?.name }}</p>
                <p class="mt-0.5 text-[9px] text-slate-400">Image selected</p>
              </div>
              <button type="button" @click="removeThumbnail" class="flex h-7 w-7 items-center justify-center text-red-500 hover:bg-red-50"><i class="fas fa-trash text-[10px]"></i></button>
            </div>
            <label class="flex cursor-pointer flex-col items-center justify-center px-4 py-4 text-center hover:bg-white">
              <div class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary"><i class="fas fa-image text-xs"></i></div>
              <p class="mt-1.5 text-[10px] font-semibold text-slate-600">Upload thumbnail</p>
              <p class="mt-0.5 text-[9px] text-slate-400">PNG, JPG, JPEG or WEBP</p>
              <input ref="thumbnailInput" type="file" accept="image/*" class="hidden" @change="handleThumbnail">
            </label>
          </div>
        </div>

        <div class="mt-4">
          <label class="field-label">Files</label>
          <div class="border border-dashed border-slate-300 bg-slate-50 p-3">
            <div v-if="filePreviews.length" class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              <div v-for="file in filePreviews" :key="file.key" class="relative overflow-hidden border border-primary/30 bg-white">
                <div class="aspect-video bg-slate-900">
                  <img v-if="!file.isVideo" :src="file.url" :alt="file.name" class="h-full w-full object-contain">
                  <video v-else :src="file.url" muted class="h-full w-full object-contain"></video>
                </div>
                <button type="button" @click="removeFile(file.key)" class="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-red-500 text-white"><i class="fas fa-times text-[9px]"></i></button>
                <p class="truncate px-2 py-1.5 text-[9px] text-slate-500">{{ file.name }}</p>
              </div>
            </div>
            <label class="flex cursor-pointer flex-col items-center justify-center px-4 py-5 text-center hover:bg-white">
              <div class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary"><i class="fas fa-photo-video text-xs"></i></div>
              <p class="mt-1.5 text-[10px] font-semibold text-slate-600">Add images or videos</p>
              <p class="mt-0.5 text-[9px] text-slate-400">Media files only</p>
              <input ref="filesInput" type="file" multiple accept="image/*,video/*" class="hidden" @change="handleFiles">
            </label>
          </div>
        </div>

        <div class="mt-4">
          <div class="mb-1.5 flex items-center justify-between"><label class="field-label mb-0">Payment Details <span class="text-slate-400">(optional)</span></label><button type="button" @click="addDetail" class="inline-flex h-7 w-7 items-center justify-center bg-primary text-white" title="Add detail"><i class="fas fa-plus text-[9px]"></i></button></div>
          <div v-for="(row,index) in detailsRows" :key="index" class="mb-2 flex gap-2">
            <input v-model="row.key" type="text" placeholder="Detail name" class="field-input flex-1">
            <input v-model="row.value" type="text" placeholder="Detail value" class="field-input flex-[2]">
            <button type="button" @click="removeDetail(index)" :disabled="detailsRows.length === 1" class="h-9 w-9 flex-shrink-0 border border-slate-200 text-red-500 disabled:opacity-30"><i class="fas fa-minus text-[9px]"></i></button>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
          <button type="button" @click="close" :disabled="saving" class="h-8 border border-slate-200 px-3 text-[10px] font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-40">Cancel</button>
          <button type="submit" :disabled="saving" class="inline-flex h-8 items-center gap-2 bg-primary px-3.5 text-[10px] font-semibold text-white shadow-sm hover:opacity-90 disabled:opacity-50">
            <i v-if="saving" class="fas fa-spinner fa-spin text-[9px]"></i><i v-else class="fas fa-save text-[9px]"></i>
            {{ saving ? "Saving..." : "Create Access" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddAccess",
  data() {
    return {
      form: { name: "", slug: "", description: "", type: "", price: "", currency: "USD", platform_link: "" },
      thumbnailFile: null,
      thumbnailPreview: null,
      selectedFiles: [],
      filePreviews: [],
      detailsRows: [{ key: "", value: "" }],
      saving: false,
      errors: {},
    };
  },
  methods: {
    generateSlug() {
      if (!this.form.name || this.form.slug) return;
      this.form.slug = this.form.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    },
    validate() {
      this.errors = {};
      if (!this.form.name.trim()) this.errors.name = "Request name is required.";
      return Object.keys(this.errors).length === 0;
    },
    addDetail() { this.detailsRows.push({ key: "", value: "" }); },
    removeDetail(index) { if (this.detailsRows.length > 1) this.detailsRows.splice(index, 1); },
    revokePreview(url) {
      if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
    },
    handleThumbnail(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) { this.showToast("Please select a valid thumbnail image.", "error"); return; }
      this.revokePreview(this.thumbnailPreview);
      this.thumbnailFile = file;
      this.thumbnailPreview = URL.createObjectURL(file);
    },
    removeThumbnail() {
      this.revokePreview(this.thumbnailPreview);
      this.thumbnailFile = null;
      this.thumbnailPreview = null;
      if (this.$refs.thumbnailInput) this.$refs.thumbnailInput.value = "";
    },
    handleFiles(event) {
      const files = Array.from(event.target.files || []);
      const validFiles = files.filter(file => file.type.startsWith("image/") || file.type.startsWith("video/"));
      if (validFiles.length !== files.length) this.showToast("Only image and video files are allowed.", "error");
      validFiles.forEach(file => {
        const key = `${Date.now()}-${Math.random()}`;
        this.selectedFiles.push(file);
        this.filePreviews.push({ key, name: file.name, url: URL.createObjectURL(file), isVideo: file.type.startsWith("video/") });
      });
      if (this.$refs.filesInput) this.$refs.filesInput.value = "";
    },
    removeFile(key) {
      const index = this.filePreviews.findIndex(file => file.key === key);
      if (index < 0) return;
      this.revokePreview(this.filePreviews[index].url);
      this.selectedFiles.splice(index, 1);
      this.filePreviews.splice(index, 1);
    },
    async save() {
      if (!this.validate()) return;
      this.generateSlug();
      this.saving = true;
      try {
        const formData = new FormData();
        formData.append("name", this.form.name.trim());
        formData.append("slug", this.form.slug.trim());
        formData.append("description", this.form.description.trim());
        formData.append("type", this.form.type.trim());
        formData.append("price", this.form.price || "0");
        formData.append("currency", this.form.currency || "USD");
        formData.append("platform_link", this.form.platform_link.trim());
        if (this.thumbnailFile) formData.append("thumbnail", this.thumbnailFile);
        this.selectedFiles.forEach(file => formData.append("files", file));
        const details = {};
        this.detailsRows.forEach(row => { if (row.key.trim()) details[row.key.trim()] = row.value; });
        if (Object.keys(details).length) formData.append("details", JSON.stringify(details));

        const response = await this.$apiPost("/Access", formData);
        if (response) {
          this.showToast("Payment request created successfully", "success");
          this.$emit("saved");
        }
      } catch (e) {
        console.error("Error creating Access:", e);
        this.showToast(e?.response?.data?.message || "Failed to create payment request", "error");
      } finally {
        this.saving = false;
      }
    },
    close() {
      if (!this.saving) this.$emit("close");
    },
    showToast(message, type) {
      if (this.$root.$refs.toast) this.$root.$refs.toast.showToast(message, type);
    },
  },
  beforeDestroy() {
    this.revokePreview(this.thumbnailPreview);
    this.filePreviews.forEach(file => this.revokePreview(file.url));
  },
};
</script>

<style scoped>
.field-label { @apply mb-1.5 block text-[11px] font-semibold text-slate-600; }
.field-input { @apply h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10; }
.field-textarea { @apply w-full resize-none border border-slate-200 bg-white px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10; }
.error-text { @apply mt-1 text-[10px] text-red-500; }
</style>