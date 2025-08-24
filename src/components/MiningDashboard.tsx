import { useState, useEffect } from "react";
import { MiningButton } from "./MiningButton";
import { StatsCard } from "./StatsCard";
import { CoinDisplay } from "./CoinDisplay";
import { toast } from "sonner";

export const MiningDashboard = () => {
  const [coins, setCoins] = useState(0);
  const [miningRate, setMiningRate] = useState(1);
  const [totalMined, setTotalMined] = useState(0);
  const [energyUsed, setEnergyUsed] = useState(0);
  const [isAutoMining, setIsAutoMining] = useState(false);
  const [upgrades, setUpgrades] = useState({
    pickaxe: 1,
    processor: 1,
    cooler: 1
  });

  // Auto mining effect
  useEffect(() => {
    if (isAutoMining) {
      const interval = setInterval(() => {
        const mineAmount = miningRate * 0.5;
        setCoins(prev => prev + mineAmount);
        setTotalMined(prev => prev + mineAmount);
        setEnergyUsed(prev => prev + 0.1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAutoMining, miningRate]);

  const handleMine = () => {
    const mineAmount = miningRate + Math.random() * 2;
    setCoins(prev => prev + mineAmount);
    setTotalMined(prev => prev + mineAmount);
    setEnergyUsed(prev => prev + 0.2);
    
    toast.success(`تم تعدين ${mineAmount.toFixed(2)} عملة!`, {
      duration: 2000,
    });
  };

  const handleUpgrade = (type: keyof typeof upgrades) => {
    const cost = upgrades[type] * 10;
    if (coins >= cost) {
      setCoins(prev => prev - cost);
      setUpgrades(prev => ({
        ...prev,
        [type]: prev[type] + 1
      }));
      setMiningRate(prev => prev + 0.5);
      
      toast.success(`تم ترقية ${type === 'pickaxe' ? 'المعول' : type === 'processor' ? 'المعالج' : 'المبرد'}!`);
    } else {
      toast.error("عملات غير كافية للترقية!");
    }
  };

  const toggleAutoMining = () => {
    if (!isAutoMining && coins >= 50) {
      setCoins(prev => prev - 50);
      setIsAutoMining(true);
      toast.success("تم تفعيل التعدين التلقائي!");
    } else if (isAutoMining) {
      setIsAutoMining(false);
      toast.info("تم إيقاف التعدين التلقائي");
    } else {
      toast.error("تحتاج 50 عملة لتفعيل التعدين التلقائي!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Coin Display */}
      <div className="mb-8">
        <CoinDisplay coins={coins} />
      </div>

      {/* Mining Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card">
            <h2 className="text-2xl font-bold text-center mb-6 text-neon-blue">
              مركز التعدين
            </h2>
            <MiningButton onClick={handleMine} isAutoMining={isAutoMining} />
            
            <div className="mt-6">
              <button
                onClick={toggleAutoMining}
                className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 ${
                  isAutoMining 
                    ? 'bg-destructive text-destructive-foreground shadow-glow-orange' 
                    : 'bg-gradient-primary text-primary-foreground shadow-glow-blue hover:scale-105'
                }`}
              >
                {isAutoMining ? 'إيقاف التعدين التلقائي' : 'تفعيل التعدين التلقائي (50 عملة)'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          <StatsCard
            title="معدل التعدين"
            value={`${miningRate.toFixed(1)} عملة/ثانية`}
            icon="⚡"
            color="neon-green"
          />
          <StatsCard
            title="إجمالي العملات المُعدنة"
            value={totalMined.toFixed(1)}
            icon="💎"
            color="neon-blue"
          />
          <StatsCard
            title="استهلاك الطاقة"
            value={`${energyUsed.toFixed(1)} كيلوواط`}
            icon="🔋"
            color="neon-orange"
          />
        </div>
      </div>

      {/* Upgrades Section */}
      <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card">
        <h2 className="text-2xl font-bold text-center mb-6 text-neon-orange">
          الترقيات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted p-6 rounded-xl border border-border">
            <div className="text-center">
              <div className="text-4xl mb-3">⛏️</div>
              <h3 className="text-lg font-bold text-neon-green">المعول المتقدم</h3>
              <p className="text-sm text-muted-foreground mb-4">المستوى {upgrades.pickaxe}</p>
              <button
                onClick={() => handleUpgrade('pickaxe')}
                className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
              >
                ترقية ({upgrades.pickaxe * 10} عملة)
              </button>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-xl border border-border">
            <div className="text-center">
              <div className="text-4xl mb-3">🖥️</div>
              <h3 className="text-lg font-bold text-neon-blue">معالج قوي</h3>
              <p className="text-sm text-muted-foreground mb-4">المستوى {upgrades.processor}</p>
              <button
                onClick={() => handleUpgrade('processor')}
                className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
              >
                ترقية ({upgrades.processor * 10} عملة)
              </button>
            </div>
          </div>

          <div className="bg-muted p-6 rounded-xl border border-border">
            <div className="text-center">
              <div className="text-4xl mb-3">❄️</div>
              <h3 className="text-lg font-bold text-neon-orange">نظام تبريد</h3>
              <p className="text-sm text-muted-foreground mb-4">المستوى {upgrades.cooler}</p>
              <button
                onClick={() => handleUpgrade('cooler')}
                className="w-full py-2 px-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors"
              >
                ترقية ({upgrades.cooler * 10} عملة)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};