<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">

    <!-- Loading -->
    <Loading
      :visible="loading"
      message="Loading Asset..."
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

          <div
            class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
          >
            <i class="fas fa-bullhorn text-sm"></i>
          </div>

          <div>
            <h1 class="text-base font-bold text-slate-800">
              Asset
            </h1>

            <p class="mt-0.5 text-[11px] text-slate-400">
              Manage social media Asset, profiles and monetization information
            </p>
          </div>

        </div>

        <button
          type="button"
          @click="openAddModal"
          class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <i class="fas fa-plus text-[10px]"></i>
          <span>Add Asset</span>
        </button>

      </div>


      <!-- ========================================================= -->
      <!-- Toolbar -->
      <!-- ========================================================= -->
      <div
        class="mb-3 flex flex-col gap-2 border border-slate-200 bg-white p-2.5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      >

        <!-- Search -->
        <div class="relative w-full sm:max-w-sm">

          <i
            class="fas fa-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400"
          ></i>

          <input
            v-model="searchQuery"
            @input="handleSearch"
            type="text"
            placeholder="Search Asset..."
            class="h-8 w-full border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary/10"
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
            class="h-8 border border-slate-200 bg-white px-2 text-xs text-slate-600 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
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
        class="hidden overflow-hidden border border-slate-200 bg-white shadow-sm md:block"
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
                  Asset
                </th>

                <th class="px-4 py-2.5 text-left">
                  Platform
                </th>

                <th class="px-4 py-2.5 text-left">
                  Category
                </th>

                <th class="px-4 py-2.5 text-left">
                  Price
                </th>

                <th class="px-4 py-2.5 text-center">
                  Followers
                </th>

                <th class="px-4 py-2.5 text-center">
                  Engagement
                </th>

                <th class="px-4 py-2.5 text-center">
                  Status
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
                  {{ (currentPage - 1) * pageSize + index + 1 }}
                </td>


                <!-- Asset -->
                <td class="px-4 py-3">

                  <div class="flex items-center gap-2.5">

                    <div
                      class="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden bg-primary/10 text-primary"
                    >

                      <img
                        v-if="getProfileImage(item)"
                        :src="getProfileImage(item)"
                        :alt="item.name"
                        class="h-full w-full object-cover"
                      />

                      <i
                        v-else
                        class="fas fa-user-circle text-sm"
                      ></i>

                    </div>

                    <div class="min-w-0">

                      <p
                        class="truncate text-xs font-semibold text-slate-800"
                      >
                        {{ item.name || "Unnamed Asset" }}
                      </p>

                      <p
                        v-if="item.username"
                        class="mt-0.5 truncate text-[10px] text-slate-400"
                      >
                        @{{ item.username }}
                      </p>

                    </div>

                  </div>

                </td>


                <!-- Platform -->
                <td class="px-4 py-3">

                  <span
                    class="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
                  >
                    <i
                      :class="getPlatformIcon(item.platform)"
                      class="text-[9px]"
                    ></i>

                    {{ item.platform || "-" }}
                  </span>

                </td>


                <!-- Category -->
                <td class="px-4 py-3">

                  <span
                    class="inline-flex bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary"
                  >
                    {{ getCategoryName(item) }}
                  </span>

                </td>


                <!-- Price -->
                <td class="px-4 py-3">

                  <div class="whitespace-nowrap">

                    <span class="text-xs font-bold text-slate-700">
                      {{ formatPrice(item.price) }}
                    </span>

                    <span
                      class="ml-1 text-[9px] font-semibold uppercase text-primary"
                    >
                      {{ item.currency || "USD" }}
                    </span>

                  </div>

                </td>


                <!-- Followers -->
                <td class="px-4 py-3 text-center">

                  <span class="text-xs font-semibold text-slate-700">
                    {{ formatNumber(item.followers) }}
                  </span>

                </td>


                <!-- Engagement -->
                <td class="px-4 py-3 text-center">

                  <span
                    v-if="item.engagementRate !== null && item.engagementRate !== undefined"
                    class="text-xs font-semibold text-slate-700"
                  >
                    {{ item.engagementRate }}%
                  </span>

                  <span
                    v-else
                    class="text-slate-400"
                  >
                    -
                  </span>

                </td>


                <!-- Status -->
                <td class="px-4 py-3 text-center">

                  <span
                    v-if="isActive(item)"
                    class="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Active
                  </span>

                  <span
                    v-else
                    class="inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500"
                  >
                    <span class="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                    Inactive
                  </span>

                </td>


                <!-- Actions -->
                <td class="px-4 py-3">

                  <div class="flex items-center justify-center gap-1">

                    <!-- View -->
                    <button
                      type="button"
                      @click="viewItem(item)"
                      class="flex h-7 w-7 items-center justify-center text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                      title="View Asset"
                    >
                      <i class="fas fa-eye text-[10px]"></i>
                    </button>


                    <!-- Edit -->
                    <button
                      type="button"
                      @click="editItem(item)"
                      class="flex h-7 w-7 items-center justify-center text-primary transition hover:bg-primary/10"
                      title="Edit Asset"
                    >
                      <i class="fas fa-edit text-[10px]"></i>
                    </button>

                  </div>

                </td>

              </tr>


              <!-- Empty -->
              <tr v-if="items.length === 0">

                <td
                  colspan="9"
                  class="px-4 py-12 text-center"
                >

                  <div
                    class="mx-auto flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-400"
                  >
                    <i class="fas fa-bullhorn text-sm"></i>
                  </div>

                  <p
                    class="mt-2 text-xs font-medium text-slate-500"
                  >
                    No Asset records found
                  </p>

                  <p
                    class="mt-0.5 text-[10px] text-slate-400"
                  >
                    Try changing your search or create a new Asset record.
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
          class="border border-slate-200 bg-white p-3 shadow-sm"
        >

          <div class="flex items-start justify-between gap-3">

            <div class="flex min-w-0 items-center gap-2.5">

              <div
                class="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden bg-primary/10 text-primary"
              >

                <img
                  v-if="getProfileImage(item)"
                  :src="getProfileImage(item)"
                  :alt="item.name"
                  class="h-full w-full object-cover"
                />

                <i
                  v-else
                  class="fas fa-user-circle text-sm"
                ></i>

              </div>

              <div class="min-w-0">

                <div class="flex items-center gap-2">

                  <span class="text-[10px] text-slate-400">
                    #{{ (currentPage - 1) * pageSize + index + 1 }}
                  </span>

                  <h2
                    class="truncate text-xs font-semibold text-slate-800"
                  >
                    {{ item.name || "Unnamed Asset" }}
                  </h2>

                </div>

                <p
                  v-if="item.username"
                  class="mt-0.5 truncate text-[10px] text-slate-400"
                >
                  @{{ item.username }}
                </p>

              </div>

            </div>


            <span
              v-if="isActive(item)"
              class="flex-shrink-0 bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary"
            >
              Active
            </span>

            <span
              v-else
              class="flex-shrink-0 bg-slate-100 px-2 py-1 text-[9px] font-semibold text-slate-500"
            >
              Inactive
            </span>

          </div>


          <!-- Details -->
          <div
            class="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3"
          >

            <div class="bg-slate-50 px-2.5 py-2">

              <p class="text-[9px] uppercase text-slate-400">
                Platform
              </p>

              <p class="mt-0.5 text-[10px] font-semibold text-slate-700">
                {{ item.platform || "-" }}
              </p>

            </div>

            <div class="bg-slate-50 px-2.5 py-2">

              <p class="text-[9px] uppercase text-slate-400">
                Category
              </p>

              <p class="mt-0.5 truncate text-[10px] font-semibold text-slate-700">
                {{ getCategoryName(item) }}
              </p>

            </div>

            <div class="bg-slate-50 px-2.5 py-2">

              <p class="text-[9px] uppercase text-slate-400">
                Followers
              </p>

              <p class="mt-0.5 text-[10px] font-semibold text-slate-700">
                {{ formatNumber(item.followers) }}
              </p>

            </div>

            <div class="bg-slate-50 px-2.5 py-2">

              <p class="text-[9px] uppercase text-slate-400">
                Engagement
              </p>

              <p class="mt-0.5 text-[10px] font-semibold text-slate-700">
                {{ item.engagementRate ?? "-" }}{{ item.engagementRate !== null && item.engagementRate !== undefined ? "%" : "" }}
              </p>

            </div>

          </div>


          <!-- Actions -->
          <div
            class="mt-3 flex justify-end gap-1 border-t border-slate-100 pt-2.5"
          >

            <button
              type="button"
              @click="viewItem(item)"
              class="flex h-7 items-center gap-1.5 border border-slate-200 px-2.5 text-[10px] font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              <i class="fas fa-eye text-[9px]"></i>
              View
            </button>

            <button
              type="button"
              @click="editItem(item)"
              class="flex h-7 items-center gap-1.5 bg-primary/10 px-2.5 text-[10px] font-semibold text-primary transition hover:bg-primary/20"
            >
              <i class="fas fa-edit text-[9px]"></i>
              Edit
            </button>

          </div>

        </div>


        <!-- Mobile Empty -->
        <div
          v-if="items.length === 0"
          class="border border-slate-200 bg-white px-4 py-10 text-center shadow-sm"
        >

          <div
            class="mx-auto flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-400"
          >
            <i class="fas fa-bullhorn text-sm"></i>
          </div>

          <p class="mt-2 text-xs font-medium text-slate-500">
            No Asset records found
          </p>

          <p class="mt-0.5 text-[10px] text-slate-400">
            Try another search or add a new Asset record.
          </p>

        </div>

      </div>


      <!-- ========================================================= -->
      <!-- Pagination -->
      <!-- ========================================================= -->
      <div
        class="mt-3 flex flex-col gap-2 border border-slate-200 bg-white px-3 py-2.5 text-[10px] text-slate-400 shadow-sm sm:flex-row sm:items-center sm:justify-between"
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
            type="button"
            @click="fetchItems(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="flex h-7 items-center gap-1 border border-slate-200 px-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <i class="fas fa-chevron-left text-[8px]"></i>
            Previous
          </button>


          <span
            class="flex h-7 min-w-7 items-center justify-center bg-primary px-2 text-[10px] font-bold text-white"
          >
            {{ currentPage }}
          </span>


          <button
            type="button"
            @click="fetchItems(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="flex h-7 items-center gap-1 border border-slate-200 px-2.5 text-[10px] font-medium text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <i class="fas fa-chevron-right text-[8px]"></i>
          </button>

        </div>

      </div>

    </div>


    <!-- =========================================================== -->
    <!-- Add -->
    <!-- =========================================================== -->
    <AddAsset
      v-if="showModal && !editMode"
      :data="selectedItem"
      :categories="categories"
      @close="closeModal"
      @saved="handleSaved"
    />


    <!-- =========================================================== -->
    <!-- Edit -->
    <!-- =========================================================== -->
    <EditAsset
      v-if="showModal && editMode"
      :data="selectedItem"
      :categories="categories"
      @close="closeModal"
      @saved="handleSaved"
    />

  </div>
</template>


<script>
import Loading from "@/components/Loading.vue";
import AddAsset from "./AddAsset.vue"; 
import EditAsset from "./EditAsset.vue";

export default {
  name: "ViewAsset",

  components: {
    Loading,
    AddAsset,
    EditAsset,
  },

  data() {
    return {
      items: [],
      categories: [],

      count: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 1,

      searchQuery: "",

      showModal: false,
      editMode: false,
      selectedItem: null,

      loading: false,
    };
  },

  methods: {
    async fetchItems(page = 1) {
      if (page < 1) {
        return;
      }

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
          "/assets",
          params
        );

        this.items =
          response?.data ||
          response?.data?.data ||
          [];

        this.count =
          response?.pagination?.total ||
          response?.data?.pagination?.total ||
          0;

        this.currentPage =
          response?.pagination?.page ||
          response?.data?.pagination?.page ||
          page;

        this.pageSize =
          response?.pagination?.limit ||
          response?.data?.pagination?.limit ||
          this.pageSize;

        this.totalPages =
          response?.pagination?.totalPages ||
          response?.data?.pagination?.totalPages ||
          1;

      } catch (e) {
        console.error(
          "Error loading Asset:",
          e
        );

        this.items = [];
        this.count = 0;
        this.totalPages = 1;

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load Asset",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },


    async fetchCategories() {
      try {
        const response = await this.$apiGet(
          "/categories",
          {
            page: 1,
            limit: 100,
          }
        );

        this.categories =
          response?.data ||
          response?.data?.data ||
          [];

      } catch (e) {
        console.error(
          "Error loading categories:",
          e
        );

        this.categories = [];

        this.showToast(
          "Failed to load categories",
          "error"
        );
      }
    },


    handleSearch() {
      clearTimeout(this._searchTimer);

      this._searchTimer = setTimeout(() => {
        this.fetchItems(1);
      }, 300);
    },


    getProfileImage(item) {
      if (!item) {
        return null;
      }

      const image =
        item.profileUrl ||
        item.profileImage ||
        item.profile ||
        null;

      if (!image) {
        return null;
      }

      if (typeof image === "string") {
        return image;
      }

      return (
        image.url ||
        image.path ||
        image.src ||
        null
      );
    },


    getCategoryName(item) {
      if (!item) {
        return "Uncategorized";
      }

      return (
        item.category?.name ||
        item.categoryName ||
        this.categories.find(
          (category) =>
            category.id === item.categoryId
        )?.name ||
        "Uncategorized"
      );
    },


    getPlatformIcon(platform) {
      const value = String(
        platform || ""
      ).toLowerCase();

      if (value.includes("instagram")) {
        return "fab fa-instagram";
      }

      if (value.includes("facebook")) {
        return "fab fa-facebook";
      }

      if (value.includes("youtube")) {
        return "fab fa-youtube";
      }

      if (value.includes("tiktok")) {
        return "fab fa-tiktok";
      }

      if (value.includes("twitter") || value.includes("x")) {
        return "fab fa-x-twitter";
      }

      if (value.includes("linkedin")) {
        return "fab fa-linkedin";
      }

      return "fas fa-globe";
    },


    isActive(item) {
      return item?.isActive !== false;
    },


    formatNumber(value) {
      const number = Number(value);

      if (Number.isNaN(number)) {
        return "0";
      }

      return number.toLocaleString();
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
        name: "Assets-detail",
        params: {
          id: item.id,
        },
      });
    },


    closeModal() {
      this.showModal = false;
      this.selectedItem = null;
    },


    async handleSaved() {
      this.showModal = false;
      this.selectedItem = null;

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


  async mounted() {
    await Promise.all([
      this.fetchCategories(),
      this.fetchItems(),
    ]);
  },


  beforeDestroy() {
    clearTimeout(this._searchTimer);
  },
};
</script>

