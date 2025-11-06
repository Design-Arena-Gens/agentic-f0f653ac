"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useMemo } from "react";

type Props = {
  slug: string;
  height?: number;
  quality?: "low" | "high";
};

const NeonMaterial = ({ color = "#00e5ff" }) => (
  <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} metalness={0.2} roughness={0.3} />
);

function Ground() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100, 32, 32]} />
      <meshStandardMaterial color="#0c0614" metalness={0.6} roughness={0.8} />
    </mesh>
  );
}

function EiffelTower() {
  return (
    <group>
      {[...Array(4)].map((_, i) => (
        <mesh key={i} rotation-y={(i * Math.PI) / 2}>
          <cylinderGeometry args={[0.12, 1.2, 3, 3]} />
          <NeonMaterial color="#00e5ff" />
        </mesh>
      ))}
      {[...Array(5)].map((_, i) => (
        <mesh key={i} position={[0, -0.9 + i * 0.45, 0]}>
          <torusGeometry args={[0.8 - i * 0.12, 0.02, 8, 60]} />
          <NeonMaterial color="#ff2db1" />
        </mesh>
      ))}
    </group>
  );
}

function StatueOfLiberty() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 1.2, 24]} />
        <NeonMaterial color="#a855f7" />
      </mesh>
      <mesh position={[0.2, 0.6, 0]} rotation-z={-0.2}>
        <boxGeometry args={[0.5, 0.15, 0.15]} />
        <NeonMaterial color="#00e5ff" />
      </mesh>
      <mesh position={[0.45, 0.8, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <NeonMaterial color="#ff2db1" />
      </mesh>
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[0.9, 0.4, 0.9]} />
        <NeonMaterial color="#a855f7" />
      </mesh>
    </group>
  );
}

function TajMahal() {
  return (
    <group>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[2.2, 0.2, 2.2]} />
        <NeonMaterial color="#00e5ff" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <NeonMaterial color="#a855f7" />
      </mesh>
      {[
        [1, -0.2, 1],
        [-1, -0.2, 1],
        [1, -0.2, -1],
        [-1, -0.2, -1],
      ].map((p, i) => (
        <mesh key={i} position={[p[0], 0, p[2]]}>
          <cylinderGeometry args={[0.08, 0.08, 0.9, 16]} />
          <NeonMaterial color="#00e5ff" />
        </mesh>
      ))}
    </group>
  );
}

function GreatWall() {
  const points = useMemo(() => new Array(12).fill(0).map((_, i) => [i * 0.35 - 2, Math.sin(i * 0.4) * 0.15 - 0.4, 0] as [number, number, number]), []);
  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p as any}>
          <boxGeometry args={[0.35, 0.25, 0.8]} />
          <NeonMaterial color={i % 2 === 0 ? "#a855f7" : "#00e5ff"} />
        </mesh>
      ))}
    </group>
  );
}

function Pyramids() {
  return (
    <group>
      <mesh position={[-0.6, -0.2, 0]} rotation-y={Math.PI / 4}>
        <coneGeometry args={[0.8, 1.2, 4]} />
        <NeonMaterial color="#ff2db1" />
      </mesh>
      <mesh position={[0.9, -0.2, 0.2]} rotation-y={-Math.PI / 6}>
        <coneGeometry args={[0.9, 1.4, 4]} />
        <NeonMaterial color="#00e5ff" />
      </mesh>
    </group>
  );
}

function Colosseum() {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.9, 0.25, 16, 80]} />
        <NeonMaterial color="#a855f7" />
      </mesh>
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[Math.cos((i / 12) * Math.PI * 2) * 0.9, 0.3, Math.sin((i / 12) * Math.PI * 2) * 0.9]}>
          <boxGeometry args={[0.1, 0.6, 0.1]} />
          <NeonMaterial color="#00e5ff" />
        </mesh>
      ))}
    </group>
  );
}

function BigBen() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 1.8, 0.7]} />
        <NeonMaterial color="#a855f7" />
      </mesh>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <NeonMaterial color="#00e5ff" />
      </mesh>
    </group>
  );
}

function SydneyOpera() {
  return (
    <group>
      {[...Array(4)].map((_, i) => (
        <mesh key={i} position={[-0.9 + i * 0.6, -0.2 + i * 0.05, 0]} rotation-z={-0.3 + i * 0.1}>
          <sphereGeometry args={[0.5 - i * 0.08, 24, 24, 0, Math.PI]} />
          <NeonMaterial color={i % 2 ? "#ff2db1" : "#00e5ff"} />
        </mesh>
      ))}
    </group>
  );
}

function ChristRedeemer() {
  return (
    <group>
      <mesh>
        <cylinderGeometry args={[0.25, 0.35, 1.2, 24]} />
        <NeonMaterial color="#a855f7" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.2, 0.12, 0.2]} />
        <NeonMaterial color="#00e5ff" />
      </mesh>
    </group>
  );
}

function BurjKhalifa() {
  return (
    <group>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, -0.6 + i * 0.22, 0]}>
          <cylinderGeometry args={[0.6 - i * 0.06, 0.7 - i * 0.06, 0.22, 24]} />
          <NeonMaterial color={i % 2 ? "#ff2db1" : "#00e5ff"} />
        </mesh>
      ))}
    </group>
  );
}

function Monument({ slug }: { slug: string }) {
  switch (slug) {
    case "eiffel-tower": return <EiffelTower/>;
    case "statue-of-liberty": return <StatueOfLiberty/>;
    case "taj-mahal": return <TajMahal/>;
    case "great-wall": return <GreatWall/>;
    case "pyramids-of-giza": return <Pyramids/>;
    case "colosseum": return <Colosseum/>;
    case "big-ben": return <BigBen/>;
    case "sydney-opera-house": return <SydneyOpera/>;
    case "christ-the-redeemer": return <ChristRedeemer/>;
    case "burj-khalifa": return <BurjKhalifa/>;
    default: return <EiffelTower/>;
  }
}

export default function MonumentCanvas({ slug, height = 420, quality = "high" }: Props) {
  const dpr: [number, number] = quality === "low" ? [0.75, 1] : [1, 2];
  return (
    <div style={{ height, position: "relative" }} className="scanlines">
      <Canvas dpr={dpr} camera={{ position: [2.6, 1.8, 2.6], fov: 45 }}>
        <color attach="background" args={["#07020f"]} />
        <hemisphereLight intensity={0.4} color="#a855f7" groundColor="#0c0614" />
        <spotLight position={[3, 6, 3]} intensity={1.2} color="#ff2db1" angle={0.6} penumbra={1} castShadow />
        <ambientLight intensity={0.3} />
        <Suspense fallback={null}>
          <group position={[0, 0, 0]}>
            <Monument slug={slug} />
          </group>
          <Ground />
          <Stars radius={80} depth={40} count={1200} factor={2} fade speed={0.6} />
          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
          </EffectComposer>
        </Suspense>
        <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.1} />
      </Canvas>
    </div>
  );
}
