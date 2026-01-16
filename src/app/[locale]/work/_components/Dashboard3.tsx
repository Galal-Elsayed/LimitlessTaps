"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Bell, 
  Users, 
  Calendar, 
  Coins, 
  Receipt, 
  Target,
  Search,
  Settings,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Folder,
  X,
  TrendingUp,
  TrendingDown,
  Moon,
  Sun,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Award,
  Menu,
  ChevronLeft
} from "lucide-react";

// =====================
// Mock Data
// =====================

const employeesData = [
  { id: 1, name: "John Doe", email: "john@email.com", department: "IT", status: "Active", role: "Software Engineer", joined: "Jan 2024" },
  { id: 2, name: "Jane Smith", email: "jane@email.com", department: "HR", status: "Active", role: "HR Manager", joined: "Mar 2023" },
  { id: 3, name: "Alex Johnson", email: "alex@email.com", department: "Finance", status: "On Leave", role: "Accountant", joined: "Jun 2023" },
  { id: 4, name: "Emily Davis", email: "emily@email.com", department: "Marketing", status: "Active", role: "Marketing Lead", joined: "Feb 2024" },
  { id: 5, name: "Michael Brown", email: "michael@email.com", department: "Sales", status: "Probation", role: "Sales Rep", joined: "Dec 2024" },
  { id: 6, name: "Sarah Wilson", email: "sarah@email.com", department: "IT", status: "Active", role: "UX Designer", joined: "Aug 2023" },
];

const attendanceData = [
  { date: "Today", present: 142, absent: 8, late: 12, onLeave: 5 },
  { date: "Yesterday", present: 138, absent: 12, late: 8, onLeave: 6 },
  { date: "Mon, Jan 13", present: 145, absent: 5, late: 10, onLeave: 4 },
  { date: "Fri, Jan 10", present: 140, absent: 10, late: 15, onLeave: 3 },
];

const payrollData = [
  { month: "January 2025", amount: "$285,000", status: "Processing", employees: 150, dueDate: "Jan 25" },
  { month: "December 2024", amount: "$280,000", status: "Paid", employees: 148, dueDate: "Dec 25" },
  { month: "November 2024", amount: "$275,000", status: "Paid", employees: 145, dueDate: "Nov 25" },
  { month: "October 2024", amount: "$270,000", status: "Paid", employees: 142, dueDate: "Oct 25" },
];

const invoicesData = [
  { id: "INV-001", client: "Tech Corp", amount: "$12,500", status: "Paid", date: "Jan 15, 2025" },
  { id: "INV-002", client: "Design Studio", amount: "$8,200", status: "Pending", date: "Jan 12, 2025" },
  { id: "INV-003", client: "Marketing Inc", amount: "$15,000", status: "Overdue", date: "Jan 5, 2025" },
  { id: "INV-004", client: "Sales Pro", amount: "$6,800", status: "Paid", date: "Jan 2, 2025" },
  { id: "INV-005", client: "Startup Labs", amount: "$22,000", status: "Pending", date: "Dec 28, 2024" },
];

const performanceData = [
  { name: "Sarah Chen", score: 98, department: "IT", reviews: 5, badge: "Top Performer" },
  { name: "Michael Roberts", score: 94, department: "Sales", reviews: 4, badge: "Rising Star" },
  { name: "Emily Johnson", score: 89, department: "Marketing", reviews: 3, badge: null },
  { name: "David Kim", score: 85, department: "Finance", reviews: 4, badge: null },
  { name: "Lisa Zhang", score: 82, department: "HR", reviews: 3, badge: null },
];

const notificationsData = [
  { id: 1, title: "New employee onboarded", message: "John Smith has joined the IT department", time: "2 min ago", read: false },
  { id: 2, title: "Payroll reminder", message: "January payroll processing starts tomorrow", time: "1 hour ago", read: false },
  { id: 3, title: "Leave request approved", message: "Alex Johnson's leave request has been approved", time: "3 hours ago", read: true },
  { id: 4, title: "Performance review due", message: "5 employees have pending performance reviews", time: "Yesterday", read: true },
  { id: 5, title: "System maintenance", message: "Scheduled maintenance on Sunday 2 AM", time: "2 days ago", read: true },
];

// =====================
// Sidebar Component
// =====================

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { id: "notifications", icon: Bell, label: "Notification", badge: "9+" },
  { id: "employees", icon: Users, label: "Employees" },
  { id: "attendance", icon: Calendar, label: "Attendance" },
  { id: "payroll", icon: Coins, label: "Payroll" },
  { id: "invoices", icon: Receipt, label: "Invoices" },
  { id: "performance", icon: Target, label: "Performance" },
];

const favorites = [
  { icon: Folder, label: "Reimbursements" },
  { icon: Folder, label: "Timesheets" },
  { icon: Folder, label: "Overtime Logs" },
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
                <div className="size-7 rounded-full bg-linear-to-br from-purple-400 via-pink-500 to-red-500" />
                <span className="font-medium text-gray-400">Square UI</span>
              </div>
              <button onClick={onToggle} className="size-7 rounded bg-[#1a1a1a] flex items-center justify-center hover:bg-white/10">
                <ChevronLeft className="size-4 text-gray-400" />
              </button>
            </>
          ) : (
            <button onClick={onToggle} className="size-10 rounded-full bg-linear-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center mx-auto">
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
              placeholder="Search..."
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
                    <span className="bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
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
  
  const titles: Record<string, string> = {
    dashboard: "Dashboard",
    notifications: "Notifications",
    employees: "Employees",
    attendance: "Attendance",
    payroll: "Payroll",
    invoices: "Invoices",
    performance: "Performance",
  };

  return (
    <header className="w-full flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 border-b border-white/10 bg-[#0a0a0a]">
      <LayoutDashboard className="size-5 md:size-6 text-white shrink-0" />
      <h1 className="flex-1 font-medium text-sm md:text-base text-white truncate">{titles[activeTab] || "Dashboard"}</h1>

      <div className="hidden md:flex items-center -space-x-2">
        {[1, 2, 3].map((i) => (
          <div 
            key={i} 
            className="size-6 rounded-full ring-2 ring-[#0a0a0a] bg-linear-to-br from-blue-400 to-purple-500"
          />
        ))}
      </div>

      <button
        onClick={() => setIsDark(!isDark)}
        className="size-8 md:size-9 rounded-md flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition-colors shrink-0"
      >
        {isDark ? <Moon className="size-4 md:size-5" /> : <Sun className="size-4 md:size-5" />}
      </button>
    </header>
  );
}

// =====================
// Dashboard View (Default)
// =====================

const stats = [
  { title: "Total Employees", value: "150", subtitle: "Active: 140, Inactive: 10", icon: Users, trend: "+12%", trendUp: true },
  { title: "Upcoming Payroll", value: "$250,000", subtitle: "Processing in 3 days", icon: Receipt, trend: "+5%", trendUp: true },
  { title: "Attendance Rate", value: "85%", subtitle: "Last 30 Days", icon: Calendar, trend: "-2%", trendUp: false },
];

const chartData = [
  { month: "Jan", moneyIn: 180, moneyOut: 120 },
  { month: "Feb", moneyIn: 200, moneyOut: 140 },
  { month: "Mar", moneyIn: 220, moneyOut: 150 },
  { month: "Apr", moneyIn: 280, moneyOut: 175 },
  { month: "May", moneyIn: 250, moneyOut: 160 },
  { month: "Jun", moneyIn: 230, moneyOut: 145 },
];

function DashboardView() {
  const maxValue = Math.max(...chartData.map(d => Math.max(d.moneyIn, d.moneyOut)));

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.title} className="relative p-4 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="relative flex items-start justify-between">
              <div className="flex flex-col gap-2 md:gap-4">
                <p className="text-xs md:text-sm font-medium text-gray-400">{stat.title}</p>
                <p className="text-xl md:text-2xl font-semibold text-white">{stat.value}</p>
                <div className="flex items-center gap-1 md:gap-1.5 text-gray-400">
                  {stat.trendUp ? <TrendingUp className="size-3 md:size-4 text-green-500" /> : <TrendingDown className="size-3 md:size-4 text-red-500" />}
                  <span className={`text-xs md:text-sm font-medium ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>{stat.trend}</span>
                </div>
              </div>
              <button className="size-8 md:size-10 rounded-md border border-white/10 bg-[#2a2a2a] flex items-center justify-center hover:bg-white/10 transition-colors shrink-0">
                <stat.icon className="size-4 md:size-5 text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-6 gap-2">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-white">Financial Flow</h3>
            <p className="text-xs md:text-sm text-gray-400">Money in vs money out</p>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="size-2 md:size-3 rounded-full bg-green-500" />
              <span className="text-xs md:text-sm text-gray-400">In</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="size-2 md:size-3 rounded-full bg-red-500" />
              <span className="text-xs md:text-sm text-gray-400">Out</span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2 md:gap-4 h-32 md:h-48">
          {chartData.map((data) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-0.5 md:gap-1 items-end justify-center h-24 md:h-40">
                <div className="w-2 md:w-3 bg-green-500 rounded-t" style={{ height: `${(data.moneyIn / maxValue) * 100}%` }} />
                <div className="w-2 md:w-3 bg-red-500 rounded-t" style={{ height: `${(data.moneyOut / maxValue) * 100}%` }} />
              </div>
              <span className="text-[8px] md:text-[10px] text-gray-500">{data.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// =====================
// Notifications View
// =====================

function NotificationsView() {
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
              <div className={`size-2 rounded-full mt-1.5 md:mt-2 shrink-0 ${notif.read ? 'bg-gray-500' : 'bg-cyan-500'}`} />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white">{notif.title}</h3>
                <p className="text-xs md:text-sm text-gray-400 mt-0.5 md:mt-1 line-clamp-2">{notif.message}</p>
                <span className="text-[10px] md:text-xs text-gray-500 mt-1.5 md:mt-2 block">{notif.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================
// Employees View
// =====================

function EmployeesView() {
  const getStatusColor = (status: string) => {
    if (status === "Active") return "bg-green-500/10 text-green-500";
    if (status === "On Leave") return "bg-yellow-500/10 text-yellow-500";
    return "bg-blue-500/10 text-blue-500";
  };

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base md:text-lg font-semibold text-white">All Employees ({employeesData.length})</h2>
        <button className="px-2.5 py-1 md:px-4 md:py-2 rounded-md bg-white text-black text-xs md:text-sm font-medium hover:bg-gray-200 transition-colors">
          + Add
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-2 md:hidden">
        {employeesData.map((emp) => (
          <div key={emp.id} className="p-3 rounded-lg border border-white/10 bg-[#1a1a1a]">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="size-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] shrink-0">
                {emp.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm text-white block truncate">{emp.name}</span>
                <span className="text-xs text-gray-500">{emp.role}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full shrink-0 ${getStatusColor(emp.status)}`}>
                {emp.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{emp.department}</span>
              <span>{emp.joined}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Employee</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Role</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Department</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Status</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((emp) => (
              <tr key={emp.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs">
                      {emp.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <span className="text-sm text-white block">{emp.name}</span>
                      <span className="text-xs text-gray-500">{emp.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{emp.role}</td>
                <td className="px-4 py-3 text-sm text-gray-400">{emp.department}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(emp.status)}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">{emp.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================
// Attendance View
// =====================

function AttendanceView() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-1.5 md:gap-2 text-green-500 mb-1.5 md:mb-2">
            <CheckCircle className="size-4 md:size-5" />
            <span className="text-xs md:text-sm font-medium">Present</span>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-white">142</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-1.5 md:gap-2 text-red-500 mb-1.5 md:mb-2">
            <X className="size-4 md:size-5" />
            <span className="text-xs md:text-sm font-medium">Absent</span>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-white">8</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-1.5 md:gap-2 text-yellow-500 mb-1.5 md:mb-2">
            <Clock className="size-4 md:size-5" />
            <span className="text-xs md:text-sm font-medium">Late</span>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-white">12</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <div className="flex items-center gap-1.5 md:gap-2 text-blue-500 mb-1.5 md:mb-2">
            <Calendar className="size-4 md:size-5" />
            <span className="text-xs md:text-sm font-medium">Leave</span>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-white">5</p>
        </div>
      </div>

      {/* Mobile History Cards */}
      <div className="md:hidden space-y-2">
        <h3 className="text-sm font-medium text-white">Attendance History</h3>
        {attendanceData.map((row, i) => (
          <div key={i} className="p-3 rounded-lg border border-white/10 bg-[#1a1a1a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white font-medium">{row.date}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <span className="text-xs text-gray-500 block">Present</span>
                <span className="text-sm text-green-500 font-medium">{row.present}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Absent</span>
                <span className="text-sm text-red-500 font-medium">{row.absent}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Late</span>
                <span className="text-sm text-yellow-500 font-medium">{row.late}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Leave</span>
                <span className="text-sm text-blue-500 font-medium">{row.onLeave}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Attendance History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Date</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Present</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Absent</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Late</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">On Leave</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-sm text-white">{row.date}</td>
                <td className="px-4 py-3 text-sm text-green-500">{row.present}</td>
                <td className="px-4 py-3 text-sm text-red-500">{row.absent}</td>
                <td className="px-4 py-3 text-sm text-yellow-500">{row.late}</td>
                <td className="px-4 py-3 text-sm text-blue-500">{row.onLeave}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================
// Payroll View
// =====================

function PayrollView() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
        <div className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <DollarSign className="size-5 md:size-6 text-green-500 mb-2 md:mb-3" />
          <p className="text-xs md:text-sm text-gray-400">Total Payroll (YTD)</p>
          <p className="text-lg md:text-2xl font-semibold text-white mt-0.5 md:mt-1">$1,110,000</p>
        </div>
        <div className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <Clock className="size-5 md:size-6 text-yellow-500 mb-2 md:mb-3" />
          <p className="text-xs md:text-sm text-gray-400">Next Payroll</p>
          <p className="text-lg md:text-2xl font-semibold text-white mt-0.5 md:mt-1">$285,000</p>
          <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1">Due: Jan 25, 2025</p>
        </div>
        <div className="p-3 md:p-5 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <Users className="size-5 md:size-6 text-blue-500 mb-2 md:mb-3" />
          <p className="text-xs md:text-sm text-gray-400">Employees on Payroll</p>
          <p className="text-lg md:text-2xl font-semibold text-white mt-0.5 md:mt-1">150</p>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        <h3 className="text-sm font-medium text-white">Payroll History</h3>
        {payrollData.map((row, i) => (
          <div key={i} className="p-3 rounded-lg border border-white/10 bg-[#1a1a1a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white font-medium">{row.month}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                row.status === "Paid" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
              }`}>{row.status}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">{row.amount}</span>
              <span className="text-gray-500">{row.employees} employees</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-medium text-white">Payroll History</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Month</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Amount</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Employees</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-sm text-white">{row.month}</td>
                <td className="px-4 py-3 text-sm text-white font-medium">{row.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-400">{row.employees}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    row.status === "Paid" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                  }`}>{row.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================
// Invoices View
// =====================

function InvoicesView() {
  const getStatusColor = (status: string) => {
    if (status === "Paid") return "bg-green-500/10 text-green-500";
    if (status === "Pending") return "bg-yellow-500/10 text-yellow-500";
    return "bg-red-500/10 text-red-500";
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <FileText className="size-4 md:size-5 text-gray-400 mb-1.5 md:mb-2" />
          <p className="text-xs md:text-sm text-gray-400">Total</p>
          <p className="text-xl md:text-2xl font-semibold text-white">247</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <CheckCircle className="size-4 md:size-5 text-green-500 mb-1.5 md:mb-2" />
          <p className="text-xs md:text-sm text-gray-400">Paid</p>
          <p className="text-xl md:text-2xl font-semibold text-white">198</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <Clock className="size-4 md:size-5 text-yellow-500 mb-1.5 md:mb-2" />
          <p className="text-xs md:text-sm text-gray-400">Pending</p>
          <p className="text-xl md:text-2xl font-semibold text-white">36</p>
        </div>
        <div className="p-3 md:p-4 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
          <AlertCircle className="size-4 md:size-5 text-red-500 mb-1.5 md:mb-2" />
          <p className="text-xs md:text-sm text-gray-400">Overdue</p>
          <p className="text-xl md:text-2xl font-semibold text-white">13</p>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm md:text-base font-medium text-white">Recent Invoices</h3>
        <button className="text-xs md:text-sm text-cyan-400 hover:text-cyan-300">View All</button>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {invoicesData.map((inv) => (
          <div key={inv.id} className="p-3 rounded-lg border border-white/10 bg-[#1a1a1a]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 font-mono">{inv.id}</span>
                <span className="text-sm text-white font-medium">{inv.client}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusColor(inv.status)}`}>
                {inv.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white font-medium">{inv.amount}</span>
              <span className="text-gray-500">{inv.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border border-white/10 bg-[#1a1a1a] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Invoice</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Client</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Amount</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Date</th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoicesData.map((inv) => (
              <tr key={inv.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="px-4 py-3 text-sm text-white font-mono">{inv.id}</td>
                <td className="px-4 py-3 text-sm text-white">{inv.client}</td>
                <td className="px-4 py-3 text-sm text-white font-medium">{inv.amount}</td>
                <td className="px-4 py-3 text-sm text-gray-400">{inv.date}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inv.status)}`}>{inv.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// =====================
// Performance View
// =====================

function PerformanceView() {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Top Performers */}
      <div className="p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
        <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Top Performers</h3>
        <div className="space-y-3 md:space-y-4">
          {performanceData.map((person, i) => (
            <div key={person.name} className="flex items-center gap-2.5 md:gap-4">
              <span className="text-xs md:text-sm text-gray-500 w-4 md:w-6">{i + 1}</span>
              <div className="size-8 md:size-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-[10px] md:text-xs shrink-0">
                {person.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
                  <span className="text-xs md:text-sm text-white truncate">{person.name}</span>
                  {person.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 flex items-center gap-0.5 shrink-0">
                      <Award className="size-2.5 md:size-3" /> {person.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] md:text-xs text-gray-500">{person.department}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-base md:text-lg font-semibold text-white">{person.score}</span>
                <span className="text-[10px] md:text-xs text-gray-500 block">{person.reviews} rev</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Scores */}
      <div className="p-4 md:p-6 rounded-lg md:rounded-xl border border-white/10 bg-[#1a1a1a]">
        <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">Department Scores</h3>
        <div className="space-y-3 md:space-y-4">
          {["IT", "Sales", "Marketing", "Finance", "HR"].map((dept, i) => {
            const score = [92, 88, 85, 83, 80][i];
            return (
              <div key={dept} className="space-y-1.5 md:space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm text-gray-400">{dept}</span>
                  <span className="text-xs md:text-sm text-white font-medium">{score}%</span>
                </div>
                <div className="h-1.5 md:h-2 bg-[#2a2a2a] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =====================
// Main Dashboard Component
// =====================

export default function Dashboard3() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "notifications": return <NotificationsView />;
      case "employees": return <EmployeesView />;
      case "attendance": return <AttendanceView />;
      case "payroll": return <PayrollView />;
      case "invoices": return <InvoicesView />;
      case "performance": return <PerformanceView />;
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
