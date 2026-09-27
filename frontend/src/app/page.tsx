import type { Metadata } from "next";
import { Home } from "@/components/home/home";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "NainIT Solutions — Web, Mobile, Cloud & AI Engineering",
  description:
    "Premium IT services: web & app development, cloud, UI/UX, DevOps, cybersecurity, AI/ML and growth marketing. 120+ projects, 98% retention.",
});

export default function HomePage() {
  return <Home />;
}
