import fs from 'fs';
import { SEED_ACTIVITIES } from './src/data/seedData.js';

const sqlHeader = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS kegiatan (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  minggu_ke integer NOT NULL,
  tanggal date NOT NULL,
  waktu_mulai time NOT NULL,
  waktu_selesai time NOT NULL,
  keterangan text NOT NULL,
  pj text NOT NULL,
  catatan text,
  kategori text,
  created_at timestamp DEFAULT now()
);

-- Bersihkan data agar tidak duplikat jika query ini dijalankan ulang
TRUNCATE TABLE kegiatan;

INSERT INTO kegiatan (minggu_ke, tanggal, waktu_mulai, waktu_selesai, keterangan, pj, catatan, kategori) VALUES
`;

const escape = (str) => {
  if (str === null || str === undefined) return 'NULL';
  return `'${str.replace(/'/g, "''")}'`;
};

const values = SEED_ACTIVITIES.map(a => {
  return `(${a.minggu_ke}, ${escape(a.tanggal)}, ${escape(a.waktu_mulai)}, ${escape(a.waktu_selesai)}, ${escape(a.keterangan)}, ${escape(a.pj)}, ${escape(a.catatan)}, ${escape(a.kategori)})`;
}).join(',\n');

const sqlFileContent = sqlHeader + values + ';\n';
fs.writeFileSync('seed.sql', sqlFileContent);
console.log('SQL generated to seed.sql');
