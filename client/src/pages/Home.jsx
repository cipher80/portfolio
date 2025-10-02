


import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code, Cpu, Server, Github, Mail, Link as LinkIcon, ExternalLink, ArrowRight,
} from "lucide-react";
import "./Home.css";

const API_BASE = import.meta.env.VITE_API_BASE || ""; // e.g. http://localhost:5000 in dev

const HIGHLIGHTS = [
  { label: "APIs shipped", value: "24+" },
  { label: "Prod uptime", value: "99.9%" },
  { label: "Peak QPS", value: "12k+" },
  { label: "Audited routes", value: "450+" },
];

const STACK = [
  "Node.js","TypeScript","Express","NestJS","PostgreSQL","MongoDB",
  "Redis","Aws DynamoDB","Aws Lambda","Aws Layers","Aws Cognito Sdk",
  "Aws ApiGateway","Aws Iot Core","Aws S3","MQtt","RabbitMQ","Docker",
  "CloudWatch","Twilio","Rapid Apis","Whats App Integration","Jwt",
  "O-Auth","Stripe Payment Gateway",
];

const FALLBACK_PROJECTS = [
  {
    title: "Digidot",
    blurb: "An Iot Project which Controlles smart devices through  C4,CRx controllers via connecting through Iot Bridges",
    bullets: ["AWS IoT Core","AWS Lambda","DynamoDB","RBAC","AWS Cloud watch","Aws Api Gateway"],
    tags: ["Node","AWS","DynamoDB","IoT Core"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "Drify",
    blurb: "Liquor delivery app ,SaaS based project for USA - Includes Admin ,Vendor ,Rider and User Modules",
    bullets: ["Node js","RBAC","Stripe","BullMQ","Redis"],
    tags: ["Sockets","PostgreSQL","Socket Io"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "The Punya Project",
    blurb: "Donation application for starving childrens in india.",
    bullets: ["Node js","Webhooks","Stripe Payment Gateway"],
    tags: ["Whats App Integration","Twilio","Mysql","Git"],
    links: { demo: "#", code: "#" },
  },
  {
    title: "Equipsee",
    blurb: "Inventory Management Software.",
    bullets: ["MongoDb","Webhooks","PayPal"],
    tags: ["Nestjs","Socket Io","Git"],
    links: { demo: "#", code: "#" },
  },
];

export default function Home() {
  const [apiStatus, setApiStatus] = useState("unknown");
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);

  // modal state
  const [contactOpen, setContactOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((r) => setApiStatus(r.ok ? "up" : "down"))
      .catch(() => setApiStatus("down"));

    fetch(`${API_BASE}/api/stats`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setStats(data))
      .catch(() => {});

    fetch(`${API_BASE}/api/projects`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => Array.isArray(data) && data.length && setProjects(data))
      .catch(() => {});
  }, []);

  async function submitForm(e, type) {
    e.preventDefault();
    setBusy(true);
    setMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.type = type;

    // build ISO datetime if user opened the "Book a call" modal
    if (type === "call") {
      const d = fd.get("date");
      const t = fd.get("time");
      if (d && t) payload.datetime = `${d}T${t}`;
    }

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let errorText = "";
      if (!res.ok) {
        try {
          const j = await res.json();
          errorText = j?.error || j?.message || "";
        } catch {}
        throw new Error(errorText || `HTTP ${res.status}`);
      }

      setMsg("Thanks! I’ll get back to you shortly.");
      e.currentTarget.reset();
    } catch (err) {
      setMsg("Something went wrong. Please try again.");
      console.error("contact submit error:", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="home">
      <a href="#content" className="sr-only">Skip to content</a>

      {/* Hero */}
      {/* <section className="hero-wrap">
        <div className="hero-gradient" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
              <span className="eyebrow"><Server className="icon" /> Backend  Developer</span>
              <h1 className="hero-title">Building resilient APIs & distributed backends</h1>
              <p className="hero-lead">
                I design and ship Node.js services with strong observability, security, and performance.
                From IoT bridges to payment flows—production-grade, end to end.
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary"><ArrowRight className="icon" /> View Projects</a>
                <a href="/resume.pdf" className="btn btn-ghost"><DownloadIcon className="icon" /> Download Resume</a>
                <button type="button"  className="btn btn-outline" onClick={() => setContactOpen(true)}>
                  <Mail className="icon" /> Contact
                </button>
              </div>
            </motion.div>

            <motion.div className="hero-right" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}>
              <div className="avatar-wrap">
                <img
                  src="src/sandeep.jpeg"
                  alt="Portrait of Sandeep Tiwari"
                  className="avatar"
                  loading="eager"
                  onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                />
              </div>

              <div className="highlights">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.label} className="highlight">
                    <div className="value">{stats?.[h.label] ?? h.value}</div>
                    <div className="label">{h.label}</div>
                  </div>
                ))}
              </div>

              <div className="api-status">
                <span className={`dot ${apiStatus === "up" ? "up" : apiStatus === "down" ? "down" : "unknown"}`} />
                API status: <strong>{apiStatus}</strong>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}


      <section className="hero-bleed">
  <div className="bg-grid" aria-hidden="true" />
  <div className="container-xl">
    <div className="hero-layout">
      {/* Left: copy */}
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="eyebrow">
          <Server className="icon" /> Backend  Developer
        </span>
        <h1 className="hero-title">
          Building resilient APIs & distributed backends
        </h1>
        <p className="hero-lead">
          I design and ship Node.js services with strong observability, security, and performance.
          From IoT bridges to payment flows—production-grade, end to end.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            <ArrowRight className="icon" /> View Projects
          </a>
          <a href="/resume.pdf" className="btn btn-ghost">
            <DownloadIcon className="icon" /> Download Resume
          </a>
          <button type="button" className="btn btn-outline" onClick={() => setContactOpen(true)}>
            <Mail className="icon" /> Contact
          </button>
        </div>
      </motion.div>

      {/* Right: avatar + signals */}
      <motion.aside
        className="hero-aside"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
      >
        <div className="avatar-frame">
          <img
            src="/sandeep.jpeg"            
            alt="Sandeep Tiwari"
            loading="eager"
            onError={(e)=>{ e.currentTarget.style.visibility='hidden'; }}
          />
        </div>

        <div className="aside-metrics">
          {HIGHLIGHTS.map((h) => (
            <div className="metric" key={h.label}>
              <div className="metric-val">{stats?.[h.label] ?? h.value}</div>
              <div className="metric-label">{h.label}</div>
            </div>
          ))}
        </div>

        <div className="api-status-row">
          <span className={`dot ${apiStatus === "up" ? "up" : apiStatus === "down" ? "down" : "unknown"}`} />
          <span>API status:&nbsp;<strong>{apiStatus}</strong></span>
        </div>
      </motion.aside>
    </div>
  </div>
</section>


      {/* Tech Stack */}
      <section id="content" className="section">
        <div className="container">
          <div className="badge-title"><Cpu className="icon" /> <span>Core stack</span></div>
          <div className="tokens pad-top" aria-label="Technology stack">
            {STACK.map((t) => (<span key={t} className="token">{t}</span>))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="section">
        <div className="container">
          <div className="row-between">
            <span className="badge-title"><Code className="icon" /> Featured projects</span>
            <a href="https://github.com/cipher80" className="link" target="_blank" rel="noreferrer">
              <Github className="icon" /> More on GitHub
            </a>
          </div>

          <div className="projects-grid">
            {projects.map((p, idx) => (
              <article key={idx} className="card">
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <ul>{p.bullets?.map((b) => <li key={b}>{b}</li>)}</ul>
                <div className="tokens">{p.tags?.map((t) => <span key={t} className="token">{t}</span>)}</div>
                <div className="links">
                  {p.links?.demo && <a className="link" href={p.links.demo}><ExternalLink className="icon" /> Demo</a>}
                  {p.links?.code && <a className="link" href={p.links.code}><LinkIcon className="icon" /> Code</a>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="section">
        <div className="container">
          <div className="cta">
            <div>
              <div className="h2">Have a backend challenge?</div>
              <div className="muted">I can help with API design, distributed jobs, observability, and DevOps.</div>
            </div>
            <div className="row wrap gap-sm">
              <button type="button" className="btn btn-primary" onClick={() => setContactOpen(true)}>
                <Mail className="icon" /> Email me
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setCallOpen(true)}>
                <CalendarIcon className="icon" /> Book a call
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <Modal open={contactOpen} onClose={() => { setContactOpen(false); setMsg(""); }}>
        <div className="modal-header">
          <div className="modal-title">Send a message</div>
          <button className="close" aria-label="Close" onClick={() => { setContactOpen(false); setMsg(""); }}>×</button>
        </div>
        <form className="form-grid" onSubmit={(e) => submitForm(e, "contact")}>
          <input name="name" className="input" placeholder="Your name" required />
          <input name="email" type="email" className="input" placeholder="Email" required />
          <input name="mobile" className="input full" placeholder="Mobile number" pattern="[0-9+ -]{7,}" />
          <textarea name="message" className="textarea full" placeholder="Message" required />
          {/* honeypot */}
          <input name="company" className="input full" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
          <div className="form-actions full">
            <button type="button" className="btn btn-outline" onClick={() => { setContactOpen(false); setMsg(""); }}>Cancel</button>
            <button disabled={busy} className="btn btn-primary" type="submit">{busy ? "Sending..." : "Send"}</button>
          </div>
          {msg && <div className="muted full">{msg}</div>}
        </form>
      </Modal>

      {/* Book a Call Modal (uses separate date+time inputs for reliability) */}
      <Modal open={callOpen} onClose={() => { setCallOpen(false); setMsg(""); }}>
        <div className="modal-header">
          <div className="modal-title">Book a call</div>
          <button className="close" aria-label="Close" onClick={() => { setCallOpen(false); setMsg(""); }}>×</button>
        </div>
        <form className="form-grid" onSubmit={(e) => submitForm(e, "call")}>
          <input name="name" className="input" placeholder="Your name" required />
          <input name="email" type="email" className="input" placeholder="Email" required />
          <input name="mobile" className="input full" placeholder="Mobile number" pattern="[0-9+ -]{7,}" />
          <input name="date" type="date" className="input" required />
          <input name="time" type="time" className="input" required />
          <textarea name="message" className="textarea full" placeholder="Anything specific you want to discuss?" />
          <div className="form-actions full">
            <button type="button" className="btn btn-outline" onClick={() => { setCallOpen(false); setMsg(""); }}>Cancel</button>
            <button disabled={busy} className="btn btn-primary" type="submit">{busy ? "Sending..." : "Confirm"}</button>
          </div>
          {msg && <div className="muted full">{msg}</div>}
        </form>
      </Modal>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sandeep Tiwari",
            jobTitle: "Backend Developer",
            url: "https://yourdomain.com",
            sameAs: ["https://github.com/yourname","https://www.linkedin.com/in/yourname/"],
          }),
        }}
      />
    </main>
  );
}

/* lightweight modal */
function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className={`modal ${open ? "open" : ""}`} role="dialog" aria-modal="true">
      <div className="backdrop" onClick={onClose} />
      <div className="modal-card" role="document">{children}</div>
    </div>
  );
}

/** Inline SVGs sized via `.icon` class */
function CalendarIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}

function DownloadIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  );
}

