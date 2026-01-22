
import React from 'react';
import { Subject, UserStats, Language } from '../types';
import { translations } from '../translations';

interface DashboardProps {
  onSelectLab: (subject: Subject) => void;
  stats: UserStats;
  lang: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectLab, stats, lang }) => {
  const t = translations[lang];

  const worlds = [
    {
      subject: Subject.BIOLOGY,
      title: t.biology,
      icon: '🌿',
      color: 'from-green-400 to-emerald-600',
      description: lang === 'uz' ? "Hayot mo'jizalarini kashf et!" : "Discover the miracles of life!"
    },
    {
      subject: Subject.CHEMISTRY,
      title: t.chemistry,
      icon: '🧪',
      color: 'from-pink-400 to-rose-600',
      description: lang === 'uz' ? "Rangli reaksiyalar dunyosi!" : "The world of colorful reactions!"
    },
    {
      subject: Subject.PHYSICS,
      title: t.physics,
      icon: '🌌',
      color: 'from-sky-400 to-blue-600',
      description: lang === 'uz' ? "Kuch va harakat qonunlari!" : "Laws of force and motion!"
    },
    {
      subject: Subject.INFORMATICS,
      title: t.informatics,
      icon: '🤖',
      color: 'from-indigo-400 to-purple-600',
      description: lang === 'uz' ? "Robotlar va kodlar olami!" : "The world of robots and code!"
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {worlds.map((world) => (
          <div 
            key={world.subject}
            className="group relative bg-white rounded-[40px] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-sky-200 h-[380px] flex flex-col"
          >
            <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${world.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700`}></div>
            
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${world.color} flex items-center justify-center text-5xl text-white mb-6 shadow-lg group-hover:rotate-6 transition-transform`}>
              {world.icon}
            </div>

            <h3 className="text-2xl font-black text-sky-900 mb-2 font-whimsical uppercase tracking-tight">{world.title}</h3>
            <p className="text-sky-500 font-bold text-sm mb-8 flex-grow leading-relaxed">{world.description}</p>

            <button
              onClick={() => onSelectLab(world.subject)}
              className="w-full py-5 bg-sky-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-800 transition-all shadow-lg hover:shadow-sky-200 active:scale-95"
            >
              {t.enterLab}
            </button>
          </div>
        ))}
      </div>

      <section className="bg-gradient-to-br from-indigo-900 to-sky-800 p-10 rounded-[60px] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-6 font-whimsical tracking-tight flex items-center gap-3">
              <span className="text-4xl">💎</span> {t.achievements}
            </h2>
            <div className="flex flex-wrap gap-4">
              {stats.badges.length === 0 ? (
                <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] w-full text-center group hover:bg-white/10 transition-colors cursor-default">
                  <span className="text-5xl block mb-4 opacity-30 group-hover:scale-110 transition-transform">📦</span>
                  <p className="font-bold opacity-40">{t.noBadges}</p>
                </div>
              ) : (
                stats.badges.map(b => (
                  <div key={b.id} className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[32px] border border-white/20 flex items-center justify-center text-5xl hover:scale-110 hover:-rotate-6 transition-all cursor-pointer shadow-xl" title={b.name}>
                    {b.icon}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="w-full md:w-80 bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 shadow-2xl animate-float">
            <h4 className="text-xs font-black uppercase tracking-widest text-sky-300 mb-2">{t.factTitle} 🧪</h4>
            <p className="text-lg font-bold italic leading-relaxed">
              {lang === 'uz' 
                ? "Daraxtlar bir yilda o'rtacha 120 kg kislorod ishlab chiqaradi! 🌳"
                : "A single tree produces about 120 kg of oxygen per year! 🌳"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
