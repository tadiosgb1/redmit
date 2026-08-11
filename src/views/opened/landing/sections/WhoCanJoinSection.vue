<template>
  <section class="relative py-28 bg-white overflow-hidden">
    <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Who Uses Redmit</span>
        <h2 class="text-4xl font-black text-gray-900 mt-4 mb-4">Built for every digital participant</h2>
        <p class="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Whether you're a creator, buyer, seller, or entrepreneur — Redmit has a role for you.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div v-for="(aud, i) in audiences" :key="aud.title"
          class="group relative bg-white border border-slate-200 rounded-2xl p-6
                 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8
                 hover:-translate-y-2 transition-all duration-300 overflow-hidden">
          <div class="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-primary
                      scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
          <div class="w-12 h-12 rounded-xl bg-primary-lighter flex items-center justify-center mb-5
                      group-hover:scale-110 transition-transform duration-300">
            <i :class="[aud.icon, 'text-primary text-lg']"></i>
          </div>
          <h3 class="font-black text-gray-800 text-sm mb-2 group-hover:text-primary transition-colors duration-300">{{ aud.title }}</h3>
          <p class="text-xs text-gray-500 leading-relaxed">{{ aud.desc }}</p>
        </div>
      </div>

      <!-- Highlight bar -->
      <div class="mt-16 bg-slate-900 rounded-2xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        <div v-for="stat in trustStats" :key="stat.label">
          <p class="text-2xl font-black text-white mb-1">{{ stat.value }}</p>
          <p class="text-xs text-slate-400 uppercase tracking-widest">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WhoCanJoinSection',
  data() {
    return {
      audiences: [
        {
          title: 'Digital Creators',
          desc:  'Designers, developers, writers, and educators ready to sell their work to a growing Ethiopian audience.',
          icon:  'fas fa-paint-brush',
        },
        {
          title: 'Asset Owners',
          desc:  'Entrepreneurs looking to sell social media accounts, websites, or domain names through a trusted marketplace.',
          icon:  'fas fa-briefcase',
        },
        {
          title: 'Digital Seekers',
          desc:  'Individuals who need help accessing AI tools, online courses, hosting, or international exam registrations.',
          icon:  'fas fa-user-graduate',
        },
        {
          title: 'Businesses & Brands',
          desc:  'Companies that want to run targeted ads on Facebook, TikTok or Google, or unlock social media monetization.',
          icon:  'fas fa-building',
        },
      ],
      trustStats: [
        { value: '4',      label: 'Core Services'    },
        { value: '100%',   label: 'Digital Economy'  },
        { value: 'Secure', label: 'Verified Trades'  },
        { value: 'Local',  label: 'ETB Payments'     },
      ],
    };
  },
};
</script>
