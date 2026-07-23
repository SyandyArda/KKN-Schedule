import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

export default function PinModal({ isOpen, onClose, onSubmit }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pin) return;
    const isCorrect = onSubmit(pin);
    if (!isCorrect) {
      setError('PIN Salah! Tanya Arda lagi ');
      setPin('');
    }
  };

  const handleClose = () => {
    setPin('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ border: '1.5px solid rgba(0,102,51,0.15)' }}
      >
        <div className="px-6 py-4 border-b flex justify-between items-center" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
          <h3 className="font-bold text-green-800 flex items-center gap-2">
            <Lock size={18} />
            Akses Admin
          </h3>
          <button onClick={handleClose} className="text-green-600 hover:bg-green-100 p-1.5 rounded-lg transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <p className="text-lg font-bold text-gray-800">
              Mau edit? <span className="text-green-700 text-xl block mt-1">Tanya Arda! </span>
            </p>
          </div>

          <div className="mb-4">
            <input
              type="password"
              autoFocus
              placeholder="Masukkan PIN Admin..."
              className={`w-full px-4 py-3 rounded-xl border-2 text-center text-lg tracking-widest outline-none transition-all ${error ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-600 bg-gray-50 focus:bg-white'}`}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (error) setError('');
              }}
            />
            {error && (
              <p className="text-red-500 text-sm font-semibold mt-2 text-center animate-bounce">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all"
            style={{ background: 'linear-gradient(135deg, #004d26, #006633)' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
