import { Player, Property } from '../App';
import { Wallet, Building2 } from 'lucide-react';

interface PlayerInfoPanelProps {
  players: Player[];
  currentPlayer: number;
  properties: Property[];
}

export function PlayerInfoPanel({ players, currentPlayer, properties }: PlayerInfoPanelProps) {
  const player = players[currentPlayer];
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-3">
      {/* Current Player Info */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div 
            className="w-10 h-10 rounded-full shadow-md flex items-center justify-center text-white flex-shrink-0"
            style={{ backgroundColor: player.color }}
          >
            <span className="text-sm">{player.id}</span>
          </div>
          <div>
            <div className="text-sm text-gray-800">{player.name}</div>
            {player.inJail && (
              <span className="text-xs text-red-500">🔒 In Jail</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-xl shadow-md">
          <Wallet className="w-3.5 h-3.5" />
          <span className="text-sm">₹{player.cash.toLocaleString()}</span>
        </div>
      </div>

      {/* All Players Summary */}
      <div className={`grid gap-1.5 mb-3 ${players.length === 5 ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {players.map((p) => (
          <div 
            key={p.id}
            className={`p-1.5 rounded-lg text-center ${
              p.id === player.id 
                ? 'bg-gradient-to-br from-teal-100 to-cyan-100 border-2 border-teal-500' 
                : 'bg-gray-50'
            }`}
          >
            <div 
              className="w-5 h-5 rounded-full mx-auto mb-0.5 border-2 border-white shadow-sm"
              style={{ backgroundColor: p.color }}
            />
            <div className="text-[9px] text-gray-600">{p.name.split(' ')[0].substring(0, 6)}</div>
            <div className="text-[9px] text-gray-800">₹{Math.floor(p.cash/1000)}k</div>
          </div>
        ))}
      </div>

      {/* Owned Properties */}
      {player.properties.length > 0 && (
        <div className="pt-2 border-t border-gray-200">
          <div className="flex items-center gap-1.5 mb-2">
            <Building2 className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-xs text-gray-600">Properties ({player.properties.length})</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {player.properties.map(propId => {
              const prop = properties.find(p => p.id === propId);
              if (!prop) return null;
              return (
                <div 
                  key={propId}
                  className="px-2 py-0.5 rounded-md text-[10px] text-white shadow-sm border-2 border-white"
                  style={{ backgroundColor: prop.color }}
                >
                  {prop.name.length > 10 ? prop.name.substring(0, 9) + '.' : prop.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
