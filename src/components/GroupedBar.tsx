import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
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
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <Tooltip formatter={(v: unknown) => Number(v).toLocaleString("es-CO")} />
        <Bar dataKey="actual" fill="#2563eb" name="2026" radius={[3, 3, 0, 0]} />
        <Bar dataKey="prev" fill="#cbd5e1" name="Crecimiento" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
