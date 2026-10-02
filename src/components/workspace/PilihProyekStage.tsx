import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CANONICAL_ACTIVITIES, 
  CanonicalActivity, 
  ACTIVITY_BEHAVIORS 
} from '../../data/canonicalActivities';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Clock, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  PackageCheck,
  Hammer
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

export const PilihProyekStage: React.FC = () => {
  const { 
    selectedBehaviorId, 
    canonicalActivity, 
    setCanonicalActivity, 
    setWorkspaceStage, 
    showToast 
  } = useApp();

  const [selectedGradeTab, setSelectedGradeTab] = useState<'semua' | '1-2' | '3-4' | '5-6'>('semua');

  // Filter activities
  const currentBehavior = ACTIVITY_BEHAVIORS.find(b => b.id === selectedBehaviorId);

  let filtered = CANONICAL_ACTIVITIES.filter(act => {
    // If a behavior is selected, prioritize matching behavior, but also allow seeing others
    if (selectedBehaviorId && act.behaviorId === selectedBehaviorId) return true;
    return false;
  });

  // If no exact match for this behavior or user wants all, fallback to all activities
  if (filtered.length === 0) {
    filtered = CANONICAL_ACTIVITIES;
  }

  // Grade filtering
  if (selectedGradeTab === '1-2') {
    filtered = filtered.filter(a => a.gradeMin <= 2);
  } else if (selectedGradeTab === '3-4') {
    filtered = filtered.filter(a => a.gradeMin >= 3 && a.gradeMax <= 4);
  } else if (selectedGradeTab === '5-6') {
    filtered = filtered.filter(a => a.gradeMax >= 5);
  }

  const handleSelectActivity = (act: CanonicalActivity) => {
    setCanonicalActivity(act);
    setWorkspaceStage('rakit');
    showToast(`Proyek "${act.title}" dipilih! Siap mulai merakit.`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Pilih Proyek Rakitan Fisik
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          {currentBehavior ? (
            <span>
              Proyek yang cocok untuk fungsi <strong className="text-slate-900">"{currentBehavior.title}"</strong>:
            </span>
          ) : (
            'Pilih salah satu proyek berbasis material sederhana dan modul elektronik.'
          )}
        </p>
      </div>

      {/* Grade Level Filter Controls */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100 rounded-xl max-w-md mx-auto mb-8">
        <button
          onClick={() => setSelectedGradeTab('semua')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            selectedGradeTab === 'semua'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Semua Kelas
        </button>
        <button
          onClick={() => setSelectedGradeTab('1-2')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            selectedGradeTab === '1-2'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kelas 1–2 (Pemula)
        </button>
        <button
          onClick={() => setSelectedGradeTab('3-4')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            selectedGradeTab === '3-4'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kelas 3–4
        </button>
        <button
          onClick={() => setSelectedGradeTab('5-6')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            selectedGradeTab === '5-6'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Kelas 5–6
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((act) => {
          const isSelected = canonicalActivity.id === act.id;
          const imageSrc = THUMB_MAP[act.id] || robotCarThumb;

          return (
            <div
              key={act.id}
              className={`bg-white rounded-2xl border transition-all overflow-hidden flex flex-col ${
                isSelected
                  ? 'border-blue-500 shadow-md ring-1 ring-blue-500'
                  : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {/* Card Image Banner */}
              <div className="relative h-44 bg-slate-100 overflow-hidden">
                <img
                  src={imageSrc}
                  alt={act.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
                    {act.gradeLabel} · {act.subject}
                  </span>
                  <h3 className="text-lg font-bold leading-tight drop-shadow-xs">
                    {act.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with separators per design constitution */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 font-medium">
                    <span>{act.gradeLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{act.durationMinutes} Menit</span>
                    <span aria-hidden="true">·</span>
                    <span>{act.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span>4–5 Siswa / Kelompok</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {act.subtitle}
                  </p>

                  {/* Yang Dipelajari (Educational Value First) */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 mb-4 text-left">
                    <span className="text-[11px] font-bold text-blue-900 block mb-1">
                      Yang Dipelajari Siswa:
                    </span>
                    <p className="text-xs text-blue-800/90 leading-relaxed">
                      {act.learningGoals[0]}
                    </p>
                  </div>

                  {/* Modules & Craft Materials */}
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium">Elektronik:</span>
                      <span className="font-medium text-slate-800">
                        {act.requiredModules.map(m => m.name).join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium">Material:</span>
                      <span className="text-slate-700">
                        {act.materials.filter(m => !m.isElectronic).map(m => m.name).slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-slate-500">
                    {act.buildSteps.length} Langkah Rakit
                  </span>
                  <button
                    onClick={() => handleSelectActivity(act)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Pilih Proyek</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setWorkspaceStage('fungsi')}
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Pilih Fungsi</span>
        </button>

        <span className="text-xs text-slate-400">
          Langkah 3 dari 6: Pilih Proyek
        </span>
      </div>
    </div>
  );
};
