import { useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import type { ItemAgosto } from "../data/types";

interface Props {
  items: ItemAgosto[];
  maxVisible?: number;
}

export function ProductRank({ items, maxVisible = 12 }: Props) {
  const [showAll, setShowAll] = useState(false);
  const data = showAll ? items : items.slice(0, maxVisible);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={Math.max(280, data.length * 28)}>
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 24, top: 4, bottom: 4 }}>
          <XAxis type="number" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
          <YAxis type="category" dataKey="item" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={180} />
          <Tooltip formatter={(v: unknown) => `${Number(v).toLocaleString("es-CO")} kg`} />
          <Bar dataKey="cantidad" fill="#2563eb" radius={[0, 3, 3, 0]} barSize={18} />
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
