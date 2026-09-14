<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">

    <!-- Loading -->
    <Loading
      :visible="loading"
      message="Loading Products..."
    />

    <div class="mx-auto max-w-[1600px] p-4 sm:p-5">

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            <i class="fas fa-box-open text-sm"></i>
          </div>

          <div>
            <h1 class="text-base font-bold text-slate-800">
              Products
            </h1>

            <p class="mt-0.5 text-[11px] text-slate-400">
              Manage digital products, pricing and product files
            </p>
          </div>

        </div>

        <button
          @click="openAddModal"
          class="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <i class="fas fa-plus text-[10px]"></i>
          <span>Add Product</span>
        </button>

      </div>

      <!-- ========================================================= -->
      <!-- Toolbar -->
      <!-- ========================================================= -->
      <div
        class="mb-3 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >

        <div class="relative w-full sm:max-w-sm">

          <i
            class="fas fa-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"
          ></i>

          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search products..."
            class="h-9 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary/20"
          />

        </div>

        <div class="flex items-center gap-2 text-[11px] text-slate-500">

          <span>Show</span>

          <select
            v-model.number="pageSize"
            @change="fetchItems(1)"
            class="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
          >
            <option
              v-for="size in [5, 10, 20, 50, 100]"
              :key="size"
              :value="size"
            >
              {{ size }}
            </option>
          </select>

          <span>entries</span>

        </div>

      </div>

      <!-- ========================================================= -->
      <!-- Desktop Table -->
      <!-- ========================================================= -->
      <div
        class="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:block"
      >

        <div class="overflow-x-auto">

          <table class="min-w-full">

            <thead>
              <tr
                class="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-400"
              >
                <th class="w-12 px-4 py-2.5 text-left">
                  #
                </th>

                <th class="px-4 py-2.5 text-left">
                  Product
                </th>

                <th class="px-4 py-2.5 text-left">
                  Slug
                </th>

                <th class="px-4 py-2.5 text-left">
                  Price
                </th>

                <th class="px-4 py-2.5 text-left">
                  Category
                </th>

                <th class="px-4 py-2.5 text-center">
                  Files
                </th>

                <th class="px-4 py-2.5 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100">

              <tr
                v-for="(item, index) in items"
                :key="item.id"
                class="group transition hover:bg-slate-50"
              >

                <!-- Number -->
                <td class="px-4 py-3 text-[11px] text-slate-400">
                  {{ rowNumber(index) }}
                </td>

                <!-- Product -->
                <td class="px-4 py-3">

                  <div class="flex min-w-[240px] items-center gap-2.5">

                    <div
                      class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary"
                    >

                      <img
                        v-if="getThumbnailUrl(item)"
                        :src="getThumbnailUrl(item)"
                        :alt="item.name"
                        class="h-full w-full object-cover"
                      />

                      <i
                        v-else
                        class="fas fa-box-open text-xs"
                      ></i>

                    </div>

                    <div class="min-w-0">

                      <p
                        class="truncate text-xs font-semibold text-slate-800"
                      >
                        {{ item.name || "Untitled Product" }}
                      </p>

                      <p
                        class="mt-0.5 truncate text-[10px] text-slate-400"
                      >
                        {{ item.shortDescription || "No short description" }}
                      </p>

                    </div>

                  </div>

                </td>

                <!-- Slug -->
                <td class="px-4 py-3">

                  <span
                    class="inline-flex max-w-[180px] truncate rounded-md bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-600"
                  >
                    {{ item.slug || "-" }}
                  </span>

                </td>

                <!-- Price -->
                <td class="px-4 py-3">

                  <div class="whitespace-nowrap">

                    <span class="text-xs font-bold text-slate-800">
                      {{ formatPrice(item.price) }}
                    </span>

                    <span
                      class="ml-1 text-[10px] font-semibold uppercase text-slate-400"
                    >
                      {{ item.currency || "USD" }}
                    </span>

                  </div>

                </td>

                <!-- Category -->
                <td class="px-4 py-3">

                  <span
                    class="inline-flex rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary"
                  >
                    {{ item.category?.name || item.categoryName || item.categoryId || "-" }}
                  </span>

                </td>

                <!-- Files -->
                <td class="px-4 py-3 text-center">

                  <span
                    class="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
                  >
                    <i class="fas fa-paperclip text-[9px]"></i>
                    {{ getFiles(item).length }}
                  </span>

                </td>

                <!-- Actions -->
                <td class="px-4 py-3">

                  <div class="flex items-center justify-center gap-1">

                    <button
                      @click="viewItem(item)"
                      title="View Product"
                      class="flex h-7 w-7 items-center justify-center rounded-md text-primary transition hover:bg-primary/10"
                    >
                      <i class="fas fa-eye text-[10px]"></i>
                    </button>

                    <button
                      @click="editItem(item)"
                      title="Edit Product"
                      class="flex h-7 w-7 items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <i class="fas fa-edit text-[10px]"></i>
                    </button>

                  </div>

                </td>

              </tr>

              <!-- Empty -->
              <tr v-if="items.length === 0">

                <td
                  colspan="7"
                  class="px-4 py-12 text-center"
                >

                  <div
                    class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400"
                  >
                    <i class="fas fa-box-open text-sm"></i>
                  </div>

                  <p class="mt-2 text-xs font-medium text-slate-500">
                    No products found
                  </p>

                  <p class="mt-0.5 text-[10px] text-slate-400">
                    Try changing your search or create a new product.
                  </p>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      <!-- ========================================================= -->
      <!-- Mobile Cards -->
      <!-- ========================================================= -->
      <div class="space-y-2.5 md:hidden">

        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
        >

          <div class="flex items-start justify-between gap-3">

            <div class="flex min-w-0 items-center gap-2.5">

              <div
                class="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary"
              >

                <img
                  v-if="getThumbnailUrl(item)"
                  :src="getThumbnailUrl(item)"
                  :alt="item.name"
                  class="h-full w-full object-cover"
                />

                <i
                  v-else
                  class="fas fa-box-open text-xs"
                ></i>

              </div>

              <div class="min-w-0">

                <div class="flex items-center gap-2">

                  <span class="text-[10px] text-slate-400">
                    #{{ rowNumber(index) }}
                  </span>

                  <h2
                    class="truncate text-xs font-semibold text-slate-800"
                  >
                    {{ item.name || "Untitled Product" }}
                  </h2>

                </div>

                <p
                  class="mt-0.5 truncate font-mono text-[10px] text-slate-400"
                >
                  {{ item.slug || "No slug" }}
                </p>

              </div>

            </div>

          </div>

          <p
            class="mt-3 border-t border-slate-100 pt-2.5 text-[11px] leading-5 text-slate-500"
          >
            {{ item.shortDescription || item.description || "No description available." }}
          </p>

          <div
            class="mt-3 grid grid-cols-2 gap-2"
          >

            <div class="rounded-md bg-slate-50 px-2.5 py-2">

              <p class="text-[9px] uppercase tracking-wide text-slate-400">
                Price
              </p>

              <p class="mt-0.5 text-xs font-bold text-slate-700">
                {{ formatPrice(item.price) }}
                <span class="text-[9px] text-slate-400">
                  {{ item.currency || "USD" }}
                </span>
              </p>

            </div>

            <div class="rounded-md bg-slate-50 px-2.5 py-2">

              <p class="text-[9px] uppercase tracking-wide text-slate-400">
                Files
              </p>

              <p class="mt-0.5 text-xs font-bold text-slate-700">
                {{ getFiles(item).length }}
              </p>

            </div>

          </div>

          <div class="mt-2 rounded-md bg-primary/5 px-2.5 py-2">

            <p class="text-[9px] uppercase tracking-wide text-slate-400">
              Category
            </p>

            <p class="mt-0.5 truncate text-[10px] font-semibold text-primary">
              {{ item.category?.name || item.categoryName || item.categoryId || "-" }}
            </p>

          </div>

          <div
            class="mt-3 flex items-center justify-end gap-1 border-t border-slate-100 pt-2.5"
          >

            <button
              @click="viewItem(item)"
              class="flex h-7 items-center gap-1.5 rounded-md bg-primary/10 px-2.5 text-[10px] font-semibold text-primary transition hover:bg-primary/15"
            >
              <i class="fas fa-eye text-[9px]"></i>
              View
            </button>

            <button
              @click="editItem(item)"
              class="flex h-7 items-center gap-1.5 rounded-md bg-blue-50 px-2.5 text-[10px] font-semibold text-blue-600 transition hover:bg-blue-100"
            >
              <i class="fas fa-edit text-[9px]"></i>
              Edit
            </button>

          </div>

        </div>

        <div
          v-if="items.length === 0"
          class="rounded-lg border border-slate-200 bg-white px-4 py-10 text-center shadow-sm"
        >

          <div
            class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400"
          >
            <i class="fas fa-box-open text-sm"></i>
          </div>

          <p class="mt-2 text-xs font-medium text-slate-500">
            No products found
          </p>

        </div>

      </div>

      <!-- ========================================================= -->
      <!-- Pagination -->
      <!-- ========================================================= -->
      <div
        class="mt-3 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-400 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >

        <span>
          Showing

          <strong class="font-semibold text-slate-600">
            {{ count === 0 ? 0 : (currentPage - 1) * pageSize + 1 }}
          </strong>

          –

          <strong class="font-semibold text-slate-600">
            {{ Math.min(currentPage * pageSize, count) }}
          </strong>

          of

          <strong class="font-semibold text-slate-600">
            {{ count }}
          </strong>
        </span>

        <div class="flex items-center gap-1">

          <button
            @click="fetchItems(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="flex h-7 items-center gap-1 rounded-md border border-slate-200 px-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i class="fas fa-chevron-left text-[8px]"></i>
            Previous
          </button>

          <span
            class="flex h-7 min-w-7 items-center justify-center rounded-md bg-primary px-2 text-[10px] font-bold text-white"
          >
            {{ currentPage }}
          </span>

          <button
            @click="fetchItems(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="flex h-7 items-center gap-1 rounded-md border border-slate-200 px-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <i class="fas fa-chevron-right text-[8px]"></i>
          </button>

        </div>

      </div>

    </div>

    <!-- Add -->
    <AddProducts
      v-if="showModal && !editMode"
      @close="showModal = false"
      @saved="handleSaved"
    />

    <!-- Edit -->
    <EditProducts
      v-if="showModal && editMode"
      :data="selectedItem"
      @close="showModal = false"
      @saved="handleSaved"
    />

  </div>
</template>

<script>
import AddProducts from "./AddProducts.vue";
import EditProducts from "./EditProducts.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "ViewProducts",

  components: {
    AddProducts,
    EditProducts,
    Loading,
  },

  data() {
    return {
      items: [],
      count: 0,

      currentPage: 1,
      pageSize: 10,
      totalPages: 1,

      searchQuery: "",

      showModal: false,
      editMode: false,
      selectedItem: null,

      loading: false,

      searchTimer: null,
    };
  },

  methods: {

    async fetchItems(page = 1) {
      this.loading = true;

      this.currentPage = page;

      const params = {
        page: this.currentPage,
        limit: this.pageSize,
      };

      if (this.searchQuery.trim()) {
        params.search = this.searchQuery.trim();
      }

      try {
        const response = await this.$apiGet(
          "/products",
          params
        );

        this.items = response?.data || [];

        this.count =
          response?.pagination?.total || 0;

        this.currentPage =
          response?.pagination?.page || page;

        this.pageSize =
          response?.pagination?.limit || this.pageSize;

        this.totalPages =
          response?.pagination?.totalPages || 1;

      } catch (e) {

        console.error(
          "Error loading products:",
          e
        );

        this.items = [];
        this.count = 0;
        this.totalPages = 1;

        this.showToast(
          "Failed to load products",
          "error"
        );

      } finally {
        this.loading = false;
      }
    },

    handleSearch() {
      clearTimeout(this.searchTimer);

      this.searchTimer = setTimeout(() => {
        this.fetchItems(1);
      }, 350);
    },

    rowNumber(index) {
      return (
        (this.currentPage - 1) *
          this.pageSize +
        index +
        1
      );
    },

    getThumbnailUrl(item) {
      if (!item?.thumbnail) {
        return null;
      }

      if (typeof item.thumbnail === "string") {
        return item.thumbnail;
      }

      return (
        item.thumbnail.url ||
        item.thumbnail.path ||
        null
      );
    },

    getFiles(item) {
      if (!Array.isArray(item?.files)) {
        return [];
      }

      return item.files;
    },

    formatPrice(value) {
      const number = Number(value);

      if (Number.isNaN(number)) {
        return "0.00";
      }

      return number.toFixed(2);
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

    viewItem(item) {

     

      if (!item?.id) {
  
        return;
      }

      this.$router.push({
        name: "Products-detail",
        params: {
          id: item.id,
        },
      });
    },

    async handleSaved() {
      this.showModal = false;

      await this.fetchItems(
        this.currentPage
      );
    },

    showToast(message, type) {
      if (this.$root.$refs.toast) {
        this.$root.$refs.toast.showToast(
          message,
          type
        );
      }
    },
  },

  mounted() {
    this.fetchItems();
  },

  beforeDestroy() {
    clearTimeout(this.searchTimer);
  },
};
</script>