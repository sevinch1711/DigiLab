
import React, { useState } from 'react';
import { Badge, Language, Subject, QuestionPool } from '../types';
import { translations } from '../translations';
import CatAssessment from '../components/CatAssessment';

interface PhysicsLabProps {
  experimentId: string | null;
  onSelectExp: (id: string) => void;
  onComplete: () => void;
  onEarnBadge: (badge: Badge) => void;
  lang: Language;
}

const PhysicsLab: React.FC<PhysicsLabProps> = ({ experimentId, onSelectExp, onComplete, onEarnBadge, lang }) => {
  const t = translations[lang];
  const [showAssessment, setShowAssessment] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  // Question Pools
  const poolExp1: QuestionPool = {
    1: [{ id: '1-1', level: 1, text: "Natijaviy kuch nol bo'lganda jism harakati qanday bo'ladi?", options: ["Tezlashadi", "Sekinlashadi", "O'zgarmas tezlikda qoladi", "To'xtaydi"], correct: 2 }],
    3: [{ id: '1-3', level: 3, text: "Ishqalanish kuchi har doim qayerga yo'nalgan bo'ladi?", options: ["Harakat bilan bir xil", "Harakatga teskari", "Perpendikulyar", "Hamma tomonga"], correct: 1 }]
  };

  const badges: Record<string, Badge> = {
    exp1: { id: 'phys_mechanic', name: 'Mechanic Master', description: 'Mastered Forces.', icon: '🍎', subject: Subject.PHYSICS },
    exp2: { id: 'phys_energy', name: 'Energy Guardian', description: 'Expert in Energy.', icon: '🛹', subject: Subject.PHYSICS },
    exp3: { id: 'phys_ohm', name: 'Ohm Specialist', description: 'Mastered Electricity.', icon: '⚡', subject: Subject.PHYSICS }
  };

  const experiments = [
    { id: 'exp1', title: 'Forces & Motion', icon: '🍎' },
    { id: 'exp2', title: 'Energy Skate Park', icon: '🛹' },
    { id: 'exp3', title: 'Ohm\'s Law', icon: '⚡' },
    { id: 'exp4', title: 'Bending Light', icon: '🌈' },
    { id: 'exp5', title: 'Fluid Dynamics', icon: '💧' },
    { id: 'exp6', title: 'Wave Interference', icon: '〰️' },
    { id: 'exp7', title: 'Build an Atom', icon: '⚛️' },
    { id: 'exp8', title: 'Faraday\'s Law', icon: '🧲' }
  ];

  if (!experimentId) {
    return (
      <div className="space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-sky-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg">⚡</div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.physics}</h2>
            <p className="text-slate-400 font-bold">Laboratoriya tajribasini tanlang</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experiments.map(exp => (
            <button 
              key={exp.id}
              onClick={() => onSelectExp(exp.id)}
              className="group bg-white p-6 rounded-[40px] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border-2 border-sky-50 flex flex-col items-center"
            >
              <div className="text-[50px] mb-3 group-hover:rotate-12 transition-transform">{exp.icon}</div>
              <h3 className="text-xs font-black text-sky-900 uppercase tracking-widest text-center leading-tight">
                {exp.title}
              </h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const getIframeUrl = () => {
    switch (experimentId) {
      case 'exp1': return "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_uz.html";
      case 'exp2': return "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_uz.html";
      case 'exp3': return "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_uz.html";
      case 'exp4': return "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_uz.html";
      case 'exp5': return "https://phet.colorado.edu/sims/html/density/latest/density_uz.html";
      case 'exp6': return "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_uz.html";
      case 'exp7': return "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_uz.html";
      default: return "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_uz.html";
    }
  };

  return (
    <div className="space-y-6">
      <CatAssessment 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
        questionPool={poolExp1} 
        rewardBadge={badges[experimentId] || badges.exp1} 
        rewardXP={400} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Physics"}
        onSuccess={() => { onEarnBadge(badges[experimentId] || badges.exp1); onComplete(); }} 
      />
      
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-5 rounded-[32px] border border-white shadow-sm">
         <button onClick={() => onSelectExp(null)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors">← Orqaga</button>
         <h2 className="text-xl font-black text-sky-900 uppercase tracking-tight">{experiments.find(e => e.id === experimentId)?.title}</h2>
         <button onClick={() => setShowTheory(!showTheory)} className="px-8 py-3 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95">Theory</button>
      </div>

      <div className="space-y-6">
        {showTheory && (
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[48px] border border-white shadow-xl animate-in slide-in-from-top-4 duration-500">
            <h3 className="text-2xl font-black text-slate-900 mb-6 font-whimsical uppercase tracking-tight">Ilmiy Nazariya 📖</h3>
            <div className="text-slate-600 font-bold leading-relaxed space-y-4 text-lg">
               <p>Fizika qonunlari koinotning ishlash tamoyillarini belgilaydi. Ushbu tajriba orqali jismga ta'sir etuvchi kuchlar, energiya saqlanishi yoki moddiy dunyo tuzilishini chuqur o'rganasiz.</p>
               <p>Har bir simulyatsiya ortida aniq matematik mantiq va fizik qonuniyatlar yotadi.</p>
            </div>
          </div>
        )}

        <div className="bg-white p-2 rounded-[50px] border-4 border-sky-50 shadow-2xl overflow-hidden aspect-video relative group flex items-center justify-center">
           <iframe src={getIframeUrl()} width="100%" height="100%" scrolling="no" allowFullScreen className="border-none rounded-[44px]"></iframe>
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-10 pointer-events-none group-hover:pointer-events-auto transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
              <button onClick={() => setShowAssessment(true)} className="w-full py-5 bg-[#007AFF] text-white rounded-3xl font-black uppercase tracking-[0.1em] shadow-[0_15px_30px_rgba(0,122,255,0.4)] hover:scale-[1.05] border-4 border-white pointer-events-auto">Bilimni tekshirish 🚀</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PhysicsLab;
