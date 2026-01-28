
import React, { useEffect, useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { GoogleGenAI } from '@google/genai';
import { UserStats, Subject, Language } from '../types';
import { translations } from '../translations';

interface ResearchIntelligenceProps {
  stats: UserStats;
  lang: Language;
}

const ResearchIntelligence: React.FC<ResearchIntelligenceProps> = ({ stats, lang }) => {
  const t = translations[lang] as any;
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(`scientific_report_${stats.points}_${lang}`);
    if (cached) setAiReport(cached);
  }, [stats.points, lang]);

  const data = [
    { subject: t.biology, value: stats.subjectAnalytics[Subject.BIOLOGY].masteryLevel * 20 },
    { subject: t.chemistry, value: stats.subjectAnalytics[Subject.CHEMISTRY].masteryLevel * 20 },
    { subject: t.physics, value: stats.subjectAnalytics[Subject.PHYSICS].masteryLevel * 20 },
    { subject: t.informatics, value: stats.subjectAnalytics[Subject.INFORMATICS].masteryLevel * 20 },
  ];

  const generateScientificReport = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const promptText = `Profile: ${stats.userName}, XP: ${stats.points}. Write a 2-sentence encouraging academic summary in ${lang}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents: { parts: [{ text: promptText }] },
      });
      
      const result = response.text || "Report unavailable.";
      setAiReport(result);
      localStorage.setItem(`scientific_report_${stats.points}_${lang}`, result);
    } catch (err: any) {
      console.error(err);
      setAiReport("Hisobot limiti tugadi. Biroz kuting. ⏳");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-2xl rounded-[60px] p-10 border-2 border-white shadow-2xl transition-all duration-1000 flex flex-col lg:flex-row gap-12 items-center overflow-hidden relative group`}>
      <div className="flex-1 space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-indigo-100">
            {t.analytics_title}
          </div>
        </div>
        <h2 className="text-4xl font-black text-slate-900 font-whimsical tracking-tight leading-none">Research <br/> Intelligence</h2>
        
        {aiReport ? (
          <div className="bg-indigo-50 p-6 rounded-[32px] border border-indigo-100 animate-in slide-in-from-left-4 duration-500">
            <p className="text-indigo-900 font-bold italic text-sm leading-relaxed">"{aiReport}"</p>
            <button onClick={() => setAiReport(null)} className="mt-4 text-[8px] font-black uppercase tracking-widest text-indigo-400">✕ Tozalash</button>
          </div>
        ) : (
          <p className="text-slate-500 font-bold leading-relaxed max-w-sm">
            Tizim kashfiyotlar xaritangizni tahlil qilmoqda. Gemini Flash (Free Tier) orqali optimallashtirilgan.
          </p>
        )}
        
        <div className="pt-4 flex flex-wrap gap-4">
          <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100 min-w-[120px]">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.mastery}</p>
            <p className="text-2xl font-black text-indigo-600">{(stats.points / 100).toFixed(1)}</p>
          </div>
        </div>

        {!aiReport && (
          <button onClick={generateScientificReport} disabled={isGenerating} className="w-full lg:w-auto px-10 py-4 bg-[#007AFF] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg disabled:opacity-50">
            {isGenerating ? t.generating_report : t.scientific_report_btn}
          </button>
        )}
      </div>

      <div className="w-full lg:w-[400px] h-[350px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 900 }} />
            <Radar name="Mastery" dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResearchIntelligence;
