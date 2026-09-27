"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { api, ApiError, type Inquiry, type JobApplication } from "@/lib/api";
import { demoApplications, demoInquiries, library, libraryCategories } from "./dashboard-data";
import styles from "./dashboard.module.css";

type Section = "overview" | "inquiries" | "calls" | "applications" | "content" | "settings";
type Selected = { kind: "inquiry" | "application"; id: string } | null;
const sections: { id: Section; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "inquiries", label: "Project inquiries", icon: "inbox" },
  { id: "calls", label: "Call requests", icon: "calendar" },
  { id: "applications", label: "Applications", icon: "briefcase" },
  { id: "content", label: "Website library", icon: "layers" },
  { id: "settings", label: "Workspace", icon: "settings" },
];
const descriptions: Record<Section, string> = {
  overview: "Your website, conversations, and next steps. All in one place.",
  inquiries: "Review new opportunities and keep every conversation moving.",
  calls: "Review preferred times and follow up to confirm each call.",
  applications: "Get to know your next great teammate.",
  content: "Explore the pages and content that make up your website.",
  settings: "Your account, connected workflows, and website shortcuts.",
};
const shortDate = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const avatar = (name: string) => name.split(" ").filter(Boolean).slice(0, 2).map(part => part[0]).join("");
const safeUrl = (value: string) => { try { const url = new URL(value); return ["http:", "https:"].includes(url.protocol) ? url.href : null; } catch { return null; } };

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    inbox: "M4 5h16v14H4z M4 12h5l2 3h2l2-3h5",
    calendar: "M4 5h16v16H4z M8 2v6 M16 2v6 M4 11h16 M8 15h2 M14 15h2",
    briefcase: "M3 7h18v13H3z M8 7V3h8v4 M3 12l9 3 9-3 M12 12v4",
    layers: "m12 3 10 5-10 5L2 8z M2 12l10 5 10-5 M2 16l10 5 10-5",
    settings: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M12 2v3 M12 19v3 M2 12h3 M19 12h3 M5 5l2 2 M17 17l2 2 M5 19l2-2 M17 7l2-2",
    search: "M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15 M16 16l5 5",
  };
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.grid} /></svg>;
}
function Badge({ status }: { status: string }) { return <span className={styles.badge} data-status={status}><span />{status}</span>; }
function Empty({ title, copy }: { title: string; copy: string }) { return <div className={styles.empty}><Icon name="inbox" /><h3>{title}</h3><p>{copy}</p></div>; }

function InquiryTable({ rows, section, openRecord }: { rows: Inquiry[]; section: Section; openRecord: (kind: "inquiry", id: string) => void }) {
    return <div className={styles.tableWrap}><table><thead><tr><th>Contact</th><th>{section === "calls" ? "Preferred time" : "Interest"}</th><th>Status</th><th>Received</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{rows.map(item => <tr key={item.id}><td><div className={styles.person}><span className={styles.avatar}>{avatar(item.name)}</span><div><strong>{item.name}</strong><span>{item.company || item.email}</span></div></div></td><td>{section === "calls" && item.callRequest ? <><strong>{item.callRequest.preferredDate} · {item.callRequest.preferredTime}</strong><small>{item.callRequest.timeZone}</small></> : <><strong>{item.callRequest ? "Discovery call" : "Project inquiry"}</strong><small>{item.callRequest?.service || "Contact form"}</small></>}</td><td><Badge status={item.status} /></td><td className={styles.muted}>{shortDate(item.createdAt)}</td><td><button className={styles.rowButton} onClick={() => openRecord("inquiry", item.id)} aria-label={`View inquiry from ${item.name}`}>View ↗</button></td></tr>)}</tbody></table></div>;
  }

export function Dashboard({ preview = false }: { preview?: boolean }) {
  const { user, loading: authLoading, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const router = useRouter();
  const [activityDate] = useState(() => Date.now());
  const [section, setSection] = useState<Section>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => preview ? demoInquiries() : []);
  const [applications, setApplications] = useState<JobApplication[]>(() => preview ? demoApplications() : []);
  const [loading, setLoading] = useState(!preview);
  const [errors, setErrors] = useState<{ inquiries?: string; applications?: string }>({});
  const [refresh, setRefresh] = useState(0);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("All content");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Selected>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [operationError, setOperationError] = useState("");

  useEffect(() => {
    if (!preview && !authLoading && user?.role !== "admin") router.replace("/admin/login");
  }, [preview, authLoading, user, router]);
  useEffect(() => {
    if (preview || user?.role !== "admin") return;
    let active = true;
    async function load() {
      setLoading(true);
      const results = await Promise.allSettled([api.inquiries(), api.applications()]);
      if (!active) return;
      const nextErrors: { inquiries?: string; applications?: string } = {};
      for (const result of results) {
        if (result.status === "rejected" && result.reason instanceof ApiError && [401, 403].includes(result.reason.status)) {
          logout(); router.replace("/admin/login"); return;
        }
      }
      if (results[0].status === "fulfilled") setInquiries(results[0].value.data);
      else nextErrors.inquiries = results[0].reason instanceof Error ? results[0].reason.message : "Could not load inquiries.";
      if (results[1].status === "fulfilled") setApplications(results[1].value.data);
      else nextErrors.applications = results[1].reason instanceof Error ? results[1].reason.message : "Could not load applications.";
      setErrors(nextErrors);
      setLoading(false);
    }
    void load();
    return () => { active = false; };
  }, [preview, user, refresh, logout, router]);

  function navigate(next: Section) { setSection(next); setQuery(""); setStatus("all"); setPage(1); setMobileNav(false); setSelected(null); setNotice(""); setOperationError(""); }
  function openRecord(kind: "inquiry" | "application", id: string) { setSelected({ kind, id }); setOperationError(""); setNotice(""); }
  async function updateStatus(next: string) {
    if (!selected || (!preview && user?.role !== "admin")) return;
    setSaving(true); setOperationError(""); setNotice("");
    try {
      if (selected.kind === "inquiry") {
        const newStatus = preview ? next as Inquiry["status"] : (await api.updateInquiry(selected.id, next as Inquiry["status"])).status;
        setInquiries(items => items.map(item => item.id === selected.id ? { ...item, status: newStatus } : item));
      } else {
        const newStatus = preview ? next as JobApplication["status"] : (await api.updateApplication(selected.id, next as JobApplication["status"])).status;
        setApplications(items => items.map(item => item.id === selected.id ? { ...item, status: newStatus } : item));
      }
      setNotice(preview ? "Sample status updated for this preview session." : "Status saved.");
    } catch (error) { if (error instanceof ApiError && [401, 403].includes(error.status)) { logout(); router.replace("/admin/login"); return; } setOperationError(error instanceof Error ? error.message : "Could not save the status. Please try again."); }
    finally { setSaving(false); }
  }
  function resetPreview() { setInquiries(demoInquiries()); setApplications(demoApplications()); setSelected(null); setPage(1); setNotice("Preview data reset."); }

  if (!preview && (authLoading || user?.role !== "admin")) return <div className={styles.authLoading} role="status">Opening your admin workspace…</div>;
  const calls = inquiries.filter(item => item.callRequest);
  const newCount = inquiries.filter(item => item.status === "new").length;
  const newApplications = applications.filter(item => item.status === "new").length;
  const inquiryRows = (section === "calls" ? calls : inquiries).filter(item => (status === "all" || item.status === status) && `${item.name} ${item.email} ${item.company} ${item.message} ${item.callRequest?.service || ""}`.toLowerCase().includes(query.toLowerCase()));
  const applicationRows = applications.filter(item => (status === "all" || item.status === status) && `${item.name} ${item.email} ${item.jobTitle}`.toLowerCase().includes(query.toLowerCase()));
  const contentRows = library.filter(item => (category === "All content" || item.category === category) && `${item.title} ${item.detail}`.toLowerCase().includes(query.toLowerCase()));
  const rowCount = section === "content" ? contentRows.length : section === "applications" ? applicationRows.length : inquiryRows.length;
  const pageSize = section === "content" ? 10 : 6;
  const effectivePage = Math.min(page, Math.max(1, Math.ceil(rowCount / pageSize)));
  const offset = (effectivePage - 1) * pageSize;
  const selectedInquiry = selected?.kind === "inquiry" ? inquiries.find(item => item.id === selected.id) : undefined;
  const selectedApplication = selected?.kind === "application" ? applications.find(item => item.id === selected.id) : undefined;
  const current = sections.find(item => item.id === section)!;
  const name = preview ? "Alex" : user!.name.split(" ")[0];


  return <div className={styles.shell}>
    <aside className={`${styles.sidebar} ${mobileNav ? styles.navOpen : ""}`} id="admin-navigation">
      <Link href="/" className={styles.logo}>Nain<span>IT</span><small>ADMIN WORKSPACE</small></Link>
      <div className={styles.workspace}><span className={styles.workspaceIcon}>N</span><div><strong>NainIT Solutions</strong><small>{preview ? "Preview workspace" : "Administrator workspace"}</small></div><span className={styles.online} /></div>
      <div className={styles.navLabel}>WORKSPACE</div>
      <nav aria-label="Admin navigation">{sections.map((item, index) => <div key={item.id}>{index === 4 && <div className={styles.navLabel}>WEBSITE</div>}<button aria-current={section === item.id ? "page" : undefined} className={section === item.id ? styles.navActive : ""} onClick={() => navigate(item.id)}><Icon name={item.icon} /><span>{item.label}</span>{item.id === "inquiries" && newCount > 0 && <b>{newCount}</b>}{item.id === "applications" && newApplications > 0 && <b>{newApplications}</b>}</button></div>)}</nav>
      <div className={styles.sidebarBottom}><div className={styles.helpCard}><strong>Your next opportunity<br />starts with a reply.</strong><p>Keep an eye on new inquiries and call requests.</p><button onClick={() => navigate("inquiries")}>Open inbox →</button></div><Link href="/" className={styles.visit}>↗ Visit website</Link><div className={styles.profile}><span className={styles.avatar}>{preview ? "AL" : avatar(user!.name)}</span><div><strong>{preview ? "Alex · Demo admin" : user!.name}</strong><small>{preview ? "Sample data only" : "Administrator"}</small></div></div></div>
    </aside>
    <div className={styles.main}>
      <header className={styles.topbar}><div><button className={styles.menuToggle} onClick={() => setMobileNav(!mobileNav)} aria-expanded={mobileNav} aria-controls="admin-navigation" aria-label={mobileNav ? "Close admin navigation" : "Open admin navigation"}>{mobileNav ? "✕" : "☰"}</button><span className={styles.breadcrumb}>Workspace <span>/</span> <strong>{current.label}</strong></span></div><div className={styles.topActions}><span className={styles.mode}>{preview ? "Preview mode" : "Admin access"}</span><button onClick={toggle} aria-label="Toggle dashboard theme" className={styles.theme}>{dark ? "☀" : "☾"}</button><Link href="/" className={styles.websiteLink}>View website ↗</Link></div></header>
      {mobileNav && <button className={styles.backdrop} aria-label="Close admin navigation" onClick={() => setMobileNav(false)} />}
      <div className={styles.content}>
        {preview && <div className={styles.previewBanner}><div><strong>You’re exploring the admin preview.</strong><span>Sample inbox data. Changes last for this visit and never update the live website.</span></div><button onClick={resetPreview}>Reset demo</button><Link href="/admin/login">Admin sign in ↗</Link></div>}
        <div className={styles.heading}><div><div className={styles.eyebrow}>NAINIT CONTROL CENTER</div><h1>{section === "overview" ? `Welcome back, ${name}.` : current.label}</h1><p>{descriptions[section]}</p></div><div className={styles.headingActions}>{section === "overview" ? <><button className={styles.secondary} disabled={loading} onClick={() => preview ? resetPreview() : setRefresh(value => value + 1)}>{loading ? "Refreshing…" : "Refresh ↻"}</button><button className={styles.primary} onClick={() => navigate("inquiries")}>Open inbox <span>↗</span></button></> : section !== "content" && section !== "settings" && <button className={styles.secondary} disabled={loading} onClick={() => preview ? resetPreview() : setRefresh(value => value + 1)}>{loading ? "Refreshing…" : preview ? "Reset sample data ↻" : "Refresh data ↻"}</button>}</div></div>
        <p role="status" className={notice ? styles.notice : "sr-only"}>{notice}</p>
        {Object.entries(errors).map(([source, message]) => <div key={source} role="alert" className={styles.error}><strong>{source === "inquiries" ? "Inquiry inbox" : "Application inbox"}: </strong>{message}<button onClick={() => setRefresh(value => value + 1)}>Try again</button></div>)}
        {loading && <p role="status" className={styles.loading}>Loading the latest records…</p>}

        {section === "overview" && <>
          <div className={styles.statGrid}>{[
            { title: "Project inquiries", value: inquiries.length, hint: `${newCount} awaiting a reply`, icon: "inbox", target: "inquiries" as Section, unavailable: !!errors.inquiries },
            { title: "Call requests", value: calls.length, hint: "Preferred times to review", icon: "calendar", target: "calls" as Section, unavailable: !!errors.inquiries },
            { title: "Applications", value: applications.length, hint: `${newApplications} ready for review`, icon: "briefcase", target: "applications" as Section, unavailable: !!errors.applications },
            { title: "Website content", value: library.length, hint: `${libraryCategories.length} content collections`, icon: "layers", target: "content" as Section, unavailable: false },
          ].map((stat, index) => <button key={stat.title} className={styles.statCard} data-tone={index} onClick={() => navigate(stat.target)}><div><span>{stat.title}</span><span className={styles.statIcon}><Icon name={stat.icon} /></span></div><strong>{stat.unavailable || (loading && stat.target !== "content") ? "—" : stat.value.toString().padStart(2, "0")}</strong><small>{stat.unavailable ? "Data unavailable" : stat.hint}<span>↗</span></small></button>)}</div>
          <div className={styles.overviewGrid}><section className={styles.panel}><div className={styles.panelHead}><div><h2>Inbox at a glance</h2><p>Inquiry activity · last 7 days (UTC)</p></div><span className={styles.softTag}>{preview ? "Sample activity" : "Recent records"}</span></div>{errors.inquiries ? <Empty title="Activity unavailable" copy="Retry loading inquiries to view recent activity." /> : <ActivityChart inquiries={inquiries} now={activityDate} />}</section><section className={`${styles.panel} ${styles.actionPanel}`}><div className={styles.eyebrow}>MAKE YOUR NEXT MOVE</div><h2>A little follow-up.<br />A lot of possibility.</h2><p>{newCount ? `${newCount} new conversations are waiting in your inbox.` : "You’re up to date. Explore your website or check the hiring pipeline."}</p><button onClick={() => navigate("inquiries")}>Review inquiries <span>→</span></button><button onClick={() => navigate("applications")}>Explore applications <span>→</span></button></section></div>
          <section className={styles.panel}><div className={styles.panelHead}><div><h2>Recent conversations</h2><p>The people ready to build something with you.</p></div><button className={styles.textButton} onClick={() => navigate("inquiries")}>View all inquiries →</button></div>{inquiries.length ? <InquiryTable section={section} openRecord={openRecord} rows={inquiries.slice(0, 4)} /> : <Empty title={loading ? "Loading conversations" : "Your inbox starts here"} copy="Contact submissions and call requests will appear here." />}</section>
          <section className={styles.collections}><div className={styles.panelHead}><div><h2>Your website, organized.</h2><p>A place for every part of the NainIT story.</p></div><button className={styles.textButton} onClick={() => navigate("content")}>Open library →</button></div><div>{libraryCategories.map(item => <button key={item} onClick={() => { navigate("content"); setCategory(item); }}><span><Icon name="layers" />{item}</span><strong>{library.filter(row => row.category === item).length}<small> items ↗</small></strong></button>)}</div></section>
        </>}

        {["inquiries", "calls", "applications", "content"].includes(section) && <>
          {section === "calls" && <div className={styles.info}>These are requested times, not confirmed calendar bookings. Contact the visitor to agree on a time and share the meeting link. Updating a status does not send an email.</div>}
          {section === "content" && <><div className={styles.info}>This library reflects the public website’s published content. Content edits are managed in the website source files; use “View page” to inspect each page.</div><div className={styles.categoryTabs}>{["All content", ...libraryCategories].map(item => <button key={item} aria-pressed={category === item} onClick={() => { setCategory(item); setPage(1); }}>{item}</button>)}</div></>}
          <section className={styles.panel}><div className={styles.toolbar}><label className={styles.search}><Icon name="search" /><span className="sr-only">Search {current.label}</span><input type="search" placeholder={section === "content" ? "Search website content…" : "Search names, email, or details…"} value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></label>{section !== "content" && <label className={styles.filter}>Status<select value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="all">All statuses</option>{(section === "applications" ? ["new", "shortlisted", "rejected", "hired"] : ["new", "replied", "archived"]).map(item => <option key={item}>{item}</option>)}</select></label>}</div>
            {rowCount === 0 ? <Empty title={query || status !== "all" ? "No matching records" : loading ? "Loading records" : "Nothing here yet"} copy={query || status !== "all" ? "Try another search or change the status filter." : "New website submissions will appear here."} /> : section === "content" ? <div className={styles.tableWrap}><table><thead><tr><th>Title</th><th>Collection</th><th>Visibility</th><th>Action</th></tr></thead><tbody>{contentRows.slice(offset, offset + pageSize).map(item => <tr key={item.href}><td><strong>{item.title}</strong><small>{item.detail}</small></td><td>{item.category}</td><td><Badge status="published" /></td><td><Link href={item.href} target="_blank" className={styles.rowButton}>View page ↗</Link></td></tr>)}</tbody></table></div> : section === "applications" ? <div className={styles.tableWrap}><table><thead><tr><th>Candidate</th><th>Role</th><th>Status</th><th>Received</th><th>Action</th></tr></thead><tbody>{applicationRows.slice(offset, offset + pageSize).map(item => <tr key={item.id}><td><div className={styles.person}><span className={styles.avatar}>{avatar(item.name)}</span><div><strong>{item.name}</strong><span>{item.email}</span></div></div></td><td><strong>{item.jobTitle}</strong><small>{item.experience}</small></td><td><Badge status={item.status} /></td><td>{shortDate(item.createdAt)}</td><td><button className={styles.rowButton} onClick={() => openRecord("application", item.id)}>Review ↗</button></td></tr>)}</tbody></table></div> : <InquiryTable section={section} openRecord={openRecord} rows={inquiryRows.slice(offset, offset + pageSize)} />}
            <div className={styles.pagination}><span role="status">{rowCount ? `${offset + 1}–${Math.min(offset + pageSize, rowCount)} of ${rowCount}` : "0 records"}</span><div><button disabled={effectivePage === 1} onClick={() => setPage(effectivePage - 1)}>← Previous</button><span>{effectivePage}</span><button disabled={offset + pageSize >= rowCount} onClick={() => setPage(effectivePage + 1)}>Next →</button></div></div>
          </section>
        </>}

        {section === "settings" && <div className={styles.settingsGrid}><section className={styles.panel}><div className={styles.panelHead}><h2>Your workspace</h2><Badge status={preview ? "preview" : "admin"} /></div><div className={styles.settingsBody}><div className={styles.profile}><span className={styles.avatar}>{preview ? "AL" : avatar(user!.name)}</span><div><strong>{preview ? "Alex · Demo admin" : user!.name}</strong><small>{preview ? "demo@example.com" : user!.email}</small></div></div><p>{preview ? "Explore the interface and try status updates with sample records. Sign in to access real website submissions." : "You have administrator access to project inquiries, call requests, and job applications."}</p>{preview ? <Link href="/admin/login" className={styles.primary}>Sign in as administrator ↗</Link> : <button className={styles.secondary} onClick={() => { logout(); router.push("/admin/login"); }}>Sign out</button>}</div></section><section className={styles.panel}><div className={styles.panelHead}><h2>Website workflows</h2></div><div className={styles.workflowList}><div><strong>Contact & call requests</strong><span>Stored in the inquiry inbox. Calls require manual confirmation.</span></div><div><strong>Careers</strong><span>Applications go to the hiring inbox. Update the status as candidates progress.</span></div><div><strong>Website content</strong><span>Published from source files. Library pages open the current public content.</span></div><div><strong>Email & calendar</strong><span>Follow up manually. Automatic emails and meeting invites are not configured.</span></div></div></section><section className={styles.panel}><div className={styles.panelHead}><h2>Quick links</h2></div><div className={styles.quickLinks}>{[["Schedule a call", "/schedule-call"], ["Contact page", "/contact"], ["Careers", "/careers"], ["The journal", "/blog"]].map(([label, href]) => <Link key={href} href={href} target="_blank">{label}<span>↗</span></Link>)}</div></section></div>}
        <footer className={styles.footer}><span>NainIT Solutions · Admin workspace</span><span>{preview ? "Preview data · resets when you reload" : "Inbox: latest 50 inquiries and 100 applications"}</span></footer>
      </div>
    </div>
    {(selectedInquiry || selectedApplication) && <RecordDialog key={selected!.id} inquiry={selectedInquiry} application={selectedApplication} preview={preview} saving={saving} error={operationError} notice={notice} onClose={() => setSelected(null)} onStatus={updateStatus} />}
  </div>;
}

function ActivityChart({ inquiries, now }: { inquiries: Inquiry[]; now: number }) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now - (6 - index) * 86400000);
    const key = date.toISOString().slice(0, 10);
    return { key, label: date.toLocaleDateString("en-GB", { weekday: "short", timeZone: "UTC" }), count: inquiries.filter(item => item.createdAt.slice(0, 10) === key).length };
  });
  const max = Math.max(1, ...days.map(day => day.count));
  return <div className={styles.chart}><div className={styles.chartTotal}><strong>{days.reduce((total, day) => total + day.count, 0)}</strong><span>inquiries received</span></div><div className={styles.bars} role="img" aria-label={`Daily inquiry counts: ${days.map(day => `${day.label} ${day.count}`).join(", ")}`}>{days.map(day => <div key={day.key}><span>{day.count}</span><div className={styles.barTrack}><div style={{ height: `${day.count / max * 100}%` }} /></div><small>{day.label}</small></div>)}</div></div>;
}

function RecordDialog({ inquiry, application, preview, saving, error, notice, onClose, onStatus }: { inquiry?: Inquiry; application?: JobApplication; preview: boolean; saving: boolean; error: string; notice: string; onClose: () => void; onStatus: (status: string) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = ref.current;
    dialog?.showModal();
    return () => { dialog?.close(); trigger?.focus(); };
  }, []);
  const record = inquiry || application!;
  const portfolio = application ? safeUrl(application.link) : null;
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="record-title" onCancel={event => { event.preventDefault(); if (!saving) onClose(); }}><div className={styles.dialogHeading}><div><div className={styles.eyebrow}>{application ? "CANDIDATE PROFILE" : inquiry?.callRequest ? "CALL REQUEST" : "PROJECT INQUIRY"}</div><h2 id="record-title">{record.name}</h2></div><button disabled={saving} onClick={onClose} aria-label="Close record">✕</button></div><div className={styles.dialogBody}><Badge status={record.status} /><dl><div><dt>Email</dt><dd>{record.email}</dd></div><div><dt>Received</dt><dd>{new Date(record.createdAt).toLocaleString("en-GB", { timeZone: "UTC" })} UTC</dd></div>{inquiry?.company && <div><dt>Company</dt><dd>{inquiry.company}</dd></div>}{application && <><div><dt>Role</dt><dd>{application.jobTitle}</dd></div><div><dt>Experience</dt><dd>{application.experience}</dd></div>{application.phone && <div><dt>Phone</dt><dd>{application.phone}</dd></div>}</>}</dl>{inquiry?.callRequest && <div className={styles.callDetails}><strong>Preferred call · 30 minutes</strong><p>{inquiry.callRequest.preferredDate} at {inquiry.callRequest.preferredTime}</p><p>{inquiry.callRequest.timeZone}</p><p>{inquiry.callRequest.service}</p>{inquiry.callRequest.phone && <p>{inquiry.callRequest.phone}</p>}<small>Confirm the time and meeting details with the visitor.</small></div>}<h3>{application ? "Cover note" : "Project details"}</h3><p className={styles.message}>{inquiry?.message || application?.coverNote || "No cover note provided."}</p><div className={styles.recordActions}>{!preview && <a className={styles.secondary} href={`mailto:${record.email}?subject=${encodeURIComponent(application ? `Your application: ${application.jobTitle}` : "Your NainIT inquiry")}`}>Open email draft ↗</a>}{portfolio && <a className={styles.secondary} href={portfolio} target="_blank" rel="noopener noreferrer">View portfolio ↗</a>}</div><label className={styles.statusControl}>Update status<select value={record.status} disabled={saving} onChange={event => void onStatus(event.target.value)}>{(application ? ["new", "shortlisted", "rejected", "hired"] : ["new", "replied", "archived"]).map(item => <option key={item}>{item}</option>)}</select></label><small className={styles.muted}>{preview ? "Preview changes stay in this browser session." : "Status changes are saved immediately. No email is sent."}</small>{saving && <p role="status">Saving status…</p>}{error && <p role="alert" className={styles.error}>{error}</p>}<p role="status" className={styles.notice}>{notice}</p></div></dialog>;
}
