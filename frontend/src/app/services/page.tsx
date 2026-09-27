import type { Metadata } from "next";
import { Services } from "@/components/services/services";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Services — NainIT Solutions",
  description: "Web & app development, cloud, UI/UX, DevOps, cybersecurity, AI/ML and digital marketing — fixed scope, senior team.",
});

export default function ServicesPage() {
  return <Services />;
}
