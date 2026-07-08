import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  intensity?: number
  glare?: boolean
}

export default function TiltCard({ children, className = '', intensity = 12, glare = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  })
  const glareX = useTransform(mx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(my, [-0.5, 0.5], ['0%', '100%'])
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16), transparent 45%)`,
  )

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={`perspective relative ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
