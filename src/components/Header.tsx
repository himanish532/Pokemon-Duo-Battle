import { Trophy, Swords, Zap } from 'lucide-react';

interface HeaderProps {
  score: { user: number; system: number; rounds: number };
  onResetScore: () => void;
}

export default function Header({ score, onResetScore }: HeaderProps) {
  return (
    <header className="w-full max-w-6xl mx-auto mb-8 border-b border-slate-800 pb-6 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl shadow-lg shadow-indigo-500/10 border border-indigo-400/20">
          <Swords className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Tactical Element Duelist
          </h1>
          <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-0.5">
            Pokemon League Standard • Sim-v1.4
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl backdrop-blur-sm shadow-inner">
          <div className="flex items-center gap-1.5 border-r border-slate-850 pr-4">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs text-slate-400 uppercase">Score:</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-mono text-slate-500">Player</span>
              <span className="text-emerald-400 font-mono text-base">{score.user}</span>
            </div>
            <div className="text-slate-600 text-xs font-mono">VS</div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase font-mono text-slate-500">System</span>
              <span className="text-rose-400 font-mono text-base">{score.system}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onResetScore}
          title="Reset score tracker"
          className="text-xs font-mono hover:text-white text-slate-500 border border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900/40 transition-all rounded-lg px-3 py-1.5 flex items-center gap-1.5 shrink-0"
        >
          <Zap className="w-3 h-3 text-indigo-400" />
          Reset Score
        </button>
      </div>
    </header>
  );
}
