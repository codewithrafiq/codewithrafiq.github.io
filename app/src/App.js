import { useState, useEffect, useRef } from 'react';
import './App.css';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const SOCIALS = [
  { label: 'Website', short: 'WEB', href: 'https://codewithrafiq.com/' },
  { label: 'GitHub', short: 'GH', href: 'https://github.com/codewithrafiq' },
  { label: 'YouTube', short: 'YT', href: 'https://www.youtube.com/@CodeWithRafiq' },
  { label: 'Peerlist', short: 'PL', href: 'https://peerlist.io/codewithrafiq' },
  { label: 'Google Dev', short: 'GD', href: 'https://g.dev/codewithrafiq' },
  { label: 'X / Twitter', short: 'X', href: 'https://x.com/codewithrafiq' },
  { label: 'Facebook', short: 'FB', href: 'https://www.facebook.com/codewithrafiq' },
  { label: 'Instagram', short: 'IG', href: 'https://www.instagram.com/rafiqul_i_s_lam' },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const CV_URL = 'https://drive.google.com/file/d/19EjuaxamyzaxYeY3UPsPVBnfps69a8Jh/view?usp=sharing';

const EXPERIENCE = [
  {
    company: 'Tax Star L.L.C-FZ',
    role: 'Back End Engineer',
    location: 'Meydan Hotel, Dubai, UAE',
    period: 'Jan 2024 — Present',
    current: true,
    points: [
      'Architected and implemented scalable, fault-tolerant microservices systems for high-throughput operations.',
      'Designed low-latency RESTful APIs using Python (Flask, FastAPI) ensuring high availability.',
      'Built event-driven architectures with Kafka and engineered distributed pipelines using Redis / Celery.',
      'Developed a backend-driven automation bot, significantly improving operational efficiency.',
    ],
    stack: ['Python', 'Flask', 'FastAPI', 'Next.js', 'Kafka', 'Redis', 'Celery', 'Docker', 'RabbitMQ'],
  },
  {
    company: 'Altersense Limited',
    role: 'Full Stack Engineer',
    location: 'Dhaka, Bangladesh',
    period: 'Nov 2021 — Dec 2023',
    points: [
      'Designed backend systems for computer vision products, including Face and Activity Recognition.',
      'Built high-performance APIs and microservices using Python (Django, FastAPI) and NestJS.',
      'Integrated and optimized ML models within backend services, improving performance and reliability.',
      'Managed PostgreSQL databases and containerized services using Docker.',
    ],
    stack: ['Python', 'Django', 'FastAPI', 'NestJS', 'React.js', 'Svelte', 'PostgreSQL', 'Docker'],
  },
  {
    company: 'Expert Consortium Ltd',
    role: 'Back End Developer',
    location: 'Dhaka, Bangladesh',
    period: 'Apr 2021 — Nov 2021',
    points: [
      'Built AI-powered chatbots and computer vision-based IP camera management systems.',
      'Developed UI controllers for robotics projects and contributed to ERP application development.',
      'Implemented RESTful and GraphQL APIs for efficient system integration.',
    ],
    stack: ['Python', 'Django', 'Flask', 'FastAPI', 'GraphQL', 'React.js', 'PostgreSQL'],
  },
];

const SKILLS = [
  { group: 'Languages', items: ['Python', 'C++', 'JavaScript', 'TypeScript', 'Dart'] },
  { group: 'Backend', items: ['FastAPI', 'Django', 'Flask', 'Node.js', 'NestJS', 'Express', 'REST', 'GraphQL'] },
  { group: 'Frontend', items: ['React.js', 'Next.js', 'Svelte', 'Jinja2'] },
  { group: 'Infra & Messaging', items: ['Kafka', 'Temporal.io', 'Redis', 'Celery', 'RabbitMQ', 'MQTT'] },
  { group: 'Cloud / DevOps', items: ['Docker', 'Docker Swarm', 'CI/CD', 'Git', 'Ubuntu Server'] },
  { group: 'Data & AI', items: ['PostgreSQL', 'OpenCV', 'Rasa', 'ML Integration'] },
];

const PROJECTS = [
  {
    title: 'Taxstar — Corporate Tax',
    tag: 'FinTech',
    desc: 'Built UAE corporate-tax calculation workflows — financial-statement production, multi-client management, and multi-stage approval pipelines.',
    stack: ['NestJS', 'TypeScript', 'PostgreSQL'],
  },
  {
    title: 'Taxstar — E-Invoicing (UAE)',
    tag: 'Compliance · Events',
    desc: 'Peppol-based e-invoice integration with PINT AE mapping, validation, staging, and error management for UAE MoF compliance as a pre-approved ASP — event-driven with Kafka and orchestrated via Temporal.io.',
    stack: ['NestJS', 'Kafka', 'Temporal.io', 'Peppol'],
  },
  {
    title: 'Helios — AlterSense',
    tag: 'Systems · C++',
    desc: 'Core data-ingestion modules in C++ using mutexes, condition variables, and thread pools for thread-safe camera-stream processing, with Kafka integration for scalable IoT streaming.',
    stack: ['C++', 'Kafka', 'IoT'],
  },
  {
    title: 'Vision AI Platform',
    tag: 'Computer Vision',
    desc: 'Built car number-plate detection and face-recognition services as production-grade APIs, integrating ML models into low-latency backends.',
    stack: ['FastAPI', 'OpenCV', 'Python'],
  },
  {
    title: 'ML-Powered Chatbot',
    tag: 'Conversational AI',
    desc: 'Engineered an end-to-end machine-learning chatbot with intent recognition and a responsive web interface for real-time conversations.',
    stack: ['Rasa', 'Django', 'React.js'],
  },
  {
    title: 'Dynamic ERP System',
    tag: 'Architecture',
    desc: 'Designed the architecture for an enterprise ERP supporting dynamic, configurable user profiles and modular business workflows.',
    stack: ['NestJS', 'Svelte', 'PostgreSQL'],
  },
];

const STATS = [
  { value: '5+', label: 'Years building software' },
  { value: '3', label: 'Companies shipped for' },
  { value: '6+', label: 'Flagship systems delivered' },
];

function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const saved = window.localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  // Default to the warm light theme; remember the visitor's choice thereafter.
  return 'light';
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const navIds = useRef(NAV.map((n) => n.id)).current;
  const active = useScrollSpy(navIds);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#14110e' : '#faf6f0');
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app">
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />

      {/* ───── Nav ───── */}
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <a className="brand" href="#top" onClick={(e) => go(e, 'top')}>
            <span className="brand__mark">{'</>'}</span>
            <span className="brand__name">Rafiqul Islam</span>
          </a>

          <div className="nav__right">
            <nav className={`nav__links ${menuOpen ? 'is-open' : ''}`}>
              {NAV.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={active === item.id ? 'is-active' : ''}
                  onClick={(e) => go(e, item.id)}
                >
                  {item.label}
                </a>
              ))}
              <a className="nav__cta" href={CV_URL} target="_blank" rel="noreferrer">
                Resume
              </a>
            </nav>

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              className={`burger ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ───── Hero ───── */}
        <section className="hero">
          <div className="hero__text">
            <span className="eyebrow">
              <span className="dot" /> Available for select projects
            </span>
            <h1 className="hero__title">
              I build <span className="grad">scalable backends</span> &amp; AI-driven systems.
            </h1>
            <p className="hero__lead">
              I'm <strong>MD Rafiqul Islam</strong> — a Software Engineer with 5+ years designing
              distributed, event-driven architectures and shipping production-grade AI. Currently
              engineering backend systems at Tax Star in Dubai.
            </p>
            <div className="hero__meta">
              <span>📍 Dhaka, Bangladesh</span>
              <span>🇦🇪 Working in Dubai, UAE</span>
            </div>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#contact" onClick={(e) => go(e, 'contact')}>
                Get in touch
              </a>
              <a className="btn btn--ghost" href={CV_URL} target="_blank" rel="noreferrer">
                View résumé ↗
              </a>
            </div>
            <div className="hero__socials">
              {SOCIALS.slice(0, 4).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}>
                  {s.short}
                </a>
              ))}
            </div>
          </div>

          <div className="hero__visual">
            <div className="photo">
              <img src={`${process.env.PUBLIC_URL}/profile.jpeg`} alt="MD Rafiqul Islam" />
              <div className="photo__ring" aria-hidden="true" />
            </div>
            <div className="chip chip--1">FastAPI · Kafka</div>
            <div className="chip chip--2">Python · Redis</div>
            <div className="chip chip--3">Microservices</div>
          </div>
        </section>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat__value">{s.value}</span>
              <span className="stat__label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ───── About ───── */}
        <Section id="about" index="01" title="About">
          <div className="about">
            <div className="about__text">
              <p>
                Driven Software Engineer with over five years of experience specializing in scalable
                backend systems, microservices, and AI-driven applications. I work deeply in{' '}
                <strong>Python</strong> (FastAPI, Django, Flask) and <strong>Node.js</strong>, with a
                focus on designing distributed, event-driven architectures using Kafka, Redis, and
                Celery.
              </p>
              <p>
                Today I build UAE tax-compliance platforms at <strong>Taxstar</strong> — from
                corporate-tax workflows to Peppol e-invoicing orchestrated with Temporal.io — and I
                share what I learn as a programming content creator on YouTube under{' '}
                <strong>“Code With Rafiq.”</strong>
              </p>
              <a className="link-arrow" href="https://www.youtube.com/@CodeWithRafiq" target="_blank" rel="noreferrer">
                Watch on YouTube ↗
              </a>
            </div>
            <figure className="about__photo">
              <img src={`${process.env.PUBLIC_URL}/profile-2.jpeg`} alt="MD Rafiqul Islam" loading="lazy" />
            </figure>
          </div>
        </Section>

        {/* ───── Experience ───── */}
        <Section id="experience" index="02" title="Experience">
          <div className="timeline">
            {EXPERIENCE.map((job) => (
              <article className="job" key={job.company}>
                <div className="job__period">
                  <span className={`tl-dot ${job.current ? 'tl-dot--live' : ''}`} />
                  {job.period}
                </div>
                <div className="job__body">
                  <h3 className="job__role">
                    {job.role} <span className="job__at">· {job.company}</span>
                  </h3>
                  <p className="job__loc">{job.location}</p>
                  <ul className="job__points">
                    {job.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <div className="tags">
                    {job.stack.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ───── Skills ───── */}
        <Section id="skills" index="03" title="Skills &amp; Tools">
          <div className="skills">
            {SKILLS.map((cat) => (
              <div className="skill-card" key={cat.group}>
                <h3 className="skill-card__title">{cat.group}</h3>
                <div className="tags">
                  {cat.items.map((it) => (
                    <span className="tag" key={it}>{it}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ───── Projects ───── */}
        <Section id="projects" index="04" title="Selected Projects">
          <div className="projects">
            {PROJECTS.map((proj) => (
              <article className="project" key={proj.title}>
                <div className="project__top">
                  <span className="project__tag">{proj.tag}</span>
                </div>
                <h3 className="project__title">{proj.title}</h3>
                <p className="project__desc">{proj.desc}</p>
                <div className="tags">
                  {proj.stack.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ───── Contact ───── */}
        <Section id="contact" index="05" title="Let's build something">
          <div className="contact">
            <p className="contact__lead">
              Have a backend challenge, an AI idea, or a role in mind? I'm open to interesting
              collaborations — let's talk.
            </p>
            <a className="contact__mail" href="mailto:codewithrafiq@gmail.com">
              codewithrafiq@gmail.com
            </a>
            <div className="contact__socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} MD Rafiqul Islam</span>
        <span className="footer__built">Built with React · Designed &amp; coded by Rafiq</span>
      </footer>
    </div>
  );
}

function Section({ id, index, title, children }) {
  return (
    <section id={id} className="section">
      <div className="section__head">
        <span className="section__index">{index}</span>
        <h2 className="section__title" dangerouslySetInnerHTML={{ __html: title }} />
        <span className="section__rule" />
      </div>
      {children}
    </section>
  );
}

export default App;
