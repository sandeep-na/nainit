"use client";
import { createContext, useContext, useSyncExternalStore } from "react";
const ThemeContext = createContext({ dark: false, toggle: () => {} });
function subscribe(callback: () => void) {
  const sync = () => { document.documentElement.classList.toggle("dark", snapshot()); callback(); };
  sync();
  window.addEventListener("storage", sync);
  window.addEventListener("nainit-theme", sync);
  return () => { window.removeEventListener("storage", sync); window.removeEventListener("nainit-theme", sync); };
}
function snapshot() { try { return localStorage.getItem("nainit_theme") === "dark"; } catch { return false; } }
export function ThemeProvider({children}:{children:React.ReactNode}) {
 const dark = useSyncExternalStore(subscribe, snapshot, () => false);
 const toggle = () => { try { localStorage.setItem("nainit_theme", dark ? "light" : "dark"); window.dispatchEvent(new Event("nainit-theme")); } catch { /* Storage unavailable. */ } };
 return <ThemeContext.Provider value={{dark,toggle}}>{children}</ThemeContext.Provider>;
}
export const useTheme=()=>useContext(ThemeContext);
