<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">My Profile</h1>
        <p class="text-slate-500 text-sm">View and manage your personal information</p>
      </div>
      <button @click="editMode = !editMode"
        class="flex items-center gap-2 px-4 py-2.5 text-white text-xs font-bold rounded-xl transition shadow-sm"
        :class="editMode ? 'bg-slate-500 hover:bg-slate-600' : 'bg-primary hover:bg-primary-dark'">
        <i :class="editMode ? 'fas fa-times' : 'fas fa-pen'" class="text-xs"></i>
        {{ editMode ? 'Cancel' : 'Edit Profile' }}
      </button>
    </div>

    <!-- Profile Card -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <!-- Header with avatar -->
      <div class="bg-gradient-to-r from-primary to-blue-600 px-6 py-8 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-black ring-4 ring-white/30">
            {{ userInitials }}
          </div>
          <div class="text-white">
            <h2 class="text-2xl font-black leading-tight">{{ fullName }}</h2>
            <p class="text-sm text-blue-100 mt-1">{{ userEmail }}</p>
            <span class="inline-block mt-2 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase">
              {{ userRole }}
            </span>
          </div>
        </div>
      </div>

      <!-- Form fields -->
      <div class="p-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="field-label">Full Name</label>
            <input v-model="form.name" :disabled="!editMode" type="text" class="field-input mt-1" />
          </div>
          <div>
            <label class="field-label">Email Address</label>
            <input v-model="form.email" :disabled="!editMode" type="email" class="field-input mt-1" />
          </div>
          <div>
            <label class="field-label">Phone Number</label>
            <input v-model="form.phone" :disabled="!editMode" type="tel" class="field-input mt-1" />
          </div>
          <div>
            <label class="field-label">Location</label>
            <input v-model="form.location" :disabled="!editMode" type="text" class="field-input mt-1" />
          </div>
        </div>
        
        <div v-if="editMode" class="flex gap-3 mt-6 pt-6 border-t border-slate-100">
          <button @click="saveProfile"
            class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
            <i class="fas fa-save mr-1.5"></i> Save Changes
          </button>
          <button @click="editMode = false"
            class="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Change Password Section -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm font-black text-slate-800">Change Password</h3>
          <p class="text-xs text-slate-500 mt-0.5">Update your account password</p>
        </div>
        <button @click="showPasswordForm = !showPasswordForm"
          class="text-xs font-bold text-primary hover:underline">
          {{ showPasswordForm ? 'Hide' : 'Show Form' }}
        </button>
      </div>
      
      <div v-if="showPasswordForm" class="space-y-4 pt-4 border-t border-slate-100">
        <div>
          <label class="field-label">Current Password</label>
          <input type="password" placeholder="••••••••" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">New Password</label>
          <input type="password" placeholder="••••••••" class="field-input mt-1" />
        </div>
        <div>
          <label class="field-label">Confirm New Password</label>
          <input type="password" placeholder="••••••••" class="field-input mt-1" />
        </div>
        <button class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
          Update Password
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      editMode: false,
      showPasswordForm: false,
      form: {
        name: localStorage.getItem('name') || 'User Name',
        email: localStorage.getItem('email') || 'user@email.com',
        phone: '+251 912 345 678',
        location: 'Addis Ababa, Ethiopia',
      },
    };
  },
  computed: {
    userRole() { return localStorage.getItem('role') || 'user'; },
    fullName() { return this.form.name; },
    userInitials() {
      const parts = this.form.name.split(' ');
      return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
    },
    userEmail() { return this.form.email; },
  },
  methods: {
    saveProfile() {
      alert('Profile updated successfully!');
      this.editMode = false;
    },
  },
};
</script>

<style scoped>
.field-label { @apply block text-xs font-bold text-slate-600 uppercase tracking-wider; }
.field-input {
  @apply w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900
         placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all
         disabled:bg-slate-100 disabled:text-slate-600 disabled:cursor-not-allowed;
}
</style>
