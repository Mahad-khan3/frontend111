"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Float } from "@react-three/drei";
import * as THREE from "three";

function CableDrive({ isTypeC = false }: { isTypeC?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} scale={0.8}>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.4, 0.3]} />
          <meshStandardMaterial color="#17181C" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.9, 0, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.15]} />
          <meshStandardMaterial color="#B9BCC4" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[-0.2, -0.3, 0]} rotation={[0, 0, Math.PI / 6]}>
          <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
          <meshStandardMaterial color="#2A2A2E" />
        </mesh>
        <mesh position={[-0.9, -0.6, 0]}>
          <boxGeometry args={[0.5, 0.18, 0.15]} />
          <meshStandardMaterial color="#B9BCC4" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[0.6, 0.15]} />
          <meshStandardMaterial color="#C6FF3A" metalness={0.3} roughness={0.4} />
        </mesh>
        <mesh position={[0.5, 0.1, 0.16]}>
          <planeGeometry args={[0.3, 0.08]} />
          <meshStandardMaterial color="#6E6BFF" metalness={0.2} roughness={0.5} />
        </mesh>
        <mesh position={[0.95, 0.1, 0.12]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#C6FF3A" emissive="#C6FF3A" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

export function ProductViewer({ isTypeC = false, className = "" }: { isTypeC?: boolean; className?: string }) {
  return (
    <div className={`w-full h-[500px] ${className}`}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <spotLight position={[0, 5, 0]} intensity={0.5} />
        <CableDrive isTypeC={isTypeC} />
        <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
