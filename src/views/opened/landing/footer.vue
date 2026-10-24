<template>
  <footer class="border-t border-slate-200 bg-slate-950 px-5 py-8 text-white sm:px-6 sm:py-10">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-8 sm:grid-cols-[1.3fr_1fr] sm:items-start">
        <div class="max-w-sm">
          <router-link to="/" class="inline-flex items-center gap-3" aria-label="Redmit home">
            <img src="@/assets/img/logo.jpg" alt="Redmit" class="h-8 w-auto object-contain" />
          </router-link>
          <p class="mt-3 text-sm leading-6 text-slate-400">Digital services, made simpler.</p>
        </div>
        <div class="sm:justify-self-end">
          <h2 class="text-xs font-semibold uppercase tracking-wider text-slate-300">Explore Redmit</h2>
          <nav class="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-400" aria-label="Footer navigation">
            <router-link to="/" class="transition hover:text-white">Home</router-link>
            <router-link to="/products" class="transition hover:text-white">Products</router-link>
            <router-link to="/growth" class="transition hover:text-white">Growth</router-link>
            <router-link to="/opportunities" class="transition hover:text-white">Opportunities</router-link>
            <router-link to="/access" class="transition hover:text-white">Pay for Me</router-link>
            <router-link to="/contact-us" class="transition hover:text-white">Contact</router-link>
          </nav>
        </div>
      </div>
      <div class="mt-7 flex flex-col gap-2 border-t border-slate-800 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} Redmit. All rights reserved.</p>
        <p>Built to make digital access easier.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
};
</script>
