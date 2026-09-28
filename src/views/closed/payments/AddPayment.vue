<template>
  <div class="p-5">
    <div class="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
      <div><h1 class="text-base font-bold text-slate-800">Pay Order</h1><p class="text-[11px] text-slate-400">Choose a bank account and payment method.</p></div>
      <button @click="$router.back()" class="rounded-md border border-slate-200 px-3 py-2 text-xs">Cancel</button>
    </div>
    <form @submit.prevent="submitPayment" class="max-w-xl space-y-4 border border-slate-200 bg-white p-5">
      <div>
        <label class="mb-1 block text-xs font-semibold text-slate-600">Order ID</label>
        <input v-model="form.orderId" readonly required class="h-10 w-full rounded-md border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600" />
      </div>
      <div>
        <label class="mb-1 block text-xs font-semibold text-slate-600">Payment Method</label>
        <select v-model="form.method" required class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs focus:border-primary focus:outline-none">
          <option value="MANUAL_BANK_TRANSFER">MANUAL_BANK_TRANSFER</option>
        </select>
      </div>
      <div>
        <label class="mb-1 block text-xs font-semibold text-slate-600">Bank Account</label>
        <select v-model="form.bankAccountId" required class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs focus:border-primary focus:outline-none">
          <option value="" disabled>Select bank account</option>
          <option v-for="account in bankAccounts" :key="account.id" :value="account.id">{{ account.name || account.accountName || account.bankName || 'Bank Account' }} — {{ account.id }}</option>
        </select>
        <p v-if="!loadingAccounts && bankAccounts.length === 0" class="mt-1 text-[10px] text-secondary">No bank accounts found.</p>
      </div>
      <button :disabled="saving" type="submit" class="h-10 rounded-md bg-primary px-5 text-xs font-bold text-white disabled:opacity-50">{{ saving ? 'Paying...' : 'Pay' }}</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'AddPayment',
  data() {
    return { saving: false, loadingAccounts: false, bankAccounts: [], form: { orderId: this.$route.query.orderId || '', method: 'MANUAL_BANK_TRANSFER', bankAccountId: '' } };
  },
  async created() {
    this.loadingAccounts = true;
    try {
      const response = await this.$apiGet('/bank-accounts');
      this.bankAccounts = response?.data || response || [];
    } catch (error) {
      console.error('Error loading bank accounts:', error);
    } finally {
      this.loadingAccounts = false;
    }
  },
  methods: {
    async submitPayment() {
      this.saving = true;
      try {
        await this.$apiPost('/payments', {
          orderId: this.form.orderId,
          method: this.form.method,
          bankAccountId: this.form.bankAccountId,
        });
        this.$router.push({ name: 'Payments-view' });
      } catch (error) {
        alert(error?.response?.data?.message || error?.message || 'Failed to create payment.');
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>
