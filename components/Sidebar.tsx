
import React from 'react';
import { Subject, Language } from '../types';
import { translations } from '../translations';

interface SidebarProps {
  activeTab: Subject;
  setActiveTab: (subject: Subject) => void;
  lang: Language;
  level: number;
  progress: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, lang, level, progress }) => {
  const t = translations[lang];
  const menuItems = [
    { name: Subject.HOME, label: t.home, icon: '🏠' },
    { name: Subject.LEADERBOARD, label: t.leaderboard_title, icon: '🏆' },
    { name: Subject.BIOLOGY, label: t.biology, icon: '🌱' },
    { name: Subject.CHEMISTRY, label: t.chemistry, icon: '🧪' },
    { name: Subject.PHYSICS, label: t.physics, icon: '⚡' },
    { name: Subject.INFORMATICS, label: t.informatics, icon: '💻' },
    { name: Subject.ABOUT, label: t.about, icon: '✨' },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-sky-100 flex flex-col h-full shadow-lg z-20 overflow-hidden">
      <div className="p-6 flex items-center justify-center md:justify-start gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform rotate-3 transition-transform hover:rotate-12">
          🚀
        </div>
        <span className="hidden md:block font-black text-2xl text-sky-900 font-whimsical tracking-tighter">DigiLab</span>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto scrollbar-none">
        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center justify-center md:justify-start gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
              activeTab === item.name
                ? 'bg-sky-500 text-white shadow-xl shadow-sky-100 scale-105'
                : 'hover:bg-sky-50 text-sky-400 hover:text-sky-600'
            }`}
          >
            <span className="text-2xl group-hover:scale-125 transition-transform">{item.icon}</span>
            <span className="hidden md:block font-black uppercase text-[10px] tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 space-y-3">
        <div className="hidden md:block bg-gradient-to-tr from-sky-500 to-indigo-600 rounded-3xl p-5 text-white shadow-lg relative overflow-hidden group">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-white opacity-20 rounded-full group-hover:scale-150 transition-transform"></div>
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Progress</p>
          <div className="text-2xl font-black">Level {level}</div>
          <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
             <div className="h-full bg-yellow-300 transition-all duration-1000" style={{width: `${progress}%`}}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
