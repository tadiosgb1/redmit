<template>
  <div class="p-5">
    <div class="mb-5 flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 class="text-base font-bold text-slate-800">Add Order</h1>
        <p class="text-[11px] text-slate-400">Create an order for a digital item.</p>
      </div>
      <button @click="$router.back()" class="rounded-md border border-slate-200 px-3 py-2 text-xs">Cancel</button>
    </div>

    <form @submit.prevent="submitOrder" class="max-w-2xl space-y-4">
      <div>
        <label class="mb-1 block text-xs font-semibold text-slate-600">Currency</label>
        <select v-model="form.currency" required class="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-xs focus:border-primary focus:outline-none">
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
            {{ currency.code }} — {{ currency.name }}
          </option>
        </select>
      </div>

      <div class="border border-slate-200 bg-white p-4">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-xs font-bold text-slate-700">Order Item</h2>
          <button type="button" @click="addItem" class="rounded-md bg-primary px-2.5 py-1.5 text-[10px] font-bold text-white">+ Add Item</button>
        </div>

        <div v-for="(item, index) in form.items" :key="index" class="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr_auto]">
          <select v-model="item.type" required class="h-9 rounded-md border border-slate-200 bg-white px-2 text-xs">
            <option v-for="type in itemTypes" :key="type" :value="type">{{ type }}</option>
          </select>
          <input v-model="item.id" required type="text" placeholder="Item ID" class="h-9 rounded-md border border-slate-200 px-2 text-xs focus:border-primary focus:outline-none" />
          <div class="flex gap-1">
            <input v-model.number="item.quantity" required min="1" type="number" class="h-9 w-20 rounded-md border border-slate-200 px-2 text-xs" />
            <button v-if="form.items.length > 1" type="button" @click="removeItem(index)" class="h-9 w-9 rounded-md bg-secondary-lighter text-secondary">×</button>
          </div>
        </div>
      </div>

      <button :disabled="saving" type="submit" class="h-10 rounded-md bg-primary px-5 text-xs font-bold text-white disabled:opacity-50">
        {{ saving ? 'Creating...' : 'Create Order' }}
      </button>
    </form>
  </div>
</template>

<script>
const currencies = [
  ['AED','UAE Dirham'],['AFN','Afghan Afghani'],['ALL','Albanian Lek'],['AMD','Armenian Dram'],['ANG','Netherlands Antillean Guilder'],['AOA','Angolan Kwanza'],['ARS','Argentine Peso'],['AUD','Australian Dollar'],['AWG','Aruban Florin'],['AZN','Azerbaijani Manat'],
  ['BAM','Bosnia-Herzegovina Convertible Mark'],['BBD','Barbadian Dollar'],['BDT','Bangladeshi Taka'],['BGN','Bulgarian Lev'],['BHD','Bahraini Dinar'],['BIF','Burundian Franc'],['BMD','Bermudian Dollar'],['BND','Brunei Dollar'],['BOB','Bolivian Boliviano'],['BRL','Brazilian Real'],['BSD','Bahamian Dollar'],['BTN','Bhutanese Ngultrum'],['BWP','Botswana Pula'],['BYN','Belarusian Ruble'],['BZD','Belize Dollar'],
  ['CAD','Canadian Dollar'],['CDF','Congolese Franc'],['CHF','Swiss Franc'],['CLP','Chilean Peso'],['CNY','Chinese Yuan'],['COP','Colombian Peso'],['CRC','Costa Rican Colón'],['CUP','Cuban Peso'],['CVE','Cape Verdean Escudo'],['CZK','Czech Koruna'],
  ['DJF','Djiboutian Franc'],['DKK','Danish Krone'],['DOP','Dominican Peso'],['DZD','Algerian Dinar'],
  ['EGP','Egyptian Pound'],['ERN','Eritrean Nakfa'],['ETB','Ethiopian Birr'],['EUR','Euro'],
  ['FJD','Fijian Dollar'],['FKP','Falkland Islands Pound'],['GBP','British Pound'],['GEL','Georgian Lari'],['GHS','Ghanaian Cedi'],['GIP','Gibraltar Pound'],['GMD','Gambian Dalasi'],['GNF','Guinean Franc'],['GTQ','Guatemalan Quetzal'],['GYD','Guyanese Dollar'],
  ['HKD','Hong Kong Dollar'],['HNL','Honduran Lempira'],['HRK','Croatian Kuna'],['HTG','Haitian Gourde'],['HUF','Hungarian Forint'],
  ['IDR','Indonesian Rupiah'],['ILS','Israeli New Shekel'],['INR','Indian Rupee'],['IQD','Iraqi Dinar'],['IRR','Iranian Rial'],['ISK','Icelandic Króna'],
  ['JMD','Jamaican Dollar'],['JOD','Jordanian Dinar'],['JPY','Japanese Yen'],
  ['KES','Kenyan Shilling'],['KGS','Kyrgyzstani Som'],['KHR','Cambodian Riel'],['KMF','Comorian Franc'],['KPW','North Korean Won'],['KRW','South Korean Won'],['KWD','Kuwaiti Dinar'],['KYD','Cayman Islands Dollar'],['KZT','Kazakhstani Tenge'],
  ['LAK','Lao Kip'],['LBP','Lebanese Pound'],['LKR','Sri Lankan Rupee'],['LRD','Liberian Dollar'],['LSL','Lesotho Loti'],['LYD','Libyan Dinar'],
  ['MAD','Moroccan Dirham'],['MDL','Moldovan Leu'],['MGA','Malagasy Ariary'],['MKD','Macedonian Denar'],['MMK','Myanmar Kyat'],['MNT','Mongolian Tögrög'],['MOP','Macanese Pataca'],['MRU','Mauritanian Ouguiya'],['MUR','Mauritian Rupee'],['MVR','Maldivian Rufiyaa'],['MWK','Malawian Kwacha'],['MXN','Mexican Peso'],['MYR','Malaysian Ringgit'],['MZN','Mozambican Metical'],
  ['NAD','Namibian Dollar'],['NGN','Nigerian Naira'],['NIO','Nicaraguan Córdoba'],['NOK','Norwegian Krone'],['NPR','Nepalese Rupee'],['NZD','New Zealand Dollar'],
  ['OMR','Omani Rial'],['PAB','Panamanian Balboa'],['PEN','Peruvian Sol'],['PGK','Papua New Guinean Kina'],['PHP','Philippine Peso'],['PKR','Pakistani Rupee'],['PLN','Polish Zloty'],['PYG','Paraguayan Guarani'],
  ['QAR','Qatari Riyal'],['RON','Romanian Leu'],['RSD','Serbian Dinar'],['RUB','Russian Ruble'],['RWF','Rwandan Franc'],
  ['SAR','Saudi Riyal'],['SBD','Solomon Islands Dollar'],['SCR','Seychellois Rupee'],['SDG','Sudanese Pound'],['SEK','Swedish Krona'],['SGD','Singapore Dollar'],['SHP','Saint Helena Pound'],['SLE','Sierra Leonean Leone'],['SOS','Somali Shilling'],['SRD','Surinamese Dollar'],['SSP','South Sudanese Pound'],['STN','São Tomé and Príncipe Dobra'],['SYP','Syrian Pound'],['SZL','Eswatini Lilangeni'],
  ['THB','Thai Baht'],['TJS','Tajikistani Somoni'],['TMT','Turkmenistani Manat'],['TND','Tunisian Dinar'],['TOP','Tongan Paʻanga'],['TRY','Turkish Lira'],['TTD','Trinidad and Tobago Dollar'],['TWD','New Taiwan Dollar'],['TZS','Tanzanian Shilling'],
  ['UAH','Ukrainian Hryvnia'],['UGX','Ugandan Shilling'],['USD','US Dollar'],['UYU','Uruguayan Peso'],['UZS','Uzbekistani Som'],
  ['VES','Venezuelan Bolívar'],['VND','Vietnamese Dong'],['VUV','Vanuatu Vatu'],
  ['WST','Samoan Tala'],['XAF','Central African CFA Franc'],['XCD','East Caribbean Dollar'],['XOF','West African CFA Franc'],['XPF','CFP Franc'],
  ['YER','Yemeni Rial'],['ZAR','South African Rand'],['ZMW','Zambian Kwacha'],['ZWL','Zimbabwean Dollar'],
].map(([code, name]) => ({ code, name }));

export default {
  name: 'AddOrder',
  data() {
    const productId = this.$route.query.productId || '';
    return {
      saving: false,
      currencies,
      itemTypes: ['DIGITAL_PRODUCT', 'DIGITAL_ACCESS', 'DIGITAL_GROWTH', 'DIGITAL_ASSET'],
      form: {
        currency: 'USD',
        user_id: localStorage.getItem('userId') || '',
        items: [{ type: 'DIGITAL_PRODUCT', id: productId, quantity: 1 }],
      },
    };
  },
  methods: {
    addItem() {
      this.form.items.push({ type: 'DIGITAL_PRODUCT', id: '', quantity: 1 });
    },
    removeItem(index) {
      this.form.items.splice(index, 1);
    },
    async submitOrder() {
      this.saving = true;
      try {
        await this.$apiPost('/orders', {
          currency: this.form.currency,
          user_id: localStorage.getItem('userId') || this.form.user_id,
          items: this.form.items.map(item => ({
            type: item.type,
            id: item.id,
            quantity: Number(item.quantity),
          })),
        });
        this.$router.push({ name: 'Orders-view' });
      } catch (error) {
        alert(error?.response?.data?.message || error?.message || 'Failed to create order.');
      } finally {
        this.saving = false;
      }
    },
  },
};
</script>
