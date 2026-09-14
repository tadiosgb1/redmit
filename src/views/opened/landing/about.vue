<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    <Header />

    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-100">
      <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm">
            <i class="fas fa-info-circle text-[10px]"></i> About Redmit
          </span>
          <h1 class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight">
            Built for a more <span class="text-blue-600">connected digital life.</span>
          </h1>
          <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Redmit brings useful digital experiences together in one trusted place, helping people discover, exchange and make better use of opportunities online.
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">Our Mission</span>
          <h2 class="text-3xl font-black text-gray-900 mt-3 mb-6 leading-tight">Making digital access simpler and more useful.</h2>
          <p class="text-gray-500 leading-relaxed mb-4 text-sm">Redmit is designed around a simple idea: digital products, assets and opportunities should be easier to discover, understand and access.</p>
          <p class="text-gray-500 leading-relaxed text-sm">We are building an experience that connects people with useful digital resources while keeping the journey straightforward, transparent and easy to navigate.</p>
        </div>
        <div class="rounded-3xl bg-slate-50 border border-slate-200 p-8 lg:p-10">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6"><i class="fas fa-compass"></i></div>
          <h3 class="text-xl font-black text-slate-900 mb-3">A platform that grows with its community.</h3>
          <p class="text-sm text-slate-500 leading-relaxed">From discovering something you need to finding an opportunity worth pursuing, Redmit is focused on making every interaction clear and valuable.</p>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-50 relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-6">
        <div class="max-w-2xl mb-12">
          <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">What matters to us</span>
          <h2 class="text-3xl font-black text-gray-900 mt-3">Simple principles behind Redmit.</h2>
          <p class="text-gray-500 mt-3 text-sm leading-relaxed">We keep the experience practical, trustworthy and centered on the people using it.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="val in values" :key="val.title" class="bg-white border border-slate-200 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
            <i :class="[val.icon, 'text-primary text-xl mb-4 block']"></i>
            <h3 class="font-bold text-slate-900 mb-2">{{ val.title }}</h3>
            <p class="text-sm text-slate-500 leading-relaxed">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-white">
      <div class="max-w-3xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-black text-gray-900 mb-4">Explore what Redmit has to offer.</h2>
        <p class="text-gray-500 mb-8 text-sm leading-relaxed">Discover products, assets and opportunities or get in touch with our team.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/opportunities" class="px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-bold rounded-xl shadow-lg shadow-secondary/20 transition-all text-sm">Explore Opportunities</router-link>
          <router-link to="/contact-us" class="px-8 py-4 bg-white border border-slate-200 hover:border-primary/40 text-gray-700 hover:text-primary font-semibold rounded-xl transition-all text-sm shadow-sm">Contact Us</router-link>
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
