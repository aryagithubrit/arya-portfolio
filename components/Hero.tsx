'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, ChevronDown } from 'lucide-react';

const roles = [
  'Electronics & Communication Engineer',
  'Embedded Systems Developer', 
  'Industrial IoT Architect',
  'Firmware Engineer',
  'Future Technology Builder',
];

const stats = [
  { label: 'Projects Built', value: '10+' },
  { label: 'Competition Wins', value: '2x' },
  { label: 'CGPA', value: '8.7' },
  { label: 'Years Coding', value: '3+' },
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIdx];
    const i = displayed.length;
    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 55);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2200);
        return () => clearTimeout(t);
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 28);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(r => (r + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      
      {/* Background glows */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', background: 'radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.12) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50%', height: '60%', background: 'radial-gradient(ellipse at 10% 80%, rgba(0,245,255,0.06) 0%, transparent 60%)' }} />
      </div>

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '120px 60px 140px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* LEFT COLUMN */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
            
            {/* Status badges */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(0,245,255,0.3)', borderRadius: '999px', padding: '6px 16px', background: 'rgba(0,245,255,0.05)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f5ff', animation: 'pulse-cyan 2s infinite' }} />
                <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em' }}>SYS ONLINE</span>
              </div>
              <div style={{ border: '1px solid #334155', borderRadius: '999px', padding: '6px 16px' }}>
                <span style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em' }}>V3.0 / 2026</span>
              </div>
            </div>

            {/* Name */}
            <div style={{ marginBottom: '20px', lineHeight: 1 }}>
              <span style={{ fontSize: '5rem', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>ARYA </span>
              <span style={{ fontSize: '5rem', fontWeight: 900, color: '#00f5ff', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(0,245,255,0.7)' }}>VP</span>
            </div>

            {/* Typewriter */}
            <div style={{ marginBottom: '24px', height: '32px', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '1rem', marginRight: '8px' }}>&gt;</span>
              <span style={{ color: 'white', fontFamily: 'monospace', fontSize: '0.95rem' }}>{displayed}</span>
              <span style={{ color: '#00f5ff', fontFamily: 'monospace', animation: 'blink 1s step-end infinite' }}>_</span>
            </div>

            {/* Description */}
            <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, marginBottom: '28px', maxWidth: '460px' }}>
              Pre-final year B.Tech ECE at MEC Kochi — designing the bridge between silicon and the cloud. Embedded firmware, industrial protocols, and autonomous hardware that ships.
            </p>

            {/* Channels */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em' }}>CHANNELS //</span>
              {['LinkedIn', 'GitHub', 'Email'].map(ch => (
                <a key={ch} href="#contact" style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase' }}>{ch}</a>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="/resume.pdf" download style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '0.08em', color: 'black', fontWeight: 700, background: 'linear-gradient(135deg, #00f5ff, #00b8d4)', textDecoration: 'none' }}>
                <Download size={14} /> DOWNLOAD RESUME
              </a>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '13px', color: 'white', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }}>
                VIEW PROJECTS
              </button>
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'monospace', fontSize: '13px', color: '#94a3b8', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                CONTACT <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Photo */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>

            {/* Rotating ring outer */}
            <div style={{ position: 'absolute', width: '340px', height: '340px', borderRadius: '50%', border: '1px solid rgba(0,245,255,0.12)', animation: 'rotate-slow 30s linear infinite' }}>
              <div style={{ position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#00f5ff' }} />
            </div>
            {/* Rotating ring inner */}
            <div style={{ position: 'absolute', width: '280px', height: '280px', borderRadius: '50%', border: '1px solid rgba(124,58,237,0.12)', animation: 'rotate-reverse 20s linear infinite' }} />

            {/* Photo circle */}
            <div style={{ position: 'relative', zIndex: 10, width: '260px', height: '260px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(0,245,255,0.5)', boxShadow: '0 0 50px rgba(0,245,255,0.3), 0 0 100px rgba(124,58,237,0.15)' }}>
              <img 
                src="/photo.webp" 
                alt="Arya VP" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 80%, rgba(0,245,255,0.1), transparent 60%)', pointerEvents: 'none' }} />
            </div>

            {/* Floating tags */}
            {[
              { label: 'ESP32 · ACTIVE', top: '10px', left: '20px' },
              { label: 'MQTT / TLS', top: '140px', right: '-20px' },
              { label: 'MODBUS RTU', bottom: '100px', left: '0px' },
              { label: 'UPTIME 99.9%', bottom: '20px', right: '10px' },
            ].map((tag, i) => (
              <motion.div key={tag.label}
                style={{ position: 'absolute', top: tag.top, left: (tag as any).left, right: (tag as any).right, bottom: (tag as any).bottom }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
                <div style={{ background: 'rgba(6,18,40,0.9)', backdropFilter: 'blur(10px)', border: '1px solid rgba(0,245,255,0.25)', borderRadius: '8px', padding: '6px 14px', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.1em' }}>{tag.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Stats bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(0,245,255,0.1)', background: 'rgba(6,12,26,0.8)', backdropFilter: 'blur(12px)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px 60px', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00f5ff', textShadow: '0 0 20px rgba(0,245,255,0.6)' }}>{s.value}</div>
              <div style={{ color: '#475569', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.15em', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <motion.div style={{ position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)' }}
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <ChevronDown style={{ color: 'rgba(0,245,255,0.4)' }} size={20} />
      </motion.div>
    </section>
  );
}
