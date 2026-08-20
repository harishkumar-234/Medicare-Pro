import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HospitalProvider } from './context/HospitalContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from './components/common/Toast';
import { TopNavbar } from './components/layout/TopNavbar';
import { Sidebar } from './components/layout/Sidebar';
import { QuickAddModal } from './components/layout/QuickAddModal';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

// Pages
import { LandingPage } from './pages/LandingPage/LandingPage';
import { AuthPage } from './pages/Auth/AuthPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AppointmentsPage } from './pages/Appointments/AppointmentsPage';
import { PatientsPage } from './pages/Patients/PatientsPage';
import { DoctorsPage } from './pages/Doctors/DoctorsPage';
import { QueuePage } from './pages/Queue/QueuePage';
import { PrescriptionsPage } from './pages/Prescriptions/PrescriptionsPage';
import { LaboratoryPage } from './pages/Laboratory/LaboratoryPage';
import { PharmacyPage } from './pages/Pharmacy/PharmacyPage';
import { BillingPage } from './pages/Billing/BillingPage';
import { DepartmentsPage } from './pages/Departments/DepartmentsPage';
import { StaffPage } from './pages/Staff/StaffPage';
import { DocumentsPage } from './pages/Documents/DocumentsPage';
import { ReportsPage } from './pages/Reports/ReportsPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // App routing state: 'landing' | 'auth' | 'app'
  const [appRoute, setAppRoute] = useState<'landing' | 'auth' | 'app'>('app');
  const [currentPage, setCurrentPage] = useState<string>('dashboard');

  // Layout states
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);

  // Keyboard shortcut for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlobalSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle navigation from search or topbar
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    if (appRoute !== 'app') {
      setAppRoute('app');
    }
  };

  // Route 1: Public Landing Page
  if (appRoute === 'landing') {
    return (
      <LandingPage
        onEnterApp={() => setAppRoute('app')}
        onOpenLogin={() => setAppRoute('auth')}
      />
    );
  }

  // Route 2: Authentication Page
  if (appRoute === 'auth' || !isAuthenticated) {
    return (
      <AuthPage
        onSuccess={() => setAppRoute('app')}
        onExplorePublicLanding={() => setAppRoute('landing')}
      />
    );
  }

  // Route 3: Main Logged In Hospital App
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenLanding={() => setAppRoute('landing')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <TopNavbar
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenQuickAdd={() => setIsQuickAddOpen(true)}
          onOpenSearch={() => setIsGlobalSearchOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Page View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              onOpenQuickAdd={() => setIsQuickAddOpen(true)}
            />
          )}
          {currentPage === 'appointments' && (
            <AppointmentsPage onOpenQuickAdd={() => setIsQuickAddOpen(true)} />
          )}
          {currentPage === 'patients' && (
            <PatientsPage onOpenQuickAdd={() => setIsQuickAddOpen(true)} />
          )}
          {currentPage === 'doctors' && (
            <DoctorsPage onOpenQuickAdd={() => setIsQuickAddOpen(true)} />
          )}
          {currentPage === 'queue' && <QueuePage />}
          {currentPage === 'prescriptions' && <PrescriptionsPage />}
          {currentPage === 'laboratory' && <LaboratoryPage />}
          {currentPage === 'pharmacy' && <PharmacyPage />}
          {currentPage === 'billing' && <BillingPage />}
          {currentPage === 'departments' && <DepartmentsPage />}
          {currentPage === 'staff' && <StaffPage />}
          {currentPage === 'documents' && <DocumentsPage />}
          {currentPage === 'reports' && <ReportsPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Modals & Toasts */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        onNavigate={handleNavigate}
      />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HospitalProvider>
          <MainAppContent />
        </HospitalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
