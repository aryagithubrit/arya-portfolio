'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillGroups = [
  {
    title: 'Embedded Systems', tag: 'FW',
    skills: [
      { name: 'ESP32 / ESP32-S3', pct: 92 },
      { name: 'Arduino', pct: 88 },
      { name: '8051 Microcontroller', pct: 80 },
      { name: 'FreeRTOS', pct: 75 },
      { name: 'Embedded C', pct: 88 },
    ],
  },
  {
    title: 'Industrial Comms', tag: 'NET',
    skills: [
      { name: 'RS485 / UART', pct: 85 },
      { name: 'Modbus RTU', pct: 82 },
      { name: 'MQTT / TLS', pct: 78 },
      { name: 'IoT Protocols', pct: 80 },
    ],
  },
  {
    title: 'Software', tag: 'SW',
    skills: [
      { name: 'C', pct: 88 },
      { name: 'Python', pct: 82 },
      { name: 'C++', pct: 72 },
      { name: 'PlatformIO', pct: 85 },
      { name: 'GitHub / Git', pct: 80 },
    ],
  },
  {
    title: 'Hardware Design', tag: 'HW',
    skills: [
      { name: 'PCB Design', pct: 75 },
      { name: 'Circuit Design', pct: 80 },
      { name: 'Sensor Integration', pct: 88 },
      { name: 'Prototyping', pct: 90 },
    ],
  },
  {
    title: 'Computer Vision', tag: 'CV',
    skills: [
      { name: 'OpenCV', pct: 78 },
      { name: 'MediaPipe', pct: 82 },
      { name: 'Python CV', pct: 78 },
    ],
  },
  {
    title: 'CAD', tag: '3D',
    skills: [
      { name: 'Fusion 360', pct: 72 },
      { name: 'Onshape', pct: 68 },
      { name: 'Proteus', pct: 75 },
    ],
  },
];

const radarPoints = ['FIRMWARE', 'NETWORKING', 'SOFTWARE', 'HARDWARE', 'CAD', 'PRODUCT'];
const radarValues = [0.92, 0.82, 0.85, 0.88, 0.72, 0.78];

function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const cx = 140, cy = 140, r = 110, n = radarPoints.length;
    let progress = 0;

    function getPoint(i: number, value: number) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return { x: cx + Math.cos(angle) * r * value, y: cy + Math.sin(angle) * r * value };
    }

    function draw(prog: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, 280, 280);
      for (let ring = 1; ring <= 5; ring++) {
        const rv = (ring / 5) * r;
        ctx.beginPath();
        for (let i = 0; i < n; i++) {
          const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(angle) * rv, y = cy + Math.sin(angle) * rv;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(0,245,255,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
        ctx.strokeStyle = 'rgba(0,245,255,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
        const lx = cx + Math.cos(angle) * (r + 18), ly = cy + Math.sin(angle) * (r + 18);
        ctx.fillStyle = 'rgba(0,245,255,0.7)';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(radarPoints[i], lx, ly);
      }
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const pt = getPoint(i, radarValues[i] * prog);
        i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, 'rgba(0,245,255,0.3)');
      grad.addColorStop(1, 'rgba(124,58,237,0.1)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,245,255,0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      for (let i = 0; i < n; i++) {
        const pt = getPoint(i, radarValues[i] * prog);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#00f5ff';
        ctx.fill();
      }
    }

    let animId: number;
    function animate() {
      progress = Math.min(progress + 0.02, 1);
      draw(progress);
      if (progress < 1) animId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animId);
  }, [inView]);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <canvas ref={canvasRef} width={280} height={280} />
      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
        {['• FIRMWARE ENGINEER', '• HARDWARE TINKERER', '• PROTOCOL NERD', '• PRODUCT MIND'].map(l => (
          <span key={l} style={{ color: '#475569', fontFamily: 'monospace', fontSize: '11px' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ group, delay }: { group: typeof skillGroups[0]; delay: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '16px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem' }}>{group.title}</h3>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid rgba(0,245,255,0.25)', background: 'rgba(0,245,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px' }}>{group.tag}</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {group.skills.map(s => (
          <div key={s.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: '#cbd5e1', fontSize: '13px' }}>{s.name}</span>
              <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '12px' }}>{s.pct}%</span>
            </div>
            <div style={{ height: '3px', borderRadius: '2px', background: '#1e293b', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #00f5ff, #a855f7)', boxShadow: '0 0 8px rgba(0,245,255,0.5)' }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${s.pct}%` } : {}}
                transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section id="skills" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 60px' }}>
        <motion.div ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#00f5ff', textTransform: 'uppercase', marginBottom: '16px' }}>// 02 ——— TOOLCHAIN</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: '8px' }}>
            The <span style={{ background: 'linear-gradient(90deg, #00f5ff, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Toolchain.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Calibrated by build cycles, debugged at 3 AM.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '40px' }}>
          <div style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em' }}>CAPABILITY.RADAR</span>
              <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '11px' }}>REAL-TIME</span>
            </div>
            <RadarChart />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {skillGroups.map((g, i) => <SkillCard key={g.title} group={g} delay={i * 0.1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
