import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CANONICAL_ACTIVITIES, 
  CanonicalActivity, 
  ACTIVITY_BEHAVIORS 
} from '../../data/canonicalActivities';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  SlidersHorizontal, 
  Play, 
  Check,
  CheckCircle2,
  FileText
} from 'lucide-react';
import robotCarThumb from '../../assets/images/robot_car_craft_1789458134194.jpg';
import windmillThumb from '../../assets/images/windmill_craft_1789458157800.jpg';
import plantWatererThumb from '../../assets/images/plant_waterer_1789458175653.jpg';
import barrierGateThumb from '../../assets/images/barrier_gate_1789458206586.jpg';

const THUMB_MAP: Record<string, string> = {
  'mobil-anti-tabrak': robotCarThumb,
  'kincir-mini': windmillThumb,
  'penyiram-tanaman': plantWatererThumb,
  'gerbang-otomatis': barrierGateThumb,
  'lampu-pintar': barrierGateThumb,
  'lampu-tombol': robotCarThumb,
};

export const ActivitiesPage: React.FC = () => {
  const { startActivityJourney } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<'semua' | '1-2' | '3-4' | '5-6'>('semua');
  const [selectedBehaviorCategory, setSelectedBehaviorCategory] = useState<'semua' | 'GERAK' | 'MERESPONS' | 'OUTPUT'>('semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter activities
  const filtered = CANONICAL_ACTIVITIES.filter((act) => {
    // Grade filter
    if (selectedGrade === '1-2' && act.gradeMin > 2) return false;
    if (selectedGrade === '3-4' && (act.gradeMin > 4 || act.gradeMax < 3)) return false;
    if (selectedGrade === '5-6' && act.gradeMax < 5) return false;

    // Behavior Category filter
    if (selectedBehaviorCategory !== 'semua') {
      const bObj = ACTIVITY_BEHAVIORS.find(b => b.id === act.behaviorId);
      if (bObj && bObj.category !== selectedBehaviorCategory) return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = act.title.toLowerCase().includes(q);
      const matchSub = act.subtitle.toLowerCase().includes(q);
      const matchGoal = act.learningGoals.some(g => g.toLowerCase().includes(q));
      if (!matchTitle && !matchSub && !matchGoal) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Katalog Kurikulum
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Aktivitas STEM untuk SD
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Pilihan proyek pembelajaran tangan nyata untuk Kelas 1 sampai Kelas 6 berbasis material terjangkau.
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            <span>{filtered.length} Aktivitas Tersedia</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Grade Level Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => setSelectedGrade('semua')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedGrade === 'semua'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Kelas
            </button>
            <button
              onClick={() => setSelectedGrade('1-2')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedGrade === '1-2'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelas 1–2 (Pemula)
            </button>
            <button
              onClick={() => setSelectedGrade('3-4')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedGrade === '3-4'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelas 3–4
            </button>
            <button
              onClick={() => setSelectedGrade('5-6')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedGrade === '5-6'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kelas 5–6
            </button>
          </div>

          {/* Behavior Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            <button
              onClick={() => setSelectedBehaviorCategory('semua')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedBehaviorCategory === 'semua'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Perilaku
            </button>
            <button
              onClick={() => setSelectedBehaviorCategory('GERAK')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedBehaviorCategory === 'GERAK'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gerak
            </button>
            <button
              onClick={() => setSelectedBehaviorCategory('MERESPONS')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedBehaviorCategory === 'MERESPONS'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Merespons
            </button>
            <button
              onClick={() => setSelectedBehaviorCategory('OUTPUT')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedBehaviorCategory === 'OUTPUT'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Output
            </button>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari aktivitas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto">
            <p className="text-sm font-semibold text-slate-700">Tidak ada aktivitas yang sesuai filter.</p>
            <button
              onClick={() => {
                setSelectedGrade('semua');
                setSelectedBehaviorCategory('semua');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-blue-600 font-semibold hover:underline"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((act) => {
              const imageSrc = THUMB_MAP[act.id] || robotCarThumb;

              return (
                <div
                  key={act.id}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={imageSrc}
                        alt={act.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                          {act.gradeLabel} · {act.subject}
                        </span>
                        <h3 className="text-base font-bold leading-tight drop-shadow-xs">
                          {act.title}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2.5">
                        <span>{act.durationMinutes} Menit</span>
                        <span aria-hidden="true">·</span>
                        <span>{act.difficulty}</span>
                        <span aria-hidden="true">·</span>
                        <span>4–5 Siswa</span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {act.subtitle}
                      </p>

                      {/* Educational Learning Outcome (Teacher Language) */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs mb-4">
                        <span className="text-[11px] font-bold text-slate-700 block mb-1 uppercase tracking-wider">
                          Yang Dipelajari:
                        </span>
                        <p className="text-slate-600 text-[11px] leading-relaxed">
                          {act.learningGoals[0]}
                        </p>
                      </div>

                      {/* Required Hardware & Craft */}
                      <div className="space-y-1 text-xs text-slate-500">
                        <p className="truncate">
                          <strong className="text-slate-700 font-semibold">Elektronik:</strong>{' '}
                          {act.requiredModules.map(m => m.name).join(', ')}
                        </p>
                        <p className="truncate">
                          <strong className="text-slate-700 font-semibold">Bahan:</strong>{' '}
                          {act.materials.filter(m => !m.isElectronic).map(m => m.name).slice(0, 3).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => startActivityJourney(act, 'hubungkan')}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Mulai Aktivitas</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
