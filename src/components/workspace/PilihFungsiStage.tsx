import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ACTIVITY_BEHAVIORS, 
  CANONICAL_ACTIVITIES 
} from '../../data/canonicalActivities';
import { 
  ArrowUp, 
  RotateCw, 
  CornerUpRight, 
  ShieldAlert, 
  SunMedium, 
  Droplets, 
  ToggleLeft, 
  SlidersHorizontal, 
  Lightbulb, 
  Volume2, 
  ArrowRight,
  Check
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ArrowUp,
  RotateCw,
  CornerUpRight,
  ShieldAlert,
  SunMedium,
  Droplets,
  ToggleLeft,
  SlidersHorizontal,
  Lightbulb,
  Volume2,
};

export const PilihFungsiStage: React.FC = () => {
  const { 
    selectedBehaviorId, 
    setSelectedBehaviorId, 
    setWorkspaceStage, 
    setCanonicalActivity,
    showToast 
  } = useApp();

  const handleSelectBehavior = (behaviorId: string) => {
    setSelectedBehaviorId(behaviorId);
    // Find first compatible activity to prepare
    const match = CANONICAL_ACTIVITIES.find(a => a.behaviorId === behaviorId) || CANONICAL_ACTIVITIES[0];
    setCanonicalActivity(match);
  };

  const handleContinue = () => {
    if (!selectedBehaviorId) {
      showToast('Pilih salah satu fungsi terlebih dahulu.', 'error');
      return;
    }
    setWorkspaceStage('proyek');
  };

  // Group behaviors by category
  const categories = [
    { key: 'GERAK', title: 'Kategori 1: Gerak & Putaran' },
    { key: 'MERESPONS', title: 'Kategori 2: Merespons Sensor' },
    { key: 'OUTPUT', title: 'Kategori 3: Aksi & Indikator' },
  ];

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Apa yang ingin proyekmu lakukan?
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Pilih satu fungsi yang ingin siswa bangun. STEMp akan langsung menampilkan ide proyek fisik yang cocok.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {categories.map((cat) => {
          const behaviorsInCat = ACTIVITY_BEHAVIORS.filter(b => b.category === cat.key);
          return (
            <div key={cat.key}>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">
                {cat.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {behaviorsInCat.map((item) => {
                  const Icon = ICON_MAP[item.iconName] || ArrowUp;
                  const isSelected = selectedBehaviorId === item.id;
                  const matchingCount = CANONICAL_ACTIVITIES.filter(a => a.behaviorId === item.id).length;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectBehavior(item.id)}
                      className={`relative p-5 rounded-2xl border text-left transition-all group ${
                        isSelected
                          ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-500'
                          : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {item.shortDescription}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{matchingCount > 0 ? `${matchingCount} Proyek Cocok` : 'Proyek Rekomendasi'}</span>
                        <span className="font-medium text-blue-600 group-hover:underline">Pilih</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="mt-8 sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left w-full sm:w-auto">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Fungsi Terpilih</span>
          <p className="text-sm font-bold text-slate-900">
            {ACTIVITY_BEHAVIORS.find(b => b.id === selectedBehaviorId)?.title || 'Pilih fungsi di atas'}
          </p>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedBehaviorId}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <span>Lihat Rekomendasi Proyek</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
