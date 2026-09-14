
<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-3 sm:p-4"
    @click.self="close"
  >
    <!-- ========================================================= -->
    <!-- Modal -->
    <!-- ========================================================= -->
    <div
      class="category-modal w-full max-w-5xl overflow-hidden border border-slate-200 bg-white shadow-2xl"
    >
      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 sm:px-7"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary"
          >
            <i class="fas fa-layer-group text-sm"></i>
          </div>

          <div>
            <h2 class="text-sm font-bold text-slate-800">
              Add Category
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              Create a new product category
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="close"
          :disabled="saving"
          class="flex h-8 w-8 items-center justify-center text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40"
          title="Close"
        >
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>

      <!-- ========================================================= -->
      <!-- Form -->
      <!-- ========================================================= -->
      <form
        @submit.prevent="save"
        class="max-h-[82vh] overflow-y-auto px-5 py-4 sm:px-7"
      >
        <!-- ======================================================= -->
        <!-- Basic Information -->
        <!-- ======================================================= -->
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <!-- Category Name -->
          <div>
            <label
              class="mb-1.5 block text-[11px] font-semibold text-slate-600"
            >
              Category Name
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Enter category name"
              class="h-10 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
              :class="{
                'border-red-300 focus:border-red-400 focus:ring-red-100':
                  errors.name
              }"
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
            <label
              class="mb-1.5 block text-[11px] font-semibold text-slate-600"
            >
              Slug
              <span class="ml-1 font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <input
              v-model="form.slug"
              type="text"
              placeholder="category-slug"
              class="h-10 w-full border border-slate-200 bg-white px-3 font-mono text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
            />

            <p class="mt-1 text-[9px] text-slate-400">
              Leave empty to generate automatically.
            </p>
          </div>
        </div>

        <!-- ======================================================= -->
        <!-- Description -->
        <!-- ======================================================= -->
        <div class="mt-3">
          <label
            class="mb-1.5 block text-[11px] font-semibold text-slate-600"
          >
            Description
            <span class="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Enter category description"
            class="w-full resize-none border border-slate-200 bg-white px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
          ></textarea>
        </div>

        <!-- ======================================================= -->
        <!-- Category Image -->
        <!-- ======================================================= -->
        <div class="mt-3">
          <label
            class="mb-1.5 block text-[11px] font-semibold text-slate-600"
          >
            Category Image
            <span class="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <div
            class="border border-dashed border-slate-300 bg-slate-50 p-3"
          >
            <!-- Image Preview -->
            <div
              v-if="imagePreview"
              class="mb-3 flex items-center gap-3"
            >
              <div
                class="h-14 w-14 shrink-0 overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  :src="imagePreview"
                  alt="Category preview"
                  class="h-full w-full object-cover"
                />
              </div>

              <div class="min-w-0 flex-1">
                <p
                  class="truncate text-[11px] font-semibold text-slate-700"
                >
                  {{ selectedFile?.name || "Selected image" }}
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  Image selected
                </p>
              </div>

              <button
                type="button"
                @click="removeImage"
                class="flex h-8 w-8 shrink-0 items-center justify-center text-red-500 transition hover:bg-red-50"
                title="Remove image"
              >
                <i class="fas fa-trash text-[10px]"></i>
              </button>
            </div>

            <!-- Upload -->
            <label
              class="flex cursor-pointer items-center justify-center gap-3 px-3 py-3.5 transition hover:bg-white"
            >
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary"
              >
                <i class="fas fa-cloud-upload-alt text-sm"></i>
              </div>

              <div class="text-left">
                <p
                  class="text-[10px] font-semibold text-slate-600"
                >
                  Click to upload image
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  PNG, JPG, JPEG or WEBP
                </p>
              </div>

              <input
                ref="fileInput"
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                class="hidden"
                @change="handleImage"
              />
            </label>
          </div>
        </div>

        <!-- ======================================================= -->
        <!-- Active Category -->
        <!-- ======================================================= -->
        <div class="mt-3">
          <div
            class="flex items-center justify-between border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <div class="flex items-center gap-3">
              <!-- Status Icon -->
              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center"
                :class="
                  form.isActive
                    ? 'bg-primary/10 text-primary'
                    : 'bg-slate-200 text-slate-400'
                "
              >
                <i
                  class="fas text-[11px]"
                  :class="
                    form.isActive
                      ? 'fa-check'
                      : 'fa-ban'
                  "
                ></i>
              </div>

              <div>
                <p class="text-[11px] font-semibold text-slate-700">
                  Active Category
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  {{
                    form.isActive
                      ? "This category will be available immediately."
                      : "This category will remain unavailable."
                  }}
                </p>
              </div>
            </div>

            <!-- ================================================= -->
            <!-- Normal Switch -->
            <!-- ================================================= -->
            <button
              type="button"
              role="switch"
              :aria-checked="form.isActive"
              @click="form.isActive = !form.isActive"
              class="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              :class="
                form.isActive
                  ? 'bg-primary'
                  : 'bg-slate-300'
              "
            >
              <!-- Circular Switch Head -->
              <span
                class="absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200"
                :class="
                  form.isActive
                    ? 'translate-x-6'
                    : 'translate-x-1'
                "
              ></span>
            </button>
          </div>
        </div>

        <!-- ======================================================= -->
        <!-- Footer -->
        <!-- ======================================================= -->
        <div
          class="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3.5"
        >
          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="h-9 border border-slate-200 px-4 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-9 items-center gap-2 bg-primary px-5 text-[10px] font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i
              v-if="saving"
              class="fas fa-spinner fa-spin text-[9px]"
            ></i>

            <i
              v-else
              class="fas fa-save text-[9px]"
            ></i>

            {{ saving ? "Saving..." : "Create Category" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCategories",

  props: {
    data: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      form: {
        name: "",
        slug: "",
        description: "",
        isActive: true,
      },

      selectedFile: null,
      imagePreview: null,

      saving: false,

      errors: {},
    };
  },

  methods: {
    /**
     * Generate slug from category name.
     */
    generateSlug() {
      if (!this.form.name) {
        return;
      }

      if (!this.form.slug) {
        this.form.slug = this.form.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
    },

    /**
     * Select category image.
     */
    handleImage(event) {
      const file =
        event.target.files &&
        event.target.files[0];

      if (!file) {
        return;
      }

      if (!file.type.startsWith("image/")) {
        this.showToast(
          "Please select a valid image",
          "error"
        );

        return;
      }

      this.selectedFile = file;

      if (this.imagePreview) {
        URL.revokeObjectURL(this.imagePreview);
      }

      this.imagePreview = URL.createObjectURL(file);
    },

    /**
     * Remove selected image.
     */
    removeImage() {
      if (this.imagePreview) {
        URL.revokeObjectURL(this.imagePreview);
      }

      this.selectedFile = null;
      this.imagePreview = null;

      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },

    /**
     * Validate form.
     */
    validate() {
      this.errors = {};

      if (!this.form.name.trim()) {
        this.errors.name =
          "Category name is required.";
      }

      return Object.keys(this.errors).length === 0;
    },

    /**
     * Create category.
     *
     * POST /categories
     */
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

        if (this.form.description.trim()) {
          formData.append(
            "description",
            this.form.description.trim()
          );
        }

        formData.append(
          "isActive",
          String(this.form.isActive)
        );

        if (this.selectedFile) {
          formData.append(
            "image",
            this.selectedFile
          );
        }

        const response = await this.$apiPost(
          "/categories",
          formData
        );

        if (response) {
          this.showToast(
            "Category created successfully",
            "success"
          );

          this.$emit("saved");
        }
      } catch (e) {
        console.error(
          "Error creating category:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to create category",
          "error"
        );
      } finally {
        this.saving = false;
      }
    },

    /**
     * Close modal.
     */
    close() {
      if (this.saving) {
        return;
      }

      this.$emit("close");
    },

    /**
     * Toast helper.
     */
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
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }
  },
};
</script>

<style scoped>
/*
 * Modal enters from the footer/bottom of the screen.
 */
.category-modal {
  animation: category-modal-enter 0.3s
    cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes category-modal-enter {
  0% {
    opacity: 0;
    transform: translateY(90px) scale(0.98);
  }

  60% {
    opacity: 1;
    transform: translateY(-5px) scale(1);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .category-modal {
    animation-duration: 0.25s;
  }
}
</style>

