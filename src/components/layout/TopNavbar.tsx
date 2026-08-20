import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHospital } from '../../context/HospitalContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Search,
  Bell,
  Plus,
  Moon,
  Sun,
  Monitor,
  CheckCheck,
  ChevronDown,
  User,
  LogOut,
  Shield,
  Activity,
  Tv,
  Menu
} from 'lucide-react';

interface TopNavbarProps {
  onToggleSidebar: () => void;
  onOpenQuickAdd: () => void;
  onOpenSearch: () => void;
  onNavigate: (page: string) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onToggleSidebar,
  onOpenQuickAdd,
  onOpenSearch,
  onNavigate
}) => {
  const { user, logout, switchRole } = useAuth();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useHospital();
  const { theme, setTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Left: Sidebar Hamburger + Search Bar */}
      <div className="flex items-center gap-3 md:gap-4 flex-1 max-w-xl">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search trigger bar */}
        <div
          onClick={onOpenSearch}
          className="flex-1 flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer transition-all hover:border-brand-400 shadow-subtle group"
        >
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
            <span className="truncate">Search patients, doctors, bills, medicines...</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <kbd className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-500">
              Ctrl
            </kbd>
            <kbd className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-500">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Live Token TV Display Launcher Button */}
        <button
          onClick={() => onNavigate('queue')}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/60 rounded-xl hover:bg-brand-100 transition-all"
          title="Reception Live Token TV Display"
        >
          <Tv className="w-3.5 h-3.5 text-brand-500 animate-pulse" />
          <span>Token Display</span>
        </button>

        {/* Quick Add Button */}
        <button
          onClick={onOpenQuickAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-medblue-600 hover:from-brand-500 hover:to-medblue-500 rounded-xl shadow-sm transition-all hover:shadow-glow-teal active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Add</span>
        </button>

        {/* Dark/Light Theme Toggle */}
        <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-all"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-slide-up">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Notifications</h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 rounded-full">
                      {unreadCount} New
                    </span>
                  )}
                </div>
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-xs text-brand-600 hover:text-brand-700 dark:text-brand-400 font-medium flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-slate-400 text-xs">No notifications yet</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3 text-xs transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer ${
                        !n.read ? 'bg-brand-50/40 dark:bg-brand-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`font-semibold ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                          {n.title}
                        </p>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
              alt={user?.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/30"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{user?.name}</p>
              <p className="text-[10px] uppercase font-semibold text-brand-600 dark:text-brand-400 tracking-wider">
                {user?.role}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-slide-up">
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/60">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-100 text-brand-800 dark:bg-brand-900/60 dark:text-brand-300">
                  {user?.role} Portal
                </span>
              </div>

              {/* Demo Role Switcher Quick Pill */}
              <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Switch Demo Role</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['admin', 'doctor', 'receptionist', 'nurse'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRole(r);
                        setShowProfileMenu(false);
                      }}
                      className={`text-xs py-1 px-2 rounded-lg font-medium capitalize text-left transition-all ${
                        user?.role === r
                          ? 'bg-brand-500 text-white font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-2 space-y-0.5">
                <button
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <Shield className="w-4 h-4 text-slate-400" /> Account Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
