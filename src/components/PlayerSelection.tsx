import { useState } from 'react';
import { Users, ArrowLeft, Pencil, DollarSign } from 'lucide-react';
import { Player, PLAYER_COLORS, PLAYER_COLOR_NAMES } from '../App';

interface PlayerSelectionProps {
  onStartGame: (players: Player[]) => void;
  onBack: () => void;
}

export function PlayerSelection({ onStartGame, onBack }: PlayerSelectionProps) {
  const [selectedCount, setSelectedCount] = useState(2);
  const [startingCash, setStartingCash] = useState(15000);
  const [playerNames, setPlayerNames] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']);
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null);

  const handleNameChange = (index: number, newName: string) => {
    const updated = [...playerNames];
    updated[index] = newName;
    setPlayerNames(updated);
  };

  const handleStartGame = () => {
    const players: Player[] = [];
    for (let i = 0; i < selectedCount; i++) {
      players.push({
        id: i + 1,
        name: playerNames[i] || `Player ${i + 1}`,
        cash: startingCash,
        position: 0,
        properties: [],
        inJail: false,
        jailTurns: 0,
        color: PLAYER_COLORS[i]
      });
    }
    onStartGame(players);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-teal-600 mb-4 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-6 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Users className="w-8 h-8 text-teal-600" />
            <h2 className="text-teal-600">Game Setup</h2>
          </div>

          {/* Number of Players */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Number of Players</p>
            <div className="grid grid-cols-4 gap-2">
              {[2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  className={`p-4 rounded-xl border-3 transition-all active:scale-95 ${
                    selectedCount === count
                      ? 'border-teal-500 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{count}</div>
                  <div className={`text-xs ${selectedCount === count ? 'text-teal-600' : 'text-gray-600'}`}>
                    Players
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Starting Cash */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <p className="text-sm text-gray-600">Starting Cash (for all players)</p>
            </div>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-xl mb-3">
              <div className="flex items-center justify-center gap-2">
                <span className="text-orange-600 text-2xl">₹</span>
                <input
                  type="number"
                  value={startingCash}
                  onChange={(e) => setStartingCash(Math.max(1000, parseInt(e.target.value) || 1000))}
                  className="bg-white border-2 border-orange-200 rounded-lg px-4 py-2 text-center text-xl w-32 focus:outline-none focus:border-orange-400"
                  min="1000"
                  step="1000"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {[10000, 15000, 20000, 25000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setStartingCash(amount)}
                  className={`flex-1 py-2 rounded-lg text-xs transition-all ${
                    startingCash === amount
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  ₹{amount/1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Player Names */}
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-3">Player Names & Colors</p>
            <div className="space-y-2">
              {Array.from({ length: selectedCount }, (_, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md"
                    style={{ backgroundColor: PLAYER_COLORS[i] }}
                  >
                    <span className="text-sm">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    {editingPlayer === i ? (
                      <input
                        type="text"
                        value={playerNames[i]}
                        onChange={(e) => handleNameChange(i, e.target.value)}
                        onBlur={() => setEditingPlayer(null)}
                        onKeyDown={(e) => e.key === 'Enter' && setEditingPlayer(null)}
                        className="w-full bg-white border-2 border-teal-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-teal-500"
                        autoFocus
                      />
                    ) : (
                      <div className="text-sm text-gray-800">{playerNames[i]}</div>
                    )}
                    <div className="text-xs text-gray-500">{PLAYER_COLOR_NAMES[i]}</div>
                  </div>
                  <button
                    onClick={() => setEditingPlayer(i)}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-4 rounded-xl mb-6 border-2 border-teal-200">
            <p className="text-xs text-teal-700 mb-2">Game Summary:</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Players:</span>
                <span className="text-gray-800">{selectedCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Starting Cash:</span>
                <span className="text-orange-600">₹{startingCash.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartGame}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-2xl shadow-lg active:scale-95 transition-transform"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
