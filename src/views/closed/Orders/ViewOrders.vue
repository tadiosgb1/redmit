<template>
  <div class="min-h-screen bg-slate-50 p-4 text-slate-700 sm:p-5">
    <div class="mx-auto max-w-[1600px]">
      <div class="mb-4 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 class="text-base font-bold text-slate-800">Orders</h1><p class="mt-0.5 text-[11px] text-slate-400">Manage customer orders and digital items.</p></div>
        <button @click="addOrder" class="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3.5 text-xs font-semibold text-white"><i class="fas fa-plus text-[10px]"></i> Add Order</button>
      </div>
      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="border-b border-slate-200 bg-slate-50">
              <tr class="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                <th class="px-4 py-2.5 text-left">#</th><th class="px-4 py-2.5 text-left">Order</th><th class="px-4 py-2.5 text-left">User</th><th class="px-4 py-2.5 text-left">Currency</th><th class="px-4 py-2.5 text-left">Items</th><th class="px-4 py-2.5 text-left">Status</th><th class="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(order,index) in orders" :key="order.id || index" class="hover:bg-slate-50">
                <td class="px-4 py-3 text-[11px] text-slate-400">{{ index + 1 }}</td>
                <td class="px-4 py-3"><p class="text-xs font-semibold text-slate-800">{{ order.orderNumber || order.id || 'Order' }}</p><p class="text-[10px] text-slate-400">{{ formatDate(order.createdAt) }}</p></td>
                <td class="px-4 py-3 text-xs text-slate-600">{{ order.user_id || order.userId || order.buyerId || order.user?.id || '-' }}</td>
                <td class="px-4 py-3 text-xs font-bold text-primary">{{ order.currency || 'USD' }}</td>
                <td class="px-4 py-3 text-xs text-slate-600">{{ order.items?.length || 0 }}</td>
                <td class="px-4 py-3"><span class="inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase" :class="statusClass(order.status)">{{ order.status || 'PENDING' }}</span></td>
                <td class="px-4 py-3 text-right">
                  <div class="flex justify-end gap-1">
                    <button @click="viewOrder(order)" class="flex h-7 w-7 items-center justify-center rounded-md text-primary hover:bg-primary/10" title="View"><i class="fas fa-eye text-[10px]"></i></button>
                    <button @click="editOrder(order)" class="flex h-7 w-7 items-center justify-center rounded-md text-secondary hover:bg-secondary/10" title="Edit"><i class="fas fa-edit text-[10px]"></i></button>
                    <button v-if="canCancel(order)" @click="cancelOrder(order)" :disabled="cancellingId === order.id" class="flex h-7 items-center justify-center gap-1 rounded-md bg-red-50 px-2.5 text-[10px] font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50" title="Cancel"><i class="fas fa-times"></i> {{ cancellingId === order.id ? 'Cancelling' : 'Cancel' }}</button>
                    <button v-if="canPay(order)" @click="payOrder(order)" class="flex h-7 items-center justify-center gap-1 rounded-md bg-primary px-2.5 text-[10px] font-semibold text-white hover:opacity-90" title="Pay"><i class="fas fa-credit-card"></i> Pay</button>
                  </div>
                </td>
              </tr>
              <tr v-if="!loading && orders.length === 0"><td colspan="7" class="px-4 py-12 text-center text-xs text-slate-400">No orders found.</td></tr>
              <tr v-if="loading"><td colspan="7" class="px-4 py-12 text-center text-xs text-slate-400">Loading orders...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewOrders',
  data() { return { orders: [], loading: false, cancellingId: null }; },
  created() { this.fetchOrders(); },
  methods: {
    async fetchOrders() {
      this.loading = true;
      try {
        const response = await this.$apiGet('/orders');
        this.orders = response?.orders || response?.data || response || [];
      } catch (error) { console.error('Error loading orders:', error); this.orders = []; }
      finally { this.loading = false; }
    },
    addOrder() { this.$router.push({ name: 'Orders-add' }); },
    viewOrder(order) { if (order?.id) this.$router.push({ name: 'Orders-detail', params: { id: order.id } }); },
    editOrder(order) { if (order?.id) this.$router.push({ name: 'Orders-edit', params: { id: order.id } }); },
    payOrder(order) { if (order?.id) this.$router.push({ name: 'Payments-add', query: { orderId: order.id } }); },
    canPay(order) { return !['CANCELLED', 'COMPLETED', 'CONFIRMED', 'PAID'].includes(String(order?.status || '').toUpperCase()); },
    canCancel(order) { return !['CANCELLED', 'COMPLETED', 'PAID'].includes(String(order?.status || '').toUpperCase()); },
    async cancelOrder(order) {
      if (!order?.id || !window.confirm('Are you sure you want to cancel this order?')) return;
      this.cancellingId = order.id;
      try {
        await this.$apiPatch(`/orders/${order.id}/cancel`, {});
        await this.fetchOrders();
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert(error?.response?.data?.message || error?.message || 'Failed to cancel order.');
      } finally { this.cancellingId = null; }
    },
    statusClass(status) {
      const value = String(status || 'PENDING').toUpperCase();
      if (['COMPLETED', 'CONFIRMED', 'PAID'].includes(value)) return 'bg-green-100 text-green-700';
      if (['CANCELLED', 'REJECTED', 'FAILED'].includes(value)) return 'bg-red-100 text-red-700';
      if (['PROCESSING', 'SHIPPED'].includes(value)) return 'bg-blue-100 text-blue-700';
      return 'bg-amber-100 text-amber-700';
    },
    formatDate(value) { if (!value) return '-'; return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); },
  },
};
</script>
