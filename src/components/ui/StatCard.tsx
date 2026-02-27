export default function StatCard({
  icon,
  label,
  value,
  trend,
  badge,
  isLoading
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  badge?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group relative overflow-hidden">

      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-accent rounded-xl ">
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] font-bold px-2 py-1 bg-primary/10 text-primary rounded-full uppercase tracking-wider ">
            {trend}
          </span>
        )}
        {badge && (
          <span className="text-[10px] font-bold px-2 py-1 bg-amber-500/10 text-amber-600 rounded-full uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      <div>
        {isLoading ? (
          <div className="h-10 w-24 bg-accent animate-pulse rounded-lg mb-2" />
        ) : (
          <p className="text-4xl font-extrabold text-foreground tracking-tight">{value}</p>
        )}
        <p className="text-muted-foreground font-medium mt-1">{label}</p>
      </div>
    </div>
  );
}