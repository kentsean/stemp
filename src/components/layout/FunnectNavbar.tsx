import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ViewType } from '../../types';
import { 
  Sparkles, 
  Menu, 
  X, 
  Cpu, 
  Play, 
  LogOut, 
  User, 
  HelpCircle,
  Laptop
} from 'lucide-react';

export const FunnectNavbar: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    isLoggedIn, 
    teacherProfile, 
    logoutTeacher, 
    startTwoMinuteDemo,
    startActivityJourney,
    deviceState 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // 4 Primary Navigation Items in natural Bahasa Indonesia
  const primaryNavItems: { id: ViewType; label: string }[] = [
    { id: 'dashboard', label: 'Beranda' },
    { id: 'activities', label: 'Aktivitas' },
    { id: 'device', label: 'Perangkat' },
    { id: 'classes', label: 'Kelas' },
  ];

  const handleNavClick = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const isConnected = deviceState.status === 'connected';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Single text element wordmark per Top Bar Contract */}
          <button
            onClick={() => handleNavClick('landing')}
            className="text-left focus:outline-none flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              STEMp
            </span>
          </button>

          {/* Zone 2: 4 clean text navigation links with subtle active/hover state */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {primaryNavItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`transition-colors py-1 relative whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'text-blue-600 font-semibold' 
                      : 'hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Core Device Status Indicator */}
            {isConnected ? (
              <button
                onClick={() => handleNavClick('device')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  deviceState.isDemo
                    ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${deviceState.isDemo ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                <span className="whitespace-nowrap">
                  {deviceState.isDemo ? 'Demo Core' : 'Core Terhubung'}
                </span>
              </button>
            ) : (
              <button
                onClick={() => handleNavClick('device')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Cpu className="w-3.5 h-3.5 text-slate-400" />
                <span>Hubungkan Core</span>
              </button>
            )}

            {/* Primary Action Button */}
            {currentView === 'landing' ? (
              <button
                onClick={startTwoMinuteDemo}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Coba Demo 2 Menit</span>
              </button>
            ) : (
              <button
                onClick={() => startActivityJourney()}
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Mulai Aktivitas</span>
              </button>
            )}

            {/* Teacher Profile / Login */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors text-left cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                    {teacherProfile.name.charAt(0)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 hidden lg:inline truncate max-w-[100px]">
                    {teacherProfile.name}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50 text-xs">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="font-bold text-slate-900 truncate">{teacherProfile.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{teacherProfile.schoolName}</p>
                    </div>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        handleNavClick('dashboard');
                      }}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Beranda Guru
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logoutTeacher();
                      }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Masuk
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Buka menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 space-y-3">
            <nav className="flex flex-col space-y-1">
              {primaryNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer ${
                    currentView === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  startTwoMinuteDemo();
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Coba Demo 2 Menit</span>
              </button>

              {!isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('login');
                  }}
                  className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Masuk sebagai Guru
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutTeacher();
                  }}
                  className="w-full py-2.5 rounded-xl border border-red-200 text-red-600 font-semibold text-xs cursor-pointer"
                >
                  Keluar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
