'use client';
import { useState, useRef } from 'react';
import { Job } from '@/utils/fetchExperience';

type Props = {
  jobs: Job[];
};

const ExperienceMobile = ({ jobs }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (idx: number) => {
    const isOpening = activeIndex !== idx;
    setActiveIndex(isOpening ? idx : null);

    if (isOpening) {
      setTimeout(() => {
        itemRefs.current[idx]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {jobs.map((job, idx) => {
        const isOpen = activeIndex === idx;
        return (
          <div
            key={job.order}
            style={{ scrollMarginTop: '80px' }}
            ref={(el) => {
              itemRefs.current[idx] = el;
            }}
            className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
              isOpen ? 'border-cyan-400/30' : 'border-white/8'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <div>
                <p
                  className={`text-sm font-medium ${isOpen ? 'text-hero-main' : 'text-secondary'}`}
                >
                  {job.company}
                </p>
                <p
                  className={`text-xs mt-0.5 ${isOpen ? 'text-cyan-400' : 'text-zinc-500'}`}
                >
                  {job.dates}
                </p>
              </div>
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className={`shrink-0 text-secondary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-white/6">
                <p className="text-sm font-medium text-hero-main mt-4 mb-1">
                  {job.title}
                </p>
                <ul className="flex flex-col gap-3 mt-4">
                  {job.duties?.map((duty: any, i: number) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                      <p className="text-sm text-secondary leading-relaxed">
                        {duty}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceMobile;
