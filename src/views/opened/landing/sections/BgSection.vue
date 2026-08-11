<template>
  <section id="about" class="relative py-28 bg-white overflow-hidden scroll-mt-24">
    <!-- Background decorations -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute -top-24 -right-24 w-[500px] h-[500px] bg-gradient-to-br from-primary/15 via-blue-200/10 to-transparent rounded-full blur-[120px]"></div>
      <div class="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-gradient-to-tr from-secondary/10 via-primary-lighter/30 to-transparent rounded-full blur-[100px]"></div>
      <div class="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 z-10">
      <div class="flex flex-col lg:flex-row items-center gap-16">

        <!-- Left: Value Cards -->
        <div class="flex-1 w-full">
          <div class="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div
              v-for="card in cards"
              :key="card.title"
              class="group relative bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl p-6
                     hover:border-primary/40 hover:bg-white hover:shadow-2xl hover:shadow-primary/10
                     hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
            >
              <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-4
                          group-hover:scale-110 group-hover:shadow-md transition-all duration-300" :class="card.bg">
                <i :class="[card.icon, card.color, 'text-base']"></i>
              </div>
              <div class="relative z-10">
                <p class="font-black text-slate-800 text-base mb-1.5 group-hover:text-primary transition-colors duration-200">
                  {{ card.title }}
                </p>
                <p class="text-xs text-slate-500 leading-relaxed font-medium">{{ card.desc }}</p>
              </div>
              <div class="absolute -bottom-10 -right-10 w-28 h-28 bg-primary/8 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>

        <!-- Right: Text & CTA -->
        <div class="flex-1">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span class="text-xs font-black tracking-[0.2em] text-primary uppercase">About Redmit</span>
          </div>

          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
            One platform.<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-slate-900 to-primary-dark">
              Four digital superpowers.
            </span>
          </h2>

          <p class="text-slate-600 text-sm md:text-base leading-relaxed mb-5 font-normal">
            Redmit Market is Ethiopia's focused digital-economy platform built for creators, buyers, sellers, and businesses ready to participate in the modern digital economy.
          </p>

          <p class="text-slate-600 text-sm md:text-base leading-relaxed mb-8 font-normal">
            Whether you're selling your first e-book, trading a TikTok account, paying for an AI subscription, or running Facebook Ads — Redmit is the one place you need.
          </p>

          <router-link to="/about"
            class="group inline-flex items-center gap-3 px-7 py-3.5 bg-primary hover:bg-slate-900
                   text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-0.5
                   transition-all duration-300 text-sm">
            <span>Learn More</span>
            <i class="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform duration-300"></i>
          </router-link>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  data() {
    return {
      cards: [
        {
          title: 'Sell Repeatedly',
          desc:  'Upload once and sell your digital products to unlimited buyers worldwide.',
          icon:  'fas fa-infinity',
          bg:    'bg-primary/10',
          color: 'text-primary',
        },
        {
          title: 'Secure Transfers',
          desc:  'Asset ownership is transferred safely between verified buyers and sellers.',
          icon:  'fas fa-shield-alt',
          bg:    'bg-amber-500/10',
          color: 'text-amber-600',
        },
        {
          title: 'Redmit-Operated',
          desc:  'Digital Access and Digital Growth are fulfilled directly by the Redmit team.',
          icon:  'fas fa-headset',
          bg:    'bg-red-500/10',
          color: 'text-red-600',
        },
        {
          title: 'Shared Infrastructure',
          desc:  'One account, one wallet, one order system for all four services.',
          icon:  'fas fa-layer-group',
          bg:    'bg-indigo-500/10',
          color: 'text-indigo-600',
        },
      ],
    };
  },
};
</script>
