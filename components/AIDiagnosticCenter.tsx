
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { Subject, Language } from '../types';
import { translations } from '../translations';

interface AIDiagnosticCenterProps {
  subject: Subject;
  lang: Language;
  onDiagnosticComplete?: (irtScore: string) => void;
}

const AIDiagnosticCenter: React.FC<AIDiagnosticCenterProps> = ({ subject, lang, onDiagnosticComplete }) => {
  const t = translations[lang] as any;
  const [image, setImage] = useState<string | null>(null);
  const [report, setReport] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const cached = localStorage.getItem(`diag_cache_${subject}_${lang}`);
    if (cached) {
      setReport(JSON.parse(cached));
    }
  }, [subject, lang]);

  const compressImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 700;
        let width = img.width;
        let height = img.height;
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.5));
      };
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result as string);
        setImage(compressed);
        setReport(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!image) return;
    
    setIsAnalyzing(true);
    setReport(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const promptText = `Analyze this ${subject} screenshot for a young student. Provide an encouraging scientific analysis. Language: ${lang}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            { text: promptText },
            { inlineData: { mimeType: 'image/jpeg', data: image.split(',')[1] } }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              observation: { type: Type.STRING, description: "Detailed observation of the student's lab work." },
              scientific_secret: { type: Type.STRING, description: "A fun scientific fact related to the observation." },
              hint: { type: Type.STRING, description: "A helpful hint for further exploration." },
              mission: { type: Type.STRING, description: "A small challenge for the student." },
              irt_score: { type: Type.NUMBER, description: "Academic performance score from -3 to 3." }
            },
            required: ["observation", "scientific_secret", "hint", "mission", "irt_score"]
          }
        }
      });

      const jsonStr = response.text || "{}";
      const parsedReport = JSON.parse(jsonStr);
      
      setReport(parsedReport);
      localStorage.setItem(`diag_cache_${subject}_${lang}`, JSON.stringify(parsedReport));

      if (onDiagnosticComplete && parsedReport.irt_score !== undefined) {
        onDiagnosticComplete(parsedReport.irt_score.toString());
      }
    } catch (err: any) {
      console.error("AI Analysis Error:", err);
      let errorMsg = "Tizimda xatolik yuz berdi. 🌐";
      if (err.message?.includes('429')) errorMsg = "Sizda limit tugagan. Bir ozdan so'ng urinib ko'ring! ⏳";
      if (err.message?.includes('API key')) errorMsg = "API kalitingiz noto'g'ri. 🔑";
      setReport({ error: errorMsg });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-[#0f172a] rounded-[60px] p-8 md:p-12 shadow-2xl border-4 border-slate-800 relative overflow-hidden">
      <div className="relative z-10 flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-8">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-indigo-700 rounded-[32px] flex items-center justify-center text-4xl shadow-lg animate-float">👨‍🏫</div>
             <div>
                <h3 className="text-3xl font-black text-white font-whimsical uppercase tracking-tight">{t.ai_diagnostic_title}</h3>
                <p className="text-indigo-400/50 font-black text-[10px] uppercase tracking-[0.4em]">Gemini AI Intelligence</p>
             </div>
          </div>
          
          {!image ? (
            <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-slate-800/50 rounded-[48px] p-20 text-center hover:border-indigo-500 hover:bg-indigo-500/5 transition-all cursor-pointer">
              <div className="text-8xl block mb-6">📸</div>
              <p className="text-slate-400 font-bold text-xl">{t.ai_upload_prompt}</p>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative rounded-[48px] overflow-hidden border-4 border-slate-800 group shadow-2xl">
                <img src={image} alt="Lab Result" className="w-full h-auto grayscale opacity-80" />
                <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <button onClick={() => {setImage(null); setReport(null);}} className="bg-white text-slate-900 px-8 py-3 rounded-2xl font-black uppercase text-xs">O'chirish</button>
                </div>
              </div>
              {!report && (
                <button onClick={analyzeImage} disabled={isAnalyzing} className="w-full py-6 bg-indigo-600 text-white rounded-[28px] font-black text-xl hover:bg-indigo-500 transition-all shadow-xl disabled:opacity-50">
                  {isAnalyzing ? t.ai_analyzing : t.ai_generate_report}
                </button>
              )}
            </div>
          )}
        </div>

        {report && (
          <div className="w-full lg:w-[500px] space-y-6 animate-in slide-in-from-right-8 duration-700">
            {report.error ? (
               <div className="p-10 bg-rose-500/10 border-2 border-rose-500/20 rounded-[48px] text-rose-200 font-bold text-center flex flex-col items-center gap-4">
                  <span className="text-5xl">⚠️</span>
                  {report.error}
                  <button onClick={() => analyzeImage()} className="text-[10px] uppercase tracking-widest text-white bg-rose-500 px-4 py-2 rounded-full mt-2">Qayta urinish</button>
               </div>
            ) : (
              <>
                <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-4">
                    <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">{t.ai_observation_label}</h5>
                    <p className="text-slate-300 font-bold text-md leading-relaxed">"{report.observation}"</p>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-[40px] p-8 space-y-3">
                    <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-widest">✨ {t.ai_logic_label}</h5>
                    <p className="text-amber-100/90 font-bold text-sm">{report.scientific_secret}</p>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[40px] p-8 space-y-3">
                    <h5 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">💡 {t.ai_hint_label}</h5>
                    <p className="text-emerald-50 font-black text-sm">{report.hint}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden">
                   <div className="relative z-10">
                      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 opacity-70">{t.ai_mission_label}</h4>
                      <p className="text-md font-black leading-relaxed">{report.mission}</p>
                   </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIDiagnosticCenter;
