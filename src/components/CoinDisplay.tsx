import { useEffect, useState } from "react";

interface CoinDisplayProps {
  coins: number;
}

export const CoinDisplay = ({ coins }: CoinDisplayProps) => {
  const [displayCoins, setDisplayCoins] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    if (coins > displayCoins) {
      setIsIncreasing(true);
      const increment = (coins - displayCoins) / 20;
      const timer = setInterval(() => {
        setDisplayCoins(prev => {
          const next = prev + increment;
          if (next >= coins) {
            clearInterval(timer);
            setIsIncreasing(false);
            return coins;
          }
          return next;
        });
      }, 50);

      return () => clearInterval(timer);
    } else {
      setDisplayCoins(coins);
    }
  }, [coins, displayCoins]);

  return (
    <div className="text-center">
      <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card max-w-md mx-auto">
        <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
          <div className={`text-6xl ${isIncreasing ? 'animate-coin-bounce' : 'animate-pulse-glow'}`}>
            🌟
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">رصيد NAYTROX</p>
            <p className={`text-4xl font-bold ${isIncreasing ? 'text-neon-green animate-pulse' : 'text-neon-blue'} transition-colors duration-300`}>
              {displayCoins.toFixed(1)}
            </p>
            <p className="text-sm text-cyber-purple font-bold">NAYTROX</p>
          </div>
        </div>
        
        {/* Progress bar for visual appeal */}
        <div className="mt-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 bg-gradient-mining rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min((displayCoins % 100), 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            التقدم نحو العلامة التالية: {Math.floor(displayCoins % 100)}/100
          </p>
        </div>
      </div>
    </div>
  );
};