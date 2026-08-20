import React, { useState, useEffect } from 'react';
import { useHospital } from '../../context/HospitalContext';
import {
  Tv,
  Volume2,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  SkipForward,
  UserCheck,
  Stethoscope,
  Clock,
  Sparkles,
  Maximize2,
  Minimize2,
  BellRing
} from 'lucide-react';

export const QueuePage: React.FC = () => {
  const {
    currentTokenNumber,
    nextPatientToken,
    prevPatientToken,
    callToken,
    holdToken,
    appointments,
    doctors
  } = useHospital();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Find currently serving patient details
  const currentServingAppointment = appointments.find((a) => a.tokenNumber === currentTokenNumber) || {
    tokenNumber: currentTokenNumber,
    patientName: 'Ravi Kumar',
    doctorName: 'Dr. Rajesh Kumar',
    doctorSpecialty: 'Senior Orthopedic Surgeon',
    roomNumber: 'Consultation Room 04',
    department: 'Orthopedics'
  };

  // Upcoming Queue Tokens
  const upcomingTokens = [
    { token: currentTokenNumber + 1, name: 'Anjali Devi', doctor: 'Dr. Priya Sharma', room: 'Room 205 (Wing B)', status: 'Next In Line' },
    { token: currentTokenNumber + 2, name: 'Suresh Babu', doctor: 'Dr. Arjun Kumar', room: 'Room 102 (Wing A)', status: 'Waiting' },
    { token: currentTokenNumber + 3, name: 'Priya Nair', doctor: 'Dr. Meera Nambiar', room: 'Room 108 (Skin Care)', status: 'Waiting' },
    { token: currentTokenNumber + 4, name: 'Master Aarav Patel', doctor: 'Dr. Ananya Reddy', room: 'Room 118 (Children Wing)', status: 'Waiting' },
  ];

  return (
    <div className={`space-y-6 animate-fade-in ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto' : ''}`}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-medblue-600 flex items-center justify-center text-white shadow-glow-teal">
            <Tv className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Reception OPD Token Display System
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500 text-white tracking-wider animate-pulse">
                LIVE ON AIR
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Broadcasting to reception waiting lounge TVs & patient mobile alerts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono font-bold px-3.5 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            {currentTime}
          </div>
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Exit TV Mode' : 'Reception TV Mode'}</span>
          </button>
        </div>
      </div>

      {/* Main Big TV Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Giant Animated Active Token Board (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-brand-950 border-2 border-brand-500/40 p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[440px]">
          {/* Subtle background effects */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-medblue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Banner inside TV */}
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-400">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>MediCare Central OPD Broadcast</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold">Now Calling</span>
            </div>
          </div>

          {/* Center Giant Token Number */}
          <div className="my-8 text-center relative z-10 space-y-3">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400">
              CURRENT TOKEN NUMBER
            </p>
            <div className="inline-block px-10 py-4 rounded-3xl bg-slate-800/80 border border-brand-500/50 shadow-glow-teal animate-slide-up">
              <span className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-brand-400">
                {currentTokenNumber.toString().padStart(3, '0')}
              </span>
            </div>
          </div>

          {/* Bottom Patient & Doctor Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-800/60 backdrop-blur-md border border-slate-700/60 relative z-10">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Patient Name</span>
              <p className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                {currentServingAppointment.patientName}
              </p>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Consultant & Room</span>
              <p className="text-base sm:text-lg font-bold text-brand-300 mt-0.5">
                {currentServingAppointment.doctorName}
              </p>
              <p className="text-xs text-amber-300 font-semibold">{currentServingAppointment.roomNumber}</p>
            </div>
          </div>
        </div>

        {/* Right: Upcoming Tokens Queue Matrix (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-card flex-1 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-500" />
                <span>Next In Queue</span>
              </h3>
              <span className="text-xs font-bold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-full">
                4 Patients
              </span>
            </div>

            <div className="space-y-2.5">
              {upcomingTokens.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    idx === 0
                      ? 'bg-brand-50/70 dark:bg-brand-950/40 border-brand-300 dark:border-brand-800 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-850/60 border-slate-200/70 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                      #{item.token.toString().padStart(3, '0')}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{item.name}</p>
                      <p className="text-[11px] text-slate-400">{item.doctor}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      idx === 0
                        ? 'bg-brand-200 text-brand-900 dark:bg-brand-900 dark:text-brand-200 animate-pulse'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Doctor Station Token Remote Controller */}
          <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Doctor Consultation Controller
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={nextPatientToken}
                className="py-2.5 px-3 bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 text-white text-xs font-bold rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
              >
                <BellRing className="w-4 h-4 animate-bounce" /> Call Next
              </button>
              <button
                onClick={() => holdToken(currentTokenNumber)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-all"
              >
                Hold Token
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={prevPatientToken}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold rounded-lg"
              >
                ← Previous
              </button>
              <button
                onClick={() => nextPatientToken()}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-semibold rounded-lg"
              >
                Skip Token →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
