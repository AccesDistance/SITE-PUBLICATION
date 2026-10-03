import React, { useState } from 'react'
import { Terminal } from 'lucide-react'

export interface FlipCardProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  backTitle: string
  backDesc: string
  action: string
}

export const FlipCard: React.FC<FlipCardProps> = ({
  title,
  subtitle,
  icon,
  backTitle,
  backDesc,
  action,
}) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card-container ${flipped ? 'is-flipped' : ''} h-56 sm:h-60 cursor-pointer select-none`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setFlipped(!flipped)
        }
      }}
      aria-label={`${title} - cliquer pour voir les détails`}
    >
      <div className="flip-card-inner">
        {/* Front Face */}
        <div className="flip-card-front bg-[#111827] border border-[#1f293d] hover:border-blue-500/40 p-5 sm:p-6 flex flex-col justify-between transition-colors shadow-sm">
          <div className="flex items-start justify-between">
            <div className="w-11 h-11 bg-[#172554] text-blue-400 rounded-xs flex items-center justify-center">
              {icon}
            </div>
            <span className="text-[11px] font-semibold text-blue-400 bg-[#172554] border border-blue-900/30 px-2.5 py-1 rounded-full flex items-center gap-1">
              <span>Toucher</span> ↺
            </span>
          </div>

          <div>
            <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-1 leading-snug">
              {title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>

        {/* Back Face */}
        <div className="flip-card-back bg-[#162032] border border-blue-600 p-5 sm:p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Terminal size={16} className="text-blue-400 shrink-0" />
              <h4 className="text-sm sm:text-base font-bold text-slate-100">{backTitle}</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">{backDesc}</p>
          </div>

          <div className="bg-[#0b0f19] px-3 py-2 rounded-xs border border-[#1f293d] text-[11px] sm:text-xs font-mono text-blue-400 flex items-center gap-2 overflow-hidden truncate">
            <Terminal size={13} className="shrink-0" />
            <span className="truncate">{action}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
