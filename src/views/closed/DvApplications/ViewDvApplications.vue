<template>
  <main class="min-h-full bg-slate-50 px-4 py-6 text-slate-800 sm:px-6">
    <div class="mx-auto max-w-7xl">
      <header class="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-xs font-bold uppercase tracking-[.2em] text-amber-700">Redmit · DV assistance</p>
          <h1 class="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{{ isAdmin ? 'DV program management' : 'My DV applications' }}</h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{{ isAdmin ? 'Publish and maintain Diversity Visa programs. Program listings are shown on the public landing page.' : 'Choose a published program, submit your request, and keep your documents and progress together in one place.' }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <router-link to="/dashboard/orders" class="border border-slate-200 bg-white px-3 py-2 text-xs font-bold hover:border-amber-300">My orders</router-link>
          <router-link to="/dashboard/payments" class="border border-slate-200 bg-white px-3 py-2 text-xs font-bold hover:border-amber-300">Payments</router-link>
        </div>
      </header>

      <div v-if="notice" class="mb-4 border px-4 py-3 text-sm" :class="noticeType === 'error' ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'">{{ notice }}</div>

      <section v-if="isAdmin" class="mb-8 border border-slate-200 bg-white p-5 shadow-sm">
        <div class="mb-4 flex items-start justify-between gap-4">
          <div><h2 class="text-lg font-extrabold text-slate-950">{{ editingId ? 'Edit DV program' : 'Publish a DV program' }}</h2><p class="mt-1 text-xs leading-5 text-slate-500">Set the DV year and application window. Fee and currency fields are submitted empty as requested by the API contract.</p></div>
          <button v-if="editingId" type="button" @click="resetProgramForm" class="text-xs font-bold text-slate-500 underline">Cancel edit</button>
        </div>
        <form class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" @submit.prevent="saveProgram">
          <label class="block text-xs font-bold text-slate-600">DV year *
            <input v-model.number="programForm.dvYear" type="number" min="2024" max="2100" required class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500" />
          </label>
          <label class="block text-xs font-bold text-slate-600">Application opens *
            <input v-model="programForm.startDate" type="datetime-local" required class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500" />
          </label>
          <label class="block text-xs font-bold text-slate-600">Application closes *
            <input v-model="programForm.endDate" type="datetime-local" required class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-amber-500" />
          </label>
          <label class="block text-xs font-bold text-slate-600">Program thumbnail
            <input type="file" accept="image/*" @change="onThumbnailChange" class="mt-1 block w-full text-xs file:mr-3 file:border-0 file:bg-amber-50 file:px-3 file:py-2 file:font-bold file:text-amber-800" />
          </label>
          <div class="md:col-span-2 xl:col-span-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
            <button :disabled="savingProgram" type="submit" class="bg-slate-950 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700 disabled:opacity-50">{{ savingProgram ? 'Saving…' : editingId ? 'Save changes' : 'Publish program' }}</button>
            <span class="text-xs text-slate-400">Program changes appear on the public landing page after refresh.</span>
          </div>
        </form>
      </section>

      <section v-if="isAdmin" class="mb-8">
        <div class="mb-3 flex items-center justify-between"><h2 class="text-lg font-extrabold text-slate-950">Published programs</h2><button type="button" @click="fetchPrograms" class="text-xs font-bold text-amber-800 hover:underline">Refresh</button></div>
        <div v-if="loadingPrograms" class="border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading DV programs…</div>
        <div v-else-if="!programs.length" class="border border-dashed border-slate-300 bg-white p-8 text-center"><p class="font-bold text-slate-700">No DV programs yet</p><p class="mt-1 text-sm text-slate-500">Publish a program above to make it available to customers.</p></div>
        <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="program in programs" :key="program.id" class="overflow-hidden border border-slate-200 bg-white">
            <img v-if="program.thumbnail || program.thumbnailUrl || program.imageUrl" :src="program.thumbnailUrl || program.thumbnail || program.imageUrl" :alt="'DV program ' + program.dvYear" class="h-40 w-full object-cover" />
            <div class="p-4">
              <div class="flex items-start justify-between gap-3"><h3 class="text-base font-extrabold text-slate-950">DV Program {{ program.dvYear || '—' }}</h3><span class="bg-emerald-50 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">{{ program.isActive === false ? 'Inactive' : 'Published' }}</span></div>
              <p class="mt-3 text-xs text-slate-500">Opens: {{ formatDate(program.startDate) }}</p><p class="mt-1 text-xs text-slate-500">Closes: {{ formatDate(program.endDate) }}</p>
              <div class="mt-4 flex gap-2 border-t border-slate-100 pt-3"><button type="button" @click="editProgram(program)" class="border border-slate-200 px-3 py-2 text-xs font-bold hover:border-amber-400">Edit</button><button type="button" @click="toggleProgram(program)" class="border border-slate-200 px-3 py-2 text-xs font-bold hover:border-amber-400">{{ program.isActive === false ? 'Publish' : 'Deactivate' }}</button></div>
            </div>
          </article>
        </div>
      </section>

      <section v-else class="mb-8">
        <div class="mb-3 flex items-center justify-between"><div><h2 class="text-lg font-extrabold text-slate-950">Available DV programs</h2><p class="mt-1 text-xs text-slate-500">You must be signed in to submit a request or upload documents.</p></div><button type="button" @click="fetchPrograms" class="text-xs font-bold text-amber-800 hover:underline">Refresh</button></div>
        <div v-if="loadingPrograms" class="border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading programs…</div>
        <div v-else-if="!programs.length" class="border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">There are no published DV programs at the moment. Please check back later.</div>
        <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article v-for="program in programs.filter(item => item.isActive !== false)" :key="program.id" class="overflow-hidden border border-slate-200 bg-white shadow-sm">
            <img v-if="program.thumbnailUrl || program.thumbnail || program.imageUrl" :src="program.thumbnailUrl || program.thumbnail || program.imageUrl" :alt="'DV program ' + program.dvYear" class="h-44 w-full object-cover" />
            <div class="p-5"><p class="text-[10px] font-black uppercase tracking-[.18em] text-amber-700">Diversity Visa assistance</p><h3 class="mt-2 text-xl font-black text-slate-950">DV {{ program.dvYear }}</h3><div class="mt-4 space-y-2 text-xs text-slate-500"><p><span class="font-bold text-slate-700">Opens:</span> {{ formatDate(program.startDate) }}</p><p><span class="font-bold text-slate-700">Closes:</span> {{ formatDate(program.endDate) }}</p></div><button type="button" @click="selectProgram(program)" class="mt-5 w-full bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-amber-700">Start a request <span aria-hidden="true">→</span></button></div>
          </article>
        </div>
      </section>

      <section v-if="!isAdmin && selectedProgram" class="mb-8 border border-amber-200 bg-white p-5 shadow-sm sm:p-6">
        <div class="mb-5 flex items-start justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-widest text-amber-700">New application request</p><h2 class="mt-1 text-xl font-black text-slate-950">DV {{ selectedProgram.dvYear }}</h2><p class="mt-1 text-xs text-slate-500">Share only the details needed to process your request. You can upload supporting documents after submitting.</p></div><button type="button" @click="selectedProgram = null" class="text-xs font-bold text-slate-500 underline">Close</button></div>
        <form @submit.prevent="submitRequest" class="space-y-5">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label class="block text-xs font-bold text-slate-600">Request type *
              <select v-model="requestForm.requestType" required class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm"><option value="PAYMENT_ASSISTANCE">Payment assistance</option><option value="FORM_FILLING">Form filling assistance</option><option value="INTERNATIONAL_PAYMENT">International payment assistance</option></select>
            </label>
            <label class="flex items-center gap-3 border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-700"><input v-model="requestForm.needsInternationalPayment" type="checkbox" class="h-4 w-4 accent-amber-600" /> I need international payment assistance</label>
          </div>
          <div><h3 class="mb-3 text-sm font-extrabold text-slate-800">Applicant details</h3><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <label class="block text-xs font-bold text-slate-600">Full name *<input v-model.trim="requestForm.fullName" required autocomplete="name" class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm" /></label>
            <label class="block text-xs font-bold text-slate-600">Email *<input v-model.trim="requestForm.email" type="email" required autocomplete="email" class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm" /></label>
            <label class="block text-xs font-bold text-slate-600">Phone (optional)<input v-model.trim="requestForm.phone" type="tel" autocomplete="tel" class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm" /></label>
            <label class="block text-xs font-bold text-slate-600">Country of birth<input v-model.trim="requestForm.countryOfBirth" class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm" /></label>
            <label class="block text-xs font-bold text-slate-600">Country of residence<input v-model.trim="requestForm.countryOfResidence" class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm" /></label>
            <label class="block text-xs font-bold text-slate-600">Passport status<select v-model="requestForm.passportStatus" class="mt-1 w-full border border-slate-200 px-3 py-2.5 text-sm"><option value="">Select status</option><option value="HAS_PASSPORT">I have a passport</option><option value="IN_PROGRESS">In progress</option><option value="NO_PASSPORT">Not yet</option></select></label>
          </div></div>
          <div class="border-t border-slate-100 pt-4"><h3 class="mb-2 text-sm font-extrabold text-slate-800">Documents (optional)</h3><p class="mb-3 text-xs leading-5 text-slate-500">Upload only relevant documents. Files are sent to the application's document endpoint after the request is created.</p><div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label v-for="doc in documentTypes" :key="doc.value" class="block border border-slate-200 p-3 text-xs font-bold text-slate-600">{{ doc.label }}<input type="file" :accept="doc.value.includes('PHOTO') ? 'image/*' : undefined" @change="setDocument($event, doc.value)" class="mt-2 block w-full text-xs file:mr-2 file:border-0 file:bg-slate-100 file:px-2 file:py-1.5" /></label>
          </div></div>
          <label class="flex items-start gap-3 text-xs leading-5 text-slate-600"><input v-model="requestForm.consent" type="checkbox" required class="mt-1 h-4 w-4 accent-amber-600" /><span>I confirm the information is accurate and consent to Redmit using the submitted details and documents to process this assistance request. I understand assistance does not guarantee selection or a visa and does not replace the official U.S. government entry process.</span></label>
          <button :disabled="submittingRequest" type="submit" class="bg-amber-700 px-5 py-3 text-sm font-bold text-white hover:bg-amber-800 disabled:opacity-50">{{ submittingRequest ? 'Submitting…' : 'Submit DV request' }}</button>
        </form>
      </section>

      <section v-if="!isAdmin" class="border border-slate-200 bg-white">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5"><div><h2 class="text-lg font-extrabold text-slate-950">My DV requests</h2><p class="mt-1 text-xs text-slate-500">Only requests returned for your signed-in account are shown here.</p></div><button type="button" @click="fetchMyRequests" class="text-xs font-bold text-amber-800 hover:underline">Refresh requests</button></div>
        <div v-if="loadingRequests" class="p-6 text-sm text-slate-500">Loading your requests…</div>
        <div v-else-if="!myRequests.length" class="p-6 text-sm text-slate-500">You have not submitted a DV request yet.</div>
        <div v-else class="divide-y divide-slate-100">
          <article v-for="request in myRequests" :key="request.id" class="p-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h3 class="font-extrabold text-slate-900">DV {{ request.dvYear || request.program?.dvYear || 'Program' }} · {{ humanize(request.requestType) }}</h3><p class="mt-1 text-xs text-slate-500">Submitted {{ formatDate(request.createdAt || request.submittedAt) }}</p></div><span class="self-start bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-600">{{ humanize(request.status || 'SUBMITTED') }}</span></div>
            <div class="mt-3 flex flex-wrap gap-3 text-xs"><router-link to="/dashboard/orders" class="font-bold text-amber-800 hover:underline">View related orders</router-link><router-link to="/dashboard/payments" class="font-bold text-amber-800 hover:underline">View payments</router-link></div>
          </article>
        </div>
      </section>
      <p class="mt-5 text-[11px] leading-5 text-slate-400">Privacy note: upload only documents needed for your request. Do not share passwords or unrelated financial information. For official rules and entry dates, consult the U.S. Department of State.</p>
    </div>
  </main>
</template>

<script>
const EMPTY_REQUEST = () => ({
  requestType: 'PAYMENT_ASSISTANCE',
  needsInternationalPayment: false,
  fullName: '',
  email: '',
  phone: '',
  countryOfBirth: '',
  countryOfResidence: '',
  passportStatus: '',
  consent: false,
});

export default {
  name: 'DvApplicationsView',
  data() {
    return {
      isAdmin: (localStorage.getItem('role') || '').toUpperCase() === 'ADMIN',
      programs: [],
      loadingPrograms: false,
      savingProgram: false,
      editingId: null,
      programThumbnail: null,
      programForm: { dvYear: new Date().getFullYear() + 1, startDate: '', endDate: '' },
      selectedProgram: null,
      requestForm: EMPTY_REQUEST(),
      selectedDocuments: {},
      documentTypes: [
        { value: 'APPLICANT_PHOTO', label: 'Applicant photo' },
        { value: 'PASSPORT', label: 'Passport' },
        { value: 'SUPPORTING_DOCUMENT', label: 'Supporting document' },
        { value: 'INTERNATIONAL_PAYMENT_CONFIRMATION', label: 'International payment confirmation' },
      ],
      submittingRequest: false,
      myRequests: [],
      loadingRequests: false,
      notice: '',
      noticeType: 'success',
    };
  },
  async mounted() {
    await this.fetchPrograms();
    if (!this.isAdmin) {
      await this.fetchMyRequests();
      const programId = this.$route.query.apply;
      if (programId) {
        const found = this.programs.find(program => String(program.id) === String(programId));
        if (found) this.selectProgram(found);
      }
    }
  },
  methods: {
    normalizeList(response, keys = []) {
      if (Array.isArray(response)) return response;
      if (Array.isArray(response?.data)) return response.data;
      for (const key of keys) {
        if (Array.isArray(response?.[key])) return response[key];
        if (Array.isArray(response?.data?.[key])) return response.data[key];
      }
      return [];
    },
    async fetchPrograms() {
      this.loadingPrograms = true;
      try {
        const response = await this.$apiGet('/dv-programs');
        this.programs = this.normalizeList(response, ['programs', 'dvPrograms']).filter(item => item && item.id);
      } catch (error) {
        this.programs = [];
        this.showNotice(this.errorMessage(error, 'Unable to load DV programs. Please try again.'), 'error');
      } finally { this.loadingPrograms = false; }
    },
    async saveProgram() {
      if (!this.programForm.startDate || !this.programForm.endDate || new Date(this.programForm.endDate) <= new Date(this.programForm.startDate)) {
        this.showNotice('Choose a closing date and time later than the opening date.', 'error');
        return;
      }
      this.savingProgram = true;
      const payload = new FormData();
      payload.append('dvYear', String(this.programForm.dvYear));
      payload.append('startDate', new Date(this.programForm.startDate).toISOString());
      payload.append('endDate', new Date(this.programForm.endDate).toISOString());
      payload.append('paymentAssistanceFee', '');
      payload.append('formFillingFee', '');
      payload.append('internationalPaymentFee', '');
      payload.append('currency', '');
      if (this.programThumbnail) payload.append('thumbnail', this.programThumbnail);
      try {
        if (this.editingId) {
          await this.$apiPut('/dv-programs', this.editingId, payload, { 'Content-Type': 'multipart/form-data' });
          this.showNotice('DV program updated.');
        } else {
          await this.$apiPost('/dv-programs', payload, { 'Content-Type': 'multipart/form-data' });
          this.showNotice('DV program published.');
        }
        this.resetProgramForm();
        await this.fetchPrograms();
      } catch (error) {
        this.showNotice(this.errorMessage(error, 'Unable to save the DV program. Check the API response and try again.'), 'error');
      } finally { this.savingProgram = false; }
    },
    editProgram(program) {
      this.editingId = program.id;
      this.programForm = {
        dvYear: Number(program.dvYear) || new Date().getFullYear() + 1,
        startDate: this.toLocalDateTime(program.startDate),
        endDate: this.toLocalDateTime(program.endDate),
      };
      this.programThumbnail = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async toggleProgram(program) {
      const nextActive = program.isActive === false;
      try {
        await this.$apiPut('/dv-programs', program.id, { isActive: nextActive });
        this.showNotice(nextActive ? 'DV program published.' : 'DV program deactivated.');
        await this.fetchPrograms();
      } catch (error) {
        this.showNotice(this.errorMessage(error, 'Unable to change this program status. If the API does not support status updates yet, use the edit action instead.'), 'error');
      }
    },
    resetProgramForm() {
      this.editingId = null;
      this.programThumbnail = null;
      this.programForm = { dvYear: new Date().getFullYear() + 1, startDate: '', endDate: '' };
    },
    onThumbnailChange(event) { this.programThumbnail = event.target.files?.[0] || null; },
    selectProgram(program) {
      this.selectedProgram = program;
      this.requestForm = EMPTY_REQUEST();
      this.selectedDocuments = {};
      this.notice = '';
      this.$nextTick(() => document.querySelector('section form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    },
    setDocument(event, documentType) {
      const file = event.target.files?.[0];
      if (file) this.selectedDocuments[documentType] = file;
      else delete this.selectedDocuments[documentType];
    },
    async submitRequest() {
      if (!this.selectedProgram?.id) return this.showNotice('Select a DV program first.', 'error');
      this.submittingRequest = true;
      const applicantDetails = {
        fullName: this.requestForm.fullName,
        email: this.requestForm.email,
        ...(this.requestForm.phone ? { phone: this.requestForm.phone } : {}),
        ...(this.requestForm.countryOfBirth ? { countryOfBirth: this.requestForm.countryOfBirth } : {}),
        ...(this.requestForm.countryOfResidence ? { countryOfResidence: this.requestForm.countryOfResidence } : {}),
        ...(this.requestForm.passportStatus ? { passportStatus: this.requestForm.passportStatus } : {}),
        consentedAt: new Date().toISOString(),
      };
      try {
        const response = await this.$apiPost('/dv-application-requests', {
          dvProgramId: this.selectedProgram.id,
          requestType: this.requestForm.requestType,
          needsInternationalPayment: this.requestForm.needsInternationalPayment,
          applicantDetails,
        });
        const request = response?.data?.request || response?.request || response?.data || response;
        const requestId = request?.id || request?.requestId;
        if (requestId) {
          const failedUploads = [];
          for (const [documentType, file] of Object.entries(this.selectedDocuments)) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('documentType', documentType);
            try {
              await this.$apiPost('/dv-application-requests/' + encodeURIComponent(requestId) + '/documents', formData, { 'Content-Type': 'multipart/form-data' });
            } catch (_uploadError) { failedUploads.push(file.name); }
          }
          this.showNotice(failedUploads.length ? 'Your request was submitted, but these documents could not be uploaded: ' + failedUploads.join(', ') + '. Open your request and retry uploading.' : 'Your DV request was submitted successfully.');
        } else {
          this.showNotice('Your DV request was submitted. The API did not return a request ID, so document uploads were skipped.');
        }
        this.selectedProgram = null;
        this.requestForm = EMPTY_REQUEST();
        this.selectedDocuments = {};
        await this.fetchMyRequests();
      } catch (error) {
        this.showNotice(this.errorMessage(error, 'Unable to submit your DV request. Please review the form and try again.'), 'error');
      } finally { this.submittingRequest = false; }
    },
    async fetchMyRequests() {
      this.loadingRequests = true;
      try {
        const response = await this.$apiGet('/dv-application-requests/my');
        this.myRequests = this.normalizeList(response, ['requests', 'dvApplicationRequests']);
      } catch (error) {
        this.myRequests = [];
        this.showNotice(this.errorMessage(error, 'Unable to load your DV requests. Your account is unchanged; try refreshing later.'), 'error');
      } finally { this.loadingRequests = false; }
    },
    toLocalDateTime(value) {
      if (!value) return '';
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return '';
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return local.toISOString().slice(0, 16);
    },
    formatDate(value) {
      if (!value) return 'Not set';
      const date = new Date(value);
      return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    },
    humanize(value) { return String(value || '').replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, char => char.toUpperCase()); },
    errorMessage(error, fallback) {
      return error?.response?.data?.message || error?.response?.data?.error || error?.message || fallback;
    },
    showNotice(message, type = 'success') {
      this.notice = message;
      this.noticeType = type;
    },
  },
};
</script>
