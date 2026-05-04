'use client';

import { useEffect, useRef, useState } from 'react';
import { categories } from '../utils/data.js';
import Image from 'next/image.js';

import LightHouse from './LightHouse';

interface SkillItem {
  name: string;
  icon: string;
}

const SkillGrid = ({
  items,
  visible,
  baseDelay,
  setActiveFilter,
}: {
  items: SkillItem[];
  visible: boolean;
  baseDelay: number;
  setActiveFilter: (filter: string) => void;
}) => (
  <div className="flex flex-wrap justify-center gap-4">
    {items.map(({ name, icon }, i) => (
      <div
        key={name}
        className="flex flex-col items-center gap-2"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translateY(0) scale(1)'
            : 'translateY(20px) scale(0.85)',
          transition: 'opacity 0.5s ease, transform 0.5s ease',
          transitionDelay: visible ? `${baseDelay + i * 60}ms` : '0ms',
        }}
      >
        <button
          className="w-14 h-14 flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-cyan-400/50 hover:shadow-[0_0_16px_rgba(34,211,238,0.9)] transition-all duration-300 cursor-pointer"
          onClick={() => {
            setActiveFilter(name);
            document
              .getElementById('projects')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label={`Filter projects by ${name}`}
        >
          <Image
            src={icon}
            alt={name}
            width={28}
            height={28}
            className="object-contain"
            style={{
              filter:
                name === 'GitHub' || name === 'Express' ? 'invert(1)' : 'none',
            }}
          />
        </button>
        <span className="text-xs text-secondary tracking-wide font-semibold text-center">
          {name}
        </span>
      </div>
    ))}
  </div>
);

type Props = {
  setActiveFilter: (filter: string) => void;
};

const Skills = ({ setActiveFilter }: Props) => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="flex flex-col items-center justify-center min-h-screen px-6 py-25 scroll-mt-5 md:scroll-mt-0"
    >
      <LightHouse />
      <div className="max-w-5xl w-full flex flex-col gap-4">
        <h2
          className={`text-3xl font-bold text-center text-hero-main transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Skills & Tools
        </h2>

        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 w-fit mx-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" />
          <p className="text-xs font-bold text-cyan-400 tracking-wide animate-cyan-pulse">
            Click a skill to filter projects
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {categories.map((cat, catIndex) => (
            <div key={cat.label}>
              <p
                className={`text-xs uppercase tracking-widest font-bold text-hero-main text-center mb-6 transition-all duration-700 ${
                  visible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transitionDelay: visible ? `${catIndex * 100}ms` : '0ms',
                }}
              >
                {cat.label}
              </p>
              <SkillGrid
                items={cat.items}
                visible={visible}
                baseDelay={catIndex * 200 + 150}
                setActiveFilter={setActiveFilter}
              />
              {catIndex < categories.length - 1 && (
                <div className="h-px bg-linear-to-r from-transparent via-zinc-600 to-transparent mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
