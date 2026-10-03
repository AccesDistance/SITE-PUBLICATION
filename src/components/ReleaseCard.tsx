import React, { useState } from 'react'
import {
  Monitor,
  Smartphone,
  Radio,
  ExternalLink,
  Download,
  ChevronDown,
} from 'lucide-react'
import { GithubIcon } from './BrandIcons'
import { type Release, formatBytes, formatDate } from '../lib/types'

interface ReleaseCardProps {
  release: Release
  type: 'server' | 'app'
  repo: string
}

export const ReleaseCard: React.FC<ReleaseCardProps> = ({ release, type, repo }) => {
  const [showNotes, setShowNotes] = useState(false)
  const isServer = type === 'server'

  return (
    <div className="bg-[#111827] border border-[#1f293d] rounded-xs p-5 sm:p-6 flex flex-col gap-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[#1f293d]/80">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 bg-[#172554] text-blue-400 rounded-xs flex items-center justify-center shrink-0">
            {isServer ? <Monitor size={22} /> : <Smartphone size={22} />}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                {release.tag_name}
              </span>
              <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Latest
              </span>
            </div>
            <span className="text-xs text-slate-400 block mt-0.5">
              {formatDate(release.published_at)}
            </span>
          </div>
        </div>

        {/* GitHub Actions & Releases buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href={`https://github.com/${repo}/actions`}
            target="_blank"
            rel="noopener noreferrer"
            title="Consulter les builds et artifacts de GitHub Actions"
            className="flex items-center gap-1.5 bg-[#1e293b] hover:bg-blue-600 text-slate-300 hover:text-white text-xs font-medium px-3 py-1.5 rounded-xs border border-[#1f293d] transition-colors"
          >
            <Radio size={13} />
            <span>Actions</span>
          </a>
          <a
            href={release.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#1e293b] hover:bg-blue-600 text-slate-300 hover:text-white text-xs font-medium px-3 py-1.5 rounded-xs border border-[#1f293d] transition-colors"
          >
            <GithubIcon size={13} />
            <span>Release</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Direct download buttons */}
      <div>
        <p className="text-xs sm:text-sm text-slate-400 mb-3">
          Téléchargement direct sans compte GitHub :
        </p>
        <div className="flex flex-col gap-2.5">
          {release.assets.map((asset) => {
            const isWindows = asset.name.includes('windows') || asset.name.endsWith('.exe')
            const isLinux = asset.name.includes('linux')
            const isMac = asset.name.includes('macos') || asset.name.includes('mac')
            const isApk = asset.name.endsWith('.apk')

            let label = asset.name
            if (isWindows) label = 'Télécharger pour Windows (.exe)'
            else if (isLinux) label = 'Télécharger pour Linux'
            else if (isMac) label = 'Télécharger pour macOS'
            else if (isApk) label = "Télécharger l'APK Android"

            return (
              <a
                key={asset.name}
                href={asset.browser_download_url}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xs text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-600/20"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Download size={17} className="shrink-0" />
                  <span className="truncate">{label}</span>
                </div>
                <span className="text-[11px] sm:text-xs font-normal text-blue-200 self-end sm:self-auto shrink-0 bg-blue-700/60 px-2 py-0.5 rounded">
                  {formatBytes(asset.size)}
                </span>
              </a>
            )
          })}
        </div>
      </div>

      {/* Release Notes Accordion */}
      {release.body && (
        <div className="pt-3 border-t border-[#1f293d]">
          <button
            type="button"
            onClick={() => setShowNotes(!showNotes)}
            className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white cursor-pointer transition-colors focus:outline-none"
          >
            <ChevronDown
              size={15}
              className={`transform transition-transform duration-200 ${
                showNotes ? 'rotate-180' : ''
              }`}
            />
            <span>{showNotes ? 'Masquer les notes de version' : 'Afficher les notes de version'}</span>
          </button>
          {showNotes && (
            <div className="mt-3 p-3.5 bg-[#0b0f19] rounded-xs border border-[#1f293d] text-xs text-slate-300 leading-relaxed whitespace-pre-line overflow-x-auto">
              {release.body}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
