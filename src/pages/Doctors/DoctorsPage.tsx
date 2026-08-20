import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Doctor } from '../../types';
import { Modal } from '../../components/common/Modal';
import {
  Stethoscope,
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  CheckCircle2,
  Users,
  Award,
  Search,
  Filter
} from 'lucide-react';

interface DoctorsPageProps {
  onOpenQuickAdd: () => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onOpenQuickAdd }) => {
  const { doctors, appointments } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const filteredDoctors = doctors.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'all' || d.department.toLowerCase().includes(selectedDept.toLowerCase());
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Medical Faculty & Consultants
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Specialist roster, consultation schedules, clinic rooms, and availability status
          </p>
        </div>

        <button
          onClick={onOpenQuickAdd}
          className="flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Consultation</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-500 outline-none"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 outline-none"
        >
          <option value="all">All Specialties</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Gynecology">Gynecology</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="Neurology">Neurology</option>
          <option value="Dermatology">Dermatology</option>
        </select>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all overflow-hidden flex flex-col justify-between group"
          >
            <div className="p-5 space-y-4">
              {/* Doctor Avatar + Status Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/20 shadow-md group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{doc.name}</h3>
                    <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">{doc.department}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{doc.rating}</span>
                      <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    doc.status === 'Available'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : doc.status === 'In Surgery'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {doc.status}
                </span>
              </div>

              {/* Specialization & Qualification */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 text-xs space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">{doc.specialization}</p>
                <p className="text-slate-500 dark:text-slate-400">{doc.qualification}</p>
                <div className="pt-1 flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-medium">
                    <Award className="w-3.5 h-3.5 text-brand-500" /> {doc.experience}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">Fee: ₹{doc.consultationFee}</span>
                </div>
              </div>

              {/* Timing & Room */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{doc.availability}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{doc.roomNumber}</span>
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Today: <strong className="text-slate-800 dark:text-slate-200">{doc.todayAppointmentsCount} Patients</strong>
              </span>
              <button
                onClick={() => setSelectedDoctor(doc)}
                className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 rounded-xl text-xs font-bold transition-all"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Doctor Detailed Profile Modal */}
      {selectedDoctor && (
        <Modal
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          title={`Doctor Profile — ${selectedDoctor.name}`}
          subtitle={`${selectedDoctor.qualification} • ${selectedDoctor.specialization}`}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-medblue-600 to-brand-600 text-white">
              <img
                src={selectedDoctor.avatar}
                alt=""
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/50"
              />
              <div>
                <h3 className="text-lg font-bold">{selectedDoctor.name}</h3>
                <p className="text-xs text-brand-100">{selectedDoctor.specialization}</p>
                <div className="flex items-center gap-3 mt-1 text-xs">
                  <span className="flex items-center gap-1 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" /> {selectedDoctor.rating} Rating
                  </span>
                  <span>•</span>
                  <span>{selectedDoctor.experience} Experience</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400">Consultation Fee</span>
                <p className="text-base font-extrabold text-slate-900 dark:text-white">₹{selectedDoctor.consultationFee}</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1">
                <span className="text-slate-400">Clinic Room</span>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{selectedDoctor.roomNumber}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <p><strong>OPD Hours:</strong> {selectedDoctor.availability}</p>
              <p><strong>Official Email:</strong> {selectedDoctor.email}</p>
              <p><strong>Phone Extension:</strong> {selectedDoctor.phone}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setSelectedDoctor(null);
                  onOpenQuickAdd();
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-brand-600 to-medblue-600 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Schedule Appointment With Doctor
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
