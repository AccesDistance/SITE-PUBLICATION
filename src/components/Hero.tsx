import React from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck,
  Download,
  Terminal,
  Lock,
  KeyRound,
  ShieldAlert,
  Wifi,
  Smartphone,
  Monitor,
} from 'lucide-react'

interface HeroProps {
  onNavigate: (id: string) => void
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const highlights = [
    {
      label: 'Chiffré AES-256',
      desc: 'Flux vidéo protégé GCM',
      icon: <Lock size={20} className="text-emerald-400" />,
      border: 'hover:border-emerald-500/40',
    },
    {
      label: 'Auth HMAC-SHA256',
      desc: 'Paquets tactiles signés',
      icon: <KeyRound size={20} className="text-blue-400" />,
      border: 'hover:border-blue-500/40',
    },
    {
      label: 'Anti-DDoS',
      desc: 'Rate limit & ban auto',
      icon: <ShieldAlert size={20} className="text-amber-400" />,
      border: 'hover:border-amber-500/40',
    },
    {
      label: 'Wi-Fi Local',
      desc: '100% Hors-Ligne & Privé',
      icon: <Wifi size={20} className="text-blue-400" />,
      border: 'hover:border-blue-500/40',
    },
    {
      label: 'Device ID Unique',
      desc: 'UUID matériel persistant',
      icon: <Smartphone size={20} className="text-purple-400" />,
      border: 'hover:border-purple-500/40',
    },
    {
      label: '60 FPS Fluide',
      desc: 'Compression adaptative',
      icon: <Monitor size={20} className="text-blue-400" />,
      border: 'hover:border-blue-500/40',
    },
  ]

  return (
    <section id="home" className="pt-28 sm:pt-36 md:pt-44 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-4xl mx-auto">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 bg-[#111827] border border-slate-700/60 rounded-full px-4 py-2 text-xs sm:text-sm text-slate-200 font-medium mb-6 sm:mb-8 shadow-md"
        >
          <ShieldCheck size={17} className="text-emerald-400 shrink-0" />
          <span>
            <strong className="text-emerald-400 font-bold">v2.0 Sécurisée</strong> · AES-256-GCM · HMAC-SHA256 · Wi-Fi Local 60 FPS
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
        >
          Contrôlez votre PC depuis votre smartphone{' '}
          <span className="text-blue-500 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
            en toute sécurité
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10 px-2"
        >
          AccesDistance transforme votre smartphone Android en un pavé tactile ultra-réactif avec affichage direct de
          l'écran de votre ordinateur en 60 FPS. Protégé par un chiffrement de bout en bout AES-256-GCM, une
          authentification HMAC-SHA256 et un système anti-DDoS.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-3.5 sm:gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto"
        >
          <button
            type="button"
            onClick={() => onNavigate('downloads')}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-7 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all cursor-pointer"
          >
            <Download size={18} />
            Télécharger l'APK & Serveur v2.0
          </button>
          <button
            type="button"
            onClick={() => onNavigate('docs')}
            className="bg-[#1e293b] hover:bg-[#283548] text-white font-semibold py-3.5 px-7 rounded-xl text-sm sm:text-base border border-slate-700 hover:border-blue-500/50 flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer"
          >
            <Terminal size={18} className="text-blue-400" />
            Guide & Sécurité PSK
          </button>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-14 sm:mt-16 md:mt-20">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className={`bg-[#111827] border border-slate-800 ${item.border} rounded-2xl p-4 sm:p-5 text-center transition-all duration-200 flex flex-col items-center justify-center shadow-sm hover:bg-[#162032]`}
            >
              <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-[#172554] mb-3">
                {item.icon}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white">{item.label}</div>
              <div className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-snug">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
