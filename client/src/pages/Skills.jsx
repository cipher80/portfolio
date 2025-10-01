import React from "react";
import { skills } from "../data/profile.js";

export default function Skills() {
  const list = skills || [];
  return (
    <div className="grid">
      {list.map(s=>(
        <div className="card" key={s.name}>
          <h3 style={{marginBottom:6}}>{s.name}</h3>
          <div className="bar">
            {/* <div style={{width:(s.level||0)+'%'}}/> */}
            </div>
          {/* <small>{s.level || 0}%</small> */}
        </div>
      ))}
    </div>
  );
}
