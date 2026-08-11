<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Users Management</h1>
        <p class="text-slate-500 text-sm">Manage platform users and their permissions</p>
      </div>
      <button @click="showAddForm = true"
        class="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition shadow-sm">
        <i class="fas fa-plus text-xs"></i> Add New User
      </button>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="s in stats" :key="s.label"
        class="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-2">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="s.iconBg">
          <i :class="[s.icon, s.iconColor, 'text-sm']"></i>
        </div>
        <div>
          <p class="text-xl font-black text-slate-900 leading-none">{{ s.value }}</p>
          <p class="text-xs text-slate-500 mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <button v-for="f in filters" :key="f.value"
        @click="activeFilter = f.value"
        class="px-4 py-2 text-xs font-bold rounded-xl border transition"
        :class="activeFilter === f.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary'">
        {{ f.label }}
        <span v-if="f.count" class="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]"
          :class="activeFilter === f.value ? 'bg-white/20' : 'bg-slate-100'">
          {{ f.count }}
        </span>
      </button>
    </div>

    <!-- Users table -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-slate-100 bg-slate-50">
            <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th class="px-5 py-3.5 text-left">User</th>
              <th class="px-4 py-3.5 text-left hidden sm:table-cell">Contact</th>
              <th class="px-4 py-3.5 text-left">Role</th>
              <th class="px-4 py-3.5 text-left hidden md:table-cell">Joined</th>
              <th class="px-4 py-3.5 text-left">Status</th>
              <th class="px-4 py-3.5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50">
            <tr v-for="user in filteredUsers" :key="user.id"
              class="hover:bg-slate-50/50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0" :class="user.avatarBg">
                    <span class="font-black text-sm" :class="user.avatarColor">{{ user.initials }}</span>
                  </div>
                  <div>
                    <p class="font-bold text-slate-800 text-sm">{{ user.name }}</p>
                    <p class="text-[10px] text-slate-400">ID: {{ user.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4 hidden sm:table-cell">
                <p class="text-xs text-slate-700">{{ user.email }}</p>
                <p class="text-[10px] text-slate-400">{{ user.phone }}</p>
              </td>
              <td class="px-4 py-4">
                <span class="text-[10px] font-black px-2.5 py-1 rounded-full" :class="user.roleCls">
                  {{ user.role }}
                </span>
              </td>
              <td class="px-4 py-4 hidden md:table-cell text-xs text-slate-500">{{ user.joined }}</td>
              <td class="px-4 py-4">
                <span class="text-[10px] font-black px-2.5 py-1 rounded-full" :class="user.statusCls">
                  {{ user.status }}
                </span>
              </td>
              <td class="px-4 py-4">
                <div class="flex gap-1.5">
                  <button @click="viewUser(user)" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-500 flex items-center justify-center transition text-xs">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button @click="editUser(user)" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-500 flex items-center justify-center transition text-xs">
                    <i class="fas fa-pen"></i>
                  </button>
                  <button v-if="user.status === 'Inactive'" @click="activateUser(user)" class="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-500 hover:text-white text-green-600 flex items-center justify-center transition text-xs">
                    <i class="fas fa-check"></i>
                  </button>
                  <button v-else @click="deactivateUser(user)" class="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white text-red-600 flex items-center justify-center transition text-xs">
                    <i class="fas fa-ban"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Form Modal -->
    <div v-if="showAddForm" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="showAddForm = false">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-primary px-6 py-4 flex items-center justify-between">
          <h3 class="text-sm font-black text-white">Add New User</h3>
          <button @click="showAddForm = false" class="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition">
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="field-label">Full Name *</label>
              <input v-model="newUser.name" type="text" class="field-input mt-1" placeholder="John Doe" />
            </div>
            <div>
              <label class="field-label">Email *</label>
              <input v-model="newUser.email" type="email" class="field-input mt-1" placeholder="john@example.com" />
            </div>
            <div>
              <label class="field-label">Phone</label>
              <input v-model="newUser.phone" type="tel" class="field-input mt-1" placeholder="+251 912 345 678" />
            </div>
            <div>
              <label class="field-label">Role *</label>
              <select v-model="newUser.role" class="field-input mt-1">
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <label class="field-label">Password *</label>
              <input v-model="newUser.password" type="password" class="field-input mt-1" placeholder="••••••••" />
            </div>
            <div>
              <label class="field-label">Confirm Password *</label>
              <input v-model="newUser.confirmPassword" type="password" class="field-input mt-1" placeholder="••••••••" />
            </div>
          </div>
          <div class="flex gap-3 pt-2">
            <button @click="addUser" class="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
              Add User
            </button>
            <button @click="showAddForm = false" class="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersView',
  data() {
    return {
      showAddForm: false,
      activeFilter: 'all',
      filters: [
        { value: 'all',      label: 'All Users',  count: '1,248' },
        { value: 'admin',    label: 'Admins',     count: '8' },
        { value: 'user',     label: 'Users',      count: '1,240' },
        { value: 'active',   label: 'Active',     count: '1,204' },
        { value: 'inactive', label: 'Inactive',   count: '44' },
      ],
      stats: [
        { label: 'Total Users',    value: '1,248', icon: 'fas fa-users',        iconBg: 'bg-blue-50',    iconColor: 'text-blue-600' },
        { label: 'Active',         value: '1,204', icon: 'fas fa-check-circle', iconBg: 'bg-green-50',   iconColor: 'text-green-600' },
        { label: 'New This Month', value: '34',    icon: 'fas fa-user-plus',    iconBg: 'bg-purple-50',  iconColor: 'text-purple-600' },
        { label: 'Admins',         value: '8',     icon: 'fas fa-user-shield',  iconBg: 'bg-amber-50',   iconColor: 'text-amber-600' },
      ],
      users: [
        { id: 'U001', name: 'Abebe Tadesse',    email: 'abebe@email.com',    phone: '+251 911 111 111', role: 'Admin', roleCls: 'bg-red-100 text-red-600',    initials: 'AT', avatarBg: 'bg-red-100',    avatarColor: 'text-red-600',    joined: 'Jan 15, 2024', status: 'Active',   statusCls: 'bg-green-100 text-green-700' },
        { id: 'U002', name: 'Sara Mekonnen',    email: 'sara@email.com',     phone: '+251 912 222 222', role: 'User',  roleCls: 'bg-blue-100 text-blue-600',  initials: 'SM', avatarBg: 'bg-blue-100',   avatarColor: 'text-blue-600',   joined: 'Feb 20, 2024', status: 'Active',   statusCls: 'bg-green-100 text-green-700' },
        { id: 'U003', name: 'Dawit Kebede',     email: 'dawit@email.com',    phone: '+251 913 333 333', role: 'User',  roleCls: 'bg-blue-100 text-blue-600',  initials: 'DK', avatarBg: 'bg-purple-100', avatarColor: 'text-purple-600', joined: 'Mar 10, 2024', status: 'Active',   statusCls: 'bg-green-100 text-green-700' },
        { id: 'U004', name: 'Meron Hailu',      email: 'meron@email.com',    phone: '+251 914 444 444', role: 'User',  roleCls: 'bg-blue-100 text-blue-600',  initials: 'MH', avatarBg: 'bg-pink-100',   avatarColor: 'text-pink-600',   joined: 'Apr 05, 2024', status: 'Active',   statusCls: 'bg-green-100 text-green-700' },
        { id: 'U005', name: 'Yonas Alemayehu', email: 'yonas@email.com',    phone: '+251 915 555 555', role: 'User',  roleCls: 'bg-blue-100 text-blue-600',  initials: 'YA', avatarBg: 'bg-indigo-100', avatarColor: 'text-indigo-600', joined: 'May 12, 2024', status: 'Inactive', statusCls: 'bg-slate-100 text-slate-500' },
        { id: 'U006', name: 'Tigist Mulugeta',  email: 'tigist@email.com',   phone: '+251 916 666 666', role: 'User',  roleCls: 'bg-blue-100 text-blue-600',  initials: 'TM', avatarBg: 'bg-emerald-100',avatarColor: 'text-emerald-600',joined: 'Jun 18, 2024', status: 'Active',   statusCls: 'bg-green-100 text-green-700' },
        { id: 'U007', name: 'Hanna Tesfaye',    email: 'hanna@email.com',    phone: '+251 917 777 777', role: 'Admin', roleCls: 'bg-red-100 text-red-600',    initials: 'HT', avatarBg: 'bg-red-100',    avatarColor: 'text-red-600',    joined: 'Jul 22, 2024', status: 'Active',   statusCls: 'bg-green-100 text-green-700' },
        { id: 'U008', name: 'Biniam Girma',     email: 'biniam@email.com',   phone: '+251 918 888 888', role: 'User',  roleCls: 'bg-blue-100 text-blue-600',  initials: 'BG', avatarBg: 'bg-orange-100', avatarColor: 'text-orange-600', joined: 'Aug 01, 2024', status: 'Active',   statusCls: 'bg-green-100 text-green-700' },
      ],
      newUser: { name: '', email: '', phone: '', role: '', password: '', confirmPassword: '' },
    };
  },
  computed: {
    filteredUsers() {
      if (this.activeFilter === 'all') return this.users;
      if (this.activeFilter === 'active') return this.users.filter(u => u.status === 'Active');
      if (this.activeFilter === 'inactive') return this.users.filter(u => u.status === 'Inactive');
      return this.users.filter(u => u.role.toLowerCase() === this.activeFilter);
    },
  },
  methods: {
    viewUser(user) { alert(`Viewing ${user.name}`); },
    editUser(user) { alert(`Editing ${user.name}`); },
    activateUser(user) { user.status = 'Active'; user.statusCls = 'bg-green-100 text-green-700'; },
    deactivateUser(user) { user.status = 'Inactive'; user.statusCls = 'bg-slate-100 text-slate-500'; },
    addUser() {
      if (!this.newUser.name || !this.newUser.email || !this.newUser.role || !this.newUser.password) {
        alert('Please fill all required fields');
        return;
      }
      if (this.newUser.password !== this.newUser.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      alert('User added successfully!');
      this.showAddForm = false;
      this.newUser = { name: '', email: '', phone: '', role: '', password: '', confirmPassword: '' };
    },
  },
};
</script>

<style scoped>
.field-label { @apply block text-xs font-bold text-slate-600 uppercase tracking-wider; }
.field-input {
  @apply w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900
         placeholder:text-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-all;
}
</style>
