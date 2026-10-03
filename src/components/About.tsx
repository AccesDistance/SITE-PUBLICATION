import React from 'react'
import { Globe, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon, FacebookIcon } from './BrandIcons'

export const About: React.FC = () => {
  const socialLinks = [
    {
      label: 'GitHub',
      url: 'https://github.com/FabriceFaniry-RANDT4050',
      icon: <GithubIcon size={15} />,
    },
    {
      label: 'Portfolio',
      url: 'https://fabrice-faniry-randt.vercel.app',
      icon: <Globe size={15} />,
    },
    {
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/fabrice-faniry-randriamahatratra-8aa17271',
      icon: <LinkedinIcon size={15} />,
    },
    {
      label: 'Facebook',
      url: 'https://facebook.com/fabricefaniryrandt',
      icon: <FacebookIcon size={15} />,
    },
    {
      label: 'Email',
      url: 'mailto:fahniryjklm@gmail.com',
      icon: <Mail size={15} />,
    },
  ]

  return (
    <section id="about" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#1f293d]">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs sm:text-sm font-bold text-blue-500 uppercase tracking-widest">
          À Propos du Créateur
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2.5 mb-2 tracking-tight">
          Développé par Fabrice Faniry RANDT
        </h2>
      </div>

      <div className="bg-[#111827] border border-[#1f293d] rounded-xs p-6 sm:p-10 flex flex-col items-center text-center gap-5 shadow-lg">
        {/* Avatar */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-3 border-blue-600 bg-[#172554] shadow-xl shrink-0">
          <img
            src="/pdp.jpg"
            alt="Fabrice Faniry RANDT"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
            Fabrice Faniry RANDT
          </h3>
          <p className="text-sm sm:text-base font-semibold text-blue-400">
            Programmer · Ethical Hacker · Graphic Designer
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Antananarivo, Madagascar
          </p>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
          AccesDistance est un projet open source pensé pour offrir une alternative libre, rapide et 100% privée aux
          logiciels de prise de contrôle distants. Conçu avec Python pour la couche serveur et Flutter pour
          l'application mobile.
        </p>

        {/* Social Links */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 justify-center mt-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1e293b] hover:bg-blue-600 text-slate-200 hover:text-white border border-[#1f293d] px-3.5 py-2 rounded-xs text-xs sm:text-sm font-medium transition-colors"
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
