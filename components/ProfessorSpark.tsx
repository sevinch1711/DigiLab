
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Subject, Language } from '../types';
import { translations } from '../translations';

interface ProfessorSparkProps {
  subject: Subject;
  lang: Language;
}

const ProfessorSpark: React.FC<ProfessorSparkProps> = ({ subject, lang }) => {
  const t = translations[lang];
  const [message, setMessage] = useState<string>('');
  const [isThinking, setIsThinking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getSparkMessage = async () => {
    if (subject === Subject.HOME) {
      setMessage(t.placeholder_spark);
      return;
    }

    setIsThinking(true);
    try {
      // Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per guidelines
      const ai = new GoogleGenAI(import.meta.env.VITE_GEMINI_API_KEY);
      const prompt = `You are Professor Spark, a whimsical and friendly science wizard helping children in Uzbekistan. 
      The language you must use is: ${lang === 'uz' ? 'Uzbek (lotin script)' : lang === 'en' ? 'English' : 'Russian'}.
      Current Lab: ${subject}. 
      Task: Give a very simple, encouraging 1-sentence fun fact or tip about ${subject}. 
      Make it sound magical and friendly. Use emojis.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      // Fix: Use the .text property directly
      setMessage(response.text || "Ilm juda qiziq! ✨");
    } catch (err) {
      setMessage(lang === 'uz' ? "Doimo izlanishda bo'l! Har bir xato kashfiyotga yo'l! 🌟" : "Keep exploring! Every mistake is a step forward!");
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getSparkMessage();
    }
  }, [subject, isOpen, lang]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-72 bg-white rounded-[32px] shadow-2xl p-6 border-4 border-sky-400 relative animate-in slide-in-from-bottom-8 duration-500">
          <div className="absolute -bottom-3 right-8 w-6 h-6 bg-white border-r-4 border-b-4 border-sky-400 rotate-45"></div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🧙‍♂️</span>
            <span className="font-black text-sky-900 font-whimsical uppercase text-xs tracking-widest">Prof. Spark</span>
          </div>
          <div className="text-sky-800 text-sm font-bold leading-relaxed">
            {isThinking ? (
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce delay-200"></div>
              </div>
            ) : message}
          </div>
          <button 
            onClick={() => getSparkMessage()}
            className="mt-4 text-[10px] font-black text-sky-500 hover:text-sky-700 underline uppercase tracking-widest"
          >
            {lang === 'uz' ? 'Yana maslahat?' : 'Another tip?'}
          </button>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center text-4xl shadow-2xl hover:scale-110 active:scale-95 transition-all border-4 border-white animate-float relative"
      >
        🧙‍♂️
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white">!</div>
      </button>
    </div>
  );
};

export default ProfessorSpark;
