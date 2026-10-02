import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  Circle, 
  Printer, 
  PlayCircle, 
  Sparkles, 
  BookOpen, 
  Users, 
  Clock, 
  HelpCircle, 
  ArrowLeft,
  Calendar,
  Check,
  Award
} from 'lucide-react';
import classroomWorkshopImg from '../../assets/images/classroom_craft_workshop_1790925275636.jpg';

export const SiapMengajarStage: React.FC = () => {
  const { 
    canonicalActivity, 
    setWorkspaceStage, 
    setCurrentView, 
    showToast 
  } = useApp();

  const [checklist, setChecklist] = useState({
    core: true,
    modules: true,
    tested: true,
    materials: true,
  });

  const [activePhaseIndex, setActivePhaseIndex] = useState<number | null>(null);

  const toggleItem = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrintLessonPlan = () => {
    window.print();
  };

  const handleStartClassSession = () => {
    setCurrentView('classes');
    showToast(`Memulai sesi kelas untuk "${canonicalActivity.title}"!`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Semua Pengujian Berhasil</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Siap untuk dibawa ke kelas.
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Teknologi dan struktur fisik sudah teruji. Berikut panduan langkah demi langkah untuk mengajar di kelas tanpa rasa khawatir.
        </p>
      </div>

      {/* Classroom Hero Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Info (7 cols) */}
          <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between">
            <div>
              {/* Clean metadata without pill clutter */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-2">
                <span>{canonicalActivity.gradeLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{canonicalActivity.durationMinutes} Menit</span>
                <span aria-hidden="true">·</span>
                <span>{canonicalActivity.subject}</span>
                <span aria-hidden="true">·</span>
                <span>4–5 Siswa / Kelompok</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {canonicalActivity.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {canonicalActivity.learningOutcomes}
              </p>

              {/* Teacher Readiness Checklist */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 block mb-1">
                  Daftar Periksa Kesiapan Guru:
                </span>
                
                <button
                  onClick={() => toggleItem('core')}
                  className="w-full flex items-center gap-2.5 text-xs text-left text-slate-700 font-medium hover:text-slate-900"
                >
                  <span className={`w-4 h-4 rounded-md flex items-center justify-center text-xs shrink-0 ${
                    checklist.core ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                  }`}>
                    {checklist.core && <Check className="w-3 h-3" />}
                  </span>
                  <span>STEMp Core terisi daya atau siap dengan kabel laptop</span>
                </button>

                <button
                  onClick={() => toggleItem('modules')}
                  className="w-full flex items-center gap-2.5 text-xs text-left text-slate-700 font-medium hover:text-slate-900"
                >
                  <span className={`w-4 h-4 rounded-md flex items-center justify-center text-xs shrink-0 ${
                    checklist.modules ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                  }`}>
                    {checklist.modules && <Check className="w-3 h-3" />}
                  </span>
                  <span>Modul sensor & motor lengkap dibagikan per kelompok</span>
                </button>

                <button
                  onClick={() => toggleItem('tested')}
                  className="w-full flex items-center gap-2.5 text-xs text-left text-slate-700 font-medium hover:text-slate-900"
                >
                  <span className={`w-4 h-4 rounded-md flex items-center justify-center text-xs shrink-0 ${
                    checklist.tested ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                  }`}>
                    {checklist.tested && <Check className="w-3 h-3" />}
                  </span>
                  <span>Program starter logika sudah diuji pada tahap sebelumnya</span>
                </button>

                <button
                  onClick={() => toggleItem('materials')}
                  className="w-full flex items-center gap-2.5 text-xs text-left text-slate-700 font-medium hover:text-slate-900"
                >
                  <span className={`w-4 h-4 rounded-md flex items-center justify-center text-xs shrink-0 ${
                    checklist.materials ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                  }`}>
                    {checklist.materials && <Check className="w-3 h-3" />}
                  </span>
                  <span>Material kerajinan (stik es krim, kardus, karet) tersedia</span>
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
              <button
                onClick={handleStartClassSession}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Mulai Aktivitas di Kelas</span>
              </button>

              <button
                onClick={handlePrintLessonPlan}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Panduan Persiapan</span>
              </button>
            </div>
          </div>

          {/* Right Visual Image (5 cols) */}
          <div className="hidden md:block md:col-span-5 relative bg-slate-100">
            <img 
              src={classroomWorkshopImg} 
              alt="Aktivitas Kelas STEMp" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <p className="font-bold">Pembelajaran Aktif Berkelompok</p>
              <p className="text-[11px] text-white/80">Siswa belajar merakit, menguji, dan berkolaborasi secara nyata.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Flow Timeline (Alur 6 Fase Mengajar) */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Alur Pelaksanaan Pelajaran (60 Menit)
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Urutan waktu terstruktur yang mudah diikuti bahkan untuk guru yang baru pertama kali mengajar STEM.
        </p>

        <div className="space-y-3">
          {canonicalActivity.lessonFlow.map((phase) => (
            <div
              key={phase.phase}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                    {phase.phase}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                    {phase.title}
                  </h4>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200/60 self-start sm:self-auto">
                  {phase.durationMinutes} Menit
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/50">
                  <span className="font-bold text-slate-700 block mb-0.5">Peran Guru:</span>
                  <p className="text-slate-600 leading-relaxed">{phase.teacherAction}</p>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/50">
                  <span className="font-bold text-slate-700 block mb-0.5">Aktivitas Siswa:</span>
                  <p className="text-slate-600 leading-relaxed">{phase.studentAction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reflection Prompts for Students */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Pertanyaan Pemantik & Refleksi Siswa
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Gunakan pertanyaan ini pada 5 menit terakhir untuk memperdalam pemahaman konsep siswa.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {canonicalActivity.reflectionQuestions.map((q, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-blue-50/40 border border-blue-100 text-xs leading-relaxed text-slate-700">
              <span className="font-bold text-blue-900 block mb-1">Pertanyaan {idx + 1}:</span>
              <p>"{q}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sustainability Section Note */}
      <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 flex items-start gap-4">
        <Award className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold text-sm block mb-1 text-emerald-900">
            Bongkar Proyeknya. Gunakan Teknologinya Lagi.
          </span>
          <p className="text-emerald-800">
            Setelah pembelajaran selesai, minta siswa membongkar stik es krim dan melepaskan modul sensor dari STEMp Core. Simpan kembali modul elektronik yang utuh ke dalam kit untuk digunakan proyek berikutnya minggu depan.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={() => setWorkspaceStage('uji')}
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Tahap Uji</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Langkah 6 dari 6: Siap Mengajar
        </span>
      </div>
    </div>
  );
};
