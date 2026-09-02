import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";
import type { ItemAgosto } from "../data/types";

interface Props {
  items: ItemAgosto[];
  maxVisible?: number;
}

const TOP = ["#3b82f6", "#3b82f6", "#3b82f6"];

export function ProductRank({ items, maxVisible = 12 }: Props) {
  const [showAll, setShowAll] = useState(false);
  const data = showAll ? items : items.slice(0, maxVisible);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={Math.max(300, data.length * 26 + 40)}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 32, top: 4, bottom: 4 }} barCategoryGap="26%">
          <defs>
            <linearGradient id="gradRank" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
          <YAxis
            type="category"
            dataKey="item"
            tick={{ fontSize: 10.5, fill: "hsl(var(--color-text))" }}
            tickLine={false}
            axisLine={false}
            width={176}
          />
          <Tooltip
            formatter={(v: unknown) => `${Number(v).toLocaleString("es-CO", { maximumFractionDigits: 1 })} kg`}
            cursor={{ fill: "hsl(var(--color-muted) / 0.06)" }}
            labelStyle={{ fontWeight: 700 }}
          />
          <Bar dataKey="cantidad" name="Kilos" radius={[0, 5, 5, 0]} maxBarSize={16}>
            {data.map((_, i) => (
              <Cell key={i} fill={i < TOP.length ? "url(#gradRank)" : "#60a5fa"} fillOpacity={i < TOP.length ? 1 : 0.45} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {items.length > maxVisible && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-[hsl(var(--color-brand))] hover:underline cursor-pointer"
        >
          {showAll ? "Ver menos" : `Ver todos los ${items.length} productos`}
        </button>
      )}
    </div>
  );
}
