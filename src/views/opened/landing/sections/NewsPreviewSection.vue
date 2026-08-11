<template>
  <section class="relative py-24 bg-white overflow-hidden">
    <!-- Ambient glow -->
    <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/4 rounded-full blur-[80px] pointer-events-none"></div>

    <div class="relative max-w-7xl mx-auto px-6">

      <!-- Section header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
        <div class="reveal-up">
          <span class="text-xs font-bold tracking-[0.2em] text-primary uppercase">News &amp; Updates</span>
          <h2 class="text-4xl font-black text-gray-900 mt-3 mb-2 leading-tight">
            Latest from Redmit
          </h2>
          <p class="text-gray-500 text-sm max-w-lg">
            Platform updates, new features, and stories from Ethiopia's digital marketplace.
          </p>
        </div>
        <router-link to="/news-events"
          class="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary-lighter border border-primary/20
                 hover:bg-primary hover:border-primary text-primary hover:text-white
                 font-bold text-xs rounded-xl transition-all duration-300 shrink-0 reveal-up">
          View All News
          <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform duration-300"></i>
        </router-link>
      </div>

      <!-- Skeleton loaders -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 3" :key="n"
          class="rounded-2xl border border-green-100 overflow-hidden animate-pulse">
          <div class="h-48 bg-green-50"></div>
          <div class="p-6 space-y-3">
            <div class="h-3 bg-gray-100 rounded-full w-1/3"></div>
            <div class="h-4 bg-gray-100 rounded-full w-full"></div>
            <div class="h-4 bg-gray-100 rounded-full w-4/5"></div>
            <div class="h-3 bg-gray-100 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>

      <!-- Posts grid -->
      <div v-else-if="posts.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="post in posts" :key="post.id"
          class="reveal-up bg-white rounded-2xl border border-green-100
                 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/8
                 hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden">

          <!-- Thumbnail -->
          <div class="h-48 bg-green-50 flex items-center justify-center overflow-hidden relative">
            <img v-if="post.image" :src="post.image" :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <i v-else class="fas fa-newspaper text-4xl text-primary/25"></i>
            <span v-if="post.category"
              class="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold rounded-full uppercase
                     tracking-widest bg-primary-lighter text-primary border border-primary/20">
              {{ post.category }}
            </span>
          </div>

          <!-- Body -->
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center justify-between text-[11px] text-gray-400 font-semibold mb-3">
              <span class="uppercase tracking-wider">{{ formatDate(post.publishedDate) }}</span>
              <span v-if="post.author?.fullName" class="flex items-center gap-1">
                <i class="fas fa-user-circle text-[10px]"></i> {{ post.author.fullName }}
              </span>
            </div>

            <h3 class="font-black text-gray-800 text-base leading-snug mb-3
                       group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {{ post.title }}
            </h3>

            <p class="text-xs text-gray-500 leading-relaxed flex-1 line-clamp-3">
              {{ post.summary || post.content }}
            </p>

            <router-link :to="`/news/${post.slug || post.id}`"
              class="mt-5 inline-flex items-center gap-1.5 text-primary hover:text-primary-dark
                     text-xs font-bold transition-colors">
              Read More <i class="fas fa-arrow-right text-[10px]"></i>
            </router-link>
          </div>
        </article>
      </div>

      <!-- Empty state -->
      <div v-else class="text-center py-20">
        <div class="w-14 h-14 bg-green-50 rounded-2xl border border-green-100
                    flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-newspaper text-xl text-primary/30"></i>
        </div>
        <p class="text-gray-400 text-sm font-medium">No news available yet. Check back soon.</p>
      </div>

      <!-- "See all" link below cards — always visible when there are posts -->
      <div v-if="posts.length > 0" class="mt-12 text-center">
        <router-link to="/news-events"
          class="group inline-flex items-center gap-3 px-8 py-3.5 bg-primary hover:bg-primary-dark
                 text-white font-bold rounded-2xl shadow-lg shadow-primary/20
                 hover:-translate-y-0.5 transition-all duration-300 text-sm">
          See All News &amp; Events
          <i class="fas fa-arrow-right text-xs group-hover:translate-x-1.5 transition-transform duration-300"></i>
        </router-link>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'NewsPreviewSection',

  data() {
    return {
      loading: true,
      posts:   [],
    };
  },

  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        // Fetch only 3 posts for the preview
        const response = await this.$apiGet('/News?page=1&limit=3');
        if (response && response.status === 1) {
          this.posts = (response.data ?? []).slice(0, 3);
        } else {
          this.posts = [];
        }
      } catch (error) {
        console.error('NewsPreviewSection fetch error:', error);
        this.posts = [];
      } finally {
        this.loading = false;
      }
    },

    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric',
      });
    },
  },

  mounted() {
    this.fetchPosts();
  },
};
</script>
