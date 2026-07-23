import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Calendar, Clock, User, FileText, StickyNote, Tag } from 'lucide-react';
import { generateId, isValidTimeRange, getMingguKe } from '../utils/dateUtils';
import { KATEGORI_LABEL } from '../utils/exportUtils';

/** Daftar Penanggung Jawab KKN 057 */
export const PJ_LIST = [
  'Nabila Iswara',
  'Syandy Arda',
  'Kharisma Mahendra',
  'Puspa Ayu',
  'M Fajri Nur Alif',
  'Ananda Andriano. S',
  'Adam Ali Muhammad',
  'M Febriyanto B',
  'Seluruh Anggota',
  'Koordinator Lapangan',
];

const KATEGORI_OPTIONS = [
  { value: 'ibadah',    emoji: '🕌', label: 'Ibadah',        color: '#16a34a' },
  { value: 'rutin',     emoji: '🏃', label: 'Rutin Harian',  color: '#6b7280' },
  { value: 'proker',    emoji: '🎯', label: 'Program Kerja', color: '#2563eb' },
  { value: 'evaluasi',  emoji: '📊', label: 'Evaluasi',      color: '#7c3aed' },
  { value: 'istirahat', emoji: '💤', label: 'Istirahat',     color: '#d97706' },
];

const EMPTY_FORM = {
  minggu_ke:     1,
  tanggal:       '',
  waktu_mulai:   '08:00',
  waktu_selesai: '09:00',
  keterangan:    '',
  pj:            '',
  catatan:       '',
  kategori:      'proker',
};

/**
 * Modal form for adding / editing an activity.
 */
export default function ActivityModal({ isOpen, onClose, onSave, initialData }) {
  const [form, setForm]     = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(initialData
        ? { ...initialData, catatan: initialData.catatan ?? '', kategori: initialData.kategori ?? 'proker' }
        : { ...EMPTY_FORM }
      );
      setErrors({});
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const isEdit = Boolean(initialData);

  /* ── Field change handler ── */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'tanggal') {
      // Auto-assign minggu_ke when date changes
      const minggu = getMingguKe(value);
      setForm((prev) => ({ ...prev, tanggal: value, minggu_ke: minggu }));
      if (errors.tanggal) setErrors((prev) => ({ ...prev, tanggal: undefined }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: name === 'minggu_ke' ? Number(value) : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  /* ── Validation ── */
  const validate = () => {
    const errs = {};
    if (!form.tanggal)                           errs.tanggal       = 'Tanggal wajib diisi.';
    if (!form.waktu_mulai)                        errs.waktu_mulai   = 'Waktu mulai wajib diisi.';
    if (!form.waktu_selesai)                      errs.waktu_selesai = 'Waktu selesai wajib diisi.';
    if (form.waktu_mulai && form.waktu_selesai &&
        !isValidTimeRange(form.waktu_mulai, form.waktu_selesai))
                                                  errs.waktu_selesai = 'Waktu selesai harus setelah waktu mulai.';
    if (!form.keterangan.trim())                  errs.keterangan    = 'Keterangan wajib diisi.';
    if (!form.pj.trim())                          errs.pj            = 'Penanggung jawab wajib diisi.';
    return errs;
  };

  /* ── Submit ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    
    const submittedData = {
      ...form,
      catatan: form.catatan.trim() || null,
    };
    
    // Only pass ID if it exists (i.e., we are editing)
    if (isEdit && form.id) {
      submittedData.id = form.id;
    } else {
      // Create a temporary ID that App.jsx can identify as a new item
      submittedData.id = `temp-${Date.now()}`;
    }

    onSave(submittedData);
    onClose();
  };

  const selectedKat = KATEGORI_OPTIONS.find((k) => k.value === form.kategori) ?? KATEGORI_OPTIONS[2];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.50)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal-panel w-full max-w-xl max-h-[92vh] overflow-y-auto custom-scroll bg-white rounded-2xl shadow-2xl"
        style={{ border: '1.5px solid rgba(0,102,51,0.15)' }}
      >
        {/* ── Header ── */}
        <div
          className="sticky top-0 z-10 px-6 py-4 flex items-center justify-between rounded-t-2xl"
          style={{ background: 'linear-gradient(135deg, #003d1f, #006633)' }}
        >
          <div>
            <h2 className="text-white font-bold text-lg">
              {isEdit ? '✏️ Edit Kegiatan' : '➕ Tambah Kegiatan Baru'}
            </h2>
            <p className="text-green-200 text-xs mt-0.5">KKN 057 Persyarikatan Muhammadiyah</p>
          </div>
          <button id="modal-close-btn" onClick={onClose}
            className="text-green-200 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-all cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          {/* Row 1: Tanggal + Minggu (auto) */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tanggal" icon={<Calendar size={14} />} error={errors.tanggal} required>
              <input id="field-tanggal" type="date" name="tanggal"
                value={form.tanggal} min="2026-07-29" max="2026-08-26"
                onChange={handleChange} className="input-base" />
            </Field>

            <Field label="Minggu Ke (otomatis)" icon={<Calendar size={14} />}>
              <div className="input-base flex items-center gap-2 cursor-not-allowed"
                style={{ background: '#f4f9f5', color: '#006633', fontWeight: 600 }}>
                <span className="text-green-700">📅</span>
                Minggu {form.minggu_ke}
                <span className="text-xs text-gray-400 font-normal ml-auto">auto</span>
              </div>
            </Field>
          </div>

          {/* Row 2: Waktu mulai & selesai */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Waktu Mulai" icon={<Clock size={14} />} error={errors.waktu_mulai} required>
              <input id="field-waktu_mulai" type="time" name="waktu_mulai"
                value={form.waktu_mulai} onChange={handleChange} className="input-base" />
            </Field>

            <Field label="Waktu Selesai" icon={<Clock size={14} />} error={errors.waktu_selesai} required>
              <input id="field-waktu_selesai" type="time" name="waktu_selesai"
                value={form.waktu_selesai} onChange={handleChange} className="input-base" />
            </Field>
          </div>

          {/* Kategori pills */}
          <Field label="Kategori Kegiatan" icon={<Tag size={14} />}>
            <div className="flex flex-wrap gap-2 pt-1">
              {KATEGORI_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, kategori: opt.value }))}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                             border-2 transition-all cursor-pointer"
                  style={form.kategori === opt.value
                    ? { background: opt.color, color: '#fff', borderColor: opt.color }
                    : { background: '#f9fafb', color: '#374151', borderColor: '#e5e7eb' }}
                >
                  <span>{opt.emoji}</span> {opt.label}
                </button>
              ))}
            </div>
          </Field>

          {/* Keterangan */}
          <Field label="Keterangan Kegiatan" icon={<FileText size={14} />} error={errors.keterangan} required>
            <textarea id="field-keterangan" name="keterangan"
              value={form.keterangan} onChange={handleChange}
              rows={3} placeholder="Deskripsikan kegiatan yang akan dilakukan..."
              className="input-base resize-none" />
          </Field>

          {/* PJ — dropdown */}
          <Field label="Penanggung Jawab (PJ)" icon={<User size={14} />} error={errors.pj} required>
            <select
              id="field-pj"
              name="pj"
              value={form.pj}
              onChange={handleChange}
              className="input-base"
            >
              <option value="">— Pilih Penanggung Jawab —</option>
              <optgroup label="👥 Anggota KKN 057">
                {PJ_LIST.slice(0, 8).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </optgroup>
              <optgroup label="📋 Grup">
                {PJ_LIST.slice(8).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </optgroup>
            </select>
          </Field>

          {/* Catatan */}
          <Field label="Catatan (Opsional)" icon={<StickyNote size={14} />}>
            <textarea id="field-catatan" name="catatan"
              value={form.catatan} onChange={handleChange}
              rows={2} placeholder="Catatan tambahan jika diperlukan..."
              className="input-base resize-none" />
          </Field>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" id="modal-cancel-btn" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600
                         font-semibold text-sm hover:bg-gray-50 transition-all cursor-pointer">
              Batal
            </button>
            <button type="submit" id="modal-save-btn"
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm text-white
                         flex items-center justify-center gap-2 transition-all cursor-pointer
                         hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #004d26, #006633)' }}>
              <Save size={15} />
              {isEdit ? 'Simpan Perubahan' : 'Tambah Kegiatan'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .input-base {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1.5px solid #d1d5db;
          border-radius: 10px;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          background: #fff;
          color: #1a1a1a;
          font-family: 'Inter', sans-serif;
        }
        .input-base:focus {
          border-color: #006633;
          box-shadow: 0 0 0 3px rgba(0, 102, 51, 0.12);
        }
        .input-base::placeholder { color: #9ca3af; }
        select.input-base { cursor: pointer; }
      `}</style>
    </div>
  );
}

function Field({ label, icon, error, children, required }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wide">
        <span style={{ color: '#006633' }}>{icon}</span>
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-xs mt-0.5">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}
