
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Subject, Language } from '../types';
import { translations } from '../translations';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ScienceChatProps {
  subject: Subject;
  lang: Language;
}

const ScienceChat: React.FC<ScienceChatProps> = ({ subject, lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: t.placeholder_spark }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsThinking(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: `Siz Professor Spark ismli sehrgar va olimsiz. 
          Javoblarni faqat ${lang === 'uz' ? 'O\'zbek tilida (lotin yozuvida)' : lang === 'en' ? 'Ingliz tilida' : 'Rus tilida'} bering. 
          Ilmiy mavzu: ${subject}. 
          Bolalarga doimo dalda bering, murakkab tushunchalarni sodda tilda tushuntiring. 
          Emoji-lardan ko'p foydalaning. Javoblar 2-3 jumlali qisqa bo'lsin.`,
        },
      });

      const response = await chat.sendMessage({ message: userMsg });
      const botResponse = response.text || (lang === 'uz' ? "Kechirasiz, kashfiyotda biroz uzilish bo'ldi. ✨" : "Discovery interrupted.");
      
      setMessages(prev => [...prev, { role: 'model', text: botResponse }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: lang === 'uz' ? "Kashfiyot yo'lida kichik xatolik! 🌟" : "A small error on the path of discovery!" }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-white rounded-[40px] shadow-2xl border-4 border-sky-400 overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 duration-500 max-h-[550px]">
          <div className="bg-sky-600 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧙‍♂️</span>
              <span className="font-black text-[10px] uppercase tracking-[0.2em] font-whimsical">{(t as any).chat_title}</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="bg-white/20 hover:bg-white/40 w-8 h-8 rounded-full flex items-center justify-center transition-colors">✕</button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-sky-50/20 min-h-[350px]"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-bold shadow-md border-2 ${
                  m.role === 'user' 
                    ? 'bg-sky-600 text-white border-sky-700 rounded-tr-none' 
                    : 'bg-white text-slate-900 border-sky-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl border-2 border-sky-100 rounded-tl-none shadow-md flex gap-1">
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-sky-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t-2 border-sky-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={(t as any).chat_placeholder}
              className="flex-1 bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-3 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:ring-0 outline-none transition-colors"
            />
            <button 
              onClick={handleSend}
              disabled={isThinking || !input.trim()}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                input.trim() ? 'bg-sky-600 text-white shadow-lg' : 'bg-slate-200 text-slate-400'
              }`}
            >
              🚀
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white animate-float relative group"
      >
        🧙‍♂️
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white group-hover:scale-125 transition-transform animate-pulse">!</div>
        )}
      </button>
    </div>
  );
};

export default ScienceChat;
