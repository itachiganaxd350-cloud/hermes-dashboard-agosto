import { useState, useEffect, Component, type ReactNode } from "react";
import dataset from "./data/dataset.json";
import { Dashboard } from "./components/Dashboard";
import type { Dataset } from "./data/types";

const data = dataset as Dataset;

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 32, fontFamily: "monospace", background: "#fff", color: "#000" }}>
          <h1 style={{ color: "red", fontSize: 20 }}>Error en el dashboard</h1>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>{this.state.error.message}</pre>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 8, fontSize: 12, color: "#666" }}>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch { return false; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const toggleTheme = () => {
    setDark((p) => {
      const next = !p;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  console.log("[App] Rendering with data:", { kilos: !!data.kilos, cierreJulio: data.cierreJulio?.length, cierreAgosto: data.cierreAgosto?.length });

  return (
    <ErrorBoundary>
      <Dashboard data={data} dark={dark} toggleTheme={toggleTheme} />
    </ErrorBoundary>
  );
}
