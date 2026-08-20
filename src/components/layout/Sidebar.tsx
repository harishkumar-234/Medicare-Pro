import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Layers,
  FileSpreadsheet,
  Pill,
  FlaskConical,
  Receipt,
  UserCog,
  BarChart3,
  Files,
  Settings,
  Tv,
  ChevronLeft,
  ChevronRight,
  Cross,
  Sparkles,
  ShieldCheck,
  Globe
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onOpenLanding: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
  onOpenLanding
}) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: '' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, badge: '5' },
    { id: 'queue', label: 'Queue / Token Display', icon: Tv, badge: 'Live' },
    { id: 'patients', label: 'Patient Directory', icon: Users, badge: '' },
    { id: 'doctors', label: 'Doctors & Schedule', icon: Stethoscope, badge: '' },
    { id: 'prescriptions', label: 'Digital Prescriptions', icon: FileSpreadsheet, badge: '' },
    { id: 'laboratory', label: 'Diagnostic Lab', icon: FlaskConical, badge: '3' },
    { id: 'pharmacy', label: 'Pharmacy & Stock', icon: Pill, badge: 'Alert' },
    { id: 'billing', label: 'Billing & Invoices', icon: Receipt, badge: '' },
    { id: 'departments', label: 'Departments', icon: Layers, badge: '' },
    { id: 'staff', label: 'Staff & Attendance', icon: UserCog, badge: '' },
    { id: 'documents', label: 'Medical Documents', icon: Files, badge: '' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, badge: '' },
    { id: 'settings', label: 'Hospital Settings', icon: Settings, badge: '' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 flex flex-col ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-800">
          <div
            onClick={onOpenLanding}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-full ring-2 ring-brand-500/40 p-0.5 shadow-glow-teal flex-shrink-0 group-hover:scale-105 transition-transform bg-white dark:bg-slate-800 overflow-hidden flex items-center justify-center">
              <img src="/logo.png" alt="MediCare Pro Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-slate-900 via-brand-700 to-medblue-600 dark:from-white dark:via-brand-300 dark:to-medblue-400 bg-clip-text text-transparent">
                    MediCare
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-500 text-white tracking-widest">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-slate-400">Enterprise Health SaaS</span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                  }`}
                />
                {!isCollapsed && (
                  <div className="flex-1 flex items-center justify-between truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                          item.badge === 'Live'
                            ? 'bg-rose-500 text-white animate-pulse'
                            : item.badge === 'Alert'
                            ? 'bg-amber-500 text-white'
                            : 'bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Landing Page Link & Role Info */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850/50">
          <button
            onClick={onOpenLanding}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title="Public Product Website"
          >
            <Globe className="w-4 h-4 text-medblue-500" />
            {!isCollapsed && <span>Public Landing Page</span>}
          </button>
          {!isCollapsed && user && (
            <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <div className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                Logged in as <span className="font-bold capitalize text-slate-800 dark:text-slate-200">{user.role}</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
