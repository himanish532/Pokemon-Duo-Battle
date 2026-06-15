import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Droplet, Mountain, Zap, Ghost, Swords, Loader2, ArrowRight, CornerDownRight, Play, LogOut } from 'lucide-react';
import { ElementType, Pokemon, MATCHUPS } from '../types';
import { ELEMENT_STYLES } from './ElementCard';

interface BattlefieldProps {
  userType: ElementType;
  userPokemon: Pokemon;
  systemType: ElementType;
  systemPokemon: Pokemon;
  winner: 'user' | 'system';
  onNextRound: () => void;
  onExit: () => void;
}

const VICTORY_LORE: Record<ElementType, Record<ElementType, string>> = {
  Fire: {
    Ground: 'Infernal fire incinerates vegetative earth structure!',
    Electric: 'Searing heatwaves dissipate high-voltage discharges!',
    Fire: '', Water: '', Ghost: ''
  },
  Water: {
    Fire: 'Immense hydro-torrents completely douse the blazing inferno!',
    Ground: 'Submersing water currents wash away solid earthen formations!',
    Water: '', Electric: '', Ghost: ''
  },
  Electric: {
    Water: 'High-voltage electric discharge conducts instantly through liquid!',
    Ghost: 'Intense plasma lightning ionizes and reveals the spectral spirit!',
    Fire: '', Ground: '', Electric: ''
  },
  Ground: {
    Electric: 'Solid earth ground-planes absorb and neutralize electrical current!',
    Ghost: 'Seismic tremors scatter vaporous ghostly apparitions!',
    Fire: '', Water: '', Ground: ''
  },
  Ghost: {
    Water: 'Ethereal spirits siphon dry the vital essence of flowing water!',
    Fire: 'Cold phantom shadows smother the fiery thermal embers!',
    Electric: '', Ground: '', Ghost: ''
  }
};

export default function Battlefield({
  userType,
  userPokemon,
  systemType,
  systemPokemon,
  winner,
  onNextRound,
  onExit,
}: BattlefieldProps) {
  const [timeLeft, setTimeLeft] = useState<number>(5.0);
  const [battlePhase, setBattlePhase] = useState<'countdown' | 'reveal'>('countdown');

  // Exact countdown timeline (5 seconds)
  useEffect(() => {
    let startTime = Date.now();
    let duration = 5000; // 5 seconds

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 5 - elapsed / 1000);
      setTimeLeft(remaining);

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeLeft(0);
        setBattlePhase('reveal');
      }
    }, 40); // 40ms interval for smooth double decisecond tick

    return () => clearInterval(timer);
  }, [userType, systemType]);

  const userStyles = ELEMENT_STYLES[userType];
  const systemStyles = ELEMENT_STYLES[systemType];
  const UserIcon = userStyles.icon;
  const SystemIcon = systemStyles.icon;

  const winnerPokemon = winner === 'user' ? userPokemon : systemPokemon;
  const winnerText = winner === 'user' ? 'YOU WON THE ROUND' : 'SYSTEM WON THE ROUND';
  const matchupText = winner === 'user' 
    ? VICTORY_LORE[userType]?.[systemType] 
    : VICTORY_LORE[systemType]?.[userType];

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-6 px-4">
      
      {/* Simulation status bar or Victory banner */}
      <div className="w-full text-center">
        {battlePhase === 'countdown' ? (
          <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/20 px-6 py-2.5 rounded-full backdrop-blur-md">
            <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
            <span className="font-mono text-xs text-indigo-200 tracking-wider uppercase">
              Tactical Clash Decisive Simulation: <span className="text-white font-bold">{timeLeft.toFixed(1)}s</span> remaining
            </span>
          </div>
        ) : (
          <div className={`inline-flex flex-col items-center gap-1.5 px-8 py-4 rounded-2xl border backdrop-blur-md shadow-xl w-full max-w-2xl transition-all duration-500 ${
            winner === 'user' 
              ? 'bg-emerald-950/30 border-emerald-500/30 shadow-emerald-950/10' 
              : 'bg-rose-950/30 border-rose-500/30 shadow-rose-950/10'
          }`}>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">TACTICAL ANALYSIS RESOLVED</span>
            <span className={`font-display text-2xl font-black tracking-tight ${winner === 'user' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {winnerText}
            </span>
            {matchupText && (
              <span className="text-xs font-mono text-slate-300 mt-1 max-w-md text-center leading-relaxed">
                "{matchupText}"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main Duel Stage Arena */}
      <div className="w-full grid grid-cols-1 md:grid-cols-9 items-center gap-4 py-4 relative">
        
        {/* User Contender Panel */}
        <div id="player-contender-panel" className={`md:col-span-4 rounded-3xl border p-6 bg-slate-900/50 backdrop-blur-sm shadow-xl flex flex-col items-center text-center transition-all duration-500 relative overflow-hidden ${
          battlePhase === 'reveal' && winner === 'user' 
            ? 'border-emerald-500/40 shadow-emerald-500/5 ring-1 ring-emerald-500/10' 
            : 'border-slate-800'
        }`}>
          {/* Badge corner */}
          <div className="absolute top-4 left-4 bg-slate-950/80 border border-slate-800 text-[10px] font-mono px-3 py-1 rounded-full text-slate-400 font-semibold shadow-inner">
            CONTENDER #1 (YOU)
          </div>

          {/* Pokemon Portrait Area */}
          <div className="w-48 h-48 flex items-center justify-center relative mt-6 mb-4">
            {/* Pulsing type flare background */}
            <div className={`absolute inset-4 rounded-full bg-gradient-to-tr ${userStyles.gradient} blur-xl opacity-20`} />
            
            <img 
              src={userPokemon.imageUrl} 
              alt={userPokemon.name}
              referrerPolicy="no-referrer"
              className={`w-40 h-40 object-contain relative z-10 transition-all duration-700 ${
                battlePhase === 'countdown' ? 'scale-90 brightness-75 animate-pulse' : 'scale-105 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]'
              }`}
            />
          </div>

          {/* Pokemon Details */}
          <h3 className="font-display font-bold text-xl text-white tracking-tight">
            {userPokemon.name}
          </h3>
          <p className="font-mono text-xs text-slate-400 mt-0.5">
            Pokedex ID #{userPokemon.pokedexId.toString().padStart(3, '0')}
          </p>

          {/* User Type Badge */}
          <div className={`mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-mono text-xs font-semibold ${userStyles.badgeBg} ${userStyles.badgeText}`}>
            <UserIcon className="w-3.5 h-3.5" />
            {userType} Class
          </div>
        </div>

        {/* Tactical Versus Core Separator */}
        <div className="md:col-span-1 flex flex-col items-center justify-center py-4 relative">
          <div className="w-12 h-12 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shadow-lg relative z-10">
            <Swords className={`w-5 h-5 text-slate-400 ${battlePhase === 'countdown' ? 'animate-bounce' : ''}`} />
          </div>
          {/* Neon Connector Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/30 to-indigo-500/0 hidden md:block" />
        </div>

        {/* System Contender Panel */}
        <div id="system-contender-panel" className={`md:col-span-4 rounded-3xl border p-6 bg-slate-900/50 backdrop-blur-sm shadow-xl flex flex-col items-center text-center transition-all duration-500 relative overflow-hidden ${
          battlePhase === 'reveal' && winner === 'system' 
            ? 'border-rose-500/40 shadow-rose-500/5 ring-1 ring-rose-500/10' 
            : 'border-slate-800'
        }`}>
          {/* Badge corner */}
          <div className="absolute top-4 right-4 bg-slate-950/80 border border-slate-800 text-[10px] font-mono px-3 py-1 rounded-full text-slate-400 font-semibold shadow-inner">
            CONTENDER #2 (SYSTEM)
          </div>

          {/* Pokemon Portrait Area */}
          <div className="w-48 h-48 flex items-center justify-center relative mt-6 mb-4">
            {/* Pulsing type flare background */}
            <div className={`absolute inset-4 rounded-full bg-gradient-to-tr ${systemStyles.gradient} blur-xl opacity-20`} />
            
            <img 
              src={systemPokemon.imageUrl} 
              alt={systemPokemon.name}
              referrerPolicy="no-referrer"
              className={`w-40 h-40 object-contain relative z-10 transition-all duration-700 ${
                battlePhase === 'countdown' ? 'scale-90 brightness-75 animate-pulse' : 'scale-105 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]'
              }`}
            />
          </div>

          {/* Pokemon Details */}
          <h3 className="font-display font-bold text-xl text-white tracking-tight">
            {systemPokemon.name}
          </h3>
          <p className="font-mono text-xs text-slate-400 mt-0.5">
            Pokedex ID #{systemPokemon.pokedexId.toString().padStart(3, '0')}
          </p>

          {/* System Type Badge */}
          <div className={`mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border font-mono text-xs font-semibold ${systemStyles.badgeBg} ${systemStyles.badgeText}`}>
            <SystemIcon className="w-3.5 h-3.5" />
            {systemType} Class
          </div>
        </div>

      </div>

      {/* Decisive Victory Floating celebration asset */}
      {battlePhase === 'reveal' && (
        <motion.div
          initial={{ y: '100vh', opacity: 0, x: '-50%' }}
          animate={{ 
            y: '-130vh', 
            opacity: [0, 1, 1, 1, 0],
            x: ['-50%', '-45%', '-55%', '-40%', '-50%'] 
          }}
          transition={{ 
            duration: 5.0, 
            ease: 'easeInOut', 
            times: [0, 0.15, 0.5, 0.85, 1] 
          }}
          className="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          style={{ bottom: -200 }}
        >
          <div className="flex flex-col items-center justify-center gap-3 bg-slate-900/90 border border-indigo-500/40 p-6 rounded-3xl shadow-2xl shadow-indigo-500/20 backdrop-blur-md">
            <img 
              src={winnerPokemon.imageUrl} 
              alt={winnerPokemon.name} 
              referrerPolicy="no-referrer"
              className="w-48 h-48 object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            />
            <div className="text-center font-display text-xl font-black bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent uppercase tracking-wider drop-shadow-sm">
              👑 {winnerPokemon.name} Rises!
            </div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
              {winner === 'user' ? 'VIP Player Victor' : 'AI Overlord Victor'}
            </div>
          </div>
        </motion.div>
      )}

      {/* Re-play or Exit Confirmation Panel below */}
      {battlePhase === 'reveal' && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-xl bg-slate-950/80 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl backdrop-blur-md mt-4"
        >
          <div className="text-center md:text-left">
            <h4 className="font-display font-medium text-white text-base">Duel Session Concluded</h4>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Would you like to initiate another tactical simulation?</p>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              id="btn-play-again"
              onClick={onNextRound}
              className="flex-1 md:flex-initial py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-display font-medium text-sm transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-indigo-500/20"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              Play Again
            </button>
            <button
              id="btn-exit"
              onClick={onExit}
              className="flex-1 md:flex-initial py-2.5 px-5 rounded-xl border border-slate-800 hover:bg-slate-900 hover:border-slate-700 text-slate-300 font-display font-medium text-sm transition-all flex items-center justify-center gap-1.5 focus:ring-2 focus:ring-slate-800"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              Exit
            </button>
          </div>
        </motion.div>
      )}
      
    </div>
  );
}
