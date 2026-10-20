import React from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  // The live region stays mounted so screen readers announce toasts as they arrive.
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 bottom-6 z-[60] flex flex-col gap-2 sm:inset-x-auto sm:left-6 sm:w-full sm:max-w-sm"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex animate-rise-in items-start gap-3 rounded-inner border border-line bg-bg p-4 shadow-xl"
        >
          <div
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              toast.type === 'whatsapp' ? 'bg-whatsapp text-ink' : 'bg-ink text-bg'
            }`}
          >
            {toast.type === 'whatsapp' ? (
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{toast.title}</p>
            {toast.description && <p className="mt-0.5 text-sm text-muted">{toast.description}</p>}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="rounded-full p-1 text-muted hover:text-ink"
            aria-label="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
