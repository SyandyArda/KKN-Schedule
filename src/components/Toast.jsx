import React from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

/**
 * Small toast notification that appears at the top-right of the screen.
 * Auto-dismissed by parent after a timeout.
 */
export default function Toast({ message, type = 'success', onClose }) {
  const isSuccess = type === 'success';
  return (
    <div
      className="fixed top-5 right-5 z-[100] flex items-start gap-3 px-4 py-3 rounded-xl shadow-xl
                  animate-bounce-in max-w-xs"
      style={{
        background: isSuccess ? '#006633' : '#dc2626',
        color: 'white',
        border: `1.5px solid ${isSuccess ? '#00994d' : '#ef4444'}`,
        animation: 'modal-enter 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}
    >
      {isSuccess ? <CheckCircle size={18} className="flex-shrink-0 mt-0.5" /> : <XCircle size={18} className="flex-shrink-0 mt-0.5" />}
      <p className="text-sm font-medium leading-snug flex-1">{message}</p>
      <button onClick={onClose} className="ml-1 hover:opacity-75 cursor-pointer flex-shrink-0">
        <X size={15} />
      </button>
    </div>
  );
}
