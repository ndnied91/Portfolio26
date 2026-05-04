'use client';

import { useEffect, useState } from 'react';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';

import { fetchResume } from '@/utils/fetchResume';
import LightHouse from './LightHouse';

export default function PageClient() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [resume, setResume] = useState('');

  useEffect(() => {
    fetchResume().then((url) => setResume(url));
  }, []);

  return (
    <main
      className="min-h-screen text-white"
      style={{
        background: `
          radial-gradient(ellipse at 50% 20%, rgba(99, 102, 241, 0.2) 0%, rgba(13, 13, 26, 0.1) 60%, transparent 100%),
          radial-gradient(ellipse at 80% 80%, rgba(34, 211, 238, 0.07) 0%, transparent 100%),
          #0a0a0f
        `,
      }}
    >
      <Hero />
      <About resume={resume} />
      {/* <LightHouse /> */}
      <Skills setActiveFilter={setActiveFilter} />
      <Projects activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <Experience resume={resume} />
      <Contact />
      <Footer />
    </main>
  );
}
