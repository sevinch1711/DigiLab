
import React, { useState, useEffect } from 'react';
import { Badge, Language, Subject, QuestionPool } from '../types';
import { translations } from '../translations';
import CatAssessment from '../components/CatAssessment';

// --- Missing Informatics Components Implementation ---

const SortingVisualizer: React.FC = () => {
  const [array, setArray] = useState([40, 10, 30, 20, 50]);
  const sort = () => setArray([...array].sort((a, b) => a - b));
  const shuffle = () => setArray([...array].sort(() => Math.random() - 0.5));
  
  return (
    <div className="bg-white p-8 rounded-[40px] border-4 border-indigo-50 shadow-xl flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div className="flex items-end gap-3 h-48 mb-8">
        {array.map((v, i) => (
          <div 
            key={i} 
            className="bg-gradient-to-t from-indigo-500 to-sky-400 rounded-t-2xl transition-all duration-700 shadow-lg" 
            style={{ height: `${v * 3}px`, width: '40px' }}
          ></div>
        ))}
      </div>
      <div className="flex gap-4">
        <button onClick={shuffle} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-200 transition-all">Shuffle</button>
        <button onClick={sort} className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-indigo-700 transition-all active:scale-95">Sort Array</button>
      </div>
    </div>
  );
};

const HashExplorer: React.FC = () => {
  const [val, setVal] = useState('');
  const [hash, setHash] = useState('...');

  useEffect(() => {
    if (!val) {
      setHash('...');
      return;
    }
    let h = 0;
    for (let i = 0; i < val.length; i++) {
      h = ((h << 5) - h) + val.charCodeAt(i);
      h |= 0; 
    }
    setHash(Math.abs(h).toString(16).padStart(8, '0').toUpperCase());
  }, [val]);

  return (
    <div className="bg-white p-10 rounded-[40px] border-4 border-indigo-50 shadow-xl animate-in fade-in slide-in-from-top-4 duration-500">
      <h3 className="text-xl font-black text-indigo-900 mb-6 uppercase tracking-tight">Hashing Experiment</h3>
      <input 
        value={val} 
        onChange={e => setVal(e.target.value)} 
        placeholder="Type a message to hash..." 
        className="w-full p-5 bg-slate-50 rounded-2xl mb-6 border-2 border-slate-100 outline-none focus:border-indigo-400 font-bold transition-all" 
      />
      <div className="p-6 bg-indigo-900 rounded-3xl font-mono text-indigo-100 break-all text-center shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
        <span className="text-sky-400 mr-2">SHA-MOCK:</span> {hash}
      </div>
    </div>
  );
};

const CaesarCipher: React.FC = () => {
  const [val, setVal] = useState('');
  const shiftText = (text: string) => {
    return text.replace(/[a-z]/gi, c => {
      const charCode = c.charCodeAt(0);
      const start = charCode <= 90 ? 65 : 97;
      return String.fromCharCode(((charCode - start + 3) % 26) + start);
    });
  };

  return (
    <div className="bg-white p-10 rounded-[40px] border-4 border-indigo-50 shadow-xl animate-in fade-in duration-500">
      <h3 className="text-xl font-black text-indigo-900 mb-6 uppercase tracking-tight">Caesar Cipher (Shift 3)</h3>
      <div className="space-y-4">
        <textarea 
          value={val} 
          onChange={e => setVal(e.target.value)} 
          placeholder="Enter secret message..." 
          className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-slate-100 outline-none focus:border-indigo-400 font-bold h-32 resize-none transition-all"
        />
        <div className="p-6 bg-slate-900 rounded-3xl font-mono text-green-400 shadow-2xl">
          <p className="text-[10px] text-slate-500 mb-2 uppercase tracking-widest">Encrypted Output</p>
          {shiftText(val) || '...Waiting for input...'}
        </div>
      </div>
    </div>
  );
};

const SQLExplorer: React.FC = () => {
  const [query, setQuery] = useState('SELECT * FROM students WHERE xp > 400');
  const data = [
    { id: 1, name: 'Alice', xp: 500, badge: '🧬' },
    { id: 2, name: 'Bob', xp: 420, badge: '🧪' },
    { id: 3, name: 'Charlie', xp: 380, badge: '⚡' }
  ];

  return (
    <div className="bg-white p-8 rounded-[40px] border-4 border-indigo-50 shadow-xl animate-in zoom-in duration-500">
      <div className="bg-slate-900 p-6 rounded-3xl mb-8 font-mono text-indigo-300 shadow-inner">
        <span className="text-pink-400">SQL&gt;</span> <input value={query} onChange={e => setQuery(e.target.value)} className="bg-transparent border-none outline-none text-indigo-100 w-3/4" />
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-indigo-50 text-indigo-900 uppercase text-[10px] font-black tracking-widest">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">XP</th>
              <th className="p-4">Badge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.filter(d => d.xp > 400).map(d => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-bold text-slate-400">{d.id}</td>
                <td className="p-4 font-black text-slate-900">{d.name}</td>
                <td className="p-4 font-black text-indigo-600">{d.xp}</td>
                <td className="p-4 text-xl">{d.badge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const BinaryChallenge: React.FC = () => {
  const [bits, setBits] = useState([0, 1, 0, 1, 0, 0, 0, 0]);
  const toggleBit = (idx: number) => {
    const newBits = [...bits];
    newBits[idx] = newBits[idx] === 0 ? 1 : 0;
    setBits(newBits);
  };
  const decimal = bits.slice().reverse().reduce((acc, bit, i) => acc + (bit * Math.pow(2, i)), 0);

  return (
    <div className="bg-white p-10 rounded-[40px] border-4 border-indigo-50 shadow-xl flex flex-col items-center animate-in fade-in duration-500">
      <h3 className="text-xl font-black text-indigo-900 mb-8 uppercase tracking-tight">Binary to Decimal</h3>
      <div className="flex gap-3 mb-10 flex-wrap justify-center">
        {bits.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <button 
              onClick={() => toggleBit(i)} 
              className={`w-14 h-20 rounded-2xl flex items-center justify-center text-3xl font-black transition-all transform active:scale-90 ${b ? 'bg-indigo-600 text-white shadow-[0_10px_20px_rgba(79,70,229,0.3)]' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}`}
            >
              {b}
            </button>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{Math.pow(2, 7-i)}</span>
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Decimal Result</p>
        <div className="text-6xl font-black text-indigo-900 font-whimsical">{decimal}</div>
      </div>
    </div>
  );
};

const LogicGatesSimulator: React.FC = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  const result = a && b;

  return (
    <div className="bg-white p-10 rounded-[40px] border-4 border-indigo-50 shadow-xl flex flex-col items-center gap-8 animate-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-black text-indigo-900 uppercase tracking-tight">AND Gate Simulator</h3>
      <div className="flex items-center gap-12">
        <div className="flex flex-col gap-8">
          <button onClick={() => setA(!a)} className={`w-14 h-14 rounded-full border-4 transition-all ${a ? 'bg-indigo-500 border-indigo-200' : 'bg-slate-100 border-slate-200'}`}></button>
          <button onClick={() => setB(!b)} className={`w-14 h-14 rounded-full border-4 transition-all ${b ? 'bg-indigo-500 border-indigo-200' : 'bg-slate-100 border-slate-200'}`}></button>
        </div>
        <div className="relative w-40 h-24 bg-indigo-50 border-4 border-indigo-200 rounded-r-full flex items-center justify-center font-black text-indigo-900 text-2xl shadow-inner">AND</div>
        <div className={`w-20 h-20 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center text-4xl border-4 border-white ${result ? 'bg-yellow-400' : 'bg-slate-100 opacity-50'}`}>
          {result ? '💡' : '🌑'}
        </div>
      </div>
    </div>
  );
};

const SearchVisualizer: React.FC = () => {
  const [target, setTarget] = useState(30);
  const items = [10, 20, 30, 40, 50, 60, 70, 80];
  
  return (
    <div className="bg-white p-10 rounded-[40px] border-4 border-indigo-50 shadow-xl animate-in zoom-in duration-500">
      <h3 className="text-xl font-black text-indigo-900 mb-8 uppercase tracking-tight text-center">Linear Search Visualizer</h3>
      <div className="flex gap-3 justify-center mb-10 flex-wrap">
        {items.map(v => (
          <div 
            key={v} 
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black transition-all duration-500 border-2 ${v === target ? 'bg-indigo-600 text-white border-indigo-400 scale-125 shadow-xl -translate-y-2' : 'bg-slate-50 text-slate-300 border-transparent'}`}
          >
            {v}
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {items.map(v => (
          <button key={v} onClick={() => setTarget(v)} className="px-4 py-2 bg-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest">{v}</button>
        ))}
      </div>
    </div>
  );
};

const HexColorLogic: React.FC = () => {
  const [r, setR] = useState(124);
  const [g, setG] = useState(58);
  const [b, setB] = useState(237);
  const toHex = (n: number) => n.toString(16).padStart(2, '0').toUpperCase();
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return (
    <div className="bg-white p-10 rounded-[40px] border-4 border-indigo-50 shadow-xl flex flex-col items-center animate-in fade-in duration-500">
      <h3 className="text-xl font-black text-indigo-900 mb-8 uppercase tracking-tight">RGB to Hex Logic</h3>
      <div className="flex flex-col md:flex-row items-center gap-12 w-full">
        <div className="w-48 h-48 rounded-[48px] shadow-2xl transition-all border-8 border-white flex items-center justify-center text-white font-black font-mono" style={{ backgroundColor: hex }}>{hex}</div>
        <div className="flex-1 w-full space-y-6">
          {[setR, setG, setB].map((fn, i) => (
            <input key={i} type="range" min="0" max="255" className="w-full" onChange={e => fn(parseInt(e.target.value))} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main InformaticsLab Component ---

// Define InformaticsLabProps interface to fix missing name error
interface InformaticsLabProps {
  experimentId: string | null;
  onSelectExp: (id: string) => void;
  onComplete: () => void;
  onEarnBadge: (badge: Badge) => void;
  lang: Language;
}

const InformaticsLab: React.FC<InformaticsLabProps> = ({ experimentId, onSelectExp, onComplete, onEarnBadge, lang }) => {
  const t = translations[lang];
  const [showAssessment, setShowAssessment] = useState(false);
  const [showTheory, setShowTheory] = useState(false);

  const experiments = [
    { id: 'info_sort', title: (t as any).info_sort_title || 'Sorting Algorithms', icon: '📊' },
    { id: 'info_hash', title: (t as any).info_hash_title || 'Hashing Security', icon: '🔐' },
    { id: 'info_caesar', title: (t as any).info_caesar_title || 'Caesar Cipher', icon: '🛡️' },
    { id: 'info_sql', title: (t as any).info_sql_title || 'SQL Queries', icon: '📜' },
    { id: 'info_binary', title: (t as any).info_binary_title || 'Binary Systems', icon: '🔢' },
    { id: 'info_logic', title: (t as any).info_logic_title || 'Logic Gates', icon: '🔌' },
    { id: 'info_search', title: (t as any).info_search_title || 'Search Logic', icon: '🔍' },
    { id: 'info_color', title: (t as any).info_color_title || 'Hex Color Logic', icon: '🎨' },
  ];

  if (!experimentId) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[40px] border border-white shadow-sm flex items-center gap-6">
          <div className="w-16 h-16 bg-indigo-500 rounded-3xl flex items-center justify-center text-4xl shadow-lg">💻</div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{t.informatics}</h2>
            <p className="text-slate-400 font-bold">Laboratoriya tajribasini tanlang</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experiments.map(exp => (
            <button key={exp.id} onClick={() => onSelectExp(exp.id)} className="group bg-white p-8 rounded-[40px] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all border-2 border-indigo-50 flex flex-col items-center">
              <div className="text-[50px] mb-3 group-hover:rotate-12 transition-transform">{exp.icon}</div>
              <h3 className="text-xs font-black text-indigo-900 uppercase tracking-widest text-center leading-tight">{exp.title}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CatAssessment 
        isOpen={showAssessment} 
        onClose={() => setShowAssessment(false)} 
        questionPool={{ 1: [{ id: 'q', level: 1, text: 'Algoritm nima?', options: ['Buyruqlar ketma-ketligi','Rasm','Faqat 1'], correct: 0 }] }}
        rewardBadge={{ id: 'b', name: 'Info Wizard', description: 'Done', icon: '💻', subject: Subject.INFORMATICS }} 
        rewardXP={400} 
        subjectName={experiments.find(e => e.id === experimentId)?.title || "Informatics"}
        onSuccess={() => { onEarnBadge({ id: 'b', name: 'Info Wizard', description: 'Done', icon: '💻', subject: Subject.INFORMATICS }); onComplete(); }} 
      />
      <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-5 rounded-[32px] border border-white shadow-sm">
        <button onClick={() => onSelectExp(null)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors">← Orqaga</button>
        <h2 className="text-xl font-black text-indigo-900 uppercase tracking-tight">{experiments.find(e => e.id === experimentId)?.title}</h2>
        <button onClick={() => setShowTheory(!showTheory)} className="px-8 py-3 bg-[#007AFF] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95">Theory</button>
      </div>

      <div className="space-y-6">
        {showTheory && (
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[48px] border border-white shadow-xl animate-in slide-in-from-top-4 duration-500">
             <h3 className="text-2xl font-black text-slate-900 mb-6 font-whimsical uppercase tracking-tight">Ilmiy Nazariya 📖</h3>
             <p className="text-slate-600 font-bold text-lg">Kompyuter fanlari va algoritmlar kelajak dunyosini qurish uchun poydevordir. Ushbu simulyatsiya orqali siz mantiqiy fikrlashni va kompyuter qanday ishlashini o'rganasiz.</p>
          </div>
        )}
        
        {experimentId === 'info_sort' && <SortingVisualizer />}
        {experimentId === 'info_hash' && <HashExplorer />}
        {experimentId === 'info_caesar' && <CaesarCipher />}
        {experimentId === 'info_sql' && <SQLExplorer />}
        {experimentId === 'info_binary' && <BinaryChallenge />}
        {experimentId === 'info_logic' && <LogicGatesSimulator />}
        {experimentId === 'info_search' && <SearchVisualizer />}
        {experimentId === 'info_color' && <HexColorLogic />}

        <div className="flex justify-center mt-12">
          <button onClick={() => setShowAssessment(true)} className="px-12 py-5 bg-[#007AFF] text-white rounded-3xl font-black uppercase tracking-[0.1em] shadow-[0_15px_30px_rgba(0,122,255,0.4)] hover:scale-[1.05] border-4 border-white active:scale-95 transition-all">Bilimni tekshirish 🚀</button>
        </div>
      </div>
    </div>
  );
};

export default InformaticsLab;
