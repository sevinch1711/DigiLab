
import React from 'react';
import { Language, UserStats } from './types';
import { translations } from './translations';

interface LeaderboardProps {
  stats: UserStats;
  lang: Language;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ stats, lang }) => {
  const t = translations[lang];

  // User object based on local state
  const currentUser = {
    name: stats.isRegistered ? stats.userName : (lang === 'uz' ? "Mehmon (Siz)" : "Guest (You)"),
    xp: stats.points,
    badges: stats.badges.length,
    avatar: "🧙‍♂️",
    isSelf: true,
    badgesList: stats.badges.slice(0, 3).map(b => b.icon)
  };

  // Mock users for comparison
  const mockUsers = [
    { name: "Jasur Olimov", xp: 12450, badges: 12, avatar: "👨‍🔬", badgesList: ['🧪', '🧬', '⚡'], isSelf: false },
    { name: "Malika Karimova", xp: 11200, badges: 10, avatar: "👩‍🚀", badgesList: ['🌟', '🧬', '🔬'], isSelf: false },
    { name: "Akbar Rahmonov", xp: 8900, badges: 7, avatar: "👨‍🎓", badgesList: ['🍎', '💻'], isSelf: false }
  ];

  // Combine and sort
  const fullLeaderboard = [...mockUsers, currentUser].sort((a, b) => b.xp - a.xp);

  const subjectKings = [
    { subject: 'Physics', name: 'Jasur Olimov', icon: '⚡' },
    { subject: 'Biology', name: 'Malika Karimova', icon: '🌱' },
    { subject: 'Informatics', name: 'Akbar Rahmonov', icon: '💻' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Main Leaderboard Table */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-2xl rounded-[48px] border border-white shadow-2xl overflow-hidden">
            <div className="p-10 bg-slate-900 text-white flex justify-between items-end">
              <div>
                <h2 className="text-3xl font-black font-whimsical uppercase tracking-tight">{(t as any).leaderboard_title}</h2>
                <p className="text-slate-400 font-bold text-sm mt-2 uppercase">Science Ranking</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest block">Season 1</span>
                <span className="text-sky-400 font-black">2024-2025</span>
              </div>
            </div>

            <div className="p-4 md:p-10 space-y-4">
              {fullLeaderboard.map((user, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-center gap-6 p-6 rounded-[32px] transition-all border-2 group
                    ${user.isSelf 
                      ? 'bg-[#007AFF]/5 border-[#007AFF] shadow-xl shadow-[#007AFF]/5' 
                      : 'bg-white border-transparent hover:border-slate-100 hover:shadow-lg'
                    }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-inner
                    ${idx === 0 ? 'bg-yellow-400 text-white rotate-6' : idx === 1 ? 'bg-slate-200 text-slate-500' : idx === 2 ? 'bg-orange-200 text-orange-600' : 'bg-slate-50 text-slate-300'}`}>
                    {idx + 1}
                  </div>
                  
                  <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                    {user.avatar}
                  </div>

                  <div className="flex-1">
                    <h4 className={`text-xl font-black ${user.isSelf ? 'text-[#007AFF]' : 'text-slate-900'}`}>{user.name}</h4>
                    <div className="flex gap-2 mt-1">
                      {user.badgesList.map((icon, i) => (
                        <span key={i} className="text-sm opacity-60">{icon}</span>
                      ))}
                      {user.badgesList.length === 0 && <span className="text-xs text-slate-300 italic">Yutuqlar yo'q</span>}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900">{user.xp.toLocaleString()}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">XP Points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info Panels */}
        <div className="space-y-8">
          {/* Subject Kings */}
          <div className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 border border-white shadow-xl">
            <h3 className="text-xl font-black text-slate-900 mb-6 font-whimsical uppercase tracking-tight">{(t as any).subject_kings} 👑</h3>
            <div className="space-y-6">
              {subjectKings.map((king, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                    {king.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{king.subject}</p>
                    <h5 className="font-black text-slate-700">{king.name}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Challenge */}
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl group-hover:scale-150 transition-transform">🎯</div>
            <h3 className="text-xl font-black mb-4 font-whimsical uppercase tracking-tight">{(t as any).weekly_challenge}</h3>
            <p className="text-indigo-100 text-sm font-bold leading-relaxed mb-6">Hafta yakuniga qadar 3 ta Fizika laboratoriyasini Level 5 bilan tugating va maxsus 'Flash' nishoniga ega bo'ling!</p>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
               <div className="h-full bg-yellow-400" style={{width: '65%'}}></div>
            </div>
            <p className="text-[10px] font-black text-indigo-200 mt-2 uppercase tracking-widest">Tugallanish: 65%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
