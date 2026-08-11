<template>
  <section class="relative py-28 bg-brand-bg overflow-hidden">
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px]
                bg-primary/5 rounded-full blur-[70px] pointer-events-none"></div>

    <div class="relative max-w-3xl mx-auto px-6">
      <div class="text-center mb-16">
        <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">FAQ</span>
        <h2 class="text-4xl font-black text-gray-900 mt-4 mb-3">Common questions</h2>
        <p class="text-gray-500 text-sm">Everything you need to know before getting started on Redmit.</p>
      </div>

      <div class="space-y-3">
        <div v-for="(faq, i) in faqs" :key="faq.q"
          class="bg-white border border-slate-200 rounded-2xl overflow-hidden
                 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 transition-all duration-300">
          <button @click="toggle(i)"
            class="w-full flex items-center justify-between px-6 py-5 text-left group">
            <span class="font-bold text-gray-800 text-sm group-hover:text-primary transition-colors duration-300">{{ faq.q }}</span>
            <i class="fas text-gray-400 text-xs transition-all duration-300 shrink-0 ml-4"
              :class="open === i ? 'fa-minus text-primary' : 'fa-plus'"></i>
          </button>
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 max-h-0"
            enter-to-class="opacity-100 max-h-48"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 max-h-48"
            leave-to-class="opacity-0 max-h-0">
            <div v-if="open === i" class="px-6 pb-5 border-t border-slate-100">
              <p class="text-sm text-gray-500 leading-relaxed pt-4">{{ faq.a }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FaqSection',
  data() {
    return {
      open: null,
      faqs: [
        {
          q: 'What is Redmit Market?',
          a: 'Redmit is Ethiopia\'s unified digital marketplace with four core services: Digital Products (buy/sell downloads), Digital Assets (trade accounts & domains), Digital Access (Redmit helps you pay for global services), and Digital Growth (advertising and monetization support).',
        },
        {
          q: 'How do I sell a digital product?',
          a: 'Create a seller account, upload your file, add a title, description, category, tags, and price, then publish. Customers can buy and instantly download your product. You earn from every sale.',
        },
        {
          q: 'How are digital asset transfers verified?',
          a: 'Redmit verifies seller-provided statistics and ownership claims before marking an asset verified. Trading must comply with platform rules and applicable law. Statistics provided by sellers are not automatically treated as verified.',
        },
        {
          q: 'What is Digital Access and how does it work?',
          a: 'Digital Access is a Redmit-operated service for users who need help paying for global digital services like AI subscriptions, online courses, hosting, or international exam fees. You submit a request, Redmit reviews it, processes the payment, and updates you on the status.',
        },
        {
          q: 'What advertising platforms does Digital Growth support?',
          a: 'Redmit supports Facebook Ads, Instagram Ads, TikTok Ads, Google Ads, and other approved platforms. Growth packages (Basic / Medium / Premium) are available for both advertising campaigns and social media monetization assistance.',
        },
        {
          q: 'Is there a single account for all Redmit services?',
          a: 'Yes. All four services share the same user account, order system, and payment infrastructure. There is no need for separate accounts per service.',
        },
      ],
    };
  },
  methods: {
    toggle(i) { this.open = this.open === i ? null : i; },
  },
};
</script>
