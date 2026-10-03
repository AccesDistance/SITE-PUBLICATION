import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionItemProps {
  id: string
  step: string
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  step,
  title,
  isOpen,
  onToggle,
  children,
}) => {
  return (
    <div
      className={`bg-[#111827] border rounded-2xl overflow-hidden transition-colors ${
        isOpen ? 'border-blue-600 shadow-md shadow-blue-600/10' : 'border-[#1f293d]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left cursor-pointer focus:outline-none transition-colors hover:bg-[#162032]/60"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0 pr-2">
          <span
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm font-bold font-mono shrink-0 transition-colors ${
              isOpen ? 'bg-blue-600 text-white' : 'bg-[#1e293b] text-slate-300'
            }`}
          >
            {step}
          </span>
          <span className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-4 pb-4 sm:px-6 sm:pb-6 pt-2 border-t border-[#1f293d] text-xs sm:text-sm text-slate-300 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
