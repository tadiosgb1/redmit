<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 antialiased landing-page">

    <!-- Navbar -->
    <Header />

    <!-- Landing sections: each section reveals as it enters the viewport -->
    <HeroSection class="landing-section" />
    <DigitalProductsSection class="landing-section" />
    <DigitalAssetsSection class="landing-section" />
    <PayForMeSection class="landing-section" />
    <DigitalGrowthSection class="landing-section" />
    <BgSection class="landing-section" />
    <WhoCanJoinSection class="landing-section" />
    <NewsPreviewSection class="landing-section" />
    <FaqSection class="landing-section" />
    <CtaSection class="landing-section" />

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script>
import Header                 from './header.vue';
import Footer                 from './footer.vue';
import HeroSection            from './sections/HeroSection.vue';
import DigitalProductsSection from './sections/DigitalProductsSection.vue';
import DigitalAssetsSection   from './sections/DigitalAssetsSection.vue';
import PayForMeSection        from './sections/PayForMeSection.vue';
import DigitalGrowthSection   from './sections/DigitalGrowthSection.vue';
import BgSection              from './sections/BgSection.vue';
import WhoCanJoinSection      from './sections/WhoCanJoinSection.vue';
import NewsPreviewSection     from './sections/NewsPreviewSection.vue';
import FaqSection             from './sections/FaqSection.vue';
import CtaSection             from './sections/CtaSection.vue';

export default {
  name: 'HomePage',
  components: {
    Header,
    Footer,
    HeroSection,
    DigitalProductsSection,
    DigitalAssetsSection,
    PayForMeSection,
    DigitalGrowthSection,
    BgSection,
    WhoCanJoinSection,
    NewsPreviewSection,
    FaqSection,
    CtaSection,
  },
  data() {
    return {
      sectionObserver: null,
    };
  },
  mounted() {
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
};
</script>

<style>
/* Scroll reveal: sections animate into view as the user scrolls. */
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

/* Stagger the content inside each section so it appears one-by-one. */
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
