import { useState, useEffect } from "react";
import { MiningButton } from "./MiningButton";
import { MiningCharacter } from "./MiningCharacter";
import { StatsCard } from "./StatsCard";
import { CoinDisplay } from "./CoinDisplay";
import { AchievementSystem } from "./AchievementSystem";
import { EnergySystem } from "./EnergySystem";
import { DailyTasks } from "./DailyTasks";
import { MiningStats } from "./MiningStats";
import { Leaderboard } from "./Leaderboard";
import { MinerWallet } from "./MinerWallet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const MiningDashboard = () => {
  const [coins, setCoins] = useState(0);
  const [miningRate, setMiningRate] = useState(1);
  const [totalMined, setTotalMined] = useState(0);
  const [energyUsed, setEnergyUsed] = useState(0);
  const [isAutoMining, setIsAutoMining] = useState(false);
  const [currentEnergy, setCurrentEnergy] = useState(100);
  const [maxEnergy] = useState(100);
  const [timeSpent, setTimeSpent] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [upgradesPurchased, setUpgradesPurchased] = useState(0);
  const [activeTab, setActiveTab] = useState("mining");
  const [upgrades, setUpgrades] = useState({
    pickaxe: 1,
    processor: 1,
    cooler: 1
  });

  // Auto mining effect
  useEffect(() => {
    if (isAutoMining && currentEnergy > 0) {
      const interval = setInterval(() => {
        const mineAmount = miningRate * 0.5;
        setCoins(prev => prev + mineAmount);
        setTotalMined(prev => prev + mineAmount);
        setEnergyUsed(prev => prev + 0.1);
        setCurrentEnergy(prev => Math.max(0, prev - 1));
        setTimeSpent(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAutoMining, miningRate, currentEnergy]);

  // تتبع الوقت المنقضي
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleMine = () => {
    if (currentEnergy <= 0) {
      toast.error("لا توجد طاقة كافية للتعدين!");
      return;
    }

    const mineAmount = miningRate + Math.random() * 2;
    setCoins(prev => prev + mineAmount);
    setTotalMined(prev => prev + mineAmount);
    setEnergyUsed(prev => prev + 0.2);
    setCurrentEnergy(prev => Math.max(0, prev - 2));
    
    toast.success(`تم تعدين ${mineAmount.toFixed(2)} NAYTROX!`, {
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
      setUpgradesPurchased(prev => prev + 1);
      
      toast.success(`تم ترقية ${type === 'pickaxe' ? 'المعول' : type === 'processor' ? 'المعالج' : 'المبرد'}!`);
    } else {
      toast.error("NAYTROX غير كافية للترقية!");
    }
  };

  const toggleAutoMining = () => {
    if (!isAutoMining && coins >= 50 && currentEnergy > 0) {
      setCoins(prev => prev - 50);
      setIsAutoMining(true);
      toast.success("تم تفعيل التعدين التلقائي!");
    } else if (isAutoMining) {
      setIsAutoMining(false);
      toast.info("تم إيقاف التعدين التلقائي");
    } else if (currentEnergy <= 0) {
      toast.error("لا توجد طaقة كافية لتفعيل التعدين التلقائي!");
    } else {
      toast.error("تحتاج 50 NAYTROX لتفعيل التعدين التلقائي!");
    }
  };

  const handleRewardClaim = (reward: number) => {
    setCoins(prev => prev + reward);
    toast.success(`تم استلام مكافأة: ${reward} NAYTROX!`);
  };

  const handleEnergyChange = (energy: number) => {
    setCurrentEnergy(energy);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Coin Display */}
      <div className="mb-8">
        <CoinDisplay coins={coins} />
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8 bg-gradient-card border-border">
          <TabsTrigger value="mining" className="data-[state=active]:bg-neon-blue data-[state=active]:text-dark-bg">
            ⛏️ التعدين
          </TabsTrigger>
          <TabsTrigger value="stats" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">
            📊 الإحصائيات
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:bg-neon-orange data-[state=active]:text-dark-bg">
            🎯 المهام
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-cyber-purple data-[state=active]:text-dark-bg">
            🏆 الإنجازات
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-neon-blue data-[state=active]:text-dark-bg">
            👑 المتصدرين
          </TabsTrigger>
          <TabsTrigger value="wallet" className="data-[state=active]:bg-neon-green data-[state=active]:text-dark-bg">
            💎 المحفظة
          </TabsTrigger>
        </TabsList>

        {/* Mining Tab */}
        <TabsContent value="mining" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="space-y-6">
              {/* Character Section */}
              <div className="bg-gradient-card p-8 rounded-2xl border border-border shadow-card card-hover">
                <h2 className="text-2xl font-bold text-center mb-6 text-neon-blue">
                  محارب التعدين
                </h2>
                <MiningCharacter onMine={handleMine} isAutoMining={isAutoMining} />
              </div>
              
              {/* Controls Section */}
              <div className="bg-gradient-card p-6 rounded-2xl border border-border shadow-card">
                <div className="space-y-4">
                  <MiningButton onClick={handleMine} isAutoMining={isAutoMining} />
                  
                  <button
                    onClick={toggleAutoMining}
                    disabled={currentEnergy <= 0}
                    className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      isAutoMining 
                        ? 'bg-destructive text-destructive-foreground shadow-glow-orange' 
                        : 'bg-gradient-primary text-primary-foreground shadow-glow-blue hover:scale-105'
                    }`}
                  >
                    {isAutoMining ? 'إيقاف التعدين التلقائي' : 'تفعيل التعدين التلقائي (50 NAYTROX)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Energy System */}
            <div>
              <EnergySystem 
                currentEnergy={currentEnergy}
                maxEnergy={maxEnergy}
                onEnergyChange={handleEnergyChange}
              />
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <StatsCard
                title="معدل التعدين"
                value={`${miningRate.toFixed(1)} NAYTROX/ثانية`}
                icon="⚡"
                color="neon-green"
              />
              <StatsCard
                title="إجمالي NAYTROX المُعدنة"
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
                    disabled={coins < upgrades.pickaxe * 10}
                    className="w-full py-2 px-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ترقية ({upgrades.pickaxe * 10} NAYTROX)
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
                    disabled={coins < upgrades.processor * 10}
                    className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ترقية ({upgrades.processor * 10} NAYTROX)
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
                    disabled={coins < upgrades.cooler * 10}
                    className="w-full py-2 px-4 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ترقية ({upgrades.cooler * 10} NAYTROX)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats">
          <MiningStats
            totalMined={totalMined}
            miningRate={miningRate}
            energyUsed={energyUsed}
            timeSpent={timeSpent}
            bestStreak={bestStreak}
            currentStreak={currentStreak}
          />
        </TabsContent>

        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <DailyTasks
            totalMined={totalMined}
            upgradesPurchased={upgradesPurchased}
            onRewardClaim={handleRewardClaim}
          />
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements">
          <AchievementSystem
            totalMined={totalMined}
            coins={coins}
            onRewardClaim={handleRewardClaim}
          />
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard">
          <Leaderboard
            currentUserCoins={coins}
            currentUserMined={totalMined}
          />
        </TabsContent>

        {/* Wallet Tab */}
        <TabsContent value="wallet">
          <MinerWallet
            coins={coins}
            totalMined={totalMined}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};