import { Play, BookOpen, RotateCcw, Settings } from 'lucide-react';

interface HomeScreenProps {
  onStartGame: () => void;
  onContinue: () => void;
  onHowToPlay: () => void;
  onSettings: () => void;
}

export function HomeScreen({ onStartGame, onContinue, onHowToPlay, onSettings }: HomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Game Title */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-3xl p-6 shadow-2xl mb-3 transform rotate-1">
            <h1 className="text-white mb-1">🇮🇳 Bharat Business</h1>
            <p className="text-orange-100 text-sm">Build Your Empire Across India</p>
          </div>
          <div className="flex justify-center gap-2 mt-3">
            <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-white border-2 border-teal-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-teal-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-amber-500 rounded-full"></div>
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="space-y-3">
          <button 
            onClick={onStartGame}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            <span>Start Game</span>
          </button>

          <button 
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Continue</span>
          </button>

          <button 
            onClick={onHowToPlay}
            className="w-full bg-white border-4 border-teal-500 text-teal-600 py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            <BookOpen className="w-5 h-5" />
            <span>How to Play</span>
          </button>

          <button 
            onClick={onSettings}
            className="w-full bg-white border-4 border-orange-500 text-orange-600 py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-transform"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>

        {/* Featured Cities Preview */}
        <div className="mt-6 bg-white rounded-2xl p-3 shadow-xl">
          <p className="text-center text-gray-500 text-xs mb-2">Featured Cities</p>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-2 rounded-xl text-center">
              <div className="text-xl mb-0.5">🏙️</div>
              <p className="text-white text-[10px]">Mumbai</p>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-2 rounded-xl text-center">
              <div className="text-xl mb-0.5">💻</div>
              <p className="text-white text-[10px]">Bengaluru</p>
            </div>
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2 rounded-xl text-center">
              <div className="text-xl mb-0.5">🏛️</div>
              <p className="text-white text-[10px]">Delhi</p>
            </div>
            <div className="bg-gradient-to-br from-green-400 to-green-600 p-2 rounded-xl text-center">
              <div className="text-xl mb-0.5">🌴</div>
              <p className="text-white text-[10px]">Chennai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
