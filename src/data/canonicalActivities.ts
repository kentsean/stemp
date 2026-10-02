/**
 * STEMp Canonical Activity Dataset
 * Single source of truth for:
 * - Activity catalog
 * - Function recommendations
 * - 3D Build instructions
 * - Interactive Test simulations
 * - Teacher lesson guides & reflections
 */

export interface ActivityBehavior {
  id: string;
  category: 'GERAK' | 'MERESPONS' | 'OUTPUT';
  title: string;
  shortDescription: string;
  iconName: string;
  color: string;
}

export interface ActivityMaterial {
  name: string;
  quantity: string;
  isElectronic: boolean;
  category: 'core' | 'modul' | 'kerajinan' | 'alat';
  notes?: string;
}

export interface ActivityBuildStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tipGuru?: string;
  partsNeeded: string[];
  visualFocus: 'chassis' | 'motors' | 'core' | 'sensor' | 'wheels' | 'wires' | 'mechanism';
}

export interface LessonPhase {
  phase: number;
  durationMinutes: number;
  title: string;
  teacherAction: string;
  studentAction: string;
}

export interface CanonicalActivity {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  behaviorId: string;
  gradeMin: number;
  gradeMax: number;
  gradeLabel: string;
  durationMinutes: number;
  subject: string;
  difficulty: 'Sangat Mudah' | 'Mudah' | 'Sedang';
  learningGoals: string[];
  learningOutcomes: string;
  requiredModules: {
    id: string;
    name: string;
    port: string;
    role: string;
  }[];
  materials: ActivityMaterial[];
  buildSteps: ActivityBuildStep[];
  starterLogicSummary: {
    condition: string;
    action: string;
    explanation: string;
  };
  physicalBuildType:
    | 'robot-car'
    | 'windmill'
    | 'irrigation'
    | 'streetlight'
    | 'solar-tracker'
    | 'automatic-barrier'
    | 'earthquake-detector'
    | 'conveyor-sorter'
    | 'crane-hoist';
  testControls: {
    primarySensor: 'distance' | 'light' | 'moisture' | 'button' | 'speed';
    sensorLabel: string;
    sensorUnit: string;
    defaultSensorValue: number;
    thresholdValue?: number;
    successConditionText: string;
  };
  lessonFlow: LessonPhase[];
  reflectionQuestions: string[];
  commonMistakes: string[];
}

export const ACTIVITY_BEHAVIORS: ActivityBehavior[] = [
  // --- KATEGORI 1: GERAK ---
  {
    id: 'gerak-maju',
    category: 'GERAK',
    title: 'Bergerak Maju',
    shortDescription: 'Gunakan motor untuk membuat proyek bergerak maju lurus atau berputar roda.',
    iconName: 'ArrowUp',
    color: '#0284C7',
  },
  {
    id: 'berputar',
    category: 'GERAK',
    title: 'Berputar',
    shortDescription: 'Memutar baling-baling kincir, kipas kertas, atau roda berputar santai.',
    iconName: 'RotateCw',
    color: '#0284C7',
  },
  {
    id: 'berbelok',
    category: 'GERAK',
    title: 'Berbelok & Manuver',
    shortDescription: 'Mengatur perbedaan kecepatan motor roda kiri dan roda kanan.',
    iconName: 'CornerUpRight',
    color: '#0284C7',
  },

  // --- KATEGORI 2: MERESPONS ---
  {
    id: 'berhenti-objek',
    category: 'MERESPONS',
    title: 'Berhenti saat ada objek',
    shortDescription: 'Sensor ultrasonik mendeteksi rintangan di depan dan menghentikan motor.',
    iconName: 'ShieldAlert',
    color: '#059669',
  },
  {
    id: 'reaksi-cahaya',
    category: 'MERESPONS',
    title: 'Bereaksi terhadap cahaya',
    shortDescription: 'Sensor cahaya menyalakan lampu saat gelap atau menyesuaikan kecepatan.',
    iconName: 'SunMedium',
    color: '#059669',
  },
  {
    id: 'reaksi-kelembapan',
    category: 'MERESPONS',
    title: 'Bereaksi terhadap kelembapan',
    shortDescription: 'Sensor mengukur tanah kering untuk membuka katup air otomatis.',
    iconName: 'Droplets',
    color: '#059669',
  },
  {
    id: 'tekan-tombol',
    category: 'MERESPONS',
    title: 'Bergerak saat tombol ditekan',
    shortDescription: 'Tombol sentuh sederhana memicu lampu, alarm, atau putaran baling-baling.',
    iconName: 'ToggleLeft',
    color: '#059669',
  },

  // --- KATEGORI 3: OUTPUT ---
  {
    id: 'menggerakkan-gerbang',
    category: 'OUTPUT',
    title: 'Menggerakkan gerbang',
    shortDescription: 'Motor servo mengangkat palang gerbang parkir atau jembatan angkat.',
    iconName: 'SlidersHorizontal',
    color: '#D97706',
  },
  {
    id: 'menyalakan-lampu',
    category: 'OUTPUT',
    title: 'Menyalakan lampu',
    shortDescription: 'Menyalakan LED indikator hijau, kuning, atau merah sesuai kondisi.',
    iconName: 'Lightbulb',
    color: '#D97706',
  },
  {
    id: 'membunyikan-alarm',
    category: 'OUTPUT',
    title: 'Membunyikan alarm',
    shortDescription: 'Buzzer menghasilkan nada peringatan suara ketika terjadi bahaya.',
    iconName: 'Volume2',
    color: '#D97706',
  },
];

export const CANONICAL_ACTIVITIES: CanonicalActivity[] = [
  // 1. MOBIL ANTI-TABRAK (Flagship Demo)
  {
    id: 'mobil-anti-tabrak',
    slug: 'mobil-anti-tabrak',
    title: 'Mobil Anti-Tabrak',
    subtitle: 'Kendaraan roda pintar yang otomatis berhenti dan rem saat mendekati rintangan.',
    behaviorId: 'berhenti-objek',
    gradeMin: 4,
    gradeMax: 5,
    gradeLabel: 'Kelas 4–5',
    durationMinutes: 60,
    subject: 'IPAS / Rekayasa',
    difficulty: 'Mudah',
    learningGoals: [
      'Memahami cara kerja sensor ultrasonik yang memantulkan gelombang suara untuk mengukur jarak.',
      'Menghubungkan konsep gaya dan gerak dengan penghentian motor listrik.',
      'Mengenal logika sederhana: "Jika jarak kurang dari 20 cm, maka berhenti".',
      'Merakit rangka seimbang menggunakan stik es krim dan roda tanpa lem beracun.',
    ],
    learningOutcomes: 'Siswa dapat menjelaskan bagaimana mobil otonom menghindari tabrakan menggunakan sensor jarak.',
    requiredModules: [
      { id: 'stemp-core', name: 'STEMp Core', port: 'Dudukan Utama', role: 'Pengatur program' },
      { id: 'mod-distance', name: 'Sensor Jarak Ultrasonik', port: 'Port S1 (Sensor)', role: 'Mata robot pendeteksi jarak' },
      { id: 'mod-motor-l', name: 'Motor DC Kiri', port: 'Port M1 (Motor)', role: 'Pemutar roda kiri' },
      { id: 'mod-motor-r', name: 'Motor DC Kanan', port: 'Port M2 (Motor)', role: 'Pemutar roda kanan' },
    ],
    materials: [
      { name: 'STEMp Core + Kabel USB-C', quantity: '1 set', isElectronic: true, category: 'core' },
      { name: 'Sensor Ultrasonik (Port S1)', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Motor DC Geared (Port M1 & M2)', quantity: '2 buah', isElectronic: true, category: 'modul' },
      { name: 'Stik Es Krim Kayu', quantity: '12 batang', isElectronic: false, category: 'kerajinan', notes: 'Dapat digunakan ulang' },
      { name: 'Roda Karet Sederhana', quantity: '2 buah', isElectronic: false, category: 'kerajinan' },
      { name: 'Roda Bebas / Kancing Depan', quantity: '1 buah', isElectronic: false, category: 'kerajinan' },
      { name: 'Karet Gelang Pengikat', quantity: '4 buah', isElectronic: false, category: 'kerajinan' },
    ],
    buildSteps: [
      {
        stepNumber: 1,
        title: 'Buat Sasis Rangka Mobil',
        instruction: 'Susun 6 stik es krim membentuk persegi panjang. Ikat ujung-ujungnya dengan karet atau klip konektor kayu.',
        tipGuru: 'Pastikan sasis rata di atas meja agar mobil tidak bergoyang saat melaju.',
        partsNeeded: ['6 Stik Es Krim', 'Karet Gelang'],
        visualFocus: 'chassis',
      },
      {
        stepNumber: 2,
        title: 'Pasang Motor & Roda Kiri-Kanan',
        instruction: 'Pasangkan Motor M1 di sisi kiri dan Motor M2 di sisi kanan. Masukkan roda karet ke as motor.',
        tipGuru: 'Pasang roda bebas (caster) kecil di bagian tengah depan untuk penyeimbang putaran.',
        partsNeeded: ['2 Motor DC', '2 Roda Karet', '1 Roda Bebas'],
        visualFocus: 'motors',
      },
      {
        stepNumber: 3,
        title: 'Dudukkan STEMp Core di Atas Sasis',
        instruction: 'Tempatkan unit STEMp Core di bagian tengah sasis agar berat seimbang. Sambungkan kabel motor ke Port M1 dan Port M2.',
        tipGuru: 'Port M1 dan M2 memiliki kunci pengaman kabel yang mudah dipasang tanpa salah kutub.',
        partsNeeded: ['STEMp Core'],
        visualFocus: 'core',
      },
      {
        stepNumber: 4,
        title: 'Pasang Sensor Ultrasonik Menghadap ke Depan',
        instruction: 'Ikat modul sensor jarak di bagian bemper depan menghadap lurus ke arah jalan. Sambungkan kabel ke Port S1.',
        tipGuru: 'Arahkan kedua tabung sensor lurus ke depan, jangan menunduk ke lantai agar tidak salah mendeteksi karpet.',
        partsNeeded: ['Sensor Jarak S1'],
        visualFocus: 'sensor',
      },
    ],
    starterLogicSummary: {
      condition: 'JIKA jarak rintangan di depan kurang dari 20 cm',
      action: 'MAKA kedua motor berhenti seketika (Rem)',
      explanation: 'Ketika jalan di depan bersih (jarak > 20 cm), motor kembali melaju maju dengan kecepatan stabil.',
    },
    physicalBuildType: 'robot-car',
    testControls: {
      primarySensor: 'distance',
      sensorLabel: 'Simulasi Jarak Rintangan',
      sensorUnit: 'cm',
      defaultSensorValue: 45,
      thresholdValue: 20,
      successConditionText: 'Geser jarak ke bawah 20 cm untuk melihat mobil otomatis berhenti dan membunyikan rem.',
    },
    lessonFlow: [
      { phase: 1, durationMinutes: 5, title: 'Temukan Masalah', teacherAction: 'Tanya siswa: "Bagaimana mobil masa depan bisa mencegah kecelakaan saat ada orang menyeberang tiba-tiba?"', studentAction: 'Siswa mengamati dan berdiskusi tentang perlunya indra/mata pada kendaraan.' },
      { phase: 2, durationMinutes: 15, title: 'Rakit Struktur Fisik', teacherAction: 'Membimbing perakitan sasis stik es krim dan roda penyeimbang.', studentAction: 'Kelompok siswa berbagi tugas merangkai stik dan memasang roda.' },
      { phase: 3, durationMinutes: 10, title: 'Hubungkan STEMp Core & Modul', teacherAction: 'Menunjukkan pemasangan kabel sensor ke Port S1 dan motor ke Port M1-M2.', studentAction: 'Memasukkan modul dengan bunyi "klik" ke port yang pas.' },
      { phase: 4, durationMinutes: 10, title: 'Uji Respons Proyek', teacherAction: 'Membuka layar Uji di STEMp Studio, mendekatkan telapak tangan ke sensor.', studentAction: 'Melihat roda langsung berhenti saat tangan berjarak < 20 cm.' },
      { phase: 5, durationMinutes: 15, title: 'Uji Coba & Tantangan', teacherAction: 'Tantang siswa: "Ubah batas jarak berhenti dari 20 cm menjadi 10 cm, apa perbedaannya?"', studentAction: 'Mencoba berbagai variasi jarak rintangan kardus di lantai kelas.' },
      { phase: 6, durationMinutes: 5, title: 'Refleksi Pembelajaran', teacherAction: 'Mengajukan pertanyaan refleksi dan memimpin pembongkaran stik kayu.', studentAction: 'Menyimpan kembali modul elektronik yang utuh ke kotak STEMp.' },
    ],
    reflectionQuestions: [
      'Apa yang terjadi jika sensor jarak terhalang kertas saat mobil sedang melaju?',
      'Mengapa kita membutuhkan dua roda bertenaga motor dan satu roda penyeimbang bebas?',
      'Bagaimana teknologi ini membantu manusia dalam kehidupan sehari-hari (contoh: mobil listrik modern)?',
    ],
    commonMistakes: [
      'Sensor jarak terpasang miring ke bawah sehingga mendeteksi lantai kelas sebagai rintangan.',
      'Kabel motor tertukar antara port kiri dan kanan, menyebabkan mobil berputar di tempat bukannya maju lurus.',
    ],
  },

  // 2. LAMPU TOMBOL (Kelas 1–2 Pemula)
  {
    id: 'lampu-tombol',
    slug: 'lampu-tombol',
    title: 'Lampu Bel Ceria',
    subtitle: 'Proyek sederhana kelas awal untuk memahami sebab-akibat: tekan tombol, lampu menyala.',
    behaviorId: 'tekan-tombol',
    gradeMin: 1,
    gradeMax: 2,
    gradeLabel: 'Kelas 1–2',
    durationMinutes: 35,
    subject: 'IPAS / Seni',
    difficulty: 'Sangat Mudah',
    learningGoals: [
      'Memahami konsep dasar aksi dan reaksi: menekan sakelar mengalirkan listrik ke lampu.',
      'Mengenal komponen input (tombol) dan komponen output (lampu LED).',
      'Menghias rumah miniatur dari kertas lipat dan stik kayu.',
    ],
    learningOutcomes: 'Siswa kelas 1–2 memahami bahwa tombol bertindak sebagai pemicu nyala lampu.',
    requiredModules: [
      { id: 'stemp-core', name: 'STEMp Core', port: 'Dudukan Utama', role: 'Pengontrol' },
      { id: 'mod-button', name: 'Tombol Tekan Besar', port: 'Port S1 (Sensor)', role: 'Pemicu tekan' },
      { id: 'mod-led', name: 'Lampu LED Warna', port: 'Port O1 (Output)', role: 'Penerang' },
    ],
    materials: [
      { name: 'STEMp Core', quantity: '1 set', isElectronic: true, category: 'core' },
      { name: 'Modul Tombol Tekan S1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Modul Lampu LED O1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Kardus Bekas / Kertas Tebal Lipat', quantity: '1 lembar', isElectronic: false, category: 'kerajinan' },
      { name: 'Spidol Warna untuk Menghias Rumah', quantity: '1 set', isElectronic: false, category: 'alat' },
    ],
    buildSteps: [
      {
        stepNumber: 1,
        title: 'Lipat Kertas Menjadi Miniatur Rumah',
        instruction: 'Lipat karton tebal menjadi bentuk atap dan dinding rumah kecil. Beri lubang di bagian pintu untuk tombol.',
        tipGuru: 'Bantu siswa memotong lubang kecil pintu dengan gunting tumpul.',
        partsNeeded: ['Karton Tebal'],
        visualFocus: 'chassis',
      },
      {
        stepNumber: 2,
        title: 'Pasang Tombol di Pintu Rumah',
        instruction: 'Selipkan tombol besar ke lubang pintu dan sambungkan kabel ke Port S1 pada STEMp Core.',
        tipGuru: 'Tombol ini berbunyi "klik" halus saat ditekan.',
        partsNeeded: ['Modul Tombol Tekan'],
        visualFocus: 'sensor',
      },
      {
        stepNumber: 3,
        title: 'Pasang Lampu LED di Bawah Atap',
        instruction: 'Tempelkan lampu LED di bagian atap rumah dan hubungkan ke Port O1.',
        tipGuru: 'Pastikan lampu menghadap ke bawah agar menerangi seluruh bagian dalam miniatur rumah.',
        partsNeeded: ['Modul LED'],
        visualFocus: 'mechanism',
      },
    ],
    starterLogicSummary: {
      condition: 'JIKA tombol di pintu ditekan',
      action: 'MAKA lampu LED menyala terang',
      explanation: 'Saat tombol dilepas, lampu otomatis padam.',
    },
    physicalBuildType: 'streetlight',
    testControls: {
      primarySensor: 'button',
      sensorLabel: 'Tekan Tombol Bel',
      sensorUnit: 'Tekan',
      defaultSensorValue: 0,
      successConditionText: 'Klik tombol untuk menyalakan lampu miniatur rumah.',
    },
    lessonFlow: [
      { phase: 1, durationMinutes: 5, title: 'Cerita Pembuka', teacherAction: '"Siapa yang pernah memencet bel rumah nenek? Bagaimana bel itu tahu kita memencetnya?"', studentAction: 'Siswa menceritakan pengalaman memencet sakelar di rumah.' },
      { phase: 2, durationMinutes: 15, title: 'Menghias Miniatur Rumah', teacherAction: 'Membimbing menghias dinding rumah dengan stik dan spidol.', studentAction: 'Mewarnai dan melipat kardus rumah kelompok.' },
      { phase: 3, durationMinutes: 5, title: 'Pasang Tombol & Lampu', teacherAction: 'Membantu mencolokkan kabel ke Port S1 dan O1.', studentAction: 'Mencoba menekan tombol bergiliran.' },
      { phase: 4, durationMinutes: 5, title: 'Uji Nyala', teacherAction: 'Melihat respon seketika di layar dan fisik.', studentAction: 'Tersenyum gembira saat lampu menyala tiap kali ditekan.' },
      { phase: 5, durationMinutes: 5, title: 'Refleksi Sederhana', teacherAction: 'Merangkum: Tombol memberi tahu Core, Core menyalakan Lampu.', studentAction: 'Menyebutkan tombol = masukan, lampu = hasil.' },
    ],
    reflectionQuestions: [
      'Apa yang terjadi pada lampu saat jarimu diangkat dari tombol?',
      'Benda apa saja di rumahmu yang menyala saat tombolnya ditekan?',
    ],
    commonMistakes: [
      'Kabel LED dicolokkan ke port sensor S2 bukannya port output O1.',
    ],
  },

  // 3. KINCIR ANGIN CERDAS (Kelas 3–4)
  {
    id: 'kincir-mini',
    slug: 'kincir-mini',
    title: 'Kincir Angin Tenaga Surya',
    subtitle: 'Model turbin angin yang berputar semakin kencang saat cahaya matahari semakin terang.',
    behaviorId: 'berputar',
    gradeMin: 3,
    gradeMax: 4,
    gradeLabel: 'Kelas 3–4',
    durationMinutes: 45,
    subject: 'IPAS / Energi',
    difficulty: 'Mudah',
    learningGoals: [
      'Menghubungkan intensitas cahaya matahari dengan energi gerak putaran baling-baling.',
      'Memahami fungsi sensor cahaya mengukur kecerahan ruangan (0–100%).',
      'Merakit rangka menara segitiga kokoh dari stik es krim.',
    ],
    learningOutcomes: 'Siswa memahami transformasi energi cahaya menjadi energi listrik dan energi gerak.',
    requiredModules: [
      { id: 'stemp-core', name: 'STEMp Core', port: 'Dudukan Utama', role: 'Pengontrol' },
      { id: 'mod-light', name: 'Sensor Cahaya LDR', port: 'Port S1 (Sensor)', role: 'Mata pengukur cahaya' },
      { id: 'mod-motor-l', name: 'Motor DC Hub Baling-baling', port: 'Port M1 (Motor)', role: 'Pemutar baling-baling' },
    ],
    materials: [
      { name: 'STEMp Core', quantity: '1 set', isElectronic: true, category: 'core' },
      { name: 'Sensor Cahaya S1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Motor DC M1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Stik Es Krim Rangka Menara', quantity: '10 batang', isElectronic: false, category: 'kerajinan' },
      { name: 'Kertas Origami / Karton Baling-baling', quantity: '2 lembar', isElectronic: false, category: 'kerajinan' },
      { name: 'Sedotan Plastik Poros', quantity: '1 buah', isElectronic: false, category: 'kerajinan' },
    ],
    buildSteps: [
      {
        stepNumber: 1,
        title: 'Buat Rangka Menara Segitiga',
        instruction: 'Rekatkan 3 stik es krim membentuk segitiga sebagai kaki menara agar kincir berdiri kokoh.',
        tipGuru: 'Bentuk piramida atau tripod sangat stabil menahan getaran baling-baling.',
        partsNeeded: ['6 Stik Es Krim'],
        visualFocus: 'chassis',
      },
      {
        stepNumber: 2,
        title: 'Pasang Motor di Puncak Menara',
        instruction: 'Kaitkan motor DC di puncak menara dan pasang baling-baling kertas pada as motor.',
        tipGuru: 'Pastikan baling-baling kertas berputar bebas tanpa menyentuh tiang kayu.',
        partsNeeded: ['Motor DC M1', 'Baling-baling Kertas'],
        visualFocus: 'motors',
      },
      {
        stepNumber: 3,
        title: 'Pasang Sensor Cahaya Menghadap Atas',
        instruction: 'Letakkan sensor cahaya di samping menara menghadap sumber cahaya atau lampu senter.',
        tipGuru: 'Hubungkan kabel sensor ke Port S1 dan motor ke Port M1 pada STEMp Core.',
        partsNeeded: ['Sensor Cahaya S1'],
        visualFocus: 'sensor',
      },
    ],
    starterLogicSummary: {
      condition: 'JIKA sensor mendeteksi cahaya terang (> 50%)',
      action: 'MAKA baling-baling berputar kencang',
      explanation: 'Saat sensor ditutup bayangan tangan, putaran melambat atau berhenti perlahan.',
    },
    physicalBuildType: 'windmill',
    testControls: {
      primarySensor: 'light',
      sensorLabel: 'Simulasi Cahaya Terang',
      sensorUnit: '%',
      defaultSensorValue: 65,
      thresholdValue: 40,
      successConditionText: 'Taikkan slider cahaya di atas 50% untuk melihat kincir berputar.',
    },
    lessonFlow: [
      { phase: 1, durationMinutes: 5, title: 'Eksplorasi Masalah', teacherAction: '"Bagaimana kincir di ladang Belanda dan PLTB Jeneponto di Sulawesi memanfaatkan alam?"', studentAction: 'Siswa memperhatikan gambar kincir angin raksasa.' },
      { phase: 2, durationMinutes: 15, title: 'Rakit Menara & Baling-baling', teacherAction: 'Memandu pelipatan baling-baling 4 bilah dari kertas.', studentAction: 'Masing-masing kelompok menguji keseimbangan bilah baling-baling.' },
      { phase: 3, durationMinutes: 10, title: 'Koneksi Sensor Cahaya', teacherAction: 'Membimbing pemasangan ke Port S1 dan Port M1.', studentAction: 'Menghubungkan kabel modular.' },
      { phase: 4, durationMinutes: 10, title: 'Eksperimen Bayangan', teacherAction: 'Meminta siswa menutup sensor dengan telapak tangan lalu membukanya.', studentAction: 'Mengamati putaran kincir langsung melambat saat gelap.' },
      { phase: 5, durationMinutes: 5, title: 'Refleksi Energi Terbarukan', teacherAction: 'Mengaitkan dengan panel surya dan energi ramah lingkungan.', studentAction: 'Menjawab kuis cepat bersama kelas.' },
    ],
    reflectionQuestions: [
      'Mengapa kincir berputar lambat saat hari mendung atau sensor tertutup?',
      'Bahan apa yang paling ringan dan kuat untuk dijadikan bilah baling-baling kincir?',
    ],
    commonMistakes: [
      'Baling-baling kertas terlalu berat atau tergesek tiang kayu sehingga motor macet.',
    ],
  },

  // 4. PALANG GERBANG TOL OTOMATIS (Kelas 4–6)
  {
    id: 'gerbang-otomatis',
    slug: 'gerbang-otomatis',
    title: 'Palang Gerbang Tol Pintar',
    subtitle: 'Mekanisme palang naik-turun otomatis menggunakan motor servo saat mendeteksi mobil datang.',
    behaviorId: 'menggerakkan-gerbang',
    gradeMin: 4,
    gradeMax: 6,
    gradeLabel: 'Kelas 4–6',
    durationMinutes: 60,
    subject: 'IPAS / Rekayasa Sistem',
    difficulty: 'Sedang',
    learningGoals: [
      'Memahami cara kerja motor servo yang bergerak dengan sudut derajat tertentu (0° hingga 90°).',
      'Menerapkan urutan kerja: Mobil mendekat -> Palang terangkat -> Lampu hijau menyala.',
      'Merakit engsel mekanisme palang yang kuat menggunakan kardus kotak dan stik kayu.',
    ],
    learningOutcomes: 'Siswa dapat menganalisis sistem kendali otomatis pada fasilitas umum seperti palang pintu tol.',
    requiredModules: [
      { id: 'stemp-core', name: 'STEMp Core', port: 'Dudukan Utama', role: 'Pengontrol' },
      { id: 'mod-distance', name: 'Sensor Jarak Ultrasonik', port: 'Port S1 (Sensor)', role: 'Pendeteksi kendaraan' },
      { id: 'mod-servo', name: 'Motor Servo Palang', port: 'Port M1 (Servo)', role: 'Pengangkat palang 0°-90°' },
      { id: 'mod-led', name: 'Lampu Indikator Hijau/Merah', port: 'Port O1 (Output)', role: 'Status buka/tutup' },
    ],
    materials: [
      { name: 'STEMp Core', quantity: '1 set', isElectronic: true, category: 'core' },
      { name: 'Sensor Jarak S1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Motor Servo M1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Lampu LED O1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Kardus Bekas Pos Jaga', quantity: '1 kotak kecil', isElectronic: false, category: 'kerajinan' },
      { name: 'Stik Es Krim / Sedotan Palang', quantity: '2 buah', isElectronic: false, category: 'kerajinan' },
    ],
    buildSteps: [
      {
        stepNumber: 1,
        title: 'Buat Pos Penjaga & Pondasi Gerbang',
        instruction: 'Gunakan kardus kecil bekas sebagai bangunan pos penjaga gerbang tol.',
        tipGuru: 'Beri pemberat batu kecil di dalam kardus agar pondasi kokoh saat palang terangkat.',
        partsNeeded: ['Kardus Bekas'],
        visualFocus: 'chassis',
      },
      {
        stepNumber: 2,
        title: 'Pasang Motor Servo & Lengan Palang',
        instruction: 'Rekatkan motor servo di samping dinding pos. Pasangkan stik es krim pada lengan servo membentuk palang.',
        tipGuru: 'Atur posisi awal servo pada sudut 0° (posisi datar menutup jalan).',
        partsNeeded: ['Motor Servo M1', 'Stik Es Krim Palang'],
        visualFocus: 'mechanism',
      },
      {
        stepNumber: 3,
        title: 'Pasang Sensor Jarak & Lampu Tol',
        instruction: 'Pasangkan sensor ultrasonik di tiang samping menghadap jalur mobil datang. Pasang lampu indikator di atas tiang.',
        tipGuru: 'Hubungkan kabel sensor ke Port S1, kabel servo ke Port M1, dan lampu ke Port O1.',
        partsNeeded: ['Sensor Jarak S1', 'Lampu LED O1'],
        visualFocus: 'sensor',
      },
    ],
    starterLogicSummary: {
      condition: 'JIKA ada kendaraan mendekat (jarak < 25 cm)',
      action: 'MAKA servo berputar 90° (palang terbuka) dan lampu berubah hijau',
      explanation: 'Ketika kendaraan sudah lewat (jarak > 25 cm), palang kembali turun ke 0° dan lampu merah menyala.',
    },
    physicalBuildType: 'automatic-barrier',
    testControls: {
      primarySensor: 'distance',
      sensorLabel: 'Jarak Mobil ke Gerbang',
      sensorUnit: 'cm',
      defaultSensorValue: 40,
      thresholdValue: 25,
      successConditionText: 'Ubah slider jarak ke bawah 25 cm untuk melihat palang terangkat naik 90°.',
    },
    lessonFlow: [
      { phase: 1, durationMinutes: 5, title: 'Temukan Masalah', teacherAction: '"Mengapa di gerbang tol sekarang tidak ada petugas yang mengangkat palang secara manual?"', studentAction: 'Siswa menjawab tentang kecepatan dan otomasi.' },
      { phase: 2, durationMinutes: 15, title: 'Rakit Kardus Pos & Palang', teacherAction: 'Membimbing pemasangan stik es krim ke roda lengan servo.', studentAction: 'Memastikan palang bisa berayun naik tanpa terganjal kardus.' },
      { phase: 3, durationMinutes: 10, title: 'Koneksi Kabel 3 Modul', teacherAction: 'Memandu pemasangan kabel ke Port S1, M1, dan O1.', studentAction: 'Mengecek kancing kabel terkunci dengan benar.' },
      { phase: 4, durationMinutes: 15, title: 'Uji Mobil Miniatur Lewat', teacherAction: 'Mendorong kotak pensil/mobil mainan mendekati sensor.', studentAction: 'Bersorak gembira saat palang terbuka otomatis dan lampu menyala hijau.' },
      { phase: 5, durationMinutes: 10, title: 'Eksperimen Waktu Buka', teacherAction: '"Bagaimana jika mobil besar lewat lambat? Berapa lama palang harus tetap terbuka?"', studentAction: 'Menganalisis jeda waktu penutupan gerbang.' },
      { phase: 6, durationMinutes: 5, title: 'Refleksi Kelas', teacherAction: 'Mengulas sudut motor servo dan fungsi sensor.', studentAction: 'Membongkar palang dengan rapi.' },
    ],
    reflectionQuestions: [
      'Apa bedanya gerakan motor biasa (berputar terus) dengan motor servo (berputar sudut tertentu)?',
      'Mengapa lampu indikator perlu berubah warna saat palang terbuka?',
    ],
    commonMistakes: [
      'Lengan servo dipasang saat posisi motor sudah berada di sudut 90° sehingga saat membuka malah menabrak tanah.',
    ],
  },

  // 5. PENYIRAM TANAMAN PINTAR (Kelas 4–6)
  {
    id: 'penyiram-tanaman',
    slug: 'penyiram-tanaman',
    title: 'Penyiram Tanaman Pintar',
    subtitle: 'Sistem irigasi otomatis yang mengukur kelembapan tanah pot dan menyiram hanya saat tanah kering.',
    behaviorId: 'reaksi-kelembapan',
    gradeMin: 4,
    gradeMax: 6,
    gradeLabel: 'Kelas 4–6',
    durationMinutes: 60,
    subject: 'IPAS / Biologi & Lingkungan',
    difficulty: 'Sedang',
    learningGoals: [
      'Mengetahui bagaimana air di dalam tanah menghantarkan listrik pada sensor kelembapan.',
      'Memahami prinsip konservasi air: menyiram tanaman secukupnya sesuai kebutuhan biologis tanaman.',
      'Mengoperasikan katup air mekanik servo atau pompa mini berdasarkan pembacaan data persentase.',
    ],
    learningOutcomes: 'Siswa dapat menjelaskan hubungan antara kondisi lingkungan tanah dan respon sistem penyiraman otomatis.',
    requiredModules: [
      { id: 'stemp-core', name: 'STEMp Core', port: 'Dudukan Utama', role: 'Pengontrol' },
      { id: 'mod-moisture', name: 'Sensor Kelembapan Tanah', port: 'Port S1 (Sensor)', role: 'Pendeteksi air di tanah' },
      { id: 'mod-servo', name: 'Servo Katup Air', port: 'Port M1 (Servo/Motor)', role: 'Membuka saluran air' },
      { id: 'mod-led', name: 'Lampu LED Status Tanah', port: 'Port O1 (Output)', role: 'Indikator basah/kering' },
    ],
    materials: [
      { name: 'STEMp Core', quantity: '1 set', isElectronic: true, category: 'core' },
      { name: 'Sensor Kelembapan S1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Motor Servo Katup M1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Pot Bunga / Wadah Plastik Bekas', quantity: '1 buah', isElectronic: false, category: 'kerajinan' },
      { name: 'Tanah Kering & Sedikit Air', quantity: 'Secukupnya', isElectronic: false, category: 'kerajinan' },
      { name: 'Sedotan Air Tiruan', quantity: '2 buah', isElectronic: false, category: 'kerajinan' },
    ],
    buildSteps: [
      {
        stepNumber: 1,
        title: 'Siapkan Wadah Pot & Rangka Penyangga',
        instruction: 'Gunakan botol plastik bekas yang dipotong menjadi pot kecil. Susun stik es krim sebagai menara tandon air.',
        tipGuru: 'Gunakan spons basah jika tidak membawa tanah ke dalam ruang kelas.',
        partsNeeded: ['Pot Plastik', 'Stik Es Krim'],
        visualFocus: 'chassis',
      },
      {
        stepNumber: 2,
        title: 'Tancapkan Sensor Kelembapan ke Dalam Tanah',
        instruction: 'Tancapkan dua garpu sensor kelembapan tanah sedalam 3-4 cm. Hubungkan kabel ke Port S1.',
        tipGuru: 'Pastikan kedua kaki sensor tidak bersentuhan langsung dengan dinding plastik.',
        partsNeeded: ['Sensor Kelembapan S1'],
        visualFocus: 'sensor',
      },
      {
        stepNumber: 3,
        title: 'Pasang Lengan Katup Servo & Lampu Status',
        instruction: 'Pasangkan motor servo di dekat saluran air dan hubungkan ke Port M1. Pasang lampu indikator ke Port O1.',
        tipGuru: 'Kabel modular warna biru untuk sensor S1 dan kabel oranye untuk motor M1.',
        partsNeeded: ['Motor Servo M1', 'Lampu LED O1'],
        visualFocus: 'mechanism',
      },
    ],
    starterLogicSummary: {
      condition: 'JIKA kelembapan tanah kurang dari 30% (Kering)',
      action: 'MAKA servo membuka katup air 90° dan lampu indikator merah menyala',
      explanation: 'Ketika tanah sudah basah (kelembapan > 30%), katup menutup kembali dan lampu berubah hijau.',
    },
    physicalBuildType: 'irrigation',
    testControls: {
      primarySensor: 'moisture',
      sensorLabel: 'Tingkat Kelembapan Tanah',
      sensorUnit: '%',
      defaultSensorValue: 45,
      thresholdValue: 30,
      successConditionText: 'Tarik slider kelembapan di bawah 30% untuk menyalakan penyiram otomatis.',
    },
    lessonFlow: [
      { phase: 1, durationMinutes: 5, title: 'Masalah Pertanian', teacherAction: '"Apa yang terjadi jika petani lupa menyiram tanaman selama seminggu? Atau menyiram terlalu banyak air?"', studentAction: 'Siswa berdiskusi tentang pembusukan akar dan kekeringan.' },
      { phase: 2, durationMinutes: 15, title: 'Rakit Wadah Pot & Dudukan Core', teacherAction: 'Membimbing penyiapan pot botol bekas dan tandon stik.', studentAction: 'Mempersiapkan pot kelompok.' },
      { phase: 3, durationMinutes: 10, title: 'Tancapkan Sensor & Pasang Servo', teacherAction: 'Menjelaskan fungsi garpu konduksi pada sensor.', studentAction: 'Menancapkan sensor ke tanah pot.' },
      { phase: 4, durationMinutes: 15, title: 'Uji Siram Tanah Nyata', teacherAction: 'Meminta siswa meneteskan beberapa sendok air ke dekat sensor.', studentAction: 'Melihat nilai kelembapan naik dan katup menutup otomatis.' },
      { phase: 5, durationMinutes: 10, title: 'Analisis Hemat Air', teacherAction: 'Mendiskusikan pentingnya teknologi irigasi tetes di daerah minim air.', studentAction: 'Menghitung penghematan air dibanding menyiram terus-menerus.' },
      { phase: 6, durationMinutes: 5, title: 'Kemas & Bersihkan', teacherAction: 'Mengeringkan ujung sensor dengan tisu.', studentAction: 'Menyimpan alat dengan bersih.' },
    ],
    reflectionQuestions: [
      'Mengapa tanah basah bisa menghantarkan sinyal lebih baik daripada tanah kering kerontang?',
      'Bagaimana petani modern menggunakan teknologi ini untuk menghemat jutaan liter air?',
    ],
    commonMistakes: [
      'Sensor tidak menyentuh tanah padat (menggantung di udara) sehingga terbaca 0% terus-menerus.',
    ],
  },

  // 6. LAMPU JALAN PINTAR (Kelas 3–5)
  {
    id: 'lampu-pintar',
    slug: 'lampu-pintar',
    title: 'Lampu Jalan Hemat Energi',
    subtitle: 'Tiang lampu jalanan yang otomatis menyala terang saat matahari terbenam dan padam saat fajar.',
    behaviorId: 'reaksi-cahaya',
    gradeMin: 3,
    gradeMax: 5,
    gradeLabel: 'Kelas 3–5',
    durationMinutes: 45,
    subject: 'IPAS / Energi & Lingkungan',
    difficulty: 'Mudah',
    learningGoals: [
      'Mempelajari cara kerja sensor cahaya fototransistor yang mendeteksi gelap dan terang.',
      'Memahami pentingnya penghematan energi listrik pada lampu penerangan jalan umum (PJU).',
      'Merakit miniatur tiang lampu jalan dari stik kayu dan sedotan.',
    ],
    learningOutcomes: 'Siswa dapat menjelaskan prinsip kerja sensor cahaya dalam menghemat energi listrik di kota.',
    requiredModules: [
      { id: 'stemp-core', name: 'STEMp Core', port: 'Dudukan Utama', role: 'Pengontrol' },
      { id: 'mod-light', name: 'Sensor Cahaya LDR', port: 'Port S1 (Sensor)', role: 'Mendeteksi gelap/terang' },
      { id: 'mod-led', name: 'Lampu LED Sorot', port: 'Port O1 (Output)', role: 'Penerang jalan' },
    ],
    materials: [
      { name: 'STEMp Core', quantity: '1 set', isElectronic: true, category: 'core' },
      { name: 'Sensor Cahaya S1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Lampu LED O1', quantity: '1 buah', isElectronic: true, category: 'modul' },
      { name: 'Stik Es Krim Tiang Lampu', quantity: '5 batang', isElectronic: false, category: 'kerajinan' },
      { name: 'Kardus Jalanan', quantity: '1 lembar', isElectronic: false, category: 'kerajinan' },
    ],
    buildSteps: [
      {
        stepNumber: 1,
        title: 'Buat Tiang Lampu Jalan Menjulur',
        instruction: 'Satukan 3 stik es krim memanjang dan rekatkan 1 stik horizontal membentuk tiang lampu huruf L terbalik.',
        tipGuru: 'Gunakan penjepit klip agar sambungan kayu tegak lurus.',
        partsNeeded: ['4 Stik Es Krim'],
        visualFocus: 'chassis',
      },
      {
        stepNumber: 2,
        title: 'Pasang LED di Ujung Atas Tiang',
        instruction: 'Kaitkan lampu LED di ujung stik horizontal menghadap ke bawah ke arah jalanan miniatur.',
        tipGuru: 'Arahkan cahaya LED agar menerangi marka jalanan kardus.',
        partsNeeded: ['Lampu LED O1'],
        visualFocus: 'mechanism',
      },
      {
        stepNumber: 3,
        title: 'Pasang Sensor Cahaya Menghadap Langit',
        instruction: 'Letakkan sensor cahaya di bagian atas tiang menghadap ke langit-langit ruangan. Sambungkan kabel ke Port S1.',
        tipGuru: 'Sensor cahaya harus menghadap ke atas agar tidak terkena sorotan dari LED-nya sendiri.',
        partsNeeded: ['Sensor Cahaya S1'],
        visualFocus: 'sensor',
      },
    ],
    starterLogicSummary: {
      condition: 'JIKA tingkat cahaya lingkungan kurang dari 35% (Gelap / Malam)',
      action: 'MAKA lampu LED otomatis menyala terang',
      explanation: 'Ketika pagi hari tiba (cahaya > 35%), lampu padam otomatis tanpa perlu dimatikan sakelar manual.',
    },
    physicalBuildType: 'streetlight',
    testControls: {
      primarySensor: 'light',
      sensorLabel: 'Kecerahan Cahaya Lingkungan',
      sensorUnit: '%',
      defaultSensorValue: 60,
      thresholdValue: 35,
      successConditionText: 'Tarik slider kecerahan di bawah 35% untuk membuat lampu jalan menyala terang.',
    },
    lessonFlow: [
      { phase: 1, durationMinutes: 5, title: 'Tanya Jawab Pengantar', teacherAction: '"Siapa yang bertugas menyalakan lampu jalan tol saat malam tiba? Apakah ada orang yang memencet sakelarnya satu persatu?"', studentAction: 'Siswa memikirkan bagaimana ribuan lampu kota menyala bersamaan.' },
      { phase: 2, durationMinutes: 15, title: 'Rakit Tiang Lampu Kayu', teacherAction: 'Membimbing perakitan tiang jalanan dari stik.', studentAction: 'Menghias jalanan kardus kelompok dengan garis putih.' },
      { phase: 3, durationMinutes: 10, title: 'Sambungkan Modul', teacherAction: 'Memandu pemasangan kabel ke S1 dan O1.', studentAction: 'Mengecek lampu dan sensor terpasang kokoh.' },
      { phase: 4, durationMinutes: 10, title: 'Simulasi Malam Hari', teacherAction: 'Menutup sensor dengan kertas hitam atau telapak tangan.', studentAction: 'Melihat lampu seketika menyala terang saat sensor tertutup bayangan.' },
      { phase: 5, durationMinutes: 5, title: 'Refleksi Hemat Listrik', teacherAction: 'Menghitung pemborosan energi jika lampu menyala terus di siang hari.', studentAction: 'Menyimpulkan pentingnya otomatisasi sensor foton.' },
    ],
    reflectionQuestions: [
      'Apa yang terjadi jika lampu LED kita arahkan langsung ke sensor cahayanya sendiri?',
      'Mengapa kota cerdas (Smart City) membutuhkan sensor otomatis pada infrastrukturnya?',
    ],
    commonMistakes: [
      'Sensor cahaya terpasang menghadap tepat ke arah LED sehingga terjadi kedip-kedip (loop pantulan).',
    ],
  },
];

/**
 * Helper to fetch canonical activity by ID or slug
 */
export function getCanonicalActivity(idOrSlug: string): CanonicalActivity {
  const found = CANONICAL_ACTIVITIES.find(
    (a) => a.id === idOrSlug || a.slug === idOrSlug
  );
  return found || CANONICAL_ACTIVITIES[0];
}

/**
 * Filter activities by behavior, grade, and subject
 */
export function filterActivities(options: {
  behaviorId?: string;
  grade?: number;
  subject?: string;
  searchQuery?: string;
}): CanonicalActivity[] {
  return CANONICAL_ACTIVITIES.filter((act) => {
    if (options.behaviorId && act.behaviorId !== options.behaviorId) return false;
    if (options.grade && (options.grade < act.gradeMin || options.grade > act.gradeMax)) return false;
    if (options.subject && options.subject !== 'Semua' && !act.subject.includes(options.subject)) return false;
    if (options.searchQuery) {
      const q = options.searchQuery.toLowerCase();
      const matchTitle = act.title.toLowerCase().includes(q);
      const matchDesc = act.subtitle.toLowerCase().includes(q) || act.learningOutcomes.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }
    return true;
  });
}
