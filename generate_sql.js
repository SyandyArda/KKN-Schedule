import fs from 'fs';
import { SEED_ACTIVITIES } from './src/data/seedData.js';

let sql = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

const values = SEED_ACTIVITIES.map(a => {
  const cat = a.catatan ? `'${a.catatan.replace(/'/g, "''")}'` : 'NULL';
  const ket = `'${a.keterangan.replace(/'/g, "''")}'`;
  return `(${a.minggu_ke}, '${a.tanggal}', '${a.waktu_mulai}', '${a.waktu_selesai}', ${ket}, '${a.pj}', ${cat}, '${a.kategori}')`;
});

sql += values.join(',\n') + ';\n';

fs.writeFileSync('seed.sql', sql);
console.log('seed.sql generated successfully.');
