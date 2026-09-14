<template>
  <div class="min-h-screen bg-slate-50 text-[13px] text-slate-700">
    <Loading
      :visible="loading"
      message="Loading Bank Accounts..."
    />

    <div class="mx-auto max-w-[1400px] p-4 sm:p-5">

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p
            class="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
          >
            Finance
          </p>

          <h1 class="mt-0.5 text-lg font-bold text-slate-800">
            Bank Accounts
          </h1>

          <p class="mt-1 text-[11px] text-slate-400">
            Manage bank accounts used for payment and financial instructions.
          </p>
        </div>

        <button
          @click="openAdd"
          class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-4 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <i class="fas fa-plus text-[10px]"></i>
          Add Bank Account
        </button>
      </div>

      <!-- ========================================================= -->
      <!-- Empty State -->
      <!-- ========================================================= -->
      <div
        v-if="!loading && accounts.length === 0"
        class="border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"
      >
        <div
          class="mx-auto flex h-12 w-12 items-center justify-center bg-primary/10 text-primary"
        >
          <i class="fas fa-university text-lg"></i>
        </div>

        <h2 class="mt-3 text-sm font-bold text-slate-700">
          No bank accounts found
        </h2>

        <p class="mt-1 text-[11px] text-slate-400">
          Add a bank account to start managing payment information.
        </p>

        <button
          @click="openAdd"
          class="mt-4 inline-flex h-8 items-center gap-2 bg-primary px-3.5 text-[10px] font-semibold text-white transition hover:opacity-90"
        >
          <i class="fas fa-plus text-[9px]"></i>
          Add Bank Account
        </button>
      </div>

      <!-- ========================================================= -->
      <!-- Desktop Table -->
      <!-- ========================================================= -->
      <div
        v-else
        class="overflow-hidden border border-slate-200 bg-white shadow-sm"
      >
        <div class="overflow-x-auto">
          <table class="w-full min-w-[900px]">

            <!-- Table Head -->
            <thead>
              <tr class="border-b border-slate-200 bg-slate-50 text-left">

                <th class="px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Bank
                </th>

                <th class="px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Account Name
                </th>

                <th class="px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Account Number
                </th>

                <th class="px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Phone
                </th>

                <th class="px-4 py-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Account Type
                </th>

                <th class="px-4 py-3 text-right text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Actions
                </th>

              </tr>
            </thead>

            <!-- Table Body -->
            <tbody>
              <tr
                v-for="account in accounts"
                :key="account.id"
                class="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50/70"
              >

                <!-- Bank -->
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">

                    <div
                      class="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white"
                    >
                      <img
                        v-if="account.logoUrl"
                        :src="account.logoUrl"
                        :alt="account.bankName || 'Bank'"
                        class="h-full w-full object-contain"
                      />

                      <i
                        v-else
                        class="fas fa-university text-xs text-primary"
                      ></i>
                    </div>

                    <div class="min-w-0">
                      <p class="truncate text-xs font-semibold text-slate-700">
                        {{ account.bankName || "Unnamed Bank" }}
                      </p>

                      <p class="mt-0.5 truncate text-[9px] text-slate-400">
                        {{ account.id || "No ID" }}
                      </p>
                    </div>

                  </div>
                </td>

                <!-- Account Name -->
                <td class="px-4 py-3">
                  <span class="text-xs text-slate-600">
                    {{ account.accountName || "-" }}
                  </span>
                </td>

                <!-- Account Number -->
                <td class="px-4 py-3">
                  <span class="font-mono text-xs text-slate-600">
                    {{ account.accountNumber || "-" }}
                  </span>
                </td>

                <!-- Phone -->
                <td class="px-4 py-3">
                  <span class="text-xs text-slate-600">
                    {{ account.phoneNumber || "-" }}
                  </span>
                </td>

                <!-- Type -->
                <td class="px-4 py-3">
                  <span
                    v-if="account.accountType"
                    class="inline-flex bg-primary/10 px-2 py-1 text-[9px] font-semibold text-primary"
                  >
                    {{ account.accountType }}
                  </span>

                  <span
                    v-else
                    class="text-xs text-slate-400"
                  >
                    -
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-1">

                    <button
                      @click="viewAccount(account)"
                      class="flex h-7 w-7 items-center justify-center text-slate-400 transition hover:bg-slate-100 hover:text-primary"
                      title="View"
                    >
                      <i class="fas fa-eye text-[10px]"></i>
                    </button>

                    <button
                      @click="editAccount(account)"
                      class="flex h-7 w-7 items-center justify-center text-slate-400 transition hover:bg-primary/10 hover:text-primary"
                      title="Edit"
                    >
                      <i class="fas fa-edit text-[10px]"></i>
                    </button>

                    <button
                      @click="deleteAccount(account)"
                      class="flex h-7 w-7 items-center justify-center text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                      title="Delete"
                    >
                      <i class="fas fa-trash text-[10px]"></i>
                    </button>

                  </div>
                </td>

              </tr>
            </tbody>

          </table>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-between border-t border-slate-100 px-4 py-3"
        >
          <p class="text-[10px] text-slate-400">
            {{ accounts.length }}
            bank account{{ accounts.length === 1 ? "" : "s" }}
          </p>
        </div>
      </div>
    </div>

    <!-- ========================================================= -->
    <!-- Add Modal -->
    <!-- ========================================================= -->
    <AddBankAccount
      v-if="showAdd"
      @close="showAdd = false"
      @saved="handleSaved"
    />

    <!-- ========================================================= -->
    <!-- Edit Modal -->
    <!-- ========================================================= -->
    <EditBankAccount
      v-if="showEdit"
      :data="selectedAccount"
      @close="closeEdit"
      @saved="handleSaved"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import AddBankAccount from "./AddBankAccount.vue";
import EditBankAccount from "./EditBankAccount.vue";

export default {
  name: "ViewBankAccount",

  components: {
    Loading,
    AddBankAccount,
    EditBankAccount,
  },

  data() {
    return {
      accounts: [],

      loading: false,

      showAdd: false,
      showEdit: false,

      selectedAccount: null,
    };
  },

  mounted() {
    this.fetchAccounts();
  },

  methods: {
    async fetchAccounts() {
      this.loading = true;

      try {
        const response = await this.$apiGet(
          "/bank-accounts"
        );

        this.accounts = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
          ? response.data
          : [];
      } catch (e) {
        console.error(
          "Error loading bank accounts:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load bank accounts",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    openAdd() {
      this.showAdd = true;
    },

    viewAccount(account) {
      if (!account?.id) {
        return;
      }

      this.$router.push({
        name: "BankAccount-detail",
        params: {
          id: account.id,
        },
      });
    },

    editAccount(account) {
      this.selectedAccount = account;
      this.showEdit = true;
    },

    closeEdit() {
      this.showEdit = false;
      this.selectedAccount = null;
    },

    async deleteAccount(account) {
      if (!account?.id) {
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to delete "${
          account.bankName || "this bank account"
        }"?`
      );

      if (!confirmed) {
        return;
      }

      try {
        await this.$apiDelete(
          `/bank-accounts/${account.id}`
        );

        this.showToast(
          "Bank account deleted successfully",
          "success"
        );

        await this.fetchAccounts();
      } catch (e) {
        console.error(
          "Error deleting bank account:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to delete bank account",
          "error"
        );
      }
    },

    async handleSaved() {
      this.showAdd = false;
      this.showEdit = false;
      this.selectedAccount = null;

      await this.fetchAccounts();
    },

    showToast(message, type) {
      if (this.$root.$refs.toast) {
        this.$root.$refs.toast.showToast(
          message,
          type
        );
      }
    },
  },
};
</script>