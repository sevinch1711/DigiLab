
import React, { useState } from 'react';
import { Badge, Language, Subject, QuestionPool } from '../types';
import { translations } from '../translations';
import CatAssessment from '../components/CatAssessment';
import AIDiagnosticCenter from '../components/AIDiagnosticCenter';

interface ChemistryLabProps {
  experimentId: string | null;
  onSelectExp: (id: string) => void;
  onComplete: (level: number) => void;
  onEarnBadge: (badge: Badge) => void;
  // Added onDiagnosticComplete to fix TypeScript error in App.tsx
  onDiagnosticComplete?: (irt: string) => void;
  lang: Language;
}

const ChemistryLab: React.FC<ChemistryLabProps> = ({ experimentId, onSelectExp, onComplete, onEarnBadge, onDiagnosticComplete, lang }) => {
  const t = translations[lang];
  const [showAssessment, setShowAssessment] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  const experiments = [
    { id: 'chem_atom', title: (t as any).chem_atom_title || 'Atom Qurish', icon: '⚛️' },
    { id: 'chem_states', title: (t as any).chem_states_title || 'Modda Holatlari', icon: '🌡️' },
    { id: 'chem_gas', title: (t as any).chem_gas_title || 'Gaz Qonunlari', icon: '🎈' },
    { id: 'chem_diffusion', title: (t as any).chem_diffusion_title || 'Diffuziya', icon: '🌫️' },
    { id: 'chem_concentration', title: (t as any).chem_concentration_title || 'Eritmalar', icon: '🧪' },
    { id: 'chem_ph', title: (t as any).chem_ph_title || 'pH Shkalasi', icon: '📉' },
    { id: 'chem_molecule_shapes', title: (t as any).chem_molecule_shapes_title || 'Molekulyar Geometriya', icon: '💎' },
    { id: 'chem_isotopes', title: (t as any).chem_isotopes_title || 'Izotoplar', icon: '🧬' },
    { id: 'chem_beers_law', title: (t as any).chem_beers_law_title || 'Beer Qonuni', icon: '🔦' },
    { id: 'chem_molarity', title: (t as any).chem_molarity_title || 'Molyarlik', icon: '⚖️' }
  ];

  if (!experimentId) {
    return (
      <div className="space-y-8 animate-in fade-in zoom-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-pink-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg">🧪</div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.chemistry}</h2>
            <p className="text-slate-400 font-bold">Laboratoriya tajribasini tanlang</p>
          </div>
        </div>

        {/* AI Diagnostic Center - Passing the diagnostic callback */}
        <AIDiagnosticCenter subject={Subject.CHEMISTRY} lang={lang} onDiagnosticComplete={onDiagnosticComplete} />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {experiments.map(exp => (
            <button key={exp.id} onClick={() => onSelectExp(exp.id)} className="group bg-white p-6 rounded-[40px] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border-2 border-rose-50 flex flex-col items-center">
              <div className="text-[50px] mb-3 group-hover:rotate-12 transition-transform">{exp.icon}</div>
              <h3 className="text-[10px] font-black text-rose-900 uppercase tracking-widest text-center leading-tight">{exp.title}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const getIframeUrl = () => {
    switch (experimentId) {
      case 'chem_atom': return "https://phet.colorado.edu/sims/html/build-an-atom/latest/build-an-atom_uz.html";
      case 'chem_states': return "https://phet.colorado.edu/sims/html/states-of-matter/latest/states-of-matter_uz.html";
      case 'chem_gas': return "https://phet.colorado.edu/sims/html/gas-properties/latest/gas-properties_uz.html";
      case 'chem_diffusion': return "https://phet.colorado.edu/sims/html/diffusion/latest/diffusion_uz.html";
      case 'chem_concentration': return "https://phet.colorado.edu/sims/html/concentration/latest/concentration_uz.html";
      case 'chem_ph': return "https://phet.colorado.edu/sims/html/ph-scale/latest/ph-scale_uz.html";
      case 'chem_molecule_shapes': return "https://phet.colorado.edu/sims/html/molecule-shapes/latest/molecule-shapes_uz.html";
      case 'chem_isotopes': return "https://phet.colorado.edu/sims/html/isotopes-and-atomic-mass/latest/isotopes-and-atomic-mass_uz.html";
      case 'chem_beers_law': return "https://phet.colorado.edu/sims/html/beers-law-lab/latest/beers-law-lab_uz.html";
      case 'chem_molarity': return "https://phet.colorado.edu/sims/html/molarity/latest/molarity_uz.html";
      default: return "";
    }
  };

  return (
    <div className="space-y-6">
      <CatAssessment 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
        questionPool={{ 3: [{ id: 'q', level: 3, text: 'Neytral pH nechaga teng?', options: ['0','7','14'], correct: 1 }] }}
        rewardBadge={{ id: 'b', name: 'Chem Master', description: 'Done', icon: '🧪', subject: Subject.CHEMISTRY }} 
        rewardXP={400} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Chemistry"}
        onSuccess={(level) => { onEarnBadge({ id: 'b', name: 'Chem Master', description: 'Done', icon: '🧪', subject: Subject.CHEMISTRY }); onComplete(level); }} 
      />
      
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-5 rounded-[32px] border border-white shadow-sm">
         <button onClick={() => onSelectExp(null)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors">← Orqaga</button>
         <h2 className="text-xl font-black text-rose-900 uppercase tracking-tight">{experiments.find(e => e.id === experimentId)?.title}</h2>
         <button onClick={() => setShowTheory(!showTheory)} className="px-8 py-3 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95">Theory</button>
      </div>

      <div className="space-y-6">
        {showTheory && (
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[48px] border border-white shadow-xl animate-in slide-in-from-top-4 duration-500">
            <h3 className="text-2xl font-black text-slate-900 mb-6 font-whimsical uppercase tracking-tight">Ilmiy Nazariya 📖</h3>
            <p className="text-slate-600 font-bold text-lg leading-relaxed">Kimyoviy jarayonlar va moddalarning atom darajasidagi xossalarini tahlil qilish orqali dunyoni tashkil etuvchi barcha elementlar sirini ochasiz. Laboratoriya ishini boshlashdan avval nazariy asoslarni ko'rib chiqish tavsiya etiladi.</p>
          </div>
        )}
        <div className="bg-white p-2 rounded-[50px] border-4 border-rose-50 shadow-2xl overflow-hidden aspect-video relative flex items-center justify-center group">
           <iframe src={getIframeUrl()} width="100%" height="100%" allowFullScreen className="border-none rounded-[44px]"></iframe>
           <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm px-10 group-hover:opacity-100 opacity-0 transition-opacity translate-y-4 group-hover:translate-y-0">
              <button onClick={() => setShowAssessment(true)} className="w-full py-5 bg-[#007AFF] text-white rounded-3xl font-black uppercase tracking-[0.1em] border-4 border-white shadow-xl">Bilimni tekshirish 🚀</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChemistryLab;
