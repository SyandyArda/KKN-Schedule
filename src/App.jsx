import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Plus, Search, Download, Filter, X as XIcon, Loader2 } from 'lucide-react';
import Header from './components/Header';
import WeekTabs from './components/WeekTabs';
import ScheduleTable from './components/ScheduleTable';
import ActivityModal from './components/ActivityModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import EmptyState from './components/EmptyState';
import DailyScheduleModal from './components/DailyScheduleModal';
import PinModal from './components/PinModal';
import Toast from './components/Toast';
import { exportToExcel } from './utils/exportUtils';
import { supabase } from './lib/supabase';

/* ── Category filter options ── */
const KAT_FILTERS = [
  { value: 'all', label: 'Semua', emoji: '📋' },
  { value: 'proker', label: 'Proker', emoji: '🎯' },
  { value: 'ibadah', label: 'Ibadah', emoji: '🕌' },
  { value: 'rutin', label: 'Rutin', emoji: '🏃' },
  { value: 'evaluasi', label: 'Evaluasi', emoji: '📊' },
  { value: 'istirahat', label: 'Istirahat', emoji: '💤' },
];

export default function App() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');
  const [activeWeek, setActiveWeek] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedDateForModal, setSelectedDateForModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [katFilter, setKatFilter] = useState('all');
  const [toast, setToast] = useState(null);
  const [exporting, setExporting] = useState(false);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const handleToggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem('isAdmin');
      showToast('Mode Admin dinonaktifkan', 'success');
    } else {
      setPinModalOpen(true);
    }
  };

  const handlePinSubmit = (pin) => {
    if (pin === 'KKN057') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      showToast('Mode Admin aktif', 'success');
      setPinModalOpen(false);
      return true; // Success
    }
    return false; // Failed
  };

  /* ── Fetch Data from Supabase ── */
  const fetchActivities = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('kegiatan')
        .select('*')
        .order('tanggal', { ascending: true })
        .order('waktu_mulai', { ascending: true });

      if (error) throw error;
      setActivities(data || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      showToast('❌ Gagal mengambil data jadwal', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  /* ── Counts per week ── */
  const countsByWeek = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0 };
    activities.forEach((a) => { counts[a.minggu_ke] = (counts[a.minggu_ke] || 0) + 1; });
    return counts;
  }, [activities]);

  /* ── Displayed (filtered + sorted) ── */
  const displayed = useMemo(() => {
    let list = activities.filter((a) => a.minggu_ke === activeWeek);

    if (katFilter !== 'all') {
      list = list.filter((a) => a.kategori === katFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.keterangan.toLowerCase().includes(q) ||
          a.pj.toLowerCase().includes(q) ||
          (a.catatan && a.catatan.toLowerCase().includes(q)),
      );
    }

    return list;
  }, [activities, activeWeek, katFilter, searchQuery]);

  /* ── CRUD ── */
  const handleSave = useCallback(async (activity) => {
    try {
      if (activity.id && !String(activity.id).startsWith('temp-')) {
        // UPDATE existing
        const { data, error } = await supabase
          .from('kegiatan')
          .update({
            minggu_ke: activity.minggu_ke,
            tanggal: activity.tanggal,
            waktu_mulai: activity.waktu_mulai,
            waktu_selesai: activity.waktu_selesai,
            keterangan: activity.keterangan,
            pj: activity.pj,
            catatan: activity.catatan,
            kategori: activity.kategori
          })
          .eq('id', activity.id)
          .select()
          .single();

        if (error) throw error;
        setActivities((prev) => prev.map((a) => (a.id === activity.id ? data : a)));
        showToast('✅ Kegiatan berhasil diperbarui!');
      } else {
        // INSERT new
        const { id, ...newActivityData } = activity;
        const { data, error } = await supabase
          .from('kegiatan')
          .insert([newActivityData])
          .select()
          .single();

        if (error) throw error;
        // Insert into local state and sort
        setActivities((prev) => {
          const updated = [...prev, data];
          updated.sort((a, b) => {
            if (a.tanggal !== b.tanggal) return a.tanggal.localeCompare(b.tanggal);
            return a.waktu_mulai.localeCompare(b.waktu_mulai);
          });
          return updated;
        });
        showToast('✅ Kegiatan berhasil ditambahkan!');
      }
    } catch (err) {
      console.error('Error saving data:', err);
      showToast('❌ Gagal menyimpan kegiatan', 'error');
    }
  }, [showToast]);

  const handleEdit = useCallback((activity) => { setEditTarget(activity); setModalOpen(true); }, []);
  const handleDeleteClick = useCallback((id) => { setDeleteTarget(activities.find((a) => a.id === id)); }, [activities]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!deleteTarget) return;
    try {
      const { error } = await supabase
        .from('kegiatan')
        .delete()
        .eq('id', deleteTarget.id);

      if (error) throw error;

      setActivities((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      showToast('🗑️ Kegiatan berhasil dihapus.');
    } catch (err) {
      console.error('Error deleting data:', err);
      showToast('❌ Gagal menghapus kegiatan', 'error');
    } finally {
      setDeleteTarget(null);
    }
  }, [deleteTarget, showToast]);

  const openAddModal = () => { setEditTarget(null); setModalOpen(true); };

  /* ── Export ── */
  const handleExport = useCallback(() => {
    try {
      setExporting(true);
      exportToExcel(activities);
      showToast('📥 Jadwal berhasil diekspor ke Excel!');
    } catch (err) {
      showToast('❌ Gagal mengekspor. Coba lagi.', 'error');
    } finally {
      setExporting(false);
    }
  }, [activities, showToast]);

  const clearFilters = () => { setSearchQuery(''); setKatFilter('all'); };
  const hasFilter = searchQuery.trim() || katFilter !== 'all';

  return (
    <div className="min-h-screen pb-16" style={{ background: '#f5f9f6', fontFamily: 'Inter, sans-serif' }}>
      <Header totalActivities={activities.length} isAdmin={isAdmin} onToggleAdmin={handleToggleAdmin} />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 space-y-4">

        {/* ── Top toolbar ── */}
        <div className="flex flex-col gap-3">

          {/* Row 1: Week tabs + Export */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <WeekTabs
              activeWeek={activeWeek}
              onWeekChange={(w) => { setActiveWeek(w); setSearchQuery(''); setKatFilter('all'); }}
              countsByWeek={countsByWeek}
            />

            <div className="flex gap-2 shrink-0">
              {/* Export button */}
              <button
                id="export-excel-btn"
                onClick={handleExport}
                disabled={exporting || isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm
                           border-2 border-green-700 text-green-800 bg-white
                           hover:bg-green-700 hover:text-white transition-all cursor-pointer
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Download size={15} />
                <span className="hidden sm:inline">{exporting ? 'Mengekspor…' : 'Export Excel'}</span>
                <span className="sm:hidden">Excel</span>
              </button>

              {/* Add button (Desktop) */}
              {isAdmin && (
                <button
                  id="add-activity-btn"
                  onClick={openAddModal}
                  disabled={isLoading}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-white
                             whitespace-nowrap transition-all cursor-pointer hover:opacity-90 active:scale-95
                             fab-pulse shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'linear-gradient(135deg, #004d26, #006633)' }}
                >
                  <Plus size={16} strokeWidth={2.5} />
                  <span className="hidden sm:inline">Tambah Kegiatan</span>
                  <span className="sm:hidden">Tambah</span>
                </button>
              )}
            </div>
          </div>

          {/* Row 2: Search + Category filters */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: '#006633' }} />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kegiatan, PJ, catatan…"
                className="pl-8 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-white
                           focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100
                           w-full sm:w-56 transition-all"
              />
            </div>

            {/* Category filter pills */}
            <div className="flex gap-1.5 flex-wrap">
              {KAT_FILTERS.map(({ value, label, emoji }) => (
                <button
                  key={value}
                  id={`filter-${value}`}
                  onClick={() => setKatFilter(value)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold
                             border transition-all cursor-pointer"
                  style={katFilter === value
                    ? { background: '#006633', color: '#fff', borderColor: '#006633' }
                    : { background: '#fff', color: '#555', borderColor: '#e5e7eb' }}
                >
                  <span>{emoji}</span> {label}
                </button>
              ))}

              {hasFilter && (
                <button onClick={clearFilters}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium
                             text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 transition-all cursor-pointer">
                  <XIcon size={11} /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Schedule card ── */}
        <div className="glass-card p-0 overflow-hidden min-h-[400px]">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3 border-b"
            style={{ borderColor: '#e0ede6', background: 'linear-gradient(90deg, #fafffe, #f4fcf7)' }}>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-2 h-2 rounded-full" style={{ background: '#006633' }} />
              <span className="font-bold text-sm text-gray-800">
                Jadwal Minggu Ke-{activeWeek}
              </span>
              {!isLoading && displayed.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: '#e6f4ee', color: '#006633' }}>
                  {displayed.length} kegiatan
                </span>
              )}
              {hasFilter && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                  Filter aktif
                </span>
              )}
            </div>

            {/* Legend */}
            <div className="hidden lg:flex items-center gap-3">
              {[
                { emoji: '🕌', label: 'Ibadah', color: '#16a34a' },
                { emoji: '🏃', label: 'Rutin', color: '#6b7280' },
                { emoji: '🎯', label: 'Proker', color: '#2563eb' },
                { emoji: '📊', label: 'Evaluasi', color: '#7c3aed' },
                { emoji: '💤', label: 'Istirahat', color: '#d97706' },
              ].map(({ emoji, label, color }) => (
                <span key={label} className="flex items-center gap-1 text-[10px] text-gray-500">
                  <span className="w-2 h-2 rounded-full inline-block" style={{ background: color }} />
                  {emoji} {label}
                </span>
              ))}
            </div>
          </div>

          {/* Table / Empty / Loading */}
          <div className="p-3 sm:p-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-green-700">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="font-medium">Memuat Jadwal KKN dari Supabase...</p>
              </div>
            ) : displayed.length > 0 ? (
              <ScheduleTable
                activities={displayed}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
                onViewDaily={(date) => setSelectedDateForModal(date)}
                isAdmin={isAdmin}
              />
            ) : (
              <EmptyState weekNumber={activeWeek} />
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 pb-4">
          © 2026 KKN 057 Persyarikatan Muhammadiyah &nbsp;·&nbsp; Sistem Manajemen Jadwal
        </p>
      </main>

      {/* FAB (mobile) */}
      {isAdmin && (
        <button
          id="fab-add-btn"
          onClick={openAddModal}
          disabled={isLoading}
          className="fixed bottom-6 right-6 sm:hidden w-14 h-14 rounded-full text-white shadow-xl
                     flex items-center justify-center fab-pulse cursor-pointer z-40
                     hover:scale-110 active:scale-95 transition-transform
                     disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(135deg, #004d26, #006633)' }}
          aria-label="Tambah Kegiatan"
        >
          <Plus size={26} strokeWidth={2.5} />
        </button>
      )}

      {/* Modals */}
      <ActivityModal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        onSave={handleSave} initialData={editTarget} />

      <DeleteConfirmModal isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm} activityName={deleteTarget?.keterangan ?? ''} />

      <DailyScheduleModal
        isOpen={Boolean(selectedDateForModal)}
        onClose={() => setSelectedDateForModal(null)}
        date={selectedDateForModal}
        activities={activities}
      />

      <PinModal
        isOpen={pinModalOpen}
        onClose={() => setPinModalOpen(false)}
        onSubmit={handlePinSubmit}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
