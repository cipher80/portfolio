import React from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/profile.js";

export default function ProjectDetail() {
  const { slug } = useParams();
  const p = (projects || []).find(x => x.slug === slug);
  if (!p) return <div className="card">Project not found. <Link to="/projects">Back</Link></div>;
  return (
    <div className="card">
      <h2>{p.title}</h2>
      <p>{p.desc}</p>
      <div className="tags">{(p.tags || []).map(t => <span key={t} className="tag">{t}</span>)}</div>
      <p><Link to="/projects">← Back to projects</Link></p>
    </div>
  );
}
