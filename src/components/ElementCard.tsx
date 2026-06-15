import { Flame, Droplet, Mountain, Zap, Ghost, ChevronRight, Sparkles } from 'lucide-react';
import { ElementType, POKEMON_DATABASE, MATCHUPS } from '../types';

interface ElementCardProps {
  key?: any;
  type: ElementType;
  isSelected: boolean;
  onSelect: (type: ElementType) => void;
}

const ELEMENT_STYLES: Record<
  ElementType,
  {
    gradient: string;
    border: string;
    bg: string;
    iconColor: string;
    textColor: string;
    glow: string;
    shadow: string;
    badgeBg: string;
    badgeText: string;
    icon: any;
  }
> = {
  Fire: {
    gradient: 'from-orange-600 to-red-600',
    border: 'border-red-500/30 hover:border-red-500/60',
    bg: 'bg-red-950/20',
    iconColor: 'text-red-400',
    textColor: 'text-red-200',
    glow: 'group-hover:shadow-red-500/20',
    shadow: 'shadow-red-500/5',
    badgeBg: 'bg-red-400/10 border-red-500/20',
    badgeText: 'text-red-400',
    icon: Flame,
  },
  Water: {
    gradient: 'from-blue-600 to-cyan-600',
    border: 'border-blue-500/30 hover:border-blue-500/60',
    bg: 'bg-blue-950/20',
    iconColor: 'text-blue-400',
    textColor: 'text-blue-200',
    glow: 'group-hover:shadow-blue-500/20',
    shadow: 'shadow-blue-500/5',
    badgeBg: 'bg-blue-400/10 border-blue-500/20',
    badgeText: 'text-blue-400',
    icon: Droplet,
  },
  Ground: {
    gradient: 'from-lime-600 to-emerald-600',
    border: 'border-lime-500/30 hover:border-lime-500/60',
    bg: 'bg-lime-950/10',
    iconColor: 'text-lime-400',
    textColor: 'text-lime-200',
    glow: 'group-hover:shadow-lime-500/15',
    shadow: 'shadow-lime-500/5',
    badgeBg: 'bg-lime-400/10 border-lime-500/20',
    badgeText: 'text-lime-400',
    icon: Mountain,
  },
  Electric: {
    gradient: 'from-amber-500 to-yellow-500',
    border: 'border-yellow-500/30 hover:border-yellow-500/60',
    bg: 'bg-yellow-950/15',
    iconColor: 'text-yellow-400',
    textColor: 'text-yellow-200',
    glow: 'group-hover:shadow-yellow-500/15',
    shadow: 'shadow-yellow-500/5',
    badgeBg: 'bg-yellow-400/10 border-yellow-500/20',
    badgeText: 'text-yellow-400',
    icon: Zap,
  },
  Ghost: {
    gradient: 'from-purple-600 to-indigo-600',
    border: 'border-purple-500/30 hover:border-purple-500/60',
    bg: 'bg-purple-950/20',
    iconColor: 'text-purple-400',
    textColor: 'text-purple-200',
    glow: 'group-hover:shadow-purple-500/20',
    shadow: 'shadow-purple-500/5',
    badgeBg: 'bg-purple-400/10 border-purple-500/20',
    badgeText: 'text-purple-400',
    icon: Ghost,
  },
};

export default function ElementCard({ type, isSelected, onSelect }: ElementCardProps) {
  const styles = ELEMENT_STYLES[type];
  const Icon = styles.icon;
  const pokemons = POKEMON_DATABASE[type];
  const strongAgainst = MATCHUPS[type];

  return (
    <button
      id={`element-selector-${type.toLowerCase()}`}
      onClick={() => onSelect(type)}
      className={`group relative text-left w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
        isSelected
          ? `bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl shadow-slate-950`
          : `${styles.bg} ${styles.border} hover:bg-slate-900/40 hover:scale-[1.02] ${styles.shadow} hover:shadow-lg ${styles.glow}`
      }`}
    >
      {/* Decorative gradient flare */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${styles.gradient} opacity-5 blur-2xl group-hover:opacity-15 transition-opacity pointer-events-none`} />

      <div className="p-5 flex flex-col h-full justify-between">
        {/* Type Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center ${styles.iconColor} group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white group-hover:text-white transition-colors">
                {type}
              </h3>
              <p className="text-[10px] font-mono text-slate-500">ELEMENT CLASS</p>
            </div>
          </div>
          
          <div className={`p-1 rounded-full bg-slate-950/50 border border-slate-800 transition-colors ${isSelected ? 'text-indigo-400 border-indigo-500/30' : 'text-slate-600 group-hover:text-slate-400'}`}>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Possible Pokemons List */}
        <div className="mb-5">
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-500" /> Summonable Roster
          </div>
          <div className="space-y-1">
            {pokemons.map((pk) => (
              <div
                key={pk.name}
                className="font-mono text-xs text-slate-300 flex items-center justify-between bg-slate-950/40 hover:bg-slate-950/70 border border-slate-900/60 px-2.5 py-1 rounded-md"
              >
                <span>{pk.name}</span>
                <span className="text-[10px] text-slate-500">ID #{pk.pokedexId.toString().padStart(3, '0')}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Advantage Badges */}
        <div className="pt-3 border-t border-slate-800/60">
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
            Tactical Strengths
          </div>
          <div className="flex flex-wrap gap-1.5">
            {strongAgainst.map((tgt) => {
              const tgtStyle = ELEMENT_STYLES[tgt];
              const TgtIcon = tgtStyle.icon;
              return (
                <span
                  key={tgt}
                  className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border flex items-center gap-1 ${tgtStyle.badgeBg} ${tgtStyle.badgeText}`}
                >
                  <TgtIcon className="w-2.5 h-2.5" />
                  {tgt}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </button>
  );
}

// Extra export for simple access to individual styles from other panels
export { ELEMENT_STYLES };
