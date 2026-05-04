import { Project } from '@/utils/fetchProjects';
import { FaGithub } from 'react-icons/fa';

type Props = {
  project: Project;
  index: number;
  visible: boolean;
};

const renderTags = (tags: string[]) => {
  const excluded = ['html', 'css', 'github', 'git'];
  const filteredTags = tags.filter((tag) => !excluded.includes(tag)).sort();
  return filteredTags.map((tag) => (
    <span
      key={tag}
      className="font-fira text-[11px] font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/8 text-secondary"
    >
      {tag}
    </span>
  ));
};

const ProjectCard = ({ project, index, visible }: Props) => {
  return (
    <div
      className={`relative flex flex-col h-fit min-h-64 gap-3 bg-[#1a2035] border border-white/8 rounded-2xl p-5 overflow-hidden transition-all duration-700 hover:border-cyan-400/50
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
    >
      {/* gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-indigo-500 to-cyan-400" />

      <div className="flex justify-between items-center gap-3">
        <p className="text-hero-main font-bold tracking-wide text-lg leading-snug">
          {project.title}
        </p>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="flex items-center justify-center border border-white/10 rounded-lg p-2 hover:text-hero-main hover:border-white/25 transition-all shrink-0"
          >
            <FaGithub size={18} color="white" />
          </a>
        )}
      </div>

      <p className="text-secondary text-[13px] leading-relaxed line-clamp-4">
        {project.text}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
        {project.tags && renderTags(project.tags)}
      </div>
    </div>
  );
};

export default ProjectCard;
