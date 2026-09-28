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
              <tr><th class="px-4 py-2.5 text-left">#</th><th class="px-4 py-2.5 text-left">Payment</th><th class="px-4 py-2.5 text-left">Order</th><th class="px-4 py-2.5 text-left">User</th><th class="px-4 py-2.5 text-left">Method</th><th class="px-4 py-2.5 text-left">Amount</th><th class="px-4 py-2.5 text-left">Bank</th><th class="px-4 py-2.5 text-left">Status</th><th class="px-4 py-2.5 text-left">Manual Status</th><th class="px-4 py-2.5 text-left">Date</th></tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(payment,index) in payments" :key="payment.id || index" class="hover:bg-slate-50">
                <td class="px-4 py-3 text-[11px] text-slate-400">{{ index + 1 }}</td>
                <td class="px-4 py-3"><p class="text-xs font-semibold text-slate-800">{{ payment.paymentNumber || payment.id || '-' }}</p><p class="text-[9px] text-slate-400">{{ payment.transactionReference || 'No transaction reference' }}</p></td>
                <td class="px-4 py-3"><p class="text-xs font-semibold text-slate-700">{{ payment.order?.orderNumber || payment.orderId || '-' }}</p><p class="text-[9px] text-slate-400">{{ payment.orderId || '' }}</p></td>
                <td class="px-4 py-3"><p class="text-xs font-semibold text-slate-700">{{ payment.user?.fullName || payment.user?.username || payment.userId || '-' }}</p><p class="text-[9px] text-slate-400">{{ payment.user?.email || '' }}</p></td>
                <td class="px-4 py-3 text-xs">{{ payment.method || '-' }}</td>
                <td class="px-4 py-3"><span class="text-xs font-bold text-primary">{{ formatAmount(payment.amount) }}</span> <span class="text-[9px] font-semibold text-slate-400">{{ payment.currency || '' }}</span></td>
                <td class="px-4 py-3"><p class="text-xs text-slate-700">{{ payment.bankAccount?.bankName || payment.bankAccountId || '-' }}</p><p class="text-[9px] text-slate-400">{{ payment.bankAccount?.accountName || '' }}</p></td>
                <td class="px-4 py-3"><span class="inline-flex rounded-full px-2.5 py-1 text-[9px] font-black uppercase" :class="statusClass(payment.status)">{{ payment.status || '-' }}</span></td>
                <td class="px-4 py-3"><span v-if="payment.manualStatus" class="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-[9px] font-black text-amber-700">{{ payment.manualStatus }}</span><span v-else class="text-[10px] text-slate-400">-</span></td>
                <td class="px-4 py-3 text-[10px] text-slate-500">{{ formatDate(payment.paidAt || payment.createdAt) }}</td>
              </tr>
              <tr v-if="!loading && payments.length === 0"><td colspan="10" class="px-4 py-12 text-center text-xs text-slate-400">No payments found.</td></tr>
              <tr v-if="loading"><td colspan="10" class="px-4 py-12 text-center text-xs text-slate-400">Loading payments...</td></tr>
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
        this.payments = response?.payments || response?.data?.payments || response?.data || [];
      } catch (error) { console.error('Error loading payments:', error); this.payments = []; }
      finally { this.loading = false; }
    },
    formatAmount(value) { const number = Number(value); return Number.isNaN(number) ? (value || '0.00') : number.toFixed(2); },
    formatDate(value) { if (!value) return '-'; return new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); },
    statusClass(status) {
      const value = String(status || '').toUpperCase();
      if (['COMPLETED', 'SUCCESS', 'PAID'].includes(value)) return 'bg-green-100 text-green-700';
      if (['FAILED', 'REJECTED', 'CANCELLED'].includes(value)) return 'bg-red-100 text-red-700';
      if (['PROCESSING', 'PENDING'].includes(value)) return 'bg-blue-100 text-blue-700';
      return 'bg-slate-100 text-slate-600';
    },
  },
};
</script>
