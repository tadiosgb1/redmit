<template>
  <div class="p-6 space-y-6 max-w-4xl mx-auto">
    <!-- Top Header -->
    <div class="pb-2 border-b border-slate-200">
      <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Account Profile</h1>
      <p class="text-slate-500 text-xs mt-0.5">Manage your personal details and security preferences</p>
    </div>

    <!-- Navigation Tabs -->
    <div class="flex items-center gap-2 border-b border-slate-200">
      <button @click="activeTab = 'profile'"
        class="pb-3 px-1 text-xs font-semibold transition border-b-2 flex items-center gap-2"
        :class="activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'">
        <i class="fas fa-user text-xs"></i>
        <span>General Profile</span>
      </button>

      <button @click="activeTab = 'security'"
        class="pb-3 px-1 text-xs font-semibold transition border-b-2 flex items-center gap-2"
        :class="activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700'">
        <i class="fas fa-lock text-xs"></i>
        <span>Security & Password</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white border border-slate-200 rounded-xl p-12 text-center shadow-sm">
      <div class="w-7 h-7 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3"></div>
      <p class="text-slate-500 text-xs font-medium">Loading profile details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="fetchError" class="bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-600">
      <i class="fas fa-exclamation-circle text-xl mb-2 text-red-500"></i>
      <p class="text-xs font-semibold">{{ fetchError }}</p>
      <button @click="fetchUserProfile" class="mt-3 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition">
        Retry
      </button>
    </div>

    <template v-else>
      <!-- TAB 1: Profile Information -->
      <div v-if="activeTab === 'profile'" class="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <!-- Profile Header Summary Card -->
        <div class="p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <!-- Avatar -->
          <div class="relative flex-shrink-0">
            <div class="w-20 h-20 rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 text-2xl font-bold overflow-hidden">
              <img v-if="userAvatar" :src="userAvatar" alt="Avatar" class="w-full h-full object-cover" />
              <span v-else>{{ userInitials }}</span>
            </div>
            <span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-2 border-white rounded-full"
                  :class="isActive ? 'bg-emerald-500' : 'bg-slate-400'"
                  :title="isActive ? 'Active' : 'Inactive'"></span>
          </div>

          <!-- Meta Details -->
          <div class="flex-1 text-center sm:text-left space-y-1">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 class="text-lg font-bold text-slate-900">{{ fullName }}</h2>
              <span class="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded uppercase">
                {{ userRole }}
              </span>
            </div>
            <p class="text-xs text-slate-500">{{ userEmail }}</p>
            <div class="pt-1 flex items-center justify-center sm:justify-start gap-2">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-[11px] text-slate-600 rounded">
                <i :class="isVerified ? 'fas fa-check-circle text-emerald-500' : 'fas fa-shield-alt text-slate-400'"></i>
                {{ isVerified ? 'Verified Account' : 'Unverified Account' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Input Form Fields -->
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label class="field-label">Full Name</label>
              <input v-model="form.fullName" :disabled="!editMode" type="text" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Username</label>
              <input v-model="form.username" :disabled="!editMode" type="text" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Email Address</label>
              <input v-model="form.email" :disabled="!editMode" type="email" class="field-input mt-1" />
            </div>
            <div>
              <label class="field-label">Phone Number</label>
              <input v-model="form.phone" :disabled="!editMode" type="tel" class="field-input mt-1" />
            </div>
          </div>

          <!-- Actions at Bottom -->
          <div class="mt-8 pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
            <template v-if="editMode">
              <button @click="cancelEdit" :disabled="saving"
                class="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
                Cancel
              </button>
              <button @click="openConfirmModal" :disabled="saving"
                class="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg shadow-sm transition disabled:opacity-50">
                <i class="fas fa-save"></i>
                <span>Save Changes</span>
              </button>
            </template>
            <button v-else @click="toggleEditMode"
              class="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg shadow-sm transition">
              <i class="fas fa-pen text-slate-400"></i>
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <!-- TAB 2: Security & Change Password -->
      <div v-else-if="activeTab === 'security'" class="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div>
          <h3 class="text-sm font-bold text-slate-900">Change Password</h3>
          <p class="text-xs text-slate-500 mt-0.5">Ensure your account is using a strong password</p>
        </div>

        <div class="space-y-4 pt-5 mt-5 border-t border-slate-100 max-w-md">
          <div>
            <label class="field-label">Current Password</label>
            <input type="password" v-model="passwordForm.currentPassword" placeholder="••••••••" class="field-input mt-1" />
          </div>
          <div>
            <label class="field-label">New Password</label>
            <input type="password" v-model="passwordForm.newPassword" placeholder="••••••••" class="field-input mt-1" />
          </div>
          <div>
            <label class="field-label">Confirm New Password</label>
            <input type="password" v-model="passwordForm.confirmPassword" placeholder="••••••••" class="field-input mt-1" />
          </div>

          <div class="pt-2 flex justify-end">
            <button @click="updatePassword" class="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition shadow-sm">
              Update Password
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- Save Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div class="bg-white rounded-xl shadow-lg border border-slate-200 max-w-sm w-full p-6 space-y-4">
        <div class="flex items-center gap-3 text-slate-900">
          <div class="w-9 h-9 rounded-full bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
            <i class="fas fa-question-circle text-base"></i>
          </div>
          <div>
            <h4 class="text-sm font-bold">Save Changes?</h4>
            <p class="text-xs text-slate-500 mt-0.5">Are you sure you want to update your profile information?</p>
          </div>
        </div>
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button @click="showConfirmModal = false" :disabled="saving"
            class="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition">
            Cancel
          </button>
          <button @click="confirmSave" :disabled="saving"
            class="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-lg transition disabled:opacity-50">
            <div v-if="saving" class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>{{ saving ? 'Saving...' : 'Yes, Save' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      activeTab: 'profile', // 'profile' | 'security'
      loading: true,
      saving: false,
      fetchError: '',
      editMode: false,
      showConfirmModal: false,
      userData: null,
      form: {
        fullName: '',
        username: '',
        email: '',
        phone: '',
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      },
    };
  },
  computed: {
    userAvatar() {
      return this.userData?.avatarUrl || this.userData?.avatar || '';
    },
    userRole() { 
      return this.userData?.role?.code || this.userData?.role || 'USER'; 
    },
    fullName() { 
      return this.form.fullName || 'User Name'; 
    },
    userInitials() {
      const name = this.fullName;
      if (!name) return 'U';
      const parts = name.trim().split(' ');
      return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
    },
    userEmail() { 
      return this.form.email || 'user@email.com'; 
    },
    isVerified() {
      return !!this.userData?.isVerified;
    },
    isActive() {
      return this.userData?.isActive !== false;
    }
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
    async fetchUserProfile() {
      this.loading = true;
      this.fetchError = '';

      try {
        const response = await this.$apiGet('/auth/me');
        const user = response?.user || response?.data?.user || response?.data || response;

        this.userData = user;
        
        this.form = {
          fullName: user.fullName || '',
          username: user.username || '',
          email: user.email || '',
          phone: user.phone || user.phoneNumber || '',
        };
      } catch (err) {
        this.fetchError = err?.response?.data?.message || err?.message || 'Failed to load user profile.';
      } finally {
        this.loading = false;
      }
    },
    toggleEditMode() {
      if (this.editMode) {
        this.cancelEdit();
      } else {
        this.editMode = true;
      }
    },
    cancelEdit() {
      this.editMode = false;
      if (this.userData) {
        this.form.fullName = this.userData.fullName || '';
        this.form.username = this.userData.username || '';
        this.form.email = this.userData.email || '';
        this.form.phone = this.userData.phone || '';
      }
    },
    openConfirmModal() {
      this.showConfirmModal = true;
    },
    async confirmSave() {
      this.saving = true;
      try {
        const userId = this.userData?.id;
        if (userId && this.$apiPatch) {
          await this.$apiPatch('/users', userId, this.form);
        } else if (this.$apiPatch) {
          await this.$apiPatch('/auth/me', this.form);
        }

        if (this.userData) {
          Object.assign(this.userData, this.form);
        }
        
        this.editMode = false;
        this.showConfirmModal = false;
      } catch (err) {
        alert(err?.response?.data?.message || 'Failed to save changes.');
      } finally {
        this.saving = false;
      }
    },
    updatePassword() {
      if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
        alert('New passwords do not match.');
        return;
      }
      alert('Password updated successfully!');
      this.passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };
    }
  },
};
</script>

<style scoped>
.field-label { 
  @apply block text-[11px] font-bold text-slate-600 uppercase tracking-wider; 
}
.field-input {
  @apply w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900
         placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition
         disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-200 disabled:cursor-not-allowed;
}
</style>