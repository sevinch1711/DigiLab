
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
      <span className="ml-2 text-slate-500 uppercase tracking-[0.2em] font-black">Backend Logic Terminal</span>
    </div>
    {logs.length === 0 ? (
      <div className="text-slate-600 italic">Tizim tayyor... Kuting...</div>
    ) : (
      logs.map((log, i) => (
        <div key={i} className="mb-1 animate-in fade-in slide-in-from-left-2 duration-300">
          <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
          <span className="text-indigo-400 font-black">PROCESS:</span> {log}
        </div>
      ))
    )}
  </div>
);

// --- 1. Sorting Visualizer ---
const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState([45, 15, 35, 25, 50, 10, 30, 20]);
  const [logs, setLogs] = useState<string[]>(['Algorithm lab ready. Select sorting method and adjust pace.']);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [speed, setSpeed] = useState(600); 
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const resetStats = () => {
    setStats({ comparisons: 0, swaps: 0 });
    setComparing([]);
  };

  const bubbleSort = async () => {
    setSorting(true); resetStats();
    let arr = [...array];
    setLogs(p => [...p, 'Bubble Sort: O(n²) - Bubbling up largest elements.']);
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setComparing([j, j + 1]);
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setStats(s => ({ ...s, swaps: s.swaps + 1 }));
          setArray([...arr]);
        }
        await sleep(speed);
      }
    }
    setComparing([]); setSorting(false);
    setLogs(p => [...p, 'Bubble Sort complete.']);
  };

  const selectionSort = async () => {
    setSorting(true); resetStats();
    let arr = [...array];
    setLogs(p => [...p, 'Selection Sort: O(n²) - Finding minimum in each pass.']);
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        setComparing([i, j]);
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
        if (arr[j] < arr[minIdx]) minIdx = j;
        await sleep(speed);
      }
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setStats(s => ({ ...s, swaps: s.swaps + 1 }));
        setArray([...arr]);
      }
    }
    setComparing([]); setSorting(false);
    setLogs(p => [...p, 'Selection Sort complete.']);
  };

  const insertionSort = async () => {
    setSorting(true); resetStats();
    let arr = [...array];
    setLogs(p => [...p, 'Insertion Sort: O(n²) - Building sorted list one by one.']);
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        setComparing([j, j + 1]);
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
        arr[j + 1] = arr[j];
        setStats(s => ({ ...s, swaps: s.swaps + 1 }));
        j = j - 1;
        setArray([...arr]);
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
    }
    setComparing([]); setSorting(false);
    setLogs(p => [...p, 'Insertion Sort complete.']);
  };

  const mergeSortSim = async () => {
    setSorting(true); resetStats();
    setLogs(p => [...p, 'Merge Sort: O(n log n) - Recursive Divide & Conquer.']);
    let arr = [...array];
    const merge = async (l: number, m: number, r: number) => {
      let left = arr.slice(l, m + 1);
      let right = arr.slice(m + 1, r + 1);
      let i = 0, j = 0, k = l;
      while (i < left.length && j < right.length) {
        setComparing([k]);
        setStats(s => ({ ...s, comparisons: s.comparisons + 1 }));
        if (left[i] <= right[j]) { arr[k] = left[i]; i++; }
        else { arr[k] = right[j]; j++; }
        setArray([...arr]); await sleep(speed); k++;
      }
      while (i < left.length) { arr[k] = left[i]; i++; k++; setArray([...arr]); await sleep(speed); }
      while (j < right.length) { arr[k] = right[j]; j++; k++; setArray([...arr]); await sleep(speed); }
    };
    const sort = async (l: number, r: number) => {
      if (l >= r) return;
      let m = Math.floor((l + r) / 2);
      await sort(l, m); await sort(m + 1, r); await merge(l, m, r);
    };
    await sort(0, arr.length - 1);
    setComparing([]); setSorting(false);
    setLogs(p => [...p, 'Merge Sort complete.']);
  };

  return (
    <div className="bg-white p-10 rounded-[48px] border-4 border-indigo-50 shadow-xl flex flex-col items-center">
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between w-full">
        <div className="flex gap-2 flex-wrap">
          <button disabled={sorting} onClick={bubbleSort} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-100 transition-all">Bubble</button>
          <button disabled={sorting} onClick={selectionSort} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-100 transition-all">Selection</button>
          <button disabled={sorting} onClick={insertionSort} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-100 transition-all">Insertion</button>
          <button disabled={sorting} onClick={mergeSortSim} className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg">Merge Sort</button>
        </div>
        <div className="flex flex-col gap-1 w-full md:w-48">
          <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
            <span>Tezlik (Pace)</span>
            <span className="text-indigo-600">{speed}ms</span>
          </div>
          <input type="range" min="100" max="2000" step="100" value={speed} onChange={e => setSpeed(parseInt(e.target.value))} className="w-full accent-indigo-600 bg-slate-100 h-2 rounded-full appearance-none cursor-pointer" />
        </div>
      </div>
      <div className="flex items-end gap-3 h-52 mb-10 w-full justify-center px-4">
        {array.map((v, i) => (
          <div key={i} className={`rounded-t-2xl transition-all duration-300 flex items-center justify-center text-[10px] font-black text-white ${comparing.includes(i) ? 'bg-rose-500 scale-110 h-64' : 'bg-gradient-to-t from-indigo-500 to-sky-400'}`} style={{ height: `${v * 3}px`, width: '40px' }}>{v}</div>
        ))}
      </div>
      <LogicTerminal logs={logs} />
    </div>
  );
};

// --- 2. Search Visualizer ---
const SearchVisualizer: React.FC = () => {
  const [items] = useState([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
  const [target, setTarget] = useState(70);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [range, setRange] = useState<{l: number, r: number} | null>(null);
  const [logs, setLogs] = useState<string[]>(['Search module ready. Choose algorithm.']);
  const [speed, setSpeed] = useState(600);
  const [searching, setSearching] = useState(false);

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const linearSearch = async () => {
    setSearching(true); setLogs(['Linear Search: O(n) - Scanning...']);
    for (let i = 0; i < items.length; i++) {
      setCurrentIndex(i); await sleep(speed);
      if (items[i] === target) { setLogs(p => [...p, 'Found at index ' + i]); break; }
    }
    setSearching(false);
  };

  const binarySearch = async () => {
    setSearching(true); setLogs(['Binary Search: O(log n) - Splitting...']);
    let l = 0, r = items.length - 1;
    while (l <= r) {
      setRange({l, r});
      let m = Math.floor((l + r) / 2);
      setCurrentIndex(m); await sleep(speed);
      if (items[m] === target) { setLogs(p => [...p, 'Found at index ' + m]); break; }
      if (items[m] < target) l = m + 1; else r = m - 1;
    }
    setRange(null); setSearching(false);
  };

  const jumpSearch = async () => {
    setSearching(true); setLogs(['Jump Search: O(√n) - Jumping...']);
    let n = items.length; let step = Math.floor(Math.sqrt(n)); let prev = 0;
    while (items[Math.min(step, n) - 1] < target) {
      setRange({l: prev, r: Math.min(step, n) - 1}); await sleep(speed);
      prev = step; step += Math.floor(Math.sqrt(n));
      if (prev >= n) break;
    }
    for (let i = prev; i < Math.min(step, n); i++) {
      setCurrentIndex(i); await sleep(speed);
      if (items[i] === target) { setLogs(p => [...p, 'Found at index ' + i]); break; }
    }
    setRange(null); setSearching(false);
  };

  const interpolationSearch = async () => {
    setSearching(true); setLogs(['Interpolation Search: O(log log n) - Predicting...']);
    let l = 0, r = items.length - 1;
    while (l <= r && target >= items[l] && target <= items[r]) {
      setRange({l, r});
      let pos = l + Math.floor(((target - items[l]) * (r - l)) / (items[r] - items[l]));
      if (pos < 0 || pos >= items.length) break;
      setCurrentIndex(pos); await sleep(speed);
      if (items[pos] === target) { setLogs(p => [...p, 'Found at index ' + pos]); break; }
      if (items[pos] < target) l = pos + 1; else r = pos - 1;
    }
    setRange(null); setSearching(false);
  };

  return (
    <div className="bg-white p-10 rounded-[48px] border-4 border-indigo-50 shadow-xl flex flex-col items-center">
      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        <button disabled={searching} onClick={linearSearch} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-100">Linear</button>
        <button disabled={searching} onClick={binarySearch} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-100">Binary</button>
        <button disabled={searching} onClick={jumpSearch} className="px-5 py-2.5 bg-slate-100 rounded-2xl text-[10px] font-black uppercase hover:bg-indigo-100">Jump</button>
        <button disabled={searching} onClick={interpolationSearch} className="px-5 py-2.5 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase">Interpolation</button>
      </div>
      <div className="flex gap-2 mb-10 overflow-x-auto w-full justify-center p-4">
        {items.map((v, i) => (
          <div key={i} className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-black border-2 transition-all duration-300 ${currentIndex === i ? 'bg-rose-500 border-rose-300 text-white scale-125 shadow-lg' : (range && i >= range.l && i <= range.r) ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'bg-slate-50 border-transparent text-slate-300'}`}>{v}</div>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <label className="text-[10px] font-black text-slate-400 uppercase">Qidiruv obyekti:</label>
        <select disabled={searching} value={target} onChange={e => setTarget(parseInt(e.target.value))} className="bg-slate-50 p-2 rounded-xl text-xs font-black outline-none border-2 border-slate-100">
          {items.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <LogicTerminal logs={logs} />
    </div>
  );
};

// --- 3. SQL Explorer ---
const SQLExplorer: React.FC = () => {
  const [query, setQuery] = useState('SELECT name, xp FROM users WHERE xp > 500 ORDER BY xp DESC');
  const rawData = [
    { id: 1, name: 'Asilbek', xp: 850, role: 'Admin', badge: '🥇' },
    { id: 2, name: 'Guli', xp: 420, role: 'User', badge: '🥉' },
    { id: 3, name: 'Sardor', xp: 620, role: 'User', badge: '🥈' },
    { id: 4, name: 'Sevinch', xp: 999, role: 'Master', badge: '💎' },
    { id: 5, name: 'Dilnoza', xp: 750, role: 'User', badge: '🥈' }
  ];

  const processedData = useMemo(() => {
    let result = [...rawData];
    const q = query.toLowerCase().trim();
    try {
      const whereMatch = q.match(/where\s+(.+?)(\s+order\s+by|$)/);
      if (whereMatch) {
        const condition = whereMatch[1];
        if (condition.includes('xp >')) { result = result.filter(d => d.xp > parseInt(condition.split('xp >')[1])); }
      }
      const orderMatch = q.match(/order\s+by\s+(\w+)(\s+desc|\s+asc|$)/);
      if (orderMatch) {
        const field = orderMatch[1].trim() as keyof typeof rawData[0];
        const isDesc = q.includes('desc');
        result.sort((a: any, b: any) => (a[field] < b[field] ? (isDesc ? 1 : -1) : a[field] > b[field] ? (isDesc ? -1 : 1) : 0));
      }
      return result;
    } catch (e) { return result; }
  }, [query]);

  return (
    <div className="bg-white p-10 rounded-[48px] border-4 border-indigo-50 shadow-xl">
      <div className="bg-slate-900 p-8 rounded-[40px] mb-8 font-mono shadow-2xl">
        <div className="flex gap-4 text-sm">
          <span className="text-pink-400 font-black">SQL&gt;</span>
          <textarea value={query} onChange={e => setQuery(e.target.value)} className="bg-transparent border-none outline-none text-indigo-100 w-full font-mono resize-none h-20" spellCheck={false} />
        </div>
      </div>
      <div className="overflow-hidden rounded-[40px] border-2 border-slate-100">
        <table className="w-full text-left text-[11px]">
          <thead className="bg-indigo-600 text-white uppercase font-black tracking-widest">
            <tr><th className="p-5">ID</th><th className="p-5">Name</th><th className="p-5">XP</th><th className="p-5">Badge</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {processedData.map(d => (
              <tr key={d.id} className="hover:bg-indigo-50/50 font-bold text-slate-700">
                <td className="p-5 opacity-40">#0{d.id}</td>
                <td className="p-5 text-slate-900">{d.name}</td>
                <td className="p-5 text-indigo-600">{d.xp}</td>
                <td className="p-5 text-xl">{d.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <LogicTerminal logs={[`Parsed: ${query}`, `Rows returned: ${processedData.length}`]} />
    </div>
  );
};

// --- InformaticsLab Main Component ---
interface InformaticsLabProps {
  experimentId: string | null;
  onSelectExp: (id: string) => void;
  onComplete: (level: number) => void;
  onEarnBadge: (badge: Badge) => void;
  onDiagnosticComplete?: (irt: string) => void;
  lang: Language;
}

const InformaticsLab: React.FC<InformaticsLabProps> = ({ experimentId, onSelectExp, onComplete, onEarnBadge, onDiagnosticComplete, lang }) => {
  const t = translations[lang];
  const [showAssessment, setShowAssessment] = useState(false);

  const experiments = [
    { id: 'info_sort', title: 'Sorting Mastery', icon: '📊' },
    { id: 'info_sql', title: 'Dynamic SQL Engine', icon: '📜' },
    { id: 'info_caesar', title: 'Cryptography Secrets', icon: '🛡️' },
    { id: 'info_search', title: 'Search Algorithms', icon: '🔍' },
    { id: 'info_binary', title: 'Binary Logic', icon: '🔢' },
    { id: 'info_hash', title: 'Bitwise Hashing', icon: '⚙️' },
    { id: 'info_color', title: 'Color Math (Hex)', icon: '🎨' },
    { id: 'info_logic', title: 'Logic Gates', icon: '🔌' }
  ];

  // Kengaytirilgan CAT savollar pool-i (jami ~30 ta savol)
  const questionPool: QuestionPool = {
    1: [
      { id: 'i1-1', level: 1, text: 'Kompyuterlar qaysi sanoq tizimida ishlaydi?', options: ['O\'nlik (Decimal)', 'Ikkilik (Binary)', 'Sakkizlik', 'O\'n oltilik'], correct: 1 },
      { id: 'i1-2', level: 1, text: 'SQL-da ma\'lumotlarni olish uchun qaysi kalit so\'z ishlatiladi?', options: ['GET', 'FETCH', 'SELECT', 'EXTRACT'], correct: 2 },
      { id: 'i1-3', level: 1, text: 'Binar sanoq tizimida "1 + 1" necha bo\'ladi?', options: ['2', '11', '10', '0'], correct: 2 },
      { id: 'i1-4', level: 1, text: 'Eng sodda saralash algoritmi qaysi?', options: ['Quick Sort', 'Merge Sort', 'Bubble Sort', 'Heap Sort'], correct: 2 },
      { id: 'i1-5', level: 1, text: 'HTML-da ranglar ko\'pincha qaysi formatda yoziladi?', options: ['#HEX', 'RGB', 'Binary', 'Decimal'], correct: 0 }
    ],
    2: [
      { id: 'i2-1', level: 2, text: 'AND mantiqiy darvozasi qachon 1 (TRUE) qaytaradi?', options: ['A yoki B 1 bo\'lsa', 'Faqat A 1 bo\'lsa', 'Ikkala kirish ham 1 bo\'lsa', 'Ikkala kirish ham 0 bo\'lsa'], correct: 2 },
      { id: 'i2-2', level: 2, text: 'Binar 00001111 o\'nlik tizimda nechaga teng?', options: ['7', '15', '31', '63'], correct: 1 },
      { id: 'i2-3', level: 2, text: 'Sezar shifri qanday turdagi shifrlash hisoblanadi?', options: ['Asimmetrik', 'Simmetrik (O\'rin almashtirish)', 'Xesh funksiya', 'Ochiq kalit'], correct: 1 },
      { id: 'i2-4', level: 2, text: 'Chiziqli qidiruv (Linear Search) ning o\'rtacha vaqt murakkabligi?', options: ['O(log n)', 'O(1)', 'O(n)', 'O(n^2)'], correct: 2 },
      { id: 'i2-5', level: 2, text: '1 byte necha bitdan iborat?', options: ['4', '8', '16', '32'], correct: 1 }
    ],
    3: [
      { id: 'i3-1', level: 3, text: 'Merge Sort qaysi metodga asoslangan?', options: ['Brute Force', 'Dynamic Programming', 'Divide and Conquer', 'Greedy Algorithm'], correct: 2 },
      { id: 'i3-2', level: 3, text: 'SQL-da natijalarni saralash uchun nima ishlatiladi?', options: ['GROUP BY', 'SORT BY', 'ORDER BY', 'ARRANGE BY'], correct: 2 },
      { id: 'i3-3', level: 3, text: 'Xor darvozasi (Exclusive OR) natijasi qachon 1 bo\'ladi?', options: ['Ikkala kirish bir xil bo\'lsa', 'Ikkala kirish har xil bo\'lsa', 'Ikkalasi ham 1 bo\'lsa', 'Faqat bittasi 0 bo\'lsa'], correct: 1 },
      { id: 'i3-4', level: 3, text: 'Ikkilik qidiruv (Binary Search) ishlashi uchun massiv qanday bo\'lishi shart?', options: ['Bo\'sh', 'Katta', 'Saralangan', 'Tartibsiz'], correct: 2 },
      { id: 'i3-5', level: 3, text: 'Hesh funksiyaning asosiy xususiyati nima?', options: ['Orqaga qaytuvchan (reversible)', 'Bir tomonlama (one-way)', 'Faqat sonlar bilan ishlash', 'Har doim tasodifiy bo\'lish'], correct: 1 }
    ],
    4: [
      { id: 'i4-1', level: 4, text: 'Binary Search-ning eng yomon holatdagi vaqt murakkabligi qanday?', options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n^2)'], correct: 2 },
      { id: 'i4-2', level: 4, text: 'Bubble Sort-ning eng yomon holatdagi vaqt murakkabligi qanday?', options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(1)'], correct: 2 },
      { id: 'i4-3', level: 4, text: 'SQL JOIN turlaridan qaysi biri ikkala jadvaldagi mos kelgan va kelmagan barcha qatorlarni oladi?', options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], correct: 3 },
      { id: 'i4-4', level: 4, text: 'Xesh kolliziyasi (collision) nima?', options: ['Ikki xil ma\'lumot bir xil xeshga ega bo\'lishi', 'Xesh funksiya ishlashdan to\'xtashi', 'Ma\'lumotlar bazasi o\'chib ketishi', 'Xesh qiymati o\'zgarishi'], correct: 0 },
      { id: 'i4-5', level: 4, text: 'Ikkilik sanoq tizimida 11110000 soni HEX-da qanday yoziladi?', options: ['#F0', '#0F', '#AA', '#FF'], correct: 0 }
    ],
    5: [
      { id: 'i5-1', level: 5, text: 'Quick Sort eng yomon holatda qanday murakkablikka ega?', options: ['O(n log n)', 'O(n^2)', 'O(2^n)', 'O(n)'], correct: 1 },
      { id: 'i5-2', level: 5, text: 'Salting (tuzlash) kriptografiyada nima uchun ishlatiladi?', options: ['Ma\'lumotni qisqartirish', 'Xeshni qayta ishlash', 'Rainbow table hujumlaridan himoyalanish', 'Ma\'lumotni shifrlash'], correct: 2 },
      { id: 'i5-3', level: 5, text: 'B-Tree indeksi SQL-da nima uchun eng ko\'p ishlatiladi?', options: ['Xotirani tejash', 'Ma\'lumotlarni o\'chirish', 'Qidiruvni tezlashtirish', 'Xavfsizlikni oshirish'], correct: 2 },
      { id: 'i5-4', level: 5, text: 'Big O notation-da O(1) nimani anglatadi?', options: ['Cheksiz vaqt', 'Chiziqli vaqt', 'O\'zgarmas (Constant) vaqt', 'Logarifmik vaqt'], correct: 2 },
      { id: 'i5-5', level: 5, text: 'Asimmetrik shifrlashda (RSA kabi) shifrlash uchun qaysi kalit ishlatiladi?', options: ['Maxfiy (Private) kalit', 'Ochiq (Public) kalit', 'Shared key', 'Master key'], correct: 1 }
    ]
  };

  if (!experimentId) {
    return (
      <div className="space-y-10 animate-in fade-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[60px] border border-white shadow-sm flex items-center gap-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-[32px] flex items-center justify-center text-5xl shadow-2xl animate-float">💻</div>
          <div><h2 className="text-4xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.informatics}</h2><p className="text-slate-400 font-bold text-lg">Haqiqiy algoritmik mantiq laboratoriyasi</p></div>
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
        rewardBadge={{ id: 'info_master', name: 'Informatics Master', description: 'Expert', icon: '💻', subject: Subject.INFORMATICS }} 
        rewardXP={500} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Informatics"}
        onSuccess={(level) => { onEarnBadge({ id: 'info_master', name: 'Informatics Master', description: 'Expert', icon: '💻', subject: Subject.INFORMATICS }); onComplete(level); }} 
      />
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-6 rounded-[40px] border border-white shadow-sm sticky top-4 z-50">
        <button onClick={() => onSelectExp(null)} className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest">← Orqaga</button>
        <h2 className="text-2xl font-black text-indigo-900 uppercase tracking-tight">{experiments.find(e => e.id === experimentId)?.title}</h2>
        <button onClick={() => setShowAssessment(true)} className="px-10 py-4 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Test Topshirish</button>
      </div>
      <div className="animate-in fade-in zoom-in duration-500">
        {experimentId === 'info_sort' && <SortingVisualizer />}
        {experimentId === 'info_sql' && <SQLExplorer />}
        {experimentId === 'info_caesar' && (
          <div className="bg-white p-10 rounded-[48px] border-4 border-indigo-50 shadow-xl">
             <h4 className="text-xl font-black text-indigo-900 font-whimsical uppercase mb-6">Caesar Cipher Visualizer</h4>
             <p className="text-slate-500 mb-4">Sezar shifri - bu har bir harfni alifbo bo'yicha ma'lum qadamga surishdir.</p>
             <div className="flex flex-col gap-4">
                <input type="text" className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none uppercase font-black" placeholder="PLAIN TEXT" />
                <div className="flex gap-4 items-center">
                  <span className="text-xs font-black">SHIFT:</span>
                  <input type="range" min="1" max="25" className="flex-1" />
                </div>
                <div className="p-8 bg-indigo-900 rounded-[32px] text-white text-center font-black text-2xl tracking-widest">CIPHER TEXT</div>
             </div>
          </div>
        )}
        {experimentId === 'info_search' && <SearchVisualizer />}
        {experimentId === 'info_binary' && (
          <div className="bg-white p-10 rounded-[48px] border-4 border-indigo-50 shadow-xl flex flex-col items-center">
            <h4 className="text-xl font-black text-indigo-900 font-whimsical uppercase mb-8">8-Bit Binary Explorer</h4>
            <div className="flex gap-2 mb-10">
              {[...Array(8)].map((_, i) => (
                <button key={i} className="w-12 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-2xl font-black text-slate-300">0</button>
              ))}
            </div>
            <div className="text-5xl font-black text-indigo-600">Decimal: 0</div>
          </div>
        )}
        {experimentId === 'info_hash' && <div className="p-10 bg-white rounded-[48px] border-4 border-indigo-50 shadow-xl text-center">Hashing Simulation Coming Soon...</div>}
        {experimentId === 'info_color' && <div className="p-10 bg-white rounded-[48px] border-4 border-indigo-50 shadow-xl text-center">Hex Color Visualizer Coming Soon...</div>}
        {experimentId === 'info_logic' && <div className="p-10 bg-white rounded-[48px] border-4 border-indigo-50 shadow-xl text-center">Interactive Logic Gates Coming Soon...</div>}
      </div>
    </div>
  );
};

export default InformaticsLab;
