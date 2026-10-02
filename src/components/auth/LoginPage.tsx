import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherOnboardingModal } from './TeacherOnboardingModal';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  School, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck,
  Check
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginAsTeacher, setCurrentView, startTwoMinuteDemo, showToast } = useApp();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('rina.guru@sdn01.sch.id');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('Bu Rina, S.Pd.');
  const [schoolName, setSchoolName] = useState('SDN Sukamaju 01');
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      // Show light 3-step setup before proceeding
      setShowOnboardingModal(true);
    } else {
      loginAsTeacher(email, fullName, schoolName);
    }
  };

  const handleQuickDemoLogin = () => {
    loginAsTeacher('rina.guru@sdn01.sch.id', 'Bu Rina, S.Pd.', 'SDN Sukamaju 01');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Back Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
        <button
          onClick={() => setCurrentView('landing')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Beranda Depan</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <span className="text-2xl font-bold tracking-tight text-slate-900 block mb-1">
          STEMp
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {isSignUp ? 'Daftar Akun Guru' : 'Masuk sebagai Guru'}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Portal terpadu untuk pembelajaran STEM fisik di sekolah dasar.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* Tabs: Masuk / Daftar */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Masuk
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isSignUp ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buat Akun Baru
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isSignUp && (
              <>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Lengkap & Gelar
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Contoh: Bu Rina, S.Pd."
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Sekolah
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="Contoh: SDN Sukamaju 01"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-xs"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Email Guru / Sekolah
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="guru@sekolah.sch.id"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>{isSignUp ? 'Lanjut ke Personalisasi Kelas' : 'Masuk ke Portal Guru'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Quick Demo Access for Judges */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Akses Cepat Pengujian Juri:
            </span>

            <button
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Masuk Cepat Guru: Bu Rina (SDN Sukamaju 01)</span>
            </button>

            <button
              onClick={startTwoMinuteDemo}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Coba Demo 2 Menit (Tanpa Login)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Onboarding Setup Modal for new signup */}
      <TeacherOnboardingModal
        isOpen={showOnboardingModal}
        onClose={() => {
          setShowOnboardingModal(false);
          loginAsTeacher(email, fullName, schoolName);
        }}
      />
    </div>
  );
};
