'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NeonSign from './NeonSign';
import { BsLinkedin, BsGithub } from 'react-icons/bs';

const Hero = () => {
  const [visible, setVisible] = useState(false);
  const [signOn, setSignOn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex items-center justify-center min-h-screen px-6">
      <div className="max-w-5xl w-full grid grid-cols-1 items-center text-center">
        {/* Neon Sign */}
        <div
          className="flex flex-col items-center"
          style={{ paddingBottom: '40px' }}
        >
          {/* <NeonSign /> */}
          <NeonSign signOn={signOn} setSignOn={setSignOn} />
        </div>

        {/* Name */}
        <h1
          className={`text-5xl lg:text-6xl font-bold tracking-tight text-hero-main mb-4 transition-[opacity,transform] duration-700 delay-150 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            animation: signOn ? 'name-glow 5s ease infinite' : 'none',
          }}
        >
          Daniel Niedzwiedzki
        </h1>

        {/* Tagline */}
        <p
          className={`text-lg tracking-wide text-secondary mb-8 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Building cool stuff one component at a time.
        </p>

        {/* Buttons + Social */}
        <div
          className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-500 w-full sm:w-auto ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Primary button */}
          <Link
            href="#projects"
            aria-label="View Projects"
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-hero-main text-black text-base font-bold text-center
      backdrop-blur-sm transition-all duration-300
      hover:bg-white/90 hover:backdrop-blur-md hover:-translate-y-[2px]
      hover:shadow-[0_8px_32px_rgba(245,245,240,0.15),0_4px_8px_rgba(0,0,0,0.3)]
      active:translate-y-0"
          >
            View Projects
          </Link>

          {/* Ghost button */}
          <Link
            href="#contact"
            aria-label="Get in touch"
            className="w-full sm:w-auto px-8 py-4 rounded-md text-hero-main text-base font-bold text-center
      bg-white/6 backdrop-blur-sm border border-white/10
      transition-all duration-300
      hover:bg-white/12 hover:border-white/25 hover:-translate-y-[2px]
      active:translate-y-0"
          >
            Get in Touch
          </Link>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-4 w-full sm:w-auto sm:ml-2 sm:border-l sm:border-zinc-700 sm:pl-4">
            <a
              href="https://www.linkedin.com/in/daniel-niedzwiedzki/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="p-4 sm:p-2 rounded-lg bg-white/5 border border-white/8 text-hero-main
        transition-all duration-300
        hover:bg-white/12 hover:border-white/20 hover:text-white hover:-translate-y-[2px]
        hover:shadow-[0_4px_16px_rgba(255,255,255,0.08)]"
            >
              <BsLinkedin className="w-7 h-7 sm:w-5 sm:h-5" />
            </a>
            <a
              href="https://github.com/ndnied91"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="p-4 sm:p-2 rounded-lg bg-white/5 border border-white/8 text-hero-main
        transition-all duration-300
        hover:bg-white/12 hover:border-white/20 hover:text-white hover:-translate-y-[2px]
        hover:shadow-[0_4px_16px_rgba(255,255,255,0.08)]"
            >
              <BsGithub className="w-7 h-7 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Link
          href="#about"
          aria-label="Scroll to about section"
          className="flex flex-col items-center gap-1 text-accent-cyan font-bold hover:text-white transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">scroll</span>
          <svg
            className="w-4 h-4 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
