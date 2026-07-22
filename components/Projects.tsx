'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { X, ExternalLink, GitBranch } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'TrackBot Gateway',
    category: 'INDUSTRIAL IOT GATEWAY',
    tags: ['ESP32-S3', 'FREERTOS', 'RS485', 'MODBUS RTU', 'MQTT/TLS', 'GOOGLE CLOUD'],
    badge: '🏭 COMMERCIAL PRODUCT',
    problem: 'Factory-floor Modbus devices needed to stream live telemetry to a cloud dashboard with sub-second latency and zero data loss across flaky 4G links.',
    solution: 'Dual-core ESP32-S3 gateway with FreeRTOS task segregation — Core 0 handles Modbus RTU polling over RS485, Core 1 manages Wi-Fi/MQTT northbound communication with QoS2 delivery guarantee. Queue-based thread-safe data handoff between cores.',
    tech: 'ESP32-S3-WROOM-1U-N16R8, MAX485, FreeRTOS, Modbus RTU, MQTT over TLS, REST API, Google Cloud Platform',
    status: 'IN DEVELOPMENT @ LETUSENSE',
    color: '#00f5ff',
    icon: '⚡',
  },
  {
    id: 2,
    title: 'Gesture-Controlled Robotic Arm',
    category: 'COMPUTER VISION · ROBOTICS',
    tags: ['PYTHON', 'MEDIAPIPE', 'ARDUINO', 'SERVO MOTORS', 'OPENCV'],
    badge: '🥇 1ST PLACE — EXCEL 2024',
    problem: 'Translate live hand gestures into precise multi-axis servo control without physical contact — enabling touch-free robotic manipulation.',
    solution: 'MediaPipe Hands landmark tracking pipeline feeds normalized joint angles to an Arduino servo controller via serial. Custom gesture-to-angle mapping handles wrist roll and individual finger articulation.',
    tech: 'Python, MediaPipe, OpenCV, Arduino Uno, 6× Servo Motors, PySerial, NumPy',
    status: 'COMPLETED',
    color: '#a855f7',
    icon: '🤖',
  },
  {
    id: 3,
    title: 'Maze Solving Robot',
    category: 'AUTONOMOUS ROBOTICS',
    tags: ['ARDUINO', 'IR SENSORS', 'EMBEDDED C', 'MOTOR DRIVERS'],
    badge: '🥉 3RD PLACE — IEEE MEC OMEGA',
    problem: 'Navigate an unknown maze autonomously, without mapping or prior knowledge, using minimal onboard sensors.',
    solution: 'Implemented Left-Hand Rule algorithm with 3 IR sensors and real-time decision logic in Embedded C. Sub-millisecond interrupt-driven sensor polling ensures reliable wall detection at speed.',
    tech: 'Arduino Uno, 3× IR Sensors, L298N Motor Driver, Embedded C, Custom PID steering',
    status: 'COMPLETED',
    color: '#00b8d4',
    icon: '🗺️',
  },
  {
    id: 4,
    title: 'ESP32 Home Automation',
    category: '8051 · AUTOMATION',
    tags: ['ESP32', 'EMBEDDED C', 'SENSORS', 'RELAYS', 'IOT PLATFORM'],
    badge: '🏠 SOLO BUILD',
    problem: 'Domestic appliance control through a reliable wireless system with local fallback.',
    solution: 'ESP32-based relay controller with MQTT integration and a local HTTP fallback API. OTA update support. Sensor nodes report temperature, motion, and power consumption.',
    tech: 'ESP32, Embedded C, MQTT, Relay modules, DHT22, PIR sensors, PlatformIO',
    status: 'COMPLETED',
    color: '#0066ff',
    icon: '🏠',
  },
  {
    id: 5,
    title: 'QRNG with AES Encryption',
    category: 'SECURITY · HARDWARE',
    tags: ['ARDUINO', 'ESP32', 'AES ENCRYPTION', 'PYTHON', 'ANALOG NOISE'],
    badge: '🔐 TEAM PROJECT',
    problem: 'Pseudo-random number generators are predictable — hardware entropy from quantum noise produces truly random bits for cryptographic applications.',
    solution: 'Reverse-biased semiconductor junction generates shot noise; ADC samples amplified noise and applies Von Neumann de-biasing. Python layer handles AES-256 key derivation using the entropy stream.',
    tech: 'Arduino, ESP32, Analog noise circuit, AES-256, Python, PySerial, Cryptography library',
    status: 'COMPLETED',
    color: '#7c3aed',
    icon: '🔑',
  },
];

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(2,8,20,0.95)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        className="max-w-2xl w-full rounded-2xl p-8 relative"
        style={{ background: 'rgba(10,22,40,0.95)', border: `1px solid ${project.color}40` }}
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>

        <div className="mb-2">
          <span className="text-xs font-mono tracking-widest" style={{ color: project.color }}>{project.category}</span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">{project.icon}</span>
          <h3 className="text-2xl font-black text-white">{project.title}</h3>
        </div>
        <div className="mb-4">
          <span className="text-xs font-mono" style={{ color: project.color }}>{project.badge}</span>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-xs font-mono tracking-widest text-slate-500 mb-1">PROBLEM STATEMENT</p>
            <p className="text-slate-300 text-sm leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <p className="text-xs font-mono tracking-widest text-slate-500 mb-1">ENGINEERING APPROACH</p>
            <p className="text-slate-300 text-sm leading-relaxed">{project.solution}</p>
          </div>
          <div>
            <p className="text-xs font-mono tracking-widest text-slate-500 mb-1">STACK</p>
            <p className="text-slate-300 text-sm">{project.tech}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>

        <div className="flex gap-3">
          <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono tracking-wider"
            style={{ background: `${project.color}15`, border: `1px solid ${project.color}40`, color: project.color }}>
            STATUS: {project.status}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="relative py-24">
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 60px" }}>
        <motion.div ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}>
          <p className="section-label mb-4">// 03 ——— FEATURED BUILDS</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-2">
            Hardware that <span style={{ color: 'var(--cyan)' }}>ships.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-16">
            Every project here exists in the physical world. Soldered, debugged, demoed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const [cardRef, cardInView] = useInView({ triggerOnce: true, threshold: 0.1 });
            const isLarge = i === 0;
            return (
              <motion.div key={p.id} ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={cardInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`project-card glow-border rounded-2xl overflow-hidden cursor-pointer ${isLarge ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ background: 'rgba(10,22,40,0.7)' }}
                onClick={() => setSelected(p)}>
                {/* Image area */}
                <div className="relative h-52 overflow-hidden"
                  style={{ background: `linear-gradient(135deg, rgba(10,22,40,0.9), ${p.color}20)` }}>
                  <div className="absolute inset-0 circuit-bg opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl opacity-20">{p.icon}</span>
                  </div>
                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span className="font-mono text-xs tracking-widest px-2 py-1 rounded"
                      style={{ color: p.color, background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                      {p.category}
                    </span>
                  </div>
                  {/* Achievement badge */}
                  {p.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-xs px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                        {p.badge}
                      </span>
                    </div>
                  )}
                  {/* Gradient fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-16"
                    style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.95), transparent)' }} />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-black text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{p.problem}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.slice(0, 4).map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs tracking-wider text-black font-bold transition-all hover:scale-105"
                      style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)` }}
                      onClick={e => { e.stopPropagation(); setSelected(p); }}>
                      ARCHITECTURE ↗
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs text-slate-400 border border-slate-700 hover:border-slate-500 transition-colors">
                      <GitBranch size={12} /> GITHUB
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
