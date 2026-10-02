import React from 'react';
import { useApp } from '../../context/AppContext';
import { StageId } from '../../types';
import { HubungkanCoreStage } from './HubungkanCoreStage';
import { PilihFungsiStage } from './PilihFungsiStage';
import { PilihProyekStage } from './PilihProyekStage';
import { RakitStage } from './RakitStage';
import { UjiStage } from './UjiStage';
import { SiapMengajarStage } from './SiapMengajarStage';
import { 
  Usb, 
  Sparkles, 
  Check, 
  HelpCircle, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface StageMeta {
  id: StageId;
  stepNumber: number;
  label: string;
}

const STAGES: StageMeta[] = [
  { id: 'hubungkan', stepNumber: 1, label: 'Hubungkan' },
  { id: 'fungsi', stepNumber: 2, label: 'Pilih Fungsi' },
  { id: 'proyek', stepNumber: 3, label: 'Pilih Proyek' },
  { id: 'rakit', stepNumber: 4, label: 'Rakit' },
  { id: 'uji', stepNumber: 5, label: 'Uji' },
  { id: 'siap', stepNumber: 6, label: 'Siap Mengajar' },
];

export const ActivityWorkspace: React.FC = () => {
  const { 
    workspaceStage, 
    setWorkspaceStage, 
    canonicalActivity, 
    deviceState, 
    setCurrentView 
  } = useApp();

  const currentStageIndex = STAGES.findIndex(s => s.id === workspaceStage);

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      {/* Top Workflow Stepper Navigation Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left Info: Back to Home & Current Project */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 p-1 rounded-lg hover:bg-slate-100 transition-colors"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Beranda</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 truncate max-w-[180px] sm:max-w-[240px]">
                {canonicalActivity.title}
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline">
                ({canonicalActivity.gradeLabel})
              </span>
            </div>

            {/* Persistent Core Connection Badge */}
            <div className="ml-auto md:ml-2">
              {deviceState.status === 'connected' ? (
                <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 ${
                  deviceState.isDemo
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${deviceState.isDemo ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <span>{deviceState.isDemo ? 'Mode Demo' : 'Core Terhubung'}</span>
                </div>
              ) : (
                <div className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Core Belum Terhubung</span>
                </div>
              )}
            </div>
          </div>

          {/* Stepper Progress Steps */}
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto w-full md:w-auto py-1 justify-center">
            {STAGES.map((s, idx) => {
              const isCurrent = s.id === workspaceStage;
              const isPast = idx < currentStageIndex;

              return (
                <button
                  key={s.id}
                  onClick={() => setWorkspaceStage(s.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isCurrent
                      ? 'bg-blue-50 text-blue-600 shadow-xs'
                      : isPast
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : isPast
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {isPast ? <Check className="w-2.5 h-2.5" /> : s.stepNumber}
                  </span>
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dynamic Stage Body */}
      <main className="flex-1 py-4 sm:py-6">
        {workspaceStage === 'hubungkan' && <HubungkanCoreStage />}
        {workspaceStage === 'fungsi' && <PilihFungsiStage />}
        {workspaceStage === 'proyek' && <PilihProyekStage />}
        {workspaceStage === 'rakit' && <RakitStage />}
        {workspaceStage === 'uji' && <UjiStage />}
        {workspaceStage === 'siap' && <SiapMengajarStage />}
      </main>
    </div>
  );
};
