<template>
  <div class="min-h-screen bg-slate-50 p-4 text-slate-700 sm:p-6">
    <div class="mx-auto max-w-5xl">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div><h1 class="text-xl font-bold text-slate-900">Digital Cart</h1><p class="mt-1 text-xs text-slate-500">Order digital products, assets, Pay For Me access, and growth services together.</p></div>
        <span class="rounded-full bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary">{{ items.reduce((n, item) => n + item.quantity, 0) }} item(s)</span>
      </div>
      <div v-if="!items.length" class="border border-slate-200 bg-white px-5 py-16 text-center">
        <i class="fas fa-shopping-cart text-3xl text-slate-300"></i><h2 class="mt-3 text-sm font-bold text-slate-700">Your cart is empty</h2><p class="mt-1 text-xs text-slate-500">Add items from Products, Assets, Pay For Me, or Channel Growth. DV requests are submitted separately from the cart.</p>
        <div class="mt-4 flex flex-wrap justify-center gap-2"><router-link to="/dashboard/products" class="bg-primary px-4 py-2 text-xs font-semibold text-white">Browse products</router-link><router-link to="/dashboard/dv-applications" class="border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-800">DV requests</router-link><router-link to="/dashboard/access" class="border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">Pay For Me</router-link><router-link to="/dashboard/assets" class="border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">Assets</router-link><router-link to="/dashboard/growth" class="border border-slate-200 bg-white px-4 py-2 text-xs font-semibold">Growth</router-link></div>
      </div>
      <template v-else>
        <div class="space-y-3">
          <div v-for="(item, index) in items" :key="item.type + ':' + item.id" class="flex flex-col gap-3 border border-slate-200 bg-white p-4 sm:flex-row sm:items-center">
            <div class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 text-primary">
              <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.name" class="h-full w-full object-cover"><i v-else class="fas" :class="iconFor(item.type)"></i>
            </div>
            <div class="min-w-0 flex-1"><p class="truncate text-sm font-bold text-slate-800">{{ item.name }}</p><p class="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{{ labelFor(item.type) }} · ID: {{ item.id }}</p><p class="mt-1 text-xs font-semibold">{{ money(item.price, item.currency) }} each</p></div>
            <div class="flex items-center gap-2"><label class="text-[10px] text-slate-500">Qty</label><input type="number" min="1" :value="item.quantity" @change="setQuantity(index, $event.target.value)" class="h-9 w-16 border border-slate-200 px-2 text-xs"><button @click="remove(index)" class="h-9 border border-red-100 px-3 text-xs font-semibold text-red-600 hover:bg-red-50"><i class="fas fa-trash mr-1"></i>Remove</button></div>
            <div class="text-right sm:min-w-24"><p class="text-sm font-bold text-slate-900">{{ money(item.price * item.quantity, item.currency) }}</p></div>
          </div>
        </div>
        <div class="mt-4 flex flex-col gap-4 border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <button @click="clear" class="self-start text-xs font-semibold text-red-600 hover:underline">Clear cart</button>
          <div class="flex flex-col items-stretch gap-3 sm:items-end"><div class="flex items-center gap-3"><label for="currency" class="text-xs text-slate-500">Order currency</label><select id="currency" v-model="currency" class="h-9 border border-slate-200 bg-white px-3 text-xs"><option>USD</option><option>ETB</option><option>EUR</option><option>GBP</option></select></div><button :disabled="submitting || !items.length" @click="checkout" class="h-10 bg-primary px-5 text-xs font-bold text-white disabled:opacity-50">{{ submitting ? 'Submitting order…' : 'Order all items' }}</button></div>
        </div>
        <p class="mt-2 text-[10px] text-slate-400">Prices are shown as a guide. The server validates final prices and order eligibility.</p>
      </template>
    </div>
  </div>
</template>
<script>
import { useDigitalCart } from "@/utils/digitalCart";
export default {
  name: "DigitalCart",
  data() { return { ...useDigitalCart(), currency: "USD", submitting: false }; },
  methods: {
    labelFor(type) { return ({ DIGITAL_PRODUCT: "Digital Product", DIGITAL_ACCESS: "Pay For Me / Access", DIGITAL_ASSET: "Digital Asset", DIGITAL_GROWTH: "Channel Growth", DIGITAL_DV_APPLICATION: "American DV Assistance" })[type] || type; },
    iconFor(type) { return ({ DIGITAL_PRODUCT: "fa-box-open", DIGITAL_ACCESS: "fa-hand-holding-usd", DIGITAL_ASSET: "fa-globe", DIGITAL_GROWTH: "fa-chart-line", DIGITAL_DV_APPLICATION: "fa-passport" })[type] || "fa-cube"; },
    money(value, currency) { const n = Number(value); return (Number.isFinite(n) ? n : 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + (currency || "USD"); },
    async checkout() {
      if (!this.items.length || this.submitting) return;
      this.submitting = true;
      try {
        await this.$apiPost("/orders", {
          currency: this.currency,
          items: this.items.map(({ type, id, quantity }) => ({ type, id, quantity: Number(quantity) })),
        });
        this.clear();
        this.$router.push({ name: "Orders-view" });
      } catch (error) {
        alert(error?.response?.data?.message || error?.message || "Could not submit this order. Your cart has been kept.");
      } finally { this.submitting = false; }
    },
  },
};
</script>
