import React, { useState, useEffect } from 'react';
// 1. To'g'ri kutubxona nomi
import { GoogleGenerativeAI } from '@google/generative-ai';
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
      // 2. To'g'ri API inicializatsiyasi
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      
      // 3. To'g'ri model nomi
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      const prompt = `You are Professor Spark, a whimsical and friendly science wizard helping children in Uzbekistan. 
      The language you must use is: ${lang === 'uz' ? 'Uzbek (lotin script)' : lang === 'en' ? 'English' : 'Russian'}.
      Current Lab: ${subject}. 
      Task: Give a very simple, encouraging 1-sentence fun fact or tip about ${subject}. 
      Make it sound magical and friendly. Use emojis.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessage(text || "Ilm juda qiziq! ✨");
    } catch (err) {
      console.error("Xato yuz berdi:", err);
      setMessage(lang === 'uz' ? "Sehrli kuchlar biroz charchadi... 🧙‍♂️" : "Magic is recharging...");
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
    // ... UI qismi o'zgarishsiz qoladi
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
        {/* Sizning UI kodingiz */}
    </div>
  );
};

export default ProfessorSpark;
