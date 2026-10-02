import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useApp } from '../../context/AppContext';
import { PortId, FunnectProject, SimulationState } from '../../types';
import { populatePhysicalCraftFrame } from './physicalBuildGenerators';
import { 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Grid as GridIcon,
  Play,
  Square,
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Tag,
  X
} from 'lucide-react';

export interface PartLabel3D {
  id: string;
  name: string;
  category: string;
  emoji: string;
  worldPos: THREE.Vector3;
  description: string;
  color: string;
  screenX?: number;
  screenY?: number;
  visible?: boolean;
}

export const getPartLabelsForBuildType = (pType: string): PartLabel3D[] => {
  switch (pType) {
    case 'robot-car':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 1.8, 0),
          description: 'Mikrokontroler utama pengatur logika, koneksi bluetooth, dan port S1-M2',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'ultrasonic',
          name: 'Sensor Jarak Ultrasonik',
          category: 'Mata Robot (S1)',
          emoji: '📡',
          worldPos: new THREE.Vector3(0, 1.5, 1.9),
          description: 'Memancarkan gelombang suara 40kHz untuk mendeteksi rintangan di depan',
          color: 'bg-cyan-600 text-white'
        },
        {
          id: 'motor-l',
          name: 'Motor DC & Roda Kiri',
          category: 'Penggerak (M1)',
          emoji: '⚙️',
          worldPos: new THREE.Vector3(-1.4, 0.9, -0.6),
          description: 'Motor TT gearbox torsi tinggi dengan roda karet grip traksi',
          color: 'bg-orange-500 text-white'
        },
        {
          id: 'motor-r',
          name: 'Motor DC & Roda Kanan',
          category: 'Penggerak (M2)',
          emoji: '⚙️',
          worldPos: new THREE.Vector3(1.4, 0.9, -0.6),
          description: 'Motor TT gearbox torsi tinggi dengan roda karet grip traksi',
          color: 'bg-orange-500 text-white'
        },
        {
          id: 'caster',
          name: 'Roda Bebas (Caster)',
          category: 'Kemudi Depan',
          emoji: '⚪',
          worldPos: new THREE.Vector3(0, 0.45, 1.2),
          description: 'Roda penyeimbang depan berputar bebas 360° tanpa gesekan',
          color: 'bg-slate-700 text-white'
        },
        {
          id: 'chassis',
          name: 'Sasis Rangka Stik Kayu',
          category: 'Struktur Kayu',
          emoji: '🪵',
          worldPos: new THREE.Vector3(0, 0.85, -0.4),
          description: 'Rangka stik es krim & konektor sudut 90° kokoh tanpa lem kimia',
          color: 'bg-amber-600 text-white'
        },
        {
          id: 'obstacle',
          name: 'Target Rintangan Uji',
          category: 'Simulasi Virtual',
          emoji: '🛑',
          worldPos: new THREE.Vector3(0, 1.5, 4.2),
          description: 'Dinding simulasi virtual untuk menguji logika rem dan belok otomatis robot',
          color: 'bg-red-500 text-white'
        }
      ];

    case 'windmill':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 0.75, 1.4),
          description: 'Membaca kecepatan putaran dan mengontrol motor turbin angin',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'generator',
          name: 'Motor Turbin Hub',
          category: 'Penggerak (M1)',
          emoji: '⚙️',
          worldPos: new THREE.Vector3(0, 4.36, 0.1),
          description: 'Hub motor penggerak dan generator kincir angin',
          color: 'bg-orange-500 text-white'
        },
        {
          id: 'blades',
          name: 'Baling-Baling 4 Bilah',
          category: 'Aero Blade',
          emoji: '🍃',
          worldPos: new THREE.Vector3(0, 4.36, 0.72),
          description: 'Bilah kincir dari karton ramah lingkungan penangkap tenaga angin',
          color: 'bg-amber-700 text-white'
        },
        {
          id: 'tower',
          name: 'Menara Bambu A-Frame',
          category: 'Rangka Kayu',
          emoji: '🪵',
          worldPos: new THREE.Vector3(0, 2.0, -0.1),
          description: 'Struktur menara segitiga kokoh penahan beban motor turbin',
          color: 'bg-amber-600 text-white'
        }
      ];

    case 'solar-tracker':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 0.8, 1.5),
          description: 'Membandingkan intensitas cahaya sensor kiri dan kanan untuk memutar servo',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'ldr',
          name: 'Sensor Cahaya LDR',
          category: 'Sensor (S1/S2)',
          emoji: '☀️',
          worldPos: new THREE.Vector3(0, 3.4, 0.6),
          description: 'Fotoresistor pengukur arah datang sinar matahari paling terang',
          color: 'bg-cyan-600 text-white'
        },
        {
          id: 'servo',
          name: 'Micro Servo 180°',
          category: 'Penggerak (M1)',
          emoji: '🦾',
          worldPos: new THREE.Vector3(0, 3.2, 0.0),
          description: 'Motor servo presisi penyesuai sudut kemiringan panel bunga surya',
          color: 'bg-orange-500 text-white'
        },
        {
          id: 'flower',
          name: 'Panel Bunga Surya',
          category: 'Mekanik',
          emoji: '🌻',
          worldPos: new THREE.Vector3(0, 3.4, 0.4),
          description: 'Kepala bunga matahari miniatur panel surya penerima energi',
          color: 'bg-yellow-500 text-slate-900'
        },
        {
          id: 'planter',
          name: 'Pot Heksagonal Bambu',
          category: 'Struktur',
          emoji: '🪴',
          worldPos: new THREE.Vector3(0, 0.4, 0),
          description: 'Dudukan pot stabil dengan sudut konektor heksagonal',
          color: 'bg-emerald-600 text-white'
        }
      ];

    case 'streetlight':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 1.6, -0.6),
          description: 'Otomatis menyalakan lampu saat sensor mendeteksi malam hari',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'lamp',
          name: 'Lampu LED Ultra-Terang',
          category: 'Output (O1)',
          emoji: '💡',
          worldPos: new THREE.Vector3(1.4, 3.9, 0),
          description: 'Lampu LED hemat energi penerang jalan otomatis',
          color: 'bg-yellow-500 text-slate-900'
        },
        {
          id: 'post',
          name: 'Tiang Lampu Bambu',
          category: 'Struktur',
          emoji: '🪵',
          worldPos: new THREE.Vector3(0, 2.2, 0),
          description: 'Tiang tegak bambu ramah lingkungan penopang kubah lampu',
          color: 'bg-amber-600 text-white'
        }
      ];

    case 'automatic-barrier':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(-1.6, 0.9, 0),
          description: 'Menganalisis sensor jarak mobil dan memicu putaran servo palang',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'barrier',
          name: 'Palang Pintu (Servo)',
          category: 'Penggerak (M1)',
          emoji: '🚧',
          worldPos: new THREE.Vector3(0.5, 2.4, 0),
          description: 'Palang penghalang jalan bergaris merah-putih pembuka gerbang tol',
          color: 'bg-red-600 text-white'
        },
        {
          id: 'signal',
          name: 'Lampu Sinyal Jalan',
          category: 'Output (O2)',
          emoji: '🚨',
          worldPos: new THREE.Vector3(-1.2, 3.1, 0),
          description: 'Lampu indikator merah saat tertutup dan hijau saat terbuka',
          color: 'bg-pink-600 text-white'
        },
        {
          id: 'sensor',
          name: 'Sensor Deteksi Mobil',
          category: 'Sensor (S1)',
          emoji: '📡',
          worldPos: new THREE.Vector3(-1.2, 0.9, 1.2),
          description: 'Mendeteksi kedatangan mobil miniatur pada jarak aman',
          color: 'bg-cyan-600 text-white'
        },
        {
          id: 'car',
          name: 'Mobil Miniatur Uji',
          category: 'Objek Uji',
          emoji: '🚗',
          worldPos: new THREE.Vector3(1.2, 0.7, 2.4),
          description: 'Kendaraan simulasi yang mendekati gerbang palang otomatis',
          color: 'bg-blue-500 text-white'
        }
      ];

    case 'irrigation':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 0.8, 1.5),
          description: 'Membaca tingkat kelembapan tanah dan mengaktifkan gayung penyiraman',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'soil',
          name: 'Sensor Kelembapan Tanah',
          category: 'Sensor (S1)',
          emoji: '💧',
          worldPos: new THREE.Vector3(0.6, 0.7, 0.6),
          description: 'Probe konduktivitas pengukur kadar air dalam pot tanaman',
          color: 'bg-cyan-600 text-white'
        },
        {
          id: 'waterer',
          name: 'Gayung Siram Otomatis',
          category: 'Penggerak (M1)',
          emoji: '🚰',
          worldPos: new THREE.Vector3(-0.9, 2.4, 0),
          description: 'Mekanisme gayung tuang yang dikontrol oleh motor servo',
          color: 'bg-blue-500 text-white'
        },
        {
          id: 'plant',
          name: 'Tanaman Pot Uji',
          category: 'Spesimen',
          emoji: '🌱',
          worldPos: new THREE.Vector3(0, 1.2, 0),
          description: 'Tanaman yang dipantau kelembapan tanahnya secara otomatis',
          color: 'bg-emerald-600 text-white'
        }
      ];

    case 'earthquake-detector':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 0.8, 1.6),
          description: 'Mendeteksi getaran accelerometer/kemiringan dan menyalakan alarm peringatan',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'pendulum',
          name: 'Bandul Seismik Inersia',
          category: 'Mekanik',
          emoji: '🔔',
          worldPos: new THREE.Vector3(0, 1.3, 0),
          description: 'Bandul gravitasi kuningan penangkap gelombang getaran gempa bumi',
          color: 'bg-amber-600 text-white'
        },
        {
          id: 'alarm',
          name: 'Sirine Alarm Darurat',
          category: 'Output (O1)',
          emoji: '🚨',
          worldPos: new THREE.Vector3(0, 4.4, 0),
          description: 'Lampu suar merah dan buzzer tanda bahaya gempa dini',
          color: 'bg-red-600 text-white'
        },
        {
          id: 'drum',
          name: 'Drum Kertas Seismograf',
          category: 'Pencatat',
          emoji: '📜',
          worldPos: new THREE.Vector3(0, 0.6, -0.4),
          description: 'Silinder pencatat grafik getaran seismik bumi',
          color: 'bg-slate-600 text-white'
        }
      ];

    case 'conveyor-sorter':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 0.8, 1.8),
          description: 'Pusat komputasi kendali sabuk konveyor dan lengan servo sortir',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'belt',
          name: 'Sabuk Konveyor Karet',
          category: 'Mekanisme',
          emoji: '🔄',
          worldPos: new THREE.Vector3(0, 1.45, 0),
          description: 'Ban berjalan pembawa benda daur ulang menuju gerbang sortir',
          color: 'bg-slate-700 text-white'
        },
        {
          id: 'motor',
          name: 'Motor DC Konveyor',
          category: 'Penggerak (M1)',
          emoji: '⚙️',
          worldPos: new THREE.Vector3(1.8, 1.3, 0.85),
          description: 'Motor torsi tinggi pemutar roller drum konveyor',
          color: 'bg-orange-500 text-white'
        },
        {
          id: 'sensor',
          name: 'Sensor Optik Pemilah',
          category: 'Sensor (S1)',
          emoji: '👁️',
          worldPos: new THREE.Vector3(-0.4, 2.8, 0),
          description: 'Sensor deteksi barang untuk menentukan arah dorongan lengan servo',
          color: 'bg-cyan-600 text-white'
        }
      ];

    case 'crane-hoist':
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 0.8, 1.6),
          description: 'Mengatur motor servo katrol pengangkat beban derek',
          color: 'bg-blue-600 text-white'
        },
        {
          id: 'boom',
          name: 'Lengan Derek Boom Kayu',
          category: 'Struktur',
          emoji: '🏗️',
          worldPos: new THREE.Vector3(0, 3.5, 0),
          description: 'Rangka tiang derek penahan tali katrol baja',
          color: 'bg-amber-600 text-white'
        },
        {
          id: 'hook',
          name: 'Kait Katrol Beban',
          category: 'Penggerak (M1)',
          emoji: '🪝',
          worldPos: new THREE.Vector3(0, 1.8, 1.4),
          description: 'Kait pengangkat material konstruksi yang naik-turun',
          color: 'bg-blue-500 text-white'
        }
      ];

    default:
      return [
        {
          id: 'core',
          name: 'FUNNECT Core Controller',
          category: 'Otak Robot',
          emoji: '🧠',
          worldPos: new THREE.Vector3(0, 1.3, 0),
          description: 'Pusat kendali mikrokontroler dengan 6 port multi-fungsi',
          color: 'bg-blue-600 text-white'
        }
      ];
  }
};

const drawOledScreen = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  sim: SimulationState,
  pType: string
) => {
  ctx.clearRect(0, 0, 256, 128);

  const isSimulating = sim.isRunning;
  const isBraking = pType === 'robot-car' && isSimulating && sim.sensorValues.distance < 20;

  // Background dark OLED with subtle alert glow when braking
  ctx.fillStyle = isBraking ? '#3B0707' : '#090D16';
  ctx.fillRect(0, 0, 256, 128);

  // Subtle grid lines
  ctx.strokeStyle = isBraking ? '#7F1D1D' : '#1E293B';
  ctx.lineWidth = 1;
  for (let x = 0; x < 256; x += 16) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 128);
    ctx.stroke();
  }
  for (let y = 0; y < 128; y += 16) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(256, y);
    ctx.stroke();
  }

  // Battery bar top right
  const accentColor = isBraking ? '#EF4444' : '#38BDF8';
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.strokeRect(196, 10, 40, 16);
  ctx.fillStyle = accentColor;
  ctx.fillRect(200, 13, 26, 10);
  ctx.fillRect(237, 14, 3, 8);

  if (isBraking) {
    // ALERT STATE: Warning eyes & Emergency Brake Banner
    ctx.strokeStyle = '#EF4444';
    ctx.fillStyle = '#EF4444';
    ctx.lineWidth = 4;

    // Wide alarmed circle eyes
    ctx.beginPath();
    ctx.arc(88, 48, 16, 0, Math.PI * 2);
    ctx.arc(168, 48, 16, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(88, 48, 5, 0, Math.PI * 2);
    ctx.arc(168, 48, 5, 0, Math.PI * 2);
    ctx.fill();

    // Open surprised mouth
    ctx.beginPath();
    ctx.ellipse(128, 62, 11, 7, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Alert Text Banner
    ctx.font = 'bold 15px monospace';
    ctx.fillText(`🛑 REM! JARAK ${sim.sensorValues.distance}cm`, 28, 110);
  } else if (isSimulating) {
    // ACTIVE DRIVING / RUNNING STATE
    ctx.strokeStyle = '#38BDF8';
    ctx.fillStyle = '#38BDF8';
    ctx.lineWidth = 5;

    // Happy arched eyes
    ctx.beginPath();
    ctx.arc(88, 50, 18, Math.PI, 0, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(168, 50, 18, Math.PI, 0, false);
    ctx.stroke();

    // Friendly smile
    ctx.beginPath();
    ctx.arc(128, 64, 14, 0, Math.PI, false);
    ctx.stroke();

    // Status readout
    ctx.fillStyle = '#4ADE80';
    ctx.font = 'bold 13px monospace';
    if (pType === 'robot-car') {
      ctx.fillText(`MAJU ${sim.actuatorStates.motorSpeed}% · ${sim.sensorValues.distance}cm`, 34, 110);
    } else if (pType === 'windmill') {
      ctx.fillText(`KINCIR ANGIN · ${sim.sensorValues.light}% CAHAYA`, 22, 110);
    } else if (pType === 'irrigation') {
      ctx.fillText(`PENYIRAM · ${sim.sensorValues.moisture}% LEMBAB`, 22, 110);
    } else {
      ctx.fillText('SIMULASI BERJALAN · AKTIF', 24, 110);
    }
  } else {
    // STANDBY READY STATE
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(88, 50, 15, 0, Math.PI * 2);
    ctx.arc(168, 50, 15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(94, 45, 5, 0, Math.PI * 2);
    ctx.arc(174, 45, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(128, 64, 12, 0.2, Math.PI - 0.2);
    ctx.stroke();

    ctx.fillStyle = '#38BDF8';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('STEMp CORE · SIAP', 50, 110);
  }
};

export const FunnectCanvas3D: React.FC<{
  className?: string;
  onSelectPort?: (portId: PortId) => void;
  readOnly?: boolean;
  showLabelsProp?: boolean;
  onToggleLabels?: () => void;
  onSelectPart?: (part: PartLabel3D) => void;
  overrideProject?: FunnectProject;
  assemblyStage?: number;
  partVisibility?: {
    sticks?: boolean;
    connectors?: boolean;
    mechanisms?: boolean;
    electronics?: boolean;
    wires?: boolean;
  };
  activeModuleIds?: string[];
}> = ({ 
  className = '', 
  onSelectPort, 
  readOnly = false,
  showLabelsProp,
  onToggleLabels,
  onSelectPart,
  overrideProject,
  assemblyStage = 4,
  partVisibility,
  activeModuleIds
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    selectedProject: contextProject,
    coreDevice,
    cameraPreset,
    setCameraPreset,
    showGrid,
    setShowGrid,
    showSticksAndConnectors,
    setShowSticksAndConnectors,
    simulation,
    toggleSimulation,
    selectedPortForInspection,
    setSelectedPortForInspection
  } = useApp();

  const selectedProject = overrideProject || contextProject;

  const [webGlError, setWebGlError] = useState<string | null>(null);
  const [hoveredPort, setHoveredPort] = useState<PortId | null>(null);
  const [internalShowLabels, setInternalShowLabels] = useState(false);
  const [inspectedPart, setInspectedPart] = useState<PartLabel3D | null>(null);
  const [projectedLabels, setProjectedLabels] = useState<PartLabel3D[]>([]);

  const isLabelsVisible = showLabelsProp !== undefined ? showLabelsProp : internalShowLabels;

  const toggleLabels = () => {
    if (onToggleLabels) {
      onToggleLabels();
    } else {
      setInternalShowLabels(prev => !prev);
    }
  };

  // References to keep animation loop decoupled from React state churn
  const simulationRef = useRef(simulation);
  simulationRef.current = simulation;
  const selectedProjectRef = useRef(selectedProject);
  selectedProjectRef.current = selectedProject;
  const isLabelsVisibleRef = useRef(isLabelsVisible);
  isLabelsVisibleRef.current = isLabelsVisible;

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Dynamic moving parts
  const wheelsRef = useRef<THREE.Group[]>([]);
  const bladesRef = useRef<THREE.Group | null>(null);
  const servoArmRef = useRef<THREE.Group | null>(null);
  const lampLightRef = useRef<THREE.PointLight | null>(null);
  const obstacleMeshRef = useRef<THREE.Mesh | null>(null);
  const solarFlowerRef = useRef<THREE.Group | null>(null);
  const barrierArmRef = useRef<THREE.Group | null>(null);
  const barrierLedRef = useRef<THREE.Mesh | null>(null);
  const pendulumRef = useRef<THREE.Group | null>(null);
  const seismoAlarmRef = useRef<THREE.PointLight | null>(null);
  const conveyorRollersRef = useRef<THREE.Mesh[]>([]);
  const sorterArmRef = useRef<THREE.Group | null>(null);
  const craneHookRef = useRef<THREE.Group | null>(null);
  const portMeshesRef = useRef<Map<PortId, THREE.Mesh>>(new Map());
  const labelFrameCountRef = useRef(0);

  // Dynamic simulation visual effects
  const waterDropletsRef = useRef<THREE.Mesh[]>([]);
  const waterPoolRef = useRef<THREE.Mesh | null>(null);
  const roadLinesRef = useRef<THREE.Mesh[]>([]);
  const windRibbonsRef = useRef<THREE.Mesh[]>([]);
  const groundSpotlightRef = useRef<THREE.SpotLight | null>(null);
  const sonarWavesRef = useRef<THREE.Mesh[]>([]);
  const headlightsRef = useRef<THREE.SpotLight[]>([]);
  const carChassisGroupRef = useRef<THREE.Group | null>(null);
  const screenCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const screenContextRef = useRef<CanvasRenderingContext2D | null>(null);
  const screenTextureRef = useRef<THREE.CanvasTexture | null>(null);
  const coreStatusLedMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const coreStatusLightRef = useRef<THREE.PointLight | null>(null);

  // Mouse orbit & touch state
  const isDraggingRef = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef<number | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 1.2, 0));
  const cameraSpherical = useRef({ radius: 10, theta: Math.PI / 4, phi: Math.PI / 3.2 });
  const cameraDirtyRef = useRef(true);

  const updateCameraPosition = useCallback(() => {
    if (!cameraRef.current) return;
    const { radius, theta, phi } = cameraSpherical.current;
    const x = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.cos(theta);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(cameraTarget.current);
    cameraDirtyRef.current = true;
  }, []);

  // Helper to construct sticks & connectors
  const createStick = (
    x: number,
    y: number,
    z: number,
    rotX: number,
    rotY: number,
    rotZ: number,
    length = 2.4,
    mat: THREE.Material
  ) => {
    const stickGeo = new THREE.BoxGeometry(0.18, 0.08, length);
    const mesh = new THREE.Mesh(stickGeo, mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(rotX, rotY, rotZ);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };

  // Physically joins point A to point B with zero gap or float
  const createStickBetweenPoints = (
    p1: [number, number, number] | THREE.Vector3,
    p2: [number, number, number] | THREE.Vector3,
    mat: THREE.Material,
    width = 0.18,
    thickness = 0.08
  ) => {
    const v1 = p1 instanceof THREE.Vector3 ? p1 : new THREE.Vector3(...p1);
    const v2 = p2 instanceof THREE.Vector3 ? p2 : new THREE.Vector3(...p2);
    const dir = new THREE.Vector3().subVectors(v2, v1);
    const len = dir.length();
    if (len < 0.001) return new THREE.Mesh();

    const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
    const stickGeo = new THREE.BoxGeometry(width, thickness, len);
    const mesh = new THREE.Mesh(stickGeo, mat);
    mesh.position.copy(mid);

    const zAxis = new THREE.Vector3(0, 0, 1);
    const q = new THREE.Quaternion().setFromUnitVectors(zAxis, dir.clone().normalize());
    mesh.quaternion.copy(q);

    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };

  const createConnector = (
    x: number,
    y: number,
    z: number,
    mat: THREE.Material,
    scale = 0.32
  ) => {
    const connGeo = new THREE.DodecahedronGeometry(scale, 0);
    const mesh = new THREE.Mesh(connGeo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };

  // Helper to construct realistic continuous flexible wiring cables
  const createWire = (
    points: [number, number, number][],
    colorHex: number,
    radius = 0.022
  ) => {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const wireGeo = new THREE.TubeGeometry(curve, 24, radius, 8, false);
    const wireMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.45,
      metalness: 0.15
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    wireMesh.castShadow = true;
    return wireMesh;
  };

  // Helper to construct mechanical mounting brackets & clamps
  const createBracket = (
    x: number,
    y: number,
    z: number,
    w: number,
    h: number,
    d: number,
    colorHex = 0x334155
  ) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5, metalness: 0.3 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    return mesh;
  };

  // Build Scene Content
  const buildSceneContent = useCallback((scene: THREE.Scene) => {
    // Clear old dynamic objects
    const toRemove: THREE.Object3D[] = [];
    scene.children.forEach(child => {
      if (child.type === 'Group' || child.type === 'Mesh' || child.type === 'GridHelper') {
        toRemove.push(child);
      }
    });
    toRemove.forEach(obj => scene.remove(obj));

    // Reset dynamic refs
    wheelsRef.current = [];
    bladesRef.current = null;
    servoArmRef.current = null;
    lampLightRef.current = null;
    obstacleMeshRef.current = null;
    solarFlowerRef.current = null;
    barrierArmRef.current = null;
    barrierLedRef.current = null;
    pendulumRef.current = null;
    seismoAlarmRef.current = null;
    conveyorRollersRef.current = [];
    sorterArmRef.current = null;
    craneHookRef.current = null;
    portMeshesRef.current.clear();
    waterDropletsRef.current = [];
    waterPoolRef.current = null;
    roadLinesRef.current = [];
    windRibbonsRef.current = [];
    groundSpotlightRef.current = null;
    sonarWavesRef.current = [];
    headlightsRef.current = [];
    carChassisGroupRef.current = null;
    screenCanvasRef.current = null;
    screenContextRef.current = null;
    screenTextureRef.current = null;
    coreStatusLedMatRef.current = null;
    coreStatusLightRef.current = null;

    // 1. Grid Ground Plane & Showcase Pedestal
    if (showGrid) {
      const grid = new THREE.GridHelper(18, 18, 0xCBD5E1, 0xE2E8F0);
      grid.position.y = 0;
      scene.add(grid);
    }

    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    // Workbench / Showcase Pedestal Platform
    const pedestalGeo = new THREE.CylinderGeometry(5.2, 5.4, 0.22, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xF8FAFC,
      roughness: 0.35,
      metalness: 0.1
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.11;
    pedestal.receiveShadow = true;
    stageGroup.add(pedestal);

    // Subtle Accent Ring on Pedestal
    const ringGeo = new THREE.RingGeometry(4.7, 4.85, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38BDF8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6
    });
    const accentRing = new THREE.Mesh(ringGeo, ringMat);
    accentRing.rotation.x = -Math.PI / 2;
    accentRing.position.y = 0.002;
    stageGroup.add(accentRing);

    // Inner calibration dots
    const innerRingGeo = new THREE.RingGeometry(2.8, 2.85, 36);
    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0x94A3B8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.rotation.x = -Math.PI / 2;
    innerRing.position.y = 0.002;
    stageGroup.add(innerRing);

    // Common Materials Palette
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0xD4A373, // Popsicle stick natural timber
      roughness: 0.8,
      metalness: 0.05
    });

    const blueConnectorMat = new THREE.MeshStandardMaterial({
      color: 0x1D64F2, // FUNNECT Royal Blue
      roughness: 0.35,
      metalness: 0.15
    });

    const yellowConnectorMat = new THREE.MeshStandardMaterial({
      color: 0xF59E0B, // FUNNECT Warm Amber
      roughness: 0.35,
      metalness: 0.15
    });

    const coreWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xFFFFFF,
      roughness: 0.25,
      metalness: 0.1
    });

    const coreDarkMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      roughness: 0.5
    });

    const rubberMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.9
    });

    const cardboardMat = new THREE.MeshStandardMaterial({
      color: 0xBA8B55,
      roughness: 0.85
    });

    const pType = selectedProjectRef.current?.physicalBuildType || 'robot-car';

    // --- FUNNECT CORE (Central Microcontroller Box) ---
    const coreGroup = new THREE.Group();
    // Position Core adaptively depending on build type
    if (pType === 'robot-car') {
      coreGroup.position.set(0, 1.35, 0);
    } else if (pType === 'windmill') {
      coreGroup.position.set(0, 0.45, 1.4);
    } else if (pType === 'streetlight') {
      coreGroup.position.set(0, 1.2, -0.6);
    } else if (pType === 'solar-tracker') {
      coreGroup.position.set(0, 0.45, 1.5);
    } else if (pType === 'automatic-barrier') {
      coreGroup.position.set(-1.6, 0.45, 0);
    } else if (pType === 'earthquake-detector') {
      coreGroup.position.set(0, 0.45, 1.6);
    } else if (pType === 'conveyor-sorter') {
      coreGroup.position.set(0, 0.45, 1.8);
    } else if (pType === 'crane-hoist') {
      coreGroup.position.set(0, 0.45, 1.6);
    } else {
      coreGroup.position.set(0, 1.2, 0);
    }

    // Core Enclosure Body
    const coreBodyGeo = new THREE.BoxGeometry(2.4, 0.7, 1.8);
    const coreBody = new THREE.Mesh(coreBodyGeo, coreWhiteMat);
    coreBody.castShadow = true;
    coreBody.receiveShadow = true;
    coreGroup.add(coreBody);

    // Dynamic Interactive OLED Screen on Top of STEMp Core
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 256;
    screenCanvas.height = 128;
    screenCanvasRef.current = screenCanvas;
    const sCtx = screenCanvas.getContext('2d');
    screenContextRef.current = sCtx;
    if (sCtx) {
      drawOledScreen(screenCanvas, sCtx, simulationRef.current, pType);
    }
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTextureRef.current = screenTexture;

    const screenGeo = new THREE.PlaneGeometry(1.25, 0.65);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: false
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.rotation.x = -Math.PI / 2;
    screenMesh.position.set(0, 0.356, 0.15);
    coreGroup.add(screenMesh);

    // Brand Stripes
    const stripeBlueGeo = new THREE.PlaneGeometry(2.36, 0.25);
    const stripeBlue = new THREE.Mesh(stripeBlueGeo, blueConnectorMat);
    stripeBlue.rotation.x = -Math.PI / 2;
    stripeBlue.position.set(0, 0.355, -0.55);
    coreGroup.add(stripeBlue);

    const stripeYellowGeo = new THREE.PlaneGeometry(2.36, 0.1);
    const stripeYellow = new THREE.Mesh(stripeYellowGeo, yellowConnectorMat);
    stripeYellow.rotation.x = -Math.PI / 2;
    stripeYellow.position.set(0, 0.355, -0.38);
    coreGroup.add(stripeYellow);

    // Dynamic Status LED dot & localized glow
    const statusLedGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const statusLedMat = new THREE.MeshStandardMaterial({
      color: 0x10B981,
      emissive: 0x059669,
      emissiveIntensity: 1.2
    });
    coreStatusLedMatRef.current = statusLedMat;
    const statusLed = new THREE.Mesh(statusLedGeo, statusLedMat);
    statusLed.position.set(-0.8, 0.36, 0.6);
    coreGroup.add(statusLed);

    const statusLight = new THREE.PointLight(0x10B981, 0.8, 1.8);
    statusLight.position.set(-0.8, 0.45, 0.6);
    coreGroup.add(statusLight);
    coreStatusLightRef.current = statusLight;

    // Power Knob
    const switchGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.12, 12);
    const switchMesh = new THREE.Mesh(switchGeo, coreDarkMat);
    switchMesh.position.set(0.9, 0.4, 0.6);
    coreGroup.add(switchMesh);

    // Ports on Core
    const portDefs: { id: PortId; pos: [number, number, number]; color: number }[] = [
      { id: 'S1', pos: [-0.7, 0, 0.92], color: 0x3B82F6 },
      { id: 'S2', pos: [0.7, 0, 0.92], color: 0x3B82F6 },
      { id: 'M1', pos: [-0.7, 0, -0.92], color: 0xF97316 },
      { id: 'M2', pos: [0.7, 0, -0.92], color: 0xF97316 },
      { id: 'O1', pos: [-1.22, 0, -0.2], color: 0xEC4899 },
      { id: 'O2', pos: [1.22, 0, -0.2], color: 0x10B981 }
    ];

    portDefs.forEach(p => {
      const isSelected = selectedPortForInspection === p.id;
      const isPlugged = Boolean(coreDevice.ports[p.id]);

      const portBoxGeo = new THREE.BoxGeometry(0.38, 0.28, 0.22);
      const portMat = new THREE.MeshStandardMaterial({
        color: isSelected ? 0x3B82F6 : isPlugged ? p.color : 0x475569,
        emissive: isSelected ? 0x1D4ED8 : 0x000000,
        roughness: 0.3
      });
      const portMesh = new THREE.Mesh(portBoxGeo, portMat);
      portMesh.position.set(...p.pos);
      portMesh.userData = { portId: p.id };
      coreGroup.add(portMesh);
      portMeshesRef.current.set(p.id, portMesh);

      // Port Jack Slot
      const jackGeo = new THREE.BoxGeometry(0.24, 0.16, 0.06);
      const jackMesh = new THREE.Mesh(jackGeo, coreDarkMat);
      jackMesh.position.set(p.pos[0], p.pos[1], p.pos[2] + (p.pos[2] > 0 ? 0.1 : -0.1));
      coreGroup.add(jackMesh);
    });

    // When simulation is running or previewing full build, show all working parts
    const effectiveStage = (simulationRef.current.isRunning || overrideProject) ? 4 : assemblyStage;

    // Only show Core controller when effectiveStage >= 2 and electronics are enabled
    if (effectiveStage >= 2 && (partVisibility?.electronics ?? true)) {
      stageGroup.add(coreGroup);
    }

    // =========================================================
    // PHYSICAL CRAFT FRAME (Popsicle Sticks, Connectors & Actuators)
    // =========================================================
    if (showSticksAndConnectors) {
      const sticksGroup = new THREE.Group();

      populatePhysicalCraftFrame(sticksGroup, {
        pType,
        woodMat,
        cardboardMat,
        blueConnectorMat,
        yellowConnectorMat,
        rubberMat,
        createStick,
        createStickBetweenPoints,
        createConnector,
        createBracket,
        createWire,
        wheelsRef,
        bladesRef,
        servoArmRef,
        solarFlowerRef,
        barrierArmRef,
        barrierLedRef,
        pendulumRef,
        seismoAlarmRef,
        conveyorRollersRef,
        sorterArmRef,
        craneHookRef,
        lampLightRef,
        obstacleMeshRef,
        assemblyStage: effectiveStage,
        partVisibility,
        activeModuleIds
      });

      if (pType === 'robot-car') {
        carChassisGroupRef.current = sticksGroup;
      }

      stageGroup.add(sticksGroup);
    }

    // Dynamic Simulation Visual Props
    if (pType === 'robot-car') {
      const roadGroup = new THREE.Group();

      // 1. Asphalt Road Track
      const asphaltGeo = new THREE.PlaneGeometry(3.6, 18);
      const asphaltMat = new THREE.MeshStandardMaterial({
        color: 0x0F172A,
        roughness: 0.85,
        metalness: 0.15
      });
      const asphalt = new THREE.Mesh(asphaltGeo, asphaltMat);
      asphalt.rotation.x = -Math.PI / 2;
      asphalt.position.set(0, 0.005, 0);
      asphalt.receiveShadow = true;
      roadGroup.add(asphalt);

      // 2. White side borders
      [-1.72, 1.72].forEach(bx => {
        const borderGeo = new THREE.PlaneGeometry(0.1, 18);
        const borderMat = new THREE.MeshBasicMaterial({ color: 0xE2E8F0 });
        const border = new THREE.Mesh(borderGeo, borderMat);
        border.rotation.x = -Math.PI / 2;
        border.position.set(bx, 0.008, 0);
        roadGroup.add(border);
      });

      // 3. Bright yellow dashed center road lines that fly backward when driving
      for (let i = 0; i < 9; i++) {
        const rGeo = new THREE.PlaneGeometry(0.2, 1.0);
        const rMat = new THREE.MeshStandardMaterial({
          color: 0xFACC15,
          emissive: 0xEAB308,
          emissiveIntensity: 0.7
        });
        const rMesh = new THREE.Mesh(rGeo, rMat);
        rMesh.rotation.x = -Math.PI / 2;
        rMesh.position.set(0, 0.01, -7.2 + i * 1.8);
        roadGroup.add(rMesh);
        roadLinesRef.current.push(rMesh);
      }

      // 4. Ultrasonic Sonar Pulse Wave Arcs
      for (let i = 0; i < 4; i++) {
        const waveGeo = new THREE.RingGeometry(0.28 + i * 0.35, 0.38 + i * 0.35, 24, 1, 0, Math.PI);
        const waveMat = new THREE.MeshBasicMaterial({
          color: 0x38BDF8,
          transparent: true,
          opacity: 0.7,
          side: THREE.DoubleSide
        });
        const wave = new THREE.Mesh(waveGeo, waveMat);
        wave.rotation.x = -Math.PI / 2;
        wave.position.set(0, 1.3, 2.0 + i * 0.6);
        wave.visible = false;
        roadGroup.add(wave);
        sonarWavesRef.current.push(wave);
      }

      // 5. Dual Front Headlights Spotlights casting light down the road
      [-0.7, 0.7].forEach(hx => {
        const spot = new THREE.SpotLight(0xE0F2FE, 2.2, 12, Math.PI / 6, 0.35);
        spot.position.set(hx, 0.8, 1.5);
        spot.target.position.set(hx * 0.4, 0.1, 6.5);
        roadGroup.add(spot);
        roadGroup.add(spot.target);
        headlightsRef.current.push(spot);
      });

      stageGroup.add(roadGroup);
    } else if (pType === 'irrigation') {
      const waterGroup = new THREE.Group();
      for (let i = 0; i < 14; i++) {
        const dropGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const dropMat = new THREE.MeshStandardMaterial({
          color: 0x38BDF8,
          roughness: 0.1,
          transparent: true,
          opacity: 0.95,
          emissive: 0x0284C7,
          emissiveIntensity: 0.8
        });
        const drop = new THREE.Mesh(dropGeo, dropMat);
        drop.position.set(-0.25 + (Math.random() - 0.5) * 0.15, 2.0 - (i % 7) * 0.22, (Math.random() - 0.5) * 0.15);
        drop.visible = false;
        waterGroup.add(drop);
        waterDropletsRef.current.push(drop);
      }
      stageGroup.add(waterGroup);

      const poolGeo = new THREE.CircleGeometry(0.42, 16);
      poolGeo.rotateX(-Math.PI / 2);
      const poolMat = new THREE.MeshBasicMaterial({ color: 0x0284C7, transparent: true, opacity: 0.7 });
      const poolMesh = new THREE.Mesh(poolGeo, poolMat);
      poolMesh.position.set(0, 0.65, 0);
      poolMesh.visible = false;
      stageGroup.add(poolMesh);
      waterPoolRef.current = poolMesh;
    } else if (pType === 'windmill') {
      const windGroup = new THREE.Group();
      for (let i = 0; i < 8; i++) {
        const wGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 4);
        wGeo.rotateX(Math.PI / 2);
        const wMat = new THREE.MeshBasicMaterial({ color: 0xBAE6FD, transparent: true, opacity: 0.7 });
        const wMesh = new THREE.Mesh(wGeo, wMat);
        wMesh.position.set((Math.random() - 0.5) * 3, 3.5 + (Math.random() - 0.5) * 1.5, -3 + i * 0.8);
        wMesh.visible = false;
        windGroup.add(wMesh);
        windRibbonsRef.current.push(wMesh);
      }
      stageGroup.add(windGroup);
    } else if (pType === 'streetlight') {
      const spot = new THREE.SpotLight(0xFEF08A, 0, 12, Math.PI / 4, 0.4);
      spot.position.set(1.4, 3.8, 0);
      spot.target.position.set(1.4, 0, 0);
      stageGroup.add(spot);
      stageGroup.add(spot.target);
      groundSpotlightRef.current = spot;
    }
  }, [coreDevice.ports, selectedPortForInspection, showGrid, showSticksAndConnectors, assemblyStage, simulation.isRunning, partVisibility, activeModuleIds, selectedProject.id, selectedProject.physicalBuildType]);

  const buildSceneContentRef = useRef(buildSceneContent);
  buildSceneContentRef.current = buildSceneContent;

  // Main Effect: Initialize Renderer, Scene, Camera & Animation Loop
  useEffect(() => {
    if (!containerRef.current) return;

    setWebGlError(null);

    const width = Math.max(containerRef.current.clientWidth, 320);
    const height = Math.max(containerRef.current.clientHeight, 280);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e: any) {
      console.error('Failed to initialize WebGL context:', e);
      setWebGlError(e?.message || 'WebGL context could not be created');
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    containerRef.current.replaceChildren(renderer.domElement);

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F1F5F9'); // Clean soft slate neutral
    sceneRef.current = scene;

    // 2. Camera
    const aspect = height > 0 ? width / height : 1.33;
    const camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    cameraRef.current = camera;
    updateCameraPosition();

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
    dirLight.position.set(8, 14, 8);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 30;
    dirLight.shadow.bias = -0.001;
    scene.add(dirLight);

    const softFillLight = new THREE.DirectionalLight(0x93C5FD, 0.45);
    softFillLight.position.set(-6, 6, -6);
    scene.add(softFillLight);

    // 4. Build dynamic model content using latest ref
    buildSceneContentRef.current(scene);

    // 5. Animation Loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const sim = simulationRef.current;
      const proj = selectedProjectRef.current;
      const pType = proj?.physicalBuildType || 'robot-car';

      // 0. Update OLED Screen & Core Status LED dynamically in real-time
      if (screenCanvasRef.current && screenContextRef.current && screenTextureRef.current) {
        if (labelFrameCountRef.current % 5 === 0) {
          drawOledScreen(screenCanvasRef.current, screenContextRef.current, sim, pType);
          screenTextureRef.current.needsUpdate = true;
        }
      }

      if (coreStatusLedMatRef.current) {
        if (!sim.isRunning) {
          coreStatusLedMatRef.current.color.setHex(0x3B82F6);
          coreStatusLedMatRef.current.emissive.setHex(0x1D4ED8);
          coreStatusLedMatRef.current.emissiveIntensity = 0.8;
          if (coreStatusLightRef.current) {
            coreStatusLightRef.current.color.setHex(0x3B82F6);
            coreStatusLightRef.current.intensity = 0.5;
          }
        } else if (pType === 'robot-car' && sim.sensorValues.distance < 20) {
          // Warning rapid blink
          const isFlash = Math.sin(performance.now() * 0.02) > 0;
          coreStatusLedMatRef.current.color.setHex(isFlash ? 0xEF4444 : 0x7F1D1D);
          coreStatusLedMatRef.current.emissive.setHex(isFlash ? 0xDC2626 : 0x000000);
          coreStatusLedMatRef.current.emissiveIntensity = isFlash ? 2.5 : 0.2;
          if (coreStatusLightRef.current) {
            coreStatusLightRef.current.color.setHex(0xEF4444);
            coreStatusLightRef.current.intensity = isFlash ? 2.0 : 0.1;
          }
        } else {
          // Active normal running (Emerald Green)
          coreStatusLedMatRef.current.color.setHex(0x10B981);
          coreStatusLedMatRef.current.emissive.setHex(0x059669);
          coreStatusLedMatRef.current.emissiveIntensity = 1.5;
          if (coreStatusLightRef.current) {
            coreStatusLightRef.current.color.setHex(0x10B981);
            coreStatusLightRef.current.intensity = 1.0;
          }
        }
      }

      // 1. Robot Car
      if (pType === 'robot-car') {
        const isObstacleClose = sim.sensorValues.distance < 20;
        const isDriving = sim.isRunning && sim.actuatorStates.motorSpeed > 0 && !isObstacleClose;
        const speed = (sim.actuatorStates.motorSpeed / 100) * 0.28;
        const dir = sim.actuatorStates.motorDirection === 'reverse' ? -1 : 1;

        // 1a. Wheels rotation with spokes spinning
        wheelsRef.current.forEach(wheel => {
          if (isDriving) {
            wheel.rotation.x += speed * dir;
          }
        });

        // 1b. Road yellow dashed lines fly past rapidly
        roadLinesRef.current.forEach(r => {
          if (isDriving) {
            r.position.z -= 0.14 * (sim.actuatorStates.motorSpeed / 80) * dir;
            if (r.position.z < -7.2) r.position.z += 16.2;
            if (r.position.z > 9.0) r.position.z -= 16.2;
          }
        });

        // 1c. Obstacle target positioning & alert glow
        if (obstacleMeshRef.current) {
          const zPos = 2.5 + (sim.sensorValues.distance / 100) * 3.5;
          obstacleMeshRef.current.position.z = zPos;
          const obsMat = obstacleMeshRef.current.material as THREE.MeshStandardMaterial;

          if (isObstacleClose && sim.isRunning) {
            // BRAKE TRIGGERED! Obstacle flashes red with warning pulse
            const pulse = 1.0 + Math.sin(performance.now() * 0.02) * 0.12;
            obstacleMeshRef.current.scale.set(pulse, pulse, pulse);
            if (obsMat) {
              obsMat.color.setHex(0xEF4444);
              obsMat.emissive.setHex(0xDC2626);
              obsMat.emissiveIntensity = 1.8;
            }
          } else {
            obstacleMeshRef.current.scale.set(1, 1, 1);
            if (obsMat) {
              obsMat.color.setHex(0xEF4444);
              obsMat.emissive.setHex(0x000000);
              obsMat.emissiveIntensity = 0;
            }
          }
        }

        // 1d. Ultrasonic Sonar Pulse Waves
        const tWave = performance.now() * 0.006;
        sonarWavesRef.current.forEach((wave, idx) => {
          if (sim.isRunning) {
            wave.visible = true;
            const cycle = (tWave + idx * 0.25) % 1.0;
            const targetZ = obstacleMeshRef.current ? obstacleMeshRef.current.position.z : 4.5;
            wave.position.z = 1.8 + cycle * (targetZ - 1.8);
            const wMat = wave.material as THREE.MeshBasicMaterial;
            if (wMat) {
              wMat.opacity = Math.max(0, 0.8 * (1 - cycle));
              wMat.color.setHex(isObstacleClose ? 0xEF4444 : 0x06B6D4);
            }
            const s = 0.8 + cycle * 0.8;
            wave.scale.set(s, s, s);
          } else {
            wave.visible = false;
          }
        });

        // 1e. Headlights
        headlightsRef.current.forEach(spot => {
          spot.intensity = sim.isRunning ? 2.5 : 0.4;
        });

        // 1f. Chassis micro-vibration when driving, and hard forward brake pitch when stopped by obstacle
        if (carChassisGroupRef.current) {
          if (isDriving) {
            carChassisGroupRef.current.position.y = Math.sin(performance.now() * 0.03) * 0.015;
            carChassisGroupRef.current.rotation.x = THREE.MathUtils.lerp(carChassisGroupRef.current.rotation.x, 0, 0.1);
          } else if (sim.isRunning && isObstacleClose) {
            carChassisGroupRef.current.position.y = 0;
            carChassisGroupRef.current.rotation.x = THREE.MathUtils.lerp(carChassisGroupRef.current.rotation.x, -0.045, 0.15);
          } else {
            carChassisGroupRef.current.position.y = 0;
            carChassisGroupRef.current.rotation.x = THREE.MathUtils.lerp(carChassisGroupRef.current.rotation.x, 0, 0.1);
          }
        }
      }

      // 2. Windmill
      if (pType === 'windmill' && sim.isRunning) {
        const bladeSpeed = (sim.actuatorStates.motorSpeed / 100) * 0.35 + 0.08;
        if (bladesRef.current) {
          bladesRef.current.rotation.z -= bladeSpeed;
        }
        windRibbonsRef.current.forEach(w => {
          w.visible = true;
          w.position.z += bladeSpeed * 0.8;
          if (w.position.z > 3) w.position.z = -3;
        });
      }

      // 3. Irrigation (Watering System)
      if (pType === 'irrigation') {
        const isDrying = sim.isRunning && (sim.sensorValues.moisture < 30 || sim.actuatorStates.servoAngle > 20);
        if (servoArmRef.current) {
          const targetAngle = isDrying ? (65 * Math.PI) / 180 : 0;
          servoArmRef.current.rotation.x = THREE.MathUtils.lerp(
            servoArmRef.current.rotation.x,
            targetAngle,
            0.08
          );
        }

        // Active blue water droplet stream pouring from cup to soil!
        waterDropletsRef.current.forEach((drop, idx) => {
          if (isDrying) {
            drop.visible = true;
            drop.position.y -= 0.065;
            drop.position.x = -0.22 + Math.sin(performance.now() * 0.01 + idx) * 0.03;
            if (drop.position.y < 0.68) {
              drop.position.y = 2.05;
            }
          } else {
            drop.visible = false;
          }
        });

        // Expanding glistening soil moisture pool
        if (waterPoolRef.current) {
          if (isDrying) {
            waterPoolRef.current.visible = true;
            const s = 1.0 + Math.sin(performance.now() * 0.006) * 0.12;
            waterPoolRef.current.scale.set(s, s, s);
          } else {
            waterPoolRef.current.visible = false;
          }
        }
      }

      // 4. Streetlight
      if (pType === 'streetlight') {
        const isLit = sim.isRunning && (sim.sensorValues.light < 35 || sim.actuatorStates.ledState);
        if (lampLightRef.current) {
          lampLightRef.current.intensity = isLit ? 2.5 : 0.05;
        }
        if (groundSpotlightRef.current) {
          groundSpotlightRef.current.intensity = isLit ? 3.0 : 0;
        }
        if (sceneRef.current) {
          sceneRef.current.background = new THREE.Color(isLit ? '#0F172A' : '#F1F5F9');
        }
      }

      // 5. Solar Tracker
      if (solarFlowerRef.current && pType === 'solar-tracker') {
        const targetAngle = ((sim.actuatorStates.servoAngle - 80) * Math.PI) / 180;
        solarFlowerRef.current.rotation.y = THREE.MathUtils.lerp(
          solarFlowerRef.current.rotation.y,
          targetAngle,
          0.08
        );
      }

      // 6. Automatic Barrier
      if (barrierArmRef.current && pType === 'automatic-barrier') {
        const targetAngle = (sim.actuatorStates.servoAngle * Math.PI) / 180;
        barrierArmRef.current.rotation.z = THREE.MathUtils.lerp(
          barrierArmRef.current.rotation.z,
          targetAngle,
          0.12
        );
        if (barrierLedRef.current) {
          const isGreen = sim.actuatorStates.servoAngle > 45;
          (barrierLedRef.current.material as THREE.MeshStandardMaterial).color.setHex(isGreen ? 0x10B981 : 0xEF4444);
          (barrierLedRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(isGreen ? 0x059669 : 0xDC2626);
        }
      }

      // 7. Earthquake Detector
      if (pendulumRef.current && pType === 'earthquake-detector') {
        const isTremor = sim.actuatorStates.buzzerActive;
        if (isTremor) {
          const t = performance.now() * 0.02;
          pendulumRef.current.rotation.z = Math.sin(t) * 0.35;
          pendulumRef.current.rotation.x = Math.cos(t * 0.8) * 0.2;
        } else {
          pendulumRef.current.rotation.z = THREE.MathUtils.lerp(pendulumRef.current.rotation.z, 0, 0.05);
          pendulumRef.current.rotation.x = THREE.MathUtils.lerp(pendulumRef.current.rotation.x, 0, 0.05);
        }
        if (seismoAlarmRef.current) {
          seismoAlarmRef.current.intensity = isTremor ? (Math.sin(performance.now() * 0.02) > 0 ? 2.5 : 0.2) : 0;
        }
      }

      // 8. Conveyor Sorter
      if (pType === 'conveyor-sorter') {
        if (sim.isRunning) {
          conveyorRollersRef.current.forEach(roller => {
            roller.rotation.x += 0.15;
          });
        }
        if (sorterArmRef.current) {
          const targetAngle = (sim.actuatorStates.servoAngle * Math.PI) / 180;
          sorterArmRef.current.rotation.y = THREE.MathUtils.lerp(
            sorterArmRef.current.rotation.y,
            targetAngle,
            0.1
          );
        }
      }

      // 9. Crane Hoist
      if (craneHookRef.current && pType === 'crane-hoist') {
        const targetY = 1.0 + (sim.actuatorStates.servoAngle / 90) * 1.5;
        craneHookRef.current.position.y = THREE.MathUtils.lerp(
          craneHookRef.current.position.y,
          targetY,
          0.08
        );
      }

      // 10. Update Part Labels 2D Screen Projections (smoothly throttled and only when camera moved or active)
      labelFrameCountRef.current++;
      const shouldUpdateLabels = isLabelsVisibleRef.current && containerRef.current && (
        cameraDirtyRef.current ||
        sim.isRunning ||
        labelFrameCountRef.current % 6 === 0
      );

      if (shouldUpdateLabels && containerRef.current && cameraRef.current) {
        cameraDirtyRef.current = false;
        const pTypeNow = selectedProjectRef.current?.physicalBuildType || 'robot-car';
        const labels = getPartLabelsForBuildType(pTypeNow);
        const rect = containerRef.current.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;

        if (w > 0 && h > 0) {
          const updated = labels.map(label => {
            const v = label.worldPos.clone();
            v.project(cameraRef.current!);
            // v.z between -1 and 1 means in front of camera frustum
            const inFront = v.z < 1 && v.z > -1;
            const screenX = ((v.x + 1) * w) / 2;
            const screenY = ((-v.y + 1) * h) / 2;
            const visible = inFront && screenX >= 20 && screenX <= w - 20 && screenY >= 20 && screenY <= h - 20;

            return {
              ...label,
              screenX,
              screenY,
              visible
            };
          });
          setProjectedLabels(updated);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. ResizeObserver for precise container sizing
    let resizeTimer: any = null;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 10 && newH > 10 && rendererRef.current && cameraRef.current) {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
            if (rendererRef.current && cameraRef.current) {
              cameraRef.current.aspect = newW / newH;
              cameraRef.current.updateProjectionMatrix();
              rendererRef.current.setSize(newW, newH);
              cameraDirtyRef.current = true;
            }
          }, 50);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.forceContextLoss();
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
        rendererRef.current = null;
      }
    };
  }, [updateCameraPosition]);

  // Re-build scene content when dependencies change without recreating WebGL context
  useEffect(() => {
    if (sceneRef.current) {
      buildSceneContent(sceneRef.current);
      cameraDirtyRef.current = true;
    }
  }, [buildSceneContent, selectedProject.id, selectedProject.physicalBuildType, assemblyStage, partVisibility, activeModuleIds]);

  // Mouse & Touch Orbit Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      cameraSpherical.current.theta -= deltaX * 0.008;
      cameraSpherical.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.05, cameraSpherical.current.phi - deltaY * 0.008)
      );

      updateCameraPosition();
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      return;
    }

    // Raycast for hover on ports
    if (containerRef.current && cameraRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);

      const portMeshes = Array.from(portMeshesRef.current.values()) as THREE.Object3D[];
      const intersects = raycaster.intersectObjects(portMeshes, false);

      if (intersects.length > 0) {
        const foundPort = intersects[0].object.userData.portId as PortId;
        setHoveredPort(foundPort);
        containerRef.current.style.cursor = 'pointer';
      } else {
        setHoveredPort(null);
        containerRef.current.style.cursor = 'grab';
      }
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile and tablet touchscreens
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchStartPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      isDraggingRef.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDraggingRef.current) {
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      cameraSpherical.current.theta -= deltaX * 0.008;
      cameraSpherical.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.05, cameraSpherical.current.phi - deltaY * 0.008)
      );

      updateCameraPosition();
      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2 && touchDistanceRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const pinchDelta = touchDistanceRef.current - currentDist;

      cameraSpherical.current.radius = Math.max(
        4,
        Math.min(18, cameraSpherical.current.radius + pinchDelta * 0.02)
      );
      touchDistanceRef.current = currentDist;
      updateCameraPosition();
    }
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    touchDistanceRef.current = null;
  };

  const handleClick = (e: React.MouseEvent) => {
    if (containerRef.current && cameraRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), cameraRef.current);
      const portMeshes = Array.from(portMeshesRef.current.values()) as THREE.Object3D[];
      const intersects = raycaster.intersectObjects(portMeshes, false);

      if (intersects.length > 0) {
        const clickedPort = intersects[0].object.userData.portId as PortId;
        setSelectedPortForInspection(clickedPort);
        if (onSelectPort) {
          onSelectPort(clickedPort);
        }
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    cameraSpherical.current.radius = Math.max(
      4,
      Math.min(18, cameraSpherical.current.radius + e.deltaY * 0.01)
    );
    updateCameraPosition();
  };

  const resetCamera = () => {
    cameraSpherical.current = { radius: 10, theta: Math.PI / 4, phi: Math.PI / 3.2 };
    updateCameraPosition();
  };

  const setCameraView = (view: 'perspective' | 'top' | 'front' | 'side') => {
    setCameraPreset(view);
    if (view === 'top') {
      cameraSpherical.current = { radius: 10, theta: 0, phi: 0.05 };
    } else if (view === 'front') {
      cameraSpherical.current = { radius: 10, theta: 0, phi: Math.PI / 2 - 0.05 };
    } else if (view === 'side') {
      cameraSpherical.current = { radius: 10, theta: Math.PI / 2, phi: Math.PI / 2 - 0.05 };
    } else {
      cameraSpherical.current = { radius: 10, theta: Math.PI / 4, phi: Math.PI / 3.2 };
    }
    updateCameraPosition();
  };

  return (
    <div className={`relative w-full h-full min-h-[360px] select-none overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200 shadow-sm ${className}`}>
      {/* 3D Canvas Element */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onClick={handleClick}
        onWheel={handleWheel}
      />

      {/* WebGL Fallback if Context Creation Failed */}
      {webGlError && (
        <div className="absolute inset-0 bg-slate-900/90 text-white flex flex-col items-center justify-center p-6 text-center space-y-4 z-20">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-black">3D Renderer Temporarily Unavailable</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Browser WebGL context limit was reached. Click below to reconnect the 3D physics viewport.
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload 3D Engine</span>
          </button>
        </div>
      )}

      {/* Top Floating Control Bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        {/* Left: Project Badge & Active status */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-200/80 flex items-center gap-2">
            <span className="text-base">{selectedProject.badgeEmoji}</span>
            <span className="text-xs font-bold text-slate-800">{selectedProject.title}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </div>

          {/* Quick Simulation Toggle */}
          <button
            onClick={toggleSimulation}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all ${
              simulation.isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white animate-pulse'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {simulation.isRunning ? (
              <>
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Simulator</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Camera Presets & Toggles */}
        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-sm border border-slate-200/80 pointer-events-auto">
          <button
            onClick={() => setCameraView('perspective')}
            title="Perspective View"
            className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
              cameraPreset === 'perspective' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            3D
          </button>
          <button
            onClick={() => setCameraView('top')}
            title="Top Down"
            className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
              cameraPreset === 'top' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Top
          </button>
          <button
            onClick={() => setCameraView('front')}
            title="Front View"
            className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
              cameraPreset === 'front' ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Front
          </button>

          <div className="w-[1px] h-4 bg-slate-200 my-auto mx-0.5" />

          {/* Grid Toggle */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle Grid Ground"
            className={`p-1.5 rounded-lg transition-colors ${
              showGrid ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-100'
            }`}
          >
            <GridIcon className="w-3.5 h-3.5" />
          </button>

          {/* Sticks Toggle */}
          <button
            onClick={() => setShowSticksAndConnectors(!showSticksAndConnectors)}
            title="Toggle Craft Materials"
            className={`p-1.5 rounded-lg transition-colors ${
              showSticksAndConnectors ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
          </button>

          {/* Part Labels Toggle */}
          <button
            onClick={toggleLabels}
            title="Tampilkan / Sembunyikan Nama Bagian 3D"
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold transition-all ${
              isLabelsVisible 
                ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-300' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nama Bagian</span>
          </button>

          {/* Reset Camera */}
          <button
            onClick={resetCamera}
            title="Reset Camera"
            className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Floating 3D Part Pin Labels Overlay */}
      {isLabelsVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {projectedLabels.map(label => {
            if (!label.visible || label.screenX === undefined || label.screenY === undefined) return null;
            const isSelected = inspectedPart?.id === label.id;

            return (
              <div
                key={label.id}
                className="absolute pointer-events-auto transition-transform duration-75 ease-out"
                style={{
                  left: `${label.screenX}px`,
                  top: `${label.screenY}px`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setInspectedPart(isSelected ? null : label);
                    if (onSelectPart) onSelectPart(label);
                  }}
                  className={`group relative flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border backdrop-blur-md transition-all duration-200 ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-300 scale-110 ring-4 ring-amber-300/40 z-30'
                      : 'bg-white/95 text-slate-800 border-slate-200 hover:scale-105 hover:border-blue-400 hover:shadow-xl'
                  }`}
                >
                  <span className="text-xs">{label.emoji}</span>
                  <span className="text-[11px] font-bold tracking-tight whitespace-nowrap">
                    {label.name}
                  </span>

                  {/* Pulsing indicator pin */}
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-white animate-ping' : 'bg-blue-500'
                    }`}
                  />

                  {/* Pin downward stem */}
                  <div 
                    className={`absolute left-1/2 -bottom-1.5 w-1.5 h-1.5 -translate-x-1/2 rotate-45 border-r border-b ${
                      isSelected ? 'bg-amber-500 border-amber-300' : 'bg-white border-slate-200'
                    }`} 
                  />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Inspected Part Detail Popover Card */}
      {inspectedPart && (
        <div className="absolute top-14 left-3 right-3 max-w-sm mx-auto z-30 pointer-events-auto animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-amber-200 p-3.5 ring-2 ring-amber-400/20">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-1 bg-amber-50 rounded-xl border border-amber-200/60">
                  {inspectedPart.emoji}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {inspectedPart.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                    {inspectedPart.name}
                  </h4>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectedPart(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                title="Tutup Info"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed bg-slate-50/80 p-2 rounded-xl border border-slate-100">
              {inspectedPart.description}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Floating Port Indicator */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        {/* Hovered / Selected Port Banner */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-bold text-slate-800">
              Port {selectedPortForInspection || '—'}:
            </span>
          </div>

          <div className="text-xs text-slate-600">
            {selectedPortForInspection && coreDevice.ports[selectedPortForInspection] ? (
              <span className="font-semibold text-blue-700">
                {coreDevice.ports[selectedPortForInspection]?.name}
              </span>
            ) : (
              <span className="text-slate-400">Pilih port untuk modul</span>
            )}
          </div>
        </div>

        {/* 3D Navigation Hint */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-400 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-slate-200/60">
          <span>🖱️ Putar 3D</span>
          <span>•</span>
          <span>Scroll Zoom</span>
          <span>•</span>
          <span>🏷️ Klik label benda</span>
        </div>
      </div>
    </div>
  );
};
