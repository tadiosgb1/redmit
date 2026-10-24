<template>
  <footer class="border-t border-slate-200 bg-slate-950 px-4 py-4 text-white sm:px-6 sm:py-5">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
      <router-link to="/" class="flex items-center gap-3" aria-label="Redmit home">
        <img src="@/assets/img/logo.jpg" alt="Redmit" class="h-7 w-auto object-contain" />
        <span class="text-xs text-slate-400">Digital services, made simpler.</span>
      </router-link>
      <nav class="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-400" aria-label="Footer navigation">
        <router-link to="/" class="transition hover:text-white">Home</router-link>
        <router-link to="/products" class="transition hover:text-white">Products</router-link>
        <router-link to="/growth" class="transition hover:text-white">Growth</router-link>
        <router-link to="/contact-us" class="transition hover:text-white">Contact</router-link>
      </nav>
      <p class="text-center text-[11px] text-slate-500 sm:text-right">© {{ new Date().getFullYear() }} Redmit</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
};
</script>
