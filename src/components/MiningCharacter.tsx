import { useState } from "react";
import miningCharacter from "@/assets/mining-character.png";

interface MiningCharacterProps {
  onMine: () => void;
  isAutoMining: boolean;
}

export const MiningCharacter = ({ onMine, isAutoMining }: MiningCharacterProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      onMine();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        {/* Character Glow Effect */}
        <div 
          className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 ${
            isAutoMining 
              ? 'bg-neon-green animate-pulse' 
              : 'bg-neon-blue hover:bg-cyber-purple'
          }`}
          style={{ 
            width: '120%', 
            height: '120%', 
            left: '-10%', 
            top: '-10%',
            opacity: 0.6 
          }}
        />
        
        {/* Character Image */}
        <div
          onClick={handleClick}
          className={`relative cursor-pointer transition-all duration-300 transform hover:scale-110 ${
            isAnimating ? 'animate-mining-pulse scale-95' : ''
          } ${isAutoMining ? 'animate-pulse-glow' : ''}`}
        >
          <img
            src={miningCharacter}
            alt="NAYTROX Mining Character"
            className={`w-48 h-48 rounded-full border-4 transition-all duration-300 ${
              isAutoMining 
                ? 'border-neon-green shadow-glow-green' 
                : 'border-neon-blue shadow-glow-blue hover:border-cyber-purple hover:shadow-[0_0_30px_hsl(var(--cyber-purple)/0.8)]'
            }`}
          />
          
          {/* Click Effect */}
          {isAnimating && (
            <div className="absolute inset-0 rounded-full border-4 border-neon-green animate-ping opacity-75" />
          )}
          
          {/* Mining Status Indicator */}
          <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-background transition-all duration-300 ${
            isAutoMining ? 'bg-neon-green animate-pulse' : 'bg-muted'
          }`} />
        </div>
      </div>
      
      {/* Character Info */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          محارب NAYTROX
        </h3>
        <p className="text-sm text-muted-foreground">
          {isAutoMining ? '🤖 التعدين التلقائي نشط' : '👆 انقر للتعدين'}
        </p>
        <div className="flex items-center justify-center space-x-2 text-xs text-neon-green">
          <span>⚡ جاهز للتعدين</span>
        </div>
      </div>
    </div>
  );
};