import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getIndustryContent } from "@/data/industry-content";
import { IndustryDetail } from "@/components/industries/industry-detail";
import { industries } from "@/data/industries";
import { siteMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = industries.find((x) => x.slug === slug);
  return siteMetadata({
    title: i ? `${i.title} Software — NainIT Solutions` : "Industry — NainIT Solutions",
    description: i?.description ?? "",
    openGraph: i ? { title: i.title, description: i.tagline, images: [{ url: i.image }] } : {},
  });
}

export default async function IndustrySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = industries.find((item) => item.slug === slug);
  const content = getIndustryContent(slug);
  if (!industry || !content) notFound();
  return <IndustryDetail key={slug} industry={industry} content={content} />;
}
