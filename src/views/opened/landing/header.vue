<template>
  <header class="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-slate-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2 group shrink-0">
        <img src="@/assets/img/logo.jpg" alt="Redmit" class="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
      </router-link>

      <nav class="hidden lg:flex items-center gap-0.5">
        <router-link v-for="nav in navLinks" :key="nav.path" :to="nav.path"
          class="px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:text-primary hover:bg-primary-lighter rounded-lg transition-all"
          active-class="text-primary bg-primary-lighter">
          {{ nav.name }}
        </router-link>

        <div class="relative" @mouseenter="servicesOpen = true" @mouseleave="servicesOpen = false">
          <button class="px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:text-primary hover:bg-primary-lighter rounded-lg transition-all flex items-center gap-1.5">
            Services
            <i class="fas fa-chevron-down text-[9px] transition-transform duration-200" :class="servicesOpen ? 'rotate-180' : ''"></i>
          </button>
          <transition name="dropdown">
            <div v-if="servicesOpen" class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden z-50 py-2">
              <router-link v-for="s in serviceLinks" :key="s.label" :to="s.path" @click="servicesOpen = false" class="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors group">
                <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" :class="s.bg"><i :class="[s.icon, s.color, 'text-sm']"></i></div>
                <div><p class="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors">{{ s.label }}</p><p class="text-[10px] text-slate-400">{{ s.desc }}</p></div>
              </router-link>
            </div>
          </transition>
        </div>
      </nav>

      <div class="hidden md:flex items-center gap-3 shrink-0">
        <router-link to="/login" class="px-5 py-2 text-xs font-bold text-slate-700 border border-slate-200 rounded-lg hover:border-primary hover:text-primary hover:bg-primary-lighter transition-all uppercase tracking-wider">Sign In</router-link>
        <router-link to="/register" class="px-5 py-2 text-xs font-bold text-white bg-secondary hover:bg-secondary-dark rounded-xl shadow shadow-secondary/30 transition uppercase tracking-wider">Get Started</router-link>
      </div>

      <button @click="mobileOpen = !mobileOpen" class="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-600" :class="mobileOpen ? 'bg-primary-lighter text-primary' : 'bg-slate-100'">
        <i :class="mobileOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-sm"></i>
      </button>
    </div>

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
      <div v-if="mobileOpen" class="lg:hidden bg-white border-t border-slate-100 px-4 pb-5 pt-2 shadow-lg">
        <nav class="space-y-1 mb-4">
          <router-link v-for="nav in navLinks" :key="nav.path" :to="nav.path" @click="mobileOpen = false" class="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:text-primary hover:bg-primary-lighter transition">
            {{ nav.name }} <i class="fas fa-chevron-right text-[10px] text-slate-300"></i>
          </router-link>
          <div class="px-4 pt-2">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Services</p>
            <div class="grid grid-cols-2 gap-2">
              <router-link v-for="s in serviceLinks" :key="s.label" :to="s.path" @click="mobileOpen = false" class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition">
                <i :class="[s.icon, s.color, 'text-xs']"></i><span class="text-xs font-semibold text-slate-700">{{ s.label }}</span>
              </router-link>
            </div>
          </div>
        </nav>
        <div class="flex flex-col gap-2 pt-3 border-t border-slate-100">
          <router-link to="/login" @click="mobileOpen = false" class="w-full py-3 text-center text-sm font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 transition">Sign In</router-link>
          <router-link to="/register" @click="mobileOpen = false" class="w-full py-3 text-center text-sm font-bold text-white bg-secondary hover:bg-secondary-dark rounded-xl transition">Get Started Free</router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
  data() {
    return {
      mobileOpen: false,
      servicesOpen: false,
      navLinks: [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Opportunities', path: '/opportunities' },
        { name: 'News', path: '/news-events' },
        { name: 'Contact', path: '/contact-us' },
      ],
      serviceLinks: [
        { label: 'Digital Products', desc: 'Buy & sell downloads', path: '/products', icon: 'fas fa-box-open', bg: 'bg-blue-50', color: 'text-blue-600' },
        { label: 'Social Media Marketing', desc: 'Grow your social presence', path: '/assets', icon: 'fas fa-bullhorn', bg: 'bg-indigo-50', color: 'text-indigo-600' },
      ],
    };
  },
  watch: {
    $route() { this.mobileOpen = false; },
  },
};
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: all .18s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px) translateX(-50%); }
.dropdown-enter-to, .dropdown-leave-from { opacity: 1; transform: translateY(0) translateX(-50%); }
</style>
