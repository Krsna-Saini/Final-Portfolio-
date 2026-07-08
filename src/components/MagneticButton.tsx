import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  className?: string
  strength?: number
  external?: boolean
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  strength = 0.4,
  external,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={className}
      data-cursor="hover"
    >
      {children}
    </motion.div>
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className="inline-block"
      >
        {inner}
      </a>
    )
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel} className="inline-block">
      {inner}
    </button>
  )
}
