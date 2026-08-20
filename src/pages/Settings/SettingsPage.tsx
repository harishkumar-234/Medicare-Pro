import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useHospital } from '../../context/HospitalContext';
import {
  Settings,
  Building,
  User,
  Shield,
  Palette,
  Moon,
  Sun,
  Monitor,
  IndianRupee,
  Save,
  Check,
  Hospital
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const { showToast } = useHospital();

  const [activeTab, setActiveTab] = useState<'hospital' | 'user' | 'system' | 'appearance'>('hospital');

  // Hospital profile form state
  const [hospName, setHospName] = useState('MediCare Pro Multispecialty Hospital');
  const [hospAddress, setHospAddress] = useState('100 Feet Ring Road, Indiranagar, Bangalore - 560038');
  const [hospPhone, setHospPhone] = useState('+91 (80) 4122-8000');
  const [hospEmail, setHospEmail] = useState('contact@medicarepro.health');
  const [gstin, setGstin] = useState('29AAAAA0000A1Z5');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Saved', 'System configurations updated successfully', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Hospital System Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Configure facility letterhead branding, currency formats, taxation rates and theme appearance
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4 overflow-x-auto">
        {[
          { id: 'hospital', label: 'Hospital Facility', icon: Hospital },
          { id: 'user', label: 'My User Profile', icon: User },
          { id: 'system', label: 'System & Tax Rates', icon: Shield },
          { id: 'appearance', label: 'Theme & Appearance', icon: Palette },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
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

      {/* Hospital Tab */}
      {activeTab === 'hospital' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">
              Facility Information & Print Letterhead
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Hospital / Clinic Full Name</label>
                <input
                  type="text"
                  value={hospName}
                  onChange={(e) => setHospName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">GSTIN Number</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Primary Reception Phone</label>
                <input
                  type="text"
                  value={hospPhone}
                  onChange={(e) => setHospPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Official Contact Email</label>
                <input
                  type="email"
                  value={hospEmail}
                  onChange={(e) => setHospEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Full Postal Address (for Invoices & Prescriptions)</label>
                <input
                  type="text"
                  value={hospAddress}
                  onChange={(e) => setHospAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-md"
              >
                <Save className="w-4 h-4" /> Save Facility Details
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appearance Tab */}
      {activeTab === 'appearance' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Interface Color Theme</h3>
            <p className="text-xs text-slate-400 mt-0.5">Choose your preferred visual mode for clinical operation</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 'light', label: 'Clean Light Mode', desc: 'Optimal for daytime clinic reception and consultations', icon: Sun },
              { id: 'dark', label: 'Clinical Dark Mode', desc: 'Low eye-strain for night shifts and OT suites', icon: Moon },
              { id: 'system', label: 'System Automatic', desc: 'Syncs with operating system settings', icon: Monitor },
            ].map((mode) => {
              const Icon = mode.icon;
              const isSelected = theme === mode.id;
              return (
                <div
                  key={mode.id}
                  onClick={() => {
                    setTheme(mode.id as any);
                    showToast('Theme Changed', `Switched to ${mode.label}`, 'info');
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 shadow-glow-teal ring-1 ring-brand-500'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-brand-500' : 'text-slate-400'}`} />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{mode.label}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{mode.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* User Tab */}
      {activeTab === 'user' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Active User Profile</h3>
          <div className="flex items-center gap-4">
            <img src={user?.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-500" />
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">{user?.name}</h4>
              <p className="text-brand-600 dark:text-brand-400 font-semibold capitalize">{user?.role} Role</p>
              <p className="text-slate-400">{user?.email}</p>
            </div>
          </div>
        </div>
      )}

      {/* System Tab */}
      {activeTab === 'system' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">System Parameters</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Standard Currency</label>
              <input type="text" disabled value="₹ INR (Indian Rupee)" className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Standard GST Rate</label>
              <input type="text" disabled value="18% (SGST 9% + CGST 9%)" className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border rounded-xl" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
