<template>
  <div class="min-h-screen bg-slate-50/50 font-sans text-slate-800 antialiased">
    <Header />
    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-100">
      <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm"><i class="fas fa-envelope text-[10px]"></i> Contact Redmit</span>
          <h1 class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight">Let's start a <span class="text-blue-600">conversation.</span></h1>
          <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">Have a question, idea or need help? Send us a message and the Redmit team will get back to you.</p>
        </div>
      </div>
    </section>

    <section class="py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div class="lg:col-span-4 space-y-4">
          <div v-for="info in contactInfo" :key="info.label" class="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><i :class="info.icon"></i></div>
            <div><p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">{{ info.label }}</p><p class="text-sm font-bold text-slate-800 mt-1">{{ info.value }}</p></div>
          </div>
        </div>
        <div class="lg:col-span-8">
          <div class="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-slate-200/40">
            <div class="mb-8"><h2 class="text-2xl font-black text-slate-900">Send us a message</h2><p class="text-sm text-slate-500 mt-2">Fill out the form below and our team will get back to you shortly.</p></div>
            <transition name="fade"><div v-if="submitted" class="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3"><i class="fas fa-check-circle text-emerald-600 mt-0.5"></i><p class="text-sm text-emerald-800 font-medium">Message sent successfully! The Redmit team will reply within 24 hours.</p></div></transition>
            <transition name="fade"><div v-if="errorMessage" class="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3"><i class="fas fa-exclamation-circle text-rose-600 mt-0.5"></i><p class="text-sm text-rose-800 font-medium">{{ errorMessage }}</p></div></transition>
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div><label for="fullName" class="field-label">Full Name <span>*</span></label><input id="fullName" v-model="form.fullName" type="text" required placeholder="Your full name" class="field-input" /></div>
                <div><label for="email" class="field-label">Contact Email <span>*</span></label><input id="email" v-model="form.email" type="email" required placeholder="you@example.com" class="field-input" /></div>
                <div><label for="phone" class="field-label">Phone Number <span>*</span></label><input id="phone" v-model.number="form.phone" type="number" required placeholder="911111111" class="field-input" /></div>
                <div><label for="subject" class="field-label">Subject <span>*</span></label><input id="subject" v-model="form.subject" type="text" required placeholder="How can we help?" class="field-input" /></div>
              </div>
              <div><label for="message" class="field-label">Message <span>*</span></label><textarea id="message" v-model="form.message" rows="6" required placeholder="Tell us how we can help..." class="field-input resize-none"></textarea></div>
              <button type="submit" :disabled="loading" class="w-full bg-primary hover:bg-primary-dark text-white py-4 px-8 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                <i v-if="loading" class="fas fa-spinner fa-spin"></i><span>{{ loading ? 'Sending Message...' : 'Send Message' }}</span><i v-if="!loading" class="fas fa-arrow-right text-xs"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    <login-modal v-if="showLogin" @close="showLogin = false" @switch-to-register="showLogin = false; showRegister = true" />
    <register-modal v-if="showRegister" @close="showRegister = false" @switch-to-login="showRegister = false; showLogin = true" />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
import LoginModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';
export default {
  name: 'ContactPage', components: { Header, Footer, LoginModal, RegisterModal },
  data() { return { showLogin: false, showRegister: false, loading: false, submitted: false, errorMessage: '', contactInfo: [{ label: 'Redmit HQ', value: 'Addis Ababa, Ethiopia', icon: 'fas fa-map-marker-alt' }, { label: 'Support Email', value: 'info@redmit.com', icon: 'fas fa-envelope' }, { label: 'Phone / Telegram', value: '+251 911 00 11 22', icon: 'fas fa-phone-alt' }], form: { fullName: '', email: '', phone: null, subject: '', message: '' } }; },
  methods: {
    async submitForm() {
      this.loading = true; this.submitted = false; this.errorMessage = '';
      try { await this.$apiPost('/contactMessage', { fullName: this.form.fullName, email: this.form.email, phone: Number(this.form.phone), subject: this.form.subject, message: this.form.message }); this.submitted = true; this.resetForm(); setTimeout(() => { this.submitted = false; }, 6000); }
      catch (error) { console.error('Failed to send contact message:', error); this.errorMessage = error?.response?.data?.message || 'Failed to send message. Please try again.'; }
      finally { this.loading = false; }
    },
    resetForm() { this.form = { fullName: '', email: '', phone: null, subject: '', message: '' }; },
  },
};
</script>

<style scoped>
.field-label { display:block; margin-bottom:.5rem; font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:#334155; }
.field-label span { color:#ef4444; }
.field-input { width:100%; background:white; border:1px solid #cbd5e1; border-radius:.75rem; padding:.875rem 1rem; outline:none; font-size:.875rem; font-weight:500; color:#0f172a; transition:all .2s; box-shadow:0 1px 2px rgba(15,23,42,.03); }
.field-input:focus { border-color:#2563eb; box-shadow:0 0 0 4px rgba(37,99,235,.08); }
.fade-enter-active, .fade-leave-active { transition:opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity:0; }
</style>
