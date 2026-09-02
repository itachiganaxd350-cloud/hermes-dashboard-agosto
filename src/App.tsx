import { useState } from "react";
import dataset from "./data/dataset.json";
import { Dashboard } from "./components/Dashboard";
import type { Dataset } from "./data/types";

const data = dataset as Dataset;

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleTheme = () => {
    setDark((p) => {
      const next = !p;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Apply initial theme
  document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");

  return <Dashboard data={data} dark={dark} toggleTheme={toggleTheme} />;
}
