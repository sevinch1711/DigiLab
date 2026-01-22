
import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface RegistrationModalProps {
  isOpen: boolean;
  onSave: (name: string) => void;
  lang: Language;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onSave, lang }) => {
  const t = translations[lang];
  const [name, setName] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-[48px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/50 p-10 transform transition-all animate-in zoom-in duration-500">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#007AFF] to-blue-600 rounded-3xl mx-auto flex items-center justify-center text-5xl shadow-2xl animate-float">
            ✨
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 font-whimsical uppercase tracking-tight">{(t as any).reg_title}</h2>
          <p className="text-slate-500 font-bold leading-relaxed">{(t as any).reg_desc}</p>
          
          <div className="space-y-4 pt-4">
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={(t as any).reg_placeholder}
              className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-[28px] text-lg font-bold text-slate-900 outline-none focus:border-[#007AFF] focus:bg-white transition-all text-center"
            />
            
            <button 
              onClick={() => name.trim() && onSave(name)}
              className="w-full py-6 bg-[#007AFF] text-white rounded-[28px] font-black text-xl shadow-2xl shadow-[#007AFF]/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              disabled={!name.trim()}
            >
              {(t as any).reg_button}
            </button>
          </div>
          
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4">Bu ism reytingda ko'rinadi</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
