'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import { Experience, Achievements } from '@/components/ExperienceAchievements';
import Contact from '@/components/Contact';

const PCBBackground = dynamic(() => import('@/components/PCBBackground'), { ssr: false });
const RunningAvatar = dynamic(() => import('@/components/RunningAvatar'), { ssr: false });

export default function Home() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#020814' }}>
      <PCBBackground />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(124,58,237,0.08) 0%, transparent 60%)' }} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </div>
      <RunningAvatar />
    </main>
  );
}
