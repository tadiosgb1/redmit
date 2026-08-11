<template>
  <section class="relative py-24 overflow-hidden" style="background:linear-gradient(135deg,#1e3a8a 0%,#1e40af 60%,#1d4ed8 100%)">
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/20 rounded-full blur-3xl"></div>
    </div>
    <div class="absolute inset-0 opacity-[0.04] pointer-events-none"
      style="background-image:radial-gradient(circle,#fff 1px,transparent 1px);background-size:28px 28px"></div>

    <div class="relative max-w-4xl mx-auto px-6 text-center">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold
                  text-blue-200 bg-white/10 rounded-full uppercase border border-white/20 tracking-widest">
        <i class="fas fa-store text-[10px]"></i> Start on Redmit Today
      </div>

      <h2 class="text-4xl lg:text-5xl font-black text-white mb-5 leading-tight">
        Your digital journey<br/>starts here.
      </h2>
      <p class="text-blue-200 mb-10 text-base leading-relaxed max-w-xl mx-auto">
        Create a free account to buy digital products, trade assets, access global services, and grow your online presence.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <router-link to="/register"
          class="px-10 py-4 bg-secondary hover:bg-secondary-dark text-white font-black rounded-2xl
                 shadow-xl shadow-secondary/30 hover:-translate-y-0.5 transition-all duration-200
                 text-sm flex items-center justify-center gap-3">
          Create Free Account
          <i class="fas fa-arrow-right text-xs"></i>
        </router-link>
        <router-link to="/login"
          class="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl
                 border border-white/20 hover:border-white/40 transition-all duration-200 text-sm">
          Sign In
        </router-link>
      </div>

      <!-- Mini service pills -->
      <div class="flex flex-wrap gap-3 justify-center">
        <span v-for="s in services" :key="s"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-white/8 border border-white/15 rounded-full text-xs text-white/70 font-semibold">
          <i class="fas fa-check text-blue-300 text-[10px]"></i>
          {{ s }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CtaSection',
  data() {
    return {
      services: [
        'Digital Products',
        'Social Media Accounts',
        'Pay For Me',
        'Ads & Monetization',
        'Free to Join',
      ],
    };
  },
};
</script>
