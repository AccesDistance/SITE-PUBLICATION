import { motion, useReducedMotion } from 'framer-motion'

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[560px] h-[100svh] max-h-[1000px] w-full items-center justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pt-36 lg:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-20 overflow-hidden"
        initial={shouldReduceMotion ? false : { scale: 1.04 }}
        animate={shouldReduceMotion ? { scale: 1.04 } : { scale: [1.04, 1.1, 1.04] }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 32, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <img
          src="/accesdistance-logo (3).png"
          alt=""
          className="h-full w-full object-cover object-center saturate-[0.82]"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,12,24,0.58)_0%,rgba(7,12,24,0.18)_42%,rgba(7,12,24,0.35)_68%,#0b0f19_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(7,13,29,0.48)_0%,transparent_52%,rgba(9,19,39,0.55)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-24 bottom-7 -z-10 border-x border-white/[0.07] sm:inset-x-8"
      />
    </section>
  )
}
