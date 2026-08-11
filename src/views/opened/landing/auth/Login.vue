<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 font-sans">
    <div class="w-full max-w-md">
      
      <!-- Logo -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <img src="@/assets/img/logo.jpg" alt="Redmit" class="h-12 w-auto object-contain mx-auto mb-4" />
        </router-link>
        <h1 class="text-2xl font-black text-slate-900">Sign in to Redmit</h1>
        <p class="text-slate-500 text-sm mt-1">Welcome back! Enter your credentials</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">

          <div>
            <label class="field-label">Email</label>
            <input v-model="form.email" type="email" required
                   placeholder="you@example.com" class="field-input mt-1" />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label class="field-label">Password</label>
              <router-link to="/forgot-password"
                class="text-xs text-primary hover:text-primary-dark font-semibold transition">
                Forgot?
              </router-link>
            </div>
            <div class="relative">
              <input :type="showPwd ? 'text' : 'password'" v-model="form.password" required
                     placeholder="••••••••" class="field-input pr-11" />
              <button type="button" @click="showPwd = !showPwd"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
                <i :class="showPwd ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Error -->
          <p v-if="error" class="text-xs text-red-600 font-semibold flex items-center gap-1.5">
            <i class="fas fa-exclamation-circle"></i> {{ error }}
          </p>

          <!-- Submit -->
          <button type="submit" :disabled="loading"
            class="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60">
            <div v-if="loading"
                 class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>{{ loading ? 'Signing in…' : 'Sign In' }}</span>
          </button>

        </form>
      </div>

      <!-- Footer Links -->
      <div class="mt-6 text-center space-y-3">
        <p class="text-sm text-slate-600">
          Don't have an account?
          <router-link to="/register"
            class="text-secondary hover:text-secondary-dark font-bold ml-1 transition">
            Create one free
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
  name: 'LoginPage',
  data() {
    return {
      form:    { email: '', password: '' },
      error:   '',
      loading: false,
      showPwd: false,
    };
  },
  methods: {
    async handleLogin() {
      this.error   = '';
      this.loading = true;
      await new Promise(r => setTimeout(r, 600));

      const email = this.form.email.trim().toLowerCase();
      const pass  = this.form.password;

      if (email === 'admin@gmail.com' && pass === '1234') {
        localStorage.setItem('token', 'mock-admin-token');
        localStorage.setItem('role',  'admin');
        localStorage.setItem('name',  'Admin');
        localStorage.setItem('email', email);
        this.loading = false;
        this.$router.push('/dashboard/first-dash');
        return;
      }
      if (email === 'user@gmail.com' && pass === '1234') {
        localStorage.setItem('token', 'mock-user-token');
        localStorage.setItem('role',  'user');
        localStorage.setItem('name',  'User');
        localStorage.setItem('email', email);
        this.loading = false;
        this.$router.push('/dashboard/first-dash');
        return;
      }

      /* ── Real API — uncomment when backend is ready ──
      try {
        const res = await this.$apiPost('/auth/login', this.form);
        localStorage.setItem('token', res.token);
        localStorage.setItem('role',  res.role || res.user?.role?.code || '');
        localStorage.setItem('name',  res.user?.fullName || '');
        localStorage.setItem('email', res.user?.email   || '');
        this.$router.push('/dashboard/first-dash');
      } catch(err) {
        this.error = err?.response?.data?.message || 'Invalid credentials.';
      } finally { this.loading = false; }
      ── */

      this.error   = 'Incorrect email or password.';
      this.loading = false;
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
