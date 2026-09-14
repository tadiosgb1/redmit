
<template>
  <div class="flex h-full flex-col border-r border-slate-200 bg-white">

    <!-- ========================================================= -->
    <!-- BRAND HEADER -->
    <!-- ========================================================= -->
    <div
      class="shrink-0 border-b border-slate-100 px-5 pt-5 pb-3"
    >
      <div class="flex items-center gap-2.5">

        <img
          :src="brandLogo"
          alt="Redmit"
          class="h-8 w-auto object-contain"
        />

        <!-- User Brand Text -->
        <div v-if="!isAdmin">
          <p
            class="text-sm font-black leading-none text-slate-900"
          >
            Redmit
          </p>

          <p
            class="mt-0.5 text-[10px] uppercase tracking-wider text-slate-400"
          >
            My Account
          </p>
        </div>

      </div>
    </div>

    <!-- ========================================================= -->
    <!-- NAVIGATION -->
    <!-- ========================================================= -->
    <nav
      class="custom-scrollbar flex-1 overflow-y-auto px-3 py-3"
    >

      <!-- ======================================================= -->
      <!-- SECTIONS -->
      <!-- ======================================================= -->
      <template
        v-for="section in currentNavigation"
        :key="section.id"
      >

        <!-- Section Label -->
        <p
          class="section-label"
          :class="{
            'mt-4': section.spacing
          }"
        >
          {{ section.label }}
        </p>

        <!-- ===================================================== -->
        <!-- SECTION ITEMS -->
        <!-- ===================================================== -->
        <template
          v-for="item in section.items"
          :key="item.key || item.route"
        >

          <!-- =================================================== -->
          <!-- NORMAL LINK -->
          <!-- =================================================== -->
          <router-link
            v-if="item.type !== 'submenu'"
            :to="{ name: item.route }"
            :class="linkClass(item)"
          >

            <!-- Icon -->
            <i
              :class="[
                item.iconType || 'fas',
                item.icon,
                'link-icon'
              ]"
            ></i>

            <!-- Label -->
            <span class="flex-1">
              {{ item.label }}
            </span>

            <!-- Badge -->
            <span
              v-if="item.badge"
              :class="badgeClass(item.badge)"
            >
              {{ item.badge }}
            </span>

          </router-link>


          <!-- =================================================== -->
          <!-- SUBMENU -->
          <!-- =================================================== -->
          <div
            v-else
            class="w-full"
          >

            <!-- Submenu Button -->
            <button
              type="button"
              @click="toggle(item.key)"
              :class="submenuButtonClass(item)"
            >

              <!-- Icon -->
              <i
                :class="[
                  item.iconType || 'fas',
                  item.icon,
                  'link-icon'
                ]"
              ></i>

              <!-- Label -->
              <span class="flex-1 text-left">
                {{ item.label }}
              </span>

              <!-- Arrow -->
              <i
                class="fas text-[9px]"
                :class="
                  isOpen(item.key)
                    ? 'fa-chevron-up'
                    : 'fa-chevron-down'
                "
              ></i>

            </button>


            <!-- ================================================= -->
            <!-- SUBMENU CHILDREN -->
            <!-- ================================================= -->
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

                  <!-- Child Icon -->
                  <i
                    :class="[
                      child.iconType || 'fas',
                      child.icon,
                      'w-3 text-[10px]'
                    ]"
                  ></i>

                  <!-- Child Label -->
                  <span class="flex-1">
                    {{ child.label }}
                  </span>

                  <!-- Child Badge -->
                  <span
                    v-if="child.badge"
                    :class="badgeClass(child.badge)"
                  >
                    {{ child.badge }}
                  </span>

                </router-link>

              </div>

            </transition>

          </div>

        </template>

      </template>

    </nav>


    <!-- ========================================================= -->
    <!-- USER FOOTER -->
    <!-- ========================================================= -->
    <div
      class="shrink-0 border-t border-slate-100 px-3 py-3"
    >

      <div
        class="flex items-center gap-3 rounded-xl bg-slate-50 px-2 py-2 transition-colors hover:bg-slate-100"
      >

        <!-- Avatar -->
        <div
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          :class="
            isAdmin
              ? 'bg-primary'
              : 'bg-blue-600'
          "
        >

          <i
            class="fas text-xs text-white"
            :class="
              isAdmin
                ? 'fa-user-shield'
                : 'fa-user'
            "
          ></i>

        </div>


        <!-- User Information -->
        <div class="min-w-0 flex-1">

          <p
            class="truncate text-xs font-bold text-slate-800"
          >
            {{ userName }}
          </p>

          <p
            class="text-[10px] text-slate-400"
          >
            {{ isAdmin ? 'Administrator' : 'Member' }}
          </p>

        </div>


        <!-- Logout -->
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

            {
              key: "admin-dashboard",

              label: "Dashboard",

              route: "first-dash",

              icon: "fa-th-large",
            },

            {
              key: "admin-categories",

              label: "Categories",

              route: "Categories-view",

              icon: "fa-layer-group",
            },

              {
              key: "admin-bankAccounts",

              label: "Bank Accounts",

              route: "BankAccounts-view",

              icon: "fa-layer-group",
            },
              {
              key: "admin-opportunities",

              label: "Opportunities",

              route: "Opportunities-view",

              icon: "fa-layer-group",
            },
          ],
        },


        // =======================================================
        // MARKETPLACE
        // =======================================================
        {
          id: "admin-marketplace",

         

          spacing: true,

          items: [

            // ---------------------------------------------------
            // Digital Products
            // ---------------------------------------------------
            {
              type: "submenu",

              key: "products",

              label: "Digital Products",

              icon: "fa-box-open",

              children: [

                {
                  label: "All Products",

                  route: "Products-view",

                  icon: "fa-list",
                },

                {
                  label: "Add Product",

                  route: "Products-add",

                  icon: "fa-plus",
                },

              ],
            },


            // ---------------------------------------------------
            // Digital Assets
            // ---------------------------------------------------
            {
              type: "submenu",

              key: "assets",

            label: "Digital Assets",

              icon: "fa-exchange-alt",

              children: [

                {
                  label: "All Listings",

                  route: "Assets-view",

                  icon: "fa-list",
                },

                {
                  label: "Add Listing",

                  route: "Assets-add",

                  icon: "fa-plus",
                },

              ],
            },

          ],
        },


        // =======================================================
        // SERVICES
        // =======================================================
        {
          id: "admin-services",

        

          spacing: true,

          items: [

            {
              key: "admin-pay-for-me",

              label: "Pay For Me",

              route: "PayForMe-view",

              icon: "fa-hand-holding-usd",

              badge: "New",
            },

            {
              key: "admin-access",

              label: "Digital Access",

              route: "Access-view",

              icon: "fa-key",
            },

            {
              key: "admin-growth",

              label: "Advertising",

              route: "Growth-view",

              icon: "fa-chart-line",
            },

            {
              key: "admin-monetization",

              label: "Monetization",

              route: "Monetization-view",

              icon: "fa-youtube",

              iconType: "fab",
            },

          ],
        },


     
        {
          id: "admin-administration",


          spacing: true,

          items: [

            {
              key: "admin-orders",

              label: "Orders",

              route: "Orders-view",

              icon: "fa-shopping-cart",
            },

            {
              key: "admin-payments",

              label: "Payments",

              route: "Payments-view",

              icon: "fa-credit-card",
            },

            {
              key: "admin-users",

              label: "Users",

              route: "Users-view",

              icon: "fa-users",
            },

            {
              key: "admin-news",

              label: "News & Updates",

              route: "News-view",

              icon: "fa-newspaper",
            },

            {
              key: "admin-messages",

              label: "Messages",

              route: "ContactMessage-view",

              icon: "fa-envelope",
            },

            {
              key: "admin-settings",

              label: "Settings",

              route: "Settings-view",

              icon: "fa-cog",
            },

          ],
        },

      ],


      /*
       * =========================================================
       * USER NAVIGATION
       * =========================================================
       */
      userNavigation: [

        // =======================================================
        // OVERVIEW
        // =======================================================
        {
          id: "user-overview",

        

          spacing: false,

          items: [

            {
              key: "user-dashboard",

              label: "My Dashboard",

              route: "first-dash",

              icon: "fa-th-large",
            },

            {
              key: "user-profile",

              label: "My Profile",

              route: "Profile",

              icon: "fa-user-circle",
            },

          ],
        },


        // =======================================================
        // BUY & SELL
        // =======================================================
        {
          id: "user-buy-sell",

          

          spacing: true,

          items: [

            {
              key: "user-products",

              label: "Browse Products",

              route: "Products-view",

              icon: "fa-box-open",
            },

            {
              key: "user-add-product",

              label: "Sell a Product",

              route: "Products-add",

              icon: "fa-upload",
            },

            {
              key: "user-assets",

              label: "Browse Assets",

              route: "Assets-view",

              icon: "fa-exchange-alt",
            },

            {
              key: "user-add-asset",

              label: "Sell an Asset",

              route: "Assets-add",

              icon: "fa-tiktok",

              iconType: "fab",
            },

          ],
        },


        // =======================================================
        // SERVICES
        // =======================================================
        {
          id: "user-services",


          spacing: true,

          items: [

            {
              key: "user-pay-for-me",

              label: "Pay For Me",

              route: "PayForMe-view",

              icon: "fa-hand-holding-usd",

              badge: "New",
            },

            {
              key: "user-growth",

              label: "Run Ads",

              route: "Growth-view",

              icon: "fa-bullhorn",
            },

            {
              key: "user-monetization",

              label: "Monetize My Channel",

              route: "Monetization-view",

              icon: "fa-youtube",

              iconType: "fab",
            },

          ],
        },


        // =======================================================
        // MY ACTIVITY
        // =======================================================
        {
          id: "user-activity",

      

          spacing: true,

          items: [

            {
              key: "user-orders",

              label: "My Orders",

              route: "Orders-view",

              icon: "fa-shopping-bag",
            },

            {
              key: "user-payments",

              label: "My Payments",

              route: "Payments-view",

              icon: "fa-receipt",
            },

          ],
        },

      ],
    };
  },


  /*
   * =============================================================
   * COMPUTED
   * =============================================================
   */
  computed: {

    /*
     * -----------------------------------------------------------
     * USER NAME
     * -----------------------------------------------------------
     */
    userName() {
      return (
        localStorage.getItem("fullName") ||
        "User"
      );
    },


    /*
     * -----------------------------------------------------------
     * CHECK ADMIN
     * -----------------------------------------------------------
     */
    isAdmin() {
      return this.role === "ADMIN";
    },


    /*
     * -----------------------------------------------------------
     * CURRENT NAVIGATION
     * -----------------------------------------------------------
     *
     * ADMIN -> adminNavigation
     *
     * USER -> userNavigation
     */
    currentNavigation() {
      return this.isAdmin
        ? this.adminNavigation
        : this.userNavigation;
    },


    /*
     * -----------------------------------------------------------
     * CURRENT LOGO
     * -----------------------------------------------------------
     */
    brandLogo() {
      return this.isAdmin
        ? adminLogo
        : userLogo;
    },

  },


  /*
   * =============================================================
   * WATCHERS
   * =============================================================
   */
  watch: {

    /*
     * Automatically open the submenu when the
     * current route belongs to that submenu.
     */
    "$route.name": {

      immediate: true,

      handler(routeName) {
        this.openMenus =
          this.findOpenMenus(routeName);
      },

    },

  },


  /*
   * =============================================================
   * METHODS
   * =============================================================
   */
  methods: {

    /*
     * ===========================================================
     * FIND SUBMENUS FOR CURRENT ROUTE
     * ===========================================================
     */
    findOpenMenus(routeName) {

      const open = [];

      this.currentNavigation.forEach(
        (section) => {

          if (!section.items) {
            return;
          }

          section.items.forEach(
            (item) => {

              if (
                item.type === "submenu" &&
                Array.isArray(item.children)
              ) {

                const found =
                  item.children.some(
                    (child) =>
                      child.route === routeName
                  );

                if (found) {
                  open.push(item.key);
                }

              }

            }
          );

        }
      );

      return open;
    },


    /*
     * ===========================================================
     * TOGGLE SUBMENU
     * ===========================================================
     */
    toggle(key) {

      if (
        this.openMenus.includes(key)
      ) {

        this.openMenus =
          this.openMenus.filter(
            (item) => item !== key
          );

      } else {

        this.openMenus = [
          ...this.openMenus,
          key,
        ];

      }
    },


    /*
     * ===========================================================
     * CHECK IF SUBMENU IS OPEN
     * ===========================================================
     */
    isOpen(key) {
      return this.openMenus.includes(key);
    },


    /*
     * ===========================================================
     * CHECK ACTIVE ROUTE
     * ===========================================================
     */
    isRouteActive(routeName) {

      return (
        this.$route.name === routeName
      );

    },


    /*
     * ===========================================================
     * NORMAL LINK CLASS
     * ===========================================================
     */
    linkClass(item) {

      const active =
        this.isRouteActive(
          item.route
        );

      const activeClass =
        this.isAdmin
          ? "bg-primary text-white shadow-sm"
          : "bg-blue-600 text-white shadow-sm";

      return [

        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full cursor-pointer",

        active
          ? activeClass
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",

      ];

    },


    /*
     * ===========================================================
     * SUBMENU BUTTON CLASS
     * ===========================================================
     */
    submenuButtonClass(item) {

      const open =
        this.isOpen(item.key);

      return [

        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 w-full cursor-pointer",

        open
          ? "bg-slate-100 text-slate-900"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",

      ];

    },


    /*
     * ===========================================================
     * SUBMENU LINK CLASS
     * ===========================================================
     */
    subLinkClass(item) {

      const active =
        this.isRouteActive(
          item.route
        );

      return [

        "flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer",

        active

          ? this.isAdmin
            ? "bg-primary/5 font-bold text-primary"
            : "bg-blue-50 font-bold text-blue-600"

          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",

      ];

    },


    /*
     * ===========================================================
     * BADGE CLASS
     * ===========================================================
     */
    badgeClass(badge) {

      if (badge === "New") {

        return this.isAdmin

          ? "ml-auto rounded-full bg-red-500 px-1.5 py-0.5 text-[9px] font-black text-white"

          : "ml-auto rounded-full bg-red-100 px-1.5 py-0.5 text-[9px] font-black text-red-600";

      }

      return "ml-auto rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500";

    },


    /*
     * ===========================================================
     * LOGOUT
     * ===========================================================
     */
    logout() {

      localStorage.clear();

      this.$router.push("/");

    },

  },
};
</script>


<style scoped>
/*
 * =============================================================
 * NAVIGATION ICON
 * =============================================================
 */
.link-icon {
  @apply w-4 shrink-0 text-center text-sm text-slate-400;
}


/*
 * =============================================================
 * SECTION LABEL
 * =============================================================
 */
.section-label {
  @apply px-2 pb-1 pt-1 text-[9px] font-black uppercase tracking-[0.18em] text-slate-400;
}


/*
 * =============================================================
 * SUBMENU ANIMATION
 * =============================================================
 */
.sub-enter-active,
.sub-leave-active {
  transition: all 0.15s ease;
}

.sub-enter-from,
.sub-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}


/*
 * =============================================================
 * CUSTOM SCROLLBAR
 * =============================================================
 */
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.2);
  border-radius: 10px;
}
</style>
