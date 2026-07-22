'use client';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const projects = [
  {
    id: 1,
    name: 'TrackBot Gateway',
    type: 'INDUSTRIAL IOT',
    color: '#00f5ff',
    size: 0.45,
    orbitRadius: 2.2,
    orbitSpeed: 0.3,
    orbitTilt: 0.2,
    startAngle: 0,
    desc: 'ESP32-S3 industrial IoT gateway. Modbus RTU → MQTT → Google Cloud.',
    tags: ['ESP32-S3', 'FreeRTOS', 'RS485', 'MQTT'],
    badge: '🏭 COMMERCIAL',
  },
  {
    id: 2,
    name: 'Gesture Robotic Arm',
    type: 'COMPUTER VISION',
    color: '#a855f7',
    size: 0.38,
    orbitRadius: 3.4,
    orbitSpeed: 0.2,
    orbitTilt: 0.5,
    startAngle: 1.2,
    desc: 'Real-time hand gesture → servo motor control using MediaPipe.',
    tags: ['Python', 'MediaPipe', 'Arduino'],
    badge: '🥇 EXCEL 2024',
  },
  {
    id: 3,
    name: 'Maze Solving Robot',
    type: 'AUTONOMOUS',
    color: '#00b8d4',
    size: 0.32,
    orbitRadius: 4.5,
    orbitSpeed: 0.15,
    orbitTilt: -0.3,
    startAngle: 2.5,
    desc: 'Left-Hand Rule maze solver with IR sensors.',
    tags: ['Arduino', 'IR Sensors', 'Embedded C'],
    badge: '🥉 IEEE OMEGA',
  },
  {
    id: 4,
    name: 'Home Automation',
    type: 'IOT',
    color: '#0066ff',
    size: 0.28,
    orbitRadius: 5.5,
    orbitSpeed: 0.12,
    orbitTilt: 0.6,
    startAngle: 4.0,
    desc: 'Wireless ESP32 relay controller with MQTT and local fallback.',
    tags: ['ESP32', 'MQTT', 'Relays'],
    badge: '🏠 SOLO BUILD',
  },
  {
    id: 5,
    name: 'QRNG + AES',
    type: 'SECURITY',
    color: '#7c3aed',
    size: 0.3,
    orbitRadius: 6.5,
    orbitSpeed: 0.1,
    orbitTilt: -0.5,
    startAngle: 3.2,
    desc: 'Hardware quantum random number generator with AES-256 encryption.',
    tags: ['Arduino', 'Python', 'AES-256'],
    badge: '🔐 SECURITY',
  },
];

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.3;
  });
  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.8}
          roughness={0.1}
        />
      </mesh>
      {/* Sun glow rings */}
      {[1.0, 1.3, 1.6].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
          <torusGeometry args={[r, 0.01, 8, 64]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.5 - i * 0.1} transparent opacity={0.4 - i * 0.1} />
        </mesh>
      ))}
      <Text position={[0, -1.0, 0]} fontSize={0.18} color="#00f5ff" anchorX="center">
        ARYA VP
      </Text>
      <Text position={[0, -1.25, 0]} fontSize={0.1} color="#94a3b8" anchorX="center">
        ECE · MEC KOCHI
      </Text>
      <pointLight color="#00f5ff" intensity={3} distance={10} />
    </group>
  );
}

function OrbitRing({ radius, tilt }: { radius: number; tilt: number }) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshStandardMaterial color="#00f5ff" transparent opacity={0.08} />
    </mesh>
  );
}

function Planet({ project, onSelect, selected }: {
  project: typeof projects[0];
  onSelect: (p: typeof projects[0] | null) => void;
  selected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(project.startAngle);

  useFrame((_, delta) => {
    angleRef.current += delta * project.orbitSpeed;
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angleRef.current) * project.orbitRadius;
      groupRef.current.position.z = Math.sin(angleRef.current) * project.orbitRadius;
      groupRef.current.position.y = Math.sin(angleRef.current * 0.5) * project.orbitTilt * 1.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      const scale = selected ? 1.5 : hovered ? 1.25 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={(e) => { e.stopPropagation(); onSelect(selected ? null : project); }}>
        <sphereGeometry args={[project.size, 24, 24]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={selected ? 1.2 : hovered ? 0.8 : 0.4}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Glow ring around selected */}
      {(selected || hovered) && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[project.size * 1.6, 0.02, 8, 32]} />
          <meshStandardMaterial color={project.color} emissive={project.color} emissiveIntensity={1} transparent opacity={0.7} />
        </mesh>
      )}

      {/* Planet label */}
      <Text
        position={[0, project.size + 0.2, 0]}
        fontSize={0.13}
        color={project.color}
        anchorX="center"
        anchorY="bottom">
        {project.name}
      </Text>

      {/* Type badge */}
      <Text
        position={[0, project.size + 0.05, 0]}
        fontSize={0.08}
        color="#94a3b8"
        anchorX="center"
        anchorY="top">
        {project.type}
      </Text>

      <pointLight color={project.color} intensity={selected ? 1.5 : 0.3} distance={2} />
    </group>
  );
}

function GalaxyScene({ onSelect, selected }: {
  onSelect: (p: typeof projects[0] | null) => void;
  selected: typeof projects[0] | null;
}) {
  return (
    <>
      <ambientLight intensity={0.1} />
      <Stars radius={80} depth={50} count={3000} factor={3} fade speed={0.5} />
      <Sun />
      {projects.map(p => (
        <OrbitRing key={p.id} radius={p.orbitRadius} tilt={p.orbitTilt} />
      ))}
      {projects.map(p => (
        <Planet key={p.id} project={p} onSelect={onSelect} selected={selected?.id === p.id} />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.4}
      />
    </>
  );
}

export default function ProjectGalaxy() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed', bottom: '90px', left: '20px', zIndex: 48,
    }}>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'rgba(6,18,40,0.95)',
          border: '1px solid rgba(0,245,255,0.3)',
          borderRadius: open ? '12px 12px 0 0' : '12px',
          padding: '8px 14px', cursor: 'pointer',
          boxShadow: '0 0 20px rgba(0,245,255,0.2)',
        }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00f5ff', animation: 'pulse-cyan 2s infinite' }} />
        <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em' }}>
          🌌 PROJECT GALAXY
        </span>
        <span style={{ color: '#94a3b8', fontSize: '10px', fontFamily: 'monospace' }}>{open ? '▼' : '▲'}</span>
      </button>

      {/* Galaxy canvas */}
      {open && (
        <div style={{
          width: '380px', height: '300px',
          background: 'rgba(2,4,16,0.98)',
          border: '1px solid rgba(0,245,255,0.2)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <Canvas camera={{ position: [0, 4, 10], fov: 60 }}>
            <Suspense fallback={null}>
              <GalaxyScene onSelect={setSelected} selected={selected} />
            </Suspense>
          </Canvas>

          {/* Hint */}
          {!selected && (
            <div style={{
              position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
              color: '#475569', fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}>
              🖱 drag to explore · click a planet
            </div>
          )}
        </div>
      )}

      {/* Project detail card */}
      {selected && open && (
        <div style={{
          position: 'absolute', left: '390px', bottom: 0,
          width: '260px',
          background: 'rgba(6,12,26,0.98)',
          border: `1px solid ${selected.color}40`,
          borderRadius: '12px', padding: '16px',
          boxShadow: `0 0 30px ${selected.color}20`,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
            <div>
              <p style={{ color: selected.color, fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', marginBottom: '4px' }}>{selected.badge}</p>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>{selected.name}</h3>
            </div>
            <button onClick={() => setSelected(null)}
              style={{ color: '#475569', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>×</button>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: 1.6, marginBottom: '12px' }}>{selected.desc}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {selected.tags.map(t => (
              <span key={t} style={{
                padding: '3px 8px', borderRadius: '999px', fontSize: '10px',
                color: selected.color, border: `1px solid ${selected.color}40`,
                background: `${selected.color}10`, fontFamily: 'monospace',
              }}>{t}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
