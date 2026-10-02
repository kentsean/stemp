import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  BookOpen, 
  GraduationCap, 
  X 
} from 'lucide-react';

interface TeacherOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeacherOnboardingModal: React.FC<TeacherOnboardingModalProps> = ({ isOpen, onClose }) => {
  const { 
    teacherProfile, 
    setTeacherProfile, 
    setCurrentView, 
    startActivityJourney,
    startTwoMinuteDemo,
    showToast 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGrades, setSelectedGrades] = useState<string[]>(['Kelas 4', 'Kelas 5']);
  const [selectedTheme, setSelectedTheme] = useState<string>('Gerak & Sensor');
  const [hasCore, setHasCore] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleFinish = (action: 'connect' | 'demo') => {
    setTeacherProfile({
      ...teacherProfile,
      gradesTaught: selectedGrades,
      preferredTheme: selectedTheme,
      hasCoreKit: hasCore,
    });
    onClose();

    if (action === 'connect') {
      setCurrentView('device');
      showToast('Profil tersimpan! Silakan sambungkan STEMp Core Anda.', 'success');
    } else {
      startTwoMinuteDemo();
    }
  };

  const toggleGrade = (g: string) => {
    if (selectedGrades.includes(g)) {
      if (selectedGrades.length > 1) {
        setSelectedGrades(selectedGrades.filter(x => x !== g));
      }
    } else {
      setSelectedGrades([...selectedGrades, g]);
    }
  };

  const gradeOptions = ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 text-slate-900 relative">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
            Langkah {step} dari 3
          </span>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Screen 1: Kelas yang diajar */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Kelas berapa yang paling sering Anda ajar?
            </h3>
            <p className="text-xs text-slate-500">
              Pilih satu atau beberapa tingkatan kelas untuk menyesuaikan rekomendasi proyek.
            </p>

            <div className="grid grid-cols-3 gap-2">
              {gradeOptions.map((g) => {
                const active = selectedGrades.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() => toggleGrade(g)}
                    className={`py-3 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                      active
                        ? 'border-blue-500 bg-blue-50/80 text-blue-700 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Lanjut</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Screen 2: Topik yang ingin dicoba */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Apa yang paling ingin Anda coba?
            </h3>
            <p className="text-xs text-slate-500">
              Pilih fokus aktivitas pertama yang ingin dikenalkan ke siswa.
            </p>

            <div className="space-y-2">
              {[
                { title: 'Gerak & Kendaraan', desc: 'Mobil robot, roda, dan putaran motor' },
                { title: 'Sensor & Lingkungan', desc: 'Jarak ultrasonik, sensor cahaya, sensor tanah' },
                { title: 'Lampu & Suara Ceria', desc: 'LED tombol, bel suara, dan mekanisme gerbang' },
                { title: 'Belum tahu — tunjukkan contoh', desc: 'Tampilkan kurikulum lengkap bertahap' },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => setSelectedTheme(item.title)}
                  className={`w-full p-3 rounded-xl text-left border transition-all ${
                    selectedTheme === item.title
                      ? 'border-blue-500 bg-blue-50/80 text-blue-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <p className="text-xs font-bold">{item.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
              >
                Kembali
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-2/3 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Lanjut</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Screen 3: Sudah punya STEMp Core? */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Sudah punya kit fisik STEMp Core?
            </h3>
            <p className="text-xs text-slate-500">
              Jangan khawatir jika belum membawa kit fisik. Mode Demo kami siap mensimulasikan semua proyek.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setHasCore(true)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  hasCore
                    ? 'border-blue-500 bg-blue-50/80 text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <Cpu className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-xs font-bold">Sudah Punya</p>
                <p className="text-[11px] text-slate-500 mt-1">Kit fisik ada di meja</p>
              </button>

              <button
                onClick={() => setHasCore(false)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  !hasCore
                    ? 'border-amber-500 bg-amber-50/80 text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <Sparkles className="w-5 h-5 text-amber-500 mb-2" />
                <p className="text-xs font-bold">Belum Punya</p>
                <p className="text-[11px] text-slate-500 mt-1">Coba dulu dengan simulasi</p>
              </button>
            </div>

            <div className="pt-4 flex flex-col gap-2">
              {hasCore ? (
                <button
                  onClick={() => handleFinish('connect')}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Hubungkan Core Saya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => handleFinish('demo')}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Coba dengan Demo Core</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
