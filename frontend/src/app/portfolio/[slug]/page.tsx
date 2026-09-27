import type { Metadata } from "next";
import { PortfolioDetail } from "@/components/portfolio/portfolio";
import { projects } from "@/data/site";
import { siteMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return siteMetadata({
    title: p ? `${p.title} — Case Study` : "Case Study",
    description: p?.summary ?? "",
    openGraph: p ? { title: p.title, description: p.summary, images: [{ url: p.image }] } : {},
  });
}

export default async function PortfolioSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PortfolioDetail slug={slug} />;
}
