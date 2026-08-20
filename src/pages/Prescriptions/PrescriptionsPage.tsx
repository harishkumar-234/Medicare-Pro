import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Prescription, PrescriptionMedicine } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  FileText,
  Plus,
  Printer,
  Download,
  Share2,
  Trash2,
  Stethoscope,
  Pill,
  User,
  HeartPulse,
  Cross,
  Sparkles,
  Calendar,
  Check,
  Search
} from 'lucide-react';

export const PrescriptionsPage: React.FC = () => {
  const { prescriptions, patients, doctors, addPrescription } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Rx Composer State
  const [patId, setPatId] = useState(patients[0]?.id || '');
  const [docId, setDocId] = useState(doctors[0]?.id || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [bp, setBp] = useState('120/80 mmHg');
  const [pulse, setPulse] = useState('72 bpm');
  const [temp, setTemp] = useState('98.6 °F');
  const [weight, setWeight] = useState('70 kg');
  const [advice, setAdvice] = useState('Adequate rest, hydration, and periodic blood pressure checks.');
  const [followUp, setFollowUp] = useState('2026-09-05');

  const [medicines, setMedicines] = useState<PrescriptionMedicine[]>([
    {
      id: 'm-1',
      name: 'Augmentin 625 Duo',
      dosage: '1 Tablet',
      frequency: '1-0-1 (After Food)',
      duration: '5 Days',
      instructions: 'Complete the entire course without skipping.'
    }
  ]);

  const handleAddMedicineRow = () => {
    setMedicines((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        name: 'Paracetamol 650mg',
        dosage: '1 Tablet',
        frequency: '1-0-1 (PRN)',
        duration: '3 Days',
        instructions: 'Take in case of body ache or fever.'
      }
    ]);
  };

  const handleRemoveMedicineRow = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const handleMedicineChange = (id: string, field: keyof PrescriptionMedicine, val: string) => {
    setMedicines((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: val } : m)));
  };

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === patId) || patients[0];
    const doctor = doctors.find((d) => d.id === docId) || doctors[0];

    const created = addPrescription({
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialization,
      department: doctor.department,
      date: new Date().toISOString().split('T')[0],
      diagnosis: diagnosis || 'Clinical Evaluation & Symptomatic Relief',
      symptoms: ['Fatigue', 'Mild pyrexia'],
      vitalSigns: {
        bloodPressure: bp,
        pulseRate: pulse,
        temperature: temp,
        weight: weight,
        spo2: '99%'
      },
      medicines,
      advice,
      followUpDate: followUp
    });

    setIsNewModalOpen(false);
    setSelectedPrescription(created);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredPrescriptions = prescriptions.filter((rx) =>
    rx.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.prescriptionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Digital Prescription Pad (Rx)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Generate printable clinical prescriptions with dosages, vitals, diagnostics, and digital signatures
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Prescription</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex items-center justify-between no-print">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search prescriptions by patient or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>
      </div>

      {/* Prescriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {filteredPrescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400 flex items-center justify-center font-bold text-xs">
                    Rx
                  </div>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{rx.prescriptionNumber}</span>
                </div>
                <span className="text-xs text-slate-400">{rx.date}</span>
              </div>

              <div>
                <p className="text-xs text-slate-400">Patient</p>
                <h3 className="font-bold text-slate-900 dark:text-white">{rx.patientName}</h3>
                <p className="text-[11px] text-slate-400">{rx.patientAge} yrs • {rx.patientGender}</p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Diagnosis:</p>
                <p className="text-slate-600 dark:text-slate-400 line-clamp-2">{rx.diagnosis}</p>
              </div>

              <div className="text-xs text-slate-500">
                <span>{rx.medicines.length} Medicines Prescribed</span> • <span>Dr. {rx.doctorName}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setSelectedPrescription(rx)}
                className="w-full py-2 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 rounded-xl text-xs font-bold transition-all text-center"
              >
                View & Print Prescription
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Printable Prescription Modal / Document */}
      {selectedPrescription && (
        <Modal
          isOpen={!!selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
          title="Digital Medical Prescription"
          subtitle="Hospital standard printable Rx document"
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex items-center justify-end gap-2 no-print">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print Document
              </button>
            </div>

            {/* Printable Document Paper */}
            <div id="printable-area" className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-slate-900 dark:text-white space-y-6">
              {/* Header Letterhead */}
              <div className="flex items-center justify-between border-b-2 border-brand-500 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-black text-2xl">
                    +
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                      MEDICARE PRO MULTISPECIALTY HOSPITAL
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      NABH Accredited Tertiary Healthcare Center • 24x7 Emergency & Pharmacy
                    </p>
                    <p className="text-[11px] text-slate-400">
                      100 Feet Ring Road, Bangalore - 560038 • Ph: +91 (80) 4122-8000
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold text-brand-600 dark:text-brand-400">{selectedPrescription.prescriptionNumber}</p>
                  <p className="text-slate-400">Date: {selectedPrescription.date}</p>
                </div>
              </div>

              {/* Doctor & Patient Info Strip */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs">
                <div>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{selectedPrescription.doctorName}</p>
                  <p className="text-slate-500">{selectedPrescription.doctorSpecialty}</p>
                  <p className="text-slate-400">Dept: {selectedPrescription.department}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-900 dark:text-white">
                    Patient: {selectedPrescription.patientName}
                  </p>
                  <p className="text-slate-500">
                    Age/Gender: {selectedPrescription.patientAge} Yrs / {selectedPrescription.patientGender}
                  </p>
                  <p className="text-slate-400">ID: {selectedPrescription.patientId}</p>
                </div>
              </div>

              {/* Vitals */}
              <div className="grid grid-cols-5 gap-2 text-center text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-slate-400 text-[10px]">BP</span>
                  <p className="font-bold">{selectedPrescription.vitalSigns.bloodPressure}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Pulse</span>
                  <p className="font-bold">{selectedPrescription.vitalSigns.pulseRate}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Temp</span>
                  <p className="font-bold">{selectedPrescription.vitalSigns.temperature}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">Weight</span>
                  <p className="font-bold">{selectedPrescription.vitalSigns.weight}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">SpO2</span>
                  <p className="font-bold">{selectedPrescription.vitalSigns.spo2}</p>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="text-xs space-y-1">
                <p className="font-bold uppercase tracking-wider text-slate-500">Clinical Diagnosis</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                  {selectedPrescription.diagnosis}
                </p>
              </div>

              {/* Medicines List Rx Symbol */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-serif text-2xl font-bold text-brand-600">
                  ℞ <span className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">Medications Prescribed</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 dark:bg-slate-800 font-bold uppercase text-[10px] text-slate-500">
                      <tr>
                        <th className="p-2.5">Medicine Name & Formulation</th>
                        <th className="p-2.5">Dosage</th>
                        <th className="p-2.5">Frequency</th>
                        <th className="p-2.5">Duration</th>
                        <th className="p-2.5">Specific Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {selectedPrescription.medicines.map((m, i) => (
                        <tr key={i}>
                          <td className="p-2.5 font-bold text-slate-900 dark:text-white">{m.name}</td>
                          <td className="p-2.5">{m.dosage}</td>
                          <td className="p-2.5 font-semibold text-brand-600 dark:text-brand-400">{m.frequency}</td>
                          <td className="p-2.5">{m.duration}</td>
                          <td className="p-2.5 text-slate-500 dark:text-slate-400">{m.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Advice and Next Visit */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-4 border-t border-slate-200 dark:border-slate-700">
                <div>
                  <p className="font-bold text-slate-500 uppercase tracking-wider">General Advice & Precautions</p>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">{selectedPrescription.advice}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-500 uppercase tracking-wider">Review / Next Visit</p>
                  <p className="text-brand-600 dark:text-brand-400 font-bold mt-1">{selectedPrescription.followUpDate}</p>
                </div>
              </div>

              {/* Doctor Signature */}
              <div className="pt-8 flex justify-end">
                <div className="text-center space-y-1">
                  <div className="w-40 border-b border-slate-400 pb-6 text-brand-600 font-cursive italic font-semibold text-sm">
                    {selectedPrescription.doctorName}
                  </div>
                  <p className="text-xs font-bold">{selectedPrescription.doctorName}</p>
                  <p className="text-[10px] text-slate-400">Reg No: KMC-2012-88219</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* New Prescription Composer Modal */}
      {isNewModalOpen && (
        <Modal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          title="Compose Digital Prescription"
          subtitle="Add diagnosis, vital statistics and itemized medicine dosages"
          maxWidth="4xl"
        >
          <form onSubmit={handleCreatePrescription} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Patient</label>
                <select
                  value={patId}
                  onChange={(e) => setPatId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.patientId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Prescribing Doctor</label>
                <select
                  value={docId}
                  onChange={(e) => setDocId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialization}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Diagnosis & Assessment *</label>
              <input
                type="text"
                required
                placeholder="e.g. Acute Pharyngitis with Upper Respiratory Tract Infection"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
              />
            </div>

            {/* Vitals Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Blood Pressure</label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Pulse Rate</label>
                <input
                  type="text"
                  value={pulse}
                  onChange={(e) => setPulse(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Body Temperature</label>
                <input
                  type="text"
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Weight (kg)</label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none"
                />
              </div>
            </div>

            {/* Medicine Rows */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Prescription Medicines (Rx)</span>
                <button
                  type="button"
                  onClick={handleAddMedicineRow}
                  className="text-xs text-brand-600 dark:text-brand-400 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Another Drug
                </button>
              </div>

              {medicines.map((m, idx) => (
                <div key={m.id} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-brand-600">Medicine #{idx + 1}</span>
                    {medicines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMedicineRow(m.id)}
                        className="text-rose-500 text-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Drug Name"
                      value={m.name}
                      onChange={(e) => handleMedicineChange(m.id, 'name', e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 500mg)"
                      value={m.dosage}
                      onChange={(e) => handleMedicineChange(m.id, 'dosage', e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Frequency (1-0-1)"
                      value={m.frequency}
                      onChange={(e) => handleMedicineChange(m.id, 'frequency', e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Duration (5 Days)"
                      value={m.duration}
                      onChange={(e) => handleMedicineChange(m.id, 'duration', e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Instructions (e.g. After meals with water)"
                    value={m.instructions}
                    onChange={(e) => handleMedicineChange(m.id, 'instructions', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-brand-600 to-medblue-600 rounded-xl shadow-md"
              >
                Save & Issue Digital Rx
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
