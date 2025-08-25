import { MiningDashboard } from "@/components/MiningDashboard";
import logo from "@/assets/digicoin-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={logo} 
              alt="NAYTROX Cryptocurrency Mining Logo" 
              className="w-16 h-16 mr-4 animate-pulse-glow object-contain" 
              width="64"
              height="64"
              loading="eager"
            />
            <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-pulse-glow">
              NAYTROX
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            ابدأ رحلة التعدين واكسب عملات NAYTROX الرقمية المستقبلية
          </p>
        </div>
        <MiningDashboard />
      </div>
    </div>
  );
};

export default Index;