import React, { useEffect, useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Search, User, Calendar, Stethoscope, Pill, FileText, Activity, ArrowRight, X } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, meta?: any) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const { patients, doctors, appointments, medicines, invoices, labOrders } = useHospital();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // toggle handled externally or if open close, but if closed parent opens
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredPatients = q
    ? patients.filter((p) => p.name.toLowerCase().includes(q) || p.patientId.toLowerCase().includes(q) || p.phone.includes(q))
    : [];

  const filteredDoctors = q
    ? doctors.filter((d) => d.name.toLowerCase().includes(q) || d.department.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q))
    : [];

  const filteredAppointments = q
    ? appointments.filter((a) => a.patientName.toLowerCase().includes(q) || a.appointmentNumber.toLowerCase().includes(q))
    : [];

  const filteredMedicines = q
    ? medicines.filter((m) => m.name.toLowerCase().includes(q) || m.genericName.toLowerCase().includes(q))
    : [];

  const filteredInvoices = q
    ? invoices.filter((i) => i.invoiceNumber.toLowerCase().includes(q) || i.patientName.toLowerCase().includes(q))
    : [];

  const handleSelect = (page: string, meta?: any) => {
    onNavigate(page, meta);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 overflow-y-auto">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 animate-slide-up flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 gap-3 bg-slate-50/70 dark:bg-slate-850">
          <Search className="w-5 h-5 text-brand-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search patients, doctors, appointments, medicines, invoices (Type to search)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            ESC
          </span>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {!query ? (
            <div className="py-8 text-center text-slate-400">
              <Activity className="w-10 h-10 mx-auto mb-2 opacity-30 text-brand-500" />
              <p className="text-sm font-medium">Quickly jump across all hospital records</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Try "Ravi"</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Try "Cardiology"</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Try "Dolo"</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Try "INV-2026"</span>
              </div>
            </div>
          ) : (
            <>
              {filteredPatients.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-brand-500" /> Patients ({filteredPatients.length})
                  </div>
                  <div className="space-y-1">
                    {filteredPatients.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect('patients', p)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-brand-50 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={p.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400">
                              {p.name}
                            </p>
                            <p className="text-xs text-slate-400">{p.patientId} • {p.bloodGroup} • {p.phone}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredDoctors.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-medblue-500" /> Doctors ({filteredDoctors.length})
                  </div>
                  <div className="space-y-1">
                    {filteredDoctors.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => handleSelect('doctors', d)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-medblue-50 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={d.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-medblue-600 dark:group-hover:text-medblue-400">
                              {d.name}
                            </p>
                            <p className="text-xs text-slate-400">{d.specialization} • {d.department}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-medblue-500 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredMedicines.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Pill className="w-3.5 h-3.5 text-emerald-500" /> Medicines ({filteredMedicines.length})
                  </div>
                  <div className="space-y-1">
                    {filteredMedicines.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => handleSelect('pharmacy', m)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                            {m.name}
                          </p>
                          <p className="text-xs text-slate-400">{m.genericName} • Stock: {m.stockQuantity} {m.unit}</p>
                        </div>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">₹{m.sellingPrice}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredInvoices.length > 0 && (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" /> Invoices ({filteredInvoices.length})
                  </div>
                  <div className="space-y-1">
                    {filteredInvoices.map((inv) => (
                      <div
                        key={inv.id}
                        onClick={() => handleSelect('billing', inv)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 cursor-pointer group transition-colors"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-white group-hover:text-indigo-600">
                            {inv.invoiceNumber} - {inv.patientName}
                          </p>
                          <p className="text-xs text-slate-400">{inv.date} • Total: ₹{inv.grandTotal.toLocaleString('en-IN')}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          inv.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {inv.paymentStatus}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredPatients.length === 0 && filteredDoctors.length === 0 && filteredMedicines.length === 0 && filteredInvoices.length === 0 && (
                <div className="py-8 text-center text-slate-400">
                  <p className="text-sm">No matching records found for "{query}".</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
