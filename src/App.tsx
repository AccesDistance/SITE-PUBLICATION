import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Gestures } from './components/Gestures'
import { Showcase } from './components/Showcase'
import { Downloads } from './components/Downloads'
import { Documentation } from './components/Documentation'
import { About } from './components/About'
import { Footer } from './components/Footer'
import {
  type Release,
  SERVER_REPO,
  APP_REPO,
  DEFAULT_SERVER_RELEASE,
  DEFAULT_APP_RELEASE,
} from './lib/types'

export default function App() {
  const [serverRelease, setServerRelease] = useState<Release>(DEFAULT_SERVER_RELEASE)
  const [appRelease, setAppRelease] = useState<Release>(DEFAULT_APP_RELEASE)
  const [activeSection, setActiveSection] = useState('home')

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

  // Scroll detection for active section
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -70
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Responsive Navbar with Hamburger Menu */}
      <Navbar activeSection={activeSection} onNavigate={scrollTo} />

      {/* Main Content Sections */}
      <main>
        <Hero onNavigate={scrollTo} />
        <Features />
        <Gestures />
        <Showcase />
        <Downloads serverRelease={serverRelease} appRelease={appRelease} />
        <Documentation />
        <About />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
