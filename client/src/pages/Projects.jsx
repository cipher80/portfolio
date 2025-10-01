// import React from 'react';

// export default function Projects(){
//   const items = [
//     { title: 'DRIFY', desc: 'Single-category delivery app (USA). Node/React/AWS.' },
//     { title: 'Punya NGO', desc: 'APIs + WhatsApp integration to support education & nutrition.' },
//     { title: 'The Designers Class', desc: 'Next.js front-end for education platform.' },
//     { title: 'My GST Cafe', desc: 'GST filing platform: Node, Express, PostgreSQL, Sequelize.' },
//   ];
//   return (
//     <div className="grid">
//       {items.map((p,i)=> (
//         <div className="card" key={i}>
//           <h3>{p.title}</h3>
//           <p>{p.desc}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/profile.js';


export default function ProjectDetail(){
const { slug } = useParams();
const p = projects.find(x => x.slug === slug);
if (!p) return <div className="card">Project not found. <Link to="/projects">Back</Link></div>;
return (
<div className="card">
<h2>{p.title}</h2>
<p>{p.desc}</p>
<div className="tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
<p><Link to="/projects">← Back to projects</Link></p>
</div>
);
}
