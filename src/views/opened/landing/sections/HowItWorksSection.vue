<template>
  <section id="services" class="relative py-28 bg-brand-bg overflow-hidden scroll-mt-20">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px]
                bg-primary/8 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-6">
      <!-- Section header -->
      <div class="text-center mb-20">
        <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Four Core Services</span>
        <h2 class="text-4xl font-black text-gray-900 mt-4 mb-4">Everything you need in the digital economy</h2>
        <p class="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
          Redmit covers every major digital economy need in one unified platform.
        </p>
      </div>

      <!-- Service cards grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div
          v-for="(service, i) in services"
          :key="service.title"
          class="group relative bg-white border border-slate-200 rounded-2xl p-7
                 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10
                 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >
          <div class="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300"
               :class="service.accent"></div>
          <div class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5
                      group-hover:scale-110 transition-transform duration-300" :class="service.bg">
            <i :class="[service.icon, service.color, 'text-2xl']"></i>
          </div>
          <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3"
               :class="service.badge">
            {{ service.type }}
          </div>
          <h3 class="font-black text-gray-800 text-lg mb-2 group-hover:text-primary transition-colors duration-300">
            {{ service.title }}
          </h3>
          <p class="text-xs text-gray-500 leading-relaxed mb-4">{{ service.desc }}</p>
          <div class="space-y-1.5">
            <div v-for="ex in service.examples" :key="ex" class="flex items-center gap-2 text-xs text-gray-400">
              <i class="fas fa-check-circle text-primary/60 text-[10px]"></i>
              {{ ex }}
            </div>
          </div>
        </div>
      </div>

      <!-- How it works steps -->
      <div class="text-center mb-14">
        <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">How It Works</span>
        <h2 class="text-3xl font-black text-gray-900 mt-4 mb-3">Start in 3 simple steps</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div class="hidden md:block absolute top-9 left-[calc(16.67%+48px)] right-[calc(16.67%+48px)] h-px
                    bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div v-for="(step, i) in steps" :key="step.title"
          class="text-center relative group">
          <div class="relative inline-flex mb-7">
            <div class="w-20 h-20 rounded-2xl flex items-center justify-center bg-white
                        shadow-lg shadow-blue-100 group-hover:shadow-primary/15
                        group-hover:scale-105 transition-all duration-300 border border-slate-200">
              <i :class="[step.icon, 'text-primary text-2xl']"></i>
            </div>
            <span class="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-primary text-white
                         text-[10px] font-black flex items-center justify-center shadow-md">{{ i + 1 }}</span>
          </div>
          <h3 class="font-black text-gray-800 text-base mb-2 group-hover:text-primary transition-colors duration-300">{{ step.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{{ step.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HowItWorksSection',
  data() {
    return {
      services: [
        {
          title:    'Digital Products',
          type:     'Marketplace',
          desc:     'Buy and sell downloadable digital goods. Sellers upload once and earn repeatedly from every purchase.',
          icon:     'fas fa-box-open',
          bg:       'bg-blue-50',
          color:    'text-blue-600',
          accent:   'bg-gradient-to-r from-blue-500 to-primary',
          badge:    'bg-blue-50 text-blue-600',
          examples: ['E-books & guides', 'Design templates', 'Music & beats', 'Software & tools'],
        },
        {
          title:    'Digital Assets',
          type:     'Marketplace + Transfer',
          desc:     'Buy and sell transferable digital properties. The buyer acquires full control of the listed asset.',
          icon:     'fas fa-exchange-alt',
          bg:       'bg-indigo-50',
          color:    'text-indigo-600',
          accent:   'bg-gradient-to-r from-indigo-500 to-blue-500',
          badge:    'bg-indigo-50 text-indigo-600',
          examples: ['TikTok & Instagram', 'YouTube channels', 'Websites & domains', 'Telegram assets'],
        },
        {
          title:    'Digital Access',
          type:     'Redmit-Operated',
          desc:     'Redmit helps you obtain or pay for global digital services that are hard to access directly from Ethiopia.',
          icon:     'fas fa-key',
          bg:       'bg-red-50',
          color:    'text-red-600',
          accent:   'bg-gradient-to-r from-secondary to-red-400',
          badge:    'bg-red-50 text-red-600',
          examples: ['AI subscriptions', 'Online courses', 'Hosting & domains', 'Exam registrations'],
        },
        {
          title:    'Digital Growth',
          type:     'Redmit-Operated',
          desc:     'Grow online through paid advertising and social-media monetization support powered by Redmit.',
          icon:     'fas fa-chart-line',
          bg:       'bg-emerald-50',
          color:    'text-emerald-600',
          accent:   'bg-gradient-to-r from-emerald-500 to-teal-400',
          badge:    'bg-emerald-50 text-emerald-600',
          examples: ['Facebook & Google Ads', 'TikTok & Instagram Ads', 'Monetization setup', 'Growth strategy'],
        },
      ],
      steps: [
        { title: 'Create Your Account',    desc: 'Sign up for free and complete your Redmit profile in minutes.',                                         icon: 'fas fa-user-plus' },
        { title: 'Choose Your Service',    desc: 'Browse products, list assets, submit a digital access request, or kick off a growth campaign.',        icon: 'fas fa-th-large' },
        { title: 'Transact & Track',       desc: 'Pay securely, receive your product or service, and track every order from your dashboard.',            icon: 'fas fa-check-circle' },
      ],
    };
  },
};
</script>
