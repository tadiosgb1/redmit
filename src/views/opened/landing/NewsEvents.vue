<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    <Header />

    <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-100">
      <div class="absolute -top-32 -right-20 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none"></div>
      <div class="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none"></div>
      <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-[0.18em] shadow-sm">
            <i class="fas fa-newspaper text-[10px]"></i> News & Events
          </span>
          <h1 class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 leading-tight tracking-tight">
            What's happening <span class="text-blue-600">at Redmit.</span>
          </h1>
          <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Follow the latest updates, stories, announcements and events from the Redmit community.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 6" :key="n" class="rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
            <div class="h-44 bg-slate-100"></div>
            <div class="p-6 space-y-3"><div class="h-3 bg-slate-100 rounded-full w-1/3"></div><div class="h-4 bg-slate-100 rounded-full w-full"></div><div class="h-4 bg-slate-100 rounded-full w-4/5"></div><div class="h-3 bg-slate-100 rounded-full w-2/3"></div></div>
          </div>
        </div>

        <div v-else-if="filteredPosts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="post in filteredPosts" :key="post.id" class="bg-white rounded-2xl border border-slate-200/80 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden">
            <div class="h-48 bg-slate-100 flex items-center justify-center overflow-hidden relative">
              <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <i v-else class="fas fa-newspaper text-4xl text-primary/30"></i>
              <span v-if="post.category" class="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider bg-white/90 backdrop-blur-md text-primary border border-primary/20 shadow-sm">{{ post.category }}</span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-center justify-between text-[11px] text-gray-400 font-semibold mb-3">
                <span class="uppercase tracking-wider">{{ formatDate(post.publishedDate) }}</span>
                <span v-if="post.author?.fullName" class="flex items-center gap-1"><i class="fas fa-user-circle text-xs"></i> {{ post.author.fullName }}</span>
              </div>
              <h3 class="font-black text-slate-800 text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-300">{{ post.title }}</h3>
              <p class="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1 line-clamp-3">{{ post.summary || post.content }}</p>
              <router-link :to="`/news/${post.slug || post.id}`" class="mt-6 inline-flex items-center gap-2 text-primary hover:text-primary-dark text-xs font-bold transition-colors">Read More <i class="fas fa-arrow-right text-[10px]"></i></router-link>
            </div>
          </article>
        </div>

        <div v-else class="text-center py-32">
          <div class="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-slate-100"><i class="fas fa-newspaper text-2xl text-primary/40"></i></div>
          <p class="text-slate-500 font-medium text-sm">No news or updates available yet. Check back soon.</p>
        </div>

        <div v-if="totalPages > 1" class="mt-14 flex items-center justify-center gap-3">
          <button @click="prevPage" :disabled="currentPage === 1" class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary disabled:opacity-40 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm"><i class="fas fa-chevron-left text-xs"></i></button>
          <span class="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-xl">Page {{ currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-primary disabled:opacity-40 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm"><i class="fas fa-chevron-right text-xs"></i></button>
        </div>
      </div>
    </section>

    <Footer />
    <login-modal v-if="showLogin" @close="showLogin = false" @switch-to-register="showLogin = false; showRegister = true" />
    <register-modal v-if="showRegister" @close="showRegister = false" @switch-to-login="showRegister = false; showLogin = true" />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
import LoginModal from '@/components/AuthModal.vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default {
  name: 'NewsEventsPage',
  components: { Header, Footer, LoginModal, RegisterModal },
  data() {
    return { showLogin: false, showRegister: false, loading: true, posts: [], currentPage: 1, totalPages: 1, perPage: 9 };
  },
  computed: { filteredPosts() { return this.posts; } },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const response = await this.$apiGet(`/News?page=${this.currentPage}&limit=${this.perPage}`);
        if (response && response.status === 1) {
          this.posts = response.data ?? [];
          this.totalPages = response.totalPages ?? 1;
          this.currentPage = response.currentPage ?? 1;
        } else this.posts = [];
      } catch (error) {
        console.error('Failed to fetch news posts:', error);
        this.posts = [];
      } finally { this.loading = false; }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },
    prevPage() { if (this.currentPage > 1) { this.currentPage--; this.fetchPosts(); } },
    nextPage() { if (this.currentPage < this.totalPages) { this.currentPage++; this.fetchPosts(); } },
  },
  mounted() { this.fetchPosts(); },
};
</script>
