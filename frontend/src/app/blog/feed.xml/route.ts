import { posts } from "@/data/site";

export const dynamic = "force-static";

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[character]!);

export function GET() {
  const base = "https://nainitsolutions.com";
  const items = [...posts].sort((a, b) => b.date.localeCompare(a.date)).map((post) => {
    const url = `${base}/blog/${post.slug}`;
    return `<item><title>${escapeXml(post.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}</item>`;
  }).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>The NainIT Journal</title><link>${base}/blog</link><description>Perspectives on engineering, design, and digital products from NainIT Solutions.</description><language>en</language><atom:link href="${base}/blog/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
