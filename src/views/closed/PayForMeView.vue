<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Pay For Me</h1>
        <p class="text-slate-500 text-sm">Submit requests for global digital services paid by Redmit</p>
      </div>
      <button @click="showForm = !showForm"
        class="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold rounded-xl transition shadow-sm">
        <i class="fas fa-plus text-xs"></i> New Request
      </button>
    </div>

    <!-- New request form -->
    <div v-if="showForm" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <h3 class="font-black text-slate-800 text-sm">Submit a New Request</h3>
      <p v-if="errorMessage" class="border border-red-200 bg-red-50 p-3 text-sm text-red-700">{{ errorMessage }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="field-label">Service Type *</label>
          <select v-model="form.type" class="field-input mt-1">
            <option value="">Select service type</option>
            <option v-for="t in serviceTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        <div>
          <label class="field-label">Service Name / Platform *</label>
          <input v-model="form.service" type="text" placeholder="e.g. ChatGPT Plus, Udemy course" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Service URL / Link *</label>
          <input v-model="form.url" type="url" placeholder="https://..." class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Estimated Cost</label>
          <input v-model="form.amount" type="text" placeholder="e.g. $20 / 1,800 ETB" class="field-input mt-1" />
        </div>
      </div>
      <div>
        <label class="field-label">Additional Notes</label>
        <textarea v-model="form.notes" rows="3" placeholder="Any extra details..." class="field-input mt-1 resize-none"></textarea>
      </div>
      <div class="flex gap-3 pt-2">
        <button @click="submitRequest" :disabled="submitting"
          class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition disabled:opacity-60">
          {{ submitting ? 'Sending…' : 'Submit Request' }}
        </button>
        <button @click="showForm = false"
          class="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
          Cancel
        </button>
      </div>
    </div>

    <p v-if="successMessage" class="border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">{{ successMessage }}</p>

    <!-- Requests table -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="text-sm font-black text-slate-800">My Requests</h3>
        <span class="text-[10px] font-bold text-slate-400">{{ requests.length }} total</span>
      </div>
      <div v-if="!requests.length" class="px-5 py-8 text-sm text-slate-500">Requests submitted through this form are sent to the Redmit team for review. Your request history will appear here when request tracking is connected.</div>
      <div v-else class="divide-y divide-slate-50">
        <div v-for="r in requests" :key="r.id"
          class="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="r.iconBg">
            <i :class="[r.icon, r.iconColor, 'text-lg']"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800">{{ r.service }}</p>
            <p class="text-xs text-slate-500">{{ r.type }} · {{ r.date }}</p>
            <p v-if="r.note" class="text-xs text-slate-400 mt-0.5 italic">{{ r.note }}</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-sm font-black text-slate-900">{{ r.amount }}</p>
            <span class="text-[10px] font-black px-2.5 py-1 rounded-full" :class="r.statusCls">{{ r.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PayForMeView',
  data() {
    return {
      showForm: false,
      submitting: false,
      successMessage: '',
      errorMessage: '',
      form: { type: '', service: '', url: '', amount: '', notes: '' },
      serviceTypes: ['AI Subscription', 'Online Course', 'Domain & Hosting', 'Software Subscription', 'Exam Registration', 'Scholarship Fee', 'Other'],
      requests: [],
    };
  },
  mounted() {
    const service = this.$route.query.service;
    if (this.$route.query.new === '1' || typeof service === 'string') {
      this.showForm = true;
      if (typeof service === 'string' && service) {
        this.form.service = service;
        this.form.type = 'Other';
        this.form.notes = 'Requested from the public Pay For Me service explorer. Please confirm availability and final cost.';
      }
    }
  },
  methods: {
    async submitRequest() {
      this.errorMessage = '';
      this.successMessage = '';
      if (!this.form.type || !this.form.service || !this.form.url) {
        this.errorMessage = 'Please provide the service type, service name and service URL.';
        return;
      }
      this.submitting = true;
      try {
        const name = localStorage.getItem('name') || localStorage.getItem('username') || 'Redmit customer';
        const email = localStorage.getItem('email') || '';
        const phone = localStorage.getItem('phone') || '';
        const message = [
          'Pay For Me request',
          '',
          'Service type: ' + this.form.type,
          'Service name: ' + this.form.service,
          'Service URL: ' + this.form.url,
          'Estimated cost: ' + (this.form.amount || 'Not provided'),
          'Additional notes: ' + (this.form.notes || 'None'),
          '',
          'Please review this request and confirm availability, final cost and payment steps.'
        ].join('\n');
        await this.$apiPost('/contactMessage', {
          fullName: name,
          email,
          phone: Number(String(phone).replace(/[^0-9]/g, '')) || 0,
          subject: 'Pay For Me request: ' + this.form.service,
          message,
        });
        this.successMessage = 'Your request has been sent to the Redmit team. We will review the details and follow up.';
        this.form = { type: '', service: '', url: '', amount: '', notes: '' };
        this.showForm = false;
      } catch (error) {
        this.errorMessage = error?.response?.data?.message || 'Could not send your request. Please try again.';
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>

<style scoped>
.field-label { @apply block text-xs font-bold text-slate-600 uppercase tracking-wider; }
.field-input {
  @apply w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900
         placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all;
}
</style>
