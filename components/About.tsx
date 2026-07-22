'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const timeline = [
  { year: '2021', label: 'IGNITED', title: 'Class 10 — Perfect Score', desc: 'Scored 100% in SSLC. First exposure to electronics through physics labs — fell in love with circuits.' },
  { year: '2023', label: 'SPARKED', title: 'Class 12 — 99.17%', desc: 'Topped Higher Secondary. Chose ECE at MEC Kochi — the decision that shaped everything.' },
  { year: '2024', label: 'EMBEDDED', title: 'First Year at MEC + Competitions', desc: 'Built systems on 8051 and Arduino. Won 1st Prize at MEC Labs (Excel 2024). Mentored at REMAP 2024 hardware hackathon.' },
  { year: '2024', label: 'TINKERING LAB', title: 'IDEALAB + iHUB Robotics', desc: 'Joined IDEALAB Trainee program. Completed internship at iHUB Robotics — hands-on robotics and IoT systems.' },
  { year: '2025', label: 'SHIPPING', title: 'Competition Wins + Projects', desc: '1st Prize at Reverso (Excel 2025). Built gesture-controlled robotic arm, maze solver, QRNG system. Presented at Tharang 2025.' },
  { year: '2026', label: 'INDUSTRIAL', title: 'LetUSense Internship', desc: 'Currently building TrackBot Gateway — commercial Industrial IoT Gateway on ESP32-S3, FreeRTOS, Modbus RTU over RS485 → MQTT → GCP.' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 60px' }}>

        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '64px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#00f5ff', textTransform: 'uppercase', marginBottom: '16px' }}>// 01 ——— ABOUT</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
            Designing the bridge between<br />
            <span style={{ color: '#00f5ff' }}>silicon and the cloud.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>
            An engineer's job is to make impossible things boringly reliable. That's the goal.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}>

            <div style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(0,245,255,0.15)', borderRadius: '16px', padding: '32px', marginBottom: '24px' }}>
              <p style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em', marginBottom: '20px' }}>./MISSION.TXT</p>
              <p style={{ color: 'white', fontSize: '1rem', lineHeight: 1.8, marginBottom: '16px' }}>
                I'm <span style={{ color: '#00f5ff', fontWeight: 700 }}>Arya VP</span>, a pre-final year ECE student obsessed with the layer where firmware meets physics.
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '16px' }}>
                From 8051 assembly to ESP32-S3 industrial gateways, my work lives where embedded systems, communication protocols, and real-world automation collide.
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.8 }}>
                Currently at LetUSense Pvt Ltd, architecting a commercial Industrial IoT Gateway — dual-core FreeRTOS, RS485, MQTT/TLS, Google Cloud.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {[
                { val: '10+', label: 'PROJECTS' },
                { val: '2×', label: 'EXCEL WINS' },
                { val: '∞', label: 'SOLDER HRS' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'center', background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '12px', padding: '24px 12px' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00f5ff', textShadow: '0 0 20px rgba(0,245,255,0.6)' }}>{s.val}</div>
                  <div style={{ color: '#475569', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', marginTop: '6px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — timeline */}
          <div style={{ position: 'relative', paddingLeft: '32px' }}>
            <div style={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '1px', background: 'linear-gradient(to bottom, #00f5ff, #7c3aed, transparent)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {timeline.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * i + 0.3 }}
                  style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-28px', top: '14px', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #00f5ff', background: '#020814', boxShadow: '0 0 8px rgba(0,245,255,0.6)' }} />
                  <div style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '12px', padding: '18px 20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px' }}>{item.year}</span>
                      <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '10px' }}>{item.label}</span>
                    </div>
                    <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>{item.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
