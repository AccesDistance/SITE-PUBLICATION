import React from 'react'
import { motion } from 'framer-motion'
import {
  Lock,
  KeyRound,
  ShieldAlert,
  Smartphone,
  Gauge,
  Terminal,
  Zap,
  Wifi,
} from 'lucide-react'

export const Features: React.FC = () => {
  const cards = [
    {
      icon: <Lock size={22} className="text-emerald-400" />,
      title: 'Chiffrement symétrique AES-256-GCM',
      desc: "Toutes les trames vidéo JPEG et la négociation d'écran TCP sont chiffrées avec un nonce dynamique de 12 octets et une clé de 256 bits via cryptography (Python) et PointyCastle (Dart).",
      border: 'border-slate-800 hover:border-emerald-500/50',
      badge: 'Sécurité GCM',
      badgeColor: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40',
    },
    {
      icon: <KeyRound size={22} className="text-blue-400" />,
      title: 'Signature HMAC-SHA256 & Anti-Rejeu',
      desc: "Chaque commande tactile UDP transporte un compteur séquentiel (uint32) et une empreinte cryptographique. Toute tentative d'injection ou de rejeu est rejetée immédiatement.",
      border: 'border-slate-800 hover:border-blue-500/50',
      badge: 'Intégrité UDP',
      badgeColor: 'text-blue-400 bg-blue-950/50 border-blue-800/40',
    },
    {
      icon: <ShieldAlert size={22} className="text-amber-400" />,
      title: 'Protection Anti-DDoS & IP Blocker',
      desc: 'RateLimiter glissant limitant le débit à 60 événements/s/IP et bannissement automatique pendant 300 secondes après 5 tentatives infructueuses de connexion.',
      border: 'border-slate-800 hover:border-amber-500/50',
      badge: 'Pare-Feu Auto',
      badgeColor: 'text-amber-400 bg-amber-950/50 border-amber-800/40',
    },
    {
      icon: <Smartphone size={22} className="text-purple-400" />,
      title: 'Device ID matériel persistant',
      desc: "L'APK génère un identifiant unique (UUID v4) issu du matériel Android. Chaque appareil est consigné dans devices.json avec l'historique de ses adresses IP et de ses sessions.",
      border: 'border-slate-800 hover:border-purple-500/50',
      badge: 'Traçabilité',
      badgeColor: 'text-purple-400 bg-purple-950/50 border-purple-800/40',
    },
    {
      icon: <Gauge size={22} className="text-pink-400" />,
      title: 'Nouvelle expérience mobile v2.0',
      desc: "Écran de chargement animé (Splash Screen), vérification intégrée des mises à jour APK en un clic, guide interactif et dialogue de configuration rapide de la clé PSK.",
      border: 'border-slate-800 hover:border-pink-500/50',
      badge: 'Expérience UI',
      badgeColor: 'text-pink-400 bg-pink-950/50 border-pink-800/40',
    },
    {
      icon: <Terminal size={22} className="text-blue-400" />,
      title: 'Validation stricte & Logs structurés',
      desc: 'Filtrage rigoureux par liste blanche des commandes et coordonnées [0.0, 1.0], couplé à une journalisation rotative sur 30 jours (logs/server.log).',
      border: 'border-slate-800 hover:border-blue-500/50',
      badge: 'Audit & Logs',
      badgeColor: 'text-blue-400 bg-blue-950/50 border-blue-800/40',
    },
    {
      icon: <Zap size={22} className="text-blue-400" />,
      title: 'Dual-Socket TCP & UDP optimisé',
      desc: "Le flux d'écran haute vitesse transite par TCP (port 9999) et les actions tactiles passent par UDP (port 9998) pour éliminer les retards de buffering.",
      border: 'border-slate-800 hover:border-blue-500/50',
      badge: 'Zéro Latence',
      badgeColor: 'text-blue-400 bg-blue-950/50 border-blue-800/40',
    },
    {
      icon: <Wifi size={22} className="text-emerald-400" />,
      title: '100% Hors-Ligne & Données Privées',
      desc: 'Toutes les communications restent cantonnées à votre réseau Wi-Fi local sans aucun serveur externe, ni télémétrie, ni dépendance Internet.',
      border: 'border-slate-800 hover:border-emerald-500/50',
      badge: '100% Local',
      badgeColor: 'text-emerald-400 bg-emerald-950/50 border-emerald-800/40',
    },
  ]

  return (
    <section id="features" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
      <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold text-blue-500 uppercase tracking-widest bg-blue-950/50 border border-blue-800/30 px-3 py-1 rounded-full inline-block mb-3">
          Architecture Technique & Sécurité v2.0
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
          Performance, fluidité et sécurité absolue
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2">
          Une solution pensée pour être ultra-rapide sur votre réseau local avec une défense en profondeur contre toute
          intrusion.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className={`bg-[#111827] border ${card.border} rounded-xs p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 shadow-sm hover:bg-[#162032]`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xs bg-[#172554] flex items-center justify-center">
                  {card.icon}
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                {card.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
