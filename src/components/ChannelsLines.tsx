import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { ChannelSerie } from "../data/transforms";

interface Props {
  data: ChannelSerie[];
}

export function ChannelsLines({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip />
        <Line type="monotone" dataKey="terrazas2026" stroke="#2563eb" strokeWidth={2} dot={false} name="Terrazas 2026" />
        <Line type="monotone" dataKey="comercial2026" stroke="#16a34a" strokeWidth={2} dot={false} name="Comerc 2026" />
        <Line type="monotone" dataKey="terrazas2025" stroke="#94a3b8" strokeWidth={1} strokeDasharray="4 3" dot={false} name="Terrazas 2025" />
        <Line type="monotone" dataKey="comercial2025" stroke="#a3e635" strokeWidth={1} strokeDasharray="4 3" dot={false} name="Comerc 2025" />
      </LineChart>
    </ResponsiveContainer>
  );
}
