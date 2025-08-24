import { useState } from "react";

interface MiningButtonProps {
  onClick: () => void;
  isAutoMining: boolean;
}

export const MiningButton = ({ onClick, isAutoMining }: MiningButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    setTimeout(() => setIsClicked(false), 200);
  };

  return (
    <div className="relative flex justify-center">
      <button
        onClick={handleClick}
        disabled={isAutoMining}
        className={`
          relative w-48 h-48 rounded-full font-bold text-xl
          transition-all duration-300 transform-gpu
          ${isAutoMining 
            ? 'bg-gradient-mining animate-mining-pulse cursor-not-allowed opacity-75' 
            : 'bg-gradient-primary hover:scale-110 active:scale-95 shadow-glow-blue hover:shadow-glow-green'
          }
          ${isClicked ? 'animate-coin-bounce' : ''}
          disabled:hover:scale-100
        `}
      >
        <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse"></div>
        <span className="relative z-10 text-white drop-shadow-lg">
          {isAutoMining ? (
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">⚡</span>
              <span className="text-sm">تعدين تلقائي</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-4xl mb-2">⛏️</span>
              <span className="text-sm">اضغط للتعدين</span>
            </div>
          )}
        </span>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
        
        {/* Ripple effect on click */}
        {isClicked && (
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
        )}
      </button>
      
      {/* Floating particles effect */}
      {isAutoMining && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-neon-green rounded-full animate-pulse"
              style={{
                left: `${30 + i * 20}%`,
                top: `${20 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};