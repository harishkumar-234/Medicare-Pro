import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { StaffMember } from '../../types';
import { UserCog, Search, Plus, Phone, Mail, Clock, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';

export const StaffPage: React.FC = () => {
  const { staff } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredStaff = staff.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || st.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Hospital Staff & Duty Rostering
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Nurses, technicians, pharmacists, shift schedules and biometric attendance
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 rounded-xl shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search staff by name or employee ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs sm:text-sm outline-none"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="all">All Roles</option>
          <option value="Nurse">Nurse</option>
          <option value="Lab Technician">Lab Technician</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Pharmacist">Pharmacist</option>
          <option value="Accountant">Accountant</option>
        </select>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((emp) => (
          <div
            key={emp.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card p-5 space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={emp.avatar} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-500/20" />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{emp.name}</h3>
                  <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">{emp.role}</span>
                  <p className="text-[10px] text-slate-400 font-mono">{emp.employeeId}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  emp.attendanceStatus === 'Present'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {emp.attendanceStatus}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1.5">
              <p className="text-slate-600 dark:text-slate-300"><strong>Dept:</strong> {emp.department}</p>
              <p className="text-slate-600 dark:text-slate-300"><strong>Shift:</strong> {emp.shift}</p>
              <p className="text-slate-400">Joined: {emp.joinDate}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs flex justify-between items-center text-slate-500">
              <span>{emp.phone}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">₹{emp.salary.toLocaleString('en-IN')}/mo</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
