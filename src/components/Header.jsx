import React from 'react';
import { Calendar, Users, BookOpen, Lock, Unlock } from 'lucide-react';

/**
 * Application header with Muhammadiyah branding.
 * Gradient applied directly on <header> to guarantee visibility.
 */
export default function Header({ totalActivities, isAdmin, onToggleAdmin }) {
  return (
    <header
      className="relative overflow-hidden shadow-xl min-h-[350px] flex items-center justify-center bg-gradient-to-br from-green-900 to-green-950"
    >
      {/* Centerpiece Logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] drop-shadow-[0_0_60px_rgba(34,197,94,0.35)] opacity-50 sm:opacity-60 transition-all duration-1000">
          <img src="/Profil_KKN.jpg" alt="Logo KKN" className="w-full h-full object-cover rounded-full border-[3px] border-white/10" />
        </div>
      </div>

      {/* Floating Background Photos */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-30px] left-[-30px] animate-float opacity-60">
          <img src="/DS-C00086.jpg" alt="bg1" className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-2xl border-[3px] border-white/20 -rotate-6 shadow-2xl" />
        </div>
        <div className="absolute bottom-[-30px] right-[-20px] animate-float-delayed opacity-60">
          <img src="/DSC00091.jpg" alt="bg2" className="w-56 h-56 sm:w-72 sm:h-72 object-cover rounded-2xl border-[3px] border-white/20 rotate-12 shadow-2xl" />
        </div>
        <div className="absolute top-[40px] right-[8%] animate-float-fast opacity-50">
          <img src="/DSC00017.jpg" alt="bg3" className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-2xl border-[3px] border-white/20 rotate-6 shadow-2xl" />
        </div>
        <div className="absolute bottom-[50px] left-[15%] animate-float-slow opacity-50">
          <img src="/DSC00015.jpg" alt="bg4" className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded-2xl border-[3px] border-white/20 -rotate-12 shadow-2xl" />
        </div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-transparent p-6 sm:p-8">

          {/* Logo emblem */}
          <div className="flex-shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
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
              className="inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-1 px-2 py-0.5 rounded shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              style={{ background: 'rgba(0,0,0,0.6)', color: '#86efac', textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
            >
              Kuliah Kerja Nyata
            </div>
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight flex items-center justify-center sm:justify-start gap-3 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,1)' }}
            >
              SCHEDULE KKN 057
              <div className="flex items-center gap-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                <button 
                  onClick={onToggleAdmin}
                  className="opacity-80 hover:opacity-100 transition-opacity p-1.5 rounded-full hover:bg-black/30 cursor-pointer"
                  title={isAdmin ? "Exit Admin Mode" : "Enter Admin Mode"}
                >
                  {isAdmin ? <Unlock size={20} className="text-[#86efac]" /> : <Lock size={20} className="text-white" />}
                </button>
                {!isAdmin && (
                  <span className="text-xs font-bold text-green-100 tracking-normal hidden sm:inline-block" style={{ textShadow: '0 1px 4px rgba(0,0,0,1)' }}>
                    Mau edit? Tanya arda
                  </span>
                )}
              </div>
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg font-bold mt-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
              style={{ color: '#bbf7d0', textShadow: '0 1px 6px rgba(0,0,0,1)' }}>
              Persyarikatan Muhammadiyah
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" style={{ color: '#86efac', textShadow: '0 1px 6px rgba(0,0,0,1)' }}>
              Periode: 29 Juli – 27 Agustus 2026 &nbsp;·&nbsp; Manajemen Jadwal Pengabdian Masyarakat
            </p>
          </div>

          {/* Stats chips */}
          <div className="flex gap-3 flex-wrap justify-center sm:justify-end drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
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
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(8px)',
        border: '1.5px solid rgba(255,255,255,0.25)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      }}
    >
      <div className="flex items-center gap-1 mb-0.5 drop-shadow-md" style={{ color: '#86efac' }}>
        {icon}
        <span className="text-[10px] font-bold">{label}</span>
      </div>
      <div className="text-white font-extrabold text-xl leading-none drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{value}</div>
    </div>
  );
}
