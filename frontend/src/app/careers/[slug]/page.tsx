import type { Metadata } from "next";
import { JobDetail } from "@/components/careers/job-detail";
import { jobs } from "@/data/site";
import { siteMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const j = jobs.find((x) => x.slug === slug);
  return siteMetadata({
    title: j ? `${j.title} — Careers at NainIT` : "Role — NainIT Careers",
    description: j ? `${j.title} · ${j.team} · ${j.location} · ${j.type} · ${j.salary}. ${j.description}` : "",
  });
}

export default async function JobSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <JobDetail slug={slug} />;
}
