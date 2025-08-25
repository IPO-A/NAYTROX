import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

interface LeaderboardEntry {
  id: string;
  name: string;
  coins: number;
  totalMined: number;
  rank: number;
  avatar: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentUserCoins: number;
  currentUserMined: number;
}

export const Leaderboard = ({ currentUserCoins, currentUserMined }: LeaderboardProps) => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number>(0);

  useEffect(() => {
    // محاكاة بيانات قائمة المتصدرين
    const mockData: LeaderboardEntry[] = [
      {
        id: "user1",
        name: "محمد أحمد",
        coins: 25000,
        totalMined: 50000,
        rank: 1,
        avatar: "👑"
      },
      {
        id: "user2", 
        name: "فاطمة علي",
        coins: 18500,
        totalMined: 35000,
        rank: 2,
        avatar: "🥈"
      },
      {
        id: "user3",
        name: "أحمد محمود",
        coins: 15200,
        totalMined: 28000,
        rank: 3,
        avatar: "🥉"
      },
      {
        id: "user4",
        name: "سارة حسن",
        coins: 12800,
        totalMined: 22000,
        rank: 4,
        avatar: "⭐"
      },
      {
        id: "user5",
        name: "علي أحمد",
        coins: 9500,
        totalMined: 18000,
        rank: 5,
        avatar: "🔥"
      },
      {
        id: "current",
        name: "أنت",
        coins: currentUserCoins,
        totalMined: currentUserMined,
        rank: 0,
        avatar: "👤",
        isCurrentUser: true
      }
    ];

    // ترتيب البيانات حسب إجمالي التعدين
    const sortedData = mockData.sort((a, b) => b.totalMined - a.totalMined);
    
    // تحديث الترتيب
    sortedData.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    const currentUser = sortedData.find(entry => entry.isCurrentUser);
    if (currentUser) {
      setCurrentUserRank(currentUser.rank);
    }

    setLeaderboardData(sortedData);
  }, [currentUserCoins, currentUserMined]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈"; 
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-400";
      case 3: return "text-orange-400";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neon-blue mb-2">قائمة المتصدرين</h2>
        <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <span className="text-lg">ترتيبك الحالي:</span>
          <Badge className={`text-lg px-3 py-1 ${getRankColor(currentUserRank)}`}>
            {getRankIcon(currentUserRank)}
          </Badge>
        </div>
      </div>

      {/* أفضل 3 معدّنين */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {leaderboardData.slice(0, 3).map((entry) => (
          <Card key={entry.id} className={`p-4 text-center bg-gradient-card border-border ${
            entry.rank === 1 ? 'shadow-glow-orange' : 
            entry.rank === 2 ? 'shadow-glow-blue' : 
            'shadow-glow-green'
          } ${entry.isCurrentUser ? 'ring-2 ring-neon-blue' : ''}`}>
            <div className="space-y-3">
              <div className="text-4xl">{entry.avatar}</div>
              <div className={`text-3xl font-bold ${getRankColor(entry.rank)}`}>
                {getRankIcon(entry.rank)}
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">{entry.name}</h3>
                {entry.isCurrentUser && (
                  <Badge className="bg-neon-blue text-dark-bg mt-1">أنت</Badge>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-neon-green font-bold">
                  {entry.totalMined.toLocaleString()} NAYTROX
                </p>
                <p className="text-sm text-muted-foreground">إجمالي معدّن</p>
                <p className="text-neon-orange font-bold">
                  {entry.coins.toLocaleString()} NAYTROX
                </p>
                <p className="text-sm text-muted-foreground">الرصيد الحالي</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* بقية القائمة */}
      <Card className="bg-gradient-card border-border">
        <div className="p-4">
          <h3 className="font-bold text-lg mb-4 text-center text-neon-orange">
            المعدّنين الآخرين
          </h3>
          <div className="space-y-3">
            {leaderboardData.slice(3).map((entry) => (
              <div key={entry.id} className={`flex items-center justify-between p-3 rounded-lg bg-muted/50 ${
                entry.isCurrentUser ? 'ring-2 ring-neon-blue bg-neon-blue/10' : ''
              }`}>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className={`font-bold text-lg ${getRankColor(entry.rank)}`}>
                    {getRankIcon(entry.rank)}
                  </div>
                  <div className="text-2xl">{entry.avatar}</div>
                  <div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span className="font-bold">{entry.name}</span>
                      {entry.isCurrentUser && (
                        <Badge className="bg-neon-blue text-dark-bg text-xs">أنت</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {entry.totalMined.toLocaleString()} NAYTROX معدّن
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-neon-green">
                    {entry.coins.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">NAYTROX</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* معلومات إضافية */}
      <Card className="p-4 bg-gradient-card border-border">
        <div className="text-center space-y-2">
          <h3 className="font-bold text-neon-orange">نصائح للتقدم</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span>⛏️</span>
              <span>اعدّن يومياً لتحسين ترتيبك</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span>🔧</span>
              <span>قم بترقية معداتك لزيادة الإنتاج</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span>🎯</span>
              <span>أكمل المهام اليومية للمكافآت</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span>🏆</span>
              <span>حقق الإنجازات لنقاط إضافية</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};