// import React from 'react';
// import { Link } from 'react-router-dom';
// import { posts } from '../data/profile.js';


// export default function Blog(){
// return (
// <div className="grid">
// {posts.map(p => (
// <div className="card" key={p.slug}>
// <div className="kicker">{new Date(p.date).toLocaleDateString()}</div>
// <h3><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3>
// <p dangerouslySetInnerHTML={{__html: (p.html || '').slice(0,120) + '…'}}></p>
// </div>
// ))}
// </div>
// );
// }

import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/profile.js";

export default function Blog() {
  const list = posts || [];
  return (
    <div className="grid">
      {list.map(p=>(
        <div className="card" key={p.slug}>
          <div className="kicker">{new Date(p.date).toLocaleDateString()}</div>
          <h3><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3>
          <p dangerouslySetInnerHTML={{__html:(p.html||'').slice(0,120)+'…'}} />
        </div>
      ))}
    </div>
  );
}

