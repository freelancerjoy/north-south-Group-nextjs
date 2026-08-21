import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import OptimizedImage from "../../components/OptimizedImage";
import { projectDetailsPath } from "../../utils/entity";

export default function ProjectCard({ project, compact = false }) {
  const status = project.status?.toLowerCase();

  const statusStyle = {
    ready: "bg-green-500",
    ongoing: "bg-amber-400",
    upcoming: "bg-blue-500",
  };

  return (
    <Link
      to={projectDetailsPath(project)}
      state={{ project }}
      className={`block relative group overflow-hidden rounded-2xl shadow-xl cursor-pointer ${
        compact ? "h-[440px]" : "h-[70vh]"
      }`}
    >
      {/* Full-cover image */}
      <OptimizedImage
        src={project.image?.[0]}
        alt={project.title}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="brightness-75 transition-transform duration-700 group-hover:scale-110"
      />

      {/* Status badge */}
      <span
        className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-white shadow-lg ${
          statusStyle[status] || "bg-gray-500"
        }`}
      >
        {project.status}
      </span>

      {/* Hover dark overlay */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Bottom content */}
      <div className="absolute left-0 right-0 bottom-0 px-6 pb-6 flex flex-col items-start">
        {/* Title — slides up on hover */}
        <h3 className="text-xl font-bold text-white leading-snug transition-transform duration-500 group-hover:-translate-y-2 drop-shadow-lg">
          {project.title}
        </h3>

        {/* Address + description — revealed on hover */}
        <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 mt-1 w-full">
          {project.description?.generalFeature && (
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">
              {project.description.generalFeature}
            </p>
          )}
          {project.specs?.address && (
            <div className="flex items-center gap-1 mt-2">
              <MdLocationOn className="text-green-400 text-sm shrink-0" />
              <p className="text-green-300 text-xs font-semibold truncate">{project.specs.address}</p>
            </div>
          )}
        </div>

        {/* Button — revealed on hover */}
        <div className="overflow-hidden max-h-0 group-hover:max-h-16 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button className="mt-4 py-2 px-6 border-2 border-white text-white text-sm font-bold hover:bg-white hover:text-black transition-all duration-300 tracking-wide">
            View Project
          </button>
        </div>
      </div>
    </Link>
  );
}
