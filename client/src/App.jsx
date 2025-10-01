
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Contact from './pages/Contact.jsx';
import Resume from './pages/Resume.jsx';
import Skills from './pages/Skills.jsx';
import Services from './pages/Services.jsx';
import Experience from './pages/Experience.jsx';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import './styles/global.css';


export default function App() {
  return (
    <div className="app">
      <header className="container">
        <nav className="nav">
          <NavLink to="/" className="brand">Sandeep Tiwari</NavLink>
          <div className="links">
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/experience">Experience</NavLink>
            <NavLink to="/skills">Skills</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/resume">Resume</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>
        </nav>
      </header>

      <main className="container">
        <ErrorBoundary>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/services" element={<Services />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </ErrorBoundary>
      </main>

      <footer className="container footer">© {new Date().getFullYear()} Sandeep Tiwari</footer>
    </div>
  );
}

