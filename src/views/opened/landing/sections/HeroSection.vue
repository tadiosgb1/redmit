<template>
  <section class="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div class="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"></div>

    <div class="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
      <div class="max-w-2xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          Welcome to Redmit
        </span>

        <h1 class="mt-7 text-5xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
          Your digital world,
          <span class="mt-1 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">all in one place.</span>
        </h1>

        <p class="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
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
        <div class="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-blue-200/60 via-white/30 to-indigo-200/70 blur-xl"></div>
        <div class="relative border border-white/80 bg-white/80 p-4 shadow-2xl shadow-blue-900/10 backdrop-blur sm:p-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">The Redmit marketplace</p>
              <p class="mt-1 text-lg font-black text-slate-900">One place. More possibilities.</p>
            </div>
            <span class="flex h-10 w-10 items-center justify-center bg-blue-600 text-white"><i class="fas fa-sparkles"></i></span>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-3">
            <div class="group border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4 transition-transform hover:-translate-y-1">
              <div class="flex h-10 w-10 items-center justify-center bg-blue-600 text-white"><i class="fas fa-box-open"></i></div>
              <p class="mt-5 text-sm font-black text-slate-900">Digital products</p>
              <p class="mt-1 text-xs leading-5 text-slate-500">Useful downloads and digital goods.</p>
              <router-link to="/products" class="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-700">Browse products <i class="fas fa-arrow-right"></i></router-link>
            </div>
            <div class="group border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-4 transition-transform hover:-translate-y-1">
              <div class="flex h-10 w-10 items-center justify-center bg-indigo-600 text-white"><i class="fas fa-chart-line"></i></div>
              <p class="mt-5 text-sm font-black text-slate-900">Digital assets</p>
              <p class="mt-1 text-xs leading-5 text-slate-500">Explore accounts and online assets.</p>
              <a href="#assets" class="mt-4 inline-flex items-center gap-2 text-xs font-black text-indigo-700">Explore assets <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="col-span-2 flex items-center justify-between gap-4 border border-emerald-100 bg-gradient-to-r from-emerald-50 to-white p-4 sm:p-5">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center bg-emerald-600 text-white"><i class="fas fa-compass"></i></div>
                <div><p class="text-sm font-black text-slate-900">Opportunities worth exploring</p><p class="mt-1 text-xs leading-5 text-slate-500">Scholarships, grants, internships, and more.</p></div>
              </div>
              <router-link to="/opportunities" aria-label="Explore opportunities" class="flex h-9 w-9 shrink-0 items-center justify-center bg-white text-emerald-700 shadow-sm transition-transform hover:translate-x-1"><i class="fas fa-arrow-right"></i></router-link>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-2 px-1 text-xs font-semibold text-slate-500"><i class="fas fa-bolt text-amber-500"></i> Built to help you discover what’s next.</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'HeroSection' };
</script>
