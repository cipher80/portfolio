// import React from 'react';

// export default function About(){
//   return (
//     <div className="grid">
//       <div className="card">
//         <h2>About Me</h2>
//         <p>Node.js / Express / NestJS • React • TypeScript • PostgreSQL • MongoDB • AWS</p>
//       </div>
//       <div className="card">
//         <h3>Contact</h3>
//         <ul>
//           <li>Email: sandeeptiwari.jim.mca.2021@gmail.com</li>
//           <li>GitHub: github.com/cipher80</li>
//           <li>LinkedIn: linkedin.com/in/sandeep-tiwari-3b7868261</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

import React from "react";
import {
  Mail, Github, Linkedin, MapPin, Briefcase, Download,
  Rocket, Users, Server, GitBranch, Award
} from "lucide-react";
import "./About.css";

const START_YEAR = 2021; // 👈 change if you started earlier
const YEARS = Math.max(1, new Date().getFullYear() - START_YEAR);

const KPIS = [
  { icon: Briefcase, label: "Years experience", value: `${YEARS}+` },
  { icon: Rocket,    label: "Projects shipped", value: "24+" },
  { icon: Server,    label: "Prod uptime",      value: "99.9%" },
  { icon: Users,     label: "Active clients",   value: "6+" },
];

const EXTRAS = [
  { icon: GitBranch, label: "Open-source", value: "github.com/cipher80", href: "https://github.com/cipher80" },
  { icon: Award,     label: "Certification", value: "AWS CCP (in progress)" },
];

export default function About() {
  return (
    <div className="grid about">
      {/* Left: About */}
      <div className="card a-card">
        <div className="a-header">
          <img
            className="a-avatar"
            src="src/sandeep.jpeg"
            alt="Sandeep Tiwari"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div className="a-titlewrap">
            <h2 className="a-title">About Me</h2>
            <p className="a-sub">Backend Node.js Developer</p>
          </div>
        </div>

        <p className="a-lead">
          I build resilient APIs, IoT backends and event-driven services using Node.js/NestJS on AWS.
          I care about clean contracts, security, and observability.
        </p>

        <div className="a-chips" aria-label="Key tech">
          {[
            "Node.js","Express","NestJS","TypeScript","PostgreSQL","MongoDB",
            "AWS (IoT Core, Lambda, API Gateway, Cognito, S3)","MQTT","Docker"
          ].map((t) => (
            <span key={t} className="a-chip">{t}</span>
          ))}
        </div>

        <div className="a-quick">
          <span><MapPin className="icon" /> India</span>
          <span><Briefcase className="icon" /> Open to full-time or contract</span>
        </div>

        <div className="a-actions">
          <a className="btn btn-primary" href="/contact">Contact</a>
          <a className="btn btn-ghost" href="/resume.pdf" download>
            <Download className="icon" /> Download Resume
          </a>
        </div>
      </div>

      {/* Right: Contact links */}
      <div className="card a-card">
        <h3 className="a-h3">Contact</h3>
        <ul className="a-links">
          <li>
            <Mail className="icon" />
            <a href="mailto:sandeeptiwari.jim.mca.2021@gmail.com">sandeeptiwari.jim.mca.2021@gmail.com</a>
          </li>
          <li>
            <Github className="icon" />
            <a href="https://github.com/cipher80" target="_blank" rel="noreferrer">github.com/cipher80</a>
          </li>
          <li>
            <Linkedin className="icon" />
            <a href="https://www.linkedin.com/in/sandeep-tiwari-3b7868261" target="_blank" rel="noreferrer">
              linkedin.com/in/sandeep-tiwari-3b7868261
            </a>
          </li>
        </ul>
      </div>

      {/* NEW: Fun facts card */}
      <div className="card a-card a-stats">
        <h3 className="a-h3">Fun facts</h3>

        <ul className="kpis">
          {KPIS.map(({ icon: Icon, label, value }) => (
            <li key={label} className="kpi">
              <span className="k-ico"><Icon className="icon" /></span>
              <div className="k-text">
                <div className="k-val">{value}</div>
                <div className="k-lbl">{label}</div>
              </div>
            </li>
          ))}
        </ul>

        <ul className="extra-list">
          {EXTRAS.map(({ icon: Icon, label, value, href }) => (
            <li key={label}>
              <Icon className="icon" />
              <span className="x-lbl">{label}:</span>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer">{value}</a>
              ) : (
                <span className="x-val">{value}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


