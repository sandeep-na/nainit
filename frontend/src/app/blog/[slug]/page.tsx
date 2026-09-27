import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetail } from "@/components/blog/blog";
import { posts } from "@/data/site";
import { siteMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  return siteMetadata({
    alternates: { canonical: `/blog/${p.slug}` },
    title: `${p.title} — NainIT Blog`,
    description: p.excerpt,
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.date, authors: [p.author], tags: p.tags, url: `/blog/${p.slug}`, images: [{ url: p.image }] },
  });
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post) notFound();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: new URL(post.image, "https://nainitsolutions.com").href,
    datePublished: post.date,
    author: { "@type": post.author === "NainIT Editorial Team" ? "Organization" : "Person", name: post.author },
    publisher: { "@type": "Organization", name: "NainIT Solutions" },
    mainEntityOfPage: `https://nainitsolutions.com/blog/${post.slug}`,
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <BlogDetail key={slug} slug={slug} />
  </>;
}
