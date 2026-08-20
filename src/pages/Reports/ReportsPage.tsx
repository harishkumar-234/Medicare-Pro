import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  IndianRupee,
  Users,
  Pill,
  FlaskConical,
  TrendingUp,
  FileSpreadsheet,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export const ReportsPage: React.FC = () => {
  const { invoices, appointments, patients } = useHospital();
  const [reportType, setReportType] = useState('revenue');
  const [dateRange, setDateRange] = useState('month');

  const monthlyFinancials = [
    { month: 'Jan', revenue: 420000, expenses: 260000, profit: 160000 },
    { month: 'Feb', revenue: 450000, expenses: 275000, profit: 175000 },
    { month: 'Mar', revenue: 490000, expenses: 290000, profit: 200000 },
    { month: 'Apr', revenue: 530000, expenses: 310000, profit: 220000 },
    { month: 'May', revenue: 580000, expenses: 330000, profit: 250000 },
    { month: 'Jun', revenue: 640000, expenses: 350000, profit: 290000 },
  ];

  const patientDemographics = [
    { ageGroup: '0-12 yrs', count: 18, fill: '#3b82f6' },
    { ageGroup: '13-25 yrs', count: 24, fill: '#0d9488' },
    { ageGroup: '26-45 yrs', count: 52, fill: '#8b5cf6' },
    { ageGroup: '46-60 yrs', count: 44, fill: '#f59e0b' },
    { ageGroup: '60+ yrs', count: 38, fill: '#ec4899' },
  ];

  const handleExport = (format: 'PDF' | 'Excel') => {
    alert(`Exporting ${reportType.toUpperCase()} Analytics Report as ${format}... File downloaded successfully.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Hospital Analytics & Executive Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate printable operational audits, patient census, departmental balance sheets and pharmacy P&L
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border rounded-xl text-xs font-bold hover:bg-slate-50 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-brand-600" /> Export PDF
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-sm"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" /> Export Excel
          </button>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'revenue', label: 'Financial & Revenue' },
            { id: 'patients', label: 'Patient Demographics' },
            { id: 'appointments', label: 'OPD Appointments' },
            { id: 'pharmacy', label: 'Pharmacy Formulary' },
            { id: 'lab', label: 'Diagnostic Pathology' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setReportType(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                reportType === tab.id
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold outline-none"
        >
          <option value="month">Current Month (Aug 2026)</option>
          <option value="quarter">Last Quarter (Q2 2026)</option>
          <option value="year">Financial Year 2025-26</option>
        </select>
      </div>

      {/* Reports Visuals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Financial Flow Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue vs Operating Expenses (₹)</h3>
            <p className="text-xs text-slate-400">Monthly operating margin & net healthcare surplus</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyFinancials}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="revenue" name="Total Inflow Revenue" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Operating Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Net Hospital Surplus" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics Age Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Patient Age Demographics</h3>
            <p className="text-xs text-slate-400">Distribution across active patient database</p>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={patientDemographics} cx="50%" cy="50%" outerRadius={85} dataKey="count" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {patientDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
