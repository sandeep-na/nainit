import type { Metadata } from "next";
import { Contact } from "@/components/contact/contact";
import { siteMetadata } from "@/lib/metadata";

export const metadata: Metadata = siteMetadata({
  title: "Contact — NainIT Solutions",
  description: "Get a fixed-scope proposal within 48 hours. Offices in Noida and Austin.",
});

export default function ContactPage() {
  return <Contact />;
}
