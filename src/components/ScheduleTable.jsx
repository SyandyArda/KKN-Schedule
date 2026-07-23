import React, { useMemo } from 'react';
import { Pencil, Trash2, Clock, StickyNote, Eye } from 'lucide-react';
import { formatTanggalShort } from '../utils/dateUtils';

/** Category metadata used for visual styling */
const KATEGORI_META = {
  ibadah:    { label: 'Ibadah',         emoji: '🕌', bg: '#dcfce7', text: '#15803d', border: '#16a34a', rowBg: '#fafffe' },
  rutin:     { label: 'Rutin',          emoji: '🏃', bg: '#f3f4f6', text: '#374151', border: '#9ca3af', rowBg: '#fdfdfd' },
  proker:    { label: 'Proker',         emoji: '🎯', bg: '#dbeafe', text: '#1d4ed8', border: '#2563eb', rowBg: '#f8fbff' },
  evaluasi:  { label: 'Evaluasi',       emoji: '📊', bg: '#ede9fe', text: '#6d28d9', border: '#7c3aed', rowBg: '#fdfbff' },
  istirahat: { label: 'Istirahat',      emoji: '💤', bg: '#fef3c7', text: '#92400e', border: '#d97706', rowBg: '#fffdf8' },
};
const DEFAULT_META = { label: '—', emoji: '📌', bg: '#f3f4f6', text: '#374151', border: '#d1d5db', rowBg: '#fff' };

const getMeta = (kat) => KATEGORI_META[kat] ?? DEFAULT_META;

/**
 * Main schedule table with vertical cell-merging per date.
 */
export default function ScheduleTable({ activities, onEdit, onDelete, onViewDaily, filterKat }) {
  /** Group by tanggal for rowspan */
  const grouped = useMemo(() => {
    const map = {};
    activities.forEach((a) => {
      if (!map[a.tanggal]) map[a.tanggal] = [];
      map[a.tanggal].push(a);
    });
    return map;
  }, [activities]);

  if (activities.length === 0) return null;

  return (
    <div
      className="overflow-x-auto custom-scroll rounded-xl"
      style={{ border: '1.5px solid #e0ede6' }}
    >
      <table className="w-full min-w-[720px] border-collapse text-sm">
        {/* ── Head ── */}
        <thead>
          <tr style={{ background: 'linear-gradient(135deg, #001f0f 0%, #004020 50%, #005528 100%)' }}>
            {[
              { label: 'No.',               w: '44px'  },
              { label: 'Hari / Tanggal',    w: '136px' },
              { label: 'Waktu',             w: '110px' },
              { label: 'Kategori',          w: '114px' },
              { label: 'Keterangan Kegiatan', w: 'auto' },
              { label: 'Penanggung Jawab',  w: '135px' },
              { label: 'Catatan',           w: '145px' },
              { label: 'Aksi',              w: '76px'  },
            ].map(({ label, w }) => (
              <th key={label}
                style={{ width: w, minWidth: w === 'auto' ? '180px' : w }}
                className="px-2.5 py-3 text-left text-[11px] font-bold text-white
                           uppercase tracking-wider whitespace-nowrap border-b-2 border-green-700">
                {label}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {activities.map((act, idx) => {
            const isFirstInGroup = !activities[idx - 1] || activities[idx - 1].tanggal !== act.tanggal;
            const rowspan        = grouped[act.tanggal]?.length ?? 1;
            const meta           = getMeta(act.kategori);
            const { hari, tanggal } = formatTanggalShort(act.tanggal);

            return (
              <tr
                key={act.id}
                className="schedule-row"
                style={{
                  backgroundColor: meta.rowBg,
                  borderLeft: `3px solid ${meta.border}`,
                }}
              >
                {/* No. */}
                <td className="px-2.5 py-2 text-gray-400 text-center text-xs border-b border-gray-100/80 align-middle">
                  {idx + 1}
                </td>

                {/* Hari / Tanggal – merged */}
                {isFirstInGroup && (
                  <td rowSpan={rowspan}
                    className="px-0 py-0 border-b border-gray-200 border-r-2 border-r-green-600 align-middle"
                    style={{ background: '#f0faf4', minWidth: '130px', width: '130px' }}
                  >
                    {/* Date card – prominent block */}
                    <div
                      className="flex flex-col items-center justify-center text-center h-full py-3 px-2 gap-1.5"
                    >
                      {/* Day name – solid dark chip */}
                      <span
                        className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-lg w-full text-center"
                        style={{
                          background: '#004d26',
                          color: '#ffffff',
                          letterSpacing: '0.12em',
                          boxShadow: '0 2px 6px rgba(0,77,38,0.35)',
                        }}
                      >
                        {hari}
                      </span>
                      {/* Date number */}
                      <span
                        className="font-bold text-green-900 leading-tight"
                        style={{ fontSize: '11px' }}
                      >
                        {tanggal}
                      </span>
                      {/* Row count pill */}
                      {rowspan > 1 && (
                        <span
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: '#d1fae5', color: '#065f46' }}
                        >
                          {rowspan} kegiatan
                        </span>
                      )}
                      {/* View Daily Schedule Button */}
                      <button
                        onClick={() => onViewDaily && onViewDaily(act.tanggal)}
                        className="mt-1 flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold text-green-700 bg-green-50 hover:bg-green-600 hover:text-white border border-green-200 hover:border-green-600 transition-all cursor-pointer shadow-sm"
                        title="Lihat Jadwal Full"
                      >
                        <Eye size={12} />
                        Detail
                      </button>
                    </div>
                  </td>
                )}

                {/* Waktu */}
                <td className="px-2.5 py-2 border-b border-gray-100/80 align-middle whitespace-nowrap">
                  <div className="flex flex-col gap-0.5">
                    <span className="flex items-center gap-1 text-gray-700 font-semibold text-[11px]">
                      <Clock size={10} style={{ color: meta.border }} />
                      {act.waktu_mulai}
                    </span>
                    <div className="w-px h-3 border-l-2 border-dashed border-gray-200 ml-1" />
                    <span className="flex items-center gap-1 text-gray-400 text-[11px]">
                      <Clock size={10} className="text-gray-300" />
                      {act.waktu_selesai}
                    </span>
                  </div>
                </td>

                {/* Kategori */}
                <td className="px-2.5 py-2 border-b border-gray-100/80 align-middle">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap"
                    style={{ background: meta.bg, color: meta.text }}>
                    {meta.emoji} {meta.label}
                  </span>
                </td>

                {/* Keterangan */}
                <td className="px-2.5 py-2 border-b border-gray-100/80 align-middle">
                  <span className="text-gray-800 text-xs font-medium leading-snug line-clamp-2"
                    title={act.keterangan}>
                    {act.keterangan}
                  </span>
                </td>

                {/* PJ */}
                <td className="px-2.5 py-2 border-b border-gray-100/80 align-middle">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap"
                    style={{ background: '#e6f4ee', color: '#006633' }}>
                    {act.pj}
                  </span>
                </td>

                {/* Catatan */}
                <td className="px-2.5 py-2 border-b border-gray-100/80 align-middle max-w-[140px]">
                  {act.catatan ? (
                    <span className="flex items-start gap-1 text-gray-500 text-[10px] leading-snug">
                      <StickyNote size={10} className="flex-shrink-0 mt-0.5 text-amber-400" />
                      <span className="line-clamp-2">{act.catatan}</span>
                    </span>
                  ) : (
                    <span className="text-gray-200 text-xs">—</span>
                  )}
                </td>

                {/* Aksi */}
                <td className="px-2.5 py-2 border-b border-gray-100/80 align-middle">
                  <div className="flex gap-1.5 items-center">
                    <ActionBtn id={`edit-btn-${act.id}`} onClick={() => onEdit(act)}
                      title="Edit" color="text-blue-500 hover:bg-blue-50">
                      <Pencil size={13} />
                    </ActionBtn>
                    <ActionBtn id={`delete-btn-${act.id}`} onClick={() => onDelete(act.id)}
                      title="Hapus" color="text-red-400 hover:bg-red-50">
                      <Trash2 size={13} />
                    </ActionBtn>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ActionBtn({ id, onClick, title, color, children }) {
  return (
    <button id={id} onClick={onClick} title={title}
      className={`p-1.5 rounded-lg transition-all duration-150 ${color} cursor-pointer`}>
      {children}
    </button>
  );
}
