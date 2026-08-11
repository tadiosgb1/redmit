<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">{{ isAdmin ? 'All Payments' : 'My Payments' }}</h1>
        <p class="text-slate-500 text-sm">{{ isAdmin ? 'Monitor all platform transactions' : 'View your payment history and transactions' }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="exportPayments" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
          <i class="fas fa-download text-xs"></i> Export
        </button>
      </div>
    </div>

    <!-- Stats cards -->
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

    <!-- Payment methods (user only) -->
    <div v-if="!isAdmin" class="bg-white border border-slate-200 rounded-2xl p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-black text-slate-800">Payment Methods</h3>
        <button class="text-xs font-bold text-primary hover:underline">+ Add Method</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div v-for="m in paymentMethods" :key="m.id"
          class="flex items-center gap-3 p-4 border-2 rounded-xl transition-all"
          :class="m.default ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="m.iconBg">
            <i :class="[m.icon, m.iconColor, 'text-lg']"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-800">{{ m.name }}</p>
            <p class="text-[10px] text-slate-400">{{ m.details }}</p>
          </div>
          <span v-if="m.default" class="text-[9px] font-black px-2 py-0.5 rounded-full bg-primary text-white">DEFAULT</span>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <button v-for="f in filters" :key="f.value"
        @click="activeFilter = f.value"
        class="px-4 py-2 text-xs font-bold rounded-xl border transition"
        :class="activeFilter === f.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary'">
        {{ f.label }}
      </button>
    </div>

    <!-- Payments table -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-slate-100 bg-slate-50">
            <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th class="px-5 py-3.5 text-left">Transaction ID</th>
              <th class="px-4 py-3.5 text-left" v-if="isAdmin">User</th>
              <th class="px-4 py-3.5 text-left">Description</th>
              <th class="px-4 py-3.5 text-left hidden sm:table-cell">Method</th>
              <th class="px-4 py-3.5 text-left">Amount</th>
              <th class="px-4 py-3.5 text-left hidden md:table-cell">Date</th>
              <th class="px-4 py-3.5 text-left">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="payment in filteredPayments" :key="payment.id"
              class="hover:bg-slate-50/50 transition-colors">
              <td class="px-5 py-4">
                <p class="font-mono text-xs font-bold text-slate-800">#{{ payment.id }}</p>
              </td>
              <td class="px-4 py-4" v-if="isAdmin">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span class="text-primary font-black text-[10px]">{{ payment.userInitials }}</span>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-800">{{ payment.user }}</p>
                    <p class="text-[10px] text-slate-400">{{ payment.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="font-bold text-slate-800 text-xs">{{ payment.description }}</p>
                <p class="text-[10px] text-slate-400">{{ payment.details }}</p>
              </td>
              <td class="px-4 py-4 hidden sm:table-cell">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center" :class="payment.methodBg">
                    <i :class="[payment.methodIcon, payment.methodColor, 'text-xs']"></i>
                  </div>
                  <span class="text-xs text-slate-600">{{ payment.method }}</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="font-black text-sm" :class="payment.type === 'credit' ? 'text-green-600' : 'text-slate-900'">
                  {{ payment.type === 'credit' ? '+' : '' }}{{ payment.amount }}
                </p>
              </td>
              <td class="px-4 py-4 hidden md:table-cell text-xs text-slate-500">{{ payment.date }}</td>
              <td class="px-4 py-4">
                <span class="text-[10px] font-black px-2.5 py-1 rounded-full" :class="payment.statusCls">
                  {{ payment.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentsView',
  computed: {
    isAdmin() { return localStorage.getItem('role') === 'admin'; },
    filteredPayments() {
      if (this.activeFilter === 'all') return this.payments;
      return this.payments.filter(p => p.type === this.activeFilter);
    },
  },
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { value: 'all',    label: 'All Transactions' },
        { value: 'debit',  label: 'Payments Out' },
        { value: 'credit', label: 'Earnings' },
      ],
      stats: [
        { label: 'Total Paid',     value: '28,400', icon: 'fas fa-arrow-up',      iconBg: 'bg-red-50',     iconColor: 'text-red-600' },
        { label: 'Total Earned',   value: '14,200', icon: 'fas fa-arrow-down',    iconBg: 'bg-green-50',   iconColor: 'text-green-600' },
        { label: 'Pending',        value: '3,200',  icon: 'fas fa-clock',         iconBg: 'bg-amber-50',   iconColor: 'text-amber-600' },
        { label: 'Balance',        value: '6,800',  icon: 'fas fa-wallet',        iconBg: 'bg-blue-50',    iconColor: 'text-blue-600' },
      ],
      paymentMethods: [
        { id: 1, name: 'CBE Birr',      details: '•••• 4532', icon: 'fas fa-mobile-alt',   iconBg: 'bg-orange-50', iconColor: 'text-orange-600', default: true },
        { id: 2, name: 'Telebirr',      details: '•••• 7891', icon: 'fas fa-phone',        iconBg: 'bg-blue-50',   iconColor: 'text-blue-600',   default: false },
        { id: 3, name: 'Bank Transfer', details: 'CBE Bank',  icon: 'fas fa-university',   iconBg: 'bg-slate-100', iconColor: 'text-slate-600',  default: false },
      ],
      payments: [
        { id: 'PAY10241', type: 'debit',  user: 'Abebe Tadesse',   userInitials: 'AT', email: 'abebe@email.com',   description: 'Social Media Canva Pack',      details: 'Digital Product Purchase',  method: 'CBE Birr',      methodIcon: 'fas fa-mobile-alt', methodBg: 'bg-orange-50', methodColor: 'text-orange-600', amount: '800 ETB',     date: 'Aug 11, 2026', status: 'Completed', statusCls: 'bg-green-100 text-green-700' },
        { id: 'PAY10240', type: 'credit', user: 'Sara Mekonnen',   userInitials: 'SM', email: 'sara@email.com',    description: 'Product Sale Commission',      details: 'Canva Pack — 3 sales',      method: 'Auto Transfer', methodIcon: 'fas fa-sync',       methodBg: 'bg-blue-50',   methodColor: 'text-blue-600',   amount: '420 ETB',     date: 'Aug 10, 2026', status: 'Completed', statusCls: 'bg-green-100 text-green-700' },
        { id: 'PAY10239', type: 'debit',  user: 'Dawit Kebede',    userInitials: 'DK', email: 'dawit@email.com',   description: 'ChatGPT Plus Subscription',    details: 'Pay For Me Service',        method: 'Telebirr',      methodIcon: 'fas fa-phone',      methodBg: 'bg-blue-50',   methodColor: 'text-blue-600',   amount: '1,800 ETB',   date: 'Aug 10, 2026', status: 'Completed', statusCls: 'bg-green-100 text-green-700' },
        { id: 'PAY10238', type: 'debit',  user: 'Meron Hailu',     userInitials: 'MH', email: 'meron@email.com',   description: 'Facebook Ads Campaign',        details: 'Digital Growth Service',    method: 'Bank Transfer', methodIcon: 'fas fa-university', methodBg: 'bg-slate-100', methodColor: 'text-slate-600',  amount: '6,500 ETB',   date: 'Aug 9, 2026',  status: 'Processing',statusCls: 'bg-blue-100 text-blue-700' },
        { id: 'PAY10237', type: 'debit',  user: 'Yonas Alemayehu', userInitials: 'YA', email: 'yonas@email.com',   description: 'YouTube Channel Purchase',     details: '32K Subscribers',           method: 'CBE Birr',      methodIcon: 'fas fa-mobile-alt', methodBg: 'bg-orange-50', methodColor: 'text-orange-600', amount: '120,000 ETB', date: 'Aug 9, 2026',  status: 'Pending',   statusCls: 'bg-amber-100 text-amber-700' },
        { id: 'PAY10236', type: 'credit', user: 'Tigist Mulugeta', userInitials: 'TM', email: 'tigist@email.com',  description: 'Asset Listing Sale',           details: 'Instagram Account 54K',     method: 'Auto Transfer', methodIcon: 'fas fa-sync',       methodBg: 'bg-blue-50',   methodColor: 'text-blue-600',   amount: '22,500 ETB',  date: 'Aug 8, 2026',  status: 'Completed', statusCls: 'bg-green-100 text-green-700' },
        { id: 'PAY10235', type: 'debit',  user: 'Hanna Tesfaye',   userInitials: 'HT', email: 'hanna@email.com',   description: 'Instagram Account Purchase',   details: '54K Followers',             method: 'Telebirr',      methodIcon: 'fas fa-phone',      methodBg: 'bg-blue-50',   methodColor: 'text-blue-600',   amount: '45,000 ETB',  date: 'Aug 7, 2026',  status: 'Completed', statusCls: 'bg-green-100 text-green-700' },
        { id: 'PAY10234', type: 'debit',  user: 'Biniam Girma',    userInitials: 'BG', email: 'biniam@email.com',  description: 'E-commerce Template Bundle',   details: 'Digital Product Purchase',  method: 'CBE Birr',      methodIcon: 'fas fa-mobile-alt', methodBg: 'bg-orange-50', methodColor: 'text-orange-600', amount: '2,400 ETB',   date: 'Aug 7, 2026',  status: 'Completed', statusCls: 'bg-green-100 text-green-700' },
        { id: 'PAY10233', type: 'debit',  user: 'Kalkidan Bekele', userInitials: 'KB', email: 'kalkidan@email.com',description: 'Udemy Course Access',          details: 'Pay For Me Service',        method: 'Telebirr',      methodIcon: 'fas fa-phone',      methodBg: 'bg-blue-50',   methodColor: 'text-blue-600',   amount: '1,200 ETB',   date: 'Aug 6, 2026',  status: 'Completed', statusCls: 'bg-green-100 text-green-700' },
        { id: 'PAY10232', type: 'debit',  user: 'Abel Gebre',      userInitials: 'AG', email: 'abel@email.com',    description: 'Logo Design Toolkit',          details: 'Cancelled by customer',     method: 'Bank Transfer', methodIcon: 'fas fa-university', methodBg: 'bg-slate-100', methodColor: 'text-slate-600',  amount: '600 ETB',     date: 'Aug 5, 2026',  status: 'Refunded',  statusCls: 'bg-slate-100 text-slate-500' },
      ],
    };
  },
  methods: {
    exportPayments() {
      alert('Exporting payment history...');
    },
  },
};
</script>
