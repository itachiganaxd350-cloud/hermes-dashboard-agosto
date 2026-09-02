export interface KilosData {
  meses: string[];
  venta2024: (number | null)[];
  real2025: (number | null)[];
  presupuesto2026: (number | null)[];
  real2026: (number | null)[];
  crecimiento2026: (number | null)[];
  cumplimientoPpto2026: (number | null)[];
  totals: {
    venta2024: number;
    real2025: number;
    presupuesto2026: number;
    real2026: number;
    ytd: {
      venta2024: number;
      real2025: number;
      presupuesto2026: number;
      real2026: number;
      meses: number;
    };
  };
}

export interface ItemCantidad {
  item: string;
  cantidad: number;
}

export interface ItemAgosto extends ItemCantidad {
  variacion: number | null;
}

export interface Precio {
  item: string;
  cervalle: number;
  ta: number;
  var_ta: number | null;
  precio_especial: number;
  var_especial: number | null;
}

export interface CanalesData {
  terrazas: Record<string, (number | null)[]>;
  comercializadora: Record<string, (number | null)[]>;
  meses: string[];
}

export interface Dataset {
  kilos: KilosData;
  cierreJulio: ItemCantidad[];
  cierreAgosto: ItemAgosto[];
  precios: Precio[];
  canales: CanalesData;
}
