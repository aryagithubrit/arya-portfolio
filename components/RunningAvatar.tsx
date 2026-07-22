'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "I debug at 3AM. You sleep. 😎",
  "Why is it always a semicolon 😤",
  "Scroll down to see my projects! ↓",
  "It works. Don't touch it. 🙏",
  "Click me to chat with my AI twin 💬",
  "Hardware that ships, not slides 💪",
  "Have you tried turning it off and on? 😂",
];

export default function RunningAvatar() {
  const [posX, setPosX] = useState(100);
  const [facingRight, setFacingRight] = useState(true);
  const [isJumping, setIsJumping] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Arya's digital avatar! Ask me anything 🚀" }
  ]);
  const [loading, setLoading] = useState(false);
  const posRef = useRef(100);
  const dirRef = useRef(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (chatOpen) return;

    const move = setInterval(() => {
      const max = window.innerWidth - 80;
      posRef.current += dirRef.current * 0.8;

      if (posRef.current >= max) {
        dirRef.current = -1;
        setFacingRight(false);
        setIsWaving(true);
        const msg = messages[msgIdx % messages.length];
        setBubble(msg);
        setMsgIdx(i => i + 1);
        setTimeout(() => { setIsWaving(false); setBubble(null); }, 2800);
      } else if (posRef.current <= 60) {
        dirRef.current = 1;
        setFacingRight(true);
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
      setPosX(posRef.current);
    }, 30);

    const jumpTimer = setInterval(() => {
      if (!isWaving) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    }, 5000);

    const bubbleTimer = setInterval(() => {
      if (!bubble) {
        const msg = messages[msgIdx % messages.length];
        setBubble(msg);
        setMsgIdx(i => i + 1);
        setTimeout(() => setBubble(null), 2800);
      }
    }, 7000);

    return () => { clearInterval(move); clearInterval(jumpTimer); clearInterval(bubbleTimer); };
  }, [chatOpen, bubble, msgIdx, isWaving]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const newMsgs = [...chatMessages, { role: 'user', content: text }];
    setChatMessages(newMsgs);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMsgs }),
      });
      const data = await res.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Signal lost! Try again 📡' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* BUBBLE — completely outside flip wrapper, always readable */}
      <AnimatePresence>
        {bubble && !chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            style={{
              position: 'fixed',
              bottom: '115px',
              left: `${Math.max(10, posX - 50)}px`,
              zIndex: 55,
              background: 'rgba(6,18,40,0.97)',
              border: '1px solid rgba(0,245,255,0.45)',
              borderRadius: '14px',
              padding: '10px 16px',
              whiteSpace: 'nowrap',
              color: 'white',
              fontSize: '13px',
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
              boxShadow: '0 0 20px rgba(0,245,255,0.2)',
              pointerEvents: 'none',
            }}>
            {bubble}
            <div style={{
              position: 'absolute', bottom: '-7px', left: '40px',
              width: 0, height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '7px solid rgba(0,245,255,0.45)',
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHARACTER — flips direction, bubble NOT inside this */}
      <div
        onClick={() => { setChatOpen(o => !o); setBubble(null); }}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: `${posX}px`,
          zIndex: 50,
          cursor: 'pointer',
          transform: `scaleX(${facingRight ? 1 : -1})`,
          filter: 'drop-shadow(0 0 10px rgba(0,245,255,0.9))',
        }}>
        <motion.svg
          width="52" height="82" viewBox="0 0 52 82"
          animate={{ y: isJumping ? -28 : 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}>
          <defs>
            <filter id="cglow">
              <feGaussianBlur stdDeviation="1.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Head */}
          <circle cx="26" cy="12" r="10" fill="none" stroke="#00f5ff" strokeWidth="1.5" filter="url(#cglow)" />
          {/* Eyes */}
          <circle cx="22.5" cy="11" r="1.5" fill="#00f5ff" />
          <circle cx="29.5" cy="11" r="1.5" fill="#00f5ff" />
          {/* Smile */}
          <path d={isWaving ? "M21 15 Q26 19 31 15" : "M21 14 Q26 17 31 14"} stroke="#00f5ff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* Hair */}
          <path d="M16 9 Q18 3 26 2 Q34 3 36 9" stroke="#a855f7" strokeWidth="1.5" fill="none" filter="url(#cglow)" />
          {/* Neck */}
          <line x1="26" y1="22" x2="26" y2="27" stroke="#00f5ff" strokeWidth="1.5" />
          {/* Body */}
          <path d="M15 27 Q26 25 37 27 L35 50 Q26 53 17 50 Z" fill="rgba(0,245,255,0.04)" stroke="#00f5ff" strokeWidth="1.5" filter="url(#cglow)" />
          {/* Body details */}
          <line x1="26" y1="27" x2="26" y2="50" stroke="rgba(0,245,255,0.25)" strokeWidth="1" strokeDasharray="2,3" />
          <path d="M19 36 Q26 38 33 36" stroke="rgba(0,245,255,0.35)" strokeWidth="1" fill="none" />

          {/* Left arm */}
          <motion.g
            animate={isWaving ? { rotate: [-10, -50, -10] } : { rotate: [15, -15, 15] }}
            transition={{ duration: isWaving ? 0.5 : 0.4, repeat: Infinity }}
            style={{ transformOrigin: '18px 29px' }}>
            <line x1="18" y1="29" x2="10" y2="44" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="44" x2="7" y2="54" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          {/* Right arm — waves when isWaving */}
          <motion.g
            animate={isWaving ? { rotate: [0, 60, 0, 60, 0] } : { rotate: [-15, 15, -15] }}
            transition={{ duration: isWaving ? 0.4 : 0.4, repeat: Infinity }}
            style={{ transformOrigin: '34px 29px' }}>
            <line x1="34" y1="29" x2="42" y2="44" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="42" y1="44" x2="45" y2="54" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
          </motion.g>

          {/* Left leg */}
          <motion.g
            animate={isJumping ? { rotate: -25 } : { rotate: [22, -22, 22] }}
            transition={{ duration: 0.35, repeat: Infinity }}
            style={{ transformOrigin: '22px 50px' }}>
            <line x1="22" y1="50" x2="15" y2="66" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="15" y1="66" x2="9" y2="78" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="8" cy="79" rx="5" ry="2" fill="rgba(0,245,255,0.25)" stroke="#00f5ff" strokeWidth="1" />
          </motion.g>

          {/* Right leg */}
          <motion.g
            animate={isJumping ? { rotate: 25 } : { rotate: [-22, 22, -22] }}
            transition={{ duration: 0.35, repeat: Infinity }}
            style={{ transformOrigin: '30px 50px' }}>
            <line x1="30" y1="50" x2="37" y2="66" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="37" y1="66" x2="43" y2="78" stroke="#00f5ff" strokeWidth="1.5" strokeLinecap="round" />
            <ellipse cx="44" cy="79" rx="5" ry="2" fill="rgba(0,245,255,0.25)" stroke="#00f5ff" strokeWidth="1" />
          </motion.g>

          {/* Scan lines for hologram effect */}
          {[18, 32, 46].map(y => (
            <line key={y} x1="13" y1={y} x2="39" y2={y} stroke="rgba(0,245,255,0.1)" strokeWidth="0.5" />
          ))}
        </motion.svg>

        {/* Ground glow */}
        <div style={{ width: '36px', height: '5px', background: 'radial-gradient(ellipse, rgba(0,245,255,0.35), transparent)', borderRadius: '50%', margin: '-2px auto 0' }} />
      </div>

      {/* CHAT PANEL */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            style={{
              position: 'fixed', bottom: '110px', right: '24px', zIndex: 60,
              width: '340px', borderRadius: '18px', overflow: 'hidden',
              background: 'rgba(6,12,26,0.98)',
              border: '1px solid rgba(0,245,255,0.25)',
              boxShadow: '0 0 50px rgba(0,245,255,0.15)',
            }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(0,245,255,0.1)', background: 'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,245,255,0.25), rgba(124,58,237,0.3))', border: '1.5px solid rgba(0,245,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#00f5ff', fontWeight: 900, fontSize: '14px' }}>A</span>
                </div>
                <div>
                  <div style={{ color: 'white', fontSize: '13px', fontWeight: 700 }}>Arya VP</div>
                  <div style={{ color: '#00f5ff', fontSize: '10px', fontFamily: 'monospace' }}>Digital Avatar · ONLINE</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ height: '240px', overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '85%', borderRadius: '12px', padding: '9px 13px', fontSize: '13px', lineHeight: 1.55,
                    background: msg.role === 'user' ? 'linear-gradient(135deg, #00f5ff, #00b8d4)' : 'rgba(0,245,255,0.07)',
                    border: msg.role === 'user' ? 'none' : '1px solid rgba(0,245,255,0.13)',
                    color: msg.role === 'user' ? 'black' : '#e2e8f0',
                    fontWeight: msg.role === 'user' ? 600 : 400,
                  }}>{msg.content}</div>
                </div>
              ))}
              {loading && (
                <div style={{ display: 'flex', gap: '5px', padding: '6px 10px' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#00f5ff', animation: `pulse-cyan 1.2s ${i*0.2}s infinite` }} />)}
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {chatMessages.length <= 2 && (
              <div style={{ padding: '0 14px 10px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['TrackBot project?', 'Your skills?', 'Achievements?'].map(p => (
                  <button key={p} onClick={() => sendMessage(p)}
                    style={{ fontSize: '11px', padding: '5px 12px', borderRadius: '999px', color: '#00f5ff', background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.2)', cursor: 'pointer' }}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', padding: '10px 14px', borderTop: '1px solid rgba(0,245,255,0.1)' }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask me anything..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '13px' }} />
              <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
                style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, #00f5ff, #7c3aed)', border: 'none', cursor: 'pointer', color: 'black', fontWeight: 900, fontSize: '16px' }}>
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
