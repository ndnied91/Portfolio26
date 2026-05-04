import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { categories } from '@/utils/data';
import ProjectCard from './ProjectCard';
import { fetchProjects, Project } from '@/utils/fetchProjects';
import { FaGithub } from 'react-icons/fa';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

type Props = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

const Projects = ({ activeFilter, setActiveFilter }: Props) => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]); //all projects

  const [isShownAll, setIsShownAll] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [shown, setShown] = useState(2); //projects shown when on mobile
  const [subCategory, setSubCategory] = useState<string | null>(null);

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

  useEffect(() => {
    if (activeFilter && activeFilter !== 'All' && isMobile) {
      const matchingCategory = categories.find((cat) =>
        cat.items.some((item) => item.name === activeFilter),
      );
      if (matchingCategory) {
        setTimeout(() => setSubCategory(matchingCategory.label), 0);
      }
    }
  }, [activeFilter, isMobile]);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) =>
          project.tags?.includes(activeFilter.toLowerCase()),
        );

  const allSkills = categories.flatMap((cat) => cat.items);

  const renderDesktopCategories = () => {
    return allSkills.map((skill) => (
      <button
        key={skill.name}
        onClick={() => {
          setActiveFilter(skill.name);
          setIsShownAll(true);
        }}
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

  const renderMobileCategories = () => {
    return (
      <div className="flex flex-col gap-3 w-full">
        {/* Category pills - horizontal scroll */}
        <div className="grid grid-cols-2 gap-2 w-full ">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() =>
                setSubCategory(subCategory === cat.label ? null : cat.label)
              }
              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all duration-300 
        ${
          subCategory === cat.label
            ? 'border-accent-cyan text-accent-cyan bg-accent-cyan/10'
            : 'border-white/10 text-zinc-400 bg-white/5'
        }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Subcategory skills - animated reveal */}
        <div
          className={`flex flex-wrap justify-center gap-2 overflow-hidden transition-all duration-400 ease-in-out ${
            subCategory ? 'pt-4 pb-1 max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {categories
            .find((cat) => cat.label === subCategory)
            ?.items.map((skill) => (
              <button
                key={skill.name}
                onClick={() => {
                  setActiveFilter(skill.name);
                  setIsShownAll(true);
                }}
                className={`px-3 py-1 rounded-md text-sm font-bold border transition-all duration-300
                ${
                  activeFilter === skill.name
                    ? 'border-white/40 text-accent-cyan bg-white/10'
                    : 'border-white/10 text-zinc-200 bg-white/6 hover:bg-white/20'
                }`}
              >
                {skill.name}
              </button>
            ))}
        </div>
      </div>
    );
  };

  const renderCards = () => {
    const displayed =
      isMobile && !isShownAll
        ? filteredProjects.slice(0, shown)
        : filteredProjects;

    return displayed.map((project, index) => (
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
      className="flex items-center justify-center min-h-screen px-6 scroll-mt-20 md:scroll-mt-10"
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

          <div className="flex flex-col md:flex-row md:w-fit md:flex md:flex-wrap md:justify-center gap-2 ">
            <button
              onClick={() => {
                setActiveFilter('All');
                setSubCategory(null);
              }}
              className={`px-4 py-1 rounded-md text-base mb-.5 md:mb-0 font-bold backdrop-blur-sm border transition-all duration-300
                ${
                  activeFilter === 'All'
                    ? 'border-white/40 text-accent-cyan bg-white/10'
                    : 'border-white/25 text-secondary bg-white/6 hover:bg-white/20 hover:border-white/40 hover:text-white active:translate-y-0 cursor-pointer'
                }`}
            >
              All
            </button>
            {/* <div> */}

            {isMobile ? (
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {renderMobileCategories()}
                </div>
              </div>
            ) : (
              renderDesktopCategories()
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-6 min-h-150">
          {renderCards()}
        </div>

        {isMobile && !isShownAll && filteredProjects.length > 2 && (
          <div className="flex justify-center mt-6">
            <button
              className="flex items-center justify-center gap-2 w-3/4 sm:w-auto px-6 py-3 rounded-md sm:rounded-xl  bg-hero-main text-black font-bold text-sm sm:bg-white/5 sm:text-zinc-300 sm:border sm:border-white/10 sm:rounded-xl sm:hover:bg-white/10 sm:hover:border-white/25 sm:hover:text-white transition-all duration-200"
              onClick={() => setIsShownAll(!isShownAll)}
            >
              <MdKeyboardDoubleArrowDown
                size={18}
                className="text-black animate-wave-down"
              />

              <span className="">Expand to see more projects</span>

              <MdKeyboardDoubleArrowDown
                size={18}
                className="text-black animate-wave-down-delay"
              />
            </button>
          </div>
        )}

        <div className="flex justify-center mt-5 md:mt-0">
          <a
            href="https://github.com/ndnied91"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-3/4 sm:w-auto px-6 py-3 rounded-md sm:rounded-full text-hero-main font-bold text-sm bg-white/6 border border-white/10 sm:border-accent-cyan hover-crackle hover:bg-white/12 hover:border-white/25 transition-all duration-300"
          >
            <FaGithub size={16} />
            View all on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
