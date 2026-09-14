```vue
<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4"
  >

    <!-- Modal -->
    <div
      class="Asset-modal-enter w-full max-h-[94vh] overflow-hidden border border-slate-200 bg-white shadow-2xl sm:max-w-5xl"
    >

      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-slate-200 px-5 py-3.5"
      >

        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
          >
            <i class="fas fa-edit text-sm"></i>
          </div>

          <div>

            <h2 class="text-sm font-bold text-slate-800">
              Edit Asset
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              Update Asset information
            </p>

          </div>

        </div>


        <button
          type="button"
          @click="close"
          :disabled="saving"
          class="flex h-7 w-7 items-center justify-center text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:opacity-40"
        >
          <i class="fas fa-times text-xs"></i>
        </button>

      </div>


      <!-- Form -->
      <form
        @submit.prevent="save"
        class="max-h-[calc(94vh-65px)] overflow-y-auto px-5 py-4"
      >

        <!-- ======================================================= -->
        <!-- Basic -->
        <!-- ======================================================= -->
        <div class="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">

          <!-- Name -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Name
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Enter Asset name"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
              :class="{ 'border-red-300': errors.name }"
            />

            <p
              v-if="errors.name"
              class="mt-1 text-[10px] text-red-500"
            >
              {{ errors.name }}
            </p>

          </div>


          <!-- Slug -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Slug
            </label>

            <input
              v-model="form.slug"
              type="text"
              placeholder="Asset-slug"
              class="h-9 w-full border border-slate-200 bg-white px-3 font-mono text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <!-- Type -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Type
            </label>

            <input
              v-model="form.type"
              type="text"
              placeholder="Asset type"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <!-- Platform -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Platform
            </label>

            <select
              v-model="form.platform"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            >

              <option value="">
                Select platform
              </option>

              <option value="Instagram">
                Instagram
              </option>

              <option value="Facebook">
                Facebook
              </option>

              <option value="YouTube">
                YouTube
              </option>

              <option value="TikTok">
                TikTok
              </option>

              <option value="X">
                X / Twitter
              </option>

              <option value="LinkedIn">
                LinkedIn
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          <!-- Category -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Category
            </label>

            <select
              v-model="form.categoryId"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            >

              <option value="">
                Select category
              </option>

              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>

            </select>

          </div>


          <!-- Country -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Country
            </label>

            <input
              v-model="form.country"
              type="text"
              placeholder="Country"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>

        </div>


        <!-- Short Description -->
        <div class="mt-3">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Short Description
          </label>

          <input
            v-model="form.shortDescription"
            type="text"
            placeholder="Short description"
            class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
          />

        </div>


        <!-- Description -->
        <div class="mt-3">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Description
          </label>

          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Detailed description"
            class="w-full resize-none border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
          ></textarea>

        </div>


        <!-- Account -->
        <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">

          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Username
            </label>

            <input
              v-model="form.username"
              type="text"
              placeholder="@username"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Profile URL
            </label>

            <input
              v-model="form.url"
              type="url"
              placeholder="https://example.com/profile"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>

        </div>


        <!-- Statistics -->
        <div
          class="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4"
        >

          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Followers
            </label>

            <input
              v-model.number="form.followers"
              type="number"
              min="0"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Posts
            </label>

            <input
              v-model.number="form.posts"
              type="number"
              min="0"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Views
            </label>

            <input
              v-model.number="form.views"
              type="number"
              min="0"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Engagement Rate
            </label>

            <div class="relative">

              <input
                v-model.number="form.engagementRate"
                type="number"
                min="0"
                step="0.01"
                class="h-9 w-full border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
              />

              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                %
              </span>

            </div>

          </div>

        </div>


        <!-- Financial -->
        <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-3">

          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Price
            </label>

            <input
              v-model="form.price"
              type="number"
              min="0"
              step="0.01"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Currency
            </label>

            <input
              v-model="form.currency"
              type="text"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs uppercase text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Monthly Revenue
            </label>

            <input
              v-model="form.monthlyRevenue"
              type="number"
              min="0"
              step="0.01"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>

        </div>


        <div class="mt-3 md:w-1/3">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Revenue Currency
          </label>

          <input
            v-model="form.revenueCurrency"
            type="text"
            class="h-9 w-full border border-slate-200 bg-white px-3 text-xs uppercase text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
          />

        </div>


        <!-- ======================================================= -->
        <!-- Existing / New Images -->
        <!-- ======================================================= -->
        <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

          <!-- Profile -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Profile Image
            </label>

            <div class="border border-dashed border-slate-300 bg-slate-50 p-3">

              <div
                v-if="profilePreview"
                class="mb-3 flex items-center gap-3"
              >

                <div class="h-16 w-16 overflow-hidden border border-slate-200 bg-white">
                  <img
                    :src="profilePreview"
                    alt="Profile image"
                    class="h-full w-full object-cover"
                  />
                </div>

                <div class="min-w-0 flex-1">

                  <p class="truncate text-[10px] font-semibold text-slate-700">
                    {{ profileFile?.name || "Current profile image" }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-slate-400">
                    {{ profileFile ? "New image selected" : "Current image" }}
                  </p>

                </div>

                <button
                  v-if="profileFile"
                  type="button"
                  @click="removeProfile"
                  class="flex h-7 w-7 items-center justify-center text-red-500 hover:bg-red-50"
                >
                  <i class="fas fa-trash text-[10px]"></i>
                </button>

              </div>


              <label class="flex cursor-pointer flex-col items-center justify-center px-4 py-4 text-center hover:bg-white">

                <div class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary">
                  <i class="fas fa-user text-xs"></i>
                </div>

                <p class="mt-1.5 text-[10px] font-semibold text-slate-600">
                  Replace profile image
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  PNG, JPG, JPEG or WEBP
                </p>

                <input
                  ref="profileInput"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  class="hidden"
                  @change="handleProfile"
                />

              </label>

            </div>

          </div>


          <!-- Thumbnail -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Thumbnail
            </label>

            <div class="border border-dashed border-slate-300 bg-slate-50 p-3">

              <div
                v-if="thumbnailPreview"
                class="mb-3 flex items-center gap-3"
              >

                <div class="h-16 w-16 overflow-hidden border border-slate-200 bg-white">

                  <img
                    :src="thumbnailPreview"
                    alt="Thumbnail"
                    class="h-full w-full object-cover"
                  />

                </div>

                <div class="min-w-0 flex-1">

                  <p class="truncate text-[10px] font-semibold text-slate-700">
                    {{ thumbnailFile?.name || "Current thumbnail" }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-slate-400">
                    {{ thumbnailFile ? "New thumbnail selected" : "Current thumbnail" }}
                  </p>

                </div>

                <button
                  v-if="thumbnailFile"
                  type="button"
                  @click="removeThumbnail"
                  class="flex h-7 w-7 items-center justify-center text-red-500 hover:bg-red-50"
                >
                  <i class="fas fa-trash text-[10px]"></i>
                </button>

              </div>


              <label class="flex cursor-pointer flex-col items-center justify-center px-4 py-4 text-center hover:bg-white">

                <div class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary">
                  <i class="fas fa-image text-xs"></i>
                </div>

                <p class="mt-1.5 text-[10px] font-semibold text-slate-600">
                  Replace thumbnail
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  PNG, JPG, JPEG or WEBP
                </p>

                <input
                  ref="thumbnailInput"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  class="hidden"
                  @change="handleThumbnail"
                />

              </label>

            </div>

          </div>

        </div>


        <!-- ======================================================= -->
        <!-- Files -->
        <!-- ======================================================= -->
        <div class="mt-4">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Files
          </label>

          <div class="border border-dashed border-slate-300 bg-slate-50 p-3">

            <div
              v-if="existingFiles.length || filePreviews.length"
              class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            >

              <!-- Existing -->
              <div
                v-for="(file, index) in existingFiles"
                :key="getFileKey(file, index)"
                class="overflow-hidden border border-slate-200 bg-white"
              >

                <div class="aspect-video bg-slate-900">

                  <img
                    v-if="!isVideo(file)"
                    :src="getFileUrl(file)"
                    :alt="getFileName(file)"
                    class="h-full w-full object-contain"
                  />

                  <video
                    v-else
                    :src="getFileUrl(file)"
                    muted
                    preload="metadata"
                    class="h-full w-full object-contain"
                  ></video>

                </div>

                <div class="flex items-center gap-1 border-t border-slate-100 px-2 py-1.5">

                  <p class="min-w-0 flex-1 truncate text-[9px] text-slate-500">
                    {{ getFileName(file) }}
                  </p>

                  <button
                    type="button"
                    @click="removeExistingFile(index)"
                    class="flex h-5 w-5 flex-shrink-0 items-center justify-center text-red-500 hover:bg-red-50"
                    title="Remove file"
                  >
                    <i class="fas fa-times text-[8px]"></i>
                  </button>

                </div>

              </div>


              <!-- New -->
              <div
                v-for="(file, index) in filePreviews"
                :key="file.key"
                class="relative overflow-hidden border border-primary/30 bg-white"
              >

                <div class="aspect-video bg-slate-900">

                  <img
                    v-if="!file.isVideo"
                    :src="file.url"
                    :alt="file.name"
                    class="h-full w-full object-contain"
                  />

                  <video
                    v-else
                    :src="file.url"
                    muted
                    class="h-full w-full object-contain"
                  ></video>

                </div>

                <button
                  type="button"
                  @click="removeNewFile(index)"
                  class="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-red-500 text-white"
                >
                  <i class="fas fa-times text-[9px]"></i>
                </button>

                <p class="truncate px-2 py-1.5 text-[9px] text-slate-500">
                  {{ file.name }}
                </p>

              </div>

            </div>


            <label class="flex cursor-pointer flex-col items-center justify-center px-4 py-5 text-center hover:bg-white">

              <div class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary">
                <i class="fas fa-photo-video text-xs"></i>
              </div>

              <p class="mt-1.5 text-[10px] font-semibold text-slate-600">
                Add images or videos
              </p>

              <p class="mt-0.5 text-[9px] text-slate-400">
                Existing files remain unless removed
              </p>

              <input
                ref="filesInput"
                type="file"
                multiple
                accept="image/*,video/*"
                class="hidden"
                @change="handleFiles"
              />

            </label>

          </div>

        </div>


        <!-- Details -->
        <div class="mt-4">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Details
            <span class="text-slate-400">(JSON object or array)</span>
          </label>

          <textarea
            v-model="detailsText"
            rows="4"
            placeholder='{"audience":"developers"}'
            class="w-full resize-none border border-slate-200 bg-white px-3 py-2.5 font-mono text-[11px] leading-5 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            :class="{ 'border-red-300': errors.details }"
          ></textarea>

          <p
            v-if="errors.details"
            class="mt-1 text-[10px] text-red-500"
          >
            {{ errors.details }}
          </p>

        </div>


        <!-- Active -->
        <div
          class="mt-4 flex items-center justify-between border border-slate-200 bg-slate-50 px-3 py-2.5"
        >

          <div>

            <p class="text-[11px] font-semibold text-slate-700">
              Active Asset
            </p>

            <p class="mt-0.5 text-[9px] text-slate-400">
              Control whether this Asset is active
            </p>

          </div>


          <button
            type="button"
            @click="form.isActive = !form.isActive"
            class="relative h-6 w-11 rounded-full transition"
            :class="
              form.isActive
                ? 'bg-primary'
                : 'bg-slate-300'
            "
          >

            <span
              class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all"
              :class="
                form.isActive
                  ? 'left-6'
                  : 'left-1'
              "
            ></span>

          </button>

        </div>


        <!-- Footer -->
        <div
          class="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3"
        >

          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="h-8 border border-slate-200 px-3 text-[10px] font-semibold text-slate-500 hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>


          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-8 items-center gap-2 bg-primary px-3.5 text-[10px] font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
          >

            <i
              v-if="saving"
              class="fas fa-spinner fa-spin text-[9px]"
            ></i>

            <i
              v-else
              class="fas fa-save text-[9px]"
            ></i>

            {{ saving ? "Updating..." : "Update Asset" }}

          </button>

        </div>

      </form>

    </div>

  </div>
</template>


<script>
export default {
  name: "EditAsset",

  props: {
    data: {
      type: Object,
      default: null,
    },

    categories: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      form: {
        name: "",
        slug: "",
        type: "",
        shortDescription: "",
        description: "",
        price: "",
        currency: "USD",
        platform: "",
        username: "",
        url: "",
        followers: 0,
        posts: 0,
        views: 0,
        engagementRate: "",
        niche: "",
        country: "",
        monthlyRevenue: "",
        revenueCurrency: "USD",
        categoryId: "",
        isActive: true,
      },

      profileFile: null,
      profilePreview: null,

      thumbnailFile: null,
      thumbnailPreview: null,

      existingFiles: [],
      removedFileIds: [],

      selectedFiles: [],
      filePreviews: [],

      detailsText: "",

      saving: false,
      errors: {},
    };
  },

  mounted() {
    this.initializeForm();
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.initializeForm();
      },
    },
  },

  methods: {
    initializeForm() {
      if (!this.data) {
        return;
      }

      this.form.name =
        this.data.name || "";

      this.form.slug =
        this.data.slug || "";

      this.form.type =
        this.data.type || "";

      this.form.shortDescription =
        this.data.shortDescription || "";

      this.form.description =
        this.data.description || "";

      this.form.price =
        this.data.price ?? "";

      this.form.currency =
        this.data.currency || "USD";

      this.form.platform =
        this.data.platform || "";

      this.form.username =
        this.data.username || "";

      this.form.url =
        this.data.url ||
        this.data.profileUrl ||
        "";

      this.form.followers =
        this.data.followers ?? 0;

      this.form.posts =
        this.data.posts ?? 0;

      this.form.views =
        this.data.views ?? 0;

      this.form.engagementRate =
        this.data.engagementRate ?? "";

      this.form.niche =
        this.data.niche || "";

      this.form.country =
        this.data.country || "";

      this.form.monthlyRevenue =
        this.data.monthlyRevenue ?? "";

      this.form.revenueCurrency =
        this.data.revenueCurrency ||
        "USD";

      this.form.categoryId =
        this.data.categoryId ||
        this.data.category?.id ||
        "";

      this.form.isActive =
        this.data.isActive !== false;


      /*
       * Profile image
       */
      const profile =
        this.data.profileUrl ||
        this.data.profileImage ||
        this.data.profile ||
        null;

      this.profilePreview =
        this.getMediaUrl(profile);


      /*
       * Thumbnail
       */
      this.thumbnailPreview =
        this.getMediaUrl(
          this.data.thumbnail
        );


      /*
       * Existing files
       */
      this.existingFiles =
        Array.isArray(this.data.files)
          ? [...this.data.files]
          : [];


      /*
       * Details
       */
      if (
        this.data.details !== null &&
        this.data.details !== undefined
      ) {
        if (
          typeof this.data.details ===
          "string"
        ) {
          this.detailsText =
            this.data.details;
        } else {
          try {
            this.detailsText =
              JSON.stringify(
                this.data.details,
                null,
                2
              );
          } catch (e) {
            this.detailsText = "";
          }
        }
      } else {
        this.detailsText = "";
      }

      this.errors = {};
      this.removedFileIds = [];
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
        return "Asset file";
      }

      if (typeof file === "string") {
        return (
          file
            .split("?")[0]
            .split("/")
            .pop() ||
          "Asset file"
        );
      }

      return (
        file.name ||
        file.filename ||
        file.originalName ||
        file.originalname ||
        "Asset file"
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

      const url =
        this.getFileUrl(file);

      return /\.(mp4|webm|ogg|mov|avi|mkv|m4v)(\?.*)?$/i.test(
        url || ""
      );
    },


    handleProfile(event) {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.showToast(
          "Please select a valid image.",
          "error"
        );

        return;
      }

      this.revokePreview(
        this.profilePreview
      );

      this.profileFile = file;
      this.profilePreview =
        URL.createObjectURL(file);
    },


    removeProfile() {
      this.revokePreview(
        this.profilePreview
      );

      this.profileFile = null;

      this.profilePreview =
        this.getMediaUrl(
          this.data?.profileUrl ||
            this.data?.profileImage ||
            this.data?.profile
        );

      if (this.$refs.profileInput) {
        this.$refs.profileInput.value = "";
      }
    },


    handleThumbnail(event) {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.showToast(
          "Please select a valid thumbnail.",
          "error"
        );

        return;
      }

      this.revokePreview(
        this.thumbnailPreview
      );

      this.thumbnailFile = file;
      this.thumbnailPreview =
        URL.createObjectURL(file);
    },


    removeThumbnail() {
      this.revokePreview(
        this.thumbnailPreview
      );

      this.thumbnailFile = null;

      this.thumbnailPreview =
        this.getMediaUrl(
          this.data?.thumbnail
        );

      if (this.$refs.thumbnailInput) {
        this.$refs.thumbnailInput.value = "";
      }
    },


    handleFiles(event) {
      const files = Array.from(
        event.target.files || []
      );

      const validFiles =
        files.filter(
          (file) =>
            file.type.startsWith("image/") ||
            file.type.startsWith("video/")
        );

      if (
        validFiles.length !==
        files.length
      ) {
        this.showToast(
          "Only image and video files are allowed.",
          "error"
        );
      }

      validFiles.forEach((file) => {
        const url =
          URL.createObjectURL(file);

        this.selectedFiles.push(file);

        this.filePreviews.push({
          key: `${Date.now()}-${Math.random()}`,
          name: file.name,
          url,
          isVideo:
            file.type.startsWith("video/"),
        });
      });

      if (this.$refs.filesInput) {
        this.$refs.filesInput.value = "";
      }
    },


    removeExistingFile(index) {
      const file =
        this.existingFiles[index];

      if (file?.id) {
        this.removedFileIds.push(
          file.id
        );
      }

      this.existingFiles.splice(
        index,
        1
      );
    },


    removeNewFile(index) {
      const preview =
        this.filePreviews[index];

      if (preview?.url) {
        this.revokePreview(
          preview.url
        );
      }

      this.selectedFiles.splice(
        index,
        1
      );

      this.filePreviews.splice(
        index,
        1
      );
    },


    revokePreview(url) {
      if (
        url &&
        url.startsWith("blob:")
      ) {
        URL.revokeObjectURL(url);
      }
    },


    validate() {
      this.errors = {};

      if (!this.form.name.trim()) {
        this.errors.name =
          "Asset name is required.";
      }

      if (this.detailsText.trim()) {
        try {
          JSON.parse(
            this.detailsText
          );
        } catch (e) {
          this.errors.details =
            "Details must be valid JSON.";
        }
      }

      return Object.keys(
        this.errors
      ).length === 0;
    },


    async save() {
      if (!this.data?.id) {
        this.showToast(
          "Asset ID is missing.",
          "error"
        );

        return;
      }

      if (!this.validate()) {
        return;
      }

      this.saving = true;

      try {
        const formData =
          new FormData();

        formData.append(
          "name",
          this.form.name.trim()
        );

        formData.append(
          "slug",
          this.form.slug.trim()
        );

        formData.append(
          "type",
          this.form.type.trim()
        );

        formData.append(
          "shortDescription",
          this.form.shortDescription.trim()
        );

        formData.append(
          "description",
          this.form.description.trim()
        );

        formData.append(
          "price",
          this.form.price || "0"
        );

        formData.append(
          "currency",
          this.form.currency || "USD"
        );

        formData.append(
          "isActive",
          String(
            this.form.isActive
          )
        );

        if (this.form.categoryId) {
          formData.append(
            "categoryId",
            this.form.categoryId
          );
        }

        formData.append(
          "platform",
          this.form.platform
        );

        formData.append(
          "username",
          this.form.username.trim()
        );

        formData.append(
          "url",
          this.form.url.trim()
        );

        formData.append(
          "followers",
          String(
            this.form.followers || 0
          )
        );

        formData.append(
          "posts",
          String(
            this.form.posts || 0
          )
        );

        formData.append(
          "views",
          String(
            this.form.views || 0
          )
        );

        formData.append(
          "engagementRate",
          String(
            this.form.engagementRate || 0
          )
        );

        formData.append(
          "niche",
          this.form.niche.trim()
        );

        formData.append(
          "country",
          this.form.country.trim()
        );

        formData.append(
          "monthlyRevenue",
          String(
            this.form.monthlyRevenue || 0
          )
        );

        formData.append(
          "revenueCurrency",
          this.form.revenueCurrency ||
            "USD"
        );


        if (this.profileFile) {
          formData.append(
            "profileUrl",
            this.profileFile
          );
        }


        if (this.thumbnailFile) {
          formData.append(
            "thumbnail",
            this.thumbnailFile
          );
        }


        this.selectedFiles.forEach(
          (file) => {
            formData.append(
              "files",
              file
            );
          }
        );


        if (this.removedFileIds.length) {
          formData.append(
            "removedFileIds",
            JSON.stringify(
              this.removedFileIds
            )
          );
        }


        if (this.detailsText.trim()) {
          formData.append(
            "details",
            this.detailsText.trim()
          );
        }


        const response =
          await this.$apiPatch(
            `/Asset/${this.data.id}`,
            "",
            formData
          );

        if (response) {
          this.showToast(
            "Asset updated successfully",
            "success"
          );

          this.$emit("saved");
        }

      } catch (e) {
        console.error(
          "Error updating Asset:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to update Asset",
          "error"
        );
      } finally {
        this.saving = false;
      }
    },


    close() {
      if (this.saving) {
        return;
      }

      this.$emit("close");
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


  beforeDestroy() {
    this.revokePreview(
      this.profileFile
        ? this.profilePreview
        : null
    );

    this.revokePreview(
      this.thumbnailFile
        ? this.thumbnailPreview
        : null
    );

    this.filePreviews.forEach(
      (file) => {
        this.revokePreview(
          file.url
        );
      }
    );
  },
};
</script>


<style scoped>
.Asset-modal-enter {
  animation: AssetModalFromFooter 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: bottom center;
}

@keyframes AssetModalFromFooter {
  0% {
    opacity: 0;
    transform: translateY(70px) scale(0.985);
  }

  65% {
    opacity: 1;
    transform: translateY(-5px) scale(1.002);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
```
