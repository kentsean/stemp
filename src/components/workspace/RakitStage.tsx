import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FunnectCanvas3D } from '../3d/FunnectCanvas3D';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  HelpCircle, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Info,
  Sliders,
  Check
} from 'lucide-react';

export const RakitStage: React.FC = () => {
  const { 
    canonicalActivity, 
    setWorkspaceStage, 
    showToast,
    deviceState
  } = useApp();

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([0]);
  const [showAdvanced3D, setShowAdvanced3D] = useState(false);
  const [checkedMaterials, setCheckedMaterials] = useState<Record<string, boolean>>({});

  const steps = canonicalActivity.buildSteps;
  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;

  const toggleMaterialCheck = (name: string) => {
    setCheckedMaterials(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (!completedSteps.includes(nextIdx)) {
        setCompletedSteps(prev => [...prev, nextIdx]);
      }
    } else {
      // Completed all build steps
      setWorkspaceStage('uji');
      showToast('Perakitan selesai! Mari kita uji fungsi proyek.', 'success');
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6">
      {/* Top Project Sub-Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{canonicalActivity.gradeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{canonicalActivity.durationMinutes} Menit</span>
            <span aria-hidden="true">·</span>
            <span>{canonicalActivity.subject}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Rakit: {canonicalActivity.title}
          </h2>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center gap-1.5 self-stretch sm:self-auto justify-end">
          {steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => setCurrentStepIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'w-7 bg-blue-600'
                  : completedSteps.includes(idx)
                  ? 'w-3.5 bg-emerald-500'
                  : 'w-3.5 bg-slate-200 hover:bg-slate-300'
              }`}
              title={`Langkah ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>
      </div>

      {/* Main 3-Column Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Step-by-Step Instructions (3.5 cols) */}
        <div className="lg:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[480px]">
          <div>
            {/* Step Counter */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                Langkah {currentStepIndex + 1} dari {totalSteps}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Fokus: {currentStep.visualFocus}
              </span>
            </div>

            {/* Step Title & Instruction */}
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {currentStep.title}
            </h3>
            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
              {currentStep.instruction}
            </p>

            {/* Parts Needed for this step */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Komponen yang disiapkan langkah ini:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentStep.partsNeeded.map((part, pIdx) => (
                  <span
                    key={pIdx}
                    className="inline-flex items-center text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md"
                  >
                    {part}
                  </span>
                ))}
              </div>
            </div>

            {/* Tip Guru (Teacher Pedagogy Guidance) */}
            {currentStep.tipGuru && (
              <div className="mt-5 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/70 text-amber-900 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-800">
                  <Info className="w-3.5 h-3.5" />
                  <span>Tips untuk Guru di Kelas:</span>
                </div>
                <p>{currentStep.tipGuru}</p>
              </div>
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              onClick={handleNextStep}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Selesai & Mulai Uji' : 'Langkah Berikutnya'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Column: Interactive 3D Model Stage (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex flex-col">
          {/* 3D Viewport Header */}
          <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-slate-700">Model 3D Interaktif</span>
            </div>
            <button
              onClick={() => setShowAdvanced3D(!showAdvanced3D)}
              className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{showAdvanced3D ? 'Sembunyikan Opsi' : 'Tampilan Lainnya'}</span>
            </button>
          </div>

          {/* 3D Canvas Container */}
          <div className="relative w-full h-[380px] sm:h-[420px] bg-slate-950">
            <FunnectCanvas3D
              assemblyStage={currentStepIndex + 1}
              showLabelsProp={true}
              className="w-full h-full"
            />

            {/* Instruction Overlay Pill */}
            <div className="absolute bottom-3 left-3 right-3 pointer-events-none flex items-center justify-between text-[11px] text-white/80 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <span>Klik & seret untuk memutar sudut pandang</span>
              <span>Gunakan scroll untuk zoom</span>
            </div>
          </div>

          {/* Advanced 3D toggles (progressive disclosure) */}
          {showAdvanced3D && (
            <div className="p-3 border-t border-slate-100 bg-slate-50 text-xs text-slate-600 flex items-center justify-between">
              <span>Mode Tampilan 3D: Standar</span>
              <span className="text-[11px] text-slate-400">Rendering WebGL GPU responsif</span>
            </div>
          )}
        </div>

        {/* Right Column: Components & Port Mapping Checklist (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Reusable Electronics */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Modul Elektronik (Port A-F)
            </h4>
            <div className="space-y-2">
              {canonicalActivity.requiredModules.map((m) => {
                const isChecked = checkedMaterials[m.id] ?? true;
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleMaterialCheck(m.id)}
                    className="w-full flex items-start gap-2.5 p-2 rounded-xl text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className={`mt-0.5 w-4 h-4 rounded-md flex items-center justify-center text-xs shrink-0 ${
                      isChecked ? 'bg-emerald-600 text-white' : 'border border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-3 h-3" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-900 truncate">{m.name}</p>
                      <span className="text-[11px] text-blue-600 font-medium block">{m.port}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Craft Materials */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Material Sederhana
            </h4>
            <div className="space-y-1.5">
              {canonicalActivity.materials.filter(m => !m.isElectronic).map((mat, idx) => {
                const isChecked = checkedMaterials[mat.name] ?? false;
                return (
                  <button
                    key={idx}
                    onClick={() => toggleMaterialCheck(mat.name)}
                    className="w-full flex items-center justify-between p-2 rounded-xl text-left hover:bg-slate-50 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-3.5 h-3.5 rounded-sm flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-blue-600 text-white' : 'border border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-2.5 h-2.5" />}
                      </span>
                      <span className={isChecked ? 'line-through text-slate-400' : 'text-slate-700 font-medium'}>
                        {mat.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">{mat.quantity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Direct CTA to Test */}
          <button
            onClick={() => setWorkspaceStage('uji')}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Semua Terpasang! Lanjut Uji</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setWorkspaceStage('proyek')}
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Pilih Proyek</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Langkah 4 dari 6: Rakit
        </span>
      </div>
    </div>
  );
};
