import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  label: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ label, title, description, align = 'center' }: Props) {
  return (
    <div className={`mb-14 ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-glow" />
        <span className="section-label">{label}</span>
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-violet-glow" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ delay: 0.08 }}
        className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.16 }}
          className="mt-4 text-balance text-base leading-relaxed text-slate-400"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
