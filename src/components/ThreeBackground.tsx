"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSpheres() {
  const sphereRef1 = useRef<THREE.Mesh>(null);
  const sphereRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef1.current) {
      sphereRef1.current.rotation.x = time * 0.2;
      sphereRef1.current.rotation.y = time * 0.3;
    }
    if (sphereRef2.current) {
      sphereRef2.current.rotation.x = -time * 0.1;
      sphereRef2.current.rotation.y = -time * 0.2;
    }
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere ref={sphereRef1} args={[1.5, 64, 64]} position={[-3, 1, -5]}>
          <MeshDistortMaterial
            color="#171717"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere ref={sphereRef2} args={[2.5, 64, 64]} position={[4, -1, -8]}>
          <MeshDistortMaterial
            color="#a07d50"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.3}
            metalness={0.7}
            wireframe={true}
          />
        </Sphere>
      </Float>
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.6, background: "radial-gradient(circle at center, #2a2a2a 0%, #111827 100%)" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a07d50" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        <AnimatedSpheres />
      </Canvas>
    </div>
  );
}
