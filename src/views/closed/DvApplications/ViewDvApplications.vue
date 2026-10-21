<template>
  <div class="min-h-screen bg-slate-50 p-4 text-slate-700 sm:p-5">
    <div class="mx-auto max-w-[1500px]">
      <div class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div><p class="text-[10px] font-bold uppercase tracking-widest text-rose-600"><i class="fas fa-fire mr-1"></i> Hot service</p><h1 class="mt-1 text-lg font-black text-slate-900">American DV Applications</h1><p class="mt-1 text-xs text-slate-500">Manage Diversity Visa assistance listings and the service information customers see on the landing page.</p></div>
        <button @click="showForm = !showForm" class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-4 text-xs font-bold text-white hover:opacity-90"><i class="fas fa-plus text-[10px]"></i>{{ showForm ? 'Close form' : 'Add DV service' }}</button>
      </div>
      <div class="mb-4 border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900"><strong>Important:</strong> Redmit offers application-preparation assistance, not the official U.S. government entry form. Do not promise selection or a visa. Collect sensitive personal details only through an appropriate secure workflow.</div>
      <form v-if="showForm" @submit.prevent="submitService" class="mb-5 border border-slate-200 bg-white p-4">
        <h2 class="mb-3 text-sm font-bold text-slate-900">{{ editingId ? 'Edit DV service' : 'Create DV service listing' }}</h2>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div><label class="mb-1 block text-[10px] font-bold text-slate-500">Provider ID (UUID) *</label><input v-model.trim="form.providerId" required class="h-9 w-full border border-slate-200 px-3 text-xs outline-none focus:border-primary" placeholder="Provider UUID"></div>
          <div><label class="mb-1 block text-[10px] font-bold text-slate-500">Service name *</label><input v-model.trim="form.name" required class="h-9 w-full border border-slate-200 px-3 text-xs outline-none focus:border-primary" placeholder="American DV Application Assistance"></div>
          <div><label class="mb-1 block text-[10px] font-bold text-slate-500">DV year *</label><input v-model.number="form.dvYear" required type="number" min="2020" step="1" class="h-9 w-full border border-slate-200 px-3 text-xs outline-none focus:border-primary"></div>
          <div><label class="mb-1 block text-[10px] font-bold text-slate-500">Total service price *</label><input v-model.number="form.price" required type="number" min="0" step="0.01" class="h-9 w-full border border-slate-200 px-3 text-xs outline-none focus:border-primary"></div>
          <div><label class="mb-1 block text-[10px] font-bold text-slate-500">Internal service fee *</label><input v-model.number="form.serviceFee" required type="number" min="0" step="0.01" class="h-9 w-full border border-slate-200 px-3 text-xs outline-none focus:border-primary"></div>
          <div><label class="mb-1 block text-[10px] font-bold text-slate-500">Currency</label><select v-model="form.currency" class="h-9 w-full border border-slate-200 bg-white px-3 text-xs outline-none focus:border-primary"><option value="USD">USD</option><option value="ETB">ETB</option><option value="EUR">EUR</option><option value="GBP">GBP</option></select></div>
          <div class="sm:col-span-2 lg:col-span-3"><label class="mb-1 block text-[10px] font-bold text-slate-500">Description</label><textarea v-model.trim="form.description" rows="2" class="w-full border border-slate-200 px-3 py-2 text-xs outline-none focus:border-primary" placeholder="Explain what help is included and what customers should prepare."></textarea></div>
          <div class="sm:col-span-2 lg:col-span-3"><label class="mb-1 block text-[10px] font-bold text-slate-500">Details (JSON object)</label><textarea v-model="detailsJson" rows="3" class="w-full border border-slate-200 px-3 py-2 font-mono text-xs outline-none focus:border-primary" placeholder='{"includes":["form review","photo guidance"]}'></textarea><p class="mt-1 text-[10px] text-slate-400">Extra service information; avoid storing sensitive applicant data here.</p></div>
          <div class="sm:col-span-2 lg:col-span-3"><label class="mb-1 block text-[10px] font-bold text-slate-500">Cover image (optional)</label><input type="file" accept="image/*" @change="onThumbnailChange" class="block w-full text-xs text-slate-500 file:mr-3 file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold"></div>
        </div>
        <p v-if="formError" class="mt-3 text-xs font-semibold text-red-600">{{ formError }}</p>
        <div class="mt-4 flex flex-wrap gap-2"><button type="submit" :disabled="saving" class="h-9 bg-primary px-4 text-xs font-bold text-white disabled:opacity-50">{{ saving ? 'Saving…' : (editingId ? 'Save changes' : 'Create listing') }}</button><button type="button" @click="resetForm" class="h-9 border border-slate-200 px-4 text-xs font-semibold text-slate-600">Cancel</button></div>
      </form>
      <div class="overflow-hidden border border-slate-200 bg-white">
        <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3"><div><h2 class="text-sm font-bold text-slate-900">DV service listings</h2><p class="mt-0.5 text-[10px] text-slate-400">{{ items.length }} listing(s) · endpoint: /dv-applications</p></div><button @click="fetchItems" class="h-8 border border-slate-200 px-3 text-[10px] font-bold text-slate-600 hover:bg-slate-50"><i class="fas fa-sync-alt mr-1"></i>Refresh</button></div>
        <div v-if="loading" class="p-10 text-center text-xs text-slate-400">Loading DV listings…</div>
        <div v-else-if="!items.length" class="p-10 text-center"><i class="fas fa-passport text-2xl text-amber-500"></i><p class="mt-2 text-sm font-bold text-slate-700">No DV listings yet</p><p class="mt-1 text-xs text-slate-400">Create a service listing to promote it on the landing page.</p></div>
        <div v-else class="overflow-x-auto"><table class="min-w-full"><thead class="bg-slate-50 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400"><tr><th class="px-4 py-3">Service</th><th class="px-4 py-3">DV year</th><th class="px-4 py-3">Price</th><th class="px-4 py-3">Service fee</th><th class="px-4 py-3">Provider</th><th class="px-4 py-3">Actions</th></tr></thead><tbody class="divide-y divide-slate-100"><tr v-for="item in items" :key="item.id || item.name" class="hover:bg-slate-50"><td class="px-4 py-3"><div class="flex items-center gap-3"><img v-if="thumbnailUrl(item)" :src="thumbnailUrl(item)" alt="" class="h-10 w-10 object-cover"><div v-else class="flex h-10 w-10 items-center justify-center bg-amber-50 text-amber-700"><i class="fas fa-passport"></i></div><div><p class="text-xs font-bold text-slate-800">{{ item.name }}</p><p class="mt-0.5 max-w-sm text-[10px] text-slate-400">{{ item.description || 'No description' }}</p></div></div></td><td class="px-4 py-3 text-xs">{{ item.dvYear || '—' }}</td><td class="px-4 py-3 text-xs font-bold">{{ formatPrice(item.price, item.currency) }}</td><td class="px-4 py-3 text-xs">{{ formatPrice(item.serviceFee, item.currency) }}</td><td class="px-4 py-3 text-[10px] text-slate-500">{{ item.providerId || item.provider?.id || '—' }}</td><td class="px-4 py-3"><div class="flex gap-1.5"><button @click="addToCart(item)" class="h-7 border border-emerald-200 px-2 text-[10px] font-semibold text-emerald-700"><i class="fas fa-cart-plus mr-1"></i>Order</button><button @click="editItem(item)" class="h-7 border border-slate-200 px-2 text-[10px] font-semibold text-primary"><i class="fas fa-edit mr-1"></i>Edit</button></div></td></tr></tbody></table></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewDvApplications',
  data() {
    const user = (() => { try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch (_error) { return {}; } })();
    return {
      items: [], loading: false, saving: false, showForm: false, editingId: null, thumbnail: null, formError: '',
      detailsJson: '{}',
      form: { providerId: localStorage.getItem('providerId') || localStorage.getItem('userId') || user.id || '', name: 'American DV Application Assistance', description: '', price: 0, serviceFee: 0, currency: 'USD', dvYear: new Date().getFullYear() + 1 },
    };
  },
  mounted() { this.fetchItems(); if (this.$route.query.new === '1') this.showForm = true; },
  methods: {
    async fetchItems() {
      this.loading = true;
      try {
        const response = await this.$apiGet('/dv-applications');
        this.items = Array.isArray(response?.data) ? response.data : Array.isArray(response?.dvApplications) ? response.dvApplications : Array.isArray(response?.data?.dvApplications) ? response.data.dvApplications : [];
      } catch (error) { console.error('Failed to load DV applications:', error); this.items = []; }
      finally { this.loading = false; }
    },
    onThumbnailChange(event) { this.thumbnail = event.target.files?.[0] || null; },
    addToCart(item) {
      const cart = useDigitalCart();
      if (!cart.add(item, 'DIGITAL_DV_APPLICATION')) { this.formError = 'This listing cannot be ordered because it has no ID.'; return; }
      window.alert('DV assistance added to your digital cart.');
    },
    addToCartById(id) {
      const item = this.items.find(entry => String(entry.id) === String(id));
      if (item) this.addToCart(item);
    },
    async submitService() {
      this.formError = '';
      let details;
      try { details = JSON.parse(this.detailsJson || '{}'); }
      catch (_error) { this.formError = 'Details must be valid JSON.'; return; }
      if (!details || typeof details !== 'object' || Array.isArray(details)) { this.formError = 'Details must be a JSON object.'; return; }
      if (Number(this.form.price) < 0 || Number(this.form.serviceFee) < 0) { this.formError = 'Price and service fee must be non-negative.'; return; }
      this.saving = true;
      try {
        const payload = new FormData();
        Object.entries({ ...this.form, details: JSON.stringify(details) }).forEach(([key, value]) => payload.append(key, String(value ?? '')));
        if (this.thumbnail) payload.append('thumbnail', this.thumbnail);
        if (this.editingId) await this.$apiPut('/dv-applications', this.editingId, payload, { 'Content-Type': 'multipart/form-data' });
        else await this.$apiPost('/dv-applications', payload, { 'Content-Type': 'multipart/form-data' });
        await this.fetchItems();
        this.resetForm();
      } catch (error) { console.error('Failed to save DV service:', error); this.formError = error?.response?.data?.message || error?.message || 'Could not save the DV listing. Verify the endpoint and required fields.'; }
      finally { this.saving = false; }
    },
    editItem(item) {
      this.editingId = item.id;
      this.form = { providerId: item.providerId || item.provider?.id || '', name: item.name || '', description: item.description || '', price: Number(item.price || 0), serviceFee: Number(item.serviceFee || 0), currency: item.currency || 'USD', dvYear: Number(item.dvYear || new Date().getFullYear() + 1) };
      this.detailsJson = JSON.stringify(item.details || {}, null, 2);
      this.thumbnail = null; this.formError = ''; this.showForm = true;
    },
    resetForm() {
      const user = (() => { try { return JSON.parse(localStorage.getItem('user') || '{}'); } catch (_error) { return {}; } })();
      this.form = { providerId: localStorage.getItem('providerId') || localStorage.getItem('userId') || user.id || '', name: 'American DV Application Assistance', description: '', price: 0, serviceFee: 0, currency: 'USD', dvYear: new Date().getFullYear() + 1 };
      this.detailsJson = '{}'; this.thumbnail = null; this.editingId = null; this.formError = ''; this.showForm = false;
    },
    thumbnailUrl(item) {
      const value = item.thumbnailUrl || item.thumbnail || item.coverImage || '';
      return typeof value === 'string' && /^(https?:|data:image\/)/i.test(value) ? value : '';
    },
    formatPrice(price, currency = 'USD') {
      const amount = Number(price);
      if (!Number.isFinite(amount)) return 'Contact us';
      try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: currency || 'USD', maximumFractionDigits: 2 }).format(amount); }
      catch (_error) { return (currency || 'USD') + ' ' + amount.toFixed(2); }
    },
  },
};
</script>
