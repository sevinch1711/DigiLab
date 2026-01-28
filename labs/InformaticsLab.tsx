
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

// --- 2. Database SQL Engine ---
const SQLEngine: React.FC = () => {
  const [query, setQuery] = useState('SELECT name FROM users WHERE xp > 500');
  const [logs, setLogs] = useState<string[]>(['SQL Parser ready. Try SELECT, WHERE or ORDER BY.']);
  const data = [
    { id: 1, name: 'Alice', xp: 850, badge: '🥇' },
    { id: 2, name: 'Bob', xp: 420, badge: '🥉' },
    { id: 3, name: 'Charlie', xp: 620, badge: '🥈' },
    { id: 4, name: 'Diana', xp: 999, badge: '💎' }
  ];

  const processed = useMemo(() => {
    let result = [...data];
    const q = query.toLowerCase();
    if (q.includes('where xp >')) {
      const threshold = parseInt(q.split('where xp >')[1]);
      if (!isNaN(threshold)) result = result.filter(d => d.xp > threshold);
    }
    if (q.includes('order by xp desc')) result.sort((a, b) => b.xp - a.xp);
    return result;
  }, [query]);

  return (
    <div className="bg-white p-10 rounded-[48px] border-4 border-indigo-50 shadow-xl">
      <div className="bg-slate-900 p-6 rounded-[32px] mb-8 font-mono">
        <textarea 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          className="bg-transparent border-none outline-none text-indigo-300 w-full h-24 resize-none text-sm"
          placeholder="Enter SQL Query..."
        />
      </div>
      <div className="overflow-hidden rounded-[32px] border-2 border-slate-100">
        <table className="w-full text-left text-xs">
          <thead className="bg-indigo-600 text-white font-black uppercase">
            <tr><th className="p-4">Name</th><th className="p-4">XP</th><th className="p-4">Badge</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {processed.map(d => (
              <tr key={d.id} className="hover:bg-indigo-50 font-bold">
                <td className="p-4">{d.name}</td>
                <td className="p-4 text-indigo-600">{d.xp}</td>
                <td className="p-4 text-xl">{d.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LogicTerminal logs={[`Executing: ${query}`, `Result rows: ${processed.length}`]} />
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
    { id: 'binary_logic', title: 'Binary Bit Explorer', icon: '🔢' }
  ];

  const questionPool: QuestionPool = {
    1: [
      { id: 'q1-1', level: 1, text: 'Kompyuterlar qaysi mantiqiy tizimda ishlaydi?', options: ['O\'nlik', 'Ikkilik (Binary)', 'Sakkizlik', 'O\'n oltilik'], correct: 1 },
      { id: 'q1-2', level: 1, text: 'SQL nima uchun ishlatiladi?', options: ['Rasm chizish', 'Ma\'lumotlar bazasi bilan ishlash', 'Video tahrirlash', 'O\'yin o\'ynash'], correct: 1 },
      { id: 'q1-3', level: 1, text: 'Eng tezkor qidiruv algoritmi qaysi?', options: ['Linear Search', 'Binary Search', 'Random Search', 'Hech qaysi'], correct: 1 },
      { id: 'q1-4', level: 1, text: '1 byte necha bitdan iborat?', options: ['4', '8', '16', '32'], correct: 1 },
      { id: 'q1-5', level: 1, text: 'HTTP nima?', options: ['Protocol', 'Hardware', 'Software', 'Virus'], correct: 0 }
    ],
    2: [
      { id: 'q2-1', level: 2, text: 'AND darvozasi qachon 1 natija beradi?', options: ['Faqat biri 1 bo\'lsa', 'Ikkalasi ham 1 bo\'lsa', 'Ikkalasi 0 bo\'lsa', 'Hech qachon'], correct: 1 },
      { id: 'q2-2', level: 2, text: 'Binar 00001111 o\'nlikda necha?', options: ['7', '15', '31', '63'], correct: 1 },
      { id: 'q2-3', level: 2, text: 'HTML-da ranglar qaysi sanoq tizimida yoziladi?', options: ['Decimal', 'Hexadecimal', 'Binary', 'Octal'], correct: 1 },
      { id: 'q2-4', level: 2, text: 'CPU nima?', options: ['Xotira', 'Markaziy protsessor', 'Ekran', 'Klaviatura'], correct: 1 },
      { id: 'q2-5', level: 2, text: 'IP address nima?', options: ['Uy manzili', 'Tarmoq manzili', 'Ism', 'Parol'], correct: 1 }
    ],
    3: [
      { id: 'q3-1', level: 3, text: 'Merge Sort qaysi metodga asoslangan?', options: ['Greedy', 'Divide and Conquer', 'Dynamic Programming', 'Brute Force'], correct: 1 },
      { id: 'q3-2', level: 3, text: 'SQL-da natijalarni saralash uchun nima ishlatiladi?', options: ['GROUP BY', 'SORT BY', 'ORDER BY', 'ARRANGE'], correct: 2 },
      { id: 'q3-3', level: 3, text: 'XOR darvozasi natijasi qachon 1 bo\'ladi?', options: ['Bir xil bo\'lsa', 'Har xil bo\'lsa', 'Ikkala 1 bo\'lsa', 'Ikkala 0 bo\'lsa'], correct: 1 },
      { id: 'q3-4', level: 3, text: 'WWW qisqartmasi nima?', options: ['World Wide Web', 'World Wide Work', 'Web World Wide', 'Bilmayman'], correct: 0 },
      { id: 'q3-5', level: 3, text: 'RAID nima?', options: ['Virus turi', 'Xotira massivi', 'Dastur', 'Ekran turi'], correct: 1 }
    ],
    4: [
      { id: 'q4-1', level: 4, text: 'Quick Sort eng yomon holatda (worst case) qanday murakkablikka ega?', options: ['O(n log n)', 'O(n^2)', 'O(n)', 'O(1)'], correct: 1 },
      { id: 'q4-2', level: 4, text: 'Asimmetrik shifrlashda necha xil kalit ishlatiladi?', options: ['1 ta', '2 ta (Public/Private)', '3 ta', 'Cheksiz'], correct: 1 },
      { id: 'q4-3', level: 4, text: 'B-Tree indeksi nima uchun kerak?', options: ['Video saqlash', 'Qidiruvni tezlashtirish', 'Ovoz yozish', 'Internetga ulanish'], correct: 1 },
      { id: 'q4-4', level: 4, text: 'DNS vazifasi nima?', options: ['Xavfsizlik', 'Domen nomini IP-ga o\'girish', 'Fayl yuklash', 'Email yuborish'], correct: 1 },
      { id: 'q4-5', level: 4, text: 'Cookies nima?', options: ['Pechenye', 'Brauzer ma\'lumotlari', 'Virus', 'Kabel'], correct: 1 }
    ],
    5: [
      { id: 'q5-1', level: 5, text: 'P vs NP muammosi qaysi soha muammosi?', options: ['Kimyo', 'Kompyuter fanlari (Complexity)', 'Biologiya', 'Fizika'], correct: 1 },
      { id: 'q5-2', level: 5, text: 'Hesh funksiya (Hash) asosiy xususiyati nima?', options: ['Qaytuvchanlik', 'Bir tomonlamalik (One-way)', 'Tasodifiylik', 'Cheksizlik'], correct: 1 },
      { id: 'q5-3', level: 5, text: 'Blockchain texnologiyasining asosi nima?', options: ['O\'yinlar', 'Markazlashmagan reestr (Ledger)', 'Markaziy bank', 'Video tahrirlash'], correct: 1 },
      { id: 'q5-4', level: 5, text: 'Turing testi nima uchun kerak?', options: ['Tezlikni o\'lchash', 'Intelektni aniqlash', 'Xotirani tekshirish', 'Ekran sifatini ko\'rish'], correct: 1 },
      { id: 'q5-5', level: 5, text: 'Big O notation nima?', options: ['Hajm', 'Algoritm samaradorligi', 'Dastur nomi', 'Xato kodi'], correct: 1 }
    ]
  };

  if (!experimentId) {
    return (
      <div className="space-y-12 animate-in fade-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[60px] border border-white shadow-sm flex items-center gap-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-[32px] flex items-center justify-center text-5xl shadow-2xl animate-float">💻</div>
          <div><h2 className="text-4xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.informatics}</h2><p className="text-slate-400 font-bold text-lg">Digital Intelligence Center</p></div>
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
        rewardBadge={{ id: 'info_wizard', name: 'Logic Wizard', description: 'Expert', icon: '💻', subject: Subject.INFORMATICS }} 
        rewardXP={600} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Informatics"}
        onSuccess={(l) => { onEarnBadge({ id: 'info_wizard', name: 'Logic Wizard', description: 'Expert', icon: '💻', subject: Subject.INFORMATICS }); onComplete(l); }} 
      />
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-6 rounded-[40px] border border-white shadow-sm sticky top-4 z-50">
        <button onClick={() => onSelectExp(null)} className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">← Back</button>
        <h2 className="text-2xl font-black text-indigo-900 uppercase tracking-tight font-whimsical">{experiments.find(e => e.id === experimentId)?.title}</h2>
        <button onClick={() => setShowAssessment(true)} className="px-10 py-4 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-all">Level Test 🚀</button>
      </div>
      <div className="animate-in zoom-in duration-500">
        {experimentId === 'sort_hub' && <SortingVisualizer />}
        {experimentId === 'sql_engine' && <SQLEngine />}
        {/* Other experiments rendered as placeholders or with basic logic */}
        {(experimentId === 'crypto_caesar' || experimentId === 'binary_logic') && (
           <div className="bg-white p-16 rounded-[48px] border-4 border-indigo-50 shadow-xl text-center">
              <div className="text-8xl mb-6">⚙️</div>
              <h4 className="text-2xl font-black text-slate-900 mb-4">Module Initializing...</h4>
              <p className="text-slate-500 font-bold">Ushbu laboratoriya moduli tez orada ishga tushadi. Testdan o'tishni unutmang!</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default InformaticsLab;
