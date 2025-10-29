import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { PlayerSelection } from './components/PlayerSelection';
import { GameBoard } from './components/GameBoard';
import { Toaster } from './components/ui/sonner';

export type GameScreen = 'home' | 'playerSelection' | 'game' | 'howToPlay' | 'settings';

export interface Property {
  id: string;
  name: string;
  price: number;
  rent: number;
  color: string;
  owner?: number;
}

export interface Player {
  id: number;
  name: string;
  cash: number;
  position: number;
  properties: string[];
  inJail: boolean;
  jailTurns: number;
  color: string;
}

export const PLAYER_COLORS = ['#3B82F6', '#EF4444', '#10B981', '#FBBF24', '#EC4899'];
export const PLAYER_COLOR_NAMES = ['Blue', 'Red', 'Green', 'Yellow', 'Pink'];

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('home');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  const startNewGame = (gamePlayers: Player[]) => {
    setPlayers(gamePlayers);
    setCurrentPlayer(0);
    setCurrentScreen('game');
  };

  const continueGame = () => {
    if (players.length === 0) {
      setCurrentScreen('playerSelection');
    } else {
      setCurrentScreen('game');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-teal-50">
      {currentScreen === 'home' && (
        <HomeScreen 
          onStartGame={() => setCurrentScreen('playerSelection')}
          onContinue={continueGame}
          onHowToPlay={() => setCurrentScreen('howToPlay')}
          onSettings={() => setCurrentScreen('settings')}
        />
      )}

      {currentScreen === 'playerSelection' && (
        <PlayerSelection
          onStartGame={startNewGame}
          onBack={() => setCurrentScreen('home')}
        />
      )}
      
      {currentScreen === 'game' && (
        <GameBoard 
          players={players}
          setPlayers={setPlayers}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          onBackToHome={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'howToPlay' && (
        <div className="min-h-screen p-4 flex flex-col">
          <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
            <div className="bg-white rounded-3xl shadow-xl p-6 flex-1">
              <h2 className="text-center text-teal-600 mb-6">How to Play</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-4 rounded-2xl">
                  <h3 className="text-orange-600 mb-2">🎯 Objective</h3>
                  <p className="text-gray-700">Buy cities, collect rent, and become the richest player by bankrupting your opponents!</p>
                </div>
                <div className="bg-gradient-to-r from-teal-100 to-cyan-100 p-4 rounded-2xl">
                  <h3 className="text-teal-600 mb-2">🎲 Gameplay</h3>
                  <p className="text-gray-700">Roll dice to move around the board. Buy cities when you land on them. Pay rent when landing on opponent's cities.</p>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-2xl">
                  <h3 className="text-purple-600 mb-2">🃏 Special Cards</h3>
                  <p className="text-gray-700">Land on Chance spaces to draw cards with bonuses or penalties. Watch out for tax spaces!</p>
                </div>
                <div className="bg-gradient-to-r from-red-100 to-orange-100 p-4 rounded-2xl">
                  <h3 className="text-red-600 mb-2">🔒 Jail</h3>
                  <p className="text-gray-700">Land on "Go to Jail" to skip turns. Pay ₹1000 or roll doubles to get out!</p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="w-full mt-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'settings' && (
        <div className="min-h-screen p-4 flex flex-col">
          <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
            <div className="bg-white rounded-3xl shadow-xl p-6 flex-1">
              <h2 className="text-center text-teal-600 mb-6">Settings</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <h3 className="text-gray-700 mb-2">🔊 Sound Effects</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Enabled</span>
                    <div className="w-12 h-6 bg-teal-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <h3 className="text-gray-700 mb-2">🎵 Music</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Enabled</span>
                    <div className="w-12 h-6 bg-teal-500 rounded-full"></div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <h3 className="text-gray-700 mb-2">ℹ️ Game Version</h3>
                  <div className="text-gray-600">1.0.0</div>
                </div>
              </div>
              <button 
                onClick={() => setCurrentScreen('home')}
                className="w-full mt-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
}

export default App;
