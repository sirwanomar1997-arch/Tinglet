import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { Bell, BellShape } from "@/lib/bells";

export type BellImpulse = {
  id: number;
  intensity: number;
  direction: number;
};

const PROFILES: Record<BellShape, Array<[number, number]>> = {
  classic: [[0.12, 1.45], [0.58, 1.42], [0.72, 1.08], [0.84, 0.45], [1.12, -0.55], [1.48, -1.25], [1.62, -1.45]],
  slim: [[0.1, 1.6], [0.46, 1.55], [0.58, 0.9], [0.7, 0.05], [1.02, -1.1], [1.3, -1.42]],
  dome: [[0.12, 1.25], [0.8, 1.22], [1.15, 0.82], [1.36, 0.1], [1.48, -0.85], [1.58, -1.35]],
  tulip: [[0.1, 1.48], [0.46, 1.44], [0.72, 0.88], [0.78, 0.12], [1.04, -0.72], [1.55, -1.42]],
  faceted: [[0.12, 1.42], [0.54, 1.38], [0.68, 0.75], [0.94, -0.2], [1.3, -1.05], [1.48, -1.42]],
  fluted: [[0.1, 1.5], [0.5, 1.46], [0.64, 0.82], [0.84, -0.05], [1.18, -0.92], [1.58, -1.42]],
  pagoda: [[0.12, 1.35], [0.68, 1.3], [0.78, 0.65], [1.02, -0.2], [1.2, -0.9], [1.62, -1.38]],
  teardrop: [[0.08, 1.68], [0.38, 1.48], [0.64, 0.9], [0.82, 0.15], [1.1, -0.72], [1.42, -1.42]],
  cathedral: [[0.14, 1.52], [0.62, 1.45], [0.76, 0.72], [0.96, -0.22], [1.34, -1.08], [1.5, -1.42]],
  lotus: [[0.12, 1.3], [0.66, 1.25], [0.9, 0.72], [0.98, 0], [1.24, -0.75], [1.62, -1.38]],
};

function BellModel({ bell, impulse }: { bell: Bell; impulse: BellImpulse }) {
  const pivot = useRef<THREE.Group>(null);
  const clapper = useRef<THREE.Group>(null);
  const velocity = useRef(0);
  const angle = useRef(0);
  const clapperVelocity = useRef(0);
  const clapperAngle = useRef(0);

  const profile = useMemo(
    () => PROFILES[bell.shape].map(([radius, y]) => new THREE.Vector2(radius, y)),
    [bell.shape],
  );

  useEffect(() => {
    velocity.current += impulse.direction * (1.4 + impulse.intensity * 2.8);
    clapperVelocity.current -= impulse.direction * (2.1 + impulse.intensity * 4.2);
  }, [impulse]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    velocity.current += -angle.current * 20 * dt;
    velocity.current *= Math.exp(-4.6 * dt);
    angle.current += velocity.current * dt;
    clapperVelocity.current += -clapperAngle.current * 34 * dt;
    clapperVelocity.current *= Math.exp(-5.2 * dt);
    clapperAngle.current += clapperVelocity.current * dt;
    if (pivot.current) {
      pivot.current.rotation.z = angle.current;
      pivot.current.rotation.x = angle.current * 0.1;
    }
    if (clapper.current) clapper.current.rotation.z = clapperAngle.current;
  });

  const material = {
    color: bell.finish.stops[1],
    metalness: bell.id === "ivoire" ? 0.08 : 0.92,
    roughness: bell.id === "ivoire" ? 0.16 : 0.17,
    clearcoat: 0.72,
    clearcoatRoughness: 0.12,
  };

  return (
    <group ref={pivot} position={[0, 2.2, 0]}>
      <group position={[0, -1.05, 0]}>
        <mesh castShadow receiveShadow>
          <latheGeometry args={[profile, bell.shape === "faceted" ? 12 : 64]} />
          <meshPhysicalMaterial {...material} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -1.42, 0]} rotation-x={Math.PI / 2} castShadow>
          <torusGeometry args={[1.52, 0.11, 20, 80]} />
          <meshPhysicalMaterial {...material} roughness={0.11} />
        </mesh>
        <mesh position={[0, -1.43, 0]} rotation-x={Math.PI / 2}>
          <circleGeometry args={[1.48, 64]} />
          <meshStandardMaterial color={bell.finish.shadow} roughness={0.72} side={THREE.DoubleSide} />
        </mesh>
        {bell.band && (
          <mesh position={[0, -1.02, 0]}>
            <torusGeometry args={[1.34, 0.025, 12, 64]} />
            <meshPhysicalMaterial color={bell.finish.highlight} metalness={0.88} roughness={0.12} />
          </mesh>
        )}
        <mesh position={[0, 1.57, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.5, 0.32, 48]} />
          <meshPhysicalMaterial {...material} />
        </mesh>
        <mesh position={[0, 2.23, 0]} rotation-x={Math.PI / 2} castShadow>
          <torusGeometry args={[0.52, 0.16, 24, 64]} />
          <meshPhysicalMaterial {...material} />
        </mesh>
        <group ref={clapper} position={[0, -0.45, 0]}>
          <mesh position={[0, -0.72, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 1.42, 16]} />
            <meshStandardMaterial color={bell.finish.accent} metalness={0.86} roughness={0.22} />
          </mesh>
          <mesh position={[0, -1.5, 0]} castShadow>
            <sphereGeometry args={[0.22, 32, 24]} />
            <meshPhysicalMaterial {...material} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

export function BellScene3D({ bell, impulse }: { bell: Bell; impulse: BellImpulse }) {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.6, 11.5], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[-4, 7, 6]} intensity={3.2} color={bell.finish.highlight} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[4, 1, 5]} intensity={30} color={bell.finish.accent} distance={11} />
        <pointLight position={[-4, -2, 3]} intensity={13} color={bell.finish.stops[0]} distance={9} />
        <Environment resolution={128}>
          <Lightformer intensity={4} color={bell.finish.highlight} position={[-4, 3, 4]} scale={[3, 7, 1]} />
          <Lightformer intensity={2.4} color={bell.finish.accent} position={[4, 1, 2]} rotation-y={-Math.PI / 2} scale={[5, 2, 1]} />
          <Lightformer intensity={1.2} color={bell.finish.stops[2]} position={[0, -4, 3]} scale={[8, 2, 1]} />
        </Environment>
        <BellModel bell={bell} impulse={impulse} />
        <ContactShadows position={[0, -2.72, 0]} opacity={0.42} scale={7} blur={2.8} far={7} />
      </Canvas>
    </div>
  );
}