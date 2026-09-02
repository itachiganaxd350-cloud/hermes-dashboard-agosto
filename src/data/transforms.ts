import type { Dataset } from "./types";
import type { Kpi } from "../components/KpiCard";
import { fmtFull, fmtPct } from "../lib/utils";

export interface Serie {
  mes: string;
  real2026: number | null;
  presupuesto2026: number;
}

export interface GrowthSerie {
  mes: string;
  crecimiento: number | null;
}

export interface ChannelSerie {
  mes: string;
  terrazas2026: number | null;
  comercial2026: number | null;
  terrazas2025: number | null;
  comercial2025: number | null;
}

export interface ChannelYearSerie {
  year: number;
  terrazas: number;
  comercializadora: number;
}

export interface ParticipationSerie {
  mes: string;
  pct2025: number;
  pct2026: number | null;
}

export interface ChartData {
  series: Serie[];
  growth: GrowthSerie[];
  channels: ChannelSerie[];
  channelYears: ChannelYearSerie[];
  participation: ParticipationSerie[];
  kpis: Kpi[];
}

export function buildChartData(d: Dataset): ChartData {
  const k = d.kilos;
  const meses = k.meses;

  // --- Kilos series: preserve nulls (Sep–Dic 2026 no tienen dato aún) ---
  const series: Serie[] = meses.map((mes, i) => ({
    mes,
    real2026: k.real2026[i] ?? null,
    presupuesto2026: k.presupuesto2026[i] ?? 0,
  }));

  // --- Crecimiento % (columna CRECIMIENTO 2026 del Excel: vs mismo mes 2025) ---
  const growth: GrowthSerie[] = meses.map((mes, i) => ({
    mes: mes.slice(0, 3),
    crecimiento: k.crecimiento2026[i] ?? null,
  }));

  // --- Channels monthly (2026: solo Ene–Ago; resto null) ---
  const channels: ChannelSerie[] = meses.map((mes, i) => ({
    mes,
    terrazas2026: d.canales.terrazas["2026"][i] ?? null,
    comercial2026: d.canales.comercializadora["2026"][i] ?? null,
    terrazas2025: d.canales.terrazas["2025"][i] ?? null,
    comercial2025: d.canales.comercializadora["2025"][i] ?? null,
  }));

  // --- Channel yearly totals (2026 = parcial Ene–Ago, como el total del Excel) ---
  const years = [2022, 2023, 2024, 2025, 2026];
  const channelYears: ChannelYearSerie[] = years.map((y) => ({
    year: y,
    terrazas: d.canales.terrazas[String(y)].reduce((a: number, b: number | null) => a + (b ?? 0), 0),
    comercializadora: d.canales.comercializadora[String(y)].reduce((a: number, b: number | null) => a + (b ?? 0), 0),
  }));

  // --- Participation % (comercializadora / terrazas, mismo criterio del Excel) ---
  const participation: ParticipationSerie[] = meses.map((mes, i) => {
    const t25 = d.canales.terrazas["2025"][i] ?? 0;
    const c25 = d.canales.comercializadora["2025"][i] ?? 0;
    const t26 = d.canales.terrazas["2026"][i] ?? null;
    const c26 = d.canales.comercializadora["2026"][i] ?? 0;
    return {
      mes,
      pct2025: t25 > 0 ? (c25 / t25) * 100 : 0,
      pct2026: t26 == null ? null : t26 > 0 ? (c26 / t26) * 100 : 0,
    };
  });

  // --- KPIs: comparaciones SIEMPRE YTD vs YTD (Ene–Ago), nunca vs año completo ---
  const y = k.totals.ytd; // Ene–Ago 2026
  const ch26 = channelYears.find((c) => c.year === 2026)!;
  const idxAgo = meses.indexOf("AGOSTO");

  const kpis: Kpi[] = [
    {
      label: "Real 2026 YTD",
      value: fmtFull(y.real2026),
      detail: `Ene–Ago · ${y.meses} meses`,
      icon: "scale",
      positive: true,
      accent: "#2563eb",
    },
    {
      label: "Presupuesto YTD",
      value: fmtFull(y.presupuesto2026),
      detail: `${fmtPct((y.real2026 / y.presupuesto2026) * 100)} cumplimiento Ene–Ago`,
      icon: "target",
      positive: y.real2026 >= y.presupuesto2026,
      accent: "#8b5cf6",
    },
    {
      label: "Crec. vs 2025",
      value: fmtPct(((y.real2026 - y.real2025) / y.real2025) * 100),
      detail: `${fmtFull(y.real2026)} vs ${fmtFull(y.real2025)} Ene–Ago`,
      icon: "trending",
      positive: y.real2026 > y.real2025,
      accent: "#10b981",
    },
    {
      label: "Crec. vs 2024",
      value: fmtPct(((y.real2026 - y.venta2024) / y.venta2024) * 100),
      detail: `${fmtFull(y.real2026)} vs ${fmtFull(y.venta2024)} Ene–Ago`,
      icon: "trending",
      positive: y.real2026 > y.venta2024,
      accent: "#06b6d4",
    },
    {
      label: "Canales 2026",
      value: fmtFull(ch26.terrazas + ch26.comercializadora),
      detail: `Terrazas ${fmtFull(ch26.terrazas)} + Comerc. ${fmtFull(ch26.comercializadora)} (Ene–Ago)`,
      icon: "store",
      positive: true,
      accent: "#f59e0b",
    },
    {
      label: "Agosto 2026",
      value: fmtFull(k.real2026[idxAgo] ?? 0),
      detail: `${fmtPct(k.cumplimientoPpto2026[idxAgo] ?? 0)} ppto`,
      icon: "package",
      positive: (k.real2026[idxAgo] ?? 0) >= (k.presupuesto2026[idxAgo] ?? 0),
      accent: "#f43f5e",
    },
  ];

  return { series, growth, channels, channelYears, participation, kpis };
}
