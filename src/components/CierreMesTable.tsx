import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { ItemAgosto, ItemCantidad } from "../data/types";

interface Props {
  julio: ItemCantidad[];
  agosto: ItemAgosto[];
  maxVisible?: number;
}

const fmtKg = (n: number) =>
  n.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 1 });

export function CierreMesTable({ julio, agosto, maxVisible = 12 }: Props) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? agosto : agosto.slice(0, maxVisible);
  const julioMap = new Map(julio.map((j) => [j.item, j.cantidad]));
  const totalJulio = julio.reduce((a, b) => a + b.cantidad, 0);
  const totalAgosto = agosto.reduce((a, b) => a + b.cantidad, 0);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-[hsl(var(--color-border))]">
              <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">#</th>
              <th className="text-left py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Producto</th>
              <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Julio 2026 (kg)</th>
              <th className="text-right py-2 pr-3 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Agosto 2026 (kg)</th>
              <th className="text-right py-2 font-semibold text-[hsl(var(--color-muted))] text-[11px] uppercase tracking-wider">Variación</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item, i) => {
              const julioVal = julioMap.get(item.item) ?? 0;
              const varPos = (item.variacion ?? 0) >= 0;
              return (
                <tr
                  key={item.item}
                  className="border-b border-[hsl(var(--color-border))]/50 hover:bg-[hsl(var(--color-surface))] transition-colors"
                >
                  <td className="py-1.5 pr-3 text-[hsl(var(--color-muted))] font-mono text-xs">{i + 1}</td>
                  <td className="py-1.5 pr-3 font-medium">{item.item}</td>
                  <td className="py-1.5 pr-3 text-right font-mono tabular-nums">{julioVal > 0 ? fmtKg(julioVal) : "—"}</td>
                  <td className="py-1.5 pr-3 text-right font-mono tabular-nums">{fmtKg(item.cantidad)}</td>
                  <td
                    className={`py-1.5 text-right font-mono tabular-nums font-medium ${
                      varPos ? "text-[hsl(var(--color-positive))]" : "text-[hsl(var(--color-negative))]"
                    }`}
                  >
                    {item.variacion != null ? `${item.variacion >= 0 ? "+" : ""}${fmtKg(item.variacion)}` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[hsl(var(--color-border))] font-bold">
              <td className="py-2 pr-3"></td>
              <td className="py-2 pr-3">TOTAL</td>
              <td className="py-2 pr-3 text-right font-mono tabular-nums">{fmtKg(totalJulio)}</td>
              <td className="py-2 pr-3 text-right font-mono tabular-nums">{fmtKg(totalAgosto)}</td>
              <td
                className={`py-2 text-right font-mono tabular-nums ${
                  totalAgosto - totalJulio >= 0
                    ? "text-[hsl(var(--color-positive))]"
                    : "text-[hsl(var(--color-negative))]"
                }`}
              >
                {totalAgosto - totalJulio >= 0 ? "+" : ""}
                {fmtKg(totalAgosto - totalJulio)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
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
