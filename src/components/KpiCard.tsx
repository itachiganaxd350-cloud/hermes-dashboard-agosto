import { useEffect, useState } from "react";
import { Scale, Target, TrendingUp, Store, Package } from "lucide-react";
import { cn } from "../lib/utils";

const icons = { scale: Scale, target: Target, trending: TrendingUp, store: Store, package: Package };

export interface Kpi {
  label: string;
  value: string;
  detail: string;
  icon: keyof typeof icons;
  positive: boolean;
  accent?: string; // hex color para la barra/glow
}

interface Props {
  kpi: Kpi;
  delay?: number;
}

const nf = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 });

function useCountUp(target: number, duration = 950) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

export function KpiCard({ kpi, delay = 0 }: Props) {
  const Icon = icons[kpi.icon];
  const accent = kpi.accent ?? "#2563eb";
  const isPlainInt = /^[\d.]+$/.test(kpi.value); // ej "576.399" (es-CO) -> animar
  const target = isPlainInt ? parseInt(kpi.value.replace(/\./g, ""), 10) : 0;
  const animated = useCountUp(isPlainInt ? target : 0);
  const shown = isPlainInt ? nf.format(animated) : kpi.value;

  return (
    <div
      className="kpi-card animate-in"
      style={
        {
          animationDelay: `${delay}s`,
          "--kpi-accent": `linear-gradient(90deg, ${accent}, ${accent}55)`,
          "--kpi-glow": `${accent}26`,
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-2 text-[hsl(var(--color-muted))] text-[11px] font-semibold uppercase tracking-wider">
        <span
          className="flex h-6 w-6 items-center justify-center rounded-md"
          style={{ background: `${accent}1f`, color: accent }}
        >
          <Icon size={13} strokeWidth={2.2} />
        </span>
        <span className="truncate">{kpi.label}</span>
      </div>
      <div className="kpi-value" style={{ color: "hsl(var(--color-text))" }}>
        {shown}
      </div>
      <div
        className={cn(
          "text-[11px] font-semibold leading-snug",
          kpi.positive ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]"
        )}
      >
        {kpi.detail}
      </div>
    </div>
  );
}
