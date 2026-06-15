/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, Info, ShieldAlert, Swords, HelpCircle } from 'lucide-react';
import Header from './components/Header';
import ElementCard from './components/ElementCard';
import Battlefield from './components/Battlefield';
import GoodbyeScreen from './components/GoodbyeScreen';
import { ElementType, ELEMENT_TYPES, POKEMON_DATABASE, MATCHUPS, Pokemon } from './types';

export default function App() {
  const [phase, setPhase] = useState<'selection' | 'battle' | 'goodbye'>('selection');
  const [selectedType, setSelectedType] = useState<ElementType | null>(null);
  
  // Game state
  const [score, setScore] = useState({ user: 0, system: 0, rounds: 0 });
  
  // Active round state
  const [roundDetails, setRoundDetails] = useState<{
    userType: ElementType;
    userPokemon: Pokemon;
    systemType: ElementType;
    systemPokemon: Pokemon;
    winner: 'user' | 'system';
  } | null>(null);

  // Trigger game combat calculation
  const handleSelectElement = (type: ElementType) => {
    setSelectedType(type);

    // 1. Get random Pokemon for the User from selected type
    const userPool = POKEMON_DATABASE[type];
    const userPokemon = userPool[Math.floor(Math.random() * userPool.length)];

    // 2. Choose random system element (any BUT user selection)
    const systemPool = ELEMENT_TYPES.filter((t) => t !== type);
    const systemType = systemPool[Math.floor(Math.random() * systemPool.length)];

    // 3. Get random Pokemon for the System from system type
    const systemTypePool = POKEMON_DATABASE[systemType];
    const systemPokemon = systemTypePool[Math.floor(Math.random() * systemTypePool.length)];

    // 4. Resolve Winner based on matchups
    const userBeatsSystem = MATCHUPS[type].includes(systemType);
    const roundWinner: 'user' | 'system' = userBeatsSystem ? 'user' : 'system';

    // 5. Update scoreboard
    setScore((prev) => ({
      rounds: prev.rounds + 1,
      user: roundWinner === 'user' ? prev.user + 1 : prev.user,
      system: roundWinner === 'system' ? prev.system + 1 : prev.system,
    }));

    // 6. Stage battle details
    setRoundDetails({
      userType: type,
      userPokemon,
      systemType,
      systemPokemon,
      winner: roundWinner,
    });

    // 7. Transition to Battle Phase (5 seconds countdown will begin inside Battlefield)
    setPhase('battle');
  };

  // Triggered when clicking "Play Again"
  const handleNextRound = () => {
    setSelectedType(null);
    setRoundDetails(null);
    setPhase('selection');
  };

  // Triggered when score reset button is clicked
  const handleResetScore = () => {
    setScore({ user: 0, system: 0, rounds: 0 });
    setSelectedType(null);
    setRoundDetails(null);
    setPhase('selection');
  };

  // Triggered when clicking "Exit"
  const handleExit = () => {
    setPhase('goodbye');
  };

  // Restart from goodbye screen
  const handleFullRestart = () => {
    setScore({ user: 0, system: 0, rounds: 0 });
    setSelectedType(null);
    setRoundDetails(null);
    setPhase('selection');
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col justify-between py-6 px-4 md:px-8 relative overflow-x-hidden antialiased">
      
      {/* Absolute high-tech ambient glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <main className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        {phase !== 'goodbye' && (
          <Header score={score} onResetScore={handleResetScore} />
        )}

        {phase === 'selection' && (
          <div className="space-y-8 max-w-5xl mx-auto w-full">
            
            {/* Introductory instructions banner */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Executive Duels Portal
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Choose Your Core Element
              </h2>
              <p className="text-sm text-slate-400 font-sans leading-relaxed">
                Review elements and weaknesses below. On selection, the auto-summoner will deploy a random Pokemon from your class to clash against the system's tactical answer.
              </p>
            </div>

            {/* Element Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ELEMENT_TYPES.map((type) => (
                <ElementCard
                  key={type}
                  type={type}
                  isSelected={selectedType === type}
                  onSelect={handleSelectElement}
                />
              ))}
            </div>

            {/* Interactive matchups helper panel (rulebook) */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-3 border-b border-slate-800/60 pb-2">
                <Info className="w-4 h-4 text-indigo-400" />
                <h4 className="font-display font-bold text-xs text-indigo-200 uppercase tracking-wider">
                  Tactical Rulebook Matrix
                </h4>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-xs font-mono text-slate-400">
                <div className="bg-slate-950/40 border border-slate-900 p-2.5 rounded-lg">
                  <span className="text-red-400 font-bold">Fire</span> beats:
                  <div className="mt-1 text-[10px] text-slate-500">• Ground<br />• Electric</div>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-2.5 rounded-lg">
                  <span className="text-blue-400 font-bold">Water</span> beats:
                  <div className="mt-1 text-[10px] text-slate-500">• Fire<br />• Ground</div>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-2.5 rounded-lg">
                  <span className="text-yellow-400 font-bold">Electric</span> beats:
                  <div className="mt-1 text-[10px] text-slate-500">• Water<br />• Ghost</div>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-2.5 rounded-lg">
                  <span className="text-lime-400 font-bold">Ground</span> beats:
                  <div className="mt-1 text-[10px] text-slate-500">• Electric<br />• Ghost</div>
                </div>
                <div className="bg-slate-950/40 border border-slate-900 p-2.5 rounded-lg">
                  <span className="text-purple-400 font-bold">Ghost</span> beats:
                  <div className="mt-1 text-[10px] text-slate-500">• Water<br />• Fire</div>
                </div>
              </div>
            </div>

          </div>
        )}

        {phase === 'battle' && roundDetails && (
          <Battlefield
            userType={roundDetails.userType}
            userPokemon={roundDetails.userPokemon}
            systemType={roundDetails.systemType}
            systemPokemon={roundDetails.systemPokemon}
            winner={roundDetails.winner}
            onNextRound={handleNextRound}
            onExit={handleExit}
          />
        )}

        {phase === 'goodbye' && (
          <GoodbyeScreen score={score} onRestart={handleFullRestart} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 border-t border-slate-900 mt-12 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
        Pokemon League Tactical Duel Sandbox • Crafted securely under AI Studio workspace
      </footer>
    </div>
  );
}
