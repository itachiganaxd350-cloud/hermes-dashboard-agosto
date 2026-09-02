import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { Serie } from "../data/transforms";

interface Props {
  data: Serie[];
}

const fmtNum = (v: unknown) => (v == null ? "—" : Number(v).toLocaleString("es-CO"));

export function SimpleAreaLine({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <ComposedChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="gradReal2026" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.32} />
            <stop offset="60%" stopColor="#3b82f6" stopOpacity={0.08} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} interval={0} angle={-12} height={34} dy={8} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} width={46} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
        <Tooltip formatter={fmtNum} labelStyle={{ fontWeight: 700 }} />
        <Legend iconType="plainline" wrapperStyle={{ fontSize: 12, paddingTop: 6 }} />
        <Area
          type="monotone"
          dataKey="real2026"
          stroke="#3b82f6"
          strokeWidth={2.5}
          fill="url(#gradReal2026)"
          name="Real 2026"
          connectNulls={false}
          dot={{ r: 3, fill: "#3b82f6", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="presupuesto2026"
          stroke="#f59e0b"
          strokeWidth={2}
          strokeDasharray="7 5"
          dot={false}
          name="Presupuesto 2026"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
