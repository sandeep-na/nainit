"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CtaBanner } from "@/components/common/cta-banner";
import { posts } from "@/data/site";
import type { Post } from "@/types";
import styles from "./blog.module.css";

const topics = ["All insights", ...new Set(posts.map((post) => post.tags[0]))];
const dateLabel = (date: string) => new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("");

function useSavedArticles() {
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const read = () => {
      try {
        const value: unknown = JSON.parse(localStorage.getItem("nainit-reading-list") || "[]");
        setSaved(Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []);
      } catch { setNotice("Saved articles are unavailable in this browser."); }
    };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);
  function toggle(slug: string) {
    const next = saved.includes(slug) ? saved.filter((item) => item !== slug) : [...saved, slug];
    try {
      localStorage.setItem("nainit-reading-list", JSON.stringify(next));
      setSaved(next);
      setNotice(next.includes(slug) ? "Article saved on this device." : "Article removed from your reading list.");
    } catch { setNotice("Your browser could not save this article. Please allow local storage."); }
  }
  return { saved, toggle, notice };
}

function Author({ post }: { post: Post }) {
  return <div className={styles.author}><span className={styles.avatar} aria-hidden="true">{initials(post.author)}</span><div><strong>{post.author}</strong><span><time dateTime={post.date}>{dateLabel(post.date)}</time> · {post.readTime} read</span></div></div>;
}

function ArticleCard({ post, saved, toggle }: { post: Post; saved: boolean; toggle: (slug: string) => void }) {
  return <article className={styles.card}>
    <Link href={`/blog/${post.slug}`} className={styles.cardImage} tabIndex={-1} aria-hidden="true"><Image src={post.image} alt="" width={680} height={420} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /></Link>
    <div className={styles.cardBody}>
      <div className={styles.cardTop}><span className={styles.tag}>{post.tags[0]}</span><button className={styles.save} onClick={() => toggle(post.slug)} aria-pressed={saved} aria-label={`${saved ? "Unsave" : "Save"} ${post.title}`}><Bookmark filled={saved} /></button></div>
      <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p>
      <div className={styles.cardFooter}><Author post={post} /><Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`} className={styles.arrow}>↗</Link></div>
    </div>
  </article>;
}

function Bookmark({ filled }: { filled: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6 4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17l-6-4-6 4Z" /></svg>;
}

export function Blog() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("All insights");
  const [sort, setSort] = useState("latest");
  const [savedOnly, setSavedOnly] = useState(false);
  const [visible, setVisible] = useState(6);
  const { saved, toggle, notice } = useSavedArticles();
  const filtered = posts.filter((post) => (topic === "All insights" || post.tags[0] === topic) && (!savedOnly || saved.includes(post.slug)) && `${post.title} ${post.excerpt} ${post.author} ${post.tags.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => sort === "oldest" ? a.date.localeCompare(b.date) : sort === "quick" ? parseInt(a.readTime) - parseInt(b.readTime) : b.date.localeCompare(a.date));
  const featured = posts[0];
  function reset() { setQuery(""); setTopic("All insights"); setSavedOnly(false); setSort("latest"); setVisible(6); }
  return <div className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.eyebrow}><span /> THE NAINIT JOURNAL</div>
      <h1>Ideas for what’s <span>next.</span></h1>
      <p>Fresh perspectives on technology, design, and building better digital experiences. From the people doing the work.</p>
      <a href="#insights" className={styles.explore}>Explore our insights <span aria-hidden="true">↓</span></a>
      <div className={styles.heroNote}>ENGINEERING · STRATEGY · INNOVATION</div>
    </section>
    <div className={styles.container}>
      <section aria-label="Featured article" className={styles.featured}>
        <Link href={`/blog/${featured.slug}`} className={styles.featuredImage} tabIndex={-1} aria-hidden="true"><Image src={featured.image} alt="" width={1000} height={700} sizes="(max-width: 800px) 100vw, 55vw" priority /><span>EDITOR’S PICK <span aria-hidden="true">↗</span></span></Link>
        <div className={styles.featuredCopy}><div className={styles.eyebrow}>FEATURED INSIGHT <span className={styles.line} /></div><span className={styles.tag}>{featured.tags[0]} / {featured.tags[1]}</span><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2><p>{featured.excerpt}</p><Author post={featured} /><Link className={styles.primary} href={`/blog/${featured.slug}`}>Read the story <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section id="insights" className={styles.insights} aria-labelledby="insights-title">
        <div className={styles.sectionHead}><div><div className={styles.eyebrow}>THE LATEST THINKING</div><h2 id="insights-title" tabIndex={-1}>A little insight. A big difference.</h2></div><a className={styles.feed} href="/blog/feed.xml">RSS feed ↗</a></div>
        <div className={styles.toolbar}><label className={styles.search}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span className="sr-only">Search articles</span><input type="search" placeholder="Search ideas, topics, or authors…" value={query} onChange={(event) => { setQuery(event.target.value); setVisible(6); }} /></label><label className={styles.sort}>Sort by <select value={sort} onChange={(event) => { setSort(event.target.value); setVisible(6); }}><option value="latest">Latest first</option><option value="oldest">Oldest first</option><option value="quick">Quick reads</option></select></label></div>
        <div className={styles.filters}><div className={styles.topics} aria-label="Filter by topic">{topics.map((item) => <button key={item} aria-pressed={topic === item} className={topic === item ? styles.active : ""} onClick={() => { setTopic(item); setVisible(6); }}>{item}</button>)}</div><button className={`${styles.savedFilter} ${savedOnly ? styles.active : ""}`} aria-pressed={savedOnly} onClick={() => { setSavedOnly(!savedOnly); setVisible(6); }}><Bookmark filled={savedOnly} /> Saved ({saved.length})</button></div>
        <div className={styles.results} role="status">{filtered.length} {filtered.length === 1 ? "article" : "articles"}{topic !== "All insights" ? ` in ${topic}` : " to inspire your next move"}{savedOnly ? " · Saved on this device" : ""}</div>
        <p className="sr-only" role="status">{notice}</p>
        {filtered.length ? <div className={styles.grid}>{filtered.slice(0, visible).map((post) => <ArticleCard key={post.slug} post={post} saved={saved.includes(post.slug)} toggle={toggle} />)}</div> : <div className={styles.empty}><h3>{savedOnly ? "Your next great read is out there." : "No articles found."}</h3><p>{savedOnly ? "Save articles using the bookmark icon, or try another search." : "Try another keyword or explore all our topics."}</p><button className={styles.primary} onClick={reset}>Explore all articles →</button></div>}
        {filtered.length > visible && <div className={styles.loadMore}><button className={styles.primary} onClick={() => setVisible(visible + 6)}>Load more articles ↓</button></div>}
      </section>
      <section className={styles.pathsSection} aria-labelledby="paths-title">
        <div className={styles.sectionHead}><div><div className={styles.eyebrow}>FIND YOUR STARTING POINT</div><h2 id="paths-title">What are you building next?</h2></div></div>
        <div className={styles.pathsGrid}>
          {[
            { number: "01", topic: "Strategy", title: "A stronger product", copy: "Turn the big idea into a focused first release. Explore product decisions, priorities, and practical next steps.", label: "Explore product strategy" },
            { number: "02", topic: "Engineering", title: "A foundation that scales", copy: "Make thoughtful architecture choices and build systems your team can keep improving with confidence.", label: "Explore engineering" },
            { number: "03", topic: "AI", title: "AI with a purpose", copy: "Move beyond the demo with grounded thinking on retrieval, evaluation, and the cost of running AI.", label: "Explore AI insights" },
          ].map((path) => <div className={styles.pathCard} key={path.topic}><span className={styles.pathNumber}>{path.number} / {path.topic}</span><h3>{path.title}</h3><p>{path.copy}</p><button onClick={() => { setTopic(path.topic); setQuery(""); setSavedOnly(false); setVisible(6); document.getElementById("insights")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); document.getElementById("insights-title")?.focus({ preventScroll: true }); }}>{path.label}<span aria-hidden="true">↗</span></button></div>)}
        </div>
      </section>
      <section className={styles.quickSection} aria-labelledby="quick-title">
        <div className={styles.quickIntro}><div className={styles.eyebrow}>SMALL BREAK. FRESH PERSPECTIVE.</div><h2 id="quick-title">Make your next<br />coffee break count.</h2><p>Short reads on the decisions that shape better software. Pick an idea and take it back to your team.</p><span className={styles.quickBadge}>A few minutes. A new point of view.</span></div>
        <div className={styles.quickList}>{[...posts].sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime)).slice(0, 3).map((post, index) => <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.quickItem}><span className={styles.quickNumber}>0{index + 1}</span><div><span className={styles.eyebrow}>{post.tags[0]} · {post.readTime} read</span><h3>{post.title}</h3></div><span aria-hidden="true">↗</span></Link>)}</div>
      </section>
      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div><div className={styles.eyebrow}>A FEW THINGS TO KNOW</div><h2 id="faq-title">Curiosity is welcome here.</h2><p>More about the journal and how to make it part of your reading routine.</p><Link href="/contact" className={styles.explore}>Have another question? Get in touch ↗</Link></div>
        <div className={styles.faqList}>{[
          ["What will I find in the NainIT Journal?", "Practical perspectives on software engineering, AI, DevOps, design, and product strategy. Start with a topic that matches your current challenge, or explore our curated reading paths."],
          ["Do I need an account to read or save articles?", "No account is needed. All articles are open to read. Use the bookmark icon to save an article on this browser and device, then select Saved to find it again. Clearing browser storage also clears your saved list."],
          ["How can I keep up with new articles?", "Add our RSS feed to your preferred feed reader. It lists the journal’s articles and picks up new posts as they are published."],
          ["Can I suggest a topic or discuss a project?", "Yes. Send your question or project context through our contact page. Tell us what you are working on and the challenge you would like to explore."],
        ].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
      </section>
      <section className={styles.follow}><div><div className={styles.eyebrow}>KEEP YOUR CURIOSITY CLOSE</div><h2>Good ideas deserve a follow-up.</h2><p>Add our journal to your RSS reader and get new insights as they’re published.</p></div><a href="/blog/feed.xml" className={styles.primary}>Follow the journal ↗</a></section>
    </div><CtaBanner />
  </div>;
}

export function BlogDetail({ slug }: { slug: string }) {
  const post = posts.find((item) => item.slug === slug);
  const { saved, toggle, notice } = useSavedArticles();
  const [shareMessage, setShareMessage] = useState("");
  async function copyLink() {
    try { await navigator.clipboard.writeText(window.location.href); setShareMessage("Article link copied."); }
    catch { setShareMessage("Copy the URL from your address bar to share this article."); }
  }
  if (!post) return null;
  const related = posts.filter((item) => item.slug !== slug).sort((a, b) => Number(b.tags.some((tag) => post.tags.includes(tag))) - Number(a.tags.some((tag) => post.tags.includes(tag)))).slice(0, 3);
  const url = encodeURIComponent(`https://nainitsolutions.com/blog/${post.slug}`);
  return <div className={styles.page}>
    <header className={`${styles.container} ${styles.articleHeader}`}><nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Home</Link><span>/</span><Link href="/blog">Journal</Link><span>/</span><span>{post.tags[0]}</span></nav><div className={styles.eyebrow}>{post.tags.join(" / ")}</div><h1>{post.title}</h1><p>{post.excerpt}</p><div className={styles.articleMeta}><Author post={post} /><button className={styles.savedFilter} aria-pressed={saved.includes(slug)} onClick={() => toggle(slug)}><Bookmark filled={saved.includes(slug)} />{saved.includes(slug) ? "Saved" : "Save for later"}</button></div><p className="sr-only" role="status">{notice}</p><Image src={post.image} alt="" width={1280} height={640} priority sizes="(max-width: 1280px) 100vw, 1280px" className={styles.cover} /></header>
    <div className={`${styles.container} ${styles.readingLayout}`}><aside className={styles.articleAside}><nav aria-label="On this page"><div className={styles.eyebrow}>IN THIS ARTICLE</div>{post.content.map((_, index) => <a key={index} href={`#section-${index + 1}`}>{post.headings?.[index] || (index === 0 ? "The context" : index === post.content.length - 1 ? "Putting it into practice" : "Our approach")}</a>)}</nav><div className={styles.share}><strong>Share this insight</strong><button onClick={copyLink}>Copy link ↗</button><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${url}`}>Email ↗</a><span role="status">{shareMessage}</span></div></aside>
      <article className={styles.articleBody}>{post.content.map((paragraph, index) => <section key={index} id={`section-${index + 1}`}><h2>{post.headings?.[index] || (index === 0 ? "The context" : index === post.content.length - 1 ? "Putting it into practice" : "Our approach")}</h2><p>{paragraph}</p></section>)}<div className={styles.authorBox}><Author post={post} /><p>Perspectives from the NainIT team on engineering, product, and digital experiences.</p><Link href="/contact">Talk to our team →</Link></div><Link href="/blog" className={styles.explore}>← Back to all insights</Link></article></div>
    <section className={`${styles.container} ${styles.related}`}><div className={styles.sectionHead}><div><div className={styles.eyebrow}>KEEP EXPLORING</div><h2>Your next good read.</h2></div><Link href="/blog">All insights ↗</Link></div><div className={styles.grid}>{related.map((item) => <ArticleCard key={item.slug} post={item} saved={saved.includes(item.slug)} toggle={toggle} />)}</div></section><CtaBanner />
  </div>;
}
