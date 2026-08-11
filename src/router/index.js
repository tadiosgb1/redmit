import { createRouter, createWebHistory } from "vue-router";

// ── Landing ──────────────────────────────────────────────────
import Home         from '../views/opened/landing/Home.vue';
import About        from '../views/opened/landing/about.vue';
import NewsEvents   from '../views/opened/landing/NewsEvents.vue';
import ContactPage  from '../views/opened/landing/contactUs.vue';

// ── Auth (full pages under landing/auth) ─────────────────────
import Login        from '../views/opened/landing/auth/Login.vue';
import Register     from '../views/opened/landing/auth/Register.vue';
import ForgotPassword from '../views/opened/auth/forgotPassword.vue';
import Reset        from '../views/opened/auth/reset.vue';
import AccessDenied from '../views/opened/auth/accessDenied.vue';

// ── Dashboard shell + overview ───────────────────────────────
import Dashboard    from '../views/closed/dashboard.vue';
import FirstDash    from '../views/closed/first_dash.vue';

const routes = [
  // ── Public ──────────────────────────────────────────────────
  { path: '/',               name: 'home',         component: Home,          meta: { requiresGuest: true } },
  { path: '/about',          name: 'about',        component: About,         meta: { requiresGuest: true } },
  { path: '/news-events',    name: 'news-events',  component: NewsEvents,    meta: { requiresGuest: true } },
  { path: '/contact',        name: 'contact',      component: ContactPage,   meta: { requiresGuest: true } },

  // ── Auth ────────────────────────────────────────────────────
  { path: '/login',          name: 'login',        component: Login,         meta: { requiresGuest: true } },
  { path: '/register',       name: 'register',     component: Register,      meta: { requiresGuest: true } },
  { path: '/forgot-password',name: 'ForgotPassword',component: ForgotPassword },
  { path: '/reset/:token',   name: 'reset',        component: Reset },

  // ── Dashboard ───────────────────────────────────────────────
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    redirect: '/dashboard/overview',
    children: [
      // Overview — accessible via both /dashboard/overview AND /dashboard/first-dash
      { path: 'overview',   name: 'first-dash', component: FirstDash },
      { path: 'first-dash', name: 'first-dash-legacy', redirect: { name: 'first-dash' } },
      { path: 'profile',    name: 'Profile',    component: () => import('../views/closed/Profile.vue') },

      // Marketplace
      { path: 'products',            name: 'Products-view',    component: () => import('../views/closed/ProductsView.vue') },
      { path: 'products/add',        name: 'Products-add',     component: () => import('../views/closed/ProductsView.vue') },
      { path: 'products/categories', name: 'Categories-view',  component: () => import('../views/closed/ProductsView.vue') },
      { path: 'assets',              name: 'Assets-view',      component: () => import('../views/closed/AssetsView.vue') },
      { path: 'assets/add',          name: 'Assets-add',       component: () => import('../views/closed/AssetsView.vue') },

      // Services
      { path: 'pay-for-me',    name: 'PayForMe-view',      component: () => import('../views/closed/PayForMeView.vue') },
      { path: 'access',        name: 'Access-view',        component: () => import('../views/closed/PayForMeView.vue') },
      { path: 'growth',        name: 'Growth-view',        component: () => import('../views/closed/GrowthView.vue') },
      { path: 'monetization',  name: 'Monetization-view',  component: () => import('../views/closed/MonetizationView.vue') },

      // Core pages
      { path: 'orders',        name: 'Orders-view',        component: () => import('../views/closed/OrdersView.vue') },
      { path: 'payments',      name: 'Payments-view',      component: () => import('../views/closed/PaymentsView.vue') },
      { path: 'settings',      name: 'Settings-view',      component: () => import('../views/closed/SettingsView.vue') },

      // Admin only
      { path: 'users',         name: 'Users-view',         component: () => import('../views/closed/users/UsersView.vue') },
      { path: 'users/add',     name: 'Users-add',          component: () => import('../views/closed/users/AddUsers.vue') },
      { path: 'news',          name: 'News-view',          component: () => import('../views/closed/News/NewsView.vue') },
      { path: 'news/add',      name: 'News-add',           component: () => import('../views/closed/News/AddNews.vue') },
      { path: 'messages',      name: 'ContactMessage-view',component: () => import('../views/closed/ContactMessage/ContactMessageView.vue') },
    ],
  },

  // ── Fallback ─────────────────────────────────────────────────
  { path: '/:pathMatch(.*)*', name: 'accessDenied', component: AccessDenied },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const requiresAuth    = to.matched.some(r => r.meta.requiresAuth);
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
