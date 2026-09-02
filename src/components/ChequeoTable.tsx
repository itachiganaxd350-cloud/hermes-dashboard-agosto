import { useState } from "react";
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
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[hsl(var(--color-border))]">
              <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">#</th>
              <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Producto</th>
              <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Cervalles ($)</th>
              <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">T.A. ($)</th>
              <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Var. T.A.</th>
              <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">P. Especial ($)</th>
              <th className="text-right py-2 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Var. Esp.</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p, i) => (
              <tr
                key={p.item}
                className="border-b border-[hsl(var(--color-border))]/50 hover:bg-[hsl(var(--color-surface))] transition-colors"
              >
                <td className="py-1.5 pr-3 text-[hsl(var(--color-muted))] font-mono text-xs">{i + 1}</td>
                <td className="py-1.5 pr-3 font-medium">{p.item}</td>
                <td className="py-1.5 pr-3 text-right font-mono tabular-nums">{fmtFull(p.cervalle)}</td>
                <td className="py-1.5 pr-3 text-right font-mono tabular-nums">{fmtFull(p.ta)}</td>
                <td
                  className={`py-1.5 pr-3 text-right font-mono tabular-nums font-medium ${
                    (p.var_ta ?? 0) >= 0 ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]"
                  }`}
                >
                  {p.var_ta != null ? `${p.var_ta >= 0 ? "+" : ""}${fmtFull(p.var_ta)}` : "—"}
                </td>
                <td className="py-1.5 pr-3 text-right font-mono tabular-nums">
                  {typeof p.precio_especial === "number" ? fmtFull(p.precio_especial) : p.precio_especial}
                </td>
                <td
                  className={`py-1.5 text-right font-mono tabular-nums font-medium ${
                    (p.var_especial ?? 0) >= 0 ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]"
                  }`}
                >
                  {p.var_especial != null ? `${p.var_especial >= 0 ? "+" : ""}${fmtFull(p.var_especial)}` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
