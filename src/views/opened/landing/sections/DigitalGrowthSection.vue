<template>
  <section id="growth" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Section header -->
      <div class="text-center mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold
                     bg-blue-50 border border-blue-200 text-blue-700 uppercase tracking-widest mb-4">
          <i class="fas fa-chart-line text-[10px]"></i> Digital Growth
        </span>
        <h2 class="text-4xl font-black text-slate-900 mb-4">
          Advertise & Monetize Your Online Presence
        </h2>
        <p class="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
          Two powerful services to help you grow — we run your paid ads across major platforms,
          and we manage your own social media accounts to help you unlock and maximise monetization.
        </p>
      </div>

      <!-- ── TWO MAIN CARDS ── -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

        <!-- ADVERTISING -->
        <div class="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden
                    hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
          <!-- Blue top bar -->
          <div class="h-1.5 w-full" style="background:linear-gradient(90deg,#1e40af,#3b82f6)"></div>

          <div class="p-8">
            <!-- Title row -->
            <div class="flex items-center gap-4 mb-5">
              <div class="w-13 h-13 w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <i class="fas fa-bullhorn text-blue-600 text-2xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-black text-slate-900">Paid Advertising</h3>
                <p class="text-xs text-slate-500 mt-0.5">We create, launch & manage your campaigns</p>
              </div>
            </div>

            <p class="text-sm text-slate-600 leading-relaxed mb-7">
              Submit your campaign goal, target audience, and budget. Our team sets up and runs your ads
              on the platforms that matter — and reports back to you with results.
            </p>

            <!-- Platform grid -->
            <div class="grid grid-cols-3 gap-3 mb-7">
              <div v-for="p in adPlatforms" :key="p.name"
                class="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100
                       hover:border-blue-200 transition-colors text-center">
                <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="p.bg">
                  <i :class="[p.icon, p.color, 'text-xl']"></i>
                </div>
                <span class="text-[10px] font-bold text-slate-600 leading-tight">{{ p.name }}</span>
              </div>
            </div>

            <!-- What we do list -->
            <div class="space-y-2.5 mb-7">
              <div v-for="item in adServices" :key="item"
                class="flex items-start gap-2.5 text-sm text-slate-700">
                <i class="fas fa-check-circle text-blue-500 text-xs mt-0.5 shrink-0"></i>
                {{ item }}
              </div>
            </div>

            <router-link to="/register"
              class="w-full inline-flex items-center justify-center gap-2 py-3.5
                     bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold rounded-xl transition">
              Start a Campaign
              <i class="fas fa-arrow-right text-xs"></i>
            </router-link>
          </div>
        </div>

        <!-- MONETIZATION MANAGEMENT -->
        <div class="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden
                    hover:border-red-200 hover:shadow-xl hover:shadow-red-50 transition-all duration-300">
          <!-- Red top bar -->
          <div class="h-1.5 w-full" style="background:linear-gradient(90deg,#b91c1c,#ef4444)"></div>

          <div class="p-8">
            <!-- Title row -->
            <div class="flex items-center gap-4 mb-5">
              <div class="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                <i class="fas fa-money-bill-wave text-red-600 text-2xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-black text-slate-900">Monetization Management</h3>
                <p class="text-xs text-slate-500 mt-0.5">We manage your account — you earn</p>
              </div>
            </div>

            <p class="text-sm text-slate-600 leading-relaxed mb-5">
              We manage your <strong class="text-slate-800">own</strong> YouTube, Facebook, TikTok or
              Instagram account on your behalf — posting content, optimising for monetization,
              and handling the platform requirements so you qualify and keep earning.
              <span class="text-slate-500 italic"> Your account, your revenue — we just run it for you.</span>
            </p>

            <!-- How it works mini steps -->
            <div class="bg-slate-50 rounded-xl border border-slate-100 p-4 mb-6 space-y-3">
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">How it works</p>
              <div v-for="(step, i) in monetizationSteps" :key="step" class="flex items-start gap-3">
                <span class="w-5 h-5 rounded-full bg-red-100 text-red-600 text-[10px] font-black
                             flex items-center justify-center shrink-0 mt-0.5">{{ i + 1 }}</span>
                <span class="text-xs text-slate-600 leading-relaxed">{{ step }}</span>
              </div>
            </div>

            <!-- Platform icons row -->
            <div class="flex flex-wrap gap-2 mb-7">
              <div v-for="p in monetizationPlatforms" :key="p.name"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold"
                :class="p.style">
                <i :class="p.icon"></i>
                {{ p.name }}
              </div>
            </div>

            <!-- What we manage list -->
            <div class="space-y-2.5 mb-7">
              <div v-for="item in monetizationServices" :key="item"
                class="flex items-start gap-2.5 text-sm text-slate-700">
                <i class="fas fa-check-circle text-red-500 text-xs mt-0.5 shrink-0"></i>
                {{ item }}
              </div>
            </div>

            <router-link to="/register"
              class="w-full inline-flex items-center justify-center gap-2 py-3.5
                     bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition">
              Get Monetization Help
              <i class="fas fa-arrow-right text-xs"></i>
            </router-link>
          </div>
        </div>

      </div>

      <!-- Bottom CTA strip -->
      <div class="rounded-2xl border border-slate-200 bg-slate-50 px-8 py-7
                  flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <h4 class="font-black text-slate-900 text-base mb-1">Ready to grow your digital presence?</h4>
          <p class="text-sm text-slate-500">Create a free account and submit your growth request today.</p>
        </div>
        <router-link to="/register"
          class="shrink-0 px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold
                 text-sm rounded-xl transition shadow-md shadow-blue-900/20 whitespace-nowrap">
          Get Started Free
        </router-link>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'DigitalGrowthSection',
  data() {
    return {
      adPlatforms: [
        { name: 'Facebook',  icon: 'fab fa-facebook',  bg: 'bg-blue-100',   color: 'text-blue-600' },
        { name: 'Instagram', icon: 'fab fa-instagram', bg: 'bg-pink-100',   color: 'text-pink-600' },
        { name: 'TikTok',    icon: 'fab fa-tiktok',    bg: 'bg-slate-200',  color: 'text-slate-800' },
        { name: 'Google',    icon: 'fab fa-google',    bg: 'bg-red-100',    color: 'text-red-600' },
        { name: 'YouTube',   icon: 'fab fa-youtube',   bg: 'bg-red-100',    color: 'text-red-600' },
        { name: 'Others',    icon: 'fas fa-plus',      bg: 'bg-slate-100',  color: 'text-slate-500' },
      ],

      adServices: [
        'Campaign strategy & audience targeting setup',
        'Ad creative design guidance',
        'Budget management & optimisation',
        'Campaign performance monitoring & reporting',
        'Retargeting & lookalike audience setup',
      ],

      monetizationSteps: [
        'You share access to your account — we manage posting, scheduling & optimisation on your behalf.',
        'We apply platform best practices so your channel meets and maintains monetization requirements.',
        'Revenue goes directly to you — we charge only a service management fee.',
      ],

      monetizationPlatforms: [
        { name: 'YouTube',   icon: 'fab fa-youtube',   style: 'bg-red-50 border-red-200 text-red-700' },
        { name: 'Facebook',  icon: 'fab fa-facebook',  style: 'bg-blue-50 border-blue-200 text-blue-700' },
        { name: 'TikTok',    icon: 'fab fa-tiktok',    style: 'bg-slate-100 border-slate-200 text-slate-700' },
        { name: 'Instagram', icon: 'fab fa-instagram', style: 'bg-pink-50 border-pink-200 text-pink-700' },
      ],

      monetizationServices: [
        'Post videos & content to your own account on your schedule',
        'Optimise titles, descriptions, tags & thumbnails for reach',
        'YouTube Partner Program eligibility guidance & setup',
        'Facebook In-Stream Ads activation support',
        'Platform strikes, restrictions & appeals handling',
        'Ongoing channel growth strategy & performance review',
      ],
    };
  },
};
</script>
