```vue
<template>
  <div class="min-h-screen bg-slate-50 text-slate-700 text-[13px]">

    <!-- Loading -->
    <Loading
      :visible="loading"
      message="Loading Product..."
    />

    <!-- Page Container -->
    <div class="mx-auto max-w-[1600px] p-4 sm:p-5">

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex min-w-0 items-center gap-3">

          <!-- Back -->
          <button
            type="button"
            @click="goBack"
            class="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
            title="Go back"
          >
            <i class="fas fa-arrow-left text-[10px]"></i>
          </button>

          <!-- Title -->
          <div class="min-w-0">
            <p
              class="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
            >
              Product Details
            </p>

            <h1
              class="mt-0.5 truncate text-base font-bold text-slate-800"
            >
              {{ product?.name || "Product" }}
            </h1>
          </div>

        </div>

        <!-- Edit -->
        <button
          v-if="product"
          type="button"
          @click="openEdit"
          class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <i class="fas fa-edit text-[10px]"></i>
          Edit Product
        </button>

      </div>


      <!-- ========================================================= -->
      <!-- Product -->
      <!-- ========================================================= -->
      <div v-if="product">

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">

          <!-- ===================================================== -->
          <!-- Thumbnail / Price -->
          <!-- ===================================================== -->
          <div
            class="overflow-hidden border border-slate-200 bg-white shadow-sm lg:col-span-1"
          >

            <!-- Thumbnail -->
            <div
              class="aspect-square overflow-hidden bg-slate-100"
            >

              <img
                v-if="thumbnailUrl"
                :src="thumbnailUrl"
                :alt="product.name"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full flex-col items-center justify-center text-slate-300"
              >
                <i class="fas fa-box-open text-4xl"></i>

                <p class="mt-2 text-[10px] font-medium text-slate-400">
                  No thumbnail available
                </p>
              </div>

            </div>


            <!-- Price -->
            <div
              class="border-t border-slate-100 px-4 py-4"
            >

              <p
                class="text-[9px] font-bold uppercase tracking-wider text-slate-400"
              >
                Price
              </p>

              <div class="mt-1 flex items-baseline gap-1.5">

                <span
                  class="text-2xl font-bold text-slate-800"
                >
                  {{ formatPrice(product.price) }}
                </span>

                <span
                  class="text-xs font-bold uppercase text-primary"
                >
                  {{ product.currency || "USD" }}
                </span>

              </div>

            </div>


            <!-- Status -->
            <div
              class="border-t border-slate-100 px-4 py-3"
            >

              <div class="flex items-center justify-between">

                <span
                  class="text-[10px] font-semibold text-slate-500"
                >
                  Product Status
                </span>

                <span
                  v-if="product.isActive === true"
                  class="inline-flex items-center gap-1.5 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-primary"
                  ></span>

                  Active
                </span>

                <span
                  v-else
                  class="inline-flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500"
                >
                  <span
                    class="h-1.5 w-1.5 rounded-full bg-slate-400"
                  ></span>

                  Inactive
                </span>

              </div>

            </div>

          </div>


          <!-- ===================================================== -->
          <!-- Product Information -->
          <!-- ===================================================== -->
          <div
            class="overflow-hidden border border-slate-200 bg-white shadow-sm lg:col-span-2"
          >

            <!-- Product Header -->
            <div
              class="border-b border-slate-100 px-5 py-4"
            >

              <!-- Category / Slug -->
              <div class="flex flex-wrap items-center gap-2">

                <span
                  v-if="product.category?.name"
                  class="bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary"
                >
                  {{ product.category.name }}
                </span>

                <span
                  v-if="product.slug"
                  class="bg-slate-100 px-2 py-1 font-mono text-[10px] text-slate-500"
                >
                  {{ product.slug }}
                </span>

              </div>


              <!-- Name -->
              <h2
                class="mt-3 text-lg font-bold text-slate-800"
              >
                {{ product.name }}
              </h2>


              <!-- Short Description -->
              <p
                v-if="product.shortDescription"
                class="mt-1.5 max-w-3xl text-xs leading-5 text-slate-500"
              >
                {{ product.shortDescription }}
              </p>

            </div>


            <!-- ===================================================== -->
            <!-- Description -->
            <!-- ===================================================== -->
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
                  product.description ||
                  "No description available."
                }}
              </p>

            </div>


            <!-- ===================================================== -->
            <!-- Information -->
            <!-- ===================================================== -->
            <div
              class="border-t border-slate-100 px-5 py-4"
            >

              <div
                class="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
              >

                <!-- Currency -->
                <div
                  class="bg-slate-50 px-3 py-2.5"
                >
                  <p
                    class="text-[9px] uppercase tracking-wide text-slate-400"
                  >
                    Currency
                  </p>

                  <p
                    class="mt-0.5 text-xs font-semibold text-slate-700"
                  >
                    {{ product.currency || "USD" }}
                  </p>
                </div>


                <!-- Category -->
                <div
                  class="bg-slate-50 px-3 py-2.5"
                >
                  <p
                    class="text-[9px] uppercase tracking-wide text-slate-400"
                  >
                    Category
                  </p>

                  <p
                    class="mt-0.5 truncate text-xs font-semibold text-slate-700"
                  >
                    {{
                      product.category?.name ||
                      "Uncategorized"
                    }}
                  </p>
                </div>


                <!-- Files -->
                <div
                  class="bg-slate-50 px-3 py-2.5"
                >
                  <p
                    class="text-[9px] uppercase tracking-wide text-slate-400"
                  >
                    Product Files
                  </p>

                  <p
                    class="mt-0.5 text-xs font-semibold text-slate-700"
                  >
                    {{ files.length }}
                  </p>
                </div>

              </div>

            </div>


            <!-- ===================================================== -->
            <!-- Seller -->
            <!-- ===================================================== -->
            <div
              v-if="product.seller"
              class="border-t border-slate-100 px-5 py-4"
            >

              <p
                class="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400"
              >
                Seller
              </p>

              <div class="flex items-center gap-3">

                <div
                  class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
                >
                  <i class="fas fa-user text-xs"></i>
                </div>

                <div class="min-w-0">

                  <p
                    class="truncate text-xs font-semibold text-slate-700"
                  >
                    {{
                      product.seller.fullName ||
                      product.seller.username ||
                      "Seller"
                    }}
                  </p>

                  <p
                    v-if="product.seller.username"
                    class="mt-0.5 truncate text-[10px] text-slate-400"
                  >
                    @{{ product.seller.username }}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        <!-- ========================================================= -->
        <!-- Product Files -->
        <!-- ========================================================= -->
        <div
          class="mt-4 overflow-hidden border border-slate-200 bg-white shadow-sm"
        >

          <!-- Files Header -->
          <div
            class="flex flex-col gap-2 border-b border-slate-100 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
          >

            <div>

              <h2
                class="text-sm font-bold text-slate-800"
              >
                Product Files
              </h2>

              <p
                class="mt-0.5 text-[10px] text-slate-400"
              >
                Images and videos included with this product
              </p>

            </div>

            <span
              class="self-start bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary sm:self-auto"
            >
              {{ files.length }}
              file{{ files.length === 1 ? "" : "s" }}
            </span>

          </div>


          <!-- Files -->
          <div
            v-if="files.length"
            class="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >

            <div
              v-for="(file, index) in files"
              :key="getFileKey(file, index)"
              class="overflow-hidden border border-slate-200 bg-slate-50"
            >

              <!-- Media -->
              <div
                class="aspect-video overflow-hidden bg-slate-900"
              >

                <!-- Image -->
                <img
                  v-if="!isVideo(file) && getFileUrl(file)"
                  :src="getFileUrl(file)"
                  :alt="getFileName(file)"
                  class="h-full w-full object-contain"
                />

                <!-- Video -->
                <video
                  v-else-if="isVideo(file) && getFileUrl(file)"
                  :src="getFileUrl(file)"
                  controls
                  preload="metadata"
                  class="h-full w-full object-contain"
                ></video>

                <!-- Invalid / Missing URL -->
                <div
                  v-else
                  class="flex h-full w-full flex-col items-center justify-center text-slate-500"
                >
                  <i
                    :class="
                      isVideo(file)
                        ? 'fas fa-video'
                        : 'fas fa-image'
                    "
                    class="text-xl"
                  ></i>

                  <p class="mt-2 text-[9px]">
                    Media unavailable
                  </p>
                </div>

              </div>


              <!-- File Info -->
              <div
                class="flex items-center gap-2 border-t border-slate-200 bg-white px-3 py-2.5"
              >

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

                  <p
                    class="truncate text-[10px] font-semibold text-slate-700"
                  >
                    {{ getFileName(file) }}
                  </p>

                  <p
                    class="mt-0.5 text-[9px] text-slate-400"
                  >
                    {{
                      isVideo(file)
                        ? "Video"
                        : "Image"
                    }}
                  </p>

                </div>

              </div>

            </div>

          </div>


          <!-- No Files -->
          <div
            v-else
            class="px-5 py-12 text-center"
          >

            <div
              class="mx-auto flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-400"
            >
              <i class="fas fa-photo-video text-sm"></i>
            </div>

            <p
              class="mt-2 text-xs font-medium text-slate-500"
            >
              No product files
            </p>

            <p
              class="mt-0.5 text-[10px] text-slate-400"
            >
              This product does not have any additional media files.
            </p>

          </div>

        </div>


        <!-- ========================================================= -->
        <!-- Product Metadata -->
        <!-- ========================================================= -->
        <div
          class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
        >

          <!-- Created -->
          <div
            class="border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >

            <p
              class="text-[9px] font-bold uppercase tracking-wider text-slate-400"
            >
              Created
            </p>

            <p
              class="mt-1 text-xs font-medium text-slate-600"
            >
              {{ formatDate(product.createdAt) }}
            </p>

          </div>


          <!-- Updated -->
          <div
            class="border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >

            <p
              class="text-[9px] font-bold uppercase tracking-wider text-slate-400"
            >
              Last Updated
            </p>

            <p
              class="mt-1 text-xs font-medium text-slate-600"
            >
              {{ formatDate(product.updatedAt) }}
            </p>

          </div>

        </div>

      </div>


      <!-- ========================================================= -->
      <!-- Empty Product -->
      <!-- ========================================================= -->
      <div
        v-else-if="!loading"
        class="border border-slate-200 bg-white px-5 py-14 text-center shadow-sm"
      >

        <div
          class="mx-auto flex h-11 w-11 items-center justify-center bg-slate-100 text-slate-400"
        >
          <i class="fas fa-box-open text-base"></i>
        </div>

        <p
          class="mt-3 text-xs font-semibold text-slate-600"
        >
          Product not found
        </p>

        <p
          class="mt-1 text-[10px] text-slate-400"
        >
          The requested product could not be loaded.
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


    <!-- =========================================================== -->
    <!-- Edit Product Modal -->
    <!-- =========================================================== -->
    <EditProducts
      v-if="showEdit && product"
      :data="product"
      @close="showEdit = false"
      @saved="handleUpdated"
    />

  </div>
</template>


<script>
import Loading from "@/components/Loading.vue";
import EditProducts from "./EditProducts.vue";

export default {
  name: "ProductDetails",

  components: {
    Loading,
    EditProducts,
  },

  data() {
    return {
      product: null,
      loading: false,
      showEdit: false,
    };
  },

  computed: {
    /**
     * Product thumbnail.
     *
     * API response:
     *
     * "thumbnail": null
     *
     * It may also be an object when a thumbnail exists.
     */
    thumbnailUrl() {
      const thumbnail = this.product?.thumbnail;

      if (!thumbnail) {
        return null;
      }

      if (typeof thumbnail === "string") {
        return thumbnail;
      }

      return (
        thumbnail.url ||
        thumbnail.path ||
        thumbnail.src ||
        thumbnail.location ||
        null
      );
    },

    /**
     * Product files.
     *
     * API response:
     *
     * "files": []
     */
    files() {
      return Array.isArray(this.product?.files)
        ? this.product.files
        : [];
    },
  },

  methods: {
    /**
     * Load product.
     *
     * GET /products/{id}
     *
     * The API response is:
     *
     * {
     *   status: 1,
     *   data: {
     *     ...
     *   }
     * }
     */
    async fetchProduct() {
      const id = this.$route.params.id;

      if (!id) {
        this.showToast(
          "Product ID is missing",
          "error"
        );

        this.goBack();

        return;
      }

      this.loading = true;

      try {
        const response = await this.$apiGetById(
          "/products",
          id
        );

        /**
         * IMPORTANT:
         *
         * Your API returns:
         *
         * response.data = {
         *   id,
         *   name,
         *   ...
         * }
         *
         * Some API helpers may already return response.data.
         *
         * This handles both cases safely.
         */
        this.product =
          response?.data ||
          
          response ||
          null;

      } catch (e) {
        console.error(
          "Error loading product:",
          e
        );

        this.product = null;

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load product",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },


    /**
     * Get media URL.
     */
    getFileUrl(file) {
      if (!file) {
        return "";
      }

      if (typeof file === "string") {
        return file;
      }

      return (
        file.url ||
        file.path ||
        file.src ||
        file.location ||
        file.fileUrl ||
        ""
      );
    },


    /**
     * Get media filename.
     */
    getFileName(file) {
      if (!file) {
        return "Product file";
      }

      if (typeof file === "string") {
        const cleanUrl = file.split("?")[0];

        return (
          cleanUrl.split("/").pop() ||
          "Product file"
        );
      }

      return (
        file.name ||
        file.filename ||
        file.originalName ||
        file.originalname ||
        "Product file"
      );
    },


    /**
     * Generate unique file key.
     */
    getFileKey(file, index) {
      if (!file) {
        return `file-${index}`;
      }

      return (
        file.id ||
        file.url ||
        file.path ||
        `${index}-${this.getFileName(file)}`
      );
    },


    /**
     * Determine whether a file is a video.
     *
     * Supports:
     * - MIME type
     * - URL extension
     */
    isVideo(file) {
      if (!file) {
        return false;
      }

      const type = String(
        file.type ||
          file.mimeType ||
          file.mimetype ||
          ""
      ).toLowerCase();

      if (type.startsWith("video/")) {
        return true;
      }

      const url = this.getFileUrl(file);

      if (!url) {
        return false;
      }

      return /\.(mp4|webm|ogg|mov|avi|mkv|m4v)(\?.*)?$/i.test(
        url
      );
    },


    /**
     * Format product price.
     */
    formatPrice(value) {
      const number = Number(value);

      if (Number.isNaN(number)) {
        return "0.00";
      }

      return number.toFixed(2);
    },


    /**
     * Format date.
     */
    formatDate(value) {
      if (!value) {
        return "-";
      }

      const date = new Date(value);

      if (Number.isNaN(date.getTime())) {
        return "-";
      }

      return date.toLocaleString();
    },


    /**
     * Open edit modal.
     */
    openEdit() {
      if (!this.product) {
        return;
      }

      this.showEdit = true;
    },


    /**
     * After product update.
     */
    async handleUpdated() {
      this.showEdit = false;

      await this.fetchProduct();
    },


    /**
     * Go back.
     */
    goBack() {
      this.$router.back();
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


  mounted() {
    this.fetchProduct();
  },


  watch: {
    "$route.params.id"() {
      this.fetchProduct();
    },
  },
};
</script>
```
