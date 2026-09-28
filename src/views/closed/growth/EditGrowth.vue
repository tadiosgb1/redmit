<template>
  <div class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4"><div class="w-full max-h-[94vh] overflow-hidden border border-slate-200 bg-white shadow-2xl sm:max-w-3xl">
    <div class="flex items-center justify-between border-b border-slate-200 px-5 py-3.5"><div><h2 class="text-sm font-bold text-slate-800">Edit Channel Growth</h2><p class="text-[10px] text-slate-400">Update growth request</p></div><button type="button" @click="close" class="h-7 w-7 text-slate-400"><i class="fas fa-times"></i></button></div>
    <form @submit.prevent="save" class="max-h-[calc(94vh-65px)] overflow-y-auto px-5 py-4">
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div><label class="field-label">Name *</label><input v-model="form.name" class="field-input" /><p v-if="errors.name" class="error">{{errors.name}}</p></div>
        <div><label class="field-label">Slug</label><input v-model="form.slug" class="field-input font-mono" /></div>
        <div><label class="field-label">Type *</label><input v-model="form.type" class="field-input" /><p v-if="errors.type" class="error">{{errors.type}}</p></div>
        <div><label class="field-label">Price *</label><input v-model.number="form.price" type="number" min="0" step="0.01" class="field-input" /><p v-if="errors.price" class="error">{{errors.price}}</p></div>
        <div><label class="field-label">Currency</label><input v-model="form.currency" class="field-input uppercase" /></div>
      </div>
      <div class="mt-3"><label class="field-label">Description</label><textarea v-model="form.description" rows="4" class="field-textarea"></textarea></div>
      <div class="mt-3"><label class="field-label">Details <span class="text-slate-400">(JSON string)</span></label><textarea v-model="form.details" rows="5" class="field-textarea font-mono"></textarea><p v-if="errors.details" class="error">{{errors.details}}</p></div>
      <div class="mt-3"><label class="field-label">Replace Thumbnail</label><input type="file" accept="image/*" @change="handleThumbnail" class="file-input" /></div>
      <div class="mt-3"><label class="field-label">Add Files</label><input type="file" multiple @change="handleFiles" class="file-input" /><div v-if="selectedFiles.length" class="mt-2 space-y-1"><div v-for="(f,i) in selectedFiles" :key="i" class="flex justify-between bg-slate-50 px-3 py-2 text-xs"><span>{{f.name}}</span><button type="button" @click="removeFile(i)" class="text-red-500">×</button></div></div></div>
      <div class="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-3"><button type="button" @click="close" class="btn-secondary">Cancel</button><button class="btn-primary" :disabled="saving">{{saving?"Saving...":"Save Changes"}}</button></div>
    </form>
  </div></div>
</template>
<script>
export default {
  name:"EditGrowth", props:{data:{type:Object,default:null}},
  data(){return{saving:false,form:{name:"",slug:"",description:"",type:"",price:"",currency:"USD",details:""},errors:{},thumbnailFile:null,selectedFiles:[]};},
  mounted(){this.initialize();},
  methods:{
    initialize(){if(!this.data)return;this.form={name:this.data.name||"",slug:this.data.slug||"",description:this.data.description||"",type:this.data.type||"",price:this.data.price??"",currency:this.data.currency||"USD",details:typeof this.data.details==="string"?this.data.details:JSON.stringify(this.data.details||{},null,2)};},
    validate(){this.errors={};if(!this.form.name.trim())this.errors.name="Name is required.";if(!this.form.type.trim())this.errors.type="Type is required.";if(this.form.price===""||this.form.price===null||Number(this.form.price)<0)this.errors.price="Price is required.";if(this.form.details.trim()){try{JSON.parse(this.form.details)}catch{this.errors.details="Details must be valid JSON."}}return !Object.keys(this.errors).length;},
    handleThumbnail(e){this.thumbnailFile=e.target.files?.[0]||null},handleFiles(e){this.selectedFiles.push(...Array.from(e.target.files||[]));e.target.value=""},removeFile(i){this.selectedFiles.splice(i,1)},
    async save(){if(!this.data?.id||!this.validate())return;this.saving=true;try{const fd=new FormData();["name","slug","description","type","currency"].forEach(k=>fd.append(k,this.form[k]));fd.append("price",String(this.form.price));if(this.form.details.trim())fd.append("details",this.form.details.trim());if(this.thumbnailFile)fd.append("thumbnail",this.thumbnailFile);this.selectedFiles.forEach(f=>fd.append("files",f));const response=await this.$apiPatch(`/growth/${this.data.id}`,"",fd);if(response){this.showToast("Channel Growth updated successfully.","success");this.$emit("saved");}}catch(e){console.error(e);this.showToast(e?.response?.data?.message||"Failed to update Channel Growth.","error")}finally{this.saving=false}},
    close(){this.$emit("close")},showToast(m,t){if(this.$root?.$refs?.toast)this.$root.$refs.toast.showToast(m,t)}
  }
};
</script>
<style scoped>
.field-label{@apply mb-1.5 block text-[11px] font-semibold text-slate-600}.field-input{@apply h-9 w-full border border-slate-200 bg-white px-3 text-xs outline-none focus:border-primary}.field-textarea{@apply w-full resize-none border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-primary}.file-input{@apply w-full border border-dashed border-slate-300 bg-slate-50 p-2 text-xs}.error{@apply mt-1 text-[10px] text-red-500}.btn-primary{@apply h-9 bg-primary px-4 text-xs font-semibold text-white disabled:opacity-50}.btn-secondary{@apply h-9 border border-slate-200 px-4 text-xs font-semibold text-slate-600}
</style>