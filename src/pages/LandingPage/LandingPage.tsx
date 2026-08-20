import React, { useState } from 'react';
import {
  Cross,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  Users,
  Calendar,
  IndianRupee,
  Tv,
  Pill,
  FlaskConical,
  Receipt,
  FileSpreadsheet,
  Files,
  Star,
  ChevronDown,
  Layers,
  HeartPulse,
  Clock
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp, onOpenLogin }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const features = [
    {
      icon: Users,
      title: 'Complete Patient EHR',
      desc: 'Centralized patient directory with allergy tracking, vitals history, and past clinical encounters.'
    },
    {
      icon: Calendar,
      title: 'Smart OPD Appointments',
      desc: 'Interactive calendar booking with doctor slot availability, SMS reminders, and multi-status queues.'
    },
    {
      icon: Tv,
      title: 'Reception Token TV Display',
      desc: 'Real-time broadcast suitable for clinic waiting lounge TVs with instant token calling and chimes.'
    },
    {
      icon: FileSpreadsheet,
      title: 'Digital Prescription (Rx)',
      desc: 'Formulary-assisted drug auto-suggest, dosage calculator, instructions and printable hospital letterheads.'
    },
    {
      icon: FlaskConical,
      title: 'Pathology Lab Management',
      desc: 'Diagnostic test catalog, sample collection barcodes, stage tracker, and instant patient report release.'
    },
    {
      icon: Pill,
      title: 'Pharmacy Formulary & Stock',
      desc: 'Batch-level expiry monitoring, low-stock threshold alerts, FEFO stock dispensing, and POS integration.'
    },
    {
      icon: Receipt,
      title: 'GST Compliant Billing',
      desc: 'Multi-service split invoices, consultation fee receipts, lab/pharmacy billing, and UPI/POS reconciliation.'
    },
    {
      icon: Layers,
      title: 'Department Analytics & Bed Ward',
      desc: 'Track bed occupancy ratios across Cardiology, Orthopedics, Gynecology and HOD roster performance.'
    },
    {
      icon: Files,
      title: 'Medical Document Vault',
      desc: 'Encrypted archiving for DICOM scans, MRI/X-ray plates, discharge summaries and cashless TPA cards.'
    }
  ];

  const faqs = [
    {
      q: 'Can MediCare Pro be used in small specialty clinics as well as large hospitals?',
      a: 'Yes! MediCare Pro is modular and scalable. Small clinics can utilize the OPD queue, digital Rx, and billing modules, while multi-specialty hospitals can activate inpatient bed ward management, pathology workflows, pharmacy formulary, and multi-department rosters.'
    },
    {
      q: 'Does it support Indian GST and local currency formats (₹)?',
      a: 'Absolutely. MediCare Pro comes pre-configured with 18% GST calculation, itemized service splits, INR (₹) formatting with Lakh/Crore metrics, and instant UPI QR integration.'
    },
    {
      q: 'Is patient medical data secure and NABH / HIPAA compliant?',
      a: 'Yes, our platform employs 256-bit encryption at rest and in transit, multi-factor authentication, and role-based access control (RBAC) ensuring only authorized clinicians can view sensitive EHR files.'
    },
    {
      q: 'How does the Reception Token Display work on waiting area TVs?',
      a: 'Any standard smart TV or browser screen can open the Live Token TV view in Fullscreen mode. Whenever doctors call the next token, the TV screen instantly updates with smooth animations and alert notifications.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-brand-500 selection:text-white">
      {/* Top Floating Navbar */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full ring-2 ring-brand-500/40 p-0.5 shadow-glow-teal flex items-center justify-center bg-white dark:bg-slate-800 overflow-hidden">
              <img src="/logo.png" alt="MediCare Pro Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-brand-200 to-medblue-400 bg-clip-text text-transparent">
                MediCare Pro
              </span>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Hospital OS</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-400 transition-colors">How It Works</a>
            <a href="#preview" className="hover:text-brand-400 transition-colors">Live Preview</a>
            <a href="#pricing" className="hover:text-brand-400 transition-colors">Pricing Plans</a>
            <a href="#faqs" className="hover:text-brand-400 transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
            >
              Staff Sign In
            </button>
            <button
              onClick={onEnterApp}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 text-white text-xs font-bold rounded-xl shadow-glow-teal transition-all hover:scale-105"
            >
              <span>Explore Live Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-medblue-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-xs font-bold border border-brand-500/20 animate-fade-in shadow-subtle">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Next-Generation Healthcare SaaS Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Smart Hospital Management.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-brand-400 to-medblue-400">
              Better Healthcare.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Manage patients, doctors, appointments, digital prescriptions, billing, pharmacy inventory, and diagnostic laboratories from one powerful, unified platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onEnterApp}
              className="flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-brand-500 to-medblue-600 hover:from-brand-400 hover:to-medblue-500 text-white font-extrabold text-sm rounded-2xl shadow-glow-teal hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenLogin}
              className="px-8 py-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm rounded-2xl transition-all hover:scale-105"
            >
              Book a Custom Demo
            </button>
          </div>

          {/* Interactive Live Preview Mockup Card with Floating Badges */}
          <div id="preview" className="pt-12 relative max-w-5xl mx-auto">
            {/* Floating Card 1 */}
            <div className="hidden lg:flex absolute -left-8 top-28 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl items-center gap-3 z-20 animate-float">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400">Today's Revenue</span>
                <p className="text-sm font-black text-white">₹4,85,620</p>
                <span className="text-[10px] text-emerald-400 font-bold">+14.2% Growth</span>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="hidden lg:flex absolute -right-8 top-36 p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl items-center gap-3 z-20 animate-float" style={{ animationDelay: '2s' }}>
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
                <Tv className="w-5 h-5 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400">Active Token</span>
                <p className="text-sm font-black text-white">Token #024</p>
                <span className="text-[10px] text-brand-400 font-bold">Room 04 (Dr. Rajesh)</span>
              </div>
            </div>

            {/* Main Interactive Mockup */}
            <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-3 sm:p-5 shadow-2xl backdrop-blur-xl group hover:border-brand-500/50 transition-all">
              <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 p-4 sm:p-6 space-y-4">
                {/* Mockup Top Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-mono text-[11px] text-slate-400">app.medicarepro.health/dashboard</span>
                  </div>
                  <span className="font-bold text-emerald-400">● 99.99% Hospital Uptime</span>
                </div>

                {/* Mockup Dashboard Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400">Total Patients</span>
                    <h4 className="text-lg font-black text-white mt-0.5">12,845</h4>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400">Today Appointments</span>
                    <h4 className="text-lg font-black text-brand-400 mt-0.5">128 Slots</h4>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400">Available Doctors</span>
                    <h4 className="text-lg font-black text-indigo-400 mt-0.5">48 Specialists</h4>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] text-slate-400">Today Revenue</span>
                    <h4 className="text-lg font-black text-emerald-400 mt-0.5">₹4.85 Lakhs</h4>
                  </div>
                </div>

                {/* Mock CTA inside banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-brand-900/60 to-medblue-950/60 border border-brand-500/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white">Full Enterprise Feature Preview</span>
                    <p className="text-slate-400 text-[11px]">Click below to jump directly into the full multi-module application</p>
                  </div>
                  <button
                    onClick={onEnterApp}
                    className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-lg shadow-sm"
                  >
                    Open Live App
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-xs uppercase font-bold tracking-widest text-slate-400">
            Trusted by 500+ Multi-Specialty Hospitals, Clinics & Diagnostic Centers
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-sm font-extrabold text-slate-400 grayscale opacity-70">
            <span>APOLLO HEALTHCARE</span>
            <span>MANIPAL HOSPITALS</span>
            <span>FORTIS CLINICS</span>
            <span>MAX HEALTHCARE</span>
            <span>NARAYANA HEALTH</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">Enterprise Capabilities</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Everything Required To Run A Modern Hospital
          </h2>
          <p className="text-sm text-slate-400">
            Eliminate fragmented tools. Unify clinical, administrative, and financial operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/40 transition-all hover:-translate-y-1 group space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Steps */}
      <section id="how-it-works" className="py-20 bg-slate-900/30 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">Streamlined Clinical Flow</span>
            <h2 className="text-3xl font-black text-white">How MediCare Pro Works in 5 Simple Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: '01', title: 'Register Patient', desc: 'Capture demographics, Aadhaar ID, and allergy profile in 30 seconds.' },
              { step: '02', title: 'Schedule OPD Slot', desc: 'Assign doctor, generate OPD token number, and trigger SMS confirmation.' },
              { step: '03', title: 'Call via TV Display', desc: 'Doctor triggers next patient on reception waiting TV screen with audio chime.' },
              { step: '04', title: 'Generate Digital Rx', desc: 'Select diagnosis, customize medications, dosages, and diagnostic lab orders.' },
              { step: '05', title: 'Settle Bill & GST', desc: 'Unified tax invoice with UPI QR scan, pharmacy POS, and instant receipt.' },
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative">
                <span className="text-3xl font-black text-slate-700">{st.step}</span>
                <h4 className="text-sm font-bold text-white">{st.title}</h4>
                <p className="text-xs text-slate-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">Transparent Investment</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Commercial SaaS Pricing Plans</h2>
          <p className="text-xs text-slate-400">Choose the right tier for your clinic or hospital network</p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800 mt-4 text-xs font-semibold">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                billingCycle === 'monthly' ? 'bg-brand-500 text-white font-bold' : 'text-slate-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-1.5 rounded-lg transition-all ${
                billingCycle === 'yearly' ? 'bg-brand-500 text-white font-bold' : 'text-slate-400'
              }`}
            >
              Annual (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Starter Clinic</h3>
                <p className="text-xs text-slate-400 mt-1">For single practitioner clinics and diagnostic centers</p>
              </div>
              <div className="text-3xl font-black text-white">
                {billingCycle === 'yearly' ? '₹4,999' : '₹5,999'}{' '}
                <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {['Up to 3 Doctors', '1,000 Patient Records/mo', 'OPD Appointments & Queue', 'Digital Prescription Pad', 'Basic Tax Invoicing'].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-400" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={onEnterApp}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Professional Plan (Highlighted) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-brand-950/80 to-slate-900 border-2 border-brand-500/70 space-y-6 flex flex-col justify-between shadow-glow-teal relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-500 text-white text-[10px] font-extrabold uppercase rounded-full tracking-wider">
              MOST POPULAR FOR HOSPITALS
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Hospital Professional</h3>
                <p className="text-xs text-brand-200 mt-1">Multi-specialty clinics and tertiary nursing homes</p>
              </div>
              <div className="text-3xl font-black text-white">
                {billingCycle === 'yearly' ? '₹14,999' : '₹17,999'}{' '}
                <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-200">
                {[
                  'Up to 25 Doctors & 100 Staff',
                  'Unlimited Patient EHR Database',
                  'Reception OPD Token TV Display System',
                  'Full Diagnostic Pathology Lab Module',
                  'Pharmacy Inventory & Low Stock Alerts',
                  'Staff Biometric Attendance & Payroll',
                  'GST Tax Invoicing with UPI POS'
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-400" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={onEnterApp}
              className="w-full py-3 bg-gradient-to-r from-brand-500 to-medblue-500 hover:from-brand-400 hover:to-medblue-400 text-white text-xs font-bold rounded-xl shadow-lg"
            >
              Explore Live Enterprise Demo
            </button>
          </div>

          {/* Enterprise Network Plan */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white">Enterprise Network</h3>
                <p className="text-xs text-slate-400 mt-1">Multi-branch hospital chains & medical colleges</p>
              </div>
              <div className="text-3xl font-black text-white">
                Custom Pricing
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {[
                  'Unlimited Hospital Branches',
                  'Dedicated Cloud Infrastructure',
                  'Custom PACS / DICOM Radiologic Integration',
                  '24x7 Dedicated SLA & On-premise Trainer',
                  'NABH Audit Compliance Reports'
                ].map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-400" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={onOpenLogin}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl"
            >
              Contact Hospital Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">Got Questions?</span>
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer transition-all"
              onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-white">{faq.q}</h4>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transform transition-transform ${
                    openFaqIndex === idx ? 'rotate-180 text-brand-400' : ''
                  }`}
                />
              </div>
              {openFaqIndex === idx && (
                <p className="mt-3 text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-r from-brand-950 via-slate-900 to-medblue-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to Modernize Your Healthcare Operations?
          </h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Experience the full clinical suite today. No installation required.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={onEnterApp}
              className="px-8 py-4 bg-gradient-to-r from-brand-500 to-medblue-500 hover:from-brand-400 hover:to-medblue-400 text-white font-extrabold text-sm rounded-2xl shadow-glow-teal hover:scale-105 transition-all"
            >
              Launch Live Product Workspace
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>© 2026 MediCare Pro Healthcare Technologies Pvt Ltd. All rights reserved. NABH & HIPAA Certified.</p>
      </footer>
    </div>
  );
};
