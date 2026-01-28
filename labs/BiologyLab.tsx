
import React, { useState } from 'react';
import { Badge, Language, Subject, QuestionPool } from '../types';
import { translations } from '../translations';
import CatAssessment from '../components/CatAssessment';
import AIDiagnosticCenter from '../components/AIDiagnosticCenter';

interface BiologyLabProps {
  experimentId: string | null;
  onSelectExp: (id: string) => void;
  onComplete: (level: number) => void;
  onEarnBadge: (badge: Badge) => void;
  onDiagnosticComplete?: (irt: string) => void;
  lang: Language;
}

const BiologyLab: React.FC<BiologyLabProps> = ({ experimentId, onSelectExp, onComplete, onEarnBadge, onDiagnosticComplete, lang }) => {
  const t = translations[lang];
  const [showAssessment, setShowAssessment] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  const experiments = [
    { id: 'natural_selection', title: (t as any).bio_selection_title || 'Tabiiy Tanlanish', icon: '🐰' },
    { id: 'gene_expression', title: (t as any).bio_gene_title || 'Gen Ifodalanishi', icon: '🧬' },
    { id: 'neuron', title: (t as any).bio_neuron_title || 'Neyron Signallari', icon: '🧠' },
    { id: 'genetics', title: (t as any).bio_genetics_title || 'Genetika', icon: '👨‍👩‍👧‍👦' },
    { id: 'diffusion', title: (t as any).bio_diffusion_title || 'Diffuziya va Osmos', icon: '⚖️' },
    { id: 'color_vision', title: (t as any).bio_color_title || 'Rangli Ko\'rish', icon: '👁️' },
    { id: 'molecular_logic', title: (t as any).bio_molecular_logic_title || 'Molekulyar Mantiq', icon: '✨' },
    { id: 'molecules', title: (t as any).bio_molecules_title || 'Molekulyar Dizayn', icon: '⚛️' }
  ];

  const getIframeUrl = () => {
    switch (experimentId) {
      case 'natural_selection': return "https://phet.colorado.edu/sims/html/natural-selection/latest/natural-selection_uz.html";
      case 'gene_expression': return "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_uz.html";
      case 'neuron': return "https://phet.colorado.edu/sims/html/neuron/latest/neuron_uz.html";
      case 'color_vision': return "https://phet.colorado.edu/sims/html/color-vision/latest/color-vision_uz.html";
      case 'molecules': return "https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_uz.html";
      case 'genetics': return "https://phet.colorado.edu/sims/html/gene-expression-essentials/latest/gene-expression-essentials_uz.html";
      case 'molecular_logic': return "https://phet.colorado.edu/sims/html/molecules-and-light/latest/molecules-and-light_uz.html";
      case 'diffusion': return "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_uz.html";
      default: return "";
    }
  };

  if (!experimentId) {
    return (
      <div className="space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg">🌿</div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.biology}</h2>
            <p className="text-slate-400 font-bold">Tajribani tanlang</p>
          </div>
        </div>
        <AIDiagnosticCenter subject={Subject.BIOLOGY} lang={lang} onDiagnosticComplete={onDiagnosticComplete} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {experiments.map(exp => (
            <button key={exp.id} onClick={() => onSelectExp(exp.id)} className="group bg-white p-8 rounded-[40px] shadow-lg hover:shadow-xl transition-all border-2 border-emerald-50 flex flex-col items-center">
              <div className="text-[50px] mb-3 group-hover:rotate-12 transition-transform">{exp.icon}</div>
              <h3 className="text-[10px] font-black text-emerald-900 uppercase tracking-widest text-center leading-tight">{exp.title}</h3>
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
        questionPool={{ 1: [{ id: 'b-1', level: 1, text: 'DNK qisqartmasi nima?', options: ['Dezoksiribonuklein kislota', 'Dinamik Neyron Kodu', 'Degradatsiya', 'Bilmayman'], correct: 0 }] }}
        rewardBadge={{ id: 'b_explorer', name: 'Bio Explorer', description: 'Expert', icon: '🌿', subject: Subject.BIOLOGY }} 
        rewardXP={400} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Biology"}
        onSuccess={(l) => {onComplete(l); setShowAssessment(false);}} 
      />
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-6 rounded-[32px] border border-white shadow-sm">
         <button onClick={() => onSelectExp(null)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs">← Orqaga</button>
         <h2 className="text-xl font-black text-emerald-900 uppercase tracking-tight">{experiments.find(e => e.id === experimentId)?.title}</h2>
         <button onClick={() => setShowTheory(!showTheory)} className="px-8 py-3 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest">{(t as any).theory_info}</button>
      </div>
      <div className="bg-white p-2 rounded-[50px] border-4 border-emerald-50 shadow-2xl overflow-hidden aspect-video relative group flex items-center justify-center">
         <iframe src={getIframeUrl()} width="100%" height="100%" allowFullScreen className="border-none rounded-[44px]"></iframe>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-md px-10 pointer-events-none group-hover:pointer-events-auto transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
            <button onClick={() => setShowAssessment(true)} className="w-full py-6 bg-[#007AFF] text-white rounded-[32px] font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_rgba(0,122,255,0.4)] hover:scale-[1.05] border-4 border-white pointer-events-auto active:scale-95 transition-all">Bilimni Tekshirish 🚀</button>
         </div>
      </div>
    </div>
  );
};

export default BiologyLab;
