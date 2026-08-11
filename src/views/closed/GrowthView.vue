<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Digital Growth</h1>
        <p class="text-slate-500 text-sm">Advertising campaigns and monetization management</p>
      </div>
      <button @click="showForm = !showForm"
        class="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition shadow-sm">
        <i class="fas fa-plus text-xs"></i> New Campaign
      </button>
    </div>

    <!-- Tab switch -->
    <div class="flex gap-2">
      <button v-for="tab in ['Advertising', 'Monetization']" :key="tab"
        @click="activeTab = tab"
        class="px-5 py-2 text-xs font-bold rounded-xl border transition"
        :class="activeTab === tab ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary'">
        {{ tab }}
      </button>
    </div>

    <!-- New request form -->
    <div v-if="showForm" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <h3 class="font-black text-slate-800 text-sm">{{ activeTab }} Request</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="field-label">Platform *</label>
          <select v-model="form.platform" class="field-input mt-1">
            <option value="">Select platform</option>
            <option v-for="p in platforms" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <div v-if="activeTab === 'Advertising'">
          <label class="field-label">Ad Budget (ETB) *</label>
          <input v-model="form.budget" type="number" placeholder="e.g. 5000" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Objective / Goal *</label>
          <input v-model="form.objective" type="text" placeholder="e.g. Get website customers" class="field-input mt-1" />
        </div>
        <div v-if="activeTab === 'Advertising'">
          <label class="field-label">Target URL</label>
          <input v-model="form.url" type="url" placeholder="https://..." class="field-input mt-1" />
        </div>
        <div v-if="activeTab === 'Advertising'">
          <label class="field-label">Duration (days) *</label>
          <input v-model="form.duration" type="number" placeholder="e.g. 7" class="field-input mt-1" />
        </div>
      </div>
      <div>
        <label class="field-label">Notes</label>
        <textarea v-model="form.notes" rows="3" placeholder="Additional details..." class="field-input mt-1 resize-none"></textarea>
      </div>
      <div class="flex gap-3 pt-2">
        <button @click="showForm = false"
          class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
          Submit
        </button>
        <button @click="showForm = false"
          class="px-6 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition">
          Cancel
        </button>
      </div>
    </div>

    <!-- Campaigns list -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100">
        <h3 class="text-sm font-black text-slate-800">{{ activeTab }} Requests</h3>
      </div>
      <div class="divide-y divide-slate-50">
        <div v-for="c in filteredCampaigns" :key="c.id"
          class="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="c.iconBg">
            <i :class="[c.icon, c.iconColor, 'text-lg']"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800">{{ c.title }}</p>
            <p class="text-xs text-slate-500">{{ c.platform }} · {{ c.type }} · {{ c.date }}</p>
            <p v-if="c.objective" class="text-xs text-slate-400 mt-0.5">Goal: {{ c.objective }}</p>
          </div>
          <div class="text-right shrink-0">
            <p v-if="c.budget" class="text-sm font-black text-slate-900">{{ c.budget }}</p>
            <span class="text-[10px] font-black px-2.5 py-1 rounded-full" :class="c.statusCls">{{ c.status }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GrowthView',
  data() {
    return {
      activeTab: 'Advertising',
      showForm:  false,
      form: { platform: '', budget: '', objective: '', url: '', duration: '', notes: '' },
      platforms: ['Facebook', 'Instagram', 'TikTok', 'Google', 'YouTube', 'Other'],
      campaigns: [
        { id:1, type:'Advertising',   title:'Product Launch Campaign',    platform:'Facebook',  date:'Active',     budget:'6,500 ETB', objective:'Website traffic',  icon:'fab fa-facebook',  iconBg:'bg-blue-50',   iconColor:'text-blue-600',   status:'Running',   statusCls:'bg-blue-100 text-blue-700' },
        { id:2, type:'Advertising',   title:'Brand Awareness — TikTok',   platform:'TikTok',    date:'Aug 1-8',    budget:'3,000 ETB', objective:'Brand awareness',  icon:'fab fa-tiktok',    iconBg:'bg-slate-100', iconColor:'text-slate-800',  status:'Completed', statusCls:'bg-green-100 text-green-700' },
        { id:3, type:'Advertising',   title:'Google Search Ads',          platform:'Google',    date:'Pending',    budget:'5,000 ETB', objective:'Lead generation',  icon:'fab fa-google',    iconBg:'bg-red-50',    iconColor:'text-red-600',    status:'Pending',   statusCls:'bg-amber-100 text-amber-700' },
        { id:4, type:'Monetization',  title:'YouTube Channel Management', platform:'YouTube',   date:'Ongoing',    budget:null,        objective:'Monetization',     icon:'fab fa-youtube',   iconBg:'bg-red-50',    iconColor:'text-red-600',    status:'Active',    statusCls:'bg-green-100 text-green-700' },
        { id:5, type:'Monetization',  title:'Facebook Page Monetization', platform:'Facebook',  date:'Pending',    budget:null,        objective:'In-Stream Ads',    icon:'fab fa-facebook',  iconBg:'bg-blue-50',   iconColor:'text-blue-600',   status:'Review',    statusCls:'bg-amber-100 text-amber-700' },
        { id:6, type:'Monetization',  title:'TikTok Creator Fund Setup',  platform:'TikTok',    date:'Ongoing',    budget:null,        objective:'Creator Fund',     icon:'fab fa-tiktok',    iconBg:'bg-slate-100', iconColor:'text-slate-800',  status:'Active',    statusCls:'bg-green-100 text-green-700' },
      ],
    };
  },
  computed: {
    filteredCampaigns() { return this.campaigns.filter(c => c.type === this.activeTab); },
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
