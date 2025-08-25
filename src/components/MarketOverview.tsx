import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Zap, 
  Coins, 
  Globe, 
  Activity,
  Shield,
  Clock,
  Award
} from "lucide-react";

export const MarketOverview = () => {
  const marketStats = [
    {
      icon: <Users className="w-5 h-5" />,
      label: "المعدنين النشطين",
      value: "12,847",
      change: "+5.2%",
      color: "text-green-400"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: "معدل التعدين العالمي",
      value: "2.4 TH/s",
      change: "+12.8%",
      color: "text-blue-400"
    },
    {
      icon: <Coins className="w-5 h-5" />,
      label: "إجمالي NAYTROX المتداول",
      value: "8.5M",
      change: "+2.1%",
      color: "text-purple-400"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: "الشبكة العالمية",
      value: "64 دولة",
      change: "+3 جديد",
      color: "text-orange-400"
    }
  ];

  const networkHealth = [
    { label: "الأمان", value: 98, color: "bg-green-500" },
    { label: "السرعة", value: 94, color: "bg-blue-500" },
    { label: "الاستقرار", value: 96, color: "bg-purple-500" },
    { label: "الكفاءة", value: 91, color: "bg-orange-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Market Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketStats.map((stat, index) => (
          <Card key={index} className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      {stat.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
                <Badge className={`${stat.color} bg-transparent border-current`}>
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Health */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Activity className="w-5 h-5 text-primary" />
            حالة الشبكة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkHealth.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">الأمان المتقدم</p>
                <p className="text-xs text-muted-foreground">تشفير عسكري 256-bit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">تعدين 24/7</p>
                <p className="text-xs text-muted-foreground">لا توقف في الخدمة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Award className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">مكافآت فورية</p>
                <p className="text-xs text-muted-foreground">استلام فوري للعملات</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};