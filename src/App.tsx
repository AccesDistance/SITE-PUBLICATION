import { useEffect, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Release {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  body: string
  assets: {
    name: string
    browser_download_url: string
    size: number
  }[]
}

// ─── GitHub repos config ──────────────────────────────────────────────────────
const SERVER_REPO = 'AccesDistance/SERVER-SOFTWARE'
const APP_REPO    = 'AccesDistance/APPLICATION-MOBILE'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

function getOsIcon(assetName: string): string {
  if (assetName.includes('windows') || assetName.endsWith('.exe')) return '🪟'
  if (assetName.includes('linux'))  return '🐧'
  if (assetName.includes('macos') || assetName.includes('mac')) return '🍎'
  if (assetName.endsWith('.apk'))   return '📱'
  return '📦'
}

function getOsLabel(assetName: string): string {
  if (assetName.includes('windows') || assetName.endsWith('.exe')) return 'Windows'
  if (assetName.includes('linux'))  return 'Linux'
  if (assetName.includes('macos') || assetName.includes('mac')) return 'macOS'
  if (assetName.endsWith('.apk'))   return 'Android APK'
  return assetName
}

// ─── Icon SVG Components ──────────────────────────────────────────────────────
const IconMonitor = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)
const IconSmartphone = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1"/>
  </svg>
)
const IconWifi = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1"/>
  </svg>
)
const IconZap = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)
const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
)
const IconCode = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
)
const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)
const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const IconExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
)
const IconChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
)

// ─── Release Card ─────────────────────────────────────────────────────────────
function ReleaseCard({ release, type }: { release: Release; type: 'server' | 'app' }) {
  const [expanded, setExpanded] = useState(false)
  const mainAssets = release.assets.filter(a => !a.name.endsWith('.zip') && !a.name.endsWith('.tar.gz'))

  return (
    <div style={{
      background: 'rgba(99,102,241,0.05)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '16px',
      padding: '24px',
      transition: 'all 0.3s ease',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)')}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            borderRadius: '10px',
            width: '40px', height: '40px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px',
          }}>
            {type === 'server' ? '🖥️' : '📱'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#f1f5f9' }}>{release.tag_name}</span>
              <span style={{
                background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 600,
                padding: '2px 10px',
                borderRadius: '20px',
                letterSpacing: '0.5px',
              }}>LATEST</span>
            </div>
            <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              {formatDate(release.published_at)}
            </div>
          </div>
        </div>
        <a
          href={release.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#818cf8', fontSize: '13px', textDecoration: 'none',
            padding: '6px 12px',
            border: '1px solid rgba(129,140,248,0.3)',
            borderRadius: '8px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(129,140,248,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <IconGitHub />
          Voir sur GitHub
          <IconExternalLink />
        </a>
      </div>

      {/* Download buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: mainAssets.length > 0 ? '20px' : '0' }}>
        {mainAssets.map(asset => (
          <a
            key={asset.browser_download_url}
            href={asset.browser_download_url}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(99,102,241,0.3)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.3)' }}
          >
            <IconDownload />
            <span>{getOsIcon(asset.name)} {getOsLabel(asset.name)}</span>
            <span style={{ opacity: 0.7, fontSize: '12px', fontWeight: 400 }}>({formatBytes(asset.size)})</span>
          </a>
        ))}
      </div>

      {/* Release notes toggle */}
      {release.body && (
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              fontSize: '13px',
              padding: '6px 0',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#818cf8' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b' }}
          >
            <div style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              <IconChevronDown />
            </div>
            Notes de version
          </button>
          {expanded && (
            <div style={{
              marginTop: '12px',
              padding: '16px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              fontSize: '13px',
              color: '#94a3b8',
              lineHeight: '1.7',
              whiteSpace: 'pre-wrap',
              borderLeft: '3px solid #6366f1',
            }}>
              {release.body}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '16px',
      padding: '24px',
      animation: 'pulse 2s infinite',
    }}>
      <div style={{ height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '16px' }} />
      <div style={{ height: '20px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', width: '60%', marginBottom: '12px' }} />
      <div style={{ height: '44px', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', width: '180px' }} />
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [serverRelease, setServerRelease]  = useState<Release | null>(null)
  const [appRelease, setAppRelease]        = useState<Release | null>(null)
  const [loadingServer, setLoadingServer]  = useState(true)
  const [loadingApp, setLoadingApp]        = useState(true)
  const [activeSection, setActiveSection]  = useState('home')
  const [scrolled, setScrolled]            = useState(false)
  const [mobileMenu, setMobileMenu]        = useState(false)

  // Fetch releases
  useEffect(() => {
    fetch(`https://api.github.com/repos/${SERVER_REPO}/releases/latest`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(r => r.json())
      .then(d => { if (d.tag_name) setServerRelease(d) })
      .catch(() => {})
      .finally(() => setLoadingServer(false))

    fetch(`https://api.github.com/repos/${APP_REPO}/releases/latest`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    })
      .then(r => r.json())
      .then(d => { if (d.tag_name) setAppRelease(d) })
      .catch(() => {})
      .finally(() => setLoadingApp(false))
  }, [])

  // Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = ['home', 'features', 'downloads', 'docs', 'about']
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sec)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'home',      label: 'Accueil' },
    { id: 'features',  label: 'Fonctionnalités' },
    { id: 'downloads', label: 'Télécharger' },
    { id: 'docs',      label: 'Documentation' },
    { id: 'about',     label: 'À propos' },
  ]

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenu(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14' }}>
      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
        @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-12px) } }
        @keyframes glow { 0%,100% { opacity:0.5 } 50% { opacity:1 } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
        @keyframes spin { to { transform:rotate(360deg) } }
        @keyframes shimmer { 0% { background-position:-200% center } 100% { background-position:200% center } }
        .fade-in-up { animation: fadeInUp 0.6s ease forwards; }
        .fade-in-up-delay-1 { animation: fadeInUp 0.6s ease 0.1s forwards; opacity:0; }
        .fade-in-up-delay-2 { animation: fadeInUp 0.6s ease 0.2s forwards; opacity:0; }
        .fade-in-up-delay-3 { animation: fadeInUp 0.6s ease 0.3s forwards; opacity:0; }
        .float-anim { animation: float 4s ease-in-out infinite; }
        .feature-card:hover { transform: translateY(-6px) !important; }
        .step-card:hover .step-icon { transform: scale(1.1) rotate(5deg); }
      `}</style>

      {/* ── Navbar ────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 24px',
        background: scrolled ? 'rgba(10,10,20,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '72px',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => scrollTo('home')}>
            <img src="/accesdistance-logo.png" alt="AccesDistance" style={{ width: '40px', height: '40px', borderRadius: '10px' }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '18px', color: '#f1f5f9' }}>
              <span style={{ color: '#818cf8' }}>Acces</span>Distance
            </span>
          </div>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollTo(link.id)} style={{
                background: activeSection === link.id ? 'rgba(99,102,241,0.12)' : 'transparent',
                border: 'none',
                color: activeSection === link.id ? '#818cf8' : '#94a3b8',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.2s',
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={e => { if (activeSection !== link.id) e.currentTarget.style.color = '#f1f5f9' }}
              onMouseLeave={e => { if (activeSection !== link.id) e.currentTarget.style.color = '#94a3b8' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <button onClick={() => scrollTo('downloads')} style={{
            background: 'linear-gradient(135deg, #6366f1, #818cf8)',
            border: 'none',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 15px rgba(99,102,241,0.35)',
            transition: 'all 0.3s',
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 15px rgba(99,102,241,0.35)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <IconDownload />
            Télécharger
          </button>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '100px 24px 60px',
      }}>
        {/* Ambient orbs */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'glow 4s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '10%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'glow 5s ease-in-out infinite 1s',
          pointerEvents: 'none',
        }} />

        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '900px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div className="fade-in-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            borderRadius: '50px',
            padding: '6px 16px',
            fontSize: '13px',
            color: '#818cf8',
            fontWeight: 500,
            marginBottom: '32px',
          }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#22d3ee', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            Contrôle à distance via Wi-Fi — Open Source
          </div>

          {/* Logo */}
          <div className="fade-in-up float-anim" style={{ marginBottom: '32px' }}>
            <img
              src="/accesdistance-logo.png"
              alt="AccesDistance Logo"
              style={{
                width: '160px', height: '160px',
                borderRadius: '32px',
                boxShadow: '0 0 60px rgba(99,102,241,0.4), 0 0 120px rgba(99,102,241,0.15)',
              }}
            />
          </div>

          {/* Title */}
          <h1 className="fade-in-up-delay-1" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(42px, 7vw, 76px)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-2px',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #818cf8 50%, #22d3ee 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}>
            AccesDistance
          </h1>

          <p className="fade-in-up-delay-2" style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: '#94a3b8',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 48px',
          }}>
            Transformez votre smartphone Android en <strong style={{ color: '#818cf8' }}>télécommande tactile</strong> pour votre PC.
            Visualisez l'écran en temps réel, contrôlez la souris et le clavier via Wi-Fi.
          </p>

          {/* CTAs */}
          <div className="fade-in-up-delay-3" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('downloads')} style={{
              background: 'linear-gradient(135deg, #6366f1, #818cf8)',
              border: 'none',
              color: '#fff',
              padding: '16px 36px',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '10px',
              boxShadow: '0 8px 30px rgba(99,102,241,0.4)',
              transition: 'all 0.3s',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(99,102,241,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(99,102,241,0.4)' }}
            >
              <IconDownload />
              Télécharger maintenant
            </button>
            <button onClick={() => scrollTo('docs')} style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#f1f5f9',
              padding: '16px 36px',
              borderRadius: '14px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'all 0.3s',
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.background = 'transparent' }}
            >
              📖 Documentation
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '72px',
            flexWrap: 'wrap',
          }}>
            {[
              { value: 'Wi-Fi', label: 'Sans câble' },
              { value: 'LAN', label: 'Réseau local' },
              { value: '60fps', label: 'Flux vidéo' },
              { value: 'Free', label: 'Open Source' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 800, color: '#818cf8', fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section id="features" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '50px',
            padding: '4px 16px',
            fontSize: '12px',
            color: '#818cf8',
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>Fonctionnalités</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700,
            color: '#f1f5f9',
            lineHeight: 1.2,
          }}>
            Tout ce dont vous avez besoin
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '12px', maxWidth: '500px', margin: '12px auto 0' }}>
            Un contrôle total de votre PC depuis votre poche, sans logiciel tiers payant.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            {
              icon: <IconMonitor />,
              color: '#6366f1',
              title: 'Stream d\'écran en temps réel',
              desc: 'Visualisez l\'écran de votre PC sur votre smartphone avec une compression JPEG optimisée pour un débit fluide sur votre réseau local.',
            },
            {
              icon: <IconSmartphone />,
              color: '#22d3ee',
              title: 'Contrôle tactile complet',
              desc: 'Touchez l\'écran de votre téléphone pour déplacer la souris, cliquer, faire un double-clic, clic-droit, scroll et saisir du texte.',
            },
            {
              icon: <IconWifi />,
              color: '#a78bfa',
              title: 'Connexion Wi-Fi locale',
              desc: 'Aucun serveur tiers, aucun cloud. La connexion est directe entre votre PC et votre téléphone via TCP/UDP sur votre réseau Wi-Fi.',
            },
            {
              icon: <IconZap />,
              color: '#f59e0b',
              title: 'Ultra-réactif',
              desc: 'Architecture dual-socket : TCP pour le flux vidéo, UDP pour les événements tactiles. Latence minimale pour une expérience fluide.',
            },
            {
              icon: <IconShield />,
              color: '#10b981',
              title: 'Aucune donnée envoyée',
              desc: 'Tout reste sur votre réseau local. Aucune télémétrie, aucun compte requis. Votre vie privée est respectée.',
            },
            {
              icon: <IconCode />,
              color: '#ec4899',
              title: 'Open Source',
              desc: 'Code source entièrement disponible sur GitHub. Contribuez, forkez, et adaptez AccesDistance à vos besoins.',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="feature-card"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.06)`,
                borderRadius: '20px',
                padding: '28px',
                transition: 'all 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `${feature.color}40`
                e.currentTarget.style.background = `${feature.color}08`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              <div style={{
                width: '52px', height: '52px',
                background: `${feature.color}20`,
                border: `1px solid ${feature.color}40`,
                borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: feature.color,
                marginBottom: '18px',
                transition: 'transform 0.3s',
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '17px', fontWeight: 600,
                color: '#f1f5f9', marginBottom: '10px',
              }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.7 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Downloads ─────────────────────────────────────────────── */}
      <section id="downloads" style={{ padding: '100px 24px', background: 'rgba(99,102,241,0.03)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(99,102,241,0.1)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '50px',
              padding: '4px 16px',
              fontSize: '12px',
              color: '#818cf8',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}>Téléchargements</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 5vw, 44px)',
              fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2,
            }}>
              Dernières versions
            </h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginTop: '12px', maxWidth: '500px', margin: '12px auto 0' }}>
              Mises à jour automatiques à chaque commit sur la branche principale.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
            {/* Server */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '22px' }}>🖥️</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>
                  Serveur PC
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Windows • Linux • macOS</span>
              </div>
              {loadingServer ? <Skeleton /> : serverRelease ? (
                <ReleaseCard release={serverRelease} type="server" />
              ) : (
                <div style={{
                  padding: '32px', textAlign: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px', color: '#64748b',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
                  Aucune release disponible pour le moment.<br />
                  <a href={`https://github.com/${SERVER_REPO}`} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>
                    Voir le dépôt GitHub
                  </a>
                </div>
              )}
            </div>

            {/* App */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '22px' }}>📱</span>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '20px', fontWeight: 700, color: '#f1f5f9' }}>
                  Application Android
                </h3>
                <span style={{ fontSize: '12px', color: '#64748b' }}>APK</span>
              </div>
              {loadingApp ? <Skeleton /> : appRelease ? (
                <ReleaseCard release={appRelease} type="app" />
              ) : (
                <div style={{
                  padding: '32px', textAlign: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px', color: '#64748b',
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
                  Aucune release disponible pour le moment.<br />
                  <a href={`https://github.com/${APP_REPO}`} target="_blank" rel="noopener noreferrer" style={{ color: '#818cf8' }}>
                    Voir le dépôt GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Documentation ─────────────────────────────────────────── */}
      <section id="docs" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '50px',
            padding: '4px 16px',
            fontSize: '12px', color: '#818cf8', fontWeight: 600,
            letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px',
          }}>Documentation</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2,
          }}>
            Démarrer en 3 étapes
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>
          {[
            {
              step: '01',
              title: 'Télécharger et lancer le serveur',
              color: '#6366f1',
              content: (
                <>
                  <p style={{ color: '#94a3b8', marginBottom: '16px', lineHeight: 1.7 }}>
                    Téléchargez le serveur correspondant à votre OS, puis lancez-le. Il affichera l'adresse IP locale de votre PC dans le terminal.
                  </p>
                  <div style={{
                    background: 'rgba(0,0,0,0.5)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    color: '#22d3ee',
                    border: '1px solid rgba(34,211,238,0.15)',
                  }}>
                    <div style={{ color: '#64748b', marginBottom: '8px' }}># Windows</div>
                    <div>{'>'} server-windows.exe</div>
                    <div style={{ marginTop: '8px', color: '#94a3b8' }}>══════════════════════════════════════════════</div>
                    <div style={{ color: '#818cf8' }}> SERVEUR D'ÉCRAN TACTILE ET AFFICHAGE DISTANT</div>
                    <div style={{ color: '#22d3ee' }}> -{'>'} Adresse IP du PC : <span style={{ color: '#f1f5f9' }}>192.168.1.42</span></div>
                    <div> -{'>'} Port Stream Vidéo (TCP) : <span style={{ color: '#f1f5f9' }}>9999</span></div>
                    <div> -{'>'} Port Tactile / Souris (UDP) : <span style={{ color: '#f1f5f9' }}>9998</span></div>
                  </div>
                </>
              ),
            },
            {
              step: '02',
              title: 'Installer l\'application Android',
              color: '#22d3ee',
              content: (
                <>
                  <p style={{ color: '#94a3b8', marginBottom: '16px', lineHeight: 1.7 }}>
                    Téléchargez et installez l'APK AccesDistance sur votre smartphone Android. Activez l'installation depuis des sources inconnues si demandé.
                  </p>
                  <div style={{
                    background: 'rgba(34,211,238,0.05)',
                    border: '1px solid rgba(34,211,238,0.2)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex', gap: '12px', alignItems: 'flex-start',
                  }}>
                    <span style={{ fontSize: '20px' }}>⚙️</span>
                    <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                      <strong style={{ color: '#22d3ee' }}>Paramètres Android</strong> → Sécurité → Sources inconnues → Activer<br />
                      Puis ouvrez le fichier <code style={{ background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px', color: '#f1f5f9' }}>app-release.apk</code>
                    </div>
                  </div>
                </>
              ),
            },
            {
              step: '03',
              title: 'Se connecter et prendre le contrôle',
              color: '#a78bfa',
              content: (
                <>
                  <p style={{ color: '#94a3b8', marginBottom: '16px', lineHeight: 1.7 }}>
                    Ouvrez l'application, entrez l'adresse IP affichée par le serveur, et appuyez sur <strong style={{ color: '#a78bfa' }}>Connecter</strong>. L'écran de votre PC s'affiche instantanément.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    {[
                      { icon: '👆', label: 'Tapez', desc: 'Clic gauche' },
                      { icon: '✌️', label: 'Appui long', desc: 'Clic droit' },
                      { icon: '📜', label: 'Glissez', desc: 'Scroll' },
                      { icon: '⌨️', label: 'Clavier', desc: 'Saisie texte' },
                    ].map(action => (
                      <div key={action.label} style={{
                        background: 'rgba(167,139,250,0.05)',
                        border: '1px solid rgba(167,139,250,0.15)',
                        borderRadius: '10px',
                        padding: '12px',
                        display: 'flex', alignItems: 'center', gap: '10px',
                      }}>
                        <span style={{ fontSize: '22px' }}>{action.icon}</span>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>{action.label}</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>{action.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ),
            },
          ].map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>

        {/* Architecture */}
        <div style={{ marginTop: '60px', maxWidth: '800px', margin: '60px auto 0' }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '22px', fontWeight: 700, color: '#f1f5f9',
            marginBottom: '24px', textAlign: 'center',
          }}>Architecture réseau</h3>
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(99,102,241,0.1)', borderRadius: '14px', minWidth: '120px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📱</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>Smartphone</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Application Android</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '11px', color: '#6366f1', marginBottom: '4px', fontWeight: 600 }}>TCP :9999</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6366f1' }}>
                  <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #6366f1, #22d3ee)' }} />
                  <span>←</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Flux vidéo</div>
                <div style={{ height: '12px' }} />
                <div style={{ fontSize: '11px', color: '#a78bfa', marginBottom: '4px', fontWeight: 600 }}>UDP :9998</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#a78bfa' }}>
                  <span>→</span>
                  <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #a78bfa, #6366f1)' }} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Événements tactiles</div>
              </div>
              <div style={{ textAlign: 'center', padding: '16px', background: 'rgba(34,211,238,0.08)', borderRadius: '14px', minWidth: '120px' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖥️</div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f1f5f9' }}>PC</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Serveur Python</div>
              </div>
            </div>
            <div style={{
              marginTop: '24px', padding: '14px',
              background: 'rgba(0,0,0,0.3)', borderRadius: '10px',
              fontSize: '13px', color: '#64748b', textAlign: 'center', lineHeight: 1.6,
            }}>
              📶 Les deux appareils doivent être sur le <strong style={{ color: '#94a3b8' }}>même réseau Wi-Fi</strong>.
              Aucune connexion Internet requise.
            </div>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: '100px 24px', background: 'rgba(99,102,241,0.03)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.2)',
            borderRadius: '50px',
            padding: '4px 16px',
            fontSize: '12px', color: '#818cf8', fontWeight: 600,
            letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px',
          }}>À propos du développeur</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 5vw, 44px)',
            fontWeight: 700, color: '#f1f5f9', lineHeight: 1.2, marginBottom: '48px',
          }}>
            Créé avec passion
          </h2>

          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(99,102,241,0.15)',
            borderRadius: '28px',
            padding: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}>
            {/* Avatar placeholder */}
            <div style={{
              width: '100px', height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #22d3ee)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '42px',
              boxShadow: '0 0 40px rgba(99,102,241,0.4)',
              border: '3px solid rgba(99,102,241,0.3)',
            }}>
              👨‍💻
            </div>

            <div>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '26px', fontWeight: 700, color: '#f1f5f9', marginBottom: '6px',
              }}>
                Fabrice Faniry RANDT
              </h3>
              <p style={{ color: '#6366f1', fontSize: '15px', fontWeight: 500, marginBottom: '4px' }}>
                Programmer · Ethical Hacker · Graphic Designer
              </p>
              <p style={{ color: '#64748b', fontSize: '14px' }}>
                🏢 Eray Digital &nbsp;·&nbsp; 📍 Majunga, Maevatanana, Madagascar
              </p>
            </div>

            <p style={{
              color: '#94a3b8', fontSize: '15px', lineHeight: 1.8,
              maxWidth: '560px',
            }}>
              AccesDistance est né d'un besoin simple : contrôler son PC depuis son téléphone sans logiciel payant.
              Ce projet open source combine Python pour le serveur et Flutter pour l'application mobile,
              le tout conçu pour être simple, rapide et entièrement privé.
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { label: 'GitHub', url: 'https://github.com/FabriceFaniry-RANDT4050', icon: <IconGitHub /> },
                { label: 'Portfolio', url: 'https://fabrice-faniry-randt.vercel.app', icon: '🌐' },
                { label: 'LinkedIn', url: 'https://linkedin.com/in/fabrice-faniry-randriamahatratra-8aa17271', icon: '💼' },
                { label: 'Facebook', url: 'https://facebook.com/fabricefaniryrandt', icon: '📘' },
              ].map(link => (
                <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#94a3b8',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.color = '#f1f5f9'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Contact email */}
            <div style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.2)',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              color: '#818cf8',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              📧 <a href="mailto:fahniryjklm@gmail.com" style={{ color: '#818cf8', textDecoration: 'none' }}>fahniryjklm@gmail.com</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── GitHub Repos ──────────────────────────────────────────── */}
      <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '22px', fontWeight: 700, color: '#f1f5f9',
          textAlign: 'center', marginBottom: '32px',
        }}>
          Dépôts GitHub
        </h3>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Serveur Python', repo: SERVER_REPO, icon: '🖥️' },
            { label: 'Application Android', repo: APP_REPO, icon: '📱' },
          ].map(r => (
            <a key={r.repo} href={`https://github.com/${r.repo}`} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              padding: '20px 28px',
              textDecoration: 'none',
              transition: 'all 0.3s',
              minWidth: '280px',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span style={{ fontSize: '28px' }}>{r.icon}</span>
              <div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9', marginBottom: '2px' }}>{r.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#818cf8', fontSize: '13px' }}>
                  <IconGitHub />
                  {r.repo}
                  <IconExternalLink />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '32px 24px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '12px' }}>
          <img src="/accesdistance-logo.png" alt="logo" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: '#f1f5f9' }}>
            <span style={{ color: '#818cf8' }}>Acces</span>Distance
          </span>
        </div>
        <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.7 }}>
          © {new Date().getFullYear()} Fabrice Faniry RANDT · Eray Digital · Open Source
          <br />
          Développé avec 💜 à Majunga, Madagascar
        </p>
      </footer>
    </div>
  )
}

// ─── Step Card sub-component ──────────────────────────────────────────────────
function StepCard({ step }: { step: { step: string; title: string; color: string; content: React.ReactNode } }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: `1px solid rgba(255,255,255,0.06)`,
      borderRadius: '20px',
      overflow: 'hidden',
      transition: 'border-color 0.3s',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = `${step.color}30` }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)' }}
    >
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '16px',
        padding: '24px 28px',
        background: 'transparent', border: 'none', cursor: 'pointer',
        textAlign: 'left',
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{
          width: '44px', height: '44px', flexShrink: 0,
          background: `${step.color}20`,
          border: `2px solid ${step.color}50`,
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '16px', fontWeight: 800, color: step.color,
          transition: 'transform 0.3s',
        }} className="step-icon">
          {step.step}
        </div>
        <span style={{ fontSize: '17px', fontWeight: 600, color: '#f1f5f9', flex: 1 }}>{step.title}</span>
        <div style={{ color: '#64748b', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
          <IconChevronDown />
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 28px 28px' }}>
          {step.content}
        </div>
      )}
    </div>
  )
}
