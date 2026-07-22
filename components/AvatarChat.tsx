'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Minimize2, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const starterMessages = [
  "Hi! I'm Arya's AI avatar. Ask me about my projects, skills, or how TrackBot Gateway works! 👋",
];

const quickPrompts = [
  "Tell me about TrackBot Gateway",
  "What are your top skills?",
  "What competitions did you win?",
  "What's your current internship?",
];

export default function AvatarChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: starterMessages[0] }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Signal lost. Try again.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
              boxShadow: '0 0 30px rgba(0,245,255,0.4)',
            }}>
            <MessageSquare size={22} className="text-black" />
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(8,16,32,0.97)',
              border: '1px solid rgba(0,245,255,0.2)',
              boxShadow: '0 0 50px rgba(0,245,255,0.15), 0 20px 60px rgba(0,0,0,0.8)',
            }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/15"
              style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.08))' }}>
              <div className="flex items-center gap-3">
                {/* Avatar orb */}
                <div className="w-9 h-9 rounded-full flex items-center justify-center relative"
                  style={{ background: 'linear-gradient(135deg, #00f5ff22, #7c3aed44)', border: '1.5px solid rgba(0,245,255,0.4)' }}>
                  <span className="text-cyan-400 font-black text-sm">A</span>
                  <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-bg-deep"
                    style={{ animation: 'pulse-cyan 2s infinite' }} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold leading-tight">Arya VP</p>
                  <p className="text-cyan-400 font-mono text-xs">AI Avatar · ONLINE</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setMinimized(!minimized)} className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                  <Minimize2 size={14} />
                </button>
                <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300 transition-colors p-1">
                  <X size={14} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!minimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}>
                  {/* Messages */}
                  <div className="h-72 overflow-y-auto p-4 space-y-3" style={{ scrollbarWidth: 'thin' }}>
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'text-black font-medium'
                            : 'text-slate-200'
                        }`}
                          style={msg.role === 'user'
                            ? { background: 'linear-gradient(135deg, #00f5ff, #00b8d4)' }
                            : { background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.12)' }
                          }>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {loading && (
                      <div className="flex justify-start">
                        <div className="rounded-xl px-4 py-2 flex gap-1.5 items-center"
                          style={{ background: 'rgba(0,245,255,0.06)', border: '1px solid rgba(0,245,255,0.12)' }}>
                          {[0, 1, 2].map(i => (
                            <div key={i} className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                              style={{ animation: `pulse-cyan 1.2s ${i * 0.2}s infinite` }} />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick prompts */}
                  {messages.length <= 2 && (
                    <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                      {quickPrompts.map(p => (
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
                    <button onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110 disabled:opacity-40"
                      style={{ background: 'linear-gradient(135deg, #00f5ff, #7c3aed)' }}>
                      <Send size={13} className="text-black" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
