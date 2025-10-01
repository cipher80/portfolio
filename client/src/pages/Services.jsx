import React from "react";
import { services } from "../data/profile.js";

export default function Services() {
  const list = services || [];
  return (
    <div className="grid">
      {list.map((s,i)=>(
        <div className="card" key={i}>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
