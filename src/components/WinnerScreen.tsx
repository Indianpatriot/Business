import { useEffect } from 'react';
import { Trophy, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Player } from '../App';

interface WinnerScreenProps {
  winner: Player;
  onBackToHome: () => void;
}

export function WinnerScreen({ winner, onBackToHome }: WinnerScreenProps) {
  useEffect(() => {
    // Create confetti effect
    const colors = ['#FF6B35', '#4ECDC4', '#FFD93D', '#95E1D3', '#F38181', '#FFA502', '#FF6348'];
    const confettiCount = 150;
    const confettiElements: HTMLDivElement[] = [];

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = Math.random() * 10 + 5 + 'px';
      confetti.style.height = Math.random() * 10 + 5 + 'px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-20px';
      confetti.style.opacity = '1';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confetti.style.zIndex = '9999';
      confetti.style.pointerEvents = 'none';
      document.body.appendChild(confetti);
      confettiElements.push(confetti);

      const duration = Math.random() * 3 + 2;
      const endX = (Math.random() - 0.5) * 200;
      
      confetti.animate([
        { transform: `translateY(0) translateX(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(${window.innerHeight + 50}px) translateX(${endX}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
    }

    // Cleanup
    return () => {
      confettiElements.forEach(el => el.remove());
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="flex justify-center mb-6"
        >
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-full shadow-xl">
            <Trophy className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-orange-600 mb-4"
        >
          🎉 Winner! 🎉
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-4 shadow-lg border-4 border-white flex items-center justify-center"
            style={{ backgroundColor: winner.color }}
          >
            <span className="text-white text-2xl">{winner.id}</span>
          </div>
          <h2 className="text-gray-800 mb-2">{winner.name}</h2>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Final Cash</p>
            <p className="text-2xl text-orange-600">₹{winner.cash.toLocaleString()}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-3"
        >
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-1">Properties Owned</p>
            <p className="text-xl text-teal-600">{winner.properties.length}</p>
          </div>

          <p className="text-gray-600 text-sm italic">
            "Victory belongs to those who believe in it the most!"
          </p>

          <button
            onClick={onBackToHome}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
