import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MiningStatsProps {
  totalMined: number;
  miningRate: number;
  energyUsed: number;
  timeSpent: number;
  bestStreak: number;
  currentStreak: number;
}

export const MiningStats = ({ 
  totalMined, 
  miningRate, 
  energyUsed, 
  timeSpent, 
  bestStreak, 
  currentStreak 
}: MiningStatsProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}س ${minutes}د`;
    } else if (minutes > 0) {
      return `${minutes}د ${secs}ث`;
    } else {
      return `${secs}ث`;
    }
  };

  const efficiency = energyUsed > 0 ? (totalMined / energyUsed).toFixed(2) : "0";
  const avgPerHour = timeSpent > 0 ? ((totalMined / timeSpent) * 3600).toFixed(1) : "0";

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-neon-blue">إحصائيات التعدين</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* إجمالي المعدّن */}
        <Card className="p-4 bg-gradient-card border-border hover:scale-105 transition-transform">
          <div className="text-center space-y-2">
            <div className="text-3xl">💎</div>
            <h3 className="font-bold text-neon-green">إجمالي المعدّن</h3>
            <p className="text-2xl font-bold text-neon-green">{totalMined.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">NAYTROX</p>
          </div>
        </Card>

        {/* معدل التعدين */}
        <Card className="p-4 bg-gradient-card border-border hover:scale-105 transition-transform">
          <div className="text-center space-y-2">
            <div className="text-3xl animate-pulse">⚡</div>
            <h3 className="font-bold text-neon-blue">معدل التعدين</h3>
            <p className="text-2xl font-bold text-neon-blue">{miningRate.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">NAYTROX/ثانية</p>
          </div>
        </Card>

        {/* الكفاءة */}
        <Card className="p-4 bg-gradient-card border-border hover:scale-105 transition-transform">
          <div className="text-center space-y-2">
            <div className="text-3xl">📊</div>
            <h3 className="font-bold text-neon-orange">الكفاءة</h3>
            <p className="text-2xl font-bold text-neon-orange">{efficiency}</p>
            <p className="text-sm text-muted-foreground">NAYTROX/كيلوواط</p>
          </div>
        </Card>

        {/* المعدل بالساعة */}
        <Card className="p-4 bg-gradient-card border-border hover:scale-105 transition-transform">
          <div className="text-center space-y-2">
            <div className="text-3xl">🕒</div>
            <h3 className="font-bold text-cyber-purple">المعدل/ساعة</h3>
            <p className="text-2xl font-bold text-cyber-purple">{avgPerHour}</p>
            <p className="text-sm text-muted-foreground">NAYTROX/ساعة</p>
          </div>
        </Card>

        {/* وقت التعدين */}
        <Card className="p-4 bg-gradient-card border-border hover:scale-105 transition-transform">
          <div className="text-center space-y-2">
            <div className="text-3xl">⏱️</div>
            <h3 className="font-bold text-neon-green">وقت التعدين</h3>
            <p className="text-xl font-bold text-neon-green">{formatTime(timeSpent)}</p>
            <p className="text-sm text-muted-foreground">إجمالي الوقت</p>
          </div>
        </Card>

        {/* السلسلة الحالية */}
        <Card className="p-4 bg-gradient-card border-border hover:scale-105 transition-transform">
          <div className="text-center space-y-2">
            <div className="text-3xl">🔥</div>
            <h3 className="font-bold text-neon-orange">السلسلة الحالية</h3>
            <p className="text-2xl font-bold text-neon-orange">{currentStreak}</p>
            <p className="text-sm text-muted-foreground">يوم متتالي</p>
          </div>
        </Card>
      </div>

      {/* تقدم السلسلة */}
      <Card className="p-4 bg-gradient-card border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-neon-blue">تقدم السلسلة</h3>
            <span className="text-sm text-muted-foreground">
              {currentStreak}/{Math.max(bestStreak, currentStreak + 1)}
            </span>
          </div>
          <Progress 
            value={(currentStreak / Math.max(bestStreak, currentStreak + 1)) * 100} 
            className="h-3"
          />
          <div className="text-center text-sm">
            <span className="text-neon-green">أفضل سلسلة: {bestStreak} يوم</span>
          </div>
        </div>
      </Card>

      {/* طاقة مستهلكة */}
      <Card className="p-4 bg-gradient-card border-border">
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
            <span className="text-2xl">🔋</span>
            <h3 className="font-bold text-neon-orange">إجمالي الطاقة المستهلكة</h3>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-neon-orange">{energyUsed.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">كيلوواط</p>
          </div>
          
          {/* شريط التقدم للطاقة */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>التقدم نحو هدف الطاقة</span>
              <span>{Math.floor(energyUsed % 100)}/100</span>
            </div>
            <Progress 
              value={(energyUsed % 100)} 
              className="h-2"
            />
            <p className="text-xs text-center text-muted-foreground">
              كل 100 كيلوواط = مكافأة إضافية!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};