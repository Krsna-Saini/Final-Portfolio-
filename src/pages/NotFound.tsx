import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-glow/10 blur-[130px]" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="gradient-text font-display text-8xl font-bold sm:text-9xl">404</h1>
        <p className="mt-4 font-display text-2xl font-bold text-white">Lost in space</p>
        <p className="mt-3 text-slate-400">This page drifted off into the void.</p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow px-6 py-3 font-semibold text-white shadow-glow transition-shadow hover:shadow-glow-cyan"
        >
          <Home size={18} /> Back home
        </Link>
      </motion.div>
    </div>
  )
}
