<template>
  <div class="min-h-screen bg-white pt-16 font-sans text-slate-800 antialiased">
    <Header />

    <section class="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div class="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl"></div>
      <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div class="max-w-2xl">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-700 shadow-sm">
            <i class="fas fa-compass"></i> Get to know us
          </span>
          <h1 class="mt-5 text-4xl font-black leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            A simpler way to navigate your <span class="text-blue-600">digital world.</span>
          </h1>
          <p class="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Redmit brings useful digital products, services and opportunities together, helping people discover what they need and take their next step with confidence.
          </p>
          <div class="mt-7 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700"><i class="fas fa-compass text-blue-600"></i> Discover</span>
            <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700"><i class="fas fa-link text-indigo-600"></i> Connect</span>
            <span class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700"><i class="fas fa-arrow-trend-up text-blue-600"></i> Grow</span>
          </div>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <router-link to="/opportunities" class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Explore opportunities <i class="fas fa-arrow-right text-xs"></i></router-link>
            <router-link to="/contact-us" class="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"><i class="far fa-envelope"></i> Contact our team</router-link>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-lg">
          <div class="absolute inset-5 rounded-[2rem] bg-blue-200/40 blur-2xl"></div>
          <div class="relative rounded-3xl border border-white bg-white/90 p-5 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-7">
            <div class="flex items-center justify-between border-b border-slate-100 pb-5">
              <div class="flex items-center gap-3">
                <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><i class="fas fa-layer-group text-lg"></i></div>
                <div><p class="text-sm font-extrabold text-slate-900">The Redmit experience</p><p class="mt-0.5 text-xs text-slate-500">Useful things, brought together</p></div>
              </div>
              <span class="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">Explore</span>
            </div>
            <div class="space-y-3 pt-5">
              <div class="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><i class="fas fa-box-open"></i></div>
                <div class="min-w-0 flex-1"><p class="text-sm font-bold text-slate-900">Digital products</p><p class="mt-1 text-xs leading-5 text-slate-500">Find practical resources for your next idea.</p></div>
                <i class="fas fa-arrow-up-right-from-square text-xs text-slate-400"></i>
              </div>
              <div class="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm"><i class="fas fa-bullseye"></i></div>
                <div class="min-w-0 flex-1"><p class="text-sm font-bold text-slate-900">Growth services</p><p class="mt-1 text-xs leading-5 text-slate-500">Explore services designed to help you move forward.</p></div>
                <i class="fas fa-arrow-up-right-from-square text-xs text-slate-400"></i>
              </div>
              <div class="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm"><i class="fas fa-lightbulb"></i></div>
                <div class="min-w-0 flex-1"><p class="text-sm font-bold text-slate-900">Opportunities</p><p class="mt-1 text-xs leading-5 text-slate-500">Discover possibilities worth exploring.</p></div>
                <i class="fas fa-arrow-up-right-from-square text-xs text-slate-400"></i>
              </div>
            </div>
            <div class="mt-5 flex items-center gap-3 rounded-2xl bg-blue-600 p-4 text-white">
              <i class="fas fa-heart text-lg"></i>
              <p class="text-xs font-semibold leading-5 sm:text-sm">Built around clarity, accessibility and a better user experience.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-14 sm:py-20">
      <div class="mx-auto grid max-w-6xl grid-cols-1 items-start gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div>
          <span class="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-700"><i class="fas fa-flag"></i> Our mission</span>
          <h2 class="mt-4 max-w-lg text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">Make digital access simpler and more useful.</h2>
          <p class="mt-5 text-sm leading-7 text-slate-600 sm:text-base">We believe digital products, services and opportunities should be easier to discover, understand and access.</p>
          <p class="mt-3 text-sm leading-7 text-slate-600 sm:text-base">Redmit is building a straightforward experience that helps people find useful resources and make informed choices without unnecessary complexity.</p>
        </div>
        <div class="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm"><i class="fas fa-route text-lg"></i></div>
          <h3 class="mt-5 text-xl font-extrabold tracking-tight text-slate-900">Designed around your journey</h3>
          <p class="mt-3 text-sm leading-7 text-slate-600">Whether you are looking for a useful digital resource, a service or a new opportunity, our focus is to make the next step clearer.</p>
          <div class="mt-6 border-t border-blue-100 pt-5">
            <p class="flex items-center gap-2 text-xs font-bold text-slate-700"><i class="fas fa-check-circle text-blue-600"></i> Clear information</p>
            <p class="mt-3 flex items-center gap-2 text-xs font-bold text-slate-700"><i class="fas fa-check-circle text-blue-600"></i> Straightforward navigation</p>
            <p class="mt-3 flex items-center gap-2 text-xs font-bold text-slate-700"><i class="fas fa-check-circle text-blue-600"></i> A people-first experience</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-slate-100 bg-slate-50 py-14 sm:py-20">
      <div class="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div class="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span class="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-700"><i class="fas fa-gem"></i> What guides us</span>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Our principles, in practice.</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">The values that shape how we build and improve Redmit.</p>
        </div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="(val, index) in values" :key="val.title" class="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:p-6">
            <div class="flex items-start justify-between">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white"><i :class="[val.icon, 'text-base']"></i></div>
              <span class="text-xs font-bold tracking-widest text-slate-300">0{{ index + 1 }}</span>
            </div>
            <h3 class="mt-5 text-base font-extrabold text-slate-900">{{ val.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ val.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white px-5 py-14 sm:px-6 sm:py-20">
      <div class="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-center sm:px-12 sm:py-14">
        <div class="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"></div>
        <div class="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div class="relative">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-200"><i class="fas fa-paper-plane"></i> Take the next step</span>
          <h2 class="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl">Ready to explore Redmit?</h2>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-300">Browse opportunities or reach out if you have a question. We would be glad to hear from you.</p>
          <div class="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <router-link to="/opportunities" class="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-400">Explore opportunities <i class="fas fa-arrow-right text-xs"></i></router-link>
            <router-link to="/contact-us" class="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"><i class="far fa-envelope"></i> Contact us</router-link>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'AboutPage',
  components: { Header, Footer },
  data() {
    return {
      values: [
        { title: 'Trust', desc: 'We aim to make digital interactions clearer, safer and easier to understand.', icon: 'fas fa-shield-alt' },
        { title: 'Simplicity', desc: 'Useful experiences should feel straightforward rather than complicated.', icon: 'fas fa-sparkles' },
        { title: 'Accessibility', desc: 'We want more people to discover useful digital resources and opportunities.', icon: 'fas fa-universal-access' },
        { title: 'Transparency', desc: 'Clear information helps people make confident decisions.', icon: 'fas fa-eye' },
        { title: 'Community', desc: 'Redmit is built around the needs and experiences of its community.', icon: 'fas fa-users' },
        { title: 'Progress', desc: 'We keep improving the platform as new needs and possibilities emerge.', icon: 'fas fa-arrow-trend-up' },
      ],
    };
  },
};
</script>
