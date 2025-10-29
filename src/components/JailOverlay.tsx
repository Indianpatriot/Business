import { Lock, IndianRupee } from 'lucide-react';

interface JailOverlayProps {
  onPayFine: () => void;
  onClose: () => void;
  playerCash: number;
}

export function JailOverlay({ onPayFine, onClose, playerCash }: JailOverlayProps) {
  const canAfford = playerCash >= 2500;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 20px)'
            }}></div>
          </div>
          <div className="relative">
            <div className="flex justify-center mb-3">
              <div className="bg-white/20 p-4 rounded-full">
                <Lock className="w-12 h-12" />
              </div>
            </div>
            <h2 className="text-white mb-2">In Jail!</h2>
            <p className="text-white/90">You've been caught!</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 mb-6 text-center">
            <div className="text-6xl mb-3">🚔</div>
            <p className="text-gray-700 mb-4">
              You're stuck in jail! Pay the fine or try to roll doubles on your next turn.
            </p>
            
            <div className="bg-white rounded-xl p-4 shadow-inner">
              <div className="text-sm text-gray-600 mb-2">Fine Amount</div>
              <div className="flex items-center justify-center gap-2 text-orange-600">
                <IndianRupee className="w-6 h-6" />
                <span className="text-2xl">2,500</span>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl mb-4 text-sm">
            <span>💡 Tip: You can also get out by rolling doubles!</span>
          </div>

          {!canAfford && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4 text-sm text-center">
              ⚠️ Not enough cash to pay the fine
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={onPayFine}
              disabled={!canAfford}
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Pay ₹2,500 Fine
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl active:scale-95 transition-transform"
            >
              Stay & Try Doubles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
