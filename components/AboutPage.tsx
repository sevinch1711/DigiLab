
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutPageProps {
  lang: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const t = translations[lang] as any;
  const [showFullThesis, setShowFullThesis] = useState(false);

  return (
    <div className="min-h-screen pb-24 animate-in fade-in duration-1000 scroll-smooth bg-slate-50/30">
      <div className="max-w-5xl mx-auto space-y-10 px-4 pt-12">
        
        <div className="bg-white rounded-[60px] p-10 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-1">
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 font-whimsical tracking-tighter">
                DigiLab
              </h1>
              <p className="text-[#007AFF] font-black text-[10px] uppercase tracking-[0.4em]">
                Educational Research Project
              </p>
            </div>
            
            <button 
              onClick={() => setShowFullThesis(!showFullThesis)}
              className="bg-[#007AFF] text-white shadow-xl shadow-blue-200 rounded-3xl px-10 py-5 font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
            >
              {showFullThesis ? '✕ Close Report' : t.scientific_report_btn}
            </button>
          </div>

          {!showFullThesis ? (
            <div className="space-y-10 pt-6 animate-in slide-in-from-bottom-4 duration-500">
              
              {/* 1. GOAL AT THE TOP - HEARTFELT */}
              <div className="bg-gradient-to-br from-indigo-50 to-white p-10 rounded-[48px] border-2 border-indigo-100 shadow-sm relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 text-[180px] opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-1000">🎯</div>
                <h2 className="text-3xl font-black text-indigo-900 font-whimsical uppercase tracking-tight mb-6 flex items-center gap-4">
                   <span className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-xl shadow-lg">🌟</span>
                   {t.about_goal_title}
                </h2>
                <p className="text-indigo-800/80 font-bold leading-relaxed text-xl max-w-4xl relative z-10">
                  {t.about_goal_text}
                </p>
              </div>

              {/* 2. INTRO SECTION */}
              <div className="space-y-6 px-4">
                <h3 className="text-2xl font-black text-slate-900 font-whimsical uppercase tracking-tight">
                  {t.about_intro_title}
                </h3>
                <p className="text-slate-500 font-bold leading-relaxed text-lg max-w-4xl">
                  {t.about_intro_text}
                </p>
              </div>

              {/* 3. INNOVATION & IRT/CAT EXPLANATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-xl space-y-6 group hover:scale-[1.02] transition-transform">
                    <div className="w-16 h-16 bg-purple-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 transition-transform">🧠</div>
                    <h3 className="text-xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.about_innovation_title}</h3>
                    <p className="text-slate-500 font-bold leading-relaxed text-md">{t.about_innovation_text}</p>
                 </div>
                 
                 <div className="bg-emerald-50 rounded-[48px] p-10 border border-emerald-100 shadow-xl space-y-6 group hover:scale-[1.02] transition-transform">
                    <div className="w-16 h-16 bg-emerald-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 transition-transform">🚀</div>
                    <h3 className="text-xl font-black text-emerald-900 font-whimsical uppercase tracking-tight">{t.about_future_title}</h3>
                    <p className="text-emerald-700/80 font-bold leading-relaxed text-md">{t.about_future_text}</p>
                 </div>
              </div>

            </div>
          ) : (
            <div className="space-y-12 pt-6 animate-in fade-in zoom-in duration-700 bg-slate-50 rounded-[40px] p-8 md:p-12 border border-slate-200 shadow-inner max-h-[800px] overflow-y-auto scrollbar-none">
               <h2 className="text-3xl font-black text-slate-900 font-whimsical text-center border-b-4 border-[#007AFF] pb-4 inline-block mx-auto w-full uppercase">{t.full_report_title}</h2>
               
               <section className="space-y-4">
                  <h3 className="text-xl font-black text-[#007AFF] uppercase tracking-widest">KIRISH</h3>
                  <p className="text-slate-600 font-bold leading-relaxed text-md">{t.thesis_intro}</p>
               </section>

               <section className="space-y-4">
                  <h3 className="text-xl font-black text-[#007AFF] uppercase tracking-widest">{t.chapter1_title}</h3>
                  <p className="text-slate-600 font-bold leading-relaxed text-md">Virtual laboratoriyalar raqamli transformatsiya davrida ta'limning ajralmas qismiga aylandi. Loyiha doirasida o'quvchilarning STEM fanlariga bo'lgan qiziqishini interaktiv simulyatsiyalar orqali oshirish strategiyalari tahlil qilindi.</p>
               </section>

               <section className="space-y-4">
                  <h3 className="text-xl font-black text-[#007AFF] uppercase tracking-widest">{t.chapter2_title}</h3>
                  <p className="text-slate-600 font-bold leading-relaxed text-md">Loyiha React platformasida yagona sahifali ilova (SPA) sifatida qurilgan. Tizimda "Computer Adaptive Testing" (CAT) algoritmi qo'llanilgan bo'lib, u savollarni o'quvchining darajasiga qarab avtomatik moslashtiradi.</p>
               </section>

               <section className="space-y-4">
                  <h3 className="text-xl font-black text-[#007AFF] uppercase tracking-widest">{t.chapter3_title}</h3>
                  <p className="text-slate-600 font-bold leading-relaxed text-md">Multimodal AI texnologiyasi orqali laboratoriya ishlarini vizual tahlil qilish (Screenshot tahlili) o'quvchiga an'anaviy metodlardan 10 barobar tezroq fikr-mulohaza olish imkonini beradi.</p>
               </section>

               <section className="space-y-4 bg-white p-8 rounded-[32px] border border-blue-100 shadow-sm">
                  <h3 className="text-xl font-black text-emerald-600 uppercase tracking-widest">{t.conclusion_title}</h3>
                  <p className="text-slate-600 font-bold leading-relaxed text-md italic">{t.conclusion_text}</p>
               </section>

               <section className="space-y-4">
                  <h3 className="text-xl font-black text-slate-400 uppercase tracking-widest">{t.bibliography_title}</h3>
                  <ul className="text-slate-400 font-black text-xs space-y-2 list-decimal pl-5">
                    <li>Sevinch Jovliyeva - DigiLab Research Papers (2024-2025)</li>
                    <li>Google AI Documentation (ai.google.dev)</li>
                    <li>Item Response Theory (Lord, 1980) - Ta'limda CAT metodikasi</li>
                    <li>PhET Interactive Simulations - University of Colorado</li>
                  </ul>
               </section>
            </div>
          )}
        </div>

        <div className="bg-[#1a202c] rounded-[60px] p-12 md:p-16 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-1/2 right-12 -translate-y-1/2 text-[180px] opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">📜</div>
          
          <div className="relative z-10 space-y-10">
            <div className="space-y-6">
              <h2 className="text-3xl font-black font-whimsical uppercase tracking-tight">{t.about_copyright_title}</h2>
              <p className="text-slate-400 font-bold leading-relaxed text-lg max-w-3xl">{t.about_copyright_text}</p>
            </div>

            <div className="pt-10 flex items-center gap-6 border-t border-white/5">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl">✨</div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.6em]">© DigiLab Research. Course Work Project. 2025.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
