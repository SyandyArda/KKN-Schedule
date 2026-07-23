import React from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

/**
 * Confirmation dialog before deleting an activity.
 * Props:
 *   isOpen      – boolean
 *   onClose     – () => void
 *   onConfirm   – () => void
 *   activityName – string label shown in the prompt
 */
export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, activityName }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-panel w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ border: '1.5px solid rgba(220,38,38,0.15)' }}
      >
        {/* Header stripe */}
        <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #dc2626, #ef4444)' }} />

        <div className="px-6 pt-5 pb-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
              <AlertTriangle size={28} className="text-red-500" />
            </div>
          </div>

          <h3 className="text-center text-gray-800 font-bold text-lg mb-1">Hapus Kegiatan?</h3>
          <p className="text-center text-gray-500 text-sm leading-relaxed">
            Kegiatan{' '}
            <span className="font-semibold text-gray-700">"{activityName}"</span>{' '}
            akan dihapus secara permanen dan tidak dapat dikembalikan.
          </p>

          <div className="flex gap-3 mt-5">
            <button
              id="delete-cancel-btn"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm
                         hover:bg-gray-50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <X size={15} /> Batal
            </button>
            <button
              id="delete-confirm-btn"
              onClick={onConfirm}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-1.5
                         transition-all cursor-pointer hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #b91c1c, #dc2626)' }}
            >
              <Trash2 size={15} /> Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
