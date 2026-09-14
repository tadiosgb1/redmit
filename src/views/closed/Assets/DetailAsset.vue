
<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">

    <!-- Loading -->
    <Loading
      :visible="loading"
      message="Loading Access..."
    />

    <div class="mx-auto max-w-[1600px] p-4 sm:p-5">

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div class="flex min-w-0 items-center gap-3">

          <button
            type="button"
            @click="goBack"
            class="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            title="Go back"
          >
            <i class="fas fa-arrow-left text-[10px]"></i>
          </button>

          <div class="min-w-0">

            <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Access Details
            </p>

            <h1 class="mt-0.5 truncate text-base font-bold text-slate-800">
              {{ access?.name || "Access" }}
            </h1>

          </div>

        </div>


        <button
          v-if="access"
          type="button"
          @click="openEdit"
          class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <i class="fas fa-edit text-[10px]"></i>
          Edit Access
        </button>

      </div>


      <!-- ========================================================= -->
      <!-- Main -->
      <!-- ========================================================= -->
      <div v-if="access">

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <!-- ===================================================== -->
          <!-- Profile / Price -->
          <!-- ===================================================== -->
          <div
            class="overflow-hidden border border-slate-200 bg-white shadow-sm lg:col-span-1"
          >

            <!-- Profile -->
            <div class="aspect-square overflow-hidden bg-slate-100">

              <img
                v-if="profileImageUrl"
                :src="profileImageUrl"
                :alt="access.name"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full flex-col items-center justify-center text-slate-300"
              >
                <i class="fas fa-user-circle text-5xl"></i>

                <p class="mt-2 text-[10px] text-slate-400">
                  No profile image
                </p>
              </div>

            </div>


            <!-- Price -->
            <div class="border-t border-slate-100 px-4 py-4">

              <p class="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Price
              </p>

              <div class="mt-1 flex items-baseline gap-1.5">

                <span class="text-2xl font-bold text-slate-800">
                  {{ formatPrice(access.price) }}
                </span>

                <span class="text-xs font-bold uppercase text-primary">
                  {{ access.currency || "USD" }}
                </span>

              </div>

            </div>


            <!-- Status -->
            <div class="border-t border-slate-100 px-4 py-3">

              <div class="flex items-center justify-between">

                <span class="text-[10px] font-semibold text-slate-500">
                  Status
                </span>

                <span
                  v-if="access.isActive !== false"
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

              </div>

            </div>

          </div>


          <!-- ===================================================== -->
          <!-- Information -->
          <!-- ===================================================== -->
          <div
            class="overflow-hidden border border-slate-200 bg-white shadow-sm lg:col-span-2"
          >

            <!-- Header -->
            <div class="border-b border-slate-100 px-5 py-4">

              <div class="flex flex-wrap items-center gap-2">

                <span
                  v-if="access.platform"
                  class="inline-flex items-center gap-1.5 bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600"
                >
                  <i
                    :class="getPlatformIcon(access.platform)"
                    class="text-[9px]"
                  ></i>

                  {{ access.platform }}
                </span>


                <span
                  v-if="categoryName"
                  class="bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary"
                >
                  {{ categoryName }}
                </span>


                <span
                  v-if="access.type"
                  class="bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-500"
                >
                  {{ access.type }}
                </span>

              </div>


              <h2 class="mt-3 text-lg font-bold text-slate-800">
                {{ access.name }}
              </h2>


              <p
                v-if="access.shortDescription"
                class="mt-1.5 max-w-3xl text-xs leading-5 text-slate-500"
              >
                {{ access.shortDescription }}
              </p>

            </div>


            <!-- Description -->
            <div class="px-5 py-4">

              <p class="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Description
              </p>

              <p class="whitespace-pre-line text-xs leading-6 text-slate-600">
                {{ access.description || "No description available." }}
              </p>

            </div>


            <!-- Account -->
            <div class="border-t border-slate-100 px-5 py-4">

              <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Username
                  </p>

                  <p class="mt-0.5 truncate text-xs font-semibold text-slate-700">
                    {{ access.username ? `@${access.username.replace(/^@/, "")}` : "-" }}
                  </p>

                </div>


                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Country
                  </p>

                  <p class="mt-0.5 text-xs font-semibold text-slate-700">
                    {{ access.country || "-" }}
                  </p>

                </div>

              </div>

            </div>


            <!-- Statistics -->
            <div class="border-t border-slate-100 px-5 py-4">

              <p class="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Audience & Performance
              </p>

              <div class="grid grid-cols-2 gap-2.5 sm:grid-cols-4">

                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Followers
                  </p>

                  <p class="mt-0.5 text-xs font-bold text-slate-700">
                    {{ formatNumber(access.followers) }}
                  </p>

                </div>


                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Posts
                  </p>

                  <p class="mt-0.5 text-xs font-bold text-slate-700">
                    {{ formatNumber(access.posts) }}
                  </p>

                </div>


                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Views
                  </p>

                  <p class="mt-0.5 text-xs font-bold text-slate-700">
                    {{ formatNumber(access.views) }}
                  </p>

                </div>


                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Engagement
                  </p>

                  <p class="mt-0.5 text-xs font-bold text-slate-700">
                    {{ access.engagementRate ?? "-" }}{{ access.engagementRate !== null && access.engagementRate !== undefined ? "%" : "" }}
                  </p>

                </div>

              </div>

            </div>


            <!-- Revenue -->
            <div class="border-t border-slate-100 px-5 py-4">

              <p class="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Revenue
              </p>

              <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-3">

                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Monthly Revenue
                  </p>

                  <p class="mt-0.5 text-xs font-bold text-slate-700">
                    {{ formatPrice(access.monthlyRevenue) }}
                    {{ access.revenueCurrency || "USD" }}
                  </p>

                </div>


                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Niche
                  </p>

                  <p class="mt-0.5 truncate text-xs font-semibold text-slate-700">
                    {{ access.niche || "-" }}
                  </p>

                </div>


                <div class="bg-slate-50 px-3 py-2.5">

                  <p class="text-[9px] uppercase tracking-wide text-slate-400">
                    Currency
                  </p>

                  <p class="mt-0.5 text-xs font-semibold text-slate-700">
                    {{ access.revenueCurrency || access.currency || "USD" }}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        <!-- ========================================================= -->
        <!-- URLs -->
        <!-- ========================================================= -->
        <div class="mt-4 border border-slate-200 bg-white shadow-sm">

          <div class="border-b border-slate-100 px-5 py-3">

            <h2 class="text-sm font-bold text-slate-800">
              Profile Information
            </h2>

          </div>

          <div class="grid grid-cols-1 gap-3 p-4 md:grid-cols-2">

            <div
              v-if="access.url"
              class="bg-slate-50 px-3 py-3"
            >

              <p class="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                Profile URL
              </p>

              <a
                :href="access.url"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-1 block truncate text-xs font-medium text-primary hover:underline"
              >
                {{ access.url }}
              </a>

            </div>


            <div
              v-if="access.slug"
              class="bg-slate-50 px-3 py-3"
            >

              <p class="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                Slug
              </p>

              <p class="mt-1 truncate font-mono text-xs text-slate-600">
                {{ access.slug }}
              </p>

            </div>

          </div>

        </div>


        <!-- ========================================================= -->
        <!-- Thumbnail -->
        <!-- ========================================================= -->
        <div class="mt-4 border border-slate-200 bg-white shadow-sm">

          <div class="border-b border-slate-100 px-5 py-3">

            <h2 class="text-sm font-bold text-slate-800">
              Thumbnail
            </h2>

          </div>

          <div class="p-4">

            <div
              v-if="thumbnailUrl"
              class="max-w-sm overflow-hidden border border-slate-200 bg-slate-100"
            >

              <img
                :src="thumbnailUrl"
                :alt="access.name"
                class="max-h-[320px] w-full object-contain"
              />

            </div>

            <div
              v-else
              class="flex min-h-40 items-center justify-center border border-dashed border-slate-200 bg-slate-50"
            >

              <div class="text-center">

                <i class="fas fa-image text-2xl text-slate-300"></i>

                <p class="mt-2 text-[10px] text-slate-400">
                  No thumbnail available
                </p>

              </div>

            </div>

          </div>

        </div>


        <!-- ========================================================= -->
        <!-- Files -->
        <!-- ========================================================= -->
        <div class="mt-4 overflow-hidden border border-slate-200 bg-white shadow-sm">

          <div
            class="flex flex-col gap-2 border-b border-slate-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
          >

            <div>

              <h2 class="text-sm font-bold text-slate-800">
                Media Files
              </h2>

              <p class="mt-0.5 text-[10px] text-slate-400">
                Images and videos associated with this access
              </p>

            </div>

            <span class="self-start bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary sm:self-auto">
              {{ files.length }}
              file{{ files.length === 1 ? "" : "s" }}
            </span>

          </div>


          <div
            v-if="files.length"
            class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >

            <div
              v-for="(file, index) in files"
              :key="getFileKey(file, index)"
              class="overflow-hidden border border-slate-200 bg-slate-50"
            >

              <div class="aspect-video bg-slate-900">

                <img
                  v-if="!isVideo(file) && getFileUrl(file)"
                  :src="getFileUrl(file)"
                  :alt="getFileName(file)"
                  class="h-full w-full object-contain"
                />

                <video
                  v-else-if="isVideo(file) && getFileUrl(file)"
                  :src="getFileUrl(file)"
                  controls
                  preload="metadata"
                  class="h-full w-full object-contain"
                ></video>

                <div
                  v-else
                  class="flex h-full items-center justify-center text-slate-500"
                >
                  <i
                    :class="
                      isVideo(file)
                        ? 'fas fa-video'
                        : 'fas fa-image'
                    "
                    class="text-xl"
                  ></i>
                </div>

              </div>


              <div class="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2.5">

                <div
                  class="flex h-7 w-7 flex-shrink-0 items-center justify-center bg-primary/10 text-primary"
                >

                  <i
                    :class="
                      isVideo(file)
                        ? 'fas fa-video'
                        : 'fas fa-image'
                    "
                    class="text-[10px]"
                  ></i>

                </div>

                <div class="min-w-0 flex-1">

                  <p class="truncate text-[10px] font-semibold text-slate-700">
                    {{ getFileName(file) }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-slate-400">
                    {{ isVideo(file) ? "Video" : "Image" }}
                  </p>

                </div>

              </div>

            </div>

          </div>


          <div
            v-else
            class="px-5 py-12 text-center"
          >

            <div
              class="mx-auto flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-400"
            >
              <i class="fas fa-photo-video text-sm"></i>
            </div>

            <p class="mt-2 text-xs font-medium text-slate-500">
              No media files
            </p>

            <p class="mt-0.5 text-[10px] text-slate-400">
              This access does not have any additional media files.
            </p>

          </div>

        </div>


        <!-- ========================================================= -->
        <!-- Details -->
        <!-- ========================================================= -->
        <div
          v-if="hasDetails"
          class="mt-4 overflow-hidden border border-slate-200 bg-white shadow-sm"
        >

          <div class="border-b border-slate-100 px-5 py-3">

            <h2 class="text-sm font-bold text-slate-800">
              Details
            </h2>

          </div>

          <div class="p-4">

            <pre
              class="overflow-x-auto bg-slate-50 p-4 font-mono text-[11px] leading-5 text-slate-600"
            >{{ formattedDetails }}</pre>

          </div>

        </div>


        <!-- ========================================================= -->
        <!-- Dates -->
        <!-- ========================================================= -->
        <div
          v-if="access.createdAt || access.updatedAt"
          class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >

          <div
            v-if="access.createdAt"
            class="border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >

            <p class="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Created
            </p>

            <p class="mt-1 text-xs font-medium text-slate-600">
              {{ formatDate(access.createdAt) }}
            </p>

          </div>


          <div
            v-if="access.updatedAt"
            class="border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >

            <p class="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Last Updated
            </p>

            <p class="mt-1 text-xs font-medium text-slate-600">
              {{ formatDate(access.updatedAt) }}
            </p>

          </div>

        </div>

      </div>


      <!-- ========================================================= -->
      <!-- Not Found -->
      <!-- ========================================================= -->
      <div
        v-else-if="!loading"
        class="border border-slate-200 bg-white px-5 py-14 text-center shadow-sm"
      >

        <div
          class="mx-auto flex h-11 w-11 items-center justify-center bg-slate-100 text-slate-400"
        >
          <i class="fas fa-bullhorn text-base"></i>
        </div>

        <p class="mt-3 text-xs font-semibold text-slate-600">
          Access not found
        </p>

        <p class="mt-1 text-[10px] text-slate-400">
          The requested access record could not be loaded.
        </p>

        <button
          type="button"
          @click="goBack"
          class="mt-4 inline-flex h-8 items-center gap-2 bg-primary px-3 text-[10px] font-semibold text-white transition hover:opacity-90"
        >
          <i class="fas fa-arrow-left text-[9px]"></i>
          Go Back
        </button>

      </div>

    </div>


    <!-- Edit -->
    <EditAsset
      v-if="showEdit && access"
      :data="access"
      :categories="categories"
      @close="showEdit = false"
      @saved="handleUpdated"
    />

  </div>
</template>


<script>
import Loading from "@/components/Loading.vue";
import EditAsset from "./EditAsset.vue";

export default {
  name: "AccessDetails",

  components: {
    Loading,
    EditAsset,
  },

  data() {
    return {
      access: null,
      categories: [],

      loading: false,
      showEdit: false,
    };
  },

  computed: {
    profileImageUrl() {
      if (!this.access) {
        return null;
      }

      return this.getMediaUrl(
        this.access.profileUrl ||
          this.access.profileImage ||
          this.access.profile
      );
    },


    thumbnailUrl() {
      return this.getMediaUrl(
        this.access?.thumbnail
      );
    },


    files() {
      return Array.isArray(
        this.access?.files
      )
        ? this.access.files
        : [];
    },


    categoryName() {
      return (
        this.access?.category?.name ||
        this.access?.categoryName ||
        this.categories.find(
          (category) =>
            category.id ===
            this.access?.categoryId
        )?.name ||
        null
      );
    },


    hasDetails() {
      return (
        this.access?.details !== null &&
        this.access?.details !== undefined &&
        this.access?.details !== ""
      );
    },


    formattedDetails() {
      if (!this.hasDetails) {
        return "";
      }

      const details =
        this.access.details;

      if (
        typeof details ===
        "string"
      ) {
        try {
          return JSON.stringify(
            JSON.parse(details),
            null,
            2
          );
        } catch (e) {
          return details;
        }
      }

      try {
        return JSON.stringify(
          details,
          null,
          2
        );
      } catch (e) {
        return String(details);
      }
    },
  },

  methods: {
    async fetchAccess() {
      const id =
        this.$route.params.id;

      if (!id) {
        this.showToast(
          "Access ID is missing",
          "error"
        );

        this.goBack();

        return;
      }

      this.loading = true;

      try {
        const response =
          await this.$apiGetById(
            "/assets",
            id
          );

        /*
         * Supports both:
         *
         * {
         *   status: 1,
         *   data: {...}
         * }
         *
         * and:
         *
         * {
         *   id: "...",
         *   name: "..."
         * }
         */
        this.access =
          response?.data?.data ||
          response?.data ||
          response ||
          null;

      } catch (e) {
        console.error(
          "Error loading access:",
          e
        );

        this.access = null;

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load access",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },


    async fetchCategories() {
      try {
        const response =
          await this.$apiGet(
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
      }
    },


    getMediaUrl(media) {
      if (!media) {
        return null;
      }

      if (typeof media === "string") {
        return media;
      }

      return (
        media.url ||
        media.path ||
        media.src ||
        media.location ||
        media.fileUrl ||
        null
      );
    },


    getFileUrl(file) {
      return this.getMediaUrl(file);
    },


    getFileName(file) {
      if (!file) {
        return "Access file";
      }

      if (typeof file === "string") {
        return (
          file
            .split("?")[0]
            .split("/")
            .pop() ||
          "Access file"
        );
      }

      return (
        file.name ||
        file.filename ||
        file.originalName ||
        file.originalname ||
        "Access file"
      );
    },


    getFileKey(file, index) {
      return (
        file?.id ||
        file?.url ||
        file?.path ||
        `${index}-${this.getFileName(file)}`
      );
    },


    isVideo(file) {
      if (!file) {
        return false;
      }

      const type =
        String(
          file.type ||
            file.mimeType ||
            file.mimetype ||
            ""
        ).toLowerCase();

      if (type.startsWith("video/")) {
        return true;
      }

      return /\.(mp4|webm|ogg|mov|avi|mkv|m4v)(\?.*)?$/i.test(
        this.getFileUrl(file) || ""
      );
    },


    getPlatformIcon(platform) {
      const value =
        String(
          platform || ""
        ).toLowerCase();

      if (
        value.includes("instagram")
      ) {
        return "fab fa-instagram";
      }

      if (
        value.includes("facebook")
      ) {
        return "fab fa-facebook";
      }

      if (
        value.includes("youtube")
      ) {
        return "fab fa-youtube";
      }

      if (
        value.includes("tiktok")
      ) {
        return "fab fa-tiktok";
      }

      if (
        value.includes("twitter") ||
        value === "x"
      ) {
        return "fab fa-x-twitter";
      }

      if (
        value.includes("linkedin")
      ) {
        return "fab fa-linkedin";
      }

      return "fas fa-globe";
    },


    formatNumber(value) {
      const number =
        Number(value);

      if (Number.isNaN(number)) {
        return "0";
      }

      return number.toLocaleString();
    },


    formatPrice(value) {
      const number =
        Number(value);

      if (Number.isNaN(number)) {
        return "0.00";
      }

      return number.toFixed(2);
    },


    formatDate(value) {
      if (!value) {
        return "-";
      }

      const date =
        new Date(value);

      if (
        Number.isNaN(
          date.getTime()
        )
      ) {
        return "-";
      }

      return date.toLocaleString();
    },


    openEdit() {
      if (!this.access) {
        return;
      }

      this.showEdit = true;
    },


    async handleUpdated() {
      this.showEdit = false;

      await this.fetchAccess();
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


  async mounted() {
    await Promise.all([
      this.fetchCategories(),
      this.fetchAccess(),
    ]);
  },


  watch: {
    "$route.params.id"() {
      this.fetchAccess();
    },
  },
};
</script>

