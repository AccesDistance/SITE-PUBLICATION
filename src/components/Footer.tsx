import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1f293d] py-8 sm:py-10 px-4 sm:px-6 lg:px-8 text-center bg-[#0b0f19]">
      <div className="flex items-center justify-center gap-2.5 mb-2.5">
        <img
          src="/accesdistance-logo.png"
          alt="AccesDistance Logo"
          className="w-6 h-6 sm:w-7 sm:h-7 rounded-md"
        />
        <span className="text-sm sm:text-base font-bold text-white tracking-tight">
          <span className="text-blue-500">Acces</span>Distance
        </span>
      </div>
      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
        © {new Date().getFullYear()} Fabrice Faniry RANDT · Master professionnel · Open Source
        <br />
        Développé à Madagascar
      </p>
    </footer>
  )
}
