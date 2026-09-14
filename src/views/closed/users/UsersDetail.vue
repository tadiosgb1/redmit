<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading Users..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">User Details</h1>
      <button @click="$router.back()" class="text-blue-600 hover:underline">← Back to Users</button>
    </div>

    <!-- Detail Card -->
    <div v-if="!loading && item.id" class="bg-white rounded-md border border-gray-200 p-6 shadow-sm space-y-6">
      <!-- Profile Header / Avatar -->
      <div class="flex items-center space-x-4 border-b pb-4 border-gray-100">
        <img 
          :src="item.avatarUrl || 'http://redmitapi.kalayuredae.com/uploads/defaults/default-avatar.png'" 
          alt="Avatar" 
          class="w-20 h-20 object-cover rounded-full border border-gray-300 shadow-sm"
        />
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ item.fullName || '—' }}</h2>
          <p class="text-gray-500">@{{ item.username || '—' }}</p>
          <div class="mt-2 flex items-center gap-2">
            <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
              {{ item.role }}
            </span>
            <span 
              :class="item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
              class="px-2.5 py-0.5 text-xs font-semibold rounded-full"
            >
              {{ item.isActive ? 'Active' : 'Inactive' }}
            </span>
            <span 
              :class="item.isVerified ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'"
              class="px-2.5 py-0.5 text-xs font-semibold rounded-full"
            >
              {{ item.isVerified ? 'Verified' : 'Unverified' }}
            </span>
          </div>
        </div>
      </div>

      <!-- User Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><strong>Full Name:</strong> {{ item.fullName || '—' }}</div>
        <div><strong>Username:</strong> {{ item.username || '—' }}</div>
        <div><strong>Email:</strong> {{ item.email || '—' }}</div>
        <div><strong>Phone:</strong> {{ item.phone || '—' }}</div>
        <div><strong>Role:</strong> {{ item.role || '—' }}</div>
        <div><strong>Status:</strong> {{ item.isActive ? 'Active' : 'Inactive' }}</div>
        <div><strong>Verification Status:</strong> {{ item.isVerified ? 'Verified' : 'Pending Verification' }}</div>
        <div><strong>Created At:</strong> {{ formatDate(item.createdAt) }}</div>
        <div><strong>Last Updated:</strong> {{ formatDate(item.updatedAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  components: { Loading },
  data() {
    return {
      item: {},
      loading: false,
    };
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '—';
      return new Date(dateStr).toLocaleString();
    }
  },
  async mounted() {
    this.loading = true;
    const id = this.$route.params.id;
    try {
      const response = await this.$apiGetById('/users', id);
      // Unpacks `data` property from endpoint response: { status, message, data }
      this.item = response?.data || response || {};
    } catch (error) {
      console.error('Error loading user details:', error);
    } finally {
      this.loading = false;
    }
  },
};
</script>