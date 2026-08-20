import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Layers, Users, Stethoscope, Bed, TrendingUp, IndianRupee, ArrowUpRight } from 'lucide-react';

export const DepartmentsPage: React.FC = () => {
  const { departments } = useHospital();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Hospital Clinical Departments & Centers of Excellence
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Bed occupancy metrics, Head of Departments (HOD), medical manpower and monthly revenue
        </p>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-elevated transition-all p-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    {dept.code}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{dept.name}</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-medblue-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {dept.name.charAt(0)}
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{dept.description}</p>

              {/* Head of Department */}
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                <img src={dept.headAvatar} alt="" className="w-9 h-9 rounded-full object-cover ring-1 ring-brand-500" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">HOD / Chief</span>
                  <p className="font-bold text-slate-900 dark:text-white">{dept.headOfDepartment}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                  <span className="text-[10px] text-slate-400">Doctors</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{dept.doctorsCount}</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                  <span className="text-[10px] text-slate-400">Nurses/Staff</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{dept.staffCount}</p>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                  <span className="text-[10px] text-slate-400">Active OPD</span>
                  <p className="font-bold text-brand-600 dark:text-brand-400 mt-0.5">{dept.activePatients}</p>
                </div>
              </div>

              {/* Bed Occupancy Progress Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-500">Inpatient Bed Occupancy</span>
                  <span className="text-slate-800 dark:text-slate-200">
                    {dept.occupiedBeds} / {dept.totalBeds} ({Math.round((dept.occupiedBeds / dept.totalBeds) * 100)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-medblue-500 rounded-full"
                    style={{ width: `${(dept.occupiedBeds / dept.totalBeds) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Monthly Run Rate</span>
              <span className="font-black text-slate-900 dark:text-white">
                ₹{(dept.monthlyRevenue / 100000).toFixed(2)} Lakhs
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
