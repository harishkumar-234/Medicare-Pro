import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import {
  Cross,
  Sparkles,
  Shield,
  Stethoscope,
  Users,
  HeartPulse,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  KeyRound,
  Hospital
} from 'lucide-react';

interface AuthPageProps {
  onSuccess: () => void;
  onExplorePublicLanding: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onSuccess, onExplorePublicLanding }) => {
  const { login } = useAuth();

  const [mode, setMode] = useState<'login' | 'register' | 'forgot' | 'otp'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [email, setEmail] = useState('admin@medicarepro.health');
  const [password, setPassword] = useState('medicare2026');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [otpCode, setOtpCode] = useState(['4', '8', '2', '9']);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') setEmail('admin@medicarepro.health');
    else if (role === 'doctor') setEmail('rajesh.kumar@medicarepro.health');
    else if (role === 'receptionist') setEmail('neha.frontdesk@medicarepro.health');
    else if (role === 'nurse') setEmail('kavitha.nair@medicarepro.health');
    else if (role === 'pharmacist') setEmail('rohan.pharm@medicarepro.health');
    else if (role === 'lab_technician') setEmail('sumanth.lab@medicarepro.health');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, email, name || undefined);
      setIsLoading(false);
      onSuccess();
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, email);
      setIsLoading(false);
      onSuccess();
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Animated Subtle Background Shapes */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-medblue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl shadow-2xl overflow-hidden">
          {/* Left Hero Pane (Medical Branding) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-brand-900/90 via-slate-900/90 to-medblue-950/90 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-700/50">
            <div className="relative z-10">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full ring-2 ring-brand-500/50 p-0.5 shadow-glow-teal flex items-center justify-center bg-white dark:bg-slate-800 overflow-hidden">
                  <img src="/logo.png" alt="MediCare Pro Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                    MediCare <span className="text-xs bg-brand-500 text-white px-2 py-0.5 rounded font-extrabold uppercase">PRO</span>
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">Enterprise Hospital OS</p>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-12 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
                  <HeartPulse className="w-3.5 h-3.5 animate-bounce" /> Trusted by 500+ Healthcare Centers
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  Next-Gen Clinical & Hospital Management.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Seamlessly unify Patient Records, OPD Queues, Digital Prescriptions, Pharmacy, Diagnostics and Multi-tier Billing.
                </p>
              </div>

              {/* Features Pill list */}
              <div className="mt-8 space-y-3">
                {[
                  'Real-time Token TV Display System',
                  'One-Click Digital Rx & Pathology Order Flow',
                  'NABH & HIPAA Compliant Data Security',
                  'Multi-Specialty Doctor Rostering & Fees'
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Public Landing Link */}
            <div className="mt-10 pt-6 border-t border-slate-700/60 relative z-10 flex items-center justify-between">
              <span className="text-xs text-slate-400">Looking for product overview?</span>
              <button
                onClick={onExplorePublicLanding}
                className="text-xs font-bold text-brand-400 hover:text-brand-300 flex items-center gap-1 group"
              >
                Visit Landing Page <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Form Pane */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-slate-900/60">
            {mode === 'login' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Portal Authentication</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select your departmental role for instant one-click demo credentials.
                  </p>
                </div>

                {/* Role Switcher Pills */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                    Select Demo Role
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { role: 'admin', label: 'Admin / Director', icon: Shield },
                      { role: 'doctor', label: 'Doctor / Surgeon', icon: Stethoscope },
                      { role: 'receptionist', label: 'Front Desk / OPD', icon: Users },
                      { role: 'nurse', label: 'Nurse / Ward', icon: HeartPulse }
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = selectedRole === item.role;
                      return (
                        <button
                          key={item.role}
                          type="button"
                          onClick={() => handleRoleSelect(item.role as UserRole)}
                          className={`flex flex-col items-center text-center p-3 rounded-2xl border text-xs font-medium transition-all ${
                            isSelected
                              ? 'bg-brand-500/20 border-brand-500 text-white shadow-glow-teal ring-1 ring-brand-400'
                              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-brand-400' : 'text-slate-400'}`} />
                          <span className="font-semibold text-[11px]">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Email ID</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                        placeholder="doctor@medicarepro.health"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">Security Password</label>
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-xs text-brand-400 hover:text-brand-300 font-medium"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-11 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-800 text-brand-500 focus:ring-brand-500"
                      />
                      Remember this workstation
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('otp')}
                      className="text-slate-400 hover:text-brand-400"
                    >
                      Login via Mobile OTP
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Enter MediCare Workspace</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="text-center pt-2">
                  <p className="text-xs text-slate-400">
                    New hospital branch or clinic?{' '}
                    <button
                      onClick={() => setMode('register')}
                      className="text-brand-400 hover:text-brand-300 font-bold"
                    >
                      Register New Facility
                    </button>
                  </p>
                </div>
              </div>
            )}

            {mode === 'register' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Register New Healthcare Facility</h3>
                  <p className="text-xs text-slate-400 mt-1">Deploy your private hospital management cloud</p>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Facility / Hospital Name</label>
                    <div className="relative">
                      <Hospital className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        placeholder="Apollo Multispecialty Clinic"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Administrator Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        placeholder="admin@apolloclinic.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Set Master Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-brand-600 to-medblue-600 text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    Complete Facility Onboarding
                  </button>
                </form>

                <div className="text-center">
                  <button
                    onClick={() => setMode('login')}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Already registered? <span className="text-brand-400 font-semibold">Sign In</span>
                  </button>
                </div>
              </div>
            )}

            {mode === 'forgot' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Password Recovery</h3>
                  <p className="text-xs text-slate-400 mt-1">We will dispatch an encrypted reset link to your official ID</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Registered Work Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                    />
                  </div>
                  <button
                    onClick={() => setMode('otp')}
                    className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all"
                  >
                    Send Recovery Code
                  </button>
                  <button
                    onClick={() => setMode('login')}
                    className="w-full text-xs text-slate-400 hover:text-white"
                  >
                    Back to Sign In
                  </button>
                </div>
              </div>
            )}

            {mode === 'otp' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Two-Factor OTP Verification</h3>
                  <p className="text-xs text-slate-400 mt-1">Enter 4-digit code sent to linked hospital phone (+91 98401-XXXXX)</p>
                </div>
                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div className="flex justify-center gap-3">
                    {otpCode.map((val, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => {
                          const updated = [...otpCode];
                          updated[i] = e.target.value;
                          setOtpCode(updated);
                        }}
                        className="w-14 h-14 text-center text-xl font-black bg-slate-800 border border-slate-700 rounded-2xl text-white focus:ring-2 focus:ring-brand-500 outline-none"
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-brand-600 to-medblue-600 text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    Verify & Authenticate Workstation
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      Cancel & Return to Standard Login
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
