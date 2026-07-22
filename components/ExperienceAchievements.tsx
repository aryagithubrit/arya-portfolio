'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    company: 'LetUSense Pvt Ltd',
    role: 'Embedded Systems Intern',
    period: 'June 2026 – July 2026',
    type: 'INDUSTRIAL IOT',
    color: '#00f5ff',
    status: 'ACTIVE',
    responsibilities: [
      'Developing firmware for TrackBot Gateway — a commercial Industrial IoT product',
      'ESP32-S3 dual-core FreeRTOS architecture with Modbus RTU over RS485',
      'Northbound MQTT/TLS communication to Google Cloud Platform',
      'REST API design: /api/config, /api/status, /api/reset endpoints',
      'Hardware watchdog, live telemetry dashboard, thread-safe FreeRTOS queue design',
    ],
    tech: ['ESP32-S3', 'FreeRTOS', 'Modbus RTU', 'RS485', 'MQTT/TLS', 'C', 'PlatformIO'],
  },
  {
    company: 'iHUB Robotics',
    role: 'Intern',
    period: '2 Weeks, 2024',
    type: 'ROBOTICS & IOT',
    color: '#a855f7',
    status: 'COMPLETED',
    responsibilities: [
      'Hands-on robotics and IoT systems development',
      'Embedded hardware programming with Arduino and ESP32',
      'Sensor integration and actuator control',
      'Practical project-based automation implementations',
    ],
    tech: ['Arduino', 'ESP32', 'Embedded C', 'Sensors', 'Actuators'],
  },
];

const achievements = [
  { title: '1st Prize — MEC Labs', event: 'Excel 2024', org: 'Govt. Model Engineering College', type: 'COMPETITION', color: '#FFD700', icon: '🥇', desc: 'Won in hardware lab challenge at annual techno-managerial fest of MEC Kochi.' },
  { title: '1st Prize — Reverso', event: 'Excel 2025', org: 'Govt. Model Engineering College', type: 'COMPETITION', color: '#FFD700', icon: '🥇', desc: 'Back-to-back win at Excel 2025 annual techno-managerial fest.' },
  { title: '3rd Prize — Omega', event: 'IEEE MEC SB', org: 'IEEE MEC Student Branch', type: 'ROBOTICS', color: '#CD7F32', icon: '🥉', desc: 'Maze Solving Robot Competition organized by IEEE MEC SB.' },
  { title: 'Tharang 2025 Presenter', event: 'Tharang 2025', org: 'IHRD Kerala', type: 'EXHIBITION', color: '#00f5ff', icon: '🎤', desc: 'Presented project at technical exhibition conducted by IHRD.' },
  { title: 'Hackathon Mentor', event: 'REMAP 2024', org: 'Excel 2024, MEC', type: 'MENTORSHIP', color: '#7c3aed', icon: '🧑‍🏫', desc: 'Volunteered and mentored students at REMAP 2024 hardware hackathon.' },
  { title: 'IDEALAB Trainee 2025', event: '2025', org: 'IDEALAB, MEC', type: 'TRAINING', color: '#00b8d4', icon: '⚙️', desc: 'Hands-on hardware development and prototyping at IDEALAB.' },
  { title: 'VLSI Certification', event: 'Udemy 2024', org: 'Udemy', type: 'CERTIFICATION', color: '#a855f7', icon: '📜', desc: 'Introduction to the World of VLSI — semiconductor devices, chip design principles.' },
];

export function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section id="experience" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 60px' }}>
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#00f5ff', textTransform: 'uppercase', marginBottom: '16px' }}>// 04 ——— EXPERIENCE</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: '8px' }}>
            Where I've <span style={{ color: '#00f5ff' }}>shipped.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Real products. Real factories. Real deadlines.</p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {experiences.map((exp, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '20px', padding: '32px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                    <h3 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800 }}>{exp.company}</h3>
                    <span style={{ fontSize: '11px', fontFamily: 'monospace', padding: '3px 10px', borderRadius: '999px', color: exp.color, border: `1px solid ${exp.color}40`, background: `${exp.color}10` }}>{exp.status}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '14px' }}>{exp.role}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: exp.color, fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em', marginBottom: '4px' }}>{exp.type}</div>
                  <div style={{ color: '#475569', fontFamily: 'monospace', fontSize: '11px' }}>{exp.period}</div>
                </div>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                {exp.responsibilities.map((r, j) => (
                  <li key={j} style={{ display: 'flex', gap: '10px', color: '#cbd5e1', fontSize: '14px', lineHeight: 1.6 }}>
                    <span style={{ color: exp.color, flexShrink: 0, marginTop: '2px' }}>›</span>
                    {r}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {exp.tech.map(t => (
                  <span key={t} style={{ padding: '4px 12px', border: '1px solid rgba(0,245,255,0.25)', borderRadius: '999px', fontSize: '11px', color: '#00f5ff', background: 'rgba(0,245,255,0.05)', letterSpacing: '0.08em' }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Achievements() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section id="achievements" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 60px' }}>
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#00f5ff', textTransform: 'uppercase', marginBottom: '16px' }}>// 05 ——— ACHIEVEMENTS</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: '8px' }}>
            Proof of <span style={{ color: '#00f5ff' }}>work.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Competitions won, knowledge earned, communities served.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {achievements.map((a, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{ fontSize: '2.2rem' }}>{a.icon}</span>
                <span style={{ fontSize: '10px', fontFamily: 'monospace', letterSpacing: '0.1em', padding: '3px 10px', borderRadius: '999px', color: a.color, background: `${a.color}15`, border: `1px solid ${a.color}30` }}>{a.type}</span>
              </div>
              <h3 style={{ color: 'white', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>{a.title}</h3>
              <p style={{ color: a.color, fontFamily: 'monospace', fontSize: '11px', marginBottom: '10px' }}>{a.event} · {a.org}</p>
              <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6 }}>{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
