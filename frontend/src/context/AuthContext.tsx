"use client";
import { createContext, useCallback, useEffect, useContext, useMemo, useState } from "react";
import type { User } from "@/types";
import { api } from "@/lib/api";

interface AuthState {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const restore = async () => {
      try {
        const token = localStorage.getItem("nainit_token");
        if (token) {
          const account = await api.me();
          if (account.role !== "admin") {
            localStorage.removeItem("nainit_token");
            localStorage.removeItem("nainit_user");
          } else if (active) setUser({ ...account, token });
        }
      } catch {
        try {
          localStorage.removeItem("nainit_token");
          localStorage.removeItem("nainit_user");
        } catch { /* Storage may be disabled; keep the session signed out. */ }
      } finally {
        if (active) setLoading(false);
      }
    };
    void restore();
    return () => { active = false; };
  }, []);

  const persist = (u: User, token: string) => {
    localStorage.setItem("nainit_token", token);
    setUser(u);
  };

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.login(email, password);
    if (res.user.role !== "admin") throw new Error("Administrator access required.");
    persist({ ...res.user, token: res.token }, res.token);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("nainit_user");
    localStorage.removeItem("nainit_token");
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
