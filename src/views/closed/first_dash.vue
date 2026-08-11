<template>
  <div class="p-6 space-y-6 bg-white min-h-full font-sans">

    <!-- Page header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-xl font-black text-slate-900">
          {{ isAdmin ? 'Admin Dashboard' : 'My Dashboard' }}
        </h1>
        <p class="text-slate-500 text-sm mt-0.5">
          Welcome back, <span class="font-semibold text-slate-700">{{ displayName }}</span> 
        </p>
      </div>
      <div class="flex gap-2">
   
      </div>
    </div>

    <!-- ── ADMIN STATS ── -->
    <template v-if="isAdmin">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div v-for="s in adminStats" :key="s.label"
          class="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-3">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="s.iconBg">
            <i :class="[s.icon, s.iconColor, 'text-sm']"></i>
          </div>
          <div>
            <p class="text-xl font-black text-slate-900 leading-none">{{ s.value }}</p>
            <p class="text-xs text-slate-500 mt-1">{{ s.label }}</p>
          </div>
          <p v-if="s.sub" class="text-[11px] font-semibold" :class="s.subColor">{{ s.sub }}</p>
        </div>
      </div>

      <!-- Revenue + Recent orders -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">

        <!-- Revenue chart placeholder -->
        <div class="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-black text-slate-800">Revenue Overview</h3>
            <span class="text-[10px] text-slate-400 font-bold uppercase">This Year</span>
          </div>
          <!-- Bar chart visual -->
          <div class="flex items-end gap-2 h-32 border-b border-l border-slate-100 px-2 pb-1">
            <div v-for="(bar, i) in revenueBars" :key="i"
              class="flex-1 rounded-t-lg transition-all hover:opacity-80"
              :class="bar.highlight ? 'bg-primary' : 'bg-primary/20'"
              :style="{ height: bar.pct + '%' }"
              :title="bar.label + ': ' + bar.val"></div>
          </div>
          <div class="flex justify-between text-[10px] text-slate-400 mt-1.5 px-2">
            <span v-for="m in months" :key="m">{{ m }}</span>
          </div>
        </div>

        <!-- Service breakdown -->
        <div class="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5">
          <h3 class="text-sm font-black text-slate-800 mb-4">Orders by Service</h3>
          <div class="space-y-3">
            <div v-for="s in serviceBreakdown" :key="s.name">
              <div class="flex justify-between text-xs mb-1">
                <span class="flex items-center gap-1.5 font-semibold text-slate-700">
                  <i :class="[s.icon, s.color, 'text-[10px]']"></i>
                  {{ s.name }}
                </span>
                <span class="font-black text-slate-900">{{ s.count }}</span>
              </div>
              <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full transition-all" :class="s.bar" :style="{ width: s.pct + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent orders table -->
        <div class="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-black text-slate-800">Recent Orders</h3>
            <span class="text-[10px] text-primary font-bold cursor-pointer hover:underline">View All</span>
          </div>
          <div class="space-y-2.5">
            <div v-for="o in recentOrders" :key="o.id"
              class="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" :class="o.iconBg">
                <i :class="[o.icon, o.iconColor, 'text-xs']"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-800 truncate">{{ o.title }}</p>
                <p class="text-[10px] text-slate-400">{{ o.buyer }} · {{ o.time }}</p>
              </div>
              <div class="text-right shrink-0">
                <p class="text-xs font-black text-slate-900">{{ o.amount }}</p>
                <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                  :class="o.statusCls">{{ o.status }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Pending requests + Inbox + Top products -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">

        <!-- Pending requests -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-black text-slate-800">Pending Requests</h3>
            <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
              {{ pendingRequests.length }} pending
            </span>
          </div>
          <div class="space-y-2.5">
            <div v-for="r in pendingRequests" :key="r.id"
              class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-100 hover:border-primary/20 transition-colors">
              <div class="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" :class="r.iconBg">
                <i :class="[r.icon, r.iconColor, 'text-xs']"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-800 truncate">{{ r.title }}</p>
                <p class="text-[10px] text-slate-400">{{ r.user }} · {{ r.type }}</p>
              </div>
              <div class="flex gap-1">
                <button class="w-6 h-6 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-[10px] hover:bg-green-200 transition">
                  <i class="fas fa-check"></i>
                </button>
                <button class="w-6 h-6 rounded-lg bg-red-100 text-red-500 flex items-center justify-center text-[10px] hover:bg-red-200 transition">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Inbox -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-sm font-black text-slate-800">Inbox</h3>
            <span class="text-[10px] text-primary font-bold cursor-pointer hover:underline">View All</span>
          </div>
          <div class="space-y-2.5">
            <div v-for="msg in inbox" :key="msg.id"
              class="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span class="text-primary font-black text-xs">{{ msg.initials }}</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-800">{{ msg.name }}</p>
                <p class="text-[10px] text-slate-500 truncate">{{ msg.subject }}</p>
                <p class="text-[10px] text-slate-400 mt-0.5">{{ msg.time }}</p>
              </div>
              <span v-if="msg.unread" class="w-2 h-2 bg-red-500 rounded-full mt-1 shrink-0"></span>
            </div>
          </div>
        </div>

        <!-- Top selling products -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 class="text-sm font-black text-slate-800 mb-3">Top Products</h3>
          <div class="space-y-2.5">
            <div v-for="(p, i) in topProducts" :key="p.title"
              class="flex items-center gap-3">
              <span class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                :class="i === 0 ? 'bg-amber-400 text-amber-900' : 'bg-slate-100 text-slate-500'">
                {{ i + 1 }}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-800 truncate">{{ p.title }}</p>
                <p class="text-[10px] text-slate-400">{{ p.sales }} sales</p>
              </div>
              <p class="text-xs font-black text-slate-900 shrink-0">{{ p.revenue }}</p>
            </div>
          </div>
        </div>

      </div>
    </template>

    <!-- ── USER DASHBOARD ── -->
    <template v-else>

      <!-- User stats -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div v-for="s in userStats" :key="s.label"
          class="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-3">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="s.iconBg">
            <i :class="[s.icon, s.iconColor, 'text-sm']"></i>
          </div>
          <div>
            <p class="text-xl font-black text-slate-900 leading-none">{{ s.value }}</p>
            <p class="text-xs text-slate-500 mt-1">{{ s.label }}</p>
          </div>
        </div>
      </div>

      <!-- Quick actions -->
      <div>
        <h3 class="text-sm font-black text-slate-800 mb-3">Quick Actions</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <router-link v-for="a in quickActions" :key="a.label" :to="{ name: a.route }"
            class="group flex flex-col items-center gap-3 p-5 bg-white border-2 border-slate-200 rounded-2xl
                   hover:border-primary hover:shadow-md hover:shadow-primary/10 transition-all duration-200 text-center">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110"
                 :class="a.iconBg">
              <i :class="[a.icon, a.iconColor, 'text-xl']"></i>
            </div>
            <span class="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">{{ a.label }}</span>
          </router-link>
        </div>
      </div>

      <!-- My orders / requests -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <!-- My Orders -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 class="text-sm font-black text-slate-800 mb-4">My Recent Orders</h3>
          <div class="space-y-2.5">
            <div v-for="o in myOrders" :key="o.id"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" :class="o.iconBg">
                <i :class="[o.icon, o.iconColor, 'text-sm']"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-800 truncate">{{ o.title }}</p>
                <p class="text-[10px] text-slate-400">{{ o.type }} · {{ o.date }}</p>
              </div>
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0" :class="o.statusCls">
                {{ o.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- My listings / products -->
        <div class="bg-white rounded-2xl border border-slate-200 p-5">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-black text-slate-800">My Listings</h3>
            <router-link :to="{ name: 'Products-add' }"
              class="text-[10px] font-black text-white bg-secondary hover:bg-secondary-dark px-3 py-1.5 rounded-lg transition">
              + New
            </router-link>
          </div>
          <div class="space-y-2.5">
            <div v-for="l in myListings" :key="l.id"
              class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
              <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" :class="l.iconBg">
                <i :class="[l.icon, l.iconColor, 'text-sm']"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-slate-800 truncate">{{ l.title }}</p>
                <p class="text-[10px] text-slate-400">{{ l.type }} · {{ l.sales }} sales</p>
              </div>
              <p class="text-xs font-black text-slate-900 shrink-0">{{ l.price }}</p>
            </div>
          </div>
        </div>

      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: 'RedmitDashboard',
  computed: {
    isAdmin()     { return localStorage.getItem('role') === 'admin'; },
    displayName() { return localStorage.getItem('name') || 'User'; },
  },
  data() {
    return {
      months: ['J','F','M','A','M','J','J','A','S','O','N','D'],
      revenueBars: [
        { pct:30, highlight:false, label:'Jan', val:'12,000 ETB' },
        { pct:45, highlight:false, label:'Feb', val:'18,000 ETB' },
        { pct:38, highlight:false, label:'Mar', val:'15,000 ETB' },
        { pct:60, highlight:false, label:'Apr', val:'24,000 ETB' },
        { pct:52, highlight:false, label:'May', val:'21,000 ETB' },
        { pct:75, highlight:false, label:'Jun', val:'30,000 ETB' },
        { pct:90, highlight:true,  label:'Jul', val:'36,000 ETB' },
        { pct:65, highlight:false, label:'Aug', val:'26,000 ETB' },
        { pct:50, highlight:false, label:'Sep', val:'20,000 ETB' },
        { pct:40, highlight:false, label:'Oct', val:'16,000 ETB' },
        { pct:55, highlight:false, label:'Nov', val:'22,000 ETB' },
        { pct:70, highlight:false, label:'Dec', val:'28,000 ETB' },
      ],

      adminStats: [
        { label:'Total Users',    value:'1,248', icon:'fas fa-users',         iconBg:'bg-blue-50',    iconColor:'text-blue-600',    sub:'↑ 34 this month', subColor:'text-green-600' },
        { label:'Total Orders',   value:'3,412', icon:'fas fa-shopping-cart', iconBg:'bg-indigo-50',  iconColor:'text-indigo-600',  sub:'↑ 12% vs last mo', subColor:'text-green-600' },
        { label:'Revenue',        value:'142K',  icon:'fas fa-coins',         iconBg:'bg-amber-50',   iconColor:'text-amber-600',   sub:'ETB this month', subColor:'text-slate-500' },
        { label:'Products Listed',value:'284',   icon:'fas fa-box-open',      iconBg:'bg-sky-50',     iconColor:'text-sky-600',     sub:'18 pending review', subColor:'text-amber-600' },
        { label:'Asset Listings', value:'96',    icon:'fas fa-exchange-alt',  iconBg:'bg-purple-50',  iconColor:'text-purple-600',  sub:'7 active trades', subColor:'text-slate-500' },
        { label:'Open Requests',  value:'47',    icon:'fas fa-key',           iconBg:'bg-red-50',     iconColor:'text-red-600',     sub:'12 urgent', subColor:'text-red-600' },
      ],

      serviceBreakdown: [
        { name:'Digital Products', icon:'fas fa-box-open',      color:'text-blue-600',   bar:'bg-blue-500',   count:'1,842', pct:54 },
        { name:'Digital Assets',   icon:'fas fa-exchange-alt',  color:'text-indigo-600', bar:'bg-indigo-500', count:'612',   pct:18 },
        { name:'Pay For Me',       icon:'fas fa-hand-holding-usd',color:'text-red-600',  bar:'bg-red-500',    count:'543',   pct:16 },
        { name:'Digital Growth',   icon:'fas fa-chart-line',    color:'text-emerald-600',bar:'bg-emerald-500',count:'415',   pct:12 },
      ],

      recentOrders: [
        { id:1, title:'Social Media Canva Pack',    buyer:'Abebe T.',   time:'2m ago',   amount:'800 ETB',   icon:'fas fa-box-open',     iconBg:'bg-blue-50',   iconColor:'text-blue-600',   status:'Paid',     statusCls:'bg-green-100 text-green-700' },
        { id:2, title:'TikTok Account — 128K',      buyer:'Sara M.',    time:'14m ago',  amount:'85,000 ETB',icon:'fab fa-tiktok',       iconBg:'bg-slate-100', iconColor:'text-slate-700',  status:'Pending',  statusCls:'bg-amber-100 text-amber-700' },
        { id:3, title:'ChatGPT Plus — Pay For Me',  buyer:'Dawit K.',   time:'1h ago',   amount:'1,800 ETB', icon:'fas fa-robot',        iconBg:'bg-purple-50', iconColor:'text-purple-600', status:'Fulfilled',statusCls:'bg-green-100 text-green-700' },
        { id:4, title:'Facebook Ads Campaign',      buyer:'Meron H.',   time:'3h ago',   amount:'6,500 ETB', icon:'fab fa-facebook',     iconBg:'bg-blue-50',   iconColor:'text-blue-600',   status:'Active',   statusCls:'bg-blue-100 text-blue-700' },
        { id:5, title:'YouTube Channel — 32K subs', buyer:'Yonas A.',   time:'5h ago',   amount:'120,000 ETB',icon:'fab fa-youtube',     iconBg:'bg-red-50',    iconColor:'text-red-600',    status:'Review',   statusCls:'bg-amber-100 text-amber-700' },
      ],

      pendingRequests: [
        { id:1, title:'Udemy Course Access',       user:'Kalkidan B.', type:'Pay For Me',     icon:'fas fa-graduation-cap', iconBg:'bg-blue-50',    iconColor:'text-blue-600' },
        { id:2, title:'Facebook Ads Campaign',     user:'Tigist M.',   type:'Digital Growth', icon:'fab fa-facebook',      iconBg:'bg-indigo-50',  iconColor:'text-indigo-600' },
        { id:3, title:'Instagram Account — 54K',   user:'Abel G.',     type:'Asset Review',   icon:'fab fa-instagram',     iconBg:'bg-pink-50',    iconColor:'text-pink-600' },
        { id:4, title:'IELTS Registration Fee',    user:'Hanna T.',    type:'Pay For Me',     icon:'fas fa-file-alt',      iconBg:'bg-amber-50',   iconColor:'text-amber-600' },
      ],

      inbox: [
        { id:1, name:'Kalkidan B.',  initials:'KB', subject:'My Pay For Me request status?', time:'5m ago',   unread:true },
        { id:2, name:'Sara Mekonnen',initials:'SM', subject:'Asset listing inquiry',          time:'22m ago',  unread:true },
        { id:3, name:'Dawit Hailu',  initials:'DH', subject:'Growth campaign question',       time:'1h ago',   unread:false },
        { id:4, name:'Meron Girma',  initials:'MG', subject:'Refund request',                 time:'3h ago',   unread:false },
      ],

      topProducts: [
        { title:'Digital Marketing Course',   sales:'204', revenue:'306K ETB' },
        { title:'Canva Social Media Pack',    sales:'89',  revenue:'71K ETB' },
        { title:'YouTube Growth Blueprint',   sales:'115', revenue:'104K ETB' },
        { title:'Logo Design Toolkit',        sales:'63',  revenue:'38K ETB' },
        { title:'E-Comm Invoice Tool',        sales:'37',  revenue:'93K ETB' },
      ],

      // ── User ──
      userStats: [
        { label:'My Orders',    value:'12',  icon:'fas fa-shopping-bag', iconBg:'bg-blue-50',    iconColor:'text-blue-600' },
        { label:'My Products',  value:'4',   icon:'fas fa-box-open',     iconBg:'bg-indigo-50',  iconColor:'text-indigo-600' },
        { label:'My Requests',  value:'3',   icon:'fas fa-key',          iconBg:'bg-red-50',     iconColor:'text-red-600' },
        { label:'Total Earned', value:'14K', icon:'fas fa-coins',        iconBg:'bg-amber-50',   iconColor:'text-amber-600' },
      ],

      quickActions: [
        { label:'Buy Products',    route:'Products-view',   icon:'fas fa-shopping-bag', iconBg:'bg-blue-50',    iconColor:'text-blue-500' },
        { label:'Sell / List',     route:'Products-add',    icon:'fas fa-store',        iconBg:'bg-indigo-50',  iconColor:'text-indigo-500' },
        { label:'Pay For Me',      route:'PayForMe-view',   icon:'fas fa-hand-holding-usd', iconBg:'bg-red-50', iconColor:'text-red-500' },
        { label:'Grow & Advertise',route:'Growth-view',     icon:'fas fa-chart-line',   iconBg:'bg-emerald-50', iconColor:'text-emerald-500' },
      ],

      myOrders: [
        { id:1, title:'Digital Marketing Course',  type:'Digital Product', date:'Today',      icon:'fas fa-graduation-cap', iconBg:'bg-blue-50',  iconColor:'text-blue-600',  status:'Delivered', statusCls:'bg-green-100 text-green-700' },
        { id:2, title:'ChatGPT Plus — 1 month',    type:'Pay For Me',      date:'Yesterday',  icon:'fas fa-robot',          iconBg:'bg-purple-50',iconColor:'text-purple-600',status:'Fulfilled', statusCls:'bg-green-100 text-green-700' },
        { id:3, title:'Facebook Ads Campaign',     type:'Digital Growth',  date:'Aug 5',      icon:'fab fa-facebook',       iconBg:'bg-blue-50',  iconColor:'text-blue-600',  status:'Active',    statusCls:'bg-blue-100 text-blue-700' },
        { id:4, title:'Instagram Account — 54K',   type:'Digital Asset',   date:'Aug 3',      icon:'fab fa-instagram',      iconBg:'bg-pink-50',  iconColor:'text-pink-600',  status:'In Review', statusCls:'bg-amber-100 text-amber-700' },
      ],

      myListings: [
        { id:1, title:'Canva Social Media Pack',   type:'Digital Product', sales:'14', price:'800 ETB',    icon:'fas fa-paint-brush',  iconBg:'bg-pink-50',   iconColor:'text-pink-600' },
        { id:2, title:'Freelancing Guide Ebook',   type:'Digital Product', sales:'7',  price:'350 ETB',    icon:'fas fa-book',         iconBg:'bg-sky-50',    iconColor:'text-sky-600' },
        { id:3, title:'TikTok Account — 75K',      type:'Digital Asset',   sales:'0',  price:'55,000 ETB', icon:'fab fa-tiktok',       iconBg:'bg-slate-100', iconColor:'text-slate-700' },
      ],
    };
  },
};
</script>
