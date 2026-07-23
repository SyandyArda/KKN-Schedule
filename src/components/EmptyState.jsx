import React from 'react';
import { CalendarX } from 'lucide-react';

/**
 * Empty state illustration shown when a week has no scheduled activities.
 */
export default function EmptyState({ weekNumber }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5">
      {/* Icon circle */}
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #e6f4ee, #c8e8d6)',
          boxShadow: '0 8px 32px rgba(0,102,51,0.12)',
        }}
      >
        <CalendarX size={44} style={{ color: '#006633' }} strokeWidth={1.4} />
      </div>

      <div className="text-center max-w-xs">
        <h3 className="text-gray-700 font-bold text-lg mb-1">
          Belum Ada Jadwal
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          Belum ada jadwal KKN untuk{' '}
          <span className="font-semibold" style={{ color: '#006633' }}>
            Minggu ke-{weekNumber}
          </span>
          .<br />
          Klik <span className="font-semibold text-gray-600">"+ Tambah Kegiatan"</span> untuk
          menambahkan jadwal baru.
        </p>
      </div>

      {/* Decorative dots */}
      <div className="flex gap-2 mt-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              background: '#006633',
              opacity: 0.15 + i * 0.25,
            }}
          />
        ))}
      </div>
    </div>
  );
}
