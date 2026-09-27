import { useEffect, useRef, useState } from 'react'
import './App.css'

const FEATURES = [
  {
    icon: '📄',
    title: 'College Documents',
    text: 'Notices, circulars, timetables and official PDFs — all organized in one place.',
  },
  {
    icon: '🧠',
    title: 'AI-Powered Answers',
    text: 'Ask questions naturally and get answers based on your college documents.',
  },
  {
    icon: '🔗',
    title: 'Traceable Sources',
    text: 'Every answer can be connected back to the document where the information came from.',
  },
]

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'

  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}

function KnowledgeGraph() {
  const graphRef = useRef(null)

  const nodes = [
    { label: 'Timetable', angle: -70, icon: '🗓️' },
    { label: 'Syllabus', angle: -20, icon: '📘' },
    { label: 'Notices', angle: 35, icon: '📢' },
    { label: 'Rules', angle: 100, icon: '📏' },
  ]

  const handleMove = (e) => {
    const el = graphRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    el.style.setProperty('--rotate-x', `${-y * 10}deg`)
    el.style.setProperty('--rotate-y', `${x * 10}deg`)
  }

  const handleLeave = () => {
    const el = graphRef.current
    if (!el) return

    el.style.setProperty('--rotate-x', '0deg')
    el.style.setProperty('--rotate-y', '0deg')
  }

  return (
    <div
      className="graph-stage"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className="graph" ref={graphRef}>
        <div className="graph-core">
          Ask AI
        </div>

        {nodes.map((node) => {
          const radian = (node.angle * Math.PI) / 180
          const radius = 145

          const x = Math.cos(radian) * radius
          const y = Math.sin(radian) * radius

          return (
            <div
              className="graph-node"
              key={node.label}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <span>{node.icon}</span>
              <small>{node.label}</small>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('campusdoc-theme') || 'dark'
  })

  useEffect(() => {
    localStorage.setItem('campusdoc-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'dark' ? 'light' : 'dark'
    )
  }

  return (
    <div className="app" data-theme={theme}>
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span>CampusDoc AI</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#documents">Documents</a>
          <a href="#about">About</a>

          <ThemeToggle
            theme={theme}
            onToggle={toggleTheme}
          />

          <button className="login-btn">
            Login
          </button>
        </div>
      </nav>

      <main className="hero-section" id="home">
        <div className="hero-grid">

          <div className="hero-content">
            <div className="badge">
              <span className="badge-dot"></span>
              SYSTEM ONLINE — YOUR COLLEGE, INDEXED
            </div>

            <h1>
              Ask your college
              <span> anything.</span>
            </h1>

            <p className="hero-text">
              Find answers from college notices, timetables,
              rules, syllabi and other official documents —
              all in one place.
            </p>

            <div className="search-box">
              <input
                type="text"
                placeholder="When is the DBMS exam?"
              />

              <button>
                Ask AI →
              </button>
            </div>

            <div className="example">
              <span>Try asking:</span>

              <button>
                When is the next exam?
              </button>

              <button>
                What is the attendance requirement?
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <KnowledgeGraph />
          </div>

        </div>
      </main>

      <section className="features" id="documents">
        <div className="section-heading">
          <p>HOW IT WORKS</p>
          <h2>Everything you need. One place.</h2>
        </div>

        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              text={feature.text}
            />
          ))}
        </div>
      </section>

      <footer id="about">
        <div className="logo">
          <span className="logo-icon">📚</span>
          <span>CampusDoc AI</span>
        </div>

        <p>
          Smart access to your college information.
        </p>
      </footer>
    </div>
  )
}

export default App