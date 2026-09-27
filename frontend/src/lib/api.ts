const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("nainit_token") : null;
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      signal: options.signal ?? AbortSignal.timeout(15000),
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers ?? {}),
      },
    });
  } catch {
    throw new Error("We couldn’t reach the server. Please try again shortly.");
  }
  const data = await res.json().catch(() => null);
  if (!res.ok || !data) {
    const message = data?.errors?.map((e: { message: string }) => e.message).join(". ") || data?.message || "The service is temporarily unavailable. Please try again.";
    throw new ApiError(message, res.status);
  }
  return data as T;
}

export interface CallRequest {
  name: string;
  email: string;
  company: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  timeZone: string;
  service: string;
  message: string;
}
export interface Inquiry { id: string; name: string; email: string; message: string; company: string; status: "new" | "replied" | "archived"; createdAt: string; callRequest?: { preferredDate: string; preferredTime: string; timeZone: string; service: string; phone: string } }
export interface JobApplication {
  id: string; name: string; email: string; phone: string; jobSlug: string; jobTitle: string;
  link: string; experience: string; coverNote: string; status: "new" | "shortlisted" | "rejected" | "hired"; createdAt: string;
}
export const api = {
  me: () => request<{ id: string; name: string; email: string; role: "client" | "admin" }>("/auth/me"),
  inquiries: () => request<{ data: Inquiry[] }>("/contact"),
  applications: () => request<{ data: JobApplication[] }>("/applications"),
  updateInquiry: (id: string, status: Inquiry["status"]) => request<{ status: Inquiry["status"] }>(`/contact/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  updateApplication: (id: string, status: JobApplication["status"]) => request<{ status: JobApplication["status"] }>(`/applications/${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  login: (email: string, password: string) =>
    request<{ token: string; user: { id: string; name: string; email: string; role: "client" | "admin" } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  contact: (payload: { name: string; email: string; company?: string; message: string }) =>
    request<{ ok: boolean }>("/contact", { method: "POST", body: JSON.stringify(payload) }),
  scheduleCall: (payload: CallRequest) =>
    request<{ ok: boolean; id: string }>("/contact/schedule", { method: "POST", body: JSON.stringify(payload) }),
  apply: (payload: {
    jobSlug: string;
    jobTitle: string;
    name: string;
    email: string;
    phone?: string;
    link: string;
    experience: string;
    coverNote?: string;
  }) => request<{ ok: boolean; id: string }>("/applications", { method: "POST", body: JSON.stringify(payload) }),
};
