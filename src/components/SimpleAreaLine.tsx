import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { Serie } from "../data/transforms";

interface Props {
  data: Serie[];
}

export function SimpleAreaLine({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={data} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="grad2026" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
        <Tooltip formatter={(v: unknown) => Number(v).toLocaleString("es-CO")} />
        <Area type="monotone" dataKey="real2026" stroke="#2563eb" strokeWidth={2} fill="url(#grad2026)" name="Real 2026" />
        <Line type="monotone" dataKey="presupuesto2026" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="6 4" dot={false} name="Presupuesto" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
