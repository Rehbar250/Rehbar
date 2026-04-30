import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/**
 * Animated 3D particle field with mouse interaction,
 * bloom post-processing, and connection lines.
 * Renders behind the hero section for a cinematic background.
 */

// ── Animated Particles with mouse interaction ──
function Particles({ count }: { count: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Track mouse position for interaction
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  // Generate initial particle positions and velocities
  const [positions, velocities, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread across a wide volume
      pos[i3] = (Math.random() - 0.5) * 30;
      pos[i3 + 1] = (Math.random() - 0.5) * 30;
      pos[i3 + 2] = (Math.random() - 0.5) * 15;

      vel[i3] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.004;

      // Color palette: cyan -> blue -> purple gradient
      const t = Math.random();
      if (t < 0.33) {
        color.setHSL(0.55, 0.9, 0.5 + Math.random() * 0.3); // Cyan
      } else if (t < 0.66) {
        color.setHSL(0.62, 0.85, 0.4 + Math.random() * 0.3); // Blue
      } else {
        color.setHSL(0.75, 0.7, 0.4 + Math.random() * 0.35); // Purple
      }
      col[i3] = color.r;
      col[i3 + 1] = color.g;
      col[i3 + 2] = color.b;
    }
    return [pos, vel, col];
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = mesh.current.geometry.attributes.position as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;

    // Mouse influence with smooth interpolation
    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Base organic floating motion
      posArr[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.002;
      posArr[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.015) * 0.002;
      posArr[i3 + 2] += velocities[i3 + 2] + Math.sin(time * 0.15 + i * 0.02) * 0.001;

      // Mouse repulsion effect for interactivity
      const dx = posArr[i3] - mx;
      const dy = posArr[i3 + 1] - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4) {
        const force = (4 - dist) * 0.006;
        posArr[i3] += dx * force;
        posArr[i3 + 1] += dy * force;
      }

      // Wrap boundaries seamlessly
      if (posArr[i3] > 16) posArr[i3] = -16;
      if (posArr[i3] < -16) posArr[i3] = 16;
      if (posArr[i3 + 1] > 16) posArr[i3 + 1] = -16;
      if (posArr[i3 + 1] < -16) posArr[i3 + 1] = 16;
      if (posArr[i3 + 2] > 8) posArr[i3 + 2] = -8;
      if (posArr[i3 + 2] < -8) posArr[i3 + 2] = 8;
    }
    posAttr.needsUpdate = true;

    // Subtle ambient rotation
    mesh.current.rotation.y = time * 0.015;
    mesh.current.rotation.x = Math.sin(time * 0.08) * 0.04;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ── Floating connection lines between nearby particles ──
function ConnectionLines({ count }: { count: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  const maxConnections = 150;

  const positions = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);
  const colors = useMemo(() => new Float32Array(maxConnections * 6), [maxConnections]);

  useFrame(({ scene }) => {
    if (!lineRef.current) return;
    const points = scene.children.find(
      (c) => c instanceof THREE.Points
    ) as THREE.Points | undefined;
    if (!points) return;

    const posArr = (points.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    let lineIdx = 0;
    const threshold = 2.8;
    const sampleStep = Math.max(1, Math.floor(count / 250));

    for (let i = 0; i < count && lineIdx < maxConnections; i += sampleStep) {
      for (let j = i + sampleStep; j < count && lineIdx < maxConnections; j += sampleStep) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = posArr[i3] - posArr[j3];
        const dy = posArr[i3 + 1] - posArr[j3 + 1];
        const dz = posArr[i3 + 2] - posArr[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < threshold) {
          const alpha = 1 - dist / threshold;
          const l6 = lineIdx * 6;
          positions[l6] = posArr[i3];
          positions[l6 + 1] = posArr[i3 + 1];
          positions[l6 + 2] = posArr[i3 + 2];
          positions[l6 + 3] = posArr[j3];
          positions[l6 + 4] = posArr[j3 + 1];
          positions[l6 + 5] = posArr[j3 + 2];

          // Neon blue connection lines
          colors[l6] = 0.2 * alpha;
          colors[l6 + 1] = 0.5 * alpha;
          colors[l6 + 2] = 1.0 * alpha;
          colors[l6 + 3] = 0.2 * alpha;
          colors[l6 + 4] = 0.5 * alpha;
          colors[l6 + 5] = 1.0 * alpha;
          lineIdx++;
        }
      }
    }

    // Zero out remaining
    for (let i = lineIdx * 6; i < maxConnections * 6; i++) {
      positions[i] = 0;
      colors[i] = 0;
    }

    const geo = lineRef.current.geometry;
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    geo.setDrawRange(0, lineIdx * 2);
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={maxConnections * 2}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={maxConnections * 2}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.25}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ── Main exported component ──
export default function ParticleField() {
  // Responsive particle count — fewer on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 500 : 1500;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={count} />
        <ConnectionLines count={count} />
        {/* Bloom post-processing for neon glow */}
        <EffectComposer>
          <Bloom
            intensity={1.0}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
