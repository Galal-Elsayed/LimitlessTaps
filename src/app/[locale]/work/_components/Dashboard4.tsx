"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Bell, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Search,
  Folder,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Building,
  Star,
  User,
  Moon,
  Sun,
  Award,
  Target,
  Phone,
  FileText,
  Handshake,
  XCircle,
  TrendingUp,
  Clock,
  CheckCircle,
  Menu,
  ChevronLeft
} from "lucide-react";

// =====================
// Mock Data
// =====================

const dashboardStats = {
  generatedRevenue: { value: "$847,320", change: 12.5 },
  signedClients: { value: "1,247", change: -3.2 },
  totalLeads: { value: "8,432", change: 8.7 },
  teamMembers: { value: "24", activeCount: 18 },
};

const leadsData = [
  { month: "Jan", calls: 45, proposals: 32, signed: 18, lost: 12 },
  { month: "Feb", calls: 52, proposals: 38, signed: 22, lost: 15 },
  { month: "Mar", calls: 61, proposals: 45, signed: 28, lost: 18 },
  { month: "Apr", calls: 48, proposals: 35, signed: 20, lost: 14 },
  { month: "May", calls: 67, proposals: 52, signed: 35, lost: 20 },
  { month: "Jun", calls: 74, proposals: 58, signed: 42, lost: 22 },
];

const topPerformers = [
  { id: 1, name: "Sarah Chen", score: 98, avatar: "SC", deals: 42, revenue: "$245,000" },
  { id: 2, name: "Michael Roberts", score: 94, avatar: "MR", deals: 38, revenue: "$198,000" },
  { id: 3, name: "Emily Johnson", score: 89, avatar: "EJ", deals: 35, revenue: "$175,000" },
  { id: 4, name: "David Kim", score: 85, avatar: "DK", deals: 31, revenue: "$156,000" },
  { id: 5, name: "Lisa Zhang", score: 82, avatar: "LZ", deals: 28, revenue: "$142,000" },
];

const allLeads = [
  { id: 1, company: "Tech Solutions Inc", contact: "John Smith", email: "john@techsolutions.com", phone: "+1 555-0101", status: "Proposal", value: "$45,000", probability: 75, lastContact: "2 days ago" },
  { id: 2, company: "Global Industries", contact: "Sarah Wilson", email: "sarah@global.com", phone: "+1 555-0102", status: "Negotiation", value: "$120,000", probability: 60, lastContact: "1 day ago" },
  { id: 3, company: "StartUp Labs", contact: "Mike Chen", email: "mike@startuplabs.io", phone: "+1 555-0103", status: "New", value: "$25,000", probability: 30, lastContact: "Today" },
  { id: 4, company: "Enterprise Corp", contact: "Emma Davis", email: "emma@enterprise.com", phone: "+1 555-0104", status: "Closed Won", value: "$85,000", probability: 100, lastContact: "1 week ago" },
  { id: 5, company: "Digital Agency", contact: "Alex Brown", email: "alex@digital.com", phone: "+1 555-0105", status: "Closed Lost", value: "$35,000", probability: 0, lastContact: "3 days ago" },
  { id: 6, company: "Innovation Hub", contact: "Lisa Park", email: "lisa@innovationhub.com", phone: "+1 555-0106", status: "Proposal", value: "$67,000", probability: 65, lastContact: "Yesterday" },
  { id: 7, company: "Cloud Systems", contact: "Tom Anderson", email: "tom@cloudsystems.io", phone: "+1 555-0107", status: "New", value: "$38,000", probability: 25, lastContact: "Today" },
];

const notificationsData = [
  { id: 1, title: "New lead assigned", message: "Tech Solutions Inc has been assigned to you", time: "5 min ago", read: false, type: "lead" },
  { id: 2, title: "Deal closed!", message: "Enterprise Corp deal worth $85,000 is now closed", time: "1 hour ago", read: false, type: "success" },
  { id: 3, title: "Follow-up reminder", message: "Follow up with Global Industries scheduled for today", time: "2 hours ago", read: true, type: "reminder" },
  { id: 4, title: "New comment", message: "Michael left a comment on StartUp Labs proposal", time: "3 hours ago", read: true, type: "comment" },
  { id: 5, title: "Weekly report ready", message: "Your weekly sales report is now available", time: "Yesterday", read: true, type: "report" },
];

const analyticsData = {
  conversionRate: 24.5,
  avgDealSize: 67800,
  avgSalesCycle: 32,
  winRate: 68,
};

const goalsData = [
  { name: "Monthly Revenue", target: "$500,000", current: "$425,000", progress: 85 },
  { name: "New Clients", target: "50", current: "42", progress: 84 },
  { name: "Proposals Sent", target: "100", current: "78", progress: 78 },
  { name: "Conversion Rate", target: "30%", current: "24.5%", progress: 82 },
];

// =====================
// Sidebar Component
// =====================

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "notifications", icon: Bell, label: "Notifications", badge: "5" },
  { id: "leads", icon: Users, label: "Leads" },
  { id: "analytics", icon: BarChart3, label: "Analytics" },
  { id: "goals", icon: Target, label: "Goals" },
];

const favorites = [
  { icon: Folder, label: "Active Deals" },
  { icon: Folder, label: "Pipeline" },
  { icon: Folder, label: "Reports" },
];

const footerItems = [
  { icon: MessageSquare, label: "Feedback" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help Center" },
];

function DashboardSidebar({ activeTab, onTabChange, isOpen, onToggle }: { activeTab: string; onTabChange: (tab: string) => void; isOpen: boolean; onToggle: () => void }) {
  const [favoritesOpen, setFavoritesOpen] = useState(true);

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-14'} h-full bg-[#0a0a0a] border-r border-white/10 flex flex-col transition-all duration-300`}>
      {/* Header */}
      <div className={`${isOpen ? 'p-5 pb-0' : 'p-2 pb-0'}`}>
        <div className="flex items-center justify-between">
          {isOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-linear-to-br from-cyan-400 via-blue-500 to-purple-500" />
                <span className="font-medium text-gray-400">Sales CRM</span>
              </div>
              <button onClick={onToggle} className="size-7 rounded bg-[#1a1a1a] flex items-center justify-center hover:bg-white/10">
                <ChevronLeft className="size-4 text-gray-400" />
              </button>
            </>
          ) : (
            <button onClick={onToggle} className="size-10 rounded-full bg-linear-to-br from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center mx-auto">
              <Menu className="size-4 text-white" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={`flex-1 overflow-y-auto ${isOpen ? 'p-5' : 'p-2'} space-y-4`}>
        {/* Search - only show when expanded */}
        {isOpen && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input
              placeholder="Search leads..."
              className="w-full pl-9 pr-3 h-9 bg-[#1a1a1a] border border-white/10 rounded-md text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
            />
          </div>
        )}

        {/* Menu */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === item.id
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
              title={!isOpen ? item.label : undefined}
            >
              <item.icon className="size-5 shrink-0" />
              {isOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="bg-cyan-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {activeTab === item.id && <ChevronRight className="size-4 text-gray-500" />}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* Favorites - only show when expanded */}
        {isOpen && (
          <div>
            <button
              onClick={() => setFavoritesOpen(!favoritesOpen)}
              className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-gray-500 uppercase mb-2"
            >
              <ChevronDown className={`size-3.5 transition-transform ${!favoritesOpen ? "-rotate-90" : ""}`} />
              Favorites
            </button>
            {favoritesOpen && (
              <nav className="space-y-1">
                {favorites.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <item.icon className="size-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            )}
          </div>
        )}

        {/* Footer items */}
        <nav className="space-y-1 mt-auto">
          {footerItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center ${isOpen ? 'gap-3 px-3' : 'justify-center px-0'} py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-colors`}
              title={!isOpen ? item.label : undefined}
            >
              <item.icon className="size-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// =====================
// Header Component
// =====================

function DashboardHeader({ activeTab }: { activeTab: string }) {
  const [isDark, setIsDark] = useState(true);

  const titles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: "Welcome back, John! 👋", subtitle: "Here's what's happening with your sales today." },
    notifications: { title: "Notifications", subtitle: "Stay updated with your latest activities." },
    leads: { title: "Leads", subtitle: "Manage and track all your leads in one place." },
    analytics: { title: "Analytics", subtitle: "Deep insights into your sales performance." },
    goals: { title: "Goals", subtitle: "Track your progress towards your targets." },
  };

  const current = titles[activeTab] || titles.dashboard;

  return (
    <header className="w-full flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 border-b border-white/10 bg-[#0a0a0a]">
      <div className="flex-1 min-w-0">
        <h1 className="text-base md:text-xl font-semibold text-white truncate">{current.title}</h1>
        <p className="text-xs md:text-sm text-gray-400 hidden sm:block">{current.subtitle}</p>
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="size-8 md:size-9 rounded-md flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition-colors shrink-0"
      >
        {isDark ? <Moon className="size-4 md:size-5" /> : <Sun className="size-4 md:size-5" />}
      </button>

      <button className="hidden sm:block px-3 py-1.5 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium transition-colors">
        + New Lead
      </button>
    </header>
  );
}

// =====================
// Dashboard View (Default)
// =====================

const stats = [
  { title: "Generated Revenue", value: dashboardStats.generatedRevenue.value, change: dashboardStats.generatedRevenue.change, icon: DollarSign, trend: "up" },
  { title: "Signed Clients", value: dashboardStats.signedClients.value, change: dashboardStats.signedClients.change, icon: Users, trend: "down" },
  { title: "Total Leads", value: dashboardStats.totalLeads.value, change: dashboardStats.totalLeads.change, icon: MessageSquare, trend: "up" },
  { title: "Team Members", value: dashboardStats.teamMembers.value, extra: dashboardStats.teamMembers.activeCount, icon: Building },
];

const barColors = [
  "from-pink-500/40 to-transparent border-pink-500",
  "from-cyan-400/30 to-transparent border-cyan-400",
  "from-green-400/30 to-transparent border-green-400",
  "from-amber-400/30 to-transparent border-amber-400",
  "from-purple-400/30 to-transparent border-purple-400",
];

function DashboardView() {
  const maxValue = Math.max(...leadsData.flatMap(d => [d.calls, d.proposals, d.signed, d.lost]));
  const maxScore = Math.max(...topPerformers.map((p) => p.score));

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#1a1a1a] border border-white/10 rounded-lg md:rounded-xl p-3 md:p-4">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <span className="text-xs md:text-sm font-medium text-gray-400 truncate">{stat.title}</span>
              <stat.icon className="size-3.5 md:size-4 text-gray-500 shrink-0 ml-1" />
            </div>
            <div className="bg-[#0a0a0a] border border-white/10 rounded-md md:rounded-lg p-2.5 md:p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg md:text-2xl font-medium text-white">{stat.value}</span>
                <div className="flex items-center gap-1.5 md:gap-3">
                  <div className="hidden md:block h-9 w-px bg-white/10" />
                  {stat.change !== undefined && stat.trend ? (
                    <div className={`flex items-center gap-0.5 md:gap-1.5 ${stat.trend === "up" ? "text-green-400" : "text-pink-400"}`}>
                      {stat.trend === "up" ? <ArrowUpRight className="size-3 md:size-3.5" /> : <ArrowDownRight className="size-3 md:size-3.5" />}
                      <span className="text-xs md:text-sm font-medium">{Math.abs(stat.change)}%</span>
                    </div>
                  ) : stat.extra ? (
                    <div className="text-xs md:text-sm font-medium">
                      <span className="text-white">{stat.extra}</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:gap-6">
        {/* Leads Chart */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg md:rounded-xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-2">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-white">Leads Overview</h3>
              <p className="text-xs md:text-sm text-gray-400">Sales funnel performance</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-xs">
              <div className="flex items-center gap-1"><Phone className="size-2.5 md:size-3 text-blue-400" /><span className="text-gray-400">Calls</span></div>
              <div className="flex items-center gap-1"><FileText className="size-2.5 md:size-3 text-cyan-400" /><span className="text-gray-400">Proposals</span></div>
              <div className="flex items-center gap-1"><Handshake className="size-2.5 md:size-3 text-green-400" /><span className="text-gray-400">Signed</span></div>
              <div className="flex items-center gap-1"><XCircle className="size-2.5 md:size-3 text-red-400" /><span className="text-gray-400">Lost</span></div>
            </div>
          </div>
          <div className="flex items-end gap-2 md:gap-4 h-32 md:h-48">
            {leadsData.map((data) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 md:gap-1 items-end justify-center h-24 md:h-40">
                  <div className="w-1 md:w-2 bg-blue-400 rounded-t" style={{ height: `${(data.calls / maxValue) * 100}%` }} />
                  <div className="w-1 md:w-2 bg-cyan-400 rounded-t" style={{ height: `${(data.proposals / maxValue) * 100}%` }} />
                  <div className="w-1 md:w-2 bg-green-400 rounded-t" style={{ height: `${(data.signed / maxValue) * 100}%` }} />
                  <div className="w-1 md:w-2 bg-red-400 rounded-t" style={{ height: `${(data.lost / maxValue) * 100}%` }} />
                </div>
                <span className="text-[8px] md:text-[10px] text-gray-500">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg md:rounded-xl">
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-white/10">
            <h3 className="text-sm md:font-medium text-white">Top Performers</h3>
            <Award className="size-3.5 md:size-4 text-gray-500" />
          </div>
          <div className="p-3 md:p-4 space-y-3 md:space-y-4">
            {topPerformers.slice(0, 4).map((performer, index) => {
              const progressWidth = (performer.score / maxScore) * 100;
              const isFirst = index === 0;
              return (
                <div key={performer.id} className="flex items-center gap-2 md:gap-3">
                  <div className="size-8 md:size-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] md:text-xs font-medium shrink-0">
                    {performer.avatar}
                  </div>
                  <div className="flex-1 min-w-0 relative">
                    <div className={`relative h-8 md:h-[42px] rounded-md md:rounded-lg border border-dashed overflow-hidden ${barColors[index]?.split(" ")[2] || "border-gray-500"}`}>
                      <div className={`absolute inset-0 bg-linear-to-r ${barColors[index]?.split(" ").slice(0, 2).join(" ") || "from-gray-500/30 to-transparent"}`} style={{ width: `${Math.max(progressWidth, 30)}%` }} />
                      <div className="absolute left-1.5 md:left-2 top-1/2 -translate-y-1/2 flex items-center gap-1 md:gap-1.5 bg-[#1a1a1a] border border-white/10 rounded px-1.5 md:px-2 py-0.5 md:py-1">
                        {isFirst ? <Star className="size-2.5 md:size-3.5 text-amber-400 fill-amber-400" /> : <User className="size-2.5 md:size-3.5 text-gray-500" />}
                        <span className={`text-xs md:text-sm font-medium ${isFirst ? "text-white" : "text-gray-400"}`}>{performer.score}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================
// Notifications View
// =====================

function NotificationsView() {
  const getIcon = (type: string) => {
    switch (type) {
      case "lead": return <Users className="size-3.5 md:size-4 text-blue-400" />;
      case "success": return <CheckCircle className="size-3.5 md:size-4 text-green-400" />;
      case "reminder": return <Clock className="size-3.5 md:size-4 text-yellow-400" />;
      case "comment": return <MessageSquare className="size-3.5 md:size-4 text-purple-400" />;
      default: return <FileText className="size-3.5 md:size-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold text-white">All Notifications</h2>
        <button className="text-xs md:text-sm text-cyan-400 hover:text-cyan-300">Mark all as read</button>
      </div>
      <div className="space-y-2">
        {notificationsData.map((notif) => (
          <div key={notif.id} className={`p-3 md:p-4 rounded-lg md:rounded-xl border ${notif.read ? 'border-white/5 bg-[#1a1a1a]' : 'border-cyan-500/20 bg-cyan-500/5'}`}>
            <div className="flex items-start gap-2.5 md:gap-3">
              <div className="size-7 md:size-8 rounded-lg bg-[#2a2a2a] flex items-center justify-center shrink-0">
                {getIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white">{notif.title}</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1 line-clamp-2">{notif.message}</p>
                <span className="text-[10px] md:text-xs text-gray-500 mt-1.5 md:mt-2 block">{notif.time}</span>
              </div>
              {!notif.read && <div className="size-2 rounded-full bg-cyan-500 shrink-0 mt-1" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================
// Leads View
// =====================

function LeadsView() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Closed Won": return "bg-green-500/10 text-green-500";
      case "Closed Lost": return "bg-red-500/10 text-red-500";
      case "Negotiation": return "bg-amber-500/10 text-amber-500";
      case "Proposal": return "bg-blue-500/10 text-blue-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <p className="text-xs md:text-sm text-gray-400">Total Leads</p>
          <p className="text-xl md:text-2xl font-semibold text-white">247</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <p className="text-xs md:text-sm text-gray-400">New This Week</p>
          <p className="text-xl md:text-2xl font-semibold text-cyan-400">32</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <p className="text-xs md:text-sm text-gray-400">In Pipeline</p>
          <p className="text-xl md:text-2xl font-semibold text-blue-400">156</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <p className="text-xs md:text-sm text-gray-400">Closed Won</p>
          <p className="text-xl md:text-2xl font-semibold text-green-400">89</p>
        </div>
      </div>

      {/* Leads Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base md:text-lg font-semibold text-white">All Leads</h3>
        <button className="px-2.5 py-1 md:px-3 md:py-1.5 rounded-md bg-cyan-500 text-white text-xs md:text-sm font-medium">+ Add</button>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-2 md:hidden">
        {allLeads.slice(0, 5).map((lead) => (
          <div key={lead.id} className="p-3 rounded-lg border border-white/10 bg-[#1a1a1a]">
            <div className="flex items-start justify-between mb-2">
              <div className="min-w-0 flex-1">
                <span className="text-sm text-white font-medium block truncate">{lead.company}</span>
                <span className="text-xs text-gray-500">{lead.contact}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ml-2 ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">{lead.value}</span>
              <span className="text-gray-500">{lead.lastContact}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Company</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Contact</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Value</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {allLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm text-white font-medium block">{lead.company}</span>
                      <span className="text-xs text-gray-500">{lead.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm text-white block">{lead.contact}</span>
                      <span className="text-xs text-gray-500">{lead.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-white font-medium">{lead.value}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-400">{lead.lastContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =====================
// Analytics View
// =====================

function AnalyticsView() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        <div className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <TrendingUp className="size-5 md:size-6 text-green-500 mb-2 md:mb-3" />
          <p className="text-xs md:text-sm text-gray-400">Conversion Rate</p>
          <p className="text-lg md:text-2xl font-semibold text-white mt-0.5 md:mt-1">{analyticsData.conversionRate}%</p>
        </div>
        <div className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <DollarSign className="size-5 md:size-6 text-cyan-500 mb-2 md:mb-3" />
          <p className="text-xs md:text-sm text-gray-400">Avg Deal Size</p>
          <p className="text-lg md:text-2xl font-semibold text-white mt-0.5 md:mt-1">${analyticsData.avgDealSize.toLocaleString()}</p>
        </div>
        <div className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <Clock className="size-5 md:size-6 text-yellow-500 mb-2 md:mb-3" />
          <p className="text-xs md:text-sm text-gray-400">Sales Cycle</p>
          <p className="text-lg md:text-2xl font-semibold text-white mt-0.5 md:mt-1">{analyticsData.avgSalesCycle}d</p>
        </div>
        <div className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <CheckCircle className="size-5 md:size-6 text-purple-500 mb-2 md:mb-3" />
          <p className="text-xs md:text-sm text-gray-400">Win Rate</p>
          <p className="text-lg md:text-2xl font-semibold text-white mt-0.5 md:mt-1">{analyticsData.winRate}%</p>
        </div>
      </div>

      {/* Top Performers & Lead Sources */}
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <div className="p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Top Performers by Revenue</h3>
          <div className="space-y-3 md:space-y-4">
            {topPerformers.map((person, i) => (
              <div key={person.id} className="flex items-center gap-2.5 md:gap-4">
                <span className="text-xs md:text-sm text-gray-500 w-4 md:w-6">{i + 1}</span>
                <div className="size-8 md:size-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] md:text-xs shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs md:text-sm text-white block truncate">{person.name}</span>
                  <span className="text-[10px] md:text-xs text-gray-500 block">{person.deals} deals</span>
                </div>
                <span className="text-xs md:text-sm font-semibold text-white">{person.revenue}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Lead Sources</h3>
          <div className="space-y-3 md:space-y-4">
            {[
              { source: "Website", leads: 156, percent: 45 },
              { source: "Referrals", leads: 89, percent: 26 },
              { source: "Social Media", leads: 52, percent: 15 },
              { source: "Cold Outreach", leads: 34, percent: 10 },
            ].map((item) => (
              <div key={item.source} className="space-y-1.5 md:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-400">{item.source}</span>
                  <span className="text-xs md:text-sm text-white">{item.percent}%</span>
                </div>
                <div className="h-1.5 md:h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div className="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full" style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================
// Goals View
// =====================

function GoalsView() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Goals Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
        {goalsData.map((goal) => (
          <div key={goal.name} className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
            <div className="flex items-center justify-between mb-2 md:mb-3">
              <span className="text-xs md:text-sm font-medium text-gray-400 truncate mr-2">{goal.name}</span>
              <span className={`text-[10px] md:text-xs px-1.5 py-0.5 rounded-full shrink-0 ${goal.progress >= 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                {goal.progress}%
              </span>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <div className="flex items-baseline gap-0.5 md:gap-1">
                <span className="text-lg md:text-2xl font-semibold text-white">{goal.current}</span>
                <span className="text-xs md:text-sm text-gray-500">/ {goal.target}</span>
              </div>
              <div className="h-1.5 md:h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${goal.progress >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monthly Progress */}
      <div className="p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
        <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Monthly Progress</h3>
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {/* Team Performance */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-xs md:text-sm font-medium text-gray-400">Team Performance</h4>
            {topPerformers.slice(0, 3).map((person) => (
              <div key={person.id} className="flex items-center gap-2.5 md:gap-4">
                <div className="size-7 md:size-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] md:text-xs shrink-0">
                  {person.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5 md:mb-1">
                    <span className="text-xs md:text-sm text-white truncate">{person.name}</span>
                    <span className="text-[10px] md:text-xs text-gray-400 shrink-0 ml-2">{Math.round(person.score * 1.1)}%</span>
                  </div>
                  <div className="h-1 md:h-1.5 bg-[#2a2a2a] rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${Math.min(person.score * 1.1, 100)}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Key Milestones */}
          <div className="space-y-2 md:space-y-3">
            <h4 className="text-xs md:text-sm font-medium text-gray-400">Key Milestones</h4>
            {[
              { milestone: "Q1 Revenue Target", status: "Completed", date: "Mar 31" },
              { milestone: "100 New Clients", status: "In Progress", date: "Apr 30" },
              { milestone: "30% Conversion Rate", status: "On Track", date: "Jun 30" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg bg-[#2a2a2a]">
                <div className={`size-2 rounded-full shrink-0 ${
                  item.status === "Completed" ? "bg-green-500" 
                  : item.status === "In Progress" ? "bg-yellow-500" 
                  : item.status === "On Track" ? "bg-blue-500"
                  : "bg-gray-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <span className="text-xs md:text-sm text-white block truncate">{item.milestone}</span>
                  <span className="text-[10px] md:text-xs text-gray-500 block">{item.status}</span>
                </div>
                <span className="text-[10px] md:text-xs text-gray-400 shrink-0">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================
// Main Dashboard Component
// =====================

export default function Dashboard4() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "notifications": return <NotificationsView />;
      case "leads": return <LeadsView />;
      case "analytics": return <AnalyticsView />;
      case "goals": return <GoalsView />;
      default: return <DashboardView />;
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-full bg-[#0a0a0a]">
      <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <DashboardHeader activeTab={activeTab} />
        <main className="flex-1 overflow-auto p-3 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
