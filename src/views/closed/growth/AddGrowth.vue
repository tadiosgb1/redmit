<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4">
    <div class="w-full max-h-[94vh] overflow-hidden border border-slate-200 bg-white shadow-2xl sm:max-w-3xl">
      <div class="flex items-center justify-between border-b border-slate-200 px-5 py-3.5">
        <div><h2 class="text-sm font-bold text-slate-800">Add Channel Growth</h2><p class="mt-0.5 text-[10px] text-slate-400">Create a new channel growth request</p></div>
        <button type="button" @click="close" :disabled="saving" class="flex h-7 w-7 items-center justify-center text-slate-400 hover:bg-slate-100"><i class="fas fa-times text-xs"></i></button>
      </div>
      <form @submit.prevent="save" class="max-h-[calc(94vh-65px)] overflow-y-auto px-5 py-4">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div><label class="field-label">Name <span class="text-red-500">*</span></label><input v-model="form.name" class="field-input" placeholder="Campaign or growth request name" /><p v-if="errors.name" class="error">{{ errors.name }}</p></div>
          <div><label class="field-label">Slug <span class="text-slate-400">(optional)</span></label><input v-model="form.slug" class="field-input font-mono" placeholder="Auto-generated if omitted" /></div>
          <div><label class="field-label">Type <span class="text-red-500">*</span></label><input v-model="form.type" class="field-input" placeholder="e.g. advertising, campaign" /><p v-if="errors.type" class="error">{{ errors.type }}</p></div>
          <div><label class="field-label">Price <span class="text-red-500">*</span></label><input v-model.number="form.price" type="number" min="0" step="0.01" class="field-input" placeholder="0.00" /><p v-if="errors.price" class="error">{{ errors.price }}</p></div>
          <div><label class="field-label">Currency</label><input v-model="form.currency" class="field-input uppercase" maxlength="10" placeholder="USD" /></div>
        </div>
        <div class="mt-3"><label class="field-label">Description</label><textarea v-model="form.description" rows="4" class="field-textarea" placeholder="Describe the growth service or campaign"></textarea></div>
        <div class="mt-3"><label class="field-label">Details <span class="text-slate-400">(JSON string, optional)</span></label><textarea v-model="form.details" rows="5" class="field-textarea font-mono" placeholder='{"platform":"YouTube","goal":"Increase subscribers"}'></textarea></div>
        <div class="mt-3"><label class="field-label">Thumbnail <span class="text-slate-400">(optional)</span></label><input type="file" accept="image/*" @change="handleThumbnail" class="file-input" /></div>
        <div class="mt-3"><label class="field-label">Files <span class="text-slate-400">(optional, multiple)</span></label><input type="file" multiple @change="handleFiles" class="file-input" /><div v-if="selectedFiles.length" class="mt-2 space-y-1"><div v-for="(file,i) in selectedFiles" :key="i" class="flex items-center justify-between bg-slate-50 px-3 py-2 text-xs"><span class="truncate">{{ file.name }}</span><button type="button" @click="removeFile(i)" class="text-red-500"><i class="fas fa-times"></i></button></div></div></div>
        <div class="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-3"><button type="button" @click="close" class="btn-secondary">Cancel</button><button type="submit" :disabled="saving" class="btn-primary">{{ saving ? "Saving..." : "Create Channel Growth" }}</button></div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddGrowth",
  data() { return { saving:false, form:{name:"",slug:"",description:"",type:"",price:"",currency:"USD",details:""}, errors:{}, thumbnailFile:null, selectedFiles:[] }; },
  methods: {
    generateSlug() { if (!this.form.slug.trim()) this.form.slug=this.form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); },
    validate() { this.errors={}; if(!this.form.name.trim()) this.errors.name="Name is required."; if(!this.form.type.trim()) this.errors.type="Type is required."; if(this.form.price===""||this.form.price===null||Number(this.form.price)<0) this.errors.price="Price is required."; if(this.form.details.trim()){try{JSON.parse(this.form.details);}catch{this.errors.details="Details must be valid JSON.";}} return !Object.keys(this.errors).length; },
    handleThumbnail(e){this.thumbnailFile=e.target.files?.[0]||null;},
    handleFiles(e){this.selectedFiles.push(...Array.from(e.target.files||[]));e.target.value="";},
    removeFile(i){this.selectedFiles.splice(i,1);},
    async save(){if(!this.validate())return;this.generateSlug();this.saving=true;try{const fd=new FormData();fd.append("name",this.form.name.trim());fd.append("slug",this.form.slug.trim());fd.append("description",this.form.description.trim());fd.append("type",this.form.type.trim());fd.append("price",String(this.form.price));fd.append("currency",this.form.currency.trim()||"USD");if(this.form.details.trim())fd.append("details",this.form.details.trim());if(this.thumbnailFile)fd.append("thumbnail",this.thumbnailFile);this.selectedFiles.forEach(f=>fd.append("files",f));const response=await this.$apiPost("/growth",fd);if(response){this.showToast("Channel Growth created successfully.","success");this.$emit("saved");}}catch(e){console.error(e);this.showToast(e?.response?.data?.message||"Failed to create Channel Growth.","error");}finally{this.saving=false;}},
    close(){if(!this.saving)this.$emit("close");}, showToast(m,t){if(this.$root?.$refs?.toast)this.$root.$refs.toast.showToast(m,t);}
  }
};
</script>
<style scoped>
.field-label{@apply mb-1.5 block text-[11px] font-semibold text-slate-600}.field-input{@apply h-9 w-full border border-slate-200 bg-white px-3 text-xs outline-none focus:border-primary}.field-textarea{@apply w-full resize-none border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-primary}.file-input{@apply w-full border border-dashed border-slate-300 bg-slate-50 p-2 text-xs}.error{@apply mt-1 text-[10px] text-red-500}.btn-primary{@apply h-9 bg-primary px-4 text-xs font-semibold text-white disabled:opacity-50}.btn-secondary{@apply h-9 border border-slate-200 px-4 text-xs font-semibold text-slate-600}
</style>