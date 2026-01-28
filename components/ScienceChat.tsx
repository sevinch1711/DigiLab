
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Subject, Language } from '../types';
import { translations } from '../translations';

interface ScienceChatProps {
  subject: Subject;
  lang: Language;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ScienceChat: React.FC<ScienceChatProps> = ({ subject, lang }) => {
  const t = translations[lang] as any;
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(`chat_history_${subject}_${lang}`);
    return saved ? JSON.parse(saved) : [{ role: 'model' as const, text: t.placeholder_spark }];
  });
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(`chat_history_${subject}_${lang}`, JSON.stringify(messages));
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, subject, lang]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;
    const userMsg = input.trim();
    
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMessages);

    setIsThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // High RPM model for smooth chat experience
      const promptText = `Roleplay as Professor Spark for ${subject} in ${lang}. Be encouraging, brief (max 2 sentences). User says: ${userMsg}`;

      const response = await ai.models.generateContent({
        model: 'gemini-flash-lite-latest',
        contents: promptText,
      });

      const botResponse = response.text || "...";
      setMessages(prev => [...prev, { role: 'model' as const, text: botResponse }]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      let errorText = t.ai_error_general;
      if (err.message?.includes('429')) errorText = t.ai_error_rate_limit;
      setMessages(prev => [...prev, { role: 'model' as const, text: errorText }]);
    } finally {
      setIsThinking(false);
    }
  };

  const clearChat = () => {
    const reset: Message[] = [{ role: 'model' as const, text: t.placeholder_spark }];
    setMessages(reset);
    localStorage.removeItem(`chat_history_${subject}_${lang}`);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-[40px] shadow-2xl border-4 border-sky-400 overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500 max-h-[550px]">
          <div className="bg-sky-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍🏫</span>
              <span className="font-black text-[10px] uppercase tracking-[0.2em]">{t.chat_title}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={clearChat} title="Clear" className="bg-white/10 w-8 h-8 rounded-full flex items-center justify-center text-xs">🗑️</button>
              <button onClick={() => setIsOpen(false)} className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">✕</button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-sky-50/20 min-h-[350px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-bold shadow-md border-2 ${m.role === 'user' ? 'bg-sky-600 text-white border-sky-700 rounded-tr-none' : 'bg-white text-slate-900 border-sky-100 rounded-tl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl border-2 border-sky-100 flex gap-1 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t-2 border-sky-100 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSend()} placeholder={t.chat_placeholder} className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:border-sky-500" />
            <button onClick={handleSend} disabled={isThinking || !input.trim()} className="w-12 h-12 rounded-2xl flex items-center justify-center bg-sky-600 text-white shadow-lg disabled:opacity-50">🚀</button>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className="w-20 h-20 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white animate-float relative group">
        👨‍🏫
        {!isOpen && <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white group-hover:scale-125 transition-transform animate-pulse">!</div>}
      </button>
    </div>
  );
};

export default ScienceChat;
