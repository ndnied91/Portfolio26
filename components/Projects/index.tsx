import { useEffect, useRef, useState } from 'react';

import { categories } from '@/utils/data';
import ProjectCard from './ProjectCard';
import { fetchProjects, Project } from '@/utils/fetchProjects';
import { FaGithub } from 'react-icons/fa';

type Props = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const Projects = ({ activeFilter, setActiveFilter }: Props) => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]); //all projects

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

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

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) =>
          project.tags?.includes(activeFilter.toLowerCase()),
        );

  const allSkills = categories.flatMap((cat) => cat.items);

  const renderCategories = () => {
    return allSkills.map((skill) => (
      <button
        key={skill.name}
        onClick={() => setActiveFilter(skill.name)}
        className={`px-4 py-1 rounded-md text-base font-bold bg-white/6 backdrop-blur-sm border border-white/10 transition-all duration-300
               ${
                 activeFilter === skill.name
                   ? 'border-white/40 text-accent-cyan bg-white/10'
                   : 'border-white/25 text-zinc-200 bg-white/6 hover:bg-white/20 hover:border-white/40 hover:text-white active:translate-y-0 cursor-pointer'
               }`}
      >
        {skill.name}
      </button>
    ));
  };

  const renderCards = () => {
    return filteredProjects.map((project, index) => (
      <ProjectCard
        key={project.title}
        project={project}
        index={index}
        visible={visible}
      />
    ));
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="flex items-center justify-center min-h-screen px-6 scroll-mt-20 md:scroll-mt-0"
    >
      <div className="max-w-5xl w-full items-center ">
        <div
          className={`transition-all mb-2 duration-700 delay-200 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          <h2 className="text-3xl font-bold text-hero-main mb-4 text-center pb-2">
            Recent Notable Projects
          </h2>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-1 rounded-md text-base font-bold backdrop-blur-sm border transition-all duration-300
    ${
      activeFilter === 'All'
        ? 'border-white/40 text-accent-cyan bg-white/10'
        : 'border-white/25 text-secondary bg-white/6 hover:bg-white/20 hover:border-white/40 hover:text-white active:translate-y-0 cursor-pointer'
    }`}
            >
              All
            </button>
            {renderCategories()}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6 min-h-[600px]">
          {renderCards()}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="https://github.com/ndnied91"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-hero-main border tracking border-white/10 rounded-full px-6 py-2.5 hover:text-white hover:border-white/25 hover:bg-white/5 transition-all duration-300"
          >
            <FaGithub size={16} />
            View more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
