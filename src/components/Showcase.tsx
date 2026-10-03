import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import {
  Monitor,
  Smartphone,
  Keyboard,
  Wifi,
  Lock,
  Gauge,
} from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export const Showcase: React.FC = () => {
  const slides = [
    {
      icon: <Monitor size={24} className="text-blue-400" />,
      iconBg: 'bg-[#172554]',
      title: '1. Écran PC dupliqué',
      desc: "Visualisez en temps réel l'écran de votre machine avec un taux de rafraîchissement fluide et une compression optimisée pour votre bande passante locale.",
      badge: 'TCP Port 9999 · 60 FPS',
      badgeColor: 'text-blue-400',
    },
    {
      icon: <Smartphone size={24} className="text-blue-400" />,
      iconBg: 'bg-[#172554]',
      title: '2. Contrôle tactile précis',
      desc: "Tous les gestes tactiles naturels du smartphone sont interprétés et traduits en mouvements de souris sans décalage perceptif.",
      badge: 'UDP Port 9998 · Zéro latence',
      badgeColor: 'text-blue-400',
    },
    {
      icon: <Keyboard size={24} className="text-blue-400" />,
      iconBg: 'bg-[#172554]',
      title: '3. Clavier et raccourcis',
      desc: "Saisissez du texte, tapez vos mots de passe ou déclenchez des raccourcis système (Ctrl+C, Ctrl+V, Alt+Tab) depuis l'interface mobile.",
      badge: 'Support Unicode & Raccourcis',
      badgeColor: 'text-blue-400',
    },
    {
      icon: <Wifi size={24} className="text-blue-400" />,
      iconBg: 'bg-[#172554]',
      title: '4. Détection automatique IP',
      desc: "Le serveur détecte automatiquement votre adresse IPv4 locale au démarrage pour faciliter la saisie sur votre smartphone.",
      badge: '192.168.x.x / 10.x.x.x',
      badgeColor: 'text-blue-400',
    },
    {
      icon: <Lock size={24} className="text-emerald-400" />,
      iconBg: 'bg-emerald-950/60 border border-emerald-800/40',
      title: '5. Chiffrement Fort AES-256-GCM',
      desc: "Le flux vidéo complet et les commandes sont verrouillés par cryptographie symétrique et signatures HMAC-SHA256, garantissant une confidentialité totale sur le LAN.",
      badge: 'AES-256-GCM · Clé PSK',
      badgeColor: 'text-emerald-400',
    },
    {
      icon: <Gauge size={24} className="text-purple-400" />,
      iconBg: 'bg-purple-950/60 border border-purple-800/40',
      title: '6. Interface Mobile v2.0 Enrichie',
      desc: "Découvrez le nouvel écran de chargement animé, la vérification directe des mises à jour APK et le guide de documentation intégré au creux de votre main.",
      badge: 'Splash Screen · Update Checker',
      badgeColor: 'text-purple-400',
    },
  ]

  return (
    <section id="showcase" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1f293d]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold text-blue-500 uppercase tracking-widest">
          Carrousel Interactif
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2.5 mb-3 tracking-tight">
          Découvrez AccesDistance en action
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2">
          Faites glisser pour explorer les points forts du système sur mobile et PC.
        </p>
      </div>

      <div className="relative px-0 sm:px-6">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="pb-14!"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#111827] border border-[#1f293d] rounded-2xl p-6 sm:p-7 h-[300px] sm:h-[320px] flex flex-col justify-between shadow-sm hover:border-blue-500/30 transition-colors">
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl ${slide.iconBg} flex items-center justify-center mb-5`}
                  >
                    {slide.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2.5">{slide.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{slide.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#1f293d]/60">
                  <span className={`text-xs font-semibold ${slide.badgeColor}`}>{slide.badge}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
