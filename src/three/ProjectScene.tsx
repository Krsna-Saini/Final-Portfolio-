import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Icosahedron,
  Dodecahedron,
  Octahedron,
  TorusKnot,
  Torus,
  Sparkles,
  Environment,
  Lightformer,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

type Accent = 'violet' | 'cyan' | 'magenta'

const palettes: Record<Accent, { primary: string; secondary: string; tertiary: string; emissive: string }> = {
  violet: { primary: '#8b5cf6', secondary: '#22d3ee', tertiary: '#ec4899', emissive: '#4c1d95' },
  cyan: { primary: '#22d3ee', secondary: '#8b5cf6', tertiary: '#34d399', emissive: '#0e7490' },
  magenta: { primary: '#ec4899', secondary: '#8b5cf6', tertiary: '#22d3ee', emissive: '#831843' },
}

function CenterShape({ shape, color, emissive }: { shape: number; color: string; emissive: string }) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.25
    mesh.current.rotation.x += delta * 0.08
    const { x, y } = state.pointer
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, x * 0.5, 0.05)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, y * 0.4, 0.05)
  })

  const material = (
    <MeshDistortMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={0.55}
      roughness={0.15}
      metalness={0.65}
      distort={0.35}
      speed={1.6}
    />
  )

  return (
    <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1}>
      {shape === 0 ? (
        <TorusKnot ref={mesh} args={[0.95, 0.3, 180, 32]}>
          {material}
        </TorusKnot>
      ) : shape === 1 ? (
        <Icosahedron ref={mesh} args={[1.35, 12]}>
          {material}
        </Icosahedron>
      ) : shape === 2 ? (
        <Dodecahedron ref={mesh} args={[1.3, 0]}>
          {material}
        </Dodecahedron>
      ) : (
        <Octahedron ref={mesh} args={[1.4, 0]}>
          {material}
        </Octahedron>
      )}
    </Float>
  )
}

function Shell({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.1
  })
  return (
    <Icosahedron ref={ref} args={[1.95, 1]}>
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.16}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </Icosahedron>
  )
}

type OrbitProps = { position: [number, number, number]; color: string; scale: number; kind: 'torus' | 'octa' }
function Orbiter({ position, color, scale, kind }: OrbitProps) {
  return (
    <Float speed={2.2} rotationIntensity={2} floatIntensity={2.5} position={position}>
      {kind === 'torus' ? (
        <Torus args={[0.3, 0.12, 16, 40]} scale={scale}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.2} metalness={0.7} />
        </Torus>
      ) : (
        <Octahedron args={[0.35, 0]} scale={scale}>
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.6} flatShading />
        </Octahedron>
      )}
    </Float>
  )
}

function SceneContent({ accent, shape, lowPower }: { accent: Accent; shape: number; lowPower: boolean }) {
  const pal = palettes[accent]
  const orbiters = useMemo<OrbitProps[]>(
    () => [
      { position: [2.7, 1.1, -1], color: pal.secondary, kind: 'torus', scale: 1 },
      { position: [-2.9, -0.7, -0.5], color: pal.tertiary, kind: 'octa', scale: 1 },
      { position: [2.5, -1.5, 0.4], color: pal.primary, kind: 'octa', scale: 0.8 },
      { position: [-2.5, 1.5, -1.4], color: pal.secondary, kind: 'torus', scale: 0.7 },
    ],
    [pal],
  )

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color={pal.primary} />
      <pointLight position={[-5, -3, 2]} intensity={30} color={pal.secondary} />
      <pointLight position={[0, -5, -5]} intensity={20} color={pal.tertiary} />

      <CenterShape shape={shape} color={pal.primary} emissive={pal.emissive} />
      <Shell color={pal.secondary} />
      {orbiters.map((o, i) => (
        <Orbiter key={i} {...o} />
      ))}

      <Sparkles count={lowPower ? 30 : 70} scale={[9, 6, 6]} size={2.2} speed={0.3} color={pal.primary} opacity={0.7} />

      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#05050a']} />
        <Lightformer intensity={2.2} color={pal.primary} position={[-4, 3, -3]} scale={[6, 6, 1]} />
        <Lightformer intensity={2} color={pal.secondary} position={[4, -2, -2]} scale={[5, 5, 1]} />
        <Lightformer intensity={1.4} color={pal.tertiary} position={[0, -4, 2]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.6} color="#ffffff" position={[0, 4, 3]} scale={[10, 2, 1]} />
      </Environment>

      {!lowPower && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.85} luminanceThreshold={0.2} luminanceSmoothing={0.4} />
          <Vignette eskil={false} offset={0.15} darkness={0.85} />
        </EffectComposer>
      )}
    </>
  )
}

export default function ProjectScene({ accent, shape }: { accent: Accent; shape: number }) {
  const lowPower =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.01 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, lowPower ? 1.2 : 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        className="!absolute inset-0"
      >
        <Suspense fallback={null}>
          <SceneContent accent={accent} shape={shape} lowPower={lowPower} />
        </Suspense>
      </Canvas>
    </div>
  )
}
