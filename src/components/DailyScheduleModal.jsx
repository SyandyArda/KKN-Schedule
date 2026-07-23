import React from 'react';
import { X, Clock, User } from 'lucide-react';
import { formatTanggal } from '../utils/dateUtils';

const KATEGORI_META = {
  ibadah:    { label: 'Ibadah',         emoji: '🕌', bg: '#dcfce7', text: '#15803d', border: '#16a34a' },
  rutin:     { label: 'Rutin',          emoji: '🏃', bg: '#f3f4f6', text: '#374151', border: '#9ca3af' },
  proker:    { label: 'Proker',         emoji: '🎯', bg: '#dbeafe', text: '#1d4ed8', border: '#2563eb' },
  evaluasi:  { label: 'Evaluasi',       emoji: '📊', bg: '#ede9fe', text: '#6d28d9', border: '#7c3aed' },
  istirahat: { label: 'Istirahat',      emoji: '💤', bg: '#fef3c7', text: '#92400e', border: '#d97706' },
};
const DEFAULT_META = { label: '—', emoji: '📌', bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };

const getMeta = (kat) => KATEGORI_META[kat] ?? DEFAULT_META;

export default function DailyScheduleModal({ isOpen, onClose, date, activities }) {
  if (!isOpen || !date) return null;

  const dailyActivities = activities.filter((a) => a.tanggal === date).sort((a, b) => a.waktu_mulai.localeCompare(b.waktu_mulai));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-panel w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl"
        style={{ border: '1.5px solid rgba(0,102,51,0.15)' }}
      >
        {/* Header */}
        <div
          className="shrink-0 z-10 px-6 py-4 flex items-center justify-between rounded-t-2xl"
          style={{ background: 'linear-gradient(135deg, #003d1f, #006633)' }}
        >
          <div>
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <span>📅</span> Jadwal Full: {formatTanggal(date)}
            </h2>
            <p className="text-green-200 text-xs mt-0.5">KKN 057 Persyarikatan Muhammadiyah</p>
          </div>
          <button onClick={onClose}
            className="text-green-200 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Body (Timeline) */}
        <div className="flex-1 overflow-y-auto custom-scroll p-6 bg-[#fcfdfd]">
          <div className="relative border-l-2 border-green-200 ml-3 space-y-8 pb-4 pt-2">
            {dailyActivities.length > 0 ? (
              dailyActivities.map((act) => {
                const meta = getMeta(act.kategori);
                return (
                  <div key={act.id} className="relative pl-6">
                    {/* Timeline Node */}
                    <div 
                      className="absolute -left-[11px] top-1 w-5 h-5 rounded-full border-4 border-white flex items-center justify-center shadow-sm"
                      style={{ background: meta.border }}
                    />
                    
                    {/* Content Card */}
                    <div className="bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: '#e5e7eb' }}>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-100">
                          <Clock size={12} /> {act.waktu_mulai} - {act.waktu_selesai}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold shadow-sm"
                          style={{ background: meta.bg, color: meta.text, border: `1px solid ${meta.border}` }}>
                          {meta.emoji} {meta.label}
                        </span>
                      </div>
                      
                      <p className="text-gray-800 text-sm font-semibold mb-2 leading-relaxed">
                        {act.keterangan}
                      </p>
                      
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <User size={12} className="text-gray-400" />
                        <span>PJ: {act.pj}</span>
                      </div>
                      
                      {act.catatan && (
                        <div className="mt-3 text-[11px] text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100 flex gap-2">
                          <span className="font-semibold text-gray-400 mt-[1px]">Catatan:</span>
                          <span className="leading-relaxed">{act.catatan}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="pl-6 py-4 text-sm text-gray-500 italic">
                Tidak ada kegiatan untuk hari ini.
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
