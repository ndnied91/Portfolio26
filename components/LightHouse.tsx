'use client';
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

const ratings = ['Performance', 'Accessibility', 'Best Practices', 'SEO'];
const circumference = 2 * Math.PI * 40;

const LightHouse = () => {
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(
        () => {
          if (canvasRef.current) {
            const myConfetti = confetti.create(canvasRef.current, {
              resize: true,
            });
            myConfetti({
              particleCount: 80,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#4ade80', '#22d3ee', '#ffffff'],
            });
          }
        },
        ratings.length * 200 + 1500,
      );
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const renderRating = () => {
    return ratings.map((rating, index) => (
      <div key={index} className="flex flex-col items-center gap-3">
        <svg width="100" height="100" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#ffffff10"
            strokeWidth="6"
          />
          {/* Animated foreground circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#4ade80"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? 0 : circumference}
            style={{
              transition: `stroke-dashoffset 1.5s ease-in-out ${index * 0.2}s`,
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
            }}
          />
          {/* Score */}
          <text
            x="50"
            y="50"
            dominantBaseline="middle"
            textAnchor="middle"
            fill="white"
            fontSize="20"
            fontWeight="bold"
          >
            100
          </text>
        </svg>
        <p className="text-secondary text-sm font-medium tracking-wide">
          {rating}
        </p>
      </div>
    ));
  };

  return (
    <section className="relative flex flex-col items-center justify-center px-6 pb-20 scroll-mt-5 md:scroll-mt-0 max-w-3xl mx-auto text-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <h2 className="text-3xl font-bold tracking-wide text-hero-main mb-4">
        Built to Standard
      </h2>
      <p className="text-secondary text-sm leading-relaxed mb-4">
        Over the past couple of years I&apos;ve learned that being a great
        software engineer means caring about more than just engaging components
        — it means thinking about performance, scalability, and accessibility
        too. This site scores a perfect 100 across all four categories on
        Lighthouse, because the details matter.
      </p>
      <p className="text-secondary text-sm leading-relaxed mb-4 italic">
        Lighthouse is Google&apos;s open-source tool that audits a site&apos;s
        performance, accessibility, best practices, and SEO, scoring each
        category from 0 to 100.
      </p>

      <div ref={sectionRef} className="flex flex-wrap justify-center gap-10">
        {renderRating()}
      </div>
    </section>
  );
};

export default LightHouse;
