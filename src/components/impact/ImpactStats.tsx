import { Coffee, CloudOff, TreeDeciduous } from "lucide-react";

interface ImpactStatsProps {
  cupsSaved: number;
}

export const ImpactStats = ({ cupsSaved }: ImpactStatsProps) => {
  // Each cup saves approximately 90g of CO2
  const co2Saved = (cupsSaved * 90) / 1000; // in kg
  // Roughly 50 cups = 1 tree equivalent
  const treesEquivalent = (cupsSaved / 50).toFixed(2);

  const stats = [
    {
      icon: <Coffee className="w-6 h-6" />,
      value: cupsSaved,
      label: "Gelas Diselamatkan",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: <CloudOff className="w-6 h-6" />,
      value: `${co2Saved.toFixed(1)} kg`,
      label: "CO₂ Dikurangi",
      color: "bg-info/10 text-info",
    },
    {
      icon: <TreeDeciduous className="w-6 h-6" />,
      value: treesEquivalent,
      label: "Pohon Setara",
      color: "bg-secondary/20 text-primary",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="card-eco text-center py-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center mx-auto mb-2`}>
            {stat.icon}
          </div>
          <p className="text-lg font-bold text-foreground">{stat.value}</p>
          <p className="text-[10px] text-muted-foreground leading-tight">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};