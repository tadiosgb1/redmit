<template>
  <div
    class="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/45 p-0 sm:items-center sm:p-4"
  >

    <!-- ========================================================= -->
    <!-- Modal -->
    <!-- ========================================================= -->
    <div
      class="bank-modal w-full max-w-3xl overflow-hidden border border-slate-200 bg-white shadow-2xl"
    >

      <!-- ========================================================= -->
      <!-- Header -->
      <!-- ========================================================= -->
      <div
        class="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6"
      >

        <div class="flex items-center gap-3">

          <div
            class="flex h-9 w-9 items-center justify-center bg-primary/10 text-primary"
          >
            <i class="fas fa-university text-sm"></i>
          </div>

          <div>
            <h2 class="text-sm font-bold text-slate-800">
              Add Bank Account
            </h2>

            <p class="mt-0.5 text-[10px] text-slate-400">
              Create a new bank account
            </p>
          </div>

        </div>

        <button
          type="button"
          @click="close"
          class="flex h-7 w-7 items-center justify-center text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <i class="fas fa-times text-xs"></i>
        </button>

      </div>

      <!-- ========================================================= -->
      <!-- Body -->
      <!-- ========================================================= -->
      <form
        @submit.prevent="save"
        class="max-h-[78vh] overflow-y-auto px-5 py-5 sm:px-6"
      >

        <div
          class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2"
        >

          <!-- Bank Name -->
          <div>
            <label class="field-label">
              Bank Name
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.bankName"
              type="text"
              placeholder="Enter bank name"
              class="field-input"
              :class="{
                'border-red-300':
                  errors.bankName
              }"
            />

            <p
              v-if="errors.bankName"
              class="field-error"
            >
              {{ errors.bankName }}
            </p>
          </div>

          <!-- Account Name -->
          <div>
            <label class="field-label">
              Account Name
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.accountName"
              type="text"
              placeholder="Enter account holder name"
              class="field-input"
              :class="{
                'border-red-300':
                  errors.accountName
              }"
            />

            <p
              v-if="errors.accountName"
              class="field-error"
            >
              {{ errors.accountName }}
            </p>
          </div>

          <!-- Account Number -->
          <div>
            <label class="field-label">
              Account Number
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="form.accountNumber"
              type="text"
              inputmode="numeric"
              placeholder="Enter account number"
              class="field-input font-mono"
              :class="{
                'border-red-300':
                  errors.accountNumber
              }"
            />

            <p
              v-if="errors.accountNumber"
              class="field-error"
            >
              {{ errors.accountNumber }}
            </p>
          </div>

          <!-- Phone -->
          <div>
            <label class="field-label">
              Phone Number
            </label>

            <input
              v-model="form.phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              class="field-input"
            />
          </div>

          <!-- Account Type -->
          <div>
            <label class="field-label">
              Account Type
            </label>

            <select
              v-model="form.accountType"
              class="field-input"
            >
              <option value="">
                Select account type
              </option>

              <option value="Bank Account">
                Bank Account
              </option>

              <option value="Savings">
                Savings
              </option>

              <option value="Current">
                Current
              </option>

              <option value="Business">
                Business
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <!-- Logo URL -->
          <div>
            <label class="field-label">
              Logo URL
            </label>

            <input
              v-model="form.logoUrl"
              type="url"
              placeholder="https://example.com/logo.png"
              class="field-input"
            />
          </div>

          <!-- Logo Preview -->
          <div
            v-if="form.logoUrl"
            class="sm:col-span-2"
          >
            <div
              class="flex items-center gap-3 border border-slate-200 bg-slate-50 p-3"
            >
              <div
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white"
              >
                <img
                  :src="form.logoUrl"
                  alt="Bank logo preview"
                  class="h-full w-full object-contain"
                  @error="logoError = true"
                />

                <i
                  v-if="logoError"
                  class="fas fa-university text-xs text-slate-300"
                ></i>
              </div>

              <div>
                <p class="text-[10px] font-semibold text-slate-600">
                  Logo Preview
                </p>

                <p class="mt-0.5 text-[9px] text-slate-400">
                  The provided logo URL will be used for the bank account.
                </p>
              </div>
            </div>
          </div>

          <!-- Instructions -->
          <div class="sm:col-span-2">
            <label class="field-label">
              Instructions
            </label>

            <textarea
              v-model="form.instructions"
              rows="4"
              placeholder="Enter payment instructions..."
              class="field-textarea"
            ></textarea>
          </div>

        </div>

        <!-- ========================================================= -->
        <!-- Footer -->
        <!-- ========================================================= -->
        <div
          class="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4"
        >

          <button
            type="button"
            @click="close"
            :disabled="saving"
            class="h-8 border border-slate-200 px-4 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          >
            Cancel
          </button>

          <button
            type="submit"
            :disabled="saving"
            class="inline-flex h-8 items-center gap-2 bg-primary px-4 text-[10px] font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <i
              v-if="saving"
              class="fas fa-spinner fa-spin text-[9px]"
            ></i>

            <i
              v-else
              class="fas fa-save text-[9px]"
            ></i>

            {{
              saving
                ? "Saving..."
                : "Create Bank Account"
            }}

          </button>

        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddBankAccount",

  data() {
    return {
      form: {
        bankName: "",
        accountName: "",
        accountNumber: "",
        phoneNumber: "",
        accountType: "",
        instructions: "",
        logoUrl: "",
      },

      errors: {},

      saving: false,

      logoError: false,
    };
  },

  watch: {
    "form.logoUrl"() {
      this.logoError = false;
    },
  },

  methods: {
    validate() {
      this.errors = {};

      if (!this.form.bankName.trim()) {
        this.errors.bankName =
          "Bank name is required.";
      }

      if (!this.form.accountName.trim()) {
        this.errors.accountName =
          "Account name is required.";
      }

      if (!this.form.accountNumber.trim()) {
        this.errors.accountNumber =
          "Account number is required.";
      }

      return (
        Object.keys(this.errors).length === 0
      );
    },

    async save() {
      if (!this.validate()) {
        return;
      }

      this.saving = true;

      try {
        const payload = {
          bankName:
            this.form.bankName.trim(),

          accountName:
            this.form.accountName.trim(),

          accountNumber:
            this.form.accountNumber.trim(),

          phoneNumber:
            this.form.phoneNumber.trim(),

          accountType:
            this.form.accountType.trim(),

          instructions:
            this.form.instructions.trim(),

          logoUrl:
            this.form.logoUrl.trim(),
        };

        const response =
          await this.$apiPost(
            "/bank-accounts",
            payload
          );

        if (response) {
          this.showToast(
            "Bank account created successfully",
            "success"
          );

          this.$emit("saved");
        }
      } catch (e) {
        console.error(
          "Error creating bank account:",
          e
        );

        this.showToast(
          e?.response?.data?.message ||
            "Failed to create bank account",
          "error"
        );
      } finally {
        this.saving = false;
      }
    },

    close() {
      if (this.saving) {
        return;
      }

      this.$emit("close");
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

<style scoped>
.bank-modal {
  animation: bankModalIn 0.3s
    cubic-bezier(0.22, 1, 0.36, 1);
  transform-origin: bottom center;
}

.field-label {
  @apply mb-1.5 block text-[11px] font-semibold text-slate-600;
}

.field-input {
  @apply h-10 w-full rounded-none border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10;
}

.field-textarea {
  @apply w-full resize-none rounded-none border border-slate-200 bg-white px-3 py-2.5 text-xs leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary/10;
}

.field-error {
  @apply mt-1 text-[10px] text-red-500;
}

@keyframes bankModalIn {
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (max-width: 640px) {
  .bank-modal {
    animation-name: bankModalMobileIn;
  }
}

@keyframes bankModalMobileIn {
  from {
    opacity: 0;
    transform: translateY(100%);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>