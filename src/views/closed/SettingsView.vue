<template>
  <div class="p-6 space-y-5">
    <div>
      <h1 class="text-xl font-black text-slate-900">Settings</h1>
      <p class="text-slate-500 text-sm">Manage your {{ isAdmin ? 'platform' : 'account' }} settings and preferences</p>
    </div>

    <!-- Settings sections -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      
      <!-- Left sidebar menu -->
      <div class="lg:col-span-1">
        <div class="bg-white border border-slate-200 rounded-2xl p-3 space-y-1">
          <button v-for="tab in tabs" :key="tab.value"
            @click="activeTab = tab.value"
            class="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left"
            :class="activeTab === tab.value ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-50'">
            <i :class="[tab.icon, 'text-sm w-4']"></i>
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Right content area -->
      <div class="lg:col-span-2 space-y-5">

        <!-- Account Settings -->
        <div v-if="activeTab === 'account'" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <h3 class="text-sm font-black text-slate-800 mb-1">Account Information</h3>
            <p class="text-xs text-slate-500">Update your personal details</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="field-label">Full Name</label>
              <input v-model="accountForm.name" type="text" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Email Address</label>
              <input v-model="accountForm.email" type="email" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Phone Number</label>
              <input v-model="accountForm.phone" type="tel" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Location</label>
              <input v-model="accountForm.location" type="text" class="field-input mt-1" />
            </div>
          </div>
          <button class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
            Save Changes
          </button>
        </div>

        <!-- Security -->
        <div v-if="activeTab === 'security'" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <h3 class="text-sm font-black text-slate-800 mb-1">Password & Security</h3>
            <p class="text-xs text-slate-500">Manage your password and security settings</p>
          </div>
          <div class="space-y-4">
            <div>
              <label class="field-label">Current Password</label>
              <input type="password" placeholder="••••••••" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">New Password</label>
              <input type="password" placeholder="••••••••" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Confirm New Password</label>
              <input type="password" placeholder="••••••••" class="field-input mt-1" />
            </div>
          </div>
          <button class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
            Update Password
          </button>
          <div class="pt-4 border-t border-slate-100">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs font-bold text-slate-800">Two-Factor Authentication</p>
                <p class="text-[10px] text-slate-500">Add an extra layer of security</p>
              </div>
              <button class="text-xs font-bold text-primary hover:underline">Enable</button>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div v-if="activeTab === 'notifications'" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div>
            <h3 class="text-sm font-black text-slate-800 mb-1">Notification Preferences</h3>
            <p class="text-xs text-slate-500">Choose what updates you want to receive</p>
          </div>
          <div v-for="notif in notifications" :key="notif.id" class="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
            <div>
              <p class="text-xs font-bold text-slate-800">{{ notif.label }}</p>
              <p class="text-[10px] text-slate-500">{{ notif.desc }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="notif.enabled" class="sr-only peer" />
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>

        <!-- Platform Settings (Admin only) -->
        <div v-if="activeTab === 'platform' && isAdmin" class="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <h3 class="text-sm font-black text-slate-800 mb-1">Platform Settings</h3>
            <p class="text-xs text-slate-500">Global platform configuration</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="field-label">Platform Name</label>
              <input value="Redmit" type="text" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Commission Rate (%)</label>
              <input value="15" type="number" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Support Email</label>
              <input value="support@redmit.com" type="email" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Support Phone</label>
              <input value="+251 123 456 789" type="tel" class="field-input mt-1" />
            </div>
          </div>
          <button class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
            Save Platform Settings
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsView',
  computed: {
    isAdmin() { return localStorage.getItem('role') === 'admin'; },
    tabs() {
      const base = [
        { value: 'account',       label: 'Account',       icon: 'fas fa-user' },
        { value: 'security',      label: 'Security',      icon: 'fas fa-lock' },
        { value: 'notifications', label: 'Notifications', icon: 'fas fa-bell' },
      ];
      if (this.isAdmin) {
        base.push({ value: 'platform', label: 'Platform', icon: 'fas fa-cog' });
      }
      return base;
    },
  },
  data() {
    return {
      activeTab: 'account',
      accountForm: {
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || '',
        phone: '+251 912 345 678',
        location: 'Addis Ababa, Ethiopia',
      },
      notifications: [
        { id: 1, label: 'Order Updates',        desc: 'Get notified about order status changes',      enabled: true },
        { id: 2, label: 'Payment Alerts',       desc: 'Receive alerts for payment transactions',      enabled: true },
        { id: 3, label: 'New Messages',         desc: 'Notifications for new messages and inquiries', enabled: true },
        { id: 4, label: 'Marketing Updates',    desc: 'Promotional emails and product updates',       enabled: false },
        { id: 5, label: 'Platform Announcements', desc: 'Important platform news and updates',       enabled: true },
      ],
    };
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
