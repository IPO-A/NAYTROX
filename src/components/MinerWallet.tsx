import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Transaction {
  id: string;
  type: "mine" | "upgrade" | "reward" | "transfer";
  amount: number;
  timestamp: Date;
  description: string;
}

interface MinerWalletProps {
  coins: number;
  totalMined: number;
}

export const MinerWallet = ({ coins, totalMined }: MinerWalletProps) => {
  const [transactions] = useState<Transaction[]>([
    {
      id: "1",
      type: "mine",
      amount: 15.5,
      timestamp: new Date(Date.now() - 60000),
      description: "تعدين NAYTROX"
    },
    {
      id: "2", 
      type: "upgrade",
      amount: -50,
      timestamp: new Date(Date.now() - 300000),
      description: "ترقية المعول"
    },
    {
      id: "3",
      type: "reward",
      amount: 25,
      timestamp: new Date(Date.now() - 600000),
      description: "مكافأة المهمة اليومية"
    }
  ]);

  const [transferAmount, setTransferAmount] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");

  const walletAddress = "NAY1x" + Math.random().toString(36).substring(2, 15).toUpperCase();
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("تم نسخ عنوان المحفظة!");
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (!amount || amount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح!");
      return;
    }
    if (amount > coins) {
      toast.error("الرصيد غير كافي!");
      return;
    }
    if (!recipientAddress) {
      toast.error("يرجى إدخال عنوان المحفظة المستقبلة!");
      return;
    }

    toast.success(`تم إرسال ${amount} NAYTROX بنجاح!`);
    setTransferAmount("");
    setRecipientAddress("");
  };

  const getTransactionIcon = (type: Transaction["type"]) => {
    switch (type) {
      case "mine": return "⛏️";
      case "upgrade": return "🔧";
      case "reward": return "🎁";
      case "transfer": return "💸";
      default: return "💰";
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? "text-neon-green" : "text-neon-orange";
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "الآن";
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (minutes < 1440) return `منذ ${Math.floor(minutes / 60)} ساعة`;
    return `منذ ${Math.floor(minutes / 1440)} يوم`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neon-blue mb-2">محفظة NAYTROX</h2>
        <p className="text-muted-foreground">إدارة عملاتك الرقمية</p>
      </div>

      {/* معلومات المحفظة */}
      <Card className="p-6 bg-gradient-card border-border">
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">💎</div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-neon-green">{coins.toFixed(2)}</p>
              <p className="text-lg text-neon-blue font-bold">NAYTROX</p>
              <p className="text-sm text-muted-foreground">
                إجمالي معدّن: {totalMined.toFixed(1)} NAYTROX
              </p>
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">عنوان المحفظة:</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCopyAddress}
                className="text-xs"
              >
                نسخ
              </Button>
            </div>
            <p className="font-mono text-sm bg-muted p-2 rounded mt-2 break-all">
              {walletAddress}
            </p>
          </div>
        </div>
      </Card>

      {/* إرسال العملات */}
      <Card className="p-6 bg-gradient-card border-border">
        <h3 className="font-bold text-lg mb-4 text-neon-orange">إرسال NAYTROX</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">المبلغ</label>
            <Input
              type="number"
              placeholder="0.00"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="bg-muted border-border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">عنوان المحفظة المستقبلة</label>
            <Input
              placeholder="NAY1x..."
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="bg-muted border-border font-mono text-sm"
            />
          </div>
          <Button 
            onClick={handleTransfer}
            className="w-full bg-neon-blue text-dark-bg hover:bg-neon-blue/80"
          >
            إرسال NAYTROX
          </Button>
        </div>
      </Card>

      {/* سجل المعاملات */}
      <Card className="p-6 bg-gradient-card border-border">
        <h3 className="font-bold text-lg mb-4 text-neon-green">سجل المعاملات</h3>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="text-2xl">{getTransactionIcon(transaction.type)}</div>
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatTime(transaction.timestamp)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${getTransactionColor(transaction.amount)}`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">NAYTROX</p>
              </div>
            </div>
          ))}
        </div>
        
        {transactions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-muted-foreground">لا توجد معاملات بعد</p>
            <p className="text-sm text-muted-foreground mt-2">
              ابدأ التعدين لرؤية سجل معاملاتك هنا
            </p>
          </div>
        )}
      </Card>

      {/* معلومات إضافية */}
      <Card className="p-4 bg-gradient-card border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl mb-2">🏆</div>
            <p className="text-sm text-muted-foreground">قيمة المحفظة</p>
            <p className="font-bold text-neon-blue">${(coins * 0.1).toFixed(2)}</p>
          </div>
          <div>
            <div className="text-2xl mb-2">📈</div>
            <p className="text-sm text-muted-foreground">الأرباح اليوم</p>
            <p className="font-bold text-neon-green">+{(Math.random() * 50).toFixed(1)} NAYTROX</p>
          </div>
        </div>
      </Card>
    </div>
  );
};