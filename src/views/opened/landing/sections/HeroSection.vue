<template>
  <section class="relative overflow-hidden bg-slate-950">
    <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 left-0 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
      <div class="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 lg:gap-20 items-center">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 mb-7 rounded-full border border-white/10 bg-white/5 text-white/70 text-[11px] font-bold uppercase tracking-[0.18em]">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Ethiopia's Digital Marketplace
          </div>

          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02] tracking-tight mb-7">
            Everything digital,
            <span class="block text-blue-400">in one place.</span>
          </h1>

          <p class="max-w-xl text-lg text-slate-300 leading-relaxed mb-9">
            Discover digital products and digital assets from sellers on Redmit — simple, secure, and built for online growth.
          </p>

          <div class="flex flex-wrap gap-3">
            <router-link
              to="/register"
              class="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-950/30 transition-all hover:-translate-y-0.5"
            >
              Get Started
              <i class="fas fa-arrow-right text-xs"></i>
            </router-link>
            <a
              href="#products"
              class="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold text-sm rounded-xl transition-all"
            >
              Explore Products
            </a>
          </div>
        </div>

        <div class="relative">
          <div class="absolute inset-8 rounded-[2rem] bg-blue-500/10 blur-2xl"></div>
          <div class="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 sm:p-6 shadow-2xl shadow-black/20 backdrop-blur-sm">
            <div class="flex items-center justify-between mb-5">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-300">Redmit Marketplace</p>
                <p class="text-white font-bold mt-1">Built for digital commerce</p>
              </div>
              <div class="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <i class="fas fa-store text-blue-300"></i>
              </div>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div class="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center shrink-0">
                  <i class="fas fa-box-open text-blue-300"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-white font-bold text-sm">Digital Products</p>
                  <p class="text-slate-400 text-xs mt-1">Discover and buy downloadable goods.</p>
                </div>
                <i class="fas fa-arrow-right text-slate-500 text-xs ml-auto"></i>
              </div>

              <div class="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div class="w-11 h-11 rounded-xl bg-indigo-500/15 flex items-center justify-center shrink-0">
                  <i class="fas fa-layer-group text-indigo-300"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-white font-bold text-sm">Digital Assets</p>
                  <p class="text-slate-400 text-xs mt-1">Find social accounts and other digital assets.</p>
                </div>
                <i class="fas fa-arrow-right text-slate-500 text-xs ml-auto"></i>
              </div>

              <div class="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div class="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center shrink-0">
                  <i class="fas fa-shield-alt text-emerald-300"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-white font-bold text-sm">Simple & Secure</p>
                  <p class="text-slate-400 text-xs mt-1">A clean marketplace experience from discovery to purchase.</p>
                </div>
                <i class="fas fa-check text-emerald-300 text-xs ml-auto"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
};
</script>
