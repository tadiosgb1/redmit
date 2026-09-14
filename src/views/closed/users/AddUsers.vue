<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div
      class="bg-white border border-slate-200 shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-slate-200 shrink-0 bg-slate-50">
        <div>
          <h2 class="text-base font-bold text-slate-800 flex items-center gap-2">
            <span class="w-8 h-8 bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <i class="fas fa-user-plus text-xs"></i>
            </span>
            Add User
          </h2>
          <p class="text-xs text-slate-500 mt-0.5 ml-10">Create a new account and assign a role</p>
        </div>
        <button
          type="button"
          @click="$emit('close')"
          class="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition"
          aria-label="Close"
        >
          <i class="fas fa-times text-sm"></i>
        </button>
      </div>

      <!-- Body -->
      <form @submit.prevent="submitForm" class="flex flex-col flex-1 min-h-0">
        <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <!-- Avatar File Upload & Preview -->
          <div>
            <label class="block mb-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
              Avatar Image
            </label>
            <div class="flex items-center gap-3">
              <!-- Avatar Preview -->
              <div class="w-12 h-12 border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative group">
                <img
                  v-if="avatarPreview"
                  :src="avatarPreview"
                  alt="Avatar Preview"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-xs font-bold text-slate-500">
                  {{ getInitials(form.fullName || form.username) }}
                </span>
              </div>

              <!-- Upload Actions -->
              <div class="flex items-center gap-2">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onFileSelected"
                />
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition flex items-center gap-1.5"
                >
                  <i class="fas fa-upload text-[11px]"></i>
                  <span>{{ avatarPreview ? 'Change Image' : 'Upload Image' }}</span>
                </button>
                <button
                  v-if="avatarPreview"
                  type="button"
                  @click="removeAvatar"
                  class="px-2 py-1.5 text-xs text-red-600 hover:bg-red-50 transition"
                  title="Remove image"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Full Name -->
          <div>
            <label class="block mb-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
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

          <!-- Username & Email -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                Username <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.username"
                type="text"
                required
                placeholder="kalayuredae"
                class="input-base"
              />
            </div>
            <div>
              <label class="block mb-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
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

          <!-- Phone Number & Role -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                Phone Number <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.phone"
                type="tel"
                required
                placeholder="0943662611"
                class="input-base"
              />
            </div>
            <div>
              <label class="block mb-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                Role <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.role"
                required
                :disabled="loadingRoles"
                class="input-base bg-white"
              >
                <option :value="null" disabled>
                  {{ loadingRoles ? 'Loading roles...' : 'Select a role' }}
                </option>
                <option v-for="role in roles" :key="role.id || role.code || role" :value="role.code || role.name || role">
                  {{ role.name || role.code || role }}
                </option>
              </select>
            </div>
          </div>

          <!-- Password Field with Manual/Generate toggle -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password <span class="text-red-500">*</span>
              </label>
              <button
                type="button"
                @click="generatePassword"
                class="text-xs text-emerald-600 hover:text-emerald-700 font-bold flex items-center gap-1 transition"
              >
                <i class="fas fa-key text-[10px]"></i>
                Generate Password
              </button>
            </div>

            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                minlength="6"
                placeholder="••••••••"
                class="input-base pr-20"
              />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="p-1.5 text-slate-400 hover:text-slate-600 transition"
                  title="Toggle visibility"
                >
                  <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                </button>
                <button
                  v-if="form.password"
                  type="button"
                  @click="copyPassword"
                  class="p-1.5 text-slate-400 hover:text-emerald-600 transition"
                  title="Copy password"
                >
                  <i class="fas" :class="copied ? 'fa-check text-emerald-600' : 'fa-copy'"></i>
                </button>
              </div>
            </div>
            <p class="text-[11px] text-slate-400 mt-1">Minimum 6 characters. Use the button to generate a secure string.</p>
          </div>

          <!-- Error Alert -->
          <div
            v-if="error"
            class="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 text-xs font-medium"
          >
            <i class="fas fa-exclamation-circle shrink-0"></i>
            <span>{{ error }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex justify-end gap-3 px-5 py-4 border-t border-slate-200 bg-slate-50 shrink-0">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading || loadingRoles"
            class="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <i v-if="loading" class="fas fa-spinner animate-spin text-xs"></i>
            <span>{{ loading ? 'Creating...' : 'Create User' }}</span>
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
      showPassword: true,
      copied: false,
      error: '',
      roles: [],
      avatarFile: null,
      avatarPreview: '',
      form: {
        fullName: '',
        username: '',
        phone: '',
        email: '',
        password: '',
        role: 'USER',
      },
    };
  },

  async mounted() {
    await this.fetchRoles();
  },

  beforeUnmount() {
    if (this.avatarPreview) {
      URL.revokeObjectURL(this.avatarPreview);
    }
  },

  methods: {
    async fetchRoles() {
         this.loadingRoles = false;
    
       
          this.roles = [
            { id: 1, name: 'USER', code: 'USER' },
            { id: 2, name: 'ADMIN', code: 'ADMIN' },
          ];

    },

    onFileSelected(event) {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        this.error = 'Please select a valid image file.';
        return;
      }

      if (this.avatarPreview) {
        URL.revokeObjectURL(this.avatarPreview);
      }

      this.avatarFile = file;
      this.avatarPreview = URL.createObjectURL(file);
      this.error = '';
    },

    removeAvatar() {
      if (this.avatarPreview) {
        URL.revokeObjectURL(this.avatarPreview);
      }
      this.avatarFile = null;
      this.avatarPreview = '';
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },

    generatePassword() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let result = '';
      for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      this.form.password = result;
      this.showPassword = true;
    },

    async copyPassword() {
      if (!this.form.password) return;
      try {
        await navigator.clipboard.writeText(this.form.password);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy password:', err);
      }
    },

    getInitials(name) {
      if (!name) return 'U';
      const parts = name.trim().split(' ');
      return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
    },

    async submitForm() {
      this.error = '';

      if (!this.form.fullName?.trim()) {
        this.error = 'Full name is required.';
        return;
      }
      if (!this.form.username?.trim()) {
        this.error = 'Username is required.';
        return;
      }
      if (!this.form.email?.trim()) {
        this.error = 'Email is required.';
        return;
      }
      if (!this.form.phone?.trim()) {
        this.error = 'Phone number is required.';
        return;
      }
      if (!this.form.role) {
        this.error = 'Please select a role.';
        return;
      }
      if (!this.form.password || this.form.password.length < 6) {
        this.error = 'Password must be at least 6 characters.';
        return;
      }

      this.loading = true;
      try {
        // Multipart FormData payload for binary file upload
        const formData = new FormData();
        formData.append('fullName', this.form.fullName.trim());
        formData.append('username', this.form.username.trim());
        formData.append('phone', this.form.phone.trim());
        formData.append('email', this.form.email.trim());
        formData.append('password', this.form.password);
        formData.append('role', this.form.role);

        if (this.avatarFile) {
          formData.append('avatar', this.avatarFile);
        }
        const  headers= { 'Content-Type': 'multipart/form-data' }

        await this.$apiPost('/auth/register', formData,headers);

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
  @apply w-full border border-slate-300 px-3.5 py-2 text-xs font-medium text-slate-800
         placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500
         transition disabled:bg-slate-50 disabled:text-slate-400;
}
</style>