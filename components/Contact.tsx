'use client';
import { useRef, useState } from 'react';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import { CiLocationOn } from 'react-icons/ci';
import VisitorCount from './VisitorCount';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('danielniedzwiedzki.1@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      // className="px-6 pb-20 pt-20 max-w-5xl mx-auto"
      className="flex flex-col justify-center px-6 py-32 max-w-5xl mx-auto"
    >
      {/* header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-white mb-3">Contact Me</h2>
        <p className="text-zinc-400 text-sm tracking-tight">
          Ready to bring precision and performance to your team
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full">
        {/* left — get in touch */}
        <div className="relative flex flex-col items-center justify-center text-center bg-[#1a2035] border border-white/8 rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-cyan-400" />

          <div className="w-12 h-12 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-5">
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#22d3ee"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-medium text-white mb-1">Lets talk!</h3>
          <p className="text-zinc-400 text-sm mb-6">
            Ready to discuss your next project?
          </p>

          <a
            href="mailto:danielniedzwiedzki.1@gmail.com"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-400 text-white text-sm font-medium hover:opacity-90 transition-all mb-4"
          >
            Send Email
            <FaArrowRight size={14} />
          </a>

          {/* social buttons */}
          <div className="flex gap-3 w-full">
            <a
              href="https://github.com/ndnied91"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/25 text-secondary text-sm hover:text-white hover:border-white/50 transition-all"
            >
              <FaGithub size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/daniel-niedzwiedzki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/25 text-secondary text-sm hover:text-white hover:border-white/50 transition-all"
            >
              <FaLinkedin size={16} />
              LinkedIn
            </a>
          </div>

          <div className="mt-5 flex items-center gap-1.5 text-zinc-200 text-sm">
            <CiLocationOn size={16} color="white" />
            New Jersey
          </div>

          {/* copy email */}
          <button
            onClick={handleCopy}
            className="mt-1 text-xs text-zinc-200 hover:text-zinc-300 transition-all cursor-pointer"
          >
            {copied ? '✓ Copied!' : 'danielniedzwiedzki.1@gmail.com'}
          </button>
        </div>

        {/* right — beyond the code */}
        <div className="relative flex flex-col bg-[#1a2035] border border-white/8 rounded-2xl p-8 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-cyan-400" />

          <h3 className="text-xs font-medium text-zinc-400 tracking-widest uppercase mb-4">
            Fun facts about me!
          </h3>

          <p className="text-zinc-300 text-sm leading-relaxed mb-4">
            When I&apos;m not coding, you&apos;ll usually find me{' '}
            <span className="italic">down the shore </span>
            (as us New Jerseyans say) with my dog, at the gym, or hanging out
            with friends and family.
          </p>
          <p className="text-zinc-300 text-sm leading-relaxed">
            I&apos;m currently looking for opportunities where I can contribute
            strong technical skills, an eye for good UX, and a team-first
            attitude to a group that cares about what they build.
          </p>

          <p className="text-zinc-300 text-sm leading-relaxed pt-2">
            {' '}
            Also.. go birds 🦅
          </p>

          <div className="mt-auto border-t border-white/6 pt-5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
              <p className="text-xs text-zinc-400">
                <span className="text-cyan-400 font-medium">
                  Open to opportunities
                </span>
              </p>
            </div>
            <p className="text-xs text-secondary pl-4">
              Software Engineer · New Jersey / NYC or Remote
            </p>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden items-center justify-center pt-10">
        <VisitorCount />
      </div>
    </section>
  );
};

export default Contact;
