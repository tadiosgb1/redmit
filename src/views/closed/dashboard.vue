<template>
  <div class="flex h-screen font-sans overflow-hidden bg-slate-100">

    <!-- ════ SIDEBAR desktop ════ -->
    <aside class="hidden lg:flex flex-col h-full shrink-0 z-30 overflow-hidden"
           :class="isAdmin ? 'w-60' : 'w-56 border-r border-slate-200'">
      <Sidebar />
    </aside>

    <!-- ════ MOBILE overlay ════ -->
    <transition name="fade">
      <div v-if="showSidebar"
           class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
           @click="showSidebar = false"></div>
    </transition>
    <transition name="slide">
      <aside v-if="showSidebar"
             class="fixed left-0 top-0 h-full w-64 z-50 flex flex-col shadow-2xl lg:hidden bg-white">
        <div class="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          <img src="../../assets/img/logo.jpg" alt="Redmit" class="h-8 w-auto object-contain" />
          <button @click="showSidebar = false"
                  class="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition">
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <Sidebar />
        </div>
      </aside>
    </transition>

    <!-- ════ MAIN AREA ════ -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">

      <!-- Top bar — always white regardless of role -->
      <header class="h-14 flex items-center justify-between px-4 sm:px-6 shrink-0 bg-white border-b border-slate-200">

        <!-- Left -->
        <div class="flex items-center gap-3">
          <!-- hamburger (mobile) -->
          <button @click="showSidebar = true"
                  class="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 transition">
            <i class="fas fa-bars text-sm"></i>
          </button>
          <!-- mobile logo -->
          <img src="../../assets/img/logo.jpg" alt="Redmit"
               class="lg:hidden h-8 w-auto object-contain" />
          <!-- breadcrumb / title desktop -->
          <div class="hidden lg:flex items-center gap-2">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Redmit</span>
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              {{ isAdmin ? 'Admin Panel' : 'My Account' }}
            </span>
          </div>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-1">

          <!-- Notification bell -->
          <div class="relative" @click.stop="notifOpen = !notifOpen">
            <button class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 transition relative">
              <i class="fas fa-bell text-sm"></i>
              <span v-if="notifications.length"
                    class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <transition name="drop">
              <div v-if="notifOpen"
                   class="absolute right-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
                <div class="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <span class="text-xs font-black text-slate-700 uppercase tracking-wider">Notifications</span>
                  <span class="text-[10px] font-bold text-blue-600">{{ notifications.length }} new</span>
                </div>
                <ul class="max-h-64 overflow-y-auto">
                  <li v-for="n in notifications" :key="n.id"
                      class="px-4 py-3 hover:bg-slate-50 text-xs text-slate-600 border-b border-slate-50 last:border-0 cursor-pointer">
                    {{ n.message }}
                  </li>
                  <li v-if="!notifications.length" class="px-4 py-10 text-center">
                    <i class="fas fa-check-circle text-3xl text-slate-200 block mb-2"></i>
                    <p class="text-xs text-slate-400 font-semibold">All caught up!</p>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <!-- Divider -->
          <div class="w-px h-5 mx-1 bg-slate-200"></div>

          <!-- Profile menu -->
          <div class="relative" @click.stop="profileOpen = !profileOpen">
            <button class="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer">
              <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-black text-sm text-white"
                   :class="isAdmin ? 'bg-primary' : 'bg-blue-600'">
                {{ displayName.charAt(0).toUpperCase() }}
              </div>
              <div class="hidden sm:block text-left">
                <p class="text-xs font-bold leading-none text-slate-800">{{ displayName }}</p>
                <p class="text-[10px] mt-0.5 capitalize text-slate-400">
                  {{ isAdmin ? 'Administrator' : 'Member' }}
                </p>
              </div>
              <i class="fas fa-chevron-down text-[9px] text-slate-400 hidden sm:block"></i>
            </button>

            <transition name="drop">
              <div v-if="profileOpen"
                   class="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-1.5 overflow-hidden">
                <!-- User info header -->
                <div class="px-3 py-2.5 mb-1 border-b border-slate-100">
                  <p class="text-xs font-black text-slate-800">{{ displayName }}</p>
                  <p class="text-[10px] text-slate-400 capitalize mt-0.5">{{ isAdmin ? 'Administrator' : 'Member' }}</p>
                </div>
                <button @click="goToProfile"
                        class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-slate-50 text-sm text-slate-700 transition text-left">
                  <i class="fas fa-user-circle text-slate-400 text-xs w-4 text-center"></i>
                  My Profile
                </button>
                <button @click="showChangePwd = true"
                        class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-slate-50 text-sm text-slate-700 transition text-left">
                  <i class="fas fa-key text-slate-400 text-xs w-4 text-center"></i>
                  Change Password
                </button>
                <div class="h-px bg-slate-100 my-1 mx-1"></div>
                <button @click="logout"
                        class="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-red-50 text-sm text-red-500 transition text-left">
                  <i class="fas fa-sign-out-alt text-xs w-4 text-center"></i>
                  Sign Out
                </button>
              </div>
            </transition>
          </div>

        </div>
      </header>

      <!-- ── Page content — always light ── -->
      <main class="flex-1 overflow-y-auto bg-slate-100">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

    </div>

    <ChangePasswordModal v-if="showChangePwd" @close="showChangePwd = false" />
  </div>
</template>

<script>
import Sidebar             from '@/components/layouts/leftSidevar.vue';
import ChangePasswordModal from '@/components/ChangePasswordModal.vue';

export default {
  name: 'DashboardLayout',
  components: { Sidebar, ChangePasswordModal },

  computed: {
    isAdmin()     { return (localStorage.getItem('role') || '') === 'admin'; },
    displayName() { return localStorage.getItem('name') || 'User'; },
    userRole()    { return localStorage.getItem('role') || 'user'; },
  },

  data() {
    return {
      showSidebar:   false,
      notifOpen:     false,
      profileOpen:   false,
      showChangePwd: false,
      notifications: [],
    };
  },

  mounted() {
    document.addEventListener('click', this.closeDropdowns);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeDropdowns);
  },

  methods: {
    closeDropdowns() {
      this.notifOpen   = false;
      this.profileOpen = false;
    },
    goToProfile() {
      this.profileOpen = false;
      this.$router.push({ name: 'Profile' });
    },
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* Page transition */
.page-enter-active, .page-leave-active { transition: opacity .12s ease, transform .12s ease; }
.page-enter-from, .page-leave-to       { opacity: 0; transform: translateY(6px); }

/* Fade overlay */
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

/* Sidebar slide */
.slide-enter-active, .slide-leave-active { transition: transform .25s cubic-bezier(.16,1,.3,1); }
.slide-enter-from, .slide-leave-to       { transform: translateX(-100%); }

/* Dropdown */
.drop-enter-active, .drop-leave-active { transition: opacity .12s ease, transform .12s ease; }
.drop-enter-from, .drop-leave-to       { opacity: 0; transform: translateY(-6px); }
</style>
