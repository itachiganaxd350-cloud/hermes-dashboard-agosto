import type { Dataset } from "./types";
import type { Kpi } from "../components/KpiCard";
import { fmtFull, fmtPct } from "../lib/utils";

export interface Serie {
  mes: string;
  real2024: number;
  real2025: number;
  real2026: number;
  presupuesto2026: number;
  crecimiento2026: number | null;
}

export interface GrowthSerie {
  mes: string;
  actual: number;
  prev: number;
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
  pct2026: number;
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

  // --- Kilos series ---
  const series: Serie[] = k.meses.map((mes, i) => ({
    mes,
    real2024: k.venta2024[i] ?? 0,
    real2025: k.real2025[i] ?? 0,
    real2026: k.real2026[i] ?? 0,
    presupuesto2026: k.presupuesto2026[i] ?? 0,
    crecimiento2026: k.crecimiento2026[i] ?? null,
  }));

  // --- Growth month-over-month ---
  const growth: GrowthSerie[] = series.map((s) => {
    const prev = s.real2025 || 1;
    const act = s.real2026 || 0;
    return {
      mes: s.mes.slice(0, 3),
      actual: act,
      prev: act - prev,
    };
  });

  // --- Channels monthly ---
  const cm = d.canales.meses;
  const channels: ChannelSerie[] = cm.map((mes, i) => ({
    mes,
    terrazas2026: d.canales.terrazas["2026"][i] ?? null,
    comercial2026: d.canales.comercializadora["2026"][i] ?? null,
    terrazas2025: d.canales.terrazas["2025"][i] ?? null,
    comercial2025: d.canales.comercializadora["2025"][i] ?? null,
  }));

  // --- Channel yearly totals ---
  const years = [2022, 2023, 2024, 2025, 2026];
  const channelYears: ChannelYearSerie[] = years.map((y) => ({
    year: y,
    terrazas: d.canales.terrazas[String(y)].reduce((a: number, b: number | null) => a + (b ?? 0), 0),
    comercializadora: d.canales.comercializadora[String(y)].reduce((a: number, b: number | null) => a + (b ?? 0), 0),
  }));

  // --- Participation % ---
  const participation: ParticipationSerie[] = cm.map((mes, i) => {
    const t25 = d.canales.terrazas["2025"][i] ?? 0;
    const c25 = d.canales.comercializadora["2025"][i] ?? 0;
    const t26 = d.canales.terrazas["2026"][i] ?? 0;
    const c26 = d.canales.comercializadora["2026"][i] ?? 0;
    return {
      mes,
      pct2025: t25 > 0 ? (c25 / t25) * 100 : 0,
      pct2026: t26 > 0 ? (c26 / t26) * 100 : 0,
    };
  });

  // --- KPIs ---
  const ytd = k.totals.real2026; // 576399
  const pres = k.totals.presupuesto2026; // 812418.875
  const r25 = k.totals.real2025; // 746519
  const r24 = k.totals.venta2024; // 517023

  const kpis: Kpi[] = [
    {
      label: "Real 2026 YTD",
      value: fmtFull(ytd),
      detail: `${k.meses.length} meses`,
      icon: "scale",
      positive: true,
    },
    {
      label: "Presupuesto YTD",
      value: fmtFull(pres),
      detail: `${fmtPct((ytd / pres) * 100)} cumplimiento`,
      icon: "target",
      positive: ytd >= pres,
    },
    {
      label: "Crecimiento vs 2025",
      value: fmtPct(((ytd - r25) / r25) * 100),
      detail: `${fmtFull(ytd)} vs ${fmtFull(r25)}`,
      icon: "trending",
      positive: ytd > r25,
    },
    {
      label: "Crecimiento vs 2024",
      value: fmtPct(((ytd - r24) / r24) * 100),
      detail: `${fmtFull(ytd)} vs ${fmtFull(r24)}`,
      icon: "trending",
      positive: ytd > r24,
    },
    {
      label: "Canales 2026",
      value: fmtFull(channelYears.find((c) => c.year === 2026)!.terrazas + channelYears.find((c) => c.year === 2026)!.comercializadora),
      detail: "Terrazas + Comercializadora",
      icon: "store",
      positive: true,
    },
    {
      label: "Agosto 2026",
      value: fmtFull(k.real2026[k.meses.indexOf("AGOSTO")] ?? 0),
      detail: `${fmtPct(k.cumplimientoPpto2026[k.meses.indexOf("AGOSTO")] ?? 0)} ppto`,
      icon: "package",
      positive: (k.real2026[k.meses.indexOf("AGOSTO")] ?? 0) >= (k.presupuesto2026[k.meses.indexOf("AGOSTO")] ?? 0),
    },
  ];

  return { series, growth, channels, channelYears, participation, kpis };
}
