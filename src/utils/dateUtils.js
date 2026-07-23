/**
 * Utility helpers for date / time formatting used throughout the app.
 */

/**
 * Auto-assign minggu_ke based on the KKN date range (Jul 29 – Aug 26, 2026).
 * Returns 1–4, defaults to 1 for out-of-range dates.
 */
export function getMingguKe(isoDate) {
  if (!isoDate) return 1;
  if (isoDate >= '2026-07-29' && isoDate <= '2026-08-04') return 1;
  if (isoDate >= '2026-08-05' && isoDate <= '2026-08-11') return 2;
  if (isoDate >= '2026-08-12' && isoDate <= '2026-08-18') return 3;
  if (isoDate >= '2026-08-19' && isoDate <= '2026-08-27') return 4;
  return 1;
}

/** Map of day index → Indonesian day name */
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/** Month names in Indonesian */
const BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

/**
 * Format an ISO date string "YYYY-MM-DD" to a readable Indonesian label,
 * e.g.  "Senin, 05 Jan 2026"
 */
export function formatTanggal(isoDate) {
  if (!isoDate) return '-';
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const hari = HARI[date.getDay()];
  const bulan = BULAN[date.getMonth()].slice(0, 3);
  return `${hari}, ${String(d).padStart(2, '0')} ${bulan} ${y}`;
}

/**
 * Format an ISO date string for the date cell header (short version).
 * e.g.  "Senin\n05 Jan"
 */
export function formatTanggalShort(isoDate) {
  if (!isoDate) return { hari: '-', tanggal: '-' };
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const hari = HARI[date.getDay()];
  const bulan = BULAN[date.getMonth()].slice(0, 3);
  return { hari, tanggal: `${String(d).padStart(2, '0')} ${bulan} ${y}` };
}

/** Generate a simple unique ID */
export function generateId() {
  return `kkn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Compare two HH:mm time strings.
 * Returns -1, 0, or 1.
 */
export function compareTime(a, b) {
  const [ah, am] = a.split(':').map(Number);
  const [bh, bm] = b.split(':').map(Number);
  if (ah !== bh) return ah - bh;
  return am - bm;
}

/**
 * Returns true when waktu_selesai is strictly after waktu_mulai.
 */
export function isValidTimeRange(mulai, selesai) {
  return compareTime(mulai, selesai) < 0;
}
