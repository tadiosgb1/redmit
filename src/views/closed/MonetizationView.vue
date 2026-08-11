<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Content Monetization Service</h1>
        <p class="text-slate-500 text-sm">We manage your social media from abroad to maximize monetization potential</p>
      </div>
      <button @click="showForm = !showForm"
        class="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary-dark text-white text-xs font-bold rounded-xl transition shadow-sm">
        <i class="fas fa-plus text-xs"></i> Add Account
      </button>
    </div>

    <!-- How it works -->
    <div class="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100 rounded-2xl p-6">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
          <i class="fab fa-youtube text-white text-2xl"></i>
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-black text-slate-900 mb-2">How Our Monetization Service Works</h3>
          <p class="text-xs text-slate-700 leading-relaxed mb-3">
            Upload your videos and content in Ethiopia/Africa often limits monetization opportunities on platforms like YouTube, TikTok, and Facebook. 
            Our team members based in the USA and other eligible countries can manage your account and upload content on your behalf, 
            enabling you to access monetization features like YouTube Partner Program, TikTok Creator Fund, and Facebook In-Stream Ads.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="flex items-start gap-2">
              <div class="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <i class="fas fa-shield-alt text-green-600 text-xs"></i>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800">Secure Access</p>
                <p class="text-[10px] text-slate-500">Your credentials are encrypted and protected</p>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <div class="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                <i class="fas fa-globe-americas text-blue-600 text-xs"></i>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800">USA-Based Team</p>
                <p class="text-[10px] text-slate-500">Uploads from monetization-eligible regions</p>
              </div>
            </div>
            <div class="flex items-start gap-2">
              <div class="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                <i class="fas fa-dollar-sign text-purple-600 text-xs"></i>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-800">Full Monetization</p>
                <p class="text-[10px] text-slate-500">Access all revenue features</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add account form -->
    <div v-if="showForm" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <h3 class="font-black text-slate-800 text-sm">Add Social Media Account for Management</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="field-label">Platform *</label>
          <select v-model="form.platform" class="field-input mt-1">
            <option value="">Select platform</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Facebook">Facebook</option>
            <option value="Instagram">Instagram</option>
          </select>
        </div>
        <div>
          <label class="field-label">Account Username / Channel Name *</label>
          <input v-model="form.username" type="text" placeholder="e.g. @yourchannel" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Account Email *</label>
          <input v-model="form.email" type="email" placeholder="account@email.com" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Account Password *</label>
          <input v-model="form.password" type="password" placeholder="••••••••" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Subscribers / Followers</label>
          <input v-model="form.followers" type="text" placeholder="e.g. 25,000" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Content Niche</label>
          <input v-model="form.niche" type="text" placeholder="e.g. Tech Reviews, Comedy" class="field-input mt-1" />
        </div>
      </div>
      <div>
        <label class="field-label">Additional Information</label>
        <textarea v-model="form.notes" rows="3" placeholder="Upload schedule, content type, special requirements..." class="field-input mt-1 resize-none"></textarea>
      </div>
      <div class="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <i class="fas fa-info-circle text-amber-600 text-sm mt-0.5"></i>
        <div class="flex-1 text-xs text-amber-900">
          <p class="font-bold mb-1">Security & Privacy Guarantee</p>
          <p class="text-[11px]">Your credentials are encrypted using bank-level security. We only use your account to upload content you provide. 
          You maintain full ownership and can revoke access anytime. We sign a legally binding NDA for your protection.</p>
        </div>
      </div>
      <div class="flex gap-3 pt-2">
        <button @click="submitAccount"
          class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
          Submit Account
        </button>
        <button @click="showForm = false"
          class="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
          Cancel
        </button>
      </div>
    </div>

    <!-- Managed accounts -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 class="text-sm font-black text-slate-800">My Managed Accounts</h3>
        <span class="text-[10px] font-bold text-slate-400">{{ accounts.length }} active</span>
      </div>
      <div class="divide-y divide-slate-50">
        <div v-for="acc in accounts" :key="acc.id"
          class="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors">
          <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="acc.iconBg">
            <i :class="[acc.icon, acc.iconColor, 'text-2xl']"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800">{{ acc.username }}</p>
            <p class="text-xs text-slate-500">{{ acc.platform }} · {{ acc.followers }} · {{ acc.niche }}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full" :class="acc.statusCls">{{ acc.status }}</span>
              <span class="text-[10px] text-slate-400">{{ acc.uploads }} uploads this month</span>
            </div>
          </div>
          <div class="text-right shrink-0">
            <p class="text-sm font-black text-green-600">{{ acc.earnings }}</p>
            <p class="text-[10px] text-slate-400">Estimated earnings</p>
          </div>
          <div class="flex gap-1">
            <button class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-600 text-slate-500 flex items-center justify-center transition text-xs">
              <i class="fas fa-chart-line"></i>
            </button>
            <button class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-600 text-slate-500 flex items-center justify-center transition text-xs">
              <i class="fas fa-pause"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="s in stats" :key="s.label"
        class="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-2">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="s.iconBg">
          <i :class="[s.icon, s.iconColor, 'text-sm']"></i>
        </div>
        <div>
          <p class="text-xl font-black text-slate-900 leading-none">{{ s.value }}</p>
          <p class="text-xs text-slate-500 mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonetizationView',
  data() {
    return {
      showForm: false,
      form: { platform: '', username: '', email: '', password: '', followers: '', niche: '', notes: '' },
      accounts: [
        { id: 1, platform: 'YouTube',   username: '@TechReviewsET',     followers: '32K subs',  niche: 'Technology',    uploads: '12', earnings: '$240', icon: 'fab fa-youtube',   iconBg: 'bg-red-50',    iconColor: 'text-red-600',    status: 'Active',     statusCls: 'bg-green-100 text-green-700' },
        { id: 2, platform: 'TikTok',    username: '@ComedySkitsET',     followers: '128K',      niche: 'Comedy',        uploads: '24', earnings: '$180', icon: 'fab fa-tiktok',    iconBg: 'bg-slate-100', iconColor: 'text-slate-800',  status: 'Active',     statusCls: 'bg-green-100 text-green-700' },
        { id: 3, platform: 'Facebook',  username: 'Ethiopia Travel Vlogs', followers: '210K',   niche: 'Travel',        uploads: '8',  earnings: '$95',  icon: 'fab fa-facebook',  iconBg: 'bg-blue-50',   iconColor: 'text-blue-600',   status: 'Active',     statusCls: 'bg-green-100 text-green-700' },
        { id: 4, platform: 'YouTube',   username: '@CookingWithAlem',   followers: '18K subs',  niche: 'Food & Cooking',uploads: '6',  earnings: '$72',  icon: 'fab fa-youtube',   iconBg: 'bg-red-50',    iconColor: 'text-red-600',    status: 'Pending',    statusCls: 'bg-amber-100 text-amber-700' },
      ],
      stats: [
        { label: 'Total Accounts',    value: '4',      icon: 'fas fa-users',         iconBg: 'bg-blue-50',    iconColor: 'text-blue-600' },
        { label: 'Total Uploads',     value: '50',     icon: 'fas fa-upload',        iconBg: 'bg-indigo-50',  iconColor: 'text-indigo-600' },
        { label: 'This Month Earnings', value: '$587', icon: 'fas fa-dollar-sign',   iconBg: 'bg-green-50',   iconColor: 'text-green-600' },
        { label: 'Total Reach',       value: '388K',   icon: 'fas fa-eye',           iconBg: 'bg-purple-50',  iconColor: 'text-purple-600' },
      ],
    };
  },
  methods: {
    submitAccount() {
      if (!this.form.platform || !this.form.username || !this.form.email || !this.form.password) {
        alert('Please fill in all required fields');
        return;
      }
      alert('Account submitted for review. Our team will contact you within 24 hours.');
      this.showForm = false;
      this.form = { platform: '', username: '', email: '', password: '', followers: '', niche: '', notes: '' };
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
