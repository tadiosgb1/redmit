<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div
      class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden"
    >
      <!-- Header (sticky) -->
      <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
        <h2 class="text-lg font-semibold text-gray-800">Add News</h2>
        <button
          type="button"
          @click="$emit('close')"
          class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <i class="fas fa-times text-sm"></i>
        </button>
      </div>

      <!-- Body (scrollable) -->
      <form @submit.prevent="submitForm" class="flex flex-col flex-1 min-h-0">
        <div class="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block mb-1.5 text-sm font-medium text-gray-700">Title</label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="Enter news title"
                class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700">Slug</label>
              <input
                v-model="form.slug"
                type="text"
                required
                placeholder="url-friendly-slug"
                class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div>
              <label class="block mb-1.5 text-sm font-medium text-gray-700">Category</label>
              <input
                v-model="form.category"
                type="text"
                required
                placeholder="e.g. Announcement"
                class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>

            <div class="sm:col-span-2">
              <label class="block mb-1.5 text-sm font-medium text-gray-700">Summary</label>
              <textarea
                v-model="form.summary"
                required
                rows="2"
                placeholder="Short summary of the news"
                class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-y min-h-[60px]"
              ></textarea>
            </div>

            <div class="sm:col-span-2">
              <label class="block mb-1.5 text-sm font-medium text-gray-700">Content</label>
              <textarea
                v-model="form.content"
                required
                rows="6"
                placeholder="Write the full news content..."
                class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition resize-y min-h-[120px]"
              ></textarea>
            </div>

            <div class="sm:col-span-2">
              <label class="block mb-1.5 text-sm font-medium text-gray-700">Image URL</label>
              <input
                v-model="form.image"
                type="text"
                required
                placeholder="https://example.com/image.jpg"
                class="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              />
            </div>
          </div>
        </div>

        <!-- Footer (sticky) -->
        <div class="flex justify-end gap-3 px-5 py-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="submitting"
            class="px-5 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            <i v-if="submitting" class="fas fa-spinner animate-spin text-xs"></i>
            {{ submitting ? 'Saving...' : 'Add News' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddNews',
  props: {
    data: { type: Object, default: null },
  },
  data() {
    return {
      submitting: false,
      form: {
        title: this.data?.title || '',
        slug: this.data?.slug || '',
        summary: this.data?.summary || '',
        content: this.data?.content || '',
        category: this.data?.category || '',
        image: this.data?.image || '',
      },
    };
  },
  methods: {
    async submitForm() {
      this.submitting = true;
      try {
        const res = await this.$apiPost('/news', this.form);
        if (res) {
          this.$root.$refs.toast.showToast('Added successfully', 'success');
        }
        this.$emit('saved');
        this.$emit('close');
      } catch (e) {
        console.error(e);
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>