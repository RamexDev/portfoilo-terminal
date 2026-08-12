import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line, Edges, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ============================================================
   3D Terminal Window — a floating rounded box that represents
   the portfolio's terminal aesthetic. Tilts toward the cursor
   via parallax. Pure decoration — pointer-events disabled.
   ============================================================ */

interface Terminal3DProps {
  className?: string;
}

/** Inner mesh that listens to pointer movement for parallax tilt. */
function TerminalMesh() {
  const group = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  const { viewport } = useThree();

  // Target & current rotation for smoothing
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!group.current) return;

    // Smoothly approach the target rotation
    const lerp = 1 - Math.exp(-delta * 6);
    current.current.x += (target.current.x - current.current.x) * lerp;
    current.current.y += (target.current.y - current.current.y) * lerp;

    group.current.rotation.x = current.current.x;
    group.current.rotation.y = current.current.y;

    // Subtle phosphor shimmer on the screen material
    if (screen.current) {
      const t = performance.now() * 0.0008;
      screen.current.emissiveIntensity = 0.6 + Math.sin(t) * 0.15;
    }
  });

  // Update target on pointer move (normalized -1..1)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      // Tilt up to ~18° on each axis
      target.current.x = -ny * 0.3;
      target.current.y = nx * 0.4;
    };
    window.addEventListener('pointermove', handlePointer, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointer);
  }, []);

  // Scale based on viewport so it stays reasonable on mobile
  const scale = Math.min(viewport.width, viewport.height) * 0.32;

  return (
    <group ref={group} scale={scale}>
      {/* Terminal body — dark rounded box */}
      <RoundedBox args={[3, 2, 0.18]} radius={0.06} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial
          color="#0a0f0d"
          metalness={0.5}
          roughness={0.35}
          emissive="#003820"
          emissiveIntensity={0.15}
        />
        <Edges threshold={15} color="#00ff88" />
      </RoundedBox>

      {/* Screen plane — slightly in front of the body */}
      <mesh position={[0, 0, 0.095]}>
        <planeGeometry args={[2.78, 1.78]} />
        <meshStandardMaterial
          ref={screen}
          color="#050807"
          emissive="#00ff88"
          emissiveIntensity={0.6}
          roughness={0.7}
          metalness={0}
        />
      </mesh>

      {/* Title bar divider line */}
      <Line
        points={[[-1.39, 0.72, 0.1], [1.39, 0.72, 0.1]]}
        color="#00b85f"
        lineWidth={1}
        transparent
        opacity={0.6}
      />

      {/* Three traffic-light dots */}
      {[-1.2, -1.05, -0.9].map((x, i) => (
        <mesh key={i} position={[x, 0.83, 0.1]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial
            color={i === 0 ? '#ff5c5c' : i === 1 ? '#ffb627' : '#00ff88'}
            emissive={i === 0 ? '#ff5c5c' : i === 1 ? '#ffb627' : '#00ff88'}
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* Faux text lines on the screen — six rows of small planes */}
      {[0.45, 0.25, 0.05, -0.15, -0.35, -0.55].map((y, row) => {
        const width = row % 2 === 0 ? 1.8 : 1.4;
        return (
          <mesh key={row} position={[-1.39 + width / 2, y, 0.1]}>
            <planeGeometry args={[width, 0.05]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.3 + (row % 3) * 0.15}
              transparent
              opacity={0.85 - row * 0.08}
            />
          </mesh>
        );
      })}

      {/* Blinking block cursor at the end of the last line */}
      <mesh position={[-1.39 + 1.4 + 0.05, -0.55, 0.1]}>
        <planeGeometry args={[0.06, 0.07]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={1.2}
        />
      </mesh>
    </group>
  );
}

/** Animated grid backdrop behind the terminal. */
function GridBackdrop() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.position.z = (ref.current.position.z + delta * 0.6) % 2;
    }
  });
  return (
    <gridHelper
      ref={ref}
      args={[40, 40, '#00ff88', '#0a3a26']}
      position={[0, -2, -4]}
    />
  );
}

/** Floating particle field — small dots drifting in 3D space. */
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ff88"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

export function Terminal3D({ className }: Terminal3DProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
        frameloop="always"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#00ff88" />
        <pointLight position={[-5, -3, 2]} intensity={0.6} color="#5dffae" />

        <Float speed={1.5} rotationIntensity={0.25} floatIntensity={0.6}>
          <TerminalMesh />
        </Float>

        <GridBackdrop />
        <ParticleField />
      </Canvas>
    </div>
  );
}
