import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Patient } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  Users,
  Search,
  Plus,
  Eye,
  FileText,
  Phone,
  Mail,
  MapPin,
  HeartPulse,
  AlertTriangle,
  Pill,
  Calendar,
  IndianRupee,
  Clock,
  Printer,
  Download,
  CheckCircle2,
  X,
  Stethoscope,
  Activity
} from 'lucide-react';

interface PatientsPageProps {
  onOpenQuickAdd: () => void;
  onNavigateToPrescription?: (patientName: string) => void;
}

export const PatientsPage: React.FC<PatientsPageProps> = ({ onOpenQuickAdd }) => {
  const { patients, deletePatient, doctors, prescriptions, invoices, labOrders } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeProfileTab, setActiveProfileTab] = useState<'overview' | 'history' | 'prescriptions' | 'lab' | 'billing'>('overview');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery);

    const matchesDept = departmentFilter === 'all' || p.department.toLowerCase().includes(departmentFilter.toLowerCase());

    return matchesSearch && matchesDept;
  });

  const patientPrescriptions = selectedPatient
    ? prescriptions.filter((rx) => rx.patientId === selectedPatient.id || rx.patientName === selectedPatient.name)
    : [];

  const patientInvoices = selectedPatient
    ? invoices.filter((inv) => inv.patientId === selectedPatient.id || inv.patientName === selectedPatient.name)
    : [];

  const patientLabOrders = selectedPatient
    ? labOrders.filter((lab) => lab.patientId === selectedPatient.id || lab.patientName === selectedPatient.name)
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Patient Medical Records & Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comprehensive Electronic Health Records (EHR), clinical timelines, and diagnostic history
          </p>
        </div>

        <button
          onClick={onOpenQuickAdd}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Register Patient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, patient ID or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
          >
            <option value="all">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
          </select>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-850/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Patient Profile</th>
                <th className="py-3.5 px-4">Age / Gender</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Blood Group</th>
                <th className="py-3.5 px-4">Primary Consultant</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredPatients.map((p) => (
                <tr
                  key={p.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  {/* Patient Info */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                      />
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                        <span className="text-[11px] font-mono text-brand-600 dark:text-brand-400">{p.patientId}</span>
                      </div>
                    </div>
                  </td>

                  {/* Age/Gender */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {p.age} yrs, {p.gender}
                    </p>
                    <p className="text-[11px] text-slate-400">Reg: {p.registeredDate}</p>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{p.phone}</p>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{p.email}</p>
                  </td>

                  {/* Blood Group */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 font-bold text-xs">
                      {p.bloodGroup}
                    </span>
                  </td>

                  {/* Doctor & Department */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{p.assignedDoctorName}</p>
                    <span className="text-[11px] text-brand-600 dark:text-brand-400">{p.department}</span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === 'Inpatient'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedPatient(p)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 rounded-xl text-xs font-bold transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" /> Full EHR
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Patient Profile Drawer / Modal */}
      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title={`EHR Profile — ${selectedPatient.name}`}
          subtitle={`Patient ID: ${selectedPatient.patientId} • Registered on ${selectedPatient.registeredDate}`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Header Mini Hero */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-brand-600 to-medblue-700 text-white gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedPatient.avatar}
                  alt=""
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/40 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold">{selectedPatient.name}</h3>
                  <p className="text-xs text-brand-100 flex items-center gap-2 mt-0.5">
                    <span>{selectedPatient.age} Years</span> • <span>{selectedPatient.gender}</span> •{' '}
                    <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-[11px]">{selectedPatient.bloodGroup}</span>
                  </p>
                  <p className="text-xs text-brand-100 mt-1">{selectedPatient.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-md rounded-xl">
                  {selectedPatient.status} Patient
                </span>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Medical Overview', icon: Activity },
                { id: 'prescriptions', label: `Prescriptions (${patientPrescriptions.length})`, icon: Pill },
                { id: 'lab', label: `Diagnostics (${patientLabOrders.length})`, icon: HeartPulse },
                { id: 'billing', label: `Billing & Invoices (${patientInvoices.length})`, icon: IndianRupee },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeProfileTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveProfileTab(tab.id as any)}
                    className={`flex items-center gap-2 pb-3 px-3.5 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
                      isActive
                        ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            {activeProfileTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Allergies & Alerts */}
                <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Known Allergies & Sensitivities
                  </h4>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedPatient.allergies.map((allg, i) => (
                      <span key={i} className="px-2.5 py-1 bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200 rounded-lg text-xs font-bold">
                        {allg}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Current Active Medications */}
                <div className="p-4 rounded-2xl bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900/40 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 flex items-center gap-1.5">
                    <Pill className="w-4 h-4" /> Current Running Medications
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                    {selectedPatient.currentMedications.map((med, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                        <span>{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chronic Medical History */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Past Clinical Conditions
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {selectedPatient.medicalHistory.map((hist, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{hist}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Emergency Contact */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Emergency Contact Person
                  </h4>
                  <div className="text-xs space-y-1 text-slate-600 dark:text-slate-400">
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relation})
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-500" /> {selectedPatient.emergencyContact.phone}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeProfileTab === 'prescriptions' && (
              <div className="space-y-3">
                {patientPrescriptions.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No prescription records found for this patient.</p>
                ) : (
                  patientPrescriptions.map((rx) => (
                    <div key={rx.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">{rx.prescriptionNumber}</span>
                          <p className="text-xs text-slate-400">Prescribed by {rx.doctorName} on {rx.date}</p>
                        </div>
                        <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{rx.department}</span>
                      </div>
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Diagnosis: <span className="font-normal text-slate-600 dark:text-slate-400">{rx.diagnosis}</span></p>
                        <div className="mt-2 space-y-1">
                          {rx.medicines.map((m, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-900 text-xs">
                              <span className="font-bold text-slate-800 dark:text-slate-200">{m.name}</span>
                              <span className="text-slate-500">{m.dosage} • {m.frequency} ({m.duration})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeProfileTab === 'lab' && (
              <div className="space-y-3">
                {patientLabOrders.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No diagnostic lab orders placed.</p>
                ) : (
                  patientLabOrders.map((lab) => (
                    <div key={lab.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{lab.testName}</p>
                        <p className="text-xs text-slate-400">{lab.orderNumber} • Ordered by {lab.doctorName}</p>
                        {lab.resultValue && <p className="text-xs text-brand-600 font-bold mt-1">Result: {lab.resultValue}</p>}
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {lab.sampleStatus}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeProfileTab === 'billing' && (
              <div className="space-y-3">
                {patientInvoices.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No billing invoices found.</p>
                ) : (
                  patientInvoices.map((inv) => (
                    <div key={inv.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</p>
                        <p className="text-xs text-slate-400">Date: {inv.date} • Method: {inv.paymentMethod}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-slate-900 dark:text-white">₹{inv.grandTotal.toLocaleString('en-IN')}</p>
                        <span className="text-xs font-bold text-emerald-600">{inv.paymentStatus}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
