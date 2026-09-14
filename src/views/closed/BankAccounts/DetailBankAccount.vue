<template>
  <div class="min-h-screen bg-slate-50 text-[13px] text-slate-700">
    <Loading
      :visible="loading"
      message="Loading Bank Account..."
    />

    <div class="mx-auto max-w-[1200px] p-4 sm:p-5">

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between"
      >

        <div class="flex items-center gap-3">

          <button
            @click="goBack"
            class="flex h-8 w-8 items-center justify-center border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-primary"
            title="Go back"
          >
            <i class="fas fa-arrow-left text-[10px]"></i>
          </button>

          <div>
            <p
              class="text-[10px] font-semibold uppercase tracking-wider text-slate-400"
            >
              Bank Account
            </p>

            <h1 class="mt-0.5 text-base font-bold text-slate-800">
              {{ account?.bankName || "Bank Account Details" }}
            </h1>
          </div>

        </div>

        <button
          v-if="account"
          @click="openEdit"
          class="inline-flex h-9 items-center justify-center gap-2 bg-primary px-4 text-xs font-semibold text-white shadow-sm transition hover:opacity-90"
        >
          <i class="fas fa-edit text-[10px]"></i>
          Edit Account
        </button>

      </div>

      <!-- ========================================================= -->
      <!-- Main Content -->
      <!-- ========================================================= -->
      <div
        v-if="account"
        class="grid grid-cols-1 gap-4 lg:grid-cols-3"
      >

        <!-- ======================================================= -->
        <!-- Bank Summary -->
        <!-- ======================================================= -->
        <div
          class="border border-slate-200 bg-white shadow-sm lg:col-span-1"
        >

          <!-- Logo -->
          <div
            class="flex aspect-square items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50"
          >

            <img
              v-if="account.logoUrl"
              :src="account.logoUrl"
              :alt="account.bankName || 'Bank'"
              class="h-full w-full object-contain p-10"
            />

            <div
              v-else
              class="flex h-14 w-14 items-center justify-center bg-primary/10 text-primary"
            >
              <i class="fas fa-university text-xl"></i>
            </div>

          </div>

          <!-- Summary -->
          <div class="p-5">

            <p
              class="text-[9px] font-bold uppercase tracking-wider text-slate-400"
            >
              Bank
            </p>

            <h2 class="mt-1 text-lg font-bold text-slate-800">
              {{ account.bankName || "Unnamed Bank" }}
            </h2>

            <div
              v-if="account.accountType"
              class="mt-3 inline-flex bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary"
            >
              {{ account.accountType }}
            </div>

          </div>

        </div>

        <!-- ======================================================= -->
        <!-- Information -->
        <!-- ======================================================= -->
        <div
          class="border border-slate-200 bg-white shadow-sm lg:col-span-2"
        >

          <div
            class="border-b border-slate-100 px-5 py-4"
          >
            <p
              class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
            >
              Account Information
            </p>

            <h2 class="mt-1 text-sm font-bold text-slate-800">
              Payment Account Details
            </h2>
          </div>

          <div class="p-5">

            <div
              class="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >

              <!-- Account Name -->
              <div class="border border-slate-100 bg-slate-50 px-3 py-3">
                <p class="text-[9px] uppercase tracking-wide text-slate-400">
                  Account Name
                </p>

                <p class="mt-1 break-words text-xs font-semibold text-slate-700">
                  {{ account.accountName || "-" }}
                </p>
              </div>

              <!-- Account Number -->
              <div class="border border-slate-100 bg-slate-50 px-3 py-3">
                <p class="text-[9px] uppercase tracking-wide text-slate-400">
                  Account Number
                </p>

                <p class="mt-1 break-all font-mono text-xs font-semibold text-slate-700">
                  {{ account.accountNumber || "-" }}
                </p>
              </div>

              <!-- Phone -->
              <div class="border border-slate-100 bg-slate-50 px-3 py-3">
                <p class="text-[9px] uppercase tracking-wide text-slate-400">
                  Phone Number
                </p>

                <p class="mt-1 break-words text-xs font-semibold text-slate-700">
                  {{ account.phoneNumber || "-" }}
                </p>
              </div>

              <!-- Type -->
              <div class="border border-slate-100 bg-slate-50 px-3 py-3">
                <p class="text-[9px] uppercase tracking-wide text-slate-400">
                  Account Type
                </p>

                <p class="mt-1 text-xs font-semibold text-slate-700">
                  {{ account.accountType || "-" }}
                </p>
              </div>

            </div>

          </div>
        </div>

        <!-- ======================================================= -->
        <!-- Instructions -->
        <!-- ======================================================= -->
        <div
          class="border border-slate-200 bg-white shadow-sm lg:col-span-3"
        >

          <div
            class="border-b border-slate-100 px-5 py-3"
          >
            <p
              class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
            >
              Instructions
            </p>
          </div>

          <div class="px-5 py-4">

            <p
              class="whitespace-pre-line text-xs leading-6 text-slate-600"
            >
              {{
                account.instructions ||
                "No payment instructions have been provided."
              }}
            </p>

          </div>
        </div>

        <!-- ======================================================= -->
        <!-- Logo URL -->
        <!-- ======================================================= -->
        <div
          v-if="account.logoUrl"
          class="border border-slate-200 bg-white shadow-sm lg:col-span-3"
        >

          <div
            class="border-b border-slate-100 px-5 py-3"
          >
            <p
              class="text-[10px] font-bold uppercase tracking-wider text-slate-400"
            >
              Logo
            </p>
          </div>

          <div class="px-5 py-4">

            <div
              class="flex items-center gap-3"
            >

              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-slate-50"
              >
                <img
                  :src="account.logoUrl"
                  :alt="account.bankName || 'Bank logo'"
                  class="h-full w-full object-contain"
                />
              </div>

              <div class="min-w-0">
                <p class="text-[9px] uppercase tracking-wide text-slate-400">
                  Logo URL
                </p>

                <p
                  class="mt-1 break-all font-mono text-[10px] text-slate-500"
                >
                  {{ account.logoUrl }}
                </p>
              </div>

            </div>

          </div>
        </div>

        <!-- ======================================================= -->
        <!-- ID -->
        <!-- ======================================================= -->
        <div
          v-if="account.id"
          class="border border-slate-200 bg-white shadow-sm lg:col-span-3"
        >

          <div class="px-5 py-3">

            <p
              class="text-[9px] font-bold uppercase tracking-wide text-slate-400"
            >
              Account ID
            </p>

            <p
              class="mt-1 break-all font-mono text-[10px] text-slate-500"
            >
              {{ account.id }}
            </p>

          </div>
        </div>

      </div>

      <!-- ========================================================= -->
      <!-- Not Found -->
      <!-- ========================================================= -->
      <div
        v-else-if="!loading"
        class="border border-slate-200 bg-white px-6 py-14 text-center shadow-sm"
      >

        <div
          class="mx-auto flex h-12 w-12 items-center justify-center bg-slate-100 text-slate-400"
        >
          <i class="fas fa-university text-lg"></i>
        </div>

        <h2 class="mt-3 text-sm font-bold text-slate-700">
          Bank account not found
        </h2>

        <p class="mt-1 text-[11px] text-slate-400">
          The requested bank account could not be loaded.
        </p>

        <button
          @click="goBack"
          class="mt-4 inline-flex h-8 items-center gap-2 bg-primary px-3.5 text-[10px] font-semibold text-white transition hover:opacity-90"
        >
          <i class="fas fa-arrow-left text-[9px]"></i>
          Go Back
        </button>

      </div>
    </div>

    <!-- ========================================================= -->
    <!-- Edit Modal -->
    <!-- ========================================================= -->
    <EditBankAccount
      v-if="showEdit"
      :data="account"
      @close="showEdit = false"
      @saved="handleUpdated"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import EditBankAccount from "./EditBankAccount.vue";

export default {
  name: "DetailBankAccount",

  components: {
    Loading,
    EditBankAccount,
  },

  data() {
    return {
      account: null,

      loading: false,

      showEdit: false,
    };
  },

  mounted() {
    this.fetchAccount();
  },

  watch: {
    "$route.params.id"() {
      this.fetchAccount();
    },
  },

  methods: {
    async fetchAccount() {
      const id = this.$route.params.id;

      if (!id) {
        this.showToast(
          "Bank account ID is missing",
          "error"
        );

        return;
      }

      this.loading = true;

      try {
        const response =
          await this.$apiGetById(
            "/bank-accounts",
            id
          );

        this.account =
          response?.data || response;
      } catch (e) {
        console.error(
          "Error loading bank account:",
          e
        );

        this.account = null;

        this.showToast(
          e?.response?.data?.message ||
            "Failed to load bank account",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },

    openEdit() {
      this.showEdit = true;
    },

    async handleUpdated() {
      this.showEdit = false;

      await this.fetchAccount();
    },

    goBack() {
      this.$router.back();
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