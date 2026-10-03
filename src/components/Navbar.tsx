import React, { useState, useEffect } from 'react'
import { Download, Menu, X } from 'lucide-react'

interface NavbarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinks = [
    { id: 'home', label: 'Accueil' },
    { id: 'features', label: 'Fonctionnalités' },

    { id: 'downloads', label: 'Téléchargements' },
    { id: 'docs', label: 'Documentation' },
  ]

  const handleLinkClick = (id: string) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-3 cursor-pointer text-left focus:outline-none group"
        >
          <img
            src="/accesdistance-logo.png"
            alt="Logo AccesDistance"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl shadow-md border border-slate-700/50 group-hover:border-blue-500/50 transition-colors"
          />
          <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            <span className="text-blue-500">Acces</span>Distance
          </span>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 bg-[#111827]/70 border border-slate-800/80 rounded-xl p-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        {/* Desktop Quick CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleLinkClick('downloads')}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer hover:shadow-blue-600/50"
          >
            <Download size={16} />
            Télécharger
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => handleLinkClick('downloads')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer sm:hidden"
          >
            <Download size={14} />
            APK
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-[#1e293b] border border-slate-800 transition-colors focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-[#0b0f19] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 hover:bg-[#162032] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={() => handleLinkClick('downloads')}
              className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
            >
              <Download size={17} />
              Télécharger l'APK & Serveur v2.0
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
