import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface EnergySystemProps {
  currentEnergy: number;
  maxEnergy: number;
  onEnergyChange: (energy: number) => void;
}

export const EnergySystem = ({ currentEnergy, maxEnergy, onEnergyChange }: EnergySystemProps) => {
  const [lastRegenTime, setLastRegenTime] = useState(Date.now());

  // تجديد الطاقة كل دقيقة
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeDiff = now - lastRegenTime;
      const minutesPassed = Math.floor(timeDiff / 60000);
      
      if (minutesPassed > 0 && currentEnergy < maxEnergy) {
        const newEnergy = Math.min(currentEnergy + minutesPassed, maxEnergy);
        onEnergyChange(newEnergy);
        setLastRegenTime(now);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [currentEnergy, maxEnergy, lastRegenTime, onEnergyChange]);

  const energyPercentage = (currentEnergy / maxEnergy) * 100;
  const energyColor = energyPercentage > 50 ? 'neon-green' : energyPercentage > 20 ? 'neon-orange' : 'destructive';

  return (
    <Card className="p-4 bg-gradient-card border-border">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-2xl">⚡</span>
            <h3 className="font-bold text-neon-blue">الطاقة</h3>
          </div>
          <span className={`font-bold text-${energyColor}`}>
            {currentEnergy}/{maxEnergy}
          </span>
        </div>
        
        <Progress 
          value={energyPercentage} 
          className="h-3"
        />
        
        <div className="text-sm text-muted-foreground text-center">
          {currentEnergy < maxEnergy ? (
            <>
              <div className="flex items-center justify-center space-x-1 rtl:space-x-reverse">
                <span>🔄</span>
                <span>تجديد الطاقة: +1 كل دقيقة</span>
              </div>
            </>
          ) : (
            <div className="text-neon-green">الطاقة ممتلئة! 💪</div>
          )}
        </div>
        
        {currentEnergy === 0 && (
          <div className="bg-destructive/20 border border-destructive/50 rounded-lg p-3 text-center">
            <span className="text-destructive text-sm font-bold">
              ⚠️ لا توجد طاقة كافية للتعدين! انتظر دقيقة للتجديد
            </span>
          </div>
        )}
      </div>
    </Card>
  );
};