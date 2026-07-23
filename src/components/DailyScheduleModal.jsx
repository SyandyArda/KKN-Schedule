import React, { useRef, useState } from 'react';
import { X, Clock, User, Download, Camera, FileText } from 'lucide-react';
import { toCanvas } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { formatTanggal } from '../utils/dateUtils';
import { exportDailyToExcel } from '../utils/exportUtils';

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
  const modalRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen || !date) return null;

  const dailyActivities = activities.filter((a) => a.tanggal === date).sort((a, b) => a.waktu_mulai.localeCompare(b.waktu_mulai));

  const captureCanvas = async () => {
    if (!modalRef.current) return null;
    try {
      return await toCanvas(modalRef.current, { 
        backgroundColor: '#ffffff', 
        pixelRatio: 2,
        filter: (node) => {
          if (node?.dataset?.html2canvasIgnore === 'true') return false;
          return true;
        }
      });
    } catch (err) {
      alert("Gagal memproses gambar: " + err.message);
      return null;
    }
  };

  const handleExportPNG = () => {
    setIsExporting(true);
    setTimeout(async () => {
      try {
        const canvas = await captureCanvas();
        if (canvas) {
          const imgData = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = `Jadwal_Harian_KKN057_${date}.png`;
          link.href = imgData;
          link.click();
        }
      } catch (err) {
        alert("Gagal mengekspor PNG: " + err.message);
        console.error(err);
      } finally {
        setIsExporting(false);
      }
    }, 400); // Wait longer for layout shifts
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(async () => {
      try {
        const canvas = await captureCanvas();
        if (canvas) {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({
            orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
          });
          pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
          pdf.save(`Jadwal_Harian_KKN057_${date}.pdf`);
        }
      } catch (err) {
        alert("Gagal mengekspor PDF: " + err.message);
        console.error(err);
      } finally {
        setIsExporting(false);
      }
    }, 400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center p-4 ${isExporting ? 'items-start overflow-y-auto' : 'items-center'}`}
      style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => !isExporting && e.target === e.currentTarget && onClose()}
    >
      <div
        ref={modalRef}
        className={`modal-panel w-full max-w-2xl flex flex-col bg-white shadow-2xl ${isExporting ? 'rounded-none' : 'max-h-[92vh] rounded-2xl'}`}
        style={{ border: '1.5px solid rgba(0,102,51,0.15)' }}
      >
        {/* Header */}
        <div
          className={`shrink-0 z-10 px-6 py-4 flex items-center justify-between ${isExporting ? 'rounded-none' : 'rounded-t-2xl'}`}
          style={{ background: 'linear-gradient(135deg, #003d1f, #006633)' }}
        >
          <div>
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              <span>📅</span> Jadwal Full: {formatTanggal(date)}
            </h2>
            <p className="text-green-200 text-xs mt-0.5">KKN 057 Persyarikatan Muhammadiyah</p>
          </div>
          {!isExporting && (
            <div className="flex items-center gap-2" data-html2canvas-ignore="true">
              <button 
                onClick={() => exportDailyToExcel(dailyActivities, date)}
                disabled={dailyActivities.length === 0}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold text-green-800 bg-white hover:bg-green-100 transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Export Excel"
              >
                <Download size={14} />
                <span className="hidden sm:inline">Excel</span>
              </button>
              <button 
                onClick={handleExportPNG}
                disabled={dailyActivities.length === 0}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold text-green-800 bg-white hover:bg-green-100 transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Export Gambar (PNG)"
              >
                <Camera size={14} />
                <span className="hidden sm:inline">PNG</span>
              </button>
              <button 
                onClick={handleExportPDF}
                disabled={dailyActivities.length === 0}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-bold text-green-800 bg-white hover:bg-green-100 transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                title="Export PDF"
              >
                <FileText size={14} />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button onClick={onClose}
                className="text-green-200 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all cursor-pointer ml-1">
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Body (Timeline) */}
        <div className={`flex-1 p-6 bg-[#fcfdfd] ${isExporting ? 'overflow-visible' : 'overflow-y-auto custom-scroll'}`}>
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
