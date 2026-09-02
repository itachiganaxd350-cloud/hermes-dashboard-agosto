import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { ParticipationSerie } from "../data/transforms";

interface Props {
  data: ParticipationSerie[];
}

export function ParticipationChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v.toFixed(0)}%`} />
        <Tooltip formatter={(v: unknown) => `${Number(v).toFixed(1)}%`} />
        <Legend />
        <Line type="monotone" dataKey="pct2026" stroke="#2563eb" strokeWidth={2} dot={false} name="2026" />
        <Line type="monotone" dataKey="pct2025" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="6 4" dot={false} name="2025" />
      </LineChart>
    </ResponsiveContainer>
  );
}
