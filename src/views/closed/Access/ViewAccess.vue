<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">
    <Loading :visible="loading" message="Loading Access..." />

    <div class="mx-auto max-w-[1500px] p-4 sm:p-5">

      <!-- Header -->
      <div
        class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4
               sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
          >
            Marketplace
          </p>

          <h1 class="mt-0.5 text-lg font-bold text-slate-800">
            Access
          </h1>

          <p class="mt-0.5 text-[11px] text-slate-400">
            Manage access products and digital resources.
          </p>
        </div>

        <button
          @click="openAdd"
          class="inline-flex h-9 items-center justify-center gap-2
                 bg-primary px-4 text-xs font-semibold text-white
                 shadow-sm transition hover:opacity-90"
        >
          <i class="fas fa-plus text-[10px]"></i>
          Add Access
        </button>
      </div>

      <!-- Filters -->
      <div
        class="mb-4 border border-slate-200 bg-white p-3 shadow-sm"
      >
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">

          <div>
            <label
              class="mb-1 block text-[10px] font-semibold text-slate-500"
            >
              Search
            </label>

            <div class="relative">
              <i
                class="fas fa-search absolute left-3 top-1/2
                       -translate-y-1/2 text-[10px] text-slate-400"
              ></i>

              <input
                v-model="search"
                type="text"
                placeholder="Search access..."
                class="h-9 w-full border border-slate-200 bg-white
                       pl-8 pr-3 text-xs text-slate-700 outline-none
                       transition focus:border-primary focus:ring-1
                       focus:ring-primary/20"
                @keyup.enter="fetchAccess"
              />
            </div>
          </div>

          <div>
            <label
              class="mb-1 block text-[10px] font-semibold text-slate-500"
            >
              Type
            </label>

            <select
              v-model="typeFilter"
              class="h-9 w-full border border-slate-200 bg-white
                     px-3 text-xs text-slate-700 outline-none
                     focus:border-primary focus:ring-1
                     focus:ring-primary/20"
              @change="fetchAccess"
            >
              <option value="">All Types</option>
              <option
                v-for="type in availableTypes"
                :key="type"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              @click="resetFilters"
              class="h-9 border border-slate-200 bg-white px-4
                     text-[10px] font-semibold text-slate-500
                     transition hover:bg-slate-50"
            >
              <i class="fas fa-sync-alt mr-1"></i>
              Reset
            </button>
          </div>

        </div>
      </div>

      <!-- Table -->
      <div
        class="overflow-hidden border border-slate-200 bg-white shadow-sm"
      >
        <div
          class="flex items-center justify-between border-b border-slate-100
                 px-4 py-3"
        >
          <div>
            <h2 class="text-sm font-bold text-slate-800">
              Access Items
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              {{ filteredAccess.length }} item{{ filteredAccess.length === 1 ? "" : "s" }}
            </p>
          </div>
        </div>

        <!-- Desktop -->
        <div class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-[900px]">
            <thead>
              <tr class="border-b border-slate-100 bg-slate-50">
                <th class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Access
                </th>

                <th class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Type
                </th>

                <th class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Price
                </th>

                <th class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Currency
                </th>

                <th class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Files
                </th>

                <th class="px-4 py-3 text-right text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item, index) in filteredAccess"
                :key="item.id || index"
                class="border-b border-slate-100 transition hover:bg-slate-50/70"
              >
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">

                    <div
                      class="h-11 w-11 flex-shrink-0 overflow-hidden
                             border border-slate-200 bg-slate-100"
                    >
                      <img
                        v-if="getThumbnailUrl(item)"
                        :src="getThumbnailUrl(item)"
                        :alt="item.name"
                        class="h-full w-full object-cover"
                      />

                      <div
                        v-else
                        class="flex h-full w-full items-center
                               justify-center text-slate-300"
                      >
                        <i class="fas fa-key text-sm"></i>
                      </div>
                    </div>

                    <div class="min-w-0">
                      <p class="truncate text-xs font-semibold text-slate-700">
                        {{ item.name || "Unnamed Access" }}
                      </p>

                      <p
                        v-if="item.slug"
                        class="mt-0.5 truncate font-mono text-[9px] text-slate-400"
                      >
                        {{ item.slug }}
                      </p>
                    </div>

                  </div>
                </td>

                <td class="px-4 py-3">
                  <span
                    class="inline-flex bg-primary/10 px-2 py-1
                           text-[9px] font-semibold text-primary"
                  >
                    {{ item.type || "—" }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <span class="text-xs font-semibold text-slate-700">
                    {{ formatPrice(item.price) }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <span class="text-[10px] font-semibold uppercase text-slate-500">
                    {{ item.currency || "—" }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <span class="text-xs font-semibold text-slate-600">
                    {{ getFiles(item).length }}
                  </span>
                </td>

                <td class="px-4 py-3">
                  <div class="flex justify-end gap-1.5">

                    <button
                      @click="viewItem(item)"
                      class="flex h-7 w-7 items-center justify-center
                             border border-slate-200 bg-white
                             text-slate-500 transition hover:bg-slate-50"
                      title="View"
                    >
                      <i class="fas fa-eye text-[10px]"></i>
                    </button>

                    <button
                      @click="editItem(item)"
                      class="flex h-7 w-7 items-center justify-center
                             border border-slate-200 bg-white
                             text-primary transition hover:bg-primary/5"
                      title="Edit"
                    >
                      <i class="fas fa-edit text-[10px]"></i>
                    </button>

                  </div>
                </td>
              </tr>

              <tr v-if="!loading && filteredAccess.length === 0">
                <td colspan="6" class="px-5 py-14 text-center">

                  <div
                    class="mx-auto flex h-11 w-11 items-center justify-center
                           bg-slate-100 text-slate-400"
                  >
                    <i class="fas fa-key text-sm"></i>
                  </div>

                  <p class="mt-3 text-xs font-semibold text-slate-500">
                    No access items found
                  </p>

                  <p class="mt-1 text-[10px] text-slate-400">
                    Try another search or create a new access item.
                  </p>

                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile -->
        <div class="divide-y divide-slate-100 md:hidden">
          <div
            v-for="(item, index) in filteredAccess"
            :key="item.id || index"
            class="p-4"
          >
            <div class="flex gap-3">

              <div
                class="h-14 w-14 flex-shrink-0 overflow-hidden
                       border border-slate-200 bg-slate-100"
              >
                <img
                  v-if="getThumbnailUrl(item)"
                  :src="getThumbnailUrl(item)"
                  :alt="item.name"
                  class="h-full w-full object-cover"
                />

                <div
                  v-else
                  class="flex h-full w-full items-center
                         justify-center text-slate-300"
                >
                  <i class="fas fa-key"></i>
                </div>
              </div>

              <div class="min-w-0 flex-1">
                <div class="flex items-start justify-between gap-2">
                  <div class="min-w-0">
                    <p class="truncate text-xs font-semibold text-slate-700">
                      {{ item.name || "Unnamed Access" }}
                    </p>

                    <p class="mt-1 text-[9px] text-slate-400">
                      {{ item.type || "No type" }}
                    </p>
                  </div>

                  <span
                    class="flex-shrink-0 text-xs font-bold text-slate-800"
                  >
                    {{ formatPrice(item.price) }}
                    {{ item.currency || "" }}
                  </span>
                </div>

                <div class="mt-3 flex items-center justify-between">
                  <span class="text-[9px] text-slate-400">
                    {{ getFiles(item).length }} file{{ getFiles(item).length === 1 ? "" : "s" }}
                  </span>

                  <div class="flex gap-1.5">
                    <button
                      @click="viewItem(item)"
                      class="h-7 border border-slate-200 px-2.5
                             text-[9px] font-semibold text-slate-500"
                    >
                      View
                    </button>

                    <button
                      @click="editItem(item)"
                      class="h-7 bg-primary px-2.5 text-[9px]
                             font-semibold text-white"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          class="flex flex-col gap-2 border-t border-slate-100 px-4 py-3
                 sm:flex-row sm:items-center sm:justify-between"
        >
          <p class="text-[10px] text-slate-400">
            Page {{ page }}
          </p>

          <div class="flex gap-2">
            <button
              @click="previousPage"
              :disabled="page <= 1 || loading"
              class="h-8 border border-slate-200 bg-white px-3
                     text-[10px] font-semibold text-slate-500
                     disabled:cursor-not-allowed disabled:opacity-40"
            >
              <i class="fas fa-chevron-left mr-1 text-[8px]"></i>
              Previous
            </button>

            <button
              @click="nextPage"
              :disabled="!hasNextPage || loading"
              class="h-8 border border-slate-200 bg-white px-3
                     text-[10px] font-semibold text-slate-500
                     disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <i class="fas fa-chevron-right ml-1 text-[8px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add -->
    <AddAccess
      v-if="showAdd"
      @close="showAdd = false"
      @saved="handleSaved"
    />

    <!-- Edit -->
    <EditAccess
      v-if="showEdit"
      :data="selectedItem"
      @close="showEdit = false"
      @saved="handleSaved"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import AddAccess from "./AddAccess.vue";
import EditAccess from "./EditAccess.vue";

export default {
  name: "ViewAccess",

  components: {
    Loading,
    AddAccess,
    EditAccess,
  },

  data() {
    return {
      access: [],
      loading: false,

      search: "",
      typeFilter: "",

      page: 1,
      limit: 10,
      hasNextPage: false,

      showAdd: false,
      showEdit: false,
      selectedItem: null,
    };
  },

  computed: {
    availableTypes() {
      return [
        ...new Set(
          this.access
            .map((item) => item.type)
            .filter(Boolean)
        ),
      ];
    },

    filteredAccess() {
      const search = this.search.trim().toLowerCase();

      return this.access.filter((item) => {
        const matchesSearch =
          !search ||
          String(item.name || "").toLowerCase().includes(search) ||
          String(item.slug || "").toLowerCase().includes(search) ||
          String(item.description || "").toLowerCase().includes(search);

        const matchesType =
          !this.typeFilter ||
          item.type === this.typeFilter;

        return matchesSearch && matchesType;
      });
    },
  },

  methods: {
    async fetchAccess() {
      this.loading = true;

      try {
        const response = await this.$apiGet("/access", {
          page: this.page,
          limit: this.limit,
        });

        const payload = response?.data || response;

        if (Array.isArray(payload)) {
          this.access = payload;
          this.hasNextPage = payload.length === this.limit;
        } else {
          this.access =
            payload?.items ||
            payload?.data ||
            payload?.results ||
            [];

          this.hasNextPage =
            Boolean(
              payload?.hasNextPage ??
              payload?.hasNext ??
              this.access.length === this.limit
            );
        }
      } catch (e) {
        console.error("Error loading access:", e);

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load access",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    getThumbnailUrl(item) {
      const thumbnail = item?.thumbnail;

      if (!thumbnail) {
        return null;
      }

      if (typeof thumbnail === "string") {
        return thumbnail;
      }

      return (
        thumbnail.url ||
        thumbnail.path ||
        thumbnail.src ||
        null
      );
    },

    getFiles(item) {
      if (!item?.files) {
        return [];
      }

      if (Array.isArray(item.files)) {
        return item.files;
      }

      if (typeof item.files === "string") {
        try {
          const parsed = JSON.parse(item.files);
          return Array.isArray(parsed) ? parsed : [];
        } catch {
          return [];
        }
      }

      return [];
    },

    formatPrice(value) {
      const number = Number(value);

      if (Number.isNaN(number)) {
        return "0.00";
      }

      return number.toFixed(2);
    },

    openAdd() {
      this.showAdd = true;
    },

    editItem(item) {
      this.selectedItem = item;
      this.showEdit = true;
    },

    viewItem(item) {
      if (!item?.id) {
        return;
      }

      this.$router.push({
        name: "Access-detail",
        params: {
          id: item.id,
        },
      });
    },

    async handleSaved() {
      this.showAdd = false;
      this.showEdit = false;
      this.selectedItem = null;

      await this.fetchAccess();
    },

    resetFilters() {
      this.search = "";
      this.typeFilter = "";
      this.page = 1;
      this.fetchAccess();
    },

    previousPage() {
      if (this.page <= 1) {
        return;
      }

      this.page--;
      this.fetchAccess();
    },

    nextPage() {
      if (!this.hasNextPage) {
        return;
      }

      this.page++;
      this.fetchAccess();
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
    this.fetchAccess();
  },
};
</script>