<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 antialiased">
    <Header />

    <main class="pt-16">
      <section class="bg-slate-50 py-20 sm:py-28">
        <div class="max-w-7xl mx-auto px-6">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-bold text-indigo-700 uppercase tracking-widest">
              <i class="fas fa-bullhorn text-[10px]"></i> Social Media Marketing
            </span>
            <h1 class="mt-5 text-4xl sm:text-6xl font-black tracking-tight text-slate-900">
              Grow your brand with social media that works.
            </h1>
            <p class="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              We plan, create, publish and optimise social media content for brands and creators across the platforms that matter to your audience.
            </p>
            <div class="mt-8 flex flex-col sm:flex-row gap-3">
              <router-link to="/register" class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-secondary hover:bg-secondary-dark text-white font-black text-sm rounded-xl transition-all">
                Get Started <i class="fas fa-arrow-right text-xs"></i>
              </router-link>
              <router-link to="/contact-us" class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white border border-slate-200 hover:border-primary hover:text-primary text-slate-700 font-bold text-sm rounded-xl transition-all">
                Talk to Us
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 sm:py-24">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center max-w-2xl mx-auto mb-14">
            <p class="text-xs font-black uppercase tracking-widest text-indigo-600">What we do</p>
            <h2 class="mt-3 text-3xl sm:text-4xl font-black text-slate-900">Everything you need to build a stronger presence.</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article v-for="service in services" :key="service.title" class="p-7 rounded-2xl border border-slate-200 bg-white hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                <i :class="service.icon" class="text-xl"></i>
              </div>
              <h3 class="text-lg font-black text-slate-900">{{ service.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-500">{{ service.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="py-20 bg-slate-50">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p class="text-xs font-black uppercase tracking-widest text-indigo-600">Platforms</p>
            <h2 class="mt-3 text-3xl sm:text-4xl font-black text-slate-900">Meet your audience where they already are.</h2>
            <p class="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">Our social media marketing service can support the major platforms, with the content and strategy adapted to each channel.</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div v-for="platform in platforms" :key="platform.name" class="bg-white border border-slate-200 rounded-2xl p-5 text-center">
              <i :class="platform.icon" class="text-2xl text-slate-800"></i>
              <p class="mt-3 text-xs font-bold text-slate-700">{{ platform.name }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-20 sm:py-24">
        <div class="max-w-5xl mx-auto px-6">
          <div class="rounded-3xl bg-slate-900 p-8 sm:p-12 text-white text-center">
            <p class="text-xs font-black uppercase tracking-widest text-indigo-300">Ready to grow?</p>
            <h2 class="mt-3 text-3xl sm:text-4xl font-black">Let Redmit handle your social media marketing.</h2>
            <p class="mt-4 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-slate-300">Tell us about your brand, goals and audience. We will help you build a practical social strategy and a content plan that fits.</p>
            <router-link to="/register" class="mt-7 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-sm font-black transition-colors">
              Start Now <i class="fas fa-arrow-right text-xs"></i>
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'AssetsPage',
  components: { Header, Footer },
  data() {
    return {
      services: [
        { title: 'Content Strategy', description: 'A clear content direction built around your audience, goals, offers and brand voice.', icon: 'fas fa-lightbulb' },
        { title: 'Content Creation', description: 'Scroll-stopping posts, captions, creative concepts and campaign content tailored to your channels.', icon: 'fas fa-pen-nib' },
        { title: 'Publishing & Scheduling', description: 'Consistent publishing and scheduling so your channels stay active without the daily workload.', icon: 'fas fa-calendar-alt' },
        { title: 'Community Management', description: 'Help managing comments, messages and audience interactions while keeping your brand voice consistent.', icon: 'fas fa-comments' },
        { title: 'Growth & Optimisation', description: 'Performance reviews and ongoing optimisation to improve reach, engagement and conversion.', icon: 'fas fa-chart-line' },
        { title: 'Campaign Management', description: 'Social campaigns coordinated around launches, promotions and other important business moments.', icon: 'fas fa-bullhorn' },
      ],
      platforms: [
        { name: 'Instagram', icon: 'fab fa-instagram' },
        { name: 'Facebook', icon: 'fab fa-facebook' },
        { name: 'TikTok', icon: 'fab fa-tiktok' },
        { name: 'YouTube', icon: 'fab fa-youtube' },
      ],
    };
  },
};
</script>
