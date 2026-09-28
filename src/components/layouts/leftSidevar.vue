<template>
  <div class="flex h-full flex-col border-r border-slate-200 bg-white">
    <div class="shrink-0 border-b border-slate-100 px-5 pt-5 pb-3">
      <div class="flex items-center gap-2.5">
        <img :src="brandLogo" alt="Redmit" class="h-8 w-auto object-contain" />
        <div v-if="!isAdmin">
          <p class="text-sm font-black leading-none text-slate-900">Redmit</p>
          <p class="mt-0.5 text-[10px] uppercase tracking-wider text-slate-400">My Account</p>
        </div>
      </div>
    </div>

    <nav class="custom-scrollbar flex-1 overflow-y-auto px-3 py-3">
      <template v-for="section in currentNavigation" :key="section.id">
        <p class="section-label" :class="{ 'mt-4': section.spacing }">
          {{ section.label }}
        </p>

        <template v-for="item in section.items" :key="item.key || item.route">
          <router-link
            v-if="item.type !== 'submenu'"
            :to="{ name: item.route }"
            :class="linkClass(item)"
          >
            <i :class="[item.iconType || 'fas', item.icon, 'link-icon']"></i>
            <span class="flex-1">{{ item.label }}</span>
            <span v-if="item.badge" :class="badgeClass(item.badge)">{{ item.badge }}</span>
          </router-link>

          <div v-else class="w-full">
            <button type="button" @click="toggle(item.key)" :class="submenuButtonClass(item)">
              <i :class="[item.iconType || 'fas', item.icon, 'link-icon']"></i>
              <span class="flex-1 text-left">{{ item.label }}</span>
              <i class="fas text-[9px]" :class="isOpen(item.key) ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            </button>

            <transition name="sub">
              <div
                v-if="isOpen(item.key)"
                class="mb-1 ml-2 space-y-0.5 border-l border-slate-200 pl-3"
              >
                <router-link
                  v-for="child in item.children"
                  :key="child.route"
                  :to="{ name: child.route }"
                  :class="subLinkClass(child)"
                >
                  <i :class="[child.iconType || 'fas', child.icon, 'w-3 text-[10px]']"></i>
                  <span class="flex-1">{{ child.label }}</span>
                  <span v-if="child.badge" :class="badgeClass(child.badge)">{{ child.badge }}</span>
                </router-link>
              </div>
            </transition>
          </div>
        </template>
      </template>
    </nav>

    <div class="shrink-0 border-t border-slate-100 px-3 py-3">
      <div class="flex items-center gap-3 rounded-xl bg-slate-50 px-2 py-2 transition-colors hover:bg-slate-100">
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          :class="isAdmin ? 'bg-primary' : 'bg-blue-600'"
        >
          <i class="fas text-xs text-white" :class="isAdmin ? 'fa-user-shield' : 'fa-user'"></i>
        </div>

        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-bold text-slate-800">{{ userName }}</p>
          <p class="text-[10px] text-slate-400">{{ isAdmin ? 'Administrator' : 'Member' }}</p>
        </div>

        <button
          type="button"
          @click="logout"
          title="Sign out"
          class="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-100 hover:text-red-500"
        >
          <i class="fas fa-sign-out-alt text-xs"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import adminLogo from "@/assets/img/logo1.jpg";
import userLogo from "@/assets/img/logo.jpg";

export default {
  name: "RedmitSidebar",

  data() {
    return {
      role: localStorage.getItem("role") || "USER",
      openMenus: [],

      adminNavigation: [
        {
          id: "admin-overview",
          spacing: false,
          items: [
            { key: "admin-dashboard", label: "Dashboard", route: "first-dash", icon: "fa-th-large" },
            { key: "admin-categories", label: "Categories", route: "Categories-view", icon: "fa-layer-group" },
            { key: "admin-bankAccounts", label: "Bank Accounts", route: "BankAccounts-view", icon: "fa-layer-group" },
            { key: "admin-opportunities", label: "Opportunities", route: "Opportunities-view", icon: "fa-layer-group" },
          ],
        },
        {
          id: "admin-marketplace",
          spacing: true,
          items: [
            { key: "products", label: "Digital Products", route: "Products-view", icon: "fa-box-open" },
            { key: "assets", label: "Digital Assets", route: "Assets-view", icon: "fa-exchange-alt" },
          ],
        },
        {
          id: "admin-services",
          spacing: true,
          items: [
            {
              key: "admin-pay-for-me",
              label: "Pay For Me",
              route: "Access-view",
              icon: "fa-hand-holding-usd",
              badge: "New",
            },
            {
              key: "admin-growth",
              label: "Channel Growth",
              route: "Growth-view",
              icon: "fa-chart-line",
            },
          ],
        },
        {
          id: "admin-administration",
          spacing: true,
          items: [
            { key: "admin-orders", label: "Orders", route: "Orders-view", icon: "fa-shopping-cart" },
            { key: "admin-payments", label: "Payments", route: "Payments-view", icon: "fa-credit-card" },
            { key: "admin-users", label: "Users", route: "Users-view", icon: "fa-users" },
            { key: "admin-news", label: "News & Updates", route: "News-view", icon: "fa-newspaper" },
            { key: "admin-messages", label: "Messages", route: "ContactMessage-view", icon: "fa-envelope" },
            { key: "admin-settings", label: "Settings", route: "Settings-view", icon: "fa-cog" },
          ],
        },
      ],

      userNavigation: [
        {
          id: "user-overview",
          spacing: false,
          items: [
            { key: "user-dashboard", label: "My Dashboard", route: "first-dash", icon: "fa-th-large" },
            { key: "user-profile", label: "My Profile", route: "Profile", icon: "fa-user-circle" },
          ],
        },
        {
          id: "user-buy-sell",
          spacing: true,
          items: [
            { key: "user-products", label: "Browse Products", route: "Products-view", icon: "fa-box-open" },
            { key: "user-add-product", label: "Sell a Product", route: "Products-add", icon: "fa-upload" },
            { key: "user-assets", label: "Browse Assets", route: "Assets-view", icon: "fa-exchange-alt" },
            { key: "user-add-asset", label: "Sell an Asset", route: "Assets-add", icon: "fa-tiktok", iconType: "fab" },
          ],
        },
        {
          id: "user-services",
          spacing: true,
          items: [
            {
              key: "user-pay-for-me",
              label: "Pay For Me",
              route: "Access-view",
              icon: "fa-hand-holding-usd",
              badge: "New",
            },
            {
              key: "user-growth",
              label: "Channel Growth",
              route: "Growth-view",
              icon: "fa-chart-line",
            },
          ],
        },
        {
          id: "user-activity",
          spacing: true,
          items: [
            { key: "user-orders", label: "My Orders", route: "Orders-view", icon: "fa-shopping-bag" },
            { key: "user-payments", label: "My Payments", route: "Payments-view", icon: "fa-receipt" },
          ],
        },
      ],
    };
  },

  computed: {
    userName() {
      return localStorage.getItem("fullName") || "User";
    },

    isAdmin() {
      return this.role === "ADMIN";
    },

    currentNavigation() {
      return this.isAdmin ? this.adminNavigation : this.userNavigation;
    },

    brandLogo() {
      return this.isAdmin ? adminLogo : userLogo;
    },
  },

  watch: {
    "$route.name": {
      immediate: true,
      handler(routeName) {
        this.openMenus = this.findOpenMenus(routeName);
      },
    },
  },

  methods: {
    findOpenMenus(routeName) {
      const open = [];

      this.currentNavigation.forEach((section) => {
        if (!section.items) return;

        section.items.forEach((item) => {
          if (item.type === "submenu" && Array.isArray(item.children)) {
            const found = item.children.some((child) => child.route === routeName);
            if (found) open.push(item.key);
          }
        });
      });

      return open;
    },

    toggle(key) {
      if (this.openMenus.includes(key)) {
        this.openMenus = this.openMenus.filter((item) => item !== key);
      } else {
        this.openMenus = [...this.openMenus, key];
      }
    },

    isOpen(key) {
      return this.openMenus.includes(key);
    },

    isRouteActive(routeName) {
      return this.$route.name === routeName;
    },

    linkClass(item) {
      const active = this.isRouteActive(item.route);
      const activeClass = this.isAdmin
        ? "bg-primary text-white shadow-sm"
        : "bg-blue-600 text-white shadow-sm";

      return [
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full cursor-pointer",
        active
          ? activeClass
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
      ];
    },

    submenuButtonClass(item) {
      const open = this.isOpen(item.key);

      return [
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full cursor-pointer",
        open
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
      ];
    },

    subLinkClass(item) {
      const active = this.isRouteActive(item.route);

      return [
        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",
        active
          ? this.isAdmin
            ? "bg-primary/5 font-bold text-primary"
            : "bg-blue-50 font-bold text-blue-600"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
      ];
    },

    badgeClass(badge) {
      if (badge === "New") {
        return this.isAdmin
          ? "ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-black text-white"
          : "ml-auto rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-black text-red-600";
      }

      return "ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500";
    },

    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.link-icon {
  @apply w-4 shrink-0 text-center text-sm text-slate-400;
}

.section-label {
  @apply px-2 pb-1 pt-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400;
}

.sub-enter-active,
.sub-leave-active {
  transition: all 0.15s ease;
}

.sub-enter-from,
.sub-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.2);
  border-radius: 10px;
}
</style>
