import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  reward: number;
  completed: boolean;
}

interface AchievementSystemProps {
  totalMined: number;
  coins: number;
  onRewardClaim: (reward: number) => void;
}

export const AchievementSystem = ({ totalMined, coins, onRewardClaim }: AchievementSystemProps) => {
  const [achievements] = useState<Achievement[]>([
    {
      id: "first_mine",
      title: "أول خطوة",
      description: "قم بأول عملية تعدين",
      icon: "🎯",
      progress: Math.min(totalMined > 0 ? 1 : 0, 1),
      maxProgress: 1,
      reward: 10,
      completed: totalMined > 0
    },
    {
      id: "hundred_coins",
      title: "مجمع العملات",
      description: "اجمع 100 NAYTROX",
      icon: "💰",
      progress: Math.min(coins, 100),
      maxProgress: 100,
      reward: 50,
      completed: coins >= 100
    },
    {
      id: "thousand_mined",
      title: "معدّن محترف",
      description: "عدّن 1000 NAYTROX إجمالي",
      icon: "⛏️",
      progress: Math.min(totalMined, 1000),
      maxProgress: 1000,
      reward: 200,
      completed: totalMined >= 1000
    },
    {
      id: "five_thousand_mined",
      title: "ملك التعدين",
      description: "عدّن 5000 NAYTROX إجمالي",
      icon: "👑",
      progress: Math.min(totalMined, 5000),
      maxProgress: 5000,
      reward: 1000,
      completed: totalMined >= 5000
    }
  ]);

  const handleClaimReward = (achievement: Achievement) => {
    if (achievement.completed) {
      onRewardClaim(achievement.reward);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-neon-orange">الإنجازات</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className={`p-4 bg-gradient-card border-border ${
            achievement.completed ? 'shadow-glow-green' : ''
          }`}>
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3">
              <div className="text-3xl">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-neon-blue">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              {achievement.completed && (
                <Badge className="bg-neon-green text-dark-bg">مكتمل</Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التقدم</span>
                <span>{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <Progress 
                value={(achievement.progress / achievement.maxProgress) * 100} 
                className="h-2"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-neon-orange">
                  المكافأة: {achievement.reward} NAYTROX
                </span>
                {achievement.completed && (
                  <button
                    onClick={() => handleClaimReward(achievement)}
                    className="px-3 py-1 bg-neon-green text-dark-bg rounded-lg text-sm font-bold hover:bg-neon-green/80 transition-colors"
                  >
                    استلام المكافأة
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};