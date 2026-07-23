/**
 * Excel export utility using SheetJS (xlsx).
 * Exports the full KKN schedule with one "Semua Jadwal" sheet
 * and four per-week sheets.
 */
import * as XLSX from 'xlsx';
import { formatTanggal } from './dateUtils';

export const KATEGORI_LABEL = {
  ibadah:    '🕌 Ibadah',
  rutin:     '🏃 Rutin Harian',
  proker:    '🎯 Program Kerja',
  evaluasi:  '📊 Evaluasi',
  istirahat: '💤 Istirahat',
};

const MINGGU_LABEL = {
  1: 'Minggu Ke-1 (29 Jul – 4 Agu)',
  2: 'Minggu Ke-2 (5 – 11 Agu)',
  3: 'Minggu Ke-3 (12 – 18 Agu)',
  4: 'Minggu Ke-4 (19 – 26 Agu)',
};

/** Map raw activities to flat row objects for the spreadsheet */
function toRows(activities) {
  return activities.map((act, i) => ({
    'No.':                i + 1,
    'Minggu':             MINGGU_LABEL[act.minggu_ke] ?? `Minggu ${act.minggu_ke}`,
    'Hari / Tanggal':     formatTanggal(act.tanggal),
    'Waktu Mulai':        act.waktu_mulai,
    'Waktu Selesai':      act.waktu_selesai,
    'Keterangan Kegiatan': act.keterangan,
    'Penanggung Jawab':   act.pj,
    'Kategori':           KATEGORI_LABEL[act.kategori] ?? act.kategori ?? '-',
    'Catatan':            act.catatan ?? '-',
  }));
}

/** Apply column widths to a worksheet */
function applyColWidths(ws) {
  ws['!cols'] = [
    { wch: 5  },   // No.
    { wch: 28 },   // Minggu
    { wch: 26 },   // Hari / Tanggal
    { wch: 13 },   // Waktu Mulai
    { wch: 14 },   // Waktu Selesai
    { wch: 60 },   // Keterangan
    { wch: 22 },   // PJ
    { wch: 18 },   // Kategori
    { wch: 45 },   // Catatan
  ];
}

/** Sort activities by week → date → time */
function sortActivities(list) {
  return [...list].sort((a, b) => {
    if (a.minggu_ke !== b.minggu_ke) return a.minggu_ke - b.minggu_ke;
    if (a.tanggal   !== b.tanggal)   return a.tanggal.localeCompare(b.tanggal);
    return a.waktu_mulai.localeCompare(b.waktu_mulai);
  });
}

/**
 * Export all activities to an Excel workbook (.xlsx).
 * Creates a "Semua Jadwal" sheet and one sheet per week.
 * @param {Array} activities – full activities array from state
 */
export function exportToExcel(activities) {
  const wb = XLSX.utils.book_new();
  const sorted = sortActivities(activities);

  // ── Sheet 1: All weeks ──
  const wsAll = XLSX.utils.json_to_sheet(toRows(sorted));
  applyColWidths(wsAll);
  XLSX.utils.book_append_sheet(wb, wsAll, 'Semua Jadwal');

  // ── Sheets 2–5: Per week ──
  for (let w = 1; w <= 4; w++) {
    const weekActs = sorted.filter((a) => a.minggu_ke === w);
    if (weekActs.length === 0) continue;

    const ws = XLSX.utils.json_to_sheet(toRows(weekActs));
    applyColWidths(ws);
    XLSX.utils.book_append_sheet(wb, ws, `Minggu ${w}`);
  }

  // ── Sheet: Rekap Proker only ──
  const prokerActs = sorted.filter((a) => a.kategori === 'proker');
  if (prokerActs.length > 0) {
    const wsProker = XLSX.utils.json_to_sheet(toRows(prokerActs));
    applyColWidths(wsProker);
    XLSX.utils.book_append_sheet(wb, wsProker, 'Rekap Proker');
  }

  XLSX.writeFile(wb, 'Jadwal_KKN_057_Muhammadiyah.xlsx');
}
