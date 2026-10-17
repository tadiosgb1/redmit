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
        <div class="pointer-events-none absolute inset-10 rounded-full bg-blue-100/70 blur-3xl"></div>
        <div class="relative">
          <svg class="redmit-sketch h-auto w-full overflow-visible" viewBox="0 0 560 470" role="img" aria-labelledby="redmit-sketch-title redmit-sketch-desc" xmlns="http://www.w3.org/2000/svg">
            <title id="redmit-sketch-title">A hand-drawn illustration of a digital marketplace</title>
            <desc id="redmit-sketch-desc">Sketches of a laptop, downloadable files, creative tools, and connected ideas floating around a shared digital space.</desc>
            <defs>
              <linearGradient id="screenWash" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#dbeafe"/><stop offset="1" stop-color="#eef2ff"/></linearGradient>
            </defs>
            <!-- loose orbit strokes -->
            <path d="M55 248 C38 153 118 70 235 59 C360 45 475 113 497 214 C520 309 431 384 315 397 C199 411 79 359 55 248Z" fill="none" stroke="#93b4ed" stroke-width="1.5" stroke-dasharray="3 8" stroke-linecap="round"/>
            <path d="M75 250 C55 168 130 88 236 76 C349 63 453 123 477 216" fill="none" stroke="#bfdbfe" stroke-width="2" stroke-linecap="round"/>
            <!-- central laptop, deliberately hand drawn -->
            <g class="redmit-sketch-float">
              <path d="M147 151 Q147 143 157 143 L376 143 Q385 144 385 154 L385 294 Q384 303 375 303 L157 303 Q147 302 147 293Z" fill="#fff" stroke="#334155" stroke-width="2.8" stroke-linejoin="round"/>
              <path d="M153 151 Q153 149 160 149 L371 149 Q378 150 378 156 L378 286 Q377 294 370 294 L161 294 Q153 292 153 286Z" fill="url(#screenWash)" stroke="#64748b" stroke-width="1.3"/>
              <path d="M140 306 Q144 301 154 301 L378 301 Q388 302 397 310 L414 324 Q418 329 407 331 L127 331 Q117 329 123 323Z" fill="#f8fafc" stroke="#334155" stroke-width="2.6" stroke-linejoin="round"/>
              <path d="M219 309 L321 309 L330 319 L209 319Z" fill="#dbeafe" stroke="#94a3b8" stroke-width="1.2"/>
              <!-- simple screen content: a file, not a UI card -->
              <path d="M205 180 L265 180 L282 197 L282 262 L205 262Z" fill="#fff" stroke="#2563eb" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M265 180 L265 197 L282 197" fill="none" stroke="#2563eb" stroke-width="2"/>
              <path d="M218 214 L267 214 M218 225 L259 225 M218 236 L249 236" fill="none" stroke="#93b4ed" stroke-width="3" stroke-linecap="round"/>
              <path d="M302 198 C316 183 344 190 345 211 C345 228 328 237 312 229 C297 222 293 210 302 198Z" fill="#bfdbfe" stroke="#2563eb" stroke-width="2.2"/>
              <path d="M310 211 L319 219 L335 202" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M300 249 L350 249 M300 258 L336 258" fill="none" stroke="#a5b4fc" stroke-width="3" stroke-linecap="round"/>
            </g>
            <!-- floating sketch: digital file -->
            <g class="redmit-sketch-float redmit-sketch-delay">
              <path d="M73 123 L119 119 L136 136 L139 191 L78 195Z" fill="#fff" stroke="#2563eb" stroke-width="2.3" stroke-linejoin="round"/>
              <path d="M119 119 L118 137 L136 136" fill="none" stroke="#2563eb" stroke-width="2"/>
              <path d="M89 151 L122 149 M89 162 L123 160 M89 173 L113 172" stroke="#93b4ed" stroke-width="3" stroke-linecap="round"/>
              <path d="M87 108 Q103 99 119 107" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
            </g>
            <!-- floating sketch: creative spark -->
            <g class="redmit-sketch-float">
              <path d="M430 108 L436 126 L454 132 L436 138 L430 156 L424 138 L406 132 L424 126Z" fill="#fef3c7" stroke="#d97706" stroke-width="2.2" stroke-linejoin="round"/>
              <path d="M467 164 L470 173 L480 176 L470 179 L467 189 L464 179 L454 176 L464 173Z" fill="#fff" stroke="#d97706" stroke-width="1.7" stroke-linejoin="round"/>
            </g>
            <!-- floating sketch: creator tools -->
            <g class="redmit-sketch-float redmit-sketch-delay">
              <circle cx="443" cy="286" r="34" fill="#dcfce7" fill-opacity=".8" stroke="#15803d" stroke-width="2.2" stroke-dasharray="4 4"/>
              <path d="M429 297 L449 270 L458 278 L438 305 L426 309Z" fill="#fff" stroke="#15803d" stroke-width="2.1" stroke-linejoin="round"/>
              <path d="M449 270 L455 263 L464 272 L458 278" fill="none" stroke="#15803d" stroke-width="2.1" stroke-linejoin="round"/>
            </g>
            <!-- small connection doodles -->
            <path d="M127 226 Q105 240 96 261 M390 174 Q407 162 420 158 M390 276 Q411 278 416 281" fill="none" stroke="#64748b" stroke-width="1.7" stroke-dasharray="3 5" stroke-linecap="round"/>
            <circle cx="97" cy="264" r="5" fill="#2563eb"/>
            <circle cx="391" cy="174" r="4" fill="#6366f1"/>
            <path d="M109 343 C130 354 149 359 167 357" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round"/>
            <path d="M164 350 L171 357 L163 363" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M365 364 C390 358 405 346 415 331" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round"/>
            <path d="M405 334 L415 330 L417 341" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- a little handwritten-style motion trail -->
            <path d="M184 91 Q214 78 244 83 M190 99 Q214 90 233 93" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>
            <path d="M316 382 Q342 384 361 374 M320 389 Q341 391 352 386" fill="none" stroke="#6366f1" stroke-width="1.8" stroke-linecap="round" opacity=".65"/>
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
