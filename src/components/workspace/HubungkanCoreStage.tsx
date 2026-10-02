import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Usb, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Laptop, 
  Cpu, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import stempCoreImg from '../../assets/images/stemp_core_hub_1790925253089.jpg';

export const HubungkanCoreStage: React.FC = () => {
  const { 
    deviceState, 
    connectWithDemo, 
    connectWithWebSerial, 
    disconnectDevice, 
    setWorkspaceStage, 
    showToast 
  } = useApp();

  const [isDetectingSerial, setIsDetectingSerial] = useState(false);
  const [isDetectingDemo, setIsDetectingDemo] = useState(false);

  const isConnected = deviceState.status === 'connected';

  const handleConnectSerial = async () => {
    setIsDetectingSerial(true);
    await connectWithWebSerial();
    setIsDetectingSerial(false);
  };

  const handleConnectDemo = async () => {
    setIsDetectingDemo(true);
    await connectWithDemo();
    setIsDetectingDemo(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Hubungkan STEMp Core
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Kita cek sambungan STEMp Core ke laptop terlebih dahulu sebelum memilih fungsi dan merakit proyek.
        </p>
      </div>

      {/* Main Connection Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Visual Connection Diagram */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
            {/* Step 1: Laptop */}
            <div className="flex flex-col items-center text-center max-w-[200px]">
              <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-blue-600 mb-3">
                <Laptop className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Langkah 1</span>
              <p className="text-xs font-semibold text-slate-700">Laptop Guru / Siswa</p>
              <span className="text-[11px] text-slate-500 mt-0.5">Gunakan Chrome atau Edge</span>
            </div>

            {/* Connecting Cable Graphic */}
            <div className="flex-1 flex flex-col items-center w-full md:w-auto px-4">
              <div className="w-full flex items-center justify-center relative">
                <div className={`h-1 w-full rounded-full transition-colors ${isConnected ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                <div className={`absolute px-3 py-1 rounded-full text-xs font-medium border ${
                  isConnected 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                    : 'bg-white text-slate-600 border-slate-200'
                }`}>
                  Kabel USB-C
                </div>
              </div>
              <span className="text-[11px] text-slate-500 mt-2 text-center">
                Sambungkan kabel USB-C dari port laptop ke STEMp Core
              </span>
            </div>

            {/* Step 2: STEMp Core */}
            <div className="flex flex-col items-center text-center max-w-[200px]">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-3">
                <img 
                  src={stempCoreImg} 
                  alt="STEMp Core" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isConnected && (
                  <div className="absolute top-1 right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Langkah 2</span>
              <p className="text-xs font-semibold text-slate-700">STEMp Core</p>
              <span className="text-[11px] text-slate-500 mt-0.5">Port A-F Siap Modul</span>
            </div>
          </div>
        </div>

        {/* Status Callout */}
        <div className={`p-4 rounded-xl border mb-8 flex items-start sm:items-center justify-between gap-4 transition-all ${
          isConnected
            ? deviceState.isDemo 
              ? 'bg-amber-50/80 border-amber-200 text-amber-900'
              : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
            : deviceState.status === 'error'
            ? 'bg-rose-50 border-rose-200 text-rose-900'
            : 'bg-slate-50 border-slate-200 text-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            {isConnected ? (
              <CheckCircle2 className={`w-5 h-5 shrink-0 ${deviceState.isDemo ? 'text-amber-600' : 'text-emerald-600'}`} />
            ) : deviceState.status === 'error' ? (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
            ) : (
              <div className="w-3 h-3 rounded-full bg-slate-300 animate-pulse shrink-0 ml-1" />
            )}
            <div>
              <p className="text-sm font-semibold">
                {isConnected
                  ? deviceState.isDemo
                    ? 'Demo Core Siap Digunakan (Mode Simulasi)'
                    : 'STEMp Core Siap Digunakan!'
                  : deviceState.status === 'connecting'
                  ? 'Mencari dan mendeteksi STEMp Core...'
                  : deviceState.status === 'error'
                  ? 'STEMp Core belum berhasil terhubung'
                  : 'Belum ada STEMp Core yang terhubung'}
              </p>
              <p className="text-xs opacity-80 mt-0.5">
                {isConnected
                  ? deviceState.isDemo
                    ? 'Mode demo cocok untuk juri, pelatihan, atau saat kit fisik belum ada di meja.'
                    : 'Koneksi perangkat USB stabil. Modul sensor dan motor siap dikontrol.'
                  : deviceState.errorMessage ||
                    'Pilih salah satu opsi di bawah untuk mendeteksi perangkat fisik atau mencoba demo.'}
              </p>
            </div>
          </div>

          {isConnected && (
            <button
              onClick={disconnectDevice}
              className="text-xs font-semibold px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-white/80 rounded-md border border-slate-200/60 transition-colors shrink-0"
            >
              Lepas
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          {!isConnected ? (
            <>
              {/* Primary: Real USB-C Hardware */}
              <button
                onClick={handleConnectSerial}
                disabled={isDetectingSerial || isDetectingDemo}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 active:scale-98 text-sm font-semibold transition-all flex items-center justify-center gap-2.5 shadow-sm"
              >
                {isDetectingSerial ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-300" />
                    <span>Mendeteksi Core...</span>
                  </>
                ) : (
                  <>
                    <Usb className="w-4 h-4 text-emerald-400" />
                    <span>Deteksi STEMp Core (USB-C)</span>
                  </>
                )}
              </button>

              {/* Secondary: Honest Demo Core */}
              <button
                onClick={handleConnectDemo}
                disabled={isDetectingSerial || isDetectingDemo}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-300 hover:border-slate-400 text-slate-800 active:scale-98 text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                {isDetectingDemo ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-400" />
                    <span>Menyiapkan Demo...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Coba dengan Demo Core</span>
                  </>
                )}
              </button>
            </>
          ) : (
            /* Connected -> Advance to Next Step */
            <button
              onClick={() => {
                setWorkspaceStage('fungsi');
                showToast('Lanjut ke Langkah 2: Pilih Fungsi!', 'info');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Lanjut: Pilih Fungsi Proyek</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Helpful Classroom Notice */}
      <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>Aman untuk ruang kelas · Tegangan rendah 5V USB · Bebas solder kimia</span>
      </div>
    </div>
  );
};
