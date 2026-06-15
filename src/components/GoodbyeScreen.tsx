import { RefreshCw, Layout, Award, Power, Swords } from 'lucide-react';

interface GoodbyeScreenProps {
  score: { user: number; system: number; rounds: number };
  onRestart: () => void;
}

export default function GoodbyeScreen({ score, onRestart }: GoodbyeScreenProps) {
  const winRate = score.rounds > 0 ? Math.round((score.user / score.rounds) * 100) : 0;

  return (
    <div className="w-full max-w-2xl mx-auto py-16 px-4 flex flex-col items-center text-center">
      
      {/* Power down indicator */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-red-500 shadow-inner">
          <Power className="w-8 h-8" />
        </div>
      </div>

      {/* Primary Goodbye text */}
      <h1 className="font-display text-3xl font-black tracking-tight text-white mb-2">
        Tactical Duel Simulator Offline
      </h1>
      <p className="text-sm font-mono text-slate-400 max-w-md uppercase tracking-wide mb-8">
        Terminal signal terminated • Thank you for playing
      </p>

      {/* Session summary details card */}
      <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-md shadow-xl mb-8">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">
          FINAL BATTLE REPORT
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900">
            <div className="text-xl font-mono font-bold text-white">{score.rounds}</div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">Rounds Run</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900">
            <div className="text-xl font-mono font-bold text-emerald-400">{score.user}</div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">Player Wins</div>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-900">
            <div className="text-xl font-mono font-bold text-indigo-400">{winRate}%</div>
            <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">Win Ratio</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800/60 flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="font-mono text-xs text-slate-300">
            {score.user > score.system 
              ? 'Rank Achieved: Premier League Duelist' 
              : score.user === score.system && score.rounds > 0 
                ? 'Rank Achieved: Certified Competitor' 
                : 'Rank Achieved: Training Apprentice'}
          </span>
        </div>
      </div>

      {/* Restart trigger */}
      <div className="text-xs font-mono text-slate-500 mb-4">
        To request another simulation clearance:
      </div>
      
      <button
        id="btn-restart-simulator"
        onClick={onRestart}
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-display font-medium text-sm transition-all shadow-lg shadow-indigo-600/10 active:scale-95 cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        Restart Battle Simulator
      </button>

    </div>
  );
}
