import { Property } from '../App';
import { Building2, IndianRupee, X } from 'lucide-react';

interface TransactionDialogProps {
  property: Property;
  playerCash: number;
  onAction: (action: 'buy' | 'pass') => void;
  onClose: () => void;
}

export function TransactionDialog({ property, playerCash, onAction, onClose }: TransactionDialogProps) {
  const canAfford = playerCash >= property.price;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div 
          className="p-6 text-white relative"
          style={{ backgroundColor: property.color }}
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8" />
            <h2 className="text-white">Property Available</h2>
          </div>
          <h3 className="text-white text-xl">{property.name}</h3>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <span className="text-gray-600">Purchase Price</span>
              <div className="flex items-center gap-1 text-orange-600">
                <IndianRupee className="w-5 h-5" />
                <span>{property.price.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
              <span className="text-gray-600">Rent Income</span>
              <div className="flex items-center gap-1 text-teal-600">
                <IndianRupee className="w-5 h-5" />
                <span>{property.rent.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl">
              <span className="text-gray-700">Your Cash</span>
              <div className="flex items-center gap-1 text-orange-600">
                <IndianRupee className="w-5 h-5" />
                <span>{playerCash.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {!canAfford && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mb-4 text-sm text-center">
              ⚠️ Insufficient funds to purchase this property
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onAction('pass')}
              className="bg-gray-200 text-gray-700 py-4 rounded-xl active:scale-95 transition-transform"
            >
              Pass
            </button>
            <button
              onClick={() => onAction('buy')}
              disabled={!canAfford}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 rounded-xl active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buy Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
