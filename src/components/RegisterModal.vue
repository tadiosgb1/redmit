<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/75 backdrop-blur-sm" @click="$emit('close')"></div>

    <!-- Modal Card -->
    <div
      class="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col"
    >
      <!-- Close -->
      <button
        @click="$emit('close')"
        aria-label="Close"
        class="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition z-20"
      >
        <i class="fas fa-times text-sm"></i>
      </button>

      <!-- Success -->
      <div v-if="success" class="flex flex-col items-center text-center gap-4 p-8 md:p-12">
        <div class="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
          <i class="fas fa-check-circle text-3xl"></i>
        </div>
        <h3 class="text-2xl font-black text-slate-900">Profile Submitted Successfully</h3>
        <p class="text-slate-600 max-w-md leading-relaxed text-sm">
          Your registration has been submitted. A regional coordinator will verify and activate your membership shortly.
        </p>
        <button
          @click="$emit('close')"
          class="mt-2 px-8 py-3 bg-primary hover:bg-slate-900 text-white font-bold rounded-xl transition text-sm uppercase tracking-wider"
        >
          Close Panel
        </button>
      </div>

      <template v-else>
        <!-- Header -->
        <div class="px-6 pt-6 pb-4 md:px-8 md:pt-8 shrink-0 border-b border-slate-100">
          <h2 class="text-xl md:text-2xl font-black text-slate-900 pr-10">Join the Movement</h2>
          <p class="text-xs text-slate-500 mt-1">Step {{ currentStep }} of {{ totalSteps }} — {{ stepTitles[currentStep - 1] }}</p>

          <!-- Step indicator -->
          <div class="flex items-center gap-1 sm:gap-2 mt-5 overflow-x-auto pb-1">
            <template v-for="(title, i) in stepTitles" :key="i">
              <div class="flex items-center gap-1.5 shrink-0">
                <div
                  class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition"
                  :class="
                    currentStep > i + 1
                      ? 'bg-emerald-500 text-white'
                      : currentStep === i + 1
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                        : 'bg-slate-100 text-slate-400'
                  "
                >
                  <i v-if="currentStep > i + 1" class="fas fa-check text-[10px]"></i>
                  <span v-else>{{ i + 1 }}</span>
                </div>
                <span
                  class="hidden sm:inline text-xs font-medium max-w-[72px] truncate"
                  :class="currentStep === i + 1 ? 'text-emerald-700' : 'text-slate-400'"
                >
                  {{ title }}
                </span>
              </div>
              <div
                v-if="i < totalSteps - 1"
                class="flex-1 h-0.5 min-w-[12px] rounded"
                :class="currentStep > i + 1 ? 'bg-emerald-400' : 'bg-slate-200'"
              ></div>
            </template>
          </div>
        </div>

        <!-- Step body (scrollable) -->
        <div class="flex-1 overflow-y-auto px-6 py-5 md:px-8 min-h-0">
          <!-- ═══ STEP 1: Personal ═══ -->
          <div v-show="currentStep === 1" class="space-y-4">
            <div>
              <label class="field-label">Full Name *</label>
              <input v-model="form.fullName" type="text" placeholder="e.g. Kalayu Redae" class="field-input" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="field-label">Phone Number *</label>
                <input v-model="form.phoneNumber" type="tel" placeholder="0912345678" class="field-input" />
              </div>
              <div>
                <label class="field-label">Email Address *</label>
                <input v-model="form.email" type="email" placeholder="name@domain.com" class="field-input" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Gender *</label>
                <select v-model="form.gender" class="field-input">
                  <option value="" disabled>Select</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <div>
                <label class="field-label">Date of Birth *</label>
                <input v-model="form.dateOfBirth" type="date" class="field-input" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Marital Status</label>
                <select v-model="form.maritalStatus" class="field-input">
                  <option value="SINGLE">Single</option>
                  <option value="MARRIED">Married</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label class="field-label">Nationality</label>
                <input v-model="form.nationality" type="text" placeholder="Ethiopian" class="field-input" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label class="field-label">Emergency Contact Name</label>
                <input v-model="form.emergencyContactName" type="text" placeholder="Full name" class="field-input" />
              </div>
              <div>
                <label class="field-label">Emergency Contact Phone</label>
                <input v-model="form.emergencyContactPhone" type="tel" placeholder="Phone number" class="field-input" />
              </div>
            </div>
          </div>

          <!-- ═══ STEP 2: Location ═══ -->
          <div v-show="currentStep === 2" class="space-y-5">
            <div class="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-xs text-emerald-800 flex gap-2">
              <i class="fas fa-info-circle mt-0.5 shrink-0"></i>
              <span>
                Select your <strong>Region</strong> first, then Zone, Woreda and Tabiya. Each selection enables the next dropdown.
              </span>
            </div>

            <!-- Mini location progress -->
            <div class="flex items-center justify-between gap-1 text-center text-[11px] sm:text-xs">
              <div
                v-for="(label, idx) in ['Region', 'Zone', 'Woreda', 'Tabiya']"
                :key="label"
                class="flex-1"
              >
                <div
                  class="mx-auto w-7 h-7 rounded-full flex items-center justify-center font-bold mb-1 transition"
                  :class="locationStepDone(idx) ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'"
                >
                  {{ idx + 1 }}
                </div>
                <span :class="locationStepDone(idx) ? 'text-emerald-700 font-semibold' : 'text-slate-400'">
                  {{ label }}
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="field-label">Region *</label>
                <select
                  v-model.number="form.regionId"
                  @change="onRegionChange"
                  :disabled="loadingOptions"
                  class="field-input"
                >
                  <option value="" disabled>Select your region</option>
                  <option v-for="item in regions" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Choose the region where you live</p>
              </div>
              <div>
                <label class="field-label">Zone *</label>
                <select
                  v-model.number="form.zoneId"
                  @change="onZoneChange"
                  :disabled="loadingZones || !form.regionId"
                  class="field-input"
                >
                  <option value="" disabled>{{ loadingZones ? 'Loading...' : 'Select your zone' }}</option>
                  <option v-for="item in zones" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Choose your zone</p>
              </div>
              <div>
                <label class="field-label">Woreda *</label>
                <select
                  v-model.number="form.woredaId"
                  @change="onWoredaChange"
                  :disabled="loadingWoredas || !form.zoneId"
                  class="field-input"
                >
                  <option value="" disabled>{{ loadingWoredas ? 'Loading...' : 'Select your woreda' }}</option>
                  <option v-for="item in woredas" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Choose your woreda</p>
              </div>
              <div>
                <label class="field-label">Tabiya *</label>
                <select
                  v-model.number="form.tabiyaId"
                  :disabled="loadingTabiyas || !form.woredaId"
                  class="field-input"
                >
                  <option value="" disabled>{{ loadingTabiyas ? 'Loading...' : 'Select your tabiya' }}</option>
                  <option v-for="item in tabiyas" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
                <p class="text-[11px] text-slate-400 mt-1">Choose your tabiya</p>
              </div>
            </div>
          </div>

          <!-- ═══ STEP 3: Professional ═══ -->
          <div v-show="currentStep === 3" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="field-label">Education Level *</label>
                <select v-model.number="form.educationLevelId" :disabled="loadingOptions" class="field-input">
                  <option value="" disabled>{{ loadingOptions ? 'Loading...' : 'Select Education' }}</option>
                  <option v-for="item in educationLevels" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
              <div>
                <label class="field-label">Profession *</label>
                <select v-model.number="form.professionId" :disabled="loadingOptions" class="field-input">
                  <option value="" disabled>{{ loadingOptions ? 'Loading...' : 'Select Profession' }}</option>
                  <option v-for="item in professions" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="field-label">Occupation</label>
                <input v-model="form.occupation" type="text" placeholder="Software Developer" class="field-input" />
              </div>
              <div>
                <label class="field-label">Organization</label>
                <input v-model="form.organization" type="text" placeholder="Organization name" class="field-input" />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="field-label">Employment</label>
                <select v-model="form.employmentStatus" class="field-input">
                  <option value="EMPLOYED">Employed</option>
                  <option value="SELF_EMPLOYED">Self-Employed</option>
                  <option value="UNEMPLOYED">Unemployed</option>
                  <option value="STUDENT">Student</option>
                </select>
              </div>
              <div>
                <label class="field-label">Monthly Income</label>
                <input v-model.number="form.monthlyIncome" type="number" placeholder="5000" class="field-input" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="field-label">Availability</label>
                <select v-model="form.availabilityStatus" class="field-input">
                  <option value="AVAILABLE">Available</option>
                  <option value="PARTIALLY_AVAILABLE">Partially Available</option>
                  <option value="UNAVAILABLE">Unavailable</option>
                </select>
              </div>
              <div>
                <label class="field-label">Availability Note</label>
                <input v-model="form.availabilityNote" type="text" placeholder="e.g. Weekends only" class="field-input" />
              </div>
            </div>
            <div>
              <label class="field-label">Experience</label>
              <textarea v-model="form.experience" rows="2" placeholder="Brief summary of professional work" class="field-input resize-none"></textarea>
            </div>
            <div>
              <label class="field-label">Aspirations</label>
              <textarea v-model="form.aspirations" rows="2" placeholder="Movement goals or objectives" class="field-input resize-none"></textarea>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="field-label">Telegram</label>
                <input v-model="form.socialMedia.telegram" type="text" placeholder="@handle" class="field-input" />
              </div>
              <div>
                <label class="field-label">LinkedIn</label>
                <input v-model="form.socialMedia.linkedin" type="text" placeholder="URL" class="field-input" />
              </div>
              <div>
                <label class="field-label">Facebook</label>
                <input v-model="form.socialMedia.facebook" type="text" placeholder="URL" class="field-input" />
              </div>
            </div>
          </div>

          <!-- ═══ STEP 4: Account ═══ -->
          <div v-show="currentStep === 4" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="field-label">Password *</label>
                <input v-model="form.password" type="password" placeholder="••••••••" class="field-input" />
              </div>
              <div>
                <label class="field-label">Confirm Password *</label>
                <input v-model="confirmPassword" type="password" placeholder="••••••••" class="field-input" />
              </div>
            </div>

            <label class="flex items-start gap-3 cursor-pointer group pt-2">
              <input
                v-model="consent"
                type="checkbox"
                class="mt-1 w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <span class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                I authorize the coordinating committee to retain my profile details strictly for structured operations
                within the peaceful movement. Data remains confidential and fully protected. *
              </span>
            </label>
          </div>

          <!-- Error -->
          <div
            v-if="error"
            class="mt-4 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
          >
            <i class="fas fa-exclamation-circle shrink-0"></i>
            <span>{{ error }}</span>
          </div>
        </div>

        <!-- Footer nav -->
        <div class="shrink-0 border-t border-slate-100 px-6 py-4 md:px-8 bg-slate-50 flex items-center justify-between gap-3">
          <button
            v-if="currentStep > 1"
            type="button"
            @click="prevStep"
            class="px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition flex items-center gap-2"
          >
            <i class="fas fa-arrow-left text-xs"></i> Back
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < totalSteps"
            type="button"
            @click="nextStep"
            class="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            Continue <i class="fas fa-arrow-right text-xs"></i>
          </button>
          <button
            v-else
            type="button"
            @click="register"
            :disabled="loading || !consent"
            class="px-5 py-2.5 text-sm font-bold text-white bg-primary hover:bg-slate-900 disabled:opacity-50 rounded-xl transition flex items-center gap-2 shadow-sm"
          >
            <i v-if="loading" class="fas fa-spinner animate-spin"></i>
            <span>{{ loading ? 'Creating Account...' : 'Complete Registration' }}</span>
            <i v-if="!loading" class="fas fa-check text-xs"></i>
          </button>
        </div>

        <p class="text-center text-sm text-slate-600 py-3 border-t border-slate-100 bg-white">
          Already a registered member?
          <button @click="$emit('switch-to-login')" class="text-primary hover:underline font-bold ml-1">
            Sign In Here
          </button>
        </p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterModal',
  emits: ['close', 'switch-to-login'],

  data() {
    return {
      currentStep: 1,
      totalSteps: 4,
      stepTitles: ['Personal', 'Location', 'Professional', 'Account'],

      loading: false,
      loadingOptions: false,
      loadingZones: false,
      loadingWoredas: false,
      loadingTabiyas: false,
      success: false,
      error: '',
      consent: false,
      confirmPassword: '',

      educationLevels: [],
      professions: [],
      regions: [],
      zones: [],
      woredas: [],
      tabiyas: [],

      form: {
        fullName: '',
        roleId: 4,
        phoneNumber: '',
        email: '',
        password: '',
        membershipNumber: '',
        gender: '',
        dateOfBirth: '',
        maritalStatus: 'SINGLE',
        nationality: 'Ethiopian',
        regionId: '',
        zoneId: '',
        woredaId: '',
        tabiyaId: '',
        educationLevelId: '',
        professionId: '',
        occupation: '',
        organization: '',
        employmentStatus: 'EMPLOYED',
        monthlyIncome: null,
        availabilityStatus: 'AVAILABLE',
        availabilityNote: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        membershipDate: new Date().toISOString().split('T')[0],
        experience: '',
        certifications: '',
        volunteerExperience: '',
        aspirations: '',
        socialMedia: {
          facebook: '',
          telegram: '',
          linkedin: '',
        },
        bio: '',
      },
    };
  },

  async mounted() {
    await this.fetchInitialOptions();
  },

  methods: {
    locationStepDone(idx) {
      if (idx === 0) return !!this.form.regionId;
      if (idx === 1) return !!this.form.zoneId;
      if (idx === 2) return !!this.form.woredaId;
      if (idx === 3) return !!this.form.tabiyaId;
      return false;
    },

    validateStep(step) {
      this.error = '';
      if (step === 1) {
        if (!this.form.fullName?.trim()) return (this.error = 'Full name is required.');
        if (!this.form.phoneNumber?.trim()) return (this.error = 'Phone number is required.');
        if (!this.form.email?.trim()) return (this.error = 'Email is required.');
        if (!this.form.gender) return (this.error = 'Gender is required.');
        if (!this.form.dateOfBirth) return (this.error = 'Date of birth is required.');
      }
      if (step === 2) {
        if (!this.form.regionId) return (this.error = 'Region is required.');
        if (!this.form.zoneId) return (this.error = 'Zone is required.');
        if (!this.form.woredaId) return (this.error = 'Woreda is required.');
        if (!this.form.tabiyaId) return (this.error = 'Tabiya is required.');
      }
      if (step === 3) {
        if (!this.form.educationLevelId) return (this.error = 'Education level is required.');
        if (!this.form.professionId) return (this.error = 'Profession is required.');
      }
      if (step === 4) {
        if (!this.form.password) return (this.error = 'Password is required.');
        if (this.form.password.length < 6) return (this.error = 'Password must be at least 6 characters.');
        if (this.form.password !== this.confirmPassword) return (this.error = 'Passwords do not match.');
        if (!this.consent) return (this.error = 'You must accept the consent to continue.');
      }
      return true;
    },

    nextStep() {
      if (this.validateStep(this.currentStep) !== true) return;
      if (this.currentStep < this.totalSteps) this.currentStep += 1;
    },

    prevStep() {
      this.error = '';
      if (this.currentStep > 1) this.currentStep -= 1;
    },

    async fetchInitialOptions() {
      this.loadingOptions = true;
      try {
        const [eduRes, profRes, regionRes] = await Promise.all([
          this.$apiGet('/educationlevel'),
          this.$apiGet('/profession'),
          this.$apiGet('/region'),
        ]);
        this.educationLevels = (eduRes?.data || []).filter((i) => i.isActive !== false);
        this.professions = (profRes?.data || []).filter((i) => i.isActive !== false);
        this.regions = (regionRes?.data || []).filter((i) => i.isActive !== false);
      } catch (err) {
        this.error = 'Failed to load initial dropdown options.';
      } finally {
        this.loadingOptions = false;
      }
    },

    async onRegionChange() {
      this.form.zoneId = '';
      this.form.woredaId = '';
      this.form.tabiyaId = '';
      this.zones = [];
      this.woredas = [];
      this.tabiyas = [];
      if (!this.form.regionId) return;
      this.loadingZones = true;
      try {
        const res = await this.$apiGet('/zone', { regionId: this.form.regionId });
        this.zones = (res?.data || []).filter((i) => i.isActive !== false);
      } catch (err) {
        this.error = 'Failed to load zones for selected region.';
      } finally {
        this.loadingZones = false;
      }
    },

    async onZoneChange() {
      this.form.woredaId = '';
      this.form.tabiyaId = '';
      this.woredas = [];
      this.tabiyas = [];
      if (!this.form.zoneId) return;
      this.loadingWoredas = true;
      try {
        const res = await this.$apiGet('/woreda', { zoneId: this.form.zoneId });
        this.woredas = (res?.data || []).filter((i) => i.isActive !== false);
      } catch (err) {
        this.error = 'Failed to load woredas for selected zone.';
      } finally {
        this.loadingWoredas = false;
      }
    },

    async onWoredaChange() {
      this.form.tabiyaId = '';
      this.tabiyas = [];
      if (!this.form.woredaId) return;
      this.loadingTabiyas = true;
      try {
        const res = await this.$apiGet('/tabiya', { woredaId: this.form.woredaId });
        this.tabiyas = (res?.data || []).filter((i) => i.isActive !== false);
      } catch (err) {
        this.error = 'Failed to load tabiyas for selected woreda.';
      } finally {
        this.loadingTabiyas = false;
      }
    },

    async register() {
      if (this.validateStep(4) !== true) return;
      this.loading = true;
      this.error = '';
      try {
        await this.$apiPost('auth/signup', this.form);
        this.success = true;
      } catch (err) {
        this.error =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          'Registration failed. Please check your information and try again.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.field-label {
  @apply block text-slate-800 text-xs font-bold mb-1.5 tracking-wide;
}
.field-input {
  @apply w-full px-3.5 py-2.5 border border-slate-300 bg-white rounded-lg
         focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
         text-slate-900 font-medium placeholder:text-slate-400 text-sm transition-all
         disabled:bg-slate-50 disabled:text-slate-400;
}
</style>