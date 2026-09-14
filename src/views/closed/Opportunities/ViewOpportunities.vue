
<template>
  <div class="min-h-screen bg-slate-50 text-[13px] text-slate-700">
    <Loading :visible="loading" message="Loading Opportunities..." />

    <div class="mx-auto max-w-[1500px] p-4 sm:p-5">

      <!-- Header -->
      <div
        class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
          >
            Opportunity Management
          </p>

          <h1 class="mt-1 text-lg font-bold text-slate-800">
            Opportunities
          </h1>

          <p class="mt-0.5 text-[11px] text-slate-400">
            Manage scholarships, internships, jobs and other opportunities.
          </p>
        </div>

        <button
          @click="openAdd"
          class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-4 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <i class="fas fa-plus text-[10px]"></i>
          Add Opportunity
        </button>
      </div>

      <!-- Filters -->
      <div
        class="mb-4 border border-slate-200 bg-white p-3 shadow-sm"
      >
        <div class="grid grid-cols-1 gap-3 md:grid-cols-3">

          <!-- Search -->
          <div class="md:col-span-2">
            <label
              class="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Search
            </label>

            <div class="relative">
              <i
                class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400"
              ></i>

              <input
                v-model="search"
                type="text"
                placeholder="Search by title, organization or location..."
                class="h-9 w-full border border-slate-200 bg-white pl-8 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10"
              />
            </div>
          </div>

          <!-- Type -->
          <div>
            <label
              class="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-slate-500"
            >
              Type
            </label>

            <select
              v-model="typeFilter"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            >
              <option value="">All Types</option>
              <option value="Scholarship">Scholarship</option>
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
              <option value="Other">Other</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Table -->
      <div class="border border-slate-200 bg-white shadow-sm">

        <div
          class="flex items-center justify-between border-b border-slate-100 px-4 py-3"
        >
          <div>
            <h2 class="text-sm font-bold text-slate-800">
              Opportunity List
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              {{ filteredOpportunities.length }} opportunity{{ filteredOpportunities.length === 1 ? "" : "ies" }}
            </p>
          </div>

          <button
            @click="fetchOpportunities"
            class="flex h-8 w-8 items-center justify-center border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
            title="Refresh"
          >
            <i
              class="fas fa-sync-alt text-[10px]"
              :class="{ 'fa-spin': loading }"
            ></i>
          </button>
        </div>

        <!-- Desktop Table -->
        <div class="hidden overflow-x-auto md:block">
          <table class="min-w-full">
            <thead>
              <tr class="border-b border-slate-100 bg-slate-50/70">
                <th
                  class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Opportunity
                </th>

                <th
                  class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Type
                </th>

                <th
                  class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Organization
                </th>

                <th
                  class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Location
                </th>

                <th
                  class="px-4 py-3 text-left text-[9px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Deadline
                </th>

                <th
                  class="px-4 py-3 text-right text-[9px] font-bold uppercase tracking-wider text-slate-400"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="opportunity in filteredOpportunities"
                :key="opportunity.id"
                class="border-b border-slate-100 transition hover:bg-slate-50/60"
              >
                <!-- Opportunity -->
                <td class="px-4 py-3">
                  <div class="flex min-w-[240px] items-center gap-3">

                    <div
                      class="h-11 w-11 flex-shrink-0 overflow-hidden border border-slate-200 bg-slate-100"
                    >
                      <img
                        v-if="getThumbnailUrl(opportunity)"
                        :src="getThumbnailUrl(opportunity)"
                        :alt="opportunity.title"
                        class="h-full w-full object-cover"
                      />

                      <div
                        v-else
                        class="flex h-full w-full items-center justify-center text-slate-300"
                      >
                        <i class="fas fa-briefcase text-sm"></i>
                      </div>
                    </div>

                    <div class="min-w-0">
                      <p
                        class="truncate text-xs font-semibold text-slate-700"
                      >
                        {{ opportunity.title || "Untitled Opportunity" }}
                      </p>

                      <p
                        v-if="opportunity.slug"
                        class="mt-0.5 truncate font-mono text-[9px] text-slate-400"
                      >
                        {{ opportunity.slug }}
                      </p>
                    </div>

                  </div>
                </td>

                <!-- Type -->
                <td class="px-4 py-3">
                  <span
                    class="inline-flex bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary"
                  >
                    {{ opportunity.type || "Other" }}
                  </span>
                </td>

                <!-- Organization -->
                <td class="px-4 py-3">
                  <span class="text-xs text-slate-600">
                    {{ opportunity.organization || "—" }}
                  </span>
                </td>

                <!-- Location -->
                <td class="px-4 py-3">
                  <div class="flex items-center gap-1.5 text-xs text-slate-500">
                    <i class="fas fa-map-marker-alt text-[9px] text-slate-400"></i>
                    {{ opportunity.location || "—" }}
                  </div>
                </td>

                <!-- Deadline -->
                <td class="px-4 py-3">
                  <span
                    :class="deadlineClass(opportunity.deadline)"
                    class="text-xs font-medium"
                  >
                    {{ formatDate(opportunity.deadline) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-4 py-3">
                  <div class="flex justify-end gap-1.5">

                    <button
                      @click="viewOpportunity(opportunity)"
                      class="flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-primary"
                      title="View"
                    >
                      <i class="fas fa-eye text-[9px]"></i>
                    </button>

                    <button
                      @click="openEdit(opportunity)"
                      class="flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-primary"
                      title="Edit"
                    >
                      <i class="fas fa-edit text-[9px]"></i>
                    </button>

                  </div>
                </td>
              </tr>

              <!-- Empty -->
              <tr v-if="!filteredOpportunities.length">
                <td colspan="6" class="px-4 py-14 text-center">

                  <div
                    class="mx-auto flex h-11 w-11 items-center justify-center bg-slate-100 text-slate-400"
                  >
                    <i class="fas fa-briefcase text-sm"></i>
                  </div>

                  <p class="mt-3 text-xs font-semibold text-slate-500">
                    No opportunities found
                  </p>

                  <p class="mt-1 text-[10px] text-slate-400">
                    Try changing your search or add a new opportunity.
                  </p>

                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Cards -->
        <div class="divide-y divide-slate-100 md:hidden">

          <div
            v-for="opportunity in filteredOpportunities"
            :key="opportunity.id"
            class="p-4"
          >
            <div class="flex gap-3">

              <div
                class="h-12 w-12 flex-shrink-0 overflow-hidden border border-slate-200 bg-slate-100"
              >
                <img
                  v-if="getThumbnailUrl(opportunity)"
                  :src="getThumbnailUrl(opportunity)"
                  :alt="opportunity.title"
                  class="h-full w-full object-cover"
                />

                <div
                  v-else
                  class="flex h-full w-full items-center justify-center text-slate-300"
                >
                  <i class="fas fa-briefcase text-sm"></i>
                </div>
              </div>

              <div class="min-w-0 flex-1">

                <div class="flex items-start justify-between gap-2">
                  <h3 class="truncate text-xs font-semibold text-slate-700">
                    {{ opportunity.title }}
                  </h3>

                  <span
                    class="flex-shrink-0 bg-primary/10 px-2 py-1 text-[8px] font-semibold text-primary"
                  >
                    {{ opportunity.type || "Other" }}
                  </span>
                </div>

                <p class="mt-1 text-[10px] text-slate-500">
                  {{ opportunity.organization || "No organization" }}
                </p>

                <p class="mt-1 text-[10px] text-slate-400">
                  {{ opportunity.location || "No location" }}
                </p>

                <div class="mt-3 flex items-center justify-between">

                  <span
                    :class="deadlineClass(opportunity.deadline)"
                    class="text-[10px] font-medium"
                  >
                    Deadline: {{ formatDate(opportunity.deadline) }}
                  </span>

                  <div class="flex gap-1.5">

                    <button
                      @click="viewOpportunity(opportunity)"
                      class="flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-400"
                    >
                      <i class="fas fa-eye text-[9px]"></i>
                    </button>

                    <button
                      @click="openEdit(opportunity)"
                      class="flex h-7 w-7 items-center justify-center border border-slate-200 text-slate-400"
                    >
                      <i class="fas fa-edit text-[9px]"></i>
                    </button>

                  </div>

                </div>

              </div>
            </div>
          </div>

          <div
            v-if="!filteredOpportunities.length"
            class="px-4 py-14 text-center"
          >
            <i class="fas fa-briefcase text-2xl text-slate-300"></i>

            <p class="mt-3 text-xs font-semibold text-slate-500">
              No opportunities found
            </p>
          </div>

        </div>

      </div>
    </div>

    <!-- Add -->
    <AddOpportunity
      v-if="showAdd"
      @close="showAdd = false"
      @saved="handleSaved"
    />

    <!-- Edit -->
    <EditOpportunity
      v-if="showEdit"
      :data="selectedOpportunity"
      @close="showEdit = false"
      @saved="handleSaved"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import AddOpportunity from "./AddOpportunities.vue";
import EditOpportunity from "./EditOpportunities.vue";

export default {
  name: "ViewOpportunities",

  components: {
    Loading,
    AddOpportunity,
    EditOpportunity,
  },

  data() {
    return {
      opportunities: [],
      loading: false,

      search: "",
      typeFilter: "",

      showAdd: false,
      showEdit: false,

      selectedOpportunity: null,
    };
  },

  computed: {
    filteredOpportunities() {
      const search = this.search.trim().toLowerCase();

      return this.opportunities.filter((item) => {
        const matchesSearch =
          !search ||
          String(item.title || "").toLowerCase().includes(search) ||
          String(item.organization || "").toLowerCase().includes(search) ||
          String(item.location || "").toLowerCase().includes(search) ||
          String(item.slug || "").toLowerCase().includes(search);

        const matchesType =
          !this.typeFilter ||
          item.type === this.typeFilter;

        return matchesSearch && matchesType;
      });
    },
  },

  methods: {
    async fetchOpportunities() {
      this.loading = true;

      try {
        const response = await this.$apiGet("/opportunities");

        this.opportunities = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : [];
      } catch (e) {
        console.error("Error loading opportunities:", e);

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load opportunities",
          "error"
        );
      } finally {
        this.loading = false;
      }
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
        item.thumbnail.src ||
        null
      );
    },

    formatDate(value) {
      if (!value) {
        return "No deadline";
      }

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return value;
      }

      return date.toLocaleDateString();
    },

    deadlineClass(value) {
      if (!value) {
        return "text-slate-400";
      }

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return "text-slate-500";
      }

      const now = new Date();

      if (date < now) {
        return "text-red-500";
      }

      const days =
        (date.getTime() - now.getTime()) /
        (1000 * 60 * 60 * 24);

      if (days <= 7) {
        return "text-amber-500";
      }

      return "text-slate-500";
    },

    openAdd() {
      this.showAdd = true;
    },

    openEdit(item) {
      this.selectedOpportunity = item;
      this.showEdit = true;
    },

    viewOpportunity(item) {
      if (!item?.id) {
        return;
      }

      this.$router.push({
        name: "Opportunity-detail",
        params: {
          id: item.id,
        },
      });
    },

    async handleSaved() {
      this.showAdd = false;
      this.showEdit = false;
      this.selectedOpportunity = null;

      await this.fetchOpportunities();
    },

    showToast(message, type) {
      if (this.$root.$refs.toast) {
        this.$root.$refs.toast.showToast(message, type);
      }
    },
  },

  mounted() {
    this.fetchOpportunities();
  },
};
</script>