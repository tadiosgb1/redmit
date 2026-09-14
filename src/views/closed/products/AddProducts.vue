<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:p-4"
    @click.self="close"
  >

    <div
      class="product-modal w-full max-w-5xl overflow-hidden border border-slate-200 bg-white shadow-2xl"
    >

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="flex items-center justify-between border-b border-slate-200 px-5 py-4"
      >

        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
          >
            <i class="fas fa-box-open text-sm"></i>
          </div>

          <div>

            <h2 class="text-sm font-bold text-slate-800">
              Add Product
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              Create a new digital product
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
        class="max-h-[82vh] overflow-y-auto"
      >

        <div class="grid grid-cols-1 gap-x-5 gap-y-4 px-5 py-4 lg:grid-cols-2">

          <!-- Name -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Product Name
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Enter product name"
              class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
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
              placeholder="product-slug"
              class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 font-mono text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
            />

          </div>

          <!-- Short Description -->
          <div class="lg:col-span-2">

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Short Description
            </label>

            <input
              v-model="form.shortDescription"
              type="text"
              placeholder="Short product description"
              class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
            />

          </div>

          <!-- Description -->
          <div class="lg:col-span-2">

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Description
            </label>

            <textarea
              v-model="form.description"
              rows="4"
              placeholder="Enter full product description"
              class="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
            ></textarea>

          </div>

          <!-- Price -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Price
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
              :class="{ 'border-red-300': errors.price }"
            />

            <p
              v-if="errors.price"
              class="mt-1 text-[10px] text-red-500"
            >
              {{ errors.price }}
            </p>

          </div>

          <!-- Currency -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Currency
            </label>

            <select
              v-model="form.currency"
              class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary/20"
            >
              <option value="USD">USD</option>
              <option value="ETB">ETB</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>

          </div>

          <!-- Category -->
          <div class="lg:col-span-2">

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Category ID
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.categoryId"
              type="text"
              placeholder="Enter category ID"
              class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 font-mono text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
              :class="{ 'border-red-300': errors.categoryId }"
            />

            <p
              v-if="errors.categoryId"
              class="mt-1 text-[10px] text-red-500"
            >
              {{ errors.categoryId }}
            </p>

          </div>

          <!-- Thumbnail -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Thumbnail
              <span class="text-red-500">*</span>
            </label>

            <div
              class="border border-dashed border-slate-300 bg-slate-50 p-3"
              :class="{ 'border-red-300': errors.thumbnail }"
            >

              <div
                v-if="thumbnailPreview"
                class="mb-3 flex items-center gap-3"
              >

                <div class="h-16 w-20 overflow-hidden bg-white">
                  <img
                    :src="thumbnailPreview"
                    alt="Thumbnail preview"
                    class="h-full w-full object-cover"
                  />
                </div>

                <div class="min-w-0 flex-1">

                  <p class="truncate text-[11px] font-semibold text-slate-700">
                    {{ thumbnailFile?.name }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-slate-400">
                    Product thumbnail
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
                class="flex cursor-pointer flex-col items-center justify-center px-3 py-4 text-center hover:bg-white"
              >

                <div
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <i class="fas fa-image text-sm"></i>
                </div>

                <p class="mt-2 text-[10px] font-semibold text-slate-600">
                  Select thumbnail
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

            <p
              v-if="errors.thumbnail"
              class="mt-1 text-[10px] text-red-500"
            >
              {{ errors.thumbnail }}
            </p>

          </div>

          <!-- Files -->
          <div>

            <label class="mb-1.5 block text-[11px] font-semibold text-slate-600">
              Product Files
            </label>

            <div class="border border-dashed border-slate-300 bg-slate-50 p-3">

              <div
                v-if="selectedFiles.length"
                class="mb-3 space-y-1.5"
              >

                <div
                  v-for="(file, index) in selectedFiles"
                  :key="`${file.name}-${index}`"
                  class="flex items-center gap-2 border border-slate-200 bg-white px-2.5 py-2"
                >

                  <div
                    class="flex h-7 w-7 items-center justify-center bg-primary/10 text-primary"
                  >
                    <i
                      :class="isVideo(file) ? 'fas fa-video' : 'fas fa-image'"
                      class="text-[10px]"
                    ></i>
                  </div>

                  <div class="min-w-0 flex-1">

                    <p class="truncate text-[10px] font-semibold text-slate-700">
                      {{ file.name }}
                    </p>

                    <p class="text-[9px] text-slate-400">
                      {{ formatFileSize(file.size) }}
                    </p>

                  </div>

                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="flex h-6 w-6 items-center justify-center text-red-500 hover:bg-red-50"
                  >
                    <i class="fas fa-times text-[9px]"></i>
                  </button>

                </div>

              </div>

              <label
                class="flex cursor-pointer flex-col items-center justify-center px-3 py-4 text-center hover:bg-white"
              >

                <div
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <i class="fas fa-photo-video text-sm"></i>
                </div>

                <p class="mt-2 text-[10px] font-semibold text-slate-600">
                  Select product files
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  Images or videos • Multiple files allowed
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

        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-3"
        >

          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="h-9 rounded-md border border-slate-200 px-3.5 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-[10px] font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <i
              v-if="saving"
              class="fas fa-spinner fa-spin text-[9px]"
            ></i>

            <i
              v-else
              class="fas fa-save text-[9px]"
            ></i>

            {{ saving ? "Saving..." : "Create Product" }}

          </button>

        </div>

      </form>

    </div>

  </div>
</template>

<script>
export default {
  name: "AddProducts",

  data() {
    return {
      form: {
        name: "",
        slug: "",
        shortDescription: "",
        description: "",
        price: "",
        currency: "USD",
        categoryId: "",
      },

      thumbnailFile: null,
      thumbnailPreview: null,

      selectedFiles: [],

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

    handleThumbnail(event) {
      const file =
        event.target.files &&
        event.target.files[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.showToast(
          "Thumbnail must be an image",
          "error"
        );

        return;
      }

      this.clearThumbnailPreview();

      this.thumbnailFile = file;

      this.thumbnailPreview =
        URL.createObjectURL(file);

      this.errors.thumbnail = null;
    },

    clearThumbnailPreview() {
      if (
        this.thumbnailPreview &&
        this.thumbnailPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          this.thumbnailPreview
        );
      }
    },

    removeThumbnail() {
      this.clearThumbnailPreview();

      this.thumbnailFile = null;
      this.thumbnailPreview = null;

      if (this.$refs.thumbnailInput) {
        this.$refs.thumbnailInput.value = "";
      }
    },

    handleFiles(event) {
      const files =
        Array.from(event.target.files || []);

      if (!files.length) {
        return;
      }

      const validFiles = files.filter(file =>
        file.type.startsWith("image/") ||
        file.type.startsWith("video/")
      );

      if (validFiles.length !== files.length) {
        this.showToast(
          "Only image and video files are allowed",
          "error"
        );
      }

      this.selectedFiles = [
        ...this.selectedFiles,
        ...validFiles,
      ];

      if (this.$refs.filesInput) {
        this.$refs.filesInput.value = "";
      }
    },

    removeFile(index) {
      this.selectedFiles.splice(index, 1);
    },

    isVideo(file) {
      return file?.type?.startsWith("video/");
    },

    formatFileSize(bytes) {
      if (!bytes) {
        return "0 KB";
      }

      const mb = bytes / (1024 * 1024);

      if (mb >= 1) {
        return `${mb.toFixed(2)} MB`;
      }

      return `${Math.ceil(bytes / 1024)} KB`;
    },

    validate() {
      this.errors = {};

      if (!this.form.name.trim()) {
        this.errors.name =
          "Product name is required.";
      }

      if (
        this.form.price === "" ||
        Number(this.form.price) < 0
      ) {
        this.errors.price =
          "A valid price is required.";
      }

      if (!this.form.categoryId.trim()) {
        this.errors.categoryId =
          "Category ID is required.";
      }

      if (!this.thumbnailFile) {
        this.errors.thumbnail =
          "Product thumbnail is required.";
      }

      return Object.keys(this.errors).length === 0;
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
          String(this.form.price)
        );

        formData.append(
          "currency",
          this.form.currency
        );

        formData.append(
          "categoryId",
          this.form.categoryId.trim()
        );

        formData.append(
          "thumbnail",
          this.thumbnailFile
        );

        this.selectedFiles.forEach(file => {
          formData.append(
            "files",
            file
          );
        });

        const response =
          await this.$apiPost(
            "/products",
            formData
          );

        if (response) {
          this.showToast(
            "Product created successfully",
            "success"
          );

          this.$emit("saved");
        }

      } catch (e) {

        console.error(
          "Error creating product:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to create product",
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
    this.clearThumbnailPreview();
  },
};
</script>

<style scoped>
.product-modal {
  animation: productModalFromFooter 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes productModalFromFooter {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 640px) {
  .product-modal {
    animation: productModalFromFooterDesktop 0.28s cubic-bezier(0.22, 1, 0.36, 1);
  }
}

@keyframes productModalFromFooterDesktop {
  from {
    opacity: 0;
    transform: translateY(70px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>