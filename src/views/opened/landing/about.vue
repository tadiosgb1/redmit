<template>
  <div class="min-h-screen bg-white pt-16 font-sans text-slate-800 antialiased">
    <Header />

    <section class="border-b border-slate-100 bg-slate-50">
      <div class="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
        <p class="text-sm font-semibold text-blue-700">About Redmit</p>
        <h1 class="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">Making the digital world easier to navigate.</h1>
        <p class="mt-5 max-w-2xl text-base leading-7 text-slate-600">Redmit brings digital products, services and opportunities together in one place, so people can discover useful resources and take their next step.</p>
        <div class="mt-7 flex flex-col gap-3 sm:flex-row">
          <router-link to="/opportunities" class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Explore opportunities <i class="fas fa-arrow-right ml-2 text-xs"></i></router-link>
          <router-link to="/contact-us" class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">Contact us</router-link>
        </div>
      </div>
    </section>

    <section class="bg-white py-12 sm:py-16">
      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Why Redmit?</h2>
          <p class="mt-4 text-sm leading-7 text-slate-600 sm:text-base">Finding the right digital resource or opportunity can take time. Redmit aims to make that process simpler by bringing useful options together and keeping the experience clear and easy to use.</p>
          <p class="mt-4 text-sm leading-7 text-slate-600 sm:text-base">We continue to improve the platform around the needs of the people who use it.</p>
        </div>
        <div class="border-l-2 border-blue-100 pl-5 sm:pl-6">
          <h2 class="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Our mission</h2>
          <p class="mt-4 text-sm leading-7 text-slate-600 sm:text-base">To make digital products, services and opportunities easier to discover, understand and access.</p>
          <div class="mt-5 space-y-3">
            <p class="flex items-start gap-3 text-sm text-slate-700"><i class="fas fa-check mt-1 text-blue-600"></i><span>Clear and useful information</span></p>
            <p class="flex items-start gap-3 text-sm text-slate-700"><i class="fas fa-check mt-1 text-blue-600"></i><span>Simple, straightforward navigation</span></p>
            <p class="flex items-start gap-3 text-sm text-slate-700"><i class="fas fa-check mt-1 text-blue-600"></i><span>A people-focused experience</span></p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-slate-100 bg-slate-50 py-12 sm:py-16">
      <div class="mx-auto max-w-5xl px-5 sm:px-6">
        <div class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">What matters to us</h2>
          <p class="mt-3 text-sm leading-6 text-slate-600 sm:text-base">A few simple principles guide how we build and improve Redmit.</p>
        </div>
        <div class="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="val in values" :key="val.title" class="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600"><i :class="val.icon"></i></div>
            <div><h3 class="text-sm font-bold text-slate-900">{{ val.title }}</h3><p class="mt-1.5 text-sm leading-6 text-slate-600">{{ val.desc }}</p></div>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white py-12 sm:py-16">
      <div class="mx-auto flex max-w-5xl flex-col gap-5 px-5 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div><h2 class="text-2xl font-bold tracking-tight text-slate-950">Want to learn more?</h2><p class="mt-2 text-sm leading-6 text-slate-600">Explore Redmit or get in touch with our team.</p></div>
        <div class="flex flex-col gap-3 sm:flex-row">
          <router-link to="/products" class="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700">Browse products</router-link>
          <router-link to="/contact-us" class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">Contact us <i class="fas fa-arrow-right ml-2 text-xs"></i></router-link>
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
        { title: 'Clarity', desc: 'We aim to make information easy to understand.', icon: 'fas fa-eye' },
        { title: 'Simplicity', desc: 'Useful experiences should be straightforward.', icon: 'fas fa-compass' },
        { title: 'Accessibility', desc: 'We want digital resources to be easier to find.', icon: 'fas fa-universal-access' },
        { title: 'Transparency', desc: 'Clear details help people make informed choices.', icon: 'fas fa-check-circle' },
        { title: 'Community', desc: 'We listen to the needs of the people who use Redmit.', icon: 'fas fa-users' },
        { title: 'Progress', desc: 'We keep improving as needs and possibilities change.', icon: 'fas fa-chart-line' },
      ],
    };
  },
};
</script>
