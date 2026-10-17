<template>
  <section id="top" class="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div class="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"></div>

    <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
      <div class="max-w-2xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          Welcome to Redmit
        </span>

        <h1 class="mt-7 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Your digital world,
          <span class="mt-1 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">all in one place.</span>
        </h1>

        <p class="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          Discover digital products, social media assets, and real opportunities—all through one marketplace built to help you move forward.
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-3">
          <router-link to="/register" class="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700">
            Get Started <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
          <router-link to="/opportunities" class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50">
            Explore Opportunities
          </router-link>
        </div>

        <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200/80 pt-6 text-sm font-semibold text-slate-600">
          <span class="inline-flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500"></i> Discover digital goods</span>
          <span class="inline-flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500"></i> Grow your online presence</span>
          <span class="inline-flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500"></i> Find new opportunities</span>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-xl lg:ml-auto">
        <div class="absolute -inset-4 bg-blue-200/40 blur-2xl"></div>
        <div class="relative overflow-hidden border border-slate-200 bg-white shadow-xl shadow-blue-900/10">
          <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div><p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Discover digital goods</p><p class="mt-1 text-sm font-semibold text-slate-800">Find something worth downloading</p></div>
            <router-link to="/products" class="text-xs font-medium text-primary hover:underline">Shop all <i class="fas fa-arrow-right ml-1"></i></router-link>
          </div>
          <router-link to="/products" class="mx-4 mt-4 flex items-center gap-3 border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-400 transition-colors hover:border-primary">
            <i class="fas fa-search text-primary"></i><span>Search templates, ebooks, presets…</span><span class="ml-auto text-[10px] text-slate-400">Explore</span>
          </router-link>
          <div class="grid grid-cols-2 gap-3 p-4">
            <router-link to="/products" class="group border border-slate-200 p-3 transition-colors hover:border-primary">
              <div class="flex h-24 items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-50"><i class="fas fa-file-alt text-3xl text-blue-600/80 transition-transform group-hover:scale-110"></i></div>
              <p class="mt-3 text-xs font-semibold text-slate-800">Templates & planners</p><p class="mt-1 text-[11px] text-slate-500">Ready-to-use resources</p>
            </router-link>
            <router-link to="/products" class="group border border-slate-200 p-3 transition-colors hover:border-primary">
              <div class="flex h-24 items-center justify-center bg-gradient-to-br from-rose-100 to-orange-50"><i class="fas fa-book-open text-3xl text-rose-600/80 transition-transform group-hover:scale-110"></i></div>
              <p class="mt-3 text-xs font-semibold text-slate-800">E-books & guides</p><p class="mt-1 text-[11px] text-slate-500">Ideas to learn from</p>
            </router-link>
            <router-link to="/products" class="group border border-slate-200 p-3 transition-colors hover:border-primary">
              <div class="flex h-24 items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-50"><i class="fas fa-palette text-3xl text-emerald-700/80 transition-transform group-hover:scale-110"></i></div>
              <p class="mt-3 text-xs font-semibold text-slate-800">Design assets</p><p class="mt-1 text-[11px] text-slate-500">Graphics and creative kits</p>
            </router-link>
            <router-link to="/products" class="group border border-slate-200 p-3 transition-colors hover:border-primary">
              <div class="flex h-24 items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-50"><i class="fas fa-laptop-code text-3xl text-amber-700/80 transition-transform group-hover:scale-110"></i></div>
              <p class="mt-3 text-xs font-semibold text-slate-800">Digital tools</p><p class="mt-1 text-[11px] text-slate-500">Tools for your workflow</p>
            </router-link>
          </div>
          <div class="overflow-hidden border-t border-slate-100 bg-blue-50/70 py-2.5">
            <div class="redmit-market-marquee flex w-max items-center gap-6 whitespace-nowrap text-[10px] font-medium text-blue-800">
              <span>Templates</span><span>✳</span><span>E-books</span><span>✳</span><span>Design kits</span><span>✳</span><span>Presets</span><span>✳</span><span>Digital downloads</span><span>✳</span><span>Templates</span><span>✳</span><span>E-books</span><span>✳</span><span>Design kits</span><span>✳</span><span>Presets</span><span>✳</span><span>Digital downloads</span>
            </div>
          </div>
        </div>
      </div>    </div>
  </section>
</template>

<script>
export default { name: 'HeroSection' };
</script>

<style scoped>
.redmit-market-marquee { animation: redmit-marquee 26s linear infinite; }
.redmit-market-marquee:hover { animation-play-state: paused; }
@keyframes redmit-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .redmit-market-marquee { animation: none; width: 100%; flex-wrap: wrap; white-space: normal; } }
</style>
