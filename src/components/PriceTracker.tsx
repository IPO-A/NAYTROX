import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export const PriceTracker = () => {
  const [currentPrice, setCurrentPrice] = useState(0.00485);
  const [priceChange, setPriceChange] = useState(0);
  const [isPositive, setIsPositive] = useState(true);
  const [priceData, setPriceData] = useState([
    { time: '00:00', price: 0.00480 },
    { time: '04:00', price: 0.00475 },
    { time: '08:00', price: 0.00482 },
    { time: '12:00', price: 0.00488 },
    { time: '16:00', price: 0.00485 },
    { time: '20:00', price: 0.00491 },
    { time: '24:00', price: 0.00485 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.0001;
      const newPrice = Math.max(0.001, currentPrice + change);
      const changePercent = ((newPrice - currentPrice) / currentPrice) * 100;
      
      setCurrentPrice(newPrice);
      setPriceChange(changePercent);
      setIsPositive(changePercent >= 0);

      // Update chart data
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setPriceData(prev => {
        const newData = [...prev.slice(-6), { time: timeString, price: newPrice }];
        return newData;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Price Card */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <DollarSign className="w-5 h-5 text-primary" />
            سعر NAYTROX
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                ${currentPrice.toFixed(6)}
              </span>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                isPositive 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(priceChange).toFixed(2)}%
              </div>
            </div>
            <p className="text-sm text-muted-foreground">آخر 24 ساعة</p>
            
            {/* Market Stats */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground">أعلى سعر</p>
                <p className="text-sm font-semibold text-green-400">$0.00520</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">أقل سعر</p>
                <p className="text-sm font-semibold text-red-400">$0.00461</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-foreground">مخطط السعر</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  axisLine={false}
                />
                <YAxis 
                  tick={{ fill: '#9CA3AF', fontSize: 10 }}
                  axisLine={false}
                  domain={['dataMin - 0.0001', 'dataMax + 0.0001']}
                  tickFormatter={(value) => `$${value.toFixed(5)}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }}
                  formatter={(value: any) => [`$${value.toFixed(6)}`, 'السعر']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#10B981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};