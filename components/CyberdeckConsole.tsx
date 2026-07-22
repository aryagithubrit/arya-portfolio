'use client';
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';

// Global xray state
let xrayListeners: ((v: boolean) => void)[] = [];
let globalXray = false;

function notifyXray(val: boolean) {
  globalXray = val;
  xrayListeners.forEach(fn => fn(val));
}

// PCB Board
function PCBBoard({ xray }: { xray: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group>
      {/* Main board */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.12, 2]} />
        <meshStandardMaterial 
          color={xray ? '#001100' : '#0a2010'} 
          roughness={0.3} 
          metalness={0.6}
          wireframe={xray}
          emissive={xray ? '#00ff00' : '#001a00'}
          emissiveIntensity={xray ? 0.3 : 0.1}
        />
      </mesh>

      {/* PCB traces */}
      {[
        [-0.8, 0.07, 0.3], [0.2, 0.07, -0.5], [0.8, 0.07, 0.6],
        [-0.3, 0.07, -0.7], [1.0, 0.07, -0.2],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number,number,number]}>
          <boxGeometry args={[0.6 + i * 0.1, 0.005, 0.02]} />
          <meshStandardMaterial 
            color={xray ? '#00ff00' : '#d4a000'} 
            roughness={0.1} metalness={0.9}
            emissive={xray ? '#00ff00' : '#aa8800'}
            emissiveIntensity={xray ? 0.8 : 0.3}
          />
        </mesh>
      ))}

      {/* Main chip / ESP32 */}
      <mesh position={[-0.5, 0.13, 0.1]}>
        <boxGeometry args={[0.7, 0.12, 0.5]} />
        <meshStandardMaterial 
          color={xray ? '#003300' : '#1a1a1a'} 
          roughness={0.2} metalness={0.8}
          wireframe={xray}
          emissive={xray ? '#00ff00' : '#000000'}
          emissiveIntensity={xray ? 0.4 : 0}
        />
      </mesh>

      {/* Chip label */}
      <Text
        position={[-0.5, 0.22, 0.1]}
        fontSize={0.08}
        color={xray ? '#00ff00' : '#00f5ff'}
        anchorX="center"
        anchorY="middle">
        ESP32-S3
      </Text>

      {/* Capacitors */}
      {[
        [0.6, 0.14, 0.5], [0.8, 0.14, 0.5], [0.6, 0.14, -0.5], [0.8, 0.14, -0.5]
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number,number,number]}>
          <cylinderGeometry args={[0.04, 0.04, 0.15, 8]} />
          <meshStandardMaterial 
            color={xray ? '#004400' : '#1a3a6e'} 
            roughness={0.3} metalness={0.7}
            emissive={xray ? '#00ff00' : '#000066'}
            emissiveIntensity={xray ? 0.5 : 0.2}
          />
        </mesh>
      ))}

      {/* RS485 chip */}
      <mesh position={[0.8, 0.13, -0.2]}>
        <boxGeometry args={[0.4, 0.1, 0.3]} />
        <meshStandardMaterial 
          color={xray ? '#002200' : '#111111'} 
          roughness={0.2} metalness={0.8}
          wireframe={xray}
        />
      </mesh>
      <Text position={[0.8, 0.22, -0.2]} fontSize={0.06} color={xray ? '#00ff00' : '#a855f7'} anchorX="center">
        MAX485
      </Text>

      {/* Connector pins */}
      {[-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.1, 0.95]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 6]} />
          <meshStandardMaterial 
            color={xray ? '#00aa00' : '#d4a000'} 
            metalness={0.95} roughness={0.05}
            emissive={xray ? '#00ff00' : '#000000'}
            emissiveIntensity={xray ? 0.6 : 0}
          />
        </mesh>
      ))}

      {/* LED indicators */}
      {[
        { pos: [1.3, 0.13, 0.7] as [number,number,number], color: '#00ff00', label: 'PWR' },
        { pos: [1.3, 0.13, 0.4] as [number,number,number], color: '#00f5ff', label: 'NET' },
        { pos: [1.3, 0.13, 0.1] as [number,number,number], color: '#ff6600', label: 'TX' },
      ].map((led, i) => (
        <group key={i}>
          <mesh position={led.pos}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial 
              color={xray ? '#003300' : led.color}
              emissive={xray ? '#00ff00' : led.color}
              emissiveIntensity={xray ? 0.3 : 1.5}
              roughness={0.1}
            />
          </mesh>
          <Text position={[led.pos[0] + 0.15, led.pos[1] + 0.08, led.pos[2]]} fontSize={0.06} color={xray ? '#00ff00' : '#ffffff'} anchorX="left">
            {led.label}
          </Text>
        </group>
      ))}

      {/* Toggle switch */}
      <ToggleSwitch xray={xray} />

      {/* USB port */}
      <mesh position={[-1.45, 0.1, 0]}>
        <boxGeometry args={[0.1, 0.12, 0.4]} />
        <meshStandardMaterial color={xray ? '#002200' : '#333333'} metalness={0.9} roughness={0.1} wireframe={xray} />
      </mesh>
      <Text position={[-1.35, 0.22, 0]} fontSize={0.07} color={xray ? '#00ff00' : '#94a3b8'} anchorX="left">USB-C</Text>

      {/* Antenna */}
      <mesh position={[1.45, 0.3, -0.6]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 6]} />
        <meshStandardMaterial color={xray ? '#00aa00' : '#888888'} metalness={0.9}
          emissive={xray ? '#00ff00' : '#000000'} emissiveIntensity={xray ? 0.5 : 0} />
      </mesh>
      <Text position={[1.35, 0.22, -0.6]} fontSize={0.07} color={xray ? '#00ff00' : '#00f5ff'} anchorX="right">ANT</Text>
    </group>
  );
}

function ToggleSwitch({ xray }: { xray: boolean }) {
  const [on, setOn] = useState(false);
  const switchRef = useRef<THREE.Mesh>(null);

  function handleClick(e: any) {
    e.stopPropagation();
    const newVal = !on;
    setOn(newVal);
    notifyXray(newVal);
  }

  useFrame(() => {
    if (switchRef.current) {
      const target = on ? 0.12 : -0.12;
      switchRef.current.position.z += (target - switchRef.current.position.z) * 0.15;
    }
  });

  return (
    <group position={[0.3, 0.13, 0.7]} onClick={handleClick}>
      {/* Switch housing */}
      <mesh>
        <boxGeometry args={[0.2, 0.1, 0.35]} />
        <meshStandardMaterial color={xray ? '#001100' : '#222222'} roughness={0.3} wireframe={xray} />
      </mesh>
      {/* Switch lever */}
      <mesh ref={switchRef} position={[0, 0.07, 0]}>
        <boxGeometry args={[0.12, 0.08, 0.15]} />
        <meshStandardMaterial 
          color={on ? (xray ? '#00ff00' : '#00f5ff') : (xray ? '#004400' : '#444444')}
          emissive={on ? (xray ? '#00ff00' : '#00f5ff') : '#000000'}
          emissiveIntensity={on ? 0.8 : 0}
          roughness={0.2} metalness={0.6}
        />
      </mesh>
      <Text position={[0, 0.22, 0]} fontSize={0.07} color={xray ? '#00ff00' : (on ? '#00f5ff' : '#94a3b8')} anchorX="center">
        {on ? 'X-RAY' : 'SCHEMATIC'}
      </Text>
    </group>
  );
}

function Scene({ xray }: { xray: boolean }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 2.5, 4);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={xray ? 0.2 : 0.4} color={xray ? '#003300' : '#ffffff'} />
      <pointLight position={[3, 3, 3]} intensity={xray ? 0.5 : 1} color={xray ? '#00ff00' : '#00f5ff'} />
      <pointLight position={[-3, 2, -2]} intensity={xray ? 0.3 : 0.6} color={xray ? '#003300' : '#7c3aed'} />
      <spotLight position={[0, 5, 0]} intensity={xray ? 0.8 : 0.4} color={xray ? '#00ff00' : '#ffffff'} angle={0.5} />
      
      <PCBBoard xray={xray} />
      
      <OrbitControls 
        enableZoom={true} 
        enablePan={false}
        minDistance={2}
        maxDistance={8}
        autoRotate={!xray}
        autoRotateSpeed={0.8}
      />
    </>
  );
}

export default function CyberdeckConsole() {
  const [xray, setXray] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fn = (val: boolean) => setXray(val);
    xrayListeners.push(fn);
    return () => { xrayListeners = xrayListeners.filter(f => f !== fn); };
  }, []);

  return (
    <>
      {/* X-Ray overlay on entire page */}
      {xray && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none',
          background: 'rgba(0, 20, 0, 0.85)',
          mixBlendMode: 'multiply',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(0,255,0,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,0,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            color: '#00ff00', fontFamily: 'monospace', fontSize: '11px',
            opacity: 0.15, letterSpacing: '0.3em', textAlign: 'center', pointerEvents: 'none',
          }}>
            X-RAY MODE ACTIVE — SCHEMATIC VIEW
          </div>
        </div>
      )}

      {/* The console widget */}
      <div style={{
        position: 'fixed', bottom: '90px', left: '20px', zIndex: 48,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Header bar */}
        <div
          onClick={() => setExpanded(e => !e)}
          style={{
            background: xray ? 'rgba(0,20,0,0.95)' : 'rgba(6,18,40,0.95)',
            border: `1px solid ${xray ? 'rgba(0,255,0,0.4)' : 'rgba(0,245,255,0.3)'}`,
            borderRadius: expanded ? '12px 12px 0 0' : '12px',
            padding: '8px 14px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: xray ? '0 0 20px rgba(0,255,0,0.3)' : '0 0 20px rgba(0,245,255,0.2)',
          }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: xray ? '#00ff00' : '#00f5ff', boxShadow: `0 0 6px ${xray ? '#00ff00' : '#00f5ff'}`, animation: 'pulse-cyan 2s infinite' }} />
          <span style={{ color: xray ? '#00ff00' : '#00f5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em' }}>
            {xray ? 'X-RAY.PCB' : 'CYBERDECK.3D'}
          </span>
          <span style={{ color: xray ? '#00ff00' : '#94a3b8', fontFamily: 'monospace', fontSize: '10px', marginLeft: 'auto' }}>
            {expanded ? '▼' : '▲'}
          </span>
        </div>

        {/* 3D Canvas */}
        {expanded && (
          <div style={{
            width: '320px', height: '240px',
            background: xray ? 'rgba(0,10,0,0.98)' : 'rgba(4,12,28,0.98)',
            border: `1px solid ${xray ? 'rgba(0,255,0,0.3)' : 'rgba(0,245,255,0.2)'}`,
            borderTop: 'none',
            borderRadius: '0 0 12px 12px',
            overflow: 'hidden',
          }}>
            <Canvas>
              <Suspense fallback={null}>
                <Scene xray={xray} />
              </Suspense>
            </Canvas>
          </div>
        )}

        {/* Instructions */}
        {expanded && (
          <div style={{
            marginTop: '4px', padding: '6px 10px',
            background: xray ? 'rgba(0,10,0,0.8)' : 'rgba(6,18,40,0.8)',
            border: `1px solid ${xray ? 'rgba(0,255,0,0.15)' : 'rgba(0,245,255,0.1)'}`,
            borderRadius: '8px',
          }}>
            <p style={{ color: xray ? '#00cc00' : '#475569', fontFamily: 'monospace', fontSize: '10px', margin: 0, lineHeight: 1.6 }}>
              🖱 drag to rotate · scroll to zoom<br />
              ⚡ flip switch for X-RAY mode
            </p>
          </div>
        )}
      </div>
    </>
  );
}
