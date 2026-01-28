
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface GuidePageProps {
  lang: Language;
}

const GuidePage: React.FC<GuidePageProps> = ({ lang }) => {
  const t = translations[lang] as any;

  const roadmapSteps = [
    {
      id: 1,
      title: t.guide_step1_title,
      desc: t.guide_step1_desc,
      icon: '📍',
      color: 'bg-sky-500',
      details: []
    },
    {
      id: 2,
      title: t.guide_step2_title,
      desc: t.guide_step2_desc,
      icon: '📖',
      color: 'bg-indigo-500',
      details: []
    },
    {
      id: 3,
      title: t.guide_step3_title,
      desc: t.guide_step3_desc,
      icon: '⚙️',
      color: 'bg-emerald-500',
      details: [t.guide_step3_1, t.guide_step3_2, t.guide_step3_3]
    },
    {
      id: 4,
      title: t.guide_step4_title,
      desc: t.guide_step4_desc,
      icon: '👨‍🏫',
      color: 'bg-amber-500',
      details: [t.guide_step4_1, t.guide_step4_2]
    },
    {
      id: 5,
      title: t.guide_step5_title,
      desc: t.guide_step5_desc,
      icon: '🎯',
      color: 'bg-rose-500',
      details: []
    },
    {
      id: 6,
      title: t.guide_step6_title,
      desc: t.guide_step6_desc,
      icon: '🏆',
      color: 'bg-purple-500',
      details: []
    }
  ];

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header Section */}
        <div className="bg-white rounded-[60px] p-12 md:p-16 shadow-xl border-2 border-slate-50 relative overflow-hidden text-center">
           <div className="absolute -top-10 -left-10 text-[200px] opacity-5 rotate-12">🚀</div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-whimsical uppercase tracking-tight mb-6 relative z-10">
             {t.guide_title}
           </h1>
           <p className="text-slate-500 font-bold text-xl leading-relaxed max-w-3xl mx-auto relative z-10">
             {t.guide_intro}
           </p>
        </div>

        {/* Roadmap Steps */}
        <div className="relative space-y-12">
           {/* Vertical Line for Roadmap */}
           <div className="absolute left-10 md:left-1/2 top-0 bottom-0 w-2 bg-slate-100 -translate-x-1/2 rounded-full hidden md:block"></div>

           {roadmapSteps.map((step, index) => (
             <div key={step.id} className={`flex flex-col md:flex-row items-center gap-8 relative z-10 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Step Content */}
                <div className="flex-1 w-full">
                  <div className="bg-white rounded-[48px] p-10 shadow-lg border-2 border-slate-50 hover:border-sky-100 transition-all group relative overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 ${step.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`w-10 h-10 ${step.color} text-white rounded-xl flex items-center justify-center font-black text-sm`}>
                        {step.id}
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{step.title}</h3>
                    </div>

                    <p className="text-slate-500 font-bold leading-relaxed mb-6">
                      {step.desc}
                    </p>

                    {step.details.length > 0 && (
                      <div className="space-y-4 bg-slate-50 rounded-[32px] p-6 border border-slate-100">
                        {step.details.map((detail, di) => (
                          <div key={di} className="flex gap-4">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400">
                              {di + 1}
                            </span>
                            <span className="text-slate-600 font-bold text-sm leading-relaxed">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Central Icon */}
                <div className="w-20 h-20 rounded-full bg-white border-8 border-slate-50 shadow-xl flex items-center justify-center text-4xl relative z-20 shrink-0">
                   {step.icon}
                </div>

                {/* Spacer for large screens */}
                <div className="flex-1 hidden md:block"></div>
             </div>
           ))}
        </div>

        {/* Final Call to Action */}
        <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white shadow-2xl relative overflow-hidden text-center group">
           <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 opacity-50"></div>
           <div className="relative z-10 space-y-8">
              <h3 className="text-3xl md:text-4xl font-black font-whimsical uppercase tracking-tight">Ilm-fan yo'liga tayyormisiz? 🔬</h3>
              <p className="text-slate-400 font-bold text-lg max-w-2xl mx-auto">
                Endi barcha imkoniyatlarni bilasiz. Hech qanday to'siq yo'q. Faqat siz va cheksiz bilim olami!
              </p>
              <div className="flex flex-wrap justify-center gap-8 pt-4">
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">🔭</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Kashf et</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-4xl group-hover:-rotate-12 transition-transform">🧬</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Tajriba qil</span>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🥇</div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">G'alaba qozon</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
