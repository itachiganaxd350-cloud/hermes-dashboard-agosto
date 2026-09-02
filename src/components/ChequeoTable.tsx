import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Precio } from "../data/types";
import { fmtFull } from "../lib/utils";

interface Props {
  precios: Precio[];
}

export function ChequeoTable({ precios }: Props) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? precios : precios.slice(0, 8);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[hsl(var(--color-border))]">
            <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">#</th>
            <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">Producto</th>
            <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">Cervalles</th>
            <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">T.A.</th>
            <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">Var. T.A.</th>
            <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))]">P. Especial</th>
            <th className="text-right py-2 font-semibold text-[hsl(var(--color-muted))]">Var. Esp.</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {visible.map((p, i) => (
              <motion.tr
                key={p.item}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border-b border-[hsl(var(--color-border))]/50 hover:bg-[hsl(var(--color-surface))]/50 transition-colors"
              >
                <td className="py-1.5 pr-3 text-[hsl(var(--color-muted))]">{i + 1}</td>
                <td className="py-1.5 pr-3 font-medium">{p.item}</td>
                <td className="py-1.5 pr-3 text-right font-mono">{fmtFull(p.cervalle)}</td>
                <td className="py-1.5 pr-3 text-right font-mono">{fmtFull(p.ta)}</td>
                <td className={`py-1.5 pr-3 text-right font-mono font-medium ${(p.var_ta ?? 0) >= 0 ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]"}`}>
                  {p.var_ta != null ? `${p.var_ta >= 0 ? "+" : ""}${fmtFull(p.var_ta)}` : "—"}
                </td>
                <td className="py-1.5 pr-3 text-right font-mono">{typeof p.precio_especial === "number" ? fmtFull(p.precio_especial) : p.precio_especial}</td>
                <td className={`py-1.5 text-right font-mono font-medium ${(p.var_especial ?? 0) >= 0 ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]"}`}>
                  {p.var_especial != null ? `${p.var_especial >= 0 ? "+" : ""}${fmtFull(p.var_especial)}` : "—"}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
      {precios.length > 8 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-3 flex items-center gap-1 text-sm font-medium text-[hsl(var(--color-brand))] hover:underline cursor-pointer"
        >
          {showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showAll ? "Ver menos" : `Ver todos los ${precios.length} productos`}
        </button>
      )}
    </div>
  );
}
