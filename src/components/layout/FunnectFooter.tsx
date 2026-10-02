import React from 'react';
import { useApp } from '../../context/AppContext';
import { Leaf, ShieldCheck, Sparkles } from 'lucide-react';

export const FunnectFooter: React.FC = () => {
  const { setCurrentView, startTwoMinuteDemo } = useApp();

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-10 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xl font-bold tracking-tight text-slate-900 block">
              STEMp
            </span>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Sistem pembelajaran STEM fisik untuk sekolah dasar. Menggabungkan satu STEMp Core, material sederhana sekitar, dan modul elektronik yang dapat digunakan kembali.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Inovasi Teknologi Tepat Guna (TTG)</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Aplikasi Guru
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="hover:text-blue-600 transition-colors text-slate-600 cursor-pointer"
                >
                  Beranda Guru
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('activities')}
                  className="hover:text-blue-600 transition-colors text-slate-600 cursor-pointer"
                >
                  Katalog Aktivitas (Kelas 1–6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('device')}
                  className="hover:text-blue-600 transition-colors text-slate-600 cursor-pointer"
                >
                  Status STEMp Core (USB-C)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('classes')}
                  className="hover:text-blue-600 transition-colors text-slate-600 cursor-pointer"
                >
                  Manajemen Kelas
                </button>
              </li>
            </ul>
          </div>

          {/* Demo & Jurors */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              Pengujian & Juri
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={startTwoMinuteDemo}
                  className="text-blue-600 hover:text-blue-700 font-bold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Coba Demo 2 Menit</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('login')}
                  className="hover:text-blue-600 transition-colors text-slate-600 cursor-pointer"
                >
                  Masuk sebagai Guru
                </button>
              </li>
              <li className="pt-2 text-[11px] text-slate-400 leading-relaxed">
                Dirancang untuk Dinas Pendidikan, Guru SD, dan Kompetisi TTG.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 STEMp — Connect. Build. Have Fun.</p>
          <div className="flex items-center gap-4">
            <span>Khusus SD Kelas 1–6</span>
            <span>·</span>
            <span>Bahasa Indonesia</span>
            <span>·</span>
            <span>Hardware Honesty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
