import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceContent } from "@/data/service-content";
import { ServiceDetail } from "@/components/services/service-detail";
import { services } from "@/data/services";
import { siteMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s || !getServiceContent(slug)) notFound();
  return siteMetadata({
    title: s ? `${s.title} — NainIT Solutions` : "Service — NainIT Solutions",
    description: s?.description ?? "",
    openGraph: s ? { title: s.title, description: s.tagline, images: [{ url: s.image }] } : {},
  });
}

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  const content = getServiceContent(slug);
  if (!service || !content) notFound();
  return <ServiceDetail service={service} content={content} />;
}
