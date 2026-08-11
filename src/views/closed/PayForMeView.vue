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
        <button @click="submitRequest"
          class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
          Submit Request
        </button>
        <button @click="showForm = false"
          class="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
          Cancel
        </button>
      </div>
    </div>

    <!-- Requests table -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="text-sm font-black text-slate-800">My Requests</h3>
        <span class="text-[10px] font-bold text-slate-400">{{ requests.length }} total</span>
      </div>
      <div class="divide-y divide-slate-50">
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
      form: { type: '', service: '', url: '', amount: '', notes: '' },
      serviceTypes: ['AI Subscription', 'Online Course', 'Domain & Hosting', 'Software Subscription', 'Exam Registration', 'Scholarship Fee', 'Other'],
      requests: [
        { id:1, service:'ChatGPT Plus — 1 month',      type:'AI Subscription',    date:'Today',      amount:'1,800 ETB', status:'Fulfilled', statusCls:'bg-green-100 text-green-700',   icon:'fas fa-robot',         iconBg:'bg-purple-50', iconColor:'text-purple-600', note:'' },
        { id:2, service:'Udemy — Digital Marketing',   type:'Online Course',      date:'Aug 3',      amount:'1,200 ETB', status:'Processing',statusCls:'bg-blue-100 text-blue-700',    icon:'fas fa-graduation-cap',iconBg:'bg-blue-50',   iconColor:'text-blue-600',   note:'Course link sent' },
        { id:3, service:'IELTS Registration — Oct 24', type:'Exam Registration',  date:'Jul 28',     amount:'8,500 ETB', status:'Pending',   statusCls:'bg-amber-100 text-amber-700',  icon:'fas fa-file-alt',      iconBg:'bg-amber-50',  iconColor:'text-amber-600',  note:'Awaiting payment confirmation' },
        { id:4, service:'Hostinger — 1 Year Hosting',  type:'Domain & Hosting',   date:'Jul 20',     amount:'2,400 ETB', status:'Fulfilled', statusCls:'bg-green-100 text-green-700',   icon:'fas fa-server',        iconBg:'bg-emerald-50',iconColor:'text-emerald-600',note:'' },
        { id:5, service:'Adobe Creative Cloud',        type:'Software Subscription',date:'Jul 10',   amount:'3,200 ETB', status:'Cancelled', statusCls:'bg-red-100 text-red-600',      icon:'fas fa-tools',         iconBg:'bg-orange-50', iconColor:'text-orange-600', note:'Payment failed — please retry' },
      ],
    };
  },
  methods: {
    submitRequest() {
      if (!this.form.type || !this.form.service) return;
      this.showForm = false;
      this.form = { type: '', service: '', url: '', amount: '', notes: '' };
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
