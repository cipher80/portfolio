import React from "react";
import { experiences } from "../data/profile.js";

export default function Experience() {
  const list = experiences || [];
  return (
    <div className="card">
      <h2>Experience</h2>
      <div className="tl">
        {list.map((e,i)=>(
          <div className="item" key={i}>
            <h4>{e.role} — {e.company}</h4>
            <div><small>{e.period}</small></div>
            <p>{e.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
