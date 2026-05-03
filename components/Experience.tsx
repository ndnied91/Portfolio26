'use client';
import { useEffect, useState, useRef } from 'react';
import { fetchExperience, Job } from '@/utils/fetchExperience';
import ExperienceMobile from './ExperienceMobile';

type Props = {
  resume: string;
};

const Experience = ({ resume }: Props) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchExperience().then(setJobs);
  }, []);

  const activeJob = jobs[activeIndex];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="flex px-6 py-16 max-w-5xl mx-auto min-h-screen items-center flex-col justify-center scroll-mt-5 md:scroll-mt-0"
    >
      <div className="flex items-center justify-center flex-col md:flex-row md:justify-between w-full mb-10 gap-4">
        <h2 className="text-3xl font-bold text-hero-main">Experience</h2>
        <div>
          <a
            href={resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-600 text-hero-main text-sm font-medium cursor-pointer hover:border-zinc-400 transition-all"
          >
            Download Resume
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="hidden md:flex flex-col md:flex-row gap-8 w-full">
        {/* left — timeline */}
        <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible lg:w-48 shrink-0 pb-2 md:pb-0 relative">
          {/* vertical line — desktop only */}
          <div className="hidden md:block absolute left-1.75 top-2 bottom-2 w-px bg-white/8" />

          {jobs.map((job, idx) => (
            <button
              key={job.order}
              onClick={() => setActiveIndex(idx)}
              className={`flex items-start gap-3 text-left shrink-0 md:shrink  cursor-pointer relative transition-all duration-200
                ${idx === activeIndex ? 'opacity-100' : 'opacity-50 hover:opacity-75'}`}
            >
              {/* dot */}
              <div
                className={`block mt-5 w-4.25 h-7 cursor-pointer rounded-full shrink-0 border transition-all duration-200
                ${
                  idx === activeIndex
                    ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                    : 'bg-[#0a0a0f] border-white/20'
                }`}
              />
              <div className="hidden md:block">
                <p
                  className={`text-lg pt-5 font-medium cursor-pointer leading-tight ${idx === activeIndex ? 'text-hero-main' : 'text-zinc-200'}`}
                >
                  {job.company}
                </p>
                <p
                  className={`text-[11px] mt-0.5 ${idx === activeIndex ? 'text-cyan-400' : 'text-zinc-100'}`}
                >
                  {job.dates}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* right — detail panel */}
        {activeJob && (
          <div
            key={activeIndex}
            className="flex-1 min-w-0 pl-8 animate-fadeIn h-125 overflow-y-auto"
            style={{ borderLeft: '1px solid rgba(255,255,255,0.06)' }}
          >
            <p className="text-xl font-bold text-hero-main">
              {activeJob.title}
            </p>
            <p className="text-md text-cyan-400 mt-1">{activeJob.company}</p>
            <p className="text-sm text-secondary mt-0.5 mb-6">
              {activeJob.dates}
            </p>

            <ul className="flex flex-col gap-4">
              {activeJob.duties?.map((duty: any, i: number) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                  <p className="text-md text-secondary leading-relaxed">
                    {duty}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* mobile accordion — hidden on desktop */}
      <div className="md:hidden w-full">
        <ExperienceMobile jobs={jobs} />
      </div>
    </section>
  );
};

export default Experience;
