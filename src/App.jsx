import { useEffect, useLayoutEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaMedium, FaEnvelope } from 'react-icons/fa'
import { profile, skills, experience, education, achievements, certifications, articles, projects } from './data'
import { Icon, tagIcon } from './icons'
import { projectDetails } from './projectDetails'

const THEMES = ['default', 'ocean', 'forest', 'sunset']

function Heading({ children }) {
  return (
    <h2 className="heading">
      <span className="br">&lt;</span> {children} <span className="br">/&gt;</span>
    </h2>
  )
}

const REVEAL = [
  '.section .heading', '.section > p', '.section > .tabs', '.section .sub', '.group',
  '.timeline > li', '.grid > *', '.contact', '.section > .socials',
].join(',')

// Fades content in as it scrolls into view (opacity + small translate only, runs once).
// Elements are hidden in a layout effect, before first paint, so there is no flash.
function useScrollEffects() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return
    const els = [...document.querySelectorAll(REVEAL)]
    els.forEach((el) => {
      const siblings = [...el.parentElement.children].filter((c) => els.includes(c))
      el.style.setProperty('--d', `${Math.min(siblings.indexOf(el), 4) * 70}ms`)
      el.classList.add('reveal')
    })
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const nav = document.querySelector('.nav')
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const links = new Map([...document.querySelectorAll('.nav nav a')].map((a) => [a.getAttribute('href').slice(1), a]))
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.remove('active'))
          links.get(e.target.id)?.classList.add('active')
        }
      })
    }, { rootMargin: '-40% 0px -55% 0px' })
    links.forEach((_, id) => { const sec = document.getElementById(id); if (sec) spy.observe(sec) })
    return () => { window.removeEventListener('scroll', onScroll); spy.disconnect() }
  }, [])
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'default' } catch { return 'default' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])
  return [theme, setTheme]
}

function Socials() {
  const { links, email } = profile
  const items = [
    [FaGithub, links.github, 'GitHub'],
    [FaLinkedin, links.linkedin, 'LinkedIn'],
    [FaMedium, links.medium, 'Medium'],
    [FaEnvelope, `mailto:${email}`, 'Email'],
  ]
  return (
    <div className="socials">
      {items.map(([I, href, label]) => (
        <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}><I /></a>
      ))}
    </div>
  )
}

function Contact() {
  const { email, links } = profile
  return (
    <div className="contact">
      <a className="btn primary" href={`mailto:${email}`}><FaEnvelope /> {email}</a>
      <a className="btn" href={links.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> Connect on LinkedIn</a>
    </div>
  )
}

// Renders **bold** and *italic* inline markers from the write-up text.
function Rich({ text }) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
    return part
  })
}

function StackTags({ stack }) {
  return (
    <ul className="tags">
      {stack.map((t) => <li key={t}>{tagIcon(t) && <Icon name={tagIcon(t)} />}{t}</li>)}
    </ul>
  )
}

function Points({ items }) {
  return (
    <ul className="points">
      {items.map(([label, text]) => <li key={label}><strong>{label}:</strong> {text}</li>)}
    </ul>
  )
}

// Hash routing (#/projects/<slug>) so it works on any static host with no extra dependency.
function useRoute() {
  const read = () => window.location.hash.match(/^#\/projects\/([\w-]+)/)?.[1] ?? null
  const [slug, setSlug] = useState(read)
  useEffect(() => {
    const onHash = () => setSlug(read())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return slug
}

function ProjectPage({ project, detail, theme, setTheme }) {
  useEffect(() => { window.scrollTo(0, 0); document.title = `${project.name} | Tejas Nidhankar` }, [project])
  useEffect(() => () => { document.title = 'Tejas Nidhankar | AI Engineer' }, [])
  return (
    <>
      <header className="nav">
        <a href="#projects" className="brand" aria-label="Tejas Nidhankar, back to projects"><img className="logo" src="/logo.jpg" alt="" width="48" height="48" /></a>
        <a className="back" href="#projects">← Back to projects</a>
        <div className="nav-right">
          <select aria-label="Theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
            {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <a className="btn primary small" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </header>
      <main className="detail">
        <p className="meta">{project.category} · {project.year}</p>
        <h1>{detail.title}</h1>
        <p className="lede">{detail.tagline}</p>
        <StackTags stack={project.stack} />
        {project.github && <p><a className="btn primary small" href={project.github} target="_blank" rel="noreferrer"><FaGithub /> View source on GitHub</a></p>}
        {detail.demo && (
          <figure className="demo">
            <img src={detail.demo.src} alt={detail.demo.alt} width="960" height="569" />
            <figcaption>{detail.demo.caption}</figcaption>
          </figure>
        )}
        {detail.sections.map((s) => (
          <section key={s.heading} className="story">
            <h2>{s.heading}</h2>
            {s.paragraphs?.map((t) => <p key={t}><Rich text={t} /></p>)}
            {s.quote && <blockquote>{s.quote}</blockquote>}
            {s.list && <Points items={s.list} />}
            {s.after?.map((t) => <p key={t}><Rich text={t} /></p>)}
            {s.blocks?.map((b, i) =>
              typeof b === 'string' ? <p key={i}><Rich text={b} /></p>
                : b.quote ? <blockquote key={i}>{b.quote}</blockquote>
                : <Points key={i} items={b.list} />)}
          </section>
        ))}
        <p><a className="back" href="#projects">← Back to projects</a></p>
      </main>
      <footer className="footer"><p>© {new Date().getFullYear()} {profile.name}</p></footer>
    </>
  )
}

export default function App() {
  const [theme, setTheme] = useTheme()
  const slug = useRoute()
  const project = slug && projects.find((p) => p.slug === slug)
  const detail = project && projectDetails[slug]
  if (detail) return <ProjectPage project={project} detail={detail} theme={theme} setTheme={setTheme} />
  return <Portfolio theme={theme} setTheme={setTheme} />
}

function Portfolio({ theme, setTheme }) {
  useScrollEffects()
  // Returning from a detail page: jump back to the projects section.
  useLayoutEffect(() => {
    if (window.location.hash === '#projects') document.getElementById('projects')?.scrollIntoView()
  }, [])
  const categories = ['All', ...new Set(projects.map((p) => p.category))]
  const [filter, setFilter] = useState('All')
  const [zoom, setZoom] = useState(null)
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  const shown = projects.filter((p) => filter === 'All' || p.category === filter)
  const count = (c) => (c === 'All' ? projects.length : projects.filter((p) => p.category === c).length)

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand" aria-label="Tejas Nidhankar, home"><img className="logo" src="/logo.jpg" alt="" width="48" height="48" /></a>
        <nav>
          {['projects', 'about', 'skills', 'journey', 'writing', 'certifications', 'contact'].map((s) => (
            <a key={s} href={`#${s}`}>{s}</a>
          ))}
        </nav>
        <div className="nav-right">
          <select aria-label="Theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
            {THEMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <a className="btn primary small" href={profile.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div>
            <p className="eyebrow">{profile.greeting}</p>
            <h1>{profile.name}</h1>
            <p className="role">{profile.title}</p>
            <p className="tagline">{profile.tagline}</p>
            <Socials />
          </div>
          <img className="avatar" src="/profile.jpg" alt={`Portrait of ${profile.name}`} width="200" height="200" />
        </section>

        <section id="projects" className="section">
          <Heading>My Projects</Heading>
          <div className="tabs" role="tablist">
            {categories.map((c) => (
              <button key={c} role="tab" aria-selected={filter === c} className={filter === c ? 'tab on' : 'tab'} onClick={() => setFilter(c)}>
                {c} <span className="count">{count(c)}</span>
              </button>
            ))}
          </div>
          <div className="grid two-col">
            {shown.map((p) => (
              <article key={p.name} className={p.slug ? 'card col linked' : 'card col'}>
                <div className="meta">{p.category} · {p.year}</div>
                <h4>{p.slug ? <a className="card-link" href={`#/projects/${p.slug}`}>{p.name}</a> : p.name}</h4>
                <p>{p.description}</p>
                <StackTags stack={p.stack} />
                {p.slug && <span className="more" aria-hidden="true">Read the full story →</span>}
                {p.github && <a className="src-link" href={p.github} target="_blank" rel="noreferrer"><FaGithub /> Source</a>}
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <Heading>About Me</Heading>
          {profile.about.map((p) => <p key={p}>{p}</p>)}
        </section>

        <section id="skills" className="section">
          <Heading>Tech Stack</Heading>
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="group">
              <h3>{group}</h3>
              <ul className="chips">
                {items.map(([label, icon]) => (
                  <li key={label}><Icon name={icon} />{label}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="journey" className="section">
          <Heading>Experience &amp; Education</Heading>
          <h3 className="sub">Experience</h3>
          <ol className="timeline">
            {experience.map((e, i) => (
              <li key={e.role} className="card">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                {e.logo && (
                  <span className="org-logo">
                    {e.logo.startsWith('/')
                      ? <img src={e.logo} alt={`${e.org} logo`} loading="lazy" />
                      : <FaMedium aria-label={`${e.org} logo`} />}
                  </span>
                )}
                <div>
                  <div className="meta">{e.when} · {e.type}</div>
                  <h4>{e.role}</h4>
                  <p className="muted">{e.org}</p>
                  <p>{e.description}</p>
                  <ul className="tags">{e.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
          <h3 className="sub">Education</h3>
          <div className="grid edu-grid">
            {education.map((e) => (
              <div key={e.school} className="card col">
                {e.image && <img className="edu-img" src={e.image} alt={e.imageAlt} style={{ objectPosition: e.imagePos }} loading="lazy" />}
                <div className="meta">{e.when}</div>
                <h4>{e.degree}</h4>
                {e.badge && <span className="badge">{e.badge}</span>}
                <p className="muted">{e.school}{e.grade && ` · ${e.grade}`}</p>
                <p className="small">{e.courses}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="writing" className="section">
          <Heading>Writing</Heading>
          <p className="muted pub-line"><img className="pub-logo" src="/towards-ai.png" alt="" width="22" height="22" /> Published in the Towards AI publication on Medium.</p>
          <div className="grid two-col">
            {articles.map((a) => (
              <article key={a.title} className="card col">
                <div className="meta pub-meta"><img className="pub-logo" src="/towards-ai.png" alt="Towards AI logo" width="22" height="22" />{a.publication} · {a.series}</div>
                <h4>{a.title}</h4>
                <p>{a.description}</p>
                <p className="links"><a href={a.link} target="_blank" rel="noreferrer"><FaMedium /> Read on Medium →</a></p>
              </article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section">
          <Heading>Certifications</Heading>
          <div className="grid">
            {certifications.map((c) => (
              <div key={c.title} className="card col">
                <button className="cert-img" onClick={() => setZoom(c)} aria-label={`View ${c.title} certificate larger`}>
                  <img src={c.image} alt={`${c.title} certificate`} loading="lazy" draggable="false" />
                </button>
                <div className="meta">{c.issuer} · {c.date}</div>
                <h4>{c.title}</h4>
                <p className="links">
                  <a href={c.verify} target="_blank" rel="noreferrer">Verify on Coursera →</a>
                </p>
              </div>
            ))}
          </div>
          {zoom && (
            <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setZoom(null)}>
              <img src={zoom.image} alt={`${zoom.title} certificate`} draggable="false" />
            </div>
          )}
        </section>

        {achievements.length > 0 && (
        <section id="achievements" className="section">
          <Heading>Achievements</Heading>
          <div className="grid">
            {achievements.map((a) => (
              <div key={a.title} className="card col">
                <div className="meta">{a.category} · {a.year}</div>
                <h4>{a.title}</h4>
                <p>{a.description}</p>
                <a href={a.link} target="_blank" rel="noreferrer">View →</a>
              </div>
            ))}
          </div>
        </section>
        )}

        <section id="contact" className="section">
          <Heading>Contact</Heading>
          <p>Open to AI/GenAI engineering roles and internships. The best way to reach me is email or LinkedIn.</p>
          <Socials />
          <Contact />
        </section>
      </main>

      <footer className="footer">
        <Socials />
        <p>© {new Date().getFullYear()} {profile.name}</p>
      </footer>
    </>
  )
}
