import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Float,
  MeshDistortMaterial,
  Icosahedron,
  Torus,
  Octahedron,
  Stars,
  Sparkles,
  Environment,
  Lightformer,
} from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

function DistortedCore() {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.15
    mesh.current.rotation.x += delta * 0.05
    // gentle mouse influence
    const { x, y } = state.pointer
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, x * 0.4, 0.05)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, y * 0.3, 0.05)
  })

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.9}>
      <Icosahedron ref={mesh} args={[1.35, 12]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.6}
          distort={0.42}
          speed={1.8}
        />
      </Icosahedron>
    </Float>
  )
}

function GlassShell() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.08
  })
  return (
    <Icosahedron ref={ref} args={[1.9, 1]}>
      <meshStandardMaterial
        color="#22d3ee"
        wireframe
        transparent
        opacity={0.18}
        emissive="#22d3ee"
        emissiveIntensity={0.4}
      />
    </Icosahedron>
  )
}

type ShapeProps = {
  position: [number, number, number]
  scale?: number
  color: string
  kind: 'torus' | 'octa'
}

function FloatingShape({ position, scale = 1, color, kind }: ShapeProps) {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2.5} position={position}>
      {kind === 'torus' ? (
        <Torus args={[0.35, 0.14, 16, 40]} scale={scale}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.7}
          />
        </Torus>
      ) : (
        <Octahedron args={[0.4, 0]} scale={scale}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.6}
            flatShading
          />
        </Octahedron>
      )}
    </Float>
  )
}

function SceneContent({ lowPower }: { lowPower: boolean }) {
  const shapes = useMemo<ShapeProps[]>(
    () => [
      { position: [2.6, 1.2, -1], color: '#22d3ee', kind: 'torus', scale: 1 },
      { position: [-2.8, -0.6, -0.5], color: '#ec4899', kind: 'octa', scale: 1 },
      { position: [2.4, -1.4, 0.5], color: '#8b5cf6', kind: 'octa', scale: 0.8 },
      { position: [-2.4, 1.6, -1.5], color: '#a78bfa', kind: 'torus', scale: 0.7 },
    ],
    [],
  )

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#8b5cf6" />
      <pointLight position={[-5, -3, 2]} intensity={30} color="#22d3ee" />
      <pointLight position={[0, -5, -5]} intensity={20} color="#ec4899" />

      <DistortedCore />
      <GlassShell />
      {shapes.map((s, i) => (
        <FloatingShape key={i} {...s} />
      ))}

      <Sparkles
        count={lowPower ? 40 : 90}
        scale={[10, 6, 6]}
        size={2.4}
        speed={0.35}
        color="#a78bfa"
        opacity={0.7}
      />
      <Stars radius={40} depth={40} count={lowPower ? 900 : 2200} factor={3} saturation={0} fade speed={0.6} />

      {/* Self-contained studio env (rendered locally from Lightformers — no network fetch) */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#05050a']} />
        <Lightformer intensity={2.2} color="#8b5cf6" position={[-4, 3, -3]} scale={[6, 6, 1]} />
        <Lightformer intensity={2} color="#22d3ee" position={[4, -2, -2]} scale={[5, 5, 1]} />
        <Lightformer intensity={1.4} color="#ec4899" position={[0, -4, 2]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.6} color="#ffffff" position={[0, 4, 3]} scale={[10, 2, 1]} />
      </Environment>

      {!lowPower && (
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.4} />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      )}
    </>
  )
}

export default function HeroScene() {
  const lowPower =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 768px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  // Pause rendering when the hero canvas is scrolled out of view (perf + battery).
  const wrapRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = wrapRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.01 },
    )
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
          <SceneContent lowPower={lowPower} />
        </Suspense>
      </Canvas>
    </div>
  )
}
