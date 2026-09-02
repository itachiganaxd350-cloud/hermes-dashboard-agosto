import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ItemAgosto, ItemCantidad } from "../data/types";
import { fmtFull } from "../lib/utils";

interface Props {
  julio: ItemCantidad[];
  agosto: ItemAgosto[];
  maxVisible?: number;
}

export function CierreMesTable({ julio, agosto, maxVisible = 12 }: Props) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? agosto : agosto.slice(0, maxVisible);
  const julioMap = new Map(julio.map((j) => [j.item, j.cantidad]));
  const totalJulio = julio.reduce((a, b) => a + b.cantidad, 0);
  const totalAgosto = agosto.reduce((a, b) => a + b.cantidad, 0);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[hsl(var(--color-border))]">
            <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">#</th>
            <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">Producto</th>
            <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">Julio 2026</th>
            <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">Agosto 2026</th>
            <th className="text-right py-2 font-semibold text-[hsl(var(--color-muted))]">Variación</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {visible.map((item, i) => {
              const julioVal = julioMap.get(item.item) ?? 0;
              return (
                <motion.tr
                  key={item.item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-[hsl(var(--color-border))]/50 hover:bg-[hsl(var(--color-surface))]/50 transition-colors"
                >
                  <td className="py-1.5 pr-3 text-[hsl(var(--color-muted))]">{i + 1}</td>
                  <td className="py-1.5 pr-3 font-medium">{item.item}</td>
                  <td className="py-1.5 pr-3 text-right font-mono">{fmtFull(julioVal)}</td>
                  <td className="py-1.5 pr-3 text-right font-mono">{fmtFull(item.cantidad)}</td>
                  <td className={`py-1.5 text-right font-mono font-medium ${(item.variacion ?? 0) >= 0 ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]"}`}>
                    {item.variacion != null ? `${item.variacion >= 0 ? "+" : ""}${fmtFull(item.variacion)}` : "—"}
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-[hsl(var(--color-border))] font-bold">
            <td className="py-2 pr-3"></td>
            <td className="py-2 pr-3">TOTAL</td>
            <td className="py-2 pr-3 text-right font-mono">{fmtFull(totalJulio)}</td>
            <td className="py-2 pr-3 text-right font-mono">{fmtFull(totalAgosto)}</td>
            <td className="py-2 text-right font-mono">{fmtFull(totalAgosto - totalJulio)}</td>
          </tr>
        </tfoot>
      </table>
      {agosto.length > maxVisible && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-[hsl(var(--color-brand))] hover:underline cursor-pointer"
        >
          {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showAll ? "Ver menos" : `Ver todos los ${agosto.length} productos`}
        </button>
      )}
    </div>
  );
}
