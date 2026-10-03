import React from 'react'
import { Monitor, Smartphone } from 'lucide-react'
import { ReleaseCard } from './ReleaseCard'
import { type Release, SERVER_REPO, APP_REPO } from '../lib/types'

interface DownloadsProps {
  serverRelease: Release
  appRelease: Release
}

export const Downloads: React.FC<DownloadsProps> = ({ serverRelease, appRelease }) => {
  return (
    <section id="downloads" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#1f293d]">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold text-blue-500 uppercase tracking-widest">
          Téléchargement Direct
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2.5 mb-3 tracking-tight">
          Versions officielles prêtes à l'emploi
        </h2>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed px-2">
          Les fichiers sont générés automatiquement par les workflows GitHub Actions à chaque mise à jour.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Server PC card */}
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <Monitor size={20} className="text-blue-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">Logiciel Serveur PC</h3>
            <span className="text-xs text-slate-500">Windows · Linux · macOS</span>
          </div>
          <ReleaseCard release={serverRelease} type="server" repo={SERVER_REPO} />
        </div>

        {/* Mobile APK card */}
        <div>
          <div className="flex items-center gap-2.5 mb-3.5">
            <Smartphone size={20} className="text-blue-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">Application Mobile</h3>
            <span className="text-xs text-slate-500">Android APK</span>
          </div>
          <ReleaseCard release={appRelease} type="app" repo={APP_REPO} />
        </div>
      </div>
    </section>
  )
}
