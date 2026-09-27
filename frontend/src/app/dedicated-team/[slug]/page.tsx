import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllTeamRoles, getTeamRole } from "@/data/dedicated-team";
import { RoleDetail } from "@/components/dedicated-team/role-detail";
import { siteMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTeamRoles().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = getTeamRole(slug);
  if (!found) notFound();
  const { role } = found;
  return siteMetadata({
    title: `${role.title} — Dedicated Team | NainIT Solutions`,
    description: role.tagline,
  });
}

export default async function DedicatedTeamSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = getTeamRole(slug);
  if (!found) notFound();
  const { role, category } = found;
  return <RoleDetail role={role} category={category} />;
}
