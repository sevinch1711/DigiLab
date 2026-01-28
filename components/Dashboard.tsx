
import React from 'react';
import { Subject, UserStats, Language } from '../types';
import { translations } from '../translations';
import ResearchIntelligence from './ResearchIntelligence';

// Added missing onSelectExperiment to DashboardProps to fix TS errors in App.tsx
interface DashboardProps {
  onSelectLab: (subject: Subject) => void;
  onSelectExperiment: (subject: Subject, expId: string) => void;
  stats: UserStats;
  lang: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectLab, onSelectExperiment, stats, lang }) => {
  const t = translations[lang];

  const worlds = [
    {
      subject: Subject.BIOLOGY,
      title: t.biology,
      icon: '🌿',
      color: 'from-green-400 to-emerald-600',
      motivation: (t as any).bio_motivation,
      glow: 'shadow-emerald-500/20'
    },
    {
      subject: Subject.CHEMISTRY,
      title: t.chemistry,
      icon: '🧪',
      color: 'from-pink-400 to-rose-600',
      motivation: (t as any).chem_motivation,
      glow: 'shadow-rose-500/20'
    },
    {
      subject: Subject.PHYSICS,
      title: t.physics,
      icon: '🌌',
      color: 'from-sky-400 to-blue-600',
      motivation: (t as any).phys_motivation,
      glow: 'shadow-sky-500/20'
    },
    {
      subject: Subject.INFORMATICS,
      title: t.informatics,
      icon: '💻',
      color: 'from-indigo-400 to-purple-600',
      motivation: (t as any).info_motivation,
      glow: 'shadow-indigo-500/20'
    }
  ];

  const currentRank = fullLeaderboardRank(stats);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* 1. Subjects Grid - Main focus */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {worlds.map((world) => {
          const mastery = stats.subjectAnalytics[world.subject].masteryLevel;
          return (
            <div key={world.subject} className="bg-white rounded-[48px] p-8 shadow-xl border-2 border-transparent hover:border-slate-100 transition-all flex flex-col group h-[420px] transform hover:-translate-y-2 duration-500 relative">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${world.color} flex items-center justify-center text-4xl text-white shadow-lg group-hover:rotate-6 transition-transform`}>
                  {world.icon}
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth Path</span>
                  <div className="flex gap-1 mt-1 justify-end">
                    {[1, 2, 3, 4, 5].map(dot => (
                      <div key={dot} className={`w-1.5 h-1.5 rounded-full transition-all ${dot <= mastery ? 'bg-emerald-400 scale-125 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-100'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-4 font-whimsical uppercase tracking-tighter">{world.title}</h3>
              <p className="text-slate-500 font-bold text-sm mb-6 flex-grow leading-relaxed">
                {world.motivation}
              </p>

              <div className="h-1.5 w-full bg-slate-50 rounded-full mb-8 overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${world.color} transition-all duration-1000`} style={{width: `${(mastery / 5) * 100}%`}}></div>
              </div>

              <button 
                onClick={() => onSelectLab(world.subject)}
                className="w-full py-5 bg-[#007AFF] text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] hover:bg-sky-600 transition-all shadow-lg active:scale-95"
              >
                {t.enterLab}
              </button>
            </div>
          )
        })}
      </div>

      {/* 2. Research Intelligence Center */}
      <ResearchIntelligence stats={stats} lang={lang} />

      {/* 3. Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[48px] border border-white shadow-xl flex items-center gap-6 group hover:scale-[1.02] transition-transform">
           <div className="w-16 h-16 bg-yellow-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 transition-transform">🥇</div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.rank}</p>
              <h4 className="text-2xl font-black text-slate-900">#{currentRank}</h4>
           </div>
        </div>
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[48px] border border-white shadow-xl flex items-center gap-6 group hover:scale-[1.02] transition-transform col-span-1 md:col-span-2">
           <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">💡</div>
           <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inspiration</p>
              <h4 className="text-xl font-black text-slate-700 italic">{t.motivation}</h4>
           </div>
        </div>
      </div>
    </div>
  );
};

function fullLeaderboardRank(stats: UserStats) {
  const mockScores = [12450, 11200, 8900];
  const rank = mockScores.filter(s => s > stats.points).length + 1;
  return rank;
}

export default Dashboard;
