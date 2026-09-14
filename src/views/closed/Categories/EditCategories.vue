<template>
  <!-- ============================================================= -->
  <!-- Modal Overlay -->
  <!-- ============================================================= -->
  <transition name="category-modal">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:p-4"
      @click.self="close"
    >
      <!-- ========================================================= -->
      <!-- Modal -->
      <!-- ========================================================= -->
      <div
        class="category-modal-panel w-full max-w-4xl overflow-hidden border border-slate-200 bg-white shadow-2xl sm:mb-2"
        @click.stop
      >
        <!-- ======================================================= -->
        <!-- Header -->
        <!-- ======================================================= -->
        <div
          class="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 sm:px-6"
        >
          <div class="flex min-w-0 items-center gap-3">
            <!-- Icon -->
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
            >
              <i class="fas fa-edit text-sm"></i>
            </div>

            <!-- Title -->
            <div class="min-w-0">
              <h2 class="text-sm font-bold text-slate-800">
                Edit Category
              </h2>

              <p class="mt-0.5 text-[10px] text-slate-400">
                Update category information
              </p>
            </div>
          </div>

          <!-- Close -->
          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Close"
          >
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>

        <!-- ======================================================= -->
        <!-- Form -->
        <!-- ======================================================= -->
        <form
          @submit.prevent="save"
          class="max-h-[82vh] overflow-y-auto px-5 py-4 sm:px-6 sm:py-5"
        >
          <!-- ===================================================== -->
          <!-- Basic Information -->
          <!-- ===================================================== -->
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <!-- Name -->
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
                autocomplete="off"
                class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
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
                <span class="text-slate-400">(optional)</span>
              </label>

              <input
                v-model="form.slug"
                type="text"
                placeholder="category-slug"
                autocomplete="off"
                class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 font-mono text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
            </div>
          </div>

          <!-- ===================================================== -->
          <!-- Description -->
          <!-- ===================================================== -->
          <div class="mt-3">
            <label
              class="mb-1.5 block text-[11px] font-semibold text-slate-600"
            >
              Description
            </label>

            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Enter category description"
              class="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20"
            ></textarea>
          </div>

          <!-- ===================================================== -->
          <!-- Category Image -->
          <!-- ===================================================== -->
          <div class="mt-3">
            <label
              class="mb-1.5 block text-[11px] font-semibold text-slate-600"
            >
              Category Image
            </label>

            <div
              class="border border-dashed border-slate-300 bg-slate-50 p-3"
            >
              <!-- Current / New Image -->
              <div
                v-if="imagePreview"
                class="flex items-center gap-3"
              >
                <!-- Preview -->
                <div
                  class="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white"
                >
                  <img
                    :src="imagePreview"
                    alt="Category image"
                    class="h-full w-full object-cover"
                  />
                </div>

                <!-- Details -->
                <div class="min-w-0 flex-1">
                  <p
                    class="truncate text-[11px] font-semibold text-slate-700"
                  >
                    {{ selectedFile?.name || "Current category image" }}
                  </p>

                  <p class="mt-0.5 text-[9px] text-slate-400">
                    {{
                      selectedFile
                        ? "New image selected"
                        : "Current category image"
                    }}
                  </p>
                </div>

                <!-- Remove New Image -->
                <button
                  v-if="selectedFile"
                  type="button"
                  @click="removeNewImage"
                  :disabled="saving"
                  class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-red-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                  title="Remove new image"
                >
                  <i class="fas fa-trash text-[10px]"></i>
                </button>
              </div>

              <!-- Upload -->
              <label
                class="mt-3 flex cursor-pointer flex-col items-center justify-center border border-transparent px-4 py-3 text-center transition hover:border-slate-200 hover:bg-white"
              >
                <div
                  class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                >
                  <i class="fas fa-cloud-upload-alt text-sm"></i>
                </div>

                <p
                  class="mt-1.5 text-[10px] font-semibold text-slate-600"
                >
                  Replace image
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  PNG, JPG, JPEG or WEBP
                </p>

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

          <!-- ===================================================== -->
          <!-- Active Status -->
          <!-- Directly below image -->
          <!-- ===================================================== -->
          <div
            class="mt-3 flex items-center justify-between border border-slate-200 bg-slate-50 px-3.5 py-3"
          >
            <div class="min-w-0">
              <p
                class="text-[11px] font-semibold text-slate-700"
              >
                Active Category
              </p>

              <p
                class="mt-0.5 text-[9px] text-slate-400"
              >
                Control whether this category is available
              </p>
            </div>

            <!-- Normal Switch -->
            <button
              type="button"
              role="switch"
              :aria-checked="form.isActive"
              :disabled="saving"
              @click="form.isActive = !form.isActive"
              class="relative ml-4 h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
              :class="
                form.isActive
                  ? 'bg-primary'
                  : 'bg-slate-300'
              "
              title="Toggle category status"
            >
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

          <!-- ===================================================== -->
          <!-- Footer -->
          <!-- ===================================================== -->
          <div
            class="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3.5"
          >
            <!-- Cancel -->
            <button
              type="button"
              @click="close"
              :disabled="saving"
              class="h-9 rounded-md border border-slate-200 bg-white px-4 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancel
            </button>

            <!-- Update -->
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

              {{ saving ? "Updating..." : "Update Category" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EditCategories",

  props: {
    data: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      visible: false,

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

      originalImageUrl: null,
    };
  },

  mounted() {
    this.initializeForm();

    /*
     * Small delay allows Vue to render the modal first,
     * then trigger the footer-to-modal animation.
     */
    this.$nextTick(() => {
      requestAnimationFrame(() => {
        this.visible = true;
      });
    });
  },

  methods: {
    // ============================================================
    // Initialize
    // ============================================================

    initializeForm() {
      if (!this.data) {
        return;
      }

      this.form.name = this.data.name || "";
      this.form.slug = this.data.slug || "";
      this.form.description = this.data.description || "";

      this.form.isActive =
        this.data.isActive === true;

      this.selectedFile = null;

      /*
       * Support both:
       *
       * image: {
       *   url: "..."
       * }
       *
       * and:
       *
       * image: "..."
       */
      const image = this.data.image;

      if (typeof image === "string" && image.trim()) {
        this.imagePreview = image;
        this.originalImageUrl = image;
      } else if (
        image &&
        typeof image === "object" &&
        image.url
      ) {
        this.imagePreview = image.url;
        this.originalImageUrl = image.url;
      } else {
        this.imagePreview = null;
        this.originalImageUrl = null;
      }
    },

    // ============================================================
    // Generate Slug
    // ============================================================

    generateSlug() {
      if (!this.form.name.trim()) {
        return;
      }

      if (!this.form.slug.trim()) {
        this.form.slug = this.form.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
    },

    // ============================================================
    // Handle Image
    // ============================================================

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

        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = "";
        }

        return;
      }

      /*
       * Revoke only an existing temporary object URL.
       * Never revoke the server image URL.
       */
      if (
        this.selectedFile &&
        this.imagePreview &&
        this.imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(this.imagePreview);
      }

      this.selectedFile = file;

      this.imagePreview =
        URL.createObjectURL(file);
    },

    // ============================================================
    // Remove New Image
    // ============================================================

    removeNewImage() {
      /*
       * Revoke temporary preview URL.
       */
      if (
        this.imagePreview &&
        this.imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(this.imagePreview);
      }

      this.selectedFile = null;

      /*
       * Restore original server image.
       */
      this.imagePreview =
        this.originalImageUrl || null;

      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    },

    // ============================================================
    // Validate
    // ============================================================

    validate() {
      this.errors = {};

      if (!this.form.name.trim()) {
        this.errors.name =
          "Category name is required.";
      }

      return (
        Object.keys(this.errors).length === 0
      );
    },

    // ============================================================
    // Save / Update Category
    // ============================================================

    async save() {
      if (!this.data?.id) {
        this.showToast(
          "Category information is missing",
          "error"
        );

        return;
      }

      if (!this.validate()) {
        return;
      }

      /*
       * Generate slug when empty.
       */
      this.generateSlug();

      this.saving = true;

      try {
        const formData = new FormData();

        formData.append(
          "name",
          this.form.name.trim()
        );

        formData.append(
          "slug",
          this.form.slug.trim()
        );

        formData.append(
          "description",
          this.form.description.trim()
        );

        formData.append(
          "isActive",
          String(this.form.isActive)
        );

        /*
         * Only send image when a new image
         * has actually been selected.
         */
        if (this.selectedFile) {
          formData.append(
            "image",
            this.selectedFile
          );
        }

        const response =
          await this.$apiPatch(
            `/categories/${this.data.id}`,
            "",
            formData
          );

        if (response) {
          this.showToast(
            "Category updated successfully",
            "success"
          );

          /*
           * Let parent close the modal and
           * refresh the categories.
           */
          this.$emit("saved");
        }
      } catch (e) {
        console.error(
          "Error updating category:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            e?.message ||
            "Failed to update category",
          "error"
        );
      } finally {
        this.saving = false;
      }
    },

    // ============================================================
    // Close
    // ============================================================

    close() {
      if (this.saving) {
        return;
      }

      /*
       * Animate back down toward the footer
       * before destroying the component.
       */
      this.visible = false;

      setTimeout(() => {
        this.$emit("close");
      }, 180);
    },

    // ============================================================
    // Toast
    // ============================================================

    showToast(message, type) {
      if (
        this.$root &&
        this.$root.$refs &&
        this.$root.$refs.toast
      ) {
        this.$root.$refs.toast.showToast(
          message,
          type
        );
      }
    },
  },

  // ==============================================================
  // Cleanup
  // ==============================================================

  beforeDestroy() {
    /*
     * Only revoke temporary blob URLs.
     */
    if (
      this.imagePreview &&
      this.imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(this.imagePreview);
    }
  },
};
</script>

<style scoped>
/* ================================================================
   Footer → Modal Animation
   ================================================================ */

/*
 * The overlay itself fades in.
 */
.category-modal-enter-active,
.category-modal-leave-active {
  transition: opacity 0.18s ease;
}

.category-modal-enter-from,
.category-modal-leave-to {
  opacity: 0;
}

/*
 * The actual modal starts below the viewport,
 * then rises upward into position.
 *
 * This gives it the effect of coming from
 * the footer/bottom of the screen.
 */
.category-modal-enter-active
  .category-modal-panel,
.category-modal-leave-active
  .category-modal-panel {
  transition:
    transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.18s ease;
}

.category-modal-enter-from
  .category-modal-panel {
  opacity: 0;
  transform: translateY(80px) scale(0.97);
}

.category-modal-leave-to
  .category-modal-panel {
  opacity: 0;
  transform: translateY(80px) scale(0.97);
}

/*
 * Modal scrollbar.
 */
form::-webkit-scrollbar {
  width: 4px;
}

form::-webkit-scrollbar-track {
  background: transparent;
}

form::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.2);
  border-radius: 10px;
}

form::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.35);
}

/*
 * Mobile adjustment.
 */
@media (max-width: 640px) {
  .category-modal-panel {
    max-height: 94vh;
    margin-bottom: 0;
  }
}
</style>