<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-slate-900/75 backdrop-blur-sm" @click="$emit('close')"></div>

    <div class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
      <!-- Top accent bar -->
      <div class="h-1 w-full bg-gradient-to-r from-primary via-primary-light to-secondary"></div>

      <button @click="$emit('close')"
        class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition z-10">
        <i class="fas fa-times text-xs"></i>
      </button>

      <div class="p-8">
        <!-- Logo -->
        <div class="flex items-center gap-3 mb-6">
          <img src="@/assets/img/logo.jpg" alt="Redmit" class="h-9 w-auto object-contain" />
        </div>

        <h2 class="text-2xl font-black text-slate-900 mb-1">Welcome back</h2>
        <p class="text-sm text-gray-400 mb-7">Sign in to your Redmit account</p>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-0 focus:border-primary transition"
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-1.5">
              <label class="text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
              <a href="/forgot-password" class="text-xs text-primary hover:text-primary-dark font-medium">Forgot?</a>
            </div>
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-0 focus:border-primary transition pr-11"
              />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-sm"></i>
              </button>
            </div>
          </div>

          <div v-if="error" class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-xs font-medium">
            <i class="fas fa-exclamation-circle"></i>
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-xs text-gray-400 mt-6">
          Don't have an account?
          <button @click="$emit('switch-to-register')" class="text-secondary hover:text-secondary-dark font-bold ml-1">
            Create one
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  emits: ['close', 'switch-to-register'],
  data() {
    return {
      form: { email: '', password: '' },
      error: '',
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    async login() {
      this.error = '';
      this.loading = true;

      // ── Mock login — backend disabled ──────────────────────────
      await new Promise(r => setTimeout(r, 600)); // simulate network
      const email    = this.form.email.trim().toLowerCase();
      const password = this.form.password;

      if (email === 'admin@gmail.com' && password === '1234') {
        localStorage.setItem('token', 'mock-admin-token');
        localStorage.setItem('role',  'admin');
        localStorage.setItem('name',  'Admin');
        localStorage.setItem('email', email);
        this.loading = false;
        this.$emit('close');
        this.$router.push({ path: '/dashboard/first-dash' });
        return;
      }

      if (email === 'user@gmail.com' && password === '1234') {
        localStorage.setItem('token', 'mock-user-token');
        localStorage.setItem('role',  'user');
        localStorage.setItem('name',  'User');
        localStorage.setItem('email', email);
        this.loading = false;
        this.$emit('close');
        this.$router.push({ path: '/dashboard/first-dash' });
        return;
      }

      /* ── Real API call (commented out until backend is ready) ──
      try {
        const response = await this.$apiPost('/auth/login', {
          phoneNumber: this.form.email,
          password: this.form.password,
        });
        localStorage.setItem('access', response.token);
        localStorage.setItem('token', response.token);
        if (response.user) {
          localStorage.setItem('userId', response.user.id);
          localStorage.setItem('name', response.user.fullName || '');
          localStorage.setItem('email', response.user.email || '');
        }
        const userRole = response.role || response.user?.role?.code || '';
        localStorage.setItem('role', userRole);
        this.$emit('close');
        this.$router.push({ path: '/dashboard/first-dash' });
      } catch (err) {
        this.error = err?.response?.data?.message || 'Invalid credentials.';
      } finally {
        this.loading = false;
      }
      */

      this.error   = 'Invalid email or password.';
      this.loading = false;
    },
  },
};
</script>
