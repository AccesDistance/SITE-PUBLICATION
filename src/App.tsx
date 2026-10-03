import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Lucide Icons
import {
  Monitor,
  Smartphone,
  Wifi,
  Zap,
  ShieldCheck,
  Terminal,
  Download,
  ChevronDown,
  ExternalLink,
  CheckCircle2,
  MousePointerClick,
  Mouse,
  Move,
  ArrowUpDown,

  Globe,
  Mail,

  Keyboard,
  Layers,
  Copy,
  Check,
  Radio,
  Lock,
  KeyRound,
  ShieldAlert,
  Gauge,

} from 'lucide-react'

// Brand Icons
const Github = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const Linkedin = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
)

const Facebook = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
)

// ─── Interfaces ───────────────────────────────────────────────────────────────
interface ReleaseAsset {
  name: string
  browser_download_url: string
  size: number
}

interface Release {
  tag_name: string
  name: string
  published_at: string
  html_url: string
  body: string
  assets: ReleaseAsset[]
}

// ─── Config ───────────────────────────────────────────────────────────────────
const SERVER_REPO = 'AccesDistance/SERVER-SOFTWARE'
const APP_REPO = 'AccesDistance/APPLICATION-MOBILE'

// Direct download fallbacks with solid direct URLs
const DEFAULT_SERVER_RELEASE: Release = {
  tag_name: 'v2.0.0',
  name: 'Release v2.0.0 (Chiffrement AES-256 & Sécurité)',
  published_at: new Date().toISOString(),
  html_url: `https://github.com/${SERVER_REPO}/releases/latest`,
  body: 'Mise à jour majeure v2.0 :\n• Chiffrement symétrique AES-256-GCM sur le flux TCP vidéo et handshake résolution.\n• Authentification cryptographique HMAC-SHA256 sur tous les paquets UDP tactiles.\n• Handshake TCP challenge-response avec clé secrète pré-partagée (PSK).\n• Protection anti-DDoS avec rate limiting (60 req/s/IP) et bannissement automatique IP (300s).\n• Suivi des appareils par Device ID persistant dans devices.json.\n• Validation stricte des commandes par liste blanche.\n• Journalisation structurée quotidienne sur 30 jours (logs/server.log).',
  assets: [
    {
      name: 'server-windows.exe',
      browser_download_url: `https://github.com/${SERVER_REPO}/releases/latest/download/server-windows.exe`,
      size: 15.4 * 1024 * 1024,
    },
    {
      name: 'server-linux',
      browser_download_url: `https://github.com/${SERVER_REPO}/releases/latest/download/server-linux`,
      size: 18.2 * 1024 * 1024,
    },
    {
      name: 'server-macos',
      browser_download_url: `https://github.com/${SERVER_REPO}/releases/latest/download/server-macos`,
      size: 19.1 * 1024 * 1024,
    },
  ],
}

const DEFAULT_APP_RELEASE: Release = {
  tag_name: 'v2.0.0',
  name: 'Release v2.0.0 (Sécurité AES-256, Splash & Docs)',
  published_at: new Date().toISOString(),
  html_url: `https://github.com/${APP_REPO}/releases/latest`,
  body: 'Mise à jour majeure v2.0 de l\'APK :\n• Écran de démarrage animé (Splash Screen) avec logo et halo lumineux.\n• Module de sécurité complet avec chiffrement AES-256-GCM via PointyCastle.\n• Signature HMAC-SHA256 avec numéro de séquence anti-rejeu sur les actions tactiles.\n• Génération et persistance d\'un Device ID unique (UUID v4) basé sur le matériel Android.\n• Vérificateur de mises à jour intégré avec téléchargement direct d\'APK et artefacts GitHub Actions.\n• Page interactive de documentation et guide réseau étape par étape.\n• Page À propos du développeur avec liens vers portfolio et réseaux.\n• Dialogue de gestion de la sécurité et clé PSK.',
  assets: [
    {
      name: 'app-release.apk',
      browser_download_url: `https://github.com/${APP_REPO}/releases/latest/download/app-release.apk`,
      size: 47.8 * 1024 * 1024,
    },
  ],
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return iso
  }
}

// ─── Flip Card Component ──────────────────────────────────────────────────────
interface FlipCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  backTitle: string
  backDesc: string
  action: string
}

function FlipCard({ title, subtitle, icon, backTitle, backDesc, action }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card-container ${flipped ? 'is-flipped' : ''}`}
      style={{ height: '220px', cursor: 'pointer' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner">
        {/* Front Face */}
        <div
          className="flip-card-front"
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1f293d',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                backgroundColor: '#172554',
                color: '#3b82f6',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {icon}
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#2563eb',
                backgroundColor: '#172554',
                padding: '4px 10px',
                borderRadius: '20px',
              }}
            >
              Cliquer pour retourner ↺
            </span>
          </div>

          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>{title}</h4>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>{subtitle}</p>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="flip-card-back"
          style={{
            backgroundColor: '#162032',
            border: '1px solid #2563eb',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Terminal size={16} color="#3b82f6" />
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>{backTitle}</h4>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6 }}>{backDesc}</p>
          </div>

          <div
            style={{
              backgroundColor: '#0b0f19',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #1f293d',
              fontSize: '12px',
              fontFamily: 'monospace',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Terminal size={14} />
            <span>{action}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Accordion Item Component ─────────────────────────────────────────────────
interface AccordionItemProps {
  id: string
  step: string
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function AccordionItem({ step, title, isOpen, onToggle, children }: AccordionItemProps) {
  return (
    <div
      style={{
        backgroundColor: '#111827',
        border: `1px solid ${isOpen ? '#2563eb' : '#1f293d'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        transition: 'border-color 0.2s ease',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          backgroundColor: 'transparent',
          border: 'none',
          color: '#f8fafc',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              backgroundColor: isOpen ? '#2563eb' : '#1e293b',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              fontFamily: 'monospace',
              transition: 'background-color 0.2s',
            }}
          >
            {step}
          </span>
          <span style={{ fontSize: '16px', fontWeight: 600 }}>{title}</span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} color="#94a3b8" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div
              style={{
                padding: '0 24px 24px 24px',
                borderTop: '1px solid #1f293d',
                paddingTop: '20px',
                color: '#94a3b8',
                fontSize: '14px',
                lineHeight: 1.7,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Release Card Component ───────────────────────────────────────────────────
function ReleaseCard({ release, type, repo }: { release: Release; type: 'server' | 'app'; repo: string }) {
  const [showNotes, setShowNotes] = useState(false)
  const isServer = type === 'server'

  return (
    <div
      style={{
        backgroundColor: '#111827',
        border: '1px solid #1f293d',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#172554',
              color: '#3b82f6',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isServer ? <Monitor size={22} /> : <Smartphone size={22} />}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>{release.tag_name}</span>
              <span
                style={{
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                LATEST
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{formatDate(release.published_at)}</span>
          </div>
        </div>

        {/* Links to repo & actions */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <a
            href={`https://github.com/${repo}/actions`}
            target="_blank"
            rel="noopener noreferrer"
            title="Consulter les builds et artifacts de GitHub Actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 500,
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #1f293d',
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb', e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b', e.currentTarget.style.color = '#94a3b8')}
          >
            <Radio size={14} />
            Actions
          </a>
          <a
            href={release.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e293b',
              color: '#94a3b8',
              fontSize: '12px',
              fontWeight: 500,
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #1f293d',
              textDecoration: 'none',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb', e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b', e.currentTarget.style.color = '#94a3b8')}
          >
            <Github size={14} />
            Release
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Direct download buttons */}
      <div>
        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '12px' }}>Téléchargement direct sans compte GitHub :</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {release.assets.map((asset) => {
            const isWindows = asset.name.includes('windows') || asset.name.endsWith('.exe')
            const isLinux = asset.name.includes('linux')
            const isMac = asset.name.includes('macos') || asset.name.includes('mac')
            const isApk = asset.name.endsWith('.apk')

            let label = asset.name
            if (isWindows) label = 'Télécharger pour Windows (.exe)'
            else if (isLinux) label = 'Télécharger pour Linux'
            else if (isMac) label = 'Télécharger pour macOS'
            else if (isApk) label = 'Télécharger l\'APK Android'

            return (
              <a
                key={asset.name}
                href={asset.browser_download_url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  backgroundColor: '#2563eb',
                  color: '#ffffff',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  transition: 'background-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Download size={18} />
                  <span>{label}</span>
                </div>
                <span style={{ fontSize: '12px', opacity: 0.85, fontWeight: 400 }}>{formatBytes(asset.size)}</span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Release Notes Accordion */}
      {release.body && (
        <div style={{ borderTop: '1px solid #1f293d', paddingTop: '12px' }}>
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '13px',
              padding: 0,
            }}
          >
            <ChevronDown
              size={16}
              style={{
                transform: showNotes ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
            {showNotes ? 'Masquer les notes de version' : 'Afficher les notes de version'}
          </button>
          {showNotes && (
            <div
              style={{
                marginTop: '10px',
                padding: '14px',
                backgroundColor: '#0b0f19',
                borderRadius: '8px',
                border: '1px solid #1f293d',
                color: '#cbd5e1',
                fontSize: '12px',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
              }}
            >
              {release.body}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Main Application ─────────────────────────────────────────────────────────
export default function App() {
  const [serverRelease, setServerRelease] = useState<Release>(DEFAULT_SERVER_RELEASE)
  const [appRelease, setAppRelease] = useState<Release>(DEFAULT_APP_RELEASE)
  const [activeSection, setActiveSection] = useState('home')
  const [openDocStep, setOpenDocStep] = useState<string>('01')
  const [copiedIp, setCopiedIp] = useState(false)

  // Fetch real releases from GitHub API
  useEffect(() => {
    fetch(`https://api.github.com/repos/${SERVER_REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Release not found')
        return r.json()
      })
      .then((data) => {
        if (data.tag_name && data.assets && data.assets.length > 0) {
          setServerRelease(data)
        }
      })
      .catch(() => {})

    fetch(`https://api.github.com/repos/${APP_REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((r) => {
        if (!r.ok) throw new Error('Release not found')
        return r.json()
      })
      .then((data) => {
        if (data.tag_name && data.assets && data.assets.length > 0) {
          setAppRelease(data)
        }
      })
      .catch(() => {})
  }, [])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'gestures', 'showcase', 'downloads', 'docs', 'about']
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec)
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(sec)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCopyCommand = () => {
    navigator.clipboard.writeText('python server.py')
    setCopiedIp(true)
    setTimeout(() => setCopiedIp(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#f8fafc' }}>
      {/* ── Navbar ────────────────────────────────────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: '#0b0f19',
          borderBottom: '1px solid #1f293d',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
            height: '68px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand */}
          <div
            onClick={() => scrollTo('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <img
              src="/accesdistance-logo.png"
              alt="Logo AccesDistance"
              style={{ width: '38px', height: '38px', borderRadius: '8px' }}
            />
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
              <span style={{ color: '#2563eb' }}>Acces</span>Distance
            </span>
          </div>

          {/* Nav Items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {[
              { id: 'home', label: 'Accueil' },
              { id: 'features', label: 'Fonctionnalités' },
              { id: 'downloads', label: 'Téléchargements' },
              { id: 'docs', label: 'Documentation' },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                style={{
                  backgroundColor: activeSection === link.id ? '#1e293b' : 'transparent',
                  color: activeSection === link.id ? '#ffffff' : '#94a3b8',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Quick CTA */}
          <button
            type="button"
            onClick={() => scrollTo('downloads')}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
          >
            <Download size={16} />
            Télécharger
          </button>
        </div>
      </header>

      {/* ── Hero Section (Framer Motion) ──────────────────────────────────── */}
      <section
        id="home"
        style={{
          paddingTop: '150px',
          paddingBottom: '90px',
          paddingLeft: '24px',
          paddingRight: '24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#111827',
              border: '1px solid #1f293d',
              borderRadius: '30px',
              padding: '6px 18px',
              fontSize: '13px',
              color: '#f8fafc',
              fontWeight: 600,
              marginBottom: '28px',
            }}
          >
            <ShieldCheck size={15} color="#10b981" />
            <span style={{ color: '#10b981', fontWeight: 700 }}>v2.0 Sécurisée</span> · Chiffrement AES-256-GCM & Signature HMAC · Wi-Fi Local 60 FPS
          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: 'clamp(36px, 5.5vw, 60px)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-1.5px',
              marginBottom: '20px',
            }}
          >
            Contrôlez votre PC depuis votre smartphone en toute sécurité
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontSize: '17px',
              color: '#94a3b8',
              lineHeight: 1.7,
              marginBottom: '36px',
              maxWidth: '680px',
              margin: '0 auto 36px',
            }}
          >
            AccesDistance transforme votre smartphone Android en un pavé tactile ultra-réactif avec affichage direct de
            l'écran de votre ordinateur en 60 FPS. Désormais protégé par un chiffrement de bout en bout AES-256-GCM, une
            authentification HMAC-SHA256 et un système anti-DDoS.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <button
              type="button"
              onClick={() => scrollTo('downloads')}
              style={{
                backgroundColor: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1d4ed8')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
            >
              <Download size={18} />
              Télécharger l'APK & Serveur v2.0
            </button>
            <button
              type="button"
              onClick={() => scrollTo('docs')}
              style={{
                backgroundColor: '#111827',
                color: '#f8fafc',
                border: '1px solid #1f293d',
                padding: '14px 28px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2563eb')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1f293d')}
            >
              <Terminal size={18} color="#3b82f6" />
              Guide & Sécurité PSK
            </button>
          </motion.div>

          {/* Highlights solid grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '16px',
              marginTop: '60px',
            }}
          >
            {[
              { label: 'Chiffré AES-256', desc: 'Flux vidéo protégé GCM', icon: <Lock size={18} color="#10b981" /> },
              { label: 'Auth HMAC-SHA256', desc: 'Paquets tactiles signés', icon: <KeyRound size={18} color="#3b82f6" /> },
              { label: 'Anti-DDoS & Bruteforce', desc: 'Rate limit & ban auto', icon: <ShieldAlert size={18} color="#f59e0b" /> },
              { label: 'Wi-Fi Local', desc: '100% Hors-Ligne & Privé', icon: <Wifi size={18} color="#3b82f6" /> },
              { label: 'Device ID Unique', desc: 'UUID matériel persistant', icon: <Smartphone size={18} color="#8b5cf6" /> },
              { label: '60 FPS Fluide', desc: 'Compression JPEG adaptative', icon: <Monitor size={18} color="#3b82f6" /> },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid #1f293d',
                  borderRadius: '12px',
                  padding: '18px 16px',
                  textAlign: 'center',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc' }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ──────────────────────────────────────────────── */}
      <section
        id="features"
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid #1f293d',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            ARCHITECTURE TECHNIQUE & SÉCURITÉ v2.0
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc', marginTop: '8px' }}>
            Performance, fluidité et sécurité absolue
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '8px' }}>
            Une solution pensée pour être ultra-rapide sur votre réseau local avec une défense en profondeur contre toute intrusion.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {[
            {
              icon: <Lock size={22} color="#10b981" />,
              title: 'Chiffrement symétrique AES-256-GCM',
              desc: 'Toutes les trames vidéo JPEG et la négociation d\'écran TCP sont chiffrées avec un nonce dynamique de 12 octets et une clé de 256 bits via cryptography (Python) et PointyCastle (Dart).',
            },
            {
              icon: <KeyRound size={22} color="#3b82f6" />,
              title: 'Signature HMAC-SHA256 & Anti-Rejeu',
              desc: 'Chaque commande tactile UDP transporte un compteur séquentiel (uint32) et une empreinte cryptographique. Toute tentative d\'injection ou de rejeu est rejetée immédiatement.',
            },
            {
              icon: <ShieldAlert size={22} color="#f59e0b" />,
              title: 'Protection Anti-DDoS & IP Blocker',
              desc: 'RateLimiter glissant limitant le débit à 60 événements/s/IP et bannissement automatique pendant 300 secondes après 5 tentatives infructueuses de connexion.',
            },
            {
              icon: <Smartphone size={22} color="#8b5cf6" />,
              title: 'Device ID matériel persistant',
              desc: 'L\'APK génère un identifiant unique (UUID v4) issu du matériel Android. Chaque appareil est consigné dans devices.json avec l\'historique de ses adresses IP et de ses sessions.',
            },
            {
              icon: <Gauge size={22} color="#ec4899" />,
              title: 'Nouvelle expérience mobile v2.0',
              desc: 'Écran de chargement animé (Splash Screen), vérification intégrée des mises à jour APK en un clic, guide interactif et dialogue de configuration rapide de la clé PSK.',
            },
            {
              icon: <Terminal size={22} color="#3b82f6" />,
              title: 'Validation stricte & Logs structurés',
              desc: 'Filtrage rigoureux par liste blanche des commandes et coordonnées [0.0, 1.0], couplé à une journalisation rotative sur 30 jours (logs/server.log).',
            },
            {
              icon: <Zap size={22} color="#3b82f6" />,
              title: 'Dual-Socket TCP & UDP optimisé',
              desc: 'Le flux d\'écran haute vitesse transite par TCP (port 9999) et les actions tactiles passent par UDP (port 9998) pour éliminer les retards de buffering.',
            },
            {
              icon: <Wifi size={22} color="#10b981" />,
              title: '100% Hors-Ligne & Données Privées',
              desc: 'Toutes les communications restent cantonnées à votre réseau Wi-Fi local sans aucun serveur externe, ni télémétrie, ni dépendance Internet.',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '14px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#172554',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                {card.icon}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>{card.title}</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 3D FLIP CARDS Section (Gestes Tactiles) ────────────────────────── */}
      <section
        id="gestures"
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid #1f293d',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            INTERACTION TACTILE
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc', marginTop: '8px' }}>
            Gestes et commandes
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '8px' }}>
            Survolez ou cliquez sur les cartes pour découvrir le fonctionnement technique sous le capot.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <FlipCard
            title="Clic Gauche"
            subtitle="Tapez 1 fois sur l'écran"
            icon={<MousePointerClick size={22} />}
            backTitle="Commande PyAutoGUI"
            backDesc="Envoie les coordonnées normalisées (0.0-1.0) au serveur via UDP pour cliquer exactement sur le pixel ciblé."
            action="CLICK,0.452,0.612,left"
          />
          <FlipCard
            title="Double Clic"
            subtitle="Tapez 2 fois rapidement"
            icon={<Mouse size={22} />}
            backTitle="Ouverture de fichiers"
            backDesc="Idéal pour lancer des logiciels, ouvrir des dossiers ou sélectionner un mot complet dans un traitement de texte."
            action="DOUBLE_CLICK,0.320,0.145"
          />
          <FlipCard
            title="Clic Droit"
            subtitle="Appui long ou tap prolongé"
            icon={<Layers size={22} />}
            backTitle="Menu contextuel"
            backDesc="Ouvre instantanément les menus contextuels Windows, Linux ou macOS avec une latence quasi-nulle."
            action="RIGHT_CLICK,0.510,0.480"
          />
          <FlipCard
            title="Défilement (Scroll)"
            subtitle="Glissez avec 2 doigts"
            icon={<ArrowUpDown size={22} />}
            backTitle="Molette de souris"
            backDesc="Convertit le vecteur delta Y du geste en pas de défilement proportionnels pour lire vos pages web confortablement."
            action="SCROLL,0.0,-5"
          />
          <FlipCard
            title="Saisie Clavier"
            subtitle="Clavier virtuel complet"
            icon={<Keyboard size={22} />}
            backTitle="Injection de touches"
            backDesc="Prend en charge les lettres, chiffres, touches spéciales (Entrée, Retour arrière, Échap) et caractères Unicode."
            action="KEY,return | TEXT,Bonjour"
          />
          <FlipCard
            title="Déplacement Direct"
            subtitle="Glissez le doigt sur l'écran"
            icon={<Move size={22} />}
            backTitle="Suivi temps réel"
            backDesc="Le curseur de la souris du PC suit fidèlement la position de votre doigt en coordonnées plein écran."
            action="MOVE,0.724,0.339"
          />
          <FlipCard
            title="Paquet UDP Signé"
            subtitle="Signature HMAC-SHA256"
            icon={<Lock size={22} />}
            backTitle="Protection anti-injection & rejeu"
            backDesc="Chaque commande tactile transporte un ID séquentiel uint32 et une signature de 16 octets. Toute altération est immédiatement bloquée."
            action="[4 seq_id][16 hmac][payload]"
          />
          <FlipCard
            title="Handshake TCP & PSK"
            subtitle="Authentification mutuelle"
            icon={<KeyRound size={22} />}
            backTitle="Challenge-Response cryptographique"
            backDesc="Le serveur émet un défi de 32 octets. L'APK répond par HMAC-SHA256 et son Device ID matériel avant d'activer le streaming vidéo."
            action="Challenge(32) -> Response(68) -> OK"
          />
        </div>
      </section>

      {/* ── SWIPER Showcase Carousel Section ──────────────────────────────── */}
      <section
        id="showcase"
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid #1f293d',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            CARROUSEL INTERACTIF (SWIPER)
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc', marginTop: '8px' }}>
            Découvrez AccesDistance en action
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '8px' }}>
            Faites glisser pour explorer les points forts du système.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3500, disableOnInteraction: false }}
        >
          <SwiperSlide>
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '16px',
                padding: '28px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: '#172554',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6',
                    marginBottom: '16px',
                  }}
                >
                  <Monitor size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  1. Écran PC dupliqué
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                  Visualisez en temps réel l'écran de votre machine avec un taux de rafraîchissement fluide et une
                  compression optimisée pour votre bande passante locale.
                </p>
              </div>
              <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>TCP Port 9999 · 60 FPS</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '16px',
                padding: '28px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: '#172554',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6',
                    marginBottom: '16px',
                  }}
                >
                  <Smartphone size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  2. Contrôle tactile précis
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                  Tous les gestes tactiles naturels du smartphone sont interprétés et traduits en mouvements de souris
                  sans décalage perceptif.
                </p>
              </div>
              <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>UDP Port 9998 · Zéro latence</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '16px',
                padding: '28px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: '#172554',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6',
                    marginBottom: '16px',
                  }}
                >
                  <Keyboard size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  3. Clavier et raccourcis
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                  Saisissez du texte, tapez vos mots de passe ou déclenchez des raccourcis système (Ctrl+C, Ctrl+V, Alt+Tab)
                  depuis l'interface mobile.
                </p>
              </div>
              <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>Support Unicode & Presse-papier</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '16px',
                padding: '28px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: '#172554',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#3b82f6',
                    marginBottom: '16px',
                  }}
                >
                  <Wifi size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  4. Détection automatique IP
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                  Le serveur détecte automatiquement votre adresse IPv4 locale au démarrage pour faciliter la saisie sur
                  votre smartphone.
                </p>
              </div>
              <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 600 }}>192.168.x.x / 10.x.x.x</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '16px',
                padding: '28px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: '#064e3b',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    marginBottom: '16px',
                  }}
                >
                  <Lock size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  5. Chiffrement Fort AES-256-GCM
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                  Le flux vidéo complet et les commandes sont verrouillés par cryptographie symétrique et signatures HMAC-SHA256, garantissant une confidentialité totale sur le LAN.
                </p>
              </div>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600 }}>AES-256-GCM · HMAC-SHA256 · Clé PSK</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1f293d',
                borderRadius: '16px',
                padding: '28px',
                height: '320px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    backgroundColor: '#4c1d95',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a78bfa',
                    marginBottom: '16px',
                  }}
                >
                  <Gauge size={24} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
                  6. Interface Mobile v2.0 Enrichie
                </h3>
                <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>
                  Découvrez le nouvel écran de chargement animé, la vérification directe des mises à jour APK et le guide de documentation intégré au creux de votre main.
                </p>
              </div>
              <span style={{ fontSize: '12px', color: '#a78bfa', fontWeight: 600 }}>Splash Screen · Update Checker · Docs</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* ── Downloads Section ─────────────────────────────────────────────── */}
      <section
        id="downloads"
        style={{
          padding: '80px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
          borderTop: '1px solid #1f293d',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            TÉLÉCHARGEMENT DIRECT
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc', marginTop: '8px' }}>
            Versions officielles prêtes à l'emploi
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '8px' }}>
            Les fichiers sont générés automatiquement par les workflows GitHub Actions à chaque mise à jour.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
          {/* Server card */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Monitor size={22} color="#3b82f6" />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>Logiciel Serveur PC</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Windows · Linux · macOS</span>
            </div>
            <ReleaseCard release={serverRelease} type="server" repo={SERVER_REPO} />
          </div>

          {/* Mobile card */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <Smartphone size={22} color="#3b82f6" />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc' }}>Application Mobile</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>Android APK</span>
            </div>
            <ReleaseCard release={appRelease} type="app" repo={APP_REPO} />
          </div>
        </div>
      </section>

      {/* ── Documentation (Accordions) Section ────────────────────────────── */}
      <section
        id="docs"
        style={{
          padding: '80px 24px',
          maxWidth: '1000px',
          margin: '0 auto',
          borderTop: '1px solid #1f293d',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            GUIDE DE CONFIGURATION (ACCORDÉONS)
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc', marginTop: '8px' }}>
            Comment démarrer en quelques clics
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', marginTop: '8px' }}>
            Cliquez sur chaque étape pour déployer le serveur et connecter votre smartphone.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <AccordionItem
            id="step-1"
            step="01"
            title="Lancer le serveur PC & Génération de la clé PSK"
            isOpen={openDocStep === '01'}
            onToggle={() => setOpenDocStep(openDocStep === '01' ? '' : '01')}
          >
            <p style={{ marginBottom: '14px' }}>
              Téléchargez l'exécutable ci-dessus ou lancez le script Python sur votre PC. Au premier lancement, une clé secrète cryptographique est automatiquement générée dans le fichier <code style={{ color: '#10b981', backgroundColor: '#0b0f19', padding: '2px 6px', borderRadius: '4px' }}>accesdistance.key</code> :
            </p>
            <div
              style={{
                backgroundColor: '#0b0f19',
                borderRadius: '10px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '13px',
                border: '1px solid #1f293d',
                color: '#cbd5e1',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748b' }}># Windows / Linux / macOS (Terminal ou Double-clic)</span>
                <button
                  type="button"
                  onClick={handleCopyCommand}
                  style={{
                    backgroundColor: '#1e293b',
                    color: '#94a3b8',
                    border: 'none',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  {copiedIp ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                  {copiedIp ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <span style={{ color: '#3b82f6' }}>&gt; python server.py</span>
              <div style={{ color: '#64748b', margin: '4px 0' }}>──────────────────────────────────────────</div>
              <span style={{ color: '#f8fafc', fontWeight: 700 }}>ACCESDISTANCE — SERVEUR SÉCURISÉ v2.0</span>
              <span style={{ color: '#3b82f6' }}>-&gt; Adresse IP du PC : 192.168.1.50</span>
              <span style={{ color: '#94a3b8' }}>-&gt; Port Stream Vidéo (TCP) : 9999 [Chiffré AES-256-GCM]</span>
              <span style={{ color: '#94a3b8' }}>-&gt; Port Tactile / Souris (UDP) : 9998 [Signé HMAC-SHA256]</span>
              <span style={{ color: '#10b981' }}>-&gt; Clé PSK générée : accesdistance.key (64 caractères hex)</span>
            </div>
          </AccordionItem>

          <AccordionItem
            id="step-2"
            step="02"
            title="Installer l'application mobile APK v2.0"
            isOpen={openDocStep === '02'}
            onToggle={() => setOpenDocStep(openDocStep === '02' ? '' : '02')}
          >
            <p style={{ marginBottom: '14px' }}>
              Transférez le fichier <code style={{ color: '#3b82f6', backgroundColor: '#0b0f19', padding: '2px 6px', borderRadius: '4px' }}>app-release.apk</code> sur votre téléphone et procédez à l'installation :
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Autorisez l'installation depuis des sources inconnues dans les paramètres de sécurité Android si nécessaire.</li>
              <li>Ouvrez l'application <strong>AccesDistance</strong> et découvrez le nouvel écran de chargement animé.</li>
              <li>Vérifiez que votre téléphone et votre PC sont connectés au <strong>même réseau Wi-Fi local</strong>.</li>
            </ul>
          </AccordionItem>

          <AccordionItem
            id="step-3"
            step="03"
            title="Sécuriser la liaison avec la clé PSK (Recommandé)"
            isOpen={openDocStep === '03'}
            onToggle={() => setOpenDocStep(openDocStep === '03' ? '' : '03')}
          >
            <p style={{ marginBottom: '14px' }}>
              Pour activer le chiffrement fort de bout en bout et l'authentification cryptographique :
            </p>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Ouvrez le fichier <code style={{ color: '#10b981', backgroundColor: '#0b0f19', padding: '2px 6px', borderRadius: '4px' }}>accesdistance.key</code> créé dans le dossier de votre serveur sur le PC.</li>
              <li>Copiez la chaîne hexadécimale de 64 caractères.</li>
              <li>Dans l'application mobile, appuyez sur le bouton <strong>Sécurité & Clé PSK</strong> sur l'accueil.</li>
              <li>Collez la clé et appuyez sur <strong>Enregistrer</strong>. Le badge d'état devient vert : <span style={{ color: '#10b981', fontWeight: 600 }}>Chiffrement AES-256 Actif ✅</span>.</li>
            </ol>
          </AccordionItem>

          <AccordionItem
            id="step-4"
            step="04"
            title="Se connecter et prendre le contrôle en temps réel"
            isOpen={openDocStep === '04'}
            onToggle={() => setOpenDocStep(openDocStep === '04' ? '' : '04')}
          >
            <p style={{ marginBottom: '14px' }}>
              Saisissez l'adresse IP du PC (exemple : <code style={{ color: '#3b82f6', backgroundColor: '#0b0f19', padding: '2px 6px', borderRadius: '4px' }}>192.168.1.50</code>) et touchez <strong>Se connecter</strong>.
            </p>
            <div
              style={{
                backgroundColor: '#0b0f19',
                border: '1px solid #1f293d',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '13px',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={16} />
              <span>Le handshake d'authentification challenge-response s'effectue automatiquement en moins d'une seconde !</span>
            </div>
          </AccordionItem>

          <AccordionItem
            id="step-5"
            step="05"
            title="Dépannage, Pare-feu Windows & Mises à jour"
            isOpen={openDocStep === '05'}
            onToggle={() => setOpenDocStep(openDocStep === '05' ? '' : '05')}
          >
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Pare-feu Windows :</strong> Autorisez les ports 9999 (TCP flux vidéo) et 9998 (UDP commandes) si la connexion ne s'établit pas.</li>
              <li><strong>Système anti-bruteforce :</strong> Après 5 échecs consécutifs d'authentification, l'IP est bannie 300 secondes. Patientez ou vérifiez la clé dans <code style={{ color: '#10b981', backgroundColor: '#0b0f19', padding: '2px 6px', borderRadius: '4px' }}>accesdistance.key</code>.</li>
              <li><strong>Mise à jour intégrée :</strong> Utilisez le bouton "Mise à jour APK" sur l'écran d'accueil pour vérifier et télécharger les nouvelles versions directement sans passer par un navigateur.</li>
            </ul>
          </AccordionItem>
        </div>
      </section>

      {/* ── Developer Profile Section ─────────────────────────────────────── */}
      <section
        id="about"
        style={{
          padding: '80px 24px',
          maxWidth: '900px',
          margin: '0 auto',
          borderTop: '1px solid #1f293d',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: '#2563eb',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            À PROPOS DU CRÉATEUR
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#f8fafc', marginTop: '8px' }}>
            Développé par Fabrice Faniry RANDT
          </h2>
        </div>

        <div
          style={{
            backgroundColor: '#111827',
            border: '1px solid #1f293d',
            borderRadius: '16px',
            padding: '40px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '20px',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '110px',
              height: '110px',
              minWidth: '110px',
              minHeight: '110px',
              maxWidth: '110px',
              maxHeight: '110px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #2563eb',
              backgroundColor: '#172554',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            <img
              src="/pdp.jpg"
              alt="Fabrice Faniry RANDT"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
              }}
            />
          </div>

          <div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
              Fabrice Faniry RANDT
            </h3>
            <p style={{ color: '#2563eb', fontSize: '15px', fontWeight: 600 }}>
              Programmer · Ethical Hacker · Graphic Designer
            </p>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '6px' }}>
              Antananarivo, Madagascar
            </p>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.8, maxWidth: '600px' }}>
            AccesDistance est un projet open source pensé pour offrir une alternative libre, rapide et 100% privée aux
            logiciels de prise de contrôle distants. Conçu avec Python pour la couche serveur et Flutter pour l'application
            mobile.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              {
                label: 'GitHub',
                url: 'https://github.com/FabriceFaniry-RANDT4050',
                icon: <Github size={16} />,
              },
              {
                label: 'Portfolio',
                url: 'https://fabrice-faniry-randt.vercel.app',
                icon: <Globe size={16} />,
              },
              {
                label: 'LinkedIn',
                url: 'https://linkedin.com/in/fabrice-faniry-randriamahatratra-8aa17271',
                icon: <Linkedin size={16} />,
              },
              {
                label: 'Facebook',
                url: 'https://facebook.com/fabricefaniryrandt',
                icon: <Facebook size={16} />,
              },
              {
                label: 'Email',
                url: 'mailto:fahniryjklm@gmail.com',
                icon: <Mail size={16} />,
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#1e293b',
                  color: '#f8fafc',
                  border: '1px solid #1f293d',
                  padding: '10px 18px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: '1px solid #1f293d',
          padding: '36px 24px',
          textAlign: 'center',
          backgroundColor: '#0b0f19',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
          <img src="/accesdistance-logo.png" alt="logo" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc' }}>
            <span style={{ color: '#2563eb' }}>Acces</span>Distance
          </span>
        </div>
        <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6 }}>
          © {new Date().getFullYear()} Fabrice Faniry RANDT · Master professionnel · Open Source
          <br />
          Développé à Madagascar
        </p>
      </footer>
    </div>
  )
}
