
import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface AboutPageProps {
  lang: Language;
}

const AboutPage: React.FC<AboutPageProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <div className="min-h-screen pb-20 animate-in fade-in duration-1000">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Hero Card */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[60px] border border-white/60 p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-sky-300/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <h1 className="text-6xl font-black text-slate-900 font-whimsical tracking-tight mb-3">DigiLab</h1>
                <p className="text-sky-600 font-black uppercase tracking-[0.3em] text-xs">Research & Discovery</p>
              </div>
              <div className="bg-white/80 backdrop-blur-md px-8 py-5 rounded-[32px] border border-white shadow-sm text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Created by</p>
                <h3 className="text-xl font-black text-slate-800">Sevinch Jovliyeva</h3>
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{(t as any).about_intro_title}</h2>
              <p className="text-slate-600 font-bold leading-relaxed text-xl">
                {(t as any).about_intro_text}
              </p>
            </div>
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/50 backdrop-blur-lg rounded-[50px] border border-white/60 p-10 shadow-xl space-y-6 group hover:bg-white transition-all duration-500">
            <div className="w-16 h-16 bg-sky-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-2xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{(t as any).about_goal_title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">
              {(t as any).about_goal_text}
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-lg rounded-[50px] border border-white/60 p-10 shadow-xl space-y-6 group hover:bg-white transition-all duration-500">
            <div className="w-16 h-16 bg-indigo-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">🧠</div>
            <h3 className="text-2xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{(t as any).about_innovation_title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">
              {(t as any).about_innovation_text}
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-[60px] p-16 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl group-hover:scale-110 transition-transform">📜</div>
          <h3 className="text-3xl font-black font-whimsical uppercase tracking-tight mb-8">{(t as any).about_copyright_title}</h3>
          <p className="text-slate-400 font-bold leading-relaxed text-base opacity-90">
            {(t as any).about_copyright_text}
          </p>
          <div className="mt-12 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-xl">✨</div>
            <p className="text-slate-300 font-black uppercase text-xs tracking-widest">© DigiLab Research. All rights reserved.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
