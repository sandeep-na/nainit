"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const admin = pathname === "/dashboard" || pathname.startsWith("/dashboard/");
  return <>{!admin && <Navbar />}<main id="main" className={admin ? "flex-1 pt-0" : "company-site-main flex-1 pt-0"} tabIndex={-1}>{children}</main>{!admin && <Footer />}</>;
}
