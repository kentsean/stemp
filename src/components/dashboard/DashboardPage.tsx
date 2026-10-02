import React from 'react';
import { useApp } from '../../context/AppContext';
import { CANONICAL_ACTIVITIES, CanonicalActivity } from '../../data/canonicalActivities';
import { 
  Play, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Users, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Usb,
  RotateCcw
} from 'lucide-react';
import robotCarThumb from '../../assets/images/robot_car_craft_1789458134194.jpg';
import windmillThumb from '../../assets/images/windmill_craft_1789458157800.jpg';
import plantWatererThumb from '../../assets/images/plant_waterer_1789458175653.jpg';

export const DashboardPage: React.FC = () => {
  const { 
    teacherProfile, 
    startActivityJourney, 
    setCurrentView, 
    deviceState,
    connectWithDemo,
    connectWithWebSerial 
  } = useApp();

  const isConnected = deviceState.status === 'connected';

  const recentActivities = [
    CANONICAL_ACTIVITIES[0], // Mobil Anti-Tabrak
    CANONICAL_ACTIVITIES[2], // Kincir Angin
  ];

  const classIdeas = [
    CANONICAL_ACTIVITIES[1], // Lampu Bel Ceria (Kelas 1-2)
    CANONICAL_ACTIVITIES[3], // Palang Gerbang Tol (Kelas 4-6)
    CANONICAL_ACTIVITIES[4], // Penyiram Tanaman (Kelas 4-6)
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* Top Teacher Greeting Banner */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Portal Guru STEMp · {teacherProfile.schoolName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Selamat pagi, {teacherProfile.name}.
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Mau mulai aktivitas STEM hari ini?
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('activities')}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              Semua Aktivitas
            </button>
            <button
              onClick={() => startActivityJourney(CANONICAL_ACTIVITIES[0], 'hubungkan')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-all flex items-center gap-2 shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Mulai Aktivitas</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Primary Action & Core Status Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Primary Card: Mulai Aktivitas (7 cols) */}
          <div className="md:col-span-7 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                Aktivitas Baru
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Mulai Aktivitas
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed max-w-lg mb-6">
                Hubungkan STEMp Core dan pilih apa yang ingin siswa buat. Panduan langkah demi langkah akan membimbing Anda hingga siap mengajar di kelas.
              </p>

              {/* 6-step roadmap pills */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Alur 6 Langkah Sederhana:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-700">
                  <span>1. Hubungkan</span>
                  <span className="text-slate-300">→</span>
                  <span>2. Pilih Fungsi</span>
                  <span className="text-slate-300">→</span>
                  <span>3. Pilih Proyek</span>
                  <span className="text-slate-300">→</span>
                  <span>4. Rakit</span>
                  <span className="text-slate-300">→</span>
                  <span>5. Uji</span>
                  <span className="text-slate-300">→</span>
                  <span className="text-blue-600 font-bold">6. Siap Mengajar</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => startActivityJourney(CANONICAL_ACTIVITIES[0], 'hubungkan')}
              className="w-full sm:w-auto self-start px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Mulai</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Core Status Card (5 cols) */}
          <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Status Perangkat
                </span>
                <span className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              </div>

              <div className="flex items-center gap-3.5 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isConnected 
                    ? deviceState.isDemo ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {isConnected 
                      ? deviceState.isDemo ? 'Demo Core (Mode Simulasi)' : 'STEMp Core (USB-C)'
                      : 'STEMp Core'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isConnected 
                      ? deviceState.isDemo ? 'Mode simulasi aktif tanpa kit fisik' : 'Terhubung ke laptop'
                      : 'Belum terhubung'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                {isConnected
                  ? 'Perangkat siap digunakan untuk merakit dan menguji sensor serta motor bersama siswa.'
                  : 'Sambungkan kabel USB-C ke laptop untuk mendeteksi perangkat, atau gunakan Demo Core untuk mencoba tanpa hardware.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-2 border-t border-slate-100">
              {!isConnected ? (
                <>
                  <button
                    onClick={() => setCurrentView('device')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Usb className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Hubungkan Core</span>
                  </button>
                  <button
                    onClick={() => connectWithDemo()}
                    className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Demo Core</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setCurrentView('device')}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Kelola Sambungan Perangkat</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Section: "Lanjutkan Aktivitas" */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Lanjutkan Aktivitas
            </h3>
            <span className="text-xs text-slate-500">Proyek aktif di kelas</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img 
                      src={act.id === 'mobil-anti-tabrak' ? robotCarThumb : windmillThumb} 
                      alt={act.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{act.gradeLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{act.durationMinutes} Menit</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">
                      {act.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                      {act.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => startActivityJourney(act, 'rakit')}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Lanjutkan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Third Section: "Ide untuk kelas Anda" */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Ide untuk kelas Anda
              </h3>
              <p className="text-xs text-slate-500">
                Rekomendasi kurikulum terstruktur yang sesuai untuk siswa SD
              </p>
            </div>
            <button
              onClick={() => setCurrentView('activities')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Lihat Katalog Lengkap →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {classIdeas.map((act) => (
              <div
                key={act.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                    <span>{act.gradeLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{act.durationMinutes} Menit</span>
                    <span aria-hidden="true">·</span>
                    <span>{act.difficulty}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {act.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {act.subtitle}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-700 space-y-1 mb-4">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                      Yang dipelajari:
                    </span>
                    <p className="text-slate-600 text-[11px] leading-relaxed">
                      {act.learningGoals[0]}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => startActivityJourney(act, 'hubungkan')}
                  className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Pilih Aktivitas Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
