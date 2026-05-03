'use client';
import { useTypewriter } from '@/hooks/useTypeWriter';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { GrDocumentPdf } from 'react-icons/gr';

const stats = [
  { value: '4+', label: 'Years Experience' },
  { value: '50k', label: 'Lines of Code' },
  { value: '500+', label: 'Pull Requests Merged' },
];

const phrases = [
  'a software engineer',
  'a full stack engineer',
  'a react developer',
  'open to work!',
];

type Props = {
  resume: string;
};

const About = ({ resume }: Props) => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentPhrase = useTypewriter(phrases);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="flex items-center justify-center min-h-screen px-6 scroll-mt-20 md:scroll-mt-0"
    >
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Photo */}
        <div
          className={`flex justify-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <Image
            src="/profile.jpeg"
            alt="Daniel Niedzwiedzki"
            width={340}
            height={340}
            className="md:h-80 max-h-80 object-cover outline outline-base-300 outline-offset-4 rounded-lg"
            priority
          />
        </div>

        {/* Blurb */}
        <div
          className={`flex flex-col gap-6 transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-hero-main">About Me</h2>
          <div className="text-secondary leading-relaxed">
            I'm{' '}
            <div className="font-fira text-sm font-semibold px-1 py-1 rounded-md bg-white/5 border border-white/8 text-secondary w-fit inline">
              <span>{currentPhrase}</span>
              <span className="animate-blink">|</span>
            </div>
            based in New Jersey with a passion for building fast, accessible,
            and visually polished web experiences. I specialize in React and
            TypeScript, and I care deeply about the details that make an
            interface feel great to use.
          </div>
          <div className="text-secondary leading-relaxed">
            Over the years I've worked across enterprise chat platforms,
            internal tooling, and consumer-facing products — always with a focus
            on component architecture, performance, and accessibility. I believe
            good code and good design go hand in hand.
          </div>

          <div
            className={`grid grid-cols-3 gap-4 transition-all duration-700 delay-500 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-zinc-800 bg-zinc-900/50"
              >
                <span className="text-2xl font-bold text-hero-main">
                  {value}
                </span>
                <span className="text-xs text-secondary text-center mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Resume download */}
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-md text-hero-main text-base font-bold
              bg-white/6 backdrop-blur-sm border border-white/10 transition-all w-fit hover:bg-white/12 hover:border-white/25 hover:-translate-y-[2px]
              active:translate-y-0 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
          >
            View Resume
            <GrDocumentPdf />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
