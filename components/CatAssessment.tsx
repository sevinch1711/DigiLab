
import React, { useState, useEffect } from 'react';
import { Badge, Question, QuestionPool } from '../types';

interface CatAssessmentProps {
  isOpen: boolean;
  onClose: () => void;
  questionPool: QuestionPool;
  onSuccess: () => void;
  rewardBadge: Badge;
  rewardXP: number;
  subjectName: string;
}

const CatAssessment: React.FC<CatAssessmentProps> = ({ isOpen, onClose, questionPool, onSuccess, rewardBadge, rewardXP, subjectName }) => {
  const [currentLevel, setCurrentLevel] = useState(3);
  const [attemptCount, setAttemptCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [mistakes, setMistakes] = useState<number[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [error, setError] = useState<number | null>(null);
  const [successPulse, setSuccessPulse] = useState(false);
  const TOTAL_ATTEMPTS = 5;

  useEffect(() => {
    if (isOpen && !isFinished) {
      selectNextQuestion(currentLevel);
    }
  }, [isOpen]);

  const selectNextQuestion = (level: number) => {
    const levelPool = questionPool[level];
    if (levelPool && levelPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * levelPool.length);
      setCurrentQuestion(levelPool[randomIndex]);
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (!currentQuestion) return;

    if (optionIndex === currentQuestion.correct) {
      setError(null);
      setSuccessPulse(true);
      
      setTimeout(() => {
        setSuccessPulse(false);
        const nextLevel = Math.min(5, currentLevel + 1);
        const nextAttempt = attemptCount + 1;
        
        if (nextAttempt >= TOTAL_ATTEMPTS) {
          setIsFinished(true);
        } else {
          setCurrentLevel(nextLevel);
          setAttemptCount(nextAttempt);
          selectNextQuestion(nextLevel);
        }
      }, 600);
    } else {
      setError(optionIndex);
      if (!mistakes.includes(currentLevel)) {
        setMistakes([...mistakes, currentLevel]);
      }
      
      setTimeout(() => {
        setError(null);
        const nextLevel = Math.max(1, currentLevel - 1);
        const nextAttempt = attemptCount + 1;
        
        if (nextAttempt >= TOTAL_ATTEMPTS) {
          setIsFinished(true);
        } else {
          setCurrentLevel(nextLevel);
          setAttemptCount(nextAttempt);
          selectNextQuestion(nextLevel);
        }
      }, 800);
    }
  };

  const getWeaknessAnalysis = () => {
    if (mistakes.length === 0 && currentLevel === 5) {
      return "Sizda ushbu mavzu bo'yicha mukammal bilim bor! Barcha qiyinchilik darajalaridan muvaffaqiyatli o'tdingiz. 🚀";
    }
    
    const messages = [];
    const lowerName = subjectName.toLowerCase();

    if (lowerName.includes('algoritmlar') || lowerName.includes('sorting')) {
      messages.push("Sizda algoritmik fikrlash, saralash usullari va dasturiy samaradorlik tahlilida kamchilik bor.");
    } else if (lowerName.includes('binar')) {
      messages.push("Sizda binar sanoq tizimi va bitlar bilan ishlash mantiqida kamchilik bor.");
    } else if (lowerName.includes('darvozalar') || lowerName.includes('logic')) {
      messages.push("Sizda raqamli mantiq va bulyan algebrasi (Boolean logic) tushunchalarida bo'shliq bor.");
    } else if (lowerName.includes('qidiruv') || lowerName.includes('search')) {
      messages.push("Sizda algoritmlarning samaradorligi (Big O notation) va massivlar bilan ishlashda kamchilik bor.");
    } else if (lowerName.includes('ranglar') || lowerName.includes('color')) {
      messages.push("Sizda ranglarning raqamli kodlanishi (RGB/Hex) va 16-lik sanoq tizimida bo'shliq bor.");
    } else if (lowerName.includes('sql')) {
      messages.push("Sizda relyatsion ma'lumotlar bazalari va ma'lumotlarni filtrlaash mantiqida bo'shliq bor.");
    } else if (lowerName.includes('sezar') || lowerName.includes('caesar')) {
      messages.push("Sizda kiberxavfsizlik asoslari va ma'lumotlarni shifrlash mantiqida kamchilik bor.");
    } else if (lowerName.includes('hash')) {
      messages.push("Sizda heshlashning bir tomonlama mantiqi va ma'lumotlar butunligi tahlilida kamchilik bor.");
    } else if (lowerName.includes('diffuziya')) {
      messages.push("Sizda molekulalarning kinetik harakati va diffuziya qonuniyatlarida kamchilik bor.");
    } else {
      messages.push("Fundamental ilmiy mantiq: Asosiy tushunchalarni simulyatsiyada qayta ko'zdan kechiring.");
    }
    
    return messages.join(" ");
  };

  const handleFinalize = () => {
    onSuccess();
    onClose();
    setCurrentLevel(3);
    setAttemptCount(0);
    setMistakes([]);
    setIsFinished(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-2xl rounded-[48px] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] border border-white/50 overflow-hidden flex flex-col transform transition-all duration-500">
        <div className="p-10 pb-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full shadow-[0_0_10px_#007AFF] ${successPulse ? 'bg-green-500 animate-ping' : 'bg-[#007AFF] animate-pulse'}`}></span>
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#007AFF]">CAT ENGINE: {subjectName}</span>
            </div>
            <div className="flex gap-2">
               {[...Array(TOTAL_ATTEMPTS)].map((_, i) => (
                 <div key={i} className={`w-6 h-1 rounded-full ${i < attemptCount ? 'bg-[#007AFF]' : 'bg-slate-200'}`}></div>
               ))}
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mastery Level</span>
            <span className="text-[10px] font-black text-[#007AFF] uppercase tracking-widest">{currentLevel}/5</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div 
              className={`h-full transition-all duration-700 ease-out ${successPulse ? 'bg-green-400' : 'bg-[#007AFF]'}`} 
              style={{ width: `${(currentLevel / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-10 pt-4 flex-1 min-h-[450px]">
          {!isFinished && currentQuestion ? (
            <div className={`transition-all duration-500 ${successPulse ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="mb-4 inline-block px-3 py-1 bg-blue-50 text-[#007AFF] rounded-full text-[10px] font-black uppercase tracking-widest">Difficulty: Level {currentLevel}</div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 leading-tight">
                {currentQuestion.text}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={successPulse || error !== null}
                    onClick={() => handleAnswer(idx)}
                    className={`w-full p-6 rounded-[28px] text-left font-bold transition-all duration-200 border-2 flex items-center justify-between group
                      ${error === idx 
                        ? 'bg-rose-50 border-rose-200 text-rose-600 animate-shake' 
                        : 'bg-white/60 border-white hover:border-[#007AFF] hover:bg-white text-slate-700 hover:shadow-xl'
                      }`}
                  >
                    <span className="text-lg">{option}</span>
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors
                      ${error === idx ? 'border-rose-400 bg-rose-100' : 'border-slate-100 group-hover:border-[#007AFF] group-hover:bg-[#007AFF]/5'}`}>
                      {error === idx ? '✕' : idx + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 animate-in zoom-in duration-700">
              <div className="relative inline-block mb-10">
                <div className="w-44 h-44 bg-gradient-to-br from-[#007AFF] to-blue-600 rounded-full flex items-center justify-center text-8xl shadow-2xl animate-bounce-slow border-8 border-white">
                  {rewardBadge.icon}
                </div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-white px-6 py-2 rounded-full border-4 border-white flex items-center justify-center font-black text-lg shadow-lg">
                  +{rewardXP} XP
                </div>
              </div>
              
              <h2 className="text-4xl font-black text-slate-900 mb-4">Mastery Achieved! 🏆</h2>
              <p className="text-slate-500 font-bold mb-10 text-lg">Yakuniy daraja: <span className="text-[#007AFF] font-black">{currentLevel}/5</span></p>
              
              <div className="bg-slate-50 rounded-[40px] p-8 border border-slate-100 mb-10 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">🎓</div>
                <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-widest mb-4 flex items-center gap-2">
                  Weakness Analysis <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                </h4>
                <p className="text-slate-700 font-bold leading-relaxed">
                  {getWeaknessAnalysis()}
                </p>
              </div>

              <button
                onClick={handleFinalize}
                className="w-full py-6 bg-[#007AFF] text-white rounded-[28px] font-black text-xl shadow-2xl shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all hover:bg-blue-600"
              >
                Kashfiyotni yakunlash
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatAssessment;
