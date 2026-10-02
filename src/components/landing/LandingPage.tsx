import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FunnectCanvas3D } from '../3d/FunnectCanvas3D';
import { CANONICAL_ACTIVITIES } from '../../data/canonicalActivities';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  RotateCw, 
  Laptop, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  Award, 
  Leaf, 
  ArrowUp, 
  CornerUpRight, 
  Square,
  Check,
  Package,
  Layers,
  ChevronRight,
  Clock,
  ExternalLink
} from 'lucide-react';
import stempCoreImg from '../../assets/images/stemp_core_hub_1790925253089.jpg';
import classroomImg from '../../assets/images/classroom_craft_workshop_1790925275636.jpg';
import robotCarImg from '../../assets/images/robot_car_craft_1789458134194.jpg';
import windmillImg from '../../assets/images/windmill_craft_1789458157800.jpg';
import plantImg from '../../assets/images/plant_waterer_1789458175653.jpg';
import barrierImg from '../../assets/images/barrier_gate_1789458206586.jpg';

export const LandingPage: React.FC = () => {
  const { 
    startTwoMinuteDemo, 
    setCurrentView, 
    startActivityJourney, 
    setSensorValue,
    simulation,
    toggleSimulation 
  } = useApp();

  const [heroActiveBehavior, setHeroActiveBehavior] = useState<'maju' | 'belok' | 'berhenti'>('maju');
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);

  const creationsAroundCore = [
    { title: 'Mobil Anti-Tabrak', desc: 'Berhenti otomatis saat ada objek rintangan di depan', grade: 'Kelas 4–5', modules: 'Sensor Ultrasonik + 2 Motor', img: robotCarImg, activityId: 'mobil-anti-tabrak' },
    { title: 'Kincir Mini', desc: 'Baling-baling berputar saat terkena cahaya matahari', grade: 'Kelas 3–4', modules: 'Sensor Cahaya + Motor DC', img: windmillImg, activityId: 'kincir-mini' },
    { title: 'Lampu Pintar', desc: 'Otomatis menyala terang saat lingkungan mulai gelap', grade: 'Kelas 3–5', modules: 'Sensor Cahaya + LED', img: barrierImg, activityId: 'lampu-pintar' },
    { title: 'Gerbang Otomatis', desc: 'Palang parkir terangkat saat mendeteksi mobil datang', grade: 'Kelas 4–6', modules: 'Sensor Ultrasonik + Servo + LED', img: barrierImg, activityId: 'gerbang-otomatis' },
    { title: 'Alarm Banjir', desc: 'Mendeteksi batas permukaan air dan membunyikan sirine', grade: 'Kelas 4–6', modules: 'Sensor Air + Buzzer', img: plantImg, activityId: 'penyiram-tanaman' },
    { title: 'Penyiram Tanaman', desc: 'Irigasi cerdas menyiram saat kelembapan tanah kering', grade: 'Kelas 4–6', modules: 'Sensor Tanah + Servo Katup', img: plantImg, activityId: 'penyiram-tanaman' },
    { title: 'Karya Seni Kinetik', desc: 'Patung gerak mekanik dengan kecepatan putar variabel', grade: 'Kelas 3–6', modules: 'Motor + Potensiometer', img: robotCarImg, activityId: 'mobil-anti-tabrak' },
  ];

  const handleHeroBehaviorClick = (behavior: 'maju' | 'belok' | 'berhenti') => {
    setHeroActiveBehavior(behavior);
    if (!simulation.isRunning) {
      toggleSimulation();
    }

    if (behavior === 'maju') {
      setSensorValue('distance', 60);
    } else if (behavior === 'belok') {
      setSensorValue('distance', 40);
    } else if (behavior === 'berhenti') {
      setSensorValue('distance', 10);
    }
  };

  return (
    <div className="flex flex-col bg-[#F8FAFC] text-slate-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content (6.5 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet unboxed eyebrow per frontend design rules */}
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Platform Pembelajaran STEM untuk SD</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-[1.12] text-balance">
                Satu Core. Banyak Cara untuk Belajar.
              </h1>

              {/* Supporting Body */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                STEMp membantu guru mengubah konsep STEM menjadi proyek nyata yang dapat dirakit, diprogram, diuji, dan dikembangkan siswa—tanpa coding atau wiring yang rumit.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={startTwoMinuteDemo}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Coba Demo 2 Menit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setCurrentView('login')}
                  className="px-5 py-3.5 rounded-xl bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Masuk sebagai Guru</span>
                </button>
              </div>

              {/* Trust Line & Optional Signup Link */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-500 font-medium">
                <span>Khusus SD Kelas 1–6 · Visual Blocks · Material sederhana · Elektronik dapat digunakan ulang</span>
                <span className="hidden sm:inline" aria-hidden="true">·</span>
                <button 
                  onClick={() => setCurrentView('login')}
                  className="text-blue-600 hover:text-blue-700 font-semibold underline text-left"
                >
                  Buat Akun Guru
                </button>
              </div>
            </div>

            {/* Right Interactive 3D STEMp Project (5.5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-semibold text-slate-800">Model Fisik: Mobil STEMp</span>
                  </div>
                  <span className="text-slate-400 font-medium">3D Interaktif</span>
                </div>

                {/* 3D Canvas Box */}
                <div className="relative w-full h-[280px] sm:h-[320px] bg-slate-950 rounded-xl overflow-hidden shadow-inner">
                  <FunnectCanvas3D
                    assemblyStage={4}
                    showLabelsProp={false}
                    className="w-full h-full"
                  />

                  {/* Behavior Response Indicator Overlay */}
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-xs text-white">
                    <span className="text-slate-400">Respon: </span>
                    <span className="font-bold text-cyan-400 capitalize">{heroActiveBehavior}</span>
                  </div>
                </div>

                {/* Behavior Click Chips that interactively drive the 3D model */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">Coba Respon:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleHeroBehaviorClick('maju')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                        heroActiveBehavior === 'maju'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                      <span>Maju</span>
                    </button>

                    <button
                      onClick={() => handleHeroBehaviorClick('belok')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                        heroActiveBehavior === 'belok'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <CornerUpRight className="w-3.5 h-3.5" />
                      <span>Belok</span>
                    </button>

                    <button
                      onClick={() => handleHeroBehaviorClick('berhenti')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                        heroActiveBehavior === 'berhenti'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Berhenti</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LANDING STORY: "Dari kabel ke karya, dalam beberapa langkah." */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
              Alur Belajar Sederhana
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              Dari kabel ke karya, dalam beberapa langkah.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Guru tidak perlu mengerti kode rumit atau menyolder sirkuit elektronik.
            </p>
          </div>

          {/* 5-Step Visual Narrative Sequence */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mb-3">
                  01
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Hubungkan STEMp Core
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Colokkan kabel USB-C ke laptop. Sistem mendeteksi perangkat secara otomatis tanpa install driver rumit.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                USB-C Plug & Play
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mb-3">
                  02
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Pilih Apa yang Ingin Dilakukan
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tentukan perilaku: "Bergerak Maju", "Berhenti saat ada objek", atau "Menyala saat gelap".
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                Bahasa Sehari-hari
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mb-3">
                  03
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Pilih Ide Proyek
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pilih rancangan fisik sesuai tingkatan kelas (Kelas 1–2, 3–4, atau 5–6) dengan estimasi waktu jelas.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                Kurikulum Terstruktur
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mb-3">
                  04
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Rakit Bersama Siswa
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gunakan stik es krim, kardus, dan modul elektronik modular mengikuti panduan visual 3D langkah demi langkah.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
                Material Sederhana
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-300 transition-colors">
              <div>
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center mb-3">
                  05
                </span>
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Uji dan Perbaiki
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Uji respon di layar dan fisik. Siswa belajar dari uji coba nyata: gagal, perbaiki, dan berhasil!
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-emerald-700 font-medium">
                Pembelajaran Iteratif
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "ONE CORE, MANY CREATIONS" SECTION */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
              Satu Sistem Berkelanjutan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Satu Core. Banyak Karya.
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Elektroniknya digunakan kembali. Yang berubah adalah ide siswanya.
            </p>
          </div>

          {/* Central Hub with Radial Student Creations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Center Visual: The STEMp Core (5 cols) */}
            <div className="md:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-4">
                <img 
                  src={stempCoreImg} 
                  alt="STEMp Core" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Otak Utama</span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">STEMp Core Controller</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mb-4">
                Dilengkapi 6 port modular terpadu (Port A–F) untuk sensor, motor, dan output tanpa kabel jumper yang rumit.
              </p>

              <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-around text-xs text-slate-500 font-medium">
                <span>6 Port Modular</span>
                <span aria-hidden="true">·</span>
                <span>Koneksi USB-C</span>
                <span aria-hidden="true">·</span>
                <span>Aman 5V Kelas</span>
              </div>
            </div>

            {/* Creations List (7 cols) */}
            <div className="md:col-span-7 space-y-3">
              {creationsAroundCore.slice(0, 4).map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const act = CANONICAL_ACTIVITIES.find(a => a.id === c.activityId);
                    if (act) startActivityJourney(act, 'hubungkan');
                  }}
                  className="p-4 bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs rounded-xl cursor-pointer transition-all flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                      <img src={c.img} alt={c.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {c.title}
                        </h4>
                        <span className="text-[11px] font-medium text-slate-500">({c.grade})</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{c.desc}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline text-[11px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">
                      {c.modules}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. "BUKAN SEKADAR ROBOT KIT" (4 Concise Editorial Cards) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Bukan sekadar robot kit.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              STEMp dirancang dari sudut pandang ruang kelas sekolah dasar di Indonesia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                  01. Mulai dari Belajar
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Tujuan Belajar, Bukan Pin
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Guru memilih aktivitas dan capaian pembelajaran, bukan pusing menghafal nomor pin GPIO atau tegangan listrik.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                  02. Material Sekitar
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Kardus, Stik & Botol
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Gunakan bahan sederhana yang mudah didapat di sekitar kelas: stik es krim, kardus bekas, sedotan, dan karet gelang.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                  03. Pakai Berulang Kali
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Teknologi Reusable
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Core dan modul elektronik dapat dilepas kembali tanpa rusak untuk proyek kelas berikutnya minggu depan.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                  04. Coba & Perbaiki
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Belajar Melalui Iterasi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Rakit, uji, perbaiki, lalu coba lagi. Siswa belajar bahwa kegagalan pertama adalah bagian dari rekayasa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSTITUTIONAL VALUE: "Dibuat untuk kelas. Dirancang untuk digunakan kembali." */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
              Nilai Bagi Sekolah & Guru
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              Dibuat untuk kelas. Dirancang untuk digunakan kembali.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Untuk Guru */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                Untuk Guru SD
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Percaya Diri Mengajar STEM
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Panduan langkah demi langkah tanpa wiring yang rumit. Dilengkapi rencana pelaksanaan pembelajaran (RPP 60 menit) siap cetak.
              </p>
            </div>

            {/* Untuk Siswa */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                Untuk Siswa
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Eksperimen Nyata yang Menyenangkan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Belajar melalui eksperimen tangan, mengamati sensor bereaksi, dan berkolaborasi memecahkan masalah dalam kelompok.
              </p>
            </div>

            {/* Untuk Sekolah */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-xs">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                Untuk Sekolah
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                Investasi Hemat & Berkelanjutan
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Satu sistem elektronik dapat digunakan untuk puluhan ragam aktivitas berbeda dari kelas 1 sampai kelas 6 sepanjang tahun ajaran.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SUSTAINABILITY: "Bongkar proyeknya. Gunakan teknologinya lagi." */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-4 border border-emerald-200">
            <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            <span>Keberlanjutan & Teknologi Tepat Guna</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Bongkar proyeknya. Gunakan teknologinya lagi.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Struktur fisik kardus dan kayu siswa boleh dibawa pulang atau didaur ulang. Modul elektronik STEMp Core tetap awet untuk aktivitas siswa di kelas berikutnya.
          </p>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6">
            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">Minggu 1</span>
              <p className="text-sm font-bold text-slate-900">Mobil Anti-Tabrak</p>
              <span className="text-[11px] text-slate-500">Sensor Ultrasonik + 2 Motor</span>
            </div>

            <div className="text-slate-300 font-bold hidden md:block">→ Lepas Modul →</div>

            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">Minggu 2</span>
              <p className="text-sm font-bold text-slate-900">Kincir Angin Surya</p>
              <span className="text-[11px] text-slate-500">Sensor Cahaya + 1 Motor</span>
            </div>

            <div className="text-slate-300 font-bold hidden md:block">→ Lepas Modul →</div>

            <div className="text-center">
              <span className="text-xs font-bold text-slate-400 block mb-1">Minggu 3</span>
              <p className="text-sm font-bold text-slate-900">Penyiram Tanaman</p>
              <span className="text-[11px] text-slate-500">Sensor Tanah + Servo Katup</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CONVERSION ACTION */}
      <section className="py-16 sm:py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Siap membawa pembelajaran STEM nyata ke kelas Anda?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Coba alur kerja lengkap dalam demo 2 menit sekarang, atau masuk dengan akun guru untuk mengelola kelas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={startTwoMinuteDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Coba Demo 2 Menit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('login')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all"
            >
              <span>Masuk sebagai Guru</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
