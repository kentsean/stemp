import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CANONICAL_ACTIVITIES } from '../../data/canonicalActivities';
import { 
  Users, 
  Plus, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Play, 
  X,
  School
} from 'lucide-react';

interface ClassroomGroup {
  id: string;
  className: string;
  gradeLevel: string;
  studentCount: number;
  activeActivityTitle: string;
  teams: {
    name: string;
    membersCount: number;
    status: 'Rakit Sasis' | 'Pasang Sensor' | 'Sedang Uji' | 'Selesai';
  }[];
}

export const ClassesPage: React.FC = () => {
  const { startActivityJourney, showToast } = useApp();

  const [classesList, setClassesList] = useState<ClassroomGroup[]>([
    {
      id: 'cls-4a',
      className: 'Kelas 4A (SDN Sukamaju 01)',
      gradeLevel: 'Kelas 4',
      studentCount: 28,
      activeActivityTitle: 'Mobil Anti-Tabrak',
      teams: [
        { name: 'Kelompok 1 (Garuda)', membersCount: 5, status: 'Sedang Uji' },
        { name: 'Kelompok 2 (Merpati)', membersCount: 5, status: 'Pasang Sensor' },
        { name: 'Kelompok 3 (Rajawali)', membersCount: 4, status: 'Rakit Sasis' },
        { name: 'Kelompok 4 (Elang)', membersCount: 5, status: 'Selesai' },
        { name: 'Kelompok 5 (Kancil)', membersCount: 5, status: 'Rakit Sasis' },
        { name: 'Kelompok 6 (Badak)', membersCount: 4, status: 'Pasang Sensor' },
      ],
    },
    {
      id: 'cls-5b',
      className: 'Kelas 5B (SDN Sukamaju 01)',
      gradeLevel: 'Kelas 5',
      studentCount: 26,
      activeActivityTitle: 'Palang Gerbang Tol Pintar',
      teams: [
        { name: 'Kelompok 1 (Inovator)', membersCount: 5, status: 'Selesai' },
        { name: 'Kelompok 2 (Kreator)', membersCount: 4, status: 'Sedang Uji' },
        { name: 'Kelompok 3 (Pionir)', membersCount: 5, status: 'Pasang Sensor' },
        { name: 'Kelompok 4 (Penemu)', membersCount: 4, status: 'Sedang Uji' },
        { name: 'Kelompok 5 (Cendikia)', membersCount: 4, status: 'Rakit Sasis' },
        { name: 'Kelompok 6 (Eksplor)', membersCount: 4, status: 'Selesai' },
      ],
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newGradeLevel, setNewGradeLevel] = useState('Kelas 4');
  const [newStudentCount, setNewStudentCount] = useState(25);

  const handleCreateClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim()) return;

    const newClass: ClassroomGroup = {
      id: `cls-${Date.now()}`,
      className: newClassName,
      gradeLevel: newGradeLevel,
      studentCount: newStudentCount,
      activeActivityTitle: 'Mobil Anti-Tabrak',
      teams: [
        { name: 'Kelompok 1', membersCount: 5, status: 'Rakit Sasis' },
        { name: 'Kelompok 2', membersCount: 5, status: 'Rakit Sasis' },
        { name: 'Kelompok 3', membersCount: 5, status: 'Rakit Sasis' },
        { name: 'Kelompok 4', membersCount: 5, status: 'Rakit Sasis' },
      ],
    };

    setClassesList(prev => [...prev, newClass]);
    setShowAddModal(false);
    setNewClassName('');
    showToast(`Kelas "${newClassName}" berhasil ditambahkan!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Manajemen Kelas
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Daftar Kelas & Kelompok Siswa
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Kelola kelompok kerja 4–5 siswa dan pantau tahapan proyek yang sedang dikerjakan di kelas.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Kelas Baru</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        {classesList.map((cls) => (
          <div
            key={cls.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                  <span>{cls.gradeLevel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{cls.studentCount} Siswa</span>
                  <span aria-hidden="true">·</span>
                  <span>{cls.teams.length} Kelompok Kerja</span>
                </div>
                <h2 className="text-xl font-bold text-slate-900">
                  {cls.className}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Aktivitas Saat Ini: <strong className="text-blue-600 font-semibold">{cls.activeActivityTitle}</strong>
                </p>
              </div>

              <button
                onClick={() => {
                  const act = CANONICAL_ACTIVITIES.find(a => a.title === cls.activeActivityTitle) || CANONICAL_ACTIVITIES[0];
                  startActivityJourney(act, 'hubungkan');
                }}
                className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Mulai Sesi Bersama Kelas Ini</span>
              </button>
            </div>

            {/* Teams Grid */}
            <div className="mt-5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Kelompok Kerja Siswa:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cls.teams.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200/70 bg-slate-50/50 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900">{t.name}</h4>
                      <span className="text-[11px] text-slate-500">{t.membersCount} Siswa</span>
                    </div>

                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold ${
                      t.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : t.status === 'Sedang Uji'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Tambah Kelas Baru</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateClass} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Kelas</label>
                <input
                  type="text"
                  required
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Contoh: Kelas 3A, Kelas 6B"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tingkat Kelas</label>
                <select
                  value={newGradeLevel}
                  onChange={(e) => setNewGradeLevel(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-xs"
                >
                  <option value="Kelas 1">Kelas 1</option>
                  <option value="Kelas 2">Kelas 2</option>
                  <option value="Kelas 3">Kelas 3</option>
                  <option value="Kelas 4">Kelas 4</option>
                  <option value="Kelas 5">Kelas 5</option>
                  <option value="Kelas 6">Kelas 6</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Perkiraan Jumlah Siswa</label>
                <input
                  type="number"
                  min="10"
                  max="45"
                  value={newStudentCount}
                  onChange={(e) => setNewStudentCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  Simpan Kelas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
