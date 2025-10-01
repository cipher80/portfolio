// import React from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { posts } from '../data/profile.js';


// export default function BlogPost(){
// const { slug } = useParams();
// const p = posts.find(x => x.slug === slug);
// if (!p) return <div className="card">Post not found. <Link to="/blog">Back</Link></div>;
// return (
// <article className="card">
// <div className="kicker">{new Date(p.date).toLocaleDateString()}</div>
// <h1>{p.title}</h1>
// <div dangerouslySetInnerHTML={{__html:p.html}}></div>
// <p><Link to="/blog">← Back to blog</Link></p>
// </article>
// );
// }

import React from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { posts } from "../data/profile.js";
import "./Blog.css";

function formatDate(d) {
  try { return new Date(d).toLocaleDateString("en-GB"); } catch { return d; }
}

function readingTime(html, preset) {
  if (preset) return preset;
  const text = String(html || "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 220));
}

export default function BlogPost({ slug: slugProp }) {
  const { slug: slugFromRoute } = useParams?.() || {};
  const slug = slugProp || slugFromRoute;
  const post = posts.find((p) => p.slug === slug) || posts[0];

  const mins = readingTime(post?.html, post?.readingMins);

  return (
    <div className="blog-wrap">
      <div className="post-card">
        <div className="post-meta">
          <span className="row">
            <Calendar className="icon" />
            {formatDate(post?.date)}
          </span>
          <span className="row">
            <Clock className="icon" />
            {mins} min read
          </span>
        </div>

        <h1 className="post-title">{post?.title}</h1>

        {post?.tldr && (
          <div className="tldr">
            <strong>TL;DR</strong> {post.tldr}
          </div>
        )}

        {post?.cover && (
          <div className="cover">
            <img src={post.cover} alt="" />
          </div>
        )}

        {Array.isArray(post?.tags) && post.tags.length > 0 && (
          <div className="tags">
            {post.tags.map((t) => (
              <span className="tag" key={t}>
                <Tag className="icon" />
                {t}
              </span>
            ))}
          </div>
        )}

        <article className="prose" dangerouslySetInnerHTML={{ __html: post?.html }} />

        <div className="post-nav">
          <Link to="/blog" className="back">
            <ArrowLeft className="icon" /> Back to blog
          </Link>
        </div>
      </div>
    </div>
  );
}


