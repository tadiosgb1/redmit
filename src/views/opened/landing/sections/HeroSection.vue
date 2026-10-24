<template>
  <section id="top" class="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
    <div class="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full bg-blue-200/50 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl"></div>

    <div class="relative mx-auto grid max-w-7xl items-center gap-7 px-5 pb-10 pt-24 sm:gap-9 sm:px-6 sm:pb-16 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
      <div class="max-w-2xl">
        <span class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-700 shadow-sm">
          <span class="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          Welcome to Redmit
        </span>

        <h1 class="mt-5 text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          Your digital world,
          <span class="mt-1 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">all in one place.</span>
        </h1>

        <p class="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          Discover digital products, useful digital services, and real opportunities—all through one marketplace built to help you move forward.
        </p>

        <div class="mt-6 flex flex-wrap items-center gap-3">
          <router-link to="/register" class="inline-flex items-center gap-2 rounded-sm bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:bg-blue-700">
            Get Started <i class="fas fa-arrow-right text-xs"></i>
          </router-link>
          <router-link to="/opportunities" class="inline-flex items-center gap-2 rounded-sm border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50">
            Explore Opportunities
          </router-link>
        </div>

        <div class="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200/80 pt-5 text-xs font-medium text-slate-600">
          <span class="inline-flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500"></i> Discover digital goods</span>
          <span class="inline-flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500"></i> Access useful digital services</span>
          <span class="inline-flex items-center gap-2"><i class="fas fa-check-circle text-emerald-500"></i> Find new opportunities</span>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-[26rem] sm:max-w-xl lg:ml-auto">
        <div class="pointer-events-none absolute inset-10 rounded-full bg-blue-100/70 blur-3xl"></div>
        <div class="relative">
          <svg class="redmit-sketch mx-auto block h-auto w-full max-w-full overflow-visible" viewBox="0 0 560 470" role="img" aria-labelledby="redmit-sketch-title redmit-sketch-desc" xmlns="http://www.w3.org/2000/svg">
            <title id="redmit-sketch-title">A hand-drawn sketch of Redmit services</title>
            <desc id="redmit-sketch-desc">A laptop surrounded by simple doodles representing digital products, online course access, digital growth, and DV form-filling help.</desc>
            <defs>
              <linearGradient id="screenWash" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#eef2ff"/></linearGradient>
            </defs>
            <path d="M63 246 C44 153 121 73 237 60 C355 47 468 112 495 211 C520 306 432 382 315 397 C199 411 83 356 63 246Z" fill="none" stroke="#93b4ed" stroke-width="1.5" stroke-dasharray="3 8" stroke-linecap="round"/>
            <!-- central laptop: one simple platform connecting the services -->
            <g class="redmit-sketch-float">
              <path d="M151 157 Q151 149 161 149 L376 149 Q385 150 385 160 L385 291 Q384 300 375 300 L161 300 Q151 299 151 290Z" fill="#fff" stroke="#334155" stroke-width="2.8" stroke-linejoin="round"/>
              <path d="M158 159 Q158 155 165 155 L370 155 Q378 156 378 162 L378 284 Q377 292 370 292 L166 292 Q158 290 158 284Z" fill="url(#screenWash)" stroke="#64748b" stroke-width="1.3"/>
              <path d="M143 303 Q148 298 158 298 L378 298 Q388 299 397 307 L412 320 Q417 326 406 328 L129 328 Q118 326 125 319Z" fill="#f8fafc" stroke="#334155" stroke-width="2.6" stroke-linejoin="round"/>
              <path d="M219 306 L320 306 L329 316 L210 316Z" fill="#dbeafe" stroke="#94a3b8" stroke-width="1.2"/>
              <path d="M217 190 Q217 184 224 184 L302 184 Q309 184 309 191 L309 257 Q309 263 302 263 L224 263 Q217 263 217 257Z" fill="#fff" stroke="#2563eb" stroke-width="2"/>
              <path d="M231 203 L293 203 M231 215 L281 215" stroke="#93b4ed" stroke-width="3" stroke-linecap="round"/>
              <path d="M234 237 L247 249 L273 224" fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M326 201 L350 201 M326 212 L357 212 M326 223 L346 223" stroke="#818cf8" stroke-width="3" stroke-linecap="round"/>
              <circle cx="339" cy="251" r="17" fill="#dcfce7" stroke="#15803d" stroke-width="2"/>
              <path d="M330 251 L337 258 L349 244" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
            <!-- online course access: open book and graduation cap -->
            <g class="redmit-sketch-float">
              <path d="M391 102 Q414 91 433 105 L433 143 Q413 131 391 142Z" fill="#fff" stroke="#2563eb" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M433 105 Q452 91 472 102 L472 142 Q452 131 433 143Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M400 112 Q415 108 424 115 M400 122 Q414 118 424 125 M442 115 Q454 108 463 112 M442 125 Q454 118 463 122" fill="none" stroke="#93b4ed" stroke-width="2" stroke-linecap="round"/>
              <path d="M397 86 L431 73 L466 86 L431 99Z" fill="#fef3c7" stroke="#b45309" stroke-width="2.1" stroke-linejoin="round"/>
              <path d="M451 92 L451 105 Q431 117 411 105 L411 92" fill="none" stroke="#b45309" stroke-width="2"/>
              <path d="M466 86 L466 103" stroke="#b45309" stroke-width="2"/>
              <circle cx="466" cy="107" r="3" fill="#b45309"/>
              <text x="397" y="59" fill="#475569" font-size="11" font-weight="600">Course access</text>
            </g>
            <!-- digital growth: a simple rising chart -->
            <g class="redmit-sketch-float redmit-sketch-delay">
              <path d="M429 275 L429 329 L488 329" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
              <path d="M438 316 L452 302 L464 308 L482 282" fill="none" stroke="#15803d" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M472 282 L482 282 L482 292" fill="none" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <circle cx="438" cy="316" r="3" fill="#15803d"/><circle cx="452" cy="302" r="3" fill="#15803d"/><circle cx="464" cy="308" r="3" fill="#15803d"/>
              <text x="430" y="351" fill="#475569" font-size="11" font-weight="600">Digital growth</text>
            </g>
            <!-- DV form filling: a clipboard and check marks -->
            <g class="redmit-sketch-float">
              <path d="M73 283 L125 283 L130 292 L130 351 L77 354 L73 347Z" fill="#fff" stroke="#b45309" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M88 283 L89 275 L113 274 L116 283" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
              <path d="M85 303 L91 309 L100 298 M105 305 L119 305 M85 324 L91 330 L100 319 M105 326 L119 326 M85 344 L91 349 L99 339" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <text x="62" y="376" fill="#475569" font-size="11" font-weight="600">DV Form filling</text>
            </g>
            <!-- digital products: a small package and downloadable file -->
            <g class="redmit-sketch-float redmit-sketch-delay">
              <path d="M164 354 L188 343 L211 354 L188 366Z" fill="#dbeafe" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
              <path d="M164 354 L164 380 L188 392 L188 366Z" fill="#fff" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
              <path d="M188 366 L211 354 L211 380 L188 392Z" fill="#bfdbfe" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
              <path d="M181 347 L204 359 M188 366 L188 392" fill="none" stroke="#2563eb" stroke-width="1.6" stroke-linecap="round"/>
              <text x="151" y="411" fill="#475569" font-size="11" font-weight="600">Digital products</text>
            </g>
            <!-- light connector doodles keep the scene unified without clutter -->
            <path d="M155 143 Q169 153 184 169 M387 151 Q398 140 405 132 M389 282 Q406 285 421 293 M133 301 Q145 291 153 280" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3 5" stroke-linecap="round"/>
            <path d="M184 82 Q213 70 241 77 M320 381 Q344 382 361 373" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" opacity=".6"/>
            <path d="M235 67 L239 76 L248 79 L239 82 L235 91 L232 82 L223 79 L232 76Z" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
          <div class="mt-1 overflow-hidden py-2">
            <div class="redmit-sketch-marquee flex w-max items-center gap-5 whitespace-nowrap text-[11px] font-medium tracking-wide text-slate-500">
              <span>Ideas become digital goods</span><span class="text-primary">✳</span><span>Made to discover</span><span class="text-primary">✳</span><span>One marketplace, more possibilities</span><span class="text-primary">✳</span><span>Ideas become digital goods</span><span class="text-primary">✳</span><span>Made to discover</span><span class="text-primary">✳</span><span>One marketplace, more possibilities</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default { name: 'HeroSection' };
</script>

<style scoped>
.redmit-sketch-float { transform-box: fill-box; transform-origin: center; animation: redmit-sketch-drift 5.5s ease-in-out infinite; }
.redmit-sketch-delay { animation-delay: -2.5s; }
.redmit-sketch-marquee { animation: redmit-marquee 32s linear infinite; }
.redmit-sketch-marquee:hover { animation-play-state: paused; }
@keyframes redmit-sketch-drift { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-5px) rotate(-1deg); } }
@keyframes redmit-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .redmit-sketch-float, .redmit-sketch-marquee { animation: none; } .redmit-sketch-marquee { width: 100%; flex-wrap: wrap; white-space: normal; } }
</style>
