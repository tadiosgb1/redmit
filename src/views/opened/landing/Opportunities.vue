<template>
  <div class="min-h-screen bg-white font-sans text-slate-800 antialiased">
    <Header />
    <main class="pt-16">
      <section class="border-b border-slate-200 bg-slate-50">
        <div class="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p class="text-xs font-bold uppercase tracking-widest text-blue-700">Opportunities</p>
          <h1 class="mt-3 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl">Find opportunities for your next step</h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-slate-600">Explore scholarships, jobs, internships, grants, fellowships, events and more—all in one place.</p>
          <div class="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-5 text-sm text-slate-600">
            <span v-for="type in opportunityTypes" :key="type.value" class="inline-flex items-center gap-2"><i :class="type.icon" class="text-blue-700"></i>{{ type.label }}</span>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-6 py-12 sm:py-14">
        <div class="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div><h2 class="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Latest opportunities</h2><p class="mt-2 text-sm leading-6 text-slate-600">Review the details and deadlines, then follow the application link to learn more.</p></div>
          <p v-if="pagination.total" class="text-sm text-slate-500">{{ pagination.total }} opportunities available</p>
        </div>

        <div v-if="loading" class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 6" :key="n" class="h-72 animate-pulse border border-slate-200 bg-slate-50"></div>
        </div>

        <div v-else-if="!opportunities.length" class="border border-slate-200 bg-white px-6 py-14 text-center">
          <i class="fas fa-compass text-xl text-slate-400"></i>
          <h3 class="mt-3 font-bold text-slate-900">No opportunities available right now</h3>
          <p class="mt-2 text-sm text-slate-500">Please check back soon for new listings.</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="opportunity in opportunities" :key="opportunity.id" class="flex flex-col border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-md">
            <div class="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700"><i :class="typeIcon(opportunity.type)"></i></div>
              <span class="text-xs font-semibold leading-5 text-slate-500">{{ typeLabel(opportunity.type) }}</span>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <h3 class="text-base font-bold leading-snug text-slate-950">{{ opportunity.title }}</h3>
              <p class="mt-2 text-sm font-medium text-slate-600">{{ opportunity.organization }}</p>
              <div class="mt-4 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                <p v-if="opportunity.location" class="flex items-start gap-2"><i class="fas fa-map-marker-alt mt-0.5 w-4 text-slate-400"></i><span>{{ opportunity.location }}</span></p>
                <p v-if="opportunity.deadline" class="flex items-start gap-2" :class="isExpired(opportunity.deadline) ? 'text-rose-600' : 'text-slate-500'"><i class="fas fa-calendar-alt mt-0.5 w-4"></i><span>{{ isExpired(opportunity.deadline) ? 'Deadline passed' : 'Deadline: ' + formatDate(opportunity.deadline) }}</span></p>
              </div>
              <p class="mt-4 flex-1 text-sm leading-6 text-slate-600">{{ opportunity.description }}</p>
              <div class="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4">
                <p class="text-xs leading-5 text-slate-500">{{ opportunity.benefits || 'See the original listing for benefits and eligibility details.' }}</p>
                <a v-if="opportunity.applicationUrl" :href="opportunity.applicationUrl" target="_blank" rel="noopener noreferrer" class="inline-flex w-full items-center justify-center gap-2 bg-blue-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-800">View application <i class="fas fa-external-link-alt text-[10px]"></i></a>
                <span v-else class="text-xs text-slate-400">Application link not provided</span>
              </div>
            </div>
          </article>
        </div>

        <div v-if="pagination.totalPages > 1" class="mt-9 flex items-center justify-center gap-3">
          <button type="button" :disabled="page <= 1" @click="changePage(page - 1)" aria-label="Previous page" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:border-blue-300 hover:text-blue-700"><i class="fas fa-chevron-left text-xs"></i></button>
          <span class="text-sm font-semibold text-slate-600">Page {{ page }} of {{ pagination.totalPages }}</span>
          <button type="button" :disabled="page >= pagination.totalPages" @click="changePage(page + 1)" aria-label="Next page" class="h-10 w-10 border border-slate-200 bg-white text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:border-blue-300 hover:text-blue-700"><i class="fas fa-chevron-right text-xs"></i></button>
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
