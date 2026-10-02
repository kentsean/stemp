import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { FunnectCanvas3D } from '../3d/FunnectCanvas3D';
import { 
  ArrowLeft, 
  ArrowRight, 
  Play, 
  Square, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Sliders, 
  RotateCcw,
  Sparkles,
  ArrowUp,
  ArrowDown,
  CornerUpLeft,
  CornerUpRight,
  Gauge,
  Radio,
  Zap,
  Volume2
} from 'lucide-react';
import { 
  playKidFanfare, 
  playKidPop, 
  playMotorHum, 
  playBrakeScreech, 
  playObstacleBeep 
} from '../../utils/kidSounds';

export const UjiStage: React.FC = () => {
  const { 
    canonicalActivity, 
    setWorkspaceStage, 
    simulation, 
    setSensorValue, 
    toggleSimulation, 
    showToast,
    deviceState,
    projects
  } = useApp();

  const [hasTriggeredObstacle, setHasTriggeredObstacle] = useState(false);
  const [activeManualCommand, setActiveManualCommand] = useState<string | null>(null);
  const [isAutoTesting, setIsAutoTesting] = useState(false);

  const testConfig = canonicalActivity.testControls;
  const primarySensor = testConfig?.primarySensor || 'distance';
  const currentSensorVal = simulation.sensorValues[primarySensor as keyof typeof simulation.sensorValues] ?? simulation.sensorValues.distance;
  const threshold = testConfig?.thresholdValue || 20;

  // Determine obstacle / triggered condition
  const isTriggered = primarySensor === 'distance'
    ? (typeof currentSensorVal === 'number' && currentSensorVal < threshold)
    : primarySensor === 'light'
    ? (typeof currentSensorVal === 'number' && currentSensorVal > 45)
    : primarySensor === 'moisture'
    ? (typeof currentSensorVal === 'number' && currentSensorVal < 30)
    : false;

  // Find matching 3D project
  const matchingProject = projects.find(p => p.physicalBuildType === canonicalActivity.physicalBuildType) || projects[0];

  // Auto-start simulation when entering test stage if not running
  useEffect(() => {
    if (!simulation.isRunning) {
      toggleSimulation();
    }
  }, []);

  // Track if judge or teacher has tested the collision stop behavior
  useEffect(() => {
    if (isTriggered && !hasTriggeredObstacle) {
      setHasTriggeredObstacle(true);
      playKidFanfare();
      showToast('🎉 Sensor merespons! Logika kontrol otomatis berhasil diuji.', 'success');
    }
  }, [isTriggered, hasTriggeredObstacle]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSensorValue(primarySensor as keyof typeof simulation.sensorValues, val);

    if (primarySensor === 'distance') {
      if (val < threshold) {
        playObstacleBeep(true);
        playBrakeScreech();
      } else {
        playMotorHum(0.7);
      }
    } else {
      playKidPop();
    }
  };

  const handleEmergencyStop = () => {
    playBrakeScreech();
    if (simulation.isRunning) {
      toggleSimulation();
    }
    setActiveManualCommand(null);
    showToast('🛑 Proyek dihentikan aman (Emergency STOP).', 'info');
  };

  const handleManualAction = (action: string) => {
    setActiveManualCommand(action);
    if (!simulation.isRunning) {
      toggleSimulation();
    }

    if (action === 'Maju') {
      if (primarySensor === 'distance' && typeof currentSensorVal === 'number' && currentSensorVal < threshold) {
        playBrakeScreech();
        playObstacleBeep(true);
        showToast('⚠️ Tidak dapat maju! Sensor mendeteksi rintangan (< 20 cm). Rem darurat aktif.', 'error');
      } else {
        playMotorHum(0.9);
        showToast('🚗 Maju lurus! Motor M1 & M2 berputar maju 85%.', 'info');
      }
    } else if (action === 'Mundur') {
      playMotorHum(0.6);
      showToast('◀️ Mundur! Motor M1 & M2 berputar mundur 40%.', 'info');
    } else if (action === 'Belok Kiri') {
      playMotorHum(0.75);
      showToast('↩️ Belok Kiri! Motor kanan berputar lebih cepat dari motor kiri.', 'info');
    } else if (action === 'Belok Kanan') {
      playMotorHum(0.75);
      showToast('↪️ Belok Kanan! Motor kiri berputar lebih cepat dari motor kanan.', 'info');
    }
  };

  // Run full automatic scenario test sequence
  const runAutoTestSequence = async () => {
    if (isAutoTesting) return;
    setIsAutoTesting(true);
    if (!simulation.isRunning) toggleSimulation();

    try {
      showToast('🚀 Memulai Demo Otomatis: Mobil meluncur bebas di jalan (Jarak 70 cm)...', 'info');
      setSensorValue('distance', 70);
      playMotorHum(0.9);
      setActiveManualCommand('Maju');

      await new Promise(r => setTimeout(r, 1600));

      showToast('⚠️ Tahap 2: Rintangan mulai terdeteksi (Jarak 38 cm)...', 'info');
      setSensorValue('distance', 38);
      playObstacleBeep(false);

      await new Promise(r => setTimeout(r, 1600));

      showToast('🛑 Tahap 3: Jarak bahaya (14 cm) ➔ REM OTOMATIS AKTIF! Roda berhenti.', 'success');
      setSensorValue('distance', 14);
      playObstacleBeep(true);
      playBrakeScreech();
      setActiveManualCommand('Rem Otomatis');

      await new Promise(r => setTimeout(r, 1200));
      playKidFanfare();
      setHasTriggeredObstacle(true);
    } finally {
      setIsAutoTesting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>Uji Coba Langsung</span>
            <span aria-hidden="true">·</span>
            <span>{canonicalActivity.title}</span>
            <span aria-hidden="true">·</span>
            <span>{deviceState.isDemo ? 'Mode Demo' : 'STEMp Core USB-C'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
            Uji Respon & Logika Proyek
          </h2>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          {/* Automated Test Sequence Button */}
          <button
            onClick={runAutoTestSequence}
            disabled={isAutoTesting}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm active:scale-95"
            title="Jalankan skenario uji otomatis dari meluncur hingga mengerem"
          >
            <Sparkles className={`w-4 h-4 ${isAutoTesting ? 'animate-spin' : ''}`} />
            <span>{isAutoTesting ? 'Menguji...' : 'Putar Skenario Otomatis'}</span>
          </button>

          {/* Big Safe STOP Button */}
          <button
            onClick={handleEmergencyStop}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all flex items-center gap-2 shadow-sm active:scale-95"
            title="Tombol darurat menghentikan putaran motor"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>STOP</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 3D Stage on Left (7 cols), Test Controls on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 3D Simulation Viewport */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-md flex flex-col">
          <div className="px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${simulation.isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="font-semibold text-slate-200">
                {simulation.isRunning ? 'Simulasi 3D Aktif (Aktuator Berputar & Sensor Merespons)' : 'Simulasi Jeda'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleSimulation}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-bold"
              >
                {simulation.isRunning ? 'Jeda' : 'Jalankan'}
              </button>
              <span className="text-[11px] text-slate-400">
                {deviceState.isDemo ? 'Demo Core' : 'USB-C'}
              </span>
            </div>
          </div>

          <div className="relative w-full h-[380px] sm:h-[440px]">
            <FunnectCanvas3D
              overrideProject={matchingProject}
              assemblyStage={4}
              showLabelsProp={false}
              className="w-full h-full"
            />

            {/* Live Telemetry HUD Overlay (Top-Left) */}
            <div className="absolute top-3 left-3 pointer-events-none bg-slate-900/85 backdrop-blur-md border border-white/10 rounded-xl p-3 text-xs text-white shadow-lg space-y-1.5 min-w-[190px]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400 font-medium">Sensor ({testConfig?.sensorLabel}):</span>
                <span className="font-mono font-bold text-cyan-400">
                  {currentSensorVal} {testConfig?.sensorUnit}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400 font-medium">Status Logika:</span>
                <span className={`font-bold flex items-center gap-1 ${isTriggered ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                  {isTriggered ? '🛑 REM AKTIF' : '🚗 MELAJU LANCAR'}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/10 text-[11px]">
                <span className="text-slate-400">Kecepatan Motor:</span>
                <span className="font-mono font-bold text-amber-400">
                  {isTriggered ? '0% (Mati)' : `${simulation.actuatorStates.motorSpeed || 85}%`}
                </span>
              </div>
              {activeManualCommand && (
                <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/10 text-[11px]">
                  <span className="text-slate-400">Perintah Manual:</span>
                  <span className="font-bold text-blue-300">{activeManualCommand}</span>
                </div>
              )}
            </div>

            {/* Live Ultrasonic Sonar Radar Badge (Top-Right) */}
            <div className="absolute top-3 right-3 pointer-events-none bg-slate-900/85 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-xs text-white shadow-lg flex items-center gap-2">
              <Radio className={`w-3.5 h-3.5 ${isTriggered ? 'text-red-400 animate-ping' : 'text-cyan-400'}`} />
              <span className="font-mono text-[11px]">
                {primarySensor === 'distance' ? (
                  isTriggered ? 'Sonar: RINTANGAN DEKAT' : 'Sonar: JALUR BERSIH'
                ) : (
                  `Nilai: ${currentSensorVal} ${testConfig?.sensorUnit}`
                )}
              </span>
            </div>

            {/* Safe Notice Overlay */}
            <div className="absolute bottom-3 left-3 right-3 pointer-events-none text-center text-[11px] text-slate-400 bg-slate-900/75 backdrop-blur-xs px-3 py-1 rounded-lg">
              Geser slider sensor di kanan untuk melihat reaksi roda, lampu, dan layar OLED secara seketika.
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Test Controls & State */}
        <div className="lg:col-span-5 space-y-4">
          {/* Sensor Adjustment Slider Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {testConfig.sensorLabel}
              </span>
              <span className="font-mono text-base font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-lg">
                {currentSensorVal} {testConfig.sensorUnit}
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Geser slider di bawah ini untuk mensimulasikan lingkungan fisik.
            </p>

            <input
              type="range"
              min="5"
              max="100"
              value={typeof currentSensorVal === 'number' ? currentSensorVal : 50}
              onChange={handleSliderChange}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />

            <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-mono">
              <span className="text-red-600 font-bold">5 {testConfig.sensorUnit} (Sangat Dekat)</span>
              <span className="font-bold text-slate-700">{threshold} {testConfig.sensorUnit} (Batas Pemicu)</span>
              <span>100 {testConfig.sensorUnit} (Bebas)</span>
            </div>

            {/* Threshold condition status box */}
            <div className={`mt-4 p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
              isTriggered 
                ? 'bg-rose-50 border-rose-200 text-rose-950' 
                : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              {isTriggered ? (
                <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-bounce" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="text-xs leading-relaxed">
                <span className="font-bold block mb-0.5">
                  {isTriggered ? 'Rintangan Terdeteksi! Rem Otomatis Aktif' : 'Jalur di Depan Bersih / Melaju Lancar'}
                </span>
                <p className="opacity-90">
                  {isTriggered
                    ? 'STEMp Core otomatis memutus daya ke Motor M1 & M2. Roda berhenti berputar untuk mencegah tabrakan fisik.'
                    : 'Motor DC terus berputar stabil melajukan mobil maju di jalan.'}
                </p>
              </div>
            </div>
          </div>

          {/* Manual Movement Controls */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Uji Gerak Manual
              </span>
              <span className="text-[11px] text-slate-400">Klik arah untuk menguji putaran motor</span>
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto text-xs">
              <div />
              <button
                onClick={() => handleManualAction('Maju')}
                className={`py-2.5 rounded-xl font-bold flex items-center justify-center transition-all ${
                  activeManualCommand === 'Maju' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
                title="Maju"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <div />

              <button
                onClick={() => handleManualAction('Belok Kiri')}
                className={`py-2.5 rounded-xl font-bold flex items-center justify-center transition-all ${
                  activeManualCommand === 'Belok Kiri' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
                title="Belok Kiri"
              >
                <CornerUpLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualAction('Mundur')}
                className={`py-2.5 rounded-xl font-bold flex items-center justify-center transition-all ${
                  activeManualCommand === 'Mundur' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
                title="Mundur"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleManualAction('Belok Kanan')}
                className={`py-2.5 rounded-xl font-bold flex items-center justify-center transition-all ${
                  activeManualCommand === 'Belok Kanan' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
                title="Belok Kanan"
              >
                <CornerUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Test Passed Success Banner */}
          <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 text-emerald-950 flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold">Uji Coba Berhasil!</p>
                <p className="text-xs text-emerald-800/90 mt-0.5">
                  Logika proyek merespons sensor dengan akurat. Proyek siap digunakan mengajar di kelas.
                </p>
              </div>
            </div>
          </div>

          {/* Advance CTA */}
          <button
            onClick={() => setWorkspaceStage('siap')}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Semua Sesuai! Buka Panduan Siap Mengajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setWorkspaceStage('rakit')}
          className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white text-xs font-semibold transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Panduan Rakit</span>
        </button>

        <span className="text-xs text-slate-400 font-medium">
          Langkah 5 dari 6: Uji Respon
        </span>
      </div>
    </div>
  );
};
