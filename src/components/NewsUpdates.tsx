import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, Clock, TrendingUp } from "lucide-react";

export const NewsUpdates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const news = [
    {
      id: 1,
      title: "NAYTROX يحقق نمواً مستمراً في التعدين",
      description: "زيادة في معدل التعدين بنسبة 15% هذا الأسبوع",
      time: "منذ ساعتين",
      type: "إيجابي",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: 2,
      title: "تحديث جديد على شبكة NAYTROX",
      description: "تحسينات في الأمان والسرعة",
      time: "منذ 5 ساعات",
      type: "تحديث",
      icon: <Newspaper className="w-4 h-4" />
    },
    {
      id: 3,
      title: "مكافآت إضافية للمعدنين النشطين",
      description: "احصل على مكافآت مضاعفة عند التعدين المستمر",
      time: "منذ 8 ساعات",
      type: "مكافأة",
      icon: <TrendingUp className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [news.length]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'إيجابي':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'تحديث':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'مكافأة':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Newspaper className="w-5 h-5 text-primary" />
          آخر الأخبار والتحديثات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {news.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 px-1">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getTypeColor(item.type)}>
                          {item.type}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </div>
                      </div>
                      <h4 className="font-semibold text-foreground text-sm">
                        {item.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-1 mt-4">
            {news.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};