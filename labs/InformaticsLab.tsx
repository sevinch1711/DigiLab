
import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Language, Subject, QuestionPool } from '../types';
import { translations } from '../translations';
import CatAssessment from '../components/CatAssessment';
import AIDiagnosticCenter from '../components/AIDiagnosticCenter';

// --- Shared Helper: Logic Terminal Component ---
const LogicTerminal: React.FC<{ logs: string[] }> = ({ logs }) => (
  <div className="w-full mt-6 bg-slate-900 rounded-3xl p-5 font-mono text-[11px] text-emerald-400 shadow-2xl border border-slate-800 max-h-48 overflow-y-auto scrollbar-none">
    <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2 sticky top-0 bg-slate-900 z-10">
      <div className="flex gap-1.5">
        <span className="w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full"></span>
        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
      </div>
      <span className="ml-2 text-slate-500 uppercase tracking-[0.2em] font-black">System Logic Terminal</span>
    </div>
    {logs.length === 0 ? (
      <div className="text-slate-600 italic">Waiting for command...</div>
    ) : (
      logs.map((log, i) => (
        <div key={i} className="mb-1 animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
          <span className="text-indigo-400 font-black">LOG:</span> {log}
        </div>
      ))
    )}
  </div>
);

// --- 1. Advanced Sorting Hub ---
const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState([45, 15, 35, 25, 50, 10, 30, 20]);
  const [logs, setLogs] = useState<string[]>(['Sorting Lab initialized. Select strategy.']);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(600); 

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const bubbleSort = async () => {
    setSorting(true);
    let arr = [...array];
    setLogs(p => [...p, 'Bubble Sort (O(n²)) started...']);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
        await sleep(speed);
      }
    }
    setComparing([]); setSorting(false);
    setLogs(p => [...p, 'Bubble Sort complete!']);
  };

  const selectionSort = async () => {
    setSorting(true);
    let arr = [...array];
    setLogs(p => [...p, 'Selection Sort (O(n²)) started...']);
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        setComparing([i, j]);
        if (arr[j] < arr[minIdx]) minIdx = j;
        await sleep(speed);
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
      }
    }
    setComparing([]); setSorting(false);
    setLogs(p => [...p, 'Selection Sort complete!']);
  };

  const resetArr = () => {
    setArray(Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10));
    setLogs(['Array randomized. Ready for next algorithm.']);
  };

  return (
    <div className="bg-white p-10 rounded-[48px] border-4 border-indigo-50 shadow-xl flex flex-col items-center">
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <button disabled={sorting} onClick={bubbleSort} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 disabled:opacity-50">Bubble Sort</button>
        <button disabled={sorting} onClick={selectionSort} className="px-6 py-3 bg-sky-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-sky-600 disabled:opacity-50">Selection Sort</button>
        <button disabled={sorting} onClick={resetArr} className="px-6 py-3 bg-slate-100 text-slate-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200">Randomize</button>
      </div>
      <div className="flex items-end gap-3 h-52 mb-10 w-full justify-center px-4">
        {array.map((v, i) => (
          <div key={i} className={`rounded-t-2xl transition-all duration-300 flex items-center justify-center text-[10px] font-black text-white ${comparing.includes(i) ? 'bg-rose-500 scale-110 shadow-lg' : 'bg-gradient-to-t from-indigo-500 to-sky-400'}`} style={{ height: `${v * 2.5}px`, width: '45px' }}>{v}</div>
        ))}
      </div>
      <LogicTerminal logs={logs} />
    </div>
  );
};

// --- InformaticsLab Main ---
const InformaticsLab: React.FC<any> = ({ experimentId, onSelectExp, onComplete, onEarnBadge, onDiagnosticComplete, lang }) => {
  const t = translations[lang];
  const [showAssessment, setShowAssessment] = useState(false);

  const experiments = [
    { id: 'sort_hub', title: 'Advanced Sorting', icon: '📊' },
    { id: 'sql_engine', title: 'SQL Database Engine', icon: '📜' },
    { id: 'crypto_caesar', title: 'Caesar Cryptography', icon: '🛡️' },
    { id: 'binary_logic', title: 'Binary Bit Explorer', icon: '🔢' },
    { id: 'logic_gates', title: 'Logic Gate Designer', icon: '🔌' },
    { id: 'search_algos', title: 'Search Algorithms', icon: '🔍' },
    { id: 'color_math', title: 'Color Hex Math', icon: '🎨' },
    { id: 'bitwise_hash', title: 'Bitwise Hashing', icon: '⚙️' }
  ];

  const questionPool: QuestionPool = {
    1: [
      { id: 'q1-1', level: 1, text: 'Kompyuterlar qaysi sanoq tizimida ishlaydi?', options: ['Decimal', 'Binary', 'Octal', 'Hex'], correct: 1 },
      { id: 'q1-2', level: 1, text: 'SQL nima uchun ishlatiladi?', options: ['Graphics', 'Databases', 'Audio', 'Games'], correct: 1 },
      { id: 'q1-3', level: 1, text: 'CPU nima?', options: ['Memory', 'Processor', 'Storage', 'Screen'], correct: 1 },
      { id: 'q1-4', level: 1, text: '1 byte necha bit?', options: ['4', '8', '16', '32'], correct: 1 },
      { id: 'q1-5', level: 1, text: 'Internet tarmog\'i protokoli?', options: ['IP', 'RAM', 'SSD', 'GPU'], correct: 0 },
      { id: 'q1-6', level: 1, text: 'HTML-da ranglar kodi?', options: ['HEX', 'BIN', 'OCT', 'DEC'], correct: 0 }
    ],
    2: [
      { id: 'q2-1', level: 2, text: 'AND darvozasi qachon 1 qaytaradi?', options: ['A=1', 'A=1 va B=1', 'A=0', 'B=1'], correct: 1 },
      { id: 'q2-2', level: 2, text: 'Binary 00001010 o\'nlikda?', options: ['8', '10', '12', '16'], correct: 1 },
      { id: 'q2-3', level: 2, text: 'RAM qanday xotira?', options: ['Doimiy', 'Vaqtinchalik', 'Faqat o\'qish', 'Magnit'], correct: 1 },
      { id: 'q2-4', level: 2, text: 'Eng sodda saralash algoritmi?', options: ['Quick', 'Bubble', 'Merge', 'Heap'], correct: 1 },
      { id: 'q2-5', level: 2, text: 'Browser nima?', options: ['Dastur', 'Hardware', 'Virus', 'OS'], correct: 0 },
      { id: 'q2-6', level: 2, text: 'SQL-da ma\'lumot olish?', options: ['GET', 'SELECT', 'FETCH', 'EXTRACT'], correct: 1 }
    ],
    3: [
      { id: 'q3-1', level: 3, text: 'Merge Sort metodikasi?', options: ['Greedy', 'Divide & Conquer', 'Brute Force', 'Random'], correct: 1 },
      { id: 'q3-2', level: 3, text: 'XOR natijasi 1 bo\'lishi uchun?', options: ['Ikkala 1', 'Ikkala 0', 'Har xil bo\'lishi kerak', 'Har doim 1'], correct: 2 },
      { id: 'q3-3', level: 3, text: 'Binary Search ishlashi uchun massiv qanday bo\'lishi kerak?', options: ['Katta', 'Bo\'sh', 'Saralangan', 'Tartibsiz'], correct: 2 },
      { id: 'q3-4', level: 3, text: 'Big O nimani o\'lchaydi?', options: ['Hajm', 'Murakkablik', 'Tezlik', 'Rang'], correct: 1 },
      { id: 'q3-5', level: 3, text: 'HTTP 404 xatosi nimani anglatadi?', options: ['Topilmadi', 'Taqiqlandi', 'Xato', 'Muvaffaqiyat'], correct: 0 },
      { id: 'q3-6', level: 3, text: 'Hashing nima uchun?', options: ['Video', 'Xavfsizlik/Identifikatsiya', 'Audio', 'Rasm'], correct: 1 }
    ],
    4: [
      { id: 'q4-1', level: 4, text: 'Bubble Sort-ning worst-case murakkabligi?', options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(n log n)'], correct: 1 },
      { id: 'q4-2', level: 4, text: 'Asimmetrik shifrlashda kalitlar soni?', options: ['1 ta', '2 ta', '3 ta', '4 ta'], correct: 1 },
      { id: 'q4-3', level: 4, text: 'DNS qanday ishlaydi?', options: ['IP to Name', 'Name to IP', 'File Transfer', 'Chat'], correct: 1 },
      { id: 'q4-4', level: 4, text: 'Cookies qayerda saqlanadi?', options: ['Server', 'Client/Browser', 'Cloud', 'Router'], correct: 1 },
      { id: 'q4-5', level: 4, text: 'Compiler va Interpreter farqi?', options: ['Tezlik', 'Ishlash usuli', 'Narxi', 'Hech qanday'], correct: 1 },
      { id: 'q4-6', level: 4, text: 'SQL-da natijalarni guruhlash?', options: ['SORT', 'GROUP BY', 'ORDER BY', 'LIMIT'], correct: 1 }
    ],
    5: [
      { id: 'q5-1', level: 5, text: 'Quick Sort eng yomon holatda?', options: ['O(n log n)', 'O(n^2)', 'O(2^n)', 'O(n)'], correct: 1 },
      { id: 'q5-2', level: 5, text: 'Hesh funksiyaning xususiyati?', options: ['Qaytuvchan', 'Bir tomonlama', 'Faqat 1-bit', 'Tasodifiy'], correct: 1 },
      { id: 'q5-3', level: 5, text: 'Blockchain asosi?', options: ['SQL', 'Decentralized Ledger', 'Video Edit', 'Game Engine'], correct: 1 },
      { id: 'q5-4', level: 5, text: 'Turing Testi maqsadi?', options: ['Tezlik', 'Intelektni aniqlash', 'Memory check', 'Display check'], correct: 1 },
      { id: 'q5-5', level: 5, text: 'TCP vs UDP?', options: ['Narxi', 'Ishonchlilik va tezlik', 'Rang', 'Brend'], correct: 1 },
      { id: 'q5-6', level: 5, text: 'Recursion nima?', options: ['Dasturning o\'zini o\'zi chaqirishi', 'Dasturni to\'xtatish', 'Xato', 'Video editor'], correct: 0 },
      { id: 'q5-7', level: 5, text: 'NP-complete muammosi nima?', options: ['Oson yechim', 'Murakkab/Yechimi yo\'q tushunchasi', 'Rangli', 'Katta fayl'], correct: 1 },
      { id: 'q5-8', level: 5, text: 'Virtual Memory nima uchun?', options: ['Tezlik', 'Xotira kengaytirish', 'Ovoz', 'Rasm'], correct: 1 }
    ]
  };

  if (!experimentId) {
    return (
      <div className="space-y-12 animate-in fade-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[60px] border border-white shadow-sm flex items-center gap-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-[32px] flex items-center justify-center text-5xl shadow-2xl animate-float">💻</div>
          <div><h2 className="text-4xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.informatics}</h2><p className="text-slate-400 font-bold text-lg">Digital Intelligence Center (8 Labs + 32 Tests)</p></div>
        </div>
        <AIDiagnosticCenter subject={Subject.INFORMATICS} lang={lang} onDiagnosticComplete={onDiagnosticComplete} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {experiments.map(exp => (
            <button key={exp.id} onClick={() => onSelectExp(exp.id)} className="group bg-white p-10 rounded-[48px] shadow-xl hover:shadow-2xl hover:scale-[1.05] transition-all border-4 border-indigo-50 flex flex-col items-center">
              <div className="text-[60px] mb-4 group-hover:rotate-12 transition-transform">{exp.icon}</div>
              <h3 className="text-[11px] font-black text-indigo-900 uppercase tracking-widest text-center leading-tight">{exp.title}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      <CatAssessment 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
        questionPool={questionPool}
        rewardBadge={{ id: 'info_master', name: 'Digital Wizard', description: 'Expert', icon: '💻', subject: Subject.INFORMATICS }} 
        rewardXP={600} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Informatics"}
        onSuccess={(l) => { onEarnBadge({ id: 'info_master', name: 'Digital Wizard', description: 'Expert', icon: '💻', subject: Subject.INFORMATICS }); onComplete(l); }} 
      />
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-6 rounded-[40px] border border-white shadow-sm sticky top-4 z-50">
        <button onClick={() => onSelectExp(null)} className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">← Back</button>
        <h2 className="text-2xl font-black text-indigo-900 uppercase tracking-tight font-whimsical">{experiments.find(e => e.id === experimentId)?.title}</h2>
        <button onClick={() => setShowAssessment(true)} className="px-10 py-4 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Level Test 🚀</button>
      </div>
      <div className="animate-in zoom-in duration-500">
        {experimentId === 'sort_hub' && <SortingVisualizer />}
        {/* Modules for SQL, Caesar, Binary are placeholders in this version but connected to CAT */}
        {experimentId !== 'sort_hub' && (
           <div className="bg-white p-16 rounded-[48px] border-4 border-indigo-50 shadow-xl text-center">
              <div className="text-8xl mb-6">⚙️</div>
              <h4 className="text-2xl font-black text-slate-900 mb-4">Module Initializing...</h4>
              <p className="text-slate-500 font-bold italic">Professor Spark is refining the logic for this interactive experience. Use the "Level Test" to earn badges and XP in the meantime!</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default InformaticsLab;
