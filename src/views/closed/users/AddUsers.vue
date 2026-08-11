<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
        <div>
          <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i class="fas fa-user-plus text-sm"></i>
            </span>
            Add User
          </h2>
          <p class="text-xs text-gray-400 mt-0.5 ml-10">Create a new account and assign a role</p>
        </div>
        <button
          type="button"
          @click="$emit('close')"
          class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <i class="fas fa-times text-sm"></i>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="submitForm" class="flex flex-col flex-1 min-h-0">
        <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.fullName"
              type="text"
              required
              placeholder="e.g. Kalayu Redae"
              class="input-base"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.phoneNumber"
                type="tel"
                required
                placeholder="0943662611"
                class="input-base"
              />
            </div>
            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="kalayu@example.com"
                class="input-base"
              />
            </div>
          </div>

          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700">
              Role <span class="text-red-500">*</span>
            </label>
            <select
              v-model.number="form.roleId"
              required
              :disabled="loadingRoles"
              class="input-base bg-white"
            >
              <option :value="null" disabled>
                {{ loadingRoles ? 'Loading roles...' : 'Select a role' }}
              </option>
              <option v-for="role in roles" :key="role.id" :value="role.id">
                {{ role.name }}{{ role.code ? ` (${role.code})` : '' }}
              </option>
            </select>
          </div>

          <div>
            <label class="block mb-1.5 text-sm font-medium text-gray-700">
              Password <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.password"
              type="password"
              required
              minlength="6"
              placeholder="••••••••"
              class="input-base"
            />
            <p class="text-[11px] text-gray-400 mt-1">Minimum 6 characters</p>
          </div>

          <div
            v-if="error"
            class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg text-sm"
          >
            <i class="fas fa-exclamation-circle shrink-0"></i>
            <span>{{ error }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading || loadingRoles"
            class="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            {{ loading ? 'Creating...' : 'Create User' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddUsers',
  emits: ['close', 'saved'],

  data() {
    return {
      loading: false,
      loadingRoles: false,
      error: '',
      roles: [],
      form: {
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        roleId: null,
      },
    };
  },

  async mounted() {
    await this.fetchRoles();
  },

  methods: {
    async fetchRoles() {
      this.loadingRoles = true;
      try {
        const res = await this.$apiGet('/role');
        // Support both { data: [...] } and plain array
        const list = Array.isArray(res) ? res : res?.data || [];
        this.roles = list.filter((r) => r.isActive !== false);
      } catch (e) {
        console.error(e);
        this.error = 'Failed to load roles.';
      } finally {
        this.loadingRoles = false;
      }
    },

    async submitForm() {
      this.error = '';

      if (!this.form.fullName?.trim()) {
        this.error = 'Full name is required.';
        return;
      }
      if (!this.form.phoneNumber?.trim()) {
        this.error = 'Phone number is required.';
        return;
      }
      if (!this.form.email?.trim()) {
        this.error = 'Email is required.';
        return;
      }
      if (!this.form.roleId) {
        this.error = 'Please select a role.';
        return;
      }
      if (!this.form.password || this.form.password.length < 6) {
        this.error = 'Password must be at least 6 characters.';
        return;
      }

      this.loading = true;
      try {
        const payload = {
          fullName: this.form.fullName.trim(),
          phoneNumber: this.form.phoneNumber.trim(),
          email: this.form.email.trim(),
          password: this.form.password,
          roleId: this.form.roleId,
        };

        await this.$apiPost('/user', payload);

        this.$root.$refs.toast?.showToast('User created successfully', 'success');
        this.$emit('saved');
        this.$emit('close');
      } catch (e) {
        this.error =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          'Failed to create user.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.input-base {
  @apply w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm
         focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
         transition disabled:bg-gray-50 disabled:text-gray-400;
}
</style>