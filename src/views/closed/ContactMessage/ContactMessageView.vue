<template>
  <div class="p-6 space-y-5">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-black text-slate-900">Contact Messages</h1>
        <p class="text-slate-500 text-sm">Customer inquiries and support messages</p>
      </div>
      <button @click="markAllRead" class="flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition">
        <i class="fas fa-check-double text-xs"></i> Mark All Read
      </button>
    </div>

    <!-- Stats cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div v-for="s in stats" :key="s.label"
        class="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col gap-2">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center" :class="s.iconBg">
          <i :class="[s.icon, s.iconColor, 'text-sm']"></i>
        </div>
        <div>
          <p class="text-xl font-black text-slate-900 leading-none">{{ s.value }}</p>
          <p class="text-xs text-slate-500 mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap gap-3">
      <button v-for="f in filters" :key="f.value"
        @click="activeFilter = f.value"
        class="px-4 py-2 text-xs font-bold rounded-xl border transition"
        :class="activeFilter === f.value ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary'">
        {{ f.label }}
        <span v-if="f.count" class="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px]"
          :class="activeFilter === f.value ? 'bg-white/20' : 'bg-slate-100'">
          {{ f.count }}
        </span>
      </button>
    </div>

    <!-- Messages list -->
    <div class="bg-white border border-slate-200 rounded-2xl overflow-hidden">
      <div class="divide-y divide-slate-50">
        <div v-for="msg in filteredMessages" :key="msg.id"
          class="flex items-start gap-4 px-5 py-4 hover:bg-slate-50/50 transition-colors cursor-pointer"
          :class="{ 'bg-blue-50/30': msg.unread }"
          @click="openMessage(msg)">
          <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" :class="msg.avatarBg">
            <span class="font-black text-sm" :class="msg.avatarColor">{{ msg.initials }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2 mb-1">
              <div class="flex items-center gap-2">
                <p class="text-sm font-bold text-slate-800">{{ msg.name }}</p>
                <span v-if="msg.unread" class="w-2 h-2 bg-primary rounded-full"></span>
              </div>
              <span class="text-[10px] text-slate-400 shrink-0">{{ msg.time }}</span>
            </div>
            <p class="text-xs text-slate-600 mb-1">{{ msg.email }}</p>
            <p class="text-xs font-semibold text-slate-700 mb-1">{{ msg.subject }}</p>
            <p class="text-xs text-slate-500 line-clamp-2">{{ msg.message }}</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full" :class="msg.statusCls">
                {{ msg.status }}
              </span>
              <span class="text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {{ msg.category }}
              </span>
            </div>
          </div>
          <div class="flex flex-col gap-1 shrink-0">
            <button @click.stop="replyMessage(msg)" class="w-8 h-8 rounded-lg bg-blue-100 hover:bg-blue-500 hover:text-white text-blue-600 flex items-center justify-center transition text-xs">
              <i class="fas fa-reply"></i>
            </button>
            <button @click.stop="archiveMessage(msg)" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition text-xs">
              <i class="fas fa-archive"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Detail Modal -->
    <div v-if="selectedMessage" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="selectedMessage = null">
      <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="sticky top-0 bg-primary px-6 py-4 flex items-center justify-between">
          <h3 class="text-sm font-black text-white">Message Details</h3>
          <button @click="selectedMessage = null" class="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition">
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex items-start gap-4 pb-4 border-b border-slate-100">
            <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" :class="selectedMessage.avatarBg">
              <span class="font-black text-sm" :class="selectedMessage.avatarColor">{{ selectedMessage.initials }}</span>
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-slate-800">{{ selectedMessage.name }}</p>
              <p class="text-xs text-slate-600">{{ selectedMessage.email }}</p>
              <p class="text-xs text-slate-600">{{ selectedMessage.phone }}</p>
              <p class="text-[10px] text-slate-400 mt-1">{{ selectedMessage.time }}</p>
            </div>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Subject</p>
            <p class="text-sm font-semibold text-slate-800">{{ selectedMessage.subject }}</p>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Message</p>
            <p class="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{{ selectedMessage.message }}</p>
          </div>
          <div class="flex gap-3 pt-4">
            <button @click="replyMessage(selectedMessage)" class="flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-bold rounded-xl transition">
              <i class="fas fa-reply text-xs"></i> Reply
            </button>
            <button @click="markAsResolved(selectedMessage)" class="flex items-center gap-2 px-6 py-2.5 bg-green-100 hover:bg-green-500 hover:text-white text-green-600 text-xs font-bold rounded-xl transition">
              <i class="fas fa-check text-xs"></i> Mark Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactMessageView',
  data() {
    return {
      selectedMessage: null,
      activeFilter: 'all',
      filters: [
        { value: 'all',      label: 'All Messages', count: '48' },
        { value: 'unread',   label: 'Unread',       count: '12' },
        { value: 'pending',  label: 'Pending',      count: '8' },
        { value: 'resolved', label: 'Resolved',     count: '28' },
      ],
      stats: [
        { label: 'Total Messages', value: '48',  icon: 'fas fa-envelope',     iconBg: 'bg-blue-50',   iconColor: 'text-blue-600' },
        { label: 'Unread',         value: '12',  icon: 'fas fa-envelope-open',iconBg: 'bg-amber-50',  iconColor: 'text-amber-600' },
        { label: 'Pending',        value: '8',   icon: 'fas fa-clock',        iconBg: 'bg-red-50',    iconColor: 'text-red-600' },
        { label: 'Resolved',       value: '28',  icon: 'fas fa-check-circle', iconBg: 'bg-green-50',  iconColor: 'text-green-600' },
      ],
      messages: [
        { id: 1,  name: 'Abebe Tadesse',   email: 'abebe@email.com',   phone: '+251 911 111 111', subject: 'Question about Pay For Me service',     message: 'Hello, I would like to know more about the Pay For Me service. How does it work and what services can you pay for on my behalf? I am particularly interested in ChatGPT Plus subscription.',                           time: '5 min ago',    category: 'Support',   unread: true,  status: 'New',      statusCls: 'bg-amber-100 text-amber-700', initials: 'AT', avatarBg: 'bg-blue-100',   avatarColor: 'text-blue-600' },
        { id: 2,  name: 'Sara Mekonnen',   email: 'sara@email.com',    phone: '+251 912 222 222', subject: 'Digital Asset listing approval',        message: 'Hi, I submitted my TikTok account for listing 3 days ago but haven\'t received any response. Can you please check the status? The account has 128K followers and is in the comedy niche.',                            time: '22 min ago',   category: 'Listing',   unread: true,  status: 'Pending',  statusCls: 'bg-blue-100 text-blue-700',   initials: 'SM', avatarBg: 'bg-purple-100',avatarColor: 'text-purple-600' },
        { id: 3,  name: 'Dawit Kebede',    email: 'dawit@email.com',   phone: '+251 913 333 333', subject: 'Payment issue',                         message: 'I made a payment for a digital product 2 hours ago but it still shows pending. My transaction ID is PAY10239. Please help resolve this issue as soon as possible.',                                               time: '1 hour ago',   category: 'Payment',   unread: true,  status: 'Urgent',   statusCls: 'bg-red-100 text-red-600',     initials: 'DK', avatarBg: 'bg-red-100',   avatarColor: 'text-red-600' },
        { id: 4,  name: 'Meron Hailu',     email: 'meron@email.com',   phone: '+251 914 444 444', subject: 'Feedback on platform',                  message: 'Great platform! I love the digital products marketplace. Just wanted to suggest adding more payment options like M-Pesa and Amole. Keep up the good work!',                                                         time: '3 hours ago',  category: 'Feedback',  unread: false, status: 'Resolved', statusCls: 'bg-green-100 text-green-700', initials: 'MH', avatarBg: 'bg-pink-100',  avatarColor: 'text-pink-600' },
        { id: 5,  name: 'Yonas Alemayehu',email: 'yonas@email.com',   phone: '+251 915 555 555', subject: 'How to monetize my YouTube channel?',   message: 'I have a YouTube channel with 32K subscribers but cannot monetize it from Ethiopia. How can your monetization service help me? What is the process and how much does it cost?',                                     time: '5 hours ago',  category: 'Inquiry',   unread: false, status: 'Resolved', statusCls: 'bg-green-100 text-green-700', initials: 'YA', avatarBg: 'bg-indigo-100',avatarColor: 'text-indigo-600' },
        { id: 6,  name: 'Tigist Mulugeta', email: 'tigist@email.com',  phone: '+251 916 666 666', subject: 'Refund request',                         message: 'I accidentally purchased the wrong digital product. Order #10236. Can I get a refund or exchange it for another product? The purchase was made 30 minutes ago.',                                                    time: 'Yesterday',    category: 'Refund',    unread: false, status: 'Pending',  statusCls: 'bg-blue-100 text-blue-700',   initials: 'TM', avatarBg: 'bg-emerald-100',avatarColor:'text-emerald-600' },
        { id: 7,  name: 'Hanna Tesfaye',   email: 'hanna@email.com',   phone: '+251 917 777 777', subject: 'Partnership opportunity',               message: 'Hello Redmit team, I run a digital marketing agency and would like to explore partnership opportunities. Can we schedule a call to discuss potential collaboration?',                                                time: '2 days ago',   category: 'Business',  unread: false, status: 'Resolved', statusCls: 'bg-green-100 text-green-700', initials: 'HT', avatarBg: 'bg-orange-100',avatarColor: 'text-orange-600' },
        { id: 8,  name: 'Biniam Girma',    email: 'biniam@email.com',  phone: '+251 918 888 888', subject: 'Question about advertising service',    message: 'I want to run Facebook ads for my e-commerce business. What packages do you offer and what is the minimum budget required? Also, do you provide ad creative design?',                                            time: '3 days ago',   category: 'Support',   unread: false, status: 'Resolved', statusCls: 'bg-green-100 text-green-700', initials: 'BG', avatarBg: 'bg-slate-100', avatarColor: 'text-slate-600' },
      ],
    };
  },
  computed: {
    filteredMessages() {
      if (this.activeFilter === 'all') return this.messages;
      if (this.activeFilter === 'unread') return this.messages.filter(m => m.unread);
      return this.messages.filter(m => m.status.toLowerCase() === this.activeFilter);
    },
  },
  methods: {
    openMessage(msg) {
      msg.unread = false;
      this.selectedMessage = msg;
    },
    replyMessage(msg) {
      alert(`Replying to ${msg.name} at ${msg.email}`);
    },
    archiveMessage(msg) {
      alert(`Archived message from ${msg.name}`);
    },
    markAsResolved(msg) {
      msg.status = 'Resolved';
      msg.statusCls = 'bg-green-100 text-green-700';
      this.selectedMessage = null;
    },
    markAllRead() {
      this.messages.forEach(m => m.unread = false);
    },
  },
};
</script>
