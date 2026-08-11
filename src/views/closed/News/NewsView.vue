<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800 relative">
    <Loading :visible="loading" message="Loading News..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <div>
        <h1 class="text-lg font-bold text-gray-800">News</h1>
        <p class="text-xs text-gray-400 mt-0.5">Manage news articles</p>
      </div>
      <button
        @click="openAddModal"
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium shadow-md flex items-center gap-1.5 text-sm transition"
      >
        <i class="fas fa-plus text-xs"></i>
        <span>Add News</span>
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
      <input
        v-model="searchQuery"
        @input="fetchItems(1)"
        type="text"
        placeholder="Search news..."
        class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
      />
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <label>Show</label>
        <select
          v-model="pageSize"
          @change="fetchItems(1)"
          class="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:ring-green-500"
        >
          <option v-for="size in [5, 10, 20, 50, 100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="bg-white overflow-hidden rounded-xl border border-gray-200 shadow-sm hidden md:block">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100 text-gray-600 uppercase text-[11px] font-semibold">
            <tr>
              <th class="px-4 py-3 text-left w-12">#</th>
              <th class="px-4 py-3 text-left">Title</th>
              <th class="px-4 py-3 text-left">Category</th>
              <th class="px-4 py-3 text-left">Summary</th>
              <th class="px-4 py-3 text-left">Image</th>
              <th class="px-4 py-3 text-center w-32">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-100">
            <tr
              v-for="(item, index) in items"
              :key="item.id"
              class="hover:bg-green-50 transition"
            >
              <td class="px-4 py-3 text-gray-500">
                {{ (currentPage - 1) * pageSize + index + 1 }}
              </td>
              <td class="px-4 py-3">
                <div class="font-semibold text-gray-800">{{ item.title }}</div>
                <div class="text-xs text-gray-400 font-mono mt-0.5">{{ item.slug }}</div>
              </td>
              <td class="px-4 py-3">
                <span
                  class="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
                >
                  {{ item.category || '—' }}
                </span>
              </td>
              <td class="px-4 py-3 text-gray-600 max-w-xs">
                <span class="line-clamp-2">{{ item.summary || '—' }}</span>
              </td>
              <td class="px-4 py-3">
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  class="h-10 w-14 object-cover rounded border border-gray-200"
                  @error="$event.target.style.display = 'none'"
                />
                <span v-else class="text-gray-400 text-xs">—</span>
              </td>
              <td class="px-4 py-3 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button
                    @click="viewDetails(item.id)"
                    title="View details"
                    class="w-8 h-8 flex items-center justify-center text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition"
                  >
                    <i class="fas fa-eye text-xs"></i>
                  </button>
                  <button
                    @click="editItem(item)"
                    title="Edit"
                    class="w-8 h-8 flex items-center justify-center text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                  >
                    <i class="fas fa-edit text-xs"></i>
                  </button>
                  <button
                    @click="openDeleteModal(item.id)"
                    title="Delete"
                    class="w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                  >
                    <i class="fas fa-trash text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="items.length === 0 && !loading">
              <td colspan="6" class="text-center py-8 text-gray-400 italic">No news found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-3">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        class="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
      >
        <div class="flex justify-between items-start gap-3 mb-3">
          <div class="min-w-0 flex-1">
            <h2 class="font-bold text-gray-800 truncate">{{ item.title }}</h2>
            <p class="text-xs text-gray-400 font-mono mt-0.5 truncate">{{ item.slug }}</p>
          </div>
          <div class="flex gap-1 shrink-0">
            <button
              @click="viewDetails(item.id)"
              class="w-8 h-8 flex items-center justify-center text-green-500 hover:bg-green-50 rounded-lg"
            >
              <i class="fas fa-eye text-xs"></i>
            </button>
            <button
              @click="editItem(item)"
              class="w-8 h-8 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-lg"
            >
              <i class="fas fa-edit text-xs"></i>
            </button>
            <button
              @click="openDeleteModal(item.id)"
              class="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
            >
              <i class="fas fa-trash text-xs"></i>
            </button>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.title"
            class="h-14 w-20 object-cover rounded-lg border border-gray-200 shrink-0"
            @error="$event.target.style.display = 'none'"
          />
          <div class="min-w-0 flex-1 space-y-1.5 text-sm">
            <div>
              <span
                class="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700"
              >
                {{ item.category || '—' }}
              </span>
            </div>
            <p class="text-gray-600 line-clamp-2">{{ item.summary || 'No summary' }}</p>
          </div>
        </div>
      </div>
      <p v-if="items.length === 0 && !loading" class="text-center text-gray-400 py-8 italic">
        No news found.
      </p>
    </div>

    <!-- Pagination -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-3 text-sm text-gray-600">
      <span>
        Showing {{ count === 0 ? 0 : (currentPage - 1) * pageSize + 1 }}
        to {{ Math.min(currentPage * pageSize, count) }}
        of {{ count }} entries
      </span>
      <div class="flex items-center gap-2">
        <button
          @click="fetchItems(currentPage - 1)"
          :disabled="!previousPage"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
        >
          ← Previous
        </button>
        <span class="px-3 py-1 bg-green-600 text-white rounded-lg font-medium">{{ currentPage }}</span>
        <button
          @click="fetchItems(currentPage + 1)"
          :disabled="!nextPage"
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Modals -->
    <add-news
      v-if="showModal && !editMode"
      :data="selectedItem"
      @close="showModal = false"
      @saved="fetchItems"
    />
    <edit-news
      v-if="showModal && editMode"
      :data="selectedItem"
      @close="showModal = false"
      @saved="fetchItems"
    />

    <delete-confirm-modal
      :visible="deleteModalVisible"
      title="Delete News"
      message="Are you sure you want to delete this News?"
      @confirm="confirmDelete"
      @cancel="deleteModalVisible = false"
    />
  </div>
</template>

<script>
import AddNews from './AddNews.vue';
import EditNews from './EditNews.vue';
import Loading from '@/components/Loading.vue';
import DeleteConfirmModal from '@/components/DeleteConfirmModal.vue';

export default {
  components: { AddNews, EditNews, Loading, DeleteConfirmModal },

  data() {
    return {
      items: [],
      count: 0,
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      pageSize: 10,
      searchQuery: '',
      showModal: false,
      editMode: false,
      selectedItem: null,
      loading: false,
      deleteModalVisible: false,
      deleteId: null,
    };
  },

  methods: {
    async fetchItems(page = 1) {
      this.loading = true;
      this.currentPage = page;
      const params = {
        page: this.currentPage,
        page_size: this.pageSize,
        search: this.searchQuery,
      };
      try {
        const response = await this.$apiGet('/news', params);
        this.items = response.data || [];
        this.count = response.count || 0;
        this.nextPage = response.next || null;
        this.previousPage = response.previous || null;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    openAddModal() {
      this.editMode = false;
      this.selectedItem = null;
      this.showModal = true;
    },
    editItem(item) {
      this.editMode = true;
      this.selectedItem = item;
      this.showModal = true;
    },

    viewDetails(id) {
      this.$router.push({ name: 'News-detail', params: { id } });
    },

    openDeleteModal(id) {
      this.deleteId = id;
      this.deleteModalVisible = true;
    },

    async confirmDelete() {
      try {
        const res = await this.$apiDelete('/news', this.deleteId);
        if (res) {
          this.$root.$refs.toast.showToast('News deleted successfully', 'success');
        }
        this.fetchItems(this.currentPage);
      } catch (e) {
        console.error(e);
      } finally {
        this.deleteModalVisible = false;
      }
    },
  },

  mounted() {
    this.fetchItems();
  },
};
</script>