import React from 'react';
import { useHospital } from '../../context/HospitalContext';
import { CheckCircle2, AlertTriangle, Info, X, XCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useHospital();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-elevated border backdrop-blur-md transition-all duration-300 animate-slide-up ${
            t.type === 'success'
              ? 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
              : t.type === 'error'
              ? 'bg-rose-50/95 dark:bg-rose-950/90 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
              : t.type === 'warning'
              ? 'bg-amber-50/95 dark:bg-amber-950/90 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-100'
              : 'bg-medblue-50/95 dark:bg-medblue-950/90 border-medblue-300 dark:border-medblue-800 text-medblue-900 dark:text-medblue-100'
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            {t.type === 'error' && <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
            {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            {t.type === 'info' && <Info className="w-5 h-5 text-medblue-600 dark:text-medblue-400" />}
          </div>
          <div className="flex-1 text-sm">
            <h4 className="font-semibold">{t.title}</h4>
            {t.message && <p className="text-xs opacity-90 mt-0.5">{t.message}</p>}
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
