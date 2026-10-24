<template>
  <div class="min-h-screen bg-white pt-16 font-sans text-slate-800 antialiased">
    <Header />

    <section class="border-b border-slate-200 bg-slate-50">
      <div class="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
        <p class="text-sm font-semibold text-blue-700">Contact Redmit</p>
        <h1 class="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">How can we help?</h1>
        <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">Send us your question or feedback. Share a few details and our team will get back to you.</p>
      </div>
    </section>

    <main class="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-5 lg:gap-14">
      <aside class="lg:col-span-2">
        <h2 class="text-xl font-bold text-slate-950">Get in touch</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">Choose the contact detail that works best for you.</p>
        <div class="mt-6 divide-y divide-slate-200 border-y border-slate-200">
          <div v-for="info in contactInfo" :key="info.label" class="flex items-start gap-4 py-5">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><i :class="info.icon"></i></div>
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-wider text-slate-500">{{ info.label }}</p>
              <p class="mt-1 break-words text-sm font-semibold text-slate-900">{{ info.value }}</p>
            </div>
          </div>
        </div>
        <p class="mt-6 text-xs leading-5 text-slate-500"><i class="fas fa-info-circle mr-1.5 text-blue-600"></i> For service-related questions, include the service name in your message so we can direct your inquiry appropriately.</p>
      </aside>

      <section class="lg:col-span-3">
        <div class="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <div class="mb-7 border-b border-slate-100 pb-5">
            <h2 class="text-xl font-bold text-slate-950">Send a message</h2>
            <p class="mt-2 text-sm leading-6 text-slate-600">Fields marked with <span class="text-red-600">*</span> are required.</p>
          </div>

          <transition name="fade">
            <div v-if="submitted" role="status" class="mb-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <i class="fas fa-check-circle mt-0.5 text-emerald-700"></i>
              <p class="text-sm leading-6 text-emerald-900">Message sent successfully! The Redmit team will reply within 24 hours.</p>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="errorMessage" role="alert" class="mb-6 flex items-start gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4">
              <i class="fas fa-exclamation-circle mt-0.5 text-rose-700"></i>
              <p class="text-sm leading-6 text-rose-900">{{ errorMessage }}</p>
            </div>
          </transition>

          <form @submit.prevent="submitForm" class="space-y-5">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label for="fullName" class="field-label">Full name <span>*</span></label>
                <input id="fullName" v-model="form.fullName" type="text" autocomplete="name" required placeholder="Your full name" class="field-input" />
              </div>
              <div>
                <label for="email" class="field-label">Email address <span>*</span></label>
                <input id="email" v-model="form.email" type="email" autocomplete="email" required placeholder="you@example.com" class="field-input" />
              </div>
              <div>
                <label for="phone" class="field-label">Phone number <span>*</span></label>
                <input id="phone" v-model="form.phone" type="tel" autocomplete="tel" required placeholder="+251..." class="field-input" />
              </div>
              <div>
                <label for="subject" class="field-label">Subject <span>*</span></label>
                <input id="subject" v-model="form.subject" type="text" required placeholder="What is this about?" class="field-input" />
              </div>
            </div>
            <div>
              <label for="message" class="field-label">Your message <span>*</span></label>
              <textarea id="message" v-model="form.message" rows="5" required placeholder="Tell us how we can help..." class="field-input resize-y"></textarea>
            </div>
            <button type="submit" :disabled="loading" class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
              <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              <span>{{ loading ? 'Sending message…' : 'Send message' }}</span>
              <i v-if="!loading" class="fas fa-arrow-right text-xs"></i>
            </button>
          </form>
        </div>
      </section>
    </main>

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
  name: 'ContactPage',
  components: { Header, Footer, LoginModal, RegisterModal },
  data() {
    return {
      showLogin: false,
      showRegister: false,
      loading: false,
      submitted: false,
      errorMessage: '',
      contactInfo: [
        { label: 'Redmit HQ', value: 'Addis Ababa, Ethiopia', icon: 'fas fa-map-marker-alt' },
        { label: 'Support Email', value: 'info@redmit.com', icon: 'fas fa-envelope' },
        { label: 'Phone / Telegram', value: '+251 911 00 11 22', icon: 'fas fa-phone-alt' },
      ],
      form: { fullName: '', email: '', phone: '', subject: '', message: '' },
    };
  },
  mounted() {
    const service = this.$route.query.service;
    if (typeof service === 'string' && service) {
      this.form.subject = `Growth service inquiry: ${service}`;
      this.form.message = `Hello Redmit team,\n\nI am interested in the "${service}" growth service. Please share the next steps and available payment options.\n\nThank you.`;
    }
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.submitted = false;
      this.errorMessage = '';
      try {
        await this.$apiPost('/contactMessage', {
          fullName: this.form.fullName,
          email: this.form.email,
          phone: Number(this.form.phone),
          subject: this.form.subject,
          message: this.form.message,
        });
        this.submitted = true;
        this.resetForm();
        setTimeout(() => { this.submitted = false; }, 6000);
      } catch (error) {
        console.error('Failed to send contact message:', error);
        this.errorMessage = error?.response?.data?.message || 'Failed to send message. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = { fullName: '', email: '', phone: '', subject: '', message: '' };
    },
  },
};
</script>

<style scoped>
.field-label {
  display: block;
  margin-bottom: .5rem;
  color: #334155;
  font-size: .75rem;
  font-weight: 700;
}
.field-label span { color: #dc2626; }
.field-input {
  width: 100%;
  border: 1px solid #cbd5e1;
  border-radius: .5rem;
  background: #fff;
  padding: .75rem .875rem;
  color: #0f172a;
  font-size: .875rem;
  line-height: 1.5rem;
  outline: none;
  transition: border-color .15s ease, box-shadow .15s ease;
}
.field-input::placeholder { color: #94a3b8; }
.field-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, .12);
}
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
