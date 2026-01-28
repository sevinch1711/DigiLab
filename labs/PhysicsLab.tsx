
import React, { useState } from 'react';
import { Badge, Language, Subject, QuestionPool } from '../types';
import { translations } from '../translations';
import CatAssessment from '../components/CatAssessment';
import AIDiagnosticCenter from '../components/AIDiagnosticCenter';

interface PhysicsLabProps {
  experimentId: string | null;
  onSelectExp: (id: string) => void;
  onComplete: (level: number) => void;
  onEarnBadge: (badge: Badge) => void;
  onDiagnosticComplete?: (irt: string) => void;
  lang: Language;
}

const PhysicsLab: React.FC<PhysicsLabProps> = ({ experimentId, onSelectExp, onComplete, onEarnBadge, onDiagnosticComplete, lang }) => {
  const t = translations[lang];
  const [showAssessment, setShowAssessment] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

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

  const getIframeUrl = () => {
    switch (experimentId) {
      case 'exp1': return "https://phet.colorado.edu/sims/html/forces-and-motion-basics/latest/forces-and-motion-basics_uz.html";
      case 'exp3': return "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc-virtual-lab/latest/circuit-construction-kit-dc-virtual-lab_uz.html";
      case 'exp2': return "https://phet.colorado.edu/sims/html/energy-skate-park/latest/energy-skate-park_uz.html";
      case 'exp4': return "https://phet.colorado.edu/sims/html/bending-light/latest/bending-light_uz.html";
      case 'exp5': return "https://phet.colorado.edu/sims/html/density/latest/density_uz.html";
      case 'exp6': return "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_uz.html";
      case 'exp7': return "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_uz.html";
      case 'exp8': return "https://phet.colorado.edu/sims/html/faradays-law/latest/faradays-law_uz.html";
      default: return "";
    }
  };

  if (!experimentId) {
    return (
      <div className="space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-sky-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg">⚡</div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.physics}</h2>
            <p className="text-slate-400 font-bold">Tajribani tanlang</p>
          </div>
        </div>
        <AIDiagnosticCenter subject={Subject.PHYSICS} lang={lang} onDiagnosticComplete={onDiagnosticComplete} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {experiments.map(exp => (
            <button key={exp.id} onClick={() => onSelectExp(exp.id)} className="group bg-white p-8 rounded-[40px] shadow-lg hover:shadow-xl transition-all border-2 border-sky-50 flex flex-col items-center">
              <div className="text-[50px] mb-3 group-hover:rotate-12 transition-transform">{exp.icon}</div>
              <h3 className="text-[10px] font-black text-sky-900 uppercase tracking-widest text-center leading-tight">{exp.title}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CatAssessment 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
        questionPool={{ 1: [{ id: 'p-1', level: 1, text: 'Nyutonning ikkinchi qonuni qaysi formula bilan ifodalanadi?', options: ['F = m*a', 'E = mc^2', 'P = U*I', 'v = s/t'], correct: 0 }] }} 
        rewardBadge={{ id: 'phys_pro', name: 'Physics Master', description: 'Expert', icon: '⚡', subject: Subject.PHYSICS }} 
        rewardXP={400} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Physics"}
        onSuccess={(l) => {onComplete(l); setShowAssessment(false);}} 
      />
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-6 rounded-[32px] border border-white shadow-sm">
         <button onClick={() => onSelectExp(null)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs">← Orqaga</button>
         <h2 className="text-xl font-black text-sky-900 uppercase tracking-tight">{experiments.find(e => e.id === experimentId)?.title}</h2>
         <button onClick={() => setShowTheory(!showTheory)} className="px-8 py-3 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest">{(t as any).theory_info}</button>
      </div>
      <div className="bg-white p-2 rounded-[50px] border-4 border-sky-50 shadow-2xl overflow-hidden aspect-video relative group flex items-center justify-center">
         <iframe src={getIframeUrl()} width="100%" height="100%" allowFullScreen className="border-none rounded-[44px]"></iframe>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-10 pointer-events-none group-hover:pointer-events-auto transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
            <button onClick={() => setShowAssessment(true)} className="w-full py-6 bg-[#007AFF] text-white rounded-[32px] font-black uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(0,122,255,0.4)] hover:scale-[1.05] border-4 border-white pointer-events-auto active:scale-95 transition-all">Bilimni Tekshirish 🚀</button>
         </div>
      </div>
    </div>
  );
};

export default PhysicsLab;
