import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { ChannelYearSerie } from "../data/transforms";

interface Props {
  data: ChannelYearSerie[];
}

const fmtNum = (v: unknown) => (v == null ? "—" : Number(v).toLocaleString("es-CO"));

export function ChannelsCompare({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={48} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip formatter={fmtNum} labelStyle={{ fontWeight: 700 }} cursor={{ fill: "hsl(var(--color-muted) / 0.08)" }} />
        <Legend wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
        <Bar dataKey="terrazas" name="Terrazas" fill="#3b82f6" radius={[5, 5, 0, 0]} maxBarSize={38} />
        <Bar dataKey="comercializadora" name="Comercializadora" fill="#10b981" radius={[5, 5, 0, 0]} maxBarSize={38} />
      </BarChart>
    </ResponsiveContainer>
  );
}
