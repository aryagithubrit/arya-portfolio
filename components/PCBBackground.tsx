'use client';
import { useEffect, useRef } from 'react';

export default function PCBBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; opacity: number; trail: Array<{x:number,y:number}>;
    }> = [];

    const nodes: Array<{ x: number; y: number; pulse: number; size: number }> = [];

    // Create nodes
    for (let i = 0; i < 15; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        pulse: Math.random() * Math.PI * 2,
        size: Math.random() * 3 + 2,
      });
    }

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        trail: [],
      });
    }

    let animId: number;
    let frame = 0;

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.025)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw connections between close nodes
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 250) {
            const opacity = (1 - dist / 250) * 0.15;
            ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);

            // Orthogonal circuit-style path
            const mx = (a.x + b.x) / 2;
            ctx.lineTo(mx, a.y);
            ctx.lineTo(mx, b.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
        // Animate node pulse
        a.pulse += 0.02;
        const glowSize = a.size + Math.sin(a.pulse) * 2;
        const grd = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, glowSize * 3);
        grd.addColorStop(0, `rgba(0, 245, 255, 0.6)`);
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(a.x, a.y, glowSize * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#00f5ff';
        ctx.beginPath();
        ctx.arc(a.x, a.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(0, 180, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
