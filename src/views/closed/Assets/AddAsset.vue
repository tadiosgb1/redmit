<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4"
  >

    <!-- Modal -->
    <div
      class="Asset-modal-enter w-full max-h-[94vh] overflow-hidden border border-slate-200 bg-white shadow-2xl sm:max-w-5xl"
    >

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="flex items-center justify-between border-b border-slate-200 px-5 py-3.5"
      >

        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
          >
            <i class="fas fa-bullhorn text-sm"></i>
          </div>

          <div>

            <h2 class="text-sm font-bold text-slate-800">
              Add Asset
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              Create a new social media Asset record
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


      <!-- ========================================================= -->
      <!-- Form -->
      <!-- ========================================================= -->
      <form
        @submit.prevent="save"
        class="max-h-[calc(94vh-65px)] overflow-y-auto px-5 py-4"
      >

        <!-- ======================================================= -->
        <!-- Basic Information -->
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
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10"
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
              <span class="text-slate-400">(optional)</span>
            </label>

            <input
              v-model="form.slug"
              type="text"
              placeholder="Asset-slug"
              class="h-9 w-full border border-slate-200 bg-white px-3 font-mono text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10"
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
              placeholder="e.g. social-account"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10"
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
              placeholder="e.g. Ethiopia"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>

        </div>


        <!-- ======================================================= -->
        <!-- Description -->
        <!-- ======================================================= -->
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


        <div class="mt-3">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Description
          </label>

          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Enter detailed description"
            class="w-full resize-none border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
          ></textarea>

        </div>


        <!-- ======================================================= -->
        <!-- Account Information -->
        <!-- ======================================================= -->
        <div class="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">

          <!-- Username -->
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


          <!-- Profile URL -->
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


        <!-- ======================================================= -->
        <!-- Statistics -->
        <!-- ======================================================= -->
        <div
          class="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-4"
        >

          <!-- Followers -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Followers
            </label>

            <input
              v-model.number="form.followers"
              type="number"
              min="0"
              placeholder="0"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <!-- Posts -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Posts
            </label>

            <input
              v-model.number="form.posts"
              type="number"
              min="0"
              placeholder="0"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <!-- Views -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Views
            </label>

            <input
              v-model.number="form.views"
              type="number"
              min="0"
              placeholder="0"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <!-- Engagement -->
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
                placeholder="0"
                class="h-9 w-full border border-slate-200 bg-white px-3 pr-8 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
              />

              <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
                %
              </span>

            </div>

          </div>

        </div>


        <!-- ======================================================= -->
        <!-- Financial -->
        <!-- ======================================================= -->
        <div
          class="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-3"
        >

          <!-- Price -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Price
            </label>

            <input
              v-model="form.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <!-- Currency -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Currency
            </label>

            <input
              v-model="form.currency"
              type="text"
              placeholder="USD"
              maxlength="10"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs uppercase text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>


          <!-- Monthly Revenue -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Monthly Revenue
            </label>

            <input
              v-model="form.monthlyRevenue"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
            />

          </div>

        </div>


        <!-- Revenue Currency -->
        <div class="mt-3 md:w-1/3">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Revenue Currency
          </label>

          <input
            v-model="form.revenueCurrency"
            type="text"
            placeholder="USD"
            maxlength="10"
            class="h-9 w-full border border-slate-200 bg-white px-3 text-xs uppercase text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary/10"
          />

        </div>


        <!-- ======================================================= -->
        <!-- Images -->
        <!-- ======================================================= -->
        <div class="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

          <!-- Profile Image -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Profile Image
            </label>

            <div
              class="border border-dashed border-slate-300 bg-slate-50 p-3"
            >

              <div
                v-if="profilePreview"
                class="mb-3 flex items-center gap-3"
              >

                <div class="h-16 w-16 overflow-hidden border border-slate-200 bg-white">
                  <img
                    :src="profilePreview"
                    alt="Profile preview"
                    class="h-full w-full object-cover"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <p class="truncate text-[10px] font-semibold text-slate-700">
                    {{ profileFile?.name || "Profile image" }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-slate-400">
                    Image selected
                  </p>
                </div>

                <button
                  type="button"
                  @click="removeProfile"
                  class="flex h-7 w-7 items-center justify-center text-red-500 hover:bg-red-50"
                >
                  <i class="fas fa-trash text-[10px]"></i>
                </button>

              </div>

              <label
                class="flex cursor-pointer flex-col items-center justify-center px-4 py-4 text-center transition hover:bg-white"
              >

                <div
                  class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary"
                >
                  <i class="fas fa-user text-xs"></i>
                </div>

                <p class="mt-1.5 text-[10px] font-semibold text-slate-600">
                  Upload profile image
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

            <div
              class="border border-dashed border-slate-300 bg-slate-50 p-3"
            >

              <div
                v-if="thumbnailPreview"
                class="mb-3 flex items-center gap-3"
              >

                <div class="h-16 w-16 overflow-hidden border border-slate-200 bg-white">
                  <img
                    :src="thumbnailPreview"
                    alt="Thumbnail preview"
                    class="h-full w-full object-cover"
                  />
                </div>

                <div class="min-w-0 flex-1">
                  <p class="truncate text-[10px] font-semibold text-slate-700">
                    {{ thumbnailFile?.name || "Thumbnail" }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-slate-400">
                    Image selected
                  </p>
                </div>

                <button
                  type="button"
                  @click="removeThumbnail"
                  class="flex h-7 w-7 items-center justify-center text-red-500 hover:bg-red-50"
                >
                  <i class="fas fa-trash text-[10px]"></i>
                </button>

              </div>

              <label
                class="flex cursor-pointer flex-col items-center justify-center px-4 py-4 text-center transition hover:bg-white"
              >

                <div
                  class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary"
                >
                  <i class="fas fa-image text-xs"></i>
                </div>

                <p class="mt-1.5 text-[10px] font-semibold text-slate-600">
                  Upload thumbnail
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
        <!-- Product Files -->
        <!-- ======================================================= -->
        <div class="mt-4">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Files
          </label>

          <div
            class="border border-dashed border-slate-300 bg-slate-50 p-3"
          >

            <div
              v-if="filePreviews.length"
              class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
            >

              <div
                v-for="(file, index) in filePreviews"
                :key="file.key"
                class="relative overflow-hidden border border-slate-200 bg-white"
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
                  @click="removeFile(index)"
                  class="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-red-500 text-white shadow-sm"
                >
                  <i class="fas fa-times text-[9px]"></i>
                </button>

                <p class="truncate px-2 py-1.5 text-[9px] text-slate-500">
                  {{ file.name }}
                </p>

              </div>

            </div>


            <label
              class="flex cursor-pointer flex-col items-center justify-center px-4 py-5 text-center transition hover:bg-white"
            >

              <div
                class="flex h-8 w-8 items-center justify-center bg-primary/10 text-primary"
              >
                <i class="fas fa-photo-video text-xs"></i>
              </div>

              <p class="mt-1.5 text-[10px] font-semibold text-slate-600">
                Add images or videos
              </p>

              <p class="mt-0.5 text-[9px] text-slate-400">
                JPG, PNG, WEBP, MP4, WEBM, MOV and other supported media
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


        <!-- ======================================================= -->
        <!-- Details -->
        <!-- ======================================================= -->
        <div class="mt-4">

          <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
            Details
            <span class="text-slate-400">(JSON object or array)</span>
          </label>

          <textarea
            v-model="detailsText"
            rows="4"
            placeholder='{"audience":"developers","language":"English"}'
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


        <!-- ======================================================= -->
        <!-- Active -->
        <!-- ======================================================= -->
        <div
          class="mt-4 flex items-center justify-between border border-slate-200 bg-slate-50 px-3 py-2.5"
        >

          <div>

            <p class="text-[11px] font-semibold text-slate-700">
              Active Asset
            </p>

            <p class="mt-0.5 text-[9px] text-slate-400">
              Make this Asset available immediately
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


        <!-- ======================================================= -->
        <!-- Footer -->
        <!-- ======================================================= -->
        <div
          class="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3"
        >

          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="h-8 border border-slate-200 px-3 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>


          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-8 items-center gap-2 bg-primary px-3.5 text-[10px] font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <i
              v-if="saving"
              class="fas fa-spinner fa-spin text-[9px]"
            ></i>

            <i
              v-else
              class="fas fa-save text-[9px]"
            ></i>

            {{ saving ? "Saving..." : "Create Asset" }}

          </button>

        </div>

      </form>

    </div>

  </div>
</template>


<script>
export default {
  name: "AddAsset",

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

      selectedFiles: [],
      filePreviews: [],

      detailsText: "",

      saving: false,
      errors: {},
    };
  },

  methods: {
    generateSlug() {
      if (!this.form.name || this.form.slug) {
        return;
      }

      this.form.slug = this.form.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },


    validate() {
      this.errors = {};

      if (!this.form.name.trim()) {
        this.errors.name =
          "Asset name is required.";
      }

      if (this.detailsText.trim()) {
        try {
          JSON.parse(this.detailsText);
        } catch (e) {
          this.errors.details =
            "Details must be valid JSON.";
        }
      }

      return Object.keys(this.errors).length === 0;
    },


    handleProfile(event) {
      const file =
        event.target.files?.[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.showToast(
          "Please select a valid profile image.",
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
      this.profilePreview = null;

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
          "Please select a valid thumbnail image.",
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
      this.thumbnailPreview = null;

      if (this.$refs.thumbnailInput) {
        this.$refs.thumbnailInput.value = "";
      }
    },


    handleFiles(event) {
      const files = Array.from(
        event.target.files || []
      );

      if (!files.length) {
        return;
      }

      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") ||
          file.type.startsWith("video/")
      );

      if (validFiles.length !== files.length) {
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


    removeFile(index) {
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


    async save() {
      if (!this.validate()) {
        return;
      }

      this.generateSlug();

      this.saving = true;

      try {
        const formData = new FormData();

        formData.append(
          "name",
          this.form.name.trim()
        );

        if (this.form.slug.trim()) {
          formData.append(
            "slug",
            this.form.slug.trim()
          );
        }

        if (this.form.type.trim()) {
          formData.append(
            "type",
            this.form.type.trim()
          );
        }

        if (
          this.form.shortDescription.trim()
        ) {
          formData.append(
            "shortDescription",
            this.form.shortDescription.trim()
          );
        }

        if (this.form.description.trim()) {
          formData.append(
            "description",
            this.form.description.trim()
          );
        }

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
          String(this.form.isActive)
        );

        if (this.form.categoryId) {
          formData.append(
            "categoryId",
            this.form.categoryId
          );
        }

        if (this.form.platform) {
          formData.append(
            "platform",
            this.form.platform
          );
        }

        if (this.form.username) {
          formData.append(
            "username",
            this.form.username.trim()
          );
        }

        if (this.form.url) {
          formData.append(
            "url",
            this.form.url.trim()
          );
        }

        if (this.form.followers !== null) {
          formData.append(
            "followers",
            String(
              this.form.followers || 0
            )
          );
        }

        if (this.form.posts !== null) {
          formData.append(
            "posts",
            String(
              this.form.posts || 0
            )
          );
        }

        if (this.form.views !== null) {
          formData.append(
            "views",
            String(
              this.form.views || 0
            )
          );
        }

        if (
          this.form.engagementRate !== "" &&
          this.form.engagementRate !== null
        ) {
          formData.append(
            "engagementRate",
            String(
              this.form.engagementRate
            )
          );
        }

        if (this.form.niche) {
          formData.append(
            "niche",
            this.form.niche.trim()
          );
        }

        if (this.form.country) {
          formData.append(
            "country",
            this.form.country.trim()
          );
        }

        if (
          this.form.monthlyRevenue !== "" &&
          this.form.monthlyRevenue !== null
        ) {
          formData.append(
            "monthlyRevenue",
            String(
              this.form.monthlyRevenue
            )
          );
        }

        if (this.form.revenueCurrency) {
          formData.append(
            "revenueCurrency",
            this.form.revenueCurrency
          );
        }

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

        if (this.detailsText.trim()) {
          formData.append(
            "details",
            this.detailsText.trim()
          );
        }

        const response =
          await this.$apiPost(
            "/Asset",
            formData
          );

        if (response) {
          this.showToast(
            "Asset created successfully",
            "success"
          );

          this.$emit("saved");
        }

      } catch (e) {
        console.error(
          "Error creating Asset:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to create Asset",
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
      this.profilePreview
    );

    this.revokePreview(
      this.thumbnailPreview
    );

    this.filePreviews.forEach(
      (file) => {
        this.revokePreview(file.url);
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
