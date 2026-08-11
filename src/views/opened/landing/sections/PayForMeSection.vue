<template>
  <section id="pay-for-me" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">

      <!-- Header -->
      <div class="text-center mb-16">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 border border-red-200 rounded-full text-xs font-bold text-red-700 uppercase tracking-widest mb-4">
          <i class="fas fa-hand-holding-usd text-[10px]"></i> Digital Access — Pay For Me
        </span>
        <h2 class="text-4xl font-black text-slate-900 mb-4">We Pay For Your Global Digital Services</h2>
        <p class="text-slate-500 text-sm max-w-2xl mx-auto leading-relaxed">
          Can't pay internationally? Redmit handles it for you. Submit your request, pay locally in ETB, and we'll take care of the rest — AI tools, courses, exams, hosting, and more.
        </p>
      </div>

      <!-- How it works steps -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 relative">
        <div class="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px
                    bg-gradient-to-r from-transparent via-red-200 to-transparent pointer-events-none"></div>
        <div v-for="(step, i) in steps" :key="step.title" class="text-center relative">
          <div class="relative inline-flex mb-5">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border-2 border-red-100 bg-red-50">
              <i :class="[step.icon, 'text-red-500 text-2xl']"></i>
            </div>
            <span class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-white text-[10px] font-black flex items-center justify-center">
              {{ i + 1 }}
            </span>
          </div>
          <h4 class="font-black text-slate-800 text-sm mb-1.5">{{ step.title }}</h4>
          <p class="text-xs text-slate-500 leading-relaxed max-w-[160px] mx-auto">{{ step.desc }}</p>
        </div>
      </div>

      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <div v-for="service in services" :key="service.title"
          class="group bg-white border border-slate-200 rounded-2xl p-6
                 hover:border-red-200 hover:shadow-lg hover:shadow-red-50 transition-all duration-300">
          <div class="flex items-start gap-4 mb-4">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" :class="service.bg">
              <i :class="[service.icon, service.color, 'text-xl']"></i>
            </div>
            <div>
              <h4 class="font-black text-slate-800 text-sm mb-0.5">{{ service.title }}</h4>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded-full" :class="service.badgeBg">
                {{ service.badge }}
              </span>
            </div>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed mb-4">{{ service.desc }}</p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="tag in service.examples" :key="tag"
              class="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full font-semibold">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- Pricing note + CTA -->
      <div class="bg-slate-900 rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row items-center gap-8">
        <div class="flex-1">
          <h3 class="text-xl font-black text-white mb-3">Simple Pricing</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div v-for="pkg in packages" :key="pkg.name"
              class="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors">
              <p class="text-xs font-black text-white/50 uppercase tracking-widest mb-1">{{ pkg.name }}</p>
              <p class="text-2xl font-black text-white mb-1">{{ pkg.fee }}</p>
              <p class="text-[10px] text-white/40">Service fee</p>
              <p class="text-xs text-white/60 mt-2">{{ pkg.desc }}</p>
            </div>
          </div>
          <p class="text-xs text-slate-500">* Service fee is charged on top of the actual service cost. You pay locally in ETB.</p>
        </div>
        <div class="shrink-0 text-center">
          <router-link to="/register"
            class="inline-flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-secondary-dark text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-secondary/25">
            <i class="fas fa-paper-plane text-xs"></i>
            Submit a Request
          </router-link>
          <p class="text-xs text-slate-600 mt-3">Sign in or create account to submit</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'PayForMeSection',
  data() {
    return {
      steps: [
        { title: 'Submit Request',    desc: 'Tell us what service you need and provide the link or details.',    icon: 'fas fa-paper-plane' },
        { title: 'Redmit Reviews',    desc: 'Our team reviews your request and sends you a payment invoice.',   icon: 'fas fa-search' },
        { title: 'Pay in ETB',        desc: 'Pay the service cost + small fee locally via bank or mobile money.',icon: 'fas fa-money-bill-wave' },
        { title: 'We Fulfill It',     desc: 'Redmit processes the international payment and confirms delivery.',  icon: 'fas fa-check-circle' },
      ],
      services: [
        {
          title: 'AI Subscriptions',
          badge: 'Most Requested', badgeBg: 'bg-red-100 text-red-700',
          desc:  'ChatGPT Plus, Claude Pro, Midjourney, Gemini Advanced, Copilot, and other AI tools — paid for you instantly.',
          icon:  'fas fa-robot', bg: 'bg-purple-50', color: 'text-purple-600',
          examples: ['ChatGPT Plus', 'Claude Pro', 'Midjourney', 'Gemini', 'Perplexity'],
        },
        {
          title: 'Online Courses',
          badge: 'Popular', badgeBg: 'bg-blue-100 text-blue-700',
          desc:  'Enroll in Udemy, Coursera, edX, Skillshare, LinkedIn Learning and other global e-learning platforms.',
          icon:  'fas fa-graduation-cap', bg: 'bg-blue-50', color: 'text-blue-600',
          examples: ['Udemy', 'Coursera', 'edX', 'Skillshare', 'LinkedIn Learning'],
        },
        {
          title: 'Domain & Hosting',
          badge: 'Available', badgeBg: 'bg-green-100 text-green-700',
          desc:  'Register .com, .org, .et domains and pay for Hostinger, Namecheap, GoDaddy, or any web hosting plan.',
          icon:  'fas fa-server', bg: 'bg-green-50', color: 'text-green-600',
          examples: ['Namecheap', 'GoDaddy', 'Hostinger', 'Bluehost', '.com domains'],
        },
        {
          title: 'Exam Registrations',
          badge: 'Specialized', badgeBg: 'bg-amber-100 text-amber-700',
          desc:  'Register for IELTS, TOEFL, GRE, GMAT, SAT, PMP and other international certification exams.',
          icon:  'fas fa-file-alt', bg: 'bg-amber-50', color: 'text-amber-600',
          examples: ['IELTS', 'TOEFL', 'GRE', 'GMAT', 'PMP', 'SAT'],
        },
        {
          title: 'Software Subscriptions',
          badge: 'Available', badgeBg: 'bg-indigo-100 text-indigo-700',
          desc:  'Adobe Creative Suite, Microsoft 365, Canva Pro, Notion, Figma, and other SaaS tools.',
          icon:  'fas fa-tools', bg: 'bg-indigo-50', color: 'text-indigo-600',
          examples: ['Adobe CC', 'Microsoft 365', 'Canva Pro', 'Notion', 'Figma'],
        },
        {
          title: 'Scholarship Application Fees',
          badge: 'New', badgeBg: 'bg-teal-100 text-teal-700',
          desc:  'Pay scholarship application fees for US, UK, EU, and other international universities on your behalf.',
          icon:  'fas fa-university', bg: 'bg-teal-50', color: 'text-teal-600',
          examples: ['University fees', 'Visa fees', 'Scholarship portals', 'Application fees'],
        },
      ],
      packages: [
        { name: 'Basic',   fee: '150 ETB', desc: 'Up to 2,000 ETB service value' },
        { name: 'Standard',fee: '300 ETB', desc: 'Up to 8,000 ETB service value' },
        { name: 'Premium', fee: '500 ETB', desc: 'Up to 25,000 ETB service value' },
      ],
    };
  },
};
</script>
