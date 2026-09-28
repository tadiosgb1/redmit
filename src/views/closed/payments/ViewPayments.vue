<template>
  <div class="min-h-screen bg-slate-50 p-4 text-slate-700 sm:p-5">
    <div class="mx-auto max-w-[1600px]">
      <div class="mb-4 flex items-center justify-between border-b border-slate-200 pb-4">
        <div><h1 class="text-base font-bold text-slate-800">Payments</h1><p class="text-[11px] text-slate-400">View submitted order payments.</p></div>
      </div>
      <div class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="border-b border-slate-200 bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-400">
              <tr><th class="px-4 py-2.5 text-left">#</th><th class="px-4 py-2.5 text-left">Payment</th><th class="px-4 py-2.5 text-left">Order ID</th><th class="px-4 py-2.5 text-left">Method</th><th class="px-4 py-2.5 text-left">Bank Account</th></tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(payment,index) in payments" :key="payment.id || index" class="hover:bg-slate-50">
                <td class="px-4 py-3 text-[11px] text-slate-400">{{ index + 1 }}</td>
                <td class="px-4 py-3 text-xs font-semibold text-slate-800">{{ payment.id || '-' }}</td>
                <td class="px-4 py-3 break-all text-xs">{{ payment.orderId || payment.order_id || payment.order?.id || '-' }}</td>
                <td class="px-4 py-3 text-xs">{{ payment.method || '-' }}</td>
                <td class="px-4 py-3 break-all text-xs">{{ payment.bankAccountId || payment.bank_account_id || payment.bankAccount?.id || '-' }}</td>
              </tr>
              <tr v-if="!loading && payments.length === 0"><td colspan="5" class="px-4 py-12 text-center text-xs text-slate-400">No payments found.</td></tr>
              <tr v-if="loading"><td colspan="5" class="px-4 py-12 text-center text-xs text-slate-400">Loading payments...</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewPayments',
  data() { return { payments: [], loading: false }; },
  mounted() { this.fetchPayments(); },
  methods: {
    async fetchPayments() {
      this.loading = true;
      try {
        const response = await this.$apiGet('/payments');
        this.payments = response?.data || response || [];
      } catch (error) {
        console.error('Error loading payments:', error);
        this.payments = [];
      } finally { this.loading = false; }
    },
  },
};
</script>
