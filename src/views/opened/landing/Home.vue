<template>
  <div class="min-h-screen bg-white font-sans text-gray-800 antialiased">

    <!-- Navbar -->
    <Header />

    <!-- 1. Hero -->
    <HeroSection />

    <!-- 2. Digital Products marketplace -->
    <DigitalProductsSection />

    <!-- 3. Digital Assets (social accounts) -->
    <DigitalAssetsSection />

    <!-- 4. Pay For Me -->
    <PayForMeSection />

    <!-- 5. Digital Growth (ads + monetization) -->
    <DigitalGrowthSection />

    <!-- 6. About / platform pillars -->
    <BgSection />

    <!-- 7. Who uses Redmit -->
    <WhoCanJoinSection />

    <!-- 8. News preview -->
    <NewsPreviewSection />

    <!-- 9. FAQ -->
    <FaqSection />

    <!-- 10. CTA -->
    <CtaSection />

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script>
import Header                from './header.vue';
import Footer                from './footer.vue';
import HeroSection           from './sections/HeroSection.vue';
import DigitalProductsSection from './sections/DigitalProductsSection.vue';
import DigitalAssetsSection  from './sections/DigitalAssetsSection.vue';
import PayForMeSection       from './sections/PayForMeSection.vue';
import DigitalGrowthSection  from './sections/DigitalGrowthSection.vue';
import BgSection             from './sections/BgSection.vue';
import WhoCanJoinSection     from './sections/WhoCanJoinSection.vue';
import NewsPreviewSection    from './sections/NewsPreviewSection.vue';
import FaqSection            from './sections/FaqSection.vue';
import CtaSection            from './sections/CtaSection.vue';

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
};
</script>
