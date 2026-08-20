import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Appointment } from '../../types';
import {
  Calendar as CalendarIcon,
  Search,
  Filter,
  Plus,
  Clock,
  User,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Layers,
  FileText
} from 'lucide-react';

interface AppointmentsPageProps {
  onOpenQuickAdd: () => void;
  onNavigateToPrescription?: (patientName: string) => void;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ onOpenQuickAdd, onNavigateToPrescription }) => {
  const { appointments, doctors, updateAppointmentStatus, cancelAppointment } = useHospital();

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarScope, setCalendarScope] = useState<'day' | 'week' | 'month'>('week');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.appointmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDoc = selectedDoctor === 'all' || apt.doctorId === selectedDoctor;
    const matchesStatus = selectedStatus === 'all' || apt.status === selectedStatus;
    const matchesDept = selectedDepartment === 'all' || apt.department.toLowerCase().includes(selectedDepartment.toLowerCase());

    return matchesSearch && matchesDoc && matchesStatus && matchesDept;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Appointment Management & Calendar
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time OPD schedule, doctor slot allocation, and patient queue status
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                viewMode === 'calendar'
                  ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
              }`}
            >
              Calendar Schedule
            </button>
          </div>

          <button
            onClick={onOpenQuickAdd}
            className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Book Slot</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search patient, doctor, or token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Doctor Filter */}
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="all">All Doctors</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="all">All Departments</option>
            <option value="cardiology">Cardiology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="gynecology">Gynecology</option>
            <option value="pediatrics">Pediatrics</option>
            <option value="dermatology">Dermatology</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Waiting">Waiting</option>
            <option value="In Consultation">In Consultation</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'list' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-850/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4">Token & ID</th>
                  <th className="py-3.5 px-4">Patient Information</th>
                  <th className="py-3.5 px-4">Doctor & Specialty</th>
                  <th className="py-3.5 px-4">Schedule Date & Slot</th>
                  <th className="py-3.5 px-4">Type & Fee</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      <CalendarIcon className="w-10 h-10 mx-auto mb-2 opacity-30 text-brand-500" />
                      <p className="text-sm font-semibold">No appointments match the selected filter</p>
                      <button
                        onClick={onOpenQuickAdd}
                        className="mt-3 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold"
                      >
                        + Book New Appointment
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Token */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 font-extrabold text-xs flex items-center justify-center">
                            #{apt.tokenNumber.toString().padStart(2, '0')}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{apt.appointmentNumber}</span>
                        </div>
                      </td>

                      {/* Patient */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{apt.patientName}</p>
                          <p className="text-[11px] text-slate-400">
                            {apt.patientGender}, {apt.patientAge} yrs • {apt.patientPhone}
                          </p>
                        </div>
                      </td>

                      {/* Doctor */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{apt.doctorName}</p>
                          <p className="text-[11px] text-brand-600 dark:text-brand-400">{apt.department} • {apt.roomNumber}</p>
                        </div>
                      </td>

                      {/* Schedule */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{apt.date}</p>
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-semibold">
                            <Clock className="w-3 h-3" /> {apt.time}
                          </p>
                        </div>
                      </td>

                      {/* Fee */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">₹{apt.fee}</p>
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              apt.isPaid ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {apt.isPaid ? 'Paid' : 'Unpaid'}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${
                            apt.status === 'In Consultation'
                              ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300 animate-pulse'
                              : apt.status === 'Waiting'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                              : apt.status === 'Confirmed'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                              : apt.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {apt.status === 'Waiting' && (
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'In Consultation')}
                              className="px-2.5 py-1 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-xs font-semibold shadow-sm"
                            >
                              Call Now
                            </button>
                          )}
                          {apt.status === 'In Consultation' && (
                            <button
                              onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-sm"
                            >
                              Complete
                            </button>
                          )}
                          {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                            <button
                              onClick={() => cancelAppointment(apt.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                              title="Cancel Appointment"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Calendar View Matrix */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Week Schedule — August 2026</h3>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                {(['day', 'week', 'month'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setCalendarScope(s)}
                    className={`px-3 py-1 rounded-lg capitalize transition-all ${
                      calendarScope === s
                        ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-400 shadow-sm font-bold'
                        : 'text-slate-500'
                    }`}
                  >
                    {s} View
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-bold px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                17 Aug – 23 Aug 2026
              </span>
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 pt-2">
            {[
              { day: 'Mon', date: '17 Aug', count: 12 },
              { day: 'Tue', date: '18 Aug', count: 18 },
              { day: 'Wed', date: '19 Aug', count: 15 },
              { day: 'Thu', date: '20 Aug (Today)', count: 24, active: true },
              { day: 'Fri', date: '21 Aug', count: 19 },
              { day: 'Sat', date: '22 Aug', count: 22 },
              { day: 'Sun', date: '23 Aug', count: 6 },
            ].map((col, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-3 border min-h-64 flex flex-col justify-between ${
                  col.active
                    ? 'bg-brand-50/50 dark:bg-brand-950/30 border-brand-300 dark:border-brand-800 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-slate-850/60 border-slate-200/80 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                    <span className={`text-xs font-bold ${col.active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-400'}`}>
                      {col.day}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">{col.date}</span>
                  </div>

                  <div className="mt-2 space-y-2">
                    {col.active ? (
                      appointments.slice(0, 3).map((a) => (
                        <div
                          key={a.id}
                          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs space-y-0.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 dark:text-white truncate">{a.patientName}</span>
                            <span className="text-[10px] font-bold text-brand-600">#{a.tokenNumber}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">{a.doctorName}</p>
                          <p className="text-[10px] font-semibold text-indigo-500">{a.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {col.count} Slots Booked
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={onOpenQuickAdd}
                  className="w-full mt-2 py-1.5 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-[11px] font-semibold text-slate-500 hover:text-brand-600 hover:border-brand-400 transition-colors"
                >
                  + Add Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
