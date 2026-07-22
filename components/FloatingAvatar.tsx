'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { text: "Hi! I'm Arya VP — ECE engineer & IoT builder 👋", delay: 2000 },
  { text: "Check out my TrackBot Gateway project ⚡", delay: 7000 },
  { text: "Won 1st Prize at Excel 2024 & 2025 🥇", delay: 13000 },
  { text: "Currently interning at LetUSense, building industrial IoT 🏭", delay: 19000 },
  { text: "Scroll down to see my full skill radar 📡", delay: 25000 },
  { text: "ESP32-S3 + FreeRTOS + Modbus RTU — that's my stack ⚙️", delay: 31000 },
  { text: "Click me to chat and ask anything! 💬", delay: 37000 },
];

export default function FloatingAvatar() {
  const [bubble, setBubble] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role:string,content:string}[]>([
    { role: 'assistant', content: "Hi! I'm Arya's digital avatar. Ask me anything about my projects, skills, or experience! 🚀" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cycle through messages
    const timers: ReturnType<typeof setTimeout>[] = [];
    messages.forEach(m => {
      const t = setTimeout(() => {
        setBubble(m.text);
        setTimeout(() => setBubble(null), 4500);
      }, m.delay);
      timers.push(t);
    });
    // Repeat cycle
    const cycle = setInterval(() => {
      messages.forEach(m => {
        const t = setTimeout(() => {
          setBubble(m.text);
          setTimeout(() => setBubble(null), 4500);
        }, m.delay);
        timers.push(t);
      });
    }, 42000);
    return () => { timers.forEach(clearTimeout); clearInterval(cycle); };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

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
      setChatMessages(prev => [...prev, { role: 'assistant', content: 'Signal lost. Try again!' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Avatar */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
        {/* Speech bubble */}
        <AnimatePresence>
          {bubble && !chatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="max-w-52 rounded-2xl rounded-br-sm px-4 py-3 text-sm text-white leading-relaxed"
              style={{
                background: 'rgba(10,22,40,0.95)',
                border: '1px solid rgba(0,245,255,0.3)',
                boxShadow: '0 0 20px rgba(0,245,255,0.15)',
              }}>
              {bubble}
              {/* Triangle */}
              <div className="absolute -bottom-2 right-4 w-0 h-0"
                style={{ borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid rgba(0,245,255,0.3)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Avatar orb */}
        <motion.button
          onClick={() => { setChatOpen(!chatOpen); setBubble(null); }}
          className="avatar-float relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(0,245,255,0.3), rgba(124,58,237,0.5))',
            border: '2px solid rgba(0,245,255,0.5)',
            boxShadow: '0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(124,58,237,0.2)',
          }}>
          {/* Scan line */}
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <div className="w-full h-1 absolute left-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.6), transparent)', animation: 'scan 2.5s linear infinite' }} />
          </div>
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border border-cyan-400/20" style={{ animation: 'rotate-slow 8s linear infinite', transform: 'scale(1.2)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
          </div>
          <div className="absolute inset-0 rounded-full border border-purple-500/20" style={{ animation: 'rotate-reverse 6s linear infinite', transform: 'scale(1.35)' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 bg-purple-400 rounded-full" />
          </div>
          {/* Avatar face */}
          <div className="avatar-hologram relative z-10 flex flex-col items-center">
            <span className="text-3xl font-black text-cyan-400 leading-none" style={{ textShadow: '0 0 15px rgba(0,245,255,0.9)' }}>A</span>
            <span className="text-cyan-400/70 font-mono text-xs tracking-widest leading-none">VP</span>
          </div>
          {/* Online dot */}
          <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2"
            style={{ borderColor: 'var(--bg-deep)', animation: 'pulse-cyan 2s infinite' }} />
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="fixed bottom-36 right-8 z-50 w-80 md:w-96 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(6,12,26,0.98)',
              border: '1px solid rgba(0,245,255,0.25)',
              boxShadow: '0 0 50px rgba(0,245,255,0.15), 0 20px 60px rgba(0,0,0,0.8)',
            }}>
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-cyan-500/15"
              style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.08))' }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center relative avatar-orb"
                style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.2), rgba(124,58,237,0.3))', border: '1.5px solid rgba(0,245,255,0.4)' }}>
                <span className="text-cyan-400 font-black text-sm">A</span>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-gray-900" />
              </div>
              <div>
                <p className="text-white text-sm font-bold">Arya VP</p>
                <p className="text-cyan-400 font-mono text-xs">Digital Avatar · ONLINE</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="ml-auto text-slate-500 hover:text-white text-lg leading-none">×</button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${msg.role === 'user' ? 'text-black font-medium' : 'text-slate-200'}`}
                    style={msg.role === 'user'
                      ? { background: 'linear-gradient(135deg, #00f5ff, #00b8d4)' }
                      : { background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.12)' }}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-xl px-4 py-2 flex gap-1.5 items-center"
                    style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.12)' }}>
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        style={{ animation: `pulse-cyan 1.2s ${i*0.2}s infinite` }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick prompts */}
            {chatMessages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {['Tell me about TrackBot', 'Your achievements?', 'Current internship?', 'Top skills?'].map(p => (
                  <button key={p} onClick={() => sendMessage(p)}
                    className="text-xs px-2.5 py-1.5 rounded-lg text-cyan-400 transition-all hover:bg-cyan-400/15"
                    style={{ border: '1px solid rgba(0,245,255,0.2)', background: 'rgba(0,245,255,0.05)' }}>
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-cyan-500/10">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-white text-sm placeholder-slate-600 outline-none"
              />
              <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40 text-black font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #00f5ff, #7c3aed)' }}>
                ›
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
