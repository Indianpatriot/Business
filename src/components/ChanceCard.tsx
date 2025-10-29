import { Sparkles, IndianRupee } from 'lucide-react';

interface ChanceCardProps {
  title: string;
  amount: number;
  onClose: () => void;
}

export function ChanceCard({ title, amount, onClose }: ChanceCardProps) {
  const isPositive = amount > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="relative max-w-sm w-full animate-in fade-in zoom-in duration-300">
        {/* Card */}
        <div 
          className={`bg-gradient-to-br ${
            isPositive 
              ? 'from-teal-400 via-cyan-500 to-blue-500' 
              : 'from-red-400 via-orange-500 to-amber-500'
          } rounded-3xl shadow-2xl p-8 text-white transform rotate-2`}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center transform -rotate-2">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full">
                <Sparkles className="w-12 h-12" />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-white mb-2">Chance Card!</h2>
              <p className="text-white/90 text-lg mb-4">{title}</p>
              
              <div className={`inline-flex items-center gap-2 ${
                isPositive ? 'bg-white/20' : 'bg-black/20'
              } px-6 py-3 rounded-full`}>
                <IndianRupee className="w-6 h-6" />
                <span className="text-2xl">
                  {isPositive ? '+' : ''}{amount.toLocaleString()}
                </span>
              </div>
            </div>

            {isPositive ? (
              <div className="text-sm text-white/80 mb-4">
                🎉 Great news! Money added to your account
              </div>
            ) : (
              <div className="text-sm text-white/80 mb-4">
                😢 Money deducted from your account
              </div>
            )}

            <button
              onClick={onClose}
              className="bg-white text-teal-600 px-8 py-3 rounded-xl shadow-lg active:scale-95 transition-transform"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 text-6xl animate-bounce">✨</div>
        <div className="absolute -bottom-6 -right-6 text-6xl animate-bounce delay-100">✨</div>
      </div>
    </div>
  );
}
