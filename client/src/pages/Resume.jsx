
import React, { useMemo } from "react";
import { profile, education, certifications, skills } from "../data/profile.js";
import { Mail, Phone, MapPin, Download, Award, GraduationCap, CheckCircle } from "lucide-react";
import "./Resume.css";

function categorize(skillsArr = []) {
  const cat = {
    Languages: [],
    Backend: [],
    Databases: [],
    "Cloud / AWS": [],
    Messaging: [],
    "Auth & Security": [],
    Realtime: [],
    Tools: [],
  };

  skillsArr.forEach((s) => {
    const n = (s?.name || s || "").toLowerCase();

    if (["javascript", "typescript", "html", "css"].some(k => n.includes(k))) cat["Languages"].push(s.name);
    else if (["node", "express", "nest"].some(k => n.includes(k))) cat["Backend"].push(s.name);
    else if (["dynamo", "mongo", "postgres", "pgadmin", "sequelize", "mongoose"].some(k => n.includes(k))) cat["Databases"].push(s.name);
    else if (["aws", "lambda", "api gateway", "apigateway", "s3", "cognito", "layer", "iot", "cloudwatch"].some(k => n.includes(k))) cat["Cloud / AWS"].push(s.name);
    else if (["mqtt", "rabbit", "bull"].some(k => n.includes(k))) cat["Messaging"].push(s.name);
    else if (["jwt", "o auth", "oauth"].some(k => n.includes(k))) cat["Auth & Security"].push(s.name);
    else if (["socket"].some(k => n.includes(k))) cat["Realtime"].push(s.name);
    else if (["docker", "git", "postman", "bitbucket", "jira", "slack", "trello", "smtp", "stripe", "twlio", "twilio"].some(k => n.includes(k))) cat["Tools"].push(s.name);
    else cat["Tools"].push(s.name);
  });

  // de-dup & sort
  Object.keys(cat).forEach(k => cat[k] = [...new Set(cat[k])].sort());
  return cat;
}

export default function Resume() {
  const grouped = useMemo(() => categorize(skills), [skills]);

  return (
    <div className="resume">
      <div className="res-grid">

        {/* Header */}
        <section className="res-card res-header">
          <div className="res-title">
            <h1>{profile?.name}</h1>
            <p className="muted">{profile?.title}</p>
          </div>
          <div className="res-contact">
            {profile?.location && (
              <span><MapPin className="icon" />{profile.location}</span>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`}><Mail className="icon" />{profile.email}</a>
            )}
            {profile?.phone && (
              <span><Phone className="icon" />{profile.phone}</span>
            )}
            <a className="res-btn" href="/resume.pdf" download>
              <Download className="icon" /> Download PDF
            </a>
          </div>
        </section>

        {/* Education */}
        <section className="res-card">
          <h3 className="res-h3"><GraduationCap className="icon" /> Education</h3>
          <ul className="timeline">
            {(education || []).map((e, i) => (
              <li key={i}>
                <span className="dot" aria-hidden="true" />
                <div className="t-content">
                  <div className="t-title">{e.school}</div>
                  <div className="t-sub">{e.degree}</div>
                  <div className="t-period">{e.period}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Certifications */}
        <section className="res-card">
          <h3 className="res-h3"><Award className="icon" /> Certifications</h3>
          <ul className="certs">
            {(certifications || []).map((c, i) => (
              <li key={i}>
                <CheckCircle className="icon" />
                {c.link ? (
                  <a href={c.link} target="_blank" rel="noreferrer">{c.name}</a>
                ) : c.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="res-card res-skills">
          <h3 className="res-h3">Key Skills</h3>
          {Object.entries(grouped).map(([label, items]) => (
            items.length ? (
              <div className="skill-group" key={label}>
                <div className="g-title">{label}</div>
                <div className="chips">
                  {items.map((s) => <span className="chip" key={s}>{s}</span>)}
                </div>
              </div>
            ) : null
          ))}
        </section>
      </div>
    </div>
  );
}
