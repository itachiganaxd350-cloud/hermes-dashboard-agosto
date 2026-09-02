import { useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon, BarChart3, Info } from "lucide-react";
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

export function Dashboard({ data, dark, toggleTheme }: Props) {
  const [activeChart, setActiveChart] = useState<string | null>(null);
  const chartData = buildChartData(data);

  const chartTabs = [
    { key: "kilos", label: "Comportamiento Kilos" },
    { key: "growth", label: "Crecimiento" },
    { key: "channels", label: "Canales" },
    { key: "channelsYear", label: "Comparativo Anual" },
    { key: "participation", label: "Participación" },
    { key: "cierre", label: "Cierre Agosto" },
    { key: "chequeo", label: "Chequeo Precios" },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-[1400px] mx-auto flex flex-col gap-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <BarChart3 size={28} className="text-[hsl(var(--color-brand))]" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">JULIAN AGOSTO</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[hsl(var(--color-muted))] hidden md:block">
            Dashboard mensual · Enero–Agosto 2026
          </span>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:opacity-80 transition-opacity cursor-pointer"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </motion.header>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {chartData.kpis.map((kpi, i) => (
          <KpiCard key={kpi.label} kpi={kpi} delay={i * 0.05} />
        ))}
      </div>

      {/* Chart tabs */}
      <div className="flex flex-wrap gap-2">
        {chartTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveChart(activeChart === tab.key ? null : tab.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeChart === tab.key
                ? "bg-[hsl(var(--color-brand))] text-white"
                : "bg-[hsl(var(--color-card))] border border-[hsl(var(--color-border))] hover:bg-[hsl(var(--color-surface))]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active chart */}
      {activeChart && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="bg-[hsl(var(--color-card))] rounded-xl border border-[hsl(var(--color-border))] p-5"
        >
          <h3 className="text-sm font-semibold text-[hsl(var(--color-muted))] mb-3 uppercase tracking-wide">
            {chartTabs.find((t) => t.key === activeChart)?.label}
          </h3>
          {activeChart === "kilos" && <SimpleAreaLine data={chartData.series} />}
          {activeChart === "growth" && <GroupedBar data={chartData.growth} />}
          {activeChart === "channels" && <ChannelsLines data={chartData.channels} />}
          {activeChart === "channelsYear" && <ChannelsCompare data={chartData.channelYears} />}
          {activeChart === "participation" && <ParticipationChart data={chartData.participation} />}
          {activeChart === "cierre" && (
            <CierreMesTable julio={data.cierreJulio} agosto={data.cierreAgosto} />
          )}
          {activeChart === "chequeo" && (
            <ChequeoTable precios={data.precios} />
          )}
        </motion.section>
      )}

      {/* Product ranking (always visible) */}
      <section className="bg-[hsl(var(--color-card))] rounded-xl border border-[hsl(var(--color-border))] p-5">
        <h3 className="text-sm font-semibold text-[hsl(var(--color-muted))] mb-3 uppercase tracking-wide flex items-center gap-2">
          <Info size={14} />
          Ranking productos · Agosto 2026 (30 productos)
        </h3>
        <ProductRank items={data.cierreAgosto} />
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-[hsl(var(--color-muted))] py-4 border-t border-[hsl(var(--color-border))]">
        Creado por Julián Andrés Pardo · Dashboard mensual
      </footer>
    </div>
  );
}
