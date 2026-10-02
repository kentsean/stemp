import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Usb, 
  Cpu, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  ArrowRight,
  Info,
  Laptop
} from 'lucide-react';
import stempCoreImg from '../../assets/images/stemp_core_hub_1790925253089.jpg';

export const DevicePage: React.FC = () => {
  const { 
    deviceState, 
    connectWithDemo, 
    connectWithWebSerial, 
    disconnectDevice, 
    startActivityJourney 
  } = useApp();

  const [isConnectingSerial, setIsConnectingSerial] = useState(false);
  const [isConnectingDemo, setIsConnectingDemo] = useState(false);

  const isConnected = deviceState.status === 'connected';

  const handleConnectSerial = async () => {
    setIsConnectingSerial(true);
    await connectWithWebSerial();
    setIsConnectingSerial(false);
  };

  const handleConnectDemo = async () => {
    setIsConnectingDemo(true);
    await connectWithDemo();
    setIsConnectingDemo(false);
  };

  const portsInfo = [
    { id: 'M1', name: 'Port Motor A (M1)', type: 'Motor DC / Servo', desc: 'Penggerak roda kiri atau katrol', color: 'border-orange-200 bg-orange-50 text-orange-800' },
    { id: 'M2', name: 'Port Motor B (M2)', type: 'Motor DC / Servo', desc: 'Penggerak roda kanan atau baling-baling', color: 'border-orange-200 bg-orange-50 text-orange-800' },
    { id: 'S1', name: 'Port Sensor A (S1)', type: 'Sensor Ultrasonik / Cahaya', desc: 'Membaca jarak atau tingkat kecerahan', color: 'border-blue-200 bg-blue-50 text-blue-800' },
    { id: 'S2', name: 'Port Sensor B (S2)', type: 'Sensor Tanah / Tombol', desc: 'Membaca kelembapan atau sentuhan tombol', color: 'border-blue-200 bg-blue-50 text-blue-800' },
    { id: 'O1', name: 'Port Output A (O1)', type: 'Lampu LED / RGB', desc: 'Indikator lampu visual warna-warni', color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
    { id: 'O2', name: 'Port Output B (O2)', type: 'Buzzer Suara / Sirine', desc: 'Peringatan nada dan alarm bahaya', color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider block mb-1">
              Manajemen Perangkat Fisik
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Status STEMp Core
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Cek sambungan USB-C, deteksi mikrokontroler, dan pelajari pemetaan port A–F.
            </p>
          </div>

          <div>
            {isConnected ? (
              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
                deviceState.isDemo 
                  ? 'bg-amber-50 text-amber-800 border-amber-200' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${deviceState.isDemo ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                <span>{deviceState.isDemo ? 'Mode Demo Aktif' : 'STEMp Core Terhubung'}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Belum Terhubung</span>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Main Connection Box */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Visual Photo (4 cols) */}
            <div className="md:col-span-4 flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-md mb-3 relative">
                <img 
                  src={stempCoreImg} 
                  alt="STEMp Core" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                {isConnected && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-bold">
                    AKTIF
                  </div>
                )}
              </div>
              <h3 className="text-sm font-bold text-slate-900">STEMp Core Hardware</h3>
              <span className="text-xs text-slate-500">6 Port Modular Tanpa Solder</span>
            </div>

            {/* Connection Status & Instructions (8 cols) */}
            <div className="md:col-span-8 space-y-4">
              <div className={`p-4 rounded-xl border ${
                isConnected
                  ? deviceState.isDemo
                    ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                    : 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                  : deviceState.status === 'error'
                  ? 'bg-rose-50 border-rose-200 text-rose-900'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <div className="flex items-start gap-3">
                  {isConnected ? (
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${deviceState.isDemo ? 'text-amber-600' : 'text-emerald-600'}`} />
                  ) : deviceState.status === 'error' ? (
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  ) : (
                    <Cpu className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-sm font-bold">
                      {isConnected
                        ? deviceState.isDemo
                          ? 'Demo Core Siap (Simulasi)'
                          : 'STEMp Core Siap Digunakan!'
                        : deviceState.status === 'connecting'
                        ? 'Mendeteksi port serial perangkat...'
                        : 'Belum ada STEMp Core yang terhubung'}
                    </h4>
                    <p className="text-xs opacity-90 mt-1 leading-relaxed">
                      {isConnected
                        ? deviceState.isDemo
                          ? 'Anda sedang menggunakan mode simulasi untuk demonstrasi juri atau saat kit fisik belum ada di meja.'
                          : 'Perangkat fisik terhubung melalui port serial laptop. Siap mengirim program dan menerima data sensor.'
                        : deviceState.errorMessage ||
                          'Colokkan kabel USB-C ke laptop, lalu klik tombol Deteksi di bawah.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {!isConnected ? (
                  <>
                    <button
                      onClick={handleConnectSerial}
                      disabled={isConnectingSerial || isConnectingDemo}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      {isConnectingSerial ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Mendeteksi...</span>
                        </>
                      ) : (
                        <>
                          <Usb className="w-4 h-4 text-emerald-400" />
                          <span>Deteksi STEMp Core (USB-C)</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleConnectDemo}
                      disabled={isConnectingSerial || isConnectingDemo}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Coba dengan Demo Core</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startActivityJourney()}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                    >
                      <span>Mulai Aktivitas dengan Core Ini</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={disconnectDevice}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Lepas Sambungan
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 6 Modular Ports Guide */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="mb-6">
            <h3 className="text-base font-bold text-slate-900">
              Pemetaan Port STEMp Core (Port A–F)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Guru dan siswa tidak perlu menghafal nomor pin GPIO atau sirkuit. Cukup colokkan modul ke port fungsinya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portsInfo.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl border border-slate-200/70 bg-slate-50/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/50">
                      {p.id}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">{p.type}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browser Compatibility Notice */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-800">Catatan Kompatibilitas Browser:</strong> Koneksi kabel USB-C langsung didukung pada Google Chrome dan Microsoft Edge di laptop/komputer desktop. Jika Anda membuka di tablet atau smartphone, sistem secara cerdas mengaktifkan <strong>Mode Demo</strong> agar semua simulasi dan kurikulum tetap dapat dipelajari.
          </div>
        </div>
      </div>
    </div>
  );
};
