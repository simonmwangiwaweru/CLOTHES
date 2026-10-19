import React from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-[16px] border border-[rgba(26,26,26,0.7)] bg-[#F2EEE9] text-[#0A0A0A] shadow-xl animate-in slide-in-from-bottom-3 duration-300"
        >
          {toast.type === 'whatsapp' ? (
            <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#0A0A0A] text-[#F2EEE9] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          )}

          <div className="flex-1 pr-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0A]">
              {toast.title}
            </h4>
            {toast.description && (
              <p className="text-xs text-[#6B645D] mt-0.5">{toast.description}</p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-[#6B645D] hover:text-[#0A0A0A] p-0.5"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
