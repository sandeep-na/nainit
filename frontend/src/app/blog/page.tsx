import type { Metadata } from "next";
import { Blog } from "@/components/blog/blog";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Blog — NainIT Solutions",
  description: "Explore the NainIT Journal: practical perspectives on software engineering, AI, design, DevOps, and digital product strategy.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/blog/feed.xml" } },
});

export default function BlogPage() {
  return <Blog />;
}
