'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:aryavp.mec@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
    window.location.href = mailto;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contacts = [
    { label: 'EMAIL', value: 'aryavp523@gmail.com', href: 'mailto:aryavp523@gmail.com', icon: <Mail size={14} /> },
    { label: 'PHONE', value: '+91 9778589447', href: 'tel:+919778589447', icon: <Phone size={14} /> },
    { label: 'LINKEDIN', value: 'linkedin.com/in/arya-vp', href: 'https://www.linkedin.com/in/arya-vp-0557a33b6/', icon: null },
    { label: 'GITHUB', value: 'github.com/arya-vp', href: 'https://github.com/aryagithubrit', icon: null },
    { label: 'LOCATION', value: 'Kerala, India', href: null, icon: <MapPin size={14} /> },
  ];

  const inputStyle = {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    background: 'rgba(0,245,255,0.03)', border: '1px solid rgba(0,245,255,0.12)',
    color: 'white', fontSize: '14px', outline: 'none', fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
  };

  return (
    <section id="contact" style={{ position: 'relative', padding: '100px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 60px' }}>
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.3em', color: '#00f5ff', textTransform: 'uppercase', marginBottom: '16px' }}>// 06 ——— CONTACT</p>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: '8px' }}>
            Open a <span style={{ color: '#00f5ff' }}>channel.</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>For internships, collaborations, or just to argue about microcontrollers.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '20px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
              <span style={{ color: '#00f5ff', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.2em' }}>UPLINK.PANEL</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'pulse-cyan 2s infinite' }} />
                <span style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '11px' }}>ONLINE</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              {contacts.map(c => (
                <div key={c.label}>
                  <p style={{ color: '#475569', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '6px' }}>{c.label}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      style={{ color: 'white', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {c.icon && <span style={{ color: '#00f5ff' }}>{c.icon}</span>}
                      {c.value}
                    </a>
                  ) : (
                    <p style={{ color: 'white', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {c.icon && <span style={{ color: '#00f5ff' }}>{c.icon}</span>}
                      {c.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(0,245,255,0.12)', borderRadius: '20px', padding: '32px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[{ field: 'name', label: 'NAME', placeholder: 'Your name', type: 'text' },
                  { field: 'email', label: 'EMAIL', placeholder: 'you@domain.com', type: 'email' }].map(f => (
                  <div key={f.field}>
                    <label style={{ color: '#475569', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder}
                      value={formData[f.field as keyof typeof formData]}
                      onChange={e => setFormData(p => ({ ...p, [f.field]: e.target.value }))}
                      style={inputStyle} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ color: '#475569', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>SUBJECT</label>
                <input type="text" placeholder="What's this about?"
                  value={formData.subject}
                  onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                  style={inputStyle} />
              </div>
              <div>
                <label style={{ color: '#475569', fontFamily: 'monospace', fontSize: '10px', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>MESSAGE</label>
                <textarea rows={5} placeholder="Tell me about the build..."
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'none' }} />
              </div>
              <button type="submit"
                style={{ padding: '14px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '0.1em', fontWeight: 700, color: 'black', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: sent ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #00f5ff, #7c3aed)' }}>
                {sent ? '✓ SIGNAL TRANSMITTED' : <><Send size={14} /> TRANSMIT SIGNAL</>}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '60px', paddingTop: '32px', borderTop: '1px solid rgba(0,245,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <p style={{ color: '#334155', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em' }}>© 2026 · ARYA VP · SOLDERED WITH ♥ IN INDIA</p>
          <p style={{ color: '#334155', fontFamily: 'monospace', fontSize: '11px', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'pulse-cyan 2s infinite', display: 'inline-block' }} />
            SYSTEM STABLE · V3.0.0
          </p>
        </div>
      </div>
    </section>
  );
}
