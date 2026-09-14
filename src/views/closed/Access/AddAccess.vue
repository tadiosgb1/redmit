<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center
           bg-slate-900/50 p-0 sm:items-center sm:p-4"
  >
    <div
      class="access-modal w-full max-w-4xl overflow-hidden
             border border-slate-200 bg-white shadow-2xl"
    >

      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-slate-200
               px-5 py-4"
      >
        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center
                   bg-primary/10 text-primary"
          >
            <i class="fas fa-key text-sm"></i>
          </div>

          <div>
            <h2 class="text-sm font-bold text-slate-800">
              Add Access
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              Create a new access item
            </p>
          </div>

        </div>

        <button
          @click="close"
          :disabled="saving"
          class="flex h-7 w-7 items-center justify-center
                 text-slate-400 transition hover:bg-slate-100
                 hover:text-slate-600 disabled:opacity-40"
        >
          <i class="fas fa-times text-xs"></i>
        </button>
      </div>

      <!-- Body -->
      <form
        @submit.prevent="save"
        class="max-h-[78vh] overflow-y-auto px-5 py-4"
      >

        <!-- Basic -->
        <div class="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">

          <div>
            <label class="field-label">
              Name <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Enter access name"
              class="field-input"
              :class="{ 'border-red-300': errors.name }"
            />

            <p v-if="errors.name" class="error-text">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label class="field-label">
              Slug
            </label>

            <input
              v-model="form.slug"
              type="text"
              placeholder="access-slug"
              class="field-input font-mono"
            />
          </div>

          <div>
            <label class="field-label">
              Type
            </label>

            <input
              v-model="form.type"
              type="text"
              placeholder="e.g. account, subscription, service"
              class="field-input"
            />
          </div>

          <div>
            <label class="field-label">
              Currency
            </label>

            <input
              v-model="form.currency"
              type="text"
              placeholder="USD"
              class="field-input uppercase"
            />
          </div>

          <div>
            <label class="field-label">
              Price
            </label>

            <input
              v-model="form.price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="field-input"
            />
          </div>

          <div>
            <label class="field-label">
              Description
            </label>

            <input
              v-model="form.description"
              type="text"
              placeholder="Short description"
              class="field-input"
            />
          </div>

        </div>

        <!-- Full Description -->
        <div class="mt-3">
          <label class="field-label">
            Details Description
          </label>

          <textarea
            v-model="form.detailsDescription"
            rows="3"
            placeholder="Describe the access item..."
            class="field-textarea"
          ></textarea>
        </div>

        <!-- Details -->
        <div class="mt-4">
          <div class="mb-2 flex items-center justify-between">
            <div>
              <p class="field-label mb-0">
                Details
              </p>

              <p class="text-[9px] text-slate-400">
                Add structured information about this access.
              </p>
            </div>

            <button
              type="button"
              @click="addDetail"
              class="h-7 bg-primary px-3 text-[9px]
                     font-semibold text-white hover:opacity-90"
            >
              <i class="fas fa-plus mr-1"></i>
              Add Detail
            </button>
          </div>

          <div
            v-if="form.details.length"
            class="space-y-2"
          >
            <div
              v-for="(detail, index) in form.details"
              :key="index"
              class="grid grid-cols-[1fr_1fr_auto] gap-2"
            >
              <input
                v-model="detail.key"
                type="text"
                placeholder="Key"
                class="field-input"
              />

              <input
                v-model="detail.value"
                type="text"
                placeholder="Value"
                class="field-input"
              />

              <button
                type="button"
                @click="removeDetail(index)"
                class="h-9 w-9 border border-red-100
                       text-red-500 hover:bg-red-50"
              >
                <i class="fas fa-trash text-[10px]"></i>
              </button>
            </div>
          </div>

          <div
            v-else
            class="border border-dashed border-slate-200
                   bg-slate-50 px-4 py-4 text-center"
          >
            <p class="text-[10px] text-slate-400">
              No details added.
            </p>
          </div>
        </div>

        <!-- Thumbnail -->
        <div class="mt-4">
          <label class="field-label">
            Thumbnail
          </label>

          <div
            class="border border-dashed border-slate-300
                   bg-slate-50 p-3"
          >
            <div
              v-if="thumbnailPreview"
              class="mb-3 flex items-center gap-3"
            >
              <img
                :src="thumbnailPreview"
                alt="Thumbnail preview"
                class="h-16 w-16 object-cover border border-slate-200"
              />

              <div class="min-w-0 flex-1">
                <p class="truncate text-[10px] font-semibold text-slate-700">
                  {{ thumbnailFile?.name }}
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  Thumbnail selected
                </p>
              </div>

              <button
                type="button"
                @click="removeThumbnail"
                class="h-7 w-7 text-red-500 hover:bg-red-50"
              >
                <i class="fas fa-trash text-[10px]"></i>
              </button>
            </div>

            <label
              class="flex cursor-pointer items-center justify-center
                     gap-2 px-4 py-4 text-center hover:bg-white"
            >
              <i class="fas fa-image text-primary"></i>

              <span class="text-[10px] font-semibold text-slate-600">
                Select thumbnail
              </span>

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

        <!-- Files -->
        <div class="mt-4">
          <label class="field-label">
            Files
          </label>

          <div
            class="border border-dashed border-slate-300
                   bg-slate-50 p-3"
          >
            <div
              v-if="filePreviews.length"
              class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
            >
              <div
                v-for="(file, index) in filePreviews"
                :key="index"
                class="relative overflow-hidden border
                       border-slate-200 bg-white"
              >
                <div class="aspect-video bg-slate-900">
                  <img
                    v-if="file.type.startsWith('image/')"
                    :src="file.url"
                    class="h-full w-full object-contain"
                    :alt="file.name"
                  />

                  <video
                    v-else
                    :src="file.url"
                    class="h-full w-full object-contain"
                    muted
                  ></video>
                </div>

                <div class="flex items-center justify-between p-2">
                  <p class="truncate text-[8px] text-slate-500">
                    {{ file.name }}
                  </p>

                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="ml-1 text-red-500"
                  >
                    <i class="fas fa-times text-[9px]"></i>
                  </button>
                </div>
              </div>
            </div>

            <label
              class="flex cursor-pointer items-center justify-center
                     gap-2 px-4 py-4 text-center hover:bg-white"
            >
              <i class="fas fa-photo-video text-primary"></i>

              <span class="text-[10px] font-semibold text-slate-600">
                Select images or videos
              </span>

              <input
                ref="filesInput"
                type="file"
                multiple
                accept="image/png,image/jpeg,image/jpg,image/webp,video/mp4,video/webm,video/ogg,video/quicktime"
                class="hidden"
                @change="handleFiles"
              />
            </label>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="mt-4 flex items-center justify-end gap-2
                 border-t border-slate-100 pt-3"
        >
          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="h-9 border border-slate-200 px-4
                   text-[10px] font-semibold text-slate-500
                   hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-9 items-center gap-2
                   bg-primary px-4 text-[10px] font-semibold
                   text-white shadow-sm hover:opacity-90
                   disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i
              v-if="saving"
              class="fas fa-spinner fa-spin text-[9px]"
            ></i>

            <i
              v-else
              class="fas fa-save text-[9px]"
            ></i>

            {{ saving ? "Saving..." : "Create Access" }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddAccess",

  data() {
    return {
      form: {
        name: "",
        slug: "",
        type: "",
        description: "",
        detailsDescription: "",
        price: "",
        currency: "USD",
        details: [],
      },

      thumbnailFile: null,
      thumbnailPreview: null,

      files: [],
      filePreviews: [],

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

    addDetail() {
      this.form.details.push({
        key: "",
        value: "",
      });
    },

    removeDetail(index) {
      this.form.details.splice(index, 1);
    },

    handleThumbnail(event) {
      const file = event.target.files?.[0];

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

      this.thumbnailFile = file;

      if (this.thumbnailPreview) {
        URL.revokeObjectURL(this.thumbnailPreview);
      }

      this.thumbnailPreview =
        URL.createObjectURL(file);
    },

    removeThumbnail() {
      if (this.thumbnailPreview) {
        URL.revokeObjectURL(this.thumbnailPreview);
      }

      this.thumbnailFile = null;
      this.thumbnailPreview = null;

      if (this.$refs.thumbnailInput) {
        this.$refs.thumbnailInput.value = "";
      }
    },

    handleFiles(event) {
      const selected = Array.from(
        event.target.files || []
      );

      const valid = selected.filter((file) => {
        if (
          file.type.startsWith("image/") ||
          file.type.startsWith("video/")
        ) {
          return true;
        }

        return false;
      });

      valid.forEach((file) => {
        this.files.push(file);

        this.filePreviews.push({
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
        });
      });

      if (selected.length !== valid.length) {
        this.showToast(
          "Only image and video files are allowed",
          "error"
        );
      }

      if (this.$refs.filesInput) {
        this.$refs.filesInput.value = "";
      }
    },

    removeFile(index) {
      const preview = this.filePreviews[index];

      if (preview?.url) {
        URL.revokeObjectURL(preview.url);
      }

      this.files.splice(index, 1);
      this.filePreviews.splice(index, 1);
    },

    validate() {
      this.errors = {};

      if (!this.form.name.trim()) {
        this.errors.name =
          "Access name is required.";
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

        if (this.form.type.trim()) {
          formData.append(
            "type",
            this.form.type.trim()
          );
        }

        if (this.form.description.trim()) {
          formData.append(
            "description",
            this.form.description.trim()
          );
        }

        if (this.form.detailsDescription.trim()) {
          formData.append(
            "detailsDescription",
            this.form.detailsDescription.trim()
          );
        }

        formData.append(
          "price",
          this.form.price || "0"
        );

        formData.append(
          "currency",
          this.form.currency.trim().toUpperCase()
        );

        const details = this.form.details
          .filter(
            (item) =>
              item.key.trim() ||
              item.value.trim()
          );

        formData.append(
          "details",
          JSON.stringify(details)
        );

        if (this.thumbnailFile) {
          formData.append(
            "thumbnail",
            this.thumbnailFile
          );
        }

        this.files.forEach((file) => {
          formData.append("files", file);
        });

        const response = await this.$apiPost(
          "/access",
          formData
        );

        if (response) {
          this.showToast(
            "Access created successfully",
            "success"
          );

          this.$emit("saved");
        }
      } catch (e) {
        console.error(
          "Error creating access:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to create access",
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
    if (this.thumbnailPreview) {
      URL.revokeObjectURL(this.thumbnailPreview);
    }

    this.filePreviews.forEach((file) => {
      if (file.url) {
        URL.revokeObjectURL(file.url);
      }
    });
  },
};
</script>

<style scoped>
.access-modal {
  animation: accessFromFooter 0.28s ease-out;
}

@keyframes accessFromFooter {
  from {
    opacity: 0;
    transform: translateY(80px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.field-label {
  @apply mb-1 block text-[10px] font-semibold text-slate-600;
}

.field-input {
  @apply h-9 w-full border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20;
}

.field-textarea {
  @apply w-full resize-none border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/20;
}

.error-text {
  @apply mt-1 text-[9px] text-red-500;
}
</style>