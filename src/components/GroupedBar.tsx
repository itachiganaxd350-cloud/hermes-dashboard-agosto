import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import type { GrowthSerie } from "../data/transforms";

interface Props {
  data: GrowthSerie[];
}

export function GroupedBar({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }} barCategoryGap="28%">
        <defs>
          <linearGradient id="gradGrowth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={0} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={52} tickFormatter={(v) => `${v}%`} />
        <Tooltip formatter={(v: unknown) => (v == null ? "—" : `${Number(v).toFixed(1)}%`)} labelStyle={{ fontWeight: 700 }} />
        <ReferenceLine y={0} stroke="hsl(var(--color-muted))" strokeOpacity={0.4} />
        <Bar dataKey="crecimiento" name="Crec. vs 2025" radius={[5, 5, 0, 0]} maxBarSize={44}>
          {data.map((d, i) => (
            <Cell key={i} fill={d.crecimiento != null && d.crecimiento < 0 ? "#f43f5e" : "url(#gradGrowth)"} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
