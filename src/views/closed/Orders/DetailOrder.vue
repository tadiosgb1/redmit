<template>
  <div class="p-5">
    <div class="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 class="text-base font-bold text-slate-800">Order Details</h1>
        <p class="text-[11px] text-slate-400">View order information and items.</p>
      </div>
      <div class="flex gap-2">
        <button @click="editOrder" class="rounded-md bg-primary px-3 py-2 text-xs font-semibold text-white">Edit</button>
        <button @click="$router.back()" class="rounded-md border border-slate-200 px-3 py-2 text-xs">Back</button>
      </div>
    </div>

    <div v-if="loading" class="py-10 text-center text-xs text-slate-400">Loading order...</div>

    <div v-else-if="order" class="max-w-3xl border border-slate-200 bg-white p-5">
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div><p class="text-[10px] uppercase text-slate-400">Order ID</p><p class="mt-1 break-all text-xs font-semibold">{{ order.id }}</p></div>
        <div><p class="text-[10px] uppercase text-slate-400">Currency</p><p class="mt-1 text-xs font-bold text-primary">{{ order.currency }}</p></div>
        <div><p class="text-[10px] uppercase text-slate-400">User ID</p><p class="mt-1 break-all text-xs font-semibold">{{ order.user_id || order.userId || order.user?.id || '-' }}</p></div>
      </div>

      <div class="mt-6 border-t border-slate-100 pt-4">
        <h2 class="mb-3 text-xs font-bold text-slate-700">Items</h2>
        <div v-for="(item, index) in order.items || []" :key="index" class="mb-2 grid grid-cols-1 gap-2 border border-slate-100 p-3 sm:grid-cols-3">
          <div><p class="text-[9px] uppercase text-slate-400">Type</p><p class="text-xs font-semibold">{{ item.type }}</p></div>
          <div><p class="text-[9px] uppercase text-slate-400">Item ID</p><p class="break-all text-xs">{{ item.id }}</p></div>
          <div><p class="text-[9px] uppercase text-slate-400">Quantity</p><p class="text-xs font-semibold">{{ item.quantity }}</p></div>
        </div>
      </div>
    </div>

    <div v-else class="py-10 text-center text-xs text-secondary">Order not found.</div>
  </div>
</template>

<script>
export default {
  name: 'DetailOrder',
  props: { id: { type: String, required: true } },
  data() {
    return { order: null, loading: true };
  },
  async created() {
    try {
      const response = await this.$apiGet(`/orders/${this.id}`);
      this.order = response?.data || response;
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    editOrder() {
      this.$router.push({ name: 'Orders-edit', params: { id: this.id } });
    },
  },
};
</script>
