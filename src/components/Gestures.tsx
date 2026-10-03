import React from 'react'
import {
  MousePointerClick,
  Mouse,
  Layers,
  ArrowUpDown,
  Keyboard,
  Move,
  Lock,
  KeyRound,
} from 'lucide-react'
import { FlipCard } from './FlipCard'

export const Gestures: React.FC = () => {
  const gestureList = [
    {
      title: 'Clic Gauche',
      subtitle: "Tapez 1 fois sur l'écran",
      icon: <MousePointerClick size={22} />,
      backTitle: 'Commande PyAutoGUI',
      backDesc: 'Envoie les coordonnées normalisées (0.0-1.0) au serveur via UDP pour cliquer exactement sur le pixel ciblé.',
      action: 'CLICK,0.452,0.612,left',
    },
    {
      title: 'Double Clic',
      subtitle: 'Tapez 2 fois rapidement',
      icon: <Mouse size={22} />,
      backTitle: 'Ouverture de fichiers',
      backDesc: 'Idéal pour lancer des logiciels, ouvrir des dossiers ou sélectionner un mot complet dans un traitement de texte.',
      action: 'DOUBLE_CLICK,0.320,0.145',
    },
    {
      title: 'Clic Droit',
      subtitle: 'Appui long ou tap prolongé',
      icon: <Layers size={22} />,
      backTitle: 'Menu contextuel',
      backDesc: 'Ouvre instantanément les menus contextuels Windows, Linux ou macOS avec une latence quasi-nulle.',
      action: 'RIGHT_CLICK,0.510,0.480',
    },
    {
      title: 'Défilement (Scroll)',
      subtitle: 'Glissez avec 2 doigts',
      icon: <ArrowUpDown size={22} />,
      backTitle: 'Molette de souris',
      backDesc: 'Convertit le vecteur delta Y du geste en pas de défilement proportionnels pour naviguer vos pages confortablement.',
      action: 'SCROLL,0.0,-5',
    },
    {
      title: 'Saisie Clavier',
      subtitle: 'Clavier virtuel complet',
      icon: <Keyboard size={22} />,
      backTitle: 'Injection de touches',
      backDesc: 'Prend en charge les lettres, chiffres, touches spéciales (Entrée, Retour arrière, Échap) et caractères Unicode.',
      action: 'KEY,return | TEXT,Bonjour',
    },
    {
      title: 'Déplacement Direct',
      subtitle: "Glissez le doigt sur l'écran",
      icon: <Move size={22} />,
      backTitle: 'Suivi temps réel',
      backDesc: 'Le curseur de la souris du PC suit fidèlement la position de votre doigt en coordonnées plein écran.',
      action: 'MOVE,0.724,0.339',
    },
    {
      title: 'Paquet UDP Signé',
      subtitle: 'Signature HMAC-SHA256',
      icon: <Lock size={22} />,
      backTitle: 'Protection anti-injection & rejeu',
      backDesc: 'Chaque commande tactile transporte un ID séquentiel uint32 et une signature HMAC. Toute altération est bloquée.',
      action: '[4 seq_id][16 hmac][payload]',
    },
    {
      title: 'Handshake TCP & PSK',
      subtitle: 'Authentification mutuelle',
      icon: <KeyRound size={22} />,
      backTitle: 'Challenge-Response cryptographique',
      backDesc: "Le serveur émet un défi de 32 octets. L'APK répond par HMAC-SHA256 et son Device ID matériel avant d'activer le flux vidéo.",
      action: 'Challenge(32) -> Response(68) -> OK',
    },
  ]

  return (
    <section id="gestures" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1f293d]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold text-blue-500 uppercase tracking-widest">
          Interaction Tactile
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2.5 mb-3 tracking-tight">
          Gestes et commandes tactiles
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2">
          Survolez ou touchez les cartes pour découvrir le fonctionnement technique sous le capot.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {gestureList.map((g, i) => (
          <FlipCard key={i} {...g} />
        ))}
      </div>
    </section>
  )
}
