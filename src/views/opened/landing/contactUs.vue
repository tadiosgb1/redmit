<template>
  <div class="min-h-screen bg-slate-50/50 font-sans text-slate-800 antialiased">
    <Header @open-login="showLogin = true" @open-register="showRegister = true" />

    <!-- ══════════════════════════════════════════════════════════
         HERO & CONTACT SECTION
         ══════════════════════════════════════════════════════════ -->
    <section class="relative overflow-hidden pt-16" style="background:#1e3a8a">
      <!-- Subtle diagonal split -->
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 w-1/2 h-full opacity-30"
             style="background:linear-gradient(135deg,transparent 0%,#1d4ed8 100%)"></div>
      </div>

      <!-- Faint dot grid -->
      <div class="absolute inset-0 opacity-[0.06] pointer-events-none"
           style="background-image:radial-gradient(#fff 1px,transparent 1px);background-size:32px 32px"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div class="max-w-4xl mx-auto text-center mb-16">
          <!-- Eyebrow -->
          <div class="inline-flex items-center gap-2 mb-7 px-3.5 py-1.5
                      bg-white/10 border border-white/20 rounded-full">
            <span class="w-1.5 h-1.5 rounded-full bg-red-400"></span>
            <span class="text-[11px] font-bold text-white/80 uppercase tracking-[0.18em]">
              Contact Redmit
            </span>
          </div>

          <!-- Headline -->
          <h1 class="text-5xl sm:text-6xl font-black text-white leading-[1.08] mb-6 tracking-tight">
            Get in Touch<br/>
            <span class="text-red-400">with Us</span>
          </h1>

          <!-- Sub -->
          <p class="text-blue-200 text-lg leading-relaxed max-w-3xl mx-auto">
            Have questions about buying, selling, Digital Access, or Digital Growth? Reach out to the Redmit team and we'll get back to you shortly.
          </p>
        </div>

        <!-- Contact Content -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <!-- Left Info Panel -->
          <div class="lg:col-span-5 space-y-6">
            <!-- Contact Cards -->
            <div class="grid grid-cols-1 gap-4">
              <div 
                v-for="info in contactInfo" 
                :key="info.label" 
                class="group p-5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-5"
              >
                <div class="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:bg-red-500 transition-colors duration-300">
                  <i :class="info.icon" class="text-lg"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-[11px] font-bold uppercase tracking-wider text-blue-200 mb-0.5">{{ info.label }}</p>
                  <p class="text-sm sm:text-base font-semibold text-white truncate">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Form Panel -->
          <div class="lg:col-span-7">
            <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20 relative">
              <div class="mb-8">
                <h3 class="text-2xl font-bold text-slate-900">Send us a message</h3>
                <p class="text-sm text-slate-500 mt-1">Fill out the form below and our team will get back to you shortly.</p>
              </div>

              <!-- Success Alert Banner -->
              <transition name="fade">
                <div v-if="submitted" class="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
                  <i class="fas fa-check-circle text-emerald-600 text-lg mt-0.5"></i>
                  <p class="text-sm text-emerald-800 font-medium">
                    Message sent successfully! The Redmit team will reply within 24 hours.
                  </p>
                </div>
              </transition>

              <!-- Error Alert Banner -->
              <transition name="fade">
                <div v-if="errorMessage" class="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
                  <i class="fas fa-exclamation-circle text-rose-600 text-lg mt-0.5"></i>
                  <p class="text-sm text-rose-800 font-medium">
                    {{ errorMessage }}
                  </p>
                </div>
              </transition>
              
              <form @submit.prevent="submitForm" class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <!-- Full Name Field -->
                  <div class="space-y-2">
                    <label for="fullName" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Full Name <span class="text-red-500">*</span>
                    </label>
                    <input 
                      id="fullName"
                      type="text" 
                      v-model="form.fullName" 
                      required 
                      placeholder="e.g. Kalayu Redae" 
                      class="w-full bg-white border-2 border-slate-300 focus:border-primary rounded-xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm" 
                    />
                  </div>

                  <!-- Email Field -->
                  <div class="space-y-2">
                    <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Contact Email <span class="text-red-500">*</span>
                    </label>
                    <input 
                      id="email"
                      type="email" 
                      v-model="form.email" 
                      required 
                      placeholder="kalayu@gmail.com" 
                      class="w-full bg-white border-2 border-slate-300 focus:border-primary rounded-xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm" 
                    />
                  </div>

                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  <!-- Phone Field -->
                  <div class="space-y-2">
                    <label for="phone" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Phone Number <span class="text-red-500">*</span>
                    </label>
                    <input 
                      id="phone"
                      type="number" 
                      v-model.number="form.phone" 
                      required 
                      placeholder="911111111" 
                      class="w-full bg-white border-2 border-slate-300 focus:border-primary rounded-xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm" 
                    />
                  </div>

                  <!-- Subject Field -->
                  <div class="space-y-2">
                    <label for="subject" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Subject <span class="text-red-500">*</span>
                    </label>
                    <input 
                      id="subject"
                      type="text" 
                      v-model="form.subject" 
                      required 
                      placeholder="Membership Information" 
                      class="w-full bg-white border-2 border-slate-300 focus:border-primary rounded-xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-sm" 
                    />
                  </div>

                </div>

                <!-- Message Field -->
                <div class="space-y-2">
                  <label for="message" class="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Message <span class="text-red-500">*</span>
                  </label>
                  <textarea 
                    id="message"
                    v-model="form.message" 
                    rows="4" 
                    required
                    placeholder="I want to know more about joining CPCT Youth..." 
                    class="w-full bg-white border-2 border-slate-300 focus:border-primary rounded-xl px-4 py-3.5 outline-none focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium text-slate-900 resize-none placeholder:text-slate-400 shadow-sm"
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full bg-primary hover:bg-slate-900 text-white py-4 px-8 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-none flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  <template v-if="loading">
                    <i class="fas fa-spinner fa-spin text-sm"></i>
                    <span>Sending Message...</span>
                  </template>
                  <template v-else>
                    <span>Send Message</span>
                    <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-xs"></i>
                  </template>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <!-- Bottom wave separator -->
      <div class="relative z-10 mt-20">
        <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg"
             class="w-full block -mb-px" preserveAspectRatio="none" style="height:56px">
          <path d="M0 56 C360 0 1080 0 1440 56 L1440 56 L0 56Z" fill="#f8fafc"/>
        </svg>
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
  name: 'ContactPage',
  components: { Header, Footer, LoginModal, RegisterModal },

  data() {
    return {
      showLogin: false,
      showRegister: false,
      loading: false,
      submitted: false,
      errorMessage: "",
      contactInfo: [
        { label: 'Redmit HQ',       value: 'Addis Ababa, Ethiopia',  icon: 'fas fa-map-marker-alt' },
        { label: 'Support Email',   value: 'info@redmit.com',        icon: 'fas fa-envelope' },
        { label: 'Phone / Telegram',value: '+251 911 00 11 22',       icon: 'fas fa-phone-alt' },
      ],
      form: {
        fullName: "",
        email: "",
        phone: null,
        subject: "",
        message: "",
      },
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.submitted = false;
      this.errorMessage = "";

      const payload = {
        fullName: this.form.fullName,
        email: this.form.email,
        phone: Number(this.form.phone),
        subject: this.form.subject,
        message: this.form.message,
      };

      try {
        const response = await this.$apiPost("/contactMessage", payload);
        
        this.submitted = true;
        this.resetForm();

        setTimeout(() => {
          this.submitted = false;
        }, 6000);
      } catch (error) {
        console.error("Failed to send contact message:", error);
        this.errorMessage = error?.response?.data?.message || "Failed to send message. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.form = {
        fullName: "",
        email: "",
        phone: null,
        subject: "",
        message: "",
      };
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>