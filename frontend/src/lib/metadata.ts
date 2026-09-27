import type { Metadata } from "next";

const SITE = "https://nainitsolutions.com";

export function siteMetadata(partial: Partial<Metadata> & { slug?: string }): Metadata {
  return {
    metadataBase: new URL(SITE),
    openGraph: { type: "website", siteName: "NainIT Solutions", ...(partial.openGraph ?? {}) },
    twitter: { card: "summary_large_image", ...(partial.twitter ?? {}) },
    ...partial,
  } as Metadata;
}
