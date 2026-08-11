<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    <Header @open-login="showLogin = true" @open-register="showRegister = true" />

    <!-- Hero -->
    <section class="relative overflow-hidden pt-16" style="background:#1e3a8a">
      <!-- Subtle diagonal split -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-1/2 h-full opacity-30"
             style="background:linear-gradient(135deg,transparent 0%,#1d4ed8 100%)"></div>
      </div>

      <!-- Faint dot grid -->
      <div class="absolute inset-0 opacity-[0.06] pointer-events-none"
           style="background-image:radial-gradient(#fff 1px,transparent 1px);background-size:32px 32px"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div class="max-w-4xl mx-auto text-center">
          <!-- Eyebrow -->
          <div class="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5
                      bg-white/10 border border-white/20 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span class="text-[11px] font-bold text-white/80 uppercase tracking-[0.18em]">
              About Redmit
            </span>
          </div>

          <!-- Headline -->
          <h1 class="text-5xl sm:text-6xl font-black text-white leading-[1.08] mb-6 tracking-tight">
            Ethiopia's Digital<br/>
            <span class="text-red-400">Marketplace</span>
          </h1>

          <!-- Sub -->
          <p class="text-blue-200 text-lg leading-relaxed max-w-3xl mx-auto">
            Redmit is a unified digital economy platform designed to help users buy, sell, access, and grow within the digital economy — starting with four focused core services.
          </p>
        </div>
      </div>

      <!-- Bottom wave separator -->
      <div class="relative z-10">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg"
             class="w-full block -mb-px" preserveAspectRatio="none" style="height:56px">
          <path d="M0 56 C360 0 1080 0 1440 56 L1440 56 L0 56Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Mission -->
    <section class="py-20 bg-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[90px] pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Our Mission</span>
          <h2 class="text-3xl font-black text-gray-900 mt-3 mb-6 leading-tight">
            A focused digital economy platform for Ethiopia
          </h2>
          <p class="text-gray-500 leading-relaxed mb-4 text-sm">
            Redmit Market launches with four core services — Digital Products, Digital Assets, Digital Access, and Digital Growth — covering the most essential digital economy needs for Ethiopian users, creators, and businesses.
          </p>
          <p class="text-gray-500 leading-relaxed mb-4 text-sm">
            Rather than building everything at once, Redmit starts focused: validate demand, build trust, and grow. Every feature is designed to work together through a shared infrastructure of users, orders, payments, and notifications.
          </p>
          <p class="text-gray-500 leading-relaxed text-sm">
            <strong class="text-gray-700">CREATE</strong> digital products,
            <strong class="text-gray-700">SELL</strong> your assets,
            <strong class="text-gray-700">BUY</strong> what you need, and
            <strong class="text-gray-700">GROW</strong> your online presence — all on Redmit.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="stat in missionStats" :key="stat.label"
            class="bg-brand-bg border border-brand-border rounded-2xl p-6 text-center">
            <p class="text-2xl font-black text-primary mb-1">{{ stat.value }}</p>
            <p class="text-xs text-gray-500 uppercase tracking-wider">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Services -->
    <section class="py-20 bg-brand-bg relative overflow-hidden">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px]
                  bg-primary/5 rounded-full blur-[70px] pointer-events-none"></div>
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Core Services</span>
          <h2 class="text-3xl font-black text-gray-900 mt-3">Four services. One platform.</h2>
          <p class="text-gray-500 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            V1 focuses on four distinct digital economy needs — structured to grow together.
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="service in services" :key="service.title"
            class="group bg-white border border-slate-200 rounded-2xl p-7
                   hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8
                   hover:-translate-y-1 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5
                        group-hover:scale-110 transition-transform duration-300" :class="service.bg">
              <i :class="[service.icon, service.color, 'text-lg']"></i>
            </div>
            <div class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
                 :class="service.badge">{{ service.model }}</div>
            <h3 class="font-black text-gray-800 mb-3 text-base group-hover:text-primary transition-colors duration-300">
              {{ service.title }}
            </h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ service.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-20 bg-slate-900 relative overflow-hidden">
      <div class="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div class="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-6xl mx-auto px-6">
        <div class="text-center mb-14">
          <span class="text-xs font-bold tracking-[0.2em] text-primary-light uppercase">Our Principles</span>
          <h2 class="text-3xl font-black text-white mt-3">What we stand for</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="val in values" :key="val.title"
            class="bg-white/5 border border-white/10 rounded-2xl p-6
                   hover:bg-white/10 hover:border-primary/30 transition-all duration-300">
            <i :class="[val.icon, 'text-primary-light text-xl mb-4 block']"></i>
            <h3 class="font-bold text-white mb-2">{{ val.title }}</h3>
            <p class="text-sm text-white/50 leading-relaxed">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-brand-bg relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-[500px] h-[250px] bg-primary/7 rounded-full blur-[80px] pointer-events-none"></div>
      <div class="relative max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-black text-gray-900 mb-4">Ready to get started?</h2>
        <p class="text-gray-500 mb-8 text-sm leading-relaxed">
          Join Redmit today and access Ethiopia's unified digital marketplace — free to sign up.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button @click="showRegister = true"
            class="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl
                   shadow-lg shadow-secondary/20 hover:-translate-y-0.5 transition-all duration-300 text-sm">
            Create Free Account
          </button>
          <router-link to="/contact"
            class="px-8 py-4 bg-white border border-slate-200 hover:border-primary/40 text-gray-700
                   hover:text-primary font-semibold rounded-xl transition-all duration-300 text-sm shadow-sm">
            Contact Us
          </router-link>
        </div>
      </div>
    </section>

    <Footer />

    <login-modal    v-if="showLogin"    @close="showLogin = false"    @switch-to-register="showLogin = false; showRegister = true" />
    <register-modal v-if="showRegister" @close="showRegister = false" @switch-to-login="showRegister = false; showLogin = true" />
  </div>
</template>

<script>
import Header        from './header.vue';
import Footer        from './footer.vue';
import LoginModal    from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'AboutPage',
  components: { Header, Footer, LoginModal, RegisterModal },

  data() {
    return {
      showLogin: false,
      showRegister: false,

      missionStats: [
        { value: '4',      label: 'Core Services'    },
        { value: '100%',   label: 'Digital Economy'  },
        { value: 'Secure', label: 'Verified Platform' },
        { value: 'Local',  label: 'ETB Payments'     },
      ],

      services: [
        {
          title: 'Digital Products',
          model: 'Marketplace',
          desc:  'Buy and sell downloadable digital goods. Upload once, sell to unlimited buyers.',
          icon:  'fas fa-box-open',
          bg:    'bg-blue-50',
          color: 'text-blue-600',
          badge: 'bg-blue-50 text-blue-600',
        },
        {
          title: 'Digital Assets',
          model: 'Marketplace + Transfer',
          desc:  'Buy and sell transferable digital properties — social accounts, websites, domains.',
          icon:  'fas fa-exchange-alt',
          bg:    'bg-indigo-50',
          color: 'text-indigo-600',
          badge: 'bg-indigo-50 text-indigo-600',
        },
        {
          title: 'Digital Access',
          model: 'Redmit-Operated',
          desc:  'Redmit helps you access and pay for global services that are difficult to reach directly.',
          icon:  'fas fa-key',
          bg:    'bg-red-50',
          color: 'text-red-600',
          badge: 'bg-red-50 text-red-600',
        },
        {
          title: 'Digital Growth',
          model: 'Redmit-Operated',
          desc:  'Grow online through paid advertising campaigns and social media monetization support.',
          icon:  'fas fa-chart-line',
          bg:    'bg-emerald-50',
          color: 'text-emerald-600',
          badge: 'bg-emerald-50 text-emerald-600',
        },
      ],

      values: [
        { title: 'Trust & Verification',  desc: 'Asset listings are reviewed and verified before being marked as trusted. Seller claims are not automatically accepted.',    icon: 'fas fa-shield-alt' },
        { title: 'Focused Growth',        desc: 'V1 launches lean and focused. We build what creates real value, validate demand, then expand.',                            icon: 'fas fa-bullseye' },
        { title: 'Shared Infrastructure', desc: 'One authentication system, one order system, one payment layer for all four services.',                                   icon: 'fas fa-layer-group' },
        { title: 'Secure Delivery',       desc: 'Digital product files are delivered securely. Buyers receive exactly what they paid for.',                                icon: 'fas fa-lock' },
        { title: 'Legal Compliance',      desc: 'Asset trading must comply with platform rules and applicable law. Redmit enforces these standards.',                      icon: 'fas fa-balance-scale' },
        { title: 'Local First',           desc: 'Designed for Ethiopian creators, buyers, and businesses with local payment and local context in mind.',                   icon: 'fas fa-map-marker-alt' },
      ],
    };
  },
};
</script>
