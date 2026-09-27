import type { Metadata } from "next";
import { Industries } from "@/components/industries/industries";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Industries — NainIT Solutions",
  description: "Healthcare, fintech, e-commerce, education, real estate and manufacturing — tailored software for each vertical.",
});

export default function IndustriesPage() {
  return <Industries />;
}
