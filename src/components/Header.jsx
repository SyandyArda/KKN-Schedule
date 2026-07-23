import React from 'react';
import { Calendar, Users, BookOpen } from 'lucide-react';

/**
 * Application header with Muhammadiyah branding.
 * Gradient applied directly on <header> to guarantee visibility.
 */
export default function Header({ totalActivities }) {
  return (
    <header
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #001a0d 0%, #003d1f 40%, #006633 80%, #00884a 100%)' }}
    >
      {/* Decorative glow circles */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,200,80,0.12), transparent 70%)' }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,200,80,0.08), transparent 70%)' }}
      />
      {/* Top shimmer line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)' }}
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

          {/* Logo emblem */}
          <div className="flex-shrink-0">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.25)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <BookOpen size={36} className="text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title block */}
          <div className="text-center sm:text-left flex-1">
            <div
              className="inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-1 px-2 py-0.5 rounded"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#86efac' }}
            >
              Kuliah Kerja Nyata
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
              SCHEDULE KKN 057
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg font-semibold mt-0.5"
              style={{ color: '#bbf7d0' }}>
              Persyarikatan Muhammadiyah
            </h2>
            <p className="mt-1 text-xs sm:text-sm" style={{ color: '#86efac' }}>
              Periode: 29 Juli – 27 Agustus 2026 &nbsp;·&nbsp; Manajemen Jadwal Pengabdian Masyarakat
            </p>
          </div>

          {/* Stats chips */}
          <div className="flex gap-3 flex-wrap justify-center sm:justify-end">
            <StatChip icon={<Calendar size={14} />} label="Total Kegiatan" value={totalActivities} />
            <StatChip icon={<Users size={14} />} label="Program" value="KKN 057" />
          </div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div
        className="absolute bottom-0 inset-x-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, transparent, #22c55e, #4ade80, #22c55e, transparent)' }}
      />
    </header>
  );
}

function StatChip({ icon, label, value }) {
  return (
    <div
      className="flex flex-col items-center px-4 py-2.5 rounded-xl text-center min-w-[90px]"
      style={{
        background: 'rgba(255,255,255,0.10)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.20)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
      }}
    >
      <div className="flex items-center gap-1 mb-0.5" style={{ color: '#86efac' }}>
        {icon}
        <span className="text-[10px] font-semibold">{label}</span>
      </div>
      <div className="text-white font-bold text-xl leading-none">{value}</div>
    </div>
  );
}
