import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import type { ChannelYearSerie } from "../data/transforms";

interface Props {
  data: ChannelYearSerie[];
}

export function ChannelsCompare({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <XAxis dataKey="year" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip formatter={(v: unknown) => Number(v).toLocaleString("es-CO")} />
        <Legend />
        <Bar dataKey="terrazas" fill="#2563eb" name="Terrazas" radius={[3, 3, 0, 0]} />
        <Bar dataKey="comercializadora" fill="#16a34a" name="Comercializadora" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
