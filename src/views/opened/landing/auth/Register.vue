<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 font-sans">
    <div class="w-full max-w-md">
      
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <img src="@/assets/img/logo.jpg" alt="Redmit" class="h-12 w-auto object-contain mx-auto mb-4" />
        </router-link>
        <h1 class="text-2xl font-black text-slate-900">Create your account</h1>
        <p class="text-slate-500 text-sm mt-1">Join Redmit — it's free</p>
      </div>

      <!-- Success State -->
      <div v-if="success" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div class="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <i class="fas fa-check-circle text-green-500 text-3xl"></i>
        </div>
        <h2 class="text-xl font-black text-slate-900 mb-2">Account created!</h2>
        <p class="text-slate-500 text-sm mb-6">You can now sign in to Redmit.</p>
        <router-link to="/login"
          class="inline-block w-full px-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition">
          Sign In →
        </router-link>
      </div>

      <!-- Form Card -->
      <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form @submit.prevent="handleRegister" class="space-y-4">

          <!-- Full Name -->
          <div>
            <label class="field-label">Full Name</label>
            <input v-model="form.fullName" type="text" required
                   placeholder="John Doe" class="field-input mt-1" />
          </div>

          <!-- Username -->
          <div>
            <label class="field-label">Username</label>
            <input v-model="form.username" type="text" required
                   placeholder="john_doe" class="field-input mt-1" />
          </div>

          <!-- Email Address -->
          <div>
            <label class="field-label">Email Address</label>
            <input v-model="form.email" type="email" required
                   placeholder="john@example.com" class="field-input mt-1" />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="field-label">Phone Number</label>
            <input v-model="form.phone" type="tel" required
                   placeholder="+1234567890" class="field-input mt-1" />
          </div>

          <!-- Avatar Image Upload -->
          <div>
            <label class="field-label">Avatar</label>
            <div class="mt-1 flex items-center gap-3">
              <div v-if="avatarPreview" class="w-12 h-12 rounded-full overflow-hidden border border-slate-200 shrink-0">
                <img :src="avatarPreview" class="w-full h-full object-cover" alt="Preview" />
              </div>
              <input type="file" ref="avatarInput" accept="image/*" @change="handleFileUpload"
                     class="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer" />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label class="field-label">Password</label>
            <div class="relative mt-1">
              <input :type="showPwd ? 'text' : 'password'" v-model="form.password" required
                     placeholder="Password123!" class="field-input pr-11" />
              <button type="button" @click="showPwd = !showPwd"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                <i :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>

            <!-- Password Validation Rules Indicator -->
            <div class="mt-2 grid grid-cols-2 gap-1.5 text-[11px] text-slate-500">
              <span :class="pwdRules.min ? 'text-green-600 font-semibold' : ''" class="flex items-center gap-1">
                <i :class="pwdRules.min ? 'fas fa-check' : 'fas fa-circle text-[6px]'"></i> 8+ Characters
              </span>
              <span :class="pwdRules.upper ? 'text-green-600 font-semibold' : ''" class="flex items-center gap-1">
                <i :class="pwdRules.upper ? 'fas fa-check' : 'fas fa-circle text-[6px]'"></i> Uppercase letter
              </span>
              <span :class="pwdRules.lower ? 'text-green-600 font-semibold' : ''" class="flex items-center gap-1">
                <i :class="pwdRules.lower ? 'fas fa-check' : 'fas fa-circle text-[6px]'"></i> Lowercase letter
              </span>
              <span :class="pwdRules.number ? 'text-green-600 font-semibold' : ''" class="flex items-center gap-1">
                <i :class="pwdRules.number ? 'fas fa-check' : 'fas fa-circle text-[6px]'"></i> Number
              </span>
              <span :class="pwdRules.special ? 'text-green-600 font-semibold' : ''" class="flex items-center gap-1 col-span-2">
                <i :class="pwdRules.special ? 'fas fa-check' : 'fas fa-circle text-[6px]'"></i> Special character (!@#$%^&*)
              </span>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="field-label">Confirm Password</label>
            <input :type="showPwd ? 'text' : 'password'" v-model="form.confirmPassword" required
                   placeholder="Repeat password" class="field-input mt-1" />
          </div>

          <!-- Terms -->
          <label class="flex items-start gap-2.5 cursor-pointer pt-1">
            <input v-model="form.agreed" type="checkbox" required
              class="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary shrink-0 cursor-pointer" />
            <span class="text-xs text-slate-500 leading-relaxed">
              I agree to Redmit's
              <a href="#" class="text-primary font-semibold hover:underline">Terms of Service</a>
              and
              <a href="#" class="text-primary font-semibold hover:underline">Privacy Policy</a>
            </span>
          </label>

          <!-- Error -->
          <p v-if="error" class="text-xs text-red-600 font-semibold flex items-center gap-1.5">
            <i class="fas fa-exclamation-circle"></i> {{ error }}
          </p>

          <!-- Submit -->
          <button type="submit" :disabled="loading || !form.agreed"
            class="w-full py-3.5 bg-secondary hover:bg-secondary-dark text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50">
            <div v-if="loading"
                 class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>{{ loading ? 'Creating account…' : 'Create Account' }}</span>
          </button>

        </form>
      </div>

      <!-- Footer Links -->
      <div v-if="!success" class="mt-6 text-center space-y-3">
        <p class="text-sm text-slate-600">
          Already have an account?
          <router-link to="/login"
            class="text-primary hover:text-primary-dark font-bold ml-1 transition">
            Sign in
          </router-link>
        </p>
        <router-link to="/"
          class="text-xs text-slate-400 hover:text-primary transition inline-flex items-center gap-1">
          <i class="fas fa-arrow-left text-[10px]"></i> Back to Home
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      loading: false,
      success: false,
      error: '',
      showPwd: false,
      avatarFile: null,
      avatarPreview: null,
      form: {
        fullName: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreed: false,
      },
    };
  },
  computed: {
    pwdRules() {
      const pwd = this.form.password;
      return {
        min: pwd.length >= 8,
        upper: /[A-Z]/.test(pwd),
        lower: /[a-z]/.test(pwd),
        number: /[0-9]/.test(pwd),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
      };
    },
    isPasswordValid() {
      return Object.values(this.pwdRules).every(Boolean);
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.avatarFile = file;
        this.avatarPreview = URL.createObjectURL(file);
      }
    },
    async handleRegister() {
      this.error = '';

      if (!this.form.fullName.trim()) { this.error = 'Full name is required.'; return; }
      if (!this.form.username.trim()) { this.error = 'Username is required.'; return; }
      if (!this.form.email.trim()) { this.error = 'Email address is required.'; return; }
      if (!this.form.phone.trim()) { this.error = 'Phone number is required.'; return; }
      
      if (!this.isPasswordValid) {
        this.error = 'Password does not meet all security requirements.';
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }

      if (!this.form.agreed) {
        this.error = 'You must agree to the terms.';
        return;
      }

      this.loading = true;

      try {
        // Construct multipart/form-data payload
        const payload = new FormData();
        payload.append('fullName', this.form.fullName.trim());
        payload.append('username', this.form.username.trim());
        payload.append('email', this.form.email.trim());
        payload.append('phone', this.form.phone.trim());
        payload.append('password', this.form.password);

        if (this.avatarFile) {
          payload.append('avatar', this.avatarFile);
        }

        const headers = {
          'Content-Type': 'multipart/form-data',
        };

        await this.$apiPost('auth/register', payload, headers);
        this.success = true;
      } catch (err) {
        this.error = err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.field-label { @apply block text-xs font-bold text-slate-600 uppercase tracking-wider; }
.field-input {
  @apply w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900
         placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all;
}
</style>