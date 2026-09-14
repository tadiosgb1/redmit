<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 antialiased">
    <Header />

    <main class="pt-16">
      <section class="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 border-b border-slate-200">
        <div class="absolute -top-24 right-0 w-80 h-80 rounded-full bg-blue-200/40 blur-3xl"></div>
        <div class="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-100 text-blue-700 text-[11px] font-black uppercase tracking-[0.16em] shadow-sm">
              <i class="fas fa-compass text-[10px]"></i>
              Opportunities
            </span>
            <h1 class="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-950 leading-tight">
              Find your next <span class="text-blue-600">opportunity.</span>
            </h1>
            <p class="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Discover scholarships, fellowships, internships, jobs, freelance work, grants, competitions, events, research and study-abroad opportunities in one place.
            </p>
          </div>

          <div class="mt-10 flex flex-wrap gap-2">
            <span v-for="type in opportunityTypes" :key="type.value" class="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 border border-slate-200 text-xs font-bold text-slate-600">
              <i :class="type.icon" class="text-blue-500"></i>{{ type.label }}
            </span>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-6 py-14 lg:py-18">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.16em] text-blue-600">Latest listings</p>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-950 mt-2">Opportunities worth exploring</h2>
          </div>
          <p v-if="pagination.total" class="text-sm text-slate-500">{{ pagination.total }} opportunities available</p>
        </div>

        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="h-80 rounded-2xl bg-white border border-slate-200 animate-pulse"></div>
        </div>

        <div v-else-if="!opportunities.length" class="rounded-3xl bg-white border border-slate-200 p-12 text-center">
          <div class="mx-auto w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <i class="fas fa-search"></i>
          </div>
          <h3 class="mt-5 text-lg font-black text-slate-900">No opportunities found</h3>
          <p class="mt-2 text-sm text-slate-500">Check back soon for new opportunities.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article v-for="opportunity in opportunities" :key="opportunity.id" class="group bg-white rounded-2xl border border-slate-200 p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 flex flex-col">
            <div class="flex items-start justify-between gap-4">
              <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <i :class="typeIcon(opportunity.type)"></i>
              </div>
              <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider">
                {{ typeLabel(opportunity.type) }}
              </span>
            </div>

            <h3 class="mt-5 text-lg font-black text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
              {{ opportunity.title }}
            </h3>
            <p class="mt-2 text-sm font-semibold text-slate-500">{{ opportunity.organization }}</p>

            <div class="mt-4 space-y-2.5 text-xs text-slate-500">
              <p v-if="opportunity.location" class="flex items-center gap-2"><i class="fas fa-map-marker-alt w-4 text-slate-400"></i>{{ opportunity.location }}</p>
              <p v-if="opportunity.deadline" class="flex items-center gap-2" :class="isExpired(opportunity.deadline) ? 'text-rose-600' : 'text-slate-500'">
                <i class="fas fa-calendar-alt w-4"></i>
                {{ isExpired(opportunity.deadline) ? 'Deadline passed' : `Deadline: ${formatDate(opportunity.deadline)}` }}
              </p>
            </div>

            <p class="mt-5 text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">{{ opportunity.description }}</p>

            <div class="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
              <span class="text-[11px] font-bold text-slate-400">{{ opportunity.benefits || 'See listing for details' }}</span>
              <a v-if="opportunity.applicationUrl" :href="opportunity.applicationUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0">
                Apply <i class="fas fa-external-link-alt text-[9px]"></i>
              </a>
            </div>
          </article>
        </div>

        <div v-if="pagination.totalPages > 1" class="mt-10 flex items-center justify-center gap-2">
          <button type="button" :disabled="page <= 1" @click="changePage(page - 1)" class="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-300 hover:text-blue-600 transition-colors">
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          <span class="px-4 text-sm font-bold text-slate-600">Page {{ page }} of {{ pagination.totalPages }}</span>
          <button type="button" :disabled="page >= pagination.totalPages" @click="changePage(page + 1)" class="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-blue-300 hover:text-blue-600 transition-colors">
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';

export default {
  name: 'OpportunitiesPage',
  components: { Header, Footer },
  data() {
    return {
      opportunities: [],
      loading: false,
      page: Number(this.$route.query.page) || 1,
      pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
      opportunityTypes: [
        { value: 'OBS', label: 'Jobs & Freelancing', icon: 'fas fa-briefcase' },
        { value: 'SCHOLARSHIP', label: 'Scholarships & Fellowships', icon: 'fas fa-graduation-cap' },
        { value: 'STUDY_ABROAD', label: 'Study Abroad', icon: 'fas fa-globe-americas' },
        { value: 'GRANT', label: 'Grants & Funding', icon: 'fas fa-hand-holding-usd' },
        { value: 'COMPETITION', label: 'Competitions & Challenges', icon: 'fas fa-trophy' },
        { value: 'INTERNSHIP', label: 'Internships', icon: 'fas fa-laptop-code' },
        { value: 'EVENT', label: 'Events & Conferences', icon: 'fas fa-calendar-alt' },
        { value: 'RESEARCH', label: 'Research Opportunities', icon: 'fas fa-flask' },
        { value: 'REMOTE_WORK', label: 'Remote Work', icon: 'fas fa-home' },
      ],
    };
  },
  mounted() {
    this.fetchOpportunities();
  },
  watch: {
    '$route.query.page'(value) {
      const nextPage = Number(value) || 1;
      if (nextPage !== this.page) {
        this.page = nextPage;
        this.fetchOpportunities();
      }
    },
  },
  methods: {
    async fetchOpportunities() {
      this.loading = true;
      try {
        const response = await this.$apiGet(`/opportunities?page=${this.page}&limit=10&sortBy=createdAt&order=desc`);
        this.opportunities = Array.isArray(response?.data) ? response.data : [];
        this.pagination = response?.pagination || { total: 0, page: this.page, limit: 10, totalPages: 1 };
      } catch (error) {
        console.error('Failed to load opportunities:', error);
        this.opportunities = [];
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      if (page < 1 || page > this.pagination.totalPages) return;
      this.$router.push({ path: '/opportunities', query: { page: String(page), limit: '10', sortBy: 'createdAt', order: 'desc' } });
    },
    typeLabel(type) {
      return this.opportunityTypes.find(item => item.value === type)?.label || String(type || 'Opportunity').replace(/_/g, ' ');
    },
    typeIcon(type) {
      return this.opportunityTypes.find(item => item.value === type)?.icon || 'fas fa-compass';
    },
    formatDate(date) {
      return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(date));
    },
    isExpired(date) {
      return new Date(date).getTime() < Date.now();
    },
  },
};
</script>
