import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { ParticipationSerie } from "../data/transforms";

interface Props {
  data: ParticipationSerie[];
}

export function ParticipationChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={0} angle={-12} height={34} dy={8} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={46} tickFormatter={(v) => `${v}%`} domain={[0, "auto"]} />
        <Tooltip formatter={(v: unknown) => (v == null ? "—" : `${Number(v).toFixed(1)}%`)} labelStyle={{ fontWeight: 700 }} />
        <Legend iconType="plainline" wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
        <Line type="monotone" dataKey="pct2026" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, strokeWidth: 0 }} name="Participación 2026" />
        <Line type="monotone" dataKey="pct2025" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="6 4" dot={false} name="Participación 2025" />
      </LineChart>
    </ResponsiveContainer>
  );
}
