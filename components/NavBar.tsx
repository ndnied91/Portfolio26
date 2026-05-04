'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { BsPersonRaisedHand } from 'react-icons/bs';
import { FaCode } from 'react-icons/fa';
import { FaFolderOpen, FaEnvelope } from 'react-icons/fa6';
import { IoBriefcase } from 'react-icons/io5';
import VisitorCount from './VisitorCount';

const links = [
  { text: 'About', href: '#about', icon: <BsPersonRaisedHand size={20} /> },
  { text: 'Skills', href: '#skills', icon: <FaCode size={20} /> },
  { text: 'Projects', href: '#projects', icon: <FaFolderOpen size={20} /> },
  { text: 'Experience', href: '#experience', icon: <IoBriefcase size={20} /> },
  { text: 'Contact', href: '#contact', icon: <FaEnvelope size={20} /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.1 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        role="banner"
        ref={menuRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-800'
            : 'bg-transparent'
        }`}
      >
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between"
        >
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link
              href="#home"
              className="logo text-4xl font-bold tracking-widest text-hero-main hover-crackle-logo hover:text-accent-cyan duration-300"
              aria-label="Daniel Niedzwiedzki - Home"
            >
              {'</dn>'}
            </Link>
          </div>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {links.map(({ text, href }) => (
              <li key={text}>
                <Link
                  href={href}
                  autoFocus={text === 'About'}
                  className={`text-md font-bold transition-colors rounded px-1 ${
                    activeSection === href.replace('#', '')
                      ? 'text-cyan-400'
                      : 'text-secondary hover:text-white'
                  }`}
                >
                  {text}
                </Link>
              </li>
            ))}
            <span className="hidden md:flex">
              <VisitorCount increment />
            </span>
          </ul>

          {/* Hamburger */}
          <button
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.75' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${isOpen ? 'opacity-0 -translate-x-2' : ''}`}
            />
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.75' : ''}`}
            />
          </button>
        </nav>

        {/* Drop down menu */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-white/8
            ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <ul className="flex flex-col px-6 py-4 gap-1" role="list">
            {links.map(({ text, href, icon }, idx) => (
              <li key={text}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    activeSection === href.replace('#', '')
                      ? 'text-cyan-400 bg-white/6 border-white/8'
                      : 'text-zinc-300 hover:text-white hover:bg-white/6 border-transparent hover:border-white/8'
                  }`}
                  style={{ transitionDelay: isOpen ? `${idx * 40}ms` : '0ms' }}
                >
                  {text}

                  {icon}
                </Link>
              </li>
            ))}
          </ul>

          <div className="px-6 pb-4">
            <div className="h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent" />
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 w-full z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default Navbar;
