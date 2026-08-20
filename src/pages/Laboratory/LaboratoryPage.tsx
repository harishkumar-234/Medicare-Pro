import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { LabOrder, LabTest } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  FlaskConical,
  Search,
  Plus,
  FileCheck,
  Clock,
  Printer,
  Upload,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LaboratoryPage: React.FC = () => {
  const { labTests, labOrders, patients, doctors, addLabOrder, updateLabOrderStatus } = useHospital();

  const [activeTab, setActiveTab] = useState<'orders' | 'catalog'>('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderForReport, setSelectedOrderForReport] = useState<LabOrder | null>(null);

  // New Order Form state
  const [patId, setPatId] = useState(patients[0]?.id || '');
  const [docId, setDocId] = useState(doctors[0]?.id || '');
  const [selectedTestId, setSelectedTestId] = useState(labTests[0]?.id || '');

  // Result completion state
  const [resultVal, setResultVal] = useState('');
  const [techRemarks, setTechRemarks] = useState('');

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === patId) || patients[0];
    const doctor = doctors.find((d) => d.id === docId) || doctors[0];
    const test = labTests.find((t) => t.id === selectedTestId) || labTests[0];

    addLabOrder({
      patientId: patient.id,
      patientName: patient.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      testName: test.testName,
      testCategory: test.category,
      date: new Date().toISOString().split('T')[0],
      sampleStatus: 'Sample Needed',
      price: test.price,
      paymentStatus: 'Paid'
    });

    setIsOrderModalOpen(false);
  };

  const handleCompleteReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForReport) return;

    updateLabOrderStatus(selectedOrderForReport.id, 'Completed', resultVal, techRemarks);
    setSelectedOrderForReport(null);
    setResultVal('');
    setTechRemarks('');
  };

  const filteredOrders = labOrders.filter((ord) =>
    ord.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ord.testName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Diagnostic Pathology & Laboratory Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Sample collection tracking, automated analyzer integration, and digital diagnostic reports
          </p>
        </div>

        <button
          onClick={() => setIsOrderModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Lab Requisition</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Clock className="w-4 h-4" /> Lab Orders & Results ({labOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'catalog'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" /> Test Catalog ({labTests.length})
          </button>
        </div>
      </div>

      {/* Lab Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {/* Search Box */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search lab orders by requisition number, patient or test..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-850/80 text-slate-500 dark:text-slate-400 font-bold uppercase text-[11px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Order ID & Date</th>
                    <th className="py-3.5 px-4">Patient Details</th>
                    <th className="py-3.5 px-4">Test Requested</th>
                    <th className="py-3.5 px-4">Sample Status</th>
                    <th className="py-3.5 px-4">Diagnostic Value</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-bold text-brand-600 dark:text-brand-400">{ord.orderNumber}</p>
                        <p className="text-[11px] text-slate-400">{ord.date}</p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-bold text-slate-900 dark:text-white">{ord.patientName}</p>
                        <p className="text-[11px] text-slate-400">Dr. {ord.doctorName}</p>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{ord.testName}</p>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {ord.testCategory}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            ord.sampleStatus === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : ord.sampleStatus === 'Processing'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 animate-pulse'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {ord.sampleStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {ord.resultValue ? (
                          <div>
                            <p className="font-bold text-emerald-600 dark:text-emerald-400">{ord.resultValue}</p>
                            <p className="text-[10px] text-slate-400">{ord.remarks || 'Normal parameters'}</p>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs italic">Awaiting analyzer run</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          {ord.sampleStatus === 'Sample Needed' && (
                            <button
                              onClick={() => updateLabOrderStatus(ord.id, 'Sample Collected')}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-semibold"
                            >
                              Collect Sample
                            </button>
                          )}
                          {ord.sampleStatus === 'Sample Collected' && (
                            <button
                              onClick={() => updateLabOrderStatus(ord.id, 'Processing')}
                              className="px-2.5 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-semibold"
                            >
                              Start Processing
                            </button>
                          )}
                          {ord.sampleStatus === 'Processing' && (
                            <button
                              onClick={() => {
                                setSelectedOrderForReport(ord);
                                setResultVal(ord.testName.includes('CBC') ? '14.2 g/dL (Hb)' : '110 mg/dL (Normal)');
                              }}
                              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-semibold"
                            >
                              Enter Result
                            </button>
                          )}
                          {ord.sampleStatus === 'Completed' && (
                            <button
                              onClick={() => setSelectedOrderForReport(ord)}
                              className="px-2.5 py-1 bg-brand-50 hover:bg-brand-100 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 rounded-lg text-xs font-bold"
                            >
                              View Report
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Catalog Tab */}
      {activeTab === 'catalog' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {labTests.map((test) => (
            <div
              key={test.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold">
                    {test.testCode}
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">₹{test.price}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">{test.testName}</h3>
                <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{test.category}</p>
                <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                  <p>Turnaround Time: <strong>{test.tatHours} Hours</strong></p>
                  <p>Normal Reference: <strong>{test.normalRange}</strong></p>
                  <p>{test.fastingRequired ? '⚠️ Overnight Fasting Mandatory' : '✓ Random Sample Permitted'}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTestId(test.id);
                  setIsOrderModalOpen(true);
                }}
                className="w-full mt-4 py-2 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 text-xs font-bold rounded-xl"
              >
                Request This Test
              </button>
            </div>
          ))}
        </div>
      )}

      {/* New Lab Order Modal */}
      {isOrderModalOpen && (
        <Modal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          title="Create Diagnostic Test Order"
          subtitle="Generate lab barcode requisition and billing item"
        >
          <form onSubmit={handleCreateOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Patient</label>
              <select
                value={patId}
                onChange={(e) => setPatId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Ordering Physician</label>
              <select
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} — {d.department}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Diagnostic Test Name</label>
              <select
                value={selectedTestId}
                onChange={(e) => setSelectedTestId(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {labTests.map((t) => (
                  <option key={t.id} value={t.id}>{t.testName} (₹{t.price})</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button type="button" onClick={() => setIsOrderModalOpen(false)} className="px-4 py-2 text-xs text-slate-500">
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-brand-600 rounded-xl">
                Confirm Lab Order
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Enter Result / View Report Modal */}
      {selectedOrderForReport && (
        <Modal
          isOpen={!!selectedOrderForReport}
          onClose={() => setSelectedOrderForReport(null)}
          title={`Diagnostic Report — ${selectedOrderForReport.orderNumber}`}
          subtitle={`${selectedOrderForReport.testName} for ${selectedOrderForReport.patientName}`}
        >
          {selectedOrderForReport.sampleStatus === 'Processing' ? (
            <form onSubmit={handleCompleteReport} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Enter Test Result Value *</label>
                <input
                  type="text"
                  required
                  value={resultVal}
                  onChange={(e) => setResultVal(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl font-bold"
                  placeholder="e.g. 14.2 g/dL (Hb) | Total WBC: 7,400 /cumm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Pathologist Remarks / Impression</label>
                <input
                  type="text"
                  value={techRemarks}
                  onChange={(e) => setTechRemarks(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  placeholder="e.g. Normal parameters within clinical reference intervals."
                />
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button type="button" onClick={() => setSelectedOrderForReport(null)} className="px-4 py-2 text-xs text-slate-500">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 rounded-xl">
                  Approve & Release Report
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 space-y-2">
                <p><strong>Patient:</strong> {selectedOrderForReport.patientName}</p>
                <p><strong>Prescribing Doctor:</strong> Dr. {selectedOrderForReport.doctorName}</p>
                <p><strong>Test:</strong> {selectedOrderForReport.testName}</p>
                <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 mt-2">
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Verified Result</span>
                  <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {selectedOrderForReport.resultValue}
                  </p>
                  <p className="text-slate-500 mt-1">{selectedOrderForReport.remarks}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => window.print()} className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 text-white rounded-xl font-bold">
                  <Printer className="w-4 h-4" /> Print Diagnostic Sheet
                </button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
