import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Preloader() {
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let value = 0
    const tick = setInterval(() => {
      value += Math.random() * 18 + 6
      if (value >= 100) {
        value = 100
        clearInterval(tick)
        setTimeout(() => setDone(true), 450)
      }
      setProgress(Math.min(100, Math.round(value)))
    }, 130)
    return () => clearInterval(tick)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink-950"
          exit={{ opacity: 0, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8 flex h-24 w-24 items-center justify-center"
          >
            <span className="absolute inset-0 animate-spin-slow rounded-full border-2 border-transparent border-t-violet-glow border-r-cyan-glow" />
            <span
              className="absolute inset-2 animate-spin-slow rounded-full border-2 border-transparent border-b-magenta-glow"
              style={{ animationDirection: 'reverse' }}
            />
            <span className="gradient-text font-display text-2xl font-bold">KS</span>
          </motion.div>

          <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-glow via-magenta-glow to-cyan-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 font-mono text-xs tracking-[0.3em] text-slate-500">
            {progress}% · LOADING EXPERIENCE
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
