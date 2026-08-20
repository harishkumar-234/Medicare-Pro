import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Modal } from '../common/Modal';
import { UserPlus, CalendarPlus, FilePlus, Pill, PlusCircle, Check } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose }) => {
  const { addPatient, addAppointment, doctors, patients } = useHospital();
  const [activeTab, setActiveTab] = useState<'appointment' | 'patient'>('appointment');

  // Appointment form state
  const [aptPatientId, setAptPatientId] = useState(patients[0]?.id || '');
  const [aptDoctorId, setAptDoctorId] = useState(doctors[0]?.id || '');
  const [aptDate, setAptDate] = useState('2026-08-20');
  const [aptTime, setAptTime] = useState('11:00 AM');
  const [aptType, setAptType] = useState<any>('General Consultation');
  const [aptNotes, setAptNotes] = useState('');

  // Patient form state
  const [patName, setPatName] = useState('');
  const [patAge, setPatAge] = useState(30);
  const [patGender, setPatGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [patPhone, setPatPhone] = useState('+91 ');
  const [patEmail, setPatEmail] = useState('');
  const [patBloodGroup, setPatBloodGroup] = useState('B+ve');
  const [patDept, setPatDept] = useState('Cardiology');
  const [patAddress, setPatAddress] = useState('');

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = patients.find((p) => p.id === aptPatientId) || patients[0];
    const doctor = doctors.find((d) => d.id === aptDoctorId) || doctors[0];

    addAppointment({
      patientId: patient.id,
      patientName: patient.name,
      patientAge: patient.age,
      patientGender: patient.gender,
      patientPhone: patient.phone,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialization,
      department: doctor.department,
      date: aptDate,
      time: aptTime,
      status: 'Confirmed',
      roomNumber: doctor.roomNumber,
      type: aptType,
      notes: aptNotes,
      fee: doctor.consultationFee,
      isPaid: true
    });
    onClose();
  };

  const handleCreatePatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patName) return;

    const assignedDoc = doctors.find((d) => d.department.includes(patDept)) || doctors[0];

    addPatient({
      name: patName,
      age: Number(patAge),
      gender: patGender,
      phone: patPhone,
      email: patEmail || `${patName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      bloodGroup: patBloodGroup,
      address: patAddress || 'Bangalore, Karnataka',
      emergencyContact: {
        name: 'Family Member',
        relation: 'Relative',
        phone: patPhone
      },
      assignedDoctorId: assignedDoc.id,
      assignedDoctorName: assignedDoc.name,
      department: patDept,
      lastVisit: new Date().toISOString().split('T')[0],
      status: 'Active',
      allergies: ['None Reported'],
      medicalHistory: ['Routine Checkup Record'],
      currentMedications: [],
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    });

    // Reset & close
    setPatName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Action Creator" subtitle="Fast track patient registration or appointment scheduling">
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('appointment')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'appointment'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <CalendarPlus className="w-4 h-4" /> Book Appointment
          </button>
          <button
            onClick={() => setActiveTab('patient')}
            className={`flex items-center gap-2 pb-3 px-4 text-sm font-semibold border-b-2 transition-all ${
              activeTab === 'patient'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Register Patient
          </button>
        </div>

        {/* Appointment Form */}
        {activeTab === 'appointment' && (
          <form onSubmit={handleCreateAppointment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Select Patient</label>
                <select
                  value={aptPatientId}
                  onChange={(e) => setAptPatientId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.patientId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Doctor & Specialty</label>
                <select
                  value={aptDoctorId}
                  onChange={(e) => setAptDoctorId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.department} (₹{d.consultationFee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Appointment Date</label>
                <input
                  type="date"
                  value={aptDate}
                  onChange={(e) => setAptDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Preferred Slot</label>
                <select
                  value={aptTime}
                  onChange={(e) => setAptTime(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="02:30 PM">02:30 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Consultation Notes / Reason</label>
              <input
                type="text"
                placeholder="e.g. Follow-up review or blood sugar review"
                value={aptNotes}
                onChange={(e) => setAptNotes(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-md transition-all"
              >
                <Check className="w-4 h-4" /> Confirm Booking
              </button>
            </div>
          </form>
        )}

        {/* Patient Form */}
        {activeTab === 'patient' && (
          <form onSubmit={handleCreatePatient} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={patName}
                  onChange={(e) => setPatName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Age</label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={patAge}
                    onChange={(e) => setPatAge(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Gender</label>
                  <select
                    value={patGender}
                    onChange={(e: any) => setPatGender(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={patPhone}
                  onChange={(e) => setPatPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Blood Group</label>
                <select
                  value={patBloodGroup}
                  onChange={(e) => setPatBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option value="A+ve">A+ve</option>
                  <option value="A-ve">A-ve</option>
                  <option value="B+ve">B+ve</option>
                  <option value="B-ve">B-ve</option>
                  <option value="O+ve">O+ve</option>
                  <option value="O-ve">O-ve</option>
                  <option value="AB+ve">AB+ve</option>
                  <option value="AB-ve">AB-ve</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Initial Department</label>
                <select
                  value={patDept}
                  onChange={(e) => setPatDept(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Dermatology">Dermatology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Residential City / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Indiranagar, Bangalore"
                  value={patAddress}
                  onChange={(e) => setPatAddress(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-md transition-all"
              >
                <UserPlus className="w-4 h-4" /> Save Patient
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
