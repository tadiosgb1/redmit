<template>
  <div class="p-6 space-y-5">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Users Management</h1>
        <p class="text-slate-500 text-sm">Manage platform users, roles, and account statuses</p>
      </div>
      <div class="flex items-center gap-2">
        <button @click="fetchUsers" :disabled="loading"
          class="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl transition shadow-xs">
          <i class="fas fa-sync-alt text-xs" :class="{ 'animate-spin': loading }"></i>
        </button>
        <button @click="showAddForm = true"
          class="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition shadow-sm">
          <i class="fas fa-plus text-xs"></i> Add New User
        </button>
      </div>
    </div>

    <!-- Dynamic Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="s in dynamicStats" :key="s.label"
        class="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-2 shadow-xs">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="s.iconBg">
          <i :class="[s.icon, s.iconColor, 'text-sm']"></i>
        </div>
        <div>
          <p class="text-xl font-black text-slate-900 leading-none">{{ s.value }}</p>
          <p class="text-xs text-slate-500 mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="flex flex-wrap gap-2">
        <button v-for="f in filterOptions" :key="f.value"
          @click="activeFilter = f.value"
          class="px-3.5 py-2 text-xs font-bold rounded-xl border transition flex items-center gap-1.5"
          :class="activeFilter === f.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'">
          <span>{{ f.label }}</span>
          <span class="px-1.5 py-0.5 rounded-full text-[10px]"
            :class="activeFilter === f.value ? 'bg-white/20' : 'bg-slate-100 text-slate-600'">
            {{ f.count }}
          </span>
        </button>
      </div>

      <!-- Search Box -->
      <div class="relative min-w-[240px]">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
        <input v-model="searchQuery" type="text" placeholder="Search user or email..."
          class="w-full pl-9 pr-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary transition" />
      </div>
    </div>

    <!-- State Views: Loading / Error -->
    <div v-if="loading" class="bg-white border border-slate-200 rounded-2xl p-12 text-center">
      <div class="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-3"></div>
      <p class="text-xs font-semibold text-slate-500">Loading users...</p>
    </div>

    <div v-else-if="fetchError" class="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-600">
      <i class="fas fa-exclamation-circle text-xl mb-2 text-red-500"></i>
      <p class="text-xs font-semibold">{{ fetchError }}</p>
      <button @click="fetchUsers" class="mt-3 px-4 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition">
        Try Again
      </button>
    </div>

    <!-- Users Table -->
    <div v-else class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-slate-100 bg-slate-50/70">
            <tr class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <th class="px-5 py-3.5 text-left">User</th>
              <th class="px-4 py-3.5 text-left hidden sm:table-cell">Contact</th>
              <th class="px-4 py-3.5 text-left">Role</th>
              <th class="px-4 py-3.5 text-left hidden md:table-cell">Joined</th>
              <th class="px-4 py-3.5 text-left">Status</th>
              <th class="px-4 py-3.5 text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-if="filteredUsers.length === 0">
              <td colspan="6" class="px-5 py-8 text-center text-xs text-slate-400 font-medium">
                No users found matching your search criteria.
              </td>
            </tr>
            <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-slate-50/50 transition-colors">
              <!-- User Info -->
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="relative w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                    <img v-if="user.avatarUrl" :src="user.avatarUrl" :alt="user.fullName" class="w-full h-full object-cover" @error="handleImageError($event, user)" />
                    <span v-else class="font-black text-xs text-slate-600">{{ getInitials(user.fullName) }}</span>
                  </div>
                  <div>
                    <div class="flex items-center gap-1.5">
                      <p class="font-bold text-slate-800 text-xs">{{ user.fullName || user.username }}</p>
                      <i v-if="user.isVerified" class="fas fa-check-circle text-[11px] text-emerald-500" title="Verified Account"></i>
                    </div>
                    <p class="text-[10px] text-slate-400 font-mono">@{{ user.username }}</p>
                  </div>
                </div>
              </td>

              <!-- Contact -->
              <td class="px-4 py-3.5 hidden sm:table-cell">
                <p class="text-xs text-slate-700 font-medium">{{ user.email }}</p>
                <p class="text-[10px] text-slate-400">{{ user.phone || user.phoneNumber || 'N/A' }}</p>
              </td>

              <!-- Role Badge -->
              <td class="px-4 py-3.5">
                <span class="text-[10px] font-black px-2.5 py-1 rounded-full uppercase" :class="getRoleBadgeClass(user.role)">
                  {{ user.role?.code || user.role }}
                </span>
              </td>

              <!-- Joined Date -->
              <td class="px-4 py-3.5 hidden md:table-cell text-xs text-slate-500">
                {{ formatDate(user.createdAt) }}
              </td>

              <!-- Status Badge -->
              <td class="px-4 py-3.5">
                <span class="text-[10px] font-black px-2.5 py-1 rounded-full inline-flex items-center gap-1"
                  :class="user.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="user.isActive ? 'bg-emerald-500' : 'bg-slate-400'"></span>
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3.5 text-right pr-6">
                <div class="flex items-center justify-end gap-1.5">
                  <button @click="viewUser(user)" title="View Profile" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-primary hover:text-white text-slate-500 flex items-center justify-center transition text-xs">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button @click="editUser(user)" title="Edit User" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-amber-500 hover:text-white text-slate-500 flex items-center justify-center transition text-xs">
                    <i class="fas fa-pen"></i>
                  </button>

                  <button v-if="!user.isActive" @click="toggleUserStatus(user)" title="Activate User" :disabled="actionLoading === user.id"
                    class="w-7 h-7 rounded-lg bg-emerald-100 hover:bg-emerald-500 hover:text-white text-emerald-600 flex items-center justify-center transition text-xs">
                    <i class="fas" :class="actionLoading === user.id ? 'fa-spinner animate-spin' : 'fa-check'"></i>
                  </button>
                  <button v-else @click="toggleUserStatus(user)" title="Deactivate User" :disabled="actionLoading === user.id"
                    class="w-7 h-7 rounded-lg bg-red-100 hover:bg-red-500 hover:text-white text-red-600 flex items-center justify-center transition text-xs">
                    <i class="fas" :class="actionLoading === user.id ? 'fa-spinner animate-spin' : 'fa-ban'"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div v-if="pagination.totalPages > 1" class="px-5 py-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-xs text-slate-500">
        <span>Showing Page <b>{{ pagination.page }}</b> of <b>{{ pagination.totalPages }}</b> ({{ pagination.total }} Total)</span>
        <div class="flex items-center gap-1">
          <button @click="changePage(pagination.page - 1)" :disabled="pagination.page <= 1" class="px-2.5 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40">Prev</button>
          <button @click="changePage(pagination.page + 1)" :disabled="pagination.page >= pagination.totalPages" class="px-2.5 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <AddUsers
      v-if="showAddForm"
      @close="showAddForm = false"
      @user-added="handleUserAdded"
    />

    <!-- Edit User Modal -->
    <EditUsers
      v-if="showEditForm"
      :data="selectedUser"
      @close="closeEditModal"
      @saved="handleUserUpdated"
    />
  </div>
</template>

<script>
import AddUsers from './AddUsers.vue';
import EditUsers from './EditUsers.vue';

export default {
  name: 'UsersView',
  components: {
    AddUsers,
    EditUsers,
  },
  data() {
    return {
      loading: true,
      actionLoading: null,
      fetchError: '',
      showAddForm: false,
      showEditForm: false,
      selectedUser: null,
      activeFilter: 'all',
      searchQuery: '',
      users: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };
  },
  computed: {
    dynamicStats() {
      const total = this.pagination.total || this.users.length;
      const active = this.users.filter(u => u.isActive).length;
      const admins = this.users.filter(u => (u.role?.code || u.role) === 'ADMIN').length;
      
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      
      const newThisMonth = this.users.filter(u => {
        const date = new Date(u.createdAt);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
      }).length;

      return [
        { label: 'Total Users', value: total, icon: 'fas fa-users', iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
        { label: 'Active Users', value: active, icon: 'fas fa-check-circle', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
        { label: 'New This Month', value: newThisMonth, icon: 'fas fa-user-plus', iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
        { label: 'Admins', value: admins, icon: 'fas fa-user-shield', iconBg: 'bg-amber-50', iconColor: 'text-amber-600' },
      ];
    },

    filterOptions() {
      return [
        { value: 'all', label: 'All Users', count: this.users.length },
        { value: 'ADMIN', label: 'Admins', count: this.users.filter(u => (u.role?.code || u.role) === 'ADMIN').length },
        { value: 'USER', label: 'Users', count: this.users.filter(u => (u.role?.code || u.role) === 'USER').length },
        { value: 'active', label: 'Active', count: this.users.filter(u => u.isActive).length },
        { value: 'inactive', label: 'Inactive', count: this.users.filter(u => !u.isActive).length },
      ];
    },

    filteredUsers() {
      return this.users.filter(user => {
        let matchesFilter = true;
        const userRole = user.role?.code || user.role;

        if (this.activeFilter === 'active') matchesFilter = user.isActive;
        else if (this.activeFilter === 'inactive') matchesFilter = !user.isActive;
        else if (this.activeFilter !== 'all') matchesFilter = userRole === this.activeFilter;

        const query = this.searchQuery.toLowerCase().trim();
        let matchesSearch = true;
        if (query) {
          matchesSearch = 
            (user.fullName && user.fullName.toLowerCase().includes(query)) ||
            (user.email && user.email.toLowerCase().includes(query)) ||
            (user.username && user.username.toLowerCase().includes(query)) ||
            ((user.phone || user.phoneNumber) && (user.phone || user.phoneNumber).includes(query));
        }

        return matchesFilter && matchesSearch;
      });
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers(page = 1) {
      this.loading = true;
      this.fetchError = '';

      try {
        let response;
        if (this.$apiGet) {
          response = await this.$apiGet(`/users?page=${page}&limit=10`);
        } else {
          const res = await fetch(`/users?page=${page}&limit=10`);
          response = await res.json();
        }

        if (response?.data) {
          this.users = response.data;
          this.pagination = response.pagination || this.pagination;
        } else {
          this.users = response || [];
        }
      } catch (err) {
        this.fetchError = err?.response?.data?.message || err?.message || 'Failed to load users list.';
      } finally {
        this.loading = false;
      }
    },
async toggleUserStatus(user) {
  this.actionLoading = user.id;
  const targetStatus = !user.isActive;
  const endpoint = `/users/${user.id}/status`;
  const payload = { isActive: targetStatus };

  try {
    if (this.$apiPatch) {
      await this.$apiPatch(endpoint,"", payload);
    } else {
      await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(payload)
      });
    }
    user.isActive = targetStatus;
  } catch (err) {
    alert(err?.response?.data?.message || 'Failed to update user status.');
  } finally {
    this.actionLoading = null;
  }
},
    handleUserAdded() {
      this.showAddForm = false;
      this.fetchUsers();
    },

    editUser(user) {
      this.selectedUser = user;
      this.showEditForm = true;
    },

    closeEditModal() {
      this.showEditForm = false;
      this.selectedUser = null;
    },

    handleUserUpdated() {
      this.closeEditModal();
      this.fetchUsers(this.pagination.page);
    },

    viewUser(user) {
      if (this.$router) {
        this.$router.push(`/dashboard/users/detail/${user.id}`);
      } else {
        window.location.href = `/users/detail/${user.id}`;
      }
    },

    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.pagination.totalPages) {
        this.fetchUsers(newPage);
      }
    },

    getInitials(name) {
      if (!name) return 'U';
      const parts = name.trim().split(' ');
      return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase();
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    },

    getRoleBadgeClass(role) {
      const code = role?.code || role;
      return code === 'ADMIN'
        ? 'bg-amber-100 text-amber-700'
        : 'bg-blue-100 text-blue-700';
    },

    handleImageError(event, user) {
      user.avatarUrl = null;
    },
  },
};
</script>

<style scoped>
/* Scoped styles kept intact */
</style>