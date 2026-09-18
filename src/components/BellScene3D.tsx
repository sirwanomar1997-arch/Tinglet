import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
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
  classic: [[0.08, 1.48], [0.34, 1.47], [0.58, 1.38], [0.7, 1.08], [0.76, 0.58], [0.89, 0.02], [1.12, -0.58], [1.43, -1.18], [1.61, -1.39], [1.64, -1.47]],
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

function OrnateBand({ color }: { color: string }) {
  return (
    <group>
      {Array.from({ length: 26 }, (_, index) => {
        const angle = (index / 26) * Math.PI * 2;
        const radius = 1.39;
        return (
          <group key={index} position={[Math.sin(angle) * radius, -1.13, Math.cos(angle) * radius]} rotation-y={angle}>
            <mesh rotation-z={Math.PI / 4} scale={[0.075, 0.18, 0.035]} castShadow>
              <sphereGeometry args={[1, 16, 12]} />
              <meshPhysicalMaterial color={color} metalness={0.92} roughness={0.16} clearcoat={1} />
            </mesh>
            <mesh position={[0.1, 0.07, 0]} rotation-z={-Math.PI / 4} scale={[0.055, 0.13, 0.03]} castShadow>
              <sphereGeometry args={[1, 16, 12]} />
              <meshPhysicalMaterial color={color} metalness={0.92} roughness={0.16} clearcoat={1} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

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
    roughness: bell.id === "ivoire" ? 0.13 : 0.12,
    clearcoat: 1,
    clearcoatRoughness: 0.07,
    envMapIntensity: 1.35,
  };

  const velvet = {
    color: "#a9071d",
    roughness: 0.2,
    metalness: 0.08,
    clearcoat: 0.72,
    clearcoatRoughness: 0.18,
  };

  const handle = bell.handle === "loop" && bell.id !== "aurum" ? (
    <mesh position={[0, 2.18, 0]} castShadow>
      <torusGeometry args={[0.5, 0.14, 24, 64]} />
      <meshPhysicalMaterial {...material} />
    </mesh>
  ) : (
    <group position={[0, 2.08, 0]}>
      <mesh position={[0, 0.23, 0]} castShadow>
        <sphereGeometry args={[bell.id === "aurum" ? 0.3 : bell.handle === "spire" ? 0.23 : 0.27, 48, 32]} />
        <meshPhysicalMaterial {...material} />
      </mesh>
      <mesh position={[0, -0.02, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.27, 0.3, 32]} />
        <meshPhysicalMaterial {...material} />
      </mesh>
    </group>
  );

  const showRibbon = bell.decoration === "ribbon" || bell.id === "aurum";
  const ribbon = showRibbon ? (
    <group position={[0, 1.72, 0.46]} scale={1.18}>
      <mesh position={[-0.48, 0.06, 0]} rotation-z={0.12} scale={[1.45, 0.72, 0.34]} castShadow>
        <torusGeometry args={[0.31, 0.14, 28, 72]} />
        <meshPhysicalMaterial {...velvet} />
      </mesh>
      <mesh position={[0.48, 0.06, 0]} rotation-z={-0.12} scale={[1.45, 0.72, 0.34]} castShadow>
        <torusGeometry args={[0.31, 0.14, 28, 72]} />
        <meshPhysicalMaterial {...velvet} />
      </mesh>
      <RoundedBox args={[0.27, 1.42, 0.1]} radius={0.07} smoothness={6} position={[-0.36, -0.63, -0.05]} rotation-z={-0.42} castShadow>
        <meshPhysicalMaterial {...velvet} />
      </RoundedBox>
      <RoundedBox args={[0.27, 1.42, 0.1]} radius={0.07} smoothness={6} position={[0.36, -0.63, -0.05]} rotation-z={0.42} castShadow>
        <meshPhysicalMaterial {...velvet} />
      </RoundedBox>
      <mesh position={[0, 0.02, 0.2]} castShadow>
        <sphereGeometry args={[0.22, 40, 28]} />
        <meshPhysicalMaterial {...velvet} roughness={0.2} />
      </mesh>
    </group>
  ) : null;

  return (
    <group ref={pivot} position={[0, 2.2, 0]}>
      <group position={[0, -1.05, 0]}>
        <mesh castShadow receiveShadow>
          <latheGeometry args={[profile, bell.shape === "faceted" ? 16 : 96]} />
          <meshPhysicalMaterial {...material} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -1.42, 0]} rotation-x={Math.PI / 2} castShadow>
          <torusGeometry args={[1.52, 0.105, 24, 96]} />
          <meshPhysicalMaterial {...material} roughness={0.11} />
        </mesh>
        <mesh position={[0, -1.43, 0]} rotation-x={Math.PI / 2}>
          <circleGeometry args={[1.48, 64]} />
          <meshStandardMaterial color={bell.finish.shadow} roughness={0.72} side={THREE.DoubleSide} />
        </mesh>
        {bell.band && (
          <group>
            <mesh position={[0, -1.02, 0]} rotation-x={Math.PI / 2} castShadow>
              <torusGeometry args={[1.35, 0.055, 20, 96]} />
              <meshPhysicalMaterial color={bell.finish.highlight} metalness={0.88} roughness={0.1} clearcoat={1} />
            </mesh>
            <mesh position={[0, -1.18, 0]} rotation-x={Math.PI / 2} castShadow>
              <torusGeometry args={[1.43, 0.045, 20, 96]} />
              <meshPhysicalMaterial color={bell.finish.stops[2]} metalness={0.9} roughness={0.1} clearcoat={1} />
            </mesh>
            <OrnateBand color={bell.finish.highlight} />
          </group>
        )}
        <mesh position={[0, 1.57, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.5, 0.32, 48]} />
          <meshPhysicalMaterial {...material} />
        </mesh>
        {handle}
        {ribbon}
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
        dpr={[1, 2]}
        camera={{ position: [0, 0.35, 9.7], fov: 39 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.42} />
        <directionalLight position={[-4, 7, 6]} intensity={2.8} color={bell.finish.highlight} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[3.8, 1.5, 5]} intensity={24} color={bell.finish.accent} distance={12} />
        <pointLight position={[-3.5, -1, 4]} intensity={10} color={bell.finish.stops[0]} distance={10} />
        <pointLight position={[0, 4, 1]} intensity={9} color={bell.finish.highlight} distance={8} />
        <Environment resolution={256}>
          <Lightformer intensity={5} color={bell.finish.highlight} position={[-4, 3, 4]} scale={[2, 8, 1]} />
          <Lightformer intensity={3} color={bell.finish.accent} position={[4, 1, 2]} rotation-y={-Math.PI / 2} scale={[6, 2, 1]} />
          <Lightformer intensity={1.6} color={bell.finish.stops[2]} position={[0, -4, 3]} scale={[8, 2, 1]} />
        </Environment>
        <BellModel bell={bell} impulse={impulse} />
        <ContactShadows position={[0, -2.72, 0]} opacity={0.32} scale={6} blur={3.2} far={7} />
      </Canvas>
    </div>
  );
}