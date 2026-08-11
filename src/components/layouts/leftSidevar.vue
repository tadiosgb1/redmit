<template>
  <div class="flex flex-col h-full bg-white border-r border-slate-200">

    <!-- ══ ADMIN SIDEBAR ══════════════════════════════════ -->
    <template v-if="isAdmin">

      <!-- Brand header -->
      <div class="px-5 pt-5 shrink-0 border-b border-slate-100">
        <div class="flex items-center gap-2.5 mb-1">
          <img src="@/assets/img/logo1.jpg" alt="Redmit"
               class="h-8 w-auto object-contain" />
          <div>
            <!-- <p class="text-sm font-black text-slate-900 leading-none">Redmit</p>
            <p class="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">Admin Panel</p>
           -->
          </div>
        </div>
      </div>

      <nav class="flex-1 px-3 pb-3 overflow-y-auto custom-scrollbar space-y-0.5">

        <p class="section-label">Overview</p>
        <router-link :to="{ name: 'first-dash' }" :class="adminLinkClass('first-dash')">
          <i class="fas fa-th-large link-icon"></i> Dashboard
        </router-link>

        <p class="section-label mt-4">Marketplace</p>
        <!-- Products submenu -->
        <button @click="toggle('products')" :class="adminBtnClass('products')">
          <i class="fas fa-box-open link-icon"></i>
          <span class="flex-1 text-left">Digital Products</span>
          <i class="fas text-[9px]" :class="isOpen('products') ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
        <transition name="sub">
          <div v-if="isOpen('products')" class="ml-2 pl-3 border-l border-slate-200 space-y-0.5 mb-1">
            <router-link :to="{ name: 'Products-view' }" :class="adminSubClass('Products-view')">
              <i class="fas fa-list text-[10px] w-3"></i> All Products
            </router-link>
            <router-link :to="{ name: 'Products-add' }" :class="adminSubClass('Products-add')">
              <i class="fas fa-plus text-[10px] w-3"></i> Add Product
            </router-link>
          </div>
        </transition>

        <!-- Assets submenu -->
        <button @click="toggle('assets')" :class="adminBtnClass('assets')">
          <i class="fas fa-exchange-alt link-icon"></i>
          <span class="flex-1 text-left">Digital Assets</span>
          <i class="fas text-[9px]" :class="isOpen('assets') ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
        </button>
        <transition name="sub">
          <div v-if="isOpen('assets')" class="ml-2 pl-3 border-l border-slate-200 space-y-0.5 mb-1">
            <router-link :to="{ name: 'Assets-view' }" :class="adminSubClass('Assets-view')">
              <i class="fas fa-list text-[10px] w-3"></i> All Listings
            </router-link>
            <router-link :to="{ name: 'Assets-add' }" :class="adminSubClass('Assets-add')">
              <i class="fas fa-plus text-[10px] w-3"></i> Add Listing
            </router-link>
          </div>
        </transition>

        <p class="section-label mt-4">Services</p>
        <router-link :to="{ name: 'PayForMe-view' }" :class="adminLinkClass('PayForMe-view')">
          <i class="fas fa-hand-holding-usd link-icon"></i> Pay For Me
          <span class="ml-auto text-[9px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full">New</span>
        </router-link>
        <router-link :to="{ name: 'Access-view' }" :class="adminLinkClass('Access-view')">
          <i class="fas fa-key link-icon"></i> Digital Access
        </router-link>
        <router-link :to="{ name: 'Growth-view' }" :class="adminLinkClass('Growth-view')">
          <i class="fas fa-chart-line link-icon"></i> Advertising
        </router-link>
        <router-link :to="{ name: 'Monetization-view' }" :class="adminLinkClass('Monetization-view')">
          <i class="fab fa-youtube link-icon"></i> Monetization
        </router-link>

        <p class="section-label mt-4">Administration</p>
        <router-link :to="{ name: 'Orders-view' }" :class="adminLinkClass('Orders-view')">
          <i class="fas fa-shopping-cart link-icon"></i> Orders
        </router-link>
        <router-link :to="{ name: 'Payments-view' }" :class="adminLinkClass('Payments-view')">
          <i class="fas fa-credit-card link-icon"></i> Payments
        </router-link>
        <router-link :to="{ name: 'Users-view' }" :class="adminLinkClass('Users-view')">
          <i class="fas fa-users link-icon"></i> Users
        </router-link>
        <router-link :to="{ name: 'News-view' }" :class="adminLinkClass('News-view')">
          <i class="fas fa-newspaper link-icon"></i> News & Updates
        </router-link>
        <router-link :to="{ name: 'ContactMessage-view' }" :class="adminLinkClass('ContactMessage-view')">
          <i class="fas fa-envelope link-icon"></i> Messages
        </router-link>
        <router-link :to="{ name: 'Settings-view' }" :class="adminLinkClass('Settings-view')">
          <i class="fas fa-cog link-icon"></i> Settings
        </router-link>

      </nav>

      <!-- Admin user footer -->
      <div class="px-3 py-3 border-t border-slate-100 shrink-0">
        <div class="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <i class="fas fa-user-shield text-white text-xs"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-800 truncate">{{ userName }}</p>
            <p class="text-[10px] text-slate-400">Administrator</p>
          </div>
          <button @click="logout" title="Sign out"
            class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors">
            <i class="fas fa-sign-out-alt text-xs"></i>
          </button>
        </div>
      </div>

    </template>

    <!-- ══ USER SIDEBAR ═══════════════════════════════════ -->
    <template v-else>

      <!-- Brand header -->
      <div class="px-4 pt-5 pb-3 shrink-0 border-b border-slate-100">
        <div class="flex items-center gap-2.5">
          <img src="@/assets/img/logo.jpg" alt="Redmit"
               class="h-8 w-auto object-contain" />
          <div>
            <p class="text-sm font-black text-slate-900 leading-none">Redmit</p>
            <p class="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">My Account</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 px-2 py-3 overflow-y-auto custom-scrollbar space-y-0.5">

        <p class="section-label">Overview</p>
        <router-link :to="{ name: 'first-dash' }" :class="userLinkClass('first-dash')">
          <i class="fas fa-th-large link-icon"></i> My Dashboard
        </router-link>
        <router-link :to="{ name: 'Profile' }" :class="userLinkClass('Profile')">
          <i class="fas fa-user-circle link-icon"></i> My Profile
        </router-link>

        <p class="section-label mt-4">Buy & Sell</p>
        <router-link :to="{ name: 'Products-view' }" :class="userLinkClass('Products-view')">
          <i class="fas fa-box-open link-icon"></i> Browse Products
        </router-link>
        <router-link :to="{ name: 'Products-add' }" :class="userLinkClass('Products-add')">
          <i class="fas fa-upload link-icon"></i> Sell a Product
        </router-link>
        <router-link :to="{ name: 'Assets-view' }" :class="userLinkClass('Assets-view')">
          <i class="fas fa-exchange-alt link-icon"></i> Browse Assets
        </router-link>
        <router-link :to="{ name: 'Assets-add' }" :class="userLinkClass('Assets-add')">
          <i class="fab fa-tiktok link-icon"></i> Sell an Asset
        </router-link>

        <p class="section-label mt-4">Services</p>
        <router-link :to="{ name: 'PayForMe-view' }" :class="userLinkClass('PayForMe-view')">
          <i class="fas fa-hand-holding-usd link-icon"></i> Pay For Me
          <span class="ml-auto text-[9px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full">New</span>
        </router-link>
        <router-link :to="{ name: 'Growth-view' }" :class="userLinkClass('Growth-view')">
          <i class="fas fa-bullhorn link-icon"></i> Run Ads
        </router-link>
        <router-link :to="{ name: 'Monetization-view' }" :class="userLinkClass('Monetization-view')">
          <i class="fab fa-youtube link-icon"></i> Monetize My Channel
        </router-link>

        <p class="section-label mt-4">My Activity</p>
        <router-link :to="{ name: 'Orders-view' }" :class="userLinkClass('Orders-view')">
          <i class="fas fa-shopping-bag link-icon"></i> My Orders
        </router-link>
        <router-link :to="{ name: 'Payments-view' }" :class="userLinkClass('Payments-view')">
          <i class="fas fa-receipt link-icon"></i> My Payments
        </router-link>

      </nav>

      <!-- User footer -->
      <div class="px-3 py-3 border-t border-slate-100 shrink-0">
        <div class="flex items-center gap-3 px-2 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
          <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
            <i class="fas fa-user text-white text-xs"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-bold text-slate-800 truncate">{{ userName }}</p>
            <p class="text-[10px] text-slate-400">Member</p>
          </div>
          <button @click="logout" title="Sign out"
            class="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-red-100 hover:text-red-500 transition-colors">
            <i class="fas fa-sign-out-alt text-xs"></i>
          </button>
        </div>
      </div>

    </template>

  </div>
</template>

<script>
export default {
  name: 'RedmitSidebar',
  computed: {
    userName() { return localStorage.getItem('name') || 'User'; },
    userRole()  { return localStorage.getItem('role') || 'user'; },
    isAdmin()   { return this.userRole === 'admin'; },
  },
  data() {
    return { openMenus: [] };
  },
  methods: {
    toggle(key) {
      this.openMenus = this.openMenus.includes(key)
        ? this.openMenus.filter(k => k !== key)
        : [...this.openMenus, key];
    },
    isOpen(key) { return this.openMenus.includes(key); },

    // Admin link classes (light bg — same as user)
    adminLinkClass(routeName) {
      const active = this.$route.name === routeName;
      return [
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full cursor-pointer',
        active ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
      ];
    },
    adminBtnClass(key) {
      const open = this.isOpen(key);
      return [
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full cursor-pointer',
        open ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
      ];
    },
    adminSubClass(routeName) {
      const active = this.$route.name === routeName;
      return [
        'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer',
        active ? 'text-primary font-bold' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50',
      ];
    },

    // User link classes (light bg)
    userLinkClass(routeName) {
      const active = this.$route.name === routeName;
      return [
        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150',
        active ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
      ];
    },

    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.link-icon { @apply w-4 text-center text-sm shrink-0 text-slate-400; }
.section-label { @apply px-2 pt-1 pb-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400; }
.sub-enter-active, .sub-leave-active { transition: all .15s ease; }
.sub-enter-from, .sub-leave-to       { opacity: 0; transform: translateY(-4px); }
.custom-scrollbar::-webkit-scrollbar        { width: 3px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.2); border-radius: 10px; }
</style>
