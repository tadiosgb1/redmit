<template>
  <div class="p-6 space-y-5">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Users Management</h1>
        <p class="text-slate-500 text-sm">Manage platform users, roles, and account statuses</p>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="fetchUsers"
          :disabled="loading"
          class="p-2.5 bg-brand-surface border border-slate-200 hover:bg-brand-bg text-slate-600 rounded-md transition shadow-sm"
        >
          <i class="fas fa-sync-alt text-xs" :class="{ 'animate-spin': loading }"></i>
        </button>
        <button
          @click="showAddForm = true"
          class="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-md transition shadow-sm"
        >
          <i class="fas fa-plus text-xs"></i>
          Add New User
        </button>
      </div>
    </div>

    <!-- Dynamic Stats Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div
        v-for="s in dynamicStats"
        :key="s.label"
        class="bg-brand-surface border border-slate-200 px-4 py-3 flex items-center gap-3 shadow-sm rounded-none"
      >
        <div class="w-9 h-9 flex items-center justify-center shrink-0" :class="s.iconBg">
          <i :class="[s.icon, s.iconColor, 'text-sm']"></i>
        </div>
        <div class="min-w-0">
          <p class="text-xl font-black text-slate-900 leading-none">{{ s.value }}</p>
          <p class="text-xs text-slate-500 mt-1 truncate">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div class="flex flex-wrap gap-2">
        <button
          v-for="f in filterOptions"
          :key="f.value"
          @click="activeFilter = f.value"
          class="px-3.5 py-2 text-xs font-bold border transition flex items-center gap-1.5 rounded-md"
          :class="activeFilter === f.value
            ? 'bg-primary text-white border-primary'
            : 'bg-brand-surface text-slate-600 border-slate-200 hover:border-primary-light'"
        >
          <span>{{ f.label }}</span>
          <span
            class="px-1.5 py-0.5 text-[10px] rounded-sm"
            :class="activeFilter === f.value
              ? 'bg-primary-lighter text-primary-dark'
              : 'bg-slate-100 text-slate-600'"
          >
            {{ f.count }}
          </span>
        </button>
      </div>

      <!-- Search Box -->
      <div class="relative min-w-[240px]">
        <i class="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted text-xs"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search user or email..."
          class="w-full pl-9 pr-3.5 py-2 bg-brand-surface border border-slate-200 rounded-md text-xs text-slate-900 focus:outline-none focus:border-primary transition"
        />
      </div>
    </div>

    <!-- State Views -->
    <div v-if="loading" class="bg-brand-surface border border-slate-200 p-10 text-center rounded-none">
      <div class="w-8 h-8 border-3 border-primary-lighter border-t-primary rounded-full animate-spin mx-auto mb-3"></div>
      <p class="text-xs font-semibold text-slate-500">Loading users...</p>
    </div>

    <div v-else-if="fetchError" class="bg-secondary-lighter border border-secondary-light p-6 text-center text-secondary rounded-none">
      <i class="fas fa-exclamation-circle text-xl mb-2 text-secondary-light"></i>
      <p class="text-xs font-semibold">{{ fetchError }}</p>
      <button
        @click="fetchUsers"
        class="mt-3 px-4 py-1.5 bg-secondary text-white text-xs font-semibold rounded-md hover:bg-secondary-light transition"
      >
        Try Again
      </button>
    </div>

    <!-- Users Table -->
    <div v-else class="bg-brand-surface border border-slate-200 overflow-hidden shadow-sm rounded-none">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-slate-100 bg-brand-bg">
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

            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              class="hover:bg-brand-bg transition-colors"
            >
              <!-- User Info -->
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="relative w-10 h-10 bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center rounded-none">
                    <img
                      v-if="user.avatarUrl"
                      :src="user.avatarUrl"
                      :alt="user.fullName"
                      class="w-full h-full object-cover"
                      @error="handleImageError($event, user)"
                    />
                    <span v-else class="font-black text-xs text-slate-600">
                      {{ getInitials(user.fullName) }}
                    </span>
                  </div>

                  <div>
                    <div class="flex items-center gap-1.5">
                      <p class="font-bold text-slate-800 text-xs">{{ user.fullName || user.username }}</p>
                      <i
                        v-if="user.isVerified"
                        class="fas fa-check-circle text-[11px] text-success"
                        title="Verified Account"
                      ></i>
                    </div>
                    <p class="text-[10px] text-brand-muted font-mono">@{{ user.username }}</p>
                  </div>
                </div>
              </td>

              <!-- Contact -->
              <td class="px-4 py-3.5 hidden sm:table-cell">
                <p class="text-xs text-slate-700 font-medium">{{ user.email }}</p>
                <p class="text-[10px] text-brand-muted">{{ user.phone || user.phoneNumber || 'N/A' }}</p>
              </td>

              <!-- Role Badge -->
              <td class="px-4 py-3.5">
                <span
                  class="text-[10px] font-black px-2.5 py-1 uppercase rounded-sm"
                  :class="getRoleBadgeClass(user.role)"
                >
                  {{ user.role?.code || user.role }}
                </span>
              </td>

              <!-- Joined Date -->
              <td class="px-4 py-3.5 hidden md:table-cell text-xs text-slate-500">
                {{ formatDate(user.createdAt) }}
              </td>

              <!-- Status Badge -->
              <td class="px-4 py-3.5">
                <span
                  class="text-[10px] font-black px-2.5 py-1 inline-flex items-center gap-1 rounded-sm"
                  :class="user.isActive ? 'bg-success-lighter text-success-dark' : 'bg-slate-100 text-slate-500'"
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="user.isActive ? 'bg-success' : 'bg-slate-400'"
                  ></span>
                  {{ user.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-4 py-3.5 text-right pr-6">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    @click="viewUser(user)"
                    title="View Profile"
                    class="w-7 h-7 bg-brand-bg hover:bg-primary hover:text-white text-slate-500 flex items-center justify-center transition text-xs rounded-sm"
                  >
                    <i class="fas fa-eye"></i>
                  </button>

                  <button
                    @click="editUser(user)"
                    title="Edit User"
                    class="w-7 h-7 bg-brand-bg hover:bg-warning hover:text-white text-slate-500 flex items-center justify-center transition text-xs rounded-sm"
                  >
                    <i class="fas fa-pen"></i>
                  </button>

                  <button
                    v-if="!user.isActive"
                    @click="toggleUserStatus(user)"
                    title="Activate User"
                    :disabled="actionLoading === user.id"
                    class="w-7 h-7 bg-success-lighter hover:bg-success hover:text-white text-success-dark flex items-center justify-center transition text-xs rounded-sm"
                  >
                    <i class="fas" :class="actionLoading === user.id ? 'fa-spinner animate-spin' : 'fa-check'"></i>
                  </button>

                  <button
                    v-else
                    @click="toggleUserStatus(user)"
                    title="Deactivate User"
                    :disabled="actionLoading === user.id"
                    class="w-7 h-7 bg-secondary-lighter hover:bg-secondary hover:text-white text-secondary flex items-center justify-center transition text-xs rounded-sm"
                  >
                    <i class="fas" :class="actionLoading === user.id ? 'fa-spinner animate-spin' : 'fa-ban'"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div
        v-if="pagination.totalPages > 1"
        class="px-5 py-3 border-t border-slate-100 bg-brand-bg flex items-center justify-between text-xs text-slate-500"
      >
        <span>Showing Page <b>{{ pagination.page }}</b> of <b>{{ pagination.totalPages }}</b> ({{ pagination.total }} Total)</span>
        <div class="flex items-center gap-1">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page <= 1"
            class="px-2.5 py-1 bg-brand-surface border border-slate-200 rounded-sm hover:bg-brand-bg disabled:opacity-40"
          >
            Prev
          </button>
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page >= pagination.totalPages"
            class="px-2.5 py-1 bg-brand-surface border border-slate-200 rounded-sm hover:bg-brand-bg disabled:opacity-40"
          >
            Next
          </button>
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
        { label: 'Total Users', value: total, icon: 'fas fa-users', iconBg: 'bg-primary-lighter', iconColor: 'text-primary-dark' },
        { label: 'Active Users', value: active, icon: 'fas fa-check-circle', iconBg: 'bg-success-lighter', iconColor: 'text-success-dark' },
        { label: 'New This Month', value: newThisMonth, icon: 'fas fa-user-plus', iconBg: 'bg-accent-lighter', iconColor: 'text-accent-dark' },
        { label: 'Admins', value: admins, icon: 'fas fa-user-shield', iconBg: 'bg-warning-lighter', iconColor: 'text-warning-dark' },
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
          await this.$apiPatch(endpoint, "", payload);
        } else {
          await fetch(endpoint, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
            },
            body: JSON.stringify(payload),
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
        ? 'bg-warning-lighter text-warning-dark'
        : 'bg-primary-lighter text-primary-dark';
    },

    handleImageError(event, user) {
      user.avatarUrl = null;
    },
  },
};
</script>

<style scoped>
</style>
