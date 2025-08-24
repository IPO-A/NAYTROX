interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  color: 'neon-blue' | 'neon-green' | 'neon-orange';
}

export const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  const colorClasses = {
    'neon-blue': 'text-neon-blue shadow-glow-blue',
    'neon-green': 'text-neon-green shadow-glow-green',
    'neon-orange': 'text-neon-orange shadow-glow-orange',
  };

  return (
    <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
          <p className={`text-2xl font-bold ${colorClasses[color]}`}>
            {value}
          </p>
        </div>
        <div className={`text-4xl ${colorClasses[color]} animate-pulse-glow`}>
          {icon}
        </div>
      </div>
      
      {/* Animated border */}
      <div className={`absolute inset-0 rounded-xl opacity-20 animate-pulse ${
        color === 'neon-blue' ? 'bg-neon-blue' :
        color === 'neon-green' ? 'bg-neon-green' :
        'bg-neon-orange'
      }`} style={{ zIndex: -1 }}></div>
    </div>
  );
};