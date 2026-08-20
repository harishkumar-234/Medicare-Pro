import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  Calendar,
  UserCheck,
  IndianRupee,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Activity,
  Plus,
  Stethoscope,
  Tv,
  ArrowRight,
  ShieldCheck,
  Pill,
  FlaskConical,
  Receipt
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

interface DashboardPageProps {
  onNavigate: (page: string, meta?: any) => void;
  onOpenQuickAdd: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onOpenQuickAdd }) => {
  const { user } = useAuth();
  const {
    patients,
    doctors,
    appointments,
    invoices,
    currentTokenNumber,
    medicines,
    labOrders,
    updateAppointmentStatus
  } = useHospital();

  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month' | 'year'>('week');

  // Computed Metrics
  const totalPatientsCount = 12845 + patients.length - 5;
  const todayAppointments = appointments.filter((a) => a.date === '2026-08-20');
  const availableDoctorsCount = doctors.filter((d) => d.status === 'Available').length;
  const totalRevenue = 485620;

  // Chart Data
  const patientTrendData = [
    { name: 'Mon', newPatients: 42, returningPatients: 68, total: 110 },
    { name: 'Tue', newPatients: 55, returningPatients: 80, total: 135 },
    { name: 'Wed', newPatients: 48, returningPatients: 74, total: 122 },
    { name: 'Thu', newPatients: 62, returningPatients: 90, total: 152 },
    { name: 'Fri', newPatients: 70, returningPatients: 95, total: 165 },
    { name: 'Sat', newPatients: 85, returningPatients: 110, total: 195 },
    { name: 'Sun', newPatients: 30, returningPatients: 45, total: 75 },
  ];

  const appointmentStatsData = [
    { status: 'Completed', count: 48, color: '#10b981' },
    { status: 'Waiting', count: 32, color: '#f59e0b' },
    { status: 'In Consultation', count: 18, color: '#0d9488' },
    { status: 'Cancelled', count: 6, color: '#ef4444' },
  ];

  const departmentRevenueData = [
    { name: 'Cardiology', value: 35, color: '#0d9488' },
    { name: 'Orthopedics', value: 25, color: '#2563eb' },
    { name: 'Gynecology', value: 18, color: '#ec4899' },
    { name: 'Pediatrics', value: 12, color: '#8b5cf6' },
    { name: 'Neurology', value: 10, color: '#f59e0b' },
  ];

  const revenueStreamData = [
    { month: 'Mar', consultation: 140000, pharmacy: 95000, lab: 65000 },
    { month: 'Apr', consultation: 165000, pharmacy: 110000, lab: 78000 },
    { month: 'May', consultation: 180000, pharmacy: 125000, lab: 88000 },
    { month: 'Jun', consultation: 195000, pharmacy: 140000, lab: 95000 },
    { month: 'Jul', consultation: 220000, pharmacy: 155000, lab: 110000 },
    { month: 'Aug', consultation: 245000, pharmacy: 172000, lab: 128000 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-medblue-950 to-brand-950 p-6 sm:p-8 text-white shadow-elevated border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>MediCare Cloud Center • Active Session</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {user?.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              All clinical systems operating at 100% capacity. You have{' '}
              <span className="text-brand-300 font-bold">{todayAppointments.length} appointments</span> and{' '}
              <span className="text-amber-300 font-bold">14 pending lab diagnostics</span> scheduled today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('queue')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold backdrop-blur-md transition-all hover:scale-105"
            >
              <Tv className="w-4 h-4 text-brand-400 animate-pulse" />
              <span>Launch OPD Token TV</span>
            </button>
            <button
              onClick={onOpenQuickAdd}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-medblue-500 hover:from-brand-400 hover:to-medblue-400 text-white text-xs font-bold shadow-glow-teal transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>New Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top 4 KPI Animated Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {/* Card 1: Total Patients */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Patients</span>
            <div className="w-10 h-10 rounded-xl bg-medblue-50 dark:bg-medblue-950/60 text-medblue-600 dark:text-medblue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {totalPatientsCount.toLocaleString('en-IN')}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="flex items-center font-bold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.8%
              </span>
              <span className="text-slate-400">vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Appointments */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Appointments</span>
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              128
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="flex items-center font-bold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> +8.4%
              </span>
              <span className="text-slate-400">compared to yesterday</span>
            </div>
          </div>
        </div>

        {/* Card 3: Available Doctors */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Available Doctors</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              48 <span className="text-sm font-normal text-slate-400">/ 54 On Duty</span>
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="flex items-center font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> 88.8%
              </span>
              <span className="text-slate-400">specialist availability</span>
            </div>
          </div>
        </div>

        {/* Card 4: Today's Revenue */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Today's Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ₹4,85,620
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs">
              <span className="flex items-center font-bold text-emerald-600 dark:text-emerald-400">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
              </span>
              <span className="text-slate-400">vs daily target</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Queue Strip Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-brand-600 to-medblue-700 text-white shadow-md gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
            <Tv className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 bg-white/20 rounded">
                Live OPD Token Display
              </span>
              <span className="text-xs font-semibold text-emerald-200">Active Room 04</span>
            </div>
            <p className="text-sm font-bold mt-0.5">
              Now Serving Token #{currentTokenNumber.toString().padStart(3, '0')} (Ravi Kumar — Dr. Rajesh Kumar)
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('queue')}
          className="px-4 py-2 bg-white text-brand-700 hover:bg-slate-100 text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
        >
          <span>Open Full TV Display</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Patient Volume Analytics Area Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Patient Flow Analytics</h3>
              <p className="text-xs text-slate-400">New vs Returning Patient OPD Registrations</p>
            </div>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              {(['today', 'week', 'month', 'year'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setTimeFilter(f)}
                  className={`px-3 py-1 rounded-lg capitalize transition-all ${
                    timeFilter === f
                      ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="total" name="Total OPD Patients" stroke="#0d9488" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="newPatients" name="New Registrations" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorNew)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Revenue Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Departmental Contribution</h3>
            <p className="text-xs text-slate-400">Revenue split across medical specialties</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={departmentRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {departmentRevenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [`${value}% Contribution`, 'Share']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            {departmentRevenueData.map((dept) => (
              <div key={dept.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                <span className="text-slate-600 dark:text-slate-400 truncate">{dept.name}</span>
                <span className="font-bold ml-auto text-slate-800 dark:text-slate-200">{dept.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row: Revenue Streams & Today's Live Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Streams Multi-Bar Chart (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue By Services (₹)</h3>
              <p className="text-xs text-slate-400">Consultation vs Pharmacy vs Diagnostics</p>
            </div>
            <button
              onClick={() => onNavigate('billing')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
            >
              Billing Center <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueStreamData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, '']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="consultation" name="OPD Consult" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pharmacy" name="Pharmacy" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lab" name="Diagnostics" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Today's Appointments List (6 cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Active OPD Schedule</h3>
              <p className="text-xs text-slate-400">Live consultation status & token queue</p>
            </div>
            <button
              onClick={() => onNavigate('appointments')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5 flex-1 overflow-y-auto max-h-72">
            {todayAppointments.slice(0, 5).map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 hover:border-brand-300 dark:hover:border-brand-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 flex flex-col items-center justify-center font-bold text-xs">
                    <span className="text-[9px] uppercase font-semibold text-slate-400">TKN</span>
                    <span>#{apt.tokenNumber.toString().padStart(2, '0')}</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{apt.patientName}</h4>
                    <p className="text-[11px] text-slate-400">
                      {apt.doctorName} • <span className="text-brand-600 dark:text-brand-400">{apt.time}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      apt.status === 'In Consultation'
                        ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 animate-pulse'
                        : apt.status === 'Waiting'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                        : apt.status === 'Confirmed'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {apt.status}
                  </span>

                  {apt.status === 'Waiting' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'In Consultation')}
                      className="text-[11px] px-2 py-1 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Call
                    </button>
                  )}
                  {apt.status === 'In Consultation' && (
                    <button
                      onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                      className="text-[11px] px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Access Hospital Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('pharmacy')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-emerald-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Pharmacy Stock</h4>
              <p className="text-[11px] text-amber-500 font-semibold">2 Items Low Stock</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('laboratory')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-purple-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Lab Diagnostics</h4>
              <p className="text-[11px] text-purple-500 font-semibold">{labOrders.length} Requisitions</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('billing')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-blue-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-medblue-950/60 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Invoices & GST</h4>
              <p className="text-[11px] text-emerald-500 font-semibold">₹4.85L Settled Today</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => onNavigate('prescriptions')}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card hover:border-brand-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Digital Prescriptions</h4>
              <p className="text-[11px] text-slate-400">Generate & Print Rx</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
