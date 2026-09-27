import type { Metadata } from "next";
import { AdminLogin } from "@/components/auth/auth";

export const metadata: Metadata = {
  title: "Admin Login — NainIT Solutions",
  description: "Administrator access to NainIT Solutions.",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLogin />;
}
