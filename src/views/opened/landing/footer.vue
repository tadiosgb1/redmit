<template>
  <footer class="bg-slate-900 text-white pt-16 pb-8 px-6">
    <div class="max-w-7xl mx-auto">

      <!-- Top section -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-12 pb-12 border-b border-white/10">

        <!-- Brand column -->
        <div class="md:col-span-2 space-y-5">
          <div class="flex items-center gap-3">
            <img
              src="@/assets/img/logo.jpg"
              alt="Redmit Market"
              class="h-12 w-auto object-contain"
            />
          </div>

          <p class="text-white/50 text-sm leading-relaxed max-w-sm">
            Ethiopia's unified digital marketplace — buy and sell digital products, trade digital assets, access global digital services, and grow your online presence.
          </p>

          <div class="flex items-start gap-2 text-xs text-white/40">
            <i class="fas fa-map-marker-alt mt-0.5 text-secondary-light"></i>
            <span>Addis Ababa, Ethiopia</span>
          </div>

          <!-- Tagline pills -->
          <div class="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest">
            <span class="px-2.5 py-1 rounded-full bg-white/10 text-white/60">Create</span>
            <span class="px-2.5 py-1 rounded-full bg-white/10 text-white/60">Sell</span>
            <span class="px-2.5 py-1 rounded-full bg-white/10 text-white/60">Buy</span>
            <span class="px-2.5 py-1 rounded-full bg-white/10 text-white/60">Grow</span>
          </div>

          <!-- Social links -->
          <div class="flex gap-3">
            <a v-for="social in socials" :key="social.name" href="#"
              :aria-label="social.name"
              class="w-9 h-9 rounded-xl bg-white/5 hover:bg-primary flex items-center justify-center transition-all duration-200 group">
              <i :class="[social.icon, 'text-sm text-white/50 group-hover:text-white transition-colors']"></i>
            </a>
          </div>
        </div>

        <!-- Nav columns -->
        <div v-for="group in navGroups" :key="group.title">
          <h3 class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">{{ group.title }}</h3>
          <ul class="space-y-3">
            <li v-for="link in group.links" :key="link.name">
              <router-link v-if="link.route" :to="link.route"
                class="text-sm text-white/60 hover:text-primary-light transition-colors">
                {{ link.name }}
              </router-link>
              <a v-else href="#"
                class="text-sm text-white/60 hover:text-primary-light transition-colors">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-white/30">
          © {{ new Date().getFullYear() }} Redmit Market — Ethiopia's Digital Marketplace. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</a>
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Use</a>
          <a href="#" class="text-xs text-white/30 hover:text-white/60 transition-colors">Seller Guidelines</a>
        </div>
        <a href="#top"
          class="w-10 h-10 bg-white/5 hover:bg-primary border border-white/10 hover:border-primary rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          title="Back to top">
          <i class="fas fa-arrow-up text-xs"></i>
        </a>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      socials: [
        { name: 'Telegram',  icon: 'fab fa-telegram-plane' },
        { name: 'Facebook',  icon: 'fab fa-facebook-f' },
        { name: 'Twitter',   icon: 'fab fa-twitter' },
        { name: 'YouTube',   icon: 'fab fa-youtube' },
        { name: 'Instagram', icon: 'fab fa-instagram' },
      ],
      navGroups: [
        {
          title: 'Marketplace',
          links: [
            { name: 'Digital Products',  route: null },
            { name: 'Digital Assets',    route: null },
            { name: 'Browse Categories', route: null },
            { name: 'Sell Your Products',route: null },
          ],
        },
        {
          title: 'Services',
          links: [
            { name: 'Digital Access',   route: null },
            { name: 'Digital Growth',   route: null },
            { name: 'Advertising',      route: null },
            { name: 'Monetization',     route: null },
          ],
        },
        {
          title: 'Redmit',
          links: [
            { name: 'About Us',   route: '/about' },
            { name: 'News',       route: '/news-events' },
            { name: 'Contact',    route: '/contact' },
            { name: 'Get Started',route: null },
          ],
        },
      ],
    };
  },
};
</script>
