<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">{{ isAdmin ? 'All Orders' : 'My Orders' }}</h1>
        <p class="text-slate-500 text-sm">{{ isAdmin ? 'Manage and track all platform orders' : 'Track your purchase and service orders' }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="exportOrders" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
          <i class="fas fa-download text-xs"></i> Export
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <button v-for="f in filters" :key="f.value"
        @click="activeFilter = f.value"
        class="px-4 py-2 text-xs font-bold rounded-xl border transition"
        :class="activeFilter === f.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary'">
        {{ f.label }}
        <span v-if="f.count" class="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]"
          :class="activeFilter === f.value ? 'bg-white/20' : 'bg-slate-100'">
          {{ f.count }}
        </span>
      </button>
    </div>

    <!-- Stats cards (admin only) -->
    <div v-if="isAdmin" class="grid grid-cols-2 sm:grid-cols-4 gap-4">
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

    <!-- Orders table -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-slate-100 bg-slate-50">
            <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th class="px-5 py-3.5 text-left">Order ID</th>
              <th class="px-4 py-3.5 text-left" v-if="isAdmin">Customer</th>
              <th class="px-4 py-3.5 text-left">Item / Service</th>
              <th class="px-4 py-3.5 text-left hidden sm:table-cell">Type</th>
              <th class="px-4 py-3.5 text-left">Amount</th>
              <th class="px-4 py-3.5 text-left hidden md:table-cell">Date</th>
              <th class="px-4 py-3.5 text-left">Status</th>
              <th class="px-4 py-3.5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="order in filteredOrders" :key="order.id"
              class="hover:bg-slate-50/50 transition-colors">
              <td class="px-5 py-4">
                <p class="font-mono text-xs font-bold text-slate-800">#{{ order.id }}</p>
              </td>
              <td class="px-4 py-4" v-if="isAdmin">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span class="text-primary font-black text-[10px]">{{ order.customerInitials }}</span>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-slate-800">{{ order.customer }}</p>
                    <p class="text-[10px] text-slate-400">{{ order.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="order.iconBg">
                    <i :class="[order.icon, order.iconColor, 'text-lg']"></i>
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 text-xs">{{ order.item }}</p>
                    <p class="text-[10px] text-slate-400">{{ order.seller }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 hidden sm:table-cell">
                <span class="text-xs text-slate-600">{{ order.type }}</span>
              </td>
              <td class="px-4 py-4">
                <p class="font-black text-slate-900 text-sm">{{ order.amount }}</p>
              </td>
              <td class="px-4 py-4 hidden md:table-cell text-xs text-slate-500">{{ order.date }}</td>
              <td class="px-4 py-4">
                <span class="text-[10px] font-black px-2.5 py-1 rounded-full" :class="order.statusCls">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <div class="flex gap-1.5">
                  <button @click="viewOrder(order)" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-500 flex items-center justify-center transition text-xs">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button v-if="isAdmin && order.status === 'Pending'" @click="approveOrder(order)" class="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-500 hover:text-white text-green-600 flex items-center justify-center transition text-xs">
                    <i class="fas fa-check"></i>
                  </button>
                </div>
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
  name: 'OrdersView',
  computed: {
    isAdmin() { return localStorage.getItem('role') === 'admin'; },
    filteredOrders() {
      if (this.activeFilter === 'all') return this.orders;
      return this.orders.filter(o => o.status.toLowerCase() === this.activeFilter);
    },
  },
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { value: 'all',       label: 'All Orders',   count: '24' },
        { value: 'pending',   label: 'Pending',      count: '5' },
        { value: 'processing',label: 'Processing',   count: '3' },
        { value: 'delivered', label: 'Delivered',    count: '12' },
        { value: 'cancelled', label: 'Cancelled',    count: '4' },
      ],
      stats: [
        { label: 'Total Orders',   value: '3,412', icon: 'fas fa-shopping-cart', iconBg: 'bg-blue-50',    iconColor: 'text-blue-600' },
        { label: 'Pending',        value: '47',    icon: 'fas fa-clock',         iconBg: 'bg-amber-50',   iconColor: 'text-amber-600' },
        { label: 'Completed',      value: '3,201', icon: 'fas fa-check-circle',  iconBg: 'bg-green-50',   iconColor: 'text-green-600' },
        { label: 'Revenue',        value: '142K',  icon: 'fas fa-coins',         iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
      ],
      orders: [
        { id: '10241', customer: 'Abebe Tadesse',    customerInitials: 'AT', email: 'abebe@email.com',   item: 'Social Media Canva Pack',      seller: 'by Digital Store', type: 'Digital Product',  amount: '800 ETB',     date: 'Aug 11, 2026', icon: 'fas fa-box-open',        iconBg: 'bg-blue-50',    iconColor: 'text-blue-600',    status: 'Delivered',  statusCls: 'bg-green-100 text-green-700' },
        { id: '10240', customer: 'Sara Mekonnen',    customerInitials: 'SM', email: 'sara@email.com',    item: 'TikTok Account — 128K',        seller: 'by @trendyvideos', type: 'Digital Asset',    amount: '85,000 ETB',  date: 'Aug 10, 2026', icon: 'fab fa-tiktok',          iconBg: 'bg-slate-100',  iconColor: 'text-slate-700',   status: 'Pending',    statusCls: 'bg-amber-100 text-amber-700' },
        { id: '10239', customer: 'Dawit Kebede',     customerInitials: 'DK', email: 'dawit@email.com',   item: 'ChatGPT Plus — 1 month',       seller: 'Pay For Me',       type: 'Service',          amount: '1,800 ETB',   date: 'Aug 10, 2026', icon: 'fas fa-robot',           iconBg: 'bg-purple-50',  iconColor: 'text-purple-600',  status: 'Delivered',  statusCls: 'bg-green-100 text-green-700' },
        { id: '10238', customer: 'Meron Hailu',      customerInitials: 'MH', email: 'meron@email.com',   item: 'Facebook Ads Campaign',        seller: 'Digital Growth',   type: 'Advertising',      amount: '6,500 ETB',   date: 'Aug 9, 2026',  icon: 'fab fa-facebook',        iconBg: 'bg-blue-50',    iconColor: 'text-blue-600',    status: 'Processing', statusCls: 'bg-blue-100 text-blue-700' },
        { id: '10237', customer: 'Yonas Alemayehu',  customerInitials: 'YA', email: 'yonas@email.com',   item: 'YouTube Channel — 32K subs',   seller: 'by @techreview',   type: 'Digital Asset',    amount: '120,000 ETB', date: 'Aug 9, 2026',  icon: 'fab fa-youtube',         iconBg: 'bg-red-50',     iconColor: 'text-red-600',     status: 'Pending',    statusCls: 'bg-amber-100 text-amber-700' },
        { id: '10236', customer: 'Tigist Mulugeta',  customerInitials: 'TM', email: 'tigist@email.com',  item: 'IELTS Registration Fee',       seller: 'Pay For Me',       type: 'Service',          amount: '8,500 ETB',   date: 'Aug 8, 2026',  icon: 'fas fa-file-alt',        iconBg: 'bg-amber-50',   iconColor: 'text-amber-600',   status: 'Processing', statusCls: 'bg-blue-100 text-blue-700' },
        { id: '10235', customer: 'Hanna Tesfaye',    customerInitials: 'HT', email: 'hanna@email.com',   item: 'Instagram Account — 54K',      seller: 'by @fashionhub',   type: 'Digital Asset',    amount: '45,000 ETB',  date: 'Aug 7, 2026',  icon: 'fab fa-instagram',       iconBg: 'bg-pink-50',    iconColor: 'text-pink-600',    status: 'Delivered',  statusCls: 'bg-green-100 text-green-700' },
        { id: '10234', customer: 'Biniam Girma',     customerInitials: 'BG', email: 'biniam@email.com',  item: 'E-commerce Template Bundle',   seller: 'by WebDesigners',  type: 'Digital Product',  amount: '2,400 ETB',   date: 'Aug 7, 2026',  icon: 'fas fa-laptop-code',     iconBg: 'bg-indigo-50',  iconColor: 'text-indigo-600',  status: 'Delivered',  statusCls: 'bg-green-100 text-green-700' },
        { id: '10233', customer: 'Kalkidan Bekele',  customerInitials: 'KB', email: 'kalkidan@email.com',item: 'Udemy Course — Digital Mktg',  seller: 'Pay For Me',       type: 'Service',          amount: '1,200 ETB',   date: 'Aug 6, 2026',  icon: 'fas fa-graduation-cap',  iconBg: 'bg-blue-50',    iconColor: 'text-blue-600',    status: 'Delivered',  statusCls: 'bg-green-100 text-green-700' },
        { id: '10232', customer: 'Abel Gebre',       customerInitials: 'AG', email: 'abel@email.com',    item: 'Logo Design Toolkit',          seller: 'by CreativePro',   type: 'Digital Product',  amount: '600 ETB',     date: 'Aug 5, 2026',  icon: 'fas fa-palette',         iconBg: 'bg-orange-50',  iconColor: 'text-orange-600',  status: 'Cancelled',  statusCls: 'bg-red-100 text-red-600' },
      ],
    };
  },
  methods: {
    viewOrder(order) {
      alert(`Viewing order #${order.id}: ${order.item}`);
    },
    approveOrder(order) {
      order.status = 'Processing';
      order.statusCls = 'bg-blue-100 text-blue-700';
    },
    exportOrders() {
      alert('Exporting orders...');
    },
  },
};
</script>
