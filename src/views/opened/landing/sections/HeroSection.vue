<template>
  <section class="relative overflow-hidden pt-16" style="background:#1e3a8a">

    <!-- Subtle diagonal split — right side lighter blue -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-1/2 h-full opacity-30"
           style="background:linear-gradient(135deg,transparent 0%,#1d4ed8 100%)"></div>
    </div>

    <!-- Faint dot grid -->
    <div class="absolute inset-0 opacity-[0.06] pointer-events-none"
         style="background-image:radial-gradient(#fff 1px,transparent 1px);background-size:32px 32px"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
      <div class="grid lg:grid-cols-2 gap-16 items-center">

        <!-- ── LEFT: headline + CTAs ── -->
        <div>
          <!-- Eyebrow -->
          <div class="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5
                      bg-white/10 border border-white/20 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
            <span class="text-[11px] font-bold text-white/80 uppercase tracking-[0.18em]">
              Ethiopia's Digital Marketplace
            </span>
          </div>

          <!-- Headline -->
          <h1 class="text-5xl sm:text-6xl font-black text-white leading-[1.08] mb-6 tracking-tight">
            Create.<br/>
            Sell. Buy.<br/>
            <span class="text-red-400">Grow.</span>
          </h1>

          <!-- Sub -->
          <p class="text-blue-200 text-lg leading-relaxed max-w-lg mb-10">
            One platform for digital products, social accounts, global service access, and online growth — built for Ethiopia.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4">
            <router-link to="/register"
              class="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-black text-sm
                     rounded-xl shadow-lg shadow-red-900/40 hover:-translate-y-0.5 transition-all duration-200
                     flex items-center gap-2">
              Get Started Free
              <i class="fas fa-arrow-right text-xs"></i>
            </router-link>
            <a href="#products"
              class="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm
                     rounded-xl border border-white/20 hover:border-white/40 transition-all duration-200
                     flex items-center gap-2">
              <i class="fas fa-compass text-blue-300 text-xs"></i>
              Explore
            </a>
          </div>

          <!-- Trust row -->
          <div class="flex flex-wrap gap-6 mt-10">
            <div v-for="t in trust" :key="t.label" class="flex items-center gap-2">
              <i :class="[t.icon, 'text-red-400 text-sm']"></i>
              <span class="text-white/60 text-xs font-semibold">{{ t.label }}</span>
            </div>
          </div>
        </div>

        <!-- ── RIGHT: four service cards ── -->
        <div class="grid grid-cols-2 gap-4">
          <a v-for="card in cards" :key="card.title"
             :href="card.href"
             class="group relative bg-white/8 border border-white/15 rounded-2xl p-5
                    hover:bg-white/15 hover:border-white/30 transition-all duration-200
                    cursor-pointer overflow-hidden">
            <!-- Top colour accent -->
            <div class="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                 :class="card.accent"></div>

            <div class="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0"
                 :class="card.iconBg">
              <i :class="[card.icon, card.iconColor, 'text-xl']"></i>
            </div>
            <h4 class="font-black text-white text-sm mb-1 leading-snug">{{ card.title }}</h4>
            <p class="text-blue-200/70 text-xs leading-relaxed">{{ card.desc }}</p>
          </a>
        </div>

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
</template>

<script>
export default {
  name: 'HeroSection',
  data() {
    return {
      trust: [
        { icon: 'fas fa-shield-alt',     label: 'Verified Listings' },
        { icon: 'fas fa-lock',           label: 'Secure Payments' },
        { icon: 'fas fa-headset',        label: 'Redmit Support' },
      ],
      cards: [
        {
          title: 'Digital Products',
          desc:  'E-books, designs, music, software & courses',
          icon:  'fas fa-box-open',
          iconBg:    'bg-blue-400/20',
          iconColor: 'text-blue-300',
          accent:    'bg-blue-400',
          href:  '#products',
        },
        {
          title: 'Digital Assets',
          desc:  'TikTok, YouTube, Instagram & domains',
          icon:  'fas fa-exchange-alt',
          iconBg:    'bg-indigo-400/20',
          iconColor: 'text-indigo-300',
          accent:    'bg-indigo-400',
          href:  '#assets',
        },
        {
          title: 'Pay For Me',
          desc:  'AI tools, courses, exams & subscriptions',
          icon:  'fas fa-hand-holding-usd',
          iconBg:    'bg-red-400/20',
          iconColor: 'text-red-300',
          accent:    'bg-red-500',
          href:  '#pay-for-me',
        },
        {
          title: 'Digital Growth',
          desc:  'Ads management & monetization support',
          icon:  'fas fa-chart-line',
          iconBg:    'bg-emerald-400/20',
          iconColor: 'text-emerald-300',
          accent:    'bg-emerald-400',
          href:  '#growth',
        },
      ],
    };
  },
};
</script>
