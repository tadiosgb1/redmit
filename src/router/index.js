import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/opened/landing/Home.vue';
import About from '../views/opened/landing/about.vue';
import NewsEvents from '../views/opened/landing/NewsEvents.vue';
import ContactPage from '../views/opened/landing/contactUs.vue';
import OpportunitiesPage from '../views/opened/landing/Opportunities.vue';
import ProductsPage from '../views/opened/landing/Products.vue';
import AssetsPage from '../views/opened/landing/Assets.vue';
import Login from '../views/opened/landing/auth/Login.vue';
import Register from '../views/opened/landing/auth/Register.vue';
import ForgotPassword from '../views/opened/auth/forgotPassword.vue';
import Reset from '../views/opened/auth/reset.vue';
import AccessDenied from '../views/opened/auth/accessDenied.vue';
import Dashboard from '../views/closed/dashboard.vue';
import FirstDash from '../views/closed/first_dash.vue';

const routes = [
  { path: '/', name: 'home', component: Home, meta: { requiresGuest: true } },
  { path: '/about', name: 'about', component: About, meta: { requiresGuest: true } },
  { path: '/news-events', name: 'news-events', component: NewsEvents, meta: { requiresGuest: true } },
  { path: '/contact', name: 'contact', component: ContactPage, meta: { requiresGuest: true } },
  { path: '/contact-us', name: 'contact-us', component: ContactPage, meta: { requiresGuest: true } },
  { path: '/opportunities', name: 'opportunities', component: OpportunitiesPage, meta: { requiresGuest: true } },
  { path: '/products', name: 'products', component: ProductsPage, meta: { requiresGuest: true } },
  { path: '/assets', name: 'assets', component: AssetsPage, meta: { requiresGuest: true } },
  { path: '/login', name: 'login', component: Login, meta: { requiresGuest: true } },
  { path: '/register', name: 'register', component: Register, meta: { requiresGuest: true } },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPassword },
  { path: '/reset/:token', name: 'reset', component: Reset },
  { path: '/dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true }, redirect: '/dashboard/overview',
    children: [
      { path: 'overview', name: 'first-dash', component: FirstDash },
      { path: 'first-dash', name: 'first-dash-legacy', redirect: { name: 'first-dash' } },
      { path: 'profile', name: 'Profile', component: () => import('../views/closed/Profile.vue') },
      { path: 'products', name: 'Products-view', component: () => import('../views/closed/products/ProductsView.vue') },
      { path: "/products/:id", name: "Products-detail", component: () => import("@/views/closed/products/ProductDetails.vue"), props: true },
      { path: 'products/add', name: 'Products-add', component: () => import('../views/closed/products/ProductsView.vue') },
      { path: 'products/categories', name: 'Categories-view', component: () => import('../views/closed/products/ProductsView.vue') },
      { path: 'access', name: 'Access-view', component: () => import('../views/closed/Access/ViewAccess.vue') },
      { path: "/access/:id", name: "Access-detail", component: () => import("@/views/closed/Access/DetailAccess.vue"), props: true },
      { path: 'access/add', name: 'Assets-add', component: () => import('../views/closed/AssetsView.vue') },
      { path: 'pay-for-me', name: 'PayForMe-view', component: () => import('../views/closed/PayForMeView.vue') },
      { path: 'assets', name: 'Assets-view', component: () => import('../views/closed/Assets/ViewAsset.vue') },
      { path: "/assets/:id", name: "Assets-detail", component: () => import("@/views/closed/Assets/DetailAsset.vue"), props: true },
      { path: 'bank-accounts', name: 'BankAccounts-view', component: () => import('../views/closed/BankAccounts/ViewBankAccount.vue') },
      { path: "/bank-accounts/:id", name: "BankAccount-detail", component: () => import("@/views/closed/BankAccounts/DetailBankAccount.vue"), props: true },
      { path: 'opportunities', name: 'Opportunities-view', component: () => import('../views/closed/Opportunities/ViewOpportunities.vue') },
      { path: "/opportunities/:id", name: "Opportunity-detail", component: () => import("@/views/closed/Opportunities/DetailOpportunities.vue"), props: true },
      { path: 'growth', name: 'Growth-view', component: () => import('../views/closed/GrowthView.vue') },
      { path: 'monetization', name: 'Monetization-view', component: () => import('../views/closed/MonetizationView.vue') },
      { path: 'orders', name: 'Orders-view', component: () => import('../views/closed/OrdersView.vue') },
      { path: 'payments', name: 'Payments-view', component: () => import('../views/closed/PaymentsView.vue') },
      { path: 'settings', name: 'Settings-view', component: () => import('../views/closed/SettingsView.vue') },
      { path: 'users', name: 'Users-view', component: () => import('../views/closed/users/UsersView.vue') },
      { path: 'categories', name: 'Categories-view', component: () => import('../views/closed/Categories/ViewCategories.vue') },
      { path: 'users/add', name: 'Users-add', component: () => import('../views/closed/users/AddUsers.vue') },
      { path: 'users/detail/:id', name: 'Users-detail', component: () => import('../views/closed/users/UsersDetail.vue'), props: true },
      { path: 'news', name: 'News-view', component: () => import('../views/closed/News/NewsView.vue') },
      { path: 'news/add', name: 'News-add', component: () => import('../views/closed/News/AddNews.vue') },
      { path: 'messages', name: 'ContactMessage-view', component: () => import('../views/closed/ContactMessage/ContactMessageView.vue') },
    ],
  },
  { path: '/:pathMatch(.*)*', name: 'accessDenied', component: AccessDenied },
];

const router = createRouter({ history: createWebHistory(), routes, scrollBehavior(_to, _from, savedPosition) { return savedPosition || { top: 0 }; } });
router.beforeEach((to, _from, next) => { const isAuthenticated = !!localStorage.getItem('token'); const requiresAuth = to.matched.some(r => r.meta.requiresAuth); if (requiresAuth && !isAuthenticated) next('/login'); else next(); });
export default router;
