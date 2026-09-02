import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { ChannelSerie } from "../data/transforms";

interface Props {
  data: ChannelSerie[];
}

const fmtNum = (v: unknown) => (v == null ? "—" : Number(v).toLocaleString("es-CO"));

export function ChannelsLines({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={0} angle={-12} height={34} dy={8} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={42} />
        <Tooltip formatter={fmtNum} labelStyle={{ fontWeight: 700 }} />
        <Legend iconType="plainline" wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
        <Line type="monotone" dataKey="terrazas2026" stroke="#3b82f6" strokeWidth={2.5} dot={false} name="Terrazas 2026" />
        <Line type="monotone" dataKey="comercial2026" stroke="#10b981" strokeWidth={2.5} dot={false} name="Comercializadora 2026" />
        <Line type="monotone" dataKey="terrazas2025" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="6 4" dot={false} name="Terrazas 2025" />
        <Line type="monotone" dataKey="comercial2025" stroke="#a3e635" strokeWidth={1.5} strokeDasharray="6 4" dot={false} name="Comercializadora 2025" />
      </LineChart>
    </ResponsiveContainer>
  );
}
