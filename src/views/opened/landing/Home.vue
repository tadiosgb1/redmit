<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 antialiased landing-page">
    <Header />

    <HeroSection class="landing-section" />
    <DigitalProductsSection
      class="landing-section"
      :products="products"
      :categories="categories"
      :selected-category-id="selectedCategoryId"
      :loading="productsLoading || categoriesLoading"
      @select-category="handleCategoryChange"
    />
    <DigitalAssetsSection
      class="landing-section"
      :assets="assets"
      :loading="assetsLoading"
    />

    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
import HeroSection from './sections/HeroSection.vue';
import DigitalProductsSection from './sections/DigitalProductsSection.vue';
import DigitalAssetsSection from './sections/DigitalAssetsSection.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    Footer,
    HeroSection,
    DigitalProductsSection,
    DigitalAssetsSection,
  },
  data() {
    return {
      products: [],
      assets: [],
      categories: [],
      selectedCategoryId: null,
      productsLoading: false,
      assetsLoading: false,
      categoriesLoading: false,
      sectionObserver: null,
    };
  },
  async mounted() {
    await Promise.all([this.fetchCategories(), this.fetchProducts(), this.fetchAssets()]);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.landing-section').forEach((section) => {
        section.classList.add('is-visible');
      });
      return;
    }

    this.sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
      },
    );

    document.querySelectorAll('.landing-section').forEach((section) => {
      this.sectionObserver.observe(section);
    });
  },
  beforeUnmount() {
    if (this.sectionObserver) {
      this.sectionObserver.disconnect();
      this.sectionObserver = null;
    }
  },
  methods: {
    async fetchCategories() {
      this.categoriesLoading = true;
      try {
        const response = await this.$apiGet('/categories');
        this.categories = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load landing page product categories:', error);
        this.categories = [];
      } finally {
        this.categoriesLoading = false;
      }
    },
    async fetchProducts() {
      this.productsLoading = true;
      try {
        // "All" deliberately sends no category_id query parameter.
        const response = await this.$apiGet('/products');
        this.products = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load landing page products:', error);
        this.products = [];
      } finally {
        this.productsLoading = false;
      }
    },
    async handleCategoryChange(categoryId) {
      this.selectedCategoryId = categoryId || null;
      this.productsLoading = true;

      try {
        // Only a selected server category sends category_id. "All" uses /products with no query.
        const response = this.selectedCategoryId
          ? await this.$apiGet('/products', { category_id: this.selectedCategoryId })
          : await this.$apiGet('/products');

        this.products = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load products for selected category:', error);
        this.products = [];
      } finally {
        this.productsLoading = false;
      }
    },
    async fetchAssets() {
      this.assetsLoading = true;
      try {
        const response = await this.$apiGet('/assets');
        this.assets = Array.isArray(response?.data) ? response.data : [];
      } catch (error) {
        console.error('Failed to load landing page assets:', error);
        this.assets = [];
      } finally {
        this.assetsLoading = false;
      }
    },
  },
};
</script>

<style>
.landing-page .landing-section {
  opacity: 0;
  transform: translate3d(0, 48px, 0);
  transition:
    opacity 700ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;
}

.landing-page .landing-section.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.landing-page .landing-section.is-visible > * {
  animation: landing-item-in 650ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.landing-page .landing-section.is-visible > *:nth-child(1) { animation-delay: 80ms; }
.landing-page .landing-section.is-visible > *:nth-child(2) { animation-delay: 160ms; }
.landing-page .landing-section.is-visible > *:nth-child(3) { animation-delay: 240ms; }
.landing-page .landing-section.is-visible > *:nth-child(4) { animation-delay: 320ms; }
.landing-page .landing-section.is-visible > *:nth-child(5) { animation-delay: 400ms; }
.landing-page .landing-section.is-visible > *:nth-child(6) { animation-delay: 480ms; }
.landing-page .landing-section.is-visible > *:nth-child(n+7) { animation-delay: 560ms; }

@keyframes landing-item-in {
  from {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing-page .landing-section,
  .landing-page .landing-section.is-visible > * {
    opacity: 1;
    transform: none;
    animation: none;
    transition: none;
  }
}
</style>
