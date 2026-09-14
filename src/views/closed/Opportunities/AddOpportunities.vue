<template>
  <div
    class="opportunity-modal fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-0 sm:p-4"
  >
    <div
      class="opportunity-modal-panel w-full max-w-5xl overflow-hidden border border-slate-200 bg-white shadow-2xl"
    >

      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-slate-200 px-5 py-4"
      >
        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
          >
            <i class="fas fa-briefcase text-sm"></i>
          </div>

          <div>
            <h2 class="text-sm font-bold text-slate-800">
              Add Opportunity
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              Create a new opportunity
            </p>
          </div>

        </div>

        <button
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
        class="max-h-[82vh] overflow-y-auto px-5 py-4"
      >

        <!-- Basic Information -->
        <div class="mb-4">
          <p
            class="mb-3 border-b border-slate-100 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400"
          >
            Basic Information
          </p>

          <div class="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">

            <!-- Title -->
            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Title <span class="text-red-500">*</span>
              </label>

              <input
                v-model="form.title"
                type="text"
                placeholder="Enter opportunity title"
                class="form-input"
                :class="{ 'border-red-300': errors.title }"
              />

              <p
                v-if="errors.title"
                class="mt-1 text-[10px] text-red-500"
              >
                {{ errors.title }}
              </p>
            </div>

            <!-- Slug -->
            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Slug
              </label>

              <input
                v-model="form.slug"
                type="text"
                placeholder="opportunity-slug"
                class="form-input font-mono"
              />
            </div>

            <!-- Type -->
            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Type <span class="text-red-500">*</span>
              </label>

              <select
                v-model="form.type"
                class="form-input"
                :class="{ 'border-red-300': errors.type }"
              >
                <option value="">Select opportunity type</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Internship">Internship</option>
                <option value="Job">Job</option>
                <option value="Other">Other</option>
              </select>

              <p
                v-if="errors.type"
                class="mt-1 text-[10px] text-red-500"
              >
                {{ errors.type }}
              </p>
            </div>

            <!-- Organization -->
            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Organization
              </label>

              <input
                v-model="form.organization"
                type="text"
                placeholder="Organization name"
                class="form-input"
              />
            </div>

            <!-- Location -->
            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Location
              </label>

              <input
                v-model="form.location"
                type="text"
                placeholder="Remote, Addis Ababa, etc."
                class="form-input"
              />
            </div>

            <!-- Deadline -->
            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Application Deadline
              </label>

              <input
                v-model="form.deadline"
                type="datetime-local"
                class="form-input"
              />
            </div>

          </div>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label
            class="mb-1.5 block text-[11px] font-semibold text-slate-600"
          >
            Description
          </label>

          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Describe the opportunity..."
            class="form-textarea"
          ></textarea>
        </div>

        <!-- Eligibility / Requirements / Benefits -->
        <div class="mb-4">
          <div class="grid grid-cols-1 gap-x-4 gap-y-3 lg:grid-cols-3">

            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Eligibility
              </label>

              <textarea
                v-model="form.eligibility"
                rows="5"
                placeholder="Who is eligible?"
                class="form-textarea"
              ></textarea>
            </div>

            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Requirements
              </label>

              <textarea
                v-model="form.requirements"
                rows="5"
                placeholder="Required qualifications..."
                class="form-textarea"
              ></textarea>
            </div>

            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Benefits
              </label>

              <textarea
                v-model="form.benefits"
                rows="5"
                placeholder="Benefits of the opportunity..."
                class="form-textarea"
              ></textarea>
            </div>

          </div>
        </div>

        <!-- Links -->
        <div class="mb-4">
          <p
            class="mb-3 border-b border-slate-100 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400"
          >
            Links
          </p>

          <div class="grid grid-cols-1 gap-x-4 gap-y-3 md:grid-cols-2">

            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Source URL
              </label>

              <input
                v-model="form.sourceUrl"
                type="url"
                placeholder="https://example.com/source"
                class="form-input"
              />
            </div>

            <div>
              <label
                class="mb-1.5 block text-[11px] font-semibold text-slate-600"
              >
                Application URL
              </label>

              <input
                v-model="form.applicationUrl"
                type="url"
                placeholder="https://example.com/apply"
                class="form-input"
              />
            </div>

          </div>
        </div>

        <!-- Thumbnail -->
        <div class="mb-4">
          <label
            class="mb-1.5 block text-[11px] font-semibold text-slate-600"
          >
            Thumbnail
          </label>

          <div
            class="border border-dashed border-slate-300 bg-slate-50 p-3"
          >

            <div
              v-if="imagePreview"
              class="mb-3 flex items-center gap-3"
            >
              <div
                class="h-16 w-24 overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  :src="imagePreview"
                  alt="Opportunity thumbnail"
                  class="h-full w-full object-cover"
                />
              </div>

              <div class="min-w-0 flex-1">
                <p
                  class="truncate text-[11px] font-semibold text-slate-700"
                >
                  {{ selectedFile?.name }}
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  Thumbnail selected
                </p>
              </div>

              <button
                type="button"
                @click="removeImage"
                class="flex h-7 w-7 items-center justify-center text-red-500 hover:bg-red-50"
              >
                <i class="fas fa-trash text-[10px]"></i>
              </button>
            </div>

            <label
              class="flex cursor-pointer flex-col items-center justify-center px-4 py-4 text-center transition hover:bg-white"
            >
              <div
                class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
              >
                <i class="fas fa-cloud-upload-alt text-sm"></i>
              </div>

              <p class="mt-2 text-[10px] font-semibold text-slate-600">
                Click to upload thumbnail
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

        <!-- Footer -->
        <div
          class="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-4"
        >
          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="h-9 border border-slate-200 px-4 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-9 items-center gap-2 bg-primary px-4 text-[10px] font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <i
              v-if="saving"
              class="fas fa-spinner fa-spin text-[9px]"
            ></i>

            <i
              v-else
              class="fas fa-save text-[9px]"
            ></i>

            {{ saving ? "Saving..." : "Create Opportunity" }}
          </button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddOpportunity",

  data() {
    return {
      form: {
        title: "",
        slug: "",
        type: "",
        description: "",
        organization: "",
        location: "",
        eligibility: "",
        requirements: "",
        benefits: "",
        sourceUrl: "",
        applicationUrl: "",
        deadline: "",
      },

      selectedFile: null,
      imagePreview: null,

      saving: false,
      errors: {},
    };
  },

  methods: {
    generateSlug() {
      if (!this.form.title || this.form.slug) {
        return;
      }

      this.form.slug = this.form.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    },

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

      if (this.imagePreview) {
        URL.revokeObjectURL(this.imagePreview);
      }

      this.selectedFile = file;
      this.imagePreview = URL.createObjectURL(file);
    },

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

    validate() {
      this.errors = {};

      if (!this.form.title.trim()) {
        this.errors.title = "Title is required.";
      }

      if (!this.form.type) {
        this.errors.type = "Opportunity type is required.";
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
          "title",
          this.form.title.trim()
        );

        formData.append(
          "slug",
          this.form.slug.trim()
        );

        formData.append(
          "type",
          this.form.type
        );

        formData.append(
          "description",
          this.form.description.trim()
        );

        formData.append(
          "organization",
          this.form.organization.trim()
        );

        formData.append(
          "location",
          this.form.location.trim()
        );

        formData.append(
          "eligibility",
          this.form.eligibility.trim()
        );

        formData.append(
          "requirements",
          this.form.requirements.trim()
        );

        formData.append(
          "benefits",
          this.form.benefits.trim()
        );

        formData.append(
          "sourceUrl",
          this.form.sourceUrl.trim()
        );

        formData.append(
          "applicationUrl",
          this.form.applicationUrl.trim()
        );

        if (this.form.deadline) {
          formData.append(
            "deadline",
            this.form.deadline
          );
        }

        if (this.selectedFile) {
          formData.append(
            "thumbnail",
            this.selectedFile
          );
        }

        const response = await this.$apiPost(
          "/opportunities",
          formData
        );

        if (response) {
          this.showToast(
            "Opportunity created successfully",
            "success"
          );

          this.$emit("saved");
        }
      } catch (e) {
        console.error(
          "Error creating opportunity:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to create opportunity",
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
    if (this.imagePreview) {
      URL.revokeObjectURL(this.imagePreview);
    }
  },
};
</script>

<style scoped>
.opportunity-modal {
  animation: opportunity-overlay-in 0.22s ease-out;
}

.opportunity-modal-panel {
  animation: opportunity-footer-in 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}

.form-input {
  width: 100%;
  height: 38px;
  border: 1px solid rgb(226 232 240);
  background: white;
  padding: 0 12px;
  font-size: 12px;
  color: rgb(51 65 85);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-input::placeholder {
  color: rgb(148 163 184);
}

.form-input:focus {
  border-color: rgb(var(--color-primary));
  box-shadow: 0 0 0 2px rgb(var(--color-primary) / 0.08);
}

.form-textarea {
  width: 100%;
  resize: vertical;
  min-height: 92px;
  border: 1px solid rgb(226 232 240);
  background: white;
  padding: 9px 12px;
  font-size: 12px;
  line-height: 1.5;
  color: rgb(51 65 85);
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.form-textarea::placeholder {
  color: rgb(148 163 184);
}

.form-textarea:focus {
  border-color: rgb(var(--color-primary));
  box-shadow: 0 0 0 2px rgb(var(--color-primary) / 0.08);
}

@keyframes opportunity-overlay-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes opportunity-footer-in {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .opportunity-modal-panel {
    max-height: 92vh;
    animation-name: opportunity-footer-in-mobile;
  }

  @keyframes opportunity-footer-in-mobile {
    from {
      opacity: 0;
      transform: translateY(100%);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>