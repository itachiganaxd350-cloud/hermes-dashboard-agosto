import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import type { GrowthSerie } from "../data/transforms";

interface Props {
  data: GrowthSerie[];
}

export function GroupedBar({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
        <Tooltip formatter={(v: unknown) => `${Number(v).toFixed(1)}%`} />
        <ReferenceLine y={0} stroke="#94a3b8" />
        <Bar dataKey="crecimiento" fill="#2563eb" name="Crec. vs 2025" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
