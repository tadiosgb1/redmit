<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-100">
    <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
      <div class="max-w-4xl mx-auto text-center">
        <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          Welcome to Redmit
        </span>

        <h1 class="mt-7 text-5xl sm:text-6xl lg:text-7xl font-black text-slate-950 leading-[1.03] tracking-tight">
          Your digital world,
          <span class="block text-blue-600">all in one place.</span>
        </h1>

        <p class="max-w-2xl mx-auto mt-6 text-lg text-slate-600 leading-relaxed">
          Discover digital products, digital assets, and new opportunities through a simple marketplace built for people and businesses online.
        </p>

        <div class="mt-9 flex flex-wrap items-center justify-center gap-3">
          <router-link to="/register" class="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5">
            Get Started <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
          <router-link to="/opportunities" class="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm rounded-xl shadow-sm transition-all">
            Explore Opportunities
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'HeroSection' };
</script>
