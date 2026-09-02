import { motion } from "motion/react";
import { Scale, Target, TrendingUp, Store, Package } from "lucide-react";
import { cn } from "../lib/utils";

const icons = { scale: Scale, target: Target, trending: TrendingUp, store: Store, package: Package };

export interface Kpi {
  label: string;
  value: string;
  detail: string;
  icon: keyof typeof icons;
  positive: boolean;
}

interface Props {
  kpi: Kpi;
  delay?: number;
}

export function KpiCard({ kpi, delay = 0 }: Props) {
  const Icon = icons[kpi.icon];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="kpi-glow rounded-xl p-4 bg-[hsl(var(--color-card))] transition-shadow duration-200 flex flex-col gap-1"
    >
      <div className="flex items-center gap-2 text-[hsl(var(--color-muted))] text-xs font-medium uppercase tracking-wide">
        <Icon size={14} />
        {kpi.label}
      </div>
      <div className="text-2xl font-bold tracking-tight" style={{ fontFamily: "var(--color-mono)" }}>
        {kpi.value}
      </div>
      <div className={cn("text-xs font-medium", kpi.positive ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]")}>
        {kpi.detail}
      </div>
    </motion.div>
  );
}
