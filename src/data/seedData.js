/**
 * Seed data — KKN 057 Persyarikatan Muhammadiyah
 * Sumber: Dokumen Program Resmi KKN + Penyesuaian Custom User
 * Periode: 29 Juli – 27 Agustus 2026
 */

let _id = 0;
const SA = 'Seluruh Anggota';
const KL = 'Koordinator Lapangan';

export const PJ_TEAM = [
  'Nabila Iswara',      // 0
  'Syandy Arda',        // 1
  'Kharisma Mahendra',  // 2
  'Puspa Ayu',          // 3
  'M Fajri Nur Alif',   // 4
  'Ananda Andriano. S', // 5
  'Adam Ali Muhammad',  // 6
  'M Febriyanto B',     // 7
];
const T = PJ_TEAM;

const mk = (m, t, wm, ws, ket, pj, cat, kat) => ({
  id: `kkn-${String(++_id).padStart(3, '0')}`,
  minggu_ke: m, tanggal: t, waktu_mulai: wm, waktu_selesai: ws,
  keterangan: ket, pj, catatan: cat ?? null, kategori: kat,
});

// Standard daily blocks
const sub = (m, t)                   => mk(m, t, '04:30', '05:00', 'Sholat Subuh Berjamaah', SA, null, 'ibadah');
const olr = (m, t)                   => mk(m, t, '05:00', '06:00', 'Olahraga Pagi & Senam Bersama', SA, null, 'rutin');
const sap = (m, t, ws = '07:30')     => mk(m, t, '06:00', ws, 'Persiapan Diri & Sarapan Pagi', SA, null, 'rutin');
const ish = (m, t)                   => mk(m, t, '12:00', '13:00', 'ISHOMA (Istirahat, Sholat Dzuhur, Makan Siang)', SA, null, 'ibadah');
const ist = (m, t, wm, ws)           => mk(m, t, wm, ws, 'Istirahat Sore & Persiapan Kegiatan', SA, null, 'istirahat');
const mgi = (m, t, wm='18:00',ws='19:00') => mk(m, t, wm, ws, 'Sholat Maghrib & Isya Berjamaah + Mengaji', SA, null, 'ibadah');
const evl = (m, t, wm='21:00',ws='22:00') => mk(m, t, wm, ws, 'Evaluasi Harian & Briefing Program Esok Hari', KL, null, 'evaluasi');
const iml = (m, t, wm='22:00')       => mk(m, t, wm, '23:59', 'Istirahat Malam', SA, 'Berlanjut hingga waktu Subuh', 'istirahat');

// TPA hari Rabu & Jumat, Tadarus harian setelah Ashar
const isTPA = (t) => ['2026-07-29', '2026-07-31', '2026-08-05', '2026-08-07', '2026-08-12', '2026-08-14', '2026-08-19', '2026-08-21', '2026-08-26'].includes(t);
const asharAction = (m, t) => isTPA(t) 
  ? mk(m, t, '15:45', '17:00', 'Pendampingan TPA (Seminggu 2x) & Tadarus di Mushola Peleman', SA, null, 'ibadah')
  : mk(m, t, '15:45', '17:00', 'Tadarus Al-Quran Harian Setelah Ashar', SA, null, 'ibadah');

// ════════════════════════════════════════════════════════
//  MINGGU 1
// ════════════════════════════════════════════════════════
const w1 = [
  // Rabu 29 Jul
  sub(1,'2026-07-29'), olr(1,'2026-07-29'), sap(1,'2026-07-29'),
  mk(1,'2026-07-29','09:00','11:00','Penerimaan Resmi Mahasiswa KKN di Kantor Kelurahan Bumijo',T[0],null,'proker'),
  ish(1,'2026-07-29'),
  mk(1,'2026-07-29','13:00','15:00','Sowan dan Koordinasi Perdana',T[0],null,'proker'),
  ist(1,'2026-07-29','15:30','15:45'),
  asharAction(1, '2026-07-29'),
  mgi(1,'2026-07-29'),
  mk(1,'2026-07-29','19:30','21:00','Aklimatisasi Posko KKN',T[0],null,'evaluasi'),
  iml(1,'2026-07-29','21:00'),

  // Kamis 30 Jul
  sub(1,'2026-07-30'), olr(1,'2026-07-30'), sap(1,'2026-07-30'),
  mk(1,'2026-07-30','09:00','12:00','Pemetaan Wilayah Fisik RW 04',T[1],null,'proker'),
  ish(1,'2026-07-30'),
  ist(1,'2026-07-30','13:00','15:45'),
  asharAction(1, '2026-07-30'),
  mgi(1,'2026-07-30'),
  evl(1,'2026-07-30','20:00','21:00'),
  iml(1,'2026-07-30','21:00'),

  // Jumat 31 Jul
  sub(1,'2026-07-31'), olr(1,'2026-07-31'), sap(1,'2026-07-31'),
  mk(1,'2026-07-31','09:00','11:30','Sowan Formal ke Jajaran Pengurus PRM',T[2],null,'proker'),
  ish(1,'2026-07-31'),
  mk(1,'2026-07-31','14:00','15:45','Penyerahan Paket Logistik Awal',T[2],null,'proker'),
  asharAction(1, '2026-07-31'),
  mgi(1,'2026-07-31'),
  evl(1,'2026-07-31','20:00','21:00'),
  iml(1,'2026-07-31','21:00'),

  // Sabtu 1 Agu
  sub(1,'2026-08-01'), olr(1,'2026-08-01'), sap(1,'2026-08-01'),
  mk(1,'2026-08-01','09:00','12:00','Sowan ke Pengurus Bank Sampah',T[3],null,'proker'),
  ish(1,'2026-08-01'),
  ist(1,'2026-08-01','13:00','15:45'),
  asharAction(1, '2026-08-01'),
  mgi(1,'2026-08-01'),
  evl(1,'2026-08-01','20:00','21:00'),
  iml(1,'2026-08-01'),

  // Minggu 2 Agu
  sub(1,'2026-08-02'), olr(1,'2026-08-02'),
  mk(1,'2026-08-02','06:00','08:00','Jalan Sehat Santai Keliling Kampung',T[4],null,'proker'),
  mk(1,'2026-08-02','08:00','09:00','Sarapan Pagi Bersama',SA,null,'rutin'),
  mk(1,'2026-08-02','09:30','12:00','Rapat bersama Panitia 17 Agustus',T[4],null,'proker'),
  ish(1,'2026-08-02'),
  ist(1,'2026-08-02','13:00','15:45'),
  asharAction(1, '2026-08-02'),
  mgi(1,'2026-08-02'),
  evl(1,'2026-08-02','20:00','21:00'),
  iml(1,'2026-08-02'),

  // Senin 3 Agu — Kajian Kampung Pingit
  sub(1,'2026-08-03'), olr(1,'2026-08-03'), sap(1,'2026-08-03'),
  mk(1,'2026-08-03','09:00','12:00','Kajian Kampung Pingit (Khusus 3 Agustus)',T[5],'Kajian agama rutin di Kampung Pingit','ibadah'),
  ish(1,'2026-08-03'),
  ist(1,'2026-08-03','13:00','15:45'),
  asharAction(1, '2026-08-03'),
  mgi(1,'2026-08-03'),
  evl(1,'2026-08-03','20:00','21:00'),
  iml(1,'2026-08-03','21:00'),

  // Selasa 4 Agu
  sub(1,'2026-08-04'), olr(1,'2026-08-04'), sap(1,'2026-08-04'),
  mk(1,'2026-08-04','09:00','12:00','Cetak Poster Informasi JBM',T[6],null,'proker'),
  ish(1,'2026-08-04'),
  ist(1,'2026-08-04','13:00','15:45'),
  asharAction(1, '2026-08-04'),
  mgi(1,'2026-08-04'),
  evl(1,'2026-08-04','20:00','21:00'),
  iml(1,'2026-08-04','21:00'),
];

// ════════════════════════════════════════════════════════
//  MINGGU 2
// ════════════════════════════════════════════════════════
const w2 = [
  // Rabu 5 Agu
  sub(2,'2026-08-05'), olr(2,'2026-08-05'), sap(2,'2026-08-05'),
  mk(2,'2026-08-05','09:00','12:00','Observasi dan Penyiapan Tata Ruang Balai RW 04',T[7],null,'proker'),
  ish(2,'2026-08-05'),
  ist(2,'2026-08-05','13:00','15:45'),
  asharAction(2, '2026-08-05'), // TPA
  mgi(2,'2026-08-05','18:00','19:00'),
  evl(2,'2026-08-05','21:00','22:00'),
  iml(2,'2026-08-05'),

  // Kamis 6 Agu
  sub(2,'2026-08-06'), olr(2,'2026-08-06'), sap(2,'2026-08-06'),
  mk(2,'2026-08-06','09:00','12:00','Pendataan Awal Arsip Administrasi',T[0],null,'proker'),
  ish(2,'2026-08-06'),
  ist(2,'2026-08-06','13:00','15:45'),
  asharAction(2, '2026-08-06'),
  mgi(2,'2026-08-06'),
  evl(2,'2026-08-06','20:00','21:00'),
  iml(2,'2026-08-06','21:30'),

  // Jumat 7 Agu
  sub(2,'2026-08-07'), olr(2,'2026-08-07'), sap(2,'2026-08-07'),
  mk(2,'2026-08-07','09:00','11:30','Mempersiapkan Berkas Administrasi',T[1],null,'proker'),
  ish(2,'2026-08-07'),
  ist(2,'2026-08-07','13:00','15:45'),
  asharAction(2, '2026-08-07'), // TPA
  mgi(2,'2026-08-07','18:00','19:00'),
  evl(2,'2026-08-07','21:00','22:00'),
  iml(2,'2026-08-07'),

  // Sabtu 8 Agu — Bank Sampah
  sub(2,'2026-08-08'), olr(2,'2026-08-08'), sap(2,'2026-08-08'),
  mk(2,'2026-08-08','09:00','12:00','Kegiatan Bank Sampah Bulanan (Minggu Kedua)',T[2],'Warga menyetor sampah ke pengepul','proker'),
  ish(2,'2026-08-08'),
  mk(2,'2026-08-08','13:30','15:45','Pengumpulan Data Awal Anggota PRM Pingit',T[2],null,'proker'),
  asharAction(2, '2026-08-08'),
  mgi(2,'2026-08-08'),
  evl(2,'2026-08-08','20:00','21:00'),
  iml(2,'2026-08-08'),

  // Minggu 9 Agu — Kerja Bakti (Setiap 2 minggu sekali)
  sub(2,'2026-08-09'), olr(2,'2026-08-09'),
  mk(2,'2026-08-09','06:00','10:00','Kegiatan Kerja Bakti Rutin (2 Minggu Sekali)',T[3],'Membersihkan selokan dan area publik kampung','proker'),
  mk(2,'2026-08-09','10:00','12:00','Istirahat dan Evaluasi Internal',KL,null,'evaluasi'),
  ish(2,'2026-08-09'),
  ist(2,'2026-08-09','13:00','15:45'),
  asharAction(2, '2026-08-09'),
  mgi(2,'2026-08-09'),
  evl(2,'2026-08-09','20:00','21:00'),
  iml(2,'2026-08-09'),

  // Senin 10 Agu
  sub(2,'2026-08-10'), olr(2,'2026-08-10'), sap(2,'2026-08-10'),
  mk(2,'2026-08-10','09:00','12:00','Pemindahan Arsip Digital Excel',T[4],null,'proker'),
  ish(2,'2026-08-10'),
  ist(2,'2026-08-10','13:00','15:45'),
  asharAction(2, '2026-08-10'),
  mgi(2,'2026-08-10'),
  evl(2,'2026-08-10','20:00','21:00'),
  iml(2,'2026-08-10'),

  // Selasa 11 Agu
  sub(2,'2026-08-11'), olr(2,'2026-08-11'), sap(2,'2026-08-11'),
  mk(2,'2026-08-11','09:00','12:00','Finalisasi Materi Workshop',T[5],null,'proker'),
  ish(2,'2026-08-11'),
  ist(2,'2026-08-11','13:00','15:45'),
  asharAction(2, '2026-08-11'),
  mgi(2,'2026-08-11'),
  evl(2,'2026-08-11','20:00','21:00'),
  iml(2,'2026-08-11','21:00'),
];

// ════════════════════════════════════════════════════════
//  MINGGU 3
// ════════════════════════════════════════════════════════
const w3 = [
  // Rabu 12 Agu
  sub(3,'2026-08-12'), olr(3,'2026-08-12'), sap(3,'2026-08-12'),
  mk(3,'2026-08-12','09:00','12:00','Persiapan Logistik dan Hadiah',T[6],null,'proker'),
  ish(3,'2026-08-12'),
  ist(3,'2026-08-12','13:00','15:45'),
  asharAction(3, '2026-08-12'), // TPA
  mgi(3,'2026-08-12','18:00','19:00'),
  evl(3,'2026-08-12','21:00','22:00'),
  iml(3,'2026-08-12'),

  // Kamis 13 Agu
  sub(3,'2026-08-13'), olr(3,'2026-08-13'), sap(3,'2026-08-13'),
  mk(3,'2026-08-13','09:00','12:00','Persiapan Eksekusi Workshop',T[7],null,'rutin'),
  ish(3,'2026-08-13'),
  mk(3,'2026-08-13','13:30','15:30','Eksekusi Workshop',T[7],null,'proker'),
  asharAction(3, '2026-08-13'),
  mgi(3,'2026-08-13'),
  evl(3,'2026-08-13','20:00','21:00'),
  iml(3,'2026-08-13'),

  // Jumat 14 Agu
  sub(3,'2026-08-14'), olr(3,'2026-08-14'), sap(3,'2026-08-14'),
  mk(3,'2026-08-14','09:00','12:00','Pengepakan Hadiah Lomba',T[0],null,'proker'),
  ish(3,'2026-08-14'),
  ist(3,'2026-08-14','13:00','15:45'),
  asharAction(3, '2026-08-14'), // TPA
  mgi(3,'2026-08-14','18:00','19:00'),
  evl(3,'2026-08-14','21:00','22:00'),
  iml(3,'2026-08-14'),

  // Sabtu 15 Agu — PKK RT
  sub(3,'2026-08-15'), olr(3,'2026-08-15'), sap(3,'2026-08-15'),
  mk(3,'2026-08-15','09:00','12:00','Kegiatan Pertemuan Bulanan PKK RT (Tgl 15)',T[1],null,'proker'),
  ish(3,'2026-08-15'),
  mk(3,'2026-08-15','13:00','15:45','Persiapan Puncak Lomba',T[1],null,'proker'),
  asharAction(3, '2026-08-15'),
  mgi(3,'2026-08-15','18:30','19:30'),
  evl(3,'2026-08-15','20:00','21:00'),
  iml(3,'2026-08-15'),

  // Minggu 16 Agu — Malam Tirakatan
  sub(3,'2026-08-16'), olr(3,'2026-08-16'),
  mk(3,'2026-08-16','06:00','08:30','Senam Sehat Minggu & Sarapan',T[2],null,'proker'),
  mk(3,'2026-08-16','08:30','12:00','Lomba 17 Agustus',T[2],null,'proker'),
  ish(3,'2026-08-16'),
  ist(3,'2026-08-16','13:00','15:45'),
  asharAction(3, '2026-08-16'),
  mgi(3,'2026-08-16'),
  mk(3,'2026-08-16','19:30','23:00','Malam Tirakatan Menjelang 17 Agustus',SA,'Malam keakraban & doa bersama warga','proker'),
  iml(3,'2026-08-16','23:00'),

  // Senin 17 Agu
  sub(3,'2026-08-17'), olr(3,'2026-08-17'), sap(3,'2026-08-17'),
  mk(3,'2026-08-17','07:00','09:00','Upacara Bendera HUT RI',T[3],null,'proker'),
  mk(3,'2026-08-17','09:30','12:00','Istirahat & Refleksi',SA,null,'istirahat'),
  ish(3,'2026-08-17'),
  ist(3,'2026-08-17','13:00','15:45'),
  asharAction(3, '2026-08-17'),
  mgi(3,'2026-08-17'),
  evl(3,'2026-08-17','20:00','21:00'),
  iml(3,'2026-08-17'),

  // Selasa 18 Agu — Kegiatan Balita Posyandu
  sub(3,'2026-08-18'), olr(3,'2026-08-18'), sap(3,'2026-08-18'),
  mk(3,'2026-08-18','09:00','12:00','Kegiatan Balita / Posyandu (Tgl 18 Setiap Bulan)',T[4],null,'proker'),
  ish(3,'2026-08-18'),
  ist(3,'2026-08-18','13:00','15:45'),
  asharAction(3, '2026-08-18'),
  mgi(3,'2026-08-18'),
  evl(3,'2026-08-18','20:00','21:00'),
  iml(3,'2026-08-18'),
];

// ════════════════════════════════════════════════════════
//  MINGGU 4
// ════════════════════════════════════════════════════════
const w4 = [
  // Rabu 19 Agu — Kajian Ibu-ibu
  sub(4,'2026-08-19'), olr(4,'2026-08-19'), sap(4,'2026-08-19'),
  mk(4,'2026-08-19','09:00','12:00','Kegiatan Kajian Rutin Bulanan Ibu-ibu (Tgl 19)',T[5],null,'proker'),
  ish(4,'2026-08-19'),
  ist(4,'2026-08-19','13:00','15:45'),
  asharAction(4, '2026-08-19'), // TPA + Tadarus
  mgi(4,'2026-08-19','18:00','19:00'),
  evl(4,'2026-08-19','21:00','22:00'),
  iml(4,'2026-08-19'),

  // Kamis 20 Agu — PKK RW
  sub(4,'2026-08-20'), olr(4,'2026-08-20'), sap(4,'2026-08-20'),
  mk(4,'2026-08-20','09:00','12:00','Kegiatan Pertemuan Bulanan PKK RW (Tgl 20)',T[6],null,'proker'),
  ish(4,'2026-08-20'),
  mk(4,'2026-08-20','13:30','15:45','Penyuluhan Hukum Waris Praktis',T[6],null,'proker'),
  asharAction(4, '2026-08-20'),
  mgi(4,'2026-08-20'),
  evl(4,'2026-08-20','20:00','21:00'),
  iml(4,'2026-08-20'),

  // Jumat 21 Agu
  sub(4,'2026-08-21'), olr(4,'2026-08-21'), sap(4,'2026-08-21'),
  mk(4,'2026-08-21','09:00','12:00','Penyebaran Kuesioner Post-Test',T[7],null,'proker'),
  ish(4,'2026-08-21'),
  mk(4,'2026-08-21','14:00','15:45','Pengumpulan Sampah Plastik Akhir',T[7],null,'proker'),
  asharAction(4, '2026-08-21'), // TPA
  mgi(4,'2026-08-21'),
  evl(4,'2026-08-21','20:00','21:00'),
  iml(4,'2026-08-21','21:00'),

  // Sabtu 22 Agu
  sub(4,'2026-08-22'), olr(4,'2026-08-22'), sap(4,'2026-08-22'),
  mk(4,'2026-08-22','09:00','12:00','Editing Video Kompilasi',T[0],null,'proker'),
  ish(4,'2026-08-22'),
  ist(4,'2026-08-22','13:00','15:45'),
  asharAction(4, '2026-08-22'),
  mgi(4,'2026-08-22'),
  evl(4,'2026-08-22','20:00','21:00'),
  iml(4,'2026-08-22'),

  // Minggu 23 Agu — Kerja Bakti
  sub(4,'2026-08-23'),
  mk(4,'2026-08-23','05:00','06:00','Persiapan Kerja Bakti',SA,null,'rutin'),
  mk(4,'2026-08-23','06:00','10:30','Kegiatan Kerja Bakti Rutin (2 Minggu Sekali)',T[1],null,'proker'),
  mk(4,'2026-08-23','10:30','12:00','Istirahat & Sarapan Bersama',SA,null,'rutin'),
  ish(4,'2026-08-23'),
  ist(4,'2026-08-23','13:00','15:45'),
  asharAction(4, '2026-08-23'),
  mgi(4,'2026-08-23'),
  evl(4,'2026-08-23','20:00','21:00'),
  iml(4,'2026-08-23'),

  // Senin 24 Agu
  sub(4,'2026-08-24'), olr(4,'2026-08-24'), sap(4,'2026-08-24'),
  mk(4,'2026-08-24','09:00','12:00','Penyerahan Dokumen Spreadsheet',T[2],null,'proker'),
  ish(4,'2026-08-24'),
  mk(4,'2026-08-24','14:00','15:45','Pengumpulan Rekaman Video',T[2],null,'proker'),
  asharAction(4, '2026-08-24'),
  mgi(4,'2026-08-24'),
  evl(4,'2026-08-24','20:00','21:00'),
  iml(4,'2026-08-24'),

  // Selasa 25 Agu
  sub(4,'2026-08-25'), olr(4,'2026-08-25'), sap(4,'2026-08-25'),
  mk(4,'2026-08-25','09:00','12:00','Penyelesaian Draf Laporan Akhir',T[3],null,'proker'),
  ish(4,'2026-08-25'),
  ist(4,'2026-08-25','13:00','15:45'),
  asharAction(4, '2026-08-25'),
  mgi(4,'2026-08-25'),
  evl(4,'2026-08-25','20:00','21:00'),
  iml(4,'2026-08-25'),

  // Rabu 26 Agu
  sub(4,'2026-08-26'), olr(4,'2026-08-26'), sap(4,'2026-08-26'),
  mk(4,'2026-08-26','09:00','15:00','Gladi Resik Malam Perpisahan',T[4],null,'proker'),
  ist(4,'2026-08-26','15:00','15:45'),
  asharAction(4, '2026-08-26'), // TPA
  mgi(4,'2026-08-26'),
  mk(4,'2026-08-26','19:30','22:00','MALAM PERPISAHAN KKN',T[4],null,'proker'),
  iml(4,'2026-08-26','22:00'),

  // Kamis 27 Agu
  sub(4,'2026-08-27'), olr(4,'2026-08-27'),
  mk(4,'2026-08-27','06:00','08:00','Persiapan Terakhir di Posko',SA,null,'rutin'),
  mk(4,'2026-08-27','08:00','10:00','Pembersihan Total Posko',T[5],null,'proker'),
  mk(4,'2026-08-27','10:30','12:00','Pamitan Terakhir Ketua RW 04',T[5],null,'proker'),
  mk(4,'2026-08-27','13:00','14:00','Pelepasan/Penarikan KKN',SA,null,'proker'),
];

export const SEED_ACTIVITIES = [...w1, ...w2, ...w3, ...w4];
