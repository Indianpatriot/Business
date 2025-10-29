import { useState, useEffect } from 'react';
import { Player, Property } from '../App';
import { PlayerInfoPanel } from './PlayerInfoPanel';
import { TransactionDialog } from './TransactionDialog';
import { ChanceCard } from './ChanceCard';
import { JailOverlay } from './JailOverlay';
import { WinnerScreen } from './WinnerScreen';
import { Home, Dices } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface GameBoardProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  currentPlayer: number;
  setCurrentPlayer: (player: number) => void;
  onBackToHome: () => void;
}

const INITIAL_PROPERTIES: Property[] = [
  // Top Row (10 spaces)
  { id: 'start', name: 'Start', price: 0, rent: 0, color: '#10B981' },
  { id: 'mumbai', name: 'Mumbai', price: 6000, rent: 600, color: '#6B7280' },
  { id: 'pune', name: 'Pune', price: 4500, rent: 450, color: '#6B7280' },
  { id: 'nashik', name: 'Nashik', price: 3500, rent: 350, color: '#6B7280' },
  { id: 'chance1', name: 'Chance', price: 0, rent: 0, color: '#F59E0B' },
  { id: 'goa', name: 'Goa', price: 5000, rent: 500, color: '#6B7280' },
  { id: 'surat', name: 'Surat', price: 4000, rent: 400, color: '#6B7280' },
  { id: 'tax1', name: 'GST Tax', price: 0, rent: 2000, color: '#8B5CF6' },
  { id: 'rajkot', name: 'Rajkot', price: 3000, rent: 300, color: '#6B7280' },
  { id: 'ahmedabad', name: 'Ahmedabad', price: 5500, rent: 550, color: '#6B7280' },
  
  // Right Column (10 spaces)
  { id: 'jaipur', name: 'Jaipur', price: 5000, rent: 500, color: '#6B7280' },
  { id: 'udaipur', name: 'Udaipur', price: 4500, rent: 450, color: '#6B7280' },
  { id: 'chance2', name: 'Chance', price: 0, rent: 0, color: '#F59E0B' },
  { id: 'lucknow', name: 'Lucknow', price: 4000, rent: 400, color: '#6B7280' },
  { id: 'kanpur', name: 'Kanpur', price: 3500, rent: 350, color: '#6B7280' },
  { id: 'tax2', name: 'Income Tax', price: 0, rent: 3000, color: '#8B5CF6' },
  { id: 'varanasi', name: 'Varanasi', price: 4500, rent: 450, color: '#6B7280' },
  { id: 'patna', name: 'Patna', price: 3000, rent: 300, color: '#6B7280' },
  { id: 'chance3', name: 'Chance', price: 0, rent: 0, color: '#F59E0B' },
  { id: 'parking', name: 'Free Parking', price: 0, rent: 0, color: '#10B981' },
  
  // Bottom Row (10 spaces - reversed)
  { id: 'kolkata', name: 'Kolkata', price: 6500, rent: 650, color: '#6B7280' },
  { id: 'bhubaneswar', name: 'Bhubaneswar', price: 3500, rent: 350, color: '#6B7280' },
  { id: 'tax3', name: 'Property Tax', price: 0, rent: 2500, color: '#8B5CF6' },
  { id: 'guwahati', name: 'Guwahati', price: 3000, rent: 300, color: '#6B7280' },
  { id: 'ranchi', name: 'Ranchi', price: 3000, rent: 300, color: '#6B7280' },
  { id: 'chance4', name: 'Chance', price: 0, rent: 0, color: '#F59E0B' },
  { id: 'visakhapatnam', name: 'Visakhapatnam', price: 4000, rent: 400, color: '#6B7280' },
  { id: 'vijayawada', name: 'Vijayawada', price: 3500, rent: 350, color: '#6B7280' },
  { id: 'tax4', name: 'Customs Tax', price: 0, rent: 2000, color: '#8B5CF6' },
  { id: 'hyderabad', name: 'Hyderabad', price: 6000, rent: 600, color: '#6B7280' },
  
  // Left Column (10 spaces - reversed)
  { id: 'bengaluru', name: 'Bengaluru', price: 7000, rent: 700, color: '#6B7280' },
  { id: 'mysuru', name: 'Mysuru', price: 4000, rent: 400, color: '#6B7280' },
  { id: 'chance5', name: 'Chance', price: 0, rent: 0, color: '#F59E0B' },
  { id: 'chennai', name: 'Chennai', price: 6500, rent: 650, color: '#6B7280' },
  { id: 'coimbatore', name: 'Coimbatore', price: 4000, rent: 400, color: '#6B7280' },
  { id: 'tax5', name: 'Luxury Tax', price: 0, rent: 3500, color: '#8B5CF6' },
  { id: 'kochi', name: 'Kochi', price: 5000, rent: 500, color: '#6B7280' },
  { id: 'thiruvananthapuram', name: 'Trivandrum', price: 4000, rent: 400, color: '#6B7280' },
  { id: 'mangalore', name: 'Mangalore', price: 3500, rent: 350, color: '#6B7280' },
  { id: 'jail', name: 'Go to Jail', price: 0, rent: 0, color: '#EF4444' },
];

export function GameBoard({ players, setPlayers, currentPlayer, setCurrentPlayer, onBackToHome }: GameBoardProps) {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showChanceCard, setShowChanceCard] = useState(false);
  const [showJail, setShowJail] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  const [chanceCardData, setChanceCardData] = useState({ title: '', amount: 0 });
  const [diceRoll, setDiceRoll] = useState<number[]>([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [winner, setWinner] = useState<Player | null>(null);

  // Check for losers (negative balance)
  useEffect(() => {
    const activePlayers = players.filter(p => p.cash >= 0);
    if (activePlayers.length === 1 && players.length > 1) {
      setWinner(activePlayers[0]);
      toast.success(`${activePlayers[0].name} wins the game!`);
    } else if (activePlayers.length === 0 && players.length > 0) {
      // Find the player with highest cash (least negative)
      const bestPlayer = [...players].sort((a, b) => b.cash - a.cash)[0];
      setWinner(bestPlayer);
    }
  }, [players]);

  const rollDice = () => {
    if (isRolling) return;
    
    setIsRolling(true);
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    setDiceRoll([dice1, dice2]);
    
    setTimeout(() => {
      const total = dice1 + dice2;
      const player = players[currentPlayer];
      
      if (player.inJail) {
        if (dice1 === dice2) {
          toast.success('Rolled doubles! You\'re free!');
          const updatedPlayers = [...players];
          updatedPlayers[currentPlayer].inJail = false;
          updatedPlayers[currentPlayer].jailTurns = 0;
          setPlayers(updatedPlayers);
          movePlayer(total);
        } else {
          const updatedPlayers = [...players];
          updatedPlayers[currentPlayer].jailTurns++;
          if (updatedPlayers[currentPlayer].jailTurns >= 3) {
            toast.info('Pay ₹2,500 to get out of jail');
            setShowJail(true);
          } else {
            toast.info(`Failed to roll doubles. ${3 - updatedPlayers[currentPlayer].jailTurns} attempts left.`);
            setPlayers(updatedPlayers);
            nextPlayer();
          }
        }
      } else {
        movePlayer(total);
      }
      
      setIsRolling(false);
    }, 600);
  };

  const movePlayer = (steps: number) => {
    const updatedPlayers = [...players];
    const oldPosition = updatedPlayers[currentPlayer].position;
    const newPosition = (oldPosition + steps) % properties.length;
    updatedPlayers[currentPlayer].position = newPosition;
    
    if (newPosition < oldPosition) {
      updatedPlayers[currentPlayer].cash += 3500;
      toast.success('Passed Start! Collect ₹3,500');
    }
    
    setPlayers(updatedPlayers);
    handleLanding(newPosition);
  };

  const handleLanding = (position: number) => {
    const property = properties[position];
    
    if (property.name === 'Chance') {
      const chanceCards = [
        { title: 'Trade Deal Success!', amount: 2000 },
        { title: 'Tax Refund Received', amount: 3000 },
        { title: 'Government Bonus', amount: 4000 },
        { title: 'Export Success', amount: 5000 },
        { title: 'Property Tax Due', amount: -2500 },
        { title: 'Repair Buildings', amount: -2000 },
        { title: 'Business Loss', amount: -3000 },
        { title: 'Fine for Violation', amount: -1500 },
      ];
      const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
      setChanceCardData(card);
      
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer].cash += card.amount;
      setPlayers(updatedPlayers);
      setShowChanceCard(true);
    } else if (property.name.includes('Tax')) {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer].cash -= property.rent;
      setPlayers(updatedPlayers);
      toast.error(`Paid ${property.name}: ₹${property.rent}`);
      setTimeout(() => nextPlayer(), 1500);
    } else if (property.name === 'Go to Jail') {
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayer].inJail = true;
      updatedPlayers[currentPlayer].position = 39;
      setPlayers(updatedPlayers);
      setShowJail(true);
    } else if (property.price > 0) {
      const owner = players.find(p => p.properties.includes(property.id));
      if (owner && owner.id !== players[currentPlayer].id) {
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayer].cash -= property.rent;
        const ownerIndex = players.findIndex(p => p.id === owner.id);
        updatedPlayers[ownerIndex].cash += property.rent;
        setPlayers(updatedPlayers);
        toast.error(`Paid ₹${property.rent} rent to ${owner.name}`);
        setTimeout(() => nextPlayer(), 1500);
      } else if (!owner) {
        setCurrentProperty(property);
        setShowTransaction(true);
      } else {
        setTimeout(() => nextPlayer(), 1000);
      }
    } else {
      setTimeout(() => nextPlayer(), 1000);
    }
  };

  const nextPlayer = () => {
    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  const handleTransaction = (action: 'buy' | 'pass') => {
    if (action === 'buy' && currentProperty) {
      const updatedPlayers = [...players];
      if (updatedPlayers[currentPlayer].cash >= currentProperty.price) {
        updatedPlayers[currentPlayer].cash -= currentProperty.price;
        updatedPlayers[currentPlayer].properties.push(currentProperty.id);
        setPlayers(updatedPlayers);
        
        // Update property color to player's color
        const updatedProperties = properties.map(prop => 
          prop.id === currentProperty.id 
            ? { ...prop, color: players[currentPlayer].color, owner: players[currentPlayer].id }
            : prop
        );
        setProperties(updatedProperties);
        
        toast.success(`Purchased ${currentProperty.name}!`);
      } else {
        toast.error('Not enough cash!');
      }
    }
    setShowTransaction(false);
    setTimeout(() => nextPlayer(), 500);
  };

  const handleJailPayment = () => {
    const updatedPlayers = [...players];
    if (updatedPlayers[currentPlayer].cash >= 2500) {
      updatedPlayers[currentPlayer].cash -= 2500;
      updatedPlayers[currentPlayer].inJail = false;
      updatedPlayers[currentPlayer].jailTurns = 0;
      setPlayers(updatedPlayers);
      toast.success('Paid ₹2,500 - You\'re free!');
      setShowJail(false);
      nextPlayer();
    } else {
      toast.error('Not enough cash!');
    }
  };

  if (winner) {
    return <WinnerScreen winner={winner} onBackToHome={onBackToHome} />;
  }

  return (
    <div className="min-h-screen flex flex-col p-2 pb-3">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={onBackToHome}
          className="bg-white p-2 rounded-xl shadow-md active:scale-95 transition-transform"
        >
          <Home className="w-4 h-4 text-teal-600" />
        </button>
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xs">{players[currentPlayer].name}'s Turn</span>
        </div>
        <div className="w-8"></div>
      </div>

      {/* Game Board */}
      <div className="flex-1 flex items-center justify-center mb-2">
        <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-teal-100 to-cyan-100 rounded-2xl shadow-2xl p-1.5">
          {/* Board Border with Properties */}
          <div className="absolute inset-1.5 border-2 border-white rounded-xl overflow-hidden">
            {/* Top Row - 10 spaces */}
            <div className="absolute top-0 left-0 right-0 h-[10%] flex">
              {properties.slice(0, 10).map((prop, idx) => (
                <PropertyTile 
                  key={prop.id}
                  property={prop}
                  position={idx}
                  players={players}
                />
              ))}
            </div>

            {/* Right Column - 10 spaces (excluding top-right corner) */}
            <div className="absolute top-[10%] right-0 bottom-[10%] w-[10%] flex flex-col">
              {properties.slice(10, 19).map((prop, idx) => (
                <PropertyTile 
                  key={prop.id}
                  property={prop}
                  position={idx + 10}
                  players={players}
                  vertical
                />
              ))}
            </div>

            {/* Bottom Row - 10 spaces (reversed) */}
            <div className="absolute bottom-0 left-0 right-0 h-[10%] flex flex-row-reverse">
              {properties.slice(20, 30).map((prop, idx) => (
                <PropertyTile 
                  key={prop.id}
                  property={prop}
                  position={idx + 20}
                  players={players}
                />
              ))}
            </div>

            {/* Left Column - 10 spaces (excluding corners, reversed) */}
            <div className="absolute top-[10%] left-0 bottom-[10%] w-[10%] flex flex-col-reverse">
              {properties.slice(30, 39).map((prop, idx) => (
                <PropertyTile 
                  key={prop.id}
                  property={prop}
                  position={idx + 30}
                  players={players}
                  vertical
                />
              ))}
            </div>

            {/* Center Area */}
            <div className="absolute inset-[10%] bg-white/95 rounded-lg flex flex-col items-center justify-center p-2">
              <div className="text-center mb-2">
                <h3 className="text-orange-600 text-sm mb-1.5">🇮🇳 Bharat</h3>
                <div className="flex gap-1.5 justify-center mb-2">
                  <div 
                    className="w-9 h-9 rounded-lg shadow-lg flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: isRolling ? '#94A3B8' : '#FF6B35' }}
                  >
                    <span>{diceRoll[0]}</span>
                  </div>
                  <div 
                    className="w-9 h-9 rounded-lg shadow-lg flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: isRolling ? '#94A3B8' : '#4ECDC4' }}
                  >
                    <span>{diceRoll[1]}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={rollDice}
                disabled={isRolling}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-1.5 active:scale-95 transition-transform disabled:opacity-50 text-xs"
              >
                <Dices className="w-3.5 h-3.5" />
                <span>Roll</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Player Info Panel */}
      <PlayerInfoPanel 
        players={players}
        currentPlayer={currentPlayer}
        properties={properties}
      />

      {/* Dialogs */}
      {showTransaction && currentProperty && (
        <TransactionDialog
          property={currentProperty}
          playerCash={players[currentPlayer].cash}
          onAction={handleTransaction}
          onClose={() => {
            setShowTransaction(false);
            nextPlayer();
          }}
        />
      )}

      {showChanceCard && (
        <ChanceCard
          title={chanceCardData.title}
          amount={chanceCardData.amount}
          onClose={() => {
            setShowChanceCard(false);
            nextPlayer();
          }}
        />
      )}

      {showJail && (
        <JailOverlay
          onPayFine={handleJailPayment}
          onClose={() => {
            setShowJail(false);
            nextPlayer();
          }}
          playerCash={players[currentPlayer].cash}
        />
      )}
    </div>
  );
}

interface PropertyTileProps {
  property: Property;
  position: number;
  players: Player[];
  vertical?: boolean;
}

function PropertyTile({ property, position, players, vertical }: PropertyTileProps) {
  const playersHere = players.filter(p => p.position === position);
  const isOwned = property.owner !== undefined;
  
  return (
    <div 
      className={`flex-1 border border-white relative ${vertical ? 'border-t' : 'border-l'}`}
      style={{ 
        backgroundColor: isOwned ? property.color : property.color + '50',
        transition: 'background-color 0.3s ease'
      }}
    >
      <div className={`h-full w-full p-0.5 flex flex-col ${vertical ? 'items-center' : 'items-center'}`}>
        <div className="text-[8px] text-center truncate px-0.5 leading-tight" style={{ fontSize: '0.4rem', lineHeight: '0.5rem' }}>
          {property.name.length > 8 ? property.name.substring(0, 7) + '.' : property.name}
        </div>
        {property.price > 0 && (
          <div className="text-[7px] text-center" style={{ fontSize: '0.38rem' }}>
            ₹{property.price >= 1000 ? `${property.price/1000}k` : property.price}
          </div>
        )}
      </div>
      
      {/* Player markers */}
      {playersHere.length > 0 && (
        <div className="absolute bottom-0.5 left-0 right-0 flex gap-0.5 flex-wrap justify-center px-0.5">
          {playersHere.map(p => (
            <motion.div 
              key={p.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-2 h-2 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: p.color }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
