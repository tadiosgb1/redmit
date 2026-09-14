<template>
  <div class="min-h-screen bg-slate-50 text-[13px] text-slate-700">

    <Loading
      :visible="loading"
      message="Loading Opportunity..."
    />

    <div class="mx-auto max-w-[1400px] p-4 sm:p-5">

      <!-- Header -->
      <div
        class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div class="flex items-center gap-3">

          <button
            @click="goBack"
            class="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            title="Go back"
          >
            <i class="fas fa-arrow-left text-[10px]"></i>
          </button>

          <div>
            <p
              class="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
            >
              Opportunity Details
            </p>

            <h1 class="mt-0.5 text-base font-bold text-slate-800">
              {{ opportunity?.title || "Opportunity" }}
            </h1>
          </div>

        </div>

        <button
          v-if="opportunity"
          @click="openEdit"
          class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <i class="fas fa-edit text-[10px]"></i>
          Edit Opportunity
        </button>

      </div>

      <div v-if="opportunity">

        <!-- Main -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <!-- Thumbnail -->
          <div
            class="border border-slate-200 bg-white shadow-sm lg:col-span-1"
          >

            <div
              class="aspect-[4/3] overflow-hidden bg-slate-100"
            >

              <img
                v-if="thumbnailUrl"
                :src="thumbnailUrl"
                :alt="opportunity.title"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full items-center justify-center text-slate-300"
              >
                <i class="fas fa-briefcase text-5xl"></i>
              </div>

            </div>

            <!-- Deadline -->
            <div class="border-t border-slate-100 px-4 py-4">

              <p
                class="text-[9px] font-bold uppercase tracking-wider text-slate-400"
              >
                Application Deadline
              </p>

              <p
                :class="deadlineClass(opportunity.deadline)"
                class="mt-1 text-sm font-bold"
              >
                {{ formatDate(opportunity.deadline) }}
              </p>

            </div>

          </div>

          <!-- Information -->
          <div
            class="border border-slate-200 bg-white shadow-sm lg:col-span-2"
          >

            <!-- Intro -->
            <div class="border-b border-slate-100 px-5 py-4">

              <div class="flex flex-wrap items-center gap-2">

                <span
                  class="bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary"
                >
                  {{ opportunity.type || "Other" }}
                </span>

                <span
                  v-if="opportunity.slug"
                  class="bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500"
                >
                  {{ opportunity.slug }}
                </span>

              </div>

              <h2 class="mt-3 text-lg font-bold text-slate-800">
                {{ opportunity.title }}
              </h2>

              <p
                v-if="opportunity.organization"
                class="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500"
              >
                <i class="fas fa-building text-[9px] text-slate-400"></i>
                {{ opportunity.organization }}
              </p>

              <p
                v-if="opportunity.location"
                class="mt-1 flex items-center gap-1.5 text-xs text-slate-500"
              >
                <i class="fas fa-map-marker-alt text-[9px] text-slate-400"></i>
                {{ opportunity.location }}
              </p>

            </div>

            <!-- Description -->
            <div class="px-5 py-4">

              <p
                class="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400"
              >
                Description
              </p>

              <p
                class="whitespace-pre-line text-xs leading-6 text-slate-600"
              >
                {{
                  opportunity.description ||
                  "No description available."
                }}
              </p>

            </div>

            <!-- Metadata -->
            <div class="border-t border-slate-100 px-5 py-4">

              <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div class="bg-slate-50 px-3 py-2.5">
                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Type
                  </p>

                  <p class="mt-0.5 text-xs font-semibold text-slate-700">
                    {{ opportunity.type || "Other" }}
                  </p>
                </div>

                <div class="bg-slate-50 px-3 py-2.5">
                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Organization
                  </p>

                  <p class="mt-0.5 truncate text-xs font-semibold text-slate-700">
                    {{ opportunity.organization || "—" }}
                  </p>
                </div>

                <div class="bg-slate-50 px-3 py-2.5">
                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Deadline
                  </p>

                  <p
                    :class="deadlineClass(opportunity.deadline)"
                    class="mt-0.5 text-xs font-semibold"
                  >
                    {{ formatDate(opportunity.deadline) }}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- Details -->
        <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">

          <!-- Eligibility -->
          <div
            class="border border-slate-200 bg-white shadow-sm"
          >
            <div
              class="border-b border-slate-100 px-4 py-3"
            >
              <div class="flex items-center gap-2">

                <div
                  class="flex h-7 w-7 items-center justify-center bg-primary/10 text-primary"
                >
                  <i class="fas fa-user-check text-[10px]"></i>
                </div>

                <h2 class="text-xs font-bold text-slate-800">
                  Eligibility
                </h2>

              </div>
            </div>

            <div class="px-4 py-4">
              <p
                class="whitespace-pre-line text-xs leading-6 text-slate-600"
              >
                {{
                  opportunity.eligibility ||
                  "No eligibility information available."
                }}
              </p>
            </div>
          </div>

          <!-- Requirements -->
          <div
            class="border border-slate-200 bg-white shadow-sm"
          >
            <div
              class="border-b border-slate-100 px-4 py-3"
            >
              <div class="flex items-center gap-2">

                <div
                  class="flex h-7 w-7 items-center justify-center bg-primary/10 text-primary"
                >
                  <i class="fas fa-list-check text-[10px]"></i>
                </div>

                <h2 class="text-xs font-bold text-slate-800">
                  Requirements
                </h2>

              </div>
            </div>

            <div class="px-4 py-4">
              <p
                class="whitespace-pre-line text-xs leading-6 text-slate-600"
              >
                {{
                  opportunity.requirements ||
                  "No requirements available."
                }}
              </p>
            </div>
          </div>

          <!-- Benefits -->
          <div
            class="border border-slate-200 bg-white shadow-sm"
          >
            <div
              class="border-b border-slate-100 px-4 py-3"
            >
              <div class="flex items-center gap-2">

                <div
                  class="flex h-7 w-7 items-center justify-center bg-primary/10 text-primary"
                >
                  <i class="fas fa-gift text-[10px]"></i>
                </div>

                <h2 class="text-xs font-bold text-slate-800">
                  Benefits
                </h2>

              </div>
            </div>

            <div class="px-4 py-4">
              <p
                class="whitespace-pre-line text-xs leading-6 text-slate-600"
              >
                {{
                  opportunity.benefits ||
                  "No benefits information available."
                }}
              </p>
            </div>
          </div>

        </div>

        <!-- Links -->
        <div
          class="mt-4 border border-slate-200 bg-white shadow-sm"
        >

          <div
            class="border-b border-slate-100 px-5 py-3"
          >
            <h2 class="text-sm font-bold text-slate-800">
              Opportunity Links
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              External resources and application links
            </p>
          </div>

          <div
            class="grid grid-cols-1 gap-3 p-4 md:grid-cols-2"
          >

            <!-- Source -->
            <a
              v-if="opportunity.sourceUrl"
              :href="opportunity.sourceUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 border border-slate-200 p-3 transition hover:bg-slate-50"
            >

              <div
                class="flex h-8 w-8 items-center justify-center bg-slate-100 text-slate-500"
              >
                <i class="fas fa-external-link-alt text-[10px]"></i>
              </div>

              <div class="min-w-0">
                <p class="text-[10px] font-bold text-slate-700">
                  Source
                </p>

                <p class="mt-0.5 truncate text-[9px] text-slate-400">
                  {{ opportunity.sourceUrl }}
                </p>
              </div>

            </a>

            <!-- Application -->
            <a
              v-if="opportunity.applicationUrl"
              :href="opportunity.applicationUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 border border-primary/20 bg-primary/5 p-3 transition hover:bg-primary/10"
            >

              <div
                class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary"
              >
                <i class="fas fa-paper-plane text-[10px]"></i>
              </div>

              <div class="min-w-0">
                <p class="text-[10px] font-bold text-primary">
                  Apply Now
                </p>

                <p class="mt-0.5 truncate text-[9px] text-slate-400">
                  {{ opportunity.applicationUrl }}
                </p>
              </div>

            </a>

            <!-- No Links -->
            <div
              v-if="
                !opportunity.sourceUrl &&
                !opportunity.applicationUrl
              "
              class="px-2 py-5 text-center md:col-span-2"
            >
              <i class="fas fa-link text-xl text-slate-300"></i>

              <p class="mt-2 text-xs text-slate-500">
                No external links available.
              </p>
            </div>

          </div>
        </div>

        <!-- Record Information -->
        <div
          class="mt-4 border border-slate-200 bg-white shadow-sm"
        >

          <div class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">

            <div class="bg-slate-50 px-3 py-2.5">
              <p class="text-[9px] uppercase tracking-wide text-slate-400">
                Opportunity ID
              </p>

              <p
                class="mt-0.5 break-all font-mono text-[10px] text-slate-500"
              >
                {{ opportunity.id || "—" }}
              </p>
            </div>

            <div class="bg-slate-50 px-3 py-2.5">
              <p class="text-[9px] uppercase tracking-wide text-slate-400">
                Slug
              </p>

              <p class="mt-0.5 break-all font-mono text-[10px] text-slate-500">
                {{ opportunity.slug || "—" }}
              </p>
            </div>

          </div>

        </div>

      </div>

      <!-- Edit -->
      <EditOpportunity
        v-if="showEdit"
        :data="opportunity"
        @close="showEdit = false"
        @saved="handleUpdated"
      />

    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import EditOpportunity from "./EditOpportunities.vue";

export default {
  name: "DetailOpportunity",

  components: {
    Loading,
    EditOpportunity,
  },

  data() {
    return {
      opportunity: null,
      loading: false,
      showEdit: false,
    };
  },

  computed: {
    thumbnailUrl() {
      if (!this.opportunity?.thumbnail) {
        return null;
      }

      if (
        typeof this.opportunity.thumbnail ===
        "string"
      ) {
        return this.opportunity.thumbnail;
      }

      return (
        this.opportunity.thumbnail.url ||
        this.opportunity.thumbnail.path ||
        this.opportunity.thumbnail.src ||
        null
      );
    },
  },

  methods: {
    async fetchOpportunity() {
      const id = this.$route.params.id;

      if (!id) {
        this.showToast(
          "Opportunity ID is missing",
          "error"
        );

        this.goBack();

        return;
      }

      this.loading = true;

      try {
        const response =
          await this.$apiGetById(
            "/opportunities",
            id
          );

        this.opportunity =
          response?.data ||
          response ||
          null;
      } catch (e) {
        console.error(
          "Error loading opportunity:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load opportunity",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    formatDate(value) {
      if (!value) {
        return "No deadline";
      }

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return value;
      }

      return date.toLocaleString();
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

      return "text-slate-600";
    },

    openEdit() {
      this.showEdit = true;
    },

    async handleUpdated() {
      this.showEdit = false;
      await this.fetchOpportunity();
    },

    goBack() {
      this.$router.back();
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
    this.fetchOpportunity();
  },

  watch: {
    "$route.params.id"() {
      this.fetchOpportunity();
    },
  },
};
</script>