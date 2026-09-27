import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard/dashboard";

export const metadata: Metadata = { title: "Admin Dashboard — NainIT Solutions", description: "NainIT administration.", robots: { index: false, follow: false } };

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams;
  return <Dashboard key={preview === "1" ? "preview" : "live"} preview={preview === "1"} />;
}
