import type { ReactNode } from "react";
import { Sun, Moon, Boxes, TrendingUp, Handshake, Layers, BadgePercent, ClipboardList, Tags, Trophy } from "lucide-react";
import { KpiCard } from "./KpiCard";
import { SimpleAreaLine } from "./SimpleAreaLine";
import { GroupedBar } from "./GroupedBar";
import { ChannelsLines } from "./ChannelsLines";
import { ChannelsCompare } from "./ChannelsCompare";
import { ParticipationChart } from "./ParticipationChart";
import { CierreMesTable } from "./CierreMesTable";
import { ChequeoTable } from "./ChequeoTable";
import { ProductRank } from "./ProductRank";
import { buildChartData } from "../data/transforms";
import type { Dataset } from "../data/types";

interface Props {
  data: Dataset;
  dark: boolean;
  toggleTheme: () => void;
}

function ChartCard({
  icon,
  title,
  subtitle,
  className = "",
  delay = 0,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <section
      className={`chart-card p-5 animate-in ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg"
            style={{ background: "hsl(var(--color-brand) / 0.12)", color: "hsl(var(--color-brand))" }}
          >
            {icon}
          </span>
          <div>
            <h3 className="text-sm font-bold tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[hsl(var(--color-muted))]">{subtitle}</p>}
          </div>
        </div>
        <span className="dot" />
      </header>
      {children}
    </section>
  );
}

const signature = String.raw`
 ╔══════════════════════════════════════════════╗
 ║    J U L I A N   A N D R E S   P A R D O     ║
 ╚══════════════════════════════════════════════╝`;

export function Dashboard({ data, dark, toggleTheme }: Props) {
  const chartData = buildChartData(data);

  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col gap-6 p-4 md:p-8">
      {/* ============ HERO ============ */}
      <header className="hero animate-in p-6 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm">
              <Boxes size={24} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-extrabold tracking-tight text-white md:text-2xl">
                  JULIAN AGOSTO
                </h1>
                <span className="hidden rounded-md bg-white/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-white/90 ring-1 ring-white/20 sm:inline">
                  2026
                </span>
              </div>
              <p className="mt-0.5 text-[13px] text-white/75">
                Dashboard mensual · Comportamiento comercial · Enero – Agosto 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="badge-live">
              <span className="pulse-dot" />
              DATOS AL DÍA
            </span>
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-white/25"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* ============ KPIs ============ */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {chartData.kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} delay={0.05 + i * 0.06} />
        ))}
      </div>

      {/* ============ CHARTS ============ */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ChartCard
          icon={<Layers size={15} />}
          title="Comportamiento Kilos"
          subtitle="Real 2026 vs Presupuesto (kg)"
          className="xl:col-span-2"
          delay={0.15}
        >
          <SimpleAreaLine data={chartData.series} />
        </ChartCard>

        <ChartCard
          icon={<TrendingUp size={15} />}
          title="Crecimiento vs 2025"
          subtitle="% variación mensual (mismo mes año anterior)"
          delay={0.2}
        >
          <GroupedBar data={chartData.growth} />
        </ChartCard>

        <ChartCard
          icon={<BadgePercent size={15} />}
          title="Participación Comercializadora"
          subtitle="% sobre ventas Terrazas, Ene–Ago"
          delay={0.25}
        >
          <ParticipationChart data={chartData.participation} />
        </ChartCard>

        <ChartCard
          icon={<Handshake size={15} />}
          title="Canales — Evolución Mensual"
          subtitle="Unidades reportadas por canal · 2025 vs 2026"
          delay={0.3}
        >
          <ChannelsLines data={chartData.channels} />
        </ChartCard>

        <ChartCard
          icon={<ClipboardList size={15} />}
          title="Canales — Comparativo Anual"
          subtitle="Acumulado por año (2026: Ene–Ago)"
          delay={0.35}
        >
          <ChannelsCompare data={chartData.channelYears} />
        </ChartCard>

        <ChartCard
          icon={<Tags size={15} />}
          title="Chequeo de Precios"
          subtitle="Cervalles vs T.A. vs Precio especial ($/kg)"
          className="xl:col-span-2"
          delay={0.4}
        >
          <div className="mx-auto max-w-3xl">
            <ChequeoTable precios={data.precios} />
          </div>
        </ChartCard>

        <ChartCard
          icon={<ClipboardList size={15} />}
          title="Cierre de Mes — Julio vs Agosto"
          subtitle="Cantidades en kg y variación por producto"
          className="xl:col-span-2"
          delay={0.45}
        >
          <CierreMesTable julio={data.cierreJulio} agosto={data.cierreAgosto} />
        </ChartCard>

        <ChartCard
          icon={<Trophy size={15} />}
          title="Ranking de Productos"
          subtitle={`Agosto 2026 · ${data.cierreAgosto.length} productos por kilos vendidos`}
          delay={0.5}
        >
          <ProductRank items={data.cierreAgosto} />
        </ChartCard>
      </div>

      {/* ============ FOOTER ============ */}
      <footer className="mt-2 flex flex-col items-center gap-4 border-t border-[hsl(var(--color-border))] pt-6 pb-2 text-center">
        <pre className="ascii-signature text-[10px] md:text-[11px]">{signature}</pre>
        <p className="max-w-xl text-xs leading-relaxed text-[hsl(var(--color-muted))]">
          Cifras en kilogramos (kg) · Fuente oficial:{" "}
          <span className="font-mono">JULIAN AGOSTO.xlsx</span> · Comportamiento Kilos, Cierre de Mes,
          Chequeo de Precios e Informe de Canales · Dashboard mensual
        </p>
      </footer>
    </div>
  );
}
