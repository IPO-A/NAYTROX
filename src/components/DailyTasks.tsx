import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface DailyTask {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  reward: number;
  completed: boolean;
  claimed: boolean;
}

interface DailyTasksProps {
  totalMined: number;
  upgradesPurchased: number;
  onRewardClaim: (reward: number) => void;
}

export const DailyTasks = ({ totalMined, upgradesPurchased, onRewardClaim }: DailyTasksProps) => {
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [lastResetTime, setLastResetTime] = useState<string>("");

  // إعداد المهام اليومية
  useEffect(() => {
    const today = new Date().toDateString();
    const savedResetTime = localStorage.getItem('dailyTasksReset');
    
    if (savedResetTime !== today) {
      // إعادة تعيين المهام اليومية
      const newTasks: DailyTask[] = [
        {
          id: "mine_50",
          title: "تعدين يومي",
          description: "عدّن 50 NAYTROX اليوم",
          icon: "⛏️",
          progress: Math.min(totalMined, 50),
          maxProgress: 50,
          reward: 25,
          completed: totalMined >= 50,
          claimed: false
        },
        {
          id: "upgrade_once",
          title: "تحسين المعدات",
          description: "قم بترقية واحدة اليوم",
          icon: "🔧",
          progress: Math.min(upgradesPurchased, 1),
          maxProgress: 1,
          reward: 30,
          completed: upgradesPurchased >= 1,
          claimed: false
        },
        {
          id: "mine_100",
          title: "معدّن نشط",
          description: "عدّن 100 NAYTROX اليوم",
          icon: "💎",
          progress: Math.min(totalMined, 100),
          maxProgress: 100,
          reward: 75,
          completed: totalMined >= 100,
          claimed: false
        }
      ];
      
      setTasks(newTasks);
      localStorage.setItem('dailyTasksReset', today);
      setLastResetTime(today);
    } else {
      // تحديث التقدم في المهام الحالية
      const savedTasks = localStorage.getItem('dailyTasks');
      if (savedTasks) {
        const parsedTasks: DailyTask[] = JSON.parse(savedTasks);
        const updatedTasks = parsedTasks.map(task => {
          switch (task.id) {
            case "mine_50":
            case "mine_100":
              return {
                ...task,
                progress: Math.min(totalMined, task.maxProgress),
                completed: totalMined >= task.maxProgress
              };
            case "upgrade_once":
              return {
                ...task,
                progress: Math.min(upgradesPurchased, task.maxProgress),
                completed: upgradesPurchased >= task.maxProgress
              };
            default:
              return task;
          }
        });
        setTasks(updatedTasks);
      }
      setLastResetTime(savedResetTime || today);
    }
  }, [totalMined, upgradesPurchased]);

  // حفظ المهام في التخزين المحلي
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('dailyTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleClaimReward = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && task.completed && !task.claimed) {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, claimed: true } : t
      ));
      onRewardClaim(task.reward);
      toast.success(`تم استلام مكافأة المهمة: ${task.reward} NAYTROX!`);
    }
  };

  const getTimeUntilReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeDiff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}س ${minutes}د`;
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neon-orange">المهام اليومية</h2>
        <div className="text-center">
          <div className="text-sm text-muted-foreground">إعادة التعيين خلال</div>
          <div className="text-neon-blue font-bold">{getTimeUntilReset()}</div>
        </div>
      </div>
      
      <Card className="p-4 bg-gradient-card border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold">التقدم الإجمالي</span>
          <span className="text-neon-green">{completedTasks}/{totalTasks}</span>
        </div>
        <Progress value={(completedTasks / totalTasks) * 100} className="h-2" />
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className={`p-4 bg-gradient-card border-border ${
            task.completed ? 'shadow-glow-green' : ''
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="text-2xl">{task.icon}</div>
                <div>
                  <h3 className="font-bold text-neon-blue">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                {task.claimed ? (
                  <Badge className="bg-muted text-muted-foreground">مُستلمة</Badge>
                ) : task.completed ? (
                  <Badge className="bg-neon-green text-dark-bg">جاهزة</Badge>
                ) : (
                  <Badge variant="outline">جارية</Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التقدم</span>
                <span>{task.progress}/{task.maxProgress}</span>
              </div>
              <Progress 
                value={(task.progress / task.maxProgress) * 100} 
                className="h-2"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-neon-orange">
                  المكافأة: {task.reward} NAYTROX
                </span>
                {task.completed && !task.claimed && (
                  <button
                    onClick={() => handleClaimReward(task.id)}
                    className="px-3 py-1 bg-neon-green text-dark-bg rounded-lg text-sm font-bold hover:bg-neon-green/80 transition-colors"
                  >
                    استلام
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