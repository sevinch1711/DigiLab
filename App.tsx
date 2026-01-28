
import React, { useState, useEffect } from 'react';
import { Subject, UserStats, Badge, Language, SubjectStats } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import AboutPage from './components/AboutPage';
import GuidePage from './components/GuidePage';
import BiologyLab from './labs/BiologyLab';
import ChemistryLab from './labs/ChemistryLab';
import PhysicsLab from './labs/PhysicsLab';
import InformaticsLab from './labs/InformaticsLab';
import ScienceChat from './components/ScienceChat';
import RegistrationModal from './components/RegistrationModal';
import { translations } from './translations';

const defaultSubjectStats: SubjectStats = {
  masteryLevel: 1,
  completedLabs: [],
  weaknesses: []
};

const initialStats: UserStats = {
  points: 0,
  level: 1,
  badges: [],
  completedLabs: [],
  subjectAnalytics: {
    [Subject.BIOLOGY]: { ...defaultSubjectStats },
    [Subject.CHEMISTRY]: { ...defaultSubjectStats },
    [Subject.PHYSICS]: { ...defaultSubjectStats },
    [Subject.INFORMATICS]: { ...defaultSubjectStats },
    [Subject.HOME]: { ...defaultSubjectStats },
    [Subject.LEADERBOARD]: { ...defaultSubjectStats },
    [Subject.ABOUT]: { ...defaultSubjectStats },
    [Subject.GUIDE]: { ...defaultSubjectStats }
  },
  isRegistered: false,
  userName: ''
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Subject>(Subject.HOME);
  const [activeExperimentId, setActiveExperimentId] = useState<string | null>(null);
  const [lang, setLang] = useState<Language>('uz');
  const [showRegistration, setShowRegistration] = useState(false);
  
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('digilab_stats');
    return saved ? JSON.parse(saved) : initialStats;
  });

  useEffect(() => {
    localStorage.setItem('digilab_stats', JSON.stringify(stats));
  }, [stats]);

  const t = translations[lang];

  const addPoints = (amount: number) => {
    setStats(prev => {
      const newPoints = prev.points + amount;
      const newLevel = Math.floor(newPoints / 500) + 1;
      return { ...prev, points: newPoints, level: newLevel };
    });
    
    if (!stats.isRegistered) {
      setTimeout(() => setShowRegistration(true), 1500);
    }
  };

  const updateSubjectMastery = (subject: Subject, masteryLevel: number) => {
    setStats(prev => ({
      ...prev,
      subjectAnalytics: {
        ...prev.subjectAnalytics,
        [subject]: {
          ...prev.subjectAnalytics[subject],
          masteryLevel: Math.max(prev.subjectAnalytics[subject].masteryLevel, masteryLevel)
        }
      }
    }));
  };

  const updateIRTFromDiagnostic = (subject: Subject, irtStr: string) => {
    const score = parseFloat(irtStr.replace(/[^-0.9.]/g, ''));
    if (isNaN(score)) return;

    const newMastery = Math.min(5, Math.max(1, Math.round(((score + 3) / 6) * 4 + 1)));
    
    setStats(prev => ({
      ...prev,
      points: prev.points + 25,
      subjectAnalytics: {
        ...prev.subjectAnalytics,
        [subject]: {
          ...prev.subjectAnalytics[subject],
          masteryLevel: newMastery
        }
      }
    }));
    
    if (!stats.isRegistered) {
      setShowRegistration(true);
    }
  };

  const addBadge = (badge: Badge) => {
    if (!stats.badges.find(b => b.id === badge.id)) {
      setStats(prev => {
        const newPoints = prev.points + 250;
        const newLevel = Math.floor(newPoints / 500) + 1;
        return { 
          ...prev, 
          badges: [...prev.badges, badge],
          points: newPoints,
          level: newLevel
        };
      });
      if (!stats.isRegistered) {
        setShowRegistration(true);
      }
    }
  };

  const handleRegister = (name: string) => {
    setStats(prev => ({ ...prev, isRegistered: true, userName: name }));
    setShowRegistration(false);
  };

  const handleExperimentSelect = (subject: Subject, expId: string) => {
    setActiveTab(subject);
    setActiveExperimentId(expId);
  };

  const renderContent = () => {
    if (activeTab === Subject.HOME) {
      return <Dashboard onSelectLab={setActiveTab} onSelectExperiment={handleExperimentSelect} stats={stats} lang={lang} />;
    }
    
    if (activeTab === Subject.LEADERBOARD) {
      return <Leaderboard stats={stats} lang={lang} />;
    }

    if (activeTab === Subject.ABOUT) {
      return <AboutPage lang={lang} />;
    }

    if (activeTab === Subject.GUIDE) {
      return <GuidePage lang={lang} />;
    }

    switch (activeTab) {
      case Subject.BIOLOGY:
        return <BiologyLab experimentId={activeExperimentId} onSelectExp={(id) => setActiveExperimentId(id)} lang={lang} onComplete={(level) => { addPoints(100); updateSubjectMastery(Subject.BIOLOGY, level); }} onEarnBadge={addBadge} onDiagnosticComplete={(irt) => updateIRTFromDiagnostic(Subject.BIOLOGY, irt)} />;
      case Subject.CHEMISTRY:
        return <ChemistryLab experimentId={activeExperimentId} onSelectExp={(id) => setActiveExperimentId(id)} lang={lang} onComplete={(level) => { addPoints(100); updateSubjectMastery(Subject.CHEMISTRY, level); }} onEarnBadge={addBadge} onDiagnosticComplete={(irt) => updateIRTFromDiagnostic(Subject.CHEMISTRY, irt)} />;
      case Subject.PHYSICS:
        return <PhysicsLab experimentId={activeExperimentId} onSelectExp={(id) => setActiveExperimentId(id)} lang={lang} onComplete={(level) => { addPoints(100); updateSubjectMastery(Subject.PHYSICS, level); }} onEarnBadge={addBadge} onDiagnosticComplete={(irt) => updateIRTFromDiagnostic(Subject.PHYSICS, irt)} />;
      case Subject.INFORMATICS:
        return <InformaticsLab experimentId={activeExperimentId} onSelectExp={(id) => setActiveExperimentId(id)} lang={lang} onComplete={(level) => { addPoints(100); updateSubjectMastery(Subject.INFORMATICS, level); }} onEarnBadge={addBadge} onDiagnosticComplete={(irt) => updateIRTFromDiagnostic(Subject.INFORMATICS, irt)} />;
      default:
        return <Dashboard onSelectLab={setActiveTab} onSelectExperiment={handleExperimentSelect} stats={stats} lang={lang} />;
    }
  };

  const currentLevelProgress = Math.min(100, Math.max(0, (stats.points % 500) / 5));

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-['Nunito']">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(s) => { setActiveTab(s); setActiveExperimentId(null); }} 
        lang={lang} 
        level={stats.level} 
        progress={currentLevelProgress} 
      />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scrollbar-none">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-black text-slate-900 font-whimsical tracking-tight">
              {activeTab === Subject.HOME ? t.welcome : 
               activeTab === Subject.LEADERBOARD ? t.leaderboard_title : 
               activeTab === Subject.ABOUT ? t.about : 
               activeTab === Subject.GUIDE ? (t as any).guide_title : 
               (t as any)[activeTab.toLowerCase()]}
            </h1>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
               <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Tizim holati: Onlayn</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-white/60 backdrop-blur-md rounded-2xl p-1 shadow-sm border border-white/40">
              {(['uz', 'en', 'ru'] as Language[]).map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all ${lang === l ? 'bg-[#007AFF] text-white shadow-lg' : 'text-slate-400 hover:bg-white/50'}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white flex items-center gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-transform hover:scale-105">
                <span className="text-xl">⭐</span>
                <span className="font-black text-slate-700">{stats.points} XP</span>
              </div>
              <div className="bg-[#007AFF] px-6 py-3 rounded-2xl flex items-center gap-3 shadow-[0_8px_20px_rgba(0,122,255,0.2)] transition-transform hover:scale-105">
                <span className="text-xl">🏆</span>
                <span className="font-black text-white uppercase text-[10px] tracking-widest">Level {stats.level}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto pb-24">
          {renderContent()}
        </div>

        <ScienceChat subject={activeTab} lang={lang} />
        <RegistrationModal isOpen={showRegistration} lang={lang} onSave={handleRegister} />
      </main>
    </div>
  );
};

export default App;
