import type { Metadata } from "next";
import { Portfolio } from "@/components/portfolio/portfolio";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Work — NainIT Solutions",
  description: "Case studies across healthcare, fintech, e-commerce and education with measurable results.",
});

export default function PortfolioPage() {
  return <Portfolio />;
}
