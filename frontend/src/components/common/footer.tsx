import Link from "next/link";
import { services } from "@/data/services";
import { industries } from "@/data/industries";

const companyLinks = [
  ["About", "/about"],
  ["Work", "/portfolio"],
  ["Blog", "/blog"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
];

const socials = [
  ["X", "X"],
  ["in", "LinkedIn"],
  ["GH", "GitHub"],
  ["YT", "YouTube"],
];

export function Footer() {
  return (
    <footer className="company-footer">
      <div className="company-footer-inner">
        <div className="company-footer-main">
          <div className="company-footer-brand">
            <div className="company-footer-brand-row">
              <Link href="/" aria-label="NainIT home" className="font-display text-2xl font-extrabold">
                Nain<span className="bg-[linear-gradient(92deg,#38bdf8_0%,#8b5cf6_55%,#2dd4bf_100%)] bg-clip-text text-transparent">IT</span>
              </Link>
              <div className="company-footer-socials" aria-label="Social profiles">
                {socials.map(([label, name]) => (
                  <a key={name} href="#" aria-label={`NainIT on ${name}`} className="active:scale-[0.96]">
                    {label}
                  </a>
                ))}
              </div>
            </div>
            <p>Premium engineering for ambitious teams — web, mobile, cloud, AI and growth under one roof.</p>
            <a className="company-footer-email" href="mailto:hello@nainitsolutions.com">
              hello@nainitsolutions.com <span aria-hidden>↗</span>
            </a>
          </div>

          <div className="company-footer-navigation">
            <nav aria-label="Footer services">
              <h2>Services</h2>
              <ul>
                {services.slice(0, 6).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`}>{service.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Footer industries">
              <h2>Industries</h2>
              <ul>
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>{industry.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="company-footer-company" aria-label="Footer company">
              <h2>Company</h2>
              <ul>
                {companyLinks.map(([label, href]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="company-footer-bottom">
          <span>© {new Date().getFullYear()} NainIT Solutions</span>
          <span className="company-footer-signoff"><i aria-hidden />Crafted with precision</span>
        </div>
      </div>
    </footer>
  );
}
