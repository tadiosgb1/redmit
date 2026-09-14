
<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">

    <!-- Loading -->
    <Loading
      :visible="loading"
      message="Loading Categories..."
    />

    <!-- Page Container -->
    <div class="mx-auto max-w-[1600px] p-4 sm:p-5">

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div class="flex items-center gap-3">

          <!-- Icon -->
          <div
            class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            <i class="fas fa-layer-group text-sm"></i>
          </div>

          <div>
            <h1 class="text-base font-bold text-slate-800">
              Categories
            </h1>

            <p class="mt-0.5 text-[11px] text-slate-400">
              Manage categories, descriptions and category images
            </p>
          </div>

        </div>

        <!-- Add Category -->
        <button
          @click="openAddModal"
          class="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1"
        >
          <i class="fas fa-plus text-[10px]"></i>
          <span>Add Category</span>
        </button>

      </div>


      <!-- ========================================================= -->
      <!-- Toolbar -->
      <!-- ========================================================= -->
      <div
        class="mb-3 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >

        <!-- Search -->
        <div class="relative w-full sm:max-w-xs">

          <i
            class="fas fa-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"
          ></i>

          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search categories..."
            class="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary/50 focus:bg-white focus:ring-1 focus:ring-primary/10"
          />

        </div>


        <!-- Page Size -->
        <div
          class="flex items-center gap-2 text-[11px] text-slate-500"
        >

          <span>Show</span>

          <select
            v-model="pageSize"
            @change="fetchItems(1)"
            class="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-600 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/10"
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

            <!-- Header -->
            <thead>
              <tr
                class="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-400"
              >

                <th class="w-12 px-4 py-2.5 text-left">
                  #
                </th>

                <th class="px-4 py-2.5 text-left">
                  Category
                </th>

                <th class="px-4 py-2.5 text-left">
                  Slug
                </th>

                <th class="px-4 py-2.5 text-left">
                  Description
                </th>

                <th class="px-4 py-2.5 text-center">
                  Image
                </th>

                <th class="px-4 py-2.5 text-center">
                  Status
                </th>

                <th class="px-4 py-2.5 text-center">
                  Actions
                </th>

              </tr>
            </thead>


            <!-- Body -->
            <tbody class="divide-y divide-slate-100">

              <tr
                v-for="(item, index) in items"
                :key="item.id"
                class="group transition hover:bg-slate-50"
              >

                <!-- Number -->
                <td class="px-4 py-3 text-[11px] text-slate-400">
                  {{ (currentPage - 1) * pageSize + index + 1 }}
                </td>


                <!-- Category -->
                <td class="px-4 py-3">

                  <div class="flex items-center gap-2.5">

                    <!-- Image -->
                    <div
                      class="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary"
                    >

                      <img
                        v-if="getImageUrl(item)"
                        :src="getImageUrl(item)"
                        :alt="item.name"
                        class="h-full w-full object-cover"
                      />

                      <i
                        v-else
                        class="fas fa-layer-group text-xs"
                      ></i>

                    </div>


                    <!-- Name -->
                    <div class="min-w-0">

                      <p
                        class="truncate text-xs font-semibold text-slate-800"
                      >
                        {{ item.name }}
                      </p>

                    </div>

                  </div>

                </td>


                <!-- Slug -->
                <td class="px-4 py-3">

                  <span
                    class="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-600"
                  >
                    {{ item.slug || "-" }}
                  </span>

                </td>


                <!-- Description -->
                <td class="max-w-[320px] px-4 py-3">

                  <p
                    class="truncate text-[11px] text-slate-500"
                    :title="item.description || ''"
                  >
                    {{ item.description || "No description" }}
                  </p>

                </td>


                <!-- Image -->
                <td class="px-4 py-3 text-center">

                  <span
                    v-if="item.image"
                    class="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary"
                  >

                    <i class="fas fa-image text-[9px]"></i>

                    Available

                  </span>


                  <span
                    v-else
                    class="inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500"
                  >

                    <i class="fas fa-image text-[9px]"></i>

                    No Image

                  </span>

                </td>


                <!-- Status -->
                <td class="px-4 py-3 text-center">

                  <span
                    v-if="isActive(item)"
                    class="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary"
                  >

                    <span
                      class="h-1.5 w-1.5 rounded-full bg-primary"
                    ></span>

                    Active

                  </span>


                  <span
                    v-else
                    class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500"
                  >

                    <span
                      class="h-1.5 w-1.5 rounded-full bg-slate-400"
                    ></span>

                    Inactive

                  </span>

                </td>


                <!-- Actions -->
                <td class="px-4 py-3">

                  <div
                    class="flex items-center justify-center gap-1"
                  >

                    <!-- Edit -->
                    <button
                      @click="editItem(item)"
                      class="flex h-7 w-7 items-center justify-center rounded-md text-blue-500 transition hover:bg-blue-50 hover:text-blue-600"
                      title="Edit Category"
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
                    <i class="fas fa-layer-group text-sm"></i>
                  </div>

                  <p
                    class="mt-2 text-xs font-medium text-slate-500"
                  >
                    No categories found
                  </p>

                  <p
                    class="mt-0.5 text-[10px] text-slate-400"
                  >
                    Try changing your search or create a new category.
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

          <!-- Card Header -->
          <div
            class="flex items-start justify-between gap-3"
          >

            <div
              class="flex min-w-0 items-center gap-2.5"
            >

              <!-- Image -->
              <div
                class="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary/10 text-primary"
              >

                <img
                  v-if="getImageUrl(item)"
                  :src="getImageUrl(item)"
                  :alt="item.name"
                  class="h-full w-full object-cover"
                />

                <i
                  v-else
                  class="fas fa-layer-group text-xs"
                ></i>

              </div>


              <!-- Name -->
              <div class="min-w-0">

                <div
                  class="flex items-center gap-2"
                >

                  <span
                    class="text-[10px] text-slate-400"
                  >
                    #{{ (currentPage - 1) * pageSize + index + 1 }}
                  </span>

                  <h2
                    class="truncate text-xs font-semibold text-slate-800"
                  >
                    {{ item.name }}
                  </h2>

                </div>

                <p
                  class="mt-0.5 truncate font-mono text-[10px] text-slate-400"
                >
                  {{ item.slug || "No slug" }}
                </p>

              </div>

            </div>


            <!-- Status -->
            <span
              v-if="isActive(item)"
              class="flex-shrink-0 rounded-full bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary"
            >
              Active
            </span>

            <span
              v-else
              class="flex-shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-semibold text-slate-500"
            >
              Inactive
            </span>

          </div>


          <!-- Description -->
          <p
            class="mt-3 border-t border-slate-100 pt-2.5 text-[11px] leading-5 text-slate-500"
          >
            {{ item.description || "No description available." }}
          </p>


          <!-- Image Info -->
          <div
            class="mt-3 flex items-center justify-between rounded-md bg-slate-50 px-2.5 py-2"
          >

            <div class="flex items-center gap-2">

              <i
                class="fas fa-image text-[10px] text-slate-400"
              ></i>

              <span class="text-[10px] text-slate-500">
                Image
              </span>

            </div>


            <span
              v-if="item.image"
              class="text-[10px] font-semibold text-primary"
            >
              Available
            </span>

            <span
              v-else
              class="text-[10px] font-medium text-slate-400"
            >
              Not available
            </span>

          </div>


          <!-- Actions -->
          <div
            class="mt-3 flex items-center justify-end gap-1 border-t border-slate-100 pt-2.5"
          >

            <!-- Edit -->
            <button
              @click="editItem(item)"
              class="flex h-7 items-center gap-1.5 rounded-md bg-blue-50 px-2.5 text-[10px] font-semibold text-blue-600 transition hover:bg-blue-100"
            >

              <i class="fas fa-edit text-[9px]"></i>

              Edit

            </button>

          </div>

        </div>


        <!-- Mobile Empty -->
        <div
          v-if="items.length === 0"
          class="rounded-lg border border-slate-200 bg-white px-4 py-10 text-center shadow-sm"
        >

          <div
            class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400"
          >
            <i class="fas fa-layer-group text-sm"></i>
          </div>

          <p
            class="mt-2 text-xs font-medium text-slate-500"
          >
            No categories found
          </p>

          <p
            class="mt-0.5 text-[10px] text-slate-400"
          >
            Try another search or add a new category.
          </p>

        </div>

      </div>


      <!-- ========================================================= -->
      <!-- Pagination -->
      <!-- ========================================================= -->
      <div
        class="mt-3 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-400 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >

        <!-- Results -->
        <span>

          Showing

          <strong
            class="font-semibold text-slate-600"
          >
            {{
              count === 0
                ? 0
                : (currentPage - 1) * pageSize + 1
            }}
          </strong>

          –

          <strong
            class="font-semibold text-slate-600"
          >
            {{
              Math.min(
                currentPage * pageSize,
                count
              )
            }}
          </strong>

          of

          <strong
            class="font-semibold text-slate-600"
          >
            {{ count }}
          </strong>

        </span>


        <!-- Navigation -->
        <div class="flex items-center gap-1">

          <!-- Previous -->
          <button
            @click="fetchItems(currentPage - 1)"
            :disabled="currentPage <= 1 || loading"
            class="flex h-7 items-center gap-1 rounded-md border border-slate-200 px-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >

            <i
              class="fas fa-chevron-left text-[8px]"
            ></i>

            Previous

          </button>


          <!-- Current -->
          <span
            class="flex h-7 min-w-7 items-center justify-center rounded-md bg-primary px-2 text-[10px] font-bold text-white"
          >
            {{ currentPage }}
          </span>


          <!-- Next -->
          <button
            @click="fetchItems(currentPage + 1)"
            :disabled="
              currentPage >= totalPages ||
              loading
            "
            class="flex h-7 items-center gap-1 rounded-md border border-slate-200 px-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >

            Next

            <i
              class="fas fa-chevron-right text-[8px]"
            ></i>

          </button>

        </div>

      </div>

    </div>


    <!-- ============================================================= -->
    <!-- Add Category Modal -->
    <!-- ============================================================= -->
    <AddCategories
      v-if="showModal && !editMode"
      :data="selectedItem"
      @close="showModal = false"
      @saved="handleSaved"
    />


    <!-- ============================================================= -->
    <!-- Edit Category Modal -->
    <!-- ============================================================= -->
    <EditCategories
      v-if="showModal && editMode"
      :data="selectedItem"
      @close="showModal = false"
      @saved="handleSaved"
    />

  </div>
</template>


<script>
import AddCategories from "./AddCategories.vue";
import EditCategories from "./EditCategories.vue";
import Loading from "@/components/Loading.vue";

export default {
  name: "CategoriesView",

  components: {
    AddCategories,
    EditCategories,
    Loading,
  },

  data() {
    return {
      /* =========================================================
       * Categories
       * ========================================================= */
      items: [],

      /* =========================================================
       * Pagination
       * ========================================================= */
      count: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,

      /* =========================================================
       * Search
       * ========================================================= */
      searchQuery: "",

      /* =========================================================
       * Modal
       * ========================================================= */
      showModal: false,
      editMode: false,
      selectedItem: null,

      /* =========================================================
       * Loading
       * ========================================================= */
      loading: false,
    };
  },

  methods: {

    /* =========================================================
     * Search
     * ========================================================= */
    handleSearch() {
      this.fetchItems(1);
    },


    /* =========================================================
     * Fetch Categories
     *
     * GET /categories
     *
     * Expected response:
     *
     * {
     *   status: 1,
     *   pagination: {
     *     total: 100,
     *     page: 1,
     *     limit: 10,
     *     totalPages: 10
     *   },
     *   data: [...]
     * }
     * ========================================================= */
    async fetchItems(page = 1) {

      this.loading = true;

      const params = {
        page,
        limit: this.pageSize,
      };

      if (this.searchQuery.trim()) {
        params.search = this.searchQuery.trim();
      }

      try {

        const response = await this.$apiGet(
          "/categories",
          params
        );

        /*
         * Categories
         */
        this.items = Array.isArray(response?.data)
          ? response.data
          : [];

        /*
         * Pagination
         */
        const pagination =
          response?.pagination || {};

        this.count =
          Number(pagination.total) || 0;

        this.currentPage =
          Number(pagination.page) || page;

        this.pageSize =
          Number(pagination.limit) ||
          this.pageSize;

        this.totalPages =
          Number(pagination.totalPages) || 1;

      } catch (e) {

        console.error(
          "Error loading categories:",
          e
        );

        this.items = [];
        this.count = 0;
        this.totalPages = 1;

        if (this.$root?.$refs?.toast) {
          this.$root.$refs.toast.showToast(
            "Failed to load categories",
            "error"
          );
        }

      } finally {

        this.loading = false;

      }
    },


    /* =========================================================
     * Check Category Status
     *
     * API:
     *
     * isActive: true / false
     * ========================================================= */
    isActive(item) {
      return item?.isActive === true;
    },


    /* =========================================================
     * Get Category Image URL
     *
     * API:
     *
     * image: {
     *   url: "..."
     * }
     * ========================================================= */
    getImageUrl(item) {

      if (!item?.image) {
        return null;
      }

      if (
        typeof item.image === "string"
      ) {
        return item.image;
      }

      return item.image?.url || null;
    },


    /* =========================================================
     * Open Add Modal
     * ========================================================= */
    openAddModal() {

      this.editMode = false;

      this.selectedItem = null;

      this.showModal = true;
    },


    /* =========================================================
     * Open Edit Modal
     * ========================================================= */
    editItem(item) {

      this.editMode = true;

      this.selectedItem = item;

      this.showModal = true;
    },


    /* =========================================================
     * After Add/Edit
     * ========================================================= */
    async handleSaved() {

      this.showModal = false;

      this.selectedItem = null;

      await this.fetchItems(
        this.currentPage
      );
    },

  },


  /* =========================================================
   * Initial Load
   * ========================================================= */
  mounted() {
    this.fetchItems();
  },
};
</script>


